import fs from "fs/promises";
import path from "path";
import Link from "next/link";

type Section = {
  number: number;
  text: string;
};

type Chapter = {
  id: string;
  number: number;
  title: string;
  sections: Section[];
};

async function getConfissao(): Promise<Chapter[]> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "data",
    "confissao_westminster.json"
  );
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export default async function ConfissaoChapter({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chapters = await getConfissao();

  const chapterNumber = Number(id);
  const chapterIndex = chapters.findIndex(
    (c) => c.number === chapterNumber
  );

  const chapter = chapters[chapterIndex];
  if (!chapter) {
    return <div>Capítulo não encontrado</div>;
  }

  const prev = chapters[chapterIndex - 1];
  const next = chapters[chapterIndex + 1];

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      {/* CARD PRINCIPAL */}
      <div className="rounded-2xl bg-white p-5 shadow-sm border space-y-4">
        <header className="space-y-1">
          <p className="text-xs text-zinc-500">
            Capítulo {chapter.number}
          </p>
          <h1 className="text-lg font-semibold text-zinc-900">
            {chapter.title}
          </h1>
        </header>

        {/* 📜 PAPEL VELHO (MIÓLO) */}
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-5 space-y-5">
          {chapter.sections.map((section) => (
            <section key={section.number}>
              <p className="text-xs font-semibold text-zinc-700 mb-1">
                § {section.number}
              </p>
              <p className="whitespace-pre-line text-zinc-800 text-sm leading-relaxed">
                {section.text}
              </p>
            </section>
          ))}
        </div>

        {/* ⬅️➡️ NAVEGAÇÃO ENTRE CAPÍTULOS */}
        <div className="flex justify-between pt-2">
          {prev ? (
            <Link
              href={`/app/confissao/${prev.number}`}
              className="text-sm text-emerald-700 font-medium"
            >
              ← Cap. {prev.number}
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/app/confissao/${next.number}`}
              className="text-sm text-emerald-700 font-medium"
            >
              Cap. {next.number} →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
