import { getArticles, getArticleById, getChapters } from "../../lib/data";
import type { Metadata } from "next";
import { createArticleMetadata } from "../../lib/metadata";
import { STYLES } from "../../lib/styles";
import ArticlePageClient from "./ArticlePageClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(Number(id));

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return createArticleMetadata(article.title, article.currentText);
}

export default async function ArticuloPage({
  params,
}: Props) {
  const { id } = await params;
  const article = await getArticleById(Number(id));

if (!article) {
  return (
    <main className={STYLES.page}>
      <section className={`${STYLES.container} py-12 md:py-16`}>
      <h1 className={STYLES.h1}>Artículo no encontrado</h1>
      </section>
    </main>
  );
}

const chapters = await getChapters();

const chapter = chapters.find(
  (c) => c.id === article.chapterId
);
const articles = await getArticles();
const articleIndex = articles.findIndex(
  (a) => a.id === article.id
);

const previousArticle =
  articleIndex > 0
    ? articles[articleIndex - 1]
    : null;

const nextArticle =
  articleIndex < articles.length - 1
    ? articles[articleIndex + 1]
    : null;
  return (
    <main className={STYLES.page}>
      <ArticlePageClient
        article={article}
        chapterLabel={`Capítulo ${chapter?.number} · ${chapter?.title}`}
        previousArticle={
          previousArticle
            ? {
                id: previousArticle.id,
                title: previousArticle.title,
              }
            : null
        }
        nextArticle={
          nextArticle
            ? {
                id: nextArticle.id,
                title: nextArticle.title,
              }
            : null
        }
      />
    </main>
  );

}