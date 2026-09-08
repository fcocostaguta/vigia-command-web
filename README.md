# VIGÍA Command — sitio público

Sitio comercial público de VIGÍA, construido con Next.js, React y TypeScript.

> **Alcance del repositorio:** este repositorio contiene exclusivamente la experiencia web pública. No debe usarse para almacenar arquitectura interna del producto, documentación de pilotos, inventarios de dispositivos, credenciales, datos personales reales ni procedimientos operacionales internos.

## Requisitos

- Node.js 20+
- npm

## Inicio rápido

```bash
npm ci
cp .env.example .env.local
npm run dev
```

El sitio queda disponible en `http://localhost:3000`.

## Variables de entorno

`.env.example` contiene únicamente nombres de variables y valores públicos o vacíos. Los valores reales deben configurarse localmente y en el proveedor de despliegue; nunca deben subirse a Git.

Variables utilizadas por el formulario de contacto:

- `RESEND_API_KEY`: credencial server-side para envío de correos.
- `CONTACT_EMAIL_TO`: destinatario del formulario.
- `CONTACT_EMAIL_FROM`: remitente verificado del formulario.
- `KV_REST_API_URL`: endpoint server-side opcional para persistencia de leads.
- `KV_REST_API_TOKEN`: token server-side opcional para persistencia de leads.

Ningún secreto debe usar el prefijo `NEXT_PUBLIC_`.

## Comandos

```bash
npm run dev      # desarrollo local
npm run build    # build de producción
npm run start    # servir build de producción
npm run lint     # lint
```

Antes de integrar un cambio ejecutar, como mínimo:

```bash
npm run lint
npm run build
```

## Estructura relevante

```text
app/
  api/contact/     endpoint server-side del formulario
  privacidad/      política de privacidad
  layout.tsx       metadata y layout global
  page.tsx         página principal
components/        componentes de la landing
lib/               utilidades compartidas
public/            assets públicos
```

## Rutas

- `/` — landing comercial.
- `/privacidad` — política de privacidad.
- `/api/contact` — endpoint POST del formulario.

No dejar rutas de experimentación o pruebas desplegadas en producción. Las pruebas visuales temporales deben ejecutarse localmente o eliminarse antes de integrar.

## Datos y seguridad

Este es un repositorio público. Antes de cada commit comprobar que no se incluyan:

- archivos `.env` reales;
- API keys, tokens, certificados o llaves privadas;
- datos recibidos desde formularios;
- nombres, correos o teléfonos de prospectos/clientes obtenidos fuera del contenido público intencional del sitio;
- identificadores reales de dispositivos;
- documentación de arquitectura interna, auditorías privadas o planes comerciales;
- rutas locales del computador de un contribuidor.

El endpoint de contacto procesa datos personales. Evitar incluir el payload del lead en URLs, logs o mensajes de error. Los secretos deben leerse únicamente desde variables de entorno server-side.

Si un secreto real se publica por error, eliminarlo del código **no es suficiente**: debe revocarse o rotarse de inmediato y luego evaluarse la limpieza del historial Git.

## Flujo de trabajo

1. Partir desde `main` actualizado.
2. Crear una rama corta (`feature/...`, `fix/...`, `chore/...`).
3. Hacer el cambio y ejecutar lint/build.
4. Integrar únicamente cuando el repositorio quede sin archivos locales, pruebas temporales o información sensible.
5. Eliminar la rama cuando ya esté integrada y no conserve trabajo único.

## Despliegue

El sitio está preparado para desplegarse como aplicación Next.js en Vercel. Las credenciales y variables reales se configuran en el entorno de despliegue, no en este repositorio.
