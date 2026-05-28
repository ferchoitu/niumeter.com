/**
 * Contenido editorial SEO — Calculadora de Aguinaldo Argentina (es)
 * Estructura modular para facilitar actualizaciones y traducciones.
 */
export const content = {
  intro: {
    h2: "¿Qué es el aguinaldo (SAC) en Argentina?",
    p1: "El Sueldo Anual Complementario (SAC), conocido popularmente como aguinaldo, es un beneficio establecido por el Art. 121 de la Ley de Contrato de Trabajo (LCT). Consiste en el pago de una cuota equivalente al 50% de la mejor remuneración mensual normal y habitual del semestre correspondiente.",
    p2: "Se paga en dos cuotas: la primera antes del 30 de junio (correspondiente al 1er semestre: enero–junio) y la segunda antes del 31 de diciembre (2do semestre: julio–diciembre). Todo trabajador en relación de dependencia tiene derecho al SAC, independientemente de su categoría, antigüedad o salario.",
    p3: "Al igual que el sueldo mensual, el aguinaldo está sujeto a descuentos previsionales: jubilación (11%), obra social (3%) y PAMI (3%). Si estás en convenio, también se descuenta el aporte gremial. Además, puede impactar en el cálculo del Impuesto a las Ganancias.",
  },

  comoCelcular: {
    h2: "Cómo se calcula el SAC paso a paso",
    intro: "La fórmula legal es simple:",
    formula: "SAC Bruto = Mejor remuneración del semestre ÷ 2",
    steps: [
      {
        titulo: "1. Identificá la mejor remuneración",
        desc: "Tomá el mayor sueldo bruto mensual que cobraste durante los 6 meses del semestre. No importa si fue por horas extras, comisiones o premios — lo que cuenta es el mejor mes.",
      },
      {
        titulo: "2. Dividí por 2",
        desc: "Ese monto dividido por 2 es tu SAC bruto. Si cobraste $2.000.000 en el mejor mes, tu SAC bruto es $1.000.000.",
      },
      {
        titulo: "3. Aplicá los descuentos",
        desc: "Del SAC bruto se descuentan jubilación (11%), obra social (3%) y PAMI (3%), sumando un mínimo de 17% de descuento. Si estás en convenio, sumá el aporte gremial.",
      },
      {
        titulo: "4. Calculá el proporcional (si corresponde)",
        desc: "Si no completaste el semestre, el SAC se paga en forma proporcional a los meses trabajados. Ej: si trabajaste 3 meses, cobrás la mitad del SAC completo.",
      },
    ],
  },

  descuentos: {
    h2: "Qué le descuentan al aguinaldo",
    intro: "El SAC está sujeto a los mismos descuentos que el sueldo mensual:",
    items: [
      {
        label: "Jubilación — 11%",
        desc: "Aporte al Sistema Integrado Previsional Argentino (SIPA). Base legal: Art. 11 Ley 24.241.",
      },
      {
        label: "Obra Social — 3%",
        desc: "Aporte a la obra social de tu actividad. Base legal: Ley 23.660.",
      },
      {
        label: "PAMI / Ley 19.032 — 3%",
        desc: "Aporte al Instituto Nacional de Servicios Sociales para Jubilados y Pensionados.",
      },
      {
        label: "Aporte gremial — variable",
        desc: "Solo si estás en convenio colectivo. El porcentaje varía según el sindicato (generalmente 1–3%).",
      },
      {
        label: "Impuesto a las Ganancias — variable",
        desc: "El SAC puede incrementar tu base imponible anual y generar una retención adicional. ARCA lo distribuye en los meses del semestre. Esta calculadora muestra el impacto estimado.",
      },
    ],
  },

  ejemplos: {
    h2: "Ejemplos prácticos de aguinaldo neto",
    intro: "Para que tengas una referencia concreta, estos son dos casos reales:",
    casos: [
      {
        titulo: "Empleado sin convenio — Sueldo $1.500.000",
        subtitulo: "Soltero, sin hijos, no paga Ganancias",
        filas: [
          { label: "SAC Bruto", valor: "$750.000" },
          { label: "Jubilación (11%)", valor: "−$82.500" },
          { label: "Obra Social (3%)", valor: "−$22.500" },
          { label: "PAMI (3%)", valor: "−$22.500" },
        ],
        neto: { label: "SAC Neto", valor: "$622.500" },
      },
      {
        titulo: "Empleada con convenio — Sueldo $3.200.000",
        subtitulo: "Casada, 2 hijos, aporte gremial 2.5%, paga Ganancias",
        filas: [
          { label: "SAC Bruto", valor: "$1.600.000" },
          { label: "Jubilación (11%)", valor: "−$176.000" },
          { label: "Obra Social (3%)", valor: "−$48.000" },
          { label: "PAMI (3%)", valor: "−$48.000" },
          { label: "Aporte gremial (2.5%)", valor: "−$40.000" },
          { label: "Ganancias (impacto est.)", valor: "−$85.000" },
        ],
        neto: { label: "SAC Neto aprox.", valor: "$1.203.000" },
        destacado: true,
      },
    ],
  },

  proporcional: {
    h2: "SAC proporcional: si no completaste el semestre",
    p1: "Si ingresaste a trabajar durante el semestre o te desvinculaste antes de que termine, tenés derecho al SAC proporcional a los meses efectivamente trabajados.",
    formula: "SAC proporcional = (Mejor remuneración ÷ 2) × (Meses trabajados ÷ 6)",
    p2: "Ejemplo: si trabajaste 4 meses en el semestre con una mejor remuneración de $1.800.000, tu SAC bruto proporcional sería: ($1.800.000 ÷ 2) × (4 ÷ 6) = $600.000.",
    p3: "Este monto también está sujeto a los descuentos previsionales correspondientes.",
  },

  ganancias: {
    h2: "Aguinaldo y el Impuesto a las Ganancias",
    p1: "Si superás los pisos salariales para Ganancias, el SAC puede incrementar tu ingreso anual proyectado y generar una retención adicional. ARCA obliga al empleador a retenerla distribuida en los meses del semestre (no de golpe en junio o diciembre).",
    p2: "En la práctica, si ya pagás Ganancias mensualmente, el impacto del SAC suele ser moderado. Si estás cerca del límite inferior, el SAC podría empujarte a pagar Ganancias temporariamente durante esos meses.",
    alerta: "Si creés que te retienen de más, podés cargar tus deducciones en SIRADIG (sistema de ARCA) para que tu empleador las compute.",
  },

  faq: {
    h2: "Preguntas frecuentes sobre el aguinaldo",
    items: [
      {
        q: "¿El aguinaldo se cobra bruto o neto?",
        a: "Lo que te depositan en la cuenta es el SAC neto, es decir, después de los descuentos previsionales. El SAC bruto es la base de cálculo (mejor sueldo ÷ 2), pero no es lo que cobrás.",
      },
      {
        q: "¿Cuándo me pagan el aguinaldo?",
        a: "Por ley, antes del 30 de junio (primer cuota) y antes del 31 de diciembre (segunda cuota). Algunos empleadores lo pagan antes, lo cual está permitido.",
      },
      {
        q: "¿Los trabajadores part-time o a tiempo parcial cobran aguinaldo?",
        a: "Sí. El SAC se calcula sobre la mejor remuneración mensual correspondiente a la jornada trabajada. Si trabajás media jornada, se calcula sobre tu sueldo proporcional.",
      },
      {
        q: "¿El aguinaldo se tiene en cuenta para el cálculo de la indemnización?",
        a: "Sí. Al calcular una indemnización por despido, el SAC se integra al cálculo de la «mejor remuneración mensual normal y habitual», sumando un doceavo del SAC anual.",
      },
      {
        q: "¿Puedo cobrar el aguinaldo si renuncio o me despiden?",
        a: "Sí. Cuando se extingue la relación laboral por cualquier motivo (renuncia, despido, mutuo acuerdo), el empleador debe pagar el SAC proporcional al tiempo trabajado en el semestre en curso.",
      },
      {
        q: "¿Los monotributistas cobran aguinaldo?",
        a: "No. El aguinaldo es exclusivo de los trabajadores en relación de dependencia. Los monotributistas y autónomos no tienen este beneficio porque no tienen empleador.",
      },
      {
        q: "¿El empleador puede pagar el aguinaldo en cuotas?",
        a: "No. La ley establece que el SAC debe pagarse en una sola vez en cada fecha estipulada. Acordar cuotas sin el consentimiento del trabajador constituiría un incumplimiento contractual.",
      },
    ],
  },

  linksRelacionados: {
    titulo: "Calculadoras relacionadas",
    links: [
      {
        icon: "💼",
        label: "Calculadora de Sueldo Neto Argentina",
        href: "/calculadora-sueldo/argentina",
        desc: "Calculá tu sueldo mensual neto con todos los descuentos",
        activo: true,
      },
      {
        icon: "⚖️",
        label: "Calculadora de Indemnización Argentina",
        href: null,
        desc: "Próximamente",
        activo: false,
      },
      {
        icon: "🖥️",
        label: "Calculadora Freelance Argentina",
        href: null,
        desc: "Próximamente",
        activo: false,
      },
    ],
  },
};
