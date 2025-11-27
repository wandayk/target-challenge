import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, DollarSign, TrendingUp, Wallet } from "lucide-react";

interface JurosMetricsCardsProps {
  diasAtraso: number;
  valorOriginal: number;
  jurosAcumulados: number;
  valorTotal: number;
}

export function JurosMetricsCards({
  diasAtraso,
  valorOriginal,
  jurosAcumulados,
  valorTotal,
}: JurosMetricsCardsProps) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const percentualJuros =
    valorOriginal > 0
      ? ((jurosAcumulados / valorOriginal) * 100).toFixed(2)
      : "0.00";

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Dias em Atraso</CardTitle>
          <div className="bg-muted p-1.5 rounded">
            <Calendar className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground">{diasAtraso}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {diasAtraso === 0 ? "Sem atraso" : `Dia(s) de atraso`}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Valor Original</CardTitle>
          <div className="bg-muted p-1.5 rounded">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(valorOriginal)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Valor da cobrança
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">
            Juros Acumulados
          </CardTitle>
          <div className="bg-muted p-1.5 rounded">
            <TrendingUp className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {formatCurrency(jurosAcumulados)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            +{percentualJuros}% sobre o valor original
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
          <div className="bg-muted p-1.5 rounded">
            <Wallet className="h-4 w-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(valorTotal)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Valor com juros inclusos
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
