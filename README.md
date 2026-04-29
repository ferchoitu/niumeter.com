# Niumeter — Hub de Calculadoras Financieras

Hub bilingüe (ES/EN) de calculadoras financieras y de sueldo para latinoamérica. Construido con Next.js 15, Tailwind CSS v4, shadcn/ui y next-intl. Optimizado para SEO programático y Core Web Vitals.

## Stack

- **Framework:** Next.js 15 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **i18n:** next-intl (`/es/` y `/en/`)
- **Charts:** recharts
- **Forms:** react-hook-form + zod
- **Analytics:** Vercel Analytics + GA4 (via env var)
- **Deploy:** Vercel (región `gru1` — South America)

## Setup local

```bash
npm install
cp .env.example .env.local   # completar variables
npm run dev                    # → localhost:3000 redirige a /es
```

## Páginas

| URL | Descripción |
|-----|-------------|
| `/es` | Homepage español |
| `/en` | Homepage inglés |
| `/es/calculadora-sueldo/argentina` | Calculadora sueldo neto Argentina |
| `/sitemap.xml` | Sitemap dinámico |
| `/api/og?title=...` | OG Image edge function |

## Cómo agregar una nueva calculadora

1. **Datos fiscales** → `src/lib/data/tax-data.ts` (nuevo país/bloque con TODOs)
2. **Lógica pura** → `src/lib/calculations/<pais>-<tipo>.ts`
3. **Componente** → `src/components/calculators/<Nombre>Calculator.tsx` (mismo patrón que Argentina)
4. **Página** → `src/app/[locale]/calculadora-<tipo>/<pais>/page.tsx` (con `generateMetadata` + JSON-LD)
5. **Traducciones** → `messages/es.json` y `messages/en.json`
6. **Sitemap** → agregar ruta en `src/app/sitemap.ts`
7. **Nav** → actualizar `Header.tsx` y `Footer.tsx`

## TODOs pendientes — data fiscal

| Archivo | Item |
|---------|------|
| `tax-data.ts` | Validar TODOS los valores contra AFIP 2026 |
| `argentina-salary.ts` | Implementar retención mensual acumulada (tabla AFIP) |

## TODOs pendientes — contenido

| Archivo | Item |
|---------|------|
| `calculadora-sueldo/argentina/page.tsx` | ~800 palabras SEO (marcado `[CONTENIDO PENDIENTE]`) |
| `/privacy`, `/terms` | Crear páginas legales reales |

## TODOs pendientes — monetización

| Archivo | Acción |
|---------|--------|
| `layout.tsx` | Descomentar script AdSense |
| `Footer.tsx`, `CalculatorShell.tsx` | Descomentar slots AdSense |
| `.env.local` | Agregar `NEXT_PUBLIC_GA_ID` y `NEXT_PUBLIC_ADSENSE_ID` |

## Deploy a Vercel

```bash
npm i -g vercel
vercel --prod
```

Variables en Vercel Dashboard:
- `NEXT_PUBLIC_GA_ID` — GA4 Measurement ID
- `NEXT_PUBLIC_ADSENSE_ID` — AdSense Publisher ID

## Fuentes oficiales

- AFIP Argentina: https://www.afip.gob.ar
- ANSES: https://www.anses.gob.ar
