export default function OfflineFirst() {
  return (
    <section className="offline-section" id="offline-first">
      <div className="container">
        <div className="reveal">
          <div className="tag">Arquitectura de campo</div>
          <h2>Opera aunque no haya<br/><em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>internet.</em></h2>
          <p className="offline-sub">
            La operación táctica completa corre en el equipo de campo sin depender de conectividad externa.
            Internet se usa solo para sincronizar el registro al cierre del incidente.
          </p>
        </div>

        <div className="offline-stages reveal d1">

          <div className="offline-stage stage-active">
            <div className="offline-stage-num">01 · CAMPO</div>
            <h4>Emergencia activa</h4>
            <p>
              El field server opera de forma autónoma. Recibe señales de los sensores por BLE/LoRa
              y alimenta el panel de mando local sin necesitar conexión a internet.
            </p>
            <div className="offline-stage-tag tag-offline">Sin internet · Operativo</div>
          </div>

          <div className="offline-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="offline-stage">
            <div className="offline-stage-num">02 · MANDO LOCAL</div>
            <h4>Panel táctico en terreno</h4>
            <p>
              El mando visualiza el estado del personal, recibe alertas y registra eventos críticos
              en tiempo real desde el dispositivo de campo.
            </p>
            <div className="offline-stage-tag tag-active">BLE · LoRa · MQTT local</div>
          </div>

          <div className="offline-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          <div className="offline-stage">
            <div className="offline-stage-num">03 · POST-INCIDENTE</div>
            <h4>Sincronización automática</h4>
            <p>
              Al restaurarse la conectividad, VIGÍA sincroniza el registro completo al cloud
              y genera el snapshot inmutable del incidente.
            </p>
            <div className="offline-stage-tag tag-sync">Sync · Caja Negra al cloud</div>
          </div>

        </div>
      </div>
    </section>
  )
}
