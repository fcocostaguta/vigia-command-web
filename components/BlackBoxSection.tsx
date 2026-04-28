import { BLACK_BOX } from '@/lib/content'

export default function BlackBoxSection() {
  return (
    <section className="blackbox section-pad">
      <div className="container">
        <div className="blackbox-inner">
          {/* Left: copy */}
          <div className="reveal">
            <div className="section-tag">{BLACK_BOX.tag}</div>
            <h2>{BLACK_BOX.title}</h2>

            {BLACK_BOX.body.map((paragraph, i) => (
              <p
                key={i}
                style={{
                  color: 'var(--col-muted)',
                  marginTop: i === 0 ? '16px' : '12px',
                  lineHeight: '1.8',
                  fontSize: i === 0 ? '1.05rem' : '1rem',
                }}
              >
                {paragraph}
              </p>
            ))}

            <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {BLACK_BOX.stats.map((s, i) => (
                <div key={i} className="bb-stat-card">
                  <div className="bb-stat-label">{s.label}</div>
                  <div className="bb-stat-val">{s.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: log viewer */}
          <div className="bb-visual reveal">
            <div className="label" style={{ marginBottom: '16px' }}>
              // log.incidente_20260428_144332
            </div>
            {BLACK_BOX.logs.map((entry, i) => (
              <div key={i} className="bb-log-entry">
                <div className="bb-ts">{entry.ts}</div>
                <div>
                  <div className="bb-evt-type">{entry.type}</div>
                  <div className="bb-evt-msg">{entry.msg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
