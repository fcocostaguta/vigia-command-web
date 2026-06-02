import Icon from './Icons'

const AUDIENCE = [
  {
    icon: Icon.fire,
    title: 'Cuerpos de Bomberos',
    bullets: [
      'Monitoreo en interior de estructura',
      'Alertas cardíacas en tiempo real',
      'Registro de rotación y exposición',
      'Caja Negra por incidente',
    ],
  },
  {
    icon: Icon.factory,
    title: 'Brigadas industriales',
    bullets: [
      'Trazabilidad operacional automática',
      'Protocolo NFPA integrado',
      'Evidencia auditable para informes',
      'Operación sin internet en campo',
    ],
  },
  {
    icon: Icon.rescue,
    title: 'Equipos de respuesta',
    bullets: [
      'Funcional sin señal en terreno',
      'Visibilidad de personal distribuido',
      'Alertas críticas sin radio',
      'Historial para evaluación táctica',
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
