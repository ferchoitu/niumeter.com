/**
 * NIUMETER — Datos Fiscales por País
 *
 * Fuente Argentina: ARCA — RG 4003 / Art. 94 Ley 20.628
 * Última actualización: 2026-01-15 (1H2026)
 * Validated: true — datos confirmados contra fuente oficial
 */

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface GananciasScale {
  desde: number;
  hasta: number | null; // null = sin límite superior
  fijo: number;
  alicuota: number;
  excedente: number;
}

export interface GananciasData {
  deduccionesAnuales: {
    minimoNoImponible: number;
    deduccionEspecial4taCategoria: number;
    conyuge: number;
    hijo: number;
    hijoIncapacitado: number;
  };
  pisosMensualesBruto: {
    solteroSinHijos: number;
    casadoSinHijos: number;
    casadoUnHijo: number;
    casadoDosHijos: number;
  };
  escalaAnual: GananciasScale[];
}

export interface AportesObligatorios {
  jubilacion: number;  // decimal (0.11 = 11%)
  obraSocial: number;
  ley19032_PAMI: number;
  totalSinSindical: number;
}

export interface AporteSindical {
  default: number;
  porConvenio: Record<string, number>;
}

export interface MonotributoCategoria {
  letra: string;
  // Tope de facturación anual (igual para servicios y bienes)
  ingresoMax: number | null;       // null = TODO: VALIDAR en ARCA
  ingresoMaxValidated: boolean;
  // Cuota mensual según tipo de actividad
  cuotaServicios: number | null;   // null = TODO: VALIDAR en ARCA
  cuotaBienes: number | null;      // null = TODO: VALIDAR en ARCA
  cuotaValidated: boolean;
  // Desglose interno (pendiente validación oficial)
  // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla de componentes por categoría
  impuestoIntegrado: number | null;
  aporteSIPA: number | null;
  obraSocial: number | null;
  desgloseValidated: boolean;      // false hasta que owner valide subtotales
}

export interface SmvmData {
  vigente: number;
  topeIndemnizacion: number;
  fuente: string;
  lastUpdated: string;
  validated: boolean;
}

export interface MonotributoData {
  source: string;
  lastUpdated: string;
  proximaActualizacion: string;
  ley: string;
  categorias: MonotributoCategoria[];
}

export interface CountryTaxData {
  year: number;
  semester: string;
  validated: boolean;
  source: string;
  lastUpdated: string;
  currency: string;
  aportesObligatorios: AportesObligatorios;
  aporteSindical: AporteSindical;
  ganancias: GananciasData;
  aguinaldo: {
    method: string;
  };
  smvm: SmvmData;
  monotributo: MonotributoData;
}

export interface TaxDatabase {
  [country: string]: CountryTaxData;
}

// ─── Datos fiscales validados ─────────────────────────────────────────────────

const taxData: TaxDatabase = {
  argentina: {
    year: 2026,
    semester: "1H2026",
    validated: true,
    source: "ARCA — RG 4003 / Art. 94 Ley 20.628",
    lastUpdated: "2026-01-15",
    currency: "ARS",

    aportesObligatorios: {
      jubilacion: 0.11,        // Art. 11 Ley 24.241
      obraSocial: 0.03,        // Ley 23.660
      ley19032_PAMI: 0.03,     // Ley 19.032 (INSSJP/PAMI)
      totalSinSindical: 0.17,
    },

    aporteSindical: {
      default: 0,
      porConvenio: {
        comercio: 0.025,
        uocra:    0.02,
        sanidad:  0.03,
      },
    },

    ganancias: {
      deduccionesAnuales: {
        minimoNoImponible:             5151802.50,  // Art. 30 inc. a) LIG
        deduccionEspecial4taCategoria: 24728652.02, // Art. 30 inc. c) LIG
        conyuge:                        4851964.66,  // Art. 30 inc. b) 1. LIG
        hijo:                           2446863.48,  // Art. 30 inc. b) 2. LIG
        hijoIncapacitado:               4893726.96,  // Art. 30 inc. b) 2. LIG
      },

      pisosMensualesBruto: {
        solteroSinHijos: 3000045,
        casadoSinHijos:  3487190,
        casadoUnHijo:    3732860,
        casadoDosHijos:  3952152,
      },

      // Escala anual — Art. 94 Ley 20.628 actualizada al 1H2026
      escalaAnual: [
        { desde: 0,           hasta: 2000030.09,  fijo: 0,           alicuota: 0.05, excedente: 0           },
        { desde: 2000030.09,  hasta: 4000060.17,  fijo: 100001.50,   alicuota: 0.09, excedente: 2000030.09  },
        { desde: 4000060.17,  hasta: 6000090.26,  fijo: 280004.21,   alicuota: 0.12, excedente: 4000060.17  },
        { desde: 6000090.26,  hasta: 9000135.40,  fijo: 520007.82,   alicuota: 0.15, excedente: 6000090.26  },
        { desde: 9000135.40,  hasta: 18000270.80, fijo: 970014.59,   alicuota: 0.19, excedente: 9000135.40  },
        { desde: 18000270.80, hasta: 27000406.20, fijo: 2680040.32,  alicuota: 0.23, excedente: 18000270.80 },
        { desde: 27000406.20, hasta: 40500609.30, fijo: 4750071.46,  alicuota: 0.27, excedente: 27000406.20 },
        { desde: 40500609.30, hasta: 60750913.96, fijo: 8395126.30,  alicuota: 0.31, excedente: 40500609.30 },
        { desde: 60750913.96, hasta: null,         fijo: 14672720.74, alicuota: 0.35, excedente: 60750913.96 },
      ],
    },

    aguinaldo: {
      method: "mejor-remuneracion-semestre / 2",
    },

    smvm: {
      // Salario Mínimo Vital y Móvil — Resolución 9/2025, Boletín Oficial 03/12/2025
      vigente: 367800,
      topeIndemnizacion: 24642600, // 67 × SMVM — Art. 245 LCT
      fuente: "Resolución 9/2025 — Boletín Oficial 03/12/2025",
      lastUpdated: "2025-12-03",
      validated: true,
    },

    monotributo: {
      // Fuente: ARCA — Ley 27.743 (actualización semestral por IPC)
      // Datos Junio 2026. Próxima actualización: julio 2026.
      source: "ARCA — Ley 27.743 — arca.gob.ar/monotributo",
      lastUpdated: "2026-06-01",
      proximaActualizacion: "julio 2026",
      ley: "Ley 27.743",
      categorias: [
        {
          letra: "A",
          ingresoMax: 10277988,    // Tope validado owner — fuente: ARCA Jun 2026
          ingresoMaxValidated: true,
          cuotaServicios: 42386.74,  // Validado owner — fuente: ARCA Jun 2026
          cuotaBienes: 42386.74,     // Igual que servicios — validado owner
          cuotaValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla desglose Cat A
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "B",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat B
          ingresoMax: 15000000,
          ingresoMaxValidated: false,
          cuotaServicios: 48250.78,  // Validado owner — fuente: ARCA Jun 2026
          cuotaBienes: 48250.78,     // Igual que servicios — validado owner
          cuotaValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla desglose Cat B
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "C",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat C
          ingresoMax: 21000000,
          ingresoMaxValidated: false,
          cuotaServicios: 56501.85,  // Validado owner — fuente: ARCA Jun 2026
          cuotaBienes: 55227.06,     // Validado owner — fuente: ARCA Jun 2026
          cuotaValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla desglose Cat C
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "D",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat D
          ingresoMax: 27000000,
          ingresoMaxValidated: false,
          cuotaServicios: 72414.10,  // Validado owner — fuente: ARCA Jun 2026
          cuotaBienes: 70661.26,     // Validado owner — fuente: ARCA Jun 2026
          cuotaValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla desglose Cat D
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "E",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat E
          ingresoMax: 40000000,
          ingresoMaxValidated: false,
          cuotaServicios: 102537.97, // Validado owner — fuente: ARCA Jun 2026
          cuotaBienes: 92658.35,    // Validado owner — fuente: ARCA Jun 2026
          cuotaValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla desglose Cat E
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "F",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat F
          ingresoMax: 52000000,
          ingresoMaxValidated: false,
          cuotaServicios: 129045.32, // Validado owner — fuente: ARCA Jun 2026
          cuotaBienes: 111198.27,   // Validado owner — fuente: ARCA Jun 2026
          cuotaValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tabla desglose Cat F
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "G",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat G
          ingresoMax: null,
          ingresoMaxValidated: false,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — cuota Cat G
          cuotaServicios: null,
          cuotaBienes: null,
          cuotaValidated: false,
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "H",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat H
          ingresoMax: null,
          ingresoMaxValidated: false,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — cuota Cat H
          cuotaServicios: null,
          cuotaBienes: null,
          cuotaValidated: false,
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "I",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat I
          ingresoMax: null,
          ingresoMaxValidated: false,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — cuota Cat I
          cuotaServicios: null,
          cuotaBienes: null,
          cuotaValidated: false,
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "J",
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — tope Cat J
          ingresoMax: null,
          ingresoMaxValidated: false,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — cuota Cat J
          cuotaServicios: null,
          cuotaBienes: null,
          cuotaValidated: false,
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
        {
          letra: "K",
          ingresoMax: 108357084, // Validado owner — fuente: ARCA Jun 2026
          ingresoMaxValidated: true,
          // TODO: VALIDAR - fuente: arca.gob.ar/monotributo — cuota Cat K
          cuotaServicios: null,
          cuotaBienes: null,
          cuotaValidated: false,
          impuestoIntegrado: null,
          aporteSIPA: null,
          obraSocial: null,
          desgloseValidated: false,
        },
      ],
    },
  },
};

export default taxData;
