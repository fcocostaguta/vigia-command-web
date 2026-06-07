'use client'

import { useState, useEffect, useRef } from 'react'

interface CmdOp {
  rk: string; nm: string; id: string; bpm: number
}

const BASE_OPS: CmdOp[] = [
  { rk: 'Cap.',  nm: 'Rojas',    id: 'B-01', bpm: 142 },
  { rk: 'Tte.',  nm: 'Muñoz',    id: 'B-02', bpm: 162 },
  { rk: 'Vol.',  nm: 'Pérez',    id: 'B-03', bpm: 118 },
  { rk: 'Bbro.', nm: 'Soto',     id: 'B-04', bpm: 176 },
  { rk: 'Vol.',  nm: 'Cárdenas', id: 'B-05', bpm: 104 },
]

const EVENTS = [
  { t: '14:02', x: 'Alerta inicial — 2ª alarma confirmada',    c: 'var(--red-b)' },
  { t: '14:05', x: 'Personal desplegado — 4 operadores',       c: 'var(--green)' },
  { t: '14:07', x: 'Monitoreo iniciado — vitales activos',     c: 'var(--green)' },
  { t: '14:11', x: 'Alerta biométrica — Tte. Muñoz',          c: 'var(--red-b)' },
  { t: '14:19', x: 'Rehabilitación — Bbro. Soto retirado',    c: 'var(--amber)' },
  { t: '15:44', x: 'Recuperación — Tte. Muñoz normalizado',   c: 'var(--green)' },
  { t: '16:23', x: 'Registro cerrado — snapshot generado',     c: 'var(--green)' },
]

const EKG_HALF = 'M0,20 L12,20 L14,8 L16,32 L18,20 L30,20 L32,8 L34,32 L36,20 L48,20 L50,8 L52,32 L54,20 L66,20 L68,8 L70,32 L72,20 L84,20 L86,8 L88,32 L90,20 L100,20'
const EKG_FULL = `${EKG_HALF} M100,20 L112,20 L114,8 L116,32 L118,20 L130,20 L132,8 L134,32 L136,20 L148,20 L150,8 L152,32 L154,20 L166,20 L168,8 L170,32 L172,20 L184,20 L186,8 L188,32 L190,20 L200,20`

function bpmCls(bpm: number) { return bpm >= 170 ? 'bpm-crit' : bpm >= 150 ? 'bpm-warn' : 'bpm-ok' }
function sdotCls(bpm: number) { return bpm >= 170 ? 'cmd-sdot-crit' : bpm >= 150 ? 'cmd-sdot-warn' : 'cmd-sdot-ok' }

export default function CommandSection() {
  const [ops, setOps] = useState<CmdOp[]>(BASE_OPS)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef(Date.now() - (2 * 3600 + 18 * 60) * 1000)

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setOps(prev => prev.map(op => {
        if (op.id === 'B-04') return op
        const delta = (Math.random() - 0.47) * 5
        return { ...op, bpm: Math.max(60, Math.min(190, Math.round(op.bpm + delta))) }
      }))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  const h = Math.floor(elapsed / 3600)
  const m = Math.floor((elapsed % 3600) / 60)
  const s = elapsed % 60
  const durStr = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`

  const alertOps = ops.filter(op => op.bpm >= 150)
  const opCount = ops.length
  const okPct = Math.round(ops.filter(op => op.bpm < 150).length / opCount * 100)

  return (
    <section className="cmd-section" id="como-funciona">
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>

        <div className="cmd-head reveal">
          <div className="tag">Lo que ve el mando</div>
          <h2>
            El panel que mantiene<br/>
            <em style={{ fontStyle: 'normal', color: 'var(--red-b)' }}>el control.</em>
          </h2>
        </div>

        {/* Incident context bar */}
        <div className="cmd-inc-bar reveal d1">
          <span className="cmd-inc-status">
            <span className="pulse-dot" style={{ width: 7, height: 7, flexShrink: 0 }} />
            En curso
          </span>
          <span className="cmd-inc-sep">·</span>
          <span className="cmd-inc-name">Incendio estructural · 2ª alarma · Maitencillo</span>
          <div className="cmd-inc-stats">
            <span><b>{opCount}</b> operadores</span>
            <span><b>{alertOps.length}</b> alertas</span>
            <span className="cmd-inc-time" suppressHydrationWarning>{durStr}</span>
          </div>
        </div>

        {/* 7-card bento */}
        <div className="cmd-bento reveal d2">

          {/* Monitor — roster + EKG */}
          <div className="cmd-card cmd-monitor">
            <div className="cmd-k">
              <span className={`cmd-tick ${alertOps.length > 0 ? 'cmd-tick-red' : ''}`} />
              Monitor biométrico
            </div>
            <div className="cmd-roster">
              {ops.map(op => (
                <div key={op.id} className="cmd-op">
                  <span className="cmd-op-rk">{op.rk}</span>
                  <span className="cmd-op-nm">{op.nm}</span>
                  <span className={`cmd-op-bpm ${bpmCls(op.bpm)}`}>{op.bpm}</span>
                  <span className={`cmd-sdot ${sdotCls(op.bpm)}`} />
                </div>
              ))}
            </div>
            <div className="cmd-ekg" aria-hidden="true">
              <svg viewBox="0 0 200 40" preserveAspectRatio="none">
                <path className="cmd-ekg-path" d={EKG_FULL} />
              </svg>
            </div>
          </div>

          {/* Ops count */}
          <div className="cmd-card cmd-ops-card">
            <div className="cmd-k">
              <span className="cmd-tick" />
              Personal en escena
            </div>
            <div className="cmd-row-base">
              <span className="cmd-big">{opCount}</span>
              <span className="cmd-sub">operadores</span>
            </div>
            <div className="cmd-dotgrid">
              {ops.map(op => (
                <i key={op.id} className={op.bpm >= 170 ? 'crit' : op.bpm >= 150 ? 'warn' : ''} />
              ))}
            </div>
          </div>

          {/* Active alerts */}
          <div className="cmd-card cmd-alert-card">
            <div className="cmd-k">
              <span className={`cmd-tick ${alertOps.length > 0 ? 'cmd-tick-red' : ''}`} />
              Alertas activas
            </div>
            <div className="cmd-row-base">
              <span className="cmd-big">{alertOps.length}</span>
            </div>
            <div className="cmd-pills">
              {alertOps.length > 0 ? alertOps.map(op => (
                <div key={op.id} className="cmd-pill">
                  <span className="cmd-pill-dot" />
                  {op.rk} {op.nm} — {op.bpm} bpm
                </div>
              )) : (
                <div style={{ fontFamily: 'var(--font-m)', fontSize: 9, color: 'var(--green)' }}>
                  Sin alertas activas
                </div>
              )}
            </div>
          </div>

          {/* Black box timeline */}
          <div className="cmd-card cmd-black-card">
            <div className="cmd-k">
              <span className="cmd-tick" />
              Caja Negra operacional
            </div>
            <div className="cmd-lock">
              ■ Snapshot #0042 · Inmutable
            </div>
            <div className="cmd-tl">
              {EVENTS.map((ev, i) => (
                <div
                  key={i}
                  className="cmd-ev"
                  style={{ '--c': ev.c } as React.CSSProperties}
                >
                  <div className="cmd-ev-t">{ev.t}</div>
                  <div className="cmd-ev-x">{ev.x}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="cmd-card cmd-dur-card">
            <div className="cmd-k">
              <span className="cmd-tick" />
              Duración
            </div>
            <div className="cmd-dur-big" suppressHydrationWarning>{durStr}</div>
            <div className="cmd-sub" style={{ marginTop: 'auto' }}>Incidente activo</div>
          </div>

          {/* Trace / snapshot history */}
          <div className="cmd-card cmd-trace-card">
            <div className="cmd-k">
              <span className="cmd-tick" />
              Trazabilidad
            </div>
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 7 }}>
              <div className="cmd-snap">
                <span className="cmd-snap-ck">✓</span>
                <div className="cmd-snap-id">
                  Snapshot #0041
                  <i>Emergencia forestal · 4h 02m</i>
                </div>
              </div>
              <div className="cmd-snap">
                <span className="cmd-snap-ck">✓</span>
                <div className="cmd-snap-id">
                  Snapshot #0040
                  <i>Rescate industrial · 0h 44m</i>
                </div>
              </div>
            </div>
          </div>

          {/* Live state */}
          <div className="cmd-card cmd-live-card">
            <div className="cmd-k">
              <span className="cmd-tick" />
              Estado de misión
            </div>
            <div className="cmd-state" style={{ marginTop: 'auto' }}>
              <div className="cmd-ring" style={{
                background: `conic-gradient(var(--green) 0 ${okPct}%, oklch(20% 0.01 250) ${okPct}% 100%)`,
              }}>
                <i>{okPct}%</i>
              </div>
              <div className="cmd-state-lbl">
                <b>Operativo</b>
                <span>Personal activo</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
