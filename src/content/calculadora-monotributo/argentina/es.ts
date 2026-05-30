export const content = {
  intro: {
    lead: "Mantenerse dentro de la categoría correcta del Monotributo es una de las principales preocupaciones de cualquier emprendedor, profesional independiente o pequeño empresario. A medida que aumentan las ventas, también crece el riesgo de superar los límites de facturación y enfrentar una recategorización que incremente la cuota mensual.",
    h2: "¿Qué es la Calculadora de Monotributo Argentina 2026?",
    p1: "La Calculadora de Monotributo es una herramienta que permite estimar la categoría correspondiente según tu nivel de facturación y otros parámetros establecidos por ARCA (ex AFIP). Su objetivo principal es ayudarte a determinar:",
    listItems: [
      "Tu categoría actual.",
      "Si estás cerca de una recategorización.",
      "Cuál sería tu cuota estimada.",
      "Cuánto margen de facturación te queda disponible.",
      "Qué impacto tendría un crecimiento de tus ingresos.",
    ],
    p2: "A diferencia de los simuladores tradicionales, una buena calculadora no solo muestra un resultado, sino que también te ayuda a planificar.",
  },

  porQueControlar: {
    h2: "¿Por qué es importante controlar tu facturación anual?",
    p1: "Uno de los errores más frecuentes entre los monotributistas es enfocarse únicamente en vender y dejar el control fiscal para después.",
    p2: "Muchas veces la prioridad es conseguir clientes, entregar proyectos y gestionar el negocio. Sin embargo, el problema aparece cuando pasan los meses y descubrís que estás mucho más cerca del límite de tu categoría de lo que imaginabas.",
    p3: "Llevar un seguimiento periódico evita sorpresas desagradables y permite tomar decisiones con tiempo.",
  },

  comoEvitar: {
    h2: "Cómo una calculadora puede ayudarte a evitar errores",
    p1: "La mayoría de las recategorizaciones no ocurren porque el contribuyente quiera incumplir las normas, sino porque simplemente no monitorea sus ingresos acumulados. Al utilizar una calculadora actualizada podés:",
    items: [
      "Detectar cuándo te acercás al límite.",
      "Estimar escenarios futuros.",
      "Organizar mejor tu planificación financiera.",
      "Evitar incrementos inesperados en tu cuota mensual.",
    ],
  },

  comoFunciona: {
    h2: "¿Cómo funciona nuestra Calculadora de Monotributo?",
    intro: "La herramienta de Niumeter simplifica un proceso que muchas veces puede resultar confuso para quienes no tienen conocimientos contables.",
    datos: {
      h3: "Datos que necesitás ingresar",
      items: [
        "Facturación acumulada de los últimos 12 meses.",
        "Tipo de actividad (servicios o venta de bienes muebles).",
        "Si tenés empleados a cargo (afecta la categoría mínima).",
        "Superficie del local afectado, si corresponde.",
      ],
    },
    resultado: {
      h3: "Cómo interpretar el resultado",
      p1: "El resultado no solo indica una categoría. También puede ayudarte a entender:",
      items: [
        "Si todavía tenés margen para facturar.",
        "Cuánto falta para alcanzar el límite.",
        "Si existe riesgo de recategorización.",
        "Cuál sería el próximo escalón tributario.",
      ],
      p2: "Este análisis es especialmente útil para quienes están experimentando crecimiento en su negocio.",
    },
  },

  ejemplos: {
    h2: "Ejemplos de categorización según tus ingresos",
    intro: "Estos casos ilustran cómo la calculadora determina la categoría y el margen disponible. Probá con tus propios números en la herramienta de arriba.",
    items: [
      {
        titulo: "Caso 1 — Prestador de servicios, $8.000.000/año",
        categoria: "A",
        cuota: "$42.386,74/mes",
        tope: "$10.277.988",
        margen: "$2.277.988 disponibles",
        mensaje: "Está dentro de la categoría A. Podés facturar casi $2,3 millones más sin recategorizarte.",
        color: "emerald",
      },
      {
        titulo: "Caso 2 — Consultor, $13.000.000/año",
        categoria: "B",
        cuota: "$48.250,78/mes",
        tope: "$15.000.000 *",
        margen: "$2.000.000 disponibles *",
        mensaje: "Superó el tope de categoría A. Pasa a B. El tope de esta categoría está en validación ARCA.",
        color: "blue",
      },
      {
        titulo: "Caso 3 — Comerciante, $25.000.000/año en bienes",
        categoria: "D",
        cuota: "$70.661,26/mes",
        tope: "$27.000.000 *",
        margen: "$2.000.000 disponibles *",
        mensaje: "Superó los topes de A ($10,3M), B y C. Cae en categoría D de venta de bienes.",
        color: "amber",
      },
    ],
    nota: "(*) Topes B en adelante pendientes de validación oficial en ARCA. Se muestran como referencia.",
  },

  tabla: {
    h2: "Tabla de categorías Monotributo — Junio 2026",
    fuente: "Fuente: ARCA — Ley 27.743. Próxima actualización: julio 2026.",
    nota: "(*) Datos pendientes de validación oficial en ARCA. Se actualizarán cuando el owner los confirme.",
  },

  recategorizacion: {
    h2: "Cómo saber si estás cerca de una recategorización",
    p1: "La recategorización es uno de los temas que más preocupa a los pequeños contribuyentes. Muchas veces no se trata de una mala gestión, sino de una consecuencia natural del crecimiento de la actividad.",
    limites: {
      h3: "Límites de facturación del Monotributo",
      p1: "Cada categoría posee topes específicos de ingresos. Cuando la facturación acumulada supera esos límites, es necesario pasar a una categoría superior o incluso evaluar la permanencia dentro del régimen simplificado. Por eso resulta fundamental revisar periódicamente los ingresos de los últimos doce meses.",
    },
    siSuperas: {
      h3: "Qué ocurre si superás los topes permitidos",
      items: [
        "Recategorización obligatoria.",
        "Incremento de la cuota mensual.",
        "Exclusión del régimen simplificado.",
        "Paso al régimen general.",
      ],
      p1: "Por este motivo, no alcanza con revisar la facturación una vez al año.",
    },
    automatica: {
      h3: "Recategorización automática: cuándo sucede",
      p1: "Actualmente, ARCA puede realizar controles y detectar inconsistencias entre la categoría declarada y la actividad real del contribuyente.",
      p2: "Una de las situaciones que más se intenta evitar es descubrir tarde que uno está cerca del límite permitido. Cuando uno está enfocado en administrar el negocio, este tipo de seguimiento suele quedar relegado. Una calculadora actualizada permite actuar antes de que aparezca el problema.",
    },
  },

  cuantoPaga: {
    h2: "¿Cuánto se paga de Monotributo en 2026?",
    p1: "El monto mensual depende de la categoría asignada, la actividad desarrollada y los componentes impositivos vigentes. Los valores son actualizados semestralmente por ARCA mediante el Índice de Precios al Consumidor.",
    factores: {
      h3: "Factores que determinan la cuota mensual",
      items: [
        "Impuesto integrado.",
        "Aporte jubilatorio (SIPA).",
        "Obra social.",
      ],
      p1: "A medida que aumentan los ingresos permitidos por cada categoría, también se incrementa el importe a pagar.",
    },
    diferencias: {
      h3: "Diferencias entre categorías",
      p1: "Las categorías superiores ofrecen mayores límites de facturación, pero también implican una carga tributaria más elevada. Por eso resulta tan importante saber exactamente dónde te encontrás y cuánto margen disponible tenés. Desde la categoría C en adelante, la cuota también difiere según si hacés servicios o vendés bienes muebles.",
    },
  },

  errores: {
    h2: "Errores frecuentes al calcular el Monotributo",
    items: [
      {
        h3: "No controlar los ingresos acumulados",
        p1: "Es probablemente el error más habitual. Cuando las ventas aumentan, es fácil perder de vista la suma total facturada durante los últimos doce meses.",
      },
      {
        h3: "Olvidar períodos anteriores",
        p1: "Algunas personas consideran únicamente las ventas recientes y olvidan incluir meses anteriores que todavía forman parte del cálculo anual.",
      },
      {
        h3: "Confiar únicamente en estimaciones",
        p1: "Calcular \"a ojo\" puede generar diferencias significativas. Más de una vez conviene revisar los ingresos acumulados con precisión, porque nadie quiere encontrarse con una recategorización automática que implique pagar más de lo esperado.",
        p2: "Una herramienta especializada elimina gran parte de esa incertidumbre.",
      },
    ],
  },

  ventajas: {
    h2: "Ventajas de usar la Calculadora de Monotributo de Niumeter",
    p1: "La propuesta de valor de Niumeter no se limita a mostrar una categoría. Busca ayudarte a tomar mejores decisiones.",
    items: [
      {
        h3: "Planificación financiera para emprendedores",
        p1: "Conocer tu situación fiscal permite organizar inversiones, gastos y objetivos de crecimiento de manera más eficiente.",
      },
      {
        h3: "Control del crecimiento del negocio",
        p1: "Cuando una empresa comienza a crecer, el seguimiento de los ingresos se vuelve cada vez más importante. La calculadora permite visualizar ese crecimiento y evaluar su impacto tributario.",
      },
      {
        h3: "Prevención de recategorizaciones inesperadas",
        p1: "En lugar de enterarte cuando ya superaste un límite, podés anticiparte y actuar con tiempo.",
        p2: "Porque una calculadora de monotributo no sirve únicamente para saber cuánto pagás hoy. También sirve para entender cuánto podés facturar mañana sin comprometer tu planificación fiscal.",
      },
    ],
  },

  conclusion: {
    h2: "Conclusión",
    p1: "La Calculadora de Monotributo Argentina 2026 es una herramienta fundamental para cualquier emprendedor, profesional o pequeño empresario que quiera mantener el control de su situación fiscal.",
    p2: "Más allá de conocer la categoría actual, su verdadero valor está en la prevención. Saber cuánto facturaste, cuánto podés seguir facturando y cuándo podrías enfrentar una recategorización te permite tomar decisiones con mayor tranquilidad y evitar costos inesperados.",
    p3: "Si gestionás un negocio, probablemente tengas decenas de tareas más urgentes durante el día. Precisamente por eso, contar con una calculadora que monitoree estos límites puede marcar la diferencia entre crecer de forma ordenada o encontrarte con una sorpresa fiscal que no tenías prevista.",
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
    h2: "Preguntas frecuentes sobre el Monotributo 2026",
    items: [
      {
        q: "¿Cómo saber qué categoría de Monotributo me corresponde?",
        a: "Debés analizar la facturación acumulada de los últimos 12 meses y compararla con los límites vigentes para cada categoría. También influyen la cantidad de empleados y la superficie del local. La calculadora de arriba hace ese análisis automáticamente.",
      },
      {
        q: "¿Qué pasa si supero el límite de mi categoría?",
        a: "Podrías tener que recategorizarte y comenzar a pagar una cuota más alta. En algunos casos, incluso podrías quedar excluido del régimen simplificado y pasar al Régimen General (IVA + Ganancias). ARCA puede detectar estas inconsistencias de forma automática.",
      },
      {
        q: "¿Cada cuánto debo revisar mi situación?",
        a: "Lo recomendable es controlar la facturación todos los meses para evitar sorpresas durante los períodos de recategorización semestrales (enero y julio). Si en cualquier momento superás el 20% del tope de tu categoría, la recategorización es inmediata.",
      },
      {
        q: "¿La calculadora reemplaza el asesoramiento contable?",
        a: "No. La calculadora es una herramienta de apoyo que facilita el seguimiento y la planificación, pero siempre es recomendable consultar con un profesional ante situaciones complejas como cambio de régimen, exclusión del monotributo o casos con empleados.",
      },
      {
        q: "¿Por qué utilizar una calculadora en lugar de hacerlo manualmente?",
        a: "Porque reduce errores, ahorra tiempo y permite visualizar rápidamente el impacto de los ingresos sobre tu categoría. Además, una calculadora actualizada trabaja con los datos vigentes de ARCA, eliminando la incertidumbre de calcular con información desactualizada.",
      },
      {
        q: "¿Cómo se determina la categoría del monotributo?",
        a: "La categoría se determina por el mayor de tres factores: tus ingresos brutos anuales de los últimos 12 meses, la cantidad de empleados a cargo y la superficie del local afectado a la actividad. Si alguno de esos parámetros implica una categoría más alta, esa es la que corresponde.",
      },
      {
        q: "¿Cuándo se actualizan las cuotas del monotributo?",
        a: "Las cuotas se actualizan dos veces al año: en enero y en julio, según la variación del Índice de Precios al Consumidor (IPC) del semestre anterior. Esto está establecido en la Ley 27.743. Los valores de esta calculadora corresponden a junio 2026 y serán actualizados en julio 2026.",
      },
      {
        q: "¿Qué diferencia hay entre servicios y venta de bienes?",
        a: "Las categorías A y B tienen la misma cuota para ambos tipos de actividad. Desde la categoría C en adelante, las cuotas para servicios son más altas que para venta de bienes muebles. Si hacés ambas actividades, se aplica la categoría de servicios.",
      },
    ],
  },
};
