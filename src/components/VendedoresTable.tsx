import type { VendedorComissao } from "@/types";

interface VendedoresTableProps {
  vendedores: VendedorComissao[];
  onVendedorClick: (vendedor: VendedorComissao, posicao: number) => void;
}

export function VendedoresTable({
  vendedores,
  onVendedorClick,
}: VendedoresTableProps) {
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  const getMedalha = (pos: number) => {
    return `${pos}º`;
  };

  return (
    <div className="border shadow-lg rounded-lg w-full h-min overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50 border-b">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Vendedor
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Vendas
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Total Faturado
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Comissões
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Ticket Médio
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {vendedores.map((vendedor, index) => {
            const posicao = index + 1;
            const ticketMedio = vendedor.totalVendas / vendedor.vendas.length;

            return (
              <tr
                key={vendedor.vendedor}
                onClick={() => onVendedorClick(vendedor, posicao)}
                className="hover:bg-muted/50 cursor-pointer transition-colors"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  {getMedalha(posicao)}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="font-medium text-foreground">
                    {vendedor.vendedor}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-muted-foreground">
                  {vendedor.vendas.length}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="font-semibold text-foreground">
                    {formatCurrency(vendedor.totalVendas)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right">
                  <div className="font-semibold text-green-600 dark:text-green-500">
                    {formatCurrency(vendedor.totalComissao)}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-right text-sm text-muted-foreground">
                  {formatCurrency(ticketMedio)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
