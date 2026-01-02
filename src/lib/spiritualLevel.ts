type Level = {
  label: string;
  emoji: string;
  color: string;
  description: string;
  min: number;
  max: number;
};

type SpiritualProgress = {
  current: Level;
  next: Level | null;
  progressInLevel: number;
  daysToNextLevel: number | null;
};

const LEVELS: Level[] = [
  {
    min: 0,
    max: 14,
    label: "Iniciante",
    emoji: "🌱",
    color: "emerald",
    description: "Dando os primeiros passos na Palavra",
  },
  {
    min: 15,
    max: 45,
    label: "Disciplinado",
    emoji: "🌿",
    color: "green",
    description: "Criando o hábito da leitura diária",
  },
  {
    min: 46,
    max: 120,
    label: "Perseverante",
    emoji: "🔥",
    color: "orange",
    description: "Firmado na constância da Palavra",
  },
  {
    min: 121,
    max: 240,
    label: "Constante",
    emoji: "🛡️",
    color: "blue",
    description: "Vida moldada pela Escritura",
  },
  {
    min: 241,
    max: 365,
    label: "Maduro",
    emoji: "🏆",
    color: "purple",
    description: "Disciplina espiritual consolidada",
  },
];

export function getSpiritualProgress(
  completedDays: number
): SpiritualProgress {
  const currentIndex = LEVELS.findIndex(
    (l) =>
      completedDays >= l.min &&
      completedDays <= l.max
  );

  const current = LEVELS[currentIndex];
  const next =
    currentIndex < LEVELS.length - 1
      ? LEVELS[currentIndex + 1]
      : null;

  const progressInLevel = Math.min(
    Math.round(
      ((completedDays - current.min) /
        (current.max - current.min + 1)) *
        100
    ),
    100
  );

  const daysToNextLevel = next
    ? next.min - completedDays
    : null;

  return {
    current,
    next,
    progressInLevel,
    daysToNextLevel:
      daysToNextLevel && daysToNextLevel > 0
        ? daysToNextLevel
        : null,
  };
}
