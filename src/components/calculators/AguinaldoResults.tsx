"use client";

import { Gift, TrendingDown, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  type AguinaldoResult,
  formatARS,
} from "@/lib/calculations/argentina-aguinaldo";

interface AguinaldoResultsProps {
  result: AguinaldoResult;
}

export default function AguinaldoResults({ result }: AguinaldoResultsProps) {
  const porcentaje = result.porcentajeDescuentos.toFixed(1);

  const desglose = [
    { label: "Jubilación (11%)", monto: result.montoJubilacion, pct: 11 },
    { label: "Obra Social (3%)", monto: result.montoObraSocial, pct: 3 },
    { label: "Ley 19.032 - INSSJP (3%)", monto: result.montoLey19032, pct: 3 },
    ...(result.montoGremial > 0
      ? [{ label: "Aporte gremial", monto: result.montoGremial, pct: null }]
      : []),
    ...(result.aplicaGanancias && result.impactoGanancias > 0
      ? [{ label: "Imp. a las Ganancias (impacto estimado)", monto: result.impactoGanancias, pct: null }]
      : []),
  ];

  return (
    <div className="space-y-4">
      {/* Main result */}
      <Card className="border-0 shadow-md bg-gradient-to-br from-[#10B981] to-[#059669] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHYzNmMwIDkuOTQgOC4wNiAxOCAxOCAxOFYxOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30" />
        <CardContent className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-4 w-4 text-emerald-100" />
            <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">
              Tu SAC Neto
            </p>
          </div>
          <p className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
            {formatARS(result.sacNeto)}
          </p>
          {result.esProporcional && (
            <div className="flex items-center gap-1.5 mt-2">
              <Calendar className="h-3.5 w-3.5 text-emerald-200" />
              <p className="text-emerald-100 text-sm">
                Proporcional a {result.mesesTrabajados} mes{result.mesesTrabajados !== 1 ? "es" : ""}
              </p>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <div className="bg-white/15 rounded-lg px-3 py-1.5">
              <span className="text-emerald-100">SAC Bruto: </span>
              <span className="font-semibold">{formatARS(result.sacBruto)}</span>
            </div>
            <div className="bg-white/15 rounded-lg px-3 py-1.5 flex items-center gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-red-200" />
              <span className="text-emerald-100">Descuentos: </span>
              <span className="font-semibold">
                {formatARS(result.totalDescuentosPrevisionales + result.impactoGanancias)}
              </span>
              <span className="text-emerald-100 text-xs">({porcentaje}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakdown */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
            Desglose de descuentos
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {/* SAC Bruto */}
            <div className="flex items-center justify-between px-6 py-3">
              <span className="text-sm font-semibold text-foreground">SAC Bruto</span>
              <span className="text-sm font-semibold tabular-nums">{formatARS(result.sacBruto)}</span>
            </div>

            {/* Deductions */}
            {desglose.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-6 py-2.5 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#10B981]/60 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 tabular-nums">
                  {item.pct !== null && (
                    <span className="text-xs text-muted-foreground">({item.pct}%)</span>
                  )}
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
                <span className="text-sm font-bold text-foreground">SAC Neto</span>
                <Badge
                  variant="secondary"
                  className="bg-[#10B981]/10 text-[#10B981] border-0 text-xs"
                >
                  {(100 - result.porcentajeDescuentos).toFixed(1)}% del bruto
                </Badge>
              </div>
              <span className="text-base font-bold tabular-nums text-[#10B981]">
                {formatARS(result.sacNeto)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ganancias impact */}
      {result.aplicaGanancias && result.impactoGanancias > 0 && (
        <Card className="border border-amber-200/60 bg-amber-50/50 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-amber-900">
              Impacto del SAC en Ganancias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="font-medium text-muted-foreground text-center">—</div>
              <div className="font-semibold text-center text-foreground">Sin Ganancias</div>
              <div className="font-semibold text-center text-amber-700">Con Ganancias</div>

              <div className="text-muted-foreground py-2">SAC neto</div>
              <div className="text-center py-2 tabular-nums font-medium">
                {formatARS(result.sacNetoSinGanancias)}
              </div>
              <div className="text-center py-2 tabular-nums font-semibold text-amber-700">
                {formatARS(result.sacNeto)}
              </div>

              <div className="text-muted-foreground py-2">Diferencia</div>
              <div className="col-span-2 text-center py-2 tabular-nums text-red-600 font-medium">
                −{formatARS(result.impactoGanancias)} estimados
              </div>
            </div>
            <p className="text-xs text-amber-700 mt-3 leading-relaxed">
              💡 Este impacto es una estimación. ARCA lo retiene de forma acumulativa durante los meses del semestre.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Info card */}
      <Card className="border border-blue-200/60 bg-blue-50/40 shadow-sm">
        <CardContent className="p-4">
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>¿Cuándo se paga?</strong> El SAC se abona en dos cuotas: antes del 30 de junio
            (1er semestre) y antes del 31 de diciembre (2do semestre). Si te fuiste antes de
            completar el semestre, cobrás el proporcional.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
