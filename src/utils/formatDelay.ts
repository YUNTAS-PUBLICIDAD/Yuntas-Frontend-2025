export const formatDelay = (
  value: number,
  unit: string
): string => {

  if (value === 0) {
    return "Envío inmediato";
  }

  const labels: Record<string, string> = {

    minutes:
      value === 1
        ? "minuto"
        : "minutos",

    hours:
      value === 1
        ? "hora"
        : "horas",

    days:
      value === 1
        ? "día"
        : "días",
  };

  return `${value} ${labels[unit]}`;
};
