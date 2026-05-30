export const content = {
  intro: {
    h2: "What is Monotributo and how is your category determined?",
    p1: "Monotributo is a simplified tax regime created in Argentina for small contributors. It replaces VAT, Income Tax, pension contributions and health insurance with a single monthly payment. It is regulated by Law 27.743 and updated every semester through the Consumer Price Index (CPI).",
    p2: "The category is primarily determined by your annual gross income: the total amount invoiced in the last 12 calendar months. There are 11 categories, from A (the lowest) to K (the highest). If you exceed the Category K limit, you must register under the General Tax Regime.",
    p3: "In addition to income, the minimum category may be influenced by the number of employees and the surface area of the business premises. This calculator takes all those factors into account.",
  },
  comoFunciona: {
    h2: "How does the calculation work?",
    intro: "The system evaluates three parameters and assigns the highest category resulting from any of them:",
    items: [
      {
        label: "1. Annual gross income",
        desc: "The main factor. If your income exceeds a category's limit, you automatically move to the next one. Limits are updated every semester via CPI.",
      },
      {
        label: "2. Number of employees",
        desc: "Each employee may imply a minimum category. For example, having 1 employee could require at least Category C. This table is pending official validation.",
      },
      {
        label: "3. Affected surface area",
        desc: "If you have a business premises, the square footage also determines a minimum category. ARCA's official table defines the thresholds per m².",
      },
    ],
  },
  tabla: {
    h2: "Category Table — Monotributo June 2026",
    fuente: "Source: ARCA — Law 27.743. Next update: July 2026.",
    nota: "(*) Limits B–F and fees G–K pending validation from ARCA. Displayed with a warning in the calculator.",
  },
  diferencias: {
    h2: "Services vs. goods sales: what's the difference?",
    p1: "Categories A and B have the same monthly fee regardless of the type of activity. From Category C onwards, those providing services or leasing pay a higher fee than those selling movable goods.",
    p2: "If your activity combines services and goods sales, the services category (the higher one) applies. When in doubt, consult your accountant.",
  },
  recategorizacion: {
    h2: "When to re-categorize?",
    p1: "Mandatory re-categorization is biannual: in January and July each year. You must analyze your income from the last 12 months, your premises surface area and number of employees.",
    p2: "If at any point during the year you exceed your current category's limit by 20% or more, you must re-categorize immediately, without waiting for the semester.",
  },
  linksRelacionados: {
    titulo: "Related calculators",
    links: [
      {
        icon: "💼",
        label: "Argentina Net Salary Calculator 2026",
        href: "/calculadora-sueldo/argentina",
        desc: "Calculate your contributions and deductions if you work as an employee.",
        activo: true,
      },
      {
        icon: "🧾",
        label: "Freelance vs. Employment Calculator",
        href: null,
        desc: "Coming soon — Compare monotributo freelance vs. net salary.",
        activo: false,
      },
    ],
  },
  faq: {
    h2: "Frequently Asked Questions about Monotributo",
    items: [
      {
        q: "How is the monotributo category determined?",
        a: "The category is determined by the highest of three factors: your annual gross income from the last 12 months, the number of employees you have, and the surface area of the premises used for the activity. If any of these parameters implies a higher category, that's the one that applies.",
      },
      {
        q: "When do I have to re-categorize?",
        a: "Ordinary re-categorization is biannual: in January (for the previous July–December semester) and in July (for the previous January–June semester). If you exceed 20% of your current category's limit at any point during the year, re-categorization is immediate.",
      },
      {
        q: "What happens if I exceed my category's limit?",
        a: "If you exceed Category K's limit ($108,357,084 annually), you must deregister from monotributo and register under the General Regime (VAT + Income Tax). This means issuing invoices with itemized VAT and filing monthly tax returns. It's advisable to consult an accountant before making the switch.",
      },
      {
        q: "Does monotributo include health insurance?",
        a: "Yes. The monthly monotributo fee includes a contribution to a health insurance provider of your choice. When registering, you can choose which health insurer to join. The exact breakdown between integrated tax, pension contribution (SIPA) and health insurance is pending official validation for the June 2026 update.",
      },
      {
        q: "Can I have employees as a monotributista?",
        a: "Yes, you can have up to three employees under a labor contract as a monotributista. The number of employees may determine a minimum category: each employee you hire requires you to be in a category equal to or above a certain threshold defined by ARCA. You must also register them in the system and pay their social charges separately.",
      },
      {
        q: "When are monotributo fees updated?",
        a: "Fees are updated twice a year: in January and July, based on the Consumer Price Index (CPI) variation from the previous semester. This is established in Law 27.743. The values in this calculator correspond to June 2026 and will be updated in July 2026.",
      },
      {
        q: "What is the difference between services and goods sales?",
        a: "Categories A and B have the same fee for both types of activity. From Category C onwards, fees for services are higher than for movable goods sales. This reflects that services generally have higher added value. If you do both activities, the services category applies.",
      },
      {
        q: "When is it worth switching to the General Regime?",
        a: "The General Regime may be more convenient if your clients are businesses that need the VAT credit, if your income exceeds the monotributo limit, or if you have many deductible expenses. In general, monotributo is simpler and more convenient for lower incomes or when working mainly with end consumers. An accountant can help you evaluate which is the best option for your case.",
      },
    ],
  },
};
