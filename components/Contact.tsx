'use client'

import { useState, MutableRefObject } from 'react'
import Icon from './Icons'

type FormState = {
  nombre: string
  cargo: string
  org: string
  email: string
  tel: string
  operadores: string
  mensaje: string
  _hp: string
}

const INITIAL: FormState = { nombre: '', cargo: '', org: '', email: '', tel: '', operadores: '', mensaje: '', _hp: '' }

export default function Contact({ formRef }: { formRef: MutableRefObject<HTMLElement | null> }) {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [f, setF] = useState<FormState>(INITIAL)
  const set = (k: keyof FormState, v: string) => setF(p => ({ ...p, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Error al enviar. Intenta de nuevo.')
      } else {
        setSent(true)
      }
    } catch {
      setError('Error de conexión. Verifica tu red e intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      className="contact-section"
      id="contacto"
      ref={formRef as React.RefObject<HTMLElement>}
    >
      <div className="container">
        <div className="contact-grid">
          <div className="contact-lead reveal">
            <div className="tag">Evaluar implementación</div>
            <h2>Inteligencia operacional para tu organización.</h2>
            <p>
              Conversemos sobre cómo VIGÍA puede apoyar la seguridad, coordinación y
              trazabilidad de tus operaciones.
            </p>
            <div className="contact-lead-ctas">
              <div className="contact-check"><span className="dot">●</span> Respuesta en menos de 48 horas</div>
              <div className="contact-check"><span className="dot">●</span> Demo a medida según tu institución</div>
              <div className="contact-check"><span className="dot">●</span> Evaluación de escenario de piloto</div>
            </div>
          </div>

          <div className="reveal d1">
            <div className="contact-form">
              {!sent ? (
                <>
                  <div className="tag form-tag">Solicitar información · Piloto</div>
                  <form onSubmit={handleSubmit}>
                    {/* Honeypot — hidden from users, bots fill it; server silently discards on _hp present */}
                    <input
                      type="text"
                      name="_hp"
                      value={f._hp}
                      onChange={e => set('_hp', e.target.value)}
                      autoComplete="off"
                      tabIndex={-1}
                      aria-hidden="true"
                      style={{ display: 'none' }}
                    />

                    <div className="form-row">
                      <div className="fg">
                        <label>Nombre</label>
                        <input type="text" required maxLength={120} placeholder="Nombre completo" value={f.nombre} onChange={e => set('nombre', e.target.value)} disabled={loading} autoComplete="name" />
                      </div>
                      <div className="fg">
                        <label>Cargo</label>
                        <input type="text" maxLength={120} placeholder="Ej. Capitán, Jefe de Brigada" value={f.cargo} onChange={e => set('cargo', e.target.value)} disabled={loading} autoComplete="organization-title" />
                      </div>
                    </div>
                    <div className="fg">
                      <label>Organización</label>
                      <input type="text" required maxLength={200} placeholder="Cuerpo de Bomberos / Empresa / Institución" value={f.org} onChange={e => set('org', e.target.value)} disabled={loading} autoComplete="organization" />
                    </div>
                    <div className="form-row">
                      <div className="fg">
                        <label>Correo</label>
                        <input type="email" required maxLength={254} placeholder="correo@institución.cl" value={f.email} onChange={e => set('email', e.target.value)} disabled={loading} autoComplete="email" />
                      </div>
                      <div className="fg">
                        <label>Teléfono</label>
                        <input type="tel" maxLength={30} placeholder="+56 9 XXXX XXXX" value={f.tel} onChange={e => set('tel', e.target.value)} disabled={loading} autoComplete="tel" />
                      </div>
                    </div>
                    <div className="fg">
                      <label>Cantidad de operadores</label>
                      <select value={f.operadores} onChange={e => set('operadores', e.target.value)} disabled={loading}>
                        <option value="">Seleccionar</option>
                        <option value="1-10">1 – 10 operadores</option>
                        <option value="11-30">11 – 30 operadores</option>
                        <option value="31-80">31 – 80 operadores</option>
                        <option value="80+">Más de 80 operadores</option>
                      </select>
                    </div>
                    <div className="fg">
                      <label>Mensaje (opcional)</label>
                      <textarea
                        maxLength={2000}
                        placeholder="Cuéntanos sobre tu institución o contexto operacional..."
                        value={f.mensaje}
                        onChange={e => set('mensaje', e.target.value)}
                        disabled={loading}
                      ></textarea>
                    </div>

                    {error && (
                      <div className="form-error">
                        {error}
                      </div>
                    )}

                    <div className="form-submit">
                      <button type="submit" className="btn btn-red btn-lg" disabled={loading}>
                        {loading ? 'Enviando...' : <>Enviar solicitud {Icon.arrow}</>}
                      </button>
                    </div>
                    <div className="form-micro">
                      Te contactaremos en menos de 48 horas para coordinar una reunión breve.
                    </div>
                  </form>
                </>
              ) : (
                <div className="form-success">
                  <div className="form-success-icon">✓</div>
                  <h3>Solicitud recibida</h3>
                  <p>Nos pondremos en contacto en las próximas 48 horas para coordinar la demostración.</p>
                  <button className="btn btn-ghost" style={{ marginTop: 24 }} onClick={() => { setSent(false); setF(INITIAL) }}>
                    Enviar otro mensaje
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
