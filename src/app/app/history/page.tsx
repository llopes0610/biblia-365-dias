import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import BottomNav from "@/components/BottomNav";


export default async function HistoryPage() {
  // 🔐 Sessão
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");

  // 👤 Usuário
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) redirect("/login");

  // 📖 Histórico de leituras
  const history = await prisma.userCompletion.findMany({
    where: { userId: user.id },
    orderBy: { completedAt: "desc" },
    include: {
      planDay: {
        include: {
          readings: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6">
      <div className="mx-auto w-full max-w-md space-y-4">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-5 shadow-sm border space-y-1">
          <h1 className="text-xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-sm text-zinc-600">
            Histórico de leituras
          </p>
        </header>

        {history.length === 0 ? (
          <div className="rounded-2xl bg-white p-5 shadow-sm border">
            <p className="text-sm text-zinc-600">
              Você ainda não concluiu nenhuma leitura.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {history.map((item) => (
              <li
                key={item.id}
                className="rounded-2xl bg-white p-4 shadow-sm border space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-zinc-800">
                      {item.planDay.dayLabel}
                    </p>
                    <p className="text-xs text-zinc-500">
                      {new Date(
                        item.completedAt
                      ).toLocaleDateString("pt-BR")}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 border border-emerald-100">
                    ✔ Concluído
                  </span>
                </div>

                <ul className="space-y-1">
                  {item.planDay.readings.map((r) => (
                    <li
                      key={r.id}
                      className="text-sm text-zinc-700"
                    >
                      • {r.reference}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
         <BottomNav />
      </div>
    </div>
  );
}
