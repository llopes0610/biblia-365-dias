import Link from "next/link";
import { getAllBooks } from "@/lib/confessions/books";

export default function ConfissaoHome() {
  const books = getAllBooks();

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
          <strong>resumo fiel, bíblico e histórico</strong> da fé cristã,
          elaborado pela igreja ao longo da história.
        </p>

        <p>
          Esses documentos auxiliam a igreja na preservação da doutrina,
          na instrução dos fiéis e na unidade confessional, sempre
          submetidos à autoridade suprema da Palavra de Deus.
        </p>

        <p>
          Ao estudá-los, somos ajudados a compreender melhor as grandes
          verdades da fé cristã — Deus, o homem, Cristo, a salvação e a
          vida cristã.
        </p>

        <p className="italic text-zinc-600">
          "A igreja é edificada quando confessa com clareza aquilo que
          crê."
        </p>
      </div>

      {/* AVISO */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
        <p className="leading-relaxed">
          Esta seção está sendo organizada com zelo teológico e fidelidade
          histórica. O conteúdo será disponibilizado capítulo por
          capítulo, de forma progressiva e estruturada.
        </p>
      </div>

      {/* LIVROS DINÂMICOS */}
      <div className="space-y-3">
        {books.map((book) => (
          <Link
            key={book.slug}
            href={`/app/confissao/${book.slug}`}
            className="block rounded-2xl bg-white p-4 border transition hover:bg-zinc-50"
          >
            <p className="text-sm font-semibold text-zinc-900">
              {book.icon} {book.label}
            </p>
            <p className="mt-1 text-xs text-zinc-600">
              {book.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}