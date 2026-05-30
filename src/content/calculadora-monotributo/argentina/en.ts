export const content = {
  intro: {
    lead: "Staying within the correct Monotributo category is one of the main concerns for any entrepreneur, independent professional, or small business owner. As sales increase, so does the risk of exceeding invoicing limits and facing a re-categorization that raises the monthly fee.",
    h2: "What is the Argentina Monotributo Calculator 2026?",
    p1: "The Monotributo Calculator is a tool that estimates the corresponding category based on your invoicing level and other parameters established by ARCA (formerly AFIP). Its main objective is to help you determine:",
    listItems: [
      "Your current category.",
      "Whether you are close to a re-categorization.",
      "What your estimated monthly fee would be.",
      "How much invoicing margin you have left.",
      "What impact an increase in income would have.",
    ],
    p2: "Unlike traditional simulators, a good calculator not only shows a result, but also helps you plan ahead.",
  },

  porQueControlar: {
    h2: "Why is it important to monitor your annual income?",
    p1: "One of the most common mistakes among monotributistas is focusing solely on selling and leaving tax compliance for later.",
    p2: "The priority is often getting clients, delivering projects, and managing the business. However, the problem arises when months pass and you discover you are much closer to your category limit than you imagined.",
    p3: "Periodic monitoring avoids unpleasant surprises and allows you to make decisions with time to spare.",
  },

  comoEvitar: {
    h2: "How a calculator can help you avoid mistakes",
    p1: "Most re-categorizations don't happen because the taxpayer wants to break the rules, but simply because they don't monitor their accumulated income. By using an updated calculator you can:",
    items: [
      "Detect when you're approaching the limit.",
      "Estimate future scenarios.",
      "Better organize your financial planning.",
      "Avoid unexpected increases in your monthly fee.",
    ],
  },

  comoFunciona: {
    h2: "How does our Monotributo Calculator work?",
    intro: "Niumeter's tool simplifies a process that can often be confusing for those without accounting knowledge.",
    datos: {
      h3: "Data you need to enter",
      items: [
        "Accumulated invoicing from the last 12 months.",
        "Type of activity (services or sale of movable goods).",
        "Whether you have employees (affects minimum category).",
        "Surface area of the business premises, if applicable.",
      ],
    },
    resultado: {
      h3: "How to interpret the result",
      p1: "The result doesn't just indicate a category. It can also help you understand:",
      items: [
        "Whether you still have invoicing margin available.",
        "How much is left before reaching the limit.",
        "Whether there is a risk of re-categorization.",
        "What the next tax bracket would be.",
      ],
      p2: "This analysis is especially useful for those experiencing business growth.",
    },
  },

  ejemplos: {
    h2: "Examples of categorization based on your income",
    intro: "These cases illustrate how the calculator determines the category and available margin. Try it with your own numbers in the tool above.",
    items: [
      {
        titulo: "Case 1 — Service provider, $8,000,000/year",
        categoria: "A",
        cuota: "$42,386.74/month",
        tope: "$10,277,988",
        margen: "$2,277,988 available",
        mensaje: "Falls within category A. You can invoice almost $2.3 million more without re-categorizing.",
        color: "emerald",
      },
      {
        titulo: "Case 2 — Consultant, $13,000,000/year",
        categoria: "B",
        cuota: "$48,250.78/month",
        tope: "$15,000,000 *",
        margen: "$2,000,000 available *",
        mensaje: "Exceeded Category A limit. Moves to B. This category's limit is pending ARCA validation.",
        color: "blue",
      },
      {
        titulo: "Case 3 — Retailer, $25,000,000/year in goods",
        categoria: "D",
        cuota: "$70,661.26/month",
        tope: "$27,000,000 *",
        margen: "$2,000,000 available *",
        mensaje: "Exceeded A ($10.3M), B and C limits. Falls into Category D for goods sales.",
        color: "amber",
      },
    ],
    nota: "(*) Limits for B onwards are pending official ARCA validation. Shown for reference only.",
  },

  tabla: {
    h2: "Category Table — Monotributo June 2026",
    fuente: "Source: ARCA — Law 27.743. Next update: July 2026.",
    nota: "(*) Data pending official validation from ARCA. Will be updated once the owner confirms the figures.",
  },

  recategorizacion: {
    h2: "How to know if you are close to a re-categorization",
    p1: "Re-categorization is one of the topics that worries small contributors the most. Often it's not a matter of poor management, but a natural consequence of business growth.",
    limites: {
      h3: "Monotributo invoicing limits",
      p1: "Each category has specific income limits. When accumulated invoicing exceeds those limits, it is necessary to move to a higher category or even evaluate whether to remain within the simplified regime. That is why it is essential to periodically review income from the last twelve months.",
    },
    siSuperas: {
      h3: "What happens if you exceed the allowed limits",
      items: [
        "Mandatory re-categorization.",
        "Increase in monthly fee.",
        "Exclusion from the simplified regime.",
        "Transition to the General Tax Regime.",
      ],
      p1: "For this reason, reviewing your invoicing just once a year is not enough.",
    },
    automatica: {
      h3: "Automatic re-categorization: when it happens",
      p1: "ARCA can currently conduct audits and detect inconsistencies between the declared category and the taxpayer's actual activity.",
      p2: "One of the situations most worth avoiding is discovering too late that you're near the allowed limit. When focused on running a business, this type of monitoring tends to be neglected. An updated calculator allows you to act before the problem appears.",
    },
  },

  cuantoPaga: {
    h2: "How much do you pay in Monotributo in 2026?",
    p1: "The monthly amount depends on the assigned category, the activity carried out, and the current tax components. Values are updated every semester by ARCA through the Consumer Price Index.",
    factores: {
      h3: "Factors that determine the monthly fee",
      items: [
        "Integrated tax.",
        "Pension contribution (SIPA).",
        "Health insurance.",
      ],
      p1: "As the income limits for each category increase, so does the amount to be paid.",
    },
    diferencias: {
      h3: "Differences between categories",
      p1: "Higher categories offer larger invoicing limits, but also imply a greater tax burden. That is why it is so important to know exactly where you stand and how much margin you have. From Category C onwards, the fee also differs depending on whether you provide services or sell movable goods.",
    },
  },

  errores: {
    h2: "Common mistakes when calculating Monotributo",
    items: [
      {
        h3: "Not monitoring accumulated income",
        p1: "This is probably the most common mistake. When sales increase, it's easy to lose track of the total amount invoiced over the last twelve months.",
        p2: undefined,
      },
      {
        h3: "Forgetting previous periods",
        p1: "Some people only consider recent sales and forget to include earlier months that are still part of the annual calculation.",
        p2: undefined,
      },
      {
        h3: "Relying only on estimates",
        p1: "Calculating by guesswork can generate significant differences. It's always worth reviewing accumulated income carefully, because no one wants to face an automatic re-categorization that means paying more than expected.",
        p2: "A specialized tool eliminates much of that uncertainty.",
      },
    ],
  },

  ventajas: {
    h2: "Benefits of using Niumeter's Monotributo Calculator",
    p1: "Niumeter's value proposition goes beyond showing a category. It aims to help you make better decisions.",
    items: [
      {
        h3: "Financial planning for entrepreneurs",
        p1: "Knowing your tax situation allows you to organize investments, expenses, and growth objectives more efficiently.",
        p2: undefined,
      },
      {
        h3: "Business growth control",
        p1: "As a business begins to grow, monitoring income becomes increasingly important. The calculator allows you to visualize that growth and assess its tax impact.",
        p2: undefined,
      },
      {
        h3: "Prevention of unexpected re-categorizations",
        p1: "Instead of finding out once you've already exceeded a limit, you can anticipate it and act in time.",
        p2: "Because a Monotributo calculator doesn't just tell you how much you pay today. It also helps you understand how much you can invoice tomorrow without compromising your tax planning.",
      },
    ],
  },

  conclusion: {
    h2: "Conclusion",
    p1: "The Argentina Monotributo Calculator 2026 is an essential tool for any entrepreneur, professional, or small business owner who wants to stay in control of their tax situation.",
    p2: "Beyond knowing your current category, its real value lies in prevention. Knowing how much you've invoiced, how much more you can invoice, and when you might face a re-categorization allows you to make decisions with greater peace of mind and avoid unexpected costs.",
    p3: "If you run a business, you probably have dozens of more urgent tasks during the day. That is precisely why having a calculator that monitors these limits can make the difference between growing in an orderly way or facing an unexpected tax surprise.",
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
    h2: "Frequently Asked Questions about Monotributo 2026",
    items: [
      {
        q: "How do I know which Monotributo category applies to me?",
        a: "You need to analyze your accumulated invoicing from the last 12 months and compare it with the current limits for each category. The number of employees and business surface area also matter. The calculator above does this analysis automatically.",
      },
      {
        q: "What happens if I exceed my category's limit?",
        a: "You may need to re-categorize and start paying a higher fee. In some cases, you could even be excluded from the simplified regime and transition to the General Tax Regime (VAT + Income Tax). ARCA can detect these inconsistencies automatically.",
      },
      {
        q: "How often should I review my situation?",
        a: "It is recommended to monitor your invoicing every month to avoid surprises during the biannual re-categorization periods (January and July). If at any point you exceed 20% of your current category's limit, re-categorization is immediate.",
      },
      {
        q: "Does the calculator replace accounting advice?",
        a: "No. The calculator is a support tool that facilitates monitoring and planning, but it is always advisable to consult a professional in complex situations such as changing regime, Monotributo exclusion, or cases involving employees.",
      },
      {
        q: "Why use a calculator instead of doing it manually?",
        a: "Because it reduces errors, saves time, and allows you to quickly visualize the impact of income on your category. An updated calculator also works with current ARCA data, eliminating the uncertainty of calculating with outdated information.",
      },
      {
        q: "How is the monotributo category determined?",
        a: "The category is determined by the highest of three factors: your annual gross income from the last 12 months, the number of employees you have, and the surface area of the premises used for the activity. If any of these parameters implies a higher category, that's the one that applies.",
      },
      {
        q: "When are monotributo fees updated?",
        a: "Fees are updated twice a year: in January and July, based on the Consumer Price Index (CPI) variation from the previous semester. This is established in Law 27.743. The values in this calculator correspond to June 2026 and will be updated in July 2026.",
      },
      {
        q: "What is the difference between services and goods sales?",
        a: "Categories A and B have the same fee for both types of activity. From Category C onwards, fees for services are higher than for movable goods sales. If you do both activities, the services category applies.",
      },
    ],
  },
};
