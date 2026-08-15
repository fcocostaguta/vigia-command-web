'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { CommercialHeader, CommercialFlow } from './CommercialSections'
import CommercialHero from './CommercialHero'
import {
  CommercialOffline,
  CommercialCases,
  CommercialCajaNegra,
  CommercialContact,
  CommercialFooter,
} from './CommercialSections2'

export default function CommercialLanding() {
  const [bpm, setBpm] = useState(142)
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      setBpm(p => Math.max(128, Math.min(168, Math.round(p + (Math.random() - 0.45) * 4))))
    }, 1800)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    el.classList.add('reveal-ready')
    const targets = el.querySelectorAll('[data-reveal]')
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    targets.forEach(t => io.observe(t))
    return () => io.disconnect()
  }, [])

  const onContact = useCallback(() => {
    const el = document.getElementById('contacto')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <div className="vk" ref={wrapRef}>
      <CommercialHeader onContact={onContact} />
      <main>
        <CommercialHero onContact={onContact} bpm={bpm} />
        <CommercialFlow />
        <CommercialOffline />
        <CommercialCases />
        <CommercialCajaNegra />
        <CommercialContact />
      </main>
      <CommercialFooter onContact={onContact} />
    </div>
  )
}
