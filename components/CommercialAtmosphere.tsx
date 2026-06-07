'use client'

import React, { useState, useEffect } from 'react'

export function FireTruck() {
  return (
    <svg className="vk-truck" viewBox="0 0 720 300" fill="none" aria-hidden="true" preserveAspectRatio="xMaxYMax meet">
      <g fill="currentColor">
        <rect x="40" y="120" width="424" height="112" rx="4" />
        <path d="M462 232 V112 H592 L668 152 V232 Z" />
        <rect x="486" y="78" width="98" height="15" rx="4" />
        <path d="M60 118 L452 106 L452 113 L60 125 Z" />
        <rect x="664" y="214" width="22" height="18" rx="2" />
        <rect x="24" y="200" width="22" height="22" rx="2" />
      </g>
      <g>
        <circle cx="168" cy="250" r="40" fill="currentColor" />
        <circle cx="560" cy="250" r="40" fill="currentColor" />
        <circle cx="168" cy="250" r="17" fill="oklch(14% 0.01 250)" />
        <circle cx="560" cy="250" r="17" fill="oklch(14% 0.01 250)" />
      </g>
      <g stroke="oklch(16% 0.01 250)" strokeWidth="2">
        {[90, 150, 210, 270, 330, 390].map((x, i) => (
          <line key={i} x1={x} y1="108" x2={x + 6} y2="124" />
        ))}
      </g>
      <g stroke="oklch(16% 0.01 250)" strokeWidth="2">
        {[140, 220, 300, 380].map((x) => <line key={x} x1={x} y1="138" x2={x} y2="226" />)}
      </g>
      <path d="M60 118 L452 106 M462 112 H592 L668 152" stroke="oklch(60% 0.18 42 / .55)" strokeWidth="1.5" strokeLinecap="round" />
      <circle className="beacon" cx="506" cy="85" r="6" fill="oklch(60% 0.22 28)" />
      <circle className="beacon cool" cx="564" cy="85" r="6" fill="oklch(62% 0.16 250)" />
    </svg>
  )
}

function ekgPath(width: number, beats: number): string {
  const mid = 30, seg = width / beats
  let d = `M0 ${mid}`
  for (let i = 0; i < beats; i++) {
    const x = i * seg
    d += ` H${(x + seg * 0.42).toFixed(1)}`
    d += ` l${(seg * 0.05).toFixed(1)} -6 l${(seg * 0.05).toFixed(1)} 10 l${(seg * 0.05).toFixed(1)} -26 l${(seg * 0.05).toFixed(1)} 34 l${(seg * 0.05).toFixed(1)} -14`
    d += ` H${(x + seg).toFixed(1)}`
  }
  return d
}

export function HeroEkg() {
  return (
    <svg className="vk-ekg" viewBox="0 0 1400 60" preserveAspectRatio="none" aria-hidden="true">
      <path d={ekgPath(1400, 7)} />
    </svg>
  )
}

export function Trace() {
  return (
    <svg className="vk-trace" viewBox="0 0 64 18" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 9 H22 l2 -5 2 8 2 -12 2 16 2 -7 H64" />
    </svg>
  )
}

export function Signal() {
  return <span className="vk-signal" aria-hidden="true"><i /><i /><i /><i /></span>
}

export function Corners() {
  return (
    <>
      <span className="vk-corner tl" />
      <span className="vk-corner tr" />
      <span className="vk-corner bl" />
      <span className="vk-corner br" />
    </>
  )
}

interface EmberStyle extends React.CSSProperties {
  '--ex'?: string
}

export function Embers({ count = 14 }: { count?: number }) {
  const [bits, setBits] = useState<React.ReactNode[]>([])
  useEffect(() => {
    setBits(Array.from({ length: count }, (_, i) => {
      const left = 6 + Math.random() * 88
      const dur = 7 + Math.random() * 7
      const delay = -Math.random() * 12
      const ex = (Math.random() * 60 - 30).toFixed(0) + 'px'
      const size = 2 + Math.random() * 2.5
      const style: EmberStyle = {
        left: left + '%',
        width: size,
        height: size,
        animationDuration: dur + 's',
        animationDelay: delay + 's',
        '--ex': ex,
      }
      return <span key={i} className="vk-ember" style={style} />
    }))
  }, [count])
  return <>{bits}</>
}

interface MoteStyle extends React.CSSProperties {
  '--mdx'?: string
}

export function Motes({ count = 10 }: { count?: number }) {
  const [bits, setBits] = useState<React.ReactNode[]>([])
  useEffect(() => {
    setBits(Array.from({ length: count }, (_, i) => {
      const left = 4 + Math.random() * 92
      const top = 30 + Math.random() * 64
      const dur = 14 + Math.random() * 12
      const delay = -Math.random() * 20
      const size = 1.5 + Math.random() * 2
      const mdx = (Math.random() * 70 - 35).toFixed(0) + 'px'
      const style: MoteStyle = {
        left: left + '%',
        top: top + '%',
        width: size,
        height: size,
        animationDuration: dur + 's',
        animationDelay: delay + 's',
        '--mdx': mdx,
      }
      return <span key={i} className="vk-mote" style={style} />
    }))
  }, [count])
  return <>{bits}</>
}

export function HeroAtmosphere() {
  return (
    <div className="vk-atmos" aria-hidden="true">
      <div className="vk-halo vk-halo-a" />
      <div className="vk-halo vk-halo-b" />
      <div className="vk-beams">
        <span className="vk-beam b1" />
        <span className="vk-beam b2" />
        <span className="vk-beam b3" />
      </div>
      <div className="vk-emergency" />
      <div className="vk-fog" />
      <div className="vk-radar" />
      <FireTruck />
      <Embers count={16} />
      <Motes count={10} />
      <div className="vk-scan" />
      <div className="vk-spotlight" />
    </div>
  )
}
