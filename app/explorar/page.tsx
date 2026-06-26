"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getChapters } from "../lib/data";
import { themes, chapters as defaultChapters } from "../data/proposal";

export default function ExplorarPage() {
  const [view, setView] = useState("chapters");
  const [chapters, setChapters] = useState(defaultChapters);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChapters = async () => {
      try {
        const loadedChapters = getChapters();
        setChapters(loadedChapters);
      } catch (error) {
        console.error("Error loading chapters:", error);
        // Keep default chapters on error
      } finally {
        setLoading(false);
      }
    };

    loadChapters();
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
    {chapter.articles.map((article) => (
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
            <div
              key={theme.id}
              className="rounded-xl border p-6"
            >
              <h2 className="text-xl font-semibold">
                {theme.title}
              </h2>

              <p className="mt-2 text-gray-600">
                {theme.articles.length} artículos asociados
              </p>
            </div>
          ))}
      </div>
    </main>
  );
}