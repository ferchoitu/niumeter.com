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
      <div className="relative glass-panel rounded-xl border border-border/40 overflow-hidden relative shadow-[0_0_20px_rgba(16,185,129,0.06)] bg-white/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHYzNmMwIDkuOTQgOC4wNiAxOCAxOCAxOFYxOHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Gift className="h-4 w-4 text-primary/80" />
            <p className="text-primary/80 text-xs font-semibold uppercase tracking-widest">
              Tu SAC Neto
            </p>
          </div>
          <p className="text-4xl md:text-5xl font-extrabold tabular-nums tracking-tight text-primary">
            {formatARS(result.sacNeto)}
          </p>
          {result.esProporcional && (
            <div className="flex items-center gap-1.5 mt-2.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-muted-foreground text-xs font-medium">
                Proporcional a {result.mesesTrabajados} mes{result.mesesTrabajados !== 1 ? "es" : ""}
              </p>
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <div className="bg-zinc-50 border border-border/40 rounded-lg px-3 py-1.5">
              <span className="text-muted-foreground text-xs">SAC Bruto: </span>
              <span className="font-semibold text-foreground">{formatARS(result.sacBruto)}</span>
            </div>
            <div className="bg-zinc-50 border border-border/40 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
              <TrendingDown className="h-3.5 w-3.5 text-rose-600" />
              <span className="text-muted-foreground text-xs">Descuentos: </span>
              <span className="font-semibold text-foreground">
                {formatARS(result.totalDescuentosPrevisionales + result.impactoGanancias)}
              </span>
              <span className="text-rose-600 text-xs font-bold">({porcentaje}%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Breakdown */}
      <div className="relative glass-panel rounded-xl border border-border/40 bg-white/90">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="p-4 border-b border-border/40 flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-bold text-foreground">Desglose de descuentos</h3>
        </div>
        <div className="p-0">
          <div className="divide-y divide-border/40">
            {/* SAC Bruto */}
            <div className="flex items-center justify-between px-6 py-3 bg-zinc-50/50">
              <span className="text-sm font-semibold text-foreground">SAC Bruto</span>
              <span className="text-sm font-semibold tabular-nums text-foreground">{formatARS(result.sacBruto)}</span>
            </div>

            {/* Deductions */}
            {desglose.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-6 py-2.5 hover:bg-zinc-50/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-sm bg-primary/60 flex-shrink-0" />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
                <div className="flex items-center gap-2 tabular-nums">
                  {item.pct !== null && (
                    <span className="text-[10px] text-muted-foreground">({item.pct}%)</span>
                  )}
                  <span className="text-xs font-semibold text-rose-600">
                    −{formatARS(item.monto)}
                  </span>
                </div>
              </div>
            ))}

            <Separator className="bg-border/40" />

            {/* Net total */}
            <div className="flex items-center justify-between px-6 py-3.5 bg-primary/5 rounded-b-xl">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">SAC Neto</span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border border-primary/20 text-[10px]"
                >
                  {(100 - result.porcentajeDescuentos).toFixed(1)}% del bruto
                </Badge>
              </div>
              <span className="text-base font-bold tabular-nums text-primary">
                {formatARS(result.sacNeto)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ganancias impact */}
      {result.aplicaGanancias && result.impactoGanancias > 0 && (
        <div className="relative glass-panel rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
          <span className="cyber-corner cyber-corner-tl" />
          <span className="cyber-corner cyber-corner-tr" />
          <span className="cyber-corner cyber-corner-bl" />
          <span className="cyber-corner cyber-corner-br" />

          <h3 className="text-sm font-bold text-amber-600 mb-3 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-sm" />
            Impacto del SAC en Ganancias
          </h3>
          <div>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="font-medium text-muted-foreground text-center">—</div>
              <div className="font-semibold text-center text-foreground">Sin Ganancias</div>
              <div className="font-semibold text-center text-amber-600">Con Ganancias</div>

              <div className="text-muted-foreground py-2 border-t border-border/20">SAC neto</div>
              <div className="text-center py-2 tabular-nums font-medium border-t border-border/20 text-foreground">
                {formatARS(result.sacNetoSinGanancias)}
              </div>
              <div className="text-center py-2 tabular-nums font-bold text-amber-600 border-t border-border/20">
                {formatARS(result.sacNeto)}
              </div>

              <div className="text-muted-foreground py-2 border-t border-border/20">Diferencia</div>
              <div className="col-span-2 text-center py-2 tabular-nums text-rose-600 font-semibold border-t border-border/20 bg-rose-50 rounded-md">
                −{formatARS(result.impactoGanancias)} estimados
              </div>
            </div>
            <p className="text-[11px] text-amber-700/80 mt-3 leading-relaxed">
              💡 Este impacto es una estimación. ARCA lo retiene de forma acumulativa durante los meses del semestre.
            </p>
          </div>
        </div>
      )}

      {/* Info card */}
      <div className="relative glass-panel rounded-xl border border-blue-550/20 bg-blue-50/50 p-5">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>¿Cuándo se paga?</strong> El SAC se abona en dos cuotas: antes del 30 de junio
          (1er semestre) y antes del 31 de diciembre (2do semestre). Si te fuiste antes de
          completar el semestre, cobrás el proporcional.
        </p>
      </div>
    </div>
  );
}
