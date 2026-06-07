'use client'

import { useState, useEffect } from 'react'

// DS-spec tiling EKG path for the monitor card
function cmdEkg(W: number, beats: number): string {
  const seg = W / beats
  const mid = 20
  const tile = (off: number) => {
    let d = ''
    for (let i = 0; i < beats; i++) {
      const x = off + i * seg
      d += ` H${(x + seg * 0.40).toFixed(1)}`
      d += ` l${(seg * 0.05).toFixed(1)} -5 l${(seg * 0.05).toFixed(1)} 8 l${(seg * 0.05).toFixed(1)} -18 l${(seg * 0.05).toFixed(1)} 24 l${(seg * 0.05).toFixed(1)} -9`
      d += ` H${(off + (i + 1) * seg).toFixed(1)}`
    }
    return d
  }
  return `M0 ${mid}${tile(0)}${tile(W)}`
}

type Tone = 'ok' | 'warn' | 'crit'
interface CmdOp { rk: string; nm: string; bpm: number; tone: Tone }

const CMD_OPS: CmdOp[] = [
  { rk: 'B-01', nm: 'Cap. Rojas', bpm: 142, tone: 'ok'   },
  { rk: 'B-02', nm: 'Tte. Muñoz', bpm: 181, tone: 'crit' },
  { rk: 'B-04', nm: 'Bbro. Soto', bpm: 166, tone: 'warn' },
  { rk: 'B-03', nm: 'Vol. Pérez', bpm: 124, tone: 'ok'   },
]

const EVENTS = [
  { t: '14:02', x: 'Alerta inicial · 1ª alarma',          c: 'var(--green)'  },
  { t: '14:05', x: 'Personal desplegado · 4 activos',     c: 'var(--green)'  },
  { t: '14:11', x: 'Alerta biométrica · Muñoz',           c: 'var(--amber)'  },
  { t: '14:19', x: 'Operador a rehabilitación',           c: 'var(--amber)'  },
  { t: '14:24', x: 'Cambio de sector · Rojas',            c: 'var(--green)'  },
  { t: '14:31', x: 'Operador recuperado · Soto',          c: 'var(--green)'  },
  { t: '14:37', x: 'Registro generado · cerrado',         c: 'var(--red-b)'  },
]

function toneBpmCls(tone: Tone): string {
  return tone === 'crit' ? 'bpm-crit' : tone === 'warn' ? 'bpm-warn' : 'bpm-ok'
}
function toneSdotCls(tone: Tone): string {
  return tone === 'crit' ? 'cmd-sdot-crit' : tone === 'warn' ? 'cmd-sdot-warn' : 'cmd-sdot-ok'
}

export default function CommandSection() {
  const [ops, setOps] = useState<CmdOp[]>(CMD_OPS)
  const [secs, setSecs] = useState(2 * 3600 + 18 * 60 + 4)

  useEffect(() => {
    const id = setInterval(() => setOps(p => p.map(o => {
      if (o.tone === 'crit') {
        return { ...o, bpm: Math.max(176, Math.min(188, Math.round(o.bpm + (Math.random() - 0.5) * 4))) }
      }
      const nb = Math.max(98, Math.min(174, Math.round(o.bpm + (Math.random() - 0.48) * 6)))
      return { ...o, bpm: nb, tone: (nb >= 160 ? 'warn' : 'ok') as Tone }
    })), 1600)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setSecs(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(Math.floor(secs / 3600)).padStart(2, '0')
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, '0')
  const ss = String(secs % 60).padStart(2, '0')
  const ekg = cmdEkg(420, 5)

  return (
    <section className="cmd-section" id="mando">
      <div className="container" style={{ paddingTop: 80, paddingBottom: 80 }}>

        <div className="cmd-head reveal">
          <div className="tag">Lo que ve el mando</div>
          <h2 style={{ marginTop: 16 }}>
            No es un reloj.<br />
            <em>Es una plataforma de mando.</em>
          </h2>
        </div>

        {/* Incident context bar */}
        <div className="cmd-inc-bar reveal d1">
          <span className="cmd-inc-status">
            <span className="pulse-dot" style={{ width: 7, height: 7, flexShrink: 0 }} />
            Incidente activo
          </span>
          <span className="cmd-inc-sep">·</span>
          <span className="cmd-inc-name">Incendio estructural · 2ª alarma · Maitencillo</span>
          <div className="cmd-inc-stats">
            <span><b>12</b> operadores</span>
            <span><b>2</b> alertas</span>
            <span><b>1</b> en rehab</span>
            <span className="cmd-inc-time" suppressHydrationWarning>{hh}:{mm} en operación</span>
          </div>
        </div>

        {/* 7-card bento */}
        <div className="cmd-bento reveal d2">

          {/* Monitor — live roster + EKG */}
          <div className="cmd-card cmd-monitor">
            <div className="cmd-k">
              <span className="cmd-tick" /> Monitoreo en tiempo real
            </div>
            <div className="cmd-roster">
              {ops.map(o => (
                <div key={o.rk} className="cmd-op">
                  <span className="cmd-op-rk">{o.rk}</span>
                  <span className="cmd-op-nm">{o.nm}</span>
                  <span className={`cmd-op-bpm ${toneBpmCls(o.tone)}`}>{o.bpm}</span>
                  <span className={`cmd-sdot ${toneSdotCls(o.tone)}`} />
                </div>
              ))}
            </div>
            <div className="cmd-ekg" aria-hidden="true">
              <svg viewBox="0 0 840 40" preserveAspectRatio="none">
                <path className="cmd-ekg-path" d={ekg} />
              </svg>
            </div>
          </div>

          {/* Ops count */}
          <div className="cmd-card cmd-ops-card">
            <div className="cmd-k">
              <span className="cmd-tick" /> Operadores activos
            </div>
            <div className="cmd-row-base">
              <span className="cmd-big">12</span>
              <span className="cmd-sub">desplegados</span>
            </div>
            <div className="cmd-dotgrid">
              {Array.from({ length: 12 }).map((_, i) => (
                <i key={i} className={i === 3 ? 'crit' : i === 7 ? 'warn' : ''} />
              ))}
            </div>
          </div>

          {/* Active alerts */}
          <div className="cmd-card cmd-alert-card">
            <div className="cmd-k">
              <span className="cmd-tick cmd-tick-red" /> Alertas activas
            </div>
            <div className="cmd-row-base">
              <span className="cmd-big bpm-crit">2</span>
              <span className="cmd-sub">requieren atención</span>
            </div>
            <div className="cmd-pills">
              <div className="cmd-pill">
                <span className="cmd-pill-dot" />
                BPM crítico · Muñoz
              </div>
              <div className="cmd-pill">
                <span className="cmd-pill-dot" />
                Carga alta · Soto
              </div>
            </div>
          </div>

          {/* Black box — immutable timeline */}
          <div className="cmd-card cmd-black-card">
            <div className="cmd-k">
              <span className="cmd-tick" /> Caja negra operacional
            </div>
            <div className="cmd-lock">
              ■ Registro inmutable
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
              <span className="cmd-tick" /> Duración del incidente
            </div>
            <div className="cmd-spacer" />
            <div className="cmd-big" suppressHydrationWarning>
              {hh}:{mm}
              <span style={{ fontSize: '.5em', color: 'var(--muted)' }}>:{ss}</span>
            </div>
            <div className="cmd-sub">desde la primera alarma</div>
          </div>

          {/* Trace — single DS snapshot */}
          <div className="cmd-card cmd-trace-card">
            <div className="cmd-k">
              <span className="cmd-tick" /> Trazabilidad posterior
            </div>
            <div className="cmd-spacer" />
            <div className="cmd-snap">
              <span className="cmd-snap-ck">✓</span>
              <div className="cmd-snap-id">
                SNAPSHOT #0042
                <i>Auditable · cerrado</i>
              </div>
            </div>
          </div>

          {/* Live state */}
          <div className="cmd-card cmd-live-card">
            <div className="cmd-k">
              <span className="cmd-tick" /> Estado operativo
            </div>
            <div className="cmd-spacer" />
            <div className="cmd-state">
              <div
                className="cmd-ring"
                style={{ background: 'conic-gradient(var(--green) 0 78%, oklch(20% 0.01 250) 78% 100%)' }}
              >
                <i>OK</i>
              </div>
              <div className="cmd-state-lbl">
                <b>Operativo</b>
                <span>sincronizado · en línea</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
