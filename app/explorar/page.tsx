"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
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
      <section className="bg-[color:var(--color-surface)]">
        <div className={`${STYLES.container} pb-10 pt-10 md:pb-14 md:pt-12`}>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:items-center md:gap-10">
            <div className="min-w-0 md:block">
              <div className="flex items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h1 className="max-w-[10ch] flex-1 font-[family-name:var(--font-display)] text-[36px] font-bold leading-[1.03] text-[#5C74E8] sm:max-w-none sm:text-[40px] md:text-[56px]">
                  Explorar la propuesta
                </h1>

                <div className="relative flex w-full max-w-[13rem] shrink-0 rotate-[-2deg] items-center justify-center overflow-hidden border border-[#E8C95E] bg-[#FFF7A8] p-4 shadow-[4px_4px_12px_rgba(227,208,106,0.35)] sm:max-w-[14rem] md:h-[220px] md:w-[15rem] md:max-w-none md:order-2">
                  <div className="absolute right-0 top-0 h-0 w-0 border-b-[24px] border-l-[24px] border-b-transparent border-l-[#E8C95E]" />
                  <div className="absolute left-3 top-3 h-4 w-4 rounded-full border border-[#D8B94A] bg-[#FFF7A8]" />
                  <div className="absolute bottom-3 right-3 h-5 w-5 rotate-12 rounded-full border border-[#D8B94A] bg-[#FFF7A8]" />
                  <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold leading-5 text-[#5A4010] sm:text-[14px] md:text-[16px]">
                    "La reforma de los estatutos es una oportunidad para pensar juntos cómo queremos organizarnos como comunidad y cuidar lo que es de todos."
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-[42rem] font-[family-name:var(--font-body)] text-[15px] font-semibold leading-[1.42] text-[color:var(--color-primary-dark)] sm:text-[16px] md:mt-5 md:text-[19px] md:leading-[1.48]">
                Cada artículo explica una parte de la reforma estatutaria. Puedes recorrer la propuesta por capítulos o por temas para entender los cambios desde el enfoque que te resulte más útil.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${STYLES.container} py-10 md:py-12`}>
        <div className="mt-2">
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

        <div className={`${STYLES.sectionAlt} mt-6 grid gap-4`}>
        {loading && view === "chapters" && (
          <p className="text-[color:var(--color-text-secondary)]">Cargando capítulos...</p>
        )}

        {loading && view === "themes" && (
          <p className="text-[color:var(--color-text-secondary)]">Cargando temas...</p>
        )}

        {view === "chapters" &&
  chapters.map((chapter) => (
    <details
      key={chapter.id}
      className={`${STYLES.card} !shadow-[6px_6px_0_var(--color-primary)]`}
    >
      <summary className="cursor-pointer list-none">
        <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="font-[family-name:var(--font-display)] text-xl font-semibold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
                Capítulo
              </span>
              <span className="font-[family-name:var(--font-display)] text-[32px] font-semibold leading-none text-[color:var(--color-primary)]">
                {chapter.number}
              </span>
            </div>

            <ChevronDown className="h-5 w-5 text-[color:var(--color-text-secondary)]" />
          </div>
        <div className="mt-3 text-xl font-normal text-[color:var(--color-text-secondary)]">
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

        {view === "themes" &&
          themes.map((theme) => (
            <details
              key={theme.id}
              className={`${STYLES.card} !shadow-[6px_6px_0_var(--color-primary)]`}
            >
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="font-[family-name:var(--font-display)] text-xl font-semibold uppercase tracking-[0.18em] text-[color:var(--color-primary)]">
                      Tema
                    </span>
                    <span className="font-[family-name:var(--font-display)] text-[32px] font-medium leading-none text-[color:var(--color-primary)]">
                      {theme.articles.length}
                    </span>
                  </div>

                  <ChevronDown className="h-5 w-5 text-[color:var(--color-text-secondary)]" />
                </div>

                <div className="mt-3 text-xl font-normal text-[color:var(--color-text-secondary)]">
                  {theme.title}
                </div>
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
      </div>
      </section>
    </main>
  );
}