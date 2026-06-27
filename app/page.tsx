"use client";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import type { Contribution } from "./lib/types";
import { getContributions } from "./lib/storage";
import { getArticles } from "./lib/data";
import type { Article } from "./lib/types";
import { STYLES } from "./lib/styles";
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
      <section className={`${STYLES.container} py-16 md:py-20`}>
        <div className={STYLES.sectionPlain}>
          <h1 className={STYLES.h1}>
            Acuareforma Conversa
          </h1>

          <p className={`${STYLES.subtitle} mt-5 max-w-3xl`}>
            Este es un espacio comunitario para comprender la propuesta de reforma estatutaria
            con una lectura clara y acompañada.
          </p>

          <p className={`${STYLES.subtitle} mt-3 max-w-3xl`}>
            Aquí puedes revisar los cambios, entender cómo se está dando la conversación
            y participar cuando tengas una opinión informada.
          </p>
        </div>

         

  <div className={STYLES.sectionAlt}>
  <h2 className={STYLES.h2}>
    Participación comunitaria
  </h2>

  <div className={`mt-8 ${STYLES.grid3}`}>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Aportes registrados
      </div>

      <div className={`mt-2 text-4xl font-bold ${STYLES.communityValue}`}>
        {contributions.length}
      </div>
    </div>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Usuarios participantes
      </div>

      <div className={`mt-2 text-4xl font-bold ${STYLES.communityValue}`}>
        {uniqueUsers.size}
      </div>
    </div>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Artículos comentados
      </div>

      <div className={`mt-2 text-4xl font-bold ${STYLES.communityValue}`}>
        {uniqueArticles.size}
      </div>
    </div>

  </div>
  </div>
  <div className={STYLES.sectionPlain}>

    <h3 className={STYLES.h3}>
    Artículos más conversados
  </h3>

  {articleRanking.length === 0 ? (

    <p className="mt-4 text-[color:var(--color-text-muted)]">
      Aún no hay aportes registrados.
    </p>

  ) : (

    <div className="mt-6 flex flex-col gap-3">

      {articleRanking
        .slice(0, 5)
        .map((article, index) => (

          <div
            key={`${article.articleId}-${index}`}
            className={STYLES.card}
          >
            <div className={STYLES.cardLabel}>
              #{index + 1}
            </div>

           <Link
  href={`/articulo/${article.articleId}`}
  className="font-semibold text-[color:var(--color-primary-dark)] transition-colors duration-150 hover:text-[color:var(--color-primary)]"
>
  {article.articleTitle}
</Link>

            <div className="mt-3 text-sm text-[color:var(--color-text-muted)]">
              {article.count} aportes
            </div>

          </div>

        ))}

    </div>

  )}

</div>
<div className={STYLES.sectionWarm}>

  <h3 className={STYLES.h3}>
    ¿Cómo se posiciona la comunidad?
  </h3>

  <div className={`mt-6 ${STYLES.grid2}`}>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        De acuerdo
      </div>

      <div className={`text-3xl font-bold ${STYLES.communityValuePositive}`}>
        {agreedCount}
      </div>
    </div>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Parcialmente de acuerdo
      </div>

      <div className={`text-3xl font-bold ${STYLES.communityValuePositive}`}>
        {partiallyAgreedCount}
      </div>
    </div>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        En desacuerdo
      </div>

      <div className="text-3xl font-bold text-[color:var(--color-primary-dark)]">
        {disagreedCount}
      </div>
    </div>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Necesita más información
      </div>

      <div className="text-3xl font-bold text-[color:var(--color-primary-dark)]">
        {needInfoCount}
      </div>
    </div>

  </div>
</div>
<div className={STYLES.sectionAlt}>

  <h3 className={STYLES.h3}>
    Artículos pendientes de conversación
  </h3>

  {articlesWithoutContributions.length === 0 ? (

    <p className="mt-4 text-[color:var(--color-text-muted)]">
      Todos los artículos han recibido al menos un aporte.
    </p>

  ) : (

    <details className={`mt-6 ${STYLES.card}`}>
      <summary className="cursor-pointer font-semibold text-[color:var(--color-primary-dark)]">
        Ver pendientes ({articlesWithoutContributions.length})
      </summary>

      <div className="mt-4 flex flex-col gap-3">

      {articlesWithoutContributions.map(
        (article) => (

          <div
            key={article.id}
            className={STYLES.card}
          >
            <div className={STYLES.cardTitle}>
              {article.title}
            </div>

            <div className="mt-2 text-sm text-[color:var(--color-text-muted)]">
              {articleNumeroById.get(article.id)
                ? `Artículo ${articleNumeroById.get(article.id)}`
                : "Preámbulo"}
            </div>

          </div>

        )
      )}

      </div>
    </details>

  )}

</div>

    </section>
    </main>
  );
}