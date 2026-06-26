import { createClient } from "@supabase/supabase-js";
import type { ArticuloDB, CapituloDB } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ============================================================
// ARTICULOS
// ============================================================

/**
 * Obtiene todos los artículos ordenados por ID
 */
export async function fetchArticulos(): Promise<ArticuloDB[]> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching articulos:", error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un artículo específico por ID
 */
export async function fetchArticuloById(id: number): Promise<ArticuloDB | null> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching articulo ${id}:`, error);
    return null;
  }

  return data;
}

/**
 * Obtiene todos los artículos de un capítulo específico
 */
export async function fetchArticulosByCapitulo(
  capituloId: number
): Promise<ArticuloDB[]> {
  const { data, error } = await supabase
    .from("articulos")
    .select("*")
    .eq("capitulo_id", capituloId)
    .order("id", { ascending: true });

  if (error) {
    console.error(
      `Error fetching articulos for capitulo ${capituloId}:`,
      error
    );
    return [];
  }

  return data || [];
}

// ============================================================
// CAPITULOS
// ============================================================

/**
 * Obtiene todos los capítulos ordenados por orden
 */
export async function fetchCapitulos(): Promise<CapituloDB[]> {
  const { data, error } = await supabase
    .from("capitulos")
    .select("*")
    .order("orden", { ascending: true });

  if (error) {
    console.error("Error fetching capitulos:", error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene un capítulo específico por ID
 */
export async function fetchCapituloById(id: number): Promise<CapituloDB | null> {
  const { data, error } = await supabase
    .from("capitulos")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching capitulo ${id}:`, error);
    return null;
  }

  return data;
}
