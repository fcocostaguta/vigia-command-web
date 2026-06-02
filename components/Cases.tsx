import Icon from './Icons'

const AUDIENCE = [
  {
    icon: Icon.fire,
    title: 'Cuerpos de Bomberos',
    sub: 'Compañías y brigadas que operan en incendios estructurales, forestales y emergencias urbanas.',
    bullets: [
      'Monitoreo de personal en interior de estructura',
      'Alertas de sobreexigencia cardíaca en tiempo real',
      'Registro de rotación y tiempos de exposición',
      'Caja Negra de cada incidente para revisión posterior',
    ],
  },
  {
    icon: Icon.factory,
    title: 'Brigadas industriales',
    sub: 'Equipos HSE en minería, energía, puertos, plantas y operaciones de alto riesgo.',
    bullets: [
      'Trazabilidad operacional con registro automático',
      'Cumplimiento de protocolos de seguridad NFPA',
      'Evidencia auditable para informes internos',
      'Operación sin internet en zonas industriales',
    ],
  },
  {
    icon: Icon.rescue,
    title: 'Equipos de respuesta',
    sub: 'Rescate, protección civil y operaciones especiales en zonas sin conectividad confiable.',
    bullets: [
      'Sistema funcional sin señal de internet en terreno',
      'Visibilidad del personal distribuido en zona',
      'Alertas de estado crítico sin depender de radio',
      'Historial de operaciones para evaluación táctica',
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
              <p>{a.sub}</p>
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
