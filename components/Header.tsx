'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_LINKS, MANDO_URL } from '@/lib/content'

interface HeaderProps {
  onDemo: () => void
}

export default function Header({ onDemo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        <a href="#inicio" className="logo">
          <div className="logo-icon">V</div>
          VIGÍA <span className="logo-sub">Command</span>
        </a>

        <nav className="nav">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header-cta">
          <button className="btn btn-outline btn-sm" onClick={onDemo}>
            Solicitar demo
          </button>
          <a
            href={MANDO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-red btn-sm"
          >
            Ingresar a Mando →
          </a>
        </div>
      </div>
    </header>
  )
}
