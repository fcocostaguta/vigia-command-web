import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const LIMITS = {
  nombre: 120,
  cargo: 120,
  org: 200,
  email: 254,
  tel: 30,
  operadores: 20,
  mensaje: 2000,
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY not configured')
    return NextResponse.json({ error: 'Servicio de contacto no configurado.' }, { status: 500 })
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

  const { nombre = '', cargo = '', org = '', email = '', tel = '', operadores = '', mensaje = '' } = body

  if (!nombre.trim() || !org.trim() || !email.trim()) {
    return NextResponse.json({ error: 'Nombre, organización y correo son requeridos.' }, { status: 400 })
  }

  // Length limits
  for (const [key, max] of Object.entries(LIMITS)) {
    const val = body[key] ?? ''
    if (val.length > max) {
      return NextResponse.json({ error: `Campo demasiado largo: ${key}.` }, { status: 400 })
    }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ error: 'Correo inválido.' }, { status: 400 })
  }

  const to = process.env.CONTACT_EMAIL_TO ?? 'contacto@vigiacommand.cl'
  const from = process.env.CONTACT_EMAIL_FROM ?? 'VIGIA Contact <noreply@vigiacommand.cl>'

  // Strip newlines from subject fields to prevent email header injection
  const safeOrg = org.replace(/[\r\n]/g, ' ').trim()
  const safeNombre = nombre.replace(/[\r\n]/g, ' ').trim()

  const resend = new Resend(apiKey)
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email,
    subject: `Nueva solicitud de demo — ${safeOrg} (${safeNombre})`,
    html: `
<div style="font-family: monospace; max-width: 600px; background: #0a0a0a; color: #e2e8f0; padding: 32px; border-radius: 8px; border: 1px solid #1e293b;">
  <div style="margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #1e293b;">
    <h1 style="margin: 0; font-size: 18px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #10b981;">VIGIA — Nueva Solicitud</h1>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
    <tr><td style="padding: 6px 0; color: #64748b; width: 140px;">Nombre</td><td style="padding: 6px 0; color: #f1f5f9; font-weight: 600;">${e(nombre)}</td></tr>
    ${cargo ? `<tr><td style="padding: 6px 0; color: #64748b;">Cargo</td><td style="padding: 6px 0; color: #f1f5f9;">${e(cargo)}</td></tr>` : ''}
    <tr><td style="padding: 6px 0; color: #64748b;">Organizacion</td><td style="padding: 6px 0; color: #f1f5f9; font-weight: 600;">${e(org)}</td></tr>
    <tr><td style="padding: 6px 0; color: #64748b;">Correo</td><td style="padding: 6px 0;"><a href="mailto:${e(email)}" style="color: #10b981;">${e(email)}</a></td></tr>
    ${tel ? `<tr><td style="padding: 6px 0; color: #64748b;">Telefono</td><td style="padding: 6px 0; color: #f1f5f9;">${e(tel)}</td></tr>` : ''}
    ${operadores ? `<tr><td style="padding: 6px 0; color: #64748b;">Operadores</td><td style="padding: 6px 0; color: #f1f5f9;">${e(operadores)}</td></tr>` : ''}
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
    return NextResponse.json({ error: 'No se pudo enviar el mensaje. Intenta de nuevo.' }, { status: 500 })
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
