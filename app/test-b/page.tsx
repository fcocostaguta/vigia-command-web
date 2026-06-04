import type { Metadata } from 'next'
import s from './test-b.module.css'

export const metadata: Metadata = {
  title: 'Variante B — VIGÍA (experimental)',
  robots: { index: false, follow: false },
}

/*
  Variante B: hero emocional con escena operacional prominente.
  Watch y panel táctico movidos a sección "Cómo funciona".
  Comparar contra Variante A (hero existente) en producción.
*/
export default function TestBPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────── */}
      <section className={s.hero}>

        {/* Background */}
        <div className={s.bg} aria-hidden="true">
          <div className={s.beaconL} />
          <div className={s.beaconR} />
          <div className={`${s.fog} ${s.fog1}`} />
          <div className={s.scanline} />
        </div>

        {/* Scene SVG — más prominente que en Variante A */}
        <svg
          className={s.scene}
          viewBox="0 0 820 520"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
        >
          <defs>
            <filter id="tb-smoke">
              <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
            </filter>
          </defs>

          {/* Smoke */}
          <g className={s.smoke} filter="url(#tb-smoke)">
            <ellipse cx="440" cy="130" rx="130" ry="82" />
            <ellipse cx="520" cy="90"  rx="96"  ry="60" />
            <ellipse cx="380" cy="165" rx="80"  ry="52" />
            <ellipse cx="565" cy="122" rx="68"  ry="44" />
          </g>

          {/* Fire truck */}
          <g className={s.truck}>
            <rect    x="88"  y="342" width="538" height="130" />
            <rect    x="200" y="316" width="360" height="26"  />
            <rect    x="620" y="246" width="130" height="226" rx="3" />
            <polygon points="368,316 340,96 360,90 390,312"            />
            <rect    x="624" y="240" width="122" height="8"   rx="3" />
            <rect    x="83"  y="428" width="10"  height="44"  rx="1" />
            <rect    x="748" y="400" width="18"  height="28"  rx="2" />
            <circle cx="186" cy="476" r="38" />
            <circle cx="502" cy="476" r="34" />
            <circle cx="572" cy="476" r="34" />
            <ellipse cx="380" cy="496" rx="320" ry="8" />
          </g>

          {/* Firefighter 1 */}
          <g className={s.person} transform="translate(44, 336)">
            <path d="M-18,8 Q-18,-15 0,-19 Q18,-15 18,8 L14,10 L-14,10 Z" />
            <ellipse cx="0" cy="23" rx="11" ry="12" />
            <path d="M-20,35 L-24,110 L24,110 L20,35 Q11,30 0,30 Q-11,30 -20,35 Z" />
            <rect x="4"   y="43" width="22" height="38" rx="2" />
            <path d="M-20,35 L-36,78 L-28,82 L-16,40 Z" />
            <path d="M20,35 L36,78 L28,82 L16,40 Z" />
            <rect x="-20" y="110" width="16" height="58" rx="2" />
            <rect x="4"   y="110" width="16" height="58" rx="2" />
            <rect x="-22" y="164" width="20" height="10" rx="2" />
            <rect x="3"   y="164" width="20" height="10" rx="2" />
          </g>

          {/* Firefighter 2 */}
          <g className={s.person} transform="translate(720, 354)">
            <path d="M-16,7 Q-16,-13 0,-17 Q16,-13 16,7 L12,9 L-12,9 Z" />
            <ellipse cx="0" cy="20" rx="10" ry="11" />
            <path d="M-18,31 L-21,96 L21,96 L18,31 Q10,27 0,27 Q-10,27 -18,31 Z" />
            <rect x="4"   y="38" width="19" height="34" rx="2" />
            <path d="M-18,31 L-32,70 L-25,73 L-14,36 Z" />
            <path d="M18,31 L32,70 L25,73 L14,36 Z" />
            <rect x="-18" y="96" width="14" height="50" rx="2" />
            <rect x="4"   y="96" width="14" height="50" rx="2" />
            <rect x="-20" y="142" width="17" height="9" rx="2" />
            <rect x="3"   y="142" width="17" height="9" rx="2" />
          </g>

          {/* Ground */}
          <rect className={s.truck} x="0" y="508" width="820" height="12" />
        </svg>

        {/* Content (left column) */}
        <div className={s.heroContent}>
          <div className={s.kicker}>
            <span className={s.pulse} aria-hidden="true" />
            Sistema táctico · Offline-first
          </div>
          <h1 className={s.h1}>
            Caja Negra<br />
            Operacional para<br />
            <em className={s.h1Em}>Emergencias.</em>
          </h1>
          <p className={s.sub}>
            Monitoreo offline. Registro inmutable.<br />
            Sincronización automática al cloud.
          </p>
          <div className={s.actions}>
            <button className={s.btnRed}>ME INTERESA</button>
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

      </section>

      {/* ── CÓMO FUNCIONA VIGÍA ───────────────────── */}
      <section className={s.howSection}>
        <p className={s.howLabel}>Producto</p>
        <h2 className={s.howTitle}>
          Así protege VIGÍA<br />a tus <em>equipos en terreno.</em>
        </h2>

        <div className={s.howPlaceholder}>
          <div className={s.watchPlaceholder}>
            <p className={s.placeholderLabel}>
              Dispositivo<br />de monitoreo<br />(Watch)
            </p>
          </div>
          <div className={s.tabletPlaceholder}>
            <p className={s.placeholderLabel}>
              Panel táctico<br />Mando Command<br />(Tablet)
            </p>
          </div>
        </div>
      </section>

      <p className={s.label} aria-hidden="true">
        [ /test-b — variante B experimental ]
      </p>
    </>
  )
}
