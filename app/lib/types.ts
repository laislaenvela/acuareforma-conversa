// ============================================================
// INTERFAZ INTERNA (normalizada para la aplicación)
// ============================================================
export type Article = {
  id: number;
  title: string;
  chapterId: number;
  numero: number;
  currentText: string;
  proposedText: string;
  rationale: string;
  communityQuestion: string;
  status: string;
};

export type Chapter = {
  id: number;
  codigo: string;
  orden: number;
  nombre_vigente: string;
  nombre_propuesto: string;
  slug: string;
  // Propiedades derivadas para compatibilidad con plantillas
  number: string; // Ej: "I", "II", etc.
  title: string; // nombre_propuesto
  summary?: string;
  previousTitle?: string;
  articles?: { id: number; title: string }[];
};

export type Theme = {
  id: number;
  title: string;
  slug: string;
  articles: number[];
};


// ============================================================
// INTERFACES DE BASE DE DATOS (directas de Supabase)
// ============================================================
export interface ArticuloDB {
  id: number;
  capitulo_id: number;
  numero: number;
  titulo: string;
  texto_vigente: string;
  texto_propuesto: string;
  discusion?: string;
  justificacion: string;
  pregunta: string;
  estado: string;
  created_at?: string;
  updated_at?: string;
}

export interface CapituloDB {
  id: number;
  codigo: string;
  orden: number;
  nombre_vigente: string;
  nombre_propuesto: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface TemaDB {
  id: number;
  nombre: string;
  slug: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticuloTemaDB {
  articulo_id: number;
  tema_id: number;
}

export type Participant = {
  fullName: string;
  userNumber: string;
  email: string;
};

export type Contribution = {
  articleId: number;
  articleTitle: string;
  participantName: string | undefined;
  participantUser: string | undefined;
  position: ContributionPosition;
  contributionType: ContributionType;
  comment: string;
  justification: string;
  alternativeText: string;
  createdAt: string;
};

export type ContributionPosition =
  | "De acuerdo"
  | "Parcialmente de acuerdo"
  | "En desacuerdo"
  | "Necesito más información";

export type ContributionType =
  | "Pregunta"
  | "Observación"
  | "Riesgo identificado"
  | "Comentario de apoyo";

export const POSITION_OPTIONS: ContributionPosition[] = [
  "De acuerdo",
  "Parcialmente de acuerdo",
  "En desacuerdo",
  "Necesito más información",
];

export const CONTRIBUTION_TYPE_OPTIONS: ContributionType[] = [
  "Pregunta",
  "Observación",
  "Riesgo identificado",
  "Comentario de apoyo",
];
