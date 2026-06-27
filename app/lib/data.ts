import {
  articles as localArticles,
  chapters as localChapters,
} from "../data/proposal.mock";

import {
  fetchArticulos,
  fetchArticuloById,
  fetchArticulosByCapitulo,
  fetchCapitulos,
  fetchCapituloById,
} from "./supabase";

import type {
  Article,
  Chapter,
  ArticuloDB,
  CapituloDB,
} from "./types";

// ============================================================
// MAPPERS: BD → Modelo interno
// ============================================================

function transformArticulo(dbArticulo: ArticuloDB): Article {
  return {
    id: dbArticulo.id,
    numero: dbArticulo.numero,
    title: dbArticulo.titulo,
    chapterId: dbArticulo.capitulo_id,
    currentText: dbArticulo.texto_vigente,
    proposedText: dbArticulo.texto_propuesto,
    rationale: dbArticulo.justificacion,
    communityQuestion: dbArticulo.pregunta,
    status: dbArticulo.estado,
  };
}

function transformCapitulo(dbCapitulo: CapituloDB): Chapter {
  return {
    id: dbCapitulo.id,
    codigo: dbCapitulo.codigo,
    orden: dbCapitulo.orden,
    nombre_vigente: dbCapitulo.nombre_vigente,
    nombre_propuesto: dbCapitulo.nombre_propuesto,
    slug: dbCapitulo.slug,

    // Compatibilidad con el frontend existente
    number: dbCapitulo.codigo,
    title: dbCapitulo.nombre_propuesto,
    previousTitle: dbCapitulo.nombre_vigente,
    summary: "",

    articles: [],
  };
}

// ============================================================
// ARTÍCULOS
// ============================================================



export async function getArticles(): Promise<Article[]> {
  try {
    const dbArticulos = await fetchArticulos();
    return dbArticulos.map(transformArticulo);
  } catch (error) {
    console.warn(
      "Failed to fetch articulos from Supabase, using local data:",
      error
    );

    return localArticles;
  }
}

export async function getArticleById(
  id: number
): Promise<Article | null> {
  try {
    const dbArticulo = await fetchArticuloById(id);

    if (dbArticulo) {
      return transformArticulo(dbArticulo);
    }
  } catch (error) {
    console.warn(
      `Failed to fetch articulo ${id} from Supabase, using local data:`,
      error
    );
  }

  return localArticles.find((a) => a.id === id) || null;
}

export async function getArticlesByChapter(
  chapterId: number
): Promise<Article[]> {
  try {
    const dbArticulos = await fetchArticulosByCapitulo(chapterId);

    return dbArticulos.map(transformArticulo);
  } catch (error) {
    console.warn(
      `Failed to fetch articulos for capitulo ${chapterId}, using local data:`,
      error
    );
  }

  return localArticles.filter((a) => a.chapterId === chapterId);
}

// ============================================================
// CAPÍTULOS
// ============================================================

export async function getChapters(): Promise<Chapter[]> {
  try {
    const [dbCapitulos, dbArticulos] = await Promise.all([
      fetchCapitulos(),
      fetchArticulos(),
    ]);

    const articulos = dbArticulos.map(transformArticulo);

    return dbCapitulos.map((dbCapitulo) => {
      const chapter = transformCapitulo(dbCapitulo);

      chapter.articles = articulos
        .filter((articulo) => articulo.chapterId === chapter.id)
        .map((articulo) => ({
          id: articulo.id,
          title: articulo.title,
        }));

      return chapter;
    });
  } catch (error) {
    console.warn(
      "Failed to fetch capitulos from Supabase, using local data:",
      error
    );

    return localChapters;
  }
}

export async function getChapterById(
  id: number
): Promise<Chapter | null> {
  try {
    const dbCapitulo = await fetchCapituloById(id);

    if (!dbCapitulo) {
      return null;
    }

    const chapter = transformCapitulo(dbCapitulo);

    const articulos = await getArticlesByChapter(id);

    chapter.articles = articulos.map((articulo) => ({
      id: articulo.id,
      title: articulo.title,
    }));

    return chapter;
  } catch (error) {
    console.warn(
      `Failed to fetch capitulo ${id} from Supabase, using local data:`,
      error
    );
  }

  return localChapters.find((c) => c.id === id) || null;
}
