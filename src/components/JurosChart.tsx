import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

interface JurosChartProps {
  dados: { dia: number; valor: number }[];
  valorOriginal: number;
  tipoJuros: "simples" | "compostos";
}

export function JurosChart({
  dados,
  valorOriginal,
  tipoJuros,
}: JurosChartProps) {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);

  if (dados.length === 0) {
    return (
      <Card className="h-min">
        <CardHeader className="border-b gap-0">
          <CardTitle>
            Evolução dos Juros (
            {tipoJuros === "simples" ? "Simples" : "Compostos"})
          </CardTitle>
          <CardDescription>
            Visualize o crescimento da dívida ao longo do tempo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-muted p-1.5 rounded">
              <TrendingUp className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mt-4">
              Nenhum dado para exibir
            </h3>
            <p className="text-sm text-muted-foreground">
              Informe o valor e a data de vencimento para visualizar o gráfico
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="border-b gap-0">
        <CardTitle>
          Evolução dos Juros (
          {tipoJuros === "simples" ? "Simples" : "Compostos"})
        </CardTitle>
        <CardDescription>
          Crescimento da dívida com multa de 2,5% ao dia
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={dados}>
            <defs>
              <linearGradient id="colorValor" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.3}
                />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="dia"
              className="text-xs"
              tick={{ fill: "var(--foreground)" }}
            />
            <YAxis
              className="text-sm"
              tick={{ fill: "var(--foreground)" }}
              tickFormatter={formatCurrency}
              domain={[valorOriginal * 0.95, "auto"]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
              }}
              formatter={(value: number) => [
                formatCurrency(value),
                "Valor Total",
              ]}
              labelFormatter={(label) => `Dia ${label}`}
              labelStyle={{ color: "var(--foreground)" }}
            />
            <Area
              type="monotone"
              dataKey="valor"
              stroke="var(--primary)"
              strokeWidth={2}
              fill="url(#colorValor)"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-orange-600" />
          {tipoJuros === "simples" ? (
            <span>
              A cada dia de atraso, o valor aumenta em{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(valorOriginal * 0.025)}
              </span>{" "}
              (2,5%)
            </span>
          ) : (
            <span>
              A cada dia de atraso, o valor aumenta no dia de hoje:{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency(
                  (dados[dados.length - 1]?.valor || 0) -
                    (dados[dados.length - 2]?.valor || valorOriginal)
                )}
              </span>
              {" • "}
              amanhã:{" "}
              <span className="font-semibold text-foreground">
                {formatCurrency((dados[dados.length - 1]?.valor || 0) * 0.025)}
              </span>{" "}
              (+2,5%)
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
