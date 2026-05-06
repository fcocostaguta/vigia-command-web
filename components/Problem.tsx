import Icon from './Icons'

export default function Problem() {
  return (
    <section className="problem-section">
      <div className="container">
        <div className="reveal">
          <div className="tag">El problema</div>
          <h2>En terreno, decidir tarde<br/>puede costar caro.</h2>
          <p style={{ color: 'var(--muted)', marginTop: 14, maxWidth: 500, fontSize: '0.97rem', lineHeight: 1.85 }}>
            El mando opera con información incompleta: no sabe con precisión quién está exigido,
            quién perdió señal o quién necesita rehabilitación.
          </p>
        </div>
        <div className="problem-grid reveal d1">
          <div className="problem-card" data-n="01">
            <div className="problem-icon">{Icon.eye}</div>
            <h3>Visibilidad limitada</h3>
            <p>El estado del personal no siempre es evidente desde el puesto de mando.</p>
          </div>
          <div className="problem-card" data-n="02">
            <div className="problem-icon">{Icon.bell}</div>
            <h3>Riesgo acumulado</h3>
            <p>Fatiga, calor y sobreesfuerzo pueden escalar sin que el mando lo detecte a tiempo.</p>
          </div>
          <div className="problem-card" data-n="03">
            <div className="problem-icon">{Icon.doc}</div>
            <h3>Sin registro de eventos</h3>
            <p>Después de la emergencia, cuesta reconstruir qué ocurrió y en qué momento se decidió.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
