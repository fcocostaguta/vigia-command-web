import Icon from './Icons'

const CASOS = [
  {
    tag: 'Urbano',
    icon: Icon.fire,
    title: 'Incendios estructurales',
    body: 'Monitoreo en interior, control de rotación y registro de exposición del personal en zona de riesgo.',
  },
  {
    tag: 'Forestal',
    icon: Icon.forest,
    title: 'Emergencias forestales',
    body: 'Seguimiento de fatiga y esfuerzo en terreno abierto con personal distribuido en zonas sin señal.',
  },
  {
    tag: 'Industrial',
    icon: Icon.factory,
    title: 'Brigadas industriales',
    body: 'Trazabilidad operacional y auditoría de eventos en entornos de alto riesgo con normativa interna.',
  },
]

export default function CasosDeUso() {
  return (
    <section className="ctx-section" id="casos">
      <div className="container">
        <div className="reveal">
          <div className="tag">Casos de uso</div>
          <h2>Diseñado para el terreno.</h2>
        </div>
        <div className="ctx-grid reveal d1">
          {CASOS.map(c => (
            <div key={c.title} className="ctx-card">
              <div className="ctx-tag">{c.tag}</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
