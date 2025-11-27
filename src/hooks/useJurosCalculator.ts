import { useMemo } from "react";
import { calcularJuros, calcularJurosCompostos } from "../utils/calcularJuros";

interface JurosData {
  diasAtraso: number;
  valorOriginal: number;
  jurosAcumulados: number;
  valorTotal: number;
  dadosGrafico: { dia: number; valor: number }[];
}

export function useJurosCalculator(
  valor: number,
  dataVencimento: Date | undefined,
  tipoJuros: "simples" | "compostos" = "simples"
): JurosData {
  const result = useMemo(() => {
    if (!dataVencimento || valor <= 0) {
      return {
        diasAtraso: 0,
        valorOriginal: valor,
        jurosAcumulados: 0,
        valorTotal: valor,
        dadosGrafico: [],
      };
    }

    const hoje = new Date();
    const diasAtraso = Math.floor(
      (hoje.getTime() - dataVencimento.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Se não está vencido, não há juros
    if (diasAtraso <= 0) {
      return {
        diasAtraso: 0,
        valorOriginal: valor,
        jurosAcumulados: 0,
        valorTotal: valor,
        dadosGrafico: [{ dia: 0, valor }],
      };
    }

    // Calcular valor total baseado no tipo de juros
    const valorTotal =
      tipoJuros === "simples"
        ? calcularJuros(valor, dataVencimento)
        : calcularJurosCompostos(valor, dataVencimento);

    const jurosAcumulados = valorTotal - valor;

    // Gerar dados do gráfico (evolução dia a dia)
    const dadosGrafico = Array.from({ length: diasAtraso + 1 }, (_, dia) => {
      let valorDia: number;
      if (tipoJuros === "simples") {
        // Juros Simples: valor + (valor × taxa × dias)
        valorDia = valor + valor * 0.025 * dia;
      } else {
        // Juros Compostos: valor × (1 + taxa)^dias
        valorDia = valor * Math.pow(1.025, dia);
      }
      return {
        dia,
        valor: Number(valorDia.toFixed(2)),
      };
    });

    return {
      diasAtraso,
      valorOriginal: valor,
      jurosAcumulados,
      valorTotal,
      dadosGrafico,
    };
  }, [valor, dataVencimento, tipoJuros]);

  return result;
}
