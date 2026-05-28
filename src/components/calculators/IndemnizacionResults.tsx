"use client";

import { Scale, TrendingUp, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  type IndemnizacionResult,
  type TipoDespido,
  formatARS,
} from "@/lib/calculations/argentina-indemnizacion";

interface IndemnizacionResultsProps {
  result: IndemnizacionResult;
}

const TIPO_LABELS: Record<TipoDespido, string> = {
  sin_causa: "Despido sin causa",
  con_causa: "Despido con causa",
  renuncia: "Renuncia",
};

export default function IndemnizacionResults({ result }: IndemnizacionResultsProps) {
  const esLimitado = result.tipoDespido !== "sin_causa";

  const conceptos = [
    {
      label: "Indemnización por antigüedad",
      monto: result.indemnizacionAntiguedad,
      visible: true,
      tooltip: result.topeAplicado
        ? `Base topada a ${formatARS(result.topeMaximo)} (67 × SMVM)`
        : undefined,
    },
    {
      label: `Preaviso (${
        result.mesesPreaviso === 0.5
          ? "15 días"
          : result.mesesPreaviso === 1
          ? "1 mes"
          : "2 meses"
      })`,
      monto: result.preaviso,
      visible: result.preaviso > 0,
    },
    {
      label: `Integración mes de despido (${result.diasIntegracion} días)`,
      monto: result.integracionMes,
      visible: result.integracionMes > 0,
    },
    {
      label: "SAC proporcional sobre preaviso",
      monto: result.sacSobrePreaviso,
      visible: result.sacSobrePreaviso > 0,
    },
    {
      label: `Vacaciones proporcionales (${result.diasVacaciones} días)`,
      monto: result.vacacionesProporcionales,
      visible: result.vacacionesProporcionales > 0,
    },
  ].filter((c) => c.visible);

  return (
    <div className="space-y-4">
      {/* Aviso tipo de despido limitado */}
      {esLimitado && (
        <Card className="border border-amber-200/60 bg-amber-50/40">
          <CardContent className="p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {TIPO_LABELS[result.tipoDespido]}
              </p>
              <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                Con renuncia o despido con causa, no corresponde indemnización por antigüedad ni
                preaviso. Solo aplican vacaciones proporcionales y SAC del período.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tope aplicado */}
      {result.topeAplicado && (
        <Card className="border border-blue-200/60 bg-blue-50/40">
          <CardContent className="p-4 flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-800 leading-relaxed">
              <strong>Tope Art. 245 aplicado:</strong> La base de cálculo fue limitada a{" "}
              {formatARS(result.topeMaximo)} (67 × SMVM $367.800 — Res. 9/2025).
            </p>
          </CardContent>
        </Card>
      )}

      {/* Card principal — total */}
      <Card className="border-0 shadow-md bg-gradient-to-br from-[#10B981] to-[#059669] text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHYzNmMwIDkuOTQgOC4wNiAxOCAxOCAxOFYxOHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L2c+PC9zdmc+')] opacity-30" />
        <CardContent className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-emerald-100" />
            <p className="text-emerald-100 text-sm font-medium uppercase tracking-wider">
              Total a cobrar
            </p>
          </div>
          <p className="text-4xl md:text-5xl font-bold tabular-nums tracking-tight">
            {formatARS(result.totalBruto)}
          </p>
          <p className="text-emerald-100 text-sm mt-2">
            {TIPO_LABELS[result.tipoDespido]} ·{" "}
            {result.antiguedad.anos > 0 || result.antiguedad.meses > 0
              ? `${result.antiguedad.anos} año${result.antiguedad.anos !== 1 ? "s" : ""}${
                  result.antiguedad.meses > 0
                    ? ` y ${result.antiguedad.meses} mes${result.antiguedad.meses !== 1 ? "es" : ""}`
                    : ""
                } de antigüedad`
              : "Antigüedad no calculada"}
          </p>
          {result.antiguedad.anosParaCalculo !== result.antiguedad.anos && (
            <p className="text-emerald-200 text-xs mt-1">
              Fracción {result.antiguedad.meses} meses {">"} 3 → calculado como{" "}
              {result.antiguedad.anosParaCalculo} años
            </p>
          )}
        </CardContent>
      </Card>

      {/* Desglose */}
      <Card className="border border-border/60 shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Desglose por concepto
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {conceptos.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-3 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-[#10B981] flex-shrink-0" />
                  <span className="text-sm text-foreground">{c.label}</span>
                  {c.tooltip && (
                    <span className="text-xs text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                      {c.tooltip}
                    </span>
                  )}
                </div>
                <span className="text-sm font-semibold tabular-nums text-[#10B981]">
                  {formatARS(c.monto)}
                </span>
              </div>
            ))}

            {esLimitado && result.totalBruto === result.vacacionesProporcionales && (
              <div className="px-6 py-3 text-sm text-muted-foreground text-center">
                No corresponden otros conceptos para este tipo de desvinculación.
              </div>
            )}

            <Separator />
            <div className="flex items-center justify-between px-6 py-3 bg-[#10B981]/5">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-[#10B981]" />
                <span className="text-sm font-bold text-foreground">Total</span>
                <Badge
                  variant="secondary"
                  className="bg-[#10B981]/10 text-[#10B981] border-0 text-xs"
                >
                  {result.tipoDespido === "sin_causa" ? "Art. 245 LCT" : "Liquidación parcial"}
                </Badge>
              </div>
              <span className="text-base font-bold tabular-nums text-[#10B981]">
                {formatARS(result.totalBruto)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info card */}
      <Card className="border border-blue-200/60 bg-blue-50/40">
        <CardContent className="p-4">
          <p className="text-xs text-blue-800 leading-relaxed">
            <strong>⚖️ Monto bruto estimativo.</strong> La indemnización no está sujeta a aportes
            previsionales ni Ganancias. Los plazos de pago: el empleador tiene 4 días hábiles para
            liquidar (Art. 128 LCT). El incumplimiento genera intereses y sanciones.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
