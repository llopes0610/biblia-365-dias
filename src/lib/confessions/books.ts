// lib/confessions/books.ts
// Configuração centralizada dos livros confessionais

export interface ConfessionalBook {
  id: string;
  slug: string;
  label: string;
  description: string;
  icon: string;
}

export const CONFESSIONAL_BOOKS: Record<string, ConfessionalBook> = {
  "confissao-westminster": {
    id: "f5187db8-06c2-4ccd-b5e4-25b770609c88",
    slug: "confissao-westminster",
    label: "Confissão de Fé de Westminster",
    description: "Síntese doutrinária da fé reformada",
    icon: "📘",
  },
  "catecismo-maior": {
    id: "fdfa5a38-75fe-4706-9c62-e6331660b3b7",
    slug: "catecismo-maior",
    label: "Catecismo Maior de Westminster",
    description: "Exposição detalhada da doutrina cristã",
    icon: "📗",
  },
  "breve-catecismo": {
    id: "d327827f-ffea-4e6d-b098-8a7a667263dd",
    slug: "breve-catecismo",
    label: "Breve Catecismo de Westminster",
    description: "Fundamentos da fé cristã em perguntas e respostas",
    icon: "📙",
  },
};

export function getBookBySlug(slug: string): ConfessionalBook | null {
  return CONFESSIONAL_BOOKS[slug] || null;
}

export function getAllBooks(): ConfessionalBook[] {
  return Object.values(CONFESSIONAL_BOOKS);
}