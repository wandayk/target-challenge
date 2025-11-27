import { useState } from "react";
import { useEstoque } from "@/hooks/useEstoque";
import { EstoqueCard } from "@/components/EstoqueCard";
import { MovimentacaoDialog } from "@/components/MovimentacaoDialog";
import { HistoricoTable } from "@/components/HistoricoTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package } from "lucide-react";

export function Estoque() {
  const {
    produtos,
    movimentacoes,
    adicionarMovimentacao,
    searchTerm,
    setSearchTerm,
    filterProduto,
    setFilterProduto,
  } = useEstoque();

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleMovimentacao = (
    codigoProduto: number,
    tipo: "entrada" | "saida",
    quantidade: number,
    descricao: string
  ) => {
    adicionarMovimentacao(codigoProduto, tipo, quantidade, descricao);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-muted-foreground font-normal tracking-tighter">
          Controle e movimentação de produtos em tempo real
        </p>
      </div>

      {/* Layout: Estoque na esquerda e Histórico na direita */}
      <div className="flex gap-6">
        {/* Coluna Esquerda - Estoque Atual */}
        <div className="flex flex-col gap-4 w-80">
          <Card className="border-none shadow-none gap-2 p-0">
            <CardHeader className="p-0">
              <CardTitle className="flex items-center gap-2 tracking-tighter">
                <div className="bg-muted p-1.5 rounded">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                Estoque Atual
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-0">
              {produtos.map((produto) => (
                <EstoqueCard key={produto.codigoProduto} produto={produto} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Coluna Direita - Histórico de Movimentações */}
        <HistoricoTable
          movimentacoes={movimentacoes}
          produtos={produtos}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterProduto={filterProduto}
          onFilterChange={setFilterProduto}
          onNovaMovimentacao={() => setDialogOpen(true)}
        />
      </div>

      {/* Dialog de Nova Movimentação */}
      <MovimentacaoDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        produtos={produtos}
        onSubmit={handleMovimentacao}
      />
    </div>
  );
}
