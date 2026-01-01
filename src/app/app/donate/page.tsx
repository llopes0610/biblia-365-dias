import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default async function DonatePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      <div className="mx-auto max-w-md space-y-4">
        <header className="rounded-2xl bg-white p-5 shadow-sm border">
          <h1 className="text-xl font-bold text-emerald-700">
            Contribuir
          </h1>
          <p className="text-sm text-zinc-600">
            Apoio voluntário
          </p>
        </header>

        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-4">
          <p className="text-sm text-zinc-700">
            Este aplicativo existe para incentivar a leitura diária
            da Palavra de Deus.
          </p>

          <p className="text-sm text-zinc-700">
            Caso deseje, de forma <strong>livre e voluntária</strong>,
            você pode contribuir com ofertas ou dízimos para a igreja,
            ajudando na manutenção deste projeto.
          </p>

          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800">
            <p className="font-medium">PIX (CNPJ)</p>
            <p className="mt-1 break-all font-mono">
              47.270.030/0001-81
            </p>
          </div>

          <p className="text-xs text-zinc-500">
            “Cada um contribua segundo propôs no coração,
            não com tristeza ou por necessidade.”
            <br />
            2 Coríntios 9:7
          </p>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
