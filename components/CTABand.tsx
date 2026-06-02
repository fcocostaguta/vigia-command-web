import Icon from './Icons'

export default function CTABand({ onConversemos }: { onConversemos: () => void }) {
  return (
    <section className="cta-band">
      <div className="container">
        <div className="cta-band-inner">
          <div className="cta-band-copy">
            <div className="cta-band-kicker">Sistema disponible · Implementación para organizaciones</div>
            <h3 className="cta-band-heading">¿Le interesa a tu organización?</h3>
          </div>
          <button className="btn btn-red btn-lg" onClick={onConversemos}>
            ME INTERESA {Icon.arrow}
          </button>
        </div>
      </div>
    </section>
  )
}
