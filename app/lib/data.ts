import { articles as localArticles, chapters as localChapters } from "../data/proposal";
import {
  fetchArticles,
  fetchArticleById,
  fetchArticlesByChapter,
  ArticleDB,
} from "./supabase";

export interface Article {
  id: number;
  title: string;
  chapterId: number;
  currentText: string;
  proposedText: string;
  rationale: string;
  communityQuestion: string;
}

// Transform Supabase article to local format
function transformArticle(dbArticle: ArticleDB): Article {
  return {
    id: dbArticle.id,
    title: dbArticle.title,
    chapterId: dbArticle.chapter_id,
    currentText: dbArticle.current_text,
    proposedText: dbArticle.proposed_text,
    rationale: dbArticle.rationale,
    communityQuestion: dbArticle.community_question,
  };
}

// Get all articles (tries Supabase first, falls back to local data)
export async function getArticles(): Promise<Article[]> {
  try {
    const dbArticles = await fetchArticles();
    return dbArticles.map(transformArticle);
  } catch (error) {
    console.warn("Failed to fetch from Supabase, using local data:", error);
    return localArticles;
  }
}

// Get article by ID (tries Supabase first, falls back to local data)
export async function getArticleById(id: number): Promise<Article | null> {
  try {
    const dbArticle = await fetchArticleById(id);
    if (dbArticle) {
      return transformArticle(dbArticle);
    }
  } catch (error) {
    console.warn(
      `Failed to fetch article ${id} from Supabase, using local data:`,
      error
    );
  }

  return localArticles.find((a) => a.id === id) || null;
}

// Get articles by chapter (tries Supabase first, falls back to local data)
export async function getArticlesByChapter(
  chapterId: number
): Promise<Article[]> {
  try {
    const dbArticles = await fetchArticlesByChapter(chapterId);
    return dbArticles.map(transformArticle);
  } catch (error) {
    console.warn(
      `Failed to fetch articles for chapter ${chapterId} from Supabase, using local data:`,
      error
    );
  }

  return localArticles.filter((a) => a.chapterId === chapterId);
}

// Get chapters (these remain as local data for now)
export function getChapters() {
  return localChapters;
}
