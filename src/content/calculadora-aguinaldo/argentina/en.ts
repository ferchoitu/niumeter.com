/**
 * Editorial SEO content — Argentina Aguinaldo Calculator (en)
 */
export const content = {
  intro: {
    h2: "What is the aguinaldo (SAC) in Argentina?",
    p1: "The Sueldo Anual Complementario (SAC), commonly known as aguinaldo or 13th salary, is a mandatory benefit established by Article 121 of Argentina's Labor Contract Law (LCT). It equals 50% of the highest monthly salary received during the corresponding semester.",
    p2: "It is paid in two installments: the first before June 30 (covering January–June) and the second before December 31 (July–December). All employees in a formal employment relationship are entitled to it, regardless of their position, seniority, or salary level.",
    p3: "Like the monthly salary, the SAC is subject to mandatory contributions: pension (11%), health insurance (3%), and PAMI (3%). If you're covered by a collective agreement, union dues also apply. It may also impact your Income Tax calculation.",
  },

  comoCelcular: {
    h2: "How to calculate your SAC step by step",
    intro: "The legal formula is straightforward:",
    formula: "Gross SAC = Best monthly salary of the semester ÷ 2",
    steps: [
      {
        titulo: "1. Find your best salary",
        desc: "Identify the highest gross monthly salary you received during the 6-month semester. This includes overtime, commissions, and bonuses — whatever made that month the highest.",
      },
      {
        titulo: "2. Divide by 2",
        desc: "That amount divided by 2 is your gross SAC. If your best month was $2,000,000, your gross SAC is $1,000,000.",
      },
      {
        titulo: "3. Apply deductions",
        desc: "From the gross SAC, deduct pension (11%), health insurance (3%), and PAMI (3%), totaling a minimum 17% deduction. Add union dues if applicable.",
      },
      {
        titulo: "4. Calculate proportional amount (if applicable)",
        desc: "If you didn't complete the full semester, the SAC is proportional to the months worked. E.g.: if you worked 3 months, you receive half the full SAC.",
      },
    ],
  },

  descuentos: {
    h2: "What gets deducted from the SAC",
    intro: "The SAC is subject to the same deductions as the monthly salary:",
    items: [
      {
        label: "Pension — 11%",
        desc: "Contribution to the Integrated Argentine Pension System (SIPA). Legal basis: Art. 11 Law 24.241.",
      },
      {
        label: "Health Insurance — 3%",
        desc: "Contribution to your industry's health insurance fund. Legal basis: Law 23.660.",
      },
      {
        label: "PAMI / Law 19.032 — 3%",
        desc: "Contribution to the National Institute of Social Services for Retirees and Pensioners.",
      },
      {
        label: "Union dues — variable",
        desc: "Only if covered by a collective bargaining agreement. Percentage varies by union (typically 1–3%).",
      },
      {
        label: "Income Tax — variable",
        desc: "The SAC may increase your projected annual income base and trigger additional withholding. ARCA requires employers to distribute it across the semester months.",
      },
    ],
  },

  ejemplos: {
    h2: "Practical SAC net pay examples",
    intro: "Here are two real-world examples for reference:",
    casos: [
      {
        titulo: "Employee without collective agreement — Salary $1,500,000",
        subtitulo: "Single, no children, no Income Tax",
        filas: [
          { label: "Gross SAC", valor: "$750,000" },
          { label: "Pension (11%)", valor: "−$82,500" },
          { label: "Health Insurance (3%)", valor: "−$22,500" },
          { label: "PAMI (3%)", valor: "−$22,500" },
        ],
        neto: { label: "Net SAC", valor: "$622,500" },
      },
      {
        titulo: "Employee with collective agreement — Salary $3,200,000",
        subtitulo: "Married, 2 children, 2.5% union dues, pays Income Tax",
        filas: [
          { label: "Gross SAC", valor: "$1,600,000" },
          { label: "Pension (11%)", valor: "−$176,000" },
          { label: "Health Insurance (3%)", valor: "−$48,000" },
          { label: "PAMI (3%)", valor: "−$48,000" },
          { label: "Union dues (2.5%)", valor: "−$40,000" },
          { label: "Income Tax (est. impact)", valor: "−$85,000" },
        ],
        neto: { label: "Net SAC approx.", valor: "$1,203,000" },
        destacado: true,
      },
    ],
  },

  proporcional: {
    h2: "Proportional SAC: if you didn't complete the semester",
    p1: "If you joined during the semester or were terminated before it ended, you're entitled to a proportional SAC based on the months actually worked.",
    formula: "Proportional SAC = (Best salary ÷ 2) × (Months worked ÷ 6)",
    p2: "Example: if you worked 4 months in the semester with a best salary of $1,800,000, your proportional gross SAC would be: ($1,800,000 ÷ 2) × (4 ÷ 6) = $600,000.",
    p3: "This amount is also subject to the applicable mandatory deductions.",
  },

  ganancias: {
    h2: "SAC and Income Tax",
    p1: "If you exceed the Income Tax thresholds, the SAC may increase your projected annual income and generate additional withholding. ARCA requires employers to distribute the retention across the semester months (not all at once in June or December).",
    p2: "In practice, if you already pay Income Tax monthly, the SAC impact is usually moderate. If you're near the lower threshold, the SAC could temporarily push you into the taxable range during those months.",
    alerta: "If you think you're being over-withheld, you can register your deductions in SIRADIG (ARCA's system) so your employer can apply them to your Income Tax base.",
  },

  faq: {
    h2: "Frequently asked questions about the aguinaldo",
    items: [
      {
        q: "Do I receive the gross or net SAC?",
        a: "What gets deposited into your account is the net SAC — after mandatory deductions. The gross SAC is the calculation base (best salary ÷ 2), but it's not what you receive.",
      },
      {
        q: "When is the SAC paid?",
        a: "By law, before June 30 (first installment) and before December 31 (second installment). Employers may pay earlier, which is allowed.",
      },
      {
        q: "Do part-time workers receive SAC?",
        a: "Yes. The SAC is calculated on the best monthly salary corresponding to their working hours. If you work half-time, it's calculated on your proportional salary.",
      },
      {
        q: "Is the SAC considered for severance calculations?",
        a: "Yes. When calculating wrongful dismissal severance, the SAC is integrated into the 'best monthly normal and regular salary' calculation by adding one-twelfth of the annual SAC.",
      },
      {
        q: "Can I receive SAC if I resign or am dismissed?",
        a: "Yes. When the employment relationship ends for any reason (resignation, dismissal, mutual agreement), the employer must pay the proportional SAC for the time worked in the current semester.",
      },
      {
        q: "Do self-employed workers (monotributistas) receive SAC?",
        a: "No. The SAC is exclusive to employees in formal employment relationships. Self-employed workers (monotributistas and autónomos) do not have this benefit since they have no employer.",
      },
      {
        q: "Can the employer pay the SAC in installments?",
        a: "No. The law requires the SAC to be paid in a single payment on each stipulated date. Paying in installments without the worker's consent would constitute a contractual breach.",
      },
    ],
  },

  linksRelacionados: {
    titulo: "Related calculators",
    links: [
      {
        icon: "💼",
        label: "Argentina Net Salary Calculator",
        href: "/calculadora-sueldo/argentina",
        desc: "Calculate your monthly net salary with all deductions",
        activo: true,
      },
      {
        icon: "⚖️",
        label: "Argentina Severance Calculator",
        href: null,
        desc: "Coming soon",
        activo: false,
      },
      {
        icon: "🖥️",
        label: "Argentina Freelance Calculator",
        href: null,
        desc: "Coming soon",
        activo: false,
      },
    ],
  },
};
