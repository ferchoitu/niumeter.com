export const content = {
  intro: {
    h2: "¿Qué es el monotributo y cómo se determina tu categoría?",
    p1: "El monotributo es un régimen simplificado de tributación creado en Argentina para pequeños contribuyentes. Reemplaza el pago de IVA, Ganancias, aportes jubilatorios y obra social en una única cuota mensual. Está regulado por la Ley 27.743 y se actualiza semestralmente mediante el Índice de Precios al Consumidor (IPC).",
    p2: "La categoría se determina principalmente por tus ingresos brutos anuales: el total de lo que facturaste en los últimos 12 meses calendario. Existen 11 categorías, de la A (la más baja) a la K (la más alta). Si superás el tope de la categoría K, debés inscribirte en el Régimen General.",
    p3: "Además de los ingresos, pueden influir en tu categoría mínima la cantidad de empleados a cargo y la superficie afectada del local donde ejercés la actividad. Esta calculadora toma todos esos factores en cuenta.",
  },
  comoFunciona: {
    h2: "¿Cómo funciona el cálculo?",
    intro: "El sistema evalúa tres parámetros y asigna la categoría más alta que surja de cualquiera de ellos:",
    items: [
      {
        label: "1. Ingresos brutos anuales",
        desc: "El factor principal. Si tus ingresos superan el tope de una categoría, automáticamente pasás a la siguiente. Los topes se actualizan cada semestre por IPC.",
      },
      {
        label: "2. Cantidad de empleados",
        desc: "Cada empleado puede implicar una categoría mínima. Por ejemplo, tener 1 empleado podría requerir al menos categoría C. Esta tabla está en proceso de validación oficial.",
      },
      {
        label: "3. Superficie afectada",
        desc: "Si tenés un local, la superficie en metros cuadrados también determina una categoría mínima. La tabla oficial de ARCA define los umbrales por m².",
      },
    ],
  },
  tabla: {
    h2: "Tabla de categorías — Monotributo Junio 2026",
    fuente: "Fuente: ARCA — Ley 27.743. Próxima actualización: julio 2026.",
    nota: "(*) Topes B–F y cuotas G–K pendientes de validación en ARCA. Se muestran con advertencia en la calculadora.",
  },
  diferencias: {
    h2: "Servicios vs. venta de bienes: ¿cuál es la diferencia?",
    p1: "Las categorías A y B tienen la misma cuota mensual independientemente del tipo de actividad. Desde la categoría C en adelante, quienes realizan servicios o locaciones pagan una cuota mayor que quienes venden bienes muebles.",
    p2: "Si tu actividad combina servicios y ventas de bienes, se aplica la categoría de servicios (la más alta). Ante la duda, consultá con tu contador.",
  },
  recategorizacion: {
    h2: "¿Cuándo recategorizarte?",
    p1: "La recategorización obligatoria es semestral: en enero y en julio de cada año. Debés analizar tus ingresos de los últimos 12 meses, la superficie de tu local y la cantidad de empleados.",
    p2: "Si en cualquier momento del año superás el tope de tu categoría actual por un 20% o más, debés recategorizarte de forma inmediata, sin esperar el semestre.",
  },
  linksRelacionados: {
    titulo: "Calculadoras relacionadas",
    links: [
      {
        icon: "💼",
        label: "Calculadora de Sueldo Neto Argentina 2026",
        href: "/calculadora-sueldo/argentina",
        desc: "Calculá tus aportes y descuentos si trabajás en relación de dependencia.",
        activo: true,
      },
      {
        icon: "🧾",
        label: "Calculadora Freelance vs. Relación de Dependencia",
        href: null,
        desc: "Próximamente — Comparación entre monotributo freelance y sueldo neto.",
        activo: false,
      },
    ],
  },
  faq: {
    h2: "Preguntas frecuentes sobre el monotributo",
    items: [
      {
        q: "¿Cómo se determina la categoría del monotributo?",
        a: "La categoría se determina por el mayor de tres factores: tus ingresos brutos anuales de los últimos 12 meses, la cantidad de empleados a cargo y la superficie del local afectado a la actividad. Si alguno de esos parámetros implica una categoría más alta, esa es la que corresponde.",
      },
      {
        q: "¿Cuándo tengo que recategorizarme?",
        a: "La recategorización ordinaria es semestral: en enero (para el semestre julio–diciembre anterior) y en julio (para el semestre enero–junio anterior). Si superás el 20% del tope de tu categoría actual en cualquier momento del año, la recategorización es inmediata.",
      },
      {
        q: "¿Qué pasa si supero el tope de mi categoría?",
        a: "Si superás el tope de categoría K ($108.357.084 anuales), debés darte de baja del monotributo e inscribirte en el Régimen General (IVA + Impuesto a las Ganancias). Esto implica emitir facturas con IVA discriminado y presentar declaraciones juradas mensuales. Es recomendable consultar con un contador antes de hacer el cambio.",
      },
      {
        q: "¿El monotributo incluye obra social?",
        a: "Sí. La cuota mensual del monotributo incluye un aporte a una obra social a tu elección. Al inscribirte en el monotributo, podés elegir a qué obra social adherirte. El desglose exacto entre impuesto integrado, aporte jubilatorio (SIPA) y obra social está pendiente de validación oficial para la actualización de junio 2026.",
      },
      {
        q: "¿Puedo tener empleados siendo monotributista?",
        a: "Sí, podés tener hasta tres empleados en relación de dependencia siendo monotributista. La cantidad de empleados puede determinar una categoría mínima: cada empleado que incorporás te obliga a estar en una categoría igual o superior a cierto umbral definido por ARCA. También debés registrarlos en el sistema y abonar sus cargas sociales por separado.",
      },
      {
        q: "¿Cuándo se actualizan las cuotas del monotributo?",
        a: "Las cuotas se actualizan dos veces al año: en enero y en julio, según la variación del Índice de Precios al Consumidor (IPC) del semestre anterior. Esto está establecido en la Ley 27.743. Los valores de esta calculadora corresponden a junio 2026 y serán actualizados en julio 2026.",
      },
      {
        q: "¿Qué diferencia hay entre servicios y venta de bienes?",
        a: "Las categorías A y B tienen la misma cuota para ambos tipos de actividad. Desde la categoría C en adelante, las cuotas para servicios son más altas que para venta de bienes muebles. Esto refleja que los servicios generalmente tienen mayor valor agregado. Si hacés ambas actividades, se aplica la categoría de servicios.",
      },
      {
        q: "¿Cuándo me conviene pasarme al régimen general?",
        a: "El régimen general puede ser más conveniente si tus clientes son empresas que necesitan el crédito fiscal del IVA, si tus ingresos superan el tope del monotributo, o si tenés muchos gastos deducibles. En general, el monotributo es más sencillo y conveniente para ingresos más bajos o cuando trabajás principalmente con consumidores finales. Un contador puede ayudarte a evaluar cuál es la mejor opción para tu caso.",
      },
    ],
  },
};
