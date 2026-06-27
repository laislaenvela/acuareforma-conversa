import Link from "next/link";
import ParticipationGate from "../../../components/ParticipationGate";
import { getArticles, getArticleById, getChapters } from "../../lib/data";
import type { Metadata } from "next";
import { createArticleMetadata } from "../../lib/metadata";
import { STYLES } from "../../lib/styles";

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
      <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-8 md:py-16">

      <h1 className={STYLES.h1}>
  {article.numero
    ? `Artículo ${article.numero} · ${article.title}`
    : article.title}
</h1>

<p className={`${STYLES.subtitle} mt-4 max-w-4xl`}>
  Aquí encontrarás una explicación clara de este artículo, una comparación entre el texto
  vigente y la propuesta, y el contexto del cambio para que puedas participar con mejor base.
</p>

<p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
  Capítulo {chapter?.number} · {chapter?.title}
</p>
      <section className={STYLES.sectionAlt}>
        <h2 className={STYLES.h2}>
          ¿Qué cambia?
        </h2>

        <div className={`mt-4 ${STYLES.grid2}`}>

          <div className={STYLES.card}>
            <h3 className={STYLES.h3}>
              Texto vigente
            </h3>

            <p className={`${STYLES.body} mt-3`}>
              {article.currentText}
            </p>
          </div>

          <div className={STYLES.card}>
            <h3 className={STYLES.h3}>
              Texto propuesto
            </h3>

            <p className={`${STYLES.body} mt-3`}>
              {article.proposedText}
            </p>
          </div>

        </div>
      </section>

      <section className={STYLES.sectionPlain}>
        <h2 className={STYLES.h2}>
          ¿Por qué se propone este cambio?
        </h2>

        <p className={`${STYLES.body} mt-4`}>
          {article.rationale}
        </p>
      </section>

      <section className={STYLES.sectionWarm}>
        <h2 className={STYLES.h2}>
          Pregunta para la comunidad
        </h2>

        <p className={`${STYLES.body} mt-4`}>
          {article.communityQuestion}
        </p>
      </section>


<ParticipationGate
  articleId={article.id}
  articleTitle={article.title}
/>
        <div className={`${STYLES.sectionAlt} ${STYLES.divider}`}>

  <div className="flex flex-col gap-4 text-center">

    {previousArticle && (
      <Link
        href={`/articulo/${previousArticle.id}`}
        className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
      >
        ← Artículo anterior
        <div className="text-sm text-[color:var(--color-text-muted)]">
          {previousArticle.title}
        </div>
      </Link>
    )}

    <Link
      href="/explorar"
      className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
    >
      Volver a la propuesta
    </Link>

    {nextArticle && (
      <Link
        href={`/articulo/${nextArticle.id}`}
        className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
      >
        Artículo siguiente →
        <div className="text-sm text-[color:var(--color-text-muted)]">
          {nextArticle.title}
        </div>
      </Link>
    )}

  </div>

</div>

      </section>
    </main>
  );

}