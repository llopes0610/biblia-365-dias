import { notFound } from "next/navigation";

const BOOK_LABELS: Record<string, string> = {
  "confissao-westminster": "Confissão de Fé de Westminster",
  "catecismo-maior": "Catecismo Maior de Westminster",
  "breve-catecismo": "Breve Catecismo de Westminster",
};

export default async function ConfessionalBookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const title = BOOK_LABELS[slug];

  if (!title) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      {/* HEADER */}
      <header className="rounded-2xl bg-white p-5 border space-y-1">
        <h1 className="text-lg font-semibold text-zinc-900">
          {title}
        </h1>
        <p className="text-sm text-zinc-600">
          Conteúdo confessional reformado
        </p>
      </header>

      {/* AVISO */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
        Este conteúdo está sendo inserido capítulo por capítulo e será
        disponibilizado progressivamente, com fidelidade histórica e
        teológica.
      </div>
    </div>
  );
}
