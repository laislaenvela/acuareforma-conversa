import type { Metadata } from "next";

const SITE_NAME = "Acuareforma Conversa";
const SITE_DESCRIPTION =
  "Plataforma para comprender, dialogar y aportar a la reforma estatutaria. Participa en la conversación comunitaria sobre los artículos propuestos.";
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://acuareforma.local";

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "reforma",
    "acueducto",
    "participación",
    "democracia",
    "comunidad",
    "estatutos",
  ],
  authors: [{ name: "Acuareforma" }],
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export function createArticleMetadata(
  articleTitle: string,
  description: string
): Metadata {
  return {
    title: articleTitle,
    description,
    openGraph: {
      title: articleTitle,
      description,
      type: "article",
    },
  };
}
