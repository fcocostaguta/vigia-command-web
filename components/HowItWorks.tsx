import Icon from './Icons'

const NODES = [
  {
    num: '01 · SENSOR',
    icon: Icon.pulse,
    title: 'Dispositivo en el operador',
    body: 'Captura frecuencia cardíaca, SpO₂ y estado en tiempo real durante la emergencia.',
    tag: 'BLE · LoRa',
    active: true,
  },
  {
    num: '02 · GATEWAY',
    icon: Icon.gateway,
    title: 'Field Server',
    body: 'Concentra señales desde múltiples dispositivos. Alimenta el mando local sin internet.',
    tag: 'Raspberry Pi · MQTT',
    active: false,
  },
  {
    num: '03 · MANDO',
    icon: Icon.screen,
    title: 'Panel táctico',
    body: 'El mando ve estados, alertas priorizadas y eventos críticos desde una sola interfaz.',
    tag: 'Tiempo real · Alertas',
    active: false,
  },
  {
    num: '04 · HISTORIAL',
    icon: Icon.doc,
    title: 'Caja Negra al cloud',
    body: 'Al cerrar el incidente, el snapshot completo se sincroniza y queda disponible para auditoría.',
    tag: 'Post-incidente · Cloud',
    active: false,
  },
]

export default function HowItWorks() {
  return (
    <section className="how-section" id="como-funciona">
      <div className="container">
        <div className="reveal">
          <div className="tag">Cómo funciona</div>
          <h2>Del sensor al historial,<br/>un flujo continuo.</h2>
        </div>
        <div className="how-flow reveal d1">
          {NODES.map(n => (
            <div key={n.num} className="how-node">
              <div className="how-node-num">{n.num}</div>
              <div className={`how-node-icon${n.active ? ' active' : ''}`}>{n.icon}</div>
              <h4>{n.title}</h4>
              <p>{n.body}</p>
              <div className="how-node-tag">{n.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
