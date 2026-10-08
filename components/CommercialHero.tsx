'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { HeroAtmosphere } from './CommercialAtmosphere'
import { Icon } from './CommercialIcons'
import { track } from '@/lib/analytics'

// Illustrative recreation of the VIGÍA field dashboard: same structure and labels as the
// product (incident strip, KPI strip, personnel cards, "Lecturas del reloj" panel).
// Values follow the product thresholds: Pulso ≥ 140 bpm sets the "Alerta" status.
const FC_ALERT = 140

type Row = { id: string; rank: string; name: string; bpm: number; lo: number; hi: number; spo2: number; temp: number; age: number }

const ROWS_INIT: Row[] = [
  { id: 'B-02', rank: 'Tte.',  name: 'Muñoz',    bpm: 172, lo: 165, hi: 179, spo2: 96, temp: 37.9, age: 6  },
  { id: 'B-04', rank: 'Bbro.', name: 'Soto',     bpm: 148, lo: 142, hi: 156, spo2: 97, temp: 37.6, age: 21 },
  { id: 'B-01', rank: 'Cap.',  name: 'Rojas',    bpm: 126, lo: 116, hi: 136, spo2: 98, temp: 37.1, age: 12 },
  { id: 'B-03', rank: 'Vol.',  name: 'Pérez',    bpm: 118, lo: 104, hi: 130, spo2: 97, temp: 36.9, age: 33 },
  { id: 'B-05', rank: 'Vol.',  name: 'Cárdenas', bpm: 110, lo: 98,  hi: 124, spo2: 98, temp: 37.0, age: 18 },
]

// The example emergency began 24 minutes before the page loaded.
const INCIDENT_OFFSET_MIN = 24
const fmtTemp = (t: number) => t.toFixed(1).replace('.', ',')
const isAlert = (r: Row) => r.bpm >= FC_ALERT

function TabletDash() {
  const [rows, setRows] = useState<Row[]>(ROWS_INIT)
  const [elapsedMin, setElapsedMin] = useState(INCIDENT_OFFSET_MIN)

  // Readings arrive per watch, not all at once: every tick ages all rows and refreshes one.
  useEffect(() => {
    const t0 = Date.now()
    const id = setInterval(() => {
      setElapsedMin(INCIDENT_OFFSET_MIN + Math.floor((Date.now() - t0) / 60000))
      setRows(prev => {
        const pick = Math.floor(Math.random() * prev.length)
        return prev.map((r, i) => i === pick
          ? { ...r, age: 1, bpm: Math.max(r.lo, Math.min(r.hi, Math.round(r.bpm + (Math.random() - 0.5) * 8))) }
          : { ...r, age: r.age + 1 })
      })
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const focus = rows[0]
  const kpis: [string, number, string][] = [
    ['Relojes en línea', rows.length, 'ok'],
    ['En alerta', rows.filter(isAlert).length, 'warn'],
    ['SOS', 0, 'sos'],
    ['Sin señal', 0, ''],
    ['Temp alta', 0, 'warn'],
    ['Batería baja', 0, 'warn'],
  ]

  return (
    <div className="eco-tablet">
      <span className="eco-tablet-cam" />
      <div className="eco-screen">
        <div className="td-top">
          <span className="td-mark">
            <Image src="/images/logo-vigia.png" alt="" width={18} height={18} style={{ objectFit: 'contain' }} />
            <b>VIGÍA</b>
          </span>
          <span className="td-nav">
            <span className="is-active">Dashboard</span>
            <span>Historial</span>
            <span>Voluntarios</span>
          </span>
          <span className="td-health"><i />Sistema operativo</span>
        </div>

        <div className="td-inc">
          <b>Emergencia activa</b>
          <span className="td-inc-bits">Estructural · B-12 · Cap. Rojas</span>
          <span className="td-inc-time">{elapsedMin}m</span>
          <span className="td-inc-btn">Cerrar emergencia</span>
        </div>

        <div className="td-kpis">
          {kpis.map(([l, v, tone]) => (
            <div key={l} className={`td-kpi${v === 0 ? ' is-zero' : ` is-${tone}`}`}>
              <span className="v">{v}</span>
              <span className="l">{l}</span>
            </div>
          ))}
        </div>

        <div className="td-body">
          <ul className="td-personnel-grid" aria-label="Bomberos en terreno">
            {rows.map((r, i) => (
              <li key={r.id} className={`td-personnel-card${isAlert(r) ? ' is-alert' : ''}${i === 0 ? ' is-selected' : ''}`}>
                <span className="td-card-name">{r.rank} {r.name}</span>
                <div className="td-card-summary">
                  <span className={`td-card-pulse${isAlert(r) ? ' is-crit' : ''}`}>
                    {r.bpm}<small>bpm</small>
                  </span>
                  <span className={`td-pill ${isAlert(r) ? 'warn' : 'ok'}`}>{isAlert(r) ? 'Alerta' : 'Normal'}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="td-drawer">
            <div className="td-drawer-hd">
              <b>{focus.rank} {focus.name}</b>
              <span className="td-pill warn">Alerta</span>
            </div>
            <div className="td-sec-t">Lecturas del reloj</div>
            <div className="td-sec-c">Datos del reloj, sin grado médico.</div>
            <div className="td-readings">
              {([
                ['Pulso', `${focus.bpm}`, 'bpm', true],
                ['SpO₂', `${focus.spo2}`, '%', false],
                ['Temp.', fmtTemp(focus.temp), '°C', false],
              ] as [string, string, string, boolean][]).map(([l, v, u, alert]) => (
                <div key={l} className="td-reading">
                  <span className="l">{l}</span>
                  <span className={`v${alert ? ' is-crit' : ''}`}>{v}<small>{u}</small></span>
                  <span className="a">hace {focus.age} s · LoRa</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="td-foot">VIGÍA es apoyo operacional al mando. No es un dispositivo médico.</div>
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
