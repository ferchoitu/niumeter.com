"use client";

import { useTranslations } from "next-intl";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type SalaryResult, formatARS } from "@/lib/calculations/argentina-salary";

interface SalaryChartProps {
  result: SalaryResult;
}

const CHART_COLORS = [
  "#10B981", // emerald — neto
  "#1E3A8A", // navy — jubilación
  "#60a5fa", // blue — obra social
  "#34d399", // green — ley 19032
  "#f59e0b", // amber — ganancias
  "#8b5cf6", // purple — gremial
  "#ef4444", // red — adicional
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    payload: { pct: number };
  }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (active && payload && payload.length) {
    const item = payload[0];
    return (
      <div className="bg-white border border-border rounded-xl shadow-lg px-3 py-2 text-sm">
        <p className="font-semibold text-foreground">{item.name}</p>
        <p className="tabular-nums text-[#10B981]">{formatARS(item.value)}</p>
        <p className="text-muted-foreground text-xs">{item.payload.pct.toFixed(1)}% del bruto</p>
      </div>
    );
  }
  return null;
}

interface LegendPayload {
  value: string;
  color: string;
}

function CustomLegend({ payload }: { payload?: LegendPayload[] }) {
  if (!payload) return null;
  return (
    <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-2">
      {payload.map((entry, idx) => (
        <li key={idx} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <span
            className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: entry.color }}
          />
          {entry.value}
        </li>
      ))}
    </ul>
  );
}

export default function SalaryChart({ result }: SalaryChartProps) {
  const t = useTranslations("calculator.argentina.resultados");

  const data = [
    {
      name: t("netoLabel"),
      value: result.neto,
      pct: (result.neto / result.bruto) * 100,
    },
    ...result.desglose.map((item) => ({
      name: item.label.replace(/\s*\(\d+(?:\.\d+)?%\)/, ""), // strip percentage from label
      value: item.monto,
      pct: item.porcentaje,
    })),
  ];

  return (
    <Card className="border border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{t("graficaTitulo")}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Fixed height container prevents CLS */}
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="48%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                nameKey="name"
                animationBegin={0}
                animationDuration={600}
              >
                {data.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    strokeWidth={0}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
