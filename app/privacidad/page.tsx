import type { Metadata } from 'next'
import Image from 'next/image'

// Company identifiers shown in section 1. Fill with the confirmed values before publishing;
// empty fields are not rendered, so the page never shows placeholders.
const LEGAL = {
  rut: '',
  domicilio: '',
}

export const metadata: Metadata = {
  title: 'Política de Privacidad — VIGÍA',
  description: 'Cómo VIGÍA recopila, usa y protege la información entregada a través de este sitio.',
  alternates: { canonical: '/privacidad' },
  robots: { index: false, follow: false },
}

export default function PrivacidadPage() {
  return (
    <div style={{ background: 'var(--bg2)', minHeight: '100vh', color: 'var(--text)' }}>
      <header style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="vk-container" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <Image src="/images/logo-vigia.png" alt="" width={30} height={30} style={{ objectFit: 'contain' }} />
            <span style={{ fontFamily: 'var(--font-h)', fontSize: '1.1rem', fontWeight: 900, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              VIGÍA
            </span>
          </a>
        </div>
      </header>

      <main className="vk-container" style={{ maxWidth: 760, padding: '64px 32px 96px' }}>
        <p className="vg-tag">Legal</p>
        <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.6rem)', marginTop: 12, marginBottom: 8 }}>Política de Privacidad</h1>
        <p style={{ color: 'var(--muted)', fontSize: '.85rem', fontFamily: 'var(--font-m)', marginBottom: 40 }}>
          Última actualización: octubre de 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, fontSize: '.95rem', lineHeight: 1.8, color: 'var(--muted)' }}>
          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>1. Responsable</h2>
            <p>
              Este sitio (vigiacommand.cl) es operado por <strong style={{ color: 'var(--text)' }}>MCF SpA</strong>, bajo
              la marca VIGÍA.
            </p>
            {(LEGAL.rut || LEGAL.domicilio) && (
              <p style={{ marginTop: 8 }}>
                {[LEGAL.rut && `RUT: ${LEGAL.rut}`, LEGAL.domicilio && `Domicilio: ${LEGAL.domicilio}`].filter(Boolean).join(' · ')}
              </p>
            )}
            <p style={{ marginTop: 8 }}>
              Contacto para materias de privacidad:{' '}
              <a href="mailto:contacto@vigiacommand.cl" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
                contacto@vigiacommand.cl
              </a>
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>2. Qué información recopilamos</h2>
            <p>A través del formulario de contacto de este sitio recopilamos:</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>Nombre completo, cargo o función y organización</li>
              <li>Correo electrónico</li>
              <li>Teléfono o WhatsApp (opcional)</li>
              <li>Tipo de organización y motivo de contacto</li>
              <li>Cantidad aproximada de personas, cuando aplica</li>
              <li>Cualquier información que incluyas voluntariamente en el campo de mensaje</li>
            </ul>
            <p style={{ marginTop: 8 }}>
              No recopilamos información de personal en terreno, datos biométricos ni información operacional a través
              de este sitio: esos datos existen únicamente dentro del sistema VIGÍA que usan nuestros clientes.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>3. Para qué usamos esta información</h2>
            <p>Usamos la información del formulario exclusivamente para:</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>Responder tu solicitud y coordinar una eventual conversación o demostración</li>
              <li>Evaluar internamente el tipo de organización y contexto operacional que describes</li>
            </ul>
            <p style={{ marginTop: 8 }}>
              No usamos esta información para enviar marketing no solicitado, no la vendemos y no la compartimos con
              terceros para fines publicitarios.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>4. Con quién se comparte</h2>
            <p>Para operar este sitio y hacernos llegar tu solicitud usamos los siguientes proveedores:</p>
            <ul style={{ marginTop: 8, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li><strong style={{ color: 'var(--text)' }}>Vercel</strong>: alojamiento del sitio y procesamiento del formulario.</li>
              <li><strong style={{ color: 'var(--text)' }}>Resend</strong>: entrega por correo electrónico de tu solicitud.</li>
              <li><strong style={{ color: 'var(--text)' }}>Upstash</strong>: base de datos donde se guarda una copia de tu solicitud para darle seguimiento.</li>
            </ul>
            <p style={{ marginTop: 8 }}>
              Estos proveedores pueden tratar los datos en servidores ubicados fuera de Chile, solo para prestar el
              servicio indicado. No compartimos tu información con otros terceros salvo obligación legal.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>5. Cuánto tiempo la conservamos</h2>
            <p>
              Cada solicitud se guarda junto con la versión del texto de consentimiento aceptado. Conservamos esta
              información mientras sea necesaria para evaluar y responder tu solicitud, y mientras exista una relación
              comercial o de evaluación activa. Puedes solicitar su eliminación en
              cualquier momento según se describe en la sección 7.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>6. Analítica del sitio</h2>
            <p>
              Este sitio utiliza Vercel Analytics para medir visitas de forma agregada y anónima. No utiliza cookies de
              seguimiento ni construye perfiles individuales de navegación.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>7. Tus derechos</h2>
            <p>
              De acuerdo con la Ley N.º 19.628 sobre Protección de la Vida Privada y las disposiciones aplicables de la
              Ley N.º 21.719 sobre Protección de Datos Personales, puedes solicitar acceso, rectificación, cancelación
              u oposición respecto de tus datos personales escribiendo a{' '}
              <a href="mailto:contacto@vigiacommand.cl" style={{ color: 'var(--text)', textDecoration: 'underline' }}>
                contacto@vigiacommand.cl
              </a>.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text)', marginBottom: 10 }}>8. Cambios a esta política</h2>
            <p>
              Podemos actualizar esta política a medida que el sitio y la información institucional de VIGÍA se
              completen. La fecha de última actualización aparece al inicio de esta página.
            </p>
          </section>
        </div>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '24px 0' }}>
        <div className="vk-container" style={{ fontSize: '.8rem', color: 'var(--faint)' }}>
          <a href="/" style={{ color: 'var(--faint)' }}>Volver a vigiacommand.cl</a>
        </div>
      </footer>
    </div>
  )
}
