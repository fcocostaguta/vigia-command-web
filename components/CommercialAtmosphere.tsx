'use client'

import React from 'react'

export function Signal() {
  return <span className="vk-signal" aria-hidden="true"><i /><i /><i /><i /></span>
}

export function Corners() {
  return (
    <>
      <span className="vk-corner tl" />
      <span className="vk-corner tr" />
      <span className="vk-corner bl" />
      <span className="vk-corner br" />
    </>
  )
}

export function HeroAtmosphere() {
  return (
    <div className="vk-atmos" aria-hidden="true">
      <div className="vk-halo vk-halo-a" />
      <div className="vk-halo vk-halo-b" />
      <div className="vk-spotlight" />
    </div>
  )
}
