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
