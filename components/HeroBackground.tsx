import styles from './hero-background.module.css'

/*
  HeroBackground v2 — refined
  Layers (back to front):
   1. atmospheric fog (CSS)
   2. operational map markers (CSS, --faint)
   3. topographic contour lines (SVG)
   4. distant smoke plume (SVG, blurred)
   5. fire truck silhouette (SVG fill + blueprint strokes)
   6. emergency beacon glow at cab (SVG blurred ellipse)
   7. radar pulse ring from cab (SVG, CSS-animated r)
  Stacking: z-index auto → between .hero::before and .hero::after.
*/
export default function HeroBackground() {
  return (
    <div className={styles.root} aria-hidden="true">

      <div className={styles.fog} />

      <span className={`${styles.marker} ${styles.m1}`} />
      <span className={`${styles.marker} ${styles.m2}`} />
      <span className={`${styles.marker} ${styles.m3}`} />

      <svg
        className={styles.scene}
        viewBox="0 0 1440 540"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden="true"
      >
        <defs>
          <filter id="hb-smoke">
            <feGaussianBlur in="SourceGraphic" stdDeviation="14" />
          </filter>
          <filter id="hb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="22" />
          </filter>
        </defs>

        {/* Topographic contour lines (operational map layer) */}
        <g className={styles.topo}>
          <path d="M 0,420 Q 240,410 480,420 T 960,425 T 1440,415" />
          <path d="M 0,452 Q 280,442 560,452 T 1120,448 T 1440,452" />
        </g>

        {/* Distant smoke plume */}
        <g className={styles.smoke} filter="url(#hb-smoke)">
          <ellipse cx="820" cy="180" rx="115" ry="75" />
          <ellipse cx="855" cy="130" rx="82"  ry="55" />
          <ellipse cx="780" cy="220" rx="85"  ry="48" />
        </g>

        {/* Fire truck — filled silhouette with windshield cutout + wheel arches */}
        <g className={styles.truckFill}>
          <path
            fillRule="evenodd"
            d="M 982,278 L 1070,278 Q 1080,282 1080,295 L 1080,406 L 1093,418 L 1093,428 L 1083,432 L 1083,484 L 978,484 A 33 33 0 0 1 912 484 L 893,484 A 33 33 0 0 1 827 484 L 651,484 A 33 33 0 0 1 585 484 L 530,484 L 530,372 Q 530,360 542,360 L 970,360 L 970,294 Q 970,280 982,278 Z M 988,294 L 1066,294 L 1066,352 L 988,352 Z"
          />
          <rect x="556" y="338" width="306" height="22" />
          <polygon points="814,338 792,116 808,114 832,336" />
          <rect x="974" y="270" width="100" height="8" rx="2" />
          <circle cx="618" cy="488" r="30" />
          <circle cx="860" cy="488" r="30" />
          <circle cx="945" cy="488" r="30" />
        </g>

        {/* Fire truck — blueprint stroke detail */}
        <g
          className={styles.truckLines}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        >
          {/* Cab + body outline (continuous) */}
          <path d="M 982,278 L 1070,278 Q 1080,282 1080,295 L 1080,406 L 1093,418 L 1093,428 L 1083,432 L 1083,484" />
          <path d="M 530,484 L 530,372 Q 530,360 542,360 L 970,360" />
          <path d="M 970,294 Q 970,280 982,278" />
          {/* Body bottom segments (between wheel arches) */}
          <path d="M 530,484 L 585,484" />
          <path d="M 651,484 L 827,484" />
          <path d="M 893,484 L 912,484" />
          <path d="M 978,484 L 1083,484" />
          {/* Cab-to-body transition */}
          <line x1="970" y1="294" x2="970" y2="360" />
          {/* Windshield */}
          <rect x="988" y="294" width="78" height="58" />
          {/* Compartment dividers */}
          <line x1="575" y1="362" x2="575" y2="482" />
          <line x1="680" y1="362" x2="680" y2="482" />
          <line x1="750" y1="362" x2="750" y2="482" />
          <line x1="820" y1="362" x2="820" y2="482" />
          {/* Roof equipment box outline */}
          <rect x="556" y="338" width="306" height="22" />
        </g>

        {/* Emergency light glow at cab (blurred ellipse) */}
        <g className={styles.beaconFill} filter="url(#hb-glow)">
          <ellipse cx="1024" cy="266" rx="80" ry="36" />
        </g>

        {/* Radar pulse from cab beacon */}
        <circle
          className={styles.radarRing}
          cx="1024"
          cy="270"
          r="20"
        />

        {/* Ground line */}
        <rect className={styles.ground} x="0" y="510" width="1440" height="12" />
      </svg>

    </div>
  )
}
