/**
 * NIUMETER — Lógica de cálculo de indemnización por despido, Argentina
 *
 * Base legal:
 *  - Art. 245 LCT: indemnización por antigüedad
 *  - Art. 231-232 LCT: preaviso
 *  - Art. 233 LCT: integración mes de despido
 *  - Art. 123 LCT: SAC proporcional
 *  - Art. 150 LCT: vacaciones proporcionales
 *
 * SMVM vigente: $367.800 — Resolución 9/2025 — Boletín Oficial 03/12/2025
 * Tope indemnización (67 × SMVM): $24.642.600
 *
 * Test cases documentados al final del archivo.
 */

import taxData from "@/lib/data/tax-data";

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type TipoDespido = "sin_causa" | "con_causa" | "renuncia";

export interface IndemnizacionOptions {
  mejorRemuneracion: number;   // ARS — mejor remuneración mensual normal y habitual
  fechaIngreso: string;        // ISO date string: "YYYY-MM-DD"
  fechaDespido: string;        // ISO date string: "YYYY-MM-DD"
  tipoDespido: TipoDespido;
  pravisoTrabajado: boolean;   // true = ya trabajó el preaviso (no corresponde pago)
  pravisoDinero: boolean;      // true = recibió preaviso en dinero (no se suma)
}

export interface AntiguedadResult {
  anos: number;                // años completos (fracción >3 meses ya incluida)
  meses: number;               // meses de la fracción (0-11), para mostrar en UI
  anosParaCalculo: number;     // años a usar en el cálculo (con redondeo)
  totalMeses: number;          // total de meses (para info)
}

export interface IndemnizacionResult {
  // Antigüedad
  antiguedad: AntiguedadResult;

  // Conceptos
  indemnizacionAntiguedad: number;   // base × años (0 si con causa o renuncia)
  preaviso: number;                  // monto de preaviso (0 si otorgado)
  mesesPreaviso: number;             // 0, 0.5, 1 o 2
  integracionMes: number;            // integración mes de despido
  sacSobrePreaviso: number;          // SAC proporcional sobre preaviso
  vacacionesProporcionales: number;  // vacaciones no gozadas

  // Totales
  totalBruto: number;

  // Meta
  baseCalculo: number;               // base usada (puede estar topada)
  topeAplicado: boolean;             // true si la base fue topada por SMVM
  topeMaximo: number;                // 67 × SMVM
  tipoDespido: TipoDespido;
  diasIntegracion: number;           // días restantes del mes
  diasVacaciones: number;            // días hábiles de vacaciones
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Calcula antigüedad entre dos fechas.
 * Fracción > 3 meses → redondea a año completo (Art. 245 LCT).
 */
export function calcularAntiguedad(
  fechaIngreso: string,
  fechaDespido: string
): AntiguedadResult {
  const ingreso = new Date(fechaIngreso + "T00:00:00");
  const despido = new Date(fechaDespido + "T00:00:00");

  let anos = despido.getFullYear() - ingreso.getFullYear();
  let meses = despido.getMonth() - ingreso.getMonth();
  const dias = despido.getDate() - ingreso.getDate();

  // Ajustar si los días son negativos
  if (dias < 0) meses -= 1;
  // Ajustar si los meses son negativos
  if (meses < 0) {
    anos -= 1;
    meses += 12;
  }

  const totalMeses = anos * 12 + meses;

  // Fracción: si es > 3 meses, redondea a un año más (Art. 245 LCT)
  let anosParaCalculo = anos;
  if (meses > 3) {
    anosParaCalculo = anos + 1;
  }

  // Mínimo 1 año para el cálculo si hay alguna fracción > 3 meses
  if (anosParaCalculo < 1 && (meses > 3 || (anos === 0 && meses > 3))) {
    anosParaCalculo = 1;
  }

  // Garantizar mínimo de 1 para el cálculo si hay empleo
  if (anosParaCalculo < 1) anosParaCalculo = 1;

  return { anos, meses, anosParaCalculo, totalMeses };
}

/**
 * Días de preaviso según antigüedad (Art. 231-232 LCT).
 * Devuelve el número de meses (0.5 = 15 días).
 */
function calcularMesesPreaviso(totalMeses: number): number {
  if (totalMeses < 3) return 0.5;       // menos de 3 meses: 15 días
  if (totalMeses < 60) return 1;        // entre 3 meses y 5 años: 1 mes
  return 2;                             // más de 5 años: 2 meses
}

/**
 * Días de vacaciones proporcionales según antigüedad (Art. 150 LCT).
 * Devuelve días hábiles de vacaciones que corresponden.
 */
function calcularDiasVacaciones(anos: number): number {
  if (anos < 5) return 14;
  if (anos < 10) return 21;
  if (anos < 20) return 28;
  return 35;
}

/**
 * Días restantes en el mes de despido (para integración).
 * Si el despido es el día 1, puede ser 0 por convención.
 */
function calcularDiasIntegracion(fechaDespido: string): number {
  const despido = new Date(fechaDespido + "T00:00:00");
  const dia = despido.getDate();
  const ultimoDia = new Date(despido.getFullYear(), despido.getMonth() + 1, 0).getDate();
  const restantes = ultimoDia - dia;
  return Math.max(0, restantes);
}

// ─── Función principal ────────────────────────────────────────────────────────

/**
 * Calcula la liquidación final por despido.
 *
 * Aplica Art. 245 LCT para despido sin causa.
 * Con causa y renuncia: solo SAC proporcional y vacaciones.
 */
export function calcularIndemnizacion(options: IndemnizacionOptions): IndemnizacionResult {
  const {
    mejorRemuneracion,
    fechaIngreso,
    fechaDespido,
    tipoDespido,
    pravisoTrabajado,
    pravisoDinero,
  } = options;

  const smvm = taxData.argentina.smvm;
  const topeMaximo = smvm.topeIndemnizacion; // 67 × SMVM = $24.642.600

  // ── Antigüedad ──────────────────────────────────────────────────────────────
  const antiguedad = calcularAntiguedad(fechaIngreso, fechaDespido);

  // ── Base de cálculo (con tope Art. 245) ─────────────────────────────────────
  const baseCalculo = Math.min(mejorRemuneracion, topeMaximo);
  const topeAplicado = mejorRemuneracion > topeMaximo;

  // ── Días de integración ──────────────────────────────────────────────────────
  const diasIntegracion = calcularDiasIntegracion(fechaDespido);

  // ── Vacaciones proporcionales ────────────────────────────────────────────────
  const diasVacaciones = calcularDiasVacaciones(antiguedad.anos);
  // Proporcional: días / 365 × meses trabajados en el año... 
  // Usamos la convención: vacaciones proporcionales = (diasVacaciones / 12) × mesesEnElAño
  // Fórmula aplicada: (sueldo / 25) × (diasVacaciones proporcionales al año)
  // Proporcional al año en curso: (mesesTrabajadosEsteAño / 12) × diasVacaciones
  const despidoDate = new Date(fechaDespido + "T00:00:00");
  const mesesEnElAno = despidoDate.getMonth() + 1; // enero=0 → mes 1
  const diasVacacionesProporcionales = Math.round((diasVacaciones / 12) * mesesEnElAno);
  const vacacionesProporcionales = Math.round((mejorRemuneracion / 25) * diasVacacionesProporcionales);

  // ── Conceptos según tipo de despido ─────────────────────────────────────────

  let indemnizacionAntiguedad = 0;
  let preaviso = 0;
  let mesesPreaviso = 0;
  let integracionMes = 0;
  let sacSobrePreaviso = 0;

  if (tipoDespido === "sin_causa") {
    // Indemnización por antigüedad (Art. 245 LCT)
    // Mínimo: 1 mes de sueldo (sin tope)
    const montoAntiguedad = baseCalculo * antiguedad.anosParaCalculo;
    indemnizacionAntiguedad = Math.max(montoAntiguedad, mejorRemuneracion);

    // Preaviso (Art. 231-232 LCT) — solo si no fue otorgado ni pagado
    if (!pravisoTrabajado && !pravisoDinero) {
      mesesPreaviso = calcularMesesPreaviso(antiguedad.totalMeses);
      preaviso = Math.round(mejorRemuneracion * mesesPreaviso);

      // SAC sobre preaviso: (preaviso / 12) × meses de preaviso
      sacSobrePreaviso = Math.round((preaviso / 12) * mesesPreaviso);
    }

    // Integración mes de despido (Art. 233 LCT)
    integracionMes = Math.round((mejorRemuneracion / 30) * diasIntegracion);
  }

  // SAC proporcional sobre preaviso ya calculado arriba.
  // (Para con causa y renuncia: no hay preaviso, por lo tanto SAC sobre preaviso = 0)

  const totalBruto =
    indemnizacionAntiguedad +
    preaviso +
    integracionMes +
    sacSobrePreaviso +
    vacacionesProporcionales;

  return {
    antiguedad,
    indemnizacionAntiguedad,
    preaviso,
    mesesPreaviso,
    integracionMes,
    sacSobrePreaviso,
    vacacionesProporcionales,
    totalBruto,
    baseCalculo,
    topeAplicado,
    topeMaximo,
    tipoDespido,
    diasIntegracion,
    diasVacaciones: diasVacacionesProporcionales,
  };
}

export { formatARS, formatNumber, parseFormattedNumber } from "./argentina-salary";

/*
 * ─── TEST CASES ──────────────────────────────────────────────────────────────
 *
 * Caso A: Sueldo $2M, Ingreso 01/01/2021, Despido 15/06/2026, sin causa
 *   Antigüedad: 5 años + 5 meses 14 días → 5 meses > 3 → redondea a 6 años
 *   NOTA: el test original indicaba 5 años; la ley establece 6.
 *   Indemnización: $2M × 6 = $12.000.000 (base < tope $24.642.600)
 *   Preaviso: 2 meses (>5 años) = $4.000.000
 *   Integración junio: ($2M/30) × 15 = $1.000.000
 *   SAC sobre preaviso: ($4M/12) × 2 = $666.666
 *   Vacaciones: (14/12) × 6 meses = 7 días → ($2M/25) × 7 = $560.000
 *   Total: ~$18.226.666
 *
 * Caso B: Sueldo $1.5M, Ingreso 01/03/2026, Despido 01/06/2026, sin causa
 *   Antigüedad: 3 meses exactos → NO > 3 meses → NO redondea → mínimo 1 año
 *   Indemnización: $1.5M × 1 = $1.500.000 (mínimo 1 mes aplicado)
 *   Preaviso: 1 mes = $1.500.000
 *   Integración junio: ($1.5M/30) × 29 = $1.450.000
 *   SAC sobre preaviso: ($1.5M/12) × 1 = $125.000
 *   Total: ~$4.575.000
 *
 * Caso C: Renuncia
 *   Indemnización: $0, Preaviso: $0
 *   Solo vacaciones proporcionales.
 */
