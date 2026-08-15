# VIGÍA — Especificación del formulario de contacto

**Fecha:** 2026-08-15
**Estado actual auditado:** `components/CommercialSections2.tsx:199-330` (frontend), `app/api/contact/route.ts` (backend)
**Estado:** propuesta. Nada implementado.

---

## 1. Objetivo

El formulario **no existe para recibir mensajes**. Existe para producir un lead que permita decidir tres cosas antes de la primera llamada:

1. **Si vale la pena hablar.** Distinguir a un Comandante de un Cuerpo de Bomberos de un estudiante haciendo una tarea.
2. **De qué hablar.** Bomberos e industria tienen vocabularios, riesgos y ciclos de compra distintos.
3. **Con qué urgencia.** No es lo mismo "estoy explorando" que "tengo presupuesto asignado para este año".

Restricción permanente: **cada campo agregado reduce la conversión.** El diseño correcto es el mínimo conjunto de campos que permite responder esas tres preguntas.

---

## 2. Estado actual

### 2.1 Campos actuales

| Campo | Tipo | Requerido | Validación cliente | Validación servidor |
|---|---|---|---|---|
| `nombre` | text | Sí | `required` HTML | No vacío, máx 120 |
| `cargo` | text | No | — | Máx 120 |
| `org` | text | Sí | `required` HTML | No vacío, máx 200 |
| `email` | email | Sí | `required` + `type="email"` | No vacío, regex, máx 254 |
| `tel` | text | No | — | Máx 30 |
| `operadores` | select, 4 rangos | No | — | Máx 20 |
| `mensaje` | textarea | No | — | Máx 2000 |
| `_hp` | **no se renderiza** | — | — | Comprobado pero inalcanzable |

### 2.2 Qué está bien

- El conjunto de campos es razonable: 3 requeridos y 4 opcionales es un equilibrio defendible.
- El backend escapa HTML antes de interpolarlo en el correo (`route.ts:100-107`).
- Limita longitudes por campo (`route.ts:4-12`).
- Elimina saltos de línea del asunto, previniendo inyección de cabeceras de correo (`route.ts:56-57`).
- Usa `replyTo: email`, de modo que responder en el cliente de correo va directo al prospecto.
- Tiene estados de carga y de error, y deshabilita los campos mientras envía.
- Usa `<label>` envolvente, que asocia correctamente etiqueta y control sin necesidad de `id`.

### 2.3 Problemas

| # | Problema | Severidad | Evidencia |
|---|---|---|---|
| F-01 | **El honeypot no funciona.** El campo `_hp` nunca se renderiza; el cliente lo envía hardcodeado como `''`. La comprobación de `route.ts:29` es inalcanzable | **P0** | `CommercialSections2.tsx:218` |
| F-02 | **Sin rate limiting.** Endpoint público que dispara correo, sin límite por IP ni por sesión | **P0** | `route.ts` completo |
| F-03 | **Sin política de privacidad ni consentimiento**, recolectando nombre, cargo, organización, correo y teléfono | **P0** | No existe la ruta |
| F-04 | **El lead solo existe como correo.** Sin base de datos, sin CRM, sin respaldo. Si Resend falla, cae en spam o alguien borra el mensaje, el lead se pierde sin rastro y sin forma de saberlo | **P1** | `route.ts:60-95` |
| F-05 | **Cero eventos de analítica.** No se mide apertura, abandono, campo de fricción, envío ni error | **P1** | `layout.tsx:67` |
| F-06 | Errores sin `role="alert"` ni `aria-live`: un lector de pantalla no anuncia el fallo | **P1** | `CommercialSections2.tsx:310-312` |
| F-07 | Sin `autoComplete` en ningún campo. El autocompletado del navegador no funciona | **P1** | `:275-308` |
| F-08 | Validación solo global y solo en submit. Sin estado de error por campo | **P1** | `:204-236` |
| F-09 | Sin `inputMode="tel"` en teléfono: en móvil sale el teclado alfabético | **P1** | `:293` |
| F-10 | **No se captura la intención.** No se pregunta qué busca ni qué tipo de organización es. Sin eso, el vendedor llama a ciegas | **P1** | Campos actuales |
| F-11 | Lectura de valores por `f.elements.namedItem()` con casts, en vez de `FormData` o estado controlado | **P2** | `:209` |
| F-12 | El servidor hace `trim()` para validar requeridos pero envía el valor sin trim al correo | **P2** | `route.ts:35` vs `:72` |
| F-13 | "Enviar otro mensaje" reabre el formulario vacío. Patrón de formulario de contacto genérico, no de lead B2B | **P2** | `:260-266` |
| F-14 | El estado de éxito ocurre sin cambiar de URL. No hay página de gracias que medir ni compartir | **P2** | `:255` |
| F-15 | "Respuesta en menos de 48 horas" aparece 3 veces. Si nadie la garantiza, es una promesa incumplible | **P1** | `:247`, `:259`, `:321` |
| F-16 | Correo `from` por defecto en `noreply@vigiacommand.cl` sin verificación documentada del dominio en Resend. Si el dominio no está verificado, los envíos fallan o van a spam | **P1** | `route.ts:53` |

---

## 3. Estructura propuesta

### 3.1 Decisión de formato

Evaluadas cuatro opciones:

| Opción | Veredicto |
|---|---|
| Formulario corto de 3 campos | Convierte más, pero no permite calificar. El vendedor llama a ciegas |
| **Un paso, 6 campos, dos de ellos por botones** | **Elegida.** Ver justificación |
| Step form de 3 pasos | Añade fricción de navegación en móvil y complejidad de estado. Se justifica desde ~10 campos |
| Formulario progresivo con campos condicionales | Se incorpora, pero como un único campo condicional, no como sistema completo |

**Justificación:** el segmento no es tráfico frío de alto volumen. Quien llega a este formulario ya vio el producto y decidió invertir tiempo. Está dispuesto a dar 6 datos. Lo que no tolera es una pantalla que parezca un trámite. La solución es que **dos de los campos más valiosos no se escriban, se toquen**: selección por botones, que en móvil es más rápida que un `select` nativo y produce datos estructurados en vez de texto libre.

### 3.2 Campos

**Bloque 1: quién eres** (3 campos)

| Campo | Tipo | Req. | `autoComplete` | Nota |
|---|---|---|---|---|
| `nombre` | text | **Sí** | `name` | Placeholder: "Nombre y apellido" |
| `organizacion` | text | **Sí** | `organization` | "Cuerpo de Bomberos, empresa o institución" |
| `cargo` | text | No | `organization-title` | "Comandante, Jefe de Brigada, Prevencionista..." |

`cargo` se mantiene opcional a propósito: es muy útil comercialmente, pero exigirlo excluye a quien investiga en nombre de otro.

**Bloque 2: qué buscas** (2 campos, por botones)

| Campo | Control | Req. | Opciones |
|---|---|---|---|
| `tipoOrganizacion` | 4 botones, selección única | **Sí** | Cuerpo de Bomberos / Brigada industrial / Equipo de respuesta / Otro |
| `objetivo` | 4 botones, selección única | **Sí** | Conocer VIGÍA / Solicitar demostración / Evaluar un piloto / Evaluar implementación |

Estos dos campos son el corazón de la calificación y **no existen hoy**. Resuelven F-10.

**Bloque 3: cómo te contactamos** (2 campos)

| Campo | Tipo | Req. | `autoComplete` | Nota |
|---|---|---|---|---|
| `email` | email | **Sí** | `email`, `inputMode="email"` | "Correo institucional" |
| `telefono` | tel | No | `tel`, `inputMode="tel"` | "+56 9 XXXX XXXX". Resuelve F-09 |

**Bloque 4: contexto** (2 campos, uno condicional)

| Campo | Tipo | Req. | Condición |
|---|---|---|---|
| `dotacion` | select, 4 rangos | No | **Se muestra solo si `objetivo` es "piloto" o "implementación"** |
| `mensaje` | textarea | No | Siempre. "¿Qué te gustaría resolver?" |

`dotacion` es la única lógica condicional. Justificación: a quien solo quiere conocer VIGÍA, preguntarle cuánta gente tiene es prematuro y agrega fricción sin retorno. A quien evalúa un piloto, es el dato que define la conversación.

**Bloque 5: consentimiento** (obligatorio legalmente)

| Campo | Tipo | Req. |
|---|---|---|
| `consentimiento` | checkbox, sin marcar por defecto | **Sí** |

Texto: *"Autorizo a VIGÍA a contactarme y a tratar mis datos según la [Política de Privacidad]."* Resuelve F-03. **No puede venir premarcado.**

**Campo antispam**

| Campo | Tipo |
|---|---|
| `_hp` | input real, oculto con CSS (no `type="hidden"`, no `display:none`), `tabIndex={-1}`, `autoComplete="off"`, `aria-hidden="true"` |

Resuelve F-01. Un `type="hidden"` no engaña a un bot: hay que renderizar un campo que parezca real y esté fuera de la vista.

### 3.3 Resumen

- **Requeridos: 5** (nombre, organización, tipo, objetivo, email) + consentimiento.
- **Opcionales: 4** (cargo, teléfono, dotación condicional, mensaje).
- **Visibles al cargar: 8 controles**, de los cuales 2 son grupos de botones.
- Comparado con hoy: +2 campos requeridos, pero los dos son de un toque, y a cambio se obtiene calificación real.

---

## 4. Validación

### 4.1 Cliente

| Campo | Regla | Mensaje |
|---|---|---|
| `nombre` | No vacío tras trim, 2-120 | "Indícanos tu nombre" |
| `organizacion` | No vacío tras trim, 2-200 | "Indícanos tu organización" |
| `tipoOrganizacion` | Una opción seleccionada | "Selecciona el tipo de organización" |
| `objetivo` | Una opción seleccionada | "Selecciona qué te interesa" |
| `email` | Formato válido, máx 254 | "Revisa el formato del correo" |
| `telefono` | Si tiene valor: 8-20 caracteres, solo dígitos, espacios, `+`, `-`, `()` | "Revisa el número" |
| `mensaje` | Máx 2000 | "El mensaje es demasiado largo" |
| `consentimiento` | Marcado | "Necesitamos tu autorización para contactarte" |

**Momento:** validar en `blur` la primera vez, y en `change` una vez que el campo ya mostró error. Nunca en cada tecla desde el inicio: es hostil.

**Presentación:** mensaje bajo el campo, borde en `--amber` (no en rojo: el rojo es el color de alerta operacional de VIGÍA y usarlo para "falta el apellido" devalúa el código de color del producto), `aria-invalid="true"` y `aria-describedby` apuntando al mensaje. Resuelve F-06 y F-08.

**No confiar en `required` de HTML como única barrera:** los mensajes nativos del navegador no se pueden estilar y aparecen en el idioma del navegador, no del sitio.

### 4.2 Servidor

El servidor **revalida todo**, sin excepción. Nunca confía en el cliente.

```
1. Método POST y Content-Type application/json      -> 400
2. Rate limit por IP                                 -> 429
3. Honeypot _hp con contenido                        -> 200 {ok:true}, sin enviar nada
4. Parseo del JSON                                   -> 400
5. Esquema: campos permitidos, tipos, longitudes     -> 400
6. Requeridos no vacíos tras trim                    -> 400
7. Email con formato válido                          -> 400
8. Consentimiento === true                           -> 400
9. tipoOrganizacion y objetivo dentro del enum       -> 400
10. Persistir el lead                                -> si falla, seguir e informar
11. Enviar correo vía Resend                         -> 500 si falla y la persistencia también falló
12. 200 {ok:true}
```

**Recomendación técnica:** definir el esquema con Zod. El repo `~/vigia` ya lo usa (`zod ^4.3.6` en su `package.json`), así que el patrón es familiar para el equipo. Sustituye las comprobaciones manuales de `route.ts:33-50` por una fuente única de verdad compartible entre cliente y servidor.

**Nota sobre el orden:** el rate limit va **antes** del parseo, para que un ataque no consuma ciclos de deserialización.

---

## 5. Prevención de spam

Tres capas, sin CAPTCHA.

| Capa | Mecanismo | Detiene |
|---|---|---|
| 1 | **Honeypot real** (§3.2) | Bots que rellenan todos los campos |
| 2 | **Trampa de tiempo**: un campo oculto con el timestamp de renderizado. Si el envío ocurre en menos de 3 segundos, se descarta silenciosamente | Bots que envían al instante |
| 3 | **Rate limiting**: máximo 3 envíos por IP por hora, 20 por hora globales | Envíos repetidos y abuso del endpoint |

**Sobre CAPTCHA:** no se recomienda hoy. Añade fricción real, carga JS de terceros, es un problema de accesibilidad conocido, y transfiere datos del visitante a Google o Cloudflare, lo que complica la política de privacidad. Con el volumen esperado, tres capas ligeras bastan. **Si aparece spam real, la siguiente incorporación debe ser Cloudflare Turnstile, no reCAPTCHA**, por su mejor comportamiento en privacidad.

**Implementación del rate limit:** en Vercel, la vía sin dependencias externas es Vercel KV o Upstash Redis. Un `Map` en memoria **no funciona** en funciones serverless: cada invocación puede caer en una instancia distinta. Este punto hay que resolverlo bien o el rate limit será decorativo. `REQUIERE DECISIÓN`: añadir Vercel KV, o usar Upstash, o aceptar solo las capas 1 y 2.

---

## 6. Estados de la interfaz

| Estado | Comportamiento |
|---|---|
| **Reposo** | Formulario completo, botón activo |
| **Validando** | Errores bajo los campos afectados. Foco al primer campo con error. `aria-invalid` en cada uno |
| **Enviando** | Botón deshabilitado con "Enviando...", campos deshabilitados, `aria-busy="true"` |
| **Éxito** | Redirección a `/gracias` (resuelve F-14) |
| **Error de servidor** | Mensaje con `role="alert"`, formulario **con los datos intactos**, botón reactivado |
| **Error de red** | "No se pudo conectar. Revisa tu conexión e inténtalo de nuevo." Datos intactos |
| **Rate limit (429)** | "Recibimos tu solicitud hace poco. Si es urgente, escríbenos a contacto@vigiacommand.cl" |

**Regla:** un error **nunca** debe borrar lo que la persona escribió. Hoy el formulario conserva los valores porque son campos no controlados, y esa propiedad hay que preservarla explícitamente al migrar a estado controlado.

### 6.1 Página `/gracias`

Reemplaza al estado en línea actual. Beneficios: URL medible como conversión, compartible, y permite un mensaje más completo.

Contenido:

> **Solicitud recibida.**
> Hemos registrado tu solicitud. Nuestro equipo revisará tu caso y se pondrá en contacto contigo.
> Si necesitas escribirnos directamente: contacto@vigiacommand.cl
>
> [Volver al inicio] [Ver cómo funciona]

**No incluye plazos.** Resuelve F-15. Si VIGÍA decide comprometer 48 horas y tiene quien lo cumpla, se agrega. Mientras tanto, prometer menos y cumplir es mejor posicionamiento que prometer 48 horas y responder en cuatro días.

`/gracias` lleva `robots: { index: false }`.

---

## 7. Analítica

Resuelve F-05. Sin PII en las propiedades de ningún evento.

| Evento | Cuándo | Propiedades |
|---|---|---|
| `form_view` | El formulario entra en viewport | `page` |
| `form_start` | Primer foco en cualquier campo | `page` |
| `form_field_error` | Un campo falla validación | `field`, `reason` |
| `form_abandon` | Salida con `form_start` disparado y sin `form_submit` | `last_field` |
| `form_submit` | Envío iniciado | `tipo_organizacion`, `objetivo` |
| `form_success` | 200 del servidor | `tipo_organizacion`, `objetivo` |
| `form_error` | Respuesta no OK | `status`, `reason` |
| `form_rate_limited` | 429 | — |

**Prohibido enviar:** nombre, correo, teléfono, organización, o el texto del mensaje. `tipoOrganizacion` y `objetivo` son categorías cerradas, no identifican a nadie y son exactamente lo que hay que medir para saber qué segmento convierte.

**Métricas derivadas:** tasa de inicio (`form_start`/`form_view`), tasa de completado (`form_success`/`form_start`), campo con más fricción (moda de `form_field_error.field`), mezcla de segmentos.

---

## 8. Tratamiento de datos personales

### 8.1 Qué se recolecta y por qué

| Dato | Categoría | Finalidad | Base |
|---|---|---|---|
| Nombre | Identificación | Contactar y personalizar | Consentimiento |
| Organización, cargo | Profesional | Calificar y preparar la conversación | Consentimiento |
| Correo | Contacto | Responder | Consentimiento |
| Teléfono | Contacto | Contacto alternativo | Consentimiento, opcional |
| Tipo, objetivo, dotación | Comercial | Enrutar y priorizar | Consentimiento |
| Mensaje | Libre | Entender la necesidad | Consentimiento |
| IP | Técnico | Rate limiting | Interés legítimo, seguridad |

**No se recolecta:** RUT, datos de salud, datos financieros, ni ninguna categoría sensible.

### 8.2 Obligaciones

- Política de privacidad accesible **desde el propio formulario**, no solo desde el footer.
- Consentimiento explícito, sin premarcar.
- Declarar el encargado de tratamiento: **Resend**, proveedor en EE.UU. Es una transferencia internacional y debe informarse.
- Declarar plazo de conservación. Propuesta: 24 meses desde el último contacto.
- Habilitar el ejercicio de derechos de acceso, rectificación y supresión mediante una dirección de correo publicada.

`REQUIERE INFORMACIÓN`: razón social, RUT, domicilio y correo del responsable de datos. **Sin estos datos la política de privacidad no se puede redactar sin inventar una entidad legal, y por tanto no se redactará.**

### 8.3 Retención en logs

`route.ts:17` y `:93` usan `console.error` con el objeto de error de Resend, que puede incluir la dirección de destino. Los logs de Vercel se conservan y son accesibles. Revisar que no se registre PII completa.

---

## 9. Almacenamiento y enrutamiento del lead

Resuelve F-04. Hoy el correo es el único registro y es un punto único de fallo.

### 9.1 Opciones

| Opción | Esfuerzo | A favor | En contra |
|---|---|---|---|
| **Correo + Vercel KV** | Bajo | Nada nuevo que aprender, sin coste adicional relevante, respaldo inmediato. **Recomendada como paso 1** | No es un CRM, no tiene interfaz |
| Correo + Google Sheets vía API | Bajo | El equipo comercial ve los leads sin pedir nada a nadie | Credenciales de servicio, límites de API |
| Correo + Firestore | Medio | El proyecto `~/vigia` ya usa Firebase; hay experiencia interna | Acopla la web a la infraestructura de la plataforma, que hoy son proyectos independientes |
| CRM (HubSpot gratuito) | Medio | Es la solución correcta a mediano plazo | Decisión de negocio y de proceso, no técnica |

**Recomendación:** Vercel KV ahora, con el registro estructurado listo para exportar. CRM cuando el volumen lo justifique. **La decisión importante no es cuál, es que exista alguno**: hoy no hay ninguno.

### 9.2 Formato del registro

```
{
  id, recibidoEn, nombre, organizacion, cargo, email, telefono,
  tipoOrganizacion, objetivo, dotacion, mensaje,
  consentimiento: true, consentimientoEn,
  origen: { referrer, utm_source, utm_medium, utm_campaign, pagina },
  emailEnviado: boolean
}
```

Capturar UTM permite responder de dónde vino el lead. Hoy es imposible saberlo.

### 9.3 Mejoras al correo

- Asunto que incluya el segmento: `[Bomberos] Solicitud de demostración, Cuerpo de Bomberos de Viña del Mar (Cap. Rojas)`. Permite triage sin abrir el mensaje.
- Incluir `tipoOrganizacion`, `objetivo` y origen UTM en el cuerpo.
- Verificar el dominio en Resend con SPF, DKIM y DMARC (F-16). **Sin esto, los correos de `noreply@vigiacommand.cl` van a spam.** Es la comprobación número uno a hacer antes de cualquier otra cosa: si el formulario no entrega hoy, todo lo demás es secundario.
- Considerar acuse de recibo automático al prospecto. `REQUIERE DECISIÓN`: mejora la experiencia, pero un acuse mal redactado suena a bot y en venta institucional puede restar.

---

## 10. Contrato de la API

### 10.1 `POST /api/contact`

**Petición**
```
{
  nombre: string,            // requerido, 2-120
  organizacion: string,      // requerido, 2-200
  cargo?: string,            // 0-120
  tipoOrganizacion: enum,    // requerido: bomberos | industrial | respuesta | otro
  objetivo: enum,            // requerido: conocer | demo | piloto | implementacion
  email: string,             // requerido, máx 254
  telefono?: string,         // 8-20
  dotacion?: enum,           // 1-10 | 11-30 | 31-80 | 80+
  mensaje?: string,          // 0-2000
  consentimiento: true,      // requerido
  _hp?: string,              // honeypot, debe venir vacío
  _t?: number,               // timestamp de renderizado
  utm?: { source?, medium?, campaign? }
}
```

**Respuestas**

| Código | Cuerpo | Cuándo |
|---|---|---|
| 200 | `{ ok: true }` | Éxito, o honeypot activado (respuesta indistinguible a propósito) |
| 400 | `{ error, field? }` | Validación fallida. `field` permite marcar el campo en la interfaz |
| 429 | `{ error }` | Rate limit |
| 500 | `{ error }` | Persistencia y correo fallaron ambos |

**Nota:** si el correo falla pero la persistencia tuvo éxito, se devuelve **200**. El lead está guardado; el prospecto no tiene por qué reintentar. El fallo de correo se registra para revisión interna. Hoy se devuelve 500 y el prospecto ve un error aunque no haya nada que él pueda hacer.

### 10.2 Variables de entorno

| Variable | Estado | Uso |
|---|---|---|
| `RESEND_API_KEY` | Existe | Envío. Sin ella el endpoint devuelve 500 (`route.ts:16-19`) |
| `CONTACT_EMAIL_TO` | Existe, por defecto `contacto@vigiacommand.cl` | Destino |
| `CONTACT_EMAIL_FROM` | Existe, por defecto `VIGIA Contact <noreply@vigiacommand.cl>` | Remitente. Requiere dominio verificado |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Nuevas | Persistencia y rate limit |

Ninguna se expone al cliente. Ninguna lleva prefijo `NEXT_PUBLIC_`. Correcto hoy y debe mantenerse.

---

## 11. Accesibilidad

| Requisito | Estado actual | Acción |
|---|---|---|
| Etiqueta asociada a cada control | Cumple, `<label>` envolvente | Mantener |
| Errores anunciados | **Falla** | `role="alert"` + `aria-live="polite"` |
| Error asociado a su campo | **Falla** | `aria-describedby` + `aria-invalid` |
| Foco visible | Parcial: `:focus` solo cambia el borde (`globals.css:176`) | `:focus-visible` con outline de 2px |
| Grupos de botones operables con teclado | Nuevo | `role="radiogroup"`, navegación con flechas |
| Contraste de placeholders | **Falla**: usan `--faint`, 1,78:1 | Corregir con el token recalibrado |
| Orden de tabulación | Correcto | Mantener |
| Objetivos táctiles de 44x44 | Parcial: campos a 11px de padding vertical | Subir a 12px mínimo |
| Envío por teclado | Cumple | Mantener |
| Checkbox de consentimiento | Nuevo | Etiqueta clickeable, no solo el cuadro |

---

## 12. Plan de implementación

| # | Tarea | Etapa del plan | Bloqueo |
|---|---|---|---|
| 1 | **Verificar que el formulario entrega correo hoy** (F-16) | Inmediato | Requiere acceso a Resend |
| 2 | Honeypot real + trampa de tiempo (F-01) | 1 | Ninguno |
| 3 | Rate limiting (F-02) | 1 | Decidir KV |
| 4 | `autoComplete` + `inputMode` (F-07, F-09) | 1 | Ninguno |
| 5 | `role="alert"` y `aria-describedby` (F-06) | 1 | Ninguno |
| 6 | Política de privacidad + consentimiento (F-03) | 2 | **Datos societarios** |
| 7 | Persistencia del lead (F-04) | 2 | Decidir almacenamiento |
| 8 | Eventos de analítica (F-05) | 2 | Ninguno |
| 9 | Página `/gracias` (F-14) | 2 | Ninguno |
| 10 | Campos `tipoOrganizacion` y `objetivo` (F-10) | 2 | Ninguno |
| 11 | Validación por campo con Zod (F-08) | 2 | Ninguno |
| 12 | `dotacion` condicional | 3 | Depende de #10 |
| 13 | Rediseño visual del formulario | 3 | Depende de los tokens de contraste |
| 14 | Decidir el compromiso de plazo de respuesta (F-15) | 1 | **Decisión de negocio** |

---

## 13. Decisiones pendientes

1. **¿El formulario entrega correo hoy?** Si el dominio no está verificado en Resend, hay leads perdidos desde junio. Verificar antes que cualquier otra cosa.
2. **¿Se mantiene el compromiso de 48 horas?**
3. **¿Dónde se guardan los leads?** Vercel KV, Sheets, Firestore o CRM.
4. **¿Se envía acuse de recibo automático al prospecto?**
5. **Datos societarios** para la política de privacidad. Bloqueo duro.
6. **¿Se acepta añadir Vercel KV** como dependencia de infraestructura para rate limit y persistencia?
