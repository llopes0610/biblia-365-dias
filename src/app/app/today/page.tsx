import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateStreak } from "@/lib/streak";
import { getSpiritualLevel } from "@/lib/spiritualLevel";
import { shouldRemindToday } from "@/lib/reminder";
import MarkAsReadButton from "./MarkAsReadButton";
import BottomNav from "@/components/BottomNav";

export default async function TodayPage() {
  // 🔐 Sessão
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  // 👤 Usuário
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  // 📖 Dias concluídos
  const completions = await prisma.userCompletion.findMany({
    where: { userId: user.id },
    select: {
      planDayId: true,
      completedAt: true,
    },
    orderBy: { completedAt: "desc" },
  });

  const completedPlanDayIds = completions.map(
    (c) => c.planDayId
  );

  // 👉 Próximo dia NÃO lido do plano
  const day = await prisma.readingPlanDay.findFirst({
    where: {
      id: {
        notIn: completedPlanDayIds.length
          ? completedPlanDayIds
          : undefined,
      },
    },
    orderBy: { date: "asc" },
    include: {
      readings: { orderBy: { order: "asc" } },
    },
  });

  // 🔥 Streak
  const streak = calculateStreak(
    completions.map((c) => ({
      completedAt: c.completedAt,
    }))
  );

  // 🔔 Lembrete (se não leu hoje)
  const shouldRemind = shouldRemindToday(completions);

  // 📊 Progresso anual
  const totalDays = 365;
  const completedDays = completions.length;
  const progressPercent = Math.min(
    Math.round((completedDays / totalDays) * 100),
    100
  );

  // 🏆 Nível espiritual
  const level = getSpiritualLevel(completedDays);

  // 🎉 Caso tenha concluído todo o plano
  if (!day) {
    return (
      <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
        <div className="mx-auto max-w-md rounded-2xl bg-white p-6 shadow-sm border text-center space-y-3">
          <h1 className="text-xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-zinc-600">
            🎉 Parabéns! Você concluiu todo o plano bíblico.
          </p>
        </div>

        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      <div className="mx-auto w-full max-w-md space-y-4">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-5 shadow-sm border space-y-2">
          <h1 className="text-xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>

          <p className="text-sm text-zinc-600">
            Continue sua leitura
          </p>

          {streak > 0 && (
            <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700 border border-orange-100 w-fit">
              🔥 {streak} dia{streak > 1 ? "s" : ""} seguido
              {streak > 1 ? "s" : ""}
            </div>
          )}
        </header>

        {/* 🔔 LEMBRETE PASTORAL */}
        {shouldRemind && (
          <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
            ⏰ Que tal separar um momento hoje para a Palavra?
          </div>
        )}

        {/* 📊 PROGRESSO ANUAL */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-zinc-800">
              Progresso anual
            </h3>
            <span className="text-xs text-zinc-600">
              {completedDays} / {totalDays}
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <p className="text-xs text-zinc-500">
            {progressPercent}% do plano concluído
          </p>
        </div>

        {/* 🏆 NÍVEL ESPIRITUAL */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">{level.emoji}</span>
            <h3 className="text-sm font-semibold text-zinc-800">
              Nível espiritual
            </h3>
          </div>

          <span className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            {level.label}
          </span>

          <p className="text-xs text-zinc-500">
            {level.description}
          </p>
        </div>

        {/* 📖 LEITURA */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">
                {day.dayLabel}
              </h2>
              <p className="text-sm text-zinc-600">
                Capítulos:{" "}
                <span className="font-medium">
                  {day.chapters}
                </span>
              </p>
            </div>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
              Próximo
            </span>
          </div>

          <ul className="space-y-2">
            {day.readings.map((r) => (
              <li
                key={r.id}
                className="flex items-center justify-between rounded-xl border bg-zinc-50 px-4 py-3"
              >
                <span className="text-sm font-medium text-zinc-800">
                  {r.reference}
                </span>
                <span className="text-xs text-zinc-500">
                  #{r.order}
                </span>
              </li>
            ))}
          </ul>

          <MarkAsReadButton
            planDayId={day.id}
            completed={false}
          />
        </div>
      </div>

      {/* 🧭 MENU */}
      <BottomNav />
    </div>
  );
}
