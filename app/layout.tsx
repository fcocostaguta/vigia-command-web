import type { Metadata } from 'next'
import { Barlow_Condensed, Barlow, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'VIGÍA Command | Monitoreo operacional para bomberos',
  description:
    'Plataforma de monitoreo operacional para bomberos, alertas fisiológicas y trazabilidad de incidentes en tiempo real.',
  metadataBase: new URL('https://vigiacommand.cl'),
  openGraph: {
    title: 'VIGÍA Command | Monitoreo operacional para bomberos',
    description:
      'Plataforma de monitoreo operacional para bomberos, alertas fisiológicas y trazabilidad de incidentes en tiempo real.',
    url: 'https://vigiacommand.cl',
    siteName: 'VIGÍA Command',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIGÍA Command | Monitoreo operacional para bomberos',
    description:
      'Plataforma de monitoreo operacional para bomberos, alertas fisiológicas y trazabilidad de incidentes en tiempo real.',
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
      <body>{children}</body>
    </html>
  )
}
