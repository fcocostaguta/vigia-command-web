import Link from 'next/link'
import type { Metadata } from 'next'
import s from './test-hero.module.css'

export const metadata: Metadata = {
  title: 'Test Hero — VIGÍA (experimental)',
  robots: { index: false, follow: false },
}

export default function TestHeroPage() {
  return (
    <div className={s.root}>

      {/* Animated background — pointer-events:none, z-index:0 */}
      <div className={s.bg} aria-hidden="true">
        <div className={`${s.fog} ${s.fog1}`} />
        <div className={`${s.fog} ${s.fog2}`} />
        <div className={`${s.fog} ${s.fog3}`} />
        <div className={s.beaconL} />
        <div className={s.beaconR} />
        <div className={s.grid} />
        <div className={s.scanline} />
        <div className={s.vignette} />
      </div>

      {/* Content — z-index:2 */}
      <div className={s.content}>
        <div className={s.kicker}>
          <span className={s.pulse} aria-hidden="true" />
          Sistema táctico · Offline-first
        </div>

        <h1 className={s.h1}>
          VIGÍA <em className={s.h1Em}>Command</em>
        </h1>

        <p className={s.sub}>
          Monitoreo operativo para emergencias críticas.
          Tecnología offline-first para proteger equipos en terreno.
        </p>

        <div className={s.actions}>
          <Link href="/#contacto" className={s.btnPrimary}>
            Solicitar demo
          </Link>
          <a
            href="https://mando.vigiacommand.cl"
            target="_blank"
            rel="noopener noreferrer"
            className={s.btnGhost}
          >
            Ingresar a Mando
          </a>
        </div>

        <p className={s.micro}>
          Bomberos · Brigadas industriales · Equipos de respuesta
        </p>
      </div>

      <p className={s.label} aria-hidden="true">
        [ /test-hero — experimental ]
      </p>

    </div>
  )
}
