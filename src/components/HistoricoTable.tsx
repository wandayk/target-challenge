import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Package, Blocks } from "lucide-react";
import type { Movimentacao, Produto } from "@/types";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HistoricoTableProps {
  movimentacoes: Movimentacao[];
  produtos: Produto[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterProduto: string;
  onFilterChange: (value: string) => void;
  onNovaMovimentacao: () => void;
}

export function HistoricoTable({
  movimentacoes,
  produtos,
  searchTerm,
  onSearchChange,
  filterProduto,
  onFilterChange,
  onNovaMovimentacao,
}: HistoricoTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Agora";
    if (diffMins < 60) return `${diffMins} min atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;

    return date.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getProdutoNome = (codigoProduto: number) => {
    return (
      produtos.find((p) => p.codigoProduto === codigoProduto)
        ?.descricaoProduto || "Produto não encontrado"
    );
  };

  return (
    <Card className="flex-1 border-none shadow-none py-0 gap-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="tracking-tighter flex items-center gap-2">
            <div className="bg-muted p-1.5 rounded">
              <Blocks className="h-5 w-5 text-primary" />
            </div>
            Histórico de Movimentações
          </CardTitle>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={onNovaMovimentacao}>
                <Plus className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Adicionar movimentação</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent className="border border-border mx-6 rounded-lg p-0 gap-0">
        <div className="flex items-center w-full p-0.5 gap-0.5">
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por ID, produto ou descrição..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-9 !bg-background !ring-0 !border-border"
              />
            </div>
          </div>
          <Select value={filterProduto} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[300px] !bg-background">
              <SelectValue placeholder="Filtrar por produto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os produtos</SelectItem>
              {produtos.map((produto) => (
                <SelectItem
                  key={produto.codigoProduto}
                  value={produto.codigoProduto.toString()}
                >
                  {produto.descricaoProduto}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {movimentacoes.length === 0 ? (
          <div className="flex flex-col  items-center justify-center w-full p-0.5 pt-0 text-center">
            <div className="border border-border w-full rounded-md flex flex-col items-center py-6">
              <div className="bg-muted p-1.5 rounded">
                <Package className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-lg mt-2">
                Nenhuma movimentação registrada
              </h3>
              <p className="text-sm text-muted-foreground mb-0">
                Comece registrando uma entrada ou saída de produtos
              </p>
            </div>
          </div>
        ) : (
          <div className="border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Tipo
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Quantidade
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Estoque
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {movimentacoes.map((mov) => (
                    <tr key={mov.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 whitespace-nowrap text-xs text-muted-foreground font-mono">
                        {mov.id}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {getProdutoNome(mov.codigoProduto)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            mov.tipo === "entrada" ? "default" : "destructive"
                          }
                        >
                          {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right font-medium">
                        {mov.quantidade}
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground max-w-xs truncate">
                        {mov.descricao}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-right">
                        <span className="text-muted-foreground">
                          {mov.estoqueAnterior}
                        </span>
                        <span className="mx-1 text-muted-foreground">→</span>
                        <span className="font-medium">{mov.estoqueAtual}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(mov.data)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
