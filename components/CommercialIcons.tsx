'use client'

import React from 'react'

type IconName = 'eye' | 'pulse' | 'gateway' | 'screen' | 'fire' | 'factory' | 'rescue' | 'arrow' | 'lock' | 'linkedin' | 'arrowRight'

const ICONS: Record<IconName, [number, React.ReactNode]> = {
  eye: [20, <><ellipse key="e" cx="10" cy="10" rx="8" ry="5" stroke="currentColor" strokeWidth="1.4"/><circle key="c" cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.4"/></>],
  pulse: [20, <path key="p" d="M2 10h3l2-6 3 12 2-7 2 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>],
  gateway: [20, <><rect key="r" x="3" y="7" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/><path key="p" d="M7 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle key="c" cx="10" cy="12" r="1.5" fill="currentColor"/></>],
  screen: [20, <><rect key="r" x="2" y="4" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.4"/><path key="p" d="M7 18h6M10 15v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>],
  fire: [20, <path key="p" d="M12 3c0 3-4 4-3 8-2-1-3-3-2-6C5 7 4 10 4 12a6 6 0 0012 0c0-4-2-6-4-9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>],
  factory: [20, <path key="p" d="M2 17V9l5-3v3l5-3v3l4-2v10H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>],
  rescue: [20, <path key="p" d="M10 2l7 3v5c0 4-3 7-7 8C7 17 4 14 3 10V5l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>],
  arrow: [16, <path key="p" d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>],
  lock: [16, <><rect key="r" x="3" y="7" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.4"/><path key="p" d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></>],
  linkedin: [24, <><rect key="r" x="2" y="2" width="20" height="20" rx="3" stroke="currentColor" strokeWidth="1.5"/><path key="p" d="M7 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle key="c" cx="7" cy="7" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1"/><path key="p2" d="M12 17v-3.5a2.5 2.5 0 015 0V17M12 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></>],
  arrowRight: [24, <path key="p" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor" d="M13 7l5 5m0 0l-5 5m5-5H6"/>],
}

export function Icon({ name, size }: { name: IconName; size?: number }) {
  const [vb, content] = ICONS[name] ?? ICONS.pulse
  const s = size ?? (vb === 16 ? 14 : 18)
  return (
    <svg width={s} height={s} viewBox={`0 0 ${vb} ${vb}`} fill="none"
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }} aria-hidden="true">
      {content}
    </svg>
  )
}

export function Tag({ children, center, accent }: { children: React.ReactNode; center?: boolean; accent?: boolean }) {
  return (
    <span className={`vg-tag${center ? ' is-center' : ''}${accent ? ' is-accent' : ''}`}>
      {children}
    </span>
  )
}

export function Badge({ tone, children }: { tone: 'ok' | 'warn' | 'crit'; children: React.ReactNode }) {
  return <span className={`vg-badge vg-badge-${tone}`}>{children}</span>
}

export function bpmCls(b: number): string {
  return b >= 170 ? 'vg-bpm-crit' : b >= 150 ? 'vg-bpm-warn' : 'vg-bpm-ok'
}
