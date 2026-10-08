'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { HeroAtmosphere, Signal } from './CommercialAtmosphere'
import { Icon } from './CommercialIcons'
import { track } from '@/lib/analytics'

type Tone = 'ok' | 'warn' | 'crit'
type RowState = { id: string; rank: string; name: string; bpm: number; lo: number; hi: number; temp: number }

// Example values follow the product's alert thresholds: FC ≥ 140 warns, FC ≥ 160 is critical.
const FC_WARN = 140
const FC_CRIT = 160
const toneOf = (bpm: number): Tone => (bpm >= FC_CRIT ? 'crit' : bpm >= FC_WARN ? 'warn' : 'ok')

const TD_INIT: RowState[] = [
  { id: 'B-01', rank: 'Cap.',  name: 'Rojas',    bpm: 126, lo: 116, hi: 136, temp: 37.1 },
  { id: 'B-02', rank: 'Tte.',  name: 'Muñoz',    bpm: 172, lo: 165, hi: 179, temp: 37.9 },
  { id: 'B-03', rank: 'Vol.',  name: 'Pérez',    bpm: 118, lo: 104, hi: 130, temp: 36.9 },
  { id: 'B-04', rank: 'Bbro.', name: 'Soto',     bpm: 148, lo: 142, hi: 156, temp: 37.6 },
  { id: 'B-05', rank: 'Vol.',  name: 'Cárdenas', bpm: 110, lo: 98,  hi: 124, temp: 37.0 },
]

// FC trend: discrete readings as the watch reports them, plotted against the critical threshold.
const TREND_LEN = 14
const TREND_MIN = 132
const TREND_MAX = 184
const trendY = (v: number) => 26 - ((v - TREND_MIN) / (TREND_MAX - TREND_MIN)) * 26
const TREND_INIT = [146, 151, 155, 158, 161, 164, 163, 167, 169, 168, 171, 170, 173, 172]

// Example incident started 2:18 before the page loaded; the timer keeps counting from there.
const INCIDENT_OFFSET_S = 2 * 60 + 18
const fmtTemp = (t: number) => t.toFixed(1).replace('.', ',')
const fmtElapsed = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function TabletDash() {
  const [rows, setRows] = useState<RowState[]>(TD_INIT)
  const [clock, setClock] = useState('')
  const [elapsed, setElapsed] = useState(INCIDENT_OFFSET_S)
  const [trend, setTrend] = useState<number[]>(TREND_INIT)

  useEffect(() => {
    const t0 = Date.now()
    const t = () => {
      setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }))
      setElapsed(INCIDENT_OFFSET_S + Math.floor((Date.now() - t0) / 1000))
    }
    t()
    const id = setInterval(t, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRows(p => p.map(r => ({
      ...r,
      bpm: Math.max(r.lo, Math.min(r.hi, Math.round(r.bpm + (Math.random() - 0.5) * 6))),
    }))), 1500)
    return () => clearInterval(id)
  }, [])

  const focusBpm = rows[1].bpm
  useEffect(() => { setTrend(t => [...t.slice(1), focusBpm]) }, [focusBpm])

  const focus = rows[1]
  const alerts = rows.filter(r => toneOf(r.bpm) !== 'ok').length
  const pts = trend.map((v, i) => `${(i * 160 / (TREND_LEN - 1)).toFixed(1)},${trendY(v).toFixed(1)}`)

  return (
    <div className="eco-tablet">
      <span className="eco-tablet-cam" />
      <div className="eco-screen">
        <div className="td-top">
          <span className="td-mark">
            <Image src="/images/logo-vigia.png" alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
            <b>VIGÍA COMMAND</b>
          </span>
          <span className="td-demo">Datos de ejemplo</span>
          <span className="td-clock" suppressHydrationWarning>{clock}</span>
        </div>

        <div className="td-inc">
          <span className="dot" />
          <b>Incidente activo</b>
          <span className="td-inc-sep" />
          <span>{rows.length} en terreno</span>
          <span className="dur" suppressHydrationWarning>{fmtElapsed(elapsed)}</span>
        </div>

        <div className="td-body">
          <div className="td-roster">
            <div className="td-rhd">
              <span>Personal</span>
              <span>FC</span>
              <span>T °C</span>
              <span />
            </div>
            {rows.map(r => (
              <div key={r.id} className={`td-row${toneOf(r.bpm) === 'crit' ? ' alert' : ''}`}>
                <span className="td-nm">
                  <b>{r.rank} {r.name}</b>
                  <i>{r.id}</i>
                </span>
                <span className={`td-num vg-bpm-${toneOf(r.bpm)}`}>
                  {r.bpm}
                </span>
                <span className="td-num td-temp">{fmtTemp(r.temp)}</span>
                <span className={`td-sdot ${toneOf(r.bpm)}`} />
              </div>
            ))}
          </div>

          <div className="td-mon">
            <div className="td-card td-focus">
              <div className="td-focus-hd">
                <span><b>{focus.rank} {focus.name}</b> {focus.id}</span>
                <span className="td-state crit">Alerta</span>
              </div>
              <div className="k">Frecuencia cardiaca</div>
              <div className="td-bigwrap">
                <span className="td-big crit">{focus.bpm}</span>
                <span className="td-unit">bpm</span>
              </div>
              <div className="td-trend" aria-hidden="true">
                <svg viewBox="0 0 160 26" preserveAspectRatio="none">
                  <line className="td-trend-th" x1="0" x2="160" y1={trendY(FC_CRIT)} y2={trendY(FC_CRIT)} />
                  <polyline points={pts.join(' ')} />
                </svg>
                <span className="td-trend-l">Umbral {FC_CRIT}</span>
              </div>
              <div className="td-subvitals">
                <div><span className="k">SpO₂</span><span className="v">97<small>%</small></span></div>
                <div><span className="k">Temp.</span><span className="v">{fmtTemp(focus.temp)}<small>°C</small></span></div>
              </div>
            </div>

            <div className="td-alertbar">
              <span className="pin" />
              <span>Alerta biométrica</span>
              <b>Reevaluar</b>
            </div>
          </div>
        </div>

        <div className="td-foot">
          <span><b>{rows.length}</b> operadores</span>
          <span><b className={alerts ? 'is-alert' : undefined}>{alerts}</b> en alerta</span>
          <span className="td-conn"><Signal /> Sincronizado</span>
        </div>
      </div>
    </div>
  )
}

export default function CommercialHero({ onContact, bpm }: { onContact: () => void; bpm: number }) {
  const ref = useRef<HTMLElement>(null)
  const raf = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf.current)
      raf.current = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const x = ((e.clientX - r.left) / r.width) * 100
        const y = ((e.clientY - r.top) / r.height) * 100
        el.style.setProperty('--mx', x.toFixed(1) + '%')
        el.style.setProperty('--my', y.toFixed(1) + '%')
        el.style.setProperty('--px', ((e.clientX - r.left) / r.width - 0.5).toFixed(3))
        el.style.setProperty('--py', ((e.clientY - r.top) / r.height - 0.5).toFixed(3))
      })
    }
    el.addEventListener('pointermove', onMove)
    return () => { el.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf.current) }
  }, [])

  const chipBpmCls = bpm >= 140 ? 'vg-bpm-warn' : 'vg-bpm-ok'

  return (
    <section className="vk-hero" id="inicio" ref={ref}>
      <HeroAtmosphere />

      <div className="vk-hero-content">
        <div className="vk-kicker">
          <span className="vg-pulse-dot" /> Tecnología operacional para emergencias
        </div>
        <h1>
          Información crítica<br />
          del personal.<br />
          Directo <em>al mando.</em>
        </h1>
        <p className="vk-hero-sub">
          Monitoreo del personal, alertas y registro del evento en una sola plataforma,
          pensada para apoyar al mando incluso cuando la conectividad es limitada.
        </p>
        <div className="vk-hero-actions">
          <button className="vg-btn vg-btn-red vg-btn-lg" onClick={() => { track('cta_contact_click', { placement: 'hero' }); onContact() }}>
            Conversemos <Icon name="arrow" />
          </button>
          <a
            className="vg-btn vg-btn-ghost vg-btn-lg"
            href="#como-funciona"
          >
            Ver cómo funciona
          </a>
        </div>
        <div className="vk-hero-micro">
          <span>Bomberos</span>
          <span>Brigadas industriales</span>
          <span>Equipos de respuesta</span>
        </div>
      </div>

      <div className="vk-hero-visual">
        <div className="eco-stage">
          <div className="eco-3d">
            <div className="eco-glow" />
            <div className="eco-floor" />
            <TabletDash />
            <svg className="eco-conn" viewBox="0 0 580 540" aria-hidden="true" overflow="visible">
              <path className="wire" d="M 168 318 C 196 286 214 250 256 226" />
              <path className="wire" d="M 176 338 C 250 320 318 312 372 296" />
              <path className="flow" d="M 168 318 C 196 286 214 250 256 226" />
              <path className="flow b" d="M 176 338 C 250 320 318 312 372 296" />
              <circle className="eco-node pulse" cx="168" cy="318" r="3" />
              <circle className="eco-node pulse" cx="176" cy="338" r="3" />
              <circle className="eco-node" cx="256" cy="226" r="2.4" />
              <circle className="eco-node" cx="372" cy="296" r="2.4" />
              <g className="eco-packet eco-pk-1"><circle r="2.6" /></g>
              <g className="eco-packet eco-pk-2"><circle r="2.6" /></g>
              <g className="eco-packet eco-pk-3"><circle r="2.2" /></g>
            </svg>
            <div className="eco-wirelabel one">Telemetría</div>
            <div className="eco-watch">
              <Image
                src="/images/watch-vigia.png"
                alt="Reloj de monitoreo VIGÍA"
                width={1024}
                height={683}
                sizes="(max-width: 980px) 190px, 252px"
                priority
              />
            </div>
            <div className="eco-vitals" aria-hidden="true">
              <div className="eco-chip">
                <span className="l">Pulso</span>
                <span className={`v ${chipBpmCls}`}>{bpm}<small>bpm</small></span>
              </div>
              <div className="eco-chip">
                <span className="l">SpO₂</span>
                <span className="v vg-bpm-ok">98<small>%</small></span>
              </div>
              <div className="eco-chip">
                <span className="l">Temp.</span>
                <span className="v vg-bpm-ok">37,1<small>°C</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
