'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import HeroBackground from './HeroBackground'
import Icon from './Icons'

// DS-spec tiling EKG path — tile 0 + tile W for seamless scroll loop
function ekgTiled(W: number, beats: number): string {
  const seg = W / beats
  const mid = 17
  const tile = (off: number) => {
    let d = ''
    for (let i = 0; i < beats; i++) {
      const x = off + i * seg
      d += ` H${(x + seg * 0.40).toFixed(1)}`
      d += ` l${(seg * 0.05).toFixed(1)} -4 l${(seg * 0.05).toFixed(1)} 7 l${(seg * 0.05).toFixed(1)} -15 l${(seg * 0.05).toFixed(1)} 20 l${(seg * 0.05).toFixed(1)} -8`
      d += ` H${(off + (i + 1) * seg).toFixed(1)}`
    }
    return d
  }
  return `M0 ${mid}${tile(0)}${tile(W)}`
}

// ── TabletDash ────────────────────────────────────────────────────────────────
type Tone = 'ok' | 'warn' | 'crit'
type RowState = { id: string; rank: string; name: string; bpm: number; tone: Tone }

const TD_INIT: RowState[] = [
  { id: 'B-01', rank: 'Cap.',  name: 'Rojas',    bpm: 142, tone: 'ok'   },
  { id: 'B-02', rank: 'Tte.',  name: 'Muñoz',    bpm: 181, tone: 'crit' },
  { id: 'B-03', rank: 'Vol.',  name: 'Pérez',    bpm: 128, tone: 'ok'   },
  { id: 'B-04', rank: 'Bbro.', name: 'Soto',     bpm: 168, tone: 'warn' },
  { id: 'B-05', rank: 'Vol.',  name: 'Cárdenas', bpm: 116, tone: 'ok'   },
]

function toneBpmCls(tone: Tone): string {
  return tone === 'crit' ? 'bpm-crit' : tone === 'warn' ? 'bpm-warn' : 'bpm-ok'
}
function toneSdotCls(tone: Tone): string {
  return tone === 'crit' ? 'td-sdot-crit' : tone === 'warn' ? 'td-sdot-warn' : 'td-sdot-ok'
}

function TabletDash({ bpm: _bpm }: { bpm: number }) {
  const [rows, setRows] = useState<RowState[]>(TD_INIT)
  const [clock, setClock] = useState('')
  const ekg = ekgTiled(360, 5)

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRows(p => p.map(r => {
      if (r.tone === 'crit') {
        return { ...r, bpm: Math.max(176, Math.min(188, Math.round(r.bpm + (Math.random() - 0.5) * 4))) }
      }
      const nb = Math.max(96, Math.min(174, Math.round(r.bpm + (Math.random() - 0.48) * 6)))
      return { ...r, bpm: nb, tone: (nb >= 160 ? 'warn' : 'ok') as Tone }
    })), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="eco-screen">
      <div className="td-top">
        <div className="td-mark">
          <b>VIGÍA COMMAND</b>
        </div>
        <span className="td-live">
          <span className="pulse-dot" style={{ width: 5, height: 5, flexShrink: 0 }} />
          En vivo
        </span>
        <span className="td-clock" suppressHydrationWarning>{clock}</span>
      </div>

      <div className="td-inc">
        <span className="td-inc-dot" />
        Incendio estructural · 2ª alarma · Maitencillo
        <span className="td-inc-dur">02:18</span>
      </div>

      <div className="td-body">
        <div className="td-roster">
          <div className="td-rhd">
            <span>Personal activo</span>
            <span>BPM</span>
          </div>
          {rows.map(r => (
            <div key={r.id} className={`td-row${r.tone === 'crit' ? ' td-row-alert' : ''}`}>
              <span className="td-nm">
                <b>{r.rank} {r.name}</b>
                <i>{r.id}</i>
              </span>
              <span className={`td-bpm ${toneBpmCls(r.tone)}`}>{r.bpm}</span>
              <span className={`td-sdot ${toneSdotCls(r.tone)}`} />
            </div>
          ))}
        </div>

        <div className="td-mon">
          <div className="td-card">
            <div className="td-card-k">Frecuencia · Tte. Muñoz</div>
            <div className="td-bigwrap">
              <span className={`td-big ${toneBpmCls(rows[1].tone)}`}>{rows[1].bpm}</span>
              <span className="td-unit">bpm</span>
            </div>
            <div className="td-vitals" aria-hidden="true">
              <svg viewBox="0 0 720 34" preserveAspectRatio="none">
                <path className="td-vitals-path" d={ekg} />
              </svg>
            </div>
          </div>

          <div className="td-alertbar">
            <span className="td-alertbar-pin" />
            Alerta biométrica · reevaluar
          </div>

          <div className="td-card" style={{ display: 'flex', gap: 14 }}>
            <div>
              <div className="td-card-k">Operadores</div>
              <div className="td-bigwrap"><span className="td-big">5</span></div>
            </div>
            <div>
              <div className="td-card-k">Alertas</div>
              <div className="td-bigwrap"><span className="td-big bpm-crit">2</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="td-foot">
        <span><b>5</b> operadores</span>
        <span><b>2</b> alertas</span>
        <span className="td-conn">Sincronizado</span>
        <div className="td-spark" aria-hidden="true">
          {[...Array(6)].map((_, i) => <i key={i} />)}
        </div>
      </div>
    </div>
  )
}

// Wire paths — DS spec, in the 580×540 SVG coordinate space
const WIRE_A = 'M 168 318 C 196 286 214 250 256 226'
const WIRE_B = 'M 176 338 C 250 320 318 312 372 296'

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

  const chipBpmCls = bpm >= 152 ? 'bpm-warn' : 'bpm-ok'

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

            {/* Tactical tablet — protagonist */}
            <div className="eco-tablet">
              <span className="eco-tablet-cam" aria-hidden="true" />
              <TabletDash bpm={bpm} />
            </div>

            {/* Telemetry SVG — DS-spec paths and packet travellers */}
            <svg
              className="eco-conn"
              viewBox="0 0 580 540"
              aria-hidden="true"
              overflow="visible"
            >
              <path className="eco-wire" d={WIRE_A} />
              <path className="eco-wire" d={WIRE_B} />
              <path className="eco-flow" d={WIRE_A} />
              <path className="eco-flow eco-flow-b" d={WIRE_B} />
              <circle className="eco-node eco-node-pulse" cx="168" cy="318" r="3" />
              <circle className="eco-node eco-node-pulse" cx="176" cy="338" r="3" />
              <circle className="eco-node" cx="256" cy="226" r="2.4" />
              <circle className="eco-node" cx="372" cy="296" r="2.4" />
              <g className="eco-packet eco-pk-1"><circle r="2.6" /></g>
              <g className="eco-packet eco-pk-2"><circle r="2.6" /></g>
              <g className="eco-packet eco-pk-3"><circle r="2.2" /></g>
            </svg>

            <div className="eco-wirelabel">Telemetría activa</div>

            {/* Watch — secondary, front layer */}
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
              <span className={`eco-chip-v ${chipBpmCls} pulsing`}>{bpm}</span>
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
