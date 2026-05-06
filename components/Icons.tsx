import { JSX } from 'react'

const Icon: Record<string, JSX.Element> = {
  eye: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <ellipse cx="10" cy="10" rx="8" ry="5" stroke="currentColor" strokeWidth="1.4"/>
      <circle cx="10" cy="10" r="2" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  bell: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 3a5 5 0 015 5v3l2 2H3l2-2V8a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
      <path d="M8 14a2 2 0 004 0" stroke="currentColor" strokeWidth="1.4"/>
    </svg>
  ),
  doc: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="4" y="2" width="12" height="16" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 7h6M7 10h6M7 13h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  pulse: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M2 10h3l2-6 3 12 2-7 2 4h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  gateway: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="7" width="14" height="9" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="10" cy="12" r="1.5" fill="currentColor"/>
    </svg>
  ),
  screen: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <rect x="2" y="4" width="16" height="11" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M7 18h6M10 15v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  fire: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M12 3c0 3-4 4-3 8-2-1-3-3-2-6C5 7 4 10 4 12a6 6 0 0012 0c0-4-2-6-4-9z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  forest: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L6 9h3l-4 5h4v4h2v-4h4l-4-5h3L10 2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  factory: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M2 17V9l5-3v3l5-3v3l4-2v10H2z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  rescue: (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l7 3v5c0 4-3 7-7 8C7 17 4 14 3 10V5l7-3z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    </svg>
  ),
  arrow: (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  lock: (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
      <rect x="3" y="7" width="10" height="8" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      <path d="M5 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
}

export default Icon
