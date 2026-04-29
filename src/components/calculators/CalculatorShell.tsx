import { ReactNode } from "react";

interface CalculatorShellProps {
  title: string;
  description?: string;
  badge?: string;
  children: ReactNode;
  adSlotPosition?: "top" | "bottom" | "none";
}

/**
 * Shell reusable para todas las calculadoras.
 * Provee el layout de dos columnas en desktop, stack en mobile.
 * Slots de AdSense preparados pero comentados.
 *
 * Uso:
 * <CalculatorShell title="Calculadora de Sueldo Neto">
 *   <div slot="inputs">...</div>
 *   <div slot="results">...</div>
 * </CalculatorShell>
 */
export default function CalculatorShell({
  title,
  description,
  badge,
  children,
}: CalculatorShellProps) {
  return (
    <section className="w-full" aria-labelledby="calculator-title">
      {/* Calculator header */}
      <div className="bg-gradient-to-br from-[#10B981]/10 via-white to-[#1E3A8A]/5 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {badge && (
            <span className="inline-flex items-center rounded-full bg-[#10B981]/10 px-3 py-1 text-sm font-medium text-[#10B981] ring-1 ring-[#10B981]/20 mb-4">
              {badge}
            </span>
          )}
          <h1
            id="calculator-title"
            className="text-3xl md:text-4xl font-bold tracking-tight text-foreground"
          >
            {title}
          </h1>
          {description && (
            <p className="mt-2 text-base md:text-lg text-muted-foreground max-w-2xl">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* AdSense slot — arriba de calculadora — COMENTADO */}
      {/*
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="horizontal"
        />
      </div>
      */}

      {/* Main calculator area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      {/* AdSense slot — debajo de resultado — COMENTADO */}
      {/*
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 border-t border-border">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
          data-ad-slot="XXXXXXXXXX"
          data-ad-format="rectangle"
        />
      </div>
      */}
    </section>
  );
}
