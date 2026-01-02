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
      {/* HEADER */}
      <header className="rounded-2xl bg-white p-5 shadow-sm border space-y-1">
        <h1 className="text-lg font-semibold text-zinc-900">
          Confissão de Fé de Westminster
        </h1>
        <p className="text-sm text-zinc-600">
          Documento confessional reformado
        </p>
      </header>

      {/* AVISO DE REVISÃO */}
      <div className="rounded-xl bg-amber-50 border border-amber-100 px-4 py-3 text-sm text-amber-800">
        <p className="leading-relaxed">
          Esta seção encontra-se em processo de{" "}
          <strong>revisão e organização</strong>, visando preservar a
          fidelidade histórica e doutrinária da Confissão de Fé de
          Westminster.
        </p>

        <p className="mt-2 leading-relaxed">
          Em breve, todo o conteúdo será disponibilizado de forma
          completa, revisada e cuidadosamente apresentada para a
          edificação da igreja.
        </p>
      </div>

      {/* LISTA DE CAPÍTULOS */}
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
