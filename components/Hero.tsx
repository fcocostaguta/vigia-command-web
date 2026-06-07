'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import HeroBackground from './HeroBackground'
import Icon from './Icons'

// ── TabletDash ────────────────────────────────────────────────────────────────
// Internal component — renders the tactical dashboard inside the eco-tablet.

const EKG_HALF = 'M0,17 L12,17 L14,6 L16,28 L18,17 L30,17 L32,6 L34,28 L36,17 L48,17 L50,6 L52,28 L54,17 L66,17 L68,6 L70,28 L72,17 L84,17 L86,6 L88,28 L90,17 L100,17'
const EKG_FULL = `${EKG_HALF} M100,17 L112,17 L114,6 L116,28 L118,17 L130,17 L132,6 L134,28 L136,17 L148,17 L150,6 L152,28 L154,17 L166,17 L168,6 L170,28 L172,17 L184,17 L186,6 L188,28 L190,17 L200,17`

function TabletDash({ bpm }: { bpm: number }) {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  const bpmCls  = bpm >= 170 ? 'bpm-crit' : bpm >= 150 ? 'bpm-warn' : 'bpm-ok'
  const sdotCls = bpm >= 170 ? 'td-sdot-crit' : bpm >= 150 ? 'td-sdot-warn' : 'td-sdot-ok'

  const ops = [
    { n: 'Rojas',  rk: 'Cap.',  id: 'B-01', bpm: 142,  bCls: 'bpm-ok',   sCls: 'td-sdot-ok' },
    { n: 'Muñoz',  rk: 'Tte.',  id: 'B-02', bpm,       bCls: bpmCls,     sCls: sdotCls },
    { n: 'Pérez',  rk: 'Vol.',  id: 'B-03', bpm: 118,  bCls: 'bpm-ok',   sCls: 'td-sdot-ok' },
    { n: 'Soto',   rk: 'Bbro.', id: 'B-04', bpm: 176,  bCls: 'bpm-warn', sCls: 'td-sdot-warn' },
  ]

  return (
    <div className="eco-screen">
      <div className="td-top">
        <div className="td-mark">
          <b>VIGÍA</b>
        </div>
        <span className="td-live">
          <span className="pulse-dot" style={{ width: 5, height: 5, flexShrink: 0 }} />
          En vivo
        </span>
        <span className="td-clock" suppressHydrationWarning>{clock}</span>
        <span className="td-conn">● Operativo</span>
      </div>

      <div className="td-inc">
        <span className="td-inc-dot" />
        Incendio estructural · 2ª alarma · Maitencillo
        <span className="td-inc-dur">2h 18m</span>
      </div>

      <div className="td-body">
        <div className="td-roster">
          <div className="td-rhd">
            <span>Operador</span>
            <span>BPM</span>
          </div>
          {ops.map(op => (
            <div key={op.id} className={`td-row${op.id === 'B-02' && bpm >= 170 ? ' td-row-alert' : ''}`}>
              <div className="td-nm">
                <b>{op.n}</b>
                <i>{op.rk} {op.id}</i>
              </div>
              <span className={`td-bpm ${op.bCls}`}>{op.bpm}</span>
              <span className={`td-sdot ${op.sCls}`} />
            </div>
          ))}
        </div>

        <div className="td-mon">
          <div className="td-card">
            <div className="td-card-k">BPM</div>
            <div className="td-bigwrap">
              <span className={`td-big ${bpmCls}`}>{bpm}</span>
              <span className="td-unit">bpm</span>
            </div>
          </div>

          <div className="td-vitals" aria-hidden="true">
            <svg viewBox="0 0 200 34" preserveAspectRatio="none">
              <path className="td-vitals-path" d={EKG_FULL} />
            </svg>
          </div>

          {bpm >= 150 && (
            <div className="td-alertbar">
              <span className="td-alertbar-pin" />
              Tte. Muñoz — acción req.
            </div>
          )}

          <div className="td-foot">
            <span><b>4</b> ops.</span>
            <span><b>2</b> alertas</span>
            <div className="td-spark" aria-hidden="true">
              {[...Array(6)].map((_, i) => (
                <i key={i} style={{ height: `${35 + i * 12}%`, animationDelay: `${i * 0.26}s` }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Wire paths in the 580×540 SVG coordinate space.
// Watch right edge ≈ (240, 360) → tablet left edge ≈ (148, 195).
const WIRE_A = 'M 240,360 C 240,280 165,235 148,195'
const WIRE_B = 'M 222,392 C 215,320 172,268 156,228'

// ── Hero ──────────────────────────────────────────────────────────────────────
export default function Hero({ onConversemos }: { onConversemos: () => void }) {
  const [bpm, setBpm] = useState(142)
  const stageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setBpm(p => Math.max(128, Math.min(168, Math.round(p + (Math.random() - 0.45) * 4))))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = stageRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width  / 2) / (rect.width  / 2)))
    const py = Math.max(-1, Math.min(1, (e.clientY - rect.top  - rect.height / 2) / (rect.height / 2)))
    el.style.setProperty('--px', px.toFixed(3))
    el.style.setProperty('--py', py.toFixed(3))
  }, [])

  const onPointerLeave = useCallback(() => {
    const el = stageRef.current
    if (!el) return
    el.style.setProperty('--px', '0')
    el.style.setProperty('--py', '0')
  }, [])

  const bpmCls = bpm >= 170 ? 'bpm-crit' : bpm >= 150 ? 'bpm-warn' : 'bpm-ok'

  return (
    <section className="hero" id="inicio">
      <HeroBackground />

      <div className="hero-content">
        <div className="hero-kicker reveal in">
          <span className="pulse-dot" />
          Sistema táctico · Offline-first
        </div>
        <h1 className="reveal in">
          Caja Negra<br/>
          Operacional para<br/>
          <em>Emergencias.</em>
        </h1>
        <p className="hero-sub reveal in d1">
          Monitoreo offline. Registro inmutable. Sincronización automática.
        </p>
        <div className="hero-actions reveal in d2">
          <button className="btn btn-red btn-lg" onClick={onConversemos}>
            ME INTERESA {Icon.arrow}
          </button>
          <a
            href="https://mando.vigiacommand.cl"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-lg"
          >
            {Icon.lock} Ingresar a Mando
          </a>
        </div>
        <div className="hero-micro reveal in d3">
          Bomberos · Brigadas industriales · Equipos de respuesta
        </div>

        <div className="hero-mobile-mock reveal in d3">
          <div className="hmm-topbar">
            <div className="tt-live">VIGÍA Command · En vivo</div>
            <span className="tt-incident">Incendio estructural</span>
          </div>
          <div className="hmm-row">
            <span className="hmm-name">Muñoz <span className="hmm-id">B-02</span></span>
            <span className={`tt-bpm ${bpm >= 152 ? 'bpm-crit' : 'bpm-warn'}`}>{bpm}</span>
            <span className={`status-badge ${bpm >= 152 ? 's-crit' : 's-warn'}`}>{bpm >= 152 ? 'Alerta' : 'Exigido'}</span>
          </div>
          <div className="hmm-row">
            <span className="hmm-name">Rojas <span className="hmm-id">B-01</span></span>
            <span className="tt-bpm bpm-ok">142</span>
            <span className="status-badge s-ok">Operativo</span>
          </div>
          <div className="hmm-row">
            <span className="hmm-name">Soto <span className="hmm-id">B-04</span></span>
            <span className="tt-bpm bpm-warn">176</span>
            <span className="status-badge s-rehab">Rehab.</span>
          </div>
        </div>
      </div>

      {/* ── Ecosystem visual ── */}
      <div
        className="hero-visual"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="eco-stage" ref={stageRef}>
          <div className="eco-3d">

            <div className="eco-glow" aria-hidden="true" />
            <div className="eco-floor" aria-hidden="true" />

            {/* Tactical tablet — back layer */}
            <div className="eco-tablet">
              <span className="eco-tablet-cam" aria-hidden="true" />
              <TabletDash bpm={bpm} />
            </div>

            {/* Telemetry SVG layer */}
            <svg
              className="eco-conn"
              viewBox="0 0 580 540"
              aria-hidden="true"
              overflow="visible"
            >
              <path className="eco-wire" d={WIRE_A} />
              <path className="eco-flow" d={WIRE_A} />
              <path className="eco-wire" d={WIRE_B} />
              <path className="eco-flow eco-flow-b" d={WIRE_B} />
              <circle className="eco-node eco-node-pulse" cx="240" cy="360" r="4" />
              <circle className="eco-node" cx="148" cy="195" r="3" />
            </svg>

            <div className="eco-wirelabel">Telemetría activa</div>

            {/* Watch — front layer */}
            <div className="eco-watch">
              <img
                src="/images/watch-vigia.png"
                alt="VIGÍA — dispositivo de monitoreo táctico"
                width={252}
                height={280}
              />
            </div>

            {/* BPM chip */}
            <div className="eco-chip eco-chip-a">
              <span className="eco-chip-l">BPM</span>
              <span className={`eco-chip-v ${bpmCls}`}>{bpm}</span>
            </div>

            {/* SpO₂ chip */}
            <div className="eco-chip eco-chip-b">
              <span className="eco-chip-l">SpO₂</span>
              <span className="eco-chip-v bpm-ok">98%</span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
