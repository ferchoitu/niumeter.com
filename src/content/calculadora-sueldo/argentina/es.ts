/**
 * NIUMETER — Contenido editorial ES
 * Calculadora de Sueldo Neto Argentina
 *
 * Este archivo contiene todo el texto visible del artículo SEO.
 * NO hardcodear strings en page.tsx — importar desde aquí.
 *
 * Última revisión: Abril 2026 — Fermín
 */

export const content = {

  // ── Introducción ────────────────────────────────────────────────────────────

  intro: {
    h2: "Cómo funciona una calculadora de sueldo neto en Argentina",
    p1: "Una calculadora de sueldo neto en Argentina sirve para algo muy simple pero clave: saber cuánto vas a cobrar en mano a partir de tu sueldo bruto.",
    p2: "El problema es que muchas herramientas lo hacen mal. Faltan datos, algunas páginas son lentas o confusas, y otras directamente aplican Impuesto a las Ganancias a cualquier sueldo, cuando en realidad la mayoría de los argentinos no lo paga.",
    p3: "Por eso, antes de confiar en cualquier resultado, conviene entender qué está pasando detrás del cálculo.",
  },

  // ── Bruto vs Neto ───────────────────────────────────────────────────────────

  brutoNeto: {
    h2: "Diferencia entre sueldo bruto y sueldo neto",
    p1: "El sueldo bruto es el que figura en tu contrato y en el primer renglón de tu recibo. El sueldo neto es lo que efectivamente te llega a la cuenta después de los descuentos obligatorios.",
    p2: "Para un sueldo bruto de $2.000.000 en relación de dependencia sin retención de Ganancias, el neto en mano ronda los $1.660.000 — un descuento del 17% que va directo al sistema previsional y de salud.",
  },

  // ── Qué datos necesitás ─────────────────────────────────────────────────────

  datosNecesarios: {
    h2: "Qué datos necesitás para calcular tu sueldo",
    intro: "Para usar correctamente una calculadora necesitás cuatro datos:",
    items: [
      { icon: "💼", text: "Tu sueldo bruto mensual (lo que dice tu contrato, no lo que cobrás)" },
      { icon: "📋", text: "Si estás en relación de dependencia o sos monotributista" },
      { icon: "🤝", text: "Si estás dentro de un convenio colectivo y cuál es tu aporte sindical" },
      { icon: "👨‍👩‍👧", text: "Tu situación familiar (cónyuge a cargo, hijos) si te retienen Ganancias" },
    ],
  },

  // ── Descuentos ──────────────────────────────────────────────────────────────

  descuentos: {
    h2: "Qué descuentos se aplican a tu sueldo bruto en Argentina",
    intro: "No es solo \"me descuentan y listo\": hay un sistema detrás. Entender a dónde va cada peso cambia cómo lo interpretás.",
    items: [
      {
        label: "Aportes jubilatorios — 11%",
        desc: "Van al sistema previsional administrado por ANSES. Es plata que aporta tu yo de hoy para tu yo jubilado.",
      },
      {
        label: "Obra Social — 3%",
        desc: "Te da cobertura de salud sindical o, si lo derivás, prepaga.",
      },
      {
        label: "Ley 19.032 — PAMI — 3%",
        desc: "Financia el sistema de salud para jubilados y pensionados. Aportás aunque no lo uses todavía.",
      },
      {
        label: "Aporte sindical — 1% a 3%",
        desc: "Solo si estás en convenio. Comercio descuenta 2,5%, UOCRA alrededor del 2%, Sanidad 3%. Figura en tu recibo bajo el nombre de tu sindicato.",
      },
      {
        label: "Impuesto a las Ganancias — variable",
        desc: "No todos lo pagan. Solo arranca desde aprox. $3.000.000 de sueldo bruto mensual para solteros sin hijos.",
      },
    ],
  },

  // ── Ejemplos ────────────────────────────────────────────────────────────────

  ejemplos: {
    h2: "Calculadora de sueldo neto: ejemplo real paso a paso",
    intro: "Dos casos concretos de 2026 para que entiendas la mecánica.",
    caso1: {
      titulo: "Caso 1 — $2.500.000 brutos",
      subtitulo: "Soltero, sin hijos, fuera de convenio. CABA, 2026.",
      filas: [
        { label: "Jubilación (11%)", valor: "−$275.000", destacado: false },
        { label: "Obra Social (3%)", valor: "−$75.000", destacado: false },
        { label: "PAMI (3%)", valor: "−$75.000", destacado: false },
        { label: "Ganancias", valor: "$0 (no aplica)", destacado: true },
      ],
      neto: { label: "Neto en mano", valor: "$2.075.000" },
    },
    caso2: {
      titulo: "Caso 2 — $5.000.000 brutos",
      subtitulo: "Soltero, sin hijos, fuera de convenio. 2026.",
      filas: [
        { label: "Jubilación (11%)", valor: "−$550.000", destacado: false },
        { label: "Obra Social (3%)", valor: "−$150.000", destacado: false },
        { label: "PAMI (3%)", valor: "−$150.000", destacado: false },
        { label: "Ganancias (est.)", valor: "−$280.000", destacado: false },
      ],
      neto: { label: "Neto en mano", valor: "~$3.820.000" },
    },
  },

  // ── Ganancias ───────────────────────────────────────────────────────────────

  ganancias: {
    h2: "El Impuesto a las Ganancias en relación de dependencia 2026",
    p1: "Casi un millón de argentinos paga Ganancias en relación de dependencia. La regla la marca el artículo 94 de la Ley 20.628, reglamentada por la RG 4003 de ARCA (ex AFIP). El sistema es progresivo: cuanto más ganás, más alto el porcentaje sobre el excedente, no sobre el total.",
    p2: "Gracias a la Ley 27.743, los pisos se actualizan semestralmente por IPC. Para 2026:",
    tabla: [
      { situacion: "Soltero sin hijos",   bruto: "$3.000.045", neto: "$2.490.038" },
      { situacion: "Casado sin hijos",    bruto: "$3.487.190", neto: "$2.894.368" },
      { situacion: "Casado con 1 hijo",   bruto: "$3.732.860", neto: "$3.098.000" },
      { situacion: "Casado con 2 hijos",  bruto: "$3.952.152", neto: "$3.302.179" },
    ],
    alerta: "Si estás por debajo de esos pisos, no te corresponde pagar Ganancias. Si tu empleador te retiene igual, tenés derecho a la devolución.",
  },

  // ── SIRADIG ─────────────────────────────────────────────────────────────────

  siradig: {
    h2: "Cuándo te conviene cargar deducciones en SIRADIG",
    p1: "El SIRADIG es el sistema de ARCA donde cargás todas tus deducciones para que tu empleador las tenga en cuenta al calcular Ganancias. Las más comunes que casi nadie carga:",
    items: [
      "Cuotas de medicina prepaga (la tuya y la de tus familiares a cargo)",
      "Alquiler de vivienda (hasta el 40% del Mínimo No Imponible)",
      "Cuotas de colegios privados de hijos",
      "Donaciones a entidades exentas",
      "Servicio doméstico registrado",
      "Intereses de créditos hipotecarios",
    ],
    p2: "Si descubrís que pagaste Ganancias de más durante el año, podés pedir la devolución. ARCA te devuelve el excedente entre marzo y mayo del año siguiente.",
  },

  // ── Usar mejor el sueldo ────────────────────────────────────────────────────

  usarMejor: {
    h2: "Cómo entender realmente tu sueldo y usar mejor tu dinero",
    intro: "Cuando entendés tu sueldo en serio, ganás ventaja concreta:",
    items: [
      { icon: "💰", text: "Sabés cuánto podés ahorrar realmente" },
      { icon: "🏭", text: "Entendés cuánto le cuesta a tu empresa tenerte (contribuciones patronales del 23-26% extra que vos no ves)" },
      { icon: "📈", text: "Podés negociar mejor un aumento: no es lo mismo pedir '20% más' que pedir '$X netos en mano'" },
      { icon: "🎯", text: "Tomás mejores decisiones: pasarse a monotributo, aceptar un trabajo en USD, o cargar deducciones en SIRADIG" },
    ],
  },

  // ── Links relacionados ──────────────────────────────────────────────────────

  linksRelacionados: {
    titulo: "Calculadoras relacionadas",
    links: [
      {
        icon: "📋",
        label: "Calculadora de Aguinaldo Argentina 2026",
        href: "/calculadora-aguinaldo/argentina",
        desc: "para saber cuánto vas a cobrar el SAC",
        activo: true,
      },
      {
        icon: "💼",
        label: "Calculadora de Indemnización por Despido",
        href: null,
        desc: "Próximamente",
        activo: false,
      },
    ],
  },

  // ── FAQ ─────────────────────────────────────────────────────────────────────

  faq: {
    h2: "Preguntas frecuentes sobre el sueldo neto en Argentina",
    items: [
      {
        q: "¿Cómo calcular mi sueldo neto en Argentina?",
        a: "Restás los aportes obligatorios al sueldo bruto: jubilación (11%), obra social (3%) y PAMI (3%). Si te retienen Ganancias, ese monto se suma a los descuentos. El total de descuentos mínimos es del 17% del bruto.",
      },
      {
        q: "¿Cuánto me descuentan del sueldo en Argentina?",
        a: "Como mínimo un 17% (jubilación, obra social y PAMI). Si estás en convenio, sumás el aporte sindical (1-3%). Si pagás Ganancias, el descuento total puede llegar al 25-35% dependiendo de tu sueldo y situación familiar.",
      },
      {
        q: "¿Qué diferencia hay entre sueldo bruto y neto?",
        a: "El bruto es el total acordado en tu contrato, el que figura en el primer renglón del recibo. El neto es lo que te depositan después de todos los descuentos. La diferencia mínima es del 17%.",
      },
      {
        q: "¿Todos pagan Impuesto a las Ganancias en Argentina?",
        a: "No. En 2026 solo pagan Ganancias los trabajadores que superan ciertos pisos: $3.000.045 brutos para solteros sin hijos, y hasta $3.952.152 brutos para casados con 2 hijos. Si estás debajo, no te corresponde la retención.",
      },
      {
        q: "¿Cuándo se actualizan los valores de Ganancias en Argentina?",
        a: "Según la Ley 27.743, ARCA actualiza las escalas dos veces al año: en enero y julio. Los ajustes se hacen en base al índice IPC del INDEC del semestre anterior.",
      },
      {
        q: "¿Qué pasa si soy monotributista en lugar de estar en relación de dependencia?",
        a: "El sistema es completamente distinto. Los monotributistas pagan una cuota fija mensual según su categoría (de la A a la K) que ya incluye impuestos, jubilación y obra social. No tienen sueldo bruto/neto en el sentido tradicional.",
      },
      {
        q: "¿El aguinaldo (SAC) tiene los mismos descuentos que el sueldo mensual?",
        a: "Sí, al aguinaldo se le aplican los mismos aportes: jubilación, obra social y PAMI. También puede impactar en Ganancias si el monto acumulado supera los pisos anuales. Por eso el SAC suele quedar más achicado de lo que uno espera.",
      },
      {
        q: "¿Puedo derivar mi obra social a una prepaga?",
        a: "Sí. Podés derivar tu aporte de obra social (3% tuyo más las contribuciones patronales) a una empresa de medicina prepaga. El trámite se hace a través de tu empleador o directamente con la prepaga elegida.",
      },
      {
        q: "¿Qué pasa si mi empleador no me retiene Ganancias y yo debería pagar?",
        a: "Sos responsable solidario ante ARCA. Si el empleador no retiene correctamente, tenés que regularizar. Lo más práctico es avisarle al área de RRHH para que lo corrijan antes de que genere un problema mayor.",
      },
      {
        q: "¿Qué es el SIRADIG y para qué sirve?",
        a: "Es el sistema de ARCA donde cargás tus deducciones personales (medicina prepaga, alquiler, hijos, cónyuge) para que tu empleador las descuente de la base de Ganancias. Si no lo completás, probablemente estés pagando más de lo que corresponde.",
      },
    ],
  },
} as const;

export type PageContent = typeof content;
