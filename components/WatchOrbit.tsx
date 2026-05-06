'use client'

import { useEffect, useRef } from 'react'

export default function WatchOrbit() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number
    let t = 0

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width  = r.width  * devicePixelRatio
      canvas.height = r.height * devicePixelRatio
      ctx.scale(devicePixelRatio, devicePixelRatio)
    }
    resize()
    window.addEventListener('resize', resize)

    const RINGS = [
      { phase: 0.00, period: 2600, rStart: 140, rEnd: 300, color: [210, 55, 35] as [number, number, number] },
      { phase: 0.38, period: 2600, rStart: 140, rEnd: 300, color: [210, 55, 35] as [number, number, number] },
      { phase: 0.72, period: 2600, rStart: 140, rEnd: 300, color: [210, 55, 35] as [number, number, number] },
    ]

    const TRACKS = [
      { r: 190, dashLen: 3, gapLen: 14, alpha: 0.09, rotSpeed:  0.00018 },
      { r: 240, dashLen: 2, gapLen: 20, alpha: 0.06, rotSpeed: -0.00011 },
    ]
    const trackAngles = TRACKS.map(() => 0)

    const DOTS = Array.from({ length: 14 }, (_, i) => ({
      angle: (i / 14) * Math.PI * 2,
      r:     178 + (i % 3) * 24,
      speed: (i % 2 === 0 ? 1 : -1) * (0.00055 + (i % 4) * 0.00018),
      size:  i % 5 === 0 ? 2.2 : 1.3,
      phase: Math.random() * Math.PI * 2,
      red:   i % 4 === 0,
    }))

    const TICKS = Array.from({ length: 8 }, (_, i) => ({
      angle: (i / 8) * Math.PI * 2,
      r: 163, len: 8, phase: i * 0.6,
    }))

    const draw = (ts: number) => {
      const W = canvas.width  / devicePixelRatio
      const H = canvas.height / devicePixelRatio
      const cx = W / 2, cy = H / 2
      t = ts * 0.001
      ctx.clearRect(0, 0, W, H)

      TRACKS.forEach((tr, i) => {
        trackAngles[i] += tr.rotSpeed
        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(trackAngles[i])
        ctx.beginPath()
        ctx.arc(0, 0, tr.r, 0, Math.PI * 2)
        ctx.setLineDash([tr.dashLen, tr.gapLen])
        ctx.strokeStyle = `rgba(200,55,35,${tr.alpha})`
        ctx.lineWidth = 0.8
        ctx.stroke()
        ctx.setLineDash([])
        ctx.restore()
      })

      RINGS.forEach(ring => {
        const raw = ((t / (ring.period * 0.001)) + ring.phase) % 1
        const prog = raw
        const r = ring.rStart + (ring.rEnd - ring.rStart) * prog
        const opacity = prog < 0.08
          ? (prog / 0.08) * 0.65
          : 0.65 * (1 - (prog - 0.08) / 0.92)
        if (opacity <= 0) return
        const [rv, gv, bv] = ring.color
        const grad = ctx.createRadialGradient(cx, cy, r - 4, cx, cy, r + 4)
        grad.addColorStop(0,   `rgba(${rv},${gv},${bv},0)`)
        grad.addColorStop(0.4, `rgba(${rv},${gv},${bv},${opacity})`)
        grad.addColorStop(0.6, `rgba(${rv},${gv},${bv},${opacity})`)
        grad.addColorStop(1,   `rgba(${rv},${gv},${bv},0)`)
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.strokeStyle = grad
        ctx.lineWidth = 2.5
        ctx.stroke()
      })

      TICKS.forEach(tk => {
        const pulse = 0.25 + 0.18 * Math.sin(t * 1.2 + tk.phase)
        const x1 = cx + Math.cos(tk.angle) * tk.r
        const y1 = cy + Math.sin(tk.angle) * tk.r
        const x2 = cx + Math.cos(tk.angle) * (tk.r + tk.len)
        const y2 = cy + Math.sin(tk.angle) * (tk.r + tk.len)
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.strokeStyle = `rgba(200,55,35,${pulse})`
        ctx.lineWidth = 1
        ctx.stroke()
      })

      DOTS.forEach(d => {
        d.angle += d.speed
        d.phase += 0.028
        const x = cx + Math.cos(d.angle) * d.r
        const y = cy + Math.sin(d.angle) * d.r
        const a = 0.35 + 0.3 * Math.sin(d.phase)
        const [rv, gv, bv] = d.red ? [215, 58, 38] : [120, 130, 160]
        const g = ctx.createRadialGradient(x, y, 0, x, y, d.size * 5)
        g.addColorStop(0, `rgba(${rv},${gv},${bv},${a * 0.6})`)
        g.addColorStop(1, `rgba(${rv},${gv},${bv},0)`)
        ctx.beginPath(); ctx.arc(x, y, d.size * 5, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
        ctx.beginPath(); ctx.arc(x, y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${rv},${gv},${bv},${Math.min(1, a * 1.8)})`
        ctx.fill()
      })

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="watch-orbit"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}
    />
  )
}
