export default function Trust() {
  const pillars = [
    {
      label: 'Operativo sin Internet',
      body: 'La operación táctica completa —BLE, MQTT, alertas, historial— corre en el equipo de campo sin depender de conectividad externa. Internet solo se usa para sincronizar el registro post-incidente.',
      tag: 'Arquitectura offline-first',
    },
    {
      label: 'Caja Negra de cada incidente',
      body: 'Al cerrar un incidente, el sistema genera un snapshot inmutable con vitales por bombero, asignaciones, timeline de eventos y metadatos de campo. Queda sincronizado al cloud y es auditable.',
      tag: 'Trazabilidad total',
    },
    {
      label: 'Biometría según NFPA 1582 / 1584',
      body: 'Los umbrales de frecuencia cardíaca, SpO₂, temperatura y tiempo en escena están calibrados según protocolo NFPA. El sistema identifica condición crítica y genera alerta en tiempo real.',
      tag: 'Protocolo validado',
    },
    {
      label: 'Validado en hardware de campo',
      body: 'Probado en Raspberry Pi 4 con sensores BLE (Polar H10, ESP32) y comunicación LoRa. El stack completo funciona en condiciones reales, no solo en simulación.',
      tag: 'Hardware real',
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
