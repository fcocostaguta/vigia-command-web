import { DEV_STATUS } from '@/lib/content'

export default function DevelopmentStatusSection() {
  return (
    <section className="devstatus section-pad" id="estado">
      <div className="container">
        <div className="reveal">
          <div className="section-tag">{DEV_STATUS.tag}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <h2>{DEV_STATUS.title}</h2>
            <div className="status-pill">{DEV_STATUS.status_label}</div>
          </div>
          <p
            style={{
              color: 'var(--col-muted)',
              marginTop: '16px',
              maxWidth: '620px',
              fontSize: '1rem',
              lineHeight: '1.8',
            }}
          >
            {DEV_STATUS.body}
          </p>
        </div>

        <div className="devstatus-grid reveal">
          {/* Stack */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>Stack tecnológico</div>
            <div className="tech-stack">
              {DEV_STATUS.stack.map((item, i) => (
                <div key={i} className="tech-item">
                  <span className="tech-item-label">{item.label}</span>
                  <span className="tech-item-status">{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestones */}
          <div>
            <div className="label" style={{ marginBottom: '16px' }}>Hoja de ruta</div>
            <div className="dev-milestones">
              {DEV_STATUS.milestones.map((m, i) => (
                <div key={i} className="milestone">
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className={`ms-dot ${m.state}`}>
                      {i < DEV_STATUS.milestones.length - 1 && (
                        <div className="ms-line" />
                      )}
                    </div>
                  </div>
                  <div>
                    <div className="ms-label">{m.label}</div>
                    <div className="ms-desc">{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
