'use client'

import { useState, useEffect } from 'react'
import { Corners } from './CommercialAtmosphere'
import { Icon, Tag } from './CommercialIcons'

function cmdEkg(W: number, beats: number): string {
  const seg = W / beats, mid = 20
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
  { rk: 'B-01', nm: 'Cap. Rojas',  bpm: 142, tone: 'ok'   },
  { rk: 'B-02', nm: 'Tte. Muñoz',  bpm: 181, tone: 'crit' },
  { rk: 'B-04', nm: 'Bbro. Soto',  bpm: 166, tone: 'warn' },
  { rk: 'B-03', nm: 'Vol. Pérez',  bpm: 124, tone: 'ok'   },
]

const EVTS = [
  { t: '14:02', x: 'Alerta inicial · 1ª alarma',       c: 'var(--green)'  },
  { t: '14:05', x: 'Personal desplegado · 4 activos',  c: 'var(--green)'  },
  { t: '14:11', x: 'Alerta biométrica · Muñoz',        c: 'var(--amber)'  },
  { t: '14:19', x: 'Operador a rehabilitación',        c: 'var(--amber)'  },
  { t: '14:24', x: 'Cambio de sector · Rojas',         c: 'var(--green)'  },
  { t: '14:31', x: 'Operador recuperado · Soto',       c: 'var(--green)'  },
  { t: '14:37', x: 'Registro generado · cerrado',      c: 'var(--red-b)'  },
]

export default function CommercialCommand() {
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
    <section className="vk-section vk-cmd" id="mando">
      <div className="vk-container">

        <div className="vk-cmd-head" data-reveal>
          <div>
            <Tag>Lo que ve el mando</Tag>
            <h2 style={{ marginTop: 16 }}>
              No es un reloj.<br />
              <em>Es una plataforma de mando.</em>
            </h2>
          </div>
          <div className="vk-cmd-headnote">
            <span className="vg-pulse-dot is-fast" /> Vista de operación · en vivo
          </div>
        </div>

        <div className="cmd-inc-bar" data-reveal>
          <span className="cib-status">
            <span className="vg-pulse-dot is-fast" /> Incidente activo
          </span>
          <span className="cib-sep">·</span>
          <span className="cib-name">Incendio estructural · 2ª alarma · Maitencillo</span>
          <div className="cib-stats">
            <span><b>12</b> operadores</span>
            <span><b>2</b> alertas</span>
            <span><b>1</b> en rehab</span>
            <span className="cib-time" suppressHydrationWarning>{hh}:{mm} en operación</span>
          </div>
        </div>

        <div className="cmd-bento" data-reveal="scale">

          <div className="cmd-card cmd-monitor">
            <Corners />
            <div className="cmd-k"><span className="tick" /> Monitoreo en tiempo real</div>
            <div className="cmd-roster">
              {ops.map(o => (
                <div className="cmd-op" key={o.rk}>
                  <span className="rk">{o.rk}</span>
                  <span className="nm">{o.nm}</span>
                  <span className={`bp ${o.tone === 'crit' ? 'vg-bpm-crit' : o.tone === 'warn' ? 'vg-bpm-warn' : 'vg-bpm-ok'}`}>
                    {o.bpm} <span style={{ color: 'var(--faint)', fontSize: 9 }}>bpm</span>
                  </span>
                  <span className={`sd ${o.tone}`} />
                </div>
              ))}
            </div>
            <div className="cmd-ekg">
              <svg viewBox="0 0 840 40" preserveAspectRatio="none">
                <path d={ekg} />
              </svg>
            </div>
          </div>

          <div className="cmd-card cmd-ops">
            <div className="cmd-k"><span className="tick" /> Operadores activos</div>
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

          <div className="cmd-card cmd-alert">
            <div className="cmd-k"><span className="tick red" /> Alertas activas</div>
            <div className="cmd-row-base">
              <span className="cmd-big red">2</span>
              <span className="cmd-sub">requieren atención</span>
            </div>
            <div className="pills">
              <div className="cmd-pill"><span className="p" /> BPM crítico · Muñoz</div>
              <div className="cmd-pill"><span className="p" /> Carga alta · Soto</div>
            </div>
          </div>

          <div className="cmd-card cmd-black">
            <div className="cmd-k"><span className="tick" /> Caja negra operacional</div>
            <span className="lock"><Icon name="lock" size={12} /> Registro inmutable</span>
            <div className="cmd-tl">
              {EVTS.map(e => (
                <div className="cmd-ev" key={e.t} style={{ '--c': e.c } as React.CSSProperties}>
                  <div className="t">{e.t}</div>
                  <div className="x">{e.x}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="cmd-card cmd-dur">
            <div className="cmd-k"><span className="tick" /> Duración del incidente</div>
            <div className="cmd-spacer" />
            <div className="cmd-big" suppressHydrationWarning>
              {hh}:{mm}<span style={{ fontSize: '.5em', color: 'var(--muted)' }}>:{ss}</span>
            </div>
            <div className="cmd-sub">desde la primera alarma</div>
          </div>

          <div className="cmd-card cmd-trace">
            <div className="cmd-k"><span className="tick" /> Trazabilidad posterior</div>
            <div className="cmd-spacer" />
            <div className="snap">
              <span className="ck">✓</span>
              <span className="id">SNAPSHOT #0042<i>Auditable · cerrado</i></span>
            </div>
          </div>

          <div className="cmd-card cmd-live">
            <div className="cmd-k"><span className="tick" /> Estado operativo</div>
            <div className="cmd-spacer" />
            <div className="state">
              <span className="ring"><i>OK</i></span>
              <span className="lbl"><b>Operativo</b><span>sincronizado · en línea</span></span>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
