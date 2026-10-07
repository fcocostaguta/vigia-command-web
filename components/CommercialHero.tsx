'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { HeroAtmosphere, Signal } from './CommercialAtmosphere'
import { Icon } from './CommercialIcons'
import { track } from '@/lib/analytics'

function ekgTiled(W: number, beats: number): string {
  const seg = W / beats, mid = 17
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

type Tone = 'ok' | 'warn' | 'crit'
type RowState = { id: string; rank: string; name: string; bpm: number; temp: number; tone: Tone }

const TD_INIT: RowState[] = [
  { id: 'B-01', rank: 'Cap.',  name: 'Rojas',    bpm: 142, temp: 37.1, tone: 'ok'   },
  { id: 'B-02', rank: 'Tte.',  name: 'Muñoz',    bpm: 181, temp: 37.9, tone: 'crit' },
  { id: 'B-03', rank: 'Vol.',  name: 'Pérez',    bpm: 128, temp: 36.9, tone: 'ok'   },
  { id: 'B-04', rank: 'Bbro.', name: 'Soto',     bpm: 168, temp: 37.6, tone: 'warn' },
  { id: 'B-05', rank: 'Vol.',  name: 'Cárdenas', bpm: 116, temp: 37.0, tone: 'ok'   },
]

// Example incident started 2:18 before the page loaded; the timer keeps counting from there.
const INCIDENT_OFFSET_S = 2 * 60 + 18
const fmtTemp = (t: number) => t.toFixed(1).replace('.', ',')
const fmtElapsed = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function TabletDash() {
  const [rows, setRows] = useState<RowState[]>(TD_INIT)
  const [clock, setClock] = useState('')
  const [elapsed, setElapsed] = useState(INCIDENT_OFFSET_S)
  const ekg = ekgTiled(360, 5)

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
    const id = setInterval(() => setRows(p => p.map(r => {
      if (r.tone === 'crit') {
        return { ...r, bpm: Math.max(176, Math.min(188, Math.round(r.bpm + (Math.random() - 0.5) * 4))) }
      }
      const nb = Math.max(96, Math.min(174, Math.round(r.bpm + (Math.random() - 0.48) * 6)))
      return { ...r, bpm: nb, tone: (nb >= 160 ? 'warn' : 'ok') as Tone }
    })), 1500)
    return () => clearInterval(id)
  }, [])

  const focus = rows[1]
  const alerts = rows.filter(r => r.tone !== 'ok').length

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
              <div key={r.id} className={`td-row${r.tone === 'crit' ? ' alert' : ''}`}>
                <span className="td-nm">
                  <b>{r.rank} {r.name}</b>
                  <i>{r.id}</i>
                </span>
                <span className={`td-num ${r.tone === 'crit' ? 'vg-bpm-crit' : r.tone === 'warn' ? 'vg-bpm-warn' : 'vg-bpm-ok'}`}>
                  {r.bpm}
                </span>
                <span className="td-num td-temp">{fmtTemp(r.temp)}</span>
                <span className={`td-sdot ${r.tone}`} />
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
              <div className="td-vitals" aria-hidden="true">
                <svg viewBox="0 0 720 34" preserveAspectRatio="none">
                  <path d={ekg} />
                </svg>
              </div>
              <div className="td-subvitals">
                <div><span className="k">SpO₂</span><span className="v">95<small>%</small></span></div>
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

  const chipBpmCls = bpm >= 152 ? 'vg-bpm-warn' : 'vg-bpm-ok'

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
