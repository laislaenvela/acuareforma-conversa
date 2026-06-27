"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { getArticles, getChapters, getThemes } from "../lib/data";
import type { Article, Chapter, Theme } from "../lib/types";

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
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="text-4xl font-bold">
        Explorar la propuesta
      </h1>

      <p className="mt-4 text-gray-600">
        Elige la forma en que deseas recorrer la propuesta de reforma estatutaria.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => setView("chapters")}
          className={`rounded-lg px-4 py-2 ${
            view === "chapters"
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          Capítulos
        </button>

        <button
          onClick={() => setView("themes")}
          className={`rounded-lg px-4 py-2 ${
            view === "themes"
              ? "bg-blue-600 text-white"
              : "border"
          }`}
        >
          Temas
        </button>
      </div>

      <div className="mt-10 grid gap-4">
        {loading && view === "chapters" && (
          <p className="text-gray-500">Cargando capítulos...</p>
        )}

        {loading && view === "themes" && (
          <p className="text-gray-500">Cargando temas...</p>
        )}

        {view === "chapters" &&
  chapters.map((chapter) => (
    <details
      key={chapter.id}
      className="rounded-xl border p-6"
    >
      <summary className="cursor-pointer">
  <div className="text-sm text-gray-500">
    CAPÍTULO {chapter.number}
  </div>

  <div className="text-xl font-semibold">
    {chapter.title}
  </div>
</summary>
<div className="mt-4">
  {chapter.previousTitle && (
    <p className="text-sm text-gray-500">
      <strong>Antes:</strong> {chapter.previousTitle}
    </p>
  )}
    <p className="mt-3 text-gray-700">
    {chapter.summary}
  </p>
</div>

<div className="mt-6">
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
    Artículos incluidos
  </h3>

  <div className="flex flex-col gap-2">
    {(chapter.articles ?? []).map((article) => (
      <Link
        key={article.id}
        href={`/articulo/${article.id}`}
        className="rounded-lg border p-3 hover:bg-gray-50"
      >
        <div className="text-sm text-gray-500">
          Artículo {article.id}
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
              className="rounded-xl border p-6"
            >
              <summary className="cursor-pointer">
                <div className="text-xl font-semibold">
                  {theme.title}
                </div>

                <p className="mt-2 text-sm text-gray-600">
                  {theme.articles.length} artículos asociados
                </p>
              </summary>

              <div className="mt-6 flex flex-col gap-2">
                {theme.articles.length === 0 && (
                  <p className="text-sm text-gray-500">
                    Este tema aún no tiene artículos asociados.
                  </p>
                )}

                {theme.articles.map((articleId) => (
                  <Link
                    key={`${theme.id}-${articleId}`}
                    href={`/articulo/${articleId}`}
                    className="rounded-lg border p-3 hover:bg-gray-50"
                  >
                    <div className="text-sm text-gray-500">
                      Artículo {articleId}
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
    </main>
  );
}