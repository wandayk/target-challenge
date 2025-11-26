export interface Venda {
  vendedor: string;
  valor: number;
}

export interface VendedorComissao {
  vendedor: string;
  totalVendas: number;
  totalComissao: number;
  vendas: {
    valor: number;
    comissao: number;
  }[];
}

export interface Produto {
  codigoProduto: number;
  descricaoProduto: string;
  estoque: number;
}

export interface Movimentacao {
  id: string;
  codigoProduto: number;
  tipo: "entrada" | "saida";
  quantidade: number;
  descricao: string;
  estoqueAnterior: number;
  estoqueAtual: number;
  data: string;
}
