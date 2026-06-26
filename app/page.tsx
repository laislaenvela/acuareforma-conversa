"use client";
import { useEffect, useState, useMemo } from "react";
import { articles } from "./data/proposal.mock";
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

export default function Home() {
  const [contributions, setContributions] =
    useState<Contribution[]>([]);

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

  return (
    <main className="min-h-screen bg-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h1 className="text-5xl font-bold">
          Acuareforma Conversa
        </h1>

        <p className="mt-6 text-xl text-gray-600">
          Plataforma para comprender, dialogar y aportar a la reforma estatutaria.
        </p>

         

  <h2 className="text-3xl font-bold">
    Participación comunitaria
  </h2>

  <div className="mt-8 grid gap-4 md:grid-cols-3">

    <div className="rounded-xl border p-6">
      <div className="text-sm text-gray-500">
        Aportes registrados
      </div>

      <div className="mt-2 text-4xl font-bold">
        {contributions.length}
      </div>
    </div>

    <div className="rounded-xl border p-6">
      <div className="text-sm text-gray-500">
        Usuarios participantes
      </div>

      <div className="mt-2 text-4xl font-bold">
        {uniqueUsers.size}
      </div>
    </div>

    <div className="rounded-xl border p-6">
      <div className="text-sm text-gray-500">
        Artículos comentados
      </div>

      <div className="mt-2 text-4xl font-bold">
        {uniqueArticles.size}
      </div>
    </div>

  </div>
  <div className="mt-12">

  <h3 className="text-2xl font-semibold">
    Artículos más conversados
  </h3>

  {articleRanking.length === 0 ? (

    <p className="mt-4 text-gray-500">
      Aún no hay aportes registrados.
    </p>

  ) : (

    <div className="mt-6 flex flex-col gap-3">

      {articleRanking
        .slice(0, 5)
        .map((article, index) => (

          <div
            key={`${article.articleId}-${index}`}
            className="rounded-lg border p-4"
          >
            <div className="text-sm text-gray-500">
              #{index + 1}
            </div>

           <Link
  href={`/articulo/${article.articleId}`}
  className="font-semibold hover:underline"
>
  {article.articleTitle}
</Link>

            <div className="text-sm text-gray-600">
              {article.count} aportes
            </div>

          </div>

        ))}

    </div>

  )}

</div>
<div className="mt-12">

  <h3 className="text-2xl font-semibold">
    ¿Cómo se posiciona la comunidad?
  </h3>

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        De acuerdo
      </div>

      <div className="text-3xl font-bold">
        {agreedCount}
      </div>
    </div>

    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        Parcialmente de acuerdo
      </div>

      <div className="text-3xl font-bold">
        {partiallyAgreedCount}
      </div>
    </div>

    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        En desacuerdo
      </div>

      <div className="text-3xl font-bold">
        {disagreedCount}
      </div>
    </div>

    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        Necesita más información
      </div>

      <div className="text-3xl font-bold">
        {needInfoCount}
      </div>
    </div>

  </div>
<div className="mt-12">

  <h3 className="text-2xl font-semibold">
    Artículos pendientes de conversación
  </h3>

  {articlesWithoutContributions.length === 0 ? (

    <p className="mt-4 text-gray-500">
      Todos los artículos han recibido al menos un aporte.
    </p>

  ) : (

    <div className="mt-6 flex flex-col gap-3">

      {articlesWithoutContributions.map(
        (article) => (

          <div
            key={article.id}
            className="rounded-lg border p-4"
          >
            <div className="font-semibold">
              {article.title}
            </div>

            <div className="text-sm text-gray-500">
              Artículo {article.id}
            </div>

          </div>

        )
      )}

    </div>

  )}

</div>
</div>

    </section>
    </main>
  );
}