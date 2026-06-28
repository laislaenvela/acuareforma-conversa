"use client";

import Link from "next/link";
import { useState } from "react";
import ArticleText from "../../../components/ArticleText";
import ParticipationGate from "../../../components/ParticipationGate";
import { STYLES } from "../../lib/styles";
import type { Article } from "../../lib/types";

type NavArticle = {
  id: number;
  title: string;
};

type ArticlePageClientProps = {
  article: Article;
  chapterLabel: string;
  previousArticle: NavArticle | null;
  nextArticle: NavArticle | null;
};

export default function ArticlePageClient({
  article,
  chapterLabel,
  previousArticle,
  nextArticle,
}: ArticlePageClientProps) {
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-12 md:px-8 md:py-16">
      {!isCompleted ? (
        <>
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
            {chapterLabel}
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

                <ArticleText
                  text={article.currentText}
                  className="mt-3"
                />
              </div>

              <div className={STYLES.card}>
                <h3 className={STYLES.h3}>
                  Texto propuesto
                </h3>

                <ArticleText
                  text={article.proposedText}
                  className="mt-3"
                />
              </div>
            </div>
          </section>

          <section className={STYLES.sectionPlain}>
            <h2 className={STYLES.h2}>
              ¿Por qué se propone este cambio?
            </h2>

            <ArticleText
              text={article.rationale}
              className="mt-4"
            />
          </section>

          <section className={STYLES.sectionWarm}>
            <h2 className={STYLES.h2}>
              Pregunta para la comunidad
            </h2>

            <ArticleText
              text={article.communityQuestion}
              className="mt-4"
            />
          </section>
        </>
      ) : null}

      <ParticipationGate
        articleId={article.id}
        articleTitle={article.title}
        nextArticle={nextArticle}
        onCompletionChange={setIsCompleted}
      />

      {!isCompleted ? (
        <div className={`${STYLES.sectionAlt} ${STYLES.divider}`}>
          <div className="flex flex-col gap-4 text-center">
            {previousArticle ? (
              <Link
                href={`/articulo/${previousArticle.id}`}
                className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
              >
                ← Artículo anterior
                <div className="text-sm text-[color:var(--color-text-muted)]">
                  {previousArticle.title}
                </div>
              </Link>
            ) : null}

            <Link
              href="/explorar"
              className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
            >
              Volver a la propuesta
            </Link>

            {nextArticle ? (
              <Link
                href={`/articulo/${nextArticle.id}`}
                className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
              >
                Artículo siguiente →
                <div className="text-sm text-[color:var(--color-text-muted)]">
                  {nextArticle.title}
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </section>
  );
}
