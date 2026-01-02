import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateStreak } from "@/lib/streak";
import { getSpiritualLevel } from "@/lib/spiritualLevel";
import BottomNav from "@/components/BottomNav";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  // 🔐 Sessão
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  // 👤 Usuário
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  // 📖 Leituras concluídas (ordem cronológica)
  const completions = await prisma.userCompletion.findMany({
    where: { userId: user.id },
    select: { completedAt: true },
    orderBy: { completedAt: "asc" },
  });

  // 📊 Progresso
  const completedDays = completions.length;
  const totalDays = 365;

  const progressPercent = Math.min(
    Math.round((completedDays / totalDays) * 100),
    100
  );

  // 🔥 Constância
  const streak = calculateStreak(completions);

  // 🏆 Nível espiritual
  const level = getSpiritualLevel(completedDays);

  // 📅 PROJEÇÃO DE CONCLUSÃO (CORRIGIDA)
  let estimatedFinishDate: string | null = null;
  let readingRate: number | null = null;
  let remainingDays = totalDays - completedDays;

  if (completedDays >= 1) {
    const first = completions[0].completedAt;
    const last = completions[completions.length - 1].completedAt;

    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // Dias decorridos (mínimo 1)
    const daysElapsed = Math.max(
      1,
      Math.ceil((last.getTime() - first.getTime()) / MS_PER_DAY)
    );

    // Ritmo médio (limitado a 1 dia/dia)
    readingRate = Math.min(completedDays / daysElapsed, 1);

    if (readingRate > 0 && remainingDays > 0) {
      const estimatedDaysToFinish = Math.ceil(
        remainingDays / readingRate
      );

      const finishDate = new Date();
      finishDate.setDate(
        finishDate.getDate() + estimatedDaysToFinish
      );

      estimatedFinishDate =
        finishDate.toLocaleDateString("pt-BR");
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      <div className="mx-auto w-full max-w-md space-y-4">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-5 shadow-sm border space-y-1">
          <h1 className="text-xl font-bold text-emerald-700">
            Perfil
          </h1>
          <p className="text-sm text-zinc-600">
            Sua caminhada na Palavra
          </p>
        </header>

        {/* 👤 USUÁRIO */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-1">
          <p className="text-sm font-medium text-zinc-800">
            {user.name || "Usuário"}
          </p>
          <p className="text-xs text-zinc-500">
            {user.email}
          </p>
        </div>

        {/* 📊 PROGRESSO */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-3">
          <h3 className="text-sm font-semibold text-zinc-800">
            Progresso geral
          </h3>

          <div className="flex justify-between text-xs text-zinc-600">
            <span>
              {completedDays} / {totalDays} dias
            </span>
            <span>{progressPercent}%</span>
          </div>

          <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {remainingDays > 0 && (
            <p className="text-xs text-zinc-600">
              📖 Faltam{" "}
              <strong>{remainingDays}</strong> dias de
              leitura
            </p>
          )}

          {estimatedFinishDate && (
            <p className="text-xs text-zinc-600">
              📅 Estimativa de conclusão:{" "}
              <strong>{estimatedFinishDate}</strong>
            </p>
          )}

          {readingRate !== null && (
            <p className="text-xs text-zinc-500">
              Ritmo médio atual:{" "}
              <strong>
                {readingRate.toFixed(2)}
              </strong>{" "}
              dia(s) de leitura por dia
            </p>
          )}

          <p className="text-[11px] text-zinc-400">
            * As datas são estimativas baseadas no seu ritmo
            atual e podem variar conforme sua constância.
          </p>
        </div>

        {/* 🏆 NÍVEL ESPIRITUAL */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {level.emoji}
            </span>
            <h3 className="text-sm font-semibold text-zinc-800">
              Nível espiritual
            </h3>
          </div>

          <span className="inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            {level.label}
          </span>

          <p className="text-xs text-zinc-500">
            {level.description}
          </p>
        </div>

        {/* 🔥 CONSTÂNCIA */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-1">
          <h3 className="text-sm font-semibold text-zinc-800">
            Constância
          </h3>

          {streak > 0 ? (
            <p className="text-sm text-zinc-700">
              🔥 {streak} dia
              {streak > 1 ? "s" : ""} seguido
              {streak > 1 ? "s" : ""}
            </p>
          ) : (
            <p className="text-sm text-zinc-500">
              Ainda não iniciou uma sequência diária.
            </p>
          )}
        </div>

        {/* 🚪 LOGOUT */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border">
          <LogoutButton />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
