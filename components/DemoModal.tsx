'use client'

import { useState } from 'react'

interface DemoModalProps {
  onClose: () => void
}

interface FormState {
  nombre:      string
  institucion: string
  email:       string
  telefono:    string
  mensaje:     string
}

export default function DemoModal({ onClose }: DemoModalProps) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormState>({
    nombre:      '',
    institucion: '',
    email:       '',
    telefono:    '',
    mensaje:     '',
  })

  const set = (key: keyof FormState, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal-bg" onClick={handleBackdrop}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          ✕
        </button>

        {!submitted ? (
          <>
            <div className="section-tag">Solicitar demo</div>
            <h3>Conversemos sobre VIGÍA</h3>
            <p className="modal-sub">
              Déjanos tus datos y coordinamos una demostración para tu institución.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    id="nombre"
                    type="text"
                    required
                    placeholder="Nombre completo"
                    value={form.nombre}
                    onChange={(e) => set('nombre', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="institucion">Institución</label>
                  <input
                    id="institucion"
                    type="text"
                    required
                    placeholder="Cuerpo de Bomberos / Municipio"
                    value={form.institucion}
                    onChange={(e) => set('institucion', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Correo</label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="correo@institución.cl"
                    value={form.email}
                    onChange={(e) => set('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="telefono">Teléfono (opcional)</label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+56 9 XXXX XXXX"
                    value={form.telefono}
                    onChange={(e) => set('telefono', e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="mensaje">¿Qué le interesa de VIGÍA?</label>
                <textarea
                  id="mensaje"
                  placeholder="Cuéntenos brevemente su contexto operacional..."
                  value={form.mensaje}
                  onChange={(e) => set('mensaje', e.target.value)}
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-red" style={{ flex: 1 }}>
                  Solicitar demo →
                </button>
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="modal-success">
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>✓</div>
            <h3>Solicitud recibida</h3>
            <p>
              Nos pondremos en contacto en las próximas 48 horas para coordinar la
              demostración.
            </p>
            <button className="btn btn-outline" onClick={onClose} style={{ marginTop: '24px' }}>
              Cerrar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
