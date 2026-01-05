import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
      <div className="max-w-2xl bg-white rounded-2xl shadow-md p-8 space-y-6 border">
        {/* HEADER */}
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-zinc-600">
            Plano de leitura bíblica em 365 dias
          </p>
        </header>

        {/* TEXTO INSTITUCIONAL */}
        <section className="space-y-4 text-zinc-700 text-sm leading-relaxed">
          <p>
            O <strong>Bíblia 365 Dias</strong> é um plano de leitura bíblica
            desenvolvido para auxiliar o cristão na leitura completa das
            Escrituras ao longo de um ano, seguindo a{" "}
            <strong>ordem tradicional da Bíblia</strong>, do Gênesis ao
            Apocalipse.
          </p>

          <p>
            As leituras são organizadas de forma{" "}
            <strong>progressiva e pedagógica</strong>, respeitando a unidade
            das Escrituras e conduzindo o leitor pela{" "}
            <strong>história da redenção</strong>, revelada de maneira clara
            e culminante em <strong>Jesus Cristo</strong>.
          </p>

          <p>
            Ao longo do plano, os <strong>Salmos</strong> acompanham a leitura
            diária, ensinando-nos a responder à Palavra de Deus com oração,
            louvor, arrependimento e confiança no Senhor.
          </p>

          <p>
            Este é um projeto{" "}
            <strong>sem fins lucrativos</strong>, criado com o propósito de
            incentivar a leitura completa da Bíblia, fortalecer os cristãos
            na fé e servir como apoio à{" "}
            <strong>igreja local na obra de Cristo</strong>.
          </p>

          <p>
            Caso tenha qualquer dúvida, sugestão ou deseje entrar em contato,
            estou à disposição pelo e-mail:
            <br />
            <a
              href="mailto:llopes3025@gmail.com"
              className="text-emerald-700 font-medium underline"
            >
              llopes3025@gmail.com
            </a>
          </p>

          <p className="italic text-zinc-600">
            Que ao final deste percurso não apenas tenhamos lido a Bíblia,
            mas sejamos, pela graça de Deus, mais parecidos com Cristo.
          </p>
        </section>

        {/* LINKS LEGAIS */}
        <section className="border-t pt-4 space-y-2 text-sm text-zinc-600">
          <p>
            🔒{" "}
            <Link
              href="/app/politica-de-privacidade"
              className="text-emerald-700 underline font-medium"
            >
              Política de Privacidade
            </Link>
          </p>

          <p>
            🗑️{" "}
            <Link
              href="/app/exclusao-de-conta"
              className="text-emerald-700 underline font-medium"
            >
              Solicitar exclusão de conta
            </Link>
          </p>
        </section>

        {/* AÇÕES */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/login"
            className="rounded-lg bg-emerald-600 px-6 py-3 text-white text-center font-medium hover:bg-emerald-700 transition"
          >
            Entrar
          </Link>

          <Link
            href="/register"
            className="rounded-lg border border-emerald-600 px-6 py-3 text-emerald-700 text-center font-medium hover:bg-emerald-50 transition"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </main>
  );
}
