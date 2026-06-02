'use client'

import Image from 'next/image'

type Screen = {
  label: string
  desc: string
  src?: string
  alt: string
}

const screens: Screen[] = [
  {
    label: 'Historial de incidentes',
    desc: 'Registro completo de cada emergencia: duración, alertas, estado y acceso a la Caja Negra sincronizada.',
    alt: 'Vista de historial de incidentes en el panel de mando VIGÍA',
  },
  {
    label: 'Caja Negra',
    desc: 'Snapshot inmutable generado al cierre del incidente. Vitales por bombero, asignaciones y timeline de eventos.',
    alt: 'Vista de Caja Negra con detalle de snapshot de incidente en VIGÍA',
  },
  {
    label: 'Operadores en tiempo real',
    desc: 'Estado de escena, frecuencia cardíaca y señal de cada operador durante el incidente. Visible desde el mando.',
    alt: 'Vista de operadores con estado biométrico en tiempo real en VIGÍA',
  },
]

export default function ProductShowcase() {
  return (
    <section className="showcase-section" id="producto">
      <div className="container">
        <div className="showcase-header reveal">
          <div className="tag">Plataforma de mando</div>
          <h2>Lo que el mando ve en pantalla.</h2>
          <p className="showcase-sub">
            Panel web accesible desde cualquier dispositivo. Sincroniza con el equipo de campo
            en tiempo real cuando hay conectividad, y recibe la Caja Negra al cierre del incidente.
          </p>
        </div>

        <div className="showcase-grid">
          {screens.map((s, i) => (
            <div key={s.label} className={`showcase-item reveal d${i}`}>
              <div className="showcase-frame">
                {s.src ? (
                  <Image src={s.src} alt={s.alt} fill style={{ objectFit: 'cover', borderRadius: 8 }} />
                ) : (
                  <div className="showcase-placeholder">
                    <span className="showcase-placeholder-label">{s.label}</span>
                    <span className="showcase-placeholder-hint">Captura de pantalla próximamente</span>
                  </div>
                )}
              </div>
              <div className="showcase-caption">
                <p className="showcase-caption-title">{s.label}</p>
                <p className="showcase-caption-body">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
