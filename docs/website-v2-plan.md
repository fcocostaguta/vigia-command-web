# VIGÍA Website V2 — Plan

**Fecha:** 2026-08-15
**Base:** `docs/website-v2-audit.md` (commit `aa930ed`)
**Estado:** propuesta. Nada implementado. Requiere aprobación antes de escribir código.

---

## 1. Posicionamiento

### 1.1 El problema de posicionamiento actual

El H1 vigente es:

> **Caja Negra Operacional para Emergencias.**

"Caja negra" es una metáfora buena y es un diferenciador real (el snapshot inmutable por incidente existe en el producto). Pero como **primera frase** falla en tres cosas:

1. Describe el **subproducto**, no el producto. La caja negra es lo que queda **después**. Lo que se vende es visibilidad **durante**.
2. No dice para quién es. Hay que llegar a la línea micro, tres elementos más abajo, para leer "Bomberos · Brigadas industriales · Equipos de respuesta".
3. La metáfora aeronáutica arrastra una connotación desafortunada: la caja negra se lee después del accidente. Como primer mensaje a un comandante, el marco implícito es "cuando algo salga mal".

El subtítulo actual, "Monitoreo offline. Registro inmutable. Sincronización automática.", son tres características sin sujeto ni beneficio.

### 1.2 Posicionamiento propuesto

**Categoría:** tecnología operacional para el mando en emergencias.
**No es:** un wearable, una app, un SaaS genérico, ni un producto solo para Bomberos.

**Jerarquía de mensaje:**

1. **Nivel 1 (hero):** el mando ve el estado de su gente mientras la emergencia ocurre.
2. **Nivel 2 (solución):** funciona sin internet, en terreno, en el carro.
3. **Nivel 3 (diferenciador):** cada incidente deja un registro auditable, automáticamente.

La caja negra **baja del hero al nivel 3**, donde es más fuerte: deja de competir por ser la definición del producto y pasa a ser el argumento que cierra.

### 1.3 Recomendación sobre el H1

Se recomienda evaluar tres direcciones, todas honestas con el producto:

| Opción | H1 | Qué gana | Qué pierde |
|---|---|---|---|
| **A (recomendada)** | "El mando ve a su gente. Durante la emergencia." | Sujeto claro, beneficio claro, temporalidad clara. Habla el idioma del comandante | Abandona la metáfora en el hero |
| **B** | "Visibilidad del personal en operaciones críticas." | Neutral, sirve para Bomberos e industria por igual | Más frío, menos memorable |
| **C** | "Del pulso al mando." (marca existente) | Continuidad de marca, muy conciso | Requiere que el eyebrow y el subtítulo carguen todo el significado |

En los tres casos, `"Tecnología operativa para emergencias. Del pulso al mando."` se conserva como **firma de marca**, en el eyebrow del hero o en el footer, no como H1.

**Decisión pendiente del usuario.**

---

## 2. Arquitectura de información

### 2.1 Diagnóstico de la arquitectura actual

Landing única, 9 secciones, navegación por anclas. Problemas medidos:

- Tres secciones (`CommercialPanel`, `CommercialCommand`, `CommercialCajaNegra`) muestran **la misma idea** con tres mocks distintos: una tabla de operadores con BPM y estados. Es repetición, no profundización.
- `CommercialTrust` y `CommercialCases` dicen lo mismo con distinto formato: para quién sirve y qué logra.
- No hay ninguna URL que se pueda enviar a alguien que pregunta algo específico ("mándame lo de industria", "mándame la parte técnica").
- Sin páginas, no hay nada que posicionar en búsqueda más allá de la home.

### 2.2 Arquitectura propuesta

Se propone **5 páginas indexables + 2 legales**, no las 9 de la hipótesis del brief. Razón: cada página debe tener contenido propio suficiente para justificar su existencia. Con la madurez actual de VIGÍA hay material honesto para 5, no para 9. Crear "Nosotros", "Tecnología", "Recursos" y "FAQ" hoy produciría páginas delgadas, que es peor que no tenerlas.

```
/                        Inicio            Qué es, para quién, cómo funciona en resumen, CTA
/solucion                Solución          El sistema completo: terreno, mando, post-incidente
/bomberos                Bomberos          Caso de uso vertical
/industria               Industria y brigadas   Caso de uso vertical
/contacto                Contacto          Formulario dedicado + datos institucionales

/privacidad              Política de privacidad     (obligatoria, P0-07)
/gracias                 Confirmación post-envío    (noindex)
404                      Página de error con marca
```

**Justificación de cada página:**

| Página | Razón de existir | Intención de búsqueda | Contenido único |
|---|---|---|---|
| `/` | Punto de entrada, marca, síntesis | Navegacional + descubrimiento | Hero, resumen del sistema, prueba, CTA |
| `/solucion` | El "cómo funciona" completo, que hoy está fragmentado en 4 secciones repetitivas | Informacional: "cómo monitorear personal en emergencia" | Arquitectura de 3 capas, offline, caja negra, límites honestos |
| `/bomberos` | Es el segmento con tracción real y vocabulario propio (Comandante, carro, alarma, rehabilitación) | Comercial: "tecnología para bomberos" | Escenario de incendio estructural, roles, qué ve el oficial |
| `/industria` | Impide que VIGÍA quede encerrado en el mundo bomberil, que es un objetivo explícito del brief | Comercial: "monitoreo de personal industrial" | Escenario de brigada, espacios confinados, prevención de riesgos |
| `/contacto` | Hoy el formulario es la novena sección de un scroll de 9. Necesita URL propia para compartir | Transaccional | Formulario, datos institucionales, qué pasa después |

**Lo que NO se crea, y por qué:** ver `seo-audit.md`, sección "No aplica a VIGÍA".

### 2.3 Enlazado interno

```
/  ──> /solucion       (CTA secundario del hero: "Ver cómo funciona")
   ──> /bomberos       (desde la sección "para quién")
   ──> /industria      (desde la sección "para quién")
   ──> /contacto       (CTA primario, presente en header, hero, mitad y footer)

/solucion  ──> /bomberos, /industria, /contacto
/bomberos  ──> /solucion, /contacto
/industria ──> /solucion, /contacto
/contacto  ──> /privacidad
```

Cada página termina en `/contacto`. Ninguna es hoja muerta. Ninguna página huérfana.

Breadcrumbs visibles en las 4 páginas internas, con `BreadcrumbList` en JSON-LD.

---

## 3. User journeys

### J1 — Comandante en el celular (el caso dominante)

Recibe el link por WhatsApp de un colega. Abre en iPhone, de pie, con 30 segundos.

```
Previsualización con og:image de marca  (hoy: texto plano, P0-09)
  -> Hero móvil: H1 + una foto real del reloj puesto + CTA
     (hoy: el visual desaparece, P0-03, y se han bajado 2,75 MB, P0-02)
  -> Menú accesible en el header
     (hoy: no existe menú móvil, P0-01)
  -> Toca "Ver cómo funciona" o baja 2 secciones
  -> Toca "Solicitar demostración"
  -> Formulario corto de 4 campos visibles
  -> Confirmación con expectativa clara
```

Objetivo: **menos de 60 segundos y menos de 4 toques** desde la apertura hasta el envío.

### J2 — Prevencionista de riesgos en desktop, evaluando proveedores

Llega por búsqueda o por referencia. Compara. Necesita detalle técnico y señales de que la empresa existe.

```
/  ->  /solucion  ->  /industria  ->  /contacto
```
Necesita ver: arquitectura, qué pasa sin señal, qué queda registrado, **los límites del sistema** (que hoy no se declaran en ninguna parte y son un activo de credibilidad, no un pasivo), y datos institucionales reales.

### J3 — Ingeniero evaluando la seriedad técnica

Abre DevTools. Mira el HTML. Mide la página. Busca structured data. Hoy encuentra: 2,75 MB de PNG, 7 timers permanentes, cero JSON-LD, `<a>` sin href. **Esa es una evaluación técnica desfavorable que ocurre en 90 segundos y sin hablar con nadie.**

### J4 — Alguien que ya es cliente

Busca "Ingresar". Debe encontrarlo rápido y **sin que compita con el CTA comercial**. Va en el header, en formato discreto, nunca como botón grande del hero (P1-04).

---

## 4. Dirección visual

### 4.1 Qué se conserva

- Paleta y tokens `oklch()` de `globals.css:8-57`, con dos correcciones de contraste (4.2).
- El rojo como acento estratégico. Ya está bien usado: no domina.
- Densidad tipográfica de estilo terminal en **elementos de dato**, no en texto de lectura.
- El sistema de reveal por `data-reveal` con `IntersectionObserver`.
- Los cuatro bloques `prefers-reduced-motion`, ampliados para cubrir timers de JS y `scroll-behavior`.
- Barlow Condensed / Barlow / JetBrains Mono. La combinación es correcta para el posicionamiento.

### 4.2 Qué cambia

**Contraste (corrige P0-05).** Recalibrar dos tokens:

| Token | Actual | Ratio actual | Propuesto | Ratio objetivo |
|---|---|---|---|---|
| `--muted` | `oklch(54% 0.005 80)` | 3.88 a 4.13:1 | `oklch(68% 0.005 80)` | por sobre 7:1 |
| `--faint` | `oklch(34% 0.006 240)` | 1.67 a 1.78:1 | `oklch(56% 0.006 240)` | por sobre 4.5:1 |

Se introduce un tercer token `--faint-deco` con el valor actual de `--faint`, exclusivo para elementos **no textuales** (bordes, separadores, iconografía decorativa). El valor no se pierde, se restringe a donde es legítimo.

**Escala tipográfica.** Reemplazar las 49 declaraciones sueltas bajo 11px por una escala con mínimo aplicado:

```
--fs-micro: 12px   (mínimo absoluto para texto legible; hoy hay 32 declaraciones por debajo)
--fs-sm:    14px
--fs-base:  16px
--fs-lg:    18px
```

Los tamaños de 7 a 10px se permiten **solo dentro de los mocks de dashboard**, que son ilustración de producto, no texto de lectura. Esa distinción hay que hacerla explícita en el CSS.

**Escala de espaciado.** Sustituir los ~20 valores sueltos por una escala de 4px: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.

**Fotografía real (corrige P1-17 y P0-03).** Es el cambio de mayor impacto en percepción de seriedad. Ver sección 7.

### 4.3 Qué se elimina

- La animación de fondo del hero (`vk-radar`, `vk-ember`, `vk-beams`, `vk-fog`, `vk-scan`, `vk-mote`, `vk-emergency`): siete capas de atmósfera animada simultáneas. Es exactamente lo que el brief describe como "partículas sin propósito". Se conserva una sola: el gradiente radial de base.
- El tilt 3D del hero por `pointermove` (`CommercialHero.tsx:144-163`): efecto de gama gaming, no de comunicación de producto.
- Los 7 `setInterval` permanentes. Se sustituyen por animación que corre **solo mientras la sección está en viewport** y **solo si no hay `prefers-reduced-motion`**.
- La duplicación de dashboards: de 3 mocks de tabla de operadores a 1, bien hecho.

### 4.4 Qué se agrega

- **Etiquetado honesto de las simulaciones** (corrige P1-01): cada mock lleva un rótulo visible "Demostración · datos simulados". Ocupa 12px de alto y elimina un riesgo de credibilidad completo.
- **Una sección de límites declarados** en `/solucion`: qué pasa cuando se pierde señal, cuál es la cadencia real de actualización, qué NO hace el sistema. Contraintuitivamente, esto **sube** la credibilidad ante un comprador técnico. Es la diferencia entre un proveedor y un vendedor.
- Estados de foco visibles en todos los elementos interactivos.

---

## 5. Estrategia de conversión

### 5.1 CTA único

**CTA primario, un solo nombre en todo el sitio:**

> **Solicitar demostración**

Razón sobre las alternativas del brief: "Conversemos" no dice qué se obtiene. "Evaluar VIGÍA" pone el trabajo en el usuario. "Solicitar demostración" nombra un entregable concreto, es lo que la organización realmente quiere, y coincide con lo que el sistema ya hace (el asunto del correo en `route.ts:64` ya dice "Nueva solicitud de demo").

**CTA secundario, un solo nombre:**

> **Ver cómo funciona** -> `/solucion`

**CTA terciario, discreto, para clientes:**

> **Ingresar** -> `mando.vigiacommand.cl`, solo en el header, en formato texto, nunca como botón del hero.

### 5.2 Distribución en la página

| Ubicación | Primario | Secundario |
|---|---|---|
| Header (sticky, **también en móvil**) | Solicitar demostración | — |
| Hero | Solicitar demostración | Ver cómo funciona |
| Fin de "para quién" | Solicitar demostración | — |
| Banda antes del footer | Solicitar demostración | — |
| Footer | Solicitar demostración | — |

Cinco apariciones del mismo CTA con el mismo texto. Cero ambigüedad.

### 5.3 Medición

Sin eventos no hay optimización posible (P1-10). Eventos mínimos a instrumentar:

| Evento | Cuándo |
|---|---|
| `cta_click` | props: `location` (header/hero/mid/footer), `label` |
| `nav_click` | props: `destination` |
| `scroll_depth` | 25 / 50 / 75 / 100 |
| `form_start` | primer foco en cualquier campo |
| `form_field_error` | props: `field` |
| `form_submit` | envío iniciado |
| `form_success` | 200 del endpoint |
| `form_error` | props: `reason` |
| `contact_email_click` | clic en `mailto:` |
| `login_click` | clic en Ingresar |

Nombres en snake_case, sin PII en las props. Detalle en `contact-form-spec.md`.

---

## 6. Estrategia de confianza

Ordenada por relación impacto/costo:

| # | Elemento | Costo | Impacto | Bloqueo |
|---|---|---|---|---|
| 1 | Etiquetar los mocks como demostración | 1 hora | Alto | Ninguno |
| 2 | Fotografía real del hardware | Media jornada | **Muy alto** | Requiere sesión de fotos |
| 3 | Datos institucionales reales en footer y `/contacto` | 1 hora | Alto | `REQUIERE INFORMACIÓN`: razón social, RUT, domicilio |
| 4 | Política de privacidad | 3 horas | Alto (legal) | Depende de #3 |
| 5 | Sección de límites declarados en `/solucion` | 3 horas | Alto ante comprador técnico | Decisión editorial |
| 6 | Calibrar los claims absolutos (P1-02) | 2 horas | Medio-alto | Ninguno |
| 7 | Presencia FIBOM 2026 | 2 horas | Alto si es publicable | `REQUIERE DECISIÓN DE NEGOCIO` |
| 8 | Quiénes somos, breve, en `/contacto` | 2 horas | Medio | `REQUIERE INFORMACIÓN` |

**No se propone:** logos de clientes, testimonios, cifras de implementación, certificaciones ni premios. No hay evidencia de ninguno en el repositorio y el brief prohíbe explícitamente inventarlos.

---

## 7. Material visual: qué existe y qué falta

### 7.1 Inventario real del repositorio

| Archivo | Estado | Uso propuesto |
|---|---|---|
| `public/images/watch-vigia.png` (1536x1024, 2,16 MB) | Render o foto del reloj. Único material de producto | Reoptimizar y conservar. Ver 7.2 |
| `public/images/logo-vigia.png` (1254x1254, 594 KB) | Logo en PNG | Sustituir por SVG |
| `public/favicon.svg` (452 B) | Correcto | Conservar, añadir PNG 180x180 |

**Eso es todo.** No hay ni una fotografía de terreno, de gateway, de instalación, de equipo ni de FIBOM en el repositorio de la web.

Fuera del repo, sin verificar contenido ni derechos: `~/Desktop/Funcionamiento VIGIA.mov`, `~/Desktop/Franco/LOGO VIGIA NEGRO.png`, `LOGO VIGIA BLANCO.png`.

### 7.2 Optimización del material existente

| Acción | De | A |
|---|---|---|
| `logo-vigia.png` -> SVG | 594 KB | ~5 KB |
| `watch-vigia.png` vía `next/image` | 2,16 MB PNG | ~60 KB AVIF a 504px (2x de 252px) |
| Configurar `images.formats` en `next.config.mjs` | — | AVIF + WebP automáticos |

**Reducción estimada del peso de la página: de 2,90 MB a ~0,21 MB.** Es una mejora de un orden de magnitud, con dos cambios de archivo y sin tocar el diseño.

### 7.3 Fotografía que falta y conviene producir

En orden de prioridad. Todo material real, sin generación por IA, sin instituciones inventadas:

1. **Reloj puesto en la muñeca de un bombero con uniforme completo**, plano cerrado, luz dura lateral. Es la foto del hero móvil. Resuelve P0-03 con material auténtico.
2. **Punto de mando en el carro**: tablet o pantalla con el panel real, en contexto, con manos operándolo.
3. **Plano general de terreno**: personal desplegado, visto desde atrás o con rostros no identificables (evita cesiones de imagen).
4. **El appliance de campo**: el equipo real instalado, sin marcas de fabricante visibles si eso es sensible.
5. **Captura real del panel VIGÍA Command**, de una operación de prueba, con datos anonimizados. Reemplaza al mock dibujado en la sección principal.
6. Retrato del equipo, si se decide publicar Nosotros.

**Nota legal:** las fotos de personal de un Cuerpo de Bomberos requieren autorización institucional y de las personas retratadas. `REQUIERE DECISIÓN DE NEGOCIO`.

---

## 8. Componentes propuestos

Reemplazan a los 11 vivos y a los 16 huérfanos. Nomenclatura por carpetas, no un archivo de 373 líneas con 6 secciones dentro.

```
components/
  ui/
    Button.tsx           variantes: primary | secondary | ghost | link
    Tag.tsx              (existe, se conserva)
    Badge.tsx            (existe, se conserva)
    Field.tsx            label + input + error + aria-describedby
    Section.tsx          wrapper con variante de fondo y espaciado
    Container.tsx
    Reveal.tsx           encapsula IntersectionObserver, respeta reduced-motion
  layout/
    Header.tsx           CON menú móvil accesible          [corrige P0-01]
    MobileMenu.tsx       drawer con focus trap y Escape
    Footer.tsx           con link a /privacidad
    Breadcrumbs.tsx      + JSON-LD BreadcrumbList
  marketing/
    Hero.tsx             Server Component; solo el visual es cliente
    SystemFlow.tsx       las 3 capas: terreno, mando, post
    LiveDemo.tsx         UN mock, etiquetado como demostración  [corrige P1-01, P1-07]
    BlackBox.tsx         la caja negra como diferenciador
    Audiences.tsx        con links a /bomberos y /industria
    Limits.tsx           límites declarados                     [nuevo, credibilidad]
    CTABand.tsx
  contact/
    ContactForm.tsx      ver contact-form-spec.md
    ContactInfo.tsx      datos institucionales
```

**Regla arquitectónica:** los Server Components son el default. `'use client'` solo en `LiveDemo`, `MobileMenu`, `ContactForm` y `Reveal`. Hoy son 11 de 11 componentes cliente; el objetivo es 4.

---

## 9. Estrategia de animación

**Principio:** el movimiento explica el sistema o no existe.

| Se conserva | Se elimina |
|---|---|
| Reveal al entrar en viewport, una vez, 300ms | Tilt 3D por `pointermove` |
| Transiciones de hover y foco, 150-200ms | Las 7 capas de atmósfera animada |
| Flujo de datos animado en el diagrama del sistema (explica la arquitectura) | Radar barriendo, brasas, motas, niebla, scanline |
| Trazo EKG **solo cuando el mock está visible** | Los 7 `setInterval` permanentes |
| Pulso del indicador "en vivo" | Parpadeos infinitos de badges (`vg-blink`, `globals.css:161`) |

**Regla de implementación:** todo timer se registra vía un hook `useVisibleInterval(fn, ms, ref)` que se detiene con `IntersectionObserver` fuera de viewport, con `document.visibilityState === 'hidden'`, y no arranca bajo `prefers-reduced-motion`.

**Ampliar reduced-motion** para cubrir `html { scroll-behavior }` (P2-01) y los timers de JS.

---

## 10. Estrategia responsive

Breakpoints: `480 / 768 / 1024 / 1280 / 1536`.

| Zona | Móvil (menos de 768) | Tablet (768-1024) | Desktop |
|---|---|---|---|
| Header | Logo + hamburguesa accesible + "Ingresar" | Igual | Nav completo + CTA |
| Hero | H1 + sub + CTA + **foto real del reloj** | 1 columna, visual reducido | 2 columnas, escena completa |
| Demo en vivo | Tabla de 3 columnas: nombre, BPM, estado | 4 columnas | Completa |
| Bento del mando | Apilado, tarjetas prioritarias primero | 2 columnas | 4x3 |
| Formulario | 1 columna, teclados correctos por tipo | 1 columna | 2 columnas |
| Tipografía | Nunca bajo 12px fuera de mocks | | |

**Regla:** ningún contenido se resuelve con `display: none` en móvil. Si algo no cabe, se rediseña para móvil. Hoy `.vk-hero-visual` y `.vk-nav` se ocultan, que es rendirse, no adaptarse.

**Objetivos táctiles:** mínimo 44x44px. Hoy los links de nav a 0.88rem sin padding vertical no llegan.

---

## 11. Objetivos de rendimiento

| Métrica | Estado actual estimado | Objetivo |
|---|---|---|
| Peso de página | 2,90 MB | menos de 400 KB |
| Imágenes | 2,75 MB | menos de 150 KB |
| JS + CSS comprimido | 144 KB | menos de 120 KB |
| LCP (móvil 4G) | Comprometido por 2,75 MB de preload | menos de 2,5 s |
| INP | Comprometido por 7 timers | menos de 200 ms |
| CLS | Riesgo por `<img>` sin dimensiones | menos de 0,1 |
| Lighthouse Performance | sin medir | 90+ |
| Lighthouse Accessibility | fallará por contraste y links sin href | 95+ |

**Nota honesta:** los valores actuales no están medidos con Lighthouse porque no hubo navegador disponible. Deben medirse **antes** de empezar, para tener línea base real.

---

## 12. Orden de implementación

Cinco etapas. Cada una es desplegable de forma independiente y deja el sitio mejor que antes. La rama de trabajo es `website-v2`.

### Etapa 0 — Línea base y seguridad (medio día)

Sin cambios visuales. Existe para poder demostrar la mejora.

1. Crear rama `website-v2` desde `main` (`aa930ed`).
2. Lighthouse desktop y móvil sobre producción. Guardar en `docs/baseline-lighthouse.md`.
3. Añadir `typecheck` y `lint` a `package.json`, y GitHub Actions que los corra en PR.
4. Etiquetar `aa930ed` como `v1-final` para rollback trivial.

**Riesgo:** ninguno.

### Etapa 1 — Correcciones P0 sin rediseño (2 a 3 días)

Máximo retorno por unidad de esfuerzo. Toda la mejora medible ocurre aquí.

| # | Acción | Corrige | Archivos |
|---|---|---|---|
| 1.1 | Menú móvil accesible | P0-01 | `CommercialSections.tsx`, `globals.css:249` |
| 1.2 | `next/image` + AVIF + logo en SVG | P0-02 | `CommercialHero.tsx:223`, `next.config.mjs`, `public/images/` |
| 1.3 | Visual del hero visible en móvil | P0-03 | `globals.css:283` |
| 1.4 | `<a onClick>` a `<Link href>` o `<button>` | P0-04 | `CommercialSections.tsx:26,36`, `CommercialSections2.tsx:351-357` |
| 1.5 | Recalibrar `--muted` y `--faint`, introducir `--faint-deco` | P0-05 | `globals.css:17-19` |
| 1.6 | Honeypot real + rate limiting | P0-06 | `CommercialSections2.tsx:218`, `api/contact/route.ts` |
| 1.7 | Canonical + unificar dominio en www | P0-08 | `layout.tsx:32,37`, `sitemap.ts`, `robots.ts` |
| 1.8 | `og:image` 1200x630 | P0-09 | `layout.tsx`, `app/opengraph-image.tsx` |
| 1.9 | Etiquetar mocks como demostración | P1-01 | 3 componentes |
| 1.10 | Calibrar claims absolutos | P1-02 | copy |

**Riesgo:** bajo. Cambios acotados sobre estructura existente.
**Resultado esperado:** peso de página bajo 400 KB, Lighthouse Accessibility por sobre 90, previsualización social con marca, formulario protegido.

### Etapa 2 — Legal y captura de leads (2 días)

| # | Acción | Corrige |
|---|---|---|
| 2.1 | `/privacidad` con datos reales | P0-07 |
| 2.2 | Consentimiento en el formulario | P0-07 |
| 2.3 | Persistencia del lead más allá del correo | P1-12 |
| 2.4 | Eventos de analítica del funnel | P1-10 |
| 2.5 | `/gracias` + accesibilidad del formulario | P1-11 |

**Bloqueo:** 2.1 requiere razón social, RUT y domicilio. Sin eso, la página no se puede escribir sin inventar.

### Etapa 3 — Arquitectura y contenido (5 a 7 días)

| # | Acción |
|---|---|
| 3.1 | Migrar a Server Components; `'use client'` solo donde corresponda (P1-07) |
| 3.2 | Extraer `components/ui/` con la escala tipográfica y de espaciado |
| 3.3 | Crear `/solucion`, `/bomberos`, `/industria`, `/contacto` |
| 3.4 | Reescribir el hero según el H1 aprobado |
| 3.5 | Consolidar 3 mocks de dashboard en 1 |
| 3.6 | Sección de límites declarados |
| 3.7 | JSON-LD: Organization, WebSite, BreadcrumbList (P1-06) |
| 3.8 | Sitemap real con 5 URLs, sin fragmentos (P1-05) |
| 3.9 | 404 con marca (P1-18) |
| 3.10 | Borrar los 16 archivos huérfanos (P1-13) |
| 3.11 | Eliminar Tailwind o usarlo de verdad (P1-14) |

**Riesgo:** medio. Es la etapa donde se puede romper algo. Requiere revisión visual completa antes de mergear.

### Etapa 4 — Material real y pulido (depende de fotografía)

| # | Acción |
|---|---|
| 4.1 | Integrar fotografía real (sección 7.3) |
| 4.2 | Reemplazar el mock principal por captura real anonimizada |
| 4.3 | Evaluar subir a Next 16 y cerrar los 3 CVEs (P1-08) |
| 4.4 | Tests de smoke: build, rutas 200, formulario, metadata |
| 4.5 | Lighthouse final contra la línea base de la Etapa 0 |

**Bloqueo:** 4.1 y 4.2 dependen de producción de material y de autorizaciones.

---

## 13. Riesgos

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Subir a Next 16 rompe el build | Media | Alto | Etapa 4, aislada. Con `v1-final` etiquetado. Los 3 CVEs son de `postcss` en build, no explotables desde el sitio publicado |
| Cambiar el H1 desalinea la marca de otros materiales | Media | Medio | Decisión del usuario antes de la Etapa 3. Ver 1.3 |
| Sin datos societarios, `/privacidad` queda bloqueada | Alta | **Alto, legal** | Escalar hoy. Es el único bloqueo duro del plan |
| Sin fotografía real, la web sigue pareciendo un concepto | Alta | Alto | Etapa 4 separada; las etapas 1-3 no dependen de ella |
| Regresión visual al migrar a Server Components | Media | Medio | Etapa 3 con revisión visual por sección |
| Añadir páginas sin contenido suficiente | Media | Medio | 5 páginas, no 9. Cada una con contenido único justificado |
| El dominio canónico se decide al revés (ápice en vez de www) | Baja | Medio | Confirmar con el usuario antes de la Etapa 1.7. Lo que no se puede es la incoherencia actual |

---

## 14. Archivos que se tocan

Ordenados por probabilidad de modificación.

| Archivo | Etapa | Naturaleza |
|---|---|---|
| `app/globals.css` | 1, 3 | Tokens de contraste, escalas, borrar atmósfera. **El archivo de mayor riesgo: 875 líneas, un solo archivo, sin tests** |
| `components/CommercialSections.tsx` | 1, 3 | Menú móvil, links reales |
| `components/CommercialHero.tsx` | 1, 3 | `next/image`, quitar tilt, hero móvil |
| `components/CommercialSections2.tsx` | 1, 2, 3 | Formulario, footer, etiquetado de mocks |
| `app/layout.tsx` | 1 | canonical, `og:image`, `lang="es-CL"` |
| `app/sitemap.ts` | 1, 3 | www, sin fragmentos, 5 URLs |
| `app/robots.ts` | 1 | www |
| `app/api/contact/route.ts` | 1, 2 | Rate limiting, persistencia, campos nuevos |
| `next.config.mjs` | 1 | `images.formats`, redirects si aplica |
| `public/images/*` | 1 | Reoptimización |
| `package.json` | 0, 3 | Scripts, quitar Tailwind |
| `tailwind.config.ts`, `postcss.config.js` | 3 | Eliminar o activar |
| 16 archivos huérfanos | 3 | Borrar |
| `app/(marketing)/*` | 3 | Nuevo |
| `app/privacidad/page.tsx` | 2 | Nuevo |
| `.github/workflows/ci.yml` | 0 | Nuevo |

**Fuera de alcance, no se toca:** `~/vigia` completo, `mando.vigiacommand.cl`, DNS, proyecto Vercel `vigia-command-app`, Firebase, `apps/field-server`.

---

## 15. Decisiones que requieren al usuario antes de implementar

| # | Decisión | Bloquea |
|---|---|---|
| 1 | H1 y posicionamiento: opción A, B o C (sección 1.3) | Etapa 3 |
| 2 | Razón social, RUT y domicilio de VIGÍA | **Etapa 2, bloqueo legal duro** |
| 3 | Dominio canónico: www o ápice | Etapa 1.7 |
| 4 | Se publica FIBOM 2026 | Etapa 3 |
| 5 | Se mantiene "Respuesta en menos de 48 horas" | Etapa 1.10 |
| 6 | Se puede producir fotografía real y con qué autorizaciones | Etapa 4 |
| 7 | ¿Existe GA4 o Search Console ya configurado? | Etapa 2.4 |
| 8 | ¿Dónde deben quedar los leads además del correo? | Etapa 2.3 |
| 9 | Política sobre crawlers de IA (ver `seo-audit.md`) | Etapa 1.7 |
