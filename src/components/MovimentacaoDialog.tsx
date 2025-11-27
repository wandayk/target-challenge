import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ArrowDownCircle, ArrowUpCircle, Package } from "lucide-react";
import { toast } from "sonner";
import type { Produto } from "@/types";

interface MovimentacaoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produtos: Produto[];
  onSubmit: (
    codigoProduto: number,
    tipo: "entrada" | "saida",
    quantidade: number,
    descricao: string
  ) => void;
}

export function MovimentacaoDialog({
  open,
  onOpenChange,
  produtos,
  onSubmit,
}: MovimentacaoDialogProps) {
  const [codigoProduto, setCodigoProduto] = useState<string>("");
  const [tipo, setTipo] = useState<"entrada" | "saida">("entrada");
  const [quantidade, setQuantidade] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!codigoProduto || !quantidade || !descricao) {
      toast.error("Todos os campos são obrigatórios");
      return;
    }

    const quantidadeNum = Number(quantidade);
    if (quantidadeNum <= 0) {
      toast.error("Quantidade deve ser maior que zero");
      return;
    }

    // Validar estoque para saídas
    if (tipo === "saida") {
      const produto = produtos.find(
        (p) => p.codigoProduto === Number(codigoProduto)
      );
      if (produto && quantidadeNum > produto.estoque) {
        toast.error(
          `Estoque insuficiente! Disponível: ${produto.estoque} unidades`
        );
        return;
      }
    }

    try {
      onSubmit(Number(codigoProduto), tipo, quantidadeNum, descricao);
      toast.success("Movimentação registrada com sucesso!");
      handleClose();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Erro ao processar movimentação"
      );
    }
  };

  const handleClose = () => {
    setCodigoProduto("");
    setTipo("entrada");
    setQuantidade("");
    setDescricao("");
    onOpenChange(false);
  };

  const produtoSelecionado = produtos.find(
    (p) => p.codigoProduto === Number(codigoProduto)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-row items-center">
          <div className="bg-muted p-1.5 rounded">
            <Package className="h-7 w-7 text-primary" />
          </div>
          <div>
            <DialogTitle>Movimentação</DialogTitle>
            <DialogDescription className="text-muted-foreground font-light text-sm leading-none tracking-tighter">
              Registre uma entrada ou saída de produtos do estoque
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Seleção de Produto */}
          <div className="space-y-2">
            <Label htmlFor="produto">Produto</Label>
            <Select value={codigoProduto} onValueChange={setCodigoProduto}>
              <SelectTrigger id="produto" className="w-full">
                <SelectValue placeholder="Selecione um produto" />
              </SelectTrigger>
              <SelectContent>
                {produtos.map((produto) => (
                  <SelectItem
                    key={produto.codigoProduto}
                    value={produto.codigoProduto.toString()}
                  >
                    {produto.descricaoProduto} - {produto.estoque} un.
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {produtoSelecionado && (
              <p className="text-xs text-muted-foreground">
                Estoque atual: {produtoSelecionado.estoque} unidades
              </p>
            )}
          </div>

          {/* Tipo de Movimentação */}
          <div className="space-y-3">
            <Label>Tipo de Movimentação</Label>
            <RadioGroup
              value={tipo}
              onValueChange={(value) => setTipo(value as "entrada" | "saida")}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="entrada" id="entrada" />
                <Label
                  htmlFor="entrada"
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <ArrowUpCircle className="h-4 w-4 text-green-600" />
                  Entrada
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="saida" id="saida" />
                <Label
                  htmlFor="saida"
                  className="flex items-center gap-2 cursor-pointer font-normal"
                >
                  <ArrowDownCircle className="h-4 w-4 text-red-600" />
                  Saída
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Quantidade */}
          <div className="space-y-2">
            <Label htmlFor="quantidade">Quantidade</Label>
            <Input
              id="quantidade"
              type="number"
              min="1"
              value={quantidade}
              onChange={(e) => setQuantidade(e.target.value)}
              placeholder="Digite a quantidade"
            />
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descreva o motivo da movimentação..."
              rows={3}
            />
          </div>

          {/* Botões */}
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              className="!bg-transparent hover:-translate-x-0.5 cursor-pointer"
            >
              ← Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer hover:-translate-y-1"
            >
              Registrar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
