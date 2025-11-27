import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CalendarIcon, DollarSign, TrendingUp, Percent } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface JurosInputCardProps {
  valor: string;
  onValorChange: (valor: string) => void;
  dataVencimento: Date | undefined;
  onDataChange: (data: Date | undefined) => void;
  tipoJuros: "simples" | "compostos";
  onTipoJurosChange: (tipo: "simples" | "compostos") => void;
}

export function JurosInputCard({
  valor,
  onValorChange,
  dataVencimento,
  onDataChange,
  tipoJuros,
  onTipoJurosChange,
}: JurosInputCardProps) {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas números e ponto
    const cleanValue = value.replace(/[^\d.]/g, "");
    onValorChange(cleanValue);
  };

  return (
    <Card className="w-80 h-min">
      <CardContent className="space-y-4">
        {/* Tipo de Juros */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <div className="bg-muted p-1.5 rounded">
              <Percent className="h-4 w-4 text-primary" />
            </div>
            Tipo de Juros
          </Label>
          <RadioGroup
            value={tipoJuros}
            onValueChange={(value) =>
              onTipoJurosChange(value as "simples" | "compostos")
            }
            className="space-y-0 gap-2"
          >
            <Label
              htmlFor="simples"
              className={cn(
                "flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-all",
                tipoJuros === "simples"
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "hover:bg-accent/50"
              )}
            >
              <RadioGroupItem value="simples" id="simples" className="mt-1" />
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                  Juros Simples
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  2,5% ao dia sobre o valor original
                </p>
              </div>
            </Label>
            <Label
              htmlFor="compostos"
              className={cn(
                "flex items-start space-x-3 space-y-0 rounded-md border p-4 cursor-pointer transition-all",
                tipoJuros === "compostos"
                  ? "border-primary bg-primary/5 shadow-sm"
                  : "hover:bg-accent/50"
              )}
            >
              <RadioGroupItem
                value="compostos"
                id="compostos"
                className="mt-1"
              />
              <div className="flex-1">
                <div className="font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  Juros Compostos
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-normal">
                  2,5% ao dia sobre o valor acumulado (juros sobre juros)
                </p>
              </div>
            </Label>
          </RadioGroup>
        </div>

        {/* Valor */}
        <Label className="flex items-center gap-2">
          <div className="bg-muted p-1.5 rounded">
            <DollarSign className="h-4 w-4 text-primary" />
          </div>
          Tipo de Juros
        </Label>

        <div className="space-y-2">
          <Label htmlFor="valor" className="tracking-tighter">
            Valor Original
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              R$
            </span>
            <Input
              id="valor"
              type="text"
              value={valor}
              onChange={handleValorChange}
              placeholder="0,00"
              className="pl-10"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Informe o valor da cobrança
          </p>
        </div>

        {/* Data de Vencimento */}
        <div className="space-y-2">
          <Label className="tracking-tighter">Data de Vencimento</Label>
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !dataVencimento && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataVencimento ? (
                  format(dataVencimento, "PPP", { locale: ptBR })
                ) : (
                  <span>Selecione uma data</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dataVencimento}
                onSelect={(date) => {
                  onDataChange(date);
                  setPopoverOpen(false);
                }}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                defaultMonth={dataVencimento}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            Selecione a data de vencimento da cobrança
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
