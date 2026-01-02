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
    id: "a1b2c3d4-e5f6-4890-abcd-ef1234567890",
    slug: "catecismo-maior",
    label: "Catecismo Maior de Westminster",
    description: "Exposição detalhada da doutrina cristã",
    icon: "📗",
  },
  "breve-catecismo": {
    id: "b2c3d4e5-f6a7-4901-bcde-f12345678901",
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