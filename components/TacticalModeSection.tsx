import { TACTICAL_MODE } from '@/lib/content'
import { Icon } from './Icons'

export default function TacticalModeSection() {
  return (
    <section
      className="section-pad"
      id="modo-tactico"
      style={{ background: 'var(--col-surface)' }}
    >
      <div className="container">
        <div className="reveal">
          <div className="section-tag">{TACTICAL_MODE.tag}</div>
          <h2>{TACTICAL_MODE.title}</h2>
          <p style={{ color: 'var(--col-muted)', marginTop: '12px', maxWidth: '560px', fontSize: '1.05rem' }}>
            {TACTICAL_MODE.subtitle}
          </p>
        </div>

        <div className="tmode-grid reveal">
          {TACTICAL_MODE.cells.map((cell, i) => (
            <div key={i} className="tmode-cell">
              <div className="tmode-icon">
                <Icon name={cell.icon} />
              </div>
              <h3>{cell.title}</h3>
              <p>{cell.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
