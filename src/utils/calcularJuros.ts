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
