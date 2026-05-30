"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calculator, Share2, Check, Users, Building2, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  determinarCategoriaMonotributo,
  formatARS,
  formatNumber,
  parseFormattedNumber,
  type MonotributoInput,
  type MonotributoResult,
  type TipoActividad,
} from "@/lib/calculations/argentina-monotributo";

const STORAGE_KEY = "niumeter_arg_monotributo_last";

const schema = z.object({
  ingresos: z.string().min(1),
  tipoActividad: z.enum(["servicios", "bienes"]),
  tieneEmpleados: z.boolean(),
  cantidadEmpleados: z.string(),
  tieneSuperficie: z.boolean(),
  superficieM2: z.string(),
});

type FormData = z.infer<typeof schema>;

function formatInputValue(value: string): string {
  const raw = value.replace(/\./g, "").replace(/[^0-9]/g, "");
  if (!raw) return "";
  return new Intl.NumberFormat("es-AR").format(parseInt(raw, 10));
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function PendingBadge() {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 border border-amber-200 rounded px-1.5 py-0.5">
      <AlertTriangle className="h-3 w-3" />
      PENDIENTE
    </span>
  );
}

function CategoriaCard({
  cat,
  tipoActividad,
  variant = "default",
}: {
  cat: NonNullable<MonotributoResult["categoriaAnterior"]>;
  tipoActividad: TipoActividad;
  variant?: "default" | "active" | "next";
}) {
  const cuota = tipoActividad === "servicios" ? cat.cuotaServicios : cat.cuotaBienes;
  const variantCls = {
    default: "border-border/40 bg-card",
    active: "border-primary bg-primary/5 ring-1 ring-primary",
    next: "border-border/40 bg-card opacity-70",
  }[variant];

  return (
    <div className={`rounded-xl border p-4 transition-all ${variantCls}`}>
      <div className="flex items-center justify-between mb-2">
        <span className={`text-2xl font-bold ${variant === "active" ? "text-primary" : "text-foreground"}`}>
          Cat. {cat.letra}
        </span>
        {variant === "active" && (
          <span className="text-xs font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">
            Tu categoría
          </span>
        )}
      </div>
      <p className="text-sm text-muted-foreground mb-1">Cuota mensual</p>
      {cat.cuotaValidated && cuota !== null ? (
        <p className={`text-base font-bold ${variant === "active" ? "text-primary" : "text-foreground"}`}>
          {formatARS(cuota)}
        </p>
      ) : (
        <PendingBadge />
      )}
      <p className="text-xs text-muted-foreground mt-2">Tope anual</p>
      {cat.ingresoMaxValidated && cat.ingresoMax !== null ? (
        <p className="text-sm font-medium text-foreground">${formatNumber(cat.ingresoMax)}</p>
      ) : cat.ingresoMax !== null ? (
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-medium text-foreground">${formatNumber(cat.ingresoMax)}</p>
          <PendingBadge />
        </div>
      ) : (
        <PendingBadge />
      )}
    </div>
  );
}

// ─── Results panel ────────────────────────────────────────────────────────────

function MonotributoResults({
  result,
  tipoActividad,
  ingresosBrutos,
}: {
  result: MonotributoResult;
  tipoActividad: TipoActividad;
  ingresosBrutos: number;
}) {
  if (result.superaTopeMaximo) {
    return (
      <div className="relative rounded-xl border-2 border-red-300 bg-red-50 p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-700 text-lg mb-2">Superás el tope del monotributo</p>
            <p className="text-sm text-red-600 leading-relaxed mb-3">
              Tus ingresos de <strong>${formatNumber(ingresosBrutos)}/año</strong> superan el tope de la categoría K
              (<strong>${formatNumber(result.topeAnual ?? 108357084)}/año</strong>).
            </p>
            <p className="text-sm text-red-700 font-medium leading-relaxed">
              Debés inscribirte en el <strong>Régimen General (IVA + Ganancias)</strong>.
              Te recomendamos consultar con un contador.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { categoria, cuotaMensual, cuotaValidated, topeAnual, topeValidated, margenRestante,
    categoriaAnterior, categoriaSiguiente, montoParaSiguiente, desgloseValidated } = result;

  return (
    <div className="space-y-5">
      {/* Panel principal */}
      <div className="relative glass-panel rounded-xl border border-border/40 p-6">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground mb-4">
          <TrendingUp className="h-4 w-4 text-primary" />
          Tu categoría de monotributo
        </div>

        {/* Categoría grande */}
        <div className="flex items-end gap-4 mb-6">
          <div className="flex flex-col">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Categoría</span>
            <span className="text-7xl font-black text-primary leading-none">{categoria.letra}</span>
          </div>
          <div className="mb-2">
            <span className="text-xs text-muted-foreground block mb-1">Cuota mensual total</span>
            {cuotaValidated && cuotaMensual !== null ? (
              <span className="text-3xl font-bold text-foreground">{formatARS(cuotaMensual)}</span>
            ) : (
              <PendingBadge />
            )}
          </div>
        </div>

        {/* Desglose cuota */}
        <div className="border border-border/40 rounded-lg p-4 mb-4 bg-zinc-50/50">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Desglose de la cuota
          </p>
          {desgloseValidated ? (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Impuesto integrado</span>
                <span className="font-medium">{formatARS(categoria.impuestoIntegrado ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Aporte jubilatorio (SIPA)</span>
                <span className="font-medium">{formatARS(categoria.aporteSIPA ?? 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Obra social</span>
                <span className="font-medium">{formatARS(categoria.obraSocial ?? 0)}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />
              <span>Desglose en validación — <PendingBadge /></span>
            </div>
          )}
        </div>

        {/* Tope y margen */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-border/40 p-3 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Tope de facturación</p>
            {topeValidated && topeAnual !== null ? (
              <p className="text-sm font-bold text-foreground">${formatNumber(topeAnual)}<span className="text-xs font-normal text-muted-foreground">/año</span></p>
            ) : topeAnual !== null ? (
              <div>
                <p className="text-sm font-bold text-foreground">${formatNumber(topeAnual)}/año</p>
                <PendingBadge />
              </div>
            ) : (
              <PendingBadge />
            )}
          </div>
          <div className="rounded-lg border border-border/40 p-3 bg-card">
            <p className="text-xs text-muted-foreground mb-1">Margen disponible</p>
            {margenRestante !== null ? (
              <p className="text-sm font-bold text-emerald-600">${formatNumber(margenRestante)}<span className="text-xs font-normal text-muted-foreground"> restantes</span></p>
            ) : (
              <PendingBadge />
            )}
          </div>
        </div>
      </div>

      {/* Panel "¿Estás bien categorizado?" */}
      <div className="rounded-xl border border-border/40 bg-card p-5">
        <p className="text-sm font-semibold text-foreground mb-4">¿Estás bien categorizado?</p>
        <div className="grid gap-3">
          {categoriaAnterior && (
            <CategoriaCard cat={categoriaAnterior} tipoActividad={tipoActividad} variant="default" />
          )}
          <CategoriaCard cat={categoria} tipoActividad={tipoActividad} variant="active" />
          {categoriaSiguiente && (
            <CategoriaCard cat={categoriaSiguiente} tipoActividad={tipoActividad} variant="next" />
          )}
        </div>

        {/* Mensaje "con X más subís" */}
        {categoriaSiguiente && montoParaSiguiente !== null && montoParaSiguiente > 0 && (
          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground bg-zinc-50 border border-border/40 rounded-lg p-3">
            <Info className="h-4 w-4 text-primary shrink-0" />
            <span>
              Con <strong className="text-foreground">${formatNumber(montoParaSiguiente)}</strong> más de
              facturación anual subís a categoría <strong className="text-foreground">{categoriaSiguiente.letra}</strong>.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ArgentinaMonotributoCalculator() {
  const [result, setResult] = useState<MonotributoResult | null>(null);
  const [copied, setCopied] = useState(false);

  const { register, watch, setValue } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      ingresos: "",
      tipoActividad: "servicios",
      tieneEmpleados: false,
      cantidadEmpleados: "1",
      tieneSuperficie: false,
      superficieM2: "",
    },
  });

  // Restore from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as FormData;
        Object.entries(data).forEach(([k, v]) => setValue(k as keyof FormData, v as string & boolean));
      }
    } catch { /* ignore */ }
  }, [setValue]);

  // Restore from URL params
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    if (p.get("ingresos")) {
      setValue("ingresos", formatInputValue(p.get("ingresos")!));
      if (p.get("tipo")) setValue("tipoActividad", p.get("tipo") as TipoActividad);
    }
  }, [setValue]);

  const doCalc = useCallback((values: FormData) => {
    const ingresos = parseFormattedNumber(values.ingresos);
    if (ingresos <= 0) { setResult(null); return; }

    const input: MonotributoInput = {
      ingresosBrutosAnuales: ingresos,
      tipoActividad: values.tipoActividad,
      tieneEmpleados: values.tieneEmpleados,
      cantidadEmpleados: parseInt(values.cantidadEmpleados) || 0,
      tieneSuperficie: values.tieneSuperficie,
      superficieM2: parseFloat(values.superficieM2) || 0,
    };

    const r = determinarCategoriaMonotributo(input);
    setResult(r);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(values)); } catch { /* ignore */ }
  }, []);

  const watchedValues = watch();
  useEffect(() => {
    const timer = setTimeout(() => doCalc(watchedValues), 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchedValues.ingresos,
    watchedValues.tipoActividad,
    watchedValues.tieneEmpleados,
    watchedValues.cantidadEmpleados,
    watchedValues.tieneSuperficie,
    watchedValues.superficieM2,
  ]);

  const handleShare = async () => {
    const values = watch();
    const params = new URLSearchParams({
      ingresos: parseFormattedNumber(values.ingresos).toString(),
      tipo: values.tipoActividad,
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

  const tieneEmpleados = watch("tieneEmpleados");
  const tieneSuperficie = watch("tieneSuperficie");
  const tipoActividad = watch("tipoActividad");
  const ingresosBrutos = parseFormattedNumber(watch("ingresos"));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      {/* ===== INPUTS ===== */}
      <div className="lg:col-span-2 relative glass-panel p-6 rounded-xl border border-border/40">
        <span className="cyber-corner cyber-corner-tl" />
        <span className="cyber-corner cyber-corner-tr" />
        <span className="cyber-corner cyber-corner-bl" />
        <span className="cyber-corner cyber-corner-br" />

        <div className="flex items-center gap-2 text-lg font-bold mb-5 border-b border-border/40 pb-3">
          <Calculator className="h-5 w-5 text-primary" />
          Ingresá tus datos
        </div>

        <div className="space-y-5">
          {/* Ingresos brutos */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <Label htmlFor="ingresos" className="text-sm font-medium">
                Ingresos brutos anuales (ARS)
              </Label>
              <Tooltip>
                <TooltipTrigger className="inline-flex cursor-help">
                  <Info className="h-3.5 w-3.5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent className="max-w-xs text-xs">
                  Lo que facturaste en los últimos 12 meses.
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-muted-foreground">$</span>
              <Input
                id="ingresos"
                inputMode="numeric"
                placeholder="Ej: 8.000.000"
                className="pl-7 tabular-nums text-base font-medium focus-brand bg-zinc-50 border-border/40"
                {...register("ingresos", {
                  onChange: (e) => setValue("ingresos", formatInputValue(e.target.value)),
                })}
              />
            </div>
            <p className="text-xs text-muted-foreground">Lo que facturaste en los últimos 12 meses</p>
          </div>

          {/* Tipo de actividad */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Tipo de actividad</Label>
            <div className="grid grid-cols-2 gap-2">
              {(["servicios", "bienes"] as TipoActividad[]).map((tipo) => (
                <button
                  key={tipo}
                  type="button"
                  onClick={() => setValue("tipoActividad", tipo)}
                  className={`text-left px-4 py-3 rounded-lg border transition-all duration-150 ${
                    tipoActividad === tipo
                      ? "bg-primary/10 border-primary"
                      : "border-border/40 bg-card hover:border-primary/40"
                  }`}
                >
                  <p className={`text-sm font-semibold ${tipoActividad === tipo ? "text-primary" : "text-foreground"}`}>
                    {tipo === "servicios" ? "Servicios" : "Venta de bienes"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {tipo === "servicios" ? "Locaciones incluidas" : "Bienes muebles"}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Empleados */}
          <div className="space-y-3 rounded-lg border border-border/40 p-3 bg-zinc-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="tieneEmpleados" className="text-sm cursor-pointer">
                  ¿Tenés empleados a cargo?
                </Label>
              </div>
              <Switch
                id="tieneEmpleados"
                checked={tieneEmpleados}
                onCheckedChange={(v) => setValue("tieneEmpleados", v)}
              />
            </div>
            {tieneEmpleados && (
              <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-200">
                <Label htmlFor="cantidadEmpleados" className="text-xs text-muted-foreground">
                  Cantidad de empleados
                </Label>
                <Input
                  id="cantidadEmpleados"
                  type="number"
                  min="1"
                  max="3"
                  className="text-sm focus-brand bg-white border-border/40"
                  {...register("cantidadEmpleados")}
                />
                <p className="text-xs text-amber-600">
                  ⚠️ La tabla de categoría mínima por empleados está en validación ARCA.
                </p>
              </div>
            )}
          </div>

          {/* Superficie */}
          <div className="space-y-3 rounded-lg border border-border/40 p-3 bg-zinc-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="tieneSuperficie" className="text-sm cursor-pointer">
                  ¿Tenés local o superficie afectada?
                </Label>
              </div>
              <Switch
                id="tieneSuperficie"
                checked={tieneSuperficie}
                onCheckedChange={(v) => setValue("tieneSuperficie", v)}
              />
            </div>
            {tieneSuperficie && (
              <div className="space-y-1.5 animate-in slide-in-from-top-1 duration-200">
                <Label htmlFor="superficieM2" className="text-xs text-muted-foreground">
                  Superficie en m²
                </Label>
                <div className="relative">
                  <Input
                    id="superficieM2"
                    inputMode="numeric"
                    placeholder="Ej: 45"
                    className="pr-10 text-sm focus-brand bg-white border-border/40"
                    {...register("superficieM2")}
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">m²</span>
                </div>
                <p className="text-xs text-amber-600">
                  ⚠️ La tabla de categoría mínima por m² está en validación ARCA.
                </p>
              </div>
            )}
          </div>

          {/* Compartir */}
          {result && !result.superaTopeMaximo && (
            <Button
              variant="outline"
              className="w-full gap-2 mt-2 border-primary/20 hover:border-primary/50 text-primary hover:bg-primary/10 transition-colors"
              onClick={handleShare}
            >
              {copied ? (
                <><Check className="h-4 w-4 text-primary" />¡Link copiado!</>
              ) : (
                <><Share2 className="h-4 w-4" />Compartir este cálculo</>
              )}
            </Button>
          )}

          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
            ⚠️ Cálculo estimativo — Ley 27.743. Datos ARCA Junio 2026. No reemplaza asesoramiento contable.
          </p>
        </div>
      </div>

      {/* ===== RESULTADOS ===== */}
      <div className="lg:col-span-3 space-y-5">
        {result ? (
          <MonotributoResults
            result={result}
            tipoActividad={tipoActividad}
            ingresosBrutos={ingresosBrutos}
          />
        ) : (
          <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-border/40 bg-card/40 min-h-[400px] text-center p-8">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calculator className="h-6 w-6 text-primary" />
            </div>
            <p className="text-base font-medium text-foreground">Ingresá tus ingresos anuales</p>
            <p className="mt-1 text-sm text-muted-foreground">
              La categoría y cuota aparecerán aquí en tiempo real
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
