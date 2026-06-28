"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type { Contribution } from "./lib/types";
import { getContributions } from "./lib/storage";
import { getArticles } from "./lib/data";
import type { Article } from "./lib/types";
import { STYLES } from "./lib/styles";
import { MessageCircle, Users, FileText, ArrowRight } from "lucide-react";
import { 
  getUniqueUsers, 
  getUniqueArticles, 
  countByPosition,
  getArticleRanking,
  getArticlesWithoutContributions 
} from "./lib/calculations";

export default function Home() {
  const [contributions] =
    useState<Contribution[]>(() => getContributions());
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const loadedArticles = await getArticles();
        setArticles(loadedArticles);
      } catch (error) {
        console.error("Error loading articles:", error);
      }
    };

    loadArticles();
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
    [articles, contributions]
  );

  const articleNumeroById = useMemo(
    () => new Map(articles.map((article) => [article.id, article.numero])),
    [articles]
  );

  return (
    <main className={STYLES.page}>
      <section className="bg-[color:var(--color-surface)]">
        <div className={`${STYLES.container} py-16 md:py-20`}>
          <div className="grid gap-10 lg:grid-cols-3 lg:items-start">
            <div className="lg:col-span-2">
              <h1 className={STYLES.h1}>
                Comprender
                <br />
                para decidir
                <br />
                juntos.
              </h1>

              <p className="mt-6 max-w-[42rem] font-[family-name:var(--font-body)] text-[17px] font-semibold leading-[1.65] text-[color:var(--color-primary-dark)] md:text-[19px]">
                Un espacio para entender la propuesta de reforma estatutaria del Acueducto
                Comunitario Acuareforma, recorrer sus cambios y participar en una conversación
                informada y respetuosa.
              </p>

              <div className="mt-8">
                <Link href="/explorar" className={`${STYLES.buttonPrimary} gap-2`}>
                  Explorar la propuesta
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <aside className="rounded-2xl border border-[color:var(--color-sand-deep)] bg-[color:var(--color-sand)] p-6 shadow-[6px_6px_0_var(--color-sand-deep)]">
              <h2 className="font-[family-name:var(--font-display)] text-[28px] font-bold leading-tight text-[color:var(--color-primary-dark)] md:text-[32px]">
                La conversación
                <br />
                nos fortalece
              </h2>

              <p className="mt-4 font-[family-name:var(--font-body)] text-[16px] leading-7 text-[color:var(--color-text)]">
                Cada aporte cuenta. Este es un espacio para escuchar, preguntar, opinar y
                construir acuerdos pensando en el bienestar de toda la comunidad.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-background)]">
        <div className={`${STYLES.container} py-14 md:py-16`}>
          <h2 className={STYLES.h2}>La participación en cifras</h2>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-primary)]">
              <div className="flex items-center gap-2 text-[color:var(--color-primary-dark)]">
                <MessageCircle size={18} />
                <div className={STYLES.cardLabel}>Aportes registrados</div>
              </div>
              <div className="mt-3 font-[family-name:var(--font-display)] text-5xl font-bold text-[color:var(--color-primary)]">
                {contributions.length}
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-community)]">
              <div className="flex items-center gap-2 text-[color:var(--color-primary-dark)]">
                <Users size={18} />
                <div className={STYLES.cardLabel}>Usuarios participantes</div>
              </div>
              <div className="mt-3 font-[family-name:var(--font-display)] text-5xl font-bold text-[color:var(--color-community)]">
                {uniqueUsers.size}
              </div>
            </div>

            <div className="rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-6 shadow-[6px_6px_0_var(--color-primary-dark)]">
              <div className="flex items-center gap-2 text-[color:var(--color-primary-dark)]">
                <FileText size={18} />
                <div className={STYLES.cardLabel}>Artículos comentados</div>
              </div>
              <div className="mt-3 font-[family-name:var(--font-display)] text-5xl font-bold text-[#C8B100]">
                {uniqueArticles.size}
              </div>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-center">
              <div className={STYLES.cardLabel}>De acuerdo</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--color-community)]">{agreedCount}</div>
            </div>
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-center">
              <div className={STYLES.cardLabel}>Parcialmente de acuerdo</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--color-community)]">{partiallyAgreedCount}</div>
            </div>
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-center">
              <div className={STYLES.cardLabel}>En desacuerdo</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--color-primary-dark)]">{disagreedCount}</div>
            </div>
            <div className="rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] p-4 text-center">
              <div className={STYLES.cardLabel}>Necesita más información</div>
              <div className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold text-[color:var(--color-primary-dark)]">{needInfoCount}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[color:var(--color-surface)]">
        <div className={`${STYLES.container} py-14 md:py-16`}>
          <h2 className={STYLES.h2}>Artículos destacados</h2>

          {articleRanking.length === 0 ? (
            <p className="mt-4 text-[color:var(--color-text-muted)]">Aún no hay aportes registrados.</p>
          ) : (
            <div className="mt-8 rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] shadow-[6px_6px_0_var(--color-primary-dark)]">
              {articleRanking.slice(0, 5).map((article, index) => (
                <Link
                  key={`${article.articleId}-${index}`}
                  href={`/articulo/${article.articleId}`}
                  className={`flex items-center justify-between gap-4 px-5 py-5 transition-colors duration-150 hover:bg-[color:var(--color-background)] ${index < 4 ? "border-b border-[color:var(--color-border)]" : ""}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[color:var(--color-background)] font-[family-name:var(--font-display)] text-lg font-bold text-[color:var(--color-primary-dark)]">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div>
                      <div className="font-[family-name:var(--font-display)] text-[22px] font-semibold leading-tight text-[color:var(--color-primary-dark)]">
                        {article.articleTitle}
                      </div>
                      <div className="mt-1 text-sm text-[color:var(--color-primary)]">{article.count} aportes</div>
                    </div>
                  </div>

                  <ArrowRight size={20} className="text-[color:var(--color-primary-dark)]" />
                </Link>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/explorar" className="font-[family-name:var(--font-display)] text-[16px] font-semibold text-[color:var(--color-primary)]">
              Ver todos los artículos →
            </Link>

            <div className="text-sm text-[color:var(--color-text-muted)]">
              Pendientes de conversación: {articlesWithoutContributions.length}
            </div>

            <div className="text-sm text-[color:var(--color-text-muted)]">
              Último artículo: {articleNumeroById.get(articles[articles.length - 1]?.id ?? -1) ?? "N/A"}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}