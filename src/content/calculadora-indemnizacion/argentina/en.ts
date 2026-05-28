/** English editorial content — Argentina Indemnizacion Calculator */
export const content = {
  intro: {
    h2: "How severance pay is calculated in Argentina",
    p1: "[CONTENT PENDING] — Overview of the key concepts in a final settlement under Law 20.744.",
    p2: "[CONTENT PENDING] — Breakdown of Art. 245 LCT and how it applies in 2026.",
    p3: "[CONTENT PENDING] — What documents to request from the employer and within what deadlines.",
  },

  conceptos: {
    h2: "What a final settlement includes",
    intro: "[CONTENT PENDING] — Description of each concept: severance, notice, integration, SAC, and vacation.",
    items: [
      {
        label: "Severance pay for seniority (Art. 245 LCT)",
        desc: "[CONTENT PENDING] — Formula: best salary × years of service. Cap: 67 × minimum wage ($24,642,600 in 2026).",
      },
      {
        label: "Notice period (Art. 231-232 LCT)",
        desc: "[CONTENT PENDING] — 15 days if under 3 months, 1 month if between 3 months and 5 years, 2 months if over 5 years.",
      },
      {
        label: "Month-of-dismissal integration (Art. 233 LCT)",
        desc: "[CONTENT PENDING] — The remaining days until end of month at daily salary rate (salary / 30).",
      },
      {
        label: "Proportional SAC on notice period",
        desc: "[CONTENT PENDING] — The proportional annual bonus calculated on the notice period.",
      },
      {
        label: "Proportional vacation pay (Art. 150 LCT)",
        desc: "[CONTENT PENDING] — The vacation days not taken in the current year.",
      },
    ],
  },

  tope: {
    h2: "The severance cap: what it is and when it applies",
    p1: "[CONTENT PENDING] — Explanation of the Art. 245 cap: the calculation base cannot exceed 67 × minimum wage.",
    p2: "The current minimum wage as of June 2026 is $367,800 (Resolution 9/2025 — Official Gazette 12/03/2025). The cap is $24,642,600.",
    p3: "[CONTENT PENDING] — Examples of when the cap applies and its impact on high salaries.",
  },

  tipos: {
    h2: "Differences between resignation, dismissal without cause, and dismissal with cause",
    p1: "[CONTENT PENDING] — Clear comparison of the three scenarios and what the worker receives in each case.",
    tabla: [
      { concepto: "Severance pay", sinCausa: "✅ Yes", conCausa: "❌ No", renuncia: "❌ No" },
      { concepto: "Notice period", sinCausa: "✅ Yes", conCausa: "❌ No", renuncia: "❌ No" },
      { concepto: "Month integration", sinCausa: "✅ Yes", conCausa: "❌ No", renuncia: "❌ No" },
      { concepto: "Proportional SAC", sinCausa: "✅ Yes", conCausa: "✅ Yes", renuncia: "✅ Yes" },
      { concepto: "Vacation pay", sinCausa: "✅ Yes", conCausa: "✅ Yes", renuncia: "✅ Yes" },
    ],
  },

  plazos: {
    h2: "How long does the employer have to pay",
    p1: "[CONTENT PENDING] — Art. 128 LCT: 4 business days to settle. Interest and penalties for late payment.",
    p2: "[CONTENT PENDING] — What to do if the employer doesn't pay on time.",
  },

  faq: {
    h2: "Frequently asked questions about severance pay in Argentina",
    items: [
      {
        q: "How is severance pay calculated in Argentina?",
        a: "Severance pay for seniority (Art. 245 LCT) is calculated by multiplying the best normal and regular monthly salary from the last year by the number of years of service. Fractions exceeding 3 months round up to a full year. The result cannot be less than one month's salary. The calculation base is capped at 67 times the current minimum wage ($24,642,600 in June 2026).",
      },
      {
        q: "What is month-of-dismissal integration?",
        a: "It compensates for the days remaining until end of month from the date of dismissal. If you're dismissed on June 15, you're entitled to days 16 through 30, calculated at the daily salary rate (salary / 30). The logic is that the employer interrupted your work month and owes you those days.",
      },
      {
        q: "Is a notice period always required?",
        a: "The notice period only applies to dismissal without cause. It comes in two forms: worked notice (you continue working during the period) or paid notice (the employer pays the equivalent and releases you). If neither was provided, the equivalent amount is added to the settlement.",
      },
      {
        q: "Does severance pay have a cap?",
        a: "Yes. Under Art. 245 LCT, the calculation base (best monthly salary) cannot exceed 67 times the minimum wage. With the June 2026 minimum wage of $367,800, the cap is $24,642,600. If your salary exceeds this amount, severance is calculated on $24,642,600, not your actual salary.",
      },
      {
        q: "What do I receive if I resign?",
        a: "With a resignation you're not entitled to severance pay or notice (though you must give your employer notice, generally 15 or 30 days). You do receive proportional vacation pay and SAC for the period worked. In other words, you receive a final settlement but without the most significant components.",
      },
      {
        q: "Is the annual bonus (SAC) included in severance?",
        a: "The SAC is not directly added to severance pay, but it is integrated into the 'best salary' calculation through one-twelfth of the annual SAC. Additionally, when there's a notice period, a proportional SAC calculated on that period applies. The current semester's proportional SAC is also paid.",
      },
      {
        q: "How long does the employer have to pay the final settlement?",
        a: "The employer has 4 business days to pay from the end of the employment contract (Art. 128 LCT). If payment is late, amounts accrue interest. If the employer denies the employment relationship or the dismissal, additional penalties may apply (Law 24.013, Art. 80 LCT).",
      },
      {
        q: "Can I negotiate a higher amount than the legal minimum?",
        a: "Yes. The amount calculated under LCT is the minimum non-waivable legal amount, but the employer can offer a higher settlement. Agreements above the legal minimum are concluded before SECLO (Mandatory Labor Conciliation Service) or in court, and may include confidentiality clauses, installment payment schedules, or other benefits.",
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
        icon: "🎁",
        label: "Argentina Annual Bonus (SAC) Calculator",
        href: "/calculadora-aguinaldo/argentina",
        desc: "Calculate your net SAC with deductions and proportional",
        activo: true,
      },
    ],
  },
};
