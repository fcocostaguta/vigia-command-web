export default function CajaNegra() {
  return (
    <section className="cbn-section" id="caja-negra">
      <div className="container">
        <div className="cbn-grid">

          <div className="cbn-lead reveal">
            <div className="tag">Diferenciador central</div>
            <h2>La emergencia deja<br/><em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>registro automático.</em></h2>
            <div className="cbn-bullets">
              <div className="cbn-bullet"><strong>Snapshot inmutable por incidente</strong></div>
              <div className="cbn-bullet"><strong>Historial auditable posterior al incidente</strong></div>
              <div className="cbn-bullet"><strong>Base para mejora y aprendizaje operacional</strong></div>
            </div>
          </div>

          <div className="reveal d1">
            <div className="cbn-mock">
              <div className="cbn-mock-topbar">
                <div>
                  <span className="cbn-mock-id">SNAPSHOT #0042</span>
                  <span className="cbn-mock-type" style={{ marginLeft: 10 }}>Incendio estructural · 2ª alarma · 2h 18m</span>
                </div>
                <span className="cbn-mock-closed">Cerrado</span>
              </div>

              <div className="cbn-mock-section">
                <div className="cbn-mock-label">Vitales registrados — 4 operadores</div>
                <div className="cbn-mock-op-row">
                  <span className="cbn-mock-op-name">Cap. Rojas</span>
                  <span className="cbn-mock-op-id">B-01</span>
                  <span className="cbn-mock-bpm bpm-ok">142 bpm</span>
                  <span className="status-badge s-ok">Normal</span>
                </div>
                <div className="cbn-mock-op-row">
                  <span className="cbn-mock-op-name">Tte. Muñoz</span>
                  <span className="cbn-mock-op-id">B-02</span>
                  <span className="cbn-mock-bpm bpm-crit">181 bpm</span>
                  <span className="status-badge s-crit">Alerta</span>
                </div>
                <div className="cbn-mock-op-row">
                  <span className="cbn-mock-op-name">Vol. Pérez</span>
                  <span className="cbn-mock-op-id">B-03</span>
                  <span className="cbn-mock-bpm bpm-ok">136 bpm</span>
                  <span className="status-badge s-ok">Normal</span>
                </div>
                <div className="cbn-mock-op-row">
                  <span className="cbn-mock-op-name">Bbro. Soto</span>
                  <span className="cbn-mock-op-id">B-04</span>
                  <span className="cbn-mock-bpm bpm-warn">176 bpm</span>
                  <span className="status-badge s-rehab">Rehab.</span>
                </div>
              </div>

              <div className="cbn-mock-section">
                <div className="cbn-mock-label">Timeline de eventos</div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:02</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Alerta inicial — 2ª alarma confirmada</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:05</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Personal desplegado — 4 operadores en escena</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:07</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Monitoreo iniciado — vitales activos</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:11</span>
                  <span className="cbn-event-dot warn">⚠</span>
                  <span className="cbn-event-text">Alerta biométrica — Tte. Muñoz (181 bpm)</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:19</span>
                  <span className="cbn-event-dot warn">⚠</span>
                  <span className="cbn-event-text">Rehabilitación — Bbro. Soto retirado de escena</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">15:44</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Recuperación — Tte. Muñoz normalizado</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">16:23</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Registro cerrado — snapshot generado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
