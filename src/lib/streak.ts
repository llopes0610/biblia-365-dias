export function calculateStreak(
  completions: { completedAt: Date }[]
): number {
  if (completions.length === 0) return 0;

  const dates = completions
    .map((c) => new Date(c.completedAt))
    .sort((a, b) => b.getTime() - a.getTime());

  let streak = 1;

  for (let i = 1; i < dates.length; i++) {
    const diff =
      (dates[i - 1].getTime() - dates[i].getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
