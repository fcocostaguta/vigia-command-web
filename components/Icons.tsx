import { JSX } from 'react'

// ─── Small inline SVGs ───────────────────────────────

export function IconAlert(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 9v4M10 14.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconEye(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconHeart(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 16S3 11 3 6.5a4 4 0 017-2.6A4 4 0 0117 6.5C17 11 10 16 10 16Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconMap(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2a5 5 0 015 5c0 3-5 11-5 11S5 10 5 7a5 5 0 015-5Z" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconDoc(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconWifi(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M2 8a11 11 0 0116 0M5 11.5A7 7 0 0115 11.5M8 15a3 3 0 014 0"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="17.5" r="1" fill="currentColor" />
    </svg>
  )
}

export function IconRehab(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 4v6l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconHist(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconLock(): JSX.Element {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="9" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Flow step icons (larger) ────────────────────────

export function IconSensor(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="7" y="7" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 4a1 1 0 011-1M19 4a1 1 0 011 1M4 20a1 1 0 001 1M19 19a1 1 0 001 1"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  )
}

export function IconNode(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="8" width="16" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 11h2M7 13h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="12" r="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconGateway(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M3 12h18M3 12l4-4M3 12l4 4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function IconCloud(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M6 19a4 4 0 01-.8-7.9A6 6 0 0118 13h1a3 3 0 010 6H6Z"
        stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

export function IconTablet(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="2" width="16" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

// ─── Map icon name → component ───────────────────────

type IconName =
  | 'alert' | 'eye' | 'heart' | 'map' | 'doc'
  | 'wifi'  | 'rehab' | 'hist' | 'lock'
  | 'sensor' | 'node' | 'gateway' | 'cloud' | 'tablet'

const iconMap: Record<IconName, JSX.Element> = {
  alert:   <IconAlert />,
  eye:     <IconEye />,
  heart:   <IconHeart />,
  map:     <IconMap />,
  doc:     <IconDoc />,
  wifi:    <IconWifi />,
  rehab:   <IconRehab />,
  hist:    <IconHist />,
  lock:    <IconLock />,
  sensor:  <IconSensor />,
  node:    <IconNode />,
  gateway: <IconGateway />,
  cloud:   <IconCloud />,
  tablet:  <IconTablet />,
}

export function Icon({ name }: { name: string }): JSX.Element {
  return iconMap[name as IconName] ?? <span />
}
