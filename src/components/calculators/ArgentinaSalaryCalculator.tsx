"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { Calculator, Share2, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  calcularSueldoNeto,
  type SalaryResult,
  type SalaryOptions,
  parseFormattedNumber,
  formatNumber,
} from "@/lib/calculations/argentina-salary";
import SalaryResults from "./SalaryResults";
import SalaryChart from "./SalaryChart";

const STORAGE_KEY = "niumeter_arg_salary_last";

const schema = z.object({
  sueldoBruto: z
    .string()
    .min(1, "Ingresá un sueldo")
    .refine((v) => parseFormattedNumber(v) > 0, { message: "El sueldo debe ser mayor a 0" }),
  tieneConvenio: z.boolean(),
  aporteGremial: z.string(),
  tieneConyuge: z.boolean(),
  cantidadHijos: z.string(),
  descuentoAdicional: z.string(),
});

type FormData = z.infer<typeof schema>;

function formatInputValue(value: string): string {
  const raw = value.replace(/\./g, "").replace(/[^0-9]/g, "");
  if (!raw) return "";
  return formatNumber(parseInt(raw, 10));
}

export default function ArgentinaSalaryCalculator() {
  const t = useTranslations("calculator.argentina");
  const [result, setResult] = useState<SalaryResult | null>(null);
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
      sueldoBruto: "",
      tieneConvenio: false,
      aporteGremial: "2",
      tieneConyuge: false,
      cantidadHijos: "0",
      descuentoAdicional: "",
    },
  });

  // Load from localStorage on mount
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
      // Silently ignore localStorage errors
    }
  }, [setValue]);

  // Load from URL query params on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const bruto = params.get("bruto");
    if (bruto) {
      setValue("sueldoBruto", formatInputValue(bruto));
      setValue("tieneConvenio", params.get("convenio") === "1");
      setValue("aporteGremial", params.get("gremial") ?? "2");
      setValue("tieneConyuge", params.get("conyuge") === "1");
      setValue("cantidadHijos", params.get("hijos") ?? "0");
      setValue("descuentoAdicional", params.get("adicional") ?? "");
    }
  }, [setValue]);

  const doCalc = useCallback((values: FormData) => {
    const options: SalaryOptions = {
      sueldoBruto: parseFormattedNumber(values.sueldoBruto),
      tieneConvenio: values.tieneConvenio,
      aporteGremial: parseFloat(values.aporteGremial) || 0,
      tieneConyuge: values.tieneConyuge,
      cantidadHijos: parseInt(values.cantidadHijos, 10) || 0,
      descuentoAdicional: parseFormattedNumber(values.descuentoAdicional),
    };

    if (options.sueldoBruto <= 0) {
      setResult(null);
      return;
    }

    const r = calcularSueldoNeto(options);
    setResult(r);

    // Persist to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // Ignore
    }
  }, []);

  // Watch all values with 300ms debounce
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
    watchedValues.sueldoBruto,
    watchedValues.tieneConvenio,
    watchedValues.aporteGremial,
    watchedValues.tieneConyuge,
    watchedValues.cantidadHijos,
    watchedValues.descuentoAdicional,
  ]);

  const handleShare = async () => {
    const values = watch();
    const params = new URLSearchParams({
      bruto: parseFormattedNumber(values.sueldoBruto).toString(),
      convenio: values.tieneConvenio ? "1" : "0",
      gremial: values.aporteGremial,
      conyuge: values.tieneConyuge ? "1" : "0",
      hijos: values.cantidadHijos,
      adicional: parseFormattedNumber(values.descuentoAdicional).toString(),
    });
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for mobile
      window.prompt("Copiá este link:", url);
    }
  };

  const tieneConvenio = watch("tieneConvenio");
  const tieneConyuge = watch("tieneConyuge");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      {/* ===== INPUTS PANEL ===== */}
      <Card className="lg:col-span-2 border border-border/60 shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calculator className="h-5 w-5 text-[#10B981]" />
            Ingresá tus datos
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Sueldo Bruto */}
          <div className="space-y-1.5">
            <Label htmlFor="sueldoBruto" className="text-sm font-medium">
              {t("inputs.sueldoBruto")}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                $
              </span>
              <Input
                id="sueldoBruto"
                inputMode="numeric"
                placeholder={t("inputs.sueldoBrutoPlaceholder")}
                className="pl-7 tabular-nums text-base font-medium focus-brand"
                {...register("sueldoBruto", {
                  onChange: (e) => {
                    const formatted = formatInputValue(e.target.value);
                    setValue("sueldoBruto", formatted);
                  },
                })}
              />
            </div>
            {errors.sueldoBruto && (
              <p className="text-xs text-destructive">{errors.sueldoBruto.message}</p>
            )}
          </div>

          {/* Convenio colectivo */}
          <div className="flex items-center justify-between rounded-lg border border-border p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <Label htmlFor="tieneConvenio" className="text-sm font-medium cursor-pointer">
                {t("inputs.convenio")}
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  Los convenios colectivos incluyen un aporte gremial adicional al sindicato correspondiente.
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

          {/* Aporte gremial — solo si está en convenio */}
          {tieneConvenio && (
            <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-200">
              <Label htmlFor="aporteGremial" className="text-sm font-medium">
                {t("inputs.aporteGremial")}
              </Label>
              <div className="relative">
                <Input
                  id="aporteGremial"
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min="0"
                  max="10"
                  placeholder={t("inputs.aporteGremialPlaceholder")}
                  className="pr-8 text-base focus-brand"
                  {...register("aporteGremial")}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  %
                </span>
              </div>
            </div>
          )}

          {/* Deducciones familiares */}
          <div className="space-y-3 rounded-lg border border-border p-3 bg-muted/20">
            <p className="text-sm font-medium text-foreground">Deducciones familiares</p>

            <div className="flex items-center justify-between">
              <Label htmlFor="tieneConyuge" className="text-sm cursor-pointer">
                {t("inputs.conyuge")}
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
                {t("inputs.hijos")}
              </Label>
              <Input
                id="cantidadHijos"
                type="number"
                inputMode="numeric"
                min="0"
                max="20"
                className="w-20 text-center text-base focus-brand"
                {...register("cantidadHijos")}
              />
            </div>
          </div>

          {/* Descuento adicional */}
          <div className="space-y-1.5">
            <Label htmlFor="descuentoAdicional" className="text-sm font-medium">
              {t("inputs.descuentoAdicional")}
              <span className="ml-1 text-xs text-muted-foreground font-normal">(opcional)</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">
                $
              </span>
              <Input
                id="descuentoAdicional"
                inputMode="numeric"
                placeholder={t("inputs.descuentoAdicionalPlaceholder")}
                className="pl-7 text-base focus-brand"
                {...register("descuentoAdicional", {
                  onChange: (e) => {
                    const formatted = formatInputValue(e.target.value);
                    setValue("descuentoAdicional", formatted);
                  },
                })}
              />
            </div>
          </div>

          {/* Share button */}
          {result && (
            <Button
              variant="outline"
              className="w-full gap-2 mt-2"
              onClick={handleShare}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-[#10B981]" />
                  {t("inputs.copiadoMsg")}
                </>
              ) : (
                <>
                  <Share2 className="h-4 w-4" />
                  {t("inputs.compartirBtn")}
                </>
              )}
            </Button>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
            {t("advertencia")}
          </p>
        </CardContent>
      </Card>

      {/* ===== RESULTS PANEL ===== */}
      <div className="lg:col-span-3 space-y-5">
        {result ? (
          <>
            <SalaryResults result={result} />
            <SalaryChart result={result} />
          </>
        ) : (
          /* Placeholder vacío con altura reservada para evitar CLS */
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 min-h-[400px] text-center p-8">
            <div className="w-12 h-12 rounded-full bg-[#10B981]/10 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-[#10B981]" />
            </div>
            <p className="text-base font-medium text-foreground">Ingresá tu sueldo bruto</p>
            <p className="mt-1 text-sm text-muted-foreground">
              El resultado aparecerá aquí en tiempo real
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
