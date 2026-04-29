/**
 * NIUMETER — Contenido editorial EN
 * Argentina Salary Calculator
 *
 * TODO: Traducir contenido desde es.ts cuando se active /en/
 * Por ahora redirige al contenido ES para no tener páginas vacías.
 */

export const content = {

  intro: {
    h2: "How Argentina's net salary calculator works",
    p1: "A net salary calculator for Argentina helps you answer one simple but crucial question: how much will you actually receive after all deductions from your gross salary.",
    p2: "Many tools get this wrong — they apply income tax to every salary, when in reality most Argentine workers don't pay it.",
    p3: "Before trusting any result, it's worth understanding what's happening behind the calculation.",
  },

  brutoNeto: {
    h2: "Difference between gross and net salary",
    p1: "Your gross salary is what appears in your contract and on the first line of your payslip. Your net salary is what actually hits your bank account after mandatory deductions.",
    p2: "For a gross salary of $2,000,000 ARS with no income tax withholding, your net take-home is approximately $1,660,000 — a 17% deduction that goes directly into the pension and healthcare system.",
  },

  datosNecesarios: {
    h2: "What information you need to calculate your salary",
    intro: "To use a calculator correctly, you need four pieces of information:",
    items: [
      { icon: "💼", text: "Your monthly gross salary (what your contract says, not what you receive)" },
      { icon: "📋", text: "Whether you are an employee (relación de dependencia) or self-employed (monotributista)" },
      { icon: "🤝", text: "Whether you are covered by a collective bargaining agreement and your union contribution rate" },
      { icon: "👨‍👩‍👧", text: "Your family situation (dependent spouse, children) if income tax applies to you" },
    ],
  },

  descuentos: {
    h2: "What deductions apply to your gross salary in Argentina",
    intro: "It's not just \"they deduct and that's it\" — there's a system behind it. Understanding where each peso goes changes how you see your payslip.",
    items: [
      {
        label: "Pension contributions — 11%",
        desc: "Goes to the retirement system managed by ANSES. It's your present self funding your future retired self.",
      },
      {
        label: "Health insurance (Obra Social) — 3%",
        desc: "Provides medical coverage through your union or, if redirected, a private insurer (prepaga).",
      },
      {
        label: "Law 19.032 — PAMI — 3%",
        desc: "Funds the healthcare system for retirees and pensioners. You contribute even if you're not using it yet.",
      },
      {
        label: "Union contribution — 1% to 3%",
        desc: "Only if you're under a collective agreement. Comercio deducts 2.5%, UOCRA around 2%, Sanidad 3%.",
      },
      {
        label: "Income tax (Ganancias) — variable",
        desc: "Not everyone pays it. It only starts applying from approximately $3,000,000 ARS gross per month for single workers with no dependents.",
      },
    ],
  },

  ejemplos: {
    h2: "Net salary calculator: real step-by-step example",
    intro: "Two concrete cases for 2026 to help you understand the mechanics.",
    caso1: {
      titulo: "Case 1 — $2,500,000 ARS gross",
      subtitulo: "Single, no children, no collective agreement. Buenos Aires, 2026.",
      filas: [
        { label: "Pension (11%)", valor: "−$275,000", destacado: false },
        { label: "Health insurance (3%)", valor: "−$75,000", destacado: false },
        { label: "PAMI (3%)", valor: "−$75,000", destacado: false },
        { label: "Income tax", valor: "$0 (does not apply)", destacado: true },
      ],
      neto: { label: "Net take-home", valor: "$2,075,000" },
    },
    caso2: {
      titulo: "Case 2 — $5,000,000 ARS gross",
      subtitulo: "Single, no children, no collective agreement. 2026.",
      filas: [
        { label: "Pension (11%)", valor: "−$550,000", destacado: false },
        { label: "Health insurance (3%)", valor: "−$150,000", destacado: false },
        { label: "PAMI (3%)", valor: "−$150,000", destacado: false },
        { label: "Income tax (est.)", valor: "−$280,000", destacado: false },
      ],
      neto: { label: "Net take-home", valor: "~$3,820,000" },
    },
  },

  ganancias: {
    h2: "Income tax for employees in Argentina 2026",
    p1: "Nearly one million Argentine employees pay income tax. The rules are set by Article 94 of Law 20.628, regulated by ARCA Resolution 4003. The system is progressive: the higher your income, the higher the rate applied to the excess — not to your total income.",
    p2: "Thanks to Law 27.743, thresholds are updated twice a year based on CPI. For 2026:",
    tabla: [
      { situacion: "Single, no children",     bruto: "$3,000,045", neto: "$2,490,038" },
      { situacion: "Married, no children",    bruto: "$3,487,190", neto: "$2,894,368" },
      { situacion: "Married, 1 child",        bruto: "$3,732,860", neto: "$3,098,000" },
      { situacion: "Married, 2 children",     bruto: "$3,952,152", neto: "$3,302,179" },
    ],
    alerta: "If you are below those thresholds, income tax does not apply to you. If your employer is withholding it anyway, you are entitled to a refund.",
  },

  siradig: {
    h2: "When to file deductions in SIRADIG",
    p1: "SIRADIG is ARCA's system where you register your personal deductions so your employer takes them into account when calculating income tax. The most common ones that people miss:",
    items: [
      "Private health insurance premiums (yours and your dependents')",
      "Rent payments (up to 40% of the personal allowance)",
      "Private school tuition for children",
      "Donations to exempt organizations",
      "Registered domestic service",
      "Mortgage loan interest",
    ],
    p2: "If you paid more income tax than required during the year, you can request a refund. ARCA returns the excess between March and May of the following year.",
  },

  usarMejor: {
    h2: "How to truly understand your salary and make better financial decisions",
    intro: "When you understand your salary properly, you gain a real advantage:",
    items: [
      { icon: "💰", text: "You know exactly how much you can save" },
      { icon: "🏭", text: "You understand what it really costs your employer to hire you (23-26% in employer contributions on top of your salary)" },
      { icon: "📈", text: "You can negotiate raises more effectively: '20% more' means very different things in gross vs. net" },
      { icon: "🎯", text: "You make better financial decisions: switching to self-employment, accepting USD-denominated work, or filing SIRADIG deductions" },
    ],
  },

  linksRelacionados: {
    titulo: "Related calculators",
    links: [
      {
        icon: "📋",
        label: "Argentina Annual Bonus Calculator 2026",
        href: "/salary-calculator/argentina/annual-bonus",
        desc: "to find out how much SAC you will receive",
        activo: true,
      },
      {
        icon: "💼",
        label: "Argentina Severance Calculator",
        href: null,
        desc: "Coming soon",
        activo: false,
      },
    ],
  },

  faq: {
    h2: "Frequently asked questions about net salary in Argentina",
    items: [
      {
        q: "How do I calculate my net salary in Argentina?",
        a: "Subtract the mandatory contributions from your gross salary: pension (11%), health insurance (3%) and PAMI (3%). If income tax is withheld, add that to the deductions. The minimum total deduction is 17% of your gross.",
      },
      {
        q: "How much is deducted from my salary in Argentina?",
        a: "At minimum 17% (pension, health insurance and PAMI). If you're under a collective agreement, add the union contribution (1-3%). If you pay income tax, total deductions can reach 25-35% depending on your salary and family situation.",
      },
      {
        q: "What is the difference between gross and net salary?",
        a: "Gross is what's agreed in your contract, shown on the first line of your payslip. Net is what gets deposited in your account after all deductions. The minimum difference is 17%.",
      },
      {
        q: "Does everyone pay income tax (Ganancias) in Argentina?",
        a: "No. In 2026, only workers above certain thresholds pay income tax: $3,000,045 ARS gross per month for single workers with no children, and up to $3,952,152 ARS for married workers with 2 children. If you are below those amounts, no withholding applies.",
      },
      {
        q: "When are income tax thresholds updated in Argentina?",
        a: "According to Law 27.743, ARCA updates the brackets twice a year: in January and July. Adjustments are based on the previous semester's CPI from INDEC.",
      },
      {
        q: "What if I'm self-employed (monotributista) instead of an employee?",
        a: "The system is completely different. Monotributistas pay a fixed monthly fee based on their category (A through K) that already includes taxes, pension and health insurance. There is no gross/net distinction in the traditional sense.",
      },
      {
        q: "Does the annual bonus (SAC/aguinaldo) have the same deductions as monthly salary?",
        a: "Yes, the same contributions apply: pension, health insurance and PAMI. It can also affect income tax if the accumulated amount exceeds annual thresholds — which is why the bonus often ends up smaller than expected.",
      },
      {
        q: "Can I redirect my health insurance (Obra Social) to a private insurer (prepaga)?",
        a: "Yes. You can redirect your health insurance contribution (your 3% plus employer contributions) to a private health insurance company. The process goes through your employer or directly with the chosen insurer.",
      },
      {
        q: "What happens if my employer doesn't withhold income tax when they should?",
        a: "You are jointly liable to ARCA. If the employer fails to withhold correctly, you need to regularize the situation. The most practical step is to notify HR so they can correct it before it becomes a bigger problem.",
      },
      {
        q: "What is SIRADIG and what is it for?",
        a: "It's ARCA's system where you register your personal deductions (private health insurance, rent, children, spouse) so your employer reduces your income tax base accordingly. If you don't file it, you're likely paying more than required.",
      },
    ],
  },
} as const;

export type PageContent = typeof content;
