import Icon from './Icons'

export default function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona">
      <div className="container">
        <div className="reveal">
          <div className="tag">Cómo funciona</div>
          <h2>Del operador al mando,<br/>en segundos.</h2>
        </div>
        <div className="how-steps reveal d1">
          <div className="how-step">
            <div className="how-step-n">01 · SENSOR</div>
            <div className="how-step-icon">{Icon.pulse}</div>
            <h3>Dispositivo en el operador</h3>
            <p>Captura señales fisiológicas y estado en tiempo real durante la emergencia.</p>
            <div className="how-step-detail">Frecuencia cardíaca · Señal · Batería · Estado</div>
          </div>
          <div className="how-step">
            <div className="how-step-n">02 · GATEWAY</div>
            <div className="how-step-icon">{Icon.gateway}</div>
            <h3>Gateway táctico</h3>
            <p>Concentra la información desde los dispositivos y la transmite al panel, incluso con conectividad limitada.</p>
            <div className="how-step-detail">Operación offline · Transmisión robusta</div>
          </div>
          <div className="how-step">
            <div className="how-step-n">03 · MANDO</div>
            <div className="how-step-icon">{Icon.screen}</div>
            <h3>Panel VIGÍA Command</h3>
            <p>El mando visualiza operadores, alertas priorizadas y eventos críticos desde una sola interfaz.</p>
            <div className="how-step-detail">Vista unificada · Alertas · Registro</div>
          </div>
        </div>
      </div>
    </section>
  )
}
