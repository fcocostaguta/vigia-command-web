'use client'

import { useState } from 'react'
import { Corners } from './CommercialAtmosphere'
import { Icon, Tag, Badge } from './CommercialIcons'

function go(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const CBN_OPS = [
  { name: 'Cap. Rojas', id: 'B-01', bpm: '142 bpm', cls: 'vg-bpm-ok',   tone: 'ok'   as const, s: 'Normal' },
  { name: 'Tte. Muñoz', id: 'B-02', bpm: '181 bpm', cls: 'vg-bpm-crit', tone: 'crit' as const, s: 'Alerta' },
  { name: 'Vol. Pérez',  id: 'B-03', bpm: '136 bpm', cls: 'vg-bpm-ok',   tone: 'ok'   as const, s: 'Normal' },
  { name: 'Bbro. Soto',  id: 'B-04', bpm: '176 bpm', cls: 'vg-bpm-warn', tone: 'warn' as const, s: 'Rehab.' },
]

const CBN_EVTS = [
  { t: '14:05', x: 'Incidente iniciado — 4 operadores desplegados', c: 'var(--green)' },
  { t: '14:11', x: 'Alerta BPM — Tte. Muñoz (181 bpm)',            c: 'var(--amber)' },
  { t: '14:19', x: 'Bbro. Soto enviado a rehabilitación',          c: 'var(--amber)' },
  { t: '14:23', x: 'Incidente cerrado — snapshot generado',         c: 'var(--green)' },
]

export function CommercialCajaNegra() {
  return (
    <section className="vk-section" id="caja-negra">
      <div className="vk-container vk-cbn-grid">

        <div data-reveal="left">
          <Tag>Diferenciador central</Tag>
          <h2 style={{ marginTop: 16 }}>
            La emergencia deja<br />
            <em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>registro automático.</em>
          </h2>
          <div className="vk-cbn-bullets">
            <div className="vk-cbn-bullet">Snapshot inmutable por incidente</div>
            <div className="vk-cbn-bullet">Historial auditable posterior al incidente</div>
            <div className="vk-cbn-bullet">Base para mejora y aprendizaje operacional</div>
          </div>
        </div>

        <div className="vk-mock" data-reveal="right">
          <Corners />
          <div className="vk-mock-top">
            <div>
              <span style={{ color: 'var(--muted)' }}>SNAPSHOT #0042</span>
              <span style={{ color: 'var(--faint)', fontSize: 9, marginLeft: 10 }}>Incendio estructural · 2ª alarma · 2h 18m</span>
            </div>
            <Badge tone="ok">Cerrado</Badge>
          </div>
          <div className="vk-mock-sec">
            <div className="vk-mock-label">Vitales registrados — 4 operadores</div>
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

export function CommercialOffline() {
  return (
    <section className="vk-section surf">
      <div className="vk-container">
        <div data-reveal="left">
          <Tag>Operación en terreno</Tag>
          <h2 style={{ marginTop: 16 }}>
            Opera sin señal.<br />
            <em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>Sincroniza después.</em>
          </h2>
        </div>
        <div className="vk-off-stages">
          <div className="vk-off-stage active" data-reveal="scale" style={{ '--d': '0s' } as React.CSSProperties}>
            <div className="vk-off-n">01 · CAMPO</div>
            <h4>Emergencia activa</h4>
            <div className="vk-off-tag offline">Sin conexión externa · Operativo</div>
          </div>
          <div className="vk-off-arrow"><Icon name="arrowRight" size={20} /></div>
          <div className="vk-off-stage" data-reveal="scale" style={{ '--d': '0.12s' } as React.CSSProperties}>
            <div className="vk-off-n">02 · MANDO LOCAL</div>
            <h4>Panel táctico en terreno</h4>
            <div className="vk-off-tag act">Coordinación activa · Tiempo real</div>
          </div>
          <div className="vk-off-arrow"><Icon name="arrowRight" size={20} /></div>
          <div className="vk-off-stage" data-reveal="scale" style={{ '--d': '0.24s' } as React.CSSProperties}>
            <div className="vk-off-n">03 · POST-INCIDENTE</div>
            <h4>Sincronización automática</h4>
            <div className="vk-off-tag sync">Registro sincronizado · Auditable</div>
          </div>
        </div>
      </div>
    </section>
  )
}

const CASES_AUD = [
  {
    icon: 'fire'    as const,
    title: 'Cuerpos de Bomberos',
    bullets: ['Monitoreo en vivo de bomberos en emergencia', 'Historial completo de incidentes', 'Respaldo de decisiones y operaciones'],
  },
  {
    icon: 'factory' as const,
    title: 'Brigadas industriales',
    bullets: ['Protección de personal en terreno', 'Alertas críticas en tiempo real', 'Reportes operacionales para mejora continua'],
  },
  {
    icon: 'rescue'  as const,
    title: 'Equipos de respuesta',
    bullets: ['Coordinación más eficiente en terreno', 'Visibilidad del personal desplegado', 'Registro operativo para análisis posterior'],
  },
]

export function CommercialCases() {
  return (
    <section className="vk-section" id="casos">
      <div className="vk-container">
        <div data-reveal>
          <Tag>Para quién es VIGÍA</Tag>
          <h2 style={{ marginTop: 16 }}>Construido para quienes<br />operan bajo presión.</h2>
        </div>
        <div className="vk-pq-grid">
          {CASES_AUD.map((a, i) => (
            <div
              className="vk-pq-card"
              key={a.title}
              data-reveal="scale"
              style={{ '--d': (i * 0.1) + 's' } as React.CSSProperties}
            >
              <div className="vk-pq-ico"><Icon name={a.icon} /></div>
              <h3>{a.title}</h3>
              <div className="vk-pq-bullets">
                {a.bullets.map(b => <div className="vk-pq-bullet" key={b}>{b}</div>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const TRUST_PILLARS = [
  { tag: 'Continuidad de mando', title: 'La operación no queda a oscuras',   body: 'Visibilidad crítica del personal incluso en escenarios complejos.' },
  { tag: 'Trazabilidad total',   title: 'Cada decisión queda respaldada',     body: 'Registro claro y auditable para revisión posterior.' },
  { tag: 'Visibilidad en vivo',  title: 'El estado del personal, claro',      body: 'Alertas y condición operacional en una sola vista.' },
  { tag: 'Coordinación',         title: 'Una sola fuente de verdad',           body: 'Menos incertidumbre. Decisiones más rápidas.' },
]

export function CommercialTrust() {
  return (
    <section className="vk-section surf">
      <div className="vk-container">
        <div style={{ textAlign: 'center', marginBottom: 8 }} data-reveal>
          <Tag center>Desde la experiencia de terreno</Tag>
        </div>
        <div className="vk-trust-quote" data-reveal>
          Menos ruido.<br />Más <em>información útil</em> para decidir.
        </div>
        <div className="vk-pillars">
          {TRUST_PILLARS.map((p, i) => (
            <div
              className="vk-pillar"
              key={p.title}
              data-reveal="scale"
              style={{ '--d': (i * 0.08) + 's' } as React.CSSProperties}
            >
              <div className="vk-pillar-tag">{p.tag}</div>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function CommercialContact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const f = e.currentTarget
    const get = (name: string) => (f.elements.namedItem(name) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null)?.value ?? ''
    const body = {
      nombre: get('nombre'),
      cargo: get('cargo'),
      org: get('org'),
      email: get('email'),
      tel: get('tel'),
      operadores: get('operadores'),
      mensaje: get('mensaje'),
      _hp: '',
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (res.ok) {
        setSent(true)
      } else {
        setError('Error al enviar. Por favor intenta de nuevo.')
      }
    } catch {
      setError('Error de conexión. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="vk-section" id="contacto">
      <div className="vk-container vk-contact-grid">

        <div className="vk-contact-lead" data-reveal="left">
          <Tag>Evaluar implementación</Tag>
          <h2 style={{ marginTop: 16 }}>Inteligencia operacional para tu organización.</h2>
          <p>Conversemos sobre cómo VIGÍA puede apoyar la seguridad, coordinación y trazabilidad de tus operaciones.</p>
          <div className="vk-checks">
            <div className="vk-check"><span className="d">●</span> Respuesta en menos de 48 horas</div>
            <div className="vk-check"><span className="d">●</span> Demo a medida según tu institución</div>
            <div className="vk-check"><span className="d">●</span> Evaluación de escenario operacional</div>
          </div>
        </div>

        <div className="vk-form" data-reveal="right">
          <Corners />
          {sent ? (
            <div className="vk-success">
              <div className="ico">✓</div>
              <h3>Solicitud recibida</h3>
              <p>Nos pondremos en contacto en las próximas 48 horas para coordinar la demostración.</p>
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
              <div style={{ marginBottom: 24 }}><Tag>Solicitar información · Demo</Tag></div>
              <form onSubmit={submit}>
                <div className="vk-form-row">
                  <label className="vg-field">
                    <span>Nombre</span>
                    <input name="nombre" required placeholder="Nombre completo" disabled={loading} />
                  </label>
                  <label className="vg-field">
                    <span>Cargo</span>
                    <input name="cargo" placeholder="Ej. Capitán, Jefe de Brigada" disabled={loading} />
                  </label>
                </div>
                <label className="vg-field">
                  <span>Organización</span>
                  <input name="org" required placeholder="Cuerpo de Bomberos / Empresa / Institución" disabled={loading} />
                </label>
                <div className="vk-form-row">
                  <label className="vg-field">
                    <span>Correo</span>
                    <input name="email" type="email" required placeholder="correo@institución.cl" disabled={loading} />
                  </label>
                  <label className="vg-field">
                    <span>Teléfono</span>
                    <input name="tel" placeholder="+56 9 XXXX XXXX" disabled={loading} />
                  </label>
                </div>
                <label className="vg-field">
                  <span>Cantidad de operadores</span>
                  <select name="operadores" disabled={loading} defaultValue="">
                    <option value="">Seleccionar</option>
                    <option>1 – 10 operadores</option>
                    <option>11 – 30 operadores</option>
                    <option>31 – 80 operadores</option>
                    <option>Más de 80 operadores</option>
                  </select>
                </label>
                <label className="vg-field">
                  <span>Mensaje (opcional)</span>
                  <textarea name="mensaje" placeholder="Cuéntanos sobre tu institución o contexto operacional…" disabled={loading} />
                </label>
                {error && (
                  <p style={{ color: 'var(--red-b)', fontFamily: 'var(--font-m)', fontSize: 12, marginBottom: 8 }}>{error}</p>
                )}
                <button
                  type="submit"
                  className="vg-btn vg-btn-red vg-btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  disabled={loading}
                >
                  {loading ? 'Enviando…' : <><span>Enviar solicitud</span> <Icon name="arrow" /></>}
                </button>
                <div className="vk-form-micro">Te contactaremos en menos de 48 horas para coordinar una reunión breve.</div>
              </form>
            </>
          )}
        </div>

      </div>
    </section>
  )
}

export function CommercialFooter({ onContact }: { onContact: () => void }) {
  return (
    <footer className="vk-footer">
      <div className="vk-container">
        <div className="vk-footer-inner">
          <div className="vk-footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo-vigia.png" alt="VIGÍA" style={{ width: 30, height: 30, objectFit: 'contain' }} />
              <span style={{ fontFamily: 'var(--font-h)', fontSize: '1.15rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                VIGÍA
              </span>
            </div>
            <p>Plataforma de monitoreo táctico para bomberos, brigadas industriales y equipos de emergencia.</p>
            <div className="vk-footer-domain">vigiacommand.cl</div>
          </div>
          <div className="vk-footer-links">
            <div className="vk-footer-col">
              <h4>Plataforma</h4>
              <a onClick={() => go('solucion')} style={{ cursor: 'pointer' }}>Solución</a>
              <a onClick={() => go('como-funciona')} style={{ cursor: 'pointer' }}>Cómo funciona</a>
              <a onClick={() => go('casos')} style={{ cursor: 'pointer' }}>Casos de uso</a>
            </div>
            <div className="vk-footer-col">
              <h4>Contacto</h4>
              <a onClick={onContact} style={{ cursor: 'pointer' }}>CONVERSEMOS</a>
              <a href="mailto:contacto@vigiacommand.cl">contacto@vigiacommand.cl</a>
            </div>
            <div className="vk-footer-col">
              <h4>Sistema</h4>
              <a href="https://mando.vigiacommand.cl" target="_blank" rel="noopener noreferrer">Ingresar al panel</a>
            </div>
          </div>
        </div>
        <div className="vk-footer-bottom">
          <span>© 2026 VIGÍA. Todos los derechos reservados.</span>
          <span style={{ fontFamily: 'var(--font-m)' }}>Diseñado para quienes responden.</span>
        </div>
      </div>
    </footer>
  )
}
