import { useState } from "react";
import estoqueData from "../services/estoque.json";
import { gerarIdMovimentacao } from "../utils/gerarIdMovimentacao";
import type { Produto, Movimentacao } from "../types";

export function Estoque() {
  const [produtos, setProdutos] = useState<Produto[]>(estoqueData.estoque);
  const [movimentacoes, setMovimentacoes] = useState<Movimentacao[]>([]);
  const [formData, setFormData] = useState({
    codigoProduto: "",
    tipo: "entrada" as "entrada" | "saida",
    quantidade: "",
    descricao: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const codigoProduto = Number(formData.codigoProduto);
    const quantidade = Number(formData.quantidade);

    const produtoIndex = produtos.findIndex(
      (p) => p.codigoProduto === codigoProduto
    );

    if (produtoIndex === -1) {
      alert("Produto não encontrado!");
      return;
    }

    const produto = produtos[produtoIndex];
    const estoqueAnterior = produto.estoque;
    const estoqueAtual =
      formData.tipo === "entrada"
        ? estoqueAnterior + quantidade
        : estoqueAnterior - quantidade;

    if (estoqueAtual < 0) {
      alert("Estoque insuficiente para esta saída!");
      return;
    }

    const movimentacao: Movimentacao = {
      id: gerarIdMovimentacao(),
      codigoProduto,
      tipo: formData.tipo,
      quantidade,
      descricao: formData.descricao,
      estoqueAnterior,
      estoqueAtual,
      data: new Date().toISOString(),
    };

    const novosProdutos = [...produtos];
    novosProdutos[produtoIndex] = { ...produto, estoque: estoqueAtual };

    setProdutos(novosProdutos);
    setMovimentacoes([movimentacao, ...movimentacoes]);

    setFormData({
      codigoProduto: "",
      tipo: "entrada",
      quantidade: "",
      descricao: "",
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Gestão de Estoque
        </h2>
        <p className="text-gray-600 mt-1">
          Controle de entrada e saída de produtos
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Formulário de Movimentação */}
        <div className="bg-white rounded-lg border shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Nova Movimentação
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Produto
              </label>
              <select
                value={formData.codigoProduto}
                onChange={(e) =>
                  setFormData({ ...formData, codigoProduto: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione um produto</option>
                {produtos.map((produto) => (
                  <option
                    key={produto.codigoProduto}
                    value={produto.codigoProduto}
                  >
                    {produto.codigoProduto} - {produto.descricaoProduto} (
                    {produto.estoque} un.)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Movimentação
              </label>
              <select
                value={formData.tipo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipo: e.target.value as "entrada" | "saida",
                  })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantidade
              </label>
              <input
                type="number"
                min="1"
                value={formData.quantidade}
                onChange={(e) =>
                  setFormData({ ...formData, quantidade: e.target.value })
                }
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição
              </label>
              <textarea
                value={formData.descricao}
                onChange={(e) =>
                  setFormData({ ...formData, descricao: e.target.value })
                }
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descreva o motivo da movimentação..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Registrar Movimentação
            </button>
          </form>
        </div>

        {/* Estoque Atual */}
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Estoque Atual
            </h3>
          </div>
          <div className="divide-y divide-gray-200">
            {produtos.map((produto) => (
              <div
                key={produto.codigoProduto}
                className="px-6 py-4 hover:bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">
                      {produto.descricaoProduto}
                    </div>
                    <div className="text-sm text-gray-500">
                      Código: {produto.codigoProduto}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {produto.estoque}
                    </div>
                    <div className="text-sm text-gray-500">unidades</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Histórico de Movimentações */}
      {movimentacoes.length > 0 && (
        <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Histórico de Movimentações
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Produto
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descrição
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Anterior
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estoque Atual
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movimentacoes.map((mov) => {
                  const produto = produtos.find(
                    (p) => p.codigoProduto === mov.codigoProduto
                  );
                  return (
                    <tr key={mov.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500 font-mono">
                        {mov.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {produto?.descricaoProduto}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded ${
                            mov.tipo === "entrada"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mov.quantidade}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                        {mov.descricao}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {mov.estoqueAnterior}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {mov.estoqueAtual}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(mov.data).toLocaleString("pt-BR")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
