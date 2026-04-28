# VIGÍA Command — Landing Page

Plataforma de monitoreo operacional para bomberos.
Landing comercial construida con **Next.js 14 App Router**, **TypeScript** y **TailwindCSS**.

---

## Estructura del proyecto

```
vigia-command/
├── app/
│   ├── layout.tsx          ← Metadata SEO + fuentes
│   ├── page.tsx            ← Página principal (ensambla componentes)
│   └── globals.css         ← Diseño visual completo (tokens, layouts, componentes)
├── components/
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── TacticalPanel.tsx   ← Panel animado con BPM en tiempo real
│   ├── ProblemSection.tsx
│   ├── SolutionSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── TacticalModeSection.tsx
│   ├── BlackBoxSection.tsx
│   ├── BenefitsSection.tsx
│   ├── DevelopmentStatusSection.tsx
│   ├── ContactSection.tsx
│   ├── DemoModal.tsx
│   ├── Footer.tsx
│   └── Icons.tsx
├── lib/
│   └── content.ts          ← TODO el texto editable de la landing
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Inicio rápido

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # build de producción
npm run start     # servidor de producción local
```

---

## Cómo editar textos

**Todos los textos están en `lib/content.ts`.**

Cada sección tiene su propia constante:

| Constante        | Sección                  |
|------------------|--------------------------|
| `HERO`           | Hero principal           |
| `PROBLEM`        | El problema              |
| `SOLUTION`       | La solución              |
| `HOW_IT_WORKS`   | Cómo funciona            |
| `TACTICAL_MODE`  | Modo Táctico             |
| `BLACK_BOX`      | Caja negra               |
| `BENEFITS`       | Beneficios               |
| `DEV_STATUS`     | Estado de desarrollo     |
| `CTA`            | CTA final / Contacto     |
| `FOOTER`         | Pie de página            |
| `INIT_OPERATORS` | Datos del panel táctico  |

Ejemplo — cambiar el título del Hero:

```ts
// lib/content.ts
export const HERO = {
  title_plain: 'Monitoreo operacional para ',
  title_em:    'bomberos',      // ← texto en rojo
  title_end:   ' en tiempo real',
  ...
}
```

---

## Variables de entorno

No se requieren variables de entorno para el funcionamiento actual de la landing.

Si en el futuro se integra un backend de formulario (Resend, Formspree, etc.), crear un archivo `.env.local`:

```env
NEXT_PUBLIC_FORM_ENDPOINT=https://...
```

---

## Despliegue en Vercel

### Opción 1 — Desde GitHub (recomendado)

1. Sube el proyecto a un repositorio en GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: landing VIGÍA Command"
   git remote add origin https://github.com/tu-usuario/vigia-command.git
   git push -u origin main
   ```

2. Ve a [vercel.com](https://vercel.com) → **Add New Project**

3. Importa el repositorio de GitHub

4. Vercel detecta Next.js automáticamente — haz clic en **Deploy**

5. Tu landing estará en `https://vigia-command.vercel.app`

6. Para usar el dominio `vigiacommand.cl`: ve a **Settings → Domains** en Vercel y agrega el dominio.

### Opción 2 — Vercel CLI

```bash
npm i -g vercel
vercel        # sigue el asistente
vercel --prod # deploy a producción
```

---

## Rutas disponibles

| Ruta  | Descripción              |
|-------|--------------------------|
| `/`   | Landing comercial        |

No se crean rutas `/dashboard`, `/admin` ni `/api/vitals`.

El botón **Ingresar a Mando** redirige a `https://mando.vigiacommand.cl`.

---

## Diseño visual

Los tokens de diseño están definidos como variables CSS en `app/globals.css`:

```css
:root {
  --col-bg:       oklch(9%  0.008 250);   /* Fondo principal     */
  --col-surface:  oklch(13% 0.009 250);   /* Superficies         */
  --col-red:      oklch(54% 0.22 22);     /* Acento emergencia   */
  --col-amber:    oklch(72% 0.15 65);     /* Alertas / warning   */
  --col-green:    oklch(65% 0.17 155);    /* Estado activo / ok  */
}
```

Para cambiar la paleta completa, modifica solo estas variables en `:root`.

---

## Estado del proyecto

VIGÍA Command está en **etapa de desarrollo y validación técnica**.
Esta landing es el sitio comercial público — no incluye lógica operativa,
autenticación ni APIs de sensores.
