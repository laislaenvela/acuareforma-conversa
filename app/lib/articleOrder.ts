// ============================================================
// ORDEN NATURAL DE ARTÍCULOS (por número editorial/jurídico)
// ============================================================
// El campo `numero` puede incluir variantes alfanuméricas como
// "16A", "16B", etc. Esta función separa la parte numérica de la
// alfabética para ordenar de forma natural:
// 14, 15, 16, 16A, 16B, 17, ... 28, 29, 30, 31, 32, ... 49, 50

type WithNumero = { numero: string | number };

function parseNumero(numero: string | number): { value: number; suffix: string } {
  const text = String(numero).trim();
  const match = text.match(/^(\d+)(.*)$/);

  if (!match) {
    // Si no hay parte numérica reconocible, se envía al final de forma estable.
    return { value: Number.POSITIVE_INFINITY, suffix: text.toUpperCase() };
  }

  const [, digits, suffix] = match;
  return { value: parseInt(digits, 10), suffix: suffix.trim().toUpperCase() };
}

/**
 * Compara dos números de artículo en orden natural (14 < 15 < 16 < 16A < 17...).
 */
export function compareArticleNumero(
  a: string | number,
  b: string | number
): number {
  const parsedA = parseNumero(a);
  const parsedB = parseNumero(b);

  if (parsedA.value !== parsedB.value) {
    return parsedA.value - parsedB.value;
  }

  return parsedA.suffix.localeCompare(parsedB.suffix);
}

/**
 * Ordena de forma natural (no destructiva) una lista de artículos por `numero`.
 */
export function sortByArticleNumero<T extends WithNumero>(items: T[]): T[] {
  return [...items].sort((a, b) => compareArticleNumero(a.numero, b.numero));
}
