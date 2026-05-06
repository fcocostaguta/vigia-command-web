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
}

export default function Contact({ formRef }: { formRef: MutableRefObject<HTMLElement | null> }) {
  const [sent, setSent] = useState(false)
  const [f, setF] = useState<FormState>({
    nombre: '', cargo: '', org: '', email: '', tel: '', operadores: '', mensaje: '',
  })
  const set = (k: keyof FormState, v: string) => setF(p => ({ ...p, [k]: v }))
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSent(true) }

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
                    <div className="form-row">
                      <div className="fg">
                        <label>Nombre</label>
                        <input type="text" required placeholder="Nombre completo" value={f.nombre} onChange={e => set('nombre', e.target.value)} />
                      </div>
                      <div className="fg">
                        <label>Cargo</label>
                        <input type="text" placeholder="Ej. Capitán, Jefe de Brigada" value={f.cargo} onChange={e => set('cargo', e.target.value)} />
                      </div>
                    </div>
                    <div className="fg">
                      <label>Organización</label>
                      <input type="text" required placeholder="Cuerpo de Bomberos / Empresa / Institución" value={f.org} onChange={e => set('org', e.target.value)} />
                    </div>
                    <div className="form-row">
                      <div className="fg">
                        <label>Correo</label>
                        <input type="email" required placeholder="correo@institución.cl" value={f.email} onChange={e => set('email', e.target.value)} />
                      </div>
                      <div className="fg">
                        <label>Teléfono</label>
                        <input type="tel" placeholder="+56 9 XXXX XXXX" value={f.tel} onChange={e => set('tel', e.target.value)} />
                      </div>
                    </div>
                    <div className="fg">
                      <label>Cantidad de operadores</label>
                      <select value={f.operadores} onChange={e => set('operadores', e.target.value)}>
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
                        placeholder="Cuéntanos sobre tu institución o contexto operacional..."
                        value={f.mensaje}
                        onChange={e => set('mensaje', e.target.value)}
                      ></textarea>
                    </div>
                    <div className="form-submit">
                      <button type="submit" className="btn btn-red btn-lg">
                        Enviar solicitud {Icon.arrow}
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
                  <button className="btn btn-ghost" style={{ marginTop: 24 }} onClick={() => setSent(false)}>
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
