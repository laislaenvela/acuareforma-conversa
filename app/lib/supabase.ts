import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Type for articles from Supabase
export interface ArticleDB {
  id: number;
  title: string;
  chapter_id: number;
  current_text: string;
  proposed_text: string;
  rationale: string;
  community_question: string;
  created_at?: string;
  updated_at?: string;
}

// Function to fetch all articles from Supabase
export async function fetchArticles(): Promise<ArticleDB[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }

  return data || [];
}

// Function to fetch a single article by ID
export async function fetchArticleById(id: number): Promise<ArticleDB | null> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching article ${id}:`, error);
    return null;
  }

  return data;
}

// Function to fetch articles by chapter ID
export async function fetchArticlesByChapter(
  chapterId: number
): Promise<ArticleDB[]> {
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("chapter_id", chapterId)
    .order("id", { ascending: true });

  if (error) {
    console.error(
      `Error fetching articles for chapter ${chapterId}:`,
      error
    );
    return [];
  }

  return data || [];
}
