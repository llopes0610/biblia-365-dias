import { notFound } from "next/navigation";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getBookBySlug } from "@/lib/confessions/books";

export default async function ConfessionalChapterPage({
  params,
}: {
  params: Promise<{ bookSlug: string; chapterNumber: string }>;
}) {
  const { bookSlug, chapterNumber } = await params;

  const book = getBookBySlug(bookSlug);
  if (!book) notFound();

  const supabase = await createSupabaseServerClient();

  // Buscar capítulo atual
  const { data: chapter, error: chapterError } = await supabase
    .from("confessional_chapters")
    .select("id, number, title, summary")
    .eq("book_id", book.id)
    .eq("number", chapterNumber)
    .single();

  if (chapterError || !chapter) notFound();

  // Buscar seções do capítulo
  const { data: sections } = await supabase
    .from("confessional_sections")
    .select("id, number, content")
    .eq("chapter_id", chapter.id)
    .order("number", { ascending: true });

  // Buscar capítulos adjacentes
  const { data: adjacentChapters } = await supabase
    .from("confessional_chapters")
    .select("number, title")
    .eq("book_id", book.id)
    .order("order_index", { ascending: true });

  // Encontrar capítulos anterior e próximo
  let prevChapter = null;
  let nextChapter = null;

  if (adjacentChapters) {
    const currentIndex = adjacentChapters.findIndex(
      (c) => String(c.number) === String(chapterNumber)
    );

    if (currentIndex > 0) {
      prevChapter = adjacentChapters[currentIndex - 1];
    }

    if (currentIndex < adjacentChapters.length - 1) {
      nextChapter = adjacentChapters[currentIndex + 1];
    }
  }

  const hasSections = sections && sections.length > 0;

  return (
    <div className="min-h-screen bg-zinc-50 pb-24">
      <div className="mx-auto max-w-2xl">
        {/* HEADER FIXO */}
        <div className="sticky top-0 z-10 bg-white border-b shadow-sm">
          <div className="px-4 py-3">
            <Link
              href={`/app/confissao/${bookSlug}`}
              className="inline-flex items-center text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {book.label}
            </Link>
            <h1 className="mt-1 text-base font-bold text-zinc-900">
              Capítulo {chapter.number}: {chapter.title}
            </h1>
          </div>
        </div>

        {/* CONTEÚDO */}
        <div className="px-4 py-6 space-y-6">
          {/* RESUMO */}
          {chapter.summary && (
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
              <p className="text-xs font-semibold text-amber-900 uppercase tracking-wide mb-2">
                Resumo
              </p>
              <p className="text-sm text-amber-800 leading-relaxed">
                {chapter.summary}
              </p>
            </div>
          )}

          {/* SEÇÕES - LEITURA */}
          <div className="rounded-2xl bg-[#fdf6e3] border border-amber-200 shadow-sm overflow-hidden">
            <div className="p-6 space-y-6">
              {hasSections ? (
                sections.map((section, index) => (
                  <div key={section.id} className="space-y-3">
                    {/* Número da seção */}
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-amber-900 text-white text-xs font-bold flex items-center justify-center">
                        {section.number}
                      </div>
                      <div className="flex-1 h-px bg-amber-200"></div>
                    </div>

                    {/* Conteúdo da seção */}
                    <p className="text-[15px] leading-[1.75] text-zinc-800 font-serif">
                      {section.content}
                    </p>

                    {/* Divisor entre seções (exceto última) */}
                    {index < sections.length - 1 && (
                      <div className="pt-3 border-b border-amber-200/50"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-100 mb-3">
                    <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <p className="text-sm text-zinc-600 italic">
                    Conteúdo em inserção
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Em breve este capítulo estará completo
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* NAVEGAÇÃO ENTRE CAPÍTULOS */}
          <div className="space-y-3">
            {/* Capítulo Anterior */}
            {prevChapter && (
              <Link
                href={`/app/confissao/${bookSlug}/${prevChapter.number}`}
                className="block rounded-xl bg-white border-2 border-zinc-200 p-4 hover:border-blue-400 hover:bg-blue-50/50 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-zinc-500 font-medium">Capítulo Anterior</p>
                    <p className="text-sm font-semibold text-zinc-900 truncate">
                      {prevChapter.number}. {prevChapter.title}
                    </p>
                  </div>
                </div>
              </Link>
            )}

            {/* Capítulo Próximo */}
            {nextChapter && (
              <Link
                href={`/app/confissao/${bookSlug}/${nextChapter.number}`}
                className="block rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 border-2 border-blue-600 p-4 hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-blue-100 font-medium">Próximo Capítulo</p>
                    <p className="text-sm font-semibold text-white truncate">
                      {nextChapter.number}. {nextChapter.title}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            )}

            {/* Botão voltar para lista */}
            <Link
              href={`/app/confissao/${bookSlug}`}
              className="block text-center rounded-xl bg-zinc-100 border border-zinc-200 p-3 text-sm text-zinc-700 hover:bg-zinc-200 transition"
            >
              Ver todos os capítulos
            </Link>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}