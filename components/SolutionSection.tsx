import { SOLUTION } from '@/lib/content'
import { IconHeart, IconMap, IconAlert, IconDoc } from './Icons'
import { JSX } from 'react'

const featureIcons: JSX.Element[] = [
  <IconHeart key="heart" />,
  <IconMap   key="map"   />,
  <IconAlert key="alert" />,
  <IconDoc   key="doc"   />,
]

export default function SolutionSection() {
  return (
    <section className="section-pad" id="solucion" style={{ background: 'var(--col-surface)' }}>
      <div className="container">
        <div className="reveal">
          <div className="section-tag">{SOLUTION.tag}</div>
          <h2>{SOLUTION.title}</h2>
          <p style={{ color: 'var(--col-muted)', marginTop: '12px', maxWidth: '560px', fontSize: '1.05rem' }}>
            {SOLUTION.subtitle}
          </p>
        </div>

        <div className="solution-grid reveal">
          {/* Features list */}
          <div className="solution-features">
            {SOLUTION.features.map((f, i) => (
              <div key={i} className="sol-feature">
                <div className="sol-icon">{featureIcons[i]}</div>
                <div className="sol-text">
                  <h4>{f.title}</h4>
                  <p>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats panel */}
          <div className="solution-visual">
            <div className="label" style={{ marginBottom: '20px' }}>Métricas del sistema</div>
            {SOLUTION.stats.map((s, i) => (
              <div key={i} className="sol-stat">
                <div className="sol-stat-label">{s.label}</div>
                <div className="sol-stat-val">{s.value}</div>
                <div className="sol-stat-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
