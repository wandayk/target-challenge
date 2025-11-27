import { useState } from "react";
import { useJurosCalculator } from "@/hooks/useJurosCalculator";
import { JurosInputCard } from "@/components/JurosInputCard";
import { JurosMetricsCards } from "@/components/JurosMetricsCards";
import { JurosChart } from "@/components/JurosChart";

export function Juros() {
  const [valorInput, setValorInput] = useState("");
  const [dataVencimento, setDataVencimento] = useState<Date | undefined>(
    undefined
  );
  const [tipoJuros, setTipoJuros] = useState<"simples" | "compostos">(
    "simples"
  );

  const valor = parseFloat(valorInput) || 0;
  const {
    diasAtraso,
    valorOriginal,
    jurosAcumulados,
    valorTotal,
    dadosGrafico,
  } = useJurosCalculator(valor, dataVencimento, tipoJuros);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-muted-foreground font-normal tracking-tighter">
          Calcule juros de 2,5% ao dia sobre valores vencidos (simples ou
          compostos)
        </p>
      </div>

      {/* Layout: Input na esquerda e Resultados na direita */}
      <div className="flex gap-6">
        {/* Coluna Esquerda - Input de Dados */}
        <JurosInputCard
          valor={valorInput}
          onValorChange={setValorInput}
          dataVencimento={dataVencimento}
          onDataChange={setDataVencimento}
          tipoJuros={tipoJuros}
          onTipoJurosChange={setTipoJuros}
        />

        {/* Coluna Direita - Resultados */}
        <div className="flex-1 space-y-6">
          {/* Cards de Métricas */}
          <JurosMetricsCards
            diasAtraso={diasAtraso}
            valorOriginal={valorOriginal}
            jurosAcumulados={jurosAcumulados}
            valorTotal={valorTotal}
          />

          {/* Gráfico de Evolução */}
          <JurosChart dados={dadosGrafico} valorOriginal={valorOriginal} tipoJuros={tipoJuros} />
        </div>
      </div>
    </div>
  );
}
