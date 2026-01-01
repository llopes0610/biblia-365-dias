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

  // 📖 Leituras concluídas
  const completions = await prisma.userCompletion.findMany({
    where: { userId: user.id },
    select: { completedAt: true },
    orderBy: { completedAt: "desc" },
  });

  // 🔥 Streak
  const streak = calculateStreak(completions);

  // 📊 Progresso
  const completedDays = completions.length;
  const totalDays = 365;
  const progressPercent = Math.min(
    Math.round((completedDays / totalDays) * 100),
    100
  );

  // 🏆 Nível espiritual
  const level = getSpiritualLevel(completedDays);

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

        {/* 👤 DADOS DO USUÁRIO */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-2">
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
            Progresso anual
          </h3>

          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-600">
              {completedDays} / {totalDays} dias
            </span>
            <span className="text-xs text-zinc-600">
              {progressPercent}%
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-zinc-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-emerald-600"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
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

        {/* 🔥 STREAK */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-2">
          <h3 className="text-sm font-semibold text-zinc-800">
            Constância
          </h3>

          {streak > 0 ? (
            <p className="text-sm text-zinc-700">
              🔥 {streak} dia{streak > 1 ? "s" : ""} seguido
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
