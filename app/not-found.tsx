import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Página no encontrada · VIGÍA',
}

export default function NotFound() {
  return (
    <div className="vk vk-404">
      <header>
        <a className="vk-logo vk-404-logo" href="/">
          <Image src="/images/logo-vigia.png" alt="" width={34} height={34} style={{ objectFit: 'contain' }} />
          <span className="vk-wordmark">VIGÍA</span>
        </a>
      </header>
      <main className="vk-404-main">
        <span className="vg-tag">Error 404</span>
        <h1>Esta página no existe.</h1>
        <p>Puede que el enlace esté mal escrito o que la página ya no esté disponible.</p>
        <a className="vg-btn vg-btn-red vg-btn-lg" href="/">Volver al inicio</a>
      </main>
    </div>
  )
}
