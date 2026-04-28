import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
        mono:    ['var(--font-mono)',    'monospace'],
      },
      colors: {
        bg:       'var(--col-bg)',
        surface:  'var(--col-surface)',
        surface2: 'var(--col-surface2)',
        border:   'var(--col-border)',
        text:     'var(--col-text)',
        muted:    'var(--col-muted)',
        faint:    'var(--col-faint)',
        red:      'var(--col-red)',
        'red-b':  'var(--col-red-b)',
        amber:    'var(--col-amber)',
        green:    'var(--col-green)',
      },
      keyframes: {
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.4', transform: 'scale(0.7)' },
        },
        'blink-border': {
          '0%,100%': { opacity: '1' },
          '50%':     { opacity: '0.5' },
        },
        'fade-in':  { from: { opacity: '0' }, to: { opacity: '1' } },
        'slide-up': {
          from: { transform: 'translateY(16px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
      },
      animation: {
        'pulse-dot':    'pulse-dot 2s infinite',
        'pulse-dot-fast':'pulse-dot 1.2s infinite',
        'blink-border': 'blink-border 1s infinite',
        'fade-in':      'fade-in 0.15s ease',
        'slide-up':     'slide-up 0.2s ease',
      },
    },
  },
  plugins: [],
}

export default config
