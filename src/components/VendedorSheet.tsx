import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, ShoppingCart, Target } from "lucide-react";
import type { VendedorComissao } from "@/types";

interface VendedorSheetProps {
  vendedor: VendedorComissao | null;
  posicao: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VendedorSheet({
  vendedor,
  open,
  onOpenChange,
}: VendedorSheetProps) {
  if (!vendedor) return null;

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const ticketMedio = vendedor.totalVendas / vendedor.vendas.length;

  const getPercentualComissao = (valor: number, comissao: number) => {
    if (comissao === 0) return "0%";
    if (valor < 500) return "1%";
    return "5%";
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-2xl overflow-hidden flex flex-col px-6 py-4">
        <SheetHeader className="p-0">
          <SheetTitle className="flex items-center gap-2 text-3xl tracking-tighter leading-none">
            {vendedor.vendedor}
          </SheetTitle>
          <SheetDescription className="leading-none tracking-tighter">
            Detalhamento completo de vendas e comissões
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 flex flex-col mt-2 h-full overflow-hidden">
          {/* Cards de Métricas */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="gap-0 py-2 px-0 h-min">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-semibold tracking-tighter text-muted-foreground">
                  Total de Vendas
                </CardTitle>
                <div className="bg-muted p-1.5 rounded">
                  <DollarSign className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold leading-none">
                  {formatCurrency(vendedor.totalVendas)}
                </div>
                <p className="text-xs text-muted-foreground mb-2 mt-0.5">
                  Faturamento total acumulado
                </p>
              </CardContent>
            </Card>

            <Card className="gap-0 py-2 px-0 h-min">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-semibold tracking-tighter text-muted-foreground">
                  Comissões
                </CardTitle>
                <div className="bg-muted p-1.5 rounded">
                  <TrendingUp className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold leading-none text-green-600">
                  {formatCurrency(vendedor.totalComissao)}
                </div>
                <p className="text-xs text-muted-foreground mb-2 mt-0.5">
                  {(
                    (vendedor.totalComissao / vendedor.totalVendas) *
                    100
                  ).toFixed(2)}
                  % do faturamento
                </p>
              </CardContent>
            </Card>

            <Card className="gap-0 py-2 px-0 h-min">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-semibold tracking-tighter text-muted-foreground">
                  Quantidade
                </CardTitle>
                <div className="bg-muted p-1.5 rounded">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold leading-none">
                  {vendedor.vendas.length}
                </div>
                <p className="text-xs text-muted-foreground mb-2 mt-0.5">
                  Total de vendas
                </p>
              </CardContent>
            </Card>

            <Card className="gap-0 py-2 px-0 h-min">
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-semibold tracking-tighter text-muted-foreground">
                  Ticket Médio
                </CardTitle>
                <div className="bg-muted p-1.5 rounded">
                  <Target className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold leading-none">
                  {formatCurrency(ticketMedio)}
                </div>
                <p className="text-xs text-muted-foreground mb-2 mt-0.5">
                  Valor médio por vendas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Histórico de Vendas */}
          <div className="flex flex-col h-full overflow-hidden">
            <h3 className="text-foreground font-normal tracking-tighter mb-3">
              Histórico de Vendas
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <div className="overflow-x-auto h-full">
                <table className="w-full">
                  <thead className="bg-muted border-b sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        #
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Valor da Venda
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        Comissão
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        % Comissão
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {vendedor.vendas.map((venda, index) => (
                      <tr key={index} className="hover:bg-muted/50">
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                          {index + 1}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          {formatCurrency(venda.valor)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-green-600">
                          {formatCurrency(venda.comissao)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <Badge variant="outline">
                            {getPercentualComissao(venda.valor, venda.comissao)}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
