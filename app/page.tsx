'use client'

import { useRef, useCallback, useEffect, MutableRefObject } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import PanelSection from '@/components/PanelSection'
import Problem from '@/components/Problem'
import HowItWorks from '@/components/HowItWorks'
import CajaNegra from '@/components/CajaNegra'
import OfflineFirst from '@/components/OfflineFirst'
import Cases from '@/components/Cases'
import CasosDeUso from '@/components/CasosDeUso'
import ProductShowcase from '@/components/ProductShowcase'
import Trust from '@/components/Trust'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Icon from '@/components/Icons'

function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('in') }),
      { threshold: 0.06 }
    )
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function HomePage() {
  const formRef = useRef<HTMLElement | null>(null)
  useReveal()

  const scrollToForm = useCallback(() => {
    if (formRef.current) {
      const top = formRef.current.getBoundingClientRect().top + window.scrollY - 80
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      <Header onConversemos={scrollToForm} />
      <main>
        <Hero onConversemos={scrollToForm} />
        <PanelSection />
        <Problem />
        <HowItWorks />
        <CajaNegra />
        <OfflineFirst />
        <Cases />
        <CasosDeUso />
        <ProductShowcase />
        <Trust />
        <Contact formRef={formRef as MutableRefObject<HTMLElement | null>} />
      </main>
      <Footer onConversemos={scrollToForm} />
      <div className="mobile-sticky-cta">
        <button className="btn btn-red" onClick={scrollToForm}>
          Solicitar demo {Icon.arrow}
        </button>
      </div>
    </>
  )
}
