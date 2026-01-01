import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["error"] });

async function run() {
  console.log("📖 Iniciando importação do plano...");

  const filePath = path.join(
    process.cwd(),
    "scripts",
    "data",
    "biblia-em-um-ano.xlsx"
  );

  if (!fs.existsSync(filePath)) {
    throw new Error("❌ Arquivo não encontrado em scripts/data/");
  }

  const buffer = fs.readFileSync(filePath);
  const workbook = XLSX.read(buffer, {
    type: "buffer",
    cellDates: true,
  });

  console.log("📋 Abas encontradas:", workbook.SheetNames);

  const sheet = workbook.Sheets["Plano"];
  if (!sheet) {
    throw new Error("❌ Aba 'Plano' não encontrada");
  }

  /**
   * A planilha tem:
   * Linha 1 → título
   * Linha 2 → cabeçalho
   * Linha 3+ → dados
   */
  const rows = XLSX.utils.sheet_to_json<any>(sheet, {
    range: 2, // ignora título + cabeçalho
    defval: "",
    raw: false,
  });

  console.log(`📊 Linhas de dados encontradas: ${rows.length}`);
  console.log("🔍 Exemplo da primeira linha válida:", rows[0]);

  let imported = 0;
  let skipped = 0;

  for (const row of rows) {
    /**
     * Cabeçalhos REAIS da planilha:
     * - Data
     * - Dia
     * - Capítulos lidos
     * - Leitura 1
     * - Leitura 2
     * - Leitura 3
     * - Leitura 4  (⚠️ com espaço no final)
     */

    const dateValue = row["Data"];
    if (!dateValue) {
      skipped++;
      continue;
    }

    // Converte data no formato brasileiro (ex: 1/1/26)
    let date: Date;
    if (dateValue instanceof Date) {
      date = dateValue;
    } else {
      const [d, m, y] = String(dateValue).split("/");
      date = new Date(Number(`20${y}`), Number(m) - 1, Number(d));
    }

    if (isNaN(date.getTime())) {
      skipped++;
      continue;
    }

    const dayLabel = String(row["Dia"]);
    const chapters = Number(row["Capítulos lidos"]) || 0;

    const readings = [
      row["Leitura 1"],
      row["Leitura 2"],
      row["Leitura 3"],
      row["Leitura 4 "], // ⚠️ espaço no final vem da planilha
    ].filter(Boolean);

    const planDay = await prisma.readingPlanDay.upsert({
      where: { date },
      update: {},
      create: {
        date,
        dayLabel,
        chapters,
      },
    });

    for (let i = 0; i < readings.length; i++) {
      await prisma.readingItem.create({
        data: {
          order: i + 1,
          reference: String(readings[i]),
          planDayId: planDay.id,
        },
      });
    }

    imported++;
    if (imported % 50 === 0) {
      console.log(`✨ Importados ${imported} dias...`);
    }
  }

  console.log("\n✅ IMPORTAÇÃO FINALIZADA COM SUCESSO");
  console.log(`📈 Importados: ${imported}`);
  console.log(`⚠️ Ignorados: ${skipped}`);

  await prisma.$disconnect();
  process.exit(0);
}

run().catch(async (err) => {
  console.error("❌ Erro fatal:", err);
  await prisma.$disconnect();
  process.exit(1);
});
