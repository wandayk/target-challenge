/**
 * Gera um ID único para movimentações de estoque
 * Formato: MOV-{timestamp}-{random}
 */
export function gerarIdMovimentacao(): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `MOV-${timestamp}-${random}`;
}
