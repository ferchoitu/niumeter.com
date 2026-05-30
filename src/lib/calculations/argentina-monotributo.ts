/**
 * NIUMETER — Lógica de cálculo de Monotributo, Argentina
 *
 * Base legal:
 *  - Ley 27.743 (actualización semestral por IPC)
 *  - Datos de cuotas: Junio 2026 — fuente: ARCA
 *
 * La categoría se determina por el parámetro que implique la mayor categoría:
 *  1. Ingresos brutos anuales
 *  2. Cantidad de empleados (categoría mínima según tabla)
 *  3. Superficie afectada (m²) — categoría mínima según tabla
 *
 * NOTA: Las tablas de categoría mínima por empleados y superficie
 * requieren validación oficial en ARCA. Por ahora se aplica la
 * lógica de ingresos únicamente si los datos de empleados/superficie
 * no están validados.
 *
 * Test cases al final del archivo.
 */

import taxData from "@/lib/data/tax-data";
import type { MonotributoCategoria } from "@/lib/data/tax-data";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type TipoActividad = "servicios" | "bienes";

export interface MonotributoInput {
  ingresosBrutosAnuales: number;
  tipoActividad: TipoActividad;
  tieneEmpleados: boolean;
  cantidadEmpleados: number;      // 0 si no tiene
  tieneSuperficie: boolean;
  superficieM2: number;           // 0 si no tiene
}

export interface MonotributoResult {
  // Categoría calculada
  categoria: MonotributoCategoria;
  categoriaIndex: number;          // índice en array (0=A, 1=B, ...)

  // Cuota según tipo de actividad
  cuotaMensual: number | null;     // null si no validada
  cuotaAlternativa: number | null; // cuota del otro tipo (para comparar), null si no validada
  cuotaValidated: boolean;

  // Tope de facturación
  topeAnual: number | null;        // null si no validado
  topeValidated: boolean;
  margenRestante: number | null;   // topeAnual - ingresosBrutosAnuales, null si tope no validado

  // Desglose (pendiente)
  desgloseValidated: boolean;

  // Contexto de categorías vecinas
  categoriaAnterior: MonotributoCategoria | null;
  categoriaSiguiente: MonotributoCategoria | null;
  montoParaSiguiente: number | null; // cuánto más para subir, null si no aplica

  // Superó el tope máximo
  superaTopeMaximo: boolean;

  // Factores que determinaron la categoría
  factorDeterminante: "ingresos" | "empleados" | "superficie";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

export function formatARS(valor: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

export function formatNumber(valor: number): string {
  return new Intl.NumberFormat("es-AR").format(valor);
}

export function parseFormattedNumber(str: string): number {
  // Eliminar puntos de miles y reemplazar coma decimal
  const clean = str.replace(/\./g, "").replace(",", ".");
  const num = parseFloat(clean);
  return isNaN(num) ? 0 : num;
}

// ─── Categoría mínima por empleados ──────────────────────────────────────────
//
// TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla categoría mínima por empleados
// La lógica abajo es una aproximación. No calcular con esto hasta validar.
//
// function categoriaMinimaPorEmpleados(cantidad: number): number {
//   if (cantidad <= 0) return 0;
//   if (cantidad === 1) return 2; // mínimo Cat C (índice 2)
//   if (cantidad === 2) return 3; // mínimo Cat D (índice 3)
//   return 4; // Cat E o superior
// }

// ─── Categoría mínima por superficie ─────────────────────────────────────────
//
// TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla categoría mínima por m²
// La lógica abajo es una aproximación. No calcular con esto hasta validar.
//
// function categoriaMinimaPorSuperficie(m2: number): number {
//   if (m2 <= 0) return 0;
//   if (m2 <= 30) return 0;   // A
//   if (m2 <= 45) return 1;   // B
//   if (m2 <= 60) return 2;   // C
//   if (m2 <= 85) return 3;   // D
//   if (m2 <= 110) return 4;  // E
//   if (m2 <= 150) return 5;  // F
//   return 6;                 // G+
// }

// ─── Función principal ────────────────────────────────────────────────────────

export function determinarCategoriaMonotributo(input: MonotributoInput): MonotributoResult | null {
  const { ingresosBrutosAnuales, tipoActividad } = input;
  const categorias = taxData.argentina.monotributo.categorias;

  if (ingresosBrutosAnuales < 0) return null;

  // ── Determinar tope máximo (último categoría con ingresoMax validado) ────────
  // Categoría K tiene ingresoMax = 108.357.084
  const topeMaximoK = categorias[categorias.length - 1].ingresoMax;
  const superaTopeMaximo = topeMaximoK !== null && ingresosBrutosAnuales > topeMaximoK;

  if (superaTopeMaximo) {
    // Retorna resultado especial indicando que supera monotributo
    const catK = categorias[categorias.length - 1];
    return {
      categoria: catK,
      categoriaIndex: categorias.length - 1,
      cuotaMensual: catK.cuotaServicios,
      cuotaAlternativa: catK.cuotaBienes,
      cuotaValidated: catK.cuotaValidated,
      topeAnual: catK.ingresoMax,
      topeValidated: catK.ingresoMaxValidated,
      margenRestante: null,
      desgloseValidated: catK.desgloseValidated,
      categoriaAnterior: categorias[categorias.length - 2] ?? null,
      categoriaSiguiente: null,
      montoParaSiguiente: null,
      superaTopeMaximo: true,
      factorDeterminante: "ingresos",
    };
  }

  // ── Buscar categoría por ingresos ───────────────────────────────────────────
  // Categoría = primera cuyo ingresoMax >= ingresosBrutosAnuales
  // Si ingresoMax es null (pendiente), asumimos que el usuario cae en esa categoría
  // solo si ya superó todas las anteriores con ingresoMax definido.

  let indexPorIngresos = -1;

  for (let i = 0; i < categorias.length; i++) {
    const cat = categorias[i];
    if (cat.ingresoMax === null) {
      // Tope no validado — el usuario cae aquí si superó todas las previas validadas
      indexPorIngresos = i;
      break;
    }
    if (ingresosBrutosAnuales <= cat.ingresoMax) {
      indexPorIngresos = i;
      break;
    }
  }

  // Si no encontró ninguna (no debería pasar tras el check de superaTopeMaximo)
  if (indexPorIngresos === -1) {
    indexPorIngresos = categorias.length - 1;
  }

  // ── Factor determinante ─────────────────────────────────────────────────────
  // TODO: cuando se validen las tablas de empleados/superficie, aplicar aquí
  // el máximo entre indexPorIngresos, indexPorEmpleados, indexPorSuperficie
  const indexFinal = indexPorIngresos;
  const factorDeterminante: "ingresos" | "empleados" | "superficie" = "ingresos";

  const categoria = categorias[indexFinal];

  // ── Cuota según tipo de actividad ───────────────────────────────────────────
  const cuotaMensual = tipoActividad === "servicios"
    ? categoria.cuotaServicios
    : categoria.cuotaBienes;

  const cuotaAlternativa = tipoActividad === "servicios"
    ? categoria.cuotaBienes
    : categoria.cuotaServicios;

  // ── Margen restante ─────────────────────────────────────────────────────────
  const margenRestante = categoria.ingresoMax !== null
    ? Math.max(0, categoria.ingresoMax - ingresosBrutosAnuales)
    : null;

  // ── Categorías vecinas ──────────────────────────────────────────────────────
  const categoriaAnterior = indexFinal > 0 ? categorias[indexFinal - 1] : null;
  const categoriaSiguiente = indexFinal < categorias.length - 1
    ? categorias[indexFinal + 1]
    : null;

  // ── Cuánto falta para subir ─────────────────────────────────────────────────
  let montoParaSiguiente: number | null = null;
  if (categoriaSiguiente && categoria.ingresoMax !== null) {
    montoParaSiguiente = categoria.ingresoMax - ingresosBrutosAnuales + 1;
  }

  return {
    categoria,
    categoriaIndex: indexFinal,
    cuotaMensual,
    cuotaAlternativa,
    cuotaValidated: categoria.cuotaValidated,
    topeAnual: categoria.ingresoMax,
    topeValidated: categoria.ingresoMaxValidated,
    margenRestante,
    desgloseValidated: categoria.desgloseValidated,
    categoriaAnterior,
    categoriaSiguiente,
    montoParaSiguiente,
    superaTopeMaximo: false,
    factorDeterminante,
  };
}

/*
 * ─── TEST CASES ──────────────────────────────────────────────────────────────
 *
 * Caso A: Ingresos $8.000.000, servicios, sin empleados
 *   → ingresoMax Cat A = $10.277.988 → Cat A ✅
 *   → cuota = $42.386,74
 *   → margen = $10.277.988 - $8.000.000 = $2.277.988
 *
 * Caso B: Ingresos $13.000.000, servicios
 *   → supera Cat A ($10.277.988) → Cat B ($15.000.000 tope pendiente)
 *   → cuota = $48.250,78
 *
 * Caso C: Ingresos $25.000.000, bienes
 *   → supera Cat C ($21.000.000) → Cat D ($27.000.000 tope pendiente)
 *   → cuota bienes Cat D = $70.661,26
 *
 * Caso D: Ingresos $120.000.000
 *   → supera tope K ($108.357.084) → superaTopeMaximo = true
 *   → Alerta régimen general
 */
