import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center px-6">
      <div className="max-w-2xl bg-white rounded-2xl shadow-md p-8 space-y-6">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-emerald-700">
            Bíblia 365 Dias
          </h1>
          <p className="text-zinc-600">
            Leitura bíblica cronológica acompanhada dos Salmos
          </p>
        </header>

        <section className="space-y-4 text-zinc-700 text-sm leading-relaxed">
          <p>
            Este plano de leitura foi desenvolvido para conduzir o cristão pela{" "}
            <strong>história da redenção</strong>, seguindo a Escritura em sua{" "}
            <strong>ordem cronológica</strong>, permitindo compreender o agir
            soberano de Deus ao longo do tempo.
          </p>

          <p>
            A leitura diária é acompanhada pelos <strong>Salmos</strong>,
            ensinando-nos a responder à Palavra com oração, louvor,
            arrependimento e confiança no Senhor.
          </p>

          <p>
            O objetivo deste projeto é incentivar a leitura completa da Bíblia,
            fortalecer os cristãos na fé e auxiliar a igreja local na{" "}
            <strong>obra de Cristo</strong>.
          </p>

          <p className="italic text-zinc-600">
            Que ao final deste percurso não apenas tenhamos lido a Bíblia,
            mas sejamos mais parecidos com Cristo.
          </p>
        </section>

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
