# VIGÍA Commercial Web — Final Release

**Date:** 2026-06-06
**Repo:** `https://github.com/fcocostaguta/vigia-command-web` (local: `~/vigia-command-web/vigia-nextjs`)
**Branch:** `main`
**Commit SHA:** `dfa3b85`
**Production URL:** `https://www.vigiacommand.cl`

---

## Changes Applied

### components/Hero.tsx
- `GPS · LoRa` chip label → `GPS · Activo`
- Tablet topbar incident label: `Incendio · 2ª alarma` → `Incendio · 2ª alarma · Maitencillo`

### components/PanelSection.tsx
- Flow step 01: `Sensor en el operador` → `Monitoreo en el operador`
- Flow step 02: `Gateway táctico` → `Punto de mando local`

### components/Trust.tsx
- Rewritten four pillars to commercial outcome language
- Removed all architecture references (BLE, MQTT, LoRa, Raspberry, ESP32, NFPA, Polar H10)
- New pillars: Continuidad de mando / Trazabilidad total / Visibilidad en vivo / Coordinación

### components/OfflineFirst.tsx
- Section tag: `Arquitectura de campo` → `Operación en terreno`
- Stage 01 tag: `Sin internet · Operativo` → `Sin conexión externa · Operativo`
- Stage 02 tag: `Red local · Tiempo real` → `Coordinación activa · Tiempo real`
- Stage 03 tag: `Sync · Caja Negra al cloud` → `Registro sincronizado · Auditable`

### components/CajaNegra.tsx
- Bullet: `Historial auditable desde el cloud` → `Historial auditable posterior al incidente`
- Timeline expanded from 4 to 7 operational events:
  1. 14:02 Alerta inicial
  2. 14:05 Personal desplegado
  3. 14:07 Monitoreo iniciado
  4. 14:11 Alerta biométrica
  5. 14:19 Rehabilitación
  6. 15:44 Recuperación
  7. 16:23 Registro cerrado

### components/ProductShowcase.tsx
- CajaNegraMock timeline aligned to same 7-event sequence

---

## Sensitive Terms Validation

Scan: `grep -rn "Raspberry|LoRa|NFPA|ESP32|Polar H10|Gateway táctico|desde el cloud|Red local|Caja Negra al cloud|Arquitectura de campo" components/ app/`

**Result: EXIT 1 — zero matches in public-facing source.**

---

## Lint Result

```
3 warnings (pre-existing <img> tag warnings in Footer.tsx, Header.tsx, Hero.tsx)
0 errors
```

---

## Build Result

```
✓ Compiled successfully
✓ Generating static pages (9/9)
0 errors
```

Route sizes: `/` — 12.3 kB / 99.6 kB first load JS.

---

## Production Checklist

- [x] Hero updated — incident label shows `Maitencillo`
- [x] `GPS · LoRa` removed — replaced with `GPS · Activo`
- [x] `Gateway táctico` removed
- [x] `Raspberry`, `BLE`, `MQTT`, `LoRa`, `NFPA`, `ESP32`, `Polar H10` removed
- [x] `Red local` removed
- [x] `Caja Negra al cloud` removed
- [x] `desde el cloud` removed
- [x] `Arquitectura de campo` removed
- [x] `Ingresar a Mando` — no underline (global `a { text-decoration: none; }` in globals.css)
- [x] Chips do not overlap tablet (positioned within watch-stage bounds; gap: 24px separates stage from tablet)
- [x] Build passes — no errors
- [x] Push to `origin/main` confirmed — Vercel auto-deploy triggered

---

## Pending Risks

- Vercel deploy confirmation requires checking the Vercel dashboard or waiting ~60s after push
- The `/test-b` and `/test-hero` routes are still deployed but not linked from navigation; clean up in a future sprint if desired

---

## Closure

The commercial web phase is **closed**. All approved narrative changes are live on `main`, build and lint pass, and Vercel will auto-deploy from this commit.
