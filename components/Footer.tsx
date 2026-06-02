'use client'

// TODO: confirmar URL exacta del perfil Vigía Command en LinkedIn antes de mergear a main
const LINKEDIN_URL = 'https://www.linkedin.com/company/vigia-command'

import Icon from './Icons'

export default function Footer({ onConversemos }: { onConversemos: () => void }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            <div className="logo" style={{ marginBottom: 14 }}>
              <img src="/images/logo-vigia.png" alt="VIGÍA" className="logo-img" loading="lazy" />
              <span className="logo-text" style={{ fontSize: '1.15rem' }}>VIGÍA</span>
            </div>
            <p>Plataforma de monitoreo táctico para bomberos, brigadas industriales y equipos de emergencia.</p>
            <div className="footer-domain mono">vigiacommand.cl</div>
            <div className="footer-social">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
              >
                {Icon.linkedin}
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Plataforma</h4>
              <a href="#solucion">Solución</a>
              <a href="#como-funciona">Cómo funciona</a>
              <a href="#casos">Casos de uso</a>
            </div>
            <div className="footer-col">
              <h4>Contacto</h4>
              <a href="#contacto" onClick={onConversemos}>Solicitar demo</a>
              <a href="mailto:contacto@vigiacommand.cl">contacto@vigiacommand.cl</a>
            </div>
            <div className="footer-col">
              <h4>Sistema</h4>
              <a href="https://mando.vigiacommand.cl" target="_blank" rel="noopener noreferrer">
                Ingresar al panel
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 VIGÍA. Todos los derechos reservados.</span>
          <span style={{ fontFamily: 'var(--font-m)', fontSize: '0.74rem' }}>
            Diseñado para quienes responden.
          </span>
        </div>
      </div>
    </footer>
  )
}
