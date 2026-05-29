"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Gift, Share2, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  calcularAguinaldo,
  type AguinaldoResult,
  parseFormattedNumber,
  formatNumber,
} from "@/lib/calculations/argentina-aguinaldo";
import AguinaldoResults from "./AguinaldoResults";

const STORAGE_KEY = "niumeter_arg_aguinaldo_last";

const schema = z.object({
  mejorRemuneracion: z
    .string()
    .min(1, "Ingresá la mejor remuneración del semestre")
    .refine((v) => parseFormattedNumber(v) > 0, {
      message: "El valor debe ser mayor a 0",
    }),
  mesesTrabajados: z.string(),
  tieneConvenio: z.boolean(),
  aporteGremial: z.string(),
  sueldoBrutoMensual: z.string(),
  tieneConyuge: z.boolean(),
  cantidadHijos: z.string(),
});

type FormData = z.infer<typeof schema>;

function formatInputValue(value: string): string {
  const raw = value.replace(/\./g, "").replace(/[^0-9]/g, "");
  if (!raw) return "";
  return formatNumber(parseInt(raw, 10));
}

export default function ArgentinaAguinaldoCalculator() {
  const [result, setResult] = useState<AguinaldoResult | null>(null);
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
      mesesTrabajados: "6",
      tieneConvenio: false,
      aporteGremial: "2",
      sueldoBrutoMensual: "",
      tieneConyuge: false,
      cantidadHijos: "0",
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
    } catch {
      // ignore
    }
  }, [setValue]);

  // Restore from URL params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const mejor = params.get("mejor");
    if (mejor) {
      setValue("mejorRemuneracion", formatInputValue(mejor));
      setValue("mesesTrabajados", params.get("meses") ?? "6");
      setValue("tieneConvenio", params.get("convenio") === "1");
      setValue("aporteGremial", params.get("gremial") ?? "2");
      setValue("sueldoBrutoMensual", formatInputValue(params.get("bruto") ?? ""));
      setValue("tieneConyuge", params.get("conyuge") === "1");
      setValue("cantidadHijos", params.get("hijos") ?? "0");
    }
  }, [setValue]);

  const doCalc = useCallback((values: FormData) => {
    const mejorRemuneracion = parseFormattedNumber(values.mejorRemuneracion);
    if (mejorRemuneracion <= 0) {
      setResult(null);
      return;
    }

    const r = calcularAguinaldo({
      mejorRemuneracion,
      mesesTrabajados: parseInt(values.mesesTrabajados, 10) || 6,
      tieneConvenio: values.tieneConvenio,
      aporteGremial: parseFloat(values.aporteGremial) || 0,
      sueldoBrutoMensual: parseFormattedNumber(values.sueldoBrutoMensual) || mejorRemuneracion,
      tieneConyuge: values.tieneConyuge,
      cantidadHijos: parseInt(values.cantidadHijos, 10) || 0,
    });

    setResult(r);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore
    }
  }, []);

  // Debounced watch
  const watchedValues = watch();
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer);
    const timer = setTimeout(() => {
      doCalc(watchedValues);
    }, 300);
    setDebounceTimer(timer);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchedValues.mejorRemuneracion,
    watchedValues.mesesTrabajados,
    watchedValues.tieneConvenio,
    watchedValues.aporteGremial,
    watchedValues.sueldoBrutoMensual,
    watchedValues.tieneConyuge,
    watchedValues.cantidadHijos,
  ]);

  const handleShare = async () => {
    const values = watch();
    const params = new URLSearchParams({
      mejor: parseFormattedNumber(values.mejorRemuneracion).toString(),
      meses: values.mesesTrabajados,
      convenio: values.tieneConvenio ? "1" : "0",
      gremial: values.aporteGremial,
      bruto: parseFormattedNumber(values.sueldoBrutoMensual).toString(),
      conyuge: values.tieneConyuge ? "1" : "0",
      hijos: values.cantidadHijos,
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

  const tieneConvenio = watch("tieneConvenio");
  const tieneConyuge = watch("tieneConyuge");
  const mesesTrabajados = watch("mesesTrabajados");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      {/* ===== INPUTS PANEL ===== */}
      <div className="lg:col-span-2 relative glass-panel p-6 rounded-xl border border-border/40">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="flex items-center gap-2 text-lg font-bold mb-5 border-b border-border/40 pb-3">
          <Gift className="h-5 w-5 text-primary" />
          Ingresá tus datos
        </div>

        <div className="space-y-5">
          {/* Mejor remuneración */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="mejorRemuneracion" className="text-sm font-medium">
                Mejor remuneración del semestre (ARS)
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  Es el mayor sueldo bruto mensual que percibiste durante los 6 meses del semestre actual (enero–junio o julio–diciembre).
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                $
              </span>
              <Input
                id="mejorRemuneracion"
                inputMode="numeric"
                placeholder="Ej: 1.500.000"
                className="pl-7 tabular-nums text-base font-medium focus-brand bg-zinc-50 border-border/40"
                {...register("mejorRemuneracion", {
                  onChange: (e) => {
                    setValue("mejorRemuneracion", formatInputValue(e.target.value));
                  },
                })}
              />
            </div>
            {errors.mejorRemuneracion && (
              <p className="text-xs text-destructive">{errors.mejorRemuneracion.message}</p>
            )}
          </div>

          {/* Meses trabajados */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="mesesTrabajados" className="text-sm font-medium">
                Meses trabajados en el semestre
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  Si completaste los 6 meses, dejalo en 6. Si ingresaste o te fuiste en el semestre, indicá los meses trabajados para calcular el SAC proporcional.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {[1, 2, 3, 4, 5, 6].map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setValue("mesesTrabajados", m.toString())}
                  className={`rounded-lg border py-2 text-sm font-semibold transition-all duration-150 ${
                    mesesTrabajados === m.toString()
                      ? "bg-primary border-primary text-black font-bold shadow-sm"
                      : "border-border/40 bg-card hover:border-primary/50 hover:bg-primary/5 text-foreground"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              {mesesTrabajados === "6"
                ? "Semestre completo — SAC total"
                : `Proporcional a ${mesesTrabajados} mes${parseInt(mesesTrabajados) !== 1 ? "es" : ""}`}
            </p>
          </div>

          {/* Sueldo mensual habitual (para Ganancias) */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="sueldoBrutoMensual" className="text-sm font-medium">
                Sueldo bruto mensual habitual
                <span className="ml-1 text-xs text-muted-foreground font-normal">(opcional)</span>
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  Necesario para estimar si el SAC te genera retención adicional de Ganancias. Si lo dejás vacío, usamos la mejor remuneración.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                $
              </span>
              <Input
                id="sueldoBrutoMensual"
                inputMode="numeric"
                placeholder="Ej: 1.200.000"
                className="pl-7 tabular-nums text-base focus-brand bg-zinc-50 border-border/40"
                {...register("sueldoBrutoMensual", {
                  onChange: (e) => {
                    setValue("sueldoBrutoMensual", formatInputValue(e.target.value));
                  },
                })}
              />
            </div>
          </div>

          {/* Convenio colectivo */}
          <div className="flex items-center justify-between rounded-lg border border-border/40 p-3 bg-zinc-50">
            <div className="flex items-center gap-2">
              <Label htmlFor="tieneConvenio" className="text-sm font-medium cursor-pointer">
                ¿Estás en convenio colectivo?
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  El aporte gremial también se descuenta del SAC.
                </TooltipContent>
              </Tooltip>
            </div>
            <Switch
              id="tieneConvenio"
              {...register("tieneConvenio")}
              checked={tieneConvenio}
              onCheckedChange={(val) => setValue("tieneConvenio", val)}
            />
          </div>

          {tieneConvenio && (
            <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-200">
              <Label htmlFor="aporteGremial" className="text-sm font-medium">
                Aporte gremial (%)
              </Label>
              <div className="relative">
                <Input
                  id="aporteGremial"
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  max="10"
                  placeholder="Ej: 2"
                  className="pr-8 text-base focus-brand bg-zinc-50 border-border/40"
                  {...register("aporteGremial")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          )}

          {/* Deducciones familiares (para Ganancias) */}
          <div className="space-y-3 rounded-lg border border-border/40 p-3 bg-zinc-50/50">
            <p className="text-sm font-medium text-foreground">Deducciones familiares (Ganancias)</p>
            <div className="flex items-center justify-between">
              <Label htmlFor="tieneConyuge" className="text-sm cursor-pointer">
                ¿Tiene cónyuge a cargo?
              </Label>
              <Switch
                id="tieneConyuge"
                {...register("tieneConyuge")}
                checked={tieneConyuge}
                onCheckedChange={(val) => setValue("tieneConyuge", val)}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <Label htmlFor="cantidadHijos" className="text-sm">
                Cantidad de hijos
              </Label>
              <Input
                id="cantidadHijos"
                type="number"
                inputMode="numeric"
                min="0"
                max="20"
                className="w-20 text-center text-base focus-brand bg-zinc-50 border-border/40"
                {...register("cantidadHijos")}
              />
            </div>
          </div>

          {/* Share */}
          {result && (
            <Button
              variant="outline"
              className="w-full gap-2 mt-2 border-primary/20 hover:border-primary/50 text-primary hover:text-primary-foreground hover:bg-primary/10 transition-colors"
              onClick={handleShare}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-primary" />
                  ¡Link copiado!
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  Compartir este cálculo
                </>
              )}
            </Button>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
            ⚠️ Cálculo estimativo basado en Art. 121-122 LCT. Verificá siempre con tu liquidador de sueldos.
          </p>
        </div>
      </div>

      {/* ===== RESULTS PANEL ===== */}
      <div className="lg:col-span-3 space-y-5">
        {result ? (
          <AguinaldoResults result={result} />
        ) : (
          <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/40 min-h-[400px] text-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <p className="text-base font-medium text-foreground">
              Ingresá la mejor remuneración del semestre
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              El resultado aparecerá aquí en tiempo real
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
