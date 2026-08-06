import {
  supabase,
  isSupabaseConfigured,
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

import { articles as mockArticles, chapters as mockChapters, themes as mockThemes } from "../data/proposal.mock";

import type {
  Article,
  Chapter,
  Theme,
  Contribution,
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
    riesgo_identificado: "riesgo",
    "Riesgo identificado": "riesgo",
    riesgo: "riesgo",
    comentario_de_apoyo: "apoyo",
    "Comentario de apoyo": "apoyo",
    apoyo: "apoyo",
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

function denormalizeAporteTipo(value: string): string {
  const map: Record<string, string> = {
    pregunta: "Pregunta",
    Pregunta: "Pregunta",
    observacion: "Observación",
    Observacion: "Observación",
    "Observación": "Observación",
    riesgo_identificado: "Riesgo identificado",
    "Riesgo identificado": "Riesgo identificado",
    riesgo: "Riesgo identificado",
    comentario_de_apoyo: "Comentario de apoyo",
    "Comentario de apoyo": "Comentario de apoyo",
    apoyo: "Comentario de apoyo",
  };

  return map[value] ?? value;
}

function denormalizeAportePosicion(value: string): string {
  const map: Record<string, string> = {
    de_acuerdo: "De acuerdo",
    "De acuerdo": "De acuerdo",
    parcialmente_de_acuerdo: "Parcialmente de acuerdo",
    "Parcialmente de acuerdo": "Parcialmente de acuerdo",
    en_desacuerdo: "En desacuerdo",
    "En desacuerdo": "En desacuerdo",
    necesito_mas_informacion: "Necesito más información",
    "Necesito más información": "Necesito más información",
  };

  return map[value] ?? value;
}

// ============================================================
// ARTÍCULOS
// ============================================================



export async function getArticles(): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return mockArticles.map((article) => ({
      id: article.id,
      title: article.title,
      chapterId: article.chapterId,
      numero: article.numero,
      currentText: article.currentText,
      proposedText: article.proposedText,
      rationale: article.rationale,
      communityQuestion: article.communityQuestion,
      status: article.status,
    }));
  }

  const dbArticulos = await fetchArticulos();
  return dbArticulos.map(transformArticulo);
}

export async function getArticleById(
  id: number
): Promise<Article | null> {
  if (!isSupabaseConfigured()) {
    const mockArticle = mockArticles.find((article) => article.id === id);

    if (!mockArticle) {
      return null;
    }

    return {
      id: mockArticle.id,
      title: mockArticle.title,
      chapterId: mockArticle.chapterId,
      numero: mockArticle.numero,
      currentText: mockArticle.currentText,
      proposedText: mockArticle.proposedText,
      rationale: mockArticle.rationale,
      communityQuestion: mockArticle.communityQuestion,
      status: mockArticle.status,
    };
  }

  const dbArticulo = await fetchArticuloById(id);

  if (!dbArticulo) {
    return null;
  }

  return transformArticulo(dbArticulo);
}

export async function getArticlesByChapter(
  chapterId: number
): Promise<Article[]> {
  if (!isSupabaseConfigured()) {
    return mockArticles
      .filter((article) => article.chapterId === chapterId)
      .map((article) => ({
        id: article.id,
        title: article.title,
        chapterId: article.chapterId,
        numero: article.numero,
        currentText: article.currentText,
        proposedText: article.proposedText,
        rationale: article.rationale,
        communityQuestion: article.communityQuestion,
        status: article.status,
      }));
  }

  const dbArticulos = await fetchArticulosByCapitulo(chapterId);

  return dbArticulos.map(transformArticulo);
}

// ============================================================
// CAPÍTULOS
// ============================================================

export async function getChapters(): Promise<Chapter[]> {
  if (!isSupabaseConfigured()) {
    return mockChapters.map((chapter) => ({
      id: chapter.id,
      codigo: chapter.codigo,
      orden: chapter.orden,
      nombre_vigente: chapter.nombre_vigente,
      nombre_propuesto: chapter.nombre_propuesto,
      slug: chapter.slug,
      number: chapter.number,
      title: chapter.title,
      previousTitle: chapter.previousTitle,
      summary: chapter.summary,
      articles: chapter.articles ?? [],
    }));
  }

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
  if (!isSupabaseConfigured()) {
    const mockChapter = mockChapters.find((chapter) => chapter.id === id);

    if (!mockChapter) {
      return null;
    }

    return {
      id: mockChapter.id,
      codigo: mockChapter.codigo,
      orden: mockChapter.orden,
      nombre_vigente: mockChapter.nombre_vigente,
      nombre_propuesto: mockChapter.nombre_propuesto,
      slug: mockChapter.slug,
      number: mockChapter.number,
      title: mockChapter.title,
      previousTitle: mockChapter.previousTitle,
      summary: mockChapter.summary,
      articles: mockChapter.articles ?? [],
    };
  }

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
  if (!isSupabaseConfigured()) {
    return mockThemes.map((theme) => ({
      id: theme.id,
      title: theme.title,
      slug: theme.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      articles: theme.articles,
    }));
  }

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

export async function getParticipantContributionsByArticle(
  email: string,
  articleId: number
): Promise<ContributionRecord[]> {
  const participant = await getParticipantByEmail(email);

  if (!participant) {
    return [];
  }

  const articleContributions = await getContributionsByArticle(articleId);

  return articleContributions.filter(
    (contribution) => contribution.participantId === participant.id
  );
}

export async function getParticipantContributionsByEmail(
  email: string
): Promise<Contribution[]> {
  const participant = await getParticipantByEmail(email);

  if (!participant) {
    return [];
  }

  const { data: dbAportes, error } = await supabase
    .from("aportes")
    .select("*")
    .eq("participante_id", participant.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(
      `Error fetching aportes for participante ${participant.id}:`,
      error
    );
    throw error;
  }

  const articles = await getArticles();
  const articleTitleById = new Map(
    articles.map((article) => [article.id, article.title])
  );

  return (dbAportes || []).map((dbAporte) => ({
    articleId: dbAporte.articulo_id,
    articleTitle: articleTitleById.get(dbAporte.articulo_id) || "",
    participantName: participant.name,
    participantUser: participant.userCode,
    position: denormalizeAportePosicion(String(dbAporte.posicion)) as Contribution["position"],
    contributionType: denormalizeAporteTipo(String(dbAporte.tipo)) as Contribution["contributionType"],
    comment: dbAporte.contenido || "",
    justification: dbAporte.justificacion || "",
    alternativeText: dbAporte.propuesta_redaccion || "",
    createdAt: dbAporte.created_at || new Date(0).toISOString(),
  }));
}

export async function getAllContributions(): Promise<Contribution[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  const { data: dbAportes, error } = await supabase
    .from("aportes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all aportes:", error);
    throw error;
  }

  const [articles, participantsResult] = await Promise.all([
    getArticles(),
    supabase
      .from("participantes")
      .select("id, nombre, codigo_usuario"),
  ]);

  if (participantsResult.error) {
    console.error("Error fetching participantes for contributions:", participantsResult.error);
    throw participantsResult.error;
  }

  const articleTitleById = new Map(
    articles.map((article) => [article.id, article.title])
  );

  const participantById = new Map(
    (participantsResult.data || []).map((participant) => [
      participant.id,
      {
        name: participant.nombre,
        userCode: participant.codigo_usuario,
      },
    ])
  );

  return (dbAportes || []).map((dbAporte) => {
    const participant = participantById.get(dbAporte.participante_id);

    return {
      articleId: dbAporte.articulo_id,
      articleTitle: articleTitleById.get(dbAporte.articulo_id) || "",
      participantName: participant?.name,
      participantUser: participant?.userCode,
      position: denormalizeAportePosicion(String(dbAporte.posicion)) as Contribution["position"],
      contributionType: denormalizeAporteTipo(String(dbAporte.tipo)) as Contribution["contributionType"],
      comment: dbAporte.contenido || "",
      justification: dbAporte.justificacion || "",
      alternativeText: dbAporte.propuesta_redaccion || "",
      createdAt: dbAporte.created_at || new Date(0).toISOString(),
    };
  });
}
