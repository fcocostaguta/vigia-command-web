'use client'

import { useState, useEffect } from 'react'
import { INIT_OPERATORS, PANEL_INCIDENT } from '@/lib/content'

type Status = 'ACTIVO' | 'ALERTA' | 'REHAB'

interface Operator {
  id: string
  name: string
  bpm: number
  sig: number
  status: Status
  batt: number
  zone: string
}

function bpmClass(bpm: number): string {
  if (bpm > 120) return 'bpm-crit'
  if (bpm > 100) return 'bpm-warn'
  return 'bpm-ok'
}

function SignalBars({ sig }: { sig: number }) {
  return (
    <div className="signal-bars">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={`signal-bar ${i <= sig ? 'on' : ''}`} />
      ))}
    </div>
  )
}

function useClock() {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('es-CL', {
          hour12: false
        })
      )
    }

    tick()
    const id = setInterval(tick, 1000)

    return () => clearInterval(id)
  }, [])

  return time
}

/* FIX TYPESCRIPT */
const typedOperators: Operator[] = INIT_OPERATORS as Operator[]

export default function TacticalPanel() {
  const [ops, setOps] = useState<Operator[]>(typedOperators)
  const clock = useClock()

  useEffect(() => {
    const id = setInterval(() => {
      setOps((prev) =>
        prev.map((op) => {
          if (op.status === 'REHAB') return op
          const delta = (Math.random() - 0.5) * 4
          return { ...op, bpm: Math.max(60, Math.min(165, Math.round(op.bpm + delta))) }
        })
      )
    }, 1200)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="tactical-panel">
      {/* Top bar */}
      <div className="tp-bar">
        <div className="tp-bar-left">
          <div className="tp-incident">{PANEL_INCIDENT.status}</div>
          <div className="tp-type">— {PANEL_INCIDENT.type}</div>
        </div>
        <div className="tp-time mono">{clock}</div>
      </div>

      {/* Operator grid */}
      <div className="tp-grid">
        {ops.map((op) => {
          const cardClass = [
            'op-card',
            op.status === 'ALERTA' ? 'alert' : '',
            op.status === 'REHAB' ? 'rehab' : '',
          ]
            .filter(Boolean)
            .join(' ')

          const statusClass =
            op.status === 'ACTIVO'
              ? 'status-active'
              : op.status === 'ALERTA'
                ? 'status-alert'
                : 'status-rehab'

          return (
            <div key={op.id} className={cardClass}>
              <div className="op-header">
                <div>
                  <div className="op-id">{op.id}</div>
                  <div className="op-name">{op.name}</div>
                </div>
                <div className={`op-status ${statusClass}`}>{op.status}</div>
              </div>
              <div className="op-metrics">
                <div className="metric">
                  <div className="metric-label">BPM</div>
                  <div className={`metric-val ${bpmClass(op.bpm)}`}>{op.bpm}</div>
                </div>
                <div className="metric">
                  <div className="metric-label">SEÑAL</div>
                  <SignalBars sig={op.sig} />
                </div>
                <div className="metric">
                  <div className="metric-label">BATERÍA</div>
                  <div className="metric-val" style={{ color: 'var(--col-muted)', fontSize: '12px' }}>
                    {op.batt}%
                  </div>
                </div>
                <div className="metric">
                  <div className="metric-label">ZONA</div>
                  <div className="metric-val" style={{ color: 'var(--col-muted)', fontSize: '12px' }}>
                    {op.zone}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Footer */}
      <div className="tp-footer">
        <span>6 operadores · 1 alerta activa</span>
        <span className="mono" style={{ color: 'var(--col-green)' }}>
          ● SISTEMA EN LÍNEA
        </span>
      </div>
    </div>
  )
}
