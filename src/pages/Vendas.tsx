import { useMemo } from "react";
import vendasData from "../services/vendas.json";
import { calcularComissao } from "../utils/calcularComissao";
import type { Venda, VendedorComissao } from "../types";

export function Vendas() {
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

    return Array.from(vendedoresMap.values());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Cálculo de Comissões
        </h2>
        <p className="text-gray-600 mt-1">
          Comissões calculadas por vendedor seguindo as regras estabelecidas
        </p>
      </div>

      <div className="grid gap-6">
        {vendedoresComissao.map((vendedor) => (
          <div
            key={vendedor.vendedor}
            className="bg-white rounded-lg border shadow-sm overflow-hidden"
          >
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {vendedor.vendedor}
                </h3>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Total de Vendas</div>
                  <div className="text-lg font-bold text-gray-800">
                    {vendedor.totalVendas.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">
                    Total de Comissões
                  </div>
                  <div className="text-lg font-bold text-green-600">
                    {vendedor.totalComissao.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Valor da Venda
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Comissão
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      % Comissão
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {vendedor.vendas.map((venda, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {venda.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                        {venda.comissao.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {venda.comissao === 0
                          ? "0%"
                          : venda.valor < 500
                          ? "1%"
                          : "5%"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
