import { UserCompletion } from "@prisma/client";

export function shouldRemindToday(
  completions: Pick<UserCompletion, "completedAt">[],
  now: Date = new Date()
) {
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return !completions.some((c) => {
    const completedDate = new Date(
      c.completedAt.getFullYear(),
      c.completedAt.getMonth(),
      c.completedAt.getDate()
    );

    return completedDate.getTime() === today.getTime();
  });
}
