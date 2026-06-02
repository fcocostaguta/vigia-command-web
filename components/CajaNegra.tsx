export default function CajaNegra() {
  return (
    <section className="cbn-section" id="caja-negra">
      <div className="container">
        <div className="cbn-grid">

          <div className="cbn-lead reveal">
            <div className="tag">Diferenciador central</div>
            <h2>La emergencia deja<br/><em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>registro automático.</em></h2>
            <p>
              Al cerrar cada incidente, VIGÍA genera un snapshot inmutable con todo lo que ocurrió:
              vitales del personal, alertas, asignaciones y timeline completo de eventos.
              Queda sincronizado al cloud y es auditable en cualquier momento.
            </p>
            <div className="cbn-bullets">
              <div className="cbn-bullet">
                <div>
                  <strong>Snapshot por incidente</strong>
                  Cada emergencia genera un registro cerrado con todos los datos del personal desplegado.
                </div>
              </div>
              <div className="cbn-bullet">
                <div>
                  <strong>Historial auditeable</strong>
                  Accede al detalle de cualquier incidente pasado desde el panel de mando cloud.
                </div>
              </div>
              <div className="cbn-bullet">
                <div>
                  <strong>Base para mejora continua</strong>
                  Revisa qué alertas se activaron, quién requirió rehabilitación y qué decisiones se tomaron.
                </div>
              </div>
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
                  <span className="cbn-event-time">14:05</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Incidente iniciado — 4 operadores desplegados</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:11</span>
                  <span className="cbn-event-dot warn">⚠</span>
                  <span className="cbn-event-text">Alerta BPM — Tte. Muñoz (181 bpm)</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:19</span>
                  <span className="cbn-event-dot warn">⚠</span>
                  <span className="cbn-event-text">Bbro. Soto enviado a rehabilitación</span>
                </div>
                <div className="cbn-event-row">
                  <span className="cbn-event-time">14:23</span>
                  <span className="cbn-event-dot ok">●</span>
                  <span className="cbn-event-text">Incidente cerrado — snapshot generado</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
