type Completion = {
  completedAt: Date;
};

export function calculateStreak(
  completions: Completion[]
): number {
  if (!completions.length) return 0;

  // Converter para datas (YYYY-MM-DD)
  const dates = Array.from(
    new Set(
      completions.map((c) =>
        c.completedAt.toISOString().split("T")[0]
      )
    )
  )
    .map((d) => new Date(d))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff =
      (dates[i - 1].getTime() - dates[i].getTime()) /
      (1000 * 60 * 60 * 24);

    // se for exatamente 1 dia de diferença → continua
    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
