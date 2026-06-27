import {
  fetchArticulos,
  fetchArticuloById,
  fetchArticulosByCapitulo,
  fetchCapitulos,
  fetchCapituloById,
  fetchTemas,
  fetchArticulosTemas,
  fetchParticipanteByCorreo,
  createParticipante,
  createAporte,
  fetchAportesByArticulo,
} from "./supabase";

import type {
  Article,
  Chapter,
  Theme,
  ArticuloDB,
  CapituloDB,
  TemaDB,
  ParticipanteDB,
  AporteDB,
  ParticipantRecord,
  ContributionRecord,
  NewParticipantRecord,
  NewContributionRecord,
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

function transformParticipante(dbParticipante: ParticipanteDB): ParticipantRecord {
  return {
    id: dbParticipante.id,
    name: dbParticipante.nombre,
    email: dbParticipante.correo,
    userCode: dbParticipante.codigo_usuario,
    createdAt: dbParticipante.created_at,
    updatedAt: dbParticipante.updated_at,
  };
}

function transformAporte(dbAporte: AporteDB): ContributionRecord {
  return {
    id: dbAporte.id,
    participantId: dbAporte.participante_id,
    articleId: dbAporte.articulo_id,
    type: dbAporte.tipo,
    position: dbAporte.posicion,
    content: dbAporte.contenido,
    justification: dbAporte.justificacion,
    proposedText: dbAporte.propuesta_redaccion,
    anonymous: dbAporte.anonimo,
    createdAt: dbAporte.created_at,
    updatedAt: dbAporte.updated_at,
  };
}

function normalizeAporteTipo(value: string): string {
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

function normalizeAportePosicion(value: string): string {
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

// ============================================================
// PARTICIPANTES
// ============================================================

export async function getParticipantByEmail(
  email: string
): Promise<ParticipantRecord | null> {
  const dbParticipante = await fetchParticipanteByCorreo(email);

  if (!dbParticipante) {
    return null;
  }

  return transformParticipante(dbParticipante);
}

export async function saveParticipantRecord(
  participant: NewParticipantRecord
): Promise<ParticipantRecord> {
  const dbParticipante = await createParticipante({
    nombre: participant.name,
    correo: participant.email,
    codigo_usuario: participant.userCode,
  });

  return transformParticipante(dbParticipante);
}

// ============================================================
// APORTES
// ============================================================

export async function saveContributionRecord(
  contribution: NewContributionRecord
): Promise<ContributionRecord> {
  const normalizedTipo = normalizeAporteTipo(String(contribution.type));
  const normalizedPosicion = normalizeAportePosicion(String(contribution.position));

  const aportePayload = {
    participante_id: contribution.participantId,
    articulo_id: contribution.articleId,
    tipo: normalizedTipo as never,
    posicion: normalizedPosicion as never,
    contenido: contribution.content,
    justificacion: contribution.justification,
    propuesta_redaccion: contribution.proposedText,
    anonimo: contribution.anonymous,
  };

  console.log("[DEBUG] Payload antes de createAporte", aportePayload);

  const dbAporte = await createAporte(aportePayload);

  return transformAporte(dbAporte);
}

export async function registrarAporte({
  participant,
  contribution,
}: {
  participant: NewParticipantRecord;
  contribution: Omit<NewContributionRecord, "participantId">;
}): Promise<{
  participant: ParticipantRecord;
  contribution: ContributionRecord;
}> {
  console.log("[DEBUG] Inicio registrarAporte", {
    participant,
    contribution,
  });

  const existingParticipant = await getParticipantByEmail(participant.email);

  const resolvedParticipant = existingParticipant ??
    await saveParticipantRecord(participant);

  const savedContribution = await saveContributionRecord({
    ...contribution,
    participantId: resolvedParticipant.id,
  });

  return {
    participant: resolvedParticipant,
    contribution: savedContribution,
  };
}

export async function getContributionsByArticle(
  articleId: number
): Promise<ContributionRecord[]> {
  const dbAportes = await fetchAportesByArticulo(articleId);
  return dbAportes.map(transformAporte);
}
