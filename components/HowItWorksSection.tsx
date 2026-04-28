import { HOW_IT_WORKS } from '@/lib/content'
import { Icon } from './Icons'

export default function HowItWorksSection() {
  return (
    <section className="section-pad" id="como-funciona">
      <div className="container">
        <div className="reveal">
          <div className="section-tag">{HOW_IT_WORKS.tag}</div>
          <h2>{HOW_IT_WORKS.title}</h2>
          <p style={{ color: 'var(--col-muted)', marginTop: '12px', maxWidth: '560px', fontSize: '1.05rem' }}>
            {HOW_IT_WORKS.subtitle}
          </p>
        </div>

        <div className="hiw-flow reveal">
          {HOW_IT_WORKS.steps.map((step, i) => (
            <div key={step.n} className="hiw-step">
              <div className="hiw-node">
                <Icon name={step.icon} />
                <span className="hiw-step-n">{step.n}</span>
              </div>
              {i < HOW_IT_WORKS.steps.length - 1 && (
                <div className="hiw-connector" />
              )}
              <div>
                <div className="hiw-label">{step.label}</div>
                <div className="hiw-sub">{step.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
