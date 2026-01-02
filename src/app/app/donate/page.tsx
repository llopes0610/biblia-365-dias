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
            Apoio direto à obra da igreja
          </p>
        </header>

        {/* CONTEÚDO */}
        <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-4">
          <p className="text-sm text-zinc-700 leading-relaxed">
            Este aplicativo foi desenvolvido com o propósito de
            auxiliar irmãos e irmãs na leitura diária das Escrituras,
            promovendo disciplina espiritual, edificação pessoal e
            amor pela Palavra de Deus.
          </p>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Toda contribuição realizada aqui é{" "}
            <strong>livre, voluntária e consciente</strong>, e será
            destinada <strong>integralmente</strong> à obra da igreja
            local, sem qualquer retenção, comissão ou benefício
            pessoal ao desenvolvedor deste aplicativo.
          </p>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Os recursos arrecadados têm como destino exclusivo a{" "}
            <strong>
              Igreja Presbiteriana Ocian de Praia Grande
            </strong>
            , sendo utilizados para:
          </p>

          <ul className="list-disc pl-5 text-sm text-zinc-700 space-y-1">
            <li>manutenção da igreja local</li>
            <li>apoio às atividades ministeriais</li>
            <li>ações de ensino, discipulado e evangelização</li>
            <li>necessidades administrativas da obra</li>
          </ul>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Como criador deste aplicativo, eu,{" "}
            <strong>Lucas Silva Lopes</strong>, optei por servir dessa
            forma, colocando à disposição da igreja os dons que Deus
            me concedeu, entendendo este projeto como um serviço ao
            corpo de Cristo, e não como meio de ganho ou promoção
            pessoal.
          </p>

          <p className="text-sm text-zinc-700 leading-relaxed">
            Caso algum irmão deseje conhecer melhor minha trajetória,
            projetos ou trabalho profissional, isso pode ser feito de
            maneira transparente através do site:
            <br />
            <a
              href="https://lucaslopes.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-medium underline break-all"
            >
              https://lucaslopes.tech
            </a>
          </p>

          {/* DADOS BANCÁRIOS */}
          <div className="rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-sm text-emerald-800 space-y-2">
            <p className="font-semibold">
              Contribuição via PIX (CNPJ)
            </p>

            <p className="font-mono break-all">
              47.270.030/0001-81
            </p>

            <p className="text-xs text-emerald-700">
              Banco:{" "}
              <strong>
                CORA Sociedade de Crédito, Financiamento e
                Investimento S.A.
              </strong>
            </p>

            <p className="text-xs text-emerald-700">
              Favorecido:{" "}
              <strong>
                Igreja Presbiteriana Ocian – Praia Grande
              </strong>
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
