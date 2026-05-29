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
        <div className="relative glass-panel rounded-xl border border-amber-500/20 bg-amber-50/50 p-4 flex items-start gap-3">
          <span className="cyber-corner cyber-corner-tl" />
          <span className="cyber-corner cyber-corner-tr" />
          <span className="cyber-corner cyber-corner-bl" />
          <span className="cyber-corner cyber-corner-br" />
          <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-700">
              {TIPO_LABELS[result.tipoDespido]}
            </p>
            <p className="text-xs text-amber-800 mt-1 leading-relaxed">
              Con renuncia o despido con causa, no corresponde indemnización por antigüedad ni
              preaviso. Solo aplican vacaciones proporcionales y SAC del período.
            </p>
          </div>
        </div>
      )}

      {/* Tope aplicado */}
      {result.topeAplicado && (
        <div className="relative glass-panel rounded-xl border border-blue-500/20 bg-blue-50/50 p-4 flex items-start gap-3">
          <span className="cyber-corner cyber-corner-tl" />
          <span className="cyber-corner cyber-corner-tr" />
          <span className="cyber-corner cyber-corner-bl" />
          <span className="cyber-corner cyber-corner-br" />
          <Info className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-sky-800 leading-relaxed">
            <strong>Tope Art. 245 aplicado:</strong> La base de cálculo fue limitada a{" "}
            {formatARS(result.topeMaximo)} (67 × SMVM $367.800 — Res. 9/2025).
          </p>
        </div>
      )}

      {/* Card principal — total */}
      <div className="relative glass-panel rounded-xl border border-border/40 overflow-hidden relative shadow-[0_0_20px_rgba(16,185,129,0.06)] bg-white/90">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOHYzNmMwIDkuOTQgOC4wNiAxOCAxOCAxOFYxOHoiIGZpbGw9InJnYmEoMCwwLDAsMC4wMikiLz48L2c+PC9zdmc+')] opacity-20 pointer-events-none" />
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="relative p-6">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="h-4 w-4 text-primary/80" />
            <p className="text-primary/80 text-xs font-semibold uppercase tracking-widest">
              Total a cobrar
            </p>
          </div>
          <p className="text-4xl md:text-5xl font-extrabold tabular-nums tracking-tight text-primary">
            {formatARS(result.totalBruto)}
          </p>
          <p className="text-muted-foreground text-xs mt-2 font-medium">
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
            <p className="text-primary/75 text-[10px] mt-1.5 font-medium">
              Fracción {result.antiguedad.meses} meses {">"} 3 → calculado como{" "}
              {result.antiguedad.anosParaCalculo} años
            </p>
          )}
        </div>
      </div>

      {/* Desglose */}
      <div className="relative glass-panel rounded-xl border border-border/40 bg-white/90">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="p-4 border-b border-border/40 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <h3 className="text-sm font-bold text-foreground">Desglose por concepto</h3>
        </div>
        <div className="p-0">
          <div className="divide-y divide-border/40">
            {conceptos.map((c, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-3 hover:bg-zinc-50/40 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                  <span className="text-xs text-foreground font-medium">{c.label}</span>
                  {c.tooltip && (
                    <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-500/20">
                      {c.tooltip}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold tabular-nums text-primary">
                  {formatARS(c.monto)}
                </span>
              </div>
            ))}

            {esLimitado && result.totalBruto === result.vacacionesProporcionales && (
              <div className="px-6 py-4 text-xs text-muted-foreground text-center bg-zinc-50/50">
                No corresponden otros conceptos para este tipo de desvinculación.
              </div>
            )}

            <Separator className="bg-border/40" />
            <div className="flex items-center justify-between px-6 py-3.5 bg-primary/5 rounded-b-xl">
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4 text-primary" />
                <span className="text-sm font-bold text-foreground">Total</span>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary border border-primary/20 text-[10px]"
                >
                  {result.tipoDespido === "sin_causa" ? "Art. 245 LCT" : "Liquidación parcial"}
                </Badge>
              </div>
              <span className="text-base font-bold tabular-nums text-primary">
                {formatARS(result.totalBruto)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Info card */}
      <div className="relative glass-panel rounded-xl border border-blue-500/20 bg-blue-50/50 p-5">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />
        <p className="text-xs text-blue-800 leading-relaxed">
          <strong>⚖️ Monto bruto estimativo.</strong> La indemnización no está sujeta a aportes
          previsionales ni Ganancias. Los plazos de pago: el empleador tiene 4 días hábiles para
          liquidar (Art. 128 LCT). El incumplimiento genera intereses y sanciones.
        </p>
      </div>
    </div>
  );
}
