import { articles as localArticles, chapters as localChapters } from "../data/proposal.mock";
import {
  fetchArticulos,
  fetchArticuloById,
  fetchArticulosByCapitulo,
  fetchCapitulos,
  fetchCapituloById,
} from "./supabase";
import type { Article, Chapter, ArticuloDB, CapituloDB } from "./types";

// ============================================================
// MAPPERS: BD → Interfaz Interna
// ============================================================

/**
 * Transforma un artículo de BD a formato interno
 * BD: articulos → Interfaz interna: Article
 */
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

/**
 * Transforma un capítulo de BD a formato interno
 * BD: capitulos → Interfaz interna: Chapter
 */
function transformCapitulo(dbCapitulo: CapituloDB): Chapter {
  return {
    id: dbCapitulo.id,
    codigo: dbCapitulo.codigo,
    orden: dbCapitulo.orden,
    nombre_vigente: dbCapitulo.nombre_vigente,
    nombre_propuesto: dbCapitulo.nombre_propuesto,
    slug: dbCapitulo.slug,
    // Propiedades derivadas para plantillas
    number: dbCapitulo.codigo, // Ej: "I", "II"
    title: dbCapitulo.nombre_propuesto,
    summary: "", // Se cargaría de otra fuente si es necesario
    previousTitle: dbCapitulo.nombre_vigente,
  };
}

// ============================================================
// FUNCIONES PÚBLICAS: GET
// ============================================================

/**
 * Obtiene todos los artículos
 * Intenta Supabase primero, fallback a proposal.mock
 */
export async function getArticles(): Promise<Article[]> {
  try {
    const dbArticulos = await fetchArticulos();
    return dbArticulos.map(transformArticulo);
  } catch (error) {
    console.warn("Failed to fetch articulos from Supabase, using local data:", error);
    return localArticles;
  }
}

/**
 * Obtiene un artículo específico por ID
 * Intenta Supabase primero, fallback a proposal.mock
 */
export async function getArticleById(id: number): Promise<Article | null> {
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

/**
 * Obtiene artículos de un capítulo específico
 * Intenta Supabase primero, fallback a proposal.mock
 */
export async function getArticlesByChapter(
  chapterId: number
): Promise<Article[]> {
  try {
    const dbArticulos = await fetchArticulosByCapitulo(chapterId);
    return dbArticulos.map(transformArticulo);
  } catch (error) {
    console.warn(
      `Failed to fetch articulos for capitulo ${chapterId} from Supabase, using local data:`,
      error
    );
  }

  return localArticles.filter((a) => a.chapterId === chapterId);
}

/**
 * Obtiene todos los capítulos
 * Intenta Supabase primero, fallback a proposal.mock
 */
export async function getChapters(): Promise<Chapter[]> {
  try {
    const dbCapitulos = await fetchCapitulos();
    return dbCapitulos.map(transformCapitulo);
  } catch (error) {
    console.warn("Failed to fetch capitulos from Supabase, using local data:", error);
    return localChapters;
  }
}

/**
 * Obtiene un capítulo específico por ID
 * Intenta Supabase primero, fallback a proposal.mock
 */
export async function getChapterById(id: number): Promise<Chapter | null> {
  try {
    const dbCapitulo = await fetchCapituloById(id);
    if (dbCapitulo) {
      return transformCapitulo(dbCapitulo);
    }
  } catch (error) {
    console.warn(
      `Failed to fetch capitulo ${id} from Supabase, using local data:`,
      error
    );
  }

  return localChapters.find((c) => c.id === id) || null;
}
