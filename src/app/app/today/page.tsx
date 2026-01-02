import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateStreak } from "@/lib/streak";
import { getSpiritualProgress } from "@/lib/spiritualLevel";
import { getAchievements } from "@/lib/achievements";
import { shouldRemindToday } from "@/lib/reminder";
import MarkAsReadButton from "./MarkAsReadButton";
import BottomNav from "@/components/BottomNav";

export default async function TodayPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  const completions = await prisma.userCompletion.findMany({
    where: { userId: user.id },
    select: { planDayId: true, completedAt: true },
    orderBy: { completedAt: "desc" },
  });

  const completedPlanDayIds = completions.map(
    (c) => c.planDayId
  );

  const day = await prisma.readingPlanDay.findFirst({
    where: {
      id: {
        notIn: completedPlanDayIds.length
          ? completedPlanDayIds
          : undefined,
      },
    },
    orderBy: { date: "asc" },
    include: { readings: { orderBy: { order: "asc" } } },
  });

  const completedDays = completions.length;
  const totalDays = 365;

  const progressPercent = Math.min(
    Math.round((completedDays / totalDays) * 100),
    100
  );

  const streak = calculateStreak(
    completions.map((c) => ({
      completedAt: c.completedAt,
    }))
  );

  const shouldRemind = shouldRemindToday(completions);

  const spiritualProgress =
    getSpiritualProgress(completedDays);

  const achievements = getAchievements(
    completedDays,
    streak
  );

  if (!day) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 border text-center space-y-3">
          <h1 className="text-xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-zinc-600">
            🎉 Parabéns! Você concluiu toda a Bíblia.
          </p>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md space-y-4">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-5 border space-y-2">
          <h1 className="text-xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>

          {streak > 0 && (
            <span className="inline-flex w-fit rounded-full bg-orange-50 px-3 py-1 text-xs text-orange-700 border">
              🔥 {streak} dia
              {streak > 1 ? "s" : ""} seguido
              {streak > 1 ? "s" : ""}
            </span>
          )}
        </header>

        {/* LEMBRETE */}
        {shouldRemind && (
          <div className="rounded-xl bg-amber-50 border px-4 py-3 text-sm text-amber-800">
            ⏰ Separe hoje um momento para a Palavra.
          </div>
        )}

        {/* PROGRESSO */}
        <div className="rounded-2xl bg-white p-5 border space-y-2">
          <div className="flex justify-between text-xs text-zinc-600">
            <span>
              {completedDays} / {totalDays}
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div className="h-3 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* NÍVEL */}
        <div className="rounded-2xl bg-white p-5 border space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl">
              {spiritualProgress.current.emoji}
            </span>

            <div>
              <p className="font-semibold text-zinc-800">
                {spiritualProgress.current.label}
              </p>
              <p className="text-xs text-zinc-500">
                {spiritualProgress.current.description}
              </p>
            </div>
          </div>

          {spiritualProgress.next && (
            <>
              <p className="text-xs text-zinc-600">
                Próximo nível:{" "}
                <strong>
                  {spiritualProgress.next.label}
                </strong>
              </p>

              <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-600 transition-all"
                  style={{
                    width: `${spiritualProgress.progressInLevel}%`,
                  }}
                />
              </div>

              <p className="text-xs text-zinc-500">
                Faltam{" "}
                <strong>
                  {spiritualProgress.daysToNextLevel}
                </strong>{" "}
                dias
              </p>
            </>
          )}
        </div>

        {/* CONQUISTAS — MOBILE */}
        <div className="rounded-2xl bg-white p-5 border space-y-3">
          <h3 className="text-sm font-semibold">
            🏅 Conquistas
          </h3>

          <div className="grid grid-cols-2 gap-3">
            {achievements.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl border p-4 text-center transition ${
                  a.unlocked
                    ? "bg-emerald-50 border-emerald-200"
                    : "bg-zinc-100 border-zinc-200 opacity-70"
                }`}
              >
                <span className="text-3xl">
                  {a.emoji}
                </span>

                <p
                  className={`mt-1 text-xs font-semibold ${
                    a.unlocked
                      ? "text-emerald-700"
                      : "text-zinc-500"
                  }`}
                >
                  {a.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* LEITURA DO DIA — CONTRASTE CORRIGIDO */}
        <div className="rounded-2xl bg-white p-5 border space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">
            {day.dayLabel}
          </h2>

          <ul className="space-y-2">
            {day.readings.map((r) => (
              <li
                key={r.id}
                className="rounded-xl bg-white border px-4 py-3 shadow-sm text-sm text-zinc-800 active:scale-[0.98] transition"
              >
                {r.reference}
              </li>
            ))}
          </ul>

          <MarkAsReadButton
            planDayId={day.id}
            completed={false}
            className="mt-3 w-full py-4 text-base"
          />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
