import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import BottomNav from "@/components/BottomNav";

export default async function DonatePage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-6 pb-24">
      <div className="mx-auto w-full max-w-md space-y-4">
        {/* HEADER */}
        <header className="rounded-2xl bg-white p-5 shadow-sm border space-y-1">
          <h1 className="text-xl font-bold text-emerald-700">
            Contribuição voluntária
          </h1>
          <p className="text-sm text-zinc-600">
            Apoio à obra da igreja
          </p>
        </header>

        {/* CONTEÚDO */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-4">
          <p className="text-sm text-zinc-700 leading-relaxed">
            Este aplicativo foi desenvolvido com o propósito de
            incentivar irmãos e irmãs na leitura diária das Escrituras
            e na edificação espiritual, como um auxílio simples,
            acessível e fiel à Palavra de Deus.
          </p>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Toda e qualquer contribuição realizada aqui é
            <strong> livre, voluntária e consciente</strong>, e será
            destinada <strong>integralmente</strong> à obra da igreja
            e às suas necessidades, servindo para manutenção,
            expansão e apoio às atividades ministeriais.
          </p>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Como criador deste aplicativo, eu,{" "}
            <strong>Lucas Silva Lopes</strong>, optei por servir dessa
            forma, utilizando os dons que Deus me concedeu para
            cooperar com a edificação do corpo de Cristo, sem qualquer
            finalidade pessoal ou comercial.
          </p>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Caso algum irmão deseje conhecer melhor meu trabalho,
            trajetória ou projetos, isso pode ser feito de forma livre
            e transparente através do site:
            <br />
            <a
              href="https://lucaslopes.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium underline"
            >
              https://lucaslopes.tech
            </a>
          </p>

          {/* PIX */}
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800 space-y-1">
            <p className="font-medium">
              Contribuição via PIX (CNPJ)
            </p>
            <p className="break-all font-mono text-sm">
              47.270.030/0001-81
            </p>
          </div>

          {/* TEXTO BÍBLICO */}
          <p className="text-xs text-zinc-500 leading-relaxed">
            “Cada um contribua segundo tiver proposto no coração,
            não com tristeza ou por necessidade; porque Deus ama a
            quem dá com alegria.”
            <br />
            <span className="font-medium">
              2 Coríntios 9:7
            </span>
          </p>
        </div>
      </div>

      {/* 🧭 MENU */}
      <BottomNav />
    </div>
  );
}
