"use client";

import { useEffect, useState, useMemo } from "react";
import { articles } from "./data/proposal";
import Link from "next/link";
import type { Contribution } from "./lib/types";
import { getContributions } from "./lib/storage";
import { 
  getUniqueUsers, 
  getUniqueArticles, 
  countByPosition,
  getArticleRanking,
  getArticlesWithoutContributions 
} from "./lib/calculations";
import { STYLES } from "./lib/styles";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  useEffect(() => {
    setContributions(getContributions());
  }, []);

  const uniqueUsers = useMemo(() => 
    getUniqueUsers(contributions),
    [contributions]
  );

  const uniqueArticles = useMemo(() => 
    getUniqueArticles(contributions),
    [contributions]
  );

  const agreedCount = useMemo(() =>
    countByPosition(contributions, "De acuerdo"),
    [contributions]
  );

  const partiallyAgreedCount = useMemo(() =>
    countByPosition(contributions, "Parcialmente de acuerdo"),
    [contributions]
  );

  const disagreedCount = useMemo(() =>
    countByPosition(contributions, "En desacuerdo"),
    [contributions]
  );

  const needInfoCount = useMemo(() =>
    countByPosition(contributions, "Necesito más información"),
    [contributions]
  );

  const articleRanking = useMemo(() =>
    getArticleRanking(contributions),
    [contributions]
  );

  const articlesWithoutContributions = useMemo(() =>
    getArticlesWithoutContributions(articles, contributions),
    [contributions]
  );

  // Calculate percentages for visual bars
  const totalOpinions = useMemo(() => 
    agreedCount + partiallyAgreedCount + disagreedCount + needInfoCount,
    [agreedCount, partiallyAgreedCount, disagreedCount, needInfoCount]
  );

  const pctAgreed = useMemo(() => totalOpinions > 0 ? Math.round((agreedCount / totalOpinions) * 100) : 0, [agreedCount, totalOpinions]);
  const pctPartially = useMemo(() => totalOpinions > 0 ? Math.round((partiallyAgreedCount / totalOpinions) * 100) : 0, [partiallyAgreedCount, totalOpinions]);
  const pctDisagreed = useMemo(() => totalOpinions > 0 ? Math.round((disagreedCount / totalOpinions) * 100) : 0, [disagreedCount, totalOpinions]);
  const pctNeedInfo = useMemo(() => totalOpinions > 0 ? Math.round((needInfoCount / totalOpinions) * 100) : 0, [needInfoCount, totalOpinions]);

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className={STYLES.container}>
        
        {/* Hero Section */}
        <header className="relative py-12 md:py-16 text-center max-w-4xl mx-auto rounded-3xl overflow-hidden bg-gradient-to-br from-teal-500/5 via-sky-500/5 to-transparent mb-12">
          <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-teal-300/10 blur-3xl" />
          <div className="absolute right-10 bottom-0 w-36 h-36 rounded-full bg-sky-300/10 blur-2xl" />
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-800">
            Acuareforma <span className="bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent">Conversa</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-600 font-medium max-w-xl mx-auto px-4 leading-relaxed">
            Una plataforma participativa para comprender, debatir y enriquecer la reforma estatutaria de nuestro acueducto comunitario.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/explorar" className={STYLES.btnPrimary}>
              Explorar la propuesta
            </Link>
            <Link href="/participacion" className={STYLES.btnSecondary}>
              Mi participación
            </Link>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="space-y-12">
          
          {/* Community Stats */}
          <section>
            <h2 className={STYLES.h2}>Participación comunitaria</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <StatCard label="Aportes registrados" value={contributions.length} variant="lg" />
              <StatCard label="Usuarios participantes" value={uniqueUsers.size} variant="lg" />
              <StatCard label="Artículos comentados" value={uniqueArticles.size} variant="lg" />
            </div>
          </section>

          {/* Main Visuals & Rankings */}
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Visual consensus (Progress bars) - Span 7 */}
            <section className={`${STYLES.card} lg:col-span-7 border-slate-100`}>
              <h3 className={STYLES.h3}>¿Cómo se posiciona la comunidad?</h3>
              <p className="mt-1.5 text-xs text-slate-450">Distribución de opiniones agregadas de todos los aportes.</p>
              
              <div className="mt-8 space-y-6">
                {/* De acuerdo */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 flex items-center gap-2">
                      <span className="text-teal-650">👍</span> De acuerdo
                    </span>
                    <span className="text-slate-600">{agreedCount} ({pctAgreed}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-teal-500 to-teal-600 rounded-full transition-all duration-1000" 
                      style={{ width: `${pctAgreed}%` }} 
                    />
                  </div>
                </div>

                {/* Parcialmente de acuerdo */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 flex items-center gap-2">
                      <span className="text-amber-500">🌗</span> Parcialmente de acuerdo
                    </span>
                    <span className="text-slate-600">{partiallyAgreedCount} ({pctPartially}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-450 to-amber-550 rounded-full transition-all duration-1000" 
                      style={{ width: `${pctPartially}%` }} 
                    />
                  </div>
                </div>

                {/* En desacuerdo */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 flex items-center gap-2">
                      <span className="text-rose-500">👎</span> En desacuerdo
                    </span>
                    <span className="text-slate-600">{disagreedCount} ({pctDisagreed}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-rose-500 to-rose-600 rounded-full transition-all duration-1000" 
                      style={{ width: `${pctDisagreed}%` }} 
                    />
                  </div>
                </div>

                {/* Necesita más información */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-slate-700 flex items-center gap-2">
                      <span className="text-sky-500">❓</span> Necesita más información
                    </span>
                    <span className="text-slate-600">{needInfoCount} ({pctNeedInfo}%)</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-sky-450 to-sky-550 rounded-full transition-all duration-1000" 
                      style={{ width: `${pctNeedInfo}%` }} 
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Trending Articles - Span 5 */}
            <section className={`${STYLES.card} lg:col-span-5 border-slate-100`}>
              <h3 className={STYLES.h3}>Artículos más conversados</h3>
              <p className="mt-1.5 text-xs text-slate-450">Temas clave con mayor interacción comunitaria.</p>

              {articleRanking.length === 0 ? (
                <div className="mt-12 text-center py-6 text-slate-400 text-sm">
                  <div className="text-3xl mb-2">💬</div>
                  Aún no hay aportes registrados.
                </div>
              ) : (
                <div className="mt-6 divide-y divide-slate-100">
                  {articleRanking
                    .slice(0, 5)
                    .map((article, index) => (
                      <div
                        key={`${article.articleId}-${index}`}
                        className="py-3 flex items-center justify-between group first:pt-0 last:pb-0"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50 text-xs font-bold text-teal-700">
                            #{index + 1}
                          </span>
                          <div>
                            <Link
                              href={`/articulo/${article.articleId}`}
                              className="text-sm font-semibold text-slate-700 group-hover:text-teal-600 group-hover:underline transition-colors line-clamp-1"
                            >
                              {article.articleTitle}
                            </Link>
                            <span className="text-[11px] text-slate-400 font-medium">Artículo {article.articleId}</span>
                          </div>
                        </div>

                        <span className={STYLES.badgeTeal}>
                          {article.count} {article.count === 1 ? 'aporte' : 'aportes'}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </section>

          </div>

          {/* Pending Articles section */}
          <section className={`${STYLES.card} border-slate-100 bg-white`}>
            <h3 className={STYLES.h3}>Artículos pendientes de conversación</h3>
            <p className="mt-1 text-xs text-slate-450">Estos artículos aún no tienen aportes. ¡Toma la iniciativa e inaugura el diálogo!</p>

            {articlesWithoutContributions.length === 0 ? (
              <p className="mt-6 text-center text-slate-500 text-sm py-4">
                ✨ ¡Genial! Todos los artículos han recibido al menos un aporte.
              </p>
            ) : (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                {articlesWithoutContributions.slice(0, 6).map((article) => (
                  <Link
                    key={article.id}
                    href={`/articulo/${article.id}`}
                    className="p-4 rounded-xl border border-slate-100 bg-slate-50/20 hover:bg-slate-50/80 hover:border-teal-100 hover:shadow-xs transition-all duration-200 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">
                        Artículo {article.id}
                      </div>
                      <h4 className="mt-1.5 font-bold text-slate-700 text-sm line-clamp-1 group-hover:text-slate-900 transition-colors">
                        {article.title}
                      </h4>
                      <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {article.currentText}
                      </p>
                    </div>
                    <span className="mt-4 text-xs font-semibold text-teal-600 group-hover:text-teal-700 flex items-center gap-1">
                      Aportar opinión
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}
            
            {articlesWithoutContributions.length > 6 && (
              <div className="mt-6 text-center">
                <Link href="/explorar" className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline">
                  Ver todos los {articlesWithoutContributions.length} artículos pendientes →
                </Link>
              </div>
            )}
          </section>

        </div>
      </div>
    </main>
  );
}