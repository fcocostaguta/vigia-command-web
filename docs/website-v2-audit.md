# VIGÍA Website V2 — Auditoría

**Fecha:** 2026-08-15
**Repo auditado:** `github.com/fcocostaguta/vigia-command-web`, subcarpeta `vigia-nextjs/`
**Commit auditado:** `aa930ed` (`main`, idéntico a `origin/main`)
**Producción:** `https://www.vigiacommand.cl` (Vercel, proyecto `vigia-command-web`)
**Estado:** ningún archivo de código fue modificado durante esta auditoría.

---

## 0. Alcance y método

### 0.1 Qué repo es qué

| Repo local | Proyecto Vercel | Dominio | Rol |
|---|---|---|---|
| `~/vigia-command-web/vigia-nextjs` | `vigia-command-web` (`rootDirectory: vigia-nextjs`) | `vigiacommand.cl` / `www.vigiacommand.cl` | **Web comercial pública. Objeto de esta auditoría.** |
| `~/vigia` (raíz, `src/app`) | `vigia-command-app` | `mando.vigiacommand.cl` | Plataforma operacional. Fuera de alcance. |
| `~/vigia/apps/field-server` | (no Vercel) | Raspberry Pi en terreno | Servidor de campo. Fuera de alcance. |

No comparten código, ni componentes, ni design system, ni dependencias. Son dos aplicaciones Next.js independientes con dos `package.json` distintos. **Trabajar en la web V2 no requiere tocar `mando` en ningún punto.**

Nota: el repo contenedor `~/vigia-command-web` tiene su propio `.git` con un único commit (`5f43258 Initial commit from Create Next App`) y mantiene `vigia-nextjs/` como carpeta no rastreada. El repo real es el interior. Esta anidación es confusa y debería limpiarse (ver P2-07).

### 0.2 Cómo se verificó cada afirmación

- Lectura completa del código fuente publicado (`app/`, `components/`, `app/globals.css` completo, 875 líneas).
- Descarga y análisis del HTML servido en producción (`curl https://www.vigiacommand.cl`, 44.382 bytes).
- Medición real de cada asset servido, con y sin compresión.
- Cálculo numérico de contraste WCAG convirtiendo los tokens `oklch()` del design system a sRGB.
- `tsc --noEmit` (exit 0), `next lint` (3 warnings), `npm audit --omit=dev` (3 high).
- Verificación de claims del copy contra el código real del producto en `~/vigia`.

### 0.3 Qué NO se pudo verificar y por qué

| Ítem | Motivo | Cómo cerrarlo |
|---|---|---|
| Screenshots renderizados desktop/móvil | No hay navegador headless disponible en este entorno | Correr Lighthouse y capturas manuales |
| Core Web Vitals de campo (LCP/INP/CLS reales) | Requiere CrUX o RUM | Vercel Speed Insights o PageSpeed Insights |
| Estado en Google Search Console | Sin acceso | El usuario debe compartir acceso |
| Volumen y dificultad de keywords | Sin Semrush/Ahrefs/GSC | Marcado como `DATOS PENDIENTES DE VALIDACIÓN` en `seo-audit.md` |
| Si el formulario entrega mails hoy | Requiere `RESEND_API_KEY` de producción y enviar un lead real | Prueba end-to-end con el usuario |
| Configuración DNS/dominio en Vercel | Sin acceso al dashboard | Inferido desde los headers HTTP (ver 2.3) |

---

## 1. Stack y arquitectura actual

### 1.1 Stack

| Capa | Tecnología | Versión | Observación |
|---|---|---|---|
| Framework | Next.js App Router | `14.2.29` | 2 majors atrás. Arrastra 3 CVEs high (P1-08) |
| Runtime UI | React | `^18` | |
| Estilos | CSS plano en `app/globals.css` | 875 líneas, un solo archivo | Tokens en `:root` con `oklch()` |
| Tailwind | `tailwindcss ^3.4.1` + `@tailwindcss/postcss ^4.2.4` | **Instalado y configurado, cero uso** | P1-14 |
| Tipografías | `next/font/google`: Barlow Condensed, Barlow, JetBrains Mono | 15 archivos woff2 precargados | |
| Email | `resend ^6.12.4` | Único destino del formulario | |
| Analítica | `@vercel/analytics ^2.0.1` | Solo pageviews, sin eventos | |
| Tests | ninguno | | P1-15 |
| CI | ninguno | | P1-15 |

### 1.2 Estructura de rutas

```
app/
  page.tsx            -> <CommercialLanding />        (única página real)
  layout.tsx          -> fuentes + metadata + <Analytics />
  globals.css         -> design system completo
  robots.ts           -> Allow: /, sitemap al ápice
  sitemap.ts          -> 3 entradas, 2 son fragmentos (#)
  api/contact/route.ts-> POST, valida, envía por Resend
  test-b/page.tsx     -> experimento, noindex
  test-hero/page.tsx  -> experimento, noindex
```

Arquitectura de información real: **una sola landing larga de 9 secciones**, navegación por anclas, sin ninguna otra página indexable.

### 1.3 Árbol de componentes vivos

`app/page.tsx` -> `CommercialLanding.tsx` (`'use client'`) que monta, en orden:

| # | Componente | Archivo | Ancla | Función |
|---|---|---|---|---|
| 1 | `CommercialHeader` | `CommercialSections.tsx:19` | — | Logo, 4 links, 2 CTAs |
| 2 | `CommercialHero` | `CommercialHero.tsx:140` | `#inicio` | H1 + tablet 3D + reloj + chips |
| 3 | `CommercialPanel` | `CommercialSections.tsx:69` | `#solucion` | Tabla táctica animada |
| 4 | `CommercialCommand` | `CommercialCommand.tsx:42` | `#mando` | Bento de 7 tarjetas |
| 5 | `CommercialFlow` | `CommercialSections.tsx:158` | `#como-funciona` | 4 pasos |
| 6 | `CommercialCajaNegra` | `CommercialSections2.tsx:26` | `#caja-negra` | Mock de snapshot |
| 7 | `CommercialOffline` | `CommercialSections2.tsx:81` | — | 3 etapas |
| 8 | `CommercialCases` | `CommercialSections2.tsx:134` | `#casos` | 3 audiencias |
| 9 | `CommercialTrust` | `CommercialSections2.tsx:170` | — | Quote + 4 pilares |
| 10 | `CommercialContact` | `CommercialSections2.tsx:199` | `#contacto` | Formulario |
| 11 | `CommercialFooter` | `CommercialSections2.tsx:332` | — | Links + email |

**Todos son `'use client'`.** No hay ni un solo Server Component con contenido.

### 1.4 Design system

Existe y es mejor de lo esperado: tokens en `:root` (`app/globals.css:8-57`), clases de componente con prefijo `vg-` (botones, badges, campos, filas tácticas), clases de layout con prefijo `vk-`, y sistema de reveal por `data-reveal` con `IntersectionObserver`. Hay `prefers-reduced-motion` implementado en 4 bloques (`:125`, `:508`, `:716`, `:871`).

Lo que le falta para ser un sistema mantenible: escala tipográfica (los tamaños están hardcodeados en px, 32 declaraciones bajo 10px), escala de espaciado (valores sueltos: 8, 12, 14, 16, 18, 22, 26, 28, 32, 34, 36, 44, 48, 52, 56, 64, 72, 80, 96, 100), y tokens de color que fallan contraste (ver P0-05).

---

## 2. Estado de despliegue

### 2.1 Sincronía código/producción

`main` local, `origin/main` y el HTML servido coinciden en `aa930ed`. El header `age: 5918063` (68 días) confirma que no ha habido despliegue desde el 7 de junio de 2026. **No hay deriva entre repo y producción.** El único archivo no rastreado es `components/WatchOrbit.tsx` (huérfano, no importado).

### 2.2 Build

- `tsc --noEmit`: exit 0.
- `next lint`: 3 warnings `@next/next/no-img-element`, los tres en componentes **huérfanos** (`Footer.tsx:14`, `Header.tsx:30`, `Hero.tsx:281`). Los componentes vivos silencian la regla con `eslint-disable-next-line`.

### 2.3 Dominio y redirecciones

```
http://vigiacommand.cl      -> 308 -> https://vigiacommand.cl/
https://vigiacommand.cl     -> 307 -> https://www.vigiacommand.cl/
https://www.vigiacommand.cl -> 200
```

HSTS activo (`max-age=63072000`). La canonicalización HTTP funciona: **www es el dominio real**. El problema es que todo el metadata de la aplicación apunta al ápice (ver P0-08).

---

## 3. Hallazgos

Clasificación: **P0** bloquea credibilidad, conversión o cumplimiento. **P1** daña resultado medible. **P2** mejora.

### P0-01 — No existe navegación en móvil ni tablet

`app/globals.css:249`:
```css
@media (max-width: 1024px) { .vk-nav, .vk-header-ctas .vg-btn-ghost { display: none; } }
```

Bajo 1024px desaparecen los 4 links de navegación **y** el botón "CONVERSEMOS". No hay menú hamburguesa, drawer ni sustituto: `CommercialHeader` (`CommercialSections.tsx:19-53`) no tiene estado de apertura ni markup alternativo.

El único componente con menú móvil del repo es `components/Header.tsx:49-62`, que está **huérfano** y no se renderiza.

Consecuencia: en móvil, el header contiene el logo y un único botón, "Ingresar", que lleva a `mando.vigiacommand.cl`, es decir, **fuera del sitio comercial**. El único camino al formulario es hacer scroll por las 9 secciones completas.

### P0-02 — 2,75 MB de imágenes PNG sin optimizar en cada visita

Medición real contra producción:

| Asset | Peso servido | Dimensión real | Dimensión mostrada | Desperdicio |
|---|---|---|---|---|
| `public/images/watch-vigia.png` | **2.161.750 B** | 1536x1024 | 252px de ancho (`globals.css:633`) | ~6x lineal |
| `public/images/logo-vigia.png` | **593.625 B** | 1254x1254 | 34px / 30px / 18px | ~37x lineal |

Contexto de peso total de la página:

| Recurso | Comprimido |
|---|---|
| HTML | 9.764 B |
| JS + CSS (7 chunks) | 144.476 B |
| **Imágenes PNG** | **2.755.375 B (sin comprimir, PNG no se beneficia de br/gzip)** |

**Las imágenes son el 95% del peso de la página.** Ambas se sirven vía `<img>` crudo con `eslint-disable`, no por `next/image`, por lo que no hay AVIF/WebP, ni `srcset`, ni redimensionado, ni lazy loading. Además ambas aparecen como `<link rel="preload" as="image">` en el HTML servido, o sea con **prioridad alta**.

### P0-03 — En móvil el producto desaparece por completo

`app/globals.css:282-283`:
```css
@media (max-width: 980px) { .vk-hero { grid-template-columns: 1fr; ... }
  .vk-hero-content { padding: 0 32px; } .vk-hero-visual { display: none; } }
```

El visual del hero (tablet con dashboard + reloj + chips BPM/SpO₂ + wires de telemetría) se oculta bajo 980px. Como el resto de la página no contiene ninguna fotografía de hardware, **un visitante móvil nunca ve el producto físico**. Ve tablas y tarjetas dibujadas en CSS.

Agravante combinado con P0-02: los 2,75 MB se descargan igual, con preload de prioridad alta, para un elemento que nunca se pinta.

Dado que el segmento objetivo (comandantes, jefes de brigada, prevencionistas) recibe links por WhatsApp y los abre en el teléfono, este es probablemente el hallazgo de mayor impacto comercial de la auditoría.

### P0-04 — Los enlaces de navegación no son enlaces

`CommercialSections.tsx:36`:
```tsx
{NAV.map(([l, id]) => (
  <a key={id} onClick={() => go(id)} style={{ cursor: 'pointer' }}>{l}</a>
))}
```

Mismo patrón en el logo (`CommercialSections.tsx:26`) y en 4 links del footer (`CommercialSections2.tsx:351-357`).

Un `<a>` sin `href` no es un enlace: no recibe foco por teclado, no aparece como link en el árbol de accesibilidad, no se activa con Enter, no tiene `:focus-visible`, y un rastreador no lo sigue. **La navegación del sitio es inoperable con teclado y con lector de pantalla.**

### P0-05 — Contraste por debajo de WCAG AA en la mayoría del texto

Convirtiendo los tokens `oklch()` de `globals.css:17-19` a sRGB y calculando ratio WCAG contra los cuatro fondos del sistema:

| Token | sRGB | vs `--bg2` | vs `--surf2` | Veredicto AA (texto normal, 4.5:1) |
|---|---|---|---|---|
| `--text` | `#e3e1de` | 16.02:1 | 15.05:1 | Pasa |
| `--muted` | `#706e6b` | **4.13:1** | **3.88:1** | **Falla** |
| `--faint` | `#35383b` | **1.78:1** | **1.67:1** | **Falla gravemente** |
| `--red` | `#c2152f` | 3.42:1 | 3.21:1 | Falla como texto |
| `--red-b` | `#de3a46` | 4.80:1 | 4.50:1 | Pasa al límite |
| `--amber` | `#d98a2e` | 7.59:1 | 7.13:1 | Pasa |
| `--green` | `#00a45c` | 6.45:1 | 6.06:1 | Pasa |

Alcance: `--muted` se usa como color de texto en **23 declaraciones**, incluyendo `.vk-hero-sub` (el subtítulo del hero, 1.02rem), `.vk-pillar p`, `.vk-pq-bullet`, `.vk-contact-lead p`, `.vk-footer-brand p`. Es decir, **casi todo el texto de cuerpo del sitio**.

`--faint` se usa en **22 declaraciones**, casi todas combinadas con tamaños de 7 a 10px: `.vk-hero-micro` (la línea "Bomberos · Brigadas industriales · Equipos de respuesta"), `.vk-tt-head`, `.vk-flow-n`, `.cmd-k`, `.vk-mock-label`, `.vk-footer-domain`, `.td-rhd`. A 1.78:1 sobre negro y a 9px, ese texto es efectivamente invisible para buena parte de los usuarios, y el segmento objetivo de VIGÍA no es precisamente joven.

Lo que sí pasa: el botón primario, blanco sobre `--red`, da **6.13:1**.

### P0-06 — La protección antispam del formulario no funciona

`app/api/contact/route.ts:29`:
```ts
if (body._hp) { return NextResponse.json({ ok: true }) }
```

Pero `CommercialSections2.tsx:218` construye el body así:
```ts
const body = { nombre: ..., mensaje: get('mensaje'), _hp: '' }
```

El campo `_hp` **nunca se renderiza como input oculto**: se envía siempre vacío, hardcodeado. Un bot que haga POST directo al endpoint tampoco lo enviaría. **La comprobación es inalcanzable en la práctica.**

Adicionalmente el endpoint no tiene rate limiting, ni CAPTCHA, ni verificación de origen. Es un endpoint público que dispara envío de correo a `contacto@vigiacommand.cl` sin límite.

### P0-07 — Recolección de datos personales sin política de privacidad

El formulario recolecta nombre, cargo, organización, correo institucional y teléfono. No existe:
- página de política de privacidad (no hay ruta, ni link en el footer),
- checkbox de consentimiento,
- declaración de finalidad, plazo de conservación ni responsable del tratamiento,
- mención de a quién se transfieren los datos (Resend, proveedor en EE.UU.).

En Chile rige la Ley 19.628 y la Ley 21.719 sobre protección de datos personales, con obligaciones de información y base de licitud. `REQUIERE DECISIÓN DE NEGOCIO` respecto de la razón social, RUT y domicilio que deben figurar como responsable.

### P0-08 — Sin canonical y con dominio inconsistente en todo el metadata

El sitio sirve en `www.vigiacommand.cl`, pero:

| Señal | Valor actual | Archivo |
|---|---|---|
| `metadataBase` | `https://vigiacommand.cl` (ápice) | `app/layout.tsx:32` |
| `og:url` | `https://vigiacommand.cl` (ápice) | `app/layout.tsx:37` |
| `sitemap.xml` `<loc>` | `https://vigiacommand.cl` (ápice) | `app/sitemap.ts:8` |
| `robots.txt` sitemap | `https://vigiacommand.cl/sitemap.xml` (ápice) | `app/robots.ts:9` |
| `<link rel="canonical">` | **no existe** | verificado en HTML de producción |

Todas las URLs declaradas responden 307 hacia www. El sitemap entrega a Google exclusivamente URLs que redirigen, y no hay canonical explícito que resuelva la ambigüedad ápice/www.

### P0-09 — Sin imagen Open Graph

`app/layout.tsx:33-47` declara `openGraph` y `twitter.card: 'summary_large_image'`, pero **no declara `images` en ninguno de los dos**. Verificado en el HTML de producción: no hay `og:image` ni `twitter:image`.

Consecuencia concreta: cuando alguien comparte `vigiacommand.cl` por WhatsApp, LinkedIn o correo (el canal natural de este negocio), la previsualización sale sin imagen y sin marca. Además `summary_large_image` sin imagen es una declaración inválida.

---

### P1-01 — Datos simulados presentados con etiqueta "En vivo"

Tres secciones muestran dashboards con datos aleatorios generados por `setInterval`, rotulados como si fueran reales:

| Ubicación | Rótulo textual | Realidad |
|---|---|---|
| `CommercialSections.tsx:114` | "Panel táctico · **Vista en vivo**" | `Math.random()` cada 1600ms |
| `CommercialSections.tsx:118` | "VIGÍA Command · **En vivo**" + reloj real del navegador | Simulación |
| `CommercialHero.tsx:67` | "**En vivo**" + reloj real | Simulación |
| `CommercialCommand.tsx:80` | "Vista de operación · **en vivo**" | Simulación |

Se agrava con detalles que aumentan el realismo: nombres y grados chilenos plausibles (Cap. Rojas, Tte. Muñoz, Bbro. Soto), una localidad real ("Maitencillo", `CommercialHero.tsx:74` y `CommercialCommand.tsx:89`), reloj del sistema en tiempo real y un cronómetro que avanza.

Un comandante que entienda que eso es una simulación lo aceptará como demo. Un comandante que crea que es una operación real y después descubra que no lo era, pierde confianza. El costo de ser honesto aquí es una palabra: "demostración".

### P1-02 — Claims que requieren matiz o validación

Verificados contra el código del producto en `~/vigia`:

| Claim en la web | Dónde | Evidencia en el producto | Veredicto |
|---|---|---|---|
| "Opera sin señal" | `CommercialSections2.tsx:88` | `apps/field-server` corre en Raspberry Pi local con SQLite y `sync_outbox`; funciona sin internet | **Respaldado** |
| "Registro inmutable" / "Snapshot inmutable por incidente" | `CommercialSections2.tsx:38`, `CommercialCommand.tsx:149` | `apps/field-server/src/db/client.ts:113` documenta snapshot inmutable; `routes/incidents.ts:186` append-only | **Respaldado a nivel de diseño de datos.** No hay firma criptográfica ni hash encadenado. "Inmutable" sugiere garantía criptográfica que no existe |
| "SpO₂ 98%" (chip del hero) | `CommercialHero.tsx:231` | `hardware/j3_ble_gateway/j3_ble_gateway.ino:271-278` emite `spo2`; `apps/field-server/src/config.ts:65` define umbrales; el README del gateway muestra lectura real de 99 | **Respaldado en la ruta BLE.** `hardware/bridge/index.js:115` indica explícitamente que sobre LoRa el `bloodOxygen` se omite. El claim depende del enlace |
| "Trazabilidad total" | `CommercialSections2.tsx:165` | — | **Absoluto no verificable.** "Total" no admite excepciones y el sistema sí las tiene (pérdida de señal, reloj no portado, datos antiguos) |
| "alertas en tiempo real" | `app/layout.tsx:31` (meta description) | La cadencia real LoRa validada es de ~60s por uplink (`docs/lorawan/AU915_CADENCE_ROOT_CAUSE.md` en `~/vigia`) | **Matizar.** 60s no es "tiempo real" para un ingeniero |
| "Respuesta en menos de 48 horas" | `CommercialSections2.tsx:247`, `:259`, `:321` | — | `REQUIERE DECISIÓN DE NEGOCIO`. Se promete tres veces. Si no hay quien lo garantice, es una promesa incumplible |

Ningún claim es inventado. El problema es de calibración: los absolutos ("total", "inmutable", "tiempo real") son más frágiles que el producto real, que es sólido.

### P1-03 — Cinco nombres para una sola acción

| Elemento | Etiqueta | Archivo |
|---|---|---|
| Header | "CONVERSEMOS" | `CommercialSections.tsx:40` |
| Hero primario | "ME INTERESA" | `CommercialHero.tsx:185` |
| Tag de la sección contacto | "Evaluar implementación" | `CommercialSections2.tsx:243` |
| Tag del formulario | "Solicitar información · Demo" | `CommercialSections2.tsx:270` |
| Botón submit | "Enviar solicitud" | `CommercialSections2.tsx:319` |
| Footer | "CONVERSEMOS" | `CommercialSections2.tsx:357` |

Los seis llevan al mismo formulario. "ME INTERESA" además es la etiqueta más débil del conjunto: es lo que siente el usuario, no lo que va a obtener.

### P1-04 — El CTA secundario saca al visitante del sitio

`CommercialHero.tsx:187-194`: el segundo botón del hero es "Ingresar a Mando", con `target="_blank"` hacia `mando.vigiacommand.cl`. Tiene el mismo tamaño (`vg-btn-lg`) que el CTA principal.

Es un **login para clientes existentes**, no un paso del funnel. Ocupa el lugar donde debería estar "Ver cómo funciona". Un prospecto que lo pulsa llega a una pantalla de autenticación que no puede pasar.

### P1-05 — Sitemap con URLs de fragmento

`app/sitemap.ts:14` y `:20` declaran `https://vigiacommand.cl/#solucion` y `.../#contacto` como entradas independientes con `priority` propia. Los fragmentos no son URLs distintas: Google los descarta. El sitemap real tiene 1 URL útil de 3 declaradas, y esa URL redirige.

### P1-06 — Cero structured data

Verificado en el HTML de producción: 0 bloques `application/ld+json`. No hay `Organization`, ni `WebSite`, ni nada. Para una empresa que quiere aparecer como entidad reconocible en búsqueda y en respuestas de LLMs, es la ausencia más barata de corregir.

### P1-07 — Landing 100% client-side con 7 timers permanentes

Los 11 componentes son `'use client'`. Además hay **7 `setInterval` que nunca se detienen**:

| Intervalo | Archivo | Efecto |
|---|---|---|
| 1800ms | `CommercialLanding.tsx:22` | `setBpm` en el nivel raíz, re-renderiza el árbol completo |
| 1000ms | `CommercialSections.tsx:76` | reloj del panel |
| 1600ms | `CommercialSections.tsx:81` | 5 filas de BPM |
| 1000ms | `CommercialHero.tsx:41` | reloj de la tablet |
| 1500ms | `CommercialHero.tsx:46` | 5 filas de la tablet |
| 1600ms | `CommercialCommand.tsx:47` | 4 filas del bento |
| 1000ms | `CommercialCommand.tsx:58` | cronómetro del incidente |

Ninguno se pausa cuando la sección está fuera de viewport, ni cuando la pestaña está oculta, ni bajo `prefers-reduced-motion` (el bloque de `globals.css:508` desactiva animaciones CSS, pero no los timers de JS). Son ~4 actualizaciones de estado por segundo de forma indefinida. Impacto directo en INP, en CPU y en batería de móvil.

`CommercialLanding.tsx:18` es el peor caso: el estado `bpm` vive en el componente raíz y se pasa a `CommercialHero`, forzando re-render de todo el árbol cada 1,8s.

### P1-08 — 3 vulnerabilidades high en el árbol de producción

`npm audit --omit=dev` reporta 3 advisories high en `postcss`, arrastrado por `next@14.2.29` (`node_modules/next/node_modules/postcss`): GHSA-qx2v-qp2m-jg93, GHSA-6g55-p6wh-862q, GHSA-fxqj-rqcc-2cmp, GHSA-r28c-9q8g-f849. El propio audit indica que la corrección requiere subir a `next@16.x`, un cambio mayor.

### P1-09 — Warning de React en consola

`CommercialSections.tsx:167-181`: el `.map()` devuelve un `<>...</>` cuya `key` está puesta en el hijo, no en el fragment. React exige la key en el elemento raíz retornado. Genera warning "Each child in a list should have a unique key" en consola de desarrollo. Se corrige usando `<React.Fragment key={s.n}>`.

### P1-10 — Analítica sin ningún evento de funnel

`app/layout.tsx:67` monta `<Analytics />` de Vercel, que registra pageviews. **No hay un solo evento personalizado.** Hoy es imposible responder: cuántos abren el formulario, cuántos lo abandonan y en qué campo, qué CTA convierte, cuántos llegan a la sección de contacto, cuál es la tasa de error de envío.

No hay GA4, ni GTM, ni Meta Pixel, ni verificación de Search Console en el HTML.

### P1-11 — Calidad de implementación del formulario

`CommercialSections2.tsx:199-330`:
- Sin `autoComplete` en ningún campo (`name`, `organization`, `email`, `tel`).
- El bloque de error (`:310-312`) es un `<p>` sin `role="alert"` ni `aria-live`: un lector de pantalla no lo anuncia.
- Validación solo en submit y solo global. No hay estado de error por campo.
- Lectura de valores por `f.elements.namedItem(...)` con casts, en lugar de estado controlado o `FormData`.
- Sin `trim()` en cliente (el servidor sí lo hace para la validación de requeridos, pero envía el valor sin trim al correo).
- El botón de éxito "Enviar otro mensaje" (`:260-266`) es un patrón raro para un lead B2B: reabre el formulario vacío en vez de cerrar el flujo.

### P1-12 — Cero trazabilidad del lead

`app/api/contact/route.ts` envía un correo y devuelve `{ok:true}`. No hay base de datos, ni CRM, ni hoja de cálculo, ni webhook. Si Resend falla, si el correo cae en spam, o si alguien borra el mensaje, **el lead se pierde sin rastro**. Tampoco hay forma de saber cuántas solicitudes se recibieron históricamente.

### P1-13 — 16 archivos huérfanos, ~2.015 líneas

Verificado por análisis de importaciones. Ningún archivo del árbol vivo los referencia:

`CTABand.tsx`, `CajaNegra.tsx`, `Cases.tsx`, `CommandSection.tsx`, `Contact.tsx`, `Footer.tsx`, `Header.tsx`, `Hero.tsx`, `HeroBackground.tsx`, `Icons.tsx`, `OfflineFirst.tsx`, `PanelSection.tsx`, `ProblemBand.tsx`, `ProductShowcase.tsx`, `Trust.tsx`, `WatchOrbit.tsx` (sin rastrear), `hero-background.module.css`.

Son la versión anterior de la landing, reemplazada por el rediseño DS-2 en `aa930ed`. Confunden a cualquiera que entre al repo: `Header.tsx` sí tiene menú móvil, `Hero.tsx` sí usa `<img>` sin disable. Un desarrollador nuevo edita el archivo equivocado.

### P1-14 — Tailwind instalado, configurado y sin usar

`tailwind.config.ts` (79 líneas, con paleta, keyframes y animaciones completas), `postcss.config.js` cargando `@tailwindcss/postcss`, y dos dependencias: `tailwindcss ^3.4.1` **y** `@tailwindcss/postcss ^4.2.4` (versiones mayores incompatibles entre sí).

`app/globals.css` no contiene ni una directiva `@tailwind` ni un `@import "tailwindcss"`. Ningún componente vivo usa clases de utilidad. **Tailwind no genera una sola regla CSS en el build.** Es configuración muerta que sugiere una arquitectura que no existe.

### P1-15 — Sin tests y sin CI

Cero archivos de test. Sin GitHub Actions. `package.json` no tiene script `test` ni `typecheck`. Cada despliegue depende de que alguien mire la página.

### P1-16 — Tipografía micro sistemática

Recuento en `globals.css`: 1 declaración a 6px, 4 a 7px, 1 a 7.5px, 6 a 8px, 1 a 8.5px, **19 a 9px**, 17 a 10px. Total: **49 declaraciones de texto bajo 11px**, la mayoría en `--faint` (ver P0-05).

Estéticamente busca densidad táctica. Funcionalmente es texto ilegible, y en móvil, donde el dashboard simulado se comprime, empeora.

### P1-17 — Cero evidencia institucional

El sitio no dice: quién está detrás, dónde está la empresa, desde cuándo existe, si el producto está desplegado en terreno, con quién se ha probado, ni presenta ninguna fotografía real. La única "prueba" es un dashboard dibujado en CSS.

En `~/vigia` hay evidencia real que no está usada: `docs/pilot/`, runbooks de despliegue en Raspberry Pi, `docs/lorawan/AU915_CADENCE_ROOT_CAUSE.md` con validación de campo medida, y existe un contrato de FIBOM 2026 (`~/Desktop/Franco/Contrato_FIBOM_2026_VIGIA.pdf`, fuera del repo). `REQUIERE DECISIÓN DE NEGOCIO` decidir cuánto de eso es publicable.

### P1-18 — 404 por defecto de Next.js

`https://www.vigiacommand.cl/no-existe` devuelve 404 con la página genérica de Next, sin marca, sin header, sin camino de vuelta.

### P1-19 — `<img>` sin dimensiones explícitas

`CommercialHero.tsx:223`: `<img src="/images/watch-vigia.png" alt="..." />` sin `width` ni `height`. El tamaño lo fija el CSS del contenedor (`globals.css:633`), pero mientras la imagen de 2,16 MB no ha llegado, el navegador no conoce la relación de aspecto. Riesgo de CLS en el elemento visual principal del hero.

---

### P2-01 — `scroll-behavior: smooth` global sin respetar reduced-motion

`globals.css:61` aplica `html { scroll-behavior: smooth }`. Ninguno de los 4 bloques `prefers-reduced-motion` lo revierte. Para usuarios con sensibilidad vestibular, el scroll suave forzado en toda la navegación por anclas es exactamente lo que la preferencia pide evitar.

### P2-02 — Favicon único en SVG

`app/layout.tsx:48-52` declara el mismo `/favicon.svg` para `icon`, `shortcut` y `apple`. Safari en iOS no acepta SVG como `apple-touch-icon`: necesita PNG de 180x180. No hay `manifest.webmanifest` ni `theme-color`.

### P2-03 — Rutas de experimento en producción

`/test-b` y `/test-hero` responden 200. Ambas declaran `robots: {index:false, follow:false}` (`app/test-b/page.tsx:7`, `app/test-hero/page.tsx:7`), por lo que **no son un problema de indexación**. Sí son superficie pública innecesaria y deuda de repo.

### P2-04 — README desactualizado

`README.md` describe una estructura que ya no corresponde al árbol de componentes vivo.

### P2-05 — `lang="es"` sin región

`app/layout.tsx:62`. El contenido, los precios futuros y el vocabulario son de Chile. `lang="es-CL"` es más preciso y `og:locale` ya declara `es_CL`, así que hay incoherencia interna.

### P2-06 — Consentimiento de analítica

Vercel Analytics es sin cookies y agrega por defecto, por lo que el riesgo es bajo. Aun así conviene mencionarlo en la futura política de privacidad.

### P2-07 — Anidación de repositorios git

`~/vigia-command-web/.git` (1 commit, plantilla de Create Next App) contiene `vigia-nextjs/` con su propio `.git` como carpeta no rastreada. Confuso, y hace fácil ejecutar comandos git en el repo equivocado.

### P2-08 — `.DS_Store` presente en el árbol de trabajo

`public/.DS_Store`, `public/images/.DS_Store` y otros existen en disco. Están correctamente ignorados por `.gitignore` y **no están rastreados**, pero conviene borrarlos localmente para que no lleguen al build.

---

## 4. Lo que la web hace bien

Para calibrar: el rediseño DS-2 no es un punto de partida malo.

1. **La paleta y el sistema de tokens son correctos.** `oklch()` es la decisión técnicamente adecuada, la escala de superficies (`bg2`/`bg`/`surf`/`surf2`/`surf3`) está bien construida, y el rojo funciona como acento, no como fondo. Los problemas de contraste son de calibración de dos tokens, no de concepto.
2. **`prefers-reduced-motion` está implementado en serio**, en 4 bloques, incluyendo desactivación del tilt 3D. Es más de lo que hace la mayoría.
3. **El contenido se renderiza en el HTML del servidor**, verificado: H1, H2 y copy completo están en la respuesta. Google no depende de ejecutar JS.
4. **El endpoint de contacto está razonablemente escrito** para su alcance: escapa HTML (`route.ts:100-107`), limita longitudes, y previene inyección de cabeceras de correo eliminando saltos de línea del asunto (`route.ts:56-57`).
5. **Un solo H1, jerarquía H2 coherente**, 7 H2 bien distribuidos.
6. **El visual del hero es genuinamente bueno** en desktop: la composición tablet + reloj + wires de telemetría comunica la arquitectura del producto sin decir una palabra técnica. El problema no es su calidad, es que desaparece en móvil y pesa 2,75 MB.
7. **El copy ya pasó por una depuración de términos sensibles** (`docs/COMMERCIAL_WEB_FINAL_RELEASE.md`): no aparecen Raspberry, LoRa, ESP32, MQTT, NFPA ni Polar H10. Esa decisión está tomada y es correcta.

---

## 5. Resumen cuantitativo

| Categoría | P0 | P1 | P2 |
|---|---|---|---|
| Móvil / responsive | 2 | 1 | 0 |
| Performance | 1 | 1 | 0 |
| Accesibilidad | 2 | 1 | 1 |
| SEO técnico | 2 | 2 | 2 |
| Conversión | 0 | 4 | 0 |
| Credibilidad / contenido | 0 | 3 | 0 |
| Seguridad / legal | 2 | 1 | 1 |
| Calidad de código | 0 | 6 | 3 |
| **Total** | **9** | **19** | **8** |
