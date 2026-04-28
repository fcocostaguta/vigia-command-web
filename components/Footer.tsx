import { FOOTER, NAV_LINKS, MANDO_URL } from '@/lib/content'

interface FooterProps {
  onDemo: () => void
}

export default function Footer({ onDemo }: FooterProps) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="logo">
              <div className="logo-icon">V</div>
              VIGÍA <span className="logo-sub">Command</span>
            </div>
            <p>{FOOTER.tagline}</p>
            <div
              style={{
                marginTop: '20px',
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--col-faint)',
              }}
            >
              {FOOTER.domain}
            </div>
          </div>

          {/* Nav links */}
          <div className="footer-col">
            <h4>Plataforma</h4>
            {FOOTER.nav_col.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h4>Contacto</h4>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                onDemo()
              }}
            >
              Solicitar demo
            </a>
            <a href={MANDO_URL} target="_blank" rel="noopener noreferrer">
              Ingresar a Mando
            </a>
            <span style={{ marginTop: '8px' }}>{FOOTER.email}</span>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 VIGÍA Command. Tecnología para operaciones críticas.</span>
          <span>Sistema en etapa de validación técnica</span>
        </div>
      </div>
    </footer>
  )
}
