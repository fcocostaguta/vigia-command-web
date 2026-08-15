# VIGÍA — Auditoría SEO

**Fecha:** 2026-08-15
**URL auditada:** `https://www.vigiacommand.cl` (commit `aa930ed`)
**Método:** análisis del HTML servido en producción, del código fuente, y de `robots.txt` / `sitemap.xml` en vivo.

**Limitación declarada:** sin acceso a Google Search Console, Bing Webmaster Tools, Semrush, Ahrefs, Screaming Frog ni GA4. Todo ítem que dependa de esas fuentes está marcado `REQUIERE ACCESO`. **No se ha inventado ningún volumen de búsqueda, CPC, ranking, ni dato de competencia.**

---

## 1. Estado actual, resumen

| Señal | Estado |
|---|---|
| URLs indexables | **1** (la home) |
| Contenido renderizado en el HTML del servidor | Sí, verificado |
| H1 | 1, correcto |
| H2 | 7, jerarquía coherente |
| Title | Presente, 47 caracteres |
| Meta description | Presente, 152 caracteres (longitud correcta), pero contiene "al cloud", término que el equipo eliminó del copy visible en `dfa3b85` |
| `<link rel="canonical">` | **Ausente** |
| Dominio canónico declarado vs servido | **Incoherente**: metadata dice ápice, sirve www |
| `og:image` | **Ausente** |
| JSON-LD | **0 bloques** |
| `sitemap.xml` | 3 entradas, 2 son fragmentos, todas apuntan al ápice que redirige |
| `robots.txt` | `Allow: /`, sitemap al ápice |
| HTTPS + HSTS | Correcto |
| `llms.txt` | No existe |
| Peso de imágenes | 2,75 MB, sin formatos modernos |
| Analítica | Vercel Analytics, solo pageviews |

**Diagnóstico en una línea:** el sitio está técnicamente sano en lo básico (HTTPS, SSR, H1 único) y descuidado en todo lo que comunica identidad a un motor de búsqueda (canonical, structured data, imagen social, sitemap útil, arquitectura de páginas).

---

## 2. Matriz del SEO Checklist 2026

Categorías: `YA IMPLEMENTADO` / `IMPLEMENTAR` / `MEJORAR` / `NO APLICA A VIGÍA` / `REQUIERE ACCESO` / `REQUIERE DECISIÓN DE NEGOCIO`.
Prioridad: P0 crítico, P1 importante, P2 mejora, `-` sin acción.

### 2.1 Pestaña "General Website"

| # | Requisito | Estado | Prio | Acción | Evidencia |
|---|---|---|---|---|---|
| 2 | Sitemap | MEJORAR | P1 | Reescribir con las 5 URLs reales en www, sin fragmentos. La ruta `/sitemap.xml` de Next es correcta; `sitemap_index.xml` es convención de Yoast/WordPress y no aplica | `app/sitemap.ts:14,20` |
| 3 | Image sitemap | NO APLICA | - | 3 imágenes en total. Un sitemap de imágenes es para catálogos y medios | `public/images/` |
| 4 | Rastreable e indexable + enviar sitemap a GSC y Bing | IMPLEMENTAR | P1 | El sitio es rastreable. Falta enviar el sitemap | `REQUIERE ACCESO` |
| 5 | `llms.txt` | REQUIERE DECISIÓN | P2 | Ver sección 5 | No existe |
| 6 | robots.txt menciona sitemap y `GPTBot Allow: /llms.txt` | MEJORAR | P1 | Sitemap sí, pero apunta al ápice. Lo de GPTBot depende de la decisión de sección 5 | `app/robots.ts:9` |
| 7 | robots.txt permite crawlers de IA y de búsqueda | REQUIERE DECISIÓN | P1 | Hoy `User-Agent: * / Allow: /` los permite a todos implícitamente. Ver sección 5 | `robots.txt` en vivo |
| 8 | Propiedad de GSC en HTTPS para usar disavow | IMPLEMENTAR | P1 | Crear propiedad de dominio (no de prefijo de URL), que cubre ápice y www | `REQUIERE ACCESO` |
| 9 | Mobile-friendly | **MEJORAR** | **P0** | Es responsive pero sin navegación móvil y el producto se oculta bajo 980px | `globals.css:249,283`, P0-01 y P0-03 |
| 10 | Carga rápida, PageSpeed | **MEJORAR** | **P0** | 2,75 MB de PNG, 95% del peso | P0-02 |
| 11 | Certificado SSL | YA IMPLEMENTADO | - | Vercel + HSTS `max-age=63072000` | Headers HTTP |
| 12 | Diseño moderno y actualizado | MEJORAR | P1 | El diseño DS-2 es sólido en desktop. Falla en móvil y en contraste | `website-v2-audit.md` |
| 13 | Sin interstitials agresivos | YA IMPLEMENTADO | - | No hay ninguno | Código |
| 14 | Páginas de confianza (Privacidad, Términos) | **IMPLEMENTAR** | **P0** | No existe ninguna, y sí se recolecta PII | P0-07 |
| 15 | Bios de autor detalladas | NO APLICA | - | No hay blog ni contenido firmado. Aplicaría si se publica contenido editorial | — |
| 16 | Páginas con backlinks y sin tráfico | REQUIERE ACCESO | - | Solo hay 1 página | `REQUIERE ACCESO` |
| 17 | 404 con backlinks | REQUIERE ACCESO | - | Sin historial de URLs previas conocido | `REQUIERE ACCESO` |
| 18 | Páginas correctas desindexadas | YA IMPLEMENTADO | - | `/test-b` y `/test-hero` ya tienen `robots: {index:false}` | `app/test-b/page.tsx:7` |
| 19 | Contenido delgado | MEJORAR | P1 | La home tiene poco texto real para su extensión visual. Las páginas nuevas deben nacer con contenido suficiente, no como relleno | Copy actual |
| 20 | Contenido desactualizado | NO APLICA | - | El sitio es de 2026 | `git log` |
| 21 | GA4 conectado, engagement rate | REQUIERE ACCESO | P1 | No hay GA4 en el HTML. Decidir si se instala | HTML de producción |
| 22 | Un title y un H1 por página | YA IMPLEMENTADO | - | 1 H1, 1 title | HTML de producción |
| 23 | Errores de ortografía y gramática | YA IMPLEMENTADO | - | Revisión manual del copy: correcto, acentuación consistente | Componentes |
| 24 | Profundidad de rastreo menor a 3 clics | YA IMPLEMENTADO | - | Todo está a 1 clic. Se mantiene con las 5 páginas propuestas | — |
| 25 | Cobertura de enlaces internos, mínimo 5 | **IMPLEMENTAR** | P1 | Hoy **cero enlaces internos reales**: todos son `<a onClick>` sin `href` | P0-04 |
| 26 | Anchor text único por página | IMPLEMENTAR | P1 | Se resuelve con la arquitectura de 5 páginas | `website-v2-plan.md` §2.3 |
| 27 | Enlazado desde las páginas más potentes | NO APLICA todavía | P2 | Con 1 página no hay estructura de autoridad. Reevaluar tras la Etapa 3 | — |
| 28 | Cadenas de redirección | MEJORAR | P1 | Existe una cadena real: `http://ápice` 308 a `https://ápice` 307 a `https://www`. Dos saltos. Se resuelve declarando www como canónico | Headers HTTP |
| 29 | Contenido duplicado | NO APLICA | - | Una sola página | — |
| 30 | Enlaces rotos | YA IMPLEMENTADO | - | No hay enlaces rotos. El problema opuesto: casi no hay enlaces | — |
| 31 | Contenido generado por IA | NO APLICA | - | Copy escrito y revisado manualmente, con registro en `docs/COMMERCIAL_WEB_FINAL_RELEASE.md` | — |
| 32 | Canónicas correctas | **IMPLEMENTAR** | **P0** | No existe ninguna etiqueta canonical | P0-08 |
| 33 | Redirección de la versión no preferida www/no-www | MEJORAR | **P0** | La redirección HTTP funciona hacia www, pero **todo el metadata declara el ápice**. La incoherencia es el problema | P0-08 |
| 34 | HTTP redirige a HTTPS en todo el sitio | YA IMPLEMENTADO | - | 308 verificado | Headers HTTP |
| 35 | Hreflang | NO APLICA | - | Un idioma, un mercado. Reevaluar solo si se abre operación fuera de Chile | `layout.tsx:62` |
| 36 | Sitemap o plugin de WordPress | NO APLICA | - | No es WordPress | — |
| 37 | Backlinks tóxicos, disavow | REQUIERE ACCESO | - | Sin GSC no hay perfil de enlaces | `REQUIERE ACCESO` |
| 38 | Todo el tracking vía GTM | REQUIERE DECISIÓN | P2 | Hoy solo Vercel Analytics, directo. GTM añade ~30 KB y una capa de complejidad. **Recomendación: no instalarlo** salvo que exista equipo de marketing que necesite autonomía | `layout.tsx:67` |
| 39 | Canibalización de keywords | NO APLICA todavía | P1 | Con 1 página es imposible. Vigilar al crear `/bomberos` e `/industria`, que sí pueden competir entre sí | — |
| 40 | Desindexar paginadores y tags | NO APLICA | - | No hay paginación ni taxonomías | — |
| 41 | Breadcrumbs | IMPLEMENTAR | P2 | Con 5 páginas tiene sentido. Visibles + `BreadcrumbList` | Etapa 3 |
| 42 | Verificar structured data JSON-LD | **IMPLEMENTAR** | P1 | 0 bloques en producción | Sección 4 |

### 2.2 Pestañas "On page SEO" y "Essential On page SEO"

Las dos pestañas se solapan casi por completo. Se evalúan juntas contra la única página existente, la home.

**Bloque de fundamentos**

| Requisito | Estado | Prio | Acción |
|---|---|---|---|
| KW principal mencionada al menos una vez | MEJORAR | P1 | Ninguna keyword del mercado real ("monitoreo de personal", "bomberos", "brigadas") aparece en el H1. El H1 es una metáfora: "Caja Negra Operacional para Emergencias" |
| Un solo H1 y un solo Title | YA IMPLEMENTADO | - | Verificado |
| H1 above the fold | YA IMPLEMENTADO | - | Primer elemento del hero |
| Jerarquía de encabezados correcta | YA IMPLEMENTADO | - | H1 y 7 H2. Sin saltos |
| KW en la URL | NO APLICA a `/` | P1 | Aplica a las 4 páginas nuevas: `/solucion`, `/bomberos`, `/industria`, `/contacto`. Sin números, sin stop words. Correcto por diseño |
| KW en el Title | MEJORAR | P1 | Title actual: "VIGÍA — Caja Negra Operacional para Emergencias". No contiene el término que alguien buscaría |
| KW en la Meta Description | MEJORAR | P1 | Contiene "bomberos", "brigadas", "monitoreo", y mide 152 caracteres, que es correcto. **El problema es de coherencia: dice "sincronización automática al cloud", y "cloud" es exactamente el vocabulario que el equipo eliminó del copy visible en el commit `dfa3b85`.** La meta quedó fuera de esa depuración |
| KW en el H1 | MEJORAR | P1 | Ver `website-v2-plan.md` §1.3 |
| H1 distinto del Title | **MEJORAR** | P1 | Hoy son prácticamente idénticos |
| KW en nombre y alt de la imagen hero | MEJORAR | P2 | `watch-vigia.png` es un nombre aceptable. El alt es bueno: "VIGÍA — dispositivo de monitoreo táctico" |
| KW en la primera frase | MEJORAR | P1 | La primera frase es "Monitoreo offline. Registro inmutable. Sincronización automática." Tres características sin sujeto |
| Sinónimo en el primer H2 | YA IMPLEMENTADO | - | "Del sensor al mando, en segundos." |
| Intención de búsqueda resuelta cuanto antes | **MEJORAR** | **P1** | Hay que leer hasta la línea micro del hero para saber para quién es |

**Bloque de calidad de contenido**

| Requisito | Estado | Prio | Nota |
|---|---|---|---|
| Semrush Writing Assistant > 9 | REQUIERE ACCESO | - | Sin licencia |
| Grammarly 90+ / sin errores rojos | NO APLICA tal cual | - | Herramienta de inglés. El equivalente en español es revisión editorial humana, ya hecha |
| Hemingway | NO APLICA | - | Herramienta de inglés |
| Originality.Ai 50% original | NO APLICA | - | Contenido escrito manualmente |
| CopyScape / Siteliner | NO APLICA todavía | P2 | Con 1 página no hay duplicación interna posible. Reevaluar con 5 páginas |
| Seosurfer / rankability +71 a 90 | REQUIERE ACCESO | - | Sin licencia |
| Word count suficiente | MEJORAR | P1 | La home tiene mucha superficie visual y poco texto. Las páginas nuevas deben nacer con cuerpo real |
| Contenido actualizado | YA IMPLEMENTADO | - | 2026 |
| FAQs de la KW principal, primeras 4 | REQUIERE DECISIÓN | P2 | Solo si hay preguntas reales que responder. **No inventar FAQs para conseguir el schema.** Ver sección 4 |
| Párrafos de menos de 3 o 4 líneas | YA IMPLEMENTADO | - | El copy es corto por diseño |
| Imágenes y video de alta calidad y únicos | **MEJORAR** | P1 | Solo 2 imágenes, ninguna fotografía real. Ver `website-v2-plan.md` §7.3 |
| Imágenes optimizadas | **MEJORAR** | **P0** | 2,75 MB en PNG sin `next/image` |
| Nombres de archivo y alt descriptivos | YA IMPLEMENTADO | - | Nombres correctos. `CommercialHero.tsx:63` usa `alt=""` en el logo decorativo, que es lo correcto |
| Contenido por un experto (SME) y visible | REQUIERE DECISIÓN | P2 | Aplicaría si se publica contenido técnico firmado |
| Página de autor dedicada | NO APLICA | - | Sin blog |
| Perspectiva en primera persona | NO APLICA | - | Es una web de producto B2B, no editorial |
| Contenido útil, original, preciso, seguro | MEJORAR | P1 | El punto débil es "preciso": ver P1-02, claims absolutos |

**Bloque de estructura y enlazado**

| Requisito | Estado | Prio | Nota |
|---|---|---|---|
| Schema markup correcto | **IMPLEMENTAR** | P1 | Sección 4 |
| Sin canibalización | NO APLICA todavía | P1 | Vigilar `/bomberos` vs `/industria` |
| 5+ enlaces internos únicos | **IMPLEMENTAR** | P1 | Hoy 0 enlaces internos con `href` |
| Anchor text interno optimizado | IMPLEMENTAR | P1 | Etapa 3 |
| Menos de 3 clics de profundidad | YA IMPLEMENTADO | - | |
| Enlaza a página pilar y a transaccional | IMPLEMENTAR | P1 | Pilar = `/solucion`, transaccional = `/contacto` |
| Enlaces distribuidos uniformemente | IMPLEMENTAR | P2 | Etapa 3 |
| Sin páginas huérfanas | YA IMPLEMENTADO | - | Mantener al crear las nuevas |
| 5 activos de apoyo (topic cluster) | NO APLICA todavía | P2 | Un cluster requiere contenido que hoy no existe. **No fabricar páginas para llegar a 5** |
| CTA claro | MEJORAR | P1 | Existe, pero con 5 nombres distintos (P1-03) |
| Página compartible | **MEJORAR** | **P0** | Sin `og:image`, compartirla no comunica nada (P0-09) |
| Enviar a GSC y Bing Webmaster | IMPLEMENTAR | P1 | `REQUIERE ACCESO` |
| Escribir los backlinks y dominios de referencia necesarios | REQUIERE DECISIÓN | P2 | Es una tarea de estrategia off-page, fuera del alcance de este trabajo |
| Domain Rating de competidores | REQUIERE ACCESO | - | Sin Ahrefs |
| Ahrefs Internal Link Tool | REQUIERE ACCESO | - | Sin licencia |
| Mouseflow / heatmaps | REQUIERE DECISIÓN | P2 | Solo tiene sentido con tráfico. **No instalar hoy**: añade JS de terceros y riesgo de privacidad, para medir un tráfico que aún no existe |
| Indexada en GSC y Bing | REQUIERE ACCESO | - | |
| Hreflang | NO APLICA | - | Un mercado |
| Análisis de keywords por país | NO APLICA todavía | - | Solo Chile |

### 2.3 Pestaña "Google My Business / Local SEO"

**Veredicto global: NO APLICA A VIGÍA, con dos excepciones.**

Razón: el SEO local existe para negocios donde el usuario busca un proveedor **cerca de su ubicación física** y acude a un local: clínicas, restaurantes, talleres, comercio. VIGÍA vende tecnología operacional B2B a instituciones, mediante un ciclo de venta consultivo. Ningún Comandante de Bomberos va a buscar "monitoreo de personal cerca de mí" ni va a ir a una oficina de VIGÍA.

Aplicar esta pestaña completa produciría exactamente lo que el brief prohíbe: landings por ciudad, NAP repetido artificialmente, perfiles en directorios irrelevantes y stuffing geográfico. Además varias filas exigen datos que no existen (dirección física publicable, horario de atención, fotos de interior y exterior del local) y llevarían a inventarlos.

| Bloque | Filas | Veredicto | Motivo |
|---|---|---|---|
| Heat Map en SEMrush | 2 | NO APLICA | Mide ranking local en cuadrícula geográfica. Sin sentido sin negocio local |
| 1. Configuración básica del perfil | 4-11 | NO APLICA, salvo 10 | Categorías de negocio, horarios, ofertas anuales, keyword en el nombre. Nada de eso corresponde |
| 10. NAP consistente | 10 | **EXCEPCIÓN, IMPLEMENTAR P1** | Nombre, dirección y teléfono consistentes es buena práctica **corporativa**, no local. Hoy el sitio solo publica un email. Ver sección 6 |
| 2. Optimización visual del perfil | 13-18 | NO APLICA | Fotos de local, geotagging de fotos, video de 30 s para GBP |
| 3. Estrategia de keywords y contenido en GBP | 20-26 | NO APLICA | Atributos de negocio, áreas de servicio, posts cada 6 meses, reseñas |
| 4. Integración GMB | 28-34 | NO APLICA | Coworking con nombre de ciudad, botón "Visita nuestro Perfil de Empresa", mapa bajo el NAP, UTM en Google Posts |
| 5. Estrategia multi-ciudad | 37-42 | **NO APLICA, explícitamente contraindicado** | Landing por ciudad con dirección propia y mapa embebido. Es la definición de doorway page para un negocio sin sedes |
| 6. Mejoras de SEO local | 44-48 | NO APLICA, salvo 46 | Schema `LocalBusiness`, herramientas de citaciones, auditoría de NAP |
| 46. Señales de confianza (certificaciones, testimonios, contacto claro, formulario fácil) | 46 | **EXCEPCIÓN, IMPLEMENTAR P1** | Esto no es SEO local, es credibilidad B2B. Es válido y es justamente lo que falta (P1-17) |
| 7. Listados adicionales | 50-54 | NO APLICA | Bing Places, Apple Maps, Yelp, Yahoo Local. Ninguno tiene audiencia B2B institucional en Chile. **Excepción a evaluar aparte: LinkedIn Company Page**, que la checklist no menciona y es el único directorio realmente relevante para este negocio |
| 8. Engagement con clientes | 56-58 | NO APLICA | Reseñas, seguimiento automatizado, CTAs de "Agendar consulta en NYC" |
| 9. Optimización móvil | 60-63 | Parcial | Teléfono clickeable (`tel:`) sí es buena práctica: **IMPLEMENTAR P2** si se publica teléfono. Lenguaje conversacional para búsqueda por voz y reseñas por SMS: NO APLICA |
| 35. Denunciar a la competencia por keyword stuffing en su ficha | 35 | **NO APLICA, y se desaconseja** | Denunciar competidores no es una estrategia de posicionamiento y no corresponde al posicionamiento institucional de VIGÍA |

**Excepción a evaluar por separado:** si VIGÍA tiene un domicilio comercial real y publicable en Chile, sí conviene crear **un** Google Business Profile, con **una** ubicación, sin keyword stuffing en el nombre. Sirve para el panel de conocimiento de marca al buscar "VIGÍA Command", no para posicionamiento local. `REQUIERE DECISIÓN DE NEGOCIO` y `REQUIERE INFORMACIÓN` (domicilio).

---

## 3. Estrategia de keywords

> **DATOS DE KEYWORDS PENDIENTES DE VALIDACIÓN.** No hay acceso a Search Console, Semrush ni Ahrefs. Lo siguiente son hipótesis de intención basadas en el vocabulario del sector y del producto. **No se afirma volumen, dificultad, CPC ni ranking de nadie.**

### 3.1 Observación estructural

El mercado de VIGÍA en Chile es reducido y muy concentrado: cuerpos de bomberos, brigadas industriales, mineras y equipos de respuesta. El número de compradores potenciales se cuenta en cientos, no en cientos de miles.

**Consecuencia estratégica:** el SEO no va a ser el canal principal de adquisición de VIGÍA, y planificarlo como si lo fuera sería un error de asignación de esfuerzo. El rol realista de la búsqueda aquí es distinto y sigue siendo valioso:

1. **Búsqueda de marca.** Alguien conoce VIGÍA en FIBOM o por un colega, y busca "VIGÍA Command" o "vigiacommand". Debe encontrar una web que lo convierta. **Es el caso de uso número uno.**
2. **Validación.** Un comité evalúa proveedores y busca el nombre para verificar que la empresa existe. Aquí pesan más el structured data, la política de privacidad y los datos institucionales que cualquier keyword.
3. **Descubrimiento de cola larga.** Un prevencionista busca una solución a un problema concreto. Volumen bajo, intención altísima.
4. **Respuestas de LLMs.** Cada vez más evaluación de proveedores empieza en ChatGPT o Perplexity. Esto conecta con la sección 5.

### 3.2 Mapa de intención propuesto

| Página | Intención | Términos hipotéticos | Prioridad |
|---|---|---|---|
| `/` | Navegacional de marca | VIGÍA Command, vigiacommand, VIGÍA bomberos | **Alta.** Es el caso real |
| `/solucion` | Informacional | monitoreo de personal en emergencias, sistema de monitoreo para equipos de emergencia, seguimiento de signos vitales en terreno | Media |
| `/bomberos` | Comercial | tecnología para bomberos Chile, monitoreo de bomberos en emergencia, seguridad del personal bomberil | Media |
| `/industria` | Comercial | monitoreo de brigadas industriales, seguridad de personal en faena, monitoreo de trabajadores en espacios confinados | Media |
| `/contacto` | Transaccional | demo VIGÍA, contacto VIGÍA Command | Baja en volumen, alta en valor |

### 3.3 Cómo validar sin inventar

1. Crear la propiedad de dominio en Search Console. **Es el paso número uno y desbloquea todo lo demás.**
2. Esperar de 4 a 8 semanas de datos de impresiones.
3. Leer qué consultas traen impresiones reales, no las que suponemos.
4. Recién entonces ajustar títulos y copy.

**Regla vinculante:** redactar para el Comandante, no para el algoritmo. Si una frase mejora el ranking y empeora la comprensión del comandante, no se escribe.

---

## 4. Structured data

Ninguno de los 4 esquemas propuestos describe algo que no sea verdadero y visible en la página.

### 4.1 Implementar

| Esquema | Dónde | Contenido | Bloqueo |
|---|---|---|---|
| `Organization` | Global, en el layout | `name`, `url`, `logo`, `email`, `description`, `sameAs` (LinkedIn) | `REQUIERE INFORMACIÓN`: razón social, dirección, teléfono |
| `WebSite` | Global | `name`, `url`, `inLanguage: es-CL` | Ninguno |
| `BreadcrumbList` | Las 4 páginas internas | Ruta real | Depende de los breadcrumbs visibles |
| `WebPage` | Por página | `name`, `description`, `isPartOf` | Ninguno |

### 4.2 Evaluar con cuidado

**`SoftwareApplication` o `Product`:** VIGÍA no es solo software, es un sistema con hardware, gateway y plataforma. Forzar `SoftwareApplication` describiría mal el producto. `Product` exige normalmente `offers` con precio, que no se publica. **Recomendación: no implementar hasta que exista una página de producto con especificaciones concretas.**

**`FAQPage`:** solo si se escriben FAQs porque hay preguntas reales que los prospectos hacen, y las respuestas aparecen visibles en la página. Además, Google redujo drásticamente la visibilidad de rich results de FAQ para sitios que no son gubernamentales ni sanitarios, así que el beneficio es hoy marginal. **No escribir FAQs para conseguir el schema.**

### 4.3 Prohibido

- `AggregateRating`, `Review`, estrellas: no hay reseñas. Inventarlas es fraudulento y sancionable.
- `LocalBusiness`: ver sección 2.3.
- Cualquier `award`, `certification` o `memberOf` sin respaldo documental.

---

## 5. Crawlers de IA y `llms.txt`

### 5.1 Estado actual, verificado

`robots.txt` en producción:
```
User-Agent: *
Allow: /
Sitemap: https://vigiacommand.cl/sitemap.xml
```

Con `User-Agent: *` y `Allow: /`, **hoy todos los crawlers de IA ya están permitidos**: GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, CCBot y cualquier otro. No hay `llms.txt`.

Esto es un estado por omisión, no una decisión tomada.

### 5.2 Qué está en juego

La checklist trata esto como una tarea SEO. No lo es: **es una decisión de distribución y de propiedad intelectual** que corresponde a VIGÍA, no a quien implementa la web.

| Escenario | A favor | En contra |
|---|---|---|
| **Permitir todo** (estado actual) | Cuando un prevencionista pregunta a ChatGPT "qué opciones hay para monitorear personal en emergencias en Chile", VIGÍA puede aparecer. Para una empresa que necesita ser descubierta, esto es más valioso que el tráfico que pierde | Su contenido entrena e informa modelos sin atribución garantizada ni tráfico de vuelta |
| **Bloquear entrenamiento, permitir búsqueda** | Distingue `GPTBot` y `CCBot` (entrenamiento) de `OAI-SearchBot`, `ChatGPT-User` y `PerplexityBot` (búsqueda con cita y link). Conserva visibilidad, reduce uso para entrenamiento | Postura intermedia, requiere mantener la lista actualizada |
| **Bloquear todo** | Control máximo | Desaparece de un canal de descubrimiento en crecimiento. **Para una empresa en etapa de darse a conocer, es probablemente la peor opción** |

### 5.3 Recomendación

**Permitir explícitamente** en vez de por omisión, y documentar la decisión. Un `robots.txt` que nombra a cada agente es una decisión; uno con `Allow: /` es un descuido que parece decisión.

Sobre `llms.txt`: es una propuesta emergente, sin adopción confirmada por los principales proveedores. Cuesta 30 minutos, no hace daño y podría ayudar. **Prioridad P2, no P0.** Contenido honesto: qué es VIGÍA, para quién, qué hace y qué no hace, y a dónde escribir.

`REQUIERE DECISIÓN DE NEGOCIO.`

---

## 6. SEO técnico: acciones concretas

Ordenadas por impacto sobre esfuerzo.

| # | Acción | Prio | Archivo |
|---|---|---|---|
| 1 | Unificar dominio en `https://www.vigiacommand.cl` en `metadataBase`, `og:url`, `sitemap.ts` y `robots.ts` | **P0** | `layout.tsx:32,37`, `sitemap.ts`, `robots.ts` |
| 2 | Añadir `alternates.canonical` por página | **P0** | `layout.tsx` y cada `page.tsx` |
| 3 | Crear `app/opengraph-image.tsx` (1200x630) y declarar `twitter:image` | **P0** | Nuevo |
| 4 | `next/image` con AVIF y WebP; logo a SVG | **P0** | `next.config.mjs`, `CommercialHero.tsx:223` |
| 5 | Sitemap real: 5 URLs, sin fragmentos, en www | P1 | `sitemap.ts` |
| 6 | JSON-LD `Organization` + `WebSite` | P1 | `layout.tsx` |
| 7 | Enlaces internos reales con `<Link href>` | P1 | `CommercialSections.tsx:26,36`, `CommercialSections2.tsx:351-357` |
| 8 | Reescribir la meta description: quitar "al cloud" para alinearla con la depuración de vocabulario de `dfa3b85` | P1 | `layout.tsx:31` |
| 9 | Diferenciar H1 de Title | P1 | Hero + metadata |
| 10 | Crear propiedad de dominio en GSC y en Bing Webmaster; enviar sitemap | P1 | `REQUIERE ACCESO` |
| 11 | 404 con marca y links de retorno | P1 | `app/not-found.tsx` |
| 12 | `lang="es-CL"` | P2 | `layout.tsx:62` |
| 13 | `manifest.webmanifest`, `theme-color`, apple-touch-icon en PNG 180x180 | P2 | `app/` |
| 14 | Breadcrumbs + `BreadcrumbList` | P2 | Etapa 3 |
| 15 | `llms.txt`, según decisión de sección 5 | P2 | `app/llms.txt/route.ts` |

**Ya correcto, no tocar:** HTTPS, HSTS, 308 de HTTP a HTTPS, HTML semántico, SSR del contenido, H1 único, `robots` noindex en las rutas de experimento, alt del logo decorativo vacío.

---

## 7. Datos institucionales requeridos

Sin estos datos no se pueden completar `Organization`, la política de privacidad ni el bloque de contacto. Todos están marcados `REQUIERE INFORMACIÓN`.

| Dato | Uso |
|---|---|
| Razón social completa | `Organization.legalName`, política de privacidad |
| RUT | Política de privacidad, footer |
| Domicilio comercial y si es publicable | `Organization.address`, decisión sobre Google Business Profile |
| Teléfono de contacto comercial | `Organization.telephone`, `tel:` en móvil |
| URL de LinkedIn de la empresa | `Organization.sameAs`. En `git log` consta `vigia-command` como URL confirmada, pendiente de reverificar |
| Correo del responsable de datos personales | Política de privacidad, obligación legal |
| Fecha de constitución | Opcional, `foundingDate` |
