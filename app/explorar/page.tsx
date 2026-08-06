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

type ExploreView = (typeof VIEW_OPTIONS)[number]["value"];

export default function ExplorarPage() {
  const [view, setView] = useState<ExploreView>("chapters");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const articleTitleById = useMemo(
    () => new Map(articles.map((article) => [article.id, article.title])),
    [articles]
  );

  const articleNumeroById = useMemo(
    () => new Map(articles.map((article) => [article.id, article.numero])),
    [articles]
  );

  const normalizedQuery = useMemo(
    () => searchQuery.trim().toLowerCase(),
    [searchQuery]
  );

  const filteredChapters = useMemo(() => {
    if (!normalizedQuery) {
      return chapters;
    }

    return chapters.filter((chapter) => {
      const chapterFields = [
        chapter.title,
        chapter.summary,
        chapter.previousTitle,
        `capítulo ${chapter.number}`,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const chapterArticles = (chapter.articles ?? [])
        .map((article) => article.title)
        .join(" ")
        .toLowerCase();

      return (
        chapterFields.includes(normalizedQuery) ||
        chapterArticles.includes(normalizedQuery)
      );
    });
  }, [chapters, normalizedQuery]);

  const filteredThemes = useMemo(() => {
    if (!normalizedQuery) {
      return themes;
    }

    return themes.filter((theme) => {
      const themeTitle = theme.title.toLowerCase();

      const relatedArticles = theme.articles
        .map((articleId) => {
          const numero = articleNumeroById.get(articleId);
          const title = articleTitleById.get(articleId) ?? "";
          return `${numero ? `artículo ${numero}` : ""} ${title}`.trim();
        })
        .join(" ")
        .toLowerCase();

      return (
        themeTitle.includes(normalizedQuery) ||
        relatedArticles.includes(normalizedQuery)
      );
    });
  }, [themes, normalizedQuery, articleNumeroById, articleTitleById]);

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

      <div className="mt-4 max-w-2xl">
        <label htmlFor="explore-search" className={STYLES.label}>
          Buscar en {view === "chapters" ? "capítulos" : "temas"}
        </label>
        <input
          id="explore-search"
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={
            view === "chapters"
              ? "Ej: Gobierno, Junta Directiva, Artículo 12"
              : "Ej: Transparencia, participación, Artículo 5"
          }
          className={`${STYLES.input} mt-2`}
        />
      </div>

      <div className={`${STYLES.sectionAlt} grid gap-4`}>
        {loading && view === "chapters" && (
          <p className="text-[color:var(--color-text-secondary)]">Cargando capítulos...</p>
        )}

        {loading && view === "themes" && (
          <p className="text-[color:var(--color-text-secondary)]">Cargando temas...</p>
        )}

          {view === "chapters" &&
        filteredChapters.map((chapter) => (
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
    <p className="text-sm text-[color:var(--color-text-secondary)]">
      <strong>Antes:</strong> {chapter.previousTitle}
    </p>
  )}
    <p className={`${STYLES.body} mt-3`}>
    {chapter.summary}
  </p>
</div>

<div className="mt-6">
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-[color:var(--color-text-secondary)]">
    Artículos incluidos
  </h3>

  <div className="flex flex-col gap-2">
    {(chapter.articles ?? []).map((article) => (
      <Link
        key={article.id}
        href={`/articulo/${article.id}`}
        className="rounded-lg border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-primary)] p-3 transition-colors duration-150 hover:border-[color:var(--color-proposal)]"
      >
        <div className="text-sm text-[color:var(--color-text-secondary)]">
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

        {view === "chapters" && !loading && filteredChapters.length === 0 && (
          <p className="text-[color:var(--color-text-secondary)]">
            No se encontraron capítulos para "{searchQuery}".
          </p>
        )}

        {view === "themes" &&
          filteredThemes.map((theme) => (
            <details
              key={theme.id}
              className={STYLES.card}
            >
              <summary className="cursor-pointer">
                <div className={STYLES.cardTitle}>
                  {theme.title}
                </div>

                <p className="mt-2 text-sm text-[color:var(--color-text-secondary)]">
                  {theme.articles.length} artículos asociados
                </p>
              </summary>

              <div className="mt-6 flex flex-col gap-2">
                {theme.articles.length === 0 && (
                  <p className="text-sm text-[color:var(--color-text-secondary)]">
                    Este tema aún no tiene artículos asociados.
                  </p>
                )}

                {theme.articles.map((articleId) => (
                  <Link
                    key={`${theme.id}-${articleId}`}
                    href={`/articulo/${articleId}`}
                    className="rounded-lg border border-[color:var(--color-border-default)] bg-[color:var(--color-surface-primary)] p-3 transition-colors duration-150 hover:border-[color:var(--color-proposal)]"
                  >
                    <div className="text-sm text-[color:var(--color-text-secondary)]">
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

        {view === "themes" && !loading && filteredThemes.length === 0 && (
          <p className="text-[color:var(--color-text-secondary)]">
            No se encontraron temas para "{searchQuery}".
          </p>
        )}
      </div>
      </section>
    </main>
  );
}