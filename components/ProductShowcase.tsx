'use client'

const HistorialMock = () => (
  <div className="screen-mock">
    <div className="sm-header">
      <span className="sm-title">Historial de incidentes</span>
      <span style={{ fontFamily: 'var(--font-m)', fontSize: 9, color: 'var(--faint)' }}>12 registros</span>
    </div>
    <div className="sm-body">
      <div className="sm-th">
        <span>#</span>
        <span>Incidente</span>
        <span>Oper.</span>
        <span>Dur.</span>
        <span>Estado</span>
      </div>
      {[
        { id: '042', name: 'Incendio estructural', ops: '4', dur: '2h 18m', closed: true },
        { id: '041', name: 'Emergencia forestal',  ops: '7', dur: '4h 02m', closed: true },
        { id: '040', name: 'Rescate industrial',   ops: '3', dur: '0h 44m', closed: true },
        { id: '039', name: 'Incendio estructural', ops: '5', dur: '1h 31m', closed: true },
        { id: '038', name: 'Emergencia forestal',  ops: '6', dur: '3h 12m', closed: true },
      ].map(r => (
        <div key={r.id} className="sm-tr">
          <span className="sm-cell sm-cell-id">{r.id}</span>
          <span className="sm-cell sm-cell-name">{r.name}</span>
          <span className="sm-cell">{r.ops}</span>
          <span className="sm-cell" style={{ fontFamily: 'var(--font-m)' }}>{r.dur}</span>
          <span className="status-badge s-ok" style={{ fontSize: 8, padding: '2px 6px' }}>Cerrado</span>
        </div>
      ))}
    </div>
  </div>
)

const CajaNegraMock = () => (
  <div className="screen-mock">
    <div className="sm-header">
      <div>
        <span className="sm-title">Snapshot #042</span>
        <span style={{ fontFamily: 'var(--font-m)', fontSize: 8, color: 'var(--faint)', marginLeft: 8 }}>Incendio estructural · 2h 18m</span>
      </div>
      <span className="status-badge s-ok" style={{ fontSize: 8, padding: '2px 6px' }}>Cerrado</span>
    </div>
    <div className="sm-body">
      <div className="sm-snap">
        <div className="sm-snap-label">Vitales por operador</div>
        {[
          { name: 'Cap. Rojas',  id: 'B-01', bpm: '142', cls: 'bpm-ok',   status: 'Normal', sCls: 's-ok' },
          { name: 'Tte. Muñoz', id: 'B-02', bpm: '181', cls: 'bpm-crit', status: 'Alerta',  sCls: 's-crit' },
          { name: 'Vol. Pérez',  id: 'B-03', bpm: '136', cls: 'bpm-ok',   status: 'Normal', sCls: 's-ok' },
          { name: 'Bbro. Soto', id: 'B-04', bpm: '176', cls: 'bpm-warn',  status: 'Rehab.', sCls: 's-rehab' },
        ].map(op => (
          <div key={op.id} className="sm-snap-op">
            <span style={{ color: 'var(--text)', fontWeight: 500 }}>{op.name}</span>
            <span style={{ color: 'var(--faint)', fontSize: 8 }}>{op.id}</span>
            <span className={`tt-bpm ${op.cls}`} style={{ fontSize: 10 }}>{op.bpm}</span>
            <span className={`status-badge ${op.sCls}`} style={{ fontSize: 8, padding: '2px 5px' }}>{op.status}</span>
          </div>
        ))}
        <div className="sm-snap-label" style={{ marginTop: 10 }}>Timeline</div>
        {[
          { t: '14:05', txt: 'Incidente iniciado' },
          { t: '14:11', txt: 'Alerta BPM — Tte. Muñoz' },
          { t: '14:19', txt: 'Soto a rehabilitación' },
          { t: '14:23', txt: 'Incidente cerrado' },
        ].map(ev => (
          <div key={ev.t} className="sm-snap-evt">
            <span className="sm-snap-evt-t">{ev.t}</span>
            <span className="sm-snap-evt-body">{ev.txt}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const OperadoresMock = () => (
  <div className="screen-mock">
    <div className="sm-header">
      <span className="sm-title">Operadores en escena</span>
      <span className="sm-live">En vivo</span>
    </div>
    <div className="sm-body">
      <div className="sm-ops-grid">
        {[
          { id: 'B-01', rank: 'Cap.', name: 'Rojas',    bpm: 142, bCls: 'bpm-ok',   status: 'Operativo',  sCls: 's-ok',    alert: false },
          { id: 'B-02', rank: 'Tte.', name: 'Muñoz',    bpm: 168, bCls: 'bpm-crit', status: 'Exigido',    sCls: 's-warn',  alert: true  },
          { id: 'B-03', rank: 'Vol.', name: 'Pérez',    bpm: 118, bCls: 'bpm-ok',   status: 'Disponible', sCls: 's-ok',    alert: false },
          { id: 'B-04', rank: 'Bbro.',name: 'Soto',     bpm: 104, bCls: 'bpm-ok',   status: 'Rehab.',     sCls: 's-rehab', alert: false },
        ].map(op => (
          <div key={op.id} className={`sm-op-card${op.alert ? ' alert-op' : ''}`}>
            <div className="sm-op-id">{op.rank} {op.id}</div>
            <div className="sm-op-name">{op.name}</div>
            <div className={`sm-op-bpm ${op.bCls}`}>{op.bpm} <span style={{ fontSize: 8, opacity: 0.6 }}>bpm</span></div>
            <div className={`sm-op-status ${op.sCls}`} style={{ color: op.alert ? 'var(--red-b)' : op.sCls === 's-ok' ? 'var(--green)' : 'var(--amber)' }}>
              {op.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)

const SCREENS = [
  {
    label: 'Historial de incidentes',
    desc: 'Estado, duración y acceso a Caja Negra por incidente.',
    Mock: HistorialMock,
  },
  {
    label: 'Caja Negra',
    desc: 'Vitales, alertas y timeline inmutables al cierre.',
    Mock: CajaNegraMock,
  },
  {
    label: 'Operadores en vivo',
    desc: 'Estado biométrico del personal en escena, en tiempo real.',
    Mock: OperadoresMock,
  },
]

export default function ProductShowcase() {
  return (
    <section className="showcase-section" id="producto">
      <div className="container">
        <div className="showcase-header reveal">
          <div className="tag">Plataforma de mando</div>
          <h2>Lo que el mando ve en pantalla.</h2>
        </div>

        <div className="showcase-grid">
          {SCREENS.map((s, i) => (
            <div key={s.label} className={`showcase-item reveal d${i}`}>
              <div className="showcase-frame">
                <s.Mock />
              </div>
              <div className="showcase-caption">
                <p className="showcase-caption-title">{s.label}</p>
                <p className="showcase-caption-body">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
