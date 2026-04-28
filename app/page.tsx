'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ProblemSection from '@/components/ProblemSection'
import SolutionSection from '@/components/SolutionSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import TacticalModeSection from '@/components/TacticalModeSection'
import BlackBoxSection from '@/components/BlackBoxSection'
import BenefitsSection from '@/components/BenefitsSection'
import DevelopmentStatusSection from '@/components/DevelopmentStatusSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import DemoModal from '@/components/DemoModal'

export default function HomePage() {
  const [showModal, setShowModal] = useState(false)

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  return (
    <>
      {showModal && <DemoModal onClose={closeModal} />}
      <Header onDemo={openModal} />
      <main>
        <HeroSection onDemo={openModal} />
        <ProblemSection />
        <SolutionSection />
        <HowItWorksSection />
        <TacticalModeSection />
        <BlackBoxSection />
        <BenefitsSection />
        <DevelopmentStatusSection />
        <ContactSection onDemo={openModal} />
      </main>
      <Footer onDemo={openModal} />
    </>
  )
}
