"use client";

import { useState } from "react";
import Link from "next/link";
import { themes, chapters, articles } from "../data/proposal";
import { STYLES } from "../lib/styles";

export default function ExplorarPage() {
  const [view, setView] = useState("chapters");

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className={STYLES.container}>
        
        {/* Header */}
        <header className="max-w-3xl mb-8">
          <h1 className={STYLES.h1}>Explorar la propuesta</h1>
          <p className={STYLES.subtitle}>
            Elige la forma en que deseas recorrer el texto de la propuesta de reforma estatutaria. 
            Puedes navegar por Capítulos estructurados o por Temas de interés.
          </p>
        </header>

        {/* Tab Toggle Bar */}
        <div className="flex rounded-xl bg-slate-100 p-1.5 max-w-sm mb-10">
          <button
            onClick={() => setView("chapters")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
              view === "chapters"
                ? "bg-white text-teal-700 shadow-xs ring-1 ring-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            📂 Capítulos ({chapters.length})
          </button>
          <button
            onClick={() => setView("themes")}
            className={`flex-1 rounded-lg py-2.5 text-sm font-bold transition-all duration-200 cursor-pointer ${
              view === "themes"
                ? "bg-white text-teal-700 shadow-xs ring-1 ring-slate-200/50"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            🎯 Temas ({themes.length})
          </button>
        </div>

        {/* Chapters view */}
        {view === "chapters" && (
          <div className="space-y-4">
            {chapters.map((chapter) => (
              <details
                key={chapter.id}
                className="group rounded-2xl border border-slate-100 bg-white p-5 shadow-xs transition-all duration-200 open:shadow-md [&_summary::-webkit-details-marker]:hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer list-none select-none outline-none">
                  <div>
                    <div className="text-[10px] font-extrabold text-teal-600 uppercase tracking-widest">
                      CAPÍTULO {chapter.number}
                    </div>
                    <h2 className="mt-1 text-lg font-bold text-slate-800 group-hover:text-teal-600 transition-colors">
                      {chapter.title}
                    </h2>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 group-open:bg-teal-50 group-open:text-teal-600 transition-colors duration-200">
                    <svg
                      className="h-5 w-5 transform transition-transform duration-200 group-open:rotate-185"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </summary>

                <div className="mt-5 border-t border-slate-100 pt-5 space-y-4">
                  {chapter.previousTitle && (
                    <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-550 border-l-2 border-slate-300">
                      <strong>Nombre anterior:</strong> {chapter.previousTitle}
                    </div>
                  )}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {chapter.summary}
                  </p>

                  <div className="pt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                      Artículos incluidos en el capítulo ({chapter.articles.length})
                    </h3>

                    <div className="grid gap-3 sm:grid-cols-2">
                      {chapter.articles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/articulo/${article.id}`}
                          className="flex flex-col p-4 rounded-xl border border-slate-100 hover:border-teal-100 hover:bg-teal-50/5 transition-all duration-200 group/item"
                        >
                          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                            Artículo {article.id}
                          </span>
                          <span className="mt-1 font-bold text-slate-700 text-sm group-hover/item:text-teal-700 transition-colors">
                            {article.title}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </details>
            ))}
          </div>
        )}

        {/* Themes view */}
        {view === "themes" && (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {themes.map((theme) => (
              <div
                key={theme.id}
                className={`${STYLES.card} ${STYLES.cardHover} border-t-4 border-t-sky-500 flex flex-col justify-between`}
              >
                <div>
                  <span className="text-[10px] font-extrabold text-sky-600 uppercase tracking-widest">Tema {theme.id}</span>
                  <h2 className="mt-2 text-lg font-bold text-slate-800 leading-tight">
                    {theme.title}
                  </h2>
                </div>
                
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {theme.articles.length} {theme.articles.length === 1 ? 'artículo' : 'artículos'}
                  </span>
                  
                  <details className="relative [&_summary::-webkit-details-marker]:hidden">
                    <summary className="text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer select-none">
                      Ver lista ▾
                    </summary>
                    <div className="absolute right-0 bottom-8 z-10 mt-2 w-56 origin-bottom-right rounded-xl bg-white p-3 shadow-xl ring-1 ring-black/5">
                      <div className="max-h-48 overflow-y-auto space-y-1.5">
                        {theme.articles.map(artId => {
                          const articleObj = articles.find(a => a.id === artId);
                          return (
                            <Link 
                              key={artId} 
                              href={`/articulo/${artId}`}
                              className="block rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-650 transition-colors"
                            >
                              Art. {artId}: {articleObj?.title || `Artículo ${artId}`}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}