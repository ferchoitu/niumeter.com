/**
 * Contenido editorial SEO — Calculadora de Indemnización Argentina (es)
 */
export const content = {
  intro: {
    h2: "Calculá tu indemnización por despido online",
    p1: "La legislación laboral argentina contempla distintas compensaciones económicas cuando un trabajador es despedido sin causa. Sin embargo, determinar el monto correcto puede resultar complicado porque intervienen múltiples variables y cada situación tiene particularidades propias.",
    p2: "Por eso desarrollamos esta calculadora, pensada para trabajadores, empleadores, abogados laboralistas y profesionales de recursos humanos que necesitan una referencia rápida y confiable.",
    p3: "El resultado obtenido es orientativo y no reemplaza el asesoramiento profesional ni una liquidación formal. Siempre es recomendable consultar con un especialista cuando existan dudas sobre montos, registración laboral o posibles incumplimientos.",
  },

  conceptos: {
    h2: "Qué conceptos incluye una liquidación final",
    intro: "El cálculo de la indemnización depende de varios conceptos que se suman para obtener el monto final. A continuación detallamos cada uno de ellos según la normativa vigente.",
    items: [
      {
        label: "Indemnización por antigüedad (Art. 245 LCT)",
        desc: "Es el concepto más importante. Corresponde un sueldo por cada año trabajado o fracción mayor a tres meses, tomando como base la mejor remuneración mensual, normal y habitual. Tope: 67 × SMVM ($24.642.600 en 2026).",
      },
      {
        label: "Preaviso (Art. 231-232 LCT)",
        desc: "Si el empleador no otorga el preaviso legal, debe abonarlo económicamente. Los plazos son: 1 mes para trabajadores con menos de 5 años de antigüedad, y 2 meses para quienes tengan más de 5 años.",
      },
      {
        label: "Integración mes de despido (Art. 233 LCT)",
        desc: "Cuando el despido se comunica antes de finalizar el mes, corresponde abonar los días faltantes hasta completarlo. Se calculan a razón de sueldo diario (sueldo / 30).",
      },
      {
        label: "SAC proporcional",
        desc: "También corresponde percibir el Sueldo Anual Complementario proporcional generado hasta la fecha de desvinculación, incluyendo el SAC sobre el período de preaviso.",
      },
      {
        label: "Vacaciones proporcionales (Art. 150 LCT)",
        desc: "Las vacaciones pendientes deben liquidarse proporcionalmente según el tiempo trabajado durante el año en curso. Los días de vacaciones no gozadas se abonan con un incremento del 100%.",
      },
    ],
  },

  tope: {
    h2: "El tope de indemnización: qué es y cuándo aplica",
    p1: "Por Art. 245 LCT, la base de cálculo (la mejor remuneración mensual) no puede superar 67 veces el Salario Mínimo Vital y Móvil. Este tope aplica a la base de cálculo, no al total de la liquidación.",
    p2: "El SMVM vigente a junio 2026 es $367.800 (Resolución 9/2025 — Boletín Oficial 03/12/2025). El tope es $24.642.600.",
    p3: "Si tu sueldo supera ese monto, la indemnización se calcula sobre $24.642.600 y no sobre tu remuneración real. Ante cualquier duda sobre cómo aplica el tope a tu caso particular, conviene revisar con un profesional.",
  },

  tipos: {
    h2: "Diferencias entre renuncia, despido sin causa y despido con causa",
    p1: "Cuando existe una causa grave atribuible al trabajador y debidamente acreditada, el empleador puede despedir sin obligación de pagar la indemnización por antigüedad. En el despido sin causa, en cambio, corresponde el pago de todas las indemnizaciones previstas. La renuncia solo da derecho a vacaciones proporcionales y SAC del período.",
    tabla: [
      { concepto: "Indemnización por antigüedad", sinCausa: "✅ Sí", conCausa: "❌ No", renuncia: "❌ No" },
      { concepto: "Preaviso", sinCausa: "✅ Sí", conCausa: "❌ No", renuncia: "❌ No" },
      { concepto: "Integración mes de despido", sinCausa: "✅ Sí", conCausa: "❌ No", renuncia: "❌ No" },
      { concepto: "SAC proporcional", sinCausa: "✅ Sí", conCausa: "✅ Sí", renuncia: "✅ Sí" },
      { concepto: "Vacaciones proporcionales", sinCausa: "✅ Sí", conCausa: "✅ Sí", renuncia: "✅ Sí" },
    ],
  },

  plazos: {
    h2: "Factores que pueden modificar el monto de la indemnización",
    p1: "No todos los casos son iguales. Las horas extras y comisiones, cuando forman parte habitual de la remuneración, pueden influir en la base salarial utilizada para calcular determinadas indemnizaciones. El trabajo parcialmente registrado también puede generar diferencias que requieren análisis profesional.",
    p2: "Algunas actividades poseen convenios colectivos con reglas específicas que pueden impactar en determinados conceptos indemnizatorios. Ante cualquiera de estas circunstancias particulares, una calculadora es una excelente referencia inicial, pero siempre conviene complementarla con asesoramiento de un especialista.",
  },

  faq: {
    h2: "Preguntas frecuentes sobre la indemnización por despido",
    items: [
      {
        q: "¿Cómo se calcula la indemnización por despido en Argentina?",
        a: "La indemnización por antigüedad (Art. 245 LCT) se calcula multiplicando la mejor remuneración mensual, normal y habitual del último año por la cantidad de años de antigüedad. Las fracciones superiores a 3 meses se redondean a un año completo. El resultado nunca puede ser menor a un mes de sueldo. La base de cálculo tiene un tope equivalente a 67 veces el SMVM vigente ($24.642.600 en junio 2026).",
      },
      {
        q: "¿Qué es la integración mes de despido?",
        a: "Es la compensación por los días que faltan hasta el fin del mes desde la fecha del despido. Si te despiden el 15 de junio, te corresponden los días 16 al 30, calculados a razón de sueldo diario (sueldo / 30). La lógica es que el empleador interrumpió tu mes de trabajo y te adeuda esos días.",
      },
      {
        q: "¿Siempre corresponde preaviso?",
        a: "El preaviso solo corresponde en el despido sin causa. Tiene dos modalidades: preaviso trabajado (seguís trabajando durante el período) o preaviso en dinero (el empleador te paga el monto equivalente y te libera). Si hubo preaviso en alguna de estas formas, no se suma al total. Si el empleador no otorgó ninguna, el monto equivalente se suma a la liquidación.",
      },
      {
        q: "¿La indemnización tiene tope?",
        a: "Sí. Por Art. 245 LCT, la base de cálculo (la mejor remuneración mensual) no puede superar 67 veces el Salario Mínimo Vital y Móvil. Con el SMVM de $367.800 vigente a junio 2026, el tope es $24.642.600. Si tu sueldo supera ese monto, la indemnización se calcula sobre $24.642.600 y no sobre tu sueldo real. Nota: el tope aplica a la base, no al total de la liquidación.",
      },
      {
        q: "¿Qué pasa si renuncio — cobro algo?",
        a: "Con una renuncia no tenés derecho a indemnización por antigüedad ni a preaviso (aunque debés vos otorgar un preaviso al empleador, generalmente de 15 o 30 días según tu antigüedad). Sí corresponden las vacaciones proporcionales y el SAC del período transcurrido. Es decir, cobrás una liquidación final pero sin los conceptos más importantes.",
      },
      {
        q: "¿El aguinaldo se suma a la indemnización?",
        a: "El SAC (aguinaldo) no se suma a la indemnización por antigüedad directamente, pero sí se integra en el cálculo de la 'mejor remuneración' a través del doceavo del SAC. Además, cuando hay preaviso, corresponde un SAC proporcional calculado sobre ese período. También se paga el SAC del semestre en curso proporcional a los meses trabajados.",
      },
      {
        q: "¿En cuánto tiempo me tienen que pagar la liquidación final?",
        a: "El empleador tiene 4 días hábiles para pagar desde la extinción del contrato (Art. 128 LCT). Si no paga en término, los montos generan intereses. Adicionalmente, si el empleador niega la relación laboral o el despido, pueden aplicarse multas e indemnizaciones adicionales (Ley 24.013, Art. 80 LCT).",
      },
      {
        q: "¿Puedo negociar un monto mayor al legal?",
        a: "Sí. El monto calculado según la LCT es el mínimo legal indisponible, pero el empleador puede ofrecerte un acuerdo superador. Los acuerdos por encima del mínimo legal se celebran ante el SECLO (Servicio de Conciliación Laboral Obligatoria) o directamente en sede judicial, y pueden incluir confidencialidad, plazos de pago en cuotas u otros beneficios.",
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
        icon: "🎁",
        label: "Calculadora de Aguinaldo (SAC) Argentina",
        href: "/calculadora-aguinaldo/argentina",
        desc: "Calculá tu SAC neto con descuentos y proporcional",
        activo: true,
      },
    ],
  },
};
