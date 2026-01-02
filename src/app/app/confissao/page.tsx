import fs from "fs/promises";
import path from "path";
import Link from "next/link";

type Chapter = {
  id: string;
  number: number;
  title: string;
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

export default async function ConfissaoIndex() {
  const chapters = await getConfissao();

  return (
    <div className="mx-auto w-full max-w-md space-y-4">
      <header className="rounded-2xl bg-white p-5 shadow-sm border">
        <h1 className="text-lg font-semibold text-zinc-900">
          Confissão de Fé de Westminster
        </h1>
        <p className="text-sm text-zinc-600">
          Documento confessional reformado
        </p>
      </header>

      {chapters.map((chapter) => (
        <Link
          key={chapter.id}
          href={`/app/confissao/${chapter.number}`}
          className="block rounded-2xl bg-white p-4 shadow-sm border space-y-1 hover:bg-zinc-50 transition"
        >
          <p className="text-xs text-zinc-500">
            Capítulo {chapter.number}
          </p>
          <p className="font-medium text-zinc-900">
            {chapter.title}
          </p>
        </Link>
      ))}
    </div>
  );
}
