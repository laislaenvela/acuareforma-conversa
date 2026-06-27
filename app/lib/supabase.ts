import { createClient } from "@supabase/supabase-js";
import type {
  ArticuloDB,
  CapituloDB,
  TemaDB,
  ArticuloTemaDB,
  ParticipanteDB,
  AporteDB,
} from "./types";

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

// ============================================================
// TEMAS
// ============================================================

/**
 * Obtiene todos los temas
 */
export async function fetchTemas(): Promise<TemaDB[]> {
  const { data, error } = await supabase
    .from("temas")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error("Error fetching temas:", error);
    throw error;
  }

  return data || [];
}

/**
 * Obtiene relación artículo-tema
 */
export async function fetchArticulosTemas(): Promise<ArticuloTemaDB[]> {
  const { data, error } = await supabase
    .from("articulos_temas")
    .select("articulo_id, tema_id");

  if (error) {
    console.error("Error fetching articulos_temas:", error);
    throw error;
  }

  return data || [];
}

// ============================================================
// PARTICIPANTES
// ============================================================

export async function fetchParticipanteByCorreo(
  correo: string
): Promise<ParticipanteDB | null> {
  const { data, error } = await supabase
    .from("participantes")
    .select("*")
    .eq("correo", correo)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching participante by correo ${correo}:`, error);
    throw error;
  }

  return data;
}

export async function createParticipante(
  participante: Omit<ParticipanteDB, "id" | "created_at" | "updated_at">
): Promise<ParticipanteDB> {
  const { data, error } = await supabase
    .from("participantes")
    .insert(participante)
    .select()
    .single();

  if (error) {
    console.error("Error creating participante:", error);
    throw error;
  }

  return data;
}

// ============================================================
// APORTES
// ============================================================

export async function createAporte(
  aporte: Omit<AporteDB, "id" | "created_at" | "updated_at">
): Promise<AporteDB> {
  const { data, error } = await supabase
    .from("aportes")
    .insert(aporte)
    .select()
    .single();

  if (error) {
    console.error("Error creating aporte:", error);
    throw error;
  }

  return data;
}

export async function fetchAportesByArticulo(
  articuloId: number
): Promise<AporteDB[]> {
  const { data, error } = await supabase
    .from("aportes")
    .select("*")
    .eq("articulo_id", articuloId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`Error fetching aportes for articulo ${articuloId}:`, error);
    throw error;
  }

  return data || [];
}
