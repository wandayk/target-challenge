/**
 * Calcula a comissão de uma venda seguindo as regras:
 * - Abaixo de R$100,00: sem comissão
 * - Abaixo de R$500,00: 1% de comissão
 * - A partir de R$500,00: 5% de comissão
 */
export function calcularComissao(valor: number): number {
  if (valor < 100) {
    return 0;
  }
  if (valor < 500) {
    return valor * 0.01;
  }
  return valor * 0.05;
}
