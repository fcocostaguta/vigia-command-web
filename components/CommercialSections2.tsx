'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Corners } from './CommercialAtmosphere'
import { Icon, Tag, Badge } from './CommercialIcons'
import { track } from '@/lib/analytics'

const CBN_OPS = [
  { name: 'Cap. Rojas', id: 'B-01', bpm: '142 bpm', cls: 'vg-bpm-ok',   tone: 'ok'   as const, s: 'Normal' },
  { name: 'Tte. Muñoz', id: 'B-02', bpm: '181 bpm', cls: 'vg-bpm-crit', tone: 'crit' as const, s: 'Alerta' },
]

const CBN_EVTS = [
  { t: '14:11', x: 'Alerta biométrica — Tte. Muñoz (181 bpm)', c: 'var(--amber)' },
  { t: '14:23', x: 'Incidente cerrado — snapshot generado',    c: 'var(--green)' },
]

export function CommercialCajaNegra() {
  return (
    <section className="vk-section" id="registro">
      <div className="vk-container vk-cbn-grid">

        <div data-reveal="left">
          <Tag>Registro operacional</Tag>
          <h2 style={{ marginTop: 16 }}>
            La emergencia termina.<br />
            <em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>La información no.</em>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 16, maxWidth: 440, lineHeight: 1.85 }}>
            VIGÍA conserva el registro del evento para facilitar la revisión de lo ocurrido,
            aportar trazabilidad y generar información útil después de la operación.
          </p>
          <div className="vk-cbn-bullets">
            <div className="vk-cbn-bullet">Snapshot generado por incidente</div>
            <div className="vk-cbn-bullet">Historial disponible para revisión posterior</div>
            <div className="vk-cbn-bullet">Base para mejora y aprendizaje operacional</div>
          </div>
        </div>

        <div className="vk-mock" data-reveal="right">
          <Corners />
          <div className="vk-mock-top">
            <div>
              <span style={{ color: 'var(--muted)' }}>SNAPSHOT #0042</span>
              <span style={{ color: 'var(--faint)', fontSize: 9, marginLeft: 10 }}>Demostración · datos simulados</span>
            </div>
            <Badge tone="ok">Cerrado</Badge>
          </div>
          <div className="vk-mock-sec">
            <div className="vk-mock-label">Vitales registrados</div>
            {CBN_OPS.map(o => (
              <div className="vk-mock-op" key={o.id}>
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>{o.name}</span>
                <span style={{ color: 'var(--faint)', fontSize: 9 }}>{o.id}</span>
                <span className={o.cls} style={{ fontSize: 11 }}>{o.bpm}</span>
                <Badge tone={o.tone}>{o.s}</Badge>
              </div>
            ))}
          </div>
          <div className="vk-mock-sec">
            <div className="vk-mock-label">Timeline de eventos</div>
            {CBN_EVTS.map(e => (
              <div className="vk-evt" key={e.t}>
                <span className="vk-evt-t">{e.t}</span>
                <span style={{ color: e.c, fontSize: 7 }}>●</span>
                <span className="vk-evt-x">{e.x}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

const CONTINUITY_STAGES = [
  { n: '01 · OPERACIÓN LOCAL',          h: 'La emergencia activa',    badge: 'Prioridad local',    cls: 'offline', desc: 'El sistema prioriza el registro y funcionamiento local durante la operación.' },
  { n: '02 · SINCRONIZACIÓN POSTERIOR', h: 'Conectividad disponible', badge: 'Sincronización auto', cls: 'act',     desc: 'La información se sincroniza automáticamente cuando vuelve a haber conexión.' },
  { n: '03 · CONTINUIDAD DEL REGISTRO', h: 'Después de la operación', badge: 'Registro continuo',   cls: 'sync',    desc: 'El registro operacional no depende de tener conexión constante.' },
]

export function CommercialOffline() {
  return (
    <section className="vk-section surf" id="continuidad">
      <div className="vk-container">
        <div data-reveal="left">
          <Tag>Continuidad operacional</Tag>
          <h2 style={{ marginTop: 16, maxWidth: '18ch' }}>
            Diseñado para seguir operando <em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>cuando la conexión no acompaña.</em>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 16, maxWidth: 560, lineHeight: 1.85 }}>
            Una emergencia no puede depender de una conexión perfecta. VIGÍA prioriza la operación
            local y sincroniza la información cuando la conectividad vuelve a estar disponible.
          </p>
        </div>
        <div className="vk-off-stages">
          {CONTINUITY_STAGES.map((s, i) => (
            <>
              <div
                key={s.n}
                className={i === 0 ? 'vk-off-stage active' : 'vk-off-stage'}
                data-reveal="scale"
                style={{ '--d': (i * 0.12) + 's' } as React.CSSProperties}
              >
                <div className="vk-off-n">{s.n}</div>
                <h3>{s.h}</h3>
                <p style={{ fontSize: '.8rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: 8 }}>{s.desc}</p>
                <div className={`vk-off-tag ${s.cls}`}>{s.badge}</div>
              </div>
              {i < CONTINUITY_STAGES.length - 1 && <div key={`arr-${i}`} className="vk-off-arrow"><Icon name="arrowRight" size={20} /></div>}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}

const APPS = [
  { icon: 'fire'    as const, title: 'Bomberos',              desc: 'Visibilidad del personal y apoyo al mando durante operaciones de emergencia.' },
  { icon: 'factory' as const, title: 'Brigadas industriales', desc: 'Monitoreo y alertas para equipos que responden en entornos de alta exigencia.' },
  { icon: 'rescue'  as const, title: 'Equipos de respuesta',  desc: 'Coordinación y registro operacional para personal desplegado en terreno.' },
]

export function CommercialCases() {
  return (
    <section className="vk-section" id="aplicaciones">
      <div className="vk-container">
        <div data-reveal>
          <Tag>Aplicaciones</Tag>
          <h2 style={{ marginTop: 16 }}>Una plataforma.<br />Distintos equipos de respuesta.</h2>
          <p style={{ color: 'var(--muted)', marginTop: 16, maxWidth: 560, lineHeight: 1.85 }}>
            VIGÍA está diseñado para organizaciones que necesitan mantener visibilidad sobre
            su personal cuando la operación exige más.
          </p>
        </div>
        <div className="vk-pq-grid">
          {APPS.map((a, i) => (
            <div
              className="vk-pq-card"
              key={a.title}
              data-reveal="scale"
              style={{ '--d': (i * 0.1) + 's' } as React.CSSProperties}
            >
              <div className="vk-pq-ico"><Icon name={a.icon} /></div>
              <h3>{a.title}</h3>
              <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.6, marginTop: 6 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TIPO_ORG = ['Cuerpo de Bomberos', 'Brigada industrial', 'Empresa / industria', 'Equipo de respuesta', 'Otro']
const OBJETIVOS = ['Conocer VIGÍA', 'Solicitar una demostración', 'Evaluar un piloto', 'Evaluar una implementación', 'Alianza o colaboración', 'Otro']
const PERSONAS = ['1 – 10 personas', '11 – 30 personas', '31 – 80 personas', 'Más de 80 personas']
const NEEDS_PERSONAS = new Set(['Evaluar un piloto', 'Evaluar una implementación'])

export function CommercialContact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emailError, setEmailError] = useState<string | null>(null)
  const [objetivo, setObjetivo] = useState('')
  const renderedAt = useRef(Date.now())
  const started = useRef(false)

  useEffect(() => { renderedAt.current = Date.now() }, [])

  const markStarted = () => {
    if (started.current) return
    started.current = true
    track('contact_form_start')
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setEmailError(null)
    const f = e.currentTarget
    const get = (name: string) => (f.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? ''
    const emailVal = get('email')
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailVal)) {
      setEmailError('Ingresa un correo válido.')
      return
    }
    const consent = (f.elements.namedItem('consentimiento') as HTMLInputElement | null)?.checked ?? false
    if (!consent) {
      setError('Debes aceptar el tratamiento de tus datos para continuar.')
      return
    }

    setLoading(true)
    track('contact_form_submit')
    const body = {
      nombre: get('nombre'),
      cargo: get('cargo'),
      org: get('org'),
      email: emailVal,
      tel: get('tel'),
      tipoOrganizacion: get('tipoOrganizacion'),
      objetivo: get('objetivo'),
      personas: get('personas'),
      mensaje: get('mensaje'),
      consentimiento: String(consent),
      _hp: get('empresa_web'),
      _ts: String(renderedAt.current),
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSent(true)
        track('contact_form_success')
      } else {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos a contacto@vigiacommand.cl.')
        track('contact_form_error')
      }
    } catch {
      setError('No pudimos enviar tu solicitud. Inténtalo nuevamente o escríbenos a contacto@vigiacommand.cl.')
      track('contact_form_error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="vk-section" id="contacto">
      <div className="vk-container vk-contact-grid">

        <div className="vk-contact-lead" data-reveal="left">
          <Tag>Contacto</Tag>
          <h2 style={{ marginTop: 16 }}>Conversemos sobre tu operación.</h2>
          <p>Cuéntanos qué tipo de equipo gestionas y qué necesitas resolver. Revisaremos tu solicitud y nos pondremos en contacto contigo.</p>
          <div className="vk-checks">
            <div className="vk-check"><span className="d">●</span> Demostración a medida según tu institución</div>
            <div className="vk-check"><span className="d">●</span> Evaluación de escenario operacional</div>
          </div>
        </div>

        <div className="vk-form" data-reveal="right">
          <Corners />
          {sent ? (
            <div className="vk-success" role="status">
              <div className="ico">✓</div>
              <h3>Solicitud recibida</h3>
              <p>Revisaremos la información y nos pondremos en contacto contigo.</p>
              <button
                className="vg-btn vg-btn-ghost"
                style={{ marginTop: 24 }}
                onClick={() => setSent(false)}
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: 24 }}><Tag>Solicitar información</Tag></div>
              <form onSubmit={submit} onFocus={markStarted} noValidate>
                <label className="vg-field vk-hp" aria-hidden="true">
                  <span>No completar</span>
                  <input name="empresa_web" tabIndex={-1} autoComplete="off" />
                </label>
                <div className="vk-form-row">
                  <label className="vg-field">
                    <span>Nombre completo</span>
                    <input name="nombre" required placeholder="Nombre completo" disabled={loading} autoComplete="name" />
                  </label>
                  <label className="vg-field">
                    <span>Cargo o función</span>
                    <input name="cargo" placeholder="Ej. Capitán, Jefe de Brigada" disabled={loading} autoComplete="organization-title" />
                  </label>
                </div>
                <label className="vg-field">
                  <span>Organización</span>
                  <input name="org" required placeholder="Cuerpo de Bomberos / Empresa / Institución" disabled={loading} autoComplete="organization" />
                </label>
                <div className="vk-form-row">
                  <label className="vg-field">
                    <span>Tipo de organización</span>
                    <select name="tipoOrganizacion" required disabled={loading} defaultValue="">
                      <option value="" disabled>Seleccionar</option>
                      {TIPO_ORG.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                  <label className="vg-field">
                    <span>¿Qué estás buscando?</span>
                    <select
                      name="objetivo"
                      required
                      disabled={loading}
                      defaultValue=""
                      onChange={(e) => setObjetivo(e.target.value)}
                    >
                      <option value="" disabled>Seleccionar</option>
                      {OBJETIVOS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                </div>
                {NEEDS_PERSONAS.has(objetivo) && (
                  <label className="vg-field">
                    <span>Cantidad aproximada de personas</span>
                    <select name="personas" disabled={loading} defaultValue="">
                      <option value="">Seleccionar</option>
                      {PERSONAS.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </label>
                )}
                <div className="vk-form-row">
                  <label className="vg-field">
                    <span>Correo</span>
                    <input
                      name="email" type="email" required placeholder="correo@institución.cl" disabled={loading}
                      autoComplete="email" aria-invalid={!!emailError} aria-describedby={emailError ? 'email-error' : undefined}
                      onChange={() => emailError && setEmailError(null)}
                    />
                    {emailError && <p id="email-error" className="vk-field-error" role="alert">{emailError}</p>}
                  </label>
                  <label className="vg-field">
                    <span>Teléfono / WhatsApp</span>
                    <input name="tel" placeholder="+56 9 XXXX XXXX" disabled={loading} autoComplete="tel" />
                  </label>
                </div>
                <label className="vg-field">
                  <span>Mensaje (opcional)</span>
                  <textarea name="mensaje" placeholder="Cuéntanos sobre tu institución o contexto operacional…" disabled={loading} />
                </label>
                <label className="vk-consent">
                  <input type="checkbox" name="consentimiento" required disabled={loading} />
                  <span>Acepto el tratamiento de mis datos para responder esta solicitud, de acuerdo con la{' '}
                    <a href="/privacidad">Política de Privacidad</a>.</span>
                </label>
                {error && (
                  <div className="vk-form-error" role="alert">{error}</div>
                )}
                <button
                  type="submit"
                  className="vg-btn vg-btn-red vg-btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  disabled={loading}
                >
                  {loading ? 'Enviando…' : <><span>Enviar solicitud</span> <Icon name="arrow" /></>}
                </button>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  )
}

const NAV_FOOTER: [string, string][] = [
  ['Cómo funciona', 'como-funciona'],
  ['Continuidad', 'continuidad'],
  ['Aplicaciones', 'aplicaciones'],
  ['Registro', 'registro'],
]

function go(id: string, e?: React.MouseEvent) {
  const el = document.getElementById(id)
  if (el) { e?.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
}

export function CommercialFooter({ onContact }: { onContact: () => void }) {
  return (
    <footer className="vk-footer">
      <div className="vk-container">
        <div className="vk-footer-inner">
          <div className="vk-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image src="/images/logo-vigia.png" alt="VIGÍA" width={30} height={30} style={{ objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-h)', fontSize: '1.15rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                VIGÍA
              </span>
            </div>
            <p>Tecnología operativa para emergencias. Del pulso al mando.</p>
            <div className="vk-footer-domain">vigiacommand.cl</div>
            <div className="vk-footer-social">
              <a
                className="vk-social-link"
                href="https://www.linkedin.com/company/vig%C3%ADa-command/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VIGÍA en LinkedIn"
                onClick={() => track('social_linkedin_click')}
              >
                <Icon name="linkedin" size={17} />
              </a>
              <a
                className="vk-social-link"
                href="https://www.instagram.com/vigiacommand/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VIGÍA en Instagram"
                onClick={() => track('social_instagram_click')}
              >
                <Icon name="instagram" size={17} />
              </a>
            </div>
          </div>
          <div className="vk-footer-links">
            <div className="vk-footer-col">
              <h3>Plataforma</h3>
              {NAV_FOOTER.map(([l, id]) => (
                <a key={id} href={`#${id}`} onClick={(e) => go(id, e)}>{l}</a>
              ))}
            </div>
            <div className="vk-footer-col">
              <h3>Contacto</h3>
              <a href="#contacto" onClick={(e) => { go('contacto', e); onContact() }}>Conversemos</a>
              <a href="mailto:contacto@vigiacommand.cl">contacto@vigiacommand.cl</a>
            </div>
            <div className="vk-footer-col">
              <h3>Sistema</h3>
              <a href="https://mando.vigiacommand.cl" target="_blank" rel="noopener noreferrer" onClick={() => track('login_click', { placement: 'footer' })}>Ingresar al panel</a>
              <a href="/privacidad">Política de Privacidad</a>
            </div>
          </div>
        </div>
        <div className="vk-footer-bottom">
          <span>© 2026 VIGÍA. Todos los derechos reservados.</span>
          <span style={{ fontFamily: 'var(--font-m)' }}>Tecnología operativa para emergencias.</span>
        </div>
      </div>
    </footer>
  )
}
