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
            Leitura bíblica na progressão da história da redenção,
            acompanhada dos Salmos
          </p>
        </header>

        {/* DESTAQUE PLAY STORE */}
        <div className="rounded-xl bg-emerald-50 border border-emerald-100 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-emerald-700">
            📱 EM BREVE NA PLAY STORE
          </p>
          <p className="text-xs text-emerald-800 mt-1">
            Aplicativo oficial em desenvolvimento
          </p>
        </div>

        {/* TEXTO INSTITUCIONAL */}
        <section className="space-y-4 text-zinc-700 text-sm leading-relaxed">
          <p>
            O <strong>Bíblia 365 Dias</strong> é um plano de leitura bíblica
            desenvolvido para conduzir o cristão pela{" "}
            <strong>história da redenção</strong>, seguindo a{" "}
            <strong>progressão cronológica dos acontecimentos bíblicos</strong>,
            ajudando a compreender o agir soberano de Deus ao longo do tempo.
          </p>

          <p>
            A leitura diária é acompanhada pelos{" "}
            <strong>Salmos</strong>, que nos ensinam a responder à Palavra
            com oração, louvor, arrependimento e confiança no Senhor,
            formando não apenas leitores, mas adoradores.
          </p>

          <p>
            O plano respeita a sequência histórica da revelação bíblica,
            organizando as leituras de forma pedagógica e devocional,
            sem perder de vista a unidade das Escrituras e o centro
            da fé cristã: <strong>Jesus Cristo</strong>.
          </p>

          <p>
            Este é um projeto{" "}
            <strong>sem fins lucrativos</strong>, criado com o propósito
            de incentivar a leitura completa da Bíblia, fortalecer os
            cristãos na fé e servir como auxílio à{" "}
            <strong>igreja local na obra de Cristo</strong>.
          </p>

          <p>
            Caso tenha qualquer dúvida, sugestão ou deseje entrar em
            contato, estou à disposição pelo e-mail:
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
