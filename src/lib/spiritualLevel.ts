export function getSpiritualLevel(completedDays: number) {
  if (completedDays <= 30) {
    return {
      label: "Iniciante",
      color: "emerald",
      emoji: "🌱",
      description: "Começando a criar o hábito da Palavra",
    };
  }

  if (completedDays <= 180) {
    return {
      label: "Perseverante",
      color: "blue",
      emoji: "🔥",
      description: "Firmando-se na constância da leitura",
    };
  }

  return {
    label: "Constante",
    color: "purple",
    emoji: "🏆",
    description: "Vida moldada pela Palavra diariamente",
  };
}
