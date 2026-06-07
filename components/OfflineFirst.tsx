export default function OfflineFirst() {
  return (
    <section className="offline-section" id="offline-first">
      <div className="container">
        <div className="reveal">
          <div className="tag">Operación en terreno</div>
          <h2>Opera sin señal.<br/><em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>Sincroniza después.</em></h2>
        </div>

        <div className="offline-stages reveal d1">

          <div className="offline-stage stage-active">
            <div className="offline-stage-num">01 · CAMPO</div>
            <h4>Emergencia activa</h4>
            <div className="offline-stage-tag tag-offline">Sin conexión externa · Operativo</div>
          </div>

          <div className="offline-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="offline-stage">
            <div className="offline-stage-num">02 · MANDO LOCAL</div>
            <h4>Panel táctico en terreno</h4>
            <div className="offline-stage-tag tag-active">Coordinación activa · Tiempo real</div>
          </div>

          <div className="offline-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="offline-stage">
            <div className="offline-stage-num">03 · POST-INCIDENTE</div>
            <h4>Sincronización automática</h4>
            <div className="offline-stage-tag tag-sync">Registro sincronizado · Auditable</div>
          </div>

        </div>
      </div>
    </section>
  )
}
