import {
  fetchArticulos,
  fetchArticuloById,
  fetchArticulosByCapitulo,
  fetchCapitulos,
  fetchCapituloById,
  fetchTemas,
  fetchArticulosTemas,
} from "./supabase";

import type {
  Article,
  Chapter,
  Theme,
  ArticuloDB,
  CapituloDB,
  TemaDB,
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

function transformTema(dbTema: TemaDB): Theme {
  return {
    id: dbTema.id,
    title: dbTema.nombre,
    slug: dbTema.slug,
    articles: [],
  };
}

// ============================================================
// ARTÍCULOS
// ============================================================



export async function getArticles(): Promise<Article[]> {
  const dbArticulos = await fetchArticulos();
  return dbArticulos.map(transformArticulo);
}

export async function getArticleById(
  id: number
): Promise<Article | null> {
  const dbArticulo = await fetchArticuloById(id);

  if (!dbArticulo) {
    return null;
  }

  return transformArticulo(dbArticulo);
}

export async function getArticlesByChapter(
  chapterId: number
): Promise<Article[]> {
  const dbArticulos = await fetchArticulosByCapitulo(chapterId);

  return dbArticulos.map(transformArticulo);
}

// ============================================================
// CAPÍTULOS
// ============================================================

export async function getChapters(): Promise<Chapter[]> {
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
}

export async function getChapterById(
  id: number
): Promise<Chapter | null> {
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
}

// ============================================================
// TEMAS
// ============================================================

export async function getThemes(): Promise<Theme[]> {
  const [dbTemas, dbArticulosTemas] = await Promise.all([
    fetchTemas(),
    fetchArticulosTemas(),
  ]);

  return dbTemas.map((dbTema) => {
    const theme = transformTema(dbTema);

    theme.articles = dbArticulosTemas
      .filter((articuloTema) => articuloTema.tema_id === dbTema.id)
      .map((articuloTema) => articuloTema.articulo_id);

    return theme;
  });
}
