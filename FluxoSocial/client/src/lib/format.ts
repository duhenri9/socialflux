export const formatCurrency = (value: number): string =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const formatNumber = (value: number): string =>
  value.toLocaleString("pt-BR");

export const formatPercent = (value: number, fractionDigits = 1): string =>
  `${value.toFixed(fractionDigits).replace(".", ",")}%`;

export const formatShortDate = (input: string): string => {
  const date = new Date(input);

  if (Number.isNaN(date.valueOf())) {
    return input;
  }

  return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
};
