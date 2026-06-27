"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import type { Participant, Contribution, Article } from "../lib/types";
import { 
  getParticipant, 
  saveParticipant as saveParticipantToStorage, 
  clearParticipant as clearParticipantFromStorage,
  getContributions 
} from "../lib/storage";
import { getArticles } from "../lib/data";

export default function ParticipacionPage() {
  const [participant, setParticipant] =
    useState<Participant | null>(() => getParticipant());
  const [contributions] =
    useState<Contribution[]>(() => getContributions());
  const [articles, setArticles] = useState<Article[]>([]);

  const [fullName, setFullName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [email, setEmail] = useState("");

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

  function saveParticipant() {
    const data = {
      fullName,
      userNumber,
      email,
    };

    saveParticipantToStorage(data);
    setParticipant(data);
  }

  function clearParticipant() {
    clearParticipantFromStorage();
    setParticipant(null);
    setFullName("");
    setUserNumber("");
    setEmail("");
  }

  const userContributions = useMemo(() =>
    contributions.filter(
      (contribution) =>
        contribution.participantUser ===
        participant?.userNumber
    ),
    [contributions, participant?.userNumber]
  );

  const agreedCount = useMemo(() =>
    userContributions.filter((c) => c.position === "De acuerdo").length,
    [userContributions]
  );

  const partiallyAgreedCount = useMemo(() =>
    userContributions.filter(
      (c) => c.position === "Parcialmente de acuerdo"
    ).length,
    [userContributions]
  );

  const disagreedCount = useMemo(() =>
    userContributions.filter((c) => c.position === "En desacuerdo").length,
    [userContributions]
  );

  const uniqueArticles = useMemo(() =>
    new Set(userContributions.map((c) => c.articleId)),
    [userContributions]
  );

  const articlesWithOpinion = useMemo(() =>
    uniqueArticles.size,
    [uniqueArticles]
  );

  const totalArticles = articles.length;
  const pendingArticles =
    totalArticles - articlesWithOpinion;


  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-4xl font-bold">
        Mi participación
      </h1>

      <p className="mt-4 text-gray-600">
        Identifícate una sola vez para participar
        en la conversación sobre la propuesta de
        reforma estatutaria.
      </p>

      {!participant ? (
        <div className="mt-8 flex flex-col gap-4">

          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            placeholder="Número de usuario"
            value={userNumber}
            onChange={(e) =>
              setUserNumber(e.target.value)
            }
            className="rounded-lg border p-3"
          />

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="rounded-lg border p-3"
          />

          <button
            onClick={saveParticipant}
            className="rounded-lg bg-black px-5 py-3 text-white"
          >
            Guardar identificación
          </button>

        </div>
      ) : (
        <div className="mt-8 rounded-xl border p-6">

          <h2 className="text-2xl font-semibold">
            Participando como:
          </h2>

          <p className="mt-4">
            {participant.fullName}
          </p>

          <p>
            Usuario {participant.userNumber}
          </p>

          <p>
            {participant.email}
          </p>

          <button
            onClick={clearParticipant}
            className="mt-6 rounded-lg border px-4 py-2"
          >
            Cambiar usuario
          </button>
          <div className="mt-10 border-t pt-8">

  <h2 className="text-2xl font-semibold">
    Resumen de participación
  </h2>

  <div className="mt-6 grid gap-4 md:grid-cols-2">

    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        Aportes realizados
      </div>

      <div className="text-3xl font-bold">
        {userContributions.length}
      </div>
    </div>

    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">
        Artículos opinados
      </div>

      <div className="text-3xl font-bold">
        {articlesWithOpinion}
      </div>
    </div>

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
        Pendientes de opinión
      </div>

      <div className="text-3xl font-bold">
        {pendingArticles}
      </div>
    </div>

  </div>

</div>
          <div className="mt-10 border-t pt-8">

  <details className="mt-10">

  <summary className="cursor-pointer text-2xl font-semibold">
    Mis aportes ({userContributions.length})
  </summary>

  {userContributions.length === 0 ? (
    <p className="mt-4 text-gray-600">
      Aún no has realizado aportes.
    </p>
  ) : (
    <div className="mt-6 flex flex-col gap-4">

      {userContributions.map(
        (contribution, index) => (
          <div
            key={index}
            className="rounded-lg border p-4"
          >
            <div className="text-sm text-gray-500">
              Artículo {contribution.articleId}
            </div>

            <div className="font-semibold">
              {contribution.articleTitle}
            </div>

            <div className="mt-2 text-sm">
  {contribution.contributionType}
</div>

<div className="mt-1 text-xs text-gray-500">
  {new Date(
    contribution.createdAt
  ).toLocaleString("es-CR")}
</div>

            <div className="mt-2 text-gray-700">
              {contribution.comment}
            </div>
            <Link
  href={`/articulo/${contribution.articleId}`}
  className="mt-4 inline-block text-blue-600 hover:underline"
>
  Ver artículo →
</Link>
          </div>
        )
      )}

    </div>
  )}
  </details>

</div>
        
        </div>
      )}
    </main>
  );
}