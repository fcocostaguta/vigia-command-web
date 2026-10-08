'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Corners } from './CommercialAtmosphere'
import { Icon, Tag, Badge } from './CommercialIcons'
import { track } from '@/lib/analytics'

// Example record, mirroring what VIGÍA stores when an incident closes:
// per-person vital summaries plus the event timeline.
const CBN_META = [
  { k: 'Duración', v: '42 min' },
  { k: 'Personal', v: '5' },
  { k: 'Alertas',  v: '1' },
]

const CBN_OPS = [
  { name: 'Cap. Rojas', id: 'B-01', fc: '136', fcCls: 'vg-bpm-ok',   spo2: '97', temp: '37,4', alerts: 0 },
  { name: 'Tte. Muñoz', id: 'B-02', fc: '181', fcCls: 'vg-bpm-crit', spo2: '96', temp: '38,1', alerts: 1 },
]

const CBN_EVTS = [
  { t: '13:41', x: 'Inicio del incidente',                        tone: 'info' },
  { t: '14:11', x: 'Alerta biométrica · Tte. Muñoz, FC 181 bpm',   tone: 'warn' },
  { t: '14:23', x: 'Incidente cerrado · registro generado',       tone: 'ok'   },
]

export function CommercialCajaNegra() {
  return (
    <section className="vk-section" id="registro">
      <div className="vk-container vk-cbn-grid">

        <div data-reveal>
          <Tag>Registro operacional</Tag>
          <h2>
            La emergencia termina.<br />
            <em className="vk-accent">La información no.</em>
          </h2>
          <p className="vk-lead">
            Cada incidente queda registrado para revisar lo ocurrido, mantener la trazabilidad
            y aprender de cada operación.
          </p>
          <ul className="vk-cbn-bullets">
            <li className="vk-cbn-bullet">Un registro por cada emergencia</li>
            <li className="vk-cbn-bullet">Historial para revisión posterior</li>
            <li className="vk-cbn-bullet">Base para la mejora operacional</li>
          </ul>
        </div>

        <div className="vk-mock" data-reveal style={{ '--d': '0.12s' } as React.CSSProperties}>
          <Corners />
          <div className="vk-mock-top">
            <div className="vk-mock-id">
              <span className="vk-mock-title">Registro de la emergencia</span>
              <span className="vk-mock-ref">Incidente #0042 · datos de ejemplo</span>
            </div>
            <Badge tone="ok">Cerrado</Badge>
          </div>
          <dl className="vk-mock-meta">
            {CBN_META.map(m => (
              <div key={m.k}><dt>{m.k}</dt><dd>{m.v}</dd></div>
            ))}
          </dl>
          <div className="vk-mock-sec">
            <div className="vk-mock-label">Resumen por persona</div>
            <div className="vk-mock-thead" aria-hidden="true">
              <span />
              <span>FC máx.</span>
              <span>SpO₂ mín.</span>
              <span>Temp. máx.</span>
              <span />
            </div>
            {CBN_OPS.map(o => (
              <div className="vk-mock-op" key={o.id}>
                <span className="vk-mock-who">
                  <span className="vk-mock-name">{o.name}</span>
                  <span className="vk-mock-opid">{o.id}</span>
                </span>
                <span className={`vk-mock-v ${o.fcCls}`}><b>{o.fc}</b> bpm</span>
                <span className="vk-mock-v"><b>{o.spo2}</b> %</span>
                <span className="vk-mock-v"><b>{o.temp}</b> °C</span>
                <span className={`vk-mock-alerts${o.alerts ? ' has' : ''}`}>
                  {o.alerts ? `${o.alerts} alerta` : 'Sin alertas'}
                </span>
              </div>
            ))}
          </div>
          <div className="vk-mock-sec">
            <div className="vk-mock-label">Línea de tiempo</div>
            <ol className="vk-evts">
              {CBN_EVTS.map(e => (
                <li className="vk-evt" key={e.t}>
                  <span className="vk-evt-t">{e.t}</span>
                  <span className={`vk-evt-dot ${e.tone}`} aria-hidden="true" />
                  <span className="vk-evt-x">{e.x}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

      </div>
    </section>
  )
}

const CONTINUITY_STAGES = [
  { n: '01', h: 'Durante la emergencia',   badge: 'Prioridad local',          cls: 'offline', desc: 'El registro y el funcionamiento local tienen prioridad.' },
  { n: '02', h: 'Al volver la conexión',   badge: 'Sincronización automática', cls: 'act',     desc: 'La información se sincroniza sin intervención del equipo.' },
  { n: '03', h: 'Después de la operación', badge: 'Registro continuo',        cls: 'sync',    desc: 'El registro se conserva sin depender de una conexión constante.' },
]

export function CommercialOffline() {
  return (
    <section className="vk-section surf" id="continuidad">
      <div className="vk-container">
        <div className="vk-split-head" data-reveal>
          <div>
            <Tag>Continuidad operacional</Tag>
            <h2>
              Diseñado para seguir operando <em className="vk-accent">cuando la conexión no acompaña.</em>
            </h2>
          </div>
          <p className="vk-lead">
            Una emergencia no puede depender de una conexión perfecta. VIGÍA prioriza la operación
            local y sincroniza cuando vuelve la conectividad.
          </p>
        </div>
        <div className="vk-off-stages">
          {CONTINUITY_STAGES.map((s, i) => (
            <Fragment key={s.n}>
              <div
                className={i === 0 ? 'vk-off-stage active' : 'vk-off-stage'}
                data-reveal
                style={{ '--d': (i * 0.1) + 's' } as React.CSSProperties}
              >
                <div className="vk-off-n">{s.n}</div>
                <h3>{s.h}</h3>
                <p>{s.desc}</p>
                <div className={`vk-off-tag ${s.cls}`}>{s.badge}</div>
              </div>
              {i < CONTINUITY_STAGES.length - 1 && <div className="vk-off-arrow"><Icon name="arrowRight" size={20} /></div>}
            </Fragment>
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
    <section className="vk-section vk-apps" id="aplicaciones">
      <div className="vk-apps-photo" aria-hidden="true">
        <Image
          src="/images/bomberos-field.jpg"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: '68% 52%' }}
        />
      </div>
      <div className="vk-container vk-apps-inner">
        <div data-reveal>
          <Tag>Aplicaciones</Tag>
          <h2>Una plataforma.<br />Distintos equipos de respuesta.</h2>
          <p className="vk-lead">
            Para organizaciones que necesitan visibilidad sobre su personal cuando la operación
            exige más.
          </p>
        </div>
        <div className="vk-pq-grid">
          {APPS.map((a, i) => (
            <div
              className="vk-pq-card"
              key={a.title}
              data-reveal
              style={{ '--d': (i * 0.1) + 's' } as React.CSSProperties}
            >
              <div className="vk-pq-ico"><Icon name={a.icon} /></div>
              <h3>{a.title}</h3>
              <p>{a.desc}</p>
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

        <div className="vk-contact-lead" data-reveal>
          <Tag>Contacto</Tag>
          <h2>Conversemos sobre tu operación.</h2>
          <p>Cuéntanos qué equipo gestionas y qué necesitas: conocer VIGÍA, ver una demostración o evaluar un piloto. Te responderemos directamente.</p>
          <a className="vk-contact-direct" href="mailto:contacto@vigiacommand.cl">
            <span className="vk-contact-direct-ico"><Icon name="mail" size={18} /></span>
            <span>
              <span className="vk-contact-direct-k">¿Prefieres escribirnos directamente?</span>
              <span className="vk-contact-direct-v">contacto@vigiacommand.cl</span>
            </span>
          </a>
        </div>

        <div className="vk-form" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
          <Corners />
          {sent ? (
            <div className="vk-success" role="status">
              <div className="ico"><Icon name="check" size={28} /></div>
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
              <div className="vk-form-head"><Tag>Tu solicitud</Tag></div>
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
                <div className="vk-consent-block">
                  <label className="vk-consent">
                    <input type="checkbox" name="consentimiento" required disabled={loading} />
                    <span>Autorizo el tratamiento de mis datos personales para responder esta solicitud y ser contactado en relación con ella.</span>
                  </label>
                  <p className="vk-consent-micro">
                    Usaremos tus datos solo para responder esta solicitud. Detalles en la{' '}
                    <a href="/privacidad">política de privacidad</a>.
                  </p>
                </div>
                {error && (
                  <div className="vk-form-error" role="alert">{error}</div>
                )}
                <button
                  type="submit"
                  className="vg-btn vg-btn-red vg-btn-lg vk-form-submit"
                  disabled={loading}
                  aria-busy={loading}
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
            <div className="vk-logo">
              <Image src="/images/logo-vigia.png" alt="" width={30} height={30} style={{ objectFit: 'contain' }} />
              <span className="vk-wordmark is-sm">VIGÍA</span>
            </div>
            <p>Del pulso al mando. Tecnología operacional para equipos de emergencia.</p>
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
          </div>
        </div>
        <div className="vk-footer-bottom">
          <span>© 2026 VIGÍA. Todos los derechos reservados.</span>
          <a className="vk-footer-legal" href="/privacidad">Política de privacidad</a>
        </div>
      </div>
    </footer>
  )
}
