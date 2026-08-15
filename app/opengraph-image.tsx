import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const runtime = 'nodejs'
export const alt = 'VIGÍA — Tecnología operacional para emergencias'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage() {
  const logoData = await readFile(join(process.cwd(), 'public/images/logo-vigia.png'))
  const logoSrc = `data:image/png;base64,${logoData.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '76px',
          background: '#0e0e10',
          backgroundImage:
            'radial-gradient(circle at 14% 18%, rgba(200,45,35,0.22), transparent 42%), radial-gradient(circle at 84% 86%, rgba(60,60,70,0.18), transparent 46%)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={64} height={64} style={{ objectFit: 'contain' }} alt="" />
          <span style={{ fontSize: 40, fontWeight: 900, letterSpacing: '0.06em', color: '#f4f2ef', textTransform: 'uppercase' }}>
            VIGÍA
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <span style={{ fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c9483a' }}>
            Tecnología operacional para emergencias
          </span>
          <span style={{ fontSize: 52, fontWeight: 800, color: '#f4f2ef', lineHeight: 1.1, maxWidth: 920 }}>
            Información crítica del personal. Directo al mando.
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
