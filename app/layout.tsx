import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-h',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-b',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-m',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VIGÍA — Caja Negra Operacional para Emergencias',
  description:
    'Monitoreo táctico offline-first para bomberos y brigadas. Registro inmutable por incidente, alertas en tiempo real y sincronización automática al cloud.',
  metadataBase: new URL('https://vigiacommand.cl'),
  openGraph: {
    title: 'VIGÍA — Caja Negra Operacional para Emergencias',
    description:
      'Monitoreo táctico offline-first para bomberos y brigadas. Registro inmutable por incidente, alertas en tiempo real y sincronización automática al cloud.',
    url: 'https://vigiacommand.cl',
    siteName: 'VIGÍA',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIGÍA — Caja Negra Operacional para Emergencias',
    description:
      'Monitoreo táctico offline-first para bomberos y brigadas. Registro inmutable por incidente, alertas en tiempo real y sincronización automática al cloud.',
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${barlowCondensed.variable} ${barlow.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
