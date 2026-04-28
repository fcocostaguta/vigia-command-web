import { BENEFITS } from '@/lib/content'

export default function BenefitsSection() {
  return (
    <section className="section-pad" id="beneficios">
      <div className="container">
        <div className="reveal">
          <div className="section-tag">{BENEFITS.tag}</div>
          <h2>{BENEFITS.title}</h2>
        </div>

        <div className="benefits-grid reveal">
          {BENEFITS.items.map((item, i) => (
            <div key={i} className="benefit">
              <div className="benefit-n">{String(i + 1).padStart(2, '0')}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
