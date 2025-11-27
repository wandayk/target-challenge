import { useMemo } from "react";
import vendasData from "../services/vendas.json";
import { calcularComissao } from "../utils/calcularComissao";
import type { Venda, VendedorComissao } from "../types";

export function useVendedoresData() {
  const vendedoresComissao = useMemo(() => {
    const vendedoresMap = new Map<string, VendedorComissao>();

    vendasData.vendas.forEach((venda: Venda) => {
      const comissao = calcularComissao(venda.valor);

      if (!vendedoresMap.has(venda.vendedor)) {
        vendedoresMap.set(venda.vendedor, {
          vendedor: venda.vendedor,
          totalVendas: 0,
          totalComissao: 0,
          vendas: [],
        });
      }

      const vendedorData = vendedoresMap.get(venda.vendedor)!;
      vendedorData.totalVendas += venda.valor;
      vendedorData.totalComissao += comissao;
      vendedorData.vendas.push({
        valor: venda.valor,
        comissao,
      });
    });

    // Ordenar por total de vendas (ranking)
    return Array.from(vendedoresMap.values()).sort(
      (a, b) => b.totalVendas - a.totalVendas
    );
  }, []);

  const metricas = useMemo(() => {
    const totalVendas = vendedoresComissao.reduce(
      (acc, v) => acc + v.totalVendas,
      0
    );
    const totalComissoes = vendedoresComissao.reduce(
      (acc, v) => acc + v.totalComissao,
      0
    );
    const totalQuantidade = vendasData.vendas.length;
    const mediaVenda = totalVendas / totalQuantidade;

    return {
      totalVendas,
      totalComissoes,
      totalQuantidade,
      mediaVenda,
    };
  }, [vendedoresComissao]);

  return { vendedoresComissao, metricas };
}
