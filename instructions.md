# NIUMETER — INSTRUCTIONS.MD
# Documento de referencia permanente para Antigravity
# Última actualización: abril 2026
# LEER COMPLETO ANTES DE EJECUTAR CUALQUIER TAREA

---

## 1. QUÉ ES ESTE PROYECTO

**Niumeter** (niumeter.com) es un hub de calculadoras financieras bilingüe
(español primero, inglés después) monetizado con AdSense y redes premium.

**Objetivo de negocio:** 1.000.000 de visitas mensuales en 12-18 meses.
**Modelo:** SEO programático — una plantilla base multiplicada en cientos
de páginas por país, región, convenio y situación familiar.
**Monetización:** Google AdSense (actual) → Raptive/Mediavine (objetivo
cuando se alcancen 100.000 visitas/mes sostenidas).

---

## 2. STACK TÉCNICO (NO CAMBIAR SIN AUTORIZACIÓN EXPLÍCITA)

```
Framework:     Next.js 15 (App Router) con TypeScript
Estilos:       Tailwind CSS v3 (NO v4 — incompatible con shadcn)
Componentes:   shadcn/ui
i18n:          next-intl (middleware + [locale] segment)
Hosting:       Vercel
Analytics:     Google Analytics 4 + Vercel Analytics
SEO:           next-seo + metadatos dinámicos + JSON-LD schema
Forms:         react-hook-form + zod
Íconos:        lucide-react
Fuente:        Inter vía next/font
Control:       GitHub
```

### Reglas de stack que NUNCA se rompen

- ❌ NO instalar styled-components, emotion, ni ningún CSS-in-JS
- ❌ NO usar Tailwind v4 (rompe shadcn)
- ❌ NO hardcodear strings de UI — todo va al sistema i18n
- ❌ NO usar `<img>` directo — siempre next/image
- ❌ NO usar `<Link>` de HTML — siempre next/link
- ❌ NO configurar base de datos — todo es estático por ahora
- ❌ NO instalar librerías pesadas si Tailwind resuelve lo mismo
- ✅ SÍ usar Server Components siempre que sea posible
- ✅ SÍ preferir generación estática (SSG) sobre SSR para calculadoras

---

## 3. ESTRUCTURA DE CARPETAS (RESPETAR SIEMPRE)

```
/src
  /app
    /[locale]
      layout.tsx               # Layout principal con hreflang
      page.tsx                 # Homepage
      /calculadora-sueldo
        /[pais]
          page.tsx             # Página dinámica por país
          /[convenio]
            page.tsx           # Variante por convenio
      /calculadora-aguinaldo
        /[pais]/page.tsx
      /calculadora-indemnizacion
        /[pais]/page.tsx
      /calculadora-freelance
        /[pais]/page.tsx
      /calculadora-monotributo
        /[pais]/page.tsx

  /components
    /calculators               # Un componente por tipo de calculadora
    /ui                        # Componentes shadcn (no modificar)
    /layout                    # Header, Footer, Nav, Breadcrumbs
    /seo                       # Schema, OpenGraph, etc.

  /lib
    /calculations              # Lógica pura de cálculo (sin UI)
    /data                      # JSON con datos fiscales por país
    /i18n                      # Traducciones ES/EN

  /content                     # Contenido MDX si se necesita
```

### Convención de nombres de archivos

- Componentes: PascalCase (`SalaryCalculator.tsx`)
- Utilities/lib: camelCase (`calculateNetSalary.ts`)
- Datos: kebab-case (`tax-data-argentina.json`)
- Páginas: Next.js App Router convention (`page.tsx`, `layout.tsx`)

---

## 4. ARQUITECTURA DE URLs (NO CAMBIAR)

```
/es/calculadora-sueldo/argentina/
/es/calculadora-sueldo/argentina/comercio/
/es/calculadora-sueldo/mexico/
/es/calculadora-sueldo/espana/
/es/calculadora-aguinaldo/argentina/
/es/calculadora-indemnizacion/argentina/
/es/calculadora-freelance/argentina/
/es/calculadora-monotributo/argentina/

/en/salary-calculator/california/
/en/salary-calculator/texas/
/en/freelance-tax-calculator/
```

### Reglas de URLs

- ✅ Siempre en minúsculas
- ✅ Separadores con guiones (nunca underscores)
- ✅ Sin caracteres especiales (España → espana, sin tilde)
- ✅ Una URL por keyword — nunca agrupar calculadoras en la misma página
- ❌ Sin parámetros query para contenido indexable (?pais=AR está prohibido)

---

## 5. DATOS FISCALES — REGLA DE ORO

> ⚠️ REGLA CRÍTICA: Nunca inventar, asumir ni completar datos fiscales.
> Los datos fiscales son información YMYL (Your Money Your Life).
> Un dato incorrecto puede causar daño real a usuarios y destruir
> el ranking SEO.

### Protocolo obligatorio para datos fiscales

1. **Si no tenés el dato validado → usá placeholder marcado:**
   ```typescript
   // TODO: VALIDAR - fuente: [nombre fuente oficial]
   const DATO_PENDIENTE = null;
   ```

2. **Si el JSON tiene `"validated": false` → mostrar warning en UI**

3. **Nunca calcular con datos marcados como pendientes** — mostrar
   mensaje al usuario: "Datos en validación, volvé pronto"

4. **Fuentes oficiales aceptadas por país:**
   - Argentina: ARCA (arca.gob.ar), Boletín Oficial
   - México: SAT (sat.gob.mx)
   - España: Agencia Tributaria (agenciatributaria.gob.es)
   - Colombia: DIAN (dian.gov.co)
   - Chile: SII (sii.cl)

### Datos fiscales validados — Argentina 2026 (1er semestre)

```json
{
  "argentina": {
    "year": 2026,
    "semester": "1H2026",
    "validated": true,
    "source": "ARCA - RG 4003 / Art. 94 Ley 20.628",
    "lastUpdated": "2026-01-15",

    "aportesObligatorios": {
      "jubilacion": 0.11,
      "obraSocial": 0.03,
      "ley19032_PAMI": 0.03,
      "totalSinSindical": 0.17
    },

    "aporteSindical": {
      "default": 0,
      "porConvenio": {
        "comercio": 0.025,
        "uocra": 0.02,
        "sanidad": 0.03
      }
    },

    "ganancias": {
      "deduccionesAnuales": {
        "minimoNoImponible": 5151802.50,
        "deduccionEspecial4taCategoria": 24728652.02,
        "conyuge": 4851964.66,
        "hijo": 2446863.48,
        "hijoIncapacitado": 4893726.96
      },

      "pisosMensualesBruto": {
        "solteroSinHijos": 3000045,
        "casadoSinHijos": 3487190,
        "casadoUnHijo": 3732860,
        "casadoDosHijos": 3952152
      },

      "escalaAnual": [
        { "desde": 0,           "hasta": 2000030.09,  "fijo": 0,           "alicuota": 0.05, "excedente": 0 },
        { "desde": 2000030.09,  "hasta": 4000060.17,  "fijo": 100001.50,   "alicuota": 0.09, "excedente": 2000030.09 },
        { "desde": 4000060.17,  "hasta": 6000090.26,  "fijo": 280004.21,   "alicuota": 0.12, "excedente": 4000060.17 },
        { "desde": 6000090.26,  "hasta": 9000135.40,  "fijo": 520007.82,   "alicuota": 0.15, "excedente": 6000090.26 },
        { "desde": 9000135.40,  "hasta": 18000270.80, "fijo": 970014.59,   "alicuota": 0.19, "excedente": 9000135.40 },
        { "desde": 18000270.80, "hasta": 27000406.20, "fijo": 2680040.32,  "alicuota": 0.23, "excedente": 18000270.80 },
        { "desde": 27000406.20, "hasta": 40500609.30, "fijo": 4750071.46,  "alicuota": 0.27, "excedente": 27000406.20 },
        { "desde": 40500609.30, "hasta": 60750913.96, "fijo": 8395126.30,  "alicuota": 0.31, "excedente": 40500609.30 },
        { "desde": 60750913.96, "hasta": null,        "fijo": 14672720.74, "alicuota": 0.35, "excedente": 60750913.96 }
      ]
    }
  }
}
```

---

## 6. LÓGICA DE CÁLCULO — ARGENTINA

Esta es la función de referencia validada. No modificar sin autorización.

```typescript
interface CalcInput {
  sueldoBruto: number;
  enConvenio: boolean;
  aporteSindicalPct: number;    // ej: 0.025 para 2.5%
  aplicaGanancias: boolean;     // toggle del usuario, default false
  conyuge: boolean;
  cantidadHijos: number;
  descuentoAdicional: number;
}

interface CalcOutput {
  sueldoBruto: number;
  jubilacion: number;
  obraSocial: number;
  ley19032: number;
  sindical: number;
  ganancias: number;
  descuentoAdicional: number;
  totalDescuentos: number;
  sueldoNeto: number;
  porcentajeRetencion: number;
  pagaGanancias: boolean;
}

// IMPORTANTE: Ganancias se calcula de forma SIMPLIFICADA (estimativo mensual).
// El cálculo oficial de ARCA es acumulativo mensual (más complejo).
// La diferencia es del 5-10%. El disclaimer en UI cubre esto.
```

### Casos de test obligatorios antes de publicar

| Sueldo bruto | Convenio | Ganancias toggle | Resultado esperado |
|-------------|----------|-----------------|-------------------|
| $1.500.000 | No | OFF | Neto: $1.245.000 (−17%) |
| $2.500.000 | No | OFF | Neto: $2.075.000 (−17%) |
| $2.500.000 | Comercio | OFF | Neto: $2.012.500 (−19.5%) |
| $5.000.000 | No | ON (soltero) | Neto: ~$3.820.000 (−24%) |
| $3.000.000 | No | ON (soltero) | Ganancias = $0, mensaje informativo |

---

## 7. REQUISITOS SEO (TODOS OBLIGATORIOS)

Cada página del sitio debe cumplir estos requisitos sin excepción:

### Metadatos

```typescript
// Ejemplo para Argentina — adaptar por país/calculadora
export const metadata: Metadata = {
  title: 'Calculadora Sueldo Neto Argentina 2026 | Niumeter',
  description: 'Calculá tu sueldo neto en Argentina 2026 con datos actualizados de ARCA. Descontás aportes, Ganancias, ves el desglose real.',
  alternates: {
    canonical: 'https://niumeter.com/es/calculadora-sueldo/argentina',
    languages: {
      'es': '/es/calculadora-sueldo/argentina',
      'en': '/en/salary-calculator/argentina',
    },
  },
  openGraph: {
    title: 'Calculadora Sueldo Neto Argentina 2026 | Niumeter',
    description: '...',
    url: 'https://niumeter.com/es/calculadora-sueldo/argentina',
    siteName: 'Niumeter',
    locale: 'es_AR',
    type: 'website',
  },
}
```

### Schema JSON-LD obligatorio por tipo de página

**Calculadoras:** `WebApplication` + `HowTo` + `FAQPage`
**Homepage:** `WebSite` + `Organization`
**Páginas de país:** agregar `BreadcrumbList`

### Core Web Vitals — targets mínimos

- LCP: < 1.5 segundos
- CLS: 0 (cero layout shift)
- INP: < 200ms
- FCP: < 1.2 segundos

### Checklist SEO por página nueva

- [ ] Title único con keyword + año + "Niumeter"
- [ ] Meta description entre 140-155 caracteres
- [ ] H1 único por página
- [ ] Canonical tag correcto
- [ ] hreflang entre /es/ y /en/ equivalente
- [ ] Sitemap actualizado automáticamente
- [ ] Schema JSON-LD válido (verificar con Google Rich Results Test)
- [ ] Breadcrumbs con schema
- [ ] Internal links a calculadoras relacionadas
- [ ] Open Graph image dinámica con @vercel/og
- [ ] robots.txt permite indexación

---

## 8. DISEÑO VISUAL (NO CAMBIAR)

### Paleta de colores

```css
--color-primary:     #10B981;  /* emerald-500 — verde principal */
--color-primary-dark:#059669;  /* emerald-600 — hover states */
--color-accent:      #1E3A8A;  /* blue-900 — acentos, links */
--color-text:        #1F2937;  /* gray-800 — texto principal */
--color-text-light:  #6B7280;  /* gray-500 — texto secundario */
--color-bg:          #FAFAF9;  /* stone-50 — fondo general */
--color-surface:     #FFFFFF;  /* white — cards y panels */
--color-border:      #E5E7EB;  /* gray-200 — bordes sutiles */
--color-warning:     #F59E0B;  /* amber-500 — warnings */
--color-error:       #EF4444;  /* red-500 — errores */
--color-success:     #10B981;  /* emerald-500 — éxito */
```

### Tipografía

```css
font-family: 'Inter', sans-serif;   /* cuerpo y UI */
font-size-base: 16px mobile / 18px desktop;
heading-font-weight: 700;
```

### Componentes — reglas de estilo

- Border radius: `rounded-xl` (12px) para cards principales
- Border radius: `rounded-lg` (8px) para inputs y botones
- Sombras: sutiles (`shadow-sm`), nunca `shadow-xl`
- Bordes: `border border-gray-200`, no sombras pesadas
- Animaciones: `transition-all duration-200` en interactivos
- Espaciado: escala 4px (Tailwind default)

### Referencia de estilo

Wise.com y Revolut — limpio, confiable, moderno. NO bancario tradicional.

---

## 9. COMPORTAMIENTO DE LAS CALCULADORAS

### UX obligatoria

- Cálculo en **tiempo real** (onChange, NO submit)
- Debounce de **300ms** en inputs numéricos
- Guardar último cálculo en **localStorage**
- **Mobile first** — inputs con `inputMode="numeric"`
- Separador de miles en displays (1.500.000 no 1500000)
- **Skeleton loaders** mientras cargan datos (CLS = 0)

### Layout estándar de calculadora

```
[Izquierda/Arriba mobile]     [Derecha/Abajo mobile]
┌─────────────────────┐       ┌──────────────────────────┐
│   INPUTS            │       │  RESULTADO PRINCIPAL     │
│   - Sueldo bruto    │  →→→  │  $ X.XXX.XXX (grande)    │
│   - Toggles         │       │  Bruto | Descuentos      │
│   - Opcionales      │       ├──────────────────────────┤
│                     │       │  DESGLOSE DETALLADO      │
│   [Compartir]       │       │  + Gráfico donut         │
└─────────────────────┘       └──────────────────────────┘

[Contenido SEO — 800 palabras]
[FAQs — accordion]
[Calculadoras relacionadas]
[Footer]
```

### Botón "Compartir este cálculo"

Genera URL con query params para que el usuario comparta el resultado:
```
/es/calculadora-sueldo/argentina?bruto=2500000&convenio=false&ganancias=false
```
La página lee los params y pre-llena la calculadora automáticamente.

---

## 10. SISTEMA I18N

### Estructura de archivos de traducción

```
/src/lib/i18n/
  es.json    # Español (default)
  en.json    # Inglés
```

### Reglas de i18n

- **NUNCA** hardcodear strings de UI en español o inglés en componentes
- Todo texto visible al usuario va en los archivos de traducción
- Los nombres de países van en el JSON de traducción, no hardcodeados
- Las URLs /es/ y /en/ son rutas distintas, no parámetros

### Configuración de next-intl

```typescript
// middleware.ts
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
}
// Default locale: 'es'
// Supported: ['es', 'en']
```

---

## 11. MONETIZACIÓN — SLOTS DE ADSENSE

Los slots de AdSense están preparados pero **comentados** en el código.
Solo descomentar cuando el owner lo indique explícitamente.

### Ubicaciones de slots (en orden de RPM esperado)

1. **Arriba del fold, debajo del H1** — máximo RPM, cargado lazy
2. **Entre resultado y desglose** — alta atención del usuario
3. **Entre desglose y contenido SEO** — tráfico orgánico
4. **Sidebar desktop** (si aplica layout en desktop)
5. **Footer antes de calculadoras relacionadas**

### Código de placeholder

```tsx
{/* ADSENSE SLOT — descomentar cuando owner indique
<ins className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true">
</ins>
*/}
```

---

## 12. CÓMO AGREGAR UNA CALCULADORA NUEVA

Seguir SIEMPRE este orden. No saltear pasos.

### Paso 1 — Datos fiscales validados

Antes de escribir una línea de código, el owner debe proporcionar los datos
fiscales validados contra fuente oficial. Sin datos validados, no se crea
la calculadora.

### Paso 2 — Agregar al JSON de datos

```json
// /src/lib/data/tax-data.json
{
  "[pais]": {
    "year": 2026,
    "validated": true,
    "source": "[URL fuente oficial]",
    "lastUpdated": "[fecha]",
    // ... datos fiscales
  }
}
```

### Paso 3 — Lógica de cálculo

Crear `/src/lib/calculations/[pais].ts` con:
- Función principal `calcularSueldoNeto[Pais](input, output)`
- Funciones auxiliares para cada impuesto
- Casos de test documentados en comentarios

### Paso 4 — Componente de calculadora

Crear `/src/components/calculators/[Pais]SalaryCalculator.tsx`
Reusar el layout estándar de la sección 9. No inventar layouts nuevos.

### Paso 5 — Página con SEO completo

Crear `/src/app/[locale]/calculadora-sueldo/[pais]/page.tsx` con:
- Metadata completa (title, description, OG, hreflang, canonical)
- Schema JSON-LD (WebApplication + HowTo + FAQPage)
- Breadcrumbs
- Contenido SEO de 700-900 palabras (proporcionado por owner)
- FAQs (mínimo 8 preguntas)
- Internal links a calculadoras relacionadas

### Paso 6 — Actualizar sitemap

El sitemap debe regenerarse automáticamente al agregar nuevas rutas.
Verificar que la nueva URL aparece en /sitemap.xml antes de deployar.

### Paso 7 — Verificación antes de deploy

Correr los test cases del paso 1 manualmente.
Verificar Core Web Vitals con Lighthouse.
Verificar schema con Google Rich Results Test.

---

## 13. ROADMAP DE CALCULADORAS

### Sprint 1 — COMPLETADO ✅
- [x] Calculadora sueldo neto Argentina
- [x] Homepage con grid de calculadoras
- [x] Layout bilingüe /es/ y /en/
- [x] Sistema i18n con next-intl

### Sprint 2 — EN CURSO
- [ ] Corregir datos fiscales Argentina con valores ARCA reales
- [ ] Agregar toggle "¿Te retienen Ganancias?" (default OFF)
- [ ] Agregar input de aporte sindical cuando convenio = ON
- [ ] Reemplazar contenido placeholder con texto real validado
- [ ] Deploy a Vercel con dominio niumeter.com
- [ ] Setup Google Search Console

### Sprint 3 — PRÓXIMO
- [ ] Calculadora aguinaldo Argentina
- [ ] Calculadora indemnización Argentina
- [ ] Calculadora monotributo (categorías A-K)
- [ ] Calculadora freelance Argentina (USD a ARS)

### Sprint 4
- [ ] Calculadora sueldo neto México (ISR + IMSS + INFONAVIT)
- [ ] Calculadora finiquito México
- [ ] Calculadora aguinaldo México

### Sprint 5
- [ ] Calculadora sueldo neto España (IRPF + SS)
- [ ] Calculadora finiquito España
- [ ] Calculadora paro España

### Sprint 6+
- [ ] Colombia, Chile, Perú
- [ ] USA salary calculator por estado (50 páginas programáticas)

---

## 14. REGLAS DE COMPORTAMIENTO PARA ANTIGRAVITY

### Antes de ejecutar cualquier tarea

1. **Leer este archivo completo** si no lo leíste en esta sesión
2. **Preguntar si hay ambigüedad** — nunca asumir
3. **Mostrar el plan antes de ejecutar** — especialmente para tareas
   que tocan más de 3 archivos
4. **Esperar confirmación del owner** antes de proceder

### Cuándo SIEMPRE pausar y preguntar

- Antes de modificar `/src/lib/data/tax-data.json`
- Antes de cambiar la lógica de cálculo de cualquier impuesto
- Antes de cambiar URLs (rompe SEO)
- Antes de instalar una librería nueva no listada en sección 2
- Antes de cambiar la paleta de colores o el diseño global
- Cuando el resultado de un cálculo no coincide con los test cases
- Cuando una tarea requiere crear más de 5 archivos nuevos

### Cuándo NO necesitás preguntar

- Corregir bugs tipográficos en el código
- Agregar comentarios explicativos
- Mejorar performance de un componente sin cambiar su comportamiento
- Corregir errores de TypeScript que no cambian la lógica
- Agregar skeleton loaders o estados de loading

### Formato de respuesta esperado

Cuando recibas una tarea, responder siempre con:

```
📋 ENTENDÍ: [resumen de la tarea en 1 línea]
📁 ARCHIVOS A MODIFICAR: [lista]
⚠️ RIESGOS: [qué podría romperse]
✅ PLAN:
  1. [paso 1]
  2. [paso 2]
  ...
¿Procedo?
```

---

## 15. GLOSARIO DE TÉRMINOS DEL PROYECTO

| Término | Significado |
|---------|-------------|
| Owner | Fermín — el humano que toma decisiones finales |
| Calculadora base | El template reutilizable de una calculadora |
| Dato validado | Dato confirmado contra fuente oficial (no IA) |
| Placeholder | Contenido temporal marcado con [CONTENIDO PENDIENTE] |
| Sprint | Conjunto de tareas agrupadas por funcionalidad |
| YMYL | Your Money Your Life — categoría SEO de alto estándar |
| RPM | Revenue per mille — ingresos por 1000 visitas (AdSense) |
| MNI | Mínimo No Imponible (Argentina — Ganancias) |
| SAC | Sueldo Anual Complementario (aguinaldo) |
| SIRADIG | Sistema de ARCA para informar deducciones de Ganancias |
| ARCA | Agencia de Recaudación y Control Aduanero (ex AFIP) |

---

## 16. CONTACTO Y DECISIONES FINALES

**Todas las decisiones sobre:**
- Datos fiscales a usar
- Contenido SEO a publicar
- Calculadoras a priorizar
- Diseño visual
- Dominios y URLs

**...las toma exclusivamente el owner (Fermín).**

Antigravity es el ejecutor técnico. No toma decisiones de negocio,
contenido ni estrategia por cuenta propia.

---

*Este documento debe mantenerse actualizado. Cada vez que se complete
un sprint o se cambie una decisión técnica importante, actualizar las
secciones correspondientes antes de iniciar la siguiente sesión.*
