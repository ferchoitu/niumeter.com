"use client";

import { useTranslations } from "next-intl";
import { TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { type SalaryResult, formatARS } from "@/lib/calculations/argentina-salary";

interface SalaryResultsProps {
  result: SalaryResult;
}

export default function SalaryResults({ result }: SalaryResultsProps) {
  const t = useTranslations("calculator.argentina.resultados");

  const porcentajeDescuentos = result.porcentajeDescuentos.toFixed(1);

  return (
    <div className="space-y-4">
      {/* Main result card */}
      <Card className="border-0 shadow-md bg-gradient-to-br from-[#10B981] to-[#059669] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHYzNmMwIDkuOTQgOC4wNiAxOCAxOCAxOFYxOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30" />
        <CardContent className="relative p-6">
          <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider mb-1">
            {t("sueldoNeto")}
          </p>
          <p className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
            {formatARS(result.neto)}
          </p>
          <p className="text-emerald-100 text-sm mt-2 font-medium">por mes</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <div className="bg-white/15 rounded-lg px-3 py-1.5">
              <span className="text-emerald-100">Bruto: </span>
              <span className="font-semibold">{formatARS(result.bruto)}</span>
            </div>
            <div className="bg-white/15 rounded-lg px-3 py-1.5 flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-red-200" />
              <span className="text-emerald-100">{t("totalDescuentos")}: </span>
              <span className="font-semibold">{formatARS(result.totalDescuentos)}</span>
              <span className="text-emerald-100 text-xs">({porcentajeDescuentos}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown card */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            {t("desglose")}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {/* Bruto row */}
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-sm font-semibold text-foreground">{t("sueldoBruto")}</span>
              <span className="text-sm font-semibold tabular-nums">{formatARS(result.bruto)}</span>
            </div>

            {/* Deductions */}
            {result.desglose.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-6 py-2.5 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]/60 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 tabular-nums">
                  <span className="text-xs text-muted-foreground">
                    ({item.porcentaje.toFixed(1)}%)
                  </span>
                  <span className="text-sm font-medium text-red-600">
                    −{formatARS(item.monto)}
                  </span>
                </div>
              </div>
            ))}

            <Separator />

            {/* Net total */}
            <div className="flex items-center justify-between px-6 py-3 bg-[#10B981]/5">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm font-bold text-foreground">{t("sueldoNeto")}</span>
                <Badge
                  variant="secondary"
                  className="bg-[#10B981]/10 text-[#10B981] border-0 text-xs"
                >
                  {(100 - result.porcentajeDescuentos).toFixed(1)}% del bruto
                </Badge>
              </div>
              <span className="text-base font-bold tabular-nums text-[#10B981]">
                {formatARS(result.neto)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ganancias comparison table - only if applies */}
      {result.aplicaGanancias && (
        <Card className="border border-amber-200/60 bg-amber-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-amber-900">
              {t("comparativa")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium text-muted-foreground text-center">—</div>
              <div className="font-semibold text-center text-foreground">{t("sinGanancias")}</div>
              <div className="font-semibold text-center text-amber-700">{t("conGanancias")}</div>

              <div className="text-muted-foreground py-2">Neto mensual</div>
              <div className="text-center py-2 tabular-nums font-medium">
                {formatARS(result.netoSinGanancias)}
              </div>
              <div className="text-center py-2 tabular-nums font-semibold text-amber-700">
                {formatARS(result.neto)}
              </div>

              <div className="text-muted-foreground py-2">{t("diferencia")}</div>
              <div className="col-span-2 text-center py-2 tabular-nums text-red-600 font-medium">
                −{formatARS(result.ganancias)} por mes
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
