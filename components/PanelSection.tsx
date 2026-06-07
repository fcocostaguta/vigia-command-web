'use client'

import { useState, useEffect } from 'react'

type Row = {
  id: string
  rank: string
  name: string
  bpm: number
  sig: number
  status: string
  alert: string | null
}

const INIT_ROWS: Row[] = [
  { id: 'B-01', rank: 'Cap.',  name: 'Rojas',    bpm: 142, sig: 4, status: 'Operativo',  alert: null },
  { id: 'B-02', rank: 'Tte.',  name: 'Muñoz',    bpm: 168, sig: 3, status: 'Exigido',    alert: 'Reevaluar' },
  { id: 'B-03', rank: 'Vol.',  name: 'Pérez',    bpm: 118, sig: 4, status: 'Disponible', alert: null },
  { id: 'B-04', rank: 'Bbro.', name: 'Soto',     bpm: 176, sig: 2, status: 'Rehab.',     alert: 'Alta carga' },
  { id: 'B-05', rank: 'Vol.',  name: 'Cárdenas', bpm: 104, sig: 4, status: 'Operativo',  alert: null },
]

function SigBars({ n, warn }: { n: number; warn: boolean }) {
  return (
    <div className="sig-bars">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className={`sig-bar${i <= n ? ' on' : ''}${warn ? ' warn' : ''}`}></div>
      ))}
    </div>
  )
}

function TacticalTable() {
  const [rows, setRows] = useState<Row[]>(INIT_ROWS)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString('es-CL', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setRows(prev => prev.map(r => {
        if (r.status === 'Rehab.') return r
        const delta = (Math.random() - 0.48) * 5
        return { ...r, bpm: Math.max(60, Math.min(185, Math.round(r.bpm + delta))) }
      }))
    }, 1600)
    return () => clearInterval(id)
  }, [])

  const bpmClass  = (bpm: number) => bpm >= 170 ? 'bpm-crit' : bpm >= 150 ? 'bpm-warn' : 'bpm-ok'
  const statusCls = (s: string)   => s === 'Operativo' || s === 'Disponible' ? 's-ok' : s === 'Exigido' ? 's-warn' : 's-rehab'
  const rowCls    = (r: Row)      => r.bpm >= 170 || r.alert === 'Alta carga' ? 'tt-row alert-row' : r.status === 'Rehab.' ? 'tt-row rehab-row' : 'tt-row'

  return (
    <div className="tactical-table">
      <div className="tt-topbar">
        <div className="tt-live">VIGÍA Command · En vivo</div>
        <div className="tt-incident">Incendio estructural · 2ª alarma</div>
        <div className="tt-time mono" suppressHydrationWarning>{clock}</div>
      </div>
      <div className="tt-thead">
        <div className="tt-col-cargo">Cargo</div>
        <div>Nombre</div>
        <div>BPM</div>
        <div>Estado</div>
        <div className="tt-col-signal">Señal</div>
        <div>Alerta</div>
      </div>
      {rows.map(r => (
        <div key={r.id} className={rowCls(r)}>
          <div className="tt-cell tt-col-cargo">
            <span className="tt-rank">{r.rank}</span>
          </div>
          <div className="tt-cell" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 0 }}>
            <div className="tt-name">{r.name}</div>
            <div className="tt-id mono">{r.id}</div>
          </div>
          <div className="tt-cell">
            <span className={`tt-bpm ${bpmClass(r.bpm)}`}>{r.bpm}</span>
          </div>
          <div className="tt-cell">
            <span className={`status-badge ${statusCls(r.status)}`}>{r.status}</span>
          </div>
          <div className="tt-cell tt-col-signal">
            <SigBars n={r.sig} warn={r.sig <= 2} />
          </div>
          <div className="tt-cell">
            {r.alert
              ? <span className={`alert-tag${r.bpm >= 170 ? ' crit' : ''}`}>{r.alert}</span>
              : <span style={{ color: 'var(--faint)', fontSize: 10 }}>—</span>
            }
          </div>
        </div>
      ))}
      <div className="tt-footer">
        <span>5 operadores · 2 alertas activas</span>
        <div className="tt-footer-status mono">En línea</div>
      </div>
    </div>
  )
}

export default function PanelSection() {
  return (
    <section className="panel-section" id="solucion">
      <div className="container">
        <div className="panel-wrap">
          <div className="panel-lead reveal">
            <div className="tag">VIGÍA Command · Software</div>
            <h2>Del sensor al mando, en segundos.</h2>
            <div className="panel-flow">
              <div className="flow-step">
                <div className="flow-n">01</div>
                <div className="flow-step-body">
                  <h4>Monitoreo en el operador</h4>
                </div>
              </div>
              <div className="flow-step">
                <div className="flow-n">02</div>
                <div className="flow-step-body">
                  <h4>Punto de mando local</h4>
                </div>
              </div>
              <div className="flow-step">
                <div className="flow-n">03</div>
                <div className="flow-step-body">
                  <h4>Panel VIGÍA Command</h4>
                </div>
              </div>
            </div>
          </div>
          <div className="reveal d1">
            <div className="tag" style={{ marginBottom: 14 }}>Panel táctico · Vista en vivo</div>
            <TacticalTable />
          </div>
        </div>
      </div>
    </section>
  )
}
