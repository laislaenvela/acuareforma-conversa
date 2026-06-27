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

function normalizeTipo(value: string): string {
  const map: Record<string, string> = {
    pregunta: "pregunta",
    Pregunta: "pregunta",
    observacion: "observacion",
    Observación: "observacion",
    Observacion: "observacion",
    riesgo_identificado: "riesgo_identificado",
    "Riesgo identificado": "riesgo_identificado",
    comentario_de_apoyo: "comentario_de_apoyo",
    "Comentario de apoyo": "comentario_de_apoyo",
  };

  return map[value] ?? value;
}

function normalizePosicion(value: string): string {
  const map: Record<string, string> = {
    de_acuerdo: "de_acuerdo",
    "De acuerdo": "de_acuerdo",
    parcialmente_de_acuerdo: "parcialmente_de_acuerdo",
    "Parcialmente de acuerdo": "parcialmente_de_acuerdo",
    en_desacuerdo: "en_desacuerdo",
    "En desacuerdo": "en_desacuerdo",
    necesito_mas_informacion: "necesito_mas_informacion",
    "Necesito más información": "necesito_mas_informacion",
  };

  return map[value] ?? value;
}

function logSupabaseError(context: string, error: {
  message?: string;
  code?: string;
  details?: string;
  hint?: string;
}): void {
  console.error(context, {
    message: error.message,
    code: error.code,
    details: error.details,
    hint: error.hint,
    error,
  });
}

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
    logSupabaseError("Error creating participante:", error);
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
  const normalizedAporte = {
    ...aporte,
    participante_id: Number(aporte.participante_id),
    articulo_id: Number(aporte.articulo_id),
    tipo: normalizeTipo(String(aporte.tipo)) as never,
    posicion: normalizePosicion(String(aporte.posicion)) as never,
    contenido: aporte.contenido ?? "",
    justificacion: aporte.justificacion ?? "",
    propuesta_redaccion: aporte.propuesta_redaccion ?? "",
  };

  const { data, error } = await supabase
    .from("aportes")
    .insert(normalizedAporte)
    .select()
    .maybeSingle();

  console.log("[DEBUG] Payload final createAporte", normalizedAporte);
  console.log("[DEBUG] Respuesta Supabase createAporte", {
    data,
    error,
    errorMessage: error?.message,
    errorCode: error?.code,
    errorDetails: error?.details,
    errorHint: error?.hint,
  });

  if (error) {
    logSupabaseError("Error creating aporte:", error);
    throw error;
  }

  if (!data) {
    // El INSERT puede ser exitoso aunque la respuesta no incluya fila retornada.
    return {
      id: 0,
      ...normalizedAporte,
    };
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
