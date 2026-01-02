export type Achievement = {
  id: string;
  title: string;
  description: string;
  emoji: string;
  unlocked: boolean;
};

export function getAchievements(
  completedDays: number,
  streak: number
): Achievement[] {
  const percent = Math.round(
    (completedDays / 365) * 100
  );

  return [
    {
      id: "first_day",
      title: "Primeiro passo",
      description: "Você iniciou sua jornada na Palavra",
      emoji: "🌱",
      unlocked: completedDays >= 1,
    },
    {
      id: "three_days",
      title: "Constância inicial",
      description: "3 dias seguidos de leitura",
      emoji: "🔥",
      unlocked: streak >= 3,
    },
    {
      id: "seven_days",
      title: "Primeira semana",
      description: "7 dias seguidos na Palavra",
      emoji: "📖",
      unlocked: streak >= 7,
    },
    {
      id: "fifteen_days",
      title: "Perseverança",
      description: "15 dias seguidos de leitura",
      emoji: "🛡️",
      unlocked: streak >= 15,
    },
    {
      id: "thirty_days",
      title: "Disciplina",
      description: "30 dias seguidos de leitura",
      emoji: "🏆",
      unlocked: streak >= 30,
    },
    {
      id: "25_percent",
      title: "Caminho firmado",
      description: "25% da Bíblia concluída",
      emoji: "📘",
      unlocked: percent >= 25,
    },
    {
      id: "50_percent",
      title: "Metade do caminho",
      description: "50% do plano concluído",
      emoji: "📗",
      unlocked: percent >= 50,
    },
    {
      id: "75_percent",
      title: "Quase lá",
      description: "75% da Bíblia concluída",
      emoji: "📙",
      unlocked: percent >= 75,
    },
    {
      id: "complete",
      title: "Bíblia completa",
      description: "Você leu toda a Escritura",
      emoji: "✨",
      unlocked: completedDays >= 365,
    },
  ];
}
