/**
 * NIUMETER — Lógica de cálculo de Aguinaldo (SAC) Argentina
 *
 * Base legal:
 *  - Art. 121-122 Ley 20.744 (LCT): SAC = mejor remuneración normal y habitual del semestre / 2
 *  - Art. 123 LCT: pagos el 30/Jun y 31/Dic (o proporcional si no completó el semestre)
 *  - Descuentos: mismos aportes previsionales que el sueldo mensual (jubilación, obra social, PAMI)
 *  - Ganancias: el SAC se suma al ingreso anual y puede impactar en la retención
 *
 * Nota: el cálculo de Ganancias sobre el SAC es complejo (método ARCA acumulativo).
 * Esta calculadora muestra el impacto estimado.
 */

import taxData from "@/lib/data/tax-data";

export interface AguinaldoOptions {
  mejorRemuneracion: number;   // mejor sueldo bruto del semestre (ARS)
  mesesTrabajados: number;     // 1-6 (para prorrateo si no completó el semestre)
  tieneConvenio: boolean;
  aporteGremial: number;       // porcentaje (ej: 2 = 2%)
  // Para estimar el impacto en Ganancias
  sueldoBrutoMensual: number;
  tieneConyuge: boolean;
  cantidadHijos: number;
}

export interface AguinaldoResult {
  sacBruto: number;            // SAC bruto antes de descuentos
  sacNeto: number;             // SAC que te depositan
  montoJubilacion: number;
  montoObraSocial: number;
  montoLey19032: number;
  montoGremial: number;
  totalDescuentosPrevisionales: number;
  porcentajeDescuentos: number;
  esProporcional: boolean;
  mesesTrabajados: number;
  // Ganancias: si el SAC incrementa el anualizado y te genera retención extra
  impactoGanancias: number;
  sacNetoSinGanancias: number;
  aplicaGanancias: boolean;
}

/**
 * Estima el impacto del SAC en el impuesto a las ganancias.
 *
 * Método simplificado:
 *   Recalculamos el impuesto anual con y sin el SAC incluido en el ingreso anual.
 *   La diferencia es la retención aproximada sobre el SAC.
 *
 * El método oficial de ARCA distribuye la retención mes a mes (acumulativo).
 * Esta estimación puede diferir ±5-10%.
 */
function calcularImpactoGanancias(
  sueldoBrutoMensual: number,
  sacBruto: number,
  tieneConyuge: boolean,
  cantidadHijos: number
): { impacto: number; aplicaGanancias: boolean } {
  const ar = taxData.argentina.ganancias;
  const ded = ar.deduccionesAnuales;

  const mni               = ded.minimoNoImponible;
  const deduccionEspecial = ded.deduccionEspecial4taCategoria;
  const deduccionConyuge  = tieneConyuge ? ded.conyuge : 0;
  const deduccionHijos    = cantidadHijos * ded.hijo;
  const totalDeducciones  = mni + deduccionEspecial + deduccionConyuge + deduccionHijos;

  function calcularImpuestoAnual(ingresoAnual: number): number {
    const gananciaNeta = Math.max(0, ingresoAnual - totalDeducciones);
    if (gananciaNeta <= 0) return 0;
    let impuesto = 0;
    for (const tramo of ar.escalaAnual) {
      if (gananciaNeta <= tramo.desde) break;
      const limite = tramo.hasta ?? Infinity;
      impuesto = tramo.fijo + (Math.min(gananciaNeta, limite) - tramo.excedente) * tramo.alicuota;
      if (gananciaNeta <= limite) break;
    }
    return impuesto;
  }

  // Ingreso anual = 12 meses + SAC (el SAC ya está incluido en la proyección × 13 del sueldo mensual)
  // Para aislar el impacto del SAC proporcional calculamos:
  const ingresoAnualBase    = sueldoBrutoMensual * 13; // método estándar (incluye 1 SAC completo)
  const ingresoAnualConSAC  = ingresoAnualBase + sacBruto; // SAC adicional/proporcional

  const impuestoBase = calcularImpuestoAnual(ingresoAnualBase);
  const impuestoConSAC = calcularImpuestoAnual(ingresoAnualConSAC);

  const impactoAnual = Math.max(0, impuestoConSAC - impuestoBase);
  // Atribuimos todo el impacto al SAC
  const impacto = Math.round(impactoAnual);

  return {
    impacto,
    aplicaGanancias: impacto > 0,
  };
}

/**
 * Cálculo principal del SAC neto.
 */
export function calcularAguinaldo(options: AguinaldoOptions): AguinaldoResult {
  const {
    mejorRemuneracion,
    mesesTrabajados,
    tieneConvenio,
    aporteGremial,
    sueldoBrutoMensual,
    tieneConyuge,
    cantidadHijos,
  } = options;

  const ar = taxData.argentina.aportesObligatorios;
  const meses = Math.min(Math.max(1, mesesTrabajados), 6);
  const esProporcional = meses < 6;

  // SAC bruto = mejor remuneración / 2 × (meses trabajados / 6)
  const sacBruto = Math.round((mejorRemuneracion / 2) * (meses / 6));

  // Aportes previsionales sobre el SAC bruto
  const montoJubilacion = Math.round(sacBruto * ar.jubilacion);
  const montoObraSocial = Math.round(sacBruto * ar.obraSocial);
  const montoLey19032   = Math.round(sacBruto * ar.ley19032_PAMI);

  let montoGremial = 0;
  if (tieneConvenio && aporteGremial > 0) {
    montoGremial = Math.round(sacBruto * (aporteGremial / 100));
  }

  const totalDescuentosPrevisionales =
    montoJubilacion + montoObraSocial + montoLey19032 + montoGremial;

  // Impacto Ganancias sobre el SAC
  const { impacto: impactoGanancias, aplicaGanancias } = calcularImpactoGanancias(
    sueldoBrutoMensual,
    sacBruto,
    tieneConyuge,
    cantidadHijos
  );

  const totalDescuentos = totalDescuentosPrevisionales + impactoGanancias;

  const sacNetoSinGanancias = Math.max(0, sacBruto - totalDescuentosPrevisionales);
  const sacNeto = Math.max(0, sacBruto - totalDescuentos);

  return {
    sacBruto,
    sacNeto,
    montoJubilacion,
    montoObraSocial,
    montoLey19032,
    montoGremial,
    totalDescuentosPrevisionales,
    porcentajeDescuentos: sacBruto > 0 ? (totalDescuentos / sacBruto) * 100 : 0,
    esProporcional,
    mesesTrabajados: meses,
    impactoGanancias,
    sacNetoSinGanancias,
    aplicaGanancias,
  };
}

export { formatARS, formatNumber, parseFormattedNumber } from "./argentina-salary";
