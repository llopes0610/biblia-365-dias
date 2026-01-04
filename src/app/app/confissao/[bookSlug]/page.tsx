import { notFound } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getBookBySlug } from "@/lib/confessions/books";

export default async function ConfessionalBookPage({
  params,
  searchParams,
}: {
  params: Promise<{ bookSlug: string }>;
  searchParams?: Promise<{
    q?: string;
    page?: string;
    perPage?: string;
  }>;
}) {
  // Next.js 15+
  const { bookSlug } = await params;
  const sp = await searchParams;

  const query = sp?.q?.trim() || "";
  const page = Number(sp?.page || 1);
  const perPage = Number(sp?.perPage || 10);

  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  // Livro
  const book = getBookBySlug(bookSlug);
  if (!book) notFound();

  const supabase = await createSupabaseServerClient();

  // Query base
  let request = supabase
    .from("confessional_chapters")
    .select("id, number, title, summary", { count: "exact" })
    .eq("book_id", book.id)
    .order("order_index", { ascending: true })
    .range(from, to);

  // 🔍 Filtro por termo
  if (query) {
    request = request.or(
      `title.ilike.%${query}%,summary.ilike.%${query}%`
    );
  }

  const { data: chapters, error, count } = await request;

  if (error) {
    console.error("Erro ao buscar capítulos:", error);
    return (
      <div className="mx-auto w-full max-w-md space-y-4">
        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-800">
          Erro ao carregar capítulos. Tente novamente.
        </div>
      </div>
    );
  }

  const totalPages = count ? Math.ceil(count / perPage) : 1;
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

      {/* 🔍 BUSCA */}
      <form method="GET" className="flex gap-2">
        <input
          type="text"
          name="q"
          defaultValue={query}
          placeholder="Buscar por termo (ex: salvação)"
          className="
            flex-1
            rounded-xl
            border
            px-3
            py-2
            text-sm
            bg-white
            text-zinc-900
            placeholder:text-zinc-400
            focus:outline-none
            focus:ring-2
            focus:ring-zinc-900
            dark:bg-zinc-900
            dark:text-zinc-100
            dark:placeholder:text-zinc-400
          "
        />
        <button
          type="submit"
          className="
            rounded-xl
            bg-zinc-900
            text-white
            px-4
            text-sm
            hover:bg-zinc-800
            transition
          "
        >
          Buscar
        </button>
      </form>

      {/* LISTA */}
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
        <div className="rounded-xl bg-zinc-100 border p-4 text-sm text-center text-zinc-600">
          Nenhum resultado encontrado.
        </div>
      )}

      {/* 📄 PAGINAÇÃO */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center pt-2">
          {page > 1 ? (
            <Link
              href={`?q=${query}&page=${page - 1}&perPage=${perPage}`}
              className="text-sm text-zinc-700 hover:underline"
            >
              ← Anterior
            </Link>
          ) : (
            <span />
          )}

          <span className="text-xs text-zinc-500">
            Página {page} de {totalPages}
          </span>

          {page < totalPages && (
            <Link
              href={`?q=${query}&page=${page + 1}&perPage=${perPage}`}
              className="text-sm text-zinc-700 hover:underline"
            >
              Próxima →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
