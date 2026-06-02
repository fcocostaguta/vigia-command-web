'use client'

import { useState, useEffect } from 'react'
import Icon from './Icons'

const LINKS: [string, string][] = [
  ['Solución',      '#solucion'],
  ['Cómo funciona', '#como-funciona'],
  ['Casos de uso',  '#casos'],
  ['Contacto',      '#contacto'],
]

export default function Header({ onConversemos }: { onConversemos: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mOpen, setMOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const close = () => setMOpen(false)

  return (
    <>
      <header className={`header${scrolled ? ' scrolled' : ''}`}>
        <div className="header-inner">
          <a href="#inicio" className="logo">
            <img src="/images/logo-vigia.png" alt="VIGÍA" className="logo-img" loading="eager" />
            <span className="logo-text">VIGÍA</span>
          </a>
          <nav className="nav">
            {LINKS.map(([label, href]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </nav>
          <div className="header-ctas">
            <button className="btn btn-ghost btn-sm" onClick={onConversemos}>Solicitar demo</button>
            <a
              href="https://mando.vigiacommand.cl"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ingresar"
            >
              {Icon.lock} Ingresar
            </a>
            <button
              className={`hamburger${mOpen ? ' open' : ''}`}
              onClick={() => setMOpen(v => !v)}
              aria-label="Menú"
            >
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-nav${mOpen ? ' open' : ''}`}>
        {LINKS.map(([label, href]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <div className="mobile-nav-ctas">
          <button className="btn btn-red" onClick={() => { close(); onConversemos() }}>
            Solicitar demo {Icon.arrow}
          </button>
          <a
            href="https://mando.vigiacommand.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
            style={{ justifyContent: 'center' }}
            onClick={close}
          >
            {Icon.lock} Ingresar al sistema
          </a>
        </div>
      </div>
    </>
  )
}
