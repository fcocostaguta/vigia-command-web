import Icon from './Icons'

const AUDIENCE = [
  {
    icon: Icon.fire,
    title: 'Cuerpos de Bomberos',
    bullets: [
      'Monitoreo en vivo de bomberos en emergencia',
      'Historial completo de incidentes',
      'Respaldo de decisiones y operaciones',
    ],
  },
  {
    icon: Icon.factory,
    title: 'Brigadas industriales',
    bullets: [
      'Protección de personal en terreno',
      'Alertas críticas en tiempo real',
      'Reportes operacionales para mejora continua',
    ],
  },
  {
    icon: Icon.rescue,
    title: 'Equipos de respuesta',
    bullets: [
      'Coordinación más eficiente en terreno',
      'Visibilidad del personal desplegado',
      'Registro operativo para análisis posterior',
    ],
  },
]

export default function Cases() {
  return (
    <section className="pq-section" id="para-quien">
      <div className="container">
        <div className="reveal">
          <div className="tag">Para quién es VIGÍA</div>
          <h2>Construido para quienes<br/>operan bajo presión.</h2>
        </div>
        <div className="pq-grid reveal d1">
          {AUDIENCE.map(a => (
            <div key={a.title} className="pq-card">
              <div className="pq-card-icon">{a.icon}</div>
              <h3>{a.title}</h3>
              <div className="pq-bullets">
                {a.bullets.map(b => (
                  <div key={b} className="pq-bullet">{b}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
