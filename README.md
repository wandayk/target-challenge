# 🎯 Target Challenge - Sistema de Gestão Comercial

<div align="center">

![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.17-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

**Desafio Técnico desenvolvido para Target Sistemas**

[Demo](#-como-usar) · [Funcionalidades](#-funcionalidades) · [Tecnologias](#-tecnologias-utilizadas)

</div>

---

## 📋 Sobre o Projeto

Este projeto foi desenvolvido como resposta ao desafio técnico da **Target Sistemas**, que propôs a criação de três programas distintos para gestão comercial:

### 🎯 Desafios Propostos:

**1. Sistema de Comissões de Vendas**

```
Considerando que o json abaixo tem registros de vendas de
um time comercial, faça um programa que leia os dados e
calcule a comissão de cada vendedor, seguindo a seguinte
regra para cada venda:

- Vendas abaixo de R$100,00 não gera comissão
- Vendas abaixo de R$500,00 gera 1% de comissão
- A partir de R$500,00 gera 5% de comissão

{
  "vendas": [
    { "vendedor": "João Silva", "valor": 1200.50 },
    { "vendedor": "João Silva", "valor": 950.75 },
    { "vendedor": "João Silva", "valor": 1800.00 },
    { "vendedor": "João Silva", "valor": 1400.30 },
    { "vendedor": "João Silva", "valor": 1100.90 },
    { "vendedor": "João Silva", "valor": 1550.00 },
    { "vendedor": "João Silva", "valor": 1700.80 },
    { "vendedor": "João Silva", "valor": 250.30 },
    { "vendedor": "João Silva", "valor": 480.75 },
    { "vendedor": "João Silva", "valor": 320.40 },
    { "vendedor": "Maria Souza", "valor": 2100.40 },
    { "vendedor": "Maria Souza", "valor": 1350.60 },
    { "vendedor": "Maria Souza", "valor": 950.20 },
    { "vendedor": "Maria Souza", "valor": 1600.75 },
    { "vendedor": "Maria Souza", "valor": 1750.00 },
    { "vendedor": "Maria Souza", "valor": 1450.90 },
    { "vendedor": "Maria Souza", "valor": 400.50 },
    { "vendedor": "Maria Souza", "valor": 180.20 },
    { "vendedor": "Maria Souza", "valor": 90.75 },
    { "vendedor": "Carlos Oliveira", "valor": 800.50 },
    { "vendedor": "Carlos Oliveira", "valor": 1200.00 },
    { "vendedor": "Carlos Oliveira", "valor": 1950.30 },
    { "vendedor": "Carlos Oliveira", "valor": 1750.80 },
    { "vendedor": "Carlos Oliveira", "valor": 1300.60 },
    { "vendedor": "Carlos Oliveira", "valor": 300.40 },
    { "vendedor": "Carlos Oliveira", "valor": 500.00 },
    { "vendedor": "Carlos Oliveira", "valor": 125.75 },
    { "vendedor": "Ana Lima", "valor": 1000.00 },
    { "vendedor": "Ana Lima", "valor": 1100.50 },
    { "vendedor": "Ana Lima", "valor": 1250.75 },
    { "vendedor": "Ana Lima", "valor": 1400.20 },
    { "vendedor": "Ana Lima", "valor": 1550.90 },
    { "vendedor": "Ana Lima", "valor": 1650.00 },
    { "vendedor": "Ana Lima", "valor": 75.30 },
    { "vendedor": "Ana Lima", "valor": 420.90 },
    { "vendedor": "Ana Lima", "valor": 315.40 }
  ]
}

```

**2. Sistema de Controle de Estoque**

```
Faça um programa onde eu possa lançar movimentações
 de estoque dos produtos que estão no json abaixo,
 dando entrada ou saída da mercadoria no meu depósito,
 onde cada movimentação deve ter:

- Um número identificador único.
- Uma descrição para identificar o tipo da movimentação realizada
- E que ao final da movimentação me retorne a qtde
final do estoque do produto movimentado.

{
"estoque":
  [
    {
    "codigoProduto": 101,
    "descricaoProduto": "Caneta Azul",
    "estoque": 150
    },
    {
    "codigoProduto": 102,
    "descricaoProduto": "Caderno Universitário",
    "estoque": 75
    },
    {
    "codigoProduto": 103,
    "descricaoProduto": "Borracha Branca",
    "estoque": 200
    },
    {
    "codigoProduto": 104,
    "descricaoProduto": "Lápis Preto HB",
    "estoque": 320
    },
    {
    "codigoProduto": 105,
    "descricaoProduto": "Marcador de Texto Amarelo",
    "estoque": 90
    }
  ]
}

```

**3. Calculadora de Juros sobre Atraso**

```
Faça um programa que a partir de um valor e de
uma data de vencimento, calcule o valor dos juros
na data de hoje considerando que a multa seja de
2,5% ao dia.
```

---

## 💡 Solução Entregue:

---

### 📊 Módulo de Vendas

**Objetivo do Desafio:**

> Criar um programa que leia dados de vendas de um time comercial e calcule as comissões seguindo regras específicas.

**Solução Implementada:**

- ✅ **Cálculo Automático de Comissões** seguindo as regras de negócio:

  - Vendas < R$ 100,00 → **0% de comissão**
  - R$ 100,00 ≤ Vendas < R$ 500,00 → **1% de comissão**
  - Vendas ≥ R$ 500,00 → **5% de comissão**

- 📈 **Dashboard Analítico** com métricas em tempo real:

  - Total de vendas acumulado
  - Total de comissões pagas
  - Quantidade de transações
  - Ticket médio por venda

- 🏆 **Ranking de Vendedores** organizado por faturamento total

- 📱 **Detalhamento Individual** através de side sheet:
  - Métricas individuais de cada vendedor
  - Histórico completo de todas as vendas
  - Posicionamento no ranking

**Arquitetura Técnica:**

- Custom hook `useVendedoresData` para processamento e agregação de dados
- Função utilitária `calcularComissao` isolada para regras de negócio

---

### 📦 Módulo de Estoque

**Objetivo do Desafio:**

> Criar um programa para lançar movimentações de estoque (entrada/saída) com identificador único, descrição e retorno da quantidade final.

**Solução Implementada:**

- ✅ **Sistema Completo de Movimentações:**

  - Entrada de produtos no estoque
  - Saída de produtos do estoque
  - Geração automática de ID único para cada movimentação (formato: `MOV-{timestamp}-{random}`)
  - Campo de descrição livre para justificar a movimentação

- 📊 **Visualização em Tempo Real:**

  - Tabela de histórico ordenada por data (mais recentes primeiro)
  - Timestamps relativos (ex: "há 5 minutos", "há 2 horas")

- 🔍 **Filtros e Busca Avançada:**

  - Busca por ID, produto ou descrição
  - Filtro por produto específico
  - Resultados em tempo real conforme digitação

- 🛡️ **Validações Robustas:**
  - Validação de campos obrigatórios
  - Verificação de estoque disponível antes de saídas
  - Feedback via toast notifications (Sonner)
  - Prevenção de valores negativos

**Arquitetura Técnica:**

- Custom hook `useEstoque` com gerenciamento de estado complexo
- Uso de `useCallback` com functional updates para evitar stale closures
- Gerador de IDs único e seguro
- Validação multi-camada (UI + lógica de negócio)

---

### 💰 Módulo de Juros

**Objetivo do Desafio:**

> Criar um programa que calcule juros de 2,5% ao dia sobre valores vencidos.

**Solução Implementada:**

- ✅ **Calculadora Avançada de Juros:**

  - Suporte para **Juros Simples**: Crescimento linear (`valor + valor × 0,025 × dias`)
  - Suporte para **Juros Compostos**: Crescimento exponencial (`valor × 1,025^dias`)
  - Seleção entre os dois tipos de cálculo

- 📅 **Interface Intuitiva:**

  - Campo de valor monetário com validação
  - Date picker localizado em PT-BR
  - Calendário com navegação facilitada

- 📊 **Visualização de Dados:**

  - 4 cards de métricas principais:
    - Dias em atraso
    - Valor original
    - Juros acumulados
    - Valor total a pagar
  - Gráfico de evolução dia a dia (AreaChart com Recharts)
  - Rodapé dinâmico mostrando incremento diário

**Arquitetura Técnica:**

- Custom hook `useJurosCalculator` com memoização completa
- Duas funções distintas para cálculos (simples e compostos)
- Geração otimizada de dados para gráfico
- Integração com date-fns para manipulação de datas
- Localização PT-BR em toda a interface

---

## 🚀 Tecnologias Utilizadas

### Core

- **React 19.2.0** - Biblioteca UI com novos recursos
- **TypeScript 5.9.3** - Tipagem estática e IntelliSense
- **Vite 7.2.4** - Build tool ultra-rápido com HMR

### UI/UX

- **Tailwind CSS 4.1.17** - Utility-first CSS framework
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Radix UI** - Primitivos headless de alta qualidade
- **Lucide React** - Ícones modernos e consistentes
- **Recharts 3.5.0** - Biblioteca de gráficos declarativos

### Utilitários

- **date-fns 4.1.0** - Manipulação de datas moderna
- **Sonner 2.0.7** - Toast notifications elegantes
- **clsx + tailwind-merge** - Gestão condicional de classes

### Qualidade de Código

- **ESLint 9** - Linting com regras TypeScript
- **TypeScript ESLint** - Regras específicas para TS
- **React Hooks ESLint** - Validação de hooks

---

## 📁 Estrutura do Projeto

```
src/
├── assets/              # Imagens e ícones estáticos
├── components/
│   ├── ui/             # Componentes shadcn/ui base
│   ├── EstoqueCard.tsx
│   ├── Header.tsx
│   ├── HistoricoTable.tsx
│   ├── JurosChart.tsx
│   ├── JurosInputCard.tsx
│   ├── JurosMetricsCards.tsx
│   ├── MovimentacaoDialog.tsx
│   ├── VendedoresTable.tsx
│   └── VendedorSheet.tsx
├── hooks/              # Custom React Hooks
│   ├── useEstoque.ts
│   ├── useJurosCalculator.ts
│   └── useVendedoresData.ts
├── pages/              # Páginas principais
│   ├── Estoque.tsx
│   ├── Juros.tsx
│   └── Vendas.tsx
├── services/           # Dados JSON de exemplo
│   ├── estoque.json
│   └── vendas.json
├── types/              # Definições TypeScript
│   └── index.ts
├── utils/              # Funções utilitárias
│   ├── calcularComissao.ts
│   ├── calcularJuros.ts
│   └── gerarIdMovimentacao.ts
├── App.tsx             # Componente raiz
└── main.tsx            # Entry point
```

---

## 💻 Como Usar

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação

```bash
# Clone o repositório
git clone https://github.com/wandayk/target-challenge.git

# Entre na pasta do projeto
cd target-challenge

# Instale as dependências
npm install
```

### Executando o Projeto

```bash
# Modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

O projeto estará disponível em `http://localhost:5173`

---

## 🎮 Navegação e Uso

### Aba Vendas

1. Visualize as métricas gerais no painel esquerdo
2. Explore o ranking de vendedores na tabela central
3. Clique em qualquer vendedor para ver detalhes individuais
4. No sheet lateral, analise métricas e histórico completo

### Aba Estoque

1. Visualize os cards de estoque no painel esquerdo
2. Clique em "Nova Movimentação" para registrar entrada/saída
3. Preencha o formulário:
   - Selecione o produto
   - Escolha entre Entrada ou Saída
   - Informe quantidade e descrição
4. Use busca e filtros para encontrar movimentações específicas

### Aba Juros

1. Preencha o valor original
2. Selecione a data de vencimento
3. Escolha o tipo de juros (Simples ou Compostos)
4. Visualize automaticamente:
   - Métricas calculadas
   - Gráfico de evolução
   - Incremento diário no rodapé

---

## 👨‍💻 Desenvolvedor

**Wandayk Cavalcante**

- 💼 [LinkedIn](https://www.linkedin.com/in/wandayk)
- 🐙 [GitHub](https://github.com/wandayk)
- 📧 wandaykc@gmail.com
