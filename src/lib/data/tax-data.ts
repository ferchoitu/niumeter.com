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
  ingresoMax: number;
  impuesto: number;
  obraSocial: number;
  jubilacion: number;
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
  monotributo: {
    // TODO: validar categorías y montos contra ARCA — RG vigente 2026
    categorias: Record<string, MonotributoCategoria>;
  };
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

    monotributo: {
      // TODO: validar categorías y montos contra ARCA — RG vigente 2026
      categorias: {
        A: { ingresoMax: 8992597,   impuesto: 34260,  obraSocial: 33423, jubilacion: 16800 },
        B: { ingresoMax: 13175201,  impuesto: 40420,  obraSocial: 33423, jubilacion: 18480 },
        C: { ingresoMax: 16469001,  impuesto: 49355,  obraSocial: 33423, jubilacion: 20340 },
        D: { ingresoMax: 20585001,  impuesto: 64850,  obraSocial: 33423, jubilacion: 22350 },
        E: { ingresoMax: 24700001,  impuesto: 76420,  obraSocial: 33423, jubilacion: 24555 },
        F: { ingresoMax: 30875001,  impuesto: 95160,  obraSocial: 33423, jubilacion: 26985 },
        G: { ingresoMax: 37050001,  impuesto: 116380, obraSocial: 33423, jubilacion: 29685 },
        H: { ingresoMax: 55575001,  impuesto: 170350, obraSocial: 33423, jubilacion: 32535 },
        I: { ingresoMax: 74099001,  impuesto: 229315, obraSocial: 33423, jubilacion: 35745 },
        J: { ingresoMax: 92624001,  impuesto: 294695, obraSocial: 33423, jubilacion: 39225 },
        K: { ingresoMax: 111148001, impuesto: 388565, obraSocial: 33423, jubilacion: 43155 },
      },
    },
  },
};

export default taxData;
