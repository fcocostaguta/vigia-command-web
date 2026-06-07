export default function Trust() {
  const pillars = [
    {
      label: 'La operación no queda a oscuras',
      tag: 'Continuidad de mando',
    },
    {
      label: 'Cada decisión queda respaldada',
      tag: 'Trazabilidad total',
    },
    {
      label: 'El estado del personal, claro',
      tag: 'Visibilidad en vivo',
    },
    {
      label: 'Una sola fuente de verdad',
      tag: 'Coordinación',
    },
  ]

  return (
    <section className="trust-section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div className="tag" style={{ justifyContent: 'center' }}>Desde la experiencia de terreno</div>
          <div className="trust-quote">
            Menos ruido.<br/>Más <em>información útil</em> para decidir.
          </div>
        </div>

        <div className="trust-pillars reveal d1">
          {pillars.map((p) => (
            <div key={p.label} className="trust-pillar">
              <div className="trust-pillar-tag">{p.tag}</div>
              <h3 className="trust-pillar-title">{p.label}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
