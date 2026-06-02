'use client'

import { useState, useEffect, useRef } from 'react'
import WatchOrbit from './WatchOrbit'
import Icon from './Icons'

function useWatchScroll(ref: React.RefObject<HTMLImageElement | null>) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.innerWidth < 1040) return

    let currentTransform = { y: 0, rx: 0, ry: 0, rz: 0, scale: 1 }
    let targetTransform  = { y: 0, rx: 0, ry: 0, rz: 0, scale: 1 }
    let rafId: number | null = null
    let ticking = false

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const applyTransform = () => {
      const { y, rx, ry, rz, scale } = currentTransform
      el.style.transform =
        `translateY(${y}px) perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${scale})`
    }

    const animate = () => {
      const speed = 0.08
      currentTransform.y     = lerp(currentTransform.y,     targetTransform.y,     speed)
      currentTransform.rx    = lerp(currentTransform.rx,    targetTransform.rx,    speed)
      currentTransform.ry    = lerp(currentTransform.ry,    targetTransform.ry,    speed)
      currentTransform.rz    = lerp(currentTransform.rz,    targetTransform.rz,    speed)
      currentTransform.scale = lerp(currentTransform.scale, targetTransform.scale, speed)
      applyTransform()
      rafId = requestAnimationFrame(animate)
    }

    const getSectionProgress = () => {
      const ids = ['solucion', 'como-funciona', 'casos']
      const viewH = window.innerHeight
      const scrollY = window.scrollY
      const heroProg = Math.min(1, scrollY / (viewH * 0.8))
      let activeSection = 'hero'
      ids.forEach(id => {
        const s = document.getElementById(id)
        if (!s) return
        const rect = s.getBoundingClientRect()
        if (rect.top < viewH * 0.6 && rect.bottom > viewH * 0.2) activeSection = id
      })
      return { heroProg, activeSection }
    }

    const update = () => {
      const { heroProg, activeSection } = getSectionProgress()
      if (activeSection === 'hero') {
        targetTransform.y = heroProg * -28
        targetTransform.rx = 0; targetTransform.ry = 0; targetTransform.rz = 0; targetTransform.scale = 1
        el.classList.add('floating')
      } else if (activeSection === 'solucion') {
        el.classList.remove('floating')
        targetTransform.y = -36; targetTransform.rx = 12; targetTransform.ry = -16; targetTransform.rz = 2; targetTransform.scale = 0.96
      } else if (activeSection === 'como-funciona') {
        el.classList.remove('floating')
        targetTransform.y = -52; targetTransform.rx = 6; targetTransform.ry = -8; targetTransform.rz = -3; targetTransform.scale = 0.90
      } else {
        el.classList.remove('floating')
        targetTransform.y = -60; targetTransform.rx = 4; targetTransform.ry = 6; targetTransform.rz = 0; targetTransform.scale = 0.88
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update) }
    }

    rafId = requestAnimationFrame(animate)
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [ref])
}

export default function Hero({ onConversemos }: { onConversemos: () => void }) {
  const watchRef = useRef<HTMLImageElement>(null)
  const [bpm, setBpm] = useState(142)
  useWatchScroll(watchRef)

  useEffect(() => {
    const id = setInterval(() => {
      setBpm(p => Math.max(128, Math.min(168, Math.round(p + (Math.random() - 0.45) * 4))))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" id="inicio">
      <div className="hero-content">
        <div className="hero-kicker reveal in">
          <span className="pulse-dot"></span>
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

      <div className="hero-visual">
        <div className="watch-stage">
          <div className="watch-glow"></div>
          <div className="watch-glow-inner"></div>
          <WatchOrbit />
          <img
            ref={watchRef}
            src="/images/watch-vigia.png"
            alt="VIGÍA — dispositivo de monitoreo táctico"
            className="watch-img floating"
          />

          {/* Right chips */}
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(108px,-180px)' }}>
            <div className="watch-chip" style={{ animation: 'chip-float-a 4.4s ease-in-out infinite' }}>
              <div className="watch-chip-label">BPM</div>
              <div className={`watch-chip-val${bpm >= 152 ? ' warn' : ' ok'}`}>{bpm}</div>
            </div>
          </div>
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(116px,-20px)' }}>
            <div className="watch-chip" style={{ animation: 'chip-float-b 5.2s ease-in-out infinite' }}>
              <div className="watch-chip-label">SpO₂</div>
              <div className="watch-chip-val ok">98%</div>
            </div>
          </div>
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(108px,130px)' }}>
            <div className="watch-chip" style={{ animation: 'chip-float-c 4.8s ease-in-out infinite 0.6s' }}>
              <div className="watch-chip-label">Temp.</div>
              <div className="watch-chip-val dim">36.8°C</div>
            </div>
          </div>

          {/* Left chips */}
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(-200px,-180px)' }}>
            <div className="watch-chip" style={{ animation: 'chip-float-b 5s ease-in-out infinite 1.1s' }}>
              <div className="watch-chip-label">Actividad</div>
              <div className="watch-chip-val warn">Alta</div>
            </div>
          </div>
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(-196px,-20px)' }}>
            <div className="watch-chip" style={{ animation: 'chip-float-a 4.6s ease-in-out infinite 0.4s' }}>
              <div className="watch-chip-label">Batería</div>
              <div className="watch-chip-val ok">82%</div>
            </div>
          </div>
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(-200px,130px)' }}>
            <div className="watch-chip" style={{ animation: 'chip-float-d 5.4s ease-in-out infinite 0.9s' }}>
              <div className="watch-chip-label">GPS · LoRa</div>
              <div className="watch-chip-val ok">En línea</div>
            </div>
          </div>

          {/* Bottom center */}
          <div className="chip-wrap" style={{ top: '50%', left: '50%', transform: 'translate(-50%,210px)' }}>
            <div className="watch-chip" style={{
              flexDirection: 'row', gap: 12, minWidth: 'auto',
              animation: 'chip-float-c 5.6s ease-in-out infinite 1.4s',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div className="watch-chip-label">SOS</div>
                <div className="watch-chip-val dim">Inactivo</div>
              </div>
              <div style={{ width: 1, background: 'oklch(22% 0.010 240)', alignSelf: 'stretch' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div className="watch-chip-label">Caída</div>
                <div className="watch-chip-val dim">No detect.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
