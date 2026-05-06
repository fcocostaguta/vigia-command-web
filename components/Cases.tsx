import Icon from './Icons'

const CASES = [
  {
    tag: 'Urbano',
    icon: Icon.fire,
    title: 'Incendios estructurales',
    body: 'Monitoreo de equipos en interior, control de exposición y rotación de personal en zonas de riesgo.',
  },
  {
    tag: 'Forestal',
    icon: Icon.forest,
    title: 'Emergencias forestales',
    body: 'Seguimiento de fatiga y esfuerzo prolongado en terreno abierto con personal distribuido.',
  },
  {
    tag: 'Industrial',
    icon: Icon.factory,
    title: 'Brigadas industriales',
    body: 'Seguridad operacional en entornos de alto riesgo con trazabilidad y auditoría de eventos.',
  },
  {
    tag: 'Operaciones',
    icon: Icon.rescue,
    title: 'Rescate y operaciones especiales',
    body: 'Apoyo al mando en escenarios complejos donde la visibilidad del personal es crítica.',
  },
]

export default function Cases() {
  return (
    <section className="cases-section" id="casos">
      <div className="container">
        <div className="reveal">
          <div className="tag">Casos de uso</div>
          <h2>Diseñado para operaciones<br/>donde cada segundo importa.</h2>
        </div>
        <div className="cases-grid reveal d1">
          {CASES.map(c => (
            <div key={c.title} className="case-card">
              <div className="case-tag">{c.tag}</div>
              <h3>{c.title}</h3>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
