import styles from './hero-background.module.css'

/*
  HeroBackground v3 — cinematic atmosphere added.
  Layers (back to front):
   0a. vk-beams    — volumetric god-ray beams (global CSS)
   0b. vk-fog-layer — base light fog (global CSS)
   0c. vk-scan     — horizontal scan sweep (global CSS)
   0d. vk-mote × 10 — dust motes (global CSS)
   1.  styles.root — original truck/radar/topo scene (CSS module, unchanged)
*/

const MOTES = [
  { w: 2, l: '8%',  t: '62%', dur: '9.4s',  delay: '0s',    mdx:  18 },
  { w: 3, l: '17%', t: '48%', dur: '11.2s', delay: '-2.3s', mdx: -14 },
  { w: 2, l: '26%', t: '74%', dur: '8.8s',  delay: '-1.1s', mdx:  24 },
  { w: 4, l: '34%', t: '55%', dur: '13.0s', delay: '-4.5s', mdx:  -8 },
  { w: 2, l: '43%', t: '38%', dur: '10.1s', delay: '-0.7s', mdx:  30 },
  { w: 3, l: '52%', t: '68%', dur: '9.6s',  delay: '-3.2s', mdx: -22 },
  { w: 2, l: '61%', t: '44%', dur: '12.4s', delay: '-1.8s', mdx:  16 },
  { w: 4, l: '70%', t: '58%', dur: '8.2s',  delay: '-5.0s', mdx: -10 },
  { w: 2, l: '79%', t: '72%', dur: '11.8s', delay: '-2.6s', mdx:  26 },
  { w: 3, l: '88%', t: '50%', dur: '10.5s', delay: '-0.4s', mdx: -18 },
]

export default function HeroBackground() {
  return (
    <>
      {/* Volumetric god-ray beams */}
      <div className="vk-beams" aria-hidden="true">
        <div className="vk-beam vk-beam-b1" />
        <div className="vk-beam vk-beam-b2" />
        <div className="vk-beam vk-beam-b3" />
      </div>

      {/* Light fog at base */}
      <div className="vk-fog-layer" aria-hidden="true" />

      {/* Scan sweep */}
      <div className="vk-scan" aria-hidden="true" />

      {/* Dust motes */}
      {MOTES.map((m, i) => (
        <div
          key={i}
          className="vk-mote"
          aria-hidden="true"
          style={{
            width: m.w, height: m.w,
            left: m.l, top: m.t,
            animationDuration: m.dur,
            animationDelay: m.delay,
            '--mdx': `${m.mdx}px`,
          } as React.CSSProperties}
        />
      ))}

      {/* Original truck / radar / topo scene — unchanged */}
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

          {/* Topographic contour lines */}
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

          {/* Fire truck — filled silhouette */}
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
            <path d="M 982,278 L 1070,278 Q 1080,282 1080,295 L 1080,406 L 1093,418 L 1093,428 L 1083,432 L 1083,484" />
            <path d="M 530,484 L 530,372 Q 530,360 542,360 L 970,360" />
            <path d="M 970,294 Q 970,280 982,278" />
            <path d="M 530,484 L 585,484" />
            <path d="M 651,484 L 827,484" />
            <path d="M 893,484 L 912,484" />
            <path d="M 978,484 L 1083,484" />
            <line x1="970" y1="294" x2="970" y2="360" />
            <rect x="988" y="294" width="78" height="58" />
            <line x1="575" y1="362" x2="575" y2="482" />
            <line x1="680" y1="362" x2="680" y2="482" />
            <line x1="750" y1="362" x2="750" y2="482" />
            <line x1="820" y1="362" x2="820" y2="482" />
            <rect x="556" y="338" width="306" height="22" />
          </g>

          {/* Emergency light glow */}
          <g className={styles.beaconFill} filter="url(#hb-glow)">
            <ellipse cx="1024" cy="266" rx="80" ry="36" />
          </g>

          {/* Radar pulse */}
          <circle className={styles.radarRing} cx="1024" cy="270" r="20" />

          {/* Ground line */}
          <rect className={styles.ground} x="0" y="510" width="1440" height="12" />
        </svg>

      </div>
    </>
  )
}
