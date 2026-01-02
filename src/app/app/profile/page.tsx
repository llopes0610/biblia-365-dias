import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { calculateStreak } from "@/lib/streak";
import { getSpiritualProgress } from "@/lib/spiritualLevel";
import { getAchievements } from "@/lib/achievements";
import BottomNav from "@/components/BottomNav";
import LogoutButton from "@/components/LogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  const completions = await prisma.userCompletion.findMany({
    where: { userId: user.id },
    select: { completedAt: true },
    orderBy: { completedAt: "asc" },
  });

  const completedDays = completions.length;
  const streak = calculateStreak(completions);

  const spiritualProgress =
    getSpiritualProgress(completedDays);

  const achievements = getAchievements(
    completedDays,
    streak
  );

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md space-y-4">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-5 border">
          <h1 className="text-xl font-bold text-emerald-700">
            Perfil
          </h1>
          <p className="text-sm text-zinc-600">
            Sua caminhada na Palavra
          </p>
        </header>

        {/* USUÁRIO */}
        <div className="rounded-2xl bg-white p-5 border">
          <p className="font-medium text-zinc-800">
            {user.name || "Usuário"}
          </p>
          <p className="text-xs text-zinc-500">
            {user.email}
          </p>
        </div>

        {/* NÍVEL ESPIRITUAL */}
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

              <div className="h-2 rounded-full bg-zinc-100 overflow-hidden">
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

        {/* CONQUISTAS — MOBILE FIRST */}
        <div className="rounded-2xl bg-white p-5 border space-y-4">
          <h3 className="text-sm font-semibold text-zinc-800">
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

                <p className="mt-1 text-[11px] text-zinc-500 leading-tight">
                  {a.description}
                </p>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-zinc-400">
            As conquistas representam marcos da
            caminhada cristã, não méritos pessoais.
          </p>
        </div>

        {/* CONSTÂNCIA */}
        <div className="rounded-2xl bg-white p-5 border">
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

        {/* LOGOUT */}
        <div className="rounded-2xl bg-white p-5 border">
          <LogoutButton />
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
