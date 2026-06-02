'use client'

import { Fragment } from 'react'

const STEPS = [
  {
    n: '01',
    label: 'El reloj',
    desc: 'Toma datos críticos del personal.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M2 10 L5 10 L6.5 7 L8.5 13 L10 7.5 L11.5 11 L13 10 L18 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    n: '02',
    label: 'Punto de mando',
    desc: 'Centraliza la información.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="15.5" r="1.5" fill="currentColor"/>
        <path d="M7 12.5 C8.3 11.1 11.7 11.1 13 12.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M4.5 9.5 C7 7 13 7 15.5 9.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
        <path d="M2 6.5 C5.5 3 14.5 3 18 6.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: '03',
    label: 'Visualiza y decide',
    desc: 'El oficial opera con datos en vivo.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M7 17 L13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 13 L10 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    n: '04',
    label: 'Se registra',
    desc: 'La operación queda respaldada.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="5" y="10" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M8 10 L8 8 C8 6.3 12 6.3 12 8 L12 10" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function ProblemBand() {
  return (
    <section className="flow-section">
      <div className="container">
        <div className="flow-header reveal">
          <h2 className="flow-title">Así funciona en terreno.</h2>
        </div>
        <div className="flow-steps reveal d1">
          {STEPS.map((s, i) => (
            <Fragment key={s.n}>
              <div className="flow-step">
                <div className="flow-step-icon">{s.icon}</div>
                <div className="flow-step-num">{s.n}</div>
                <div className="flow-step-label">{s.label}</div>
                <div className="flow-step-desc">{s.desc}</div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="flow-arrow" aria-hidden="true">→</div>
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
