/**
 * NIUMETER — Lógica de cálculo de sueldo neto Argentina
 *
 * Funciones puras sin side effects. Todas las cifras se toman de tax-data.ts
 * que contiene los valores con TODO para validación oficial.
 *
 * TODO: validar toda la lógica contra la normativa laboral argentina vigente.
 */

import taxData from "@/lib/data/tax-data";

export interface SalaryOptions {
  sueldoBruto: number;
  tieneConvenio: boolean;
  aporteGremial: number;       // porcentaje como número (2 = 2%)
  tieneConyuge: boolean;
  cantidadHijos: number;
  descuentoAdicional: number;  // monto en ARS
}

export interface DesglosDescuento {
  label: string;
  monto: number;
  porcentaje: number; // porcentaje SOBRE el bruto
}

export interface SalaryResult {
  bruto: number;
  neto: number;
  totalDescuentos: number;
  porcentajeDescuentos: number;
  desglose: DesglosDescuento[];
  ganancias: number;
  netoSinGanancias: number;
  aplicaGanancias: boolean;
  gananciaImponible: number;
}

/**
 * Calcula el impuesto a las ganancias por el método de escala progresiva.
 * Base legal: Art. 94 Ley 20.628 — RG 4003 ARCA — vigencia 1H2026
 *
 * NOTA: El cálculo es una estimación mensual (impuesto anual / 12).
 * El método oficial de ARCA es acumulativo mensual. Diferencia estimada: 5-10%.
 * El disclaimer en UI cubre esta diferencia.
 */
export function calcularGanancias(
  sueldoBruto: number,
  tieneConyuge: boolean,
  cantidadHijos: number
): { impuesto: number; imponible: number; aplicaGanancias: boolean } {
  const ar = taxData.argentina.ganancias;
  const ded = ar.deduccionesAnuales;

  // 1. Remuneración anual proyectada (× 13 incluye SAC)
  const remuneracionAnual = sueldoBruto * 13;

  // 2. Deducciones personales anuales (Art. 30 LIG)
  //    MNI + Deducción especial 4ta categoría + cargas de familia
  const mni              = ded.minimoNoImponible;
  const deduccionEspecial = ded.deduccionEspecial4taCategoria;
  const deduccionConyuge = tieneConyuge ? ded.conyuge : 0;
  const deduccionHijos   = cantidadHijos * ded.hijo;
  const totalDeducciones = mni + deduccionEspecial + deduccionConyuge + deduccionHijos;

  // 3. Ganancia neta imponible anual
  const gananciaNeta = Math.max(0, remuneracionAnual - totalDeducciones);

  if (gananciaNeta <= 0) {
    return { impuesto: 0, imponible: 0, aplicaGanancias: false };
  }

  // 4. Aplicar escala progresiva (Art. 94 Ley 20.628)
  let impuestoAnual = 0;
  for (const tramo of ar.escalaAnual) {
    if (gananciaNeta <= tramo.desde) break;
    const limite = tramo.hasta ?? Infinity;
    impuestoAnual = tramo.fijo + (Math.min(gananciaNeta, limite) - tramo.excedente) * tramo.alicuota;
    if (gananciaNeta <= limite) break;
  }

  // 5. Impuesto mensual estimado
  const impuestoMensual = impuestoAnual / 12;

  return {
    impuesto: Math.round(impuestoMensual),
    imponible: Math.round(gananciaNeta / 12),
    aplicaGanancias: impuestoMensual > 0,
  };
}

/**
 * Cálculo principal de sueldo neto.
 * Devuelve un objeto completo con todos los descuentos desglosados.
 */
export function calcularSueldoNeto(options: SalaryOptions): SalaryResult {
  const {
    sueldoBruto,
    tieneConvenio,
    aporteGremial,
    tieneConyuge,
    cantidadHijos,
    descuentoAdicional,
  } = options;

  const ar = taxData.argentina.aportesObligatorios;
  const desglose: DesglosDescuento[] = [];

  // Aportes previsionales sobre el bruto
  const montoJubilacion = Math.round(sueldoBruto * ar.jubilacion);
  const montoObraSocial = Math.round(sueldoBruto * ar.obraSocial);
  const montoLey19032   = Math.round(sueldoBruto * ar.ley19032_PAMI);

  desglose.push({
    label: "Jubilación (11%)",
    monto: montoJubilacion,
    porcentaje: ar.jubilacion * 100,
  });
  desglose.push({
    label: "Obra Social (3%)",
    monto: montoObraSocial,
    porcentaje: ar.obraSocial * 100,
  });
  desglose.push({
    label: "Ley 19.032 - INSSJP (3%)",
    monto: montoLey19032,
    porcentaje: ar.ley19032_PAMI * 100,
  });

  // Aporte gremial (solo si está en convenio)
  let montoGremial = 0;
  if (tieneConvenio && aporteGremial > 0) {
    montoGremial = Math.round(sueldoBruto * (aporteGremial / 100));
    desglose.push({
      label: `Aporte gremial (${aporteGremial}%)`,
      monto: montoGremial,
      porcentaje: aporteGremial,
    });
  }

  // Ganancias
  const { impuesto: montoGanancias, imponible, aplicaGanancias } = calcularGanancias(
    sueldoBruto,
    tieneConyuge,
    cantidadHijos
  );

  if (aplicaGanancias) {
    desglose.push({
      label: "Impuesto a las Ganancias",
      monto: montoGanancias,
      porcentaje: (montoGanancias / sueldoBruto) * 100,
    });
  }

  // Descuento adicional
  if (descuentoAdicional > 0) {
    desglose.push({
      label: "Descuento adicional",
      monto: descuentoAdicional,
      porcentaje: (descuentoAdicional / sueldoBruto) * 100,
    });
  }

  // Totales
  const totalDescuentos =
    montoJubilacion +
    montoObraSocial +
    montoLey19032 +
    montoGremial +
    montoGanancias +
    descuentoAdicional;

  const neto = Math.max(0, sueldoBruto - totalDescuentos);
  const netoSinGanancias = Math.max(0, sueldoBruto - totalDescuentos + montoGanancias);

  return {
    bruto: sueldoBruto,
    neto,
    totalDescuentos,
    porcentajeDescuentos: (totalDescuentos / sueldoBruto) * 100,
    desglose,
    ganancias: montoGanancias,
    netoSinGanancias,
    aplicaGanancias,
    gananciaImponible: imponible,
  };
}

/**
 * Formatea un número como moneda ARS con separadores de miles.
 */
export function formatARS(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formatea un número con separadores de miles (sin símbolo de moneda).
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-AR").format(value);
}

/**
 * Parsea un string con separadores de miles a número.
 */
export function parseFormattedNumber(value: string): number {
  const cleaned = value.replace(/\./g, "").replace(/,/g, ".");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}
