import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getBookBySlug } from "@/lib/confessions/books";

export default async function ConfessionalBookPage({
  params,
}: {
  params: Promise<{ bookSlug: string }>; // ✅ Promise no Next.js 15+
}) {
  // ✅ Aguardar params (Next.js 15+)
  const { bookSlug } = await params;

  // ✅ Buscar configuração do livro no arquivo central
  const book = getBookBySlug(bookSlug);
  if (!book) notFound();

  // Buscar capítulos no Supabase
  const supabase = await createSupabaseServerClient();

  const { data: chapters, error } = await supabase
    .from("confessional_chapters")
    .select("id, number, title, summary")
    .eq("book_id", book.id)
    .order("order_index", { ascending: true });

  // Tratar erro de banco
  if (error) {
    console.error("Erro ao buscar capítulos:", error);
    return (
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          Erro ao carregar capítulos. Por favor, tente novamente.
        </div>
      </div>
    );
  }

  const hasChapters = chapters && chapters.length > 0;

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      {/* HEADER */}
      <header className="rounded-2xl bg-white p-5 border space-y-1">
        <h1 className="text-lg font-semibold text-zinc-900">
          {book.label}
        </h1>
        <p className="text-sm text-zinc-600">
          {book.description}
        </p>
      </header>

      {/* AVISO */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
        <p className="leading-relaxed">
          Este conteúdo está sendo inserido capítulo por capítulo, com fidelidade
          histórica e teológica.
        </p>
      </div>

      {/* LISTA DE CAPÍTULOS */}
      {hasChapters ? (
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <Link
              key={chapter.id}
              href={`/app/confissao/${bookSlug}/${chapter.number}`}
              className="block rounded-2xl bg-white p-4 border hover:bg-zinc-50 transition"
            >
              <p className="text-xs text-zinc-500">
                Capítulo {chapter.number}
              </p>
              <p className="font-medium text-zinc-900">
                {chapter.title}
              </p>
              {chapter.summary && (
                <p className="mt-1 text-xs text-zinc-600">
                  {chapter.summary}
                </p>
              )}
            </Link>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-zinc-100 border border-zinc-200 p-4 text-sm text-zinc-600 text-center">
          Nenhum capítulo disponível ainda.
        </div>
      )}
    </div>
  );
}