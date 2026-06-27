"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getArticles, getChapters, getThemes } from "../lib/data";
import type { Article, Chapter, Theme } from "../lib/types";
import { STYLES } from "../lib/styles";
import SegmentedControl from "@/components/SegmentedControl";

const VIEW_OPTIONS = [
  { value: "chapters", label: "Capítulos" },
  { value: "themes", label: "Temas" },
] as const;

export default function ExplorarPage() {
  const [view, setView] = useState("chapters");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const articleTitleById = useMemo(
    () => new Map(articles.map((article) => [article.id, article.title])),
    [articles]
  );

  const articleNumeroById = useMemo(
    () => new Map(articles.map((article) => [article.id, article.numero])),
    [articles]
  );

  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedChapters, loadedThemes, loadedArticles] = await Promise.all([
          getChapters(),
          getThemes(),
          getArticles(),
        ]);

        setChapters(loadedChapters);
        setThemes(loadedThemes);
        setArticles(loadedArticles);
      } catch (error) {
        console.error("Error loading exploration data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);
  return (
    <main className={STYLES.page}>
      <section className={`${STYLES.container} py-12 md:py-16`}>
      <h1 className={STYLES.h1}>
        Explorar la propuesta
      </h1>

      <p className={`${STYLES.subtitle} mt-4 max-w-3xl`}>
        Cada artículo explica una parte de la reforma estatutaria.
        Puedes recorrer la propuesta por capítulos o por temas para entender los cambios
        desde el enfoque que te resulte más útil.
      </p>

      <div className="mt-8">
        <SegmentedControl
          value={view}
          options={VIEW_OPTIONS}
          onChange={setView}
          segmentedClassName={STYLES.segmented}
          segmentClassName={STYLES.segment}
          activeClassName={STYLES.segmentActive}
          inactiveClassName={STYLES.segmentInactive}
        />
      </div>

      <div className={`${STYLES.sectionAlt} grid gap-4`}>
        {loading && view === "chapters" && (
          <p className="text-[color:var(--color-text-muted)]">Cargando capítulos...</p>
        )}

        {loading && view === "themes" && (
          <p className="text-[color:var(--color-text-muted)]">Cargando temas...</p>
        )}

        {view === "chapters" &&
  chapters.map((chapter) => (
    <details
      key={chapter.id}
      className={STYLES.card}
    >
      <summary className="cursor-pointer">
  <div className={STYLES.cardLabel}>
    CAPÍTULO {chapter.number}
  </div>

  <div className={STYLES.cardTitle}>
    {chapter.title}
  </div>
</summary>
<div className="mt-4">
  {chapter.previousTitle && (
    <p className="text-sm text-[color:var(--color-text-muted)]">
      <strong>Antes:</strong> {chapter.previousTitle}
    </p>
  )}
    <p className={`${STYLES.body} mt-3`}>
    {chapter.summary}
  </p>
</div>

<div className="mt-6">
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-text-muted)]">
    Artículos incluidos
  </h3>

  <div className="flex flex-col gap-2">
    {(chapter.articles ?? []).map((article) => (
      <Link
        key={article.id}
        href={`/articulo/${article.id}`}
        className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
      >
        <div className="text-sm text-[color:var(--color-text-muted)]">
          {articleNumeroById.get(article.id)
            ? `Artículo ${articleNumeroById.get(article.id)}`
            : "Preámbulo"}
        </div>

        <div className="font-medium">
          {article.title}
        </div>
      </Link>
    ))}
  </div>
</div>
    </details>
  ))}

        {view === "themes" &&
          themes.map((theme) => (
            <details
              key={theme.id}
              className={STYLES.card}
            >
              <summary className="cursor-pointer">
                <div className={STYLES.cardTitle}>
                  {theme.title}
                </div>

                <p className="mt-2 text-sm text-[color:var(--color-text-muted)]">
                  {theme.articles.length} artículos asociados
                </p>
              </summary>

              <div className="mt-6 flex flex-col gap-2">
                {theme.articles.length === 0 && (
                  <p className="text-sm text-[color:var(--color-text-muted)]">
                    Este tema aún no tiene artículos asociados.
                  </p>
                )}

                {theme.articles.map((articleId) => (
                  <Link
                    key={`${theme.id}-${articleId}`}
                    href={`/articulo/${articleId}`}
                    className="rounded-lg border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-3 transition-colors duration-150 hover:border-[color:var(--color-primary)]"
                  >
                    <div className="text-sm text-[color:var(--color-text-muted)]">
                      {articleNumeroById.get(articleId)
                        ? `Artículo ${articleNumeroById.get(articleId)}`
                        : "Preámbulo"}
                    </div>

                    <div className="font-medium">
                      {articleTitleById.get(articleId) || "Título no disponible"}
                    </div>
                  </Link>
                ))}
              </div>
            </details>
          ))}
      </div>
      </section>
    </main>
  );
}