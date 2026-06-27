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
import { STYLES } from "../lib/styles";

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

  const pendingArticleList = useMemo(() =>
    articles.filter((article) => !uniqueArticles.has(article.id)),
    [articles, uniqueArticles]
  );

  const articleNumeroById = useMemo(
    () => new Map(articles.map((article) => [article.id, article.numero])),
    [articles]
  );


  return (
    <main className={STYLES.page}>
      <section className="mx-auto w-full max-w-3xl px-6 py-12 md:px-8 md:py-16">
      <h1 className={STYLES.h1}>
        La conversación de la comunidad
      </h1>

      <p className={`${STYLES.subtitle} mt-4 max-w-2xl`}>
        Aquí puedes ver cómo avanza la conversación sobre la propuesta y reconocer en qué
        artículos ya participaste. Este espacio te ayuda a organizar tus aportes para
        seguir dialogando con una comprensión más completa de la reforma.
      </p>

      {!participant ? (
        <>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[color:var(--color-background-alt)] p-6 md:p-8">

          <input
            type="text"
            placeholder="Nombre completo"
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value)
            }
            className={STYLES.input}
          />

          <div>
            <input
              type="text"
              placeholder="Número de usuario"
              value={userNumber}
              onChange={(e) =>
                setUserNumber(e.target.value)
              }
              className={STYLES.input}
            />

            <label className={`mt-2 block ${STYLES.label}`}>
              Número de usuario
            </label>

            <p className="mt-1 text-sm leading-6 text-[color:var(--color-text-muted)]">
              Código de usuario (aparece en la factura del servicio de agua). Escríbelo exactamente como aparece, incluyendo los ceros iniciales.
            </p>
          </div>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className={STYLES.input}
          />

          <button
            onClick={saveParticipant}
            className={STYLES.buttonPrimary}
          >
            Guardar identificación
          </button>

        </div>
        <p className="mt-4 text-sm leading-6 text-[color:var(--color-text-muted)]">
          Tus datos serán utilizados únicamente para gestionar tu participación en el proceso
          de revisión de la reforma estatutaria. Puedes consultar aquí nuestra Política de
          Tratamiento de Datos.
        </p>
        </>
      ) : (
        <div className={`mt-8 ${STYLES.card}`}>

          <h2 className={STYLES.h2}>
            Participando como:
          </h2>

          <p className="mt-4 text-base font-medium">
            {participant.fullName}
          </p>

          <p className="text-[color:var(--color-text-muted)]">
            Usuario {participant.userNumber}
          </p>

          <p className="text-[color:var(--color-text-muted)]">
            {participant.email}
          </p>

          <button
            onClick={clearParticipant}
            className={`mt-6 ${STYLES.buttonSecondary}`}
          >
            Cambiar usuario
          </button>
          <div className={`${STYLES.sectionWarm} ${STYLES.divider}`}>

  <h2 className={STYLES.h2}>
    Resumen de participación
  </h2>

  <div className={`mt-6 ${STYLES.grid2}`}>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Aportes realizados
      </div>

      <div className={`text-3xl font-bold ${STYLES.communityValue}`}>
        {userContributions.length}
      </div>
    </div>

    <div className={STYLES.communityCard}>
      <div className={STYLES.cardLabel}>
        Artículos opinados
      </div>

      <div className={`text-3xl font-bold ${STYLES.communityValue}`}>
        {articlesWithOpinion}
      </div>
    </div>

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

  </div>

  <details className={`mt-6 ${STYLES.card}`}>
    <summary className="cursor-pointer list-none">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-[color:var(--color-text-muted)]">
            Pendientes por revisar
          </div>
          <div className="mt-1 text-3xl font-bold text-[color:var(--color-primary-dark)]">
            {pendingArticleList.length}
          </div>
        </div>

        <span className="text-sm font-medium text-[color:var(--color-text-muted)]">
          Ver lista
        </span>
      </div>
    </summary>

    <p className="mt-3 text-sm text-[color:var(--color-text-muted)]">
      Estos son los artículos que aún no tienen una participación registrada de tu parte.
      Selecciona uno para revisarlo y aportar.
    </p>

    {pendingArticleList.length === 0 ? (
      <p className="mt-4 text-sm text-[color:var(--color-text-muted)]">
        Ya revisaste todos los artículos disponibles.
      </p>
    ) : (
      <div className="mt-4 flex flex-col gap-3">
        {pendingArticleList.map((article) => (
          <Link
            key={article.id}
            href={`/articulo/${article.id}`}
            className={`${STYLES.card} block transition-colors duration-150 hover:border-[color:var(--color-primary)]`}
          >
            <div className="text-sm text-[color:var(--color-text-muted)]">
              Artículo {article.numero}
            </div>

            <div className="mt-1 font-semibold text-[color:var(--color-primary-dark)]">
              {article.title}
            </div>
          </Link>
        ))}
      </div>
    )}
  </details>

</div>
          <div className={`${STYLES.sectionAlt} ${STYLES.divider}`}>

  <details className="mt-10">

  <summary className="cursor-pointer text-2xl font-semibold text-[color:var(--color-primary-dark)]">
    Mis aportes ({userContributions.length})
  </summary>

  {userContributions.length === 0 ? (
    <p className="mt-4 text-[color:var(--color-text-muted)]">
      Aún no has realizado aportes.
    </p>
  ) : (
    <div className="mt-6 flex flex-col gap-4">

      {userContributions.map(
        (contribution, index) => (
          <div
            key={index}
            className={STYLES.card}
          >
            <div className="text-sm text-[color:var(--color-text-muted)]">
              {articleNumeroById.get(contribution.articleId)
                ? `Artículo ${articleNumeroById.get(contribution.articleId)}`
                : "Preámbulo"}
            </div>

            <div className="font-semibold">
              {contribution.articleTitle}
            </div>

            <div className="mt-2 text-sm">
  {contribution.contributionType}
</div>

<div className="mt-1 text-xs text-[color:var(--color-text-muted)]">
  {new Date(
    contribution.createdAt
  ).toLocaleString("es-CR")}
</div>

            <div className="mt-2 text-[color:var(--color-text)]">
              {contribution.comment}
            </div>
            <Link
  href={`/articulo/${contribution.articleId}`}
  className="mt-4 inline-block text-[color:var(--color-primary-dark)] transition-colors duration-150 hover:text-[color:var(--color-primary)]"
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
      </section>
    </main>
  );
}