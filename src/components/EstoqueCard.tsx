import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Produto } from "@/types";

interface EstoqueCardProps {
  produto: Produto;
}

export function EstoqueCard({ produto }: EstoqueCardProps) {
  return (
    <Card className="transition-all hover:shadow-md p-0">
      <CardContent className="px-4 py-3">
        <div className="flex items-start gap-3">
          <div className="flex items-center w-full justify-between min-w-0">
            <div className="flex items-center w-full justify-between gap-2">
              <div className="flex flex-col">
                <h4 className="font-semibold text-foreground text-sm truncate">
                  {produto.descricaoProduto}
                </h4>
                <p className="text-xs text-muted-foreground">
                  Cód: {produto.codigoProduto}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <div className="text-2xl font-bold">{produto.estoque}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
