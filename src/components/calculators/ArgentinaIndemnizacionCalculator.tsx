"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Scale, Share2, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  calcularIndemnizacion,
  type IndemnizacionResult,
  type TipoDespido,
  parseFormattedNumber,
  formatNumber,
} from "@/lib/calculations/argentina-indemnizacion";
import IndemnizacionResults from "./IndemnizacionResults";

const STORAGE_KEY = "niumeter_arg_indemnizacion_last";

const schema = z.object({
  mejorRemuneracion: z
    .string()
    .min(1, "Ingresá la mejor remuneración")
    .refine((v) => parseFormattedNumber(v) > 0, { message: "El valor debe ser mayor a 0" }),
  fechaIngreso: z.string().min(1, "Ingresá la fecha de ingreso"),
  fechaDespido: z.string().min(1, "Ingresá la fecha de despido"),
  tipoDespido: z.enum(["sin_causa", "con_causa", "renuncia"]),
  pravisoTrabajado: z.boolean(),
  pravisoDinero: z.boolean(),
});

type FormData = z.infer<typeof schema>;

function formatInputValue(value: string): string {
  const raw = value.replace(/\./g, "").replace(/[^0-9]/g, "");
  if (!raw) return "";
  return formatNumber(parseInt(raw, 10));
}

function todayISO(): string {
  return new Date().toISOString().split("T")[0];
}

export default function ArgentinaIndemnizacionCalculator() {
  const [result, setResult] = useState<IndemnizacionResult | null>(null);
  const [copied, setCopied] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      mejorRemuneracion: "",
      fechaIngreso: "",
      fechaDespido: todayISO(),
      tipoDespido: "sin_causa",
      pravisoTrabajado: false,
      pravisoDinero: false,
    },
  });

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as FormData;
        Object.entries(data).forEach(([key, val]) => {
          setValue(key as keyof FormData, val as string & boolean);
        });
      }
    } catch { /* ignore */ }
  }, [setValue]);

  // Restore from URL params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const remuneracion = params.get("remuneracion");
    if (remuneracion) {
      setValue("mejorRemuneracion", formatInputValue(remuneracion));
      setValue("fechaIngreso", params.get("ingreso") ?? "");
      setValue("fechaDespido", params.get("despido") ?? todayISO());
      setValue("tipoDespido", (params.get("tipo") as TipoDespido) ?? "sin_causa");
      setValue("pravisoTrabajado", params.get("pravisoTrabajado") === "1");
      setValue("pravisoDinero", params.get("pravisoDinero") === "1");
    }
  }, [setValue]);

  const doCalc = useCallback((values: FormData) => {
    const remuneracion = parseFormattedNumber(values.mejorRemuneracion);
    if (remuneracion <= 0 || !values.fechaIngreso || !values.fechaDespido) {
      setResult(null);
      return;
    }
    if (new Date(values.fechaIngreso) >= new Date(values.fechaDespido)) {
      setResult(null);
      return;
    }
    const r = calcularIndemnizacion({
      mejorRemuneracion: remuneracion,
      fechaIngreso: values.fechaIngreso,
      fechaDespido: values.fechaDespido,
      tipoDespido: values.tipoDespido,
      pravisoTrabajado: values.pravisoTrabajado,
      pravisoDinero: values.pravisoDinero,
    });
    setResult(r);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch { /* ignore */ }
  }, []);

  const watchedValues = watch();
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => doCalc(watchedValues), 300);
    setDebounceTimer(timer);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchedValues.mejorRemuneracion,
    watchedValues.fechaIngreso,
    watchedValues.fechaDespido,
    watchedValues.tipoDespido,
    watchedValues.pravisoTrabajado,
    watchedValues.pravisoDinero,
  ]);

  const handleShare = async () => {
    const values = watch();
    const params = new URLSearchParams({
      remuneracion: parseFormattedNumber(values.mejorRemuneracion).toString(),
      ingreso: values.fechaIngreso,
      despido: values.fechaDespido,
      tipo: values.tipoDespido,
      pravisoTrabajado: values.pravisoTrabajado ? "1" : "0",
      pravisoDinero: values.pravisoDinero ? "1" : "0",
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copiá este link:", url);
    }
  };

  const tipoDespido = watch("tipoDespido");
  const pravisoTrabajado = watch("pravisoTrabajado");
  const pravisoDinero = watch("pravisoDinero");
  const esSinCausa = tipoDespido === "sin_causa";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      {/* ===== INPUTS ===== */}
      <Card className="lg:col-span-2 border border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Scale className="h-5 w-5 text-[#10B981]" />
            Ingresá tus datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">

          {/* Mejor remuneración */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="mejorRemuneracion" className="text-sm font-medium">
                Mejor remuneración mensual (ARS)
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  La mejor remuneración mensual, normal y habitual del último año de trabajo (Art. 245 LCT). Incluye horas extras habituales.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">$</span>
              <Input
                id="mejorRemuneracion"
                inputMode="numeric"
                placeholder="Ej: 2.000.000"
                className="pl-7 tabular-nums text-base font-medium focus-brand"
                {...register("mejorRemuneracion", {
                  onChange: (e) => setValue("mejorRemuneracion", formatInputValue(e.target.value)),
                })}
              />
            </div>
            {errors.mejorRemuneracion && (
              <p className="text-xs text-destructive">{errors.mejorRemuneracion.message}</p>
            )}
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="fechaIngreso" className="text-sm font-medium">
                Fecha de ingreso
              </Label>
              <Input
                id="fechaIngreso"
                type="date"
                className="text-sm focus-brand"
                {...register("fechaIngreso")}
              />
              {errors.fechaIngreso && (
                <p className="text-xs text-destructive">{errors.fechaIngreso.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fechaDespido" className="text-sm font-medium">
                Fecha de despido
              </Label>
              <Input
                id="fechaDespido"
                type="date"
                className="text-sm focus-brand"
                {...register("fechaDespido")}
              />
            </div>
          </div>

          {/* Tipo de despido */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Tipo de desvinculación</Label>
            <div className="grid grid-cols-1 gap-2">
              {(["sin_causa", "con_causa", "renuncia"] as TipoDespido[]).map((tipo) => {
                const labels = {
                  sin_causa: { label: "Despido sin causa", desc: "Todos los conceptos" },
                  con_causa: { label: "Despido con causa", desc: "Solo SAC y vacaciones" },
                  renuncia: { label: "Renuncia", desc: "Solo SAC y vacaciones" },
                };
                return (
                  <button
                    key={tipo}
                    type="button"
                    onClick={() => setValue("tipoDespido", tipo)}
                    className={`text-left px-4 py-3 rounded-lg border transition-all duration-150 ${
                      tipoDespido === tipo
                        ? "bg-[#10B981]/10 border-[#10B981] text-foreground"
                        : "border-border bg-background hover:border-[#10B981]/40"
                    }`}
                  >
                    <p className={`text-sm font-semibold ${tipoDespido === tipo ? "text-[#10B981]" : ""}`}>
                      {labels[tipo].label}
                    </p>
                    <p className="text-xs text-muted-foreground">{labels[tipo].desc}</p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preaviso — solo si es sin causa */}
          {esSinCausa && (
            <div className="space-y-3 rounded-lg border border-border p-3 bg-muted/20 animate-in slide-in-from-top-1 duration-200">
              <p className="text-sm font-medium text-foreground">Preaviso</p>
              <div className="flex items-center justify-between">
                <Label htmlFor="pravisoTrabajado" className="text-sm cursor-pointer">
                  ¿Trabajó el período de preaviso?
                </Label>
                <Switch
                  id="pravisoTrabajado"
                  checked={pravisoTrabajado}
                  onCheckedChange={(val) => setValue("pravisoTrabajado", val)}
                />
              </div>
              {!pravisoTrabajado && (
                <div className="flex items-center justify-between animate-in slide-in-from-top-1 duration-200">
                  <Label htmlFor="pravisoDinero" className="text-sm cursor-pointer">
                    ¿Recibió preaviso en dinero?
                  </Label>
                  <Switch
                    id="pravisoDinero"
                    checked={pravisoDinero}
                    onCheckedChange={(val) => setValue("pravisoDinero", val)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Compartir */}
          {result && (
            <Button variant="outline" className="w-full gap-2 mt-2" onClick={handleShare}>
              {copied ? (
                <><Check className="h-4 w-4 text-[#10B981]" />¡Link copiado!</>
              ) : (
                <><Share2 className="h-4 w-4" />Compartir este cálculo</>
              )}
            </Button>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
            ⚠️ Cálculo estimativo — Art. 245 Ley 20.744. No reemplaza asesoramiento legal. SMVM: $367.800 (Res. 9/2025).
          </p>
        </CardContent>
      </Card>

      {/* ===== RESULTADOS ===== */}
      <div className="lg:col-span-3 space-y-5">
        {result ? (
          <IndemnizacionResults result={result} />
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 min-h-[400px] text-center p-8">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
              <Scale className="h-6 w-6 text-[#10B981]" />
            </div>
            <p className="text-base font-medium text-foreground">Ingresá tus datos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              El resultado aparecerá aquí en tiempo real
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
