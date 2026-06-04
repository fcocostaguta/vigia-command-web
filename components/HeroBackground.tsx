import styles from './hero-background.module.css'

/*
  Cinematic background for the hero section.
  - position: absolute inset-0, pointer-events: none
  - z-index: auto → paints between ::before and ::after in tree order
  - Hero content (z-index:2) stays fully above this layer
  - Remove this file + its import in Hero.tsx to revert
*/
export default function HeroBackground() {
  return (
    <div className={styles.root} aria-hidden="true">

      {/* Atmospheric fog layers */}
      <div className={`${styles.fog} ${styles.fog1}`} />
      <div className={`${styles.fog} ${styles.fog2}`} />

      {/* Emergency beacon glows */}
      <div className={`${styles.beacon} ${styles.beaconL}`} />
      <div className={`${styles.beacon} ${styles.beaconR}`} />

      {/* Horizontal scan line */}
      <div className={styles.scanline} />

      {/* Scene SVG — silhouettes anchored to bottom of hero */}
      <svg
        className={styles.scene}
        viewBox="0 0 1440 520"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="hb-smoke">
            <feGaussianBlur in="SourceGraphic" stdDeviation="16" />
          </filter>
        </defs>

        {/* Smoke / atmospheric plumes */}
        <g className={styles.smoke} filter="url(#hb-smoke)">
          <ellipse cx="845"  cy="152" rx="115" ry="72" />
          <ellipse cx="924"  cy="112" rx="88"  ry="56" />
          <ellipse cx="782"  cy="182" rx="72"  ry="48" />
          <ellipse cx="975"  cy="142" rx="62"  ry="42" />
          <ellipse cx="735"  cy="208" rx="55"  ry="38" />
        </g>

        {/* ── Fire truck (cab-forward, facing left) ── */}
        <g className={styles.truck}>
          {/* Main body */}
          <rect x="518"  y="374" width="447" height="108" />
          {/* Roof equipment box */}
          <rect x="554"  y="352" width="308" height="22" />
          {/* Cab (taller, right side) */}
          <rect x="963"  y="280" width="112" height="202" rx="3" />
          {/* Aerial ladder — two side rails as a thin polygon */}
          <polygon points="814,352 790,116 808,112 832,348" />
          {/* Emergency light bar on cab roof */}
          <rect x="966"  y="274" width="106" height="8" rx="3" />
          {/* Rear step/bumper */}
          <rect x="513"  y="456" width="9"   height="26" rx="1" />
          {/* Front bumper */}
          <rect x="1073" y="432" width="16"  height="22" rx="2" />
          {/* Wheels */}
          <circle cx="614" cy="488" r="32" />
          <circle cx="870" cy="488" r="30" />
          <circle cx="934" cy="488" r="30" />
          {/* Ground shadow under truck */}
          <ellipse cx="758" cy="502" rx="285" ry="7" />
        </g>

        {/* ── Firefighter 1 — left area ── */}
        <g className={styles.person} transform="translate(158,375)">
          {/* Helmet */}
          <path d="M-16,7 Q-16,-13 0,-17 Q16,-13 16,7 L12,9 L-12,9 Z" />
          {/* Head */}
          <ellipse cx="0" cy="20" rx="10" ry="11" />
          {/* Torso (bulky turnout gear) */}
          <path d="M-18,31 L-21,95 L21,95 L18,31 Q10,27 0,27 Q-10,27 -18,31 Z" />
          {/* SCBA pack (rectangle on back) */}
          <rect x="4" y="38" width="19" height="33" rx="2" />
          {/* Arms */}
          <path d="M-18,31 L-31,68 L-24,71 L-14,36 Z" />
          <path d="M18,31 L31,68 L24,71 L14,36 Z" />
          {/* Legs */}
          <rect x="-18" y="95" width="14" height="52" rx="2" />
          <rect x="4"   y="95" width="14" height="52" rx="2" />
          {/* Boots */}
          <rect x="-20" y="144" width="17" height="9" rx="2" />
          <rect x="3"   y="144" width="17" height="9" rx="2" />
        </g>

        {/* ── Firefighter 2 — left area, slightly right of first ── */}
        <g className={styles.person} transform="translate(286,390)">
          <path d="M-14,6 Q-14,-11 0,-15 Q14,-11 14,6 L11,8 L-11,8 Z" />
          <ellipse cx="0" cy="18" rx="9" ry="10" />
          <path d="M-16,29 L-18,88 L18,88 L16,29 Q9,25 0,25 Q-9,25 -16,29 Z" />
          <rect x="3"  y="35" width="17" height="30" rx="2" />
          {/* One arm reaching forward (hose or radio) */}
          <path d="M-16,29 L-38,58 L-31,62 L-12,34 Z" />
          <path d="M16,29 L25,62 L19,64 L12,34 Z" />
          <rect x="-15" y="88" width="12" height="46" rx="2" />
          <rect x="3"   y="88" width="12" height="46" rx="2" />
          <rect x="-17" y="130" width="15" height="9" rx="2" />
          <rect x="2"   y="130" width="15" height="9" rx="2" />
        </g>

        {/* ── Firefighter 3 — far right, partially visible ── */}
        <g className={styles.person} transform="translate(1256,383)">
          <path d="M-14,6 Q-14,-11 0,-15 Q14,-11 14,6 L11,8 L-11,8 Z" />
          <ellipse cx="0" cy="18" rx="9" ry="10" />
          <path d="M-16,29 L-18,90 L18,90 L16,29 Q9,25 0,25 Q-9,25 -16,29 Z" />
          <rect x="3"  y="35" width="17" height="31" rx="2" />
          <path d="M-16,29 L-27,64 L-21,66 L-12,34 Z" />
          <path d="M16,29 L27,64 L21,66 L12,34 Z" />
          <rect x="-15" y="90" width="12" height="46" rx="2" />
          <rect x="3"   y="90" width="12" height="46" rx="2" />
          <rect x="-17" y="132" width="15" height="9" rx="2" />
          <rect x="2"   y="132" width="15" height="9" rx="2" />
        </g>

        {/* Ground line */}
        <rect className={styles.truck} x="0" y="508" width="1440" height="12" />
      </svg>

      {/* Floating embers */}
      <div className={styles.particles}>
        {Array.from({ length: 8 }).map((_, i) => (
          <span key={i} className={styles.particle} />
        ))}
      </div>

    </div>
  )
}
