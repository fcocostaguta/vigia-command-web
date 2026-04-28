import TacticalPanel from './TacticalPanel'
import { HERO, MANDO_URL } from '@/lib/content'

interface HeroSectionProps {
  onDemo: () => void
}

export default function HeroSection({ onDemo }: HeroSectionProps) {
  return (
    <section className="hero" id="inicio">
      <div className="container">
        <div className="hero-grid">
          {/* Copy */}
          <div>
            <div className="hero-eyebrow">
              <span className="dot" />
              {HERO.eyebrow}
            </div>

            <h1>
              {HERO.title_plain}
              <em>{HERO.title_em}</em>
              {HERO.title_end}
            </h1>

            <p className="hero-sub">{HERO.subtitle}</p>

            <div className="hero-actions">
              <button className="btn btn-red" onClick={onDemo}>
                {HERO.cta_primary}
              </button>
              <a
                href={MANDO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                {HERO.cta_secondary}
              </a>
            </div>
          </div>

          {/* Tactical panel — hidden on mobile via CSS */}
          <TacticalPanel />
        </div>
      </div>
    </section>
  )
}
