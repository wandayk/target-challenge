/**
 * Calcula juros SIMPLES de 2,5% ao dia sobre um valor vencido
 * @param valor Valor original
 * @param dataVencimento Data de vencimento
 * @returns Valor total com juros simples
 */
export function calcularJuros(valor: number, dataVencimento: Date): number {
  const hoje = new Date();
  const diasAtraso = Math.floor(
    (hoje.getTime() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diasAtraso <= 0) {
    return valor;
  }

  const taxaJuros = 0.025; // 2,5% ao dia
  const juros = valor * taxaJuros * diasAtraso;
  return valor + juros;
}

/**
 * Calcula juros COMPOSTOS de 2,5% ao dia sobre um valor vencido
 * @param valor Valor original
 * @param dataVencimento Data de vencimento
 * @returns Valor total com juros compostos (acumulativos)
 */
export function calcularJurosCompostos(
  valor: number,
  dataVencimento: Date
): number {
  const hoje = new Date();
  const diasAtraso = Math.floor(
    (hoje.getTime() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diasAtraso <= 0) {
    return valor;
  }

  const taxaJuros = 0.025; // 2,5% ao dia
  // Fórmula: Valor × (1 + taxa)^dias
  const valorTotal = valor * Math.pow(1 + taxaJuros, diasAtraso);
  return valorTotal;
}
