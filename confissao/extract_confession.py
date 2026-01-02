import pdfplumber
import re
import json
from pathlib import Path

PDF_PATH = "confissao_westminster.pdf"
OUTPUT_PATH = Path("output/confissao.json")

def normalize(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip()

def extract_text_from_pdf(pdf_path):
    full_text = ""
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += "\n" + text
    return full_text

def parse_confession(text: str):
    chapters = []

    # Regex para detectar capítulos (Capítulo I, Capítulo II, etc.)
    chapter_pattern = re.compile(
        r"(CAP[IÍ]TULO\s+[IVXLCDM]+)\s+(.+?)(?=CAP[IÍ]TULO\s+[IVXLCDM]+|$)",
        re.IGNORECASE | re.DOTALL
    )

    chapter_matches = chapter_pattern.findall(text)

    for idx, (chapter_title, chapter_body) in enumerate(chapter_matches, start=1):
        chapter = {
            "id": f"cfw_{idx:02d}",
            "number": idx,
            "title": normalize(chapter_title.title()),
            "sections": []
        }

        # Regex para seções (1., 2., etc.)
        section_pattern = re.compile(
            r"(\d+)\.\s+(.*?)(?=\n\d+\.|\Z)",
            re.DOTALL
        )

        sections = section_pattern.findall(chapter_body)

        for sec_number, sec_text in sections:
            chapter["sections"].append({
                "number": int(sec_number),
                "text": normalize(sec_text)
            })

        chapters.append(chapter)

    return chapters

def main():
    print("📄 Lendo PDF...")
    text = extract_text_from_pdf(PDF_PATH)

    print("📚 Processando capítulos...")
    confession = parse_confession(text)

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(confession, f, ensure_ascii=False, indent=2)

    print(f"✅ Extração concluída! Arquivo gerado em: {OUTPUT_PATH}")
    print(f"📊 Total de capítulos: {len(confession)}")

if __name__ == "__main__":
    main()
