import { CTA, MANDO_URL } from '@/lib/content'

interface ContactSectionProps {
  onDemo: () => void
}

export default function ContactSection({ onDemo }: ContactSectionProps) {
  return (
    <section className="cta-section" id="contacto">
      <div className="container">
        <div className="reveal">
          <div className="section-tag" style={{ justifyContent: 'center' }}>
            {CTA.tag}
          </div>
          <h2>{CTA.title}</h2>
          <p>{CTA.subtitle}</p>
          <div className="cta-actions">
            <button className="btn btn-red" onClick={onDemo}>
              {CTA.cta_primary}
            </button>
            <a
              href={MANDO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              {CTA.cta_secondary}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
