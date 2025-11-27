import { useState, useCallback } from "react";
import { useVendedoresData } from "@/hooks/useVendedoresData";
import { VendedoresTable } from "@/components/VendedoresTable";
import { VendedorSheet } from "@/components/VendedorSheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingUp, ShoppingCart, Award } from "lucide-react";
import type { VendedorComissao } from "@/types";

export function Vendas() {
  const { vendedoresComissao, metricas } = useVendedoresData();
  const [selectedVendedor, setSelectedVendedor] =
    useState<VendedorComissao | null>(null);
  const [selectedPosicao, setSelectedPosicao] = useState(0);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleVendedorClick = useCallback(
    (vendedor: VendedorComissao, posicao: number) => {
      setSelectedVendedor(vendedor);
      setSelectedPosicao(posicao);
      setSheetOpen(true);
    },
    []
  );

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-muted-foreground font-normal tracking-tighter">
          Análise de desempenho e comissões dos vendedores
        </p>
      </div>

      {/* Layout: Cards na esquerda e Tabela na direita */}
      <div className="flex gap-6">
        {/* Cards de Métricas - Coluna Esquerda */}
        <div className="flex flex-col gap-4 w-80">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold tracking-tighter">
                Total de Vendas
              </CardTitle>
              <div className="bg-muted p-1.5 rounded">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(metricas.totalVendas)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Faturamento total acumulado
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold tracking-tighter">
                Total de Comissões
              </CardTitle>
              <div className="bg-muted p-1.5 rounded">
                <Award className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(metricas.totalComissoes)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {(
                  (metricas.totalComissoes / metricas.totalVendas) *
                  100
                ).toFixed(2)}
                % do faturamento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold tracking-tighter">
                Quantidade de Vendas
              </CardTitle>
              <div className="bg-muted p-1.5 rounded">
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {metricas.totalQuantidade}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Transações realizadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold tracking-tighter">
                Ticket Médio
              </CardTitle>
              <div className="bg-muted p-1.5 rounded">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatCurrency(metricas.mediaVenda)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Valor médio por venda
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabela de Vendedores - Ocupa restante */}
        <VendedoresTable
          vendedores={vendedoresComissao}
          onVendedorClick={handleVendedorClick}
        />
      </div>

      {/* Sheet de Detalhes */}
      <VendedorSheet
        vendedor={selectedVendedor}
        posicao={selectedPosicao}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
