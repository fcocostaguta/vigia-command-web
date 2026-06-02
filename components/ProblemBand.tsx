const ITEMS = [
  { n: '01', text: 'Sin visibilidad.',  tag: 'Personal en interior sin estado conocido' },
  { n: '02', text: 'Sin alerta.',       tag: 'Exigencia cardíaca crítica sin detección' },
  { n: '03', text: 'Sin registro.',     tag: 'Incidente terminado sin evidencia auditable' },
]

export default function ProblemBand() {
  return (
    <section className="pb-section">
      <div className="container">
        <div className="pb-items reveal">
          {ITEMS.map(i => (
            <div key={i.n} className="pb-item">
              <div className="pb-num">{i.n}</div>
              <div className="pb-main">{i.text}</div>
              <div className="pb-tag">{i.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
