'use client'

import { useState, useEffect } from 'react'
import { Corners, Signal } from './CommercialAtmosphere'
import { Icon, Tag, Badge, bpmCls } from './CommercialIcons'

const NAV: [string, string][] = [
  ['Solución', 'solucion'],
  ['Cómo funciona', 'como-funciona'],
  ['Casos de uso', 'casos'],
  ['Contacto', 'contacto'],
]

function go(id: string) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function CommercialHeader({ onContact }: { onContact: () => void }) {
  return (
    <header className="vk-header">
      <div className="vk-header-inner">
        <a
          className="vk-logo"
          style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
          onClick={() => go('inicio')}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo-vigia.png" alt="VIGÍA" style={{ width: 34, height: 34, objectFit: 'contain' }} />
          <span style={{ fontFamily: 'var(--font-h)', fontSize: '1.3rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            VIGÍA
          </span>
        </a>
        <nav className="vk-nav">
          {NAV.map(([l, id]) => (
            <a key={id} onClick={() => go(id)} style={{ cursor: 'pointer' }}>{l}</a>
          ))}
        </nav>
        <div className="vk-header-ctas">
          <button className="vg-btn vg-btn-ghost vg-btn-sm" onClick={onContact}>CONVERSEMOS</button>
          <a
            className="vg-btn-ingresar"
            href="https://mando.vigiacommand.cl"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="lock" /> Ingresar
          </a>
        </div>
      </div>
    </header>
  )
}

type Tone = 'ok' | 'warn' | 'crit'
interface PanelRow {
  id: string; rank: string; name: string; bpm: number
  status: string; tone: Tone; alert: string | null
}

const INIT_ROWS: PanelRow[] = [
  { id: 'B-01', rank: 'Cap.',  name: 'Rojas',    bpm: 142, status: 'Operativo',  tone: 'ok',   alert: null         },
  { id: 'B-02', rank: 'Tte.',  name: 'Muñoz',    bpm: 168, status: 'Exigido',    tone: 'warn', alert: 'Reevaluar'  },
  { id: 'B-03', rank: 'Vol.',  name: 'Pérez',    bpm: 118, status: 'Disponible', tone: 'ok',   alert: null         },
  { id: 'B-04', rank: 'Bbro.', name: 'Soto',     bpm: 176, status: 'Rehab.',     tone: 'warn', alert: 'Alta carga' },
  { id: 'B-05', rank: 'Vol.',  name: 'Cárdenas', bpm: 104, status: 'Operativo',  tone: 'ok',   alert: null         },
]

export function CommercialPanel() {
  const [rows, setRows] = useState<PanelRow[]>(INIT_ROWS)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }))
    t()
    const id = setInterval(t, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setRows(p => p.map(r =>
      r.status === 'Rehab.' ? r
        : { ...r, bpm: Math.max(60, Math.min(185, Math.round(r.bpm + (Math.random() - 0.48) * 5))) }
    )), 1600)
    return () => clearInterval(id)
  }, [])

  const rowTone = (r: PanelRow): Tone => r.bpm >= 170 ? 'crit' : r.tone
  const rowBg = (r: PanelRow) =>
    (r.bpm >= 170 || r.alert === 'Alta carga') ? 'is-alert' : r.status === 'Rehab.' ? 'is-rehab' : ''

  return (
    <section className="vk-section alt" id="solucion">
      <div className="vk-container vk-panel-wrap">

        <div data-reveal="left">
          <Tag>VIGÍA Command · Software</Tag>
          <h2 style={{ marginTop: 16 }}>Del sensor al mando, en segundos.</h2>
          <div className="vk-flowlist">
            {([
              ['01', 'Monitoreo en el operador'],
              ['02', 'Punto de mando local'],
              ['03', 'Panel VIGÍA Command'],
            ] as [string, string][]).map(([n, h], i) => (
              <div className="step" key={n} data-reveal style={{ '--d': (0.1 + i * 0.08) + 's' } as React.CSSProperties}>
                <span className="n">{n}</span>
                <h4>{h}</h4>
              </div>
            ))}
          </div>
        </div>

        <div data-reveal="right">
          <div style={{ marginBottom: 14 }}><Tag>Panel táctico · Vista en vivo</Tag></div>
          <div className="vk-table">
            <Corners />
            <div className="vk-tt-top">
              <span className="vk-tt-live"><span className="vg-pulse-dot is-fast" /> VIGÍA Command · En vivo</span>
              <span className="vk-tt-incident">Incendio estructural · 2ª alarma</span>
              <span className="vk-tt-time" suppressHydrationWarning>{clock}</span>
            </div>
            <div className="vk-tt-head">
              <div>Cargo</div><div>Nombre</div><div>BPM</div><div>Estado</div><div>Alerta</div>
            </div>
            {rows.map(r => (
              <div key={r.id} className={`vg-trow ${rowBg(r)}`}>
                <div className="vg-trow-rank">{r.rank}</div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="vg-trow-name">{r.name}</span>
                  <span className="vg-trow-id">{r.id}</span>
                </div>
                <div><span className={`vg-trow-bpm ${bpmCls(r.bpm)}`}>{r.bpm}</span></div>
                <div><Badge tone={rowTone(r)}>{r.status}</Badge></div>
                <div style={{ fontFamily: 'var(--font-m)', fontSize: 10, color: r.alert ? 'var(--amber)' : 'var(--faint)', letterSpacing: '0.06em' }}>
                  {r.alert || '—'}
                </div>
              </div>
            ))}
            <div className="vk-tt-foot">
              <span>5 operadores · 2 alertas activas</span>
              <span className="ok"><Signal /> En línea</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

const FLOW_STEPS = [
  { n: '01', label: 'El reloj',            desc: 'Toma señales críticas del operador.',     icon: 'pulse'  as const },
  { n: '02', label: 'El mando centraliza', desc: 'Visibilidad operacional en tiempo real.',  icon: 'screen' as const },
  { n: '03', label: 'El oficial decide',   desc: 'Estado en vivo de cada operador.',         icon: 'eye'    as const },
  { n: '04', label: 'Queda registro',      desc: 'El incidente se archiva automáticamente.', icon: 'lock'   as const },
]

export function CommercialFlow() {
  return (
    <section className="vk-section" id="como-funciona">
      <div className="vk-container">
        <div style={{ textAlign: 'center', marginBottom: 56 }} data-reveal>
          <h2>Así funciona en terreno.</h2>
        </div>
        <div className="vk-flow-steps">
          {FLOW_STEPS.map((s, i) => (
            <>
              <div
                key={s.n}
                className="vk-flow-step"
                data-reveal="scale"
                style={{ '--d': (i * 0.1) + 's' } as React.CSSProperties}
              >
                <div className="vk-flow-ico"><Icon name={s.icon} size={26} /></div>
                <div className="vk-flow-n">{s.n}</div>
                <div className="vk-flow-label">{s.label}</div>
                <div className="vk-flow-desc">{s.desc}</div>
              </div>
              {i < FLOW_STEPS.length - 1 && <div key={`arr-${i}`} className="vk-flow-arrow">→</div>}
            </>
          ))}
        </div>
      </div>
    </section>
  )
}
