import Link from "next/link";

export default function ConfissaoHome() {
  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      {/* HEADER */}
      <header className="rounded-2xl bg-white p-5 border space-y-1">
        <h1 className="text-lg font-semibold text-zinc-900">
          Confissões Reformadas
        </h1>
        <p className="text-sm text-zinc-600">
          Documentos históricos da fé cristã reformada
        </p>
      </header>

      {/* INTRODUÇÃO */}
      <div className="rounded-2xl bg-white p-5 border space-y-3 text-sm text-zinc-700 leading-relaxed">
        <p>
          As <strong>confissões e catecismos reformados</strong> não
          substituem as Escrituras, mas servem como um{" "}
          <strong>resumo fiel, bíblico e histórico</strong> daquilo que a
          igreja cristã crê, ensina e confessa com base na Palavra de Deus.
        </p>

        <p>
          Esses documentos foram elaborados por pastores e teólogos com o
          propósito de preservar a doutrina bíblica, instruir o povo de Deus
          e promover unidade, clareza e maturidade espiritual na igreja.
        </p>

        <p>
          Ao estudá-los, somos auxiliados a compreender melhor as grandes
          verdades da fé cristã — quem Deus é, quem nós somos, a obra de
          Cristo, a salvação, a vida cristã e a esperança eterna.
        </p>

        <p className="italic text-zinc-600">
          “Tudo deve ser examinado à luz das Escrituras.”
        </p>
      </div>

      {/* AVISO */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
        <p className="leading-relaxed">
          Esta seção está sendo organizada com zelo teológico e fidelidade
          histórica. O conteúdo será disponibilizado progressivamente, de
          forma estruturada e revisada.
        </p>
      </div>

      {/* LIVROS */}
      <Link
        href="/app/confissao/confissao-westminster"
        className="block rounded-2xl bg-white p-4 border transition hover:bg-zinc-50"
      >
        <p className="text-sm font-semibold text-zinc-900">
          📘 Confissão de Fé de Westminster
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          Síntese doutrinária da fé reformada
        </p>
      </Link>

      <Link
        href="/app/confissao/catecismo-maior"
        className="block rounded-2xl bg-white p-4 border transition hover:bg-zinc-50"
      >
        <p className="text-sm font-semibold text-zinc-900">
          📗 Catecismo Maior de Westminster
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          Exposição detalhada da doutrina cristã
        </p>
      </Link>

      <Link
        href="/app/confissao/breve-catecismo"
        className="block rounded-2xl bg-white p-4 border transition hover:bg-zinc-50"
      >
        <p className="text-sm font-semibold text-zinc-900">
          📙 Breve Catecismo de Westminster
        </p>
        <p className="mt-1 text-xs text-zinc-600">
          Fundamentos da fé cristã em perguntas e respostas
        </p>
      </Link>
    </div>
  );
}
