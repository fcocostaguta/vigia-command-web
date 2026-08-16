import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const LIMITS = {
  nombre: 120,
  cargo: 120,
  org: 200,
  email: 254,
  tel: 30,
  tipoOrganizacion: 60,
  objetivo: 60,
  personas: 40,
  mensaje: 2000,
}

// Time trap: form must have been rendered at least this long before submission.
// Kept short on purpose — a real visitor using browser autofill can submit in ~1-2s,
// and this must not silently swallow a genuine fast submission.
const MIN_FILL_MS = 1500
// Best-effort in-memory rate limit. Not shared across serverless instances/regions —
// a complementary layer to the honeypot and time trap, not the primary defense.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RATE_LIMIT_MAX = 5
const hits = new Map<string, number[]>()

// Bump when the consent copy in CommercialContact.tsx changes, to keep an audit trail
// of which wording a given lead actually agreed to.
const CONSENT_VERSION = '2026-08-16'
const CONSENT_TEXT = 'Autorizo el tratamiento de mis datos personales para responder esta solicitud y ser contactado en relación con ella.'

function rateLimited(ip: string): boolean {
  const now = Date.now()
  const prev = (hits.get(ip) ?? []).filter(t => now - t < RATE_LIMIT_WINDOW_MS)
  prev.push(now)
  hits.set(ip, prev)
  if (hits.size > 5000) hits.clear() // guard against unbounded growth on a long-lived instance
  return prev.length > RATE_LIMIT_MAX
}

async function persistLead(lead: Record<string, string>): Promise<void> {
  const url = process.env.KV_REST_API_URL
  const token = process.env.KV_REST_API_TOKEN
  if (!url || !token) {
    console.warn('[contact] KV_REST_API_URL/KV_REST_API_TOKEN no configurados — el lead no queda persistido, solo por correo.')
    return
  }
  try {
    const res = await fetch(`${url}/lpush/leads/${encodeURIComponent(JSON.stringify({ ...lead, receivedAt: new Date().toISOString() }))}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) console.error('[contact] Falló la persistencia del lead en KV:', res.status)
  } catch (err) {
    console.error('[contact] Error al persistir el lead en KV:', err)
  }
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not configured')
    return NextResponse.json({ error: 'Servicio de contacto no configurado.' }, { status: 500 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'Demasiadas solicitudes. Intenta de nuevo en unos minutos.' }, { status: 429 })
  }

  let body: Record<string, string>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 })
  }

  // Honeypot: bots fill the hidden _hp field; humans never see it
  if (body._hp) {
    return NextResponse.json({ ok: true })
  }

  // Time trap: reject submissions faster than a human could plausibly fill the form
  const renderedAt = Number(body._ts)
  if (!renderedAt || Number.isNaN(renderedAt) || Date.now() - renderedAt < MIN_FILL_MS) {
    return NextResponse.json({ ok: true })
  }

  const {
    nombre = '', cargo = '', org = '', email = '', tel = '',
    tipoOrganizacion = '', objetivo = '', personas = '', mensaje = '',
    consentimiento = '',
  } = body

  if (!nombre.trim() || !org.trim() || !email.trim() || !tipoOrganizacion.trim() || !objetivo.trim()) {
    return NextResponse.json({ error: 'Completa los campos obligatorios.' }, { status: 400 })
  }
  if (consentimiento !== 'true') {
    return NextResponse.json({ error: 'Debes aceptar el tratamiento de tus datos para continuar.' }, { status: 400 })
  }

  for (const [key, max] of Object.entries(LIMITS)) {
    const val = body[key] ?? ''
    if (val.length > max) {
      return NextResponse.json({ error: `Campo demasiado largo: ${key}.` }, { status: 400 })
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Ingresa un correo válido.' }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL_TO ?? 'contacto@vigiacommand.cl'
  const from = process.env.CONTACT_EMAIL_FROM ?? 'VIGIA Contact <noreply@vigiacommand.cl>'

  // Strip newlines from subject fields to prevent email header injection
  const safeOrg = org.replace(/[\r\n]/g, ' ').trim()
  const safeNombre = nombre.replace(/[\r\n]/g, ' ').trim()

  await persistLead({
    nombre, cargo, org, email, tel, tipoOrganizacion, objetivo, personas, mensaje,
    consentimiento, consentVersion: CONSENT_VERSION, consentText: CONSENT_TEXT,
  })

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nueva solicitud — ${safeOrg} (${safeNombre})`,
    html: `
<div style="font-family: monospace; max-width: 600px; background: #0a0a0a; color: #e2e8f0; padding: 32px; border-radius: 8px; border: 1px solid #1e293b;">
  <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #1e293b;">
    <h1 style="margin: 0; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981;">VIGIA — Nueva Solicitud</h1>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #64748b; width: 160px;">Nombre</td><td style="padding: 6px 0; color: #f1f5f9; font-weight: 600;">${e(nombre)}</td></tr>
    ${cargo ? `<tr><td style="padding: 6px 0; color: #64748b;">Cargo</td><td style="padding: 6px 0; color: #f1f5f9;">${e(cargo)}</td></tr>` : ''}
    <tr><td style="padding: 6px 0; color: #64748b;">Organizacion</td><td style="padding: 6px 0; color: #f1f5f9; font-weight: 600;">${e(org)}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748b;">Tipo de organizacion</td><td style="padding: 6px 0; color: #f1f5f9;">${e(tipoOrganizacion)}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748b;">Buscan</td><td style="padding: 6px 0; color: #f1f5f9;">${e(objetivo)}</td></tr>
    ${personas ? `<tr><td style="padding: 6px 0; color: #64748b;">Personas aprox.</td><td style="padding: 6px 0; color: #f1f5f9;">${e(personas)}</td></tr>` : ''}
    <tr><td style="padding: 6px 0; color: #64748b;">Correo</td><td style="padding: 6px 0;"><a href="mailto:${e(email)}" style="color: #10b981;">${e(email)}</a></td></tr>
    ${tel ? `<tr><td style="padding: 6px 0; color: #64748b;">Telefono</td><td style="padding: 6px 0; color: #f1f5f9;">${e(tel)}</td></tr>` : ''}
  </table>

  ${mensaje ? `
  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b;">
    <p style="margin: 0 0 8px; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em;">Mensaje</p>
    <p style="margin: 0; color: #cbd5e1; line-height: 1.6;">${e(mensaje)}</p>
  </div>` : ''}

  <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #1e293b; font-size: 11px; color: #334155;">
    Recibido desde vigiacommand.cl — responder directamente a ${e(email)}
  </div>
</div>`,
  })

  if (error) {
    console.error('[contact] Resend error:', error)
    return NextResponse.json({ error: 'No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos a contacto@vigiacommand.cl.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

function e(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
