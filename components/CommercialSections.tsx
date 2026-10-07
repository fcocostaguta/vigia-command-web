'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Icon, Tag } from './CommercialIcons'
import { track } from '@/lib/analytics'

const NAV: [string, string][] = [
  ['Cómo funciona', 'como-funciona'],
  ['Continuidad', 'continuidad'],
  ['Aplicaciones', 'aplicaciones'],
  ['Registro', 'registro'],
]

function go(id: string, e?: React.MouseEvent) {
  const el = document.getElementById(id)
  if (el) {
    e?.preventDefault()
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

export function CommercialHeader({ onContact }: { onContact: () => void }) {
  const [open, setOpen] = useState(false)
  const firstLinkRef = useRef<HTMLAnchorElement>(null)
  const menuBtnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) firstLinkRef.current?.focus()
    return () => { document.body.style.overflow = '' }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuBtnRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const navClick = (id: string) => (e: React.MouseEvent) => { go(id, e); setOpen(false) }

  return (
    <>
    <header className="vk-header">
      <div className="vk-header-inner">
        <a
          className="vk-logo"
          href="#inicio"
          onClick={(e) => { go('inicio', e); setOpen(false) }}
        >
          <Image src="/images/logo-vigia.png" alt="" width={34} height={34} style={{ objectFit: 'contain' }} />
          <span className="vk-wordmark">VIGÍA</span>
        </a>
        <nav className="vk-nav" aria-label="Navegación principal">
          {NAV.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={(e) => go(id, e)}>{l}</a>
          ))}
        </nav>
        <div className="vk-header-ctas">
          <button className="vg-btn vg-btn-red vg-btn-sm" onClick={() => { track('cta_contact_click', { placement: 'header' }); onContact() }}>Conversemos</button>
          <button
            ref={menuBtnRef}
            className="vk-menu-btn"
            aria-expanded={open}
            aria-controls="vk-mobile-nav"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen(v => !v)}
          >
            {open ? (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>
    </header>
      <nav id="vk-mobile-nav" className="vk-mobile-nav" aria-label="Navegación móvil" hidden={!open}>
        {NAV.map(([l, id], i) => (
          <a
            key={id}
            href={`#${id}`}
            ref={i === 0 ? firstLinkRef : undefined}
            onClick={navClick(id)}
          >
            {l}
          </a>
        ))}
        <div className="vk-mobile-cta">
          <button className="vg-btn vg-btn-red vg-btn-lg" onClick={() => { track('cta_contact_click', { placement: 'mobile_nav' }); onContact(); setOpen(false) }}>
            Conversemos
          </button>
        </div>
      </nav>
    </>
  )
}

const HOW_STEPS = [
  { n: '01', label: 'En terreno',  desc: 'El personal porta dispositivos conectados que reportan su estado durante la operación.', icon: 'pulse'  as const },
  { n: '02', label: 'En el mando', desc: 'Estados y alertas del personal en una interfaz clara, sin sumar complejidad a la emergencia.', icon: 'screen' as const },
  { n: '03', label: 'Después',     desc: 'Cada evento queda registrado para revisarlo y mantener la trazabilidad.', icon: 'lock'   as const },
]

export function CommercialFlow() {
  return (
    <section className="vk-section" id="como-funciona">
      <div className="vk-container">
        <div className="vk-split-head" data-reveal>
          <div>
            <Tag>Cómo funciona</Tag>
            <h2>Del terreno al mando.</h2>
          </div>
          <p className="vk-lead">
            Dispositivos, comunicaciones y software en una sola capa operacional, para que el mando
            vea con claridad qué ocurre con su personal.
          </p>
        </div>
        <ol className="vk-flow" data-reveal="line">
          {HOW_STEPS.map((s, i) => (
            <li
              key={s.n}
              className="vk-flow-step"
              data-reveal
              style={{ '--d': (0.15 + i * 0.18) + 's' } as React.CSSProperties}
            >
              <div className="vk-flow-ico"><Icon name={s.icon} size={24} /></div>
              <div className="vk-flow-body">
                <div className="vk-flow-n">{s.n}</div>
                <h3 className="vk-flow-label">{s.label}</h3>
                <p className="vk-flow-desc">{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
