import { useState, useMemo, useCallback } from "react";
import estoqueData from "../services/estoque.json";
import { gerarIdMovimentacao } from "../utils/gerarIdMovimentacao";
import type { Produto, Movimentacao } from "../types";

export function useEstoque() {
  const [produtos, setProdutos] = useState<Produto[]>(estoqueData.estoque);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterProduto, setFilterProduto] = useState<string>("all");

  const adicionarMovimentacao = useCallback(
    (
      codigoProduto: number,
      tipo: "entrada" | "saida",
      quantidade: number,
      descricao: string
    ) => {
      let movimentacaoCriada: Movimentacao | null = null;

      setProdutos((produtosAtuais) => {
        const produtoIndex = produtosAtuais.findIndex(
          (p) => p.codigoProduto === codigoProduto
        );

        if (produtoIndex === -1) {
          throw new Error("Produto não encontrado!");
        }

        const produto = produtosAtuais[produtoIndex];
        const estoqueAnterior = produto.estoque;
        const estoqueAtual =
          tipo === "entrada"
            ? estoqueAnterior + quantidade
            : estoqueAnterior - quantidade;

        if (estoqueAtual < 0) {
          throw new Error("Estoque insuficiente para esta saída!");
        }

        movimentacaoCriada = {
          id: gerarIdMovimentacao(),
          codigoProduto,
          tipo,
          quantidade,
          descricao,
          estoqueAnterior,
          estoqueAtual,
          data: new Date().toISOString(),
        };

        const novosProdutos = [...produtosAtuais];
        novosProdutos[produtoIndex] = { ...produto, estoque: estoqueAtual };

        return novosProdutos;
      });

      if (movimentacaoCriada) {
        setMovimentacoes((movimentacoesAtuais) => [
          movimentacaoCriada!,
          ...movimentacoesAtuais,
        ]);
      }
    },
    []
  );

  const movimentacoesFiltradas = useMemo(() => {
    return movimentacoes.filter((mov) => {
      const produto = produtos.find((p) => p.codigoProduto === mov.codigoProduto);
      const matchSearch =
        searchTerm === "" ||
        mov.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        produto?.descricaoProduto
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        mov.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchProduto =
        filterProduto === "all" ||
        mov.codigoProduto === Number(filterProduto);

      return matchSearch && matchProduto;
    });
  }, [movimentacoes, searchTerm, filterProduto, produtos]);

  return {
    produtos,
    movimentacoes: movimentacoesFiltradas,
    adicionarMovimentacao,
    searchTerm,
    setSearchTerm,
    filterProduto,
    setFilterProduto,
  };
}
