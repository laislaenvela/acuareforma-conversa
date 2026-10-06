import { getArticles, getArticleBySlug, getChapters } from "../../lib/data";
import { sortByArticleNumero } from "../../lib/articleOrder";
import type { Metadata } from "next";
import { createArticleMetadata } from "../../lib/metadata";
import { STYLES } from "../../lib/styles";
import ArticlePageClient from "./ArticlePageClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

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
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

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
const sortedArticles = sortByArticleNumero(articles);
const articleIndex = sortedArticles.findIndex(
  (a) => a.id === article.id
);

const previousArticle =
  articleIndex > 0
    ? sortedArticles[articleIndex - 1]
    : null;

const nextArticle =
  articleIndex < sortedArticles.length - 1
    ? sortedArticles[articleIndex + 1]
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
                slug: previousArticle.slug,
                title: previousArticle.title,
              }
            : null
        }
        nextArticle={
          nextArticle
            ? {
                id: nextArticle.id,
                slug: nextArticle.slug,
                title: nextArticle.title,
              }
            : null
        }
      />
    </main>
  );

}