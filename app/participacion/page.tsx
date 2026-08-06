"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import type { Participant, Contribution, Article } from "../lib/types";
import { 
  getParticipant, 
  saveParticipant as saveParticipantToStorage, 
  clearParticipant as clearParticipantFromStorage
} from "../lib/storage";
import { getArticles, getParticipantContributionsByEmail } from "../lib/data";
import { STYLES } from "../lib/styles";

export default function ParticipacionPage() {
  const [participant, setParticipant] =
    useState<Participant | null>(() => getParticipant());
  const [contributions, setContributions] =
    useState<Contribution[]>([]);
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

  useEffect(() => {
    let isCancelled = false;

    async function loadContributions() {
      if (!participant?.email) {
        setContributions([]);
        return;
      }

      try {
        const loadedContributions = await getParticipantContributionsByEmail(
          participant.email
        );

        if (!isCancelled) {
          setContributions(loadedContributions);
        }
      } catch (error) {
        console.error("Error loading participant contributions:", error);

        if (!isCancelled) {
          setContributions([]);
        }
      }
    }

    loadContributions();

    return () => {
      isCancelled = true;
    };
  }, [participant?.email]);

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
      <section className="bg-[color:var(--color-surface)]">
        <div className={`${STYLES.container} pb-10 pt-10 md:pb-14 md:pt-12`}>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,18rem)] md:items-center md:gap-10">
            <div className="min-w-0 md:block">
              <div className="flex items-start gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                <h1 className="max-w-[10ch] flex-1 font-[family-name:var(--font-display)] text-[36px] font-bold leading-[1.03] text-[#5C74E8] sm:max-w-none sm:text-[40px] md:text-[56px]">
                Mi participación
                </h1>

                <div className="relative flex w-full max-w-[13rem] shrink-0 rotate-[-2deg] items-center justify-center overflow-hidden border border-[#E8C95E] bg-[#FFF7A8] p-4 shadow-[4px_4px_12px_rgba(var(--color-primary-rgb),0.35)] sm:max-w-[14rem] md:h-[220px] md:w-[15rem] md:max-w-none md:order-2">
                  <div className="absolute right-0 top-0 h-0 w-0 border-b-[24px] border-l-[24px] border-b-transparent border-l-[#E8C95E]" />
                  <div className="absolute left-3 top-3 h-4 w-4 rounded-full border border-[#D8B94A] bg-[#FFF7A8]" />
                  <div className="absolute bottom-3 right-3 h-5 w-5 rotate-12 rounded-full border border-[#D8B94A] bg-[#FFF7A8]" />
                  <p className="font-[family-name:var(--font-body)] text-[13px] font-semibold leading-5 text-[#5A4010] sm:text-[14px] md:text-[16px]">
                    “La conversación nos fortalece. Cada aporte cuenta y nos ayuda a construir acuerdos para toda la comunidad.”
                  </p>
                </div>
              </div>

              <p className="mt-4 max-w-[42rem] font-[family-name:var(--font-body)] text-[15px] font-semibold leading-[1.42] text-[color:var(--color-primary-dark)] sm:text-[16px] md:mt-5 md:text-[19px] md:leading-[1.48]">
                Aquí puedes ver cómo avanza tu participación sobre la propuesta y reconocer en qué artículos ya participaste. Este espacio te ayuda a organizar tus aportes para seguir dialogando con una comprensión más completa de la reforma.
              </p>
            </div>
          </div>
        </div>
      </section>










      <section className="mx-auto w-full max-w-3xl px-6 py-10 md:px-8 md:py-12">
     
      

      {!participant ? (
        <>
        <div className="mt-8 flex flex-col gap-4 rounded-2xl bg-[color:var(--color-surface-primary)] p-6 md:p-8">

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

            <p className="mt-1 text-sm leading-6 text-[color:var(--color-text-secondary)]">
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
        <p className="mt-4 text-sm leading-6 text-[color:var(--color-text-secondary)]">
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

          <p className="text-[color:var(--color-text-secondary)]">
            Usuario {participant.userNumber}
          </p>

          <p className="text-[color:var(--color-text-secondary)]">
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

      <div className="text-3xl font-bold text-[color:var(--color-text-primary)]">
        {disagreedCount}
      </div>
    </div>

  </div>

  <details className={`mt-6 ${STYLES.card}`}>
    <summary className="cursor-pointer list-none">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-medium uppercase tracking-wide text-[color:var(--color-text-secondary)]">
            Pendientes por revisar
          </div>
          <div className="mt-1 text-3xl font-bold text-[color:var(--color-text-primary)]">
            {pendingArticleList.length}
          </div>
        </div>

        <span className="text-sm font-medium text-[color:var(--color-text-secondary)]">
          Ver lista
        </span>
      </div>
    </summary>

    <p className="mt-3 text-sm text-[color:var(--color-text-secondary)]">
      Estos son los artículos que aún no tienen una participación registrada de tu parte.
      Selecciona uno para revisarlo y aportar.
    </p>

    {pendingArticleList.length === 0 ? (
      <p className="mt-4 text-sm text-[color:var(--color-text-secondary)]">
        Ya revisaste todos los artículos disponibles.
      </p>
    ) : (
      <div className="mt-4 flex flex-col gap-3">
        {pendingArticleList.map((article) => (
          <Link
            key={article.id}
            href={`/articulo/${article.id}`}
            className={`${STYLES.card} block transition-colors duration-150 hover:border-[color:var(--color-proposal)] shadow-[6px_6px_0_var(--color-primary)]`}
          >
            <div className="text-sm text-[color:var(--color-text-secondary)]">
              Artículo {article.numero}
            </div>

            <div className="mt-1 font-semibold text-[color:var(--color-text-primary)]">
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

  <summary className="cursor-pointer text-2xl font-semibold text-[color:var(--color-text-primary)]">
    Mis aportes ({userContributions.length})
  </summary>

  {userContributions.length === 0 ? (
    <p className="mt-4 text-[color:var(--color-text-secondary)]">
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
            <div className="text-sm text-[color:var(--color-text-secondary)]">
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

<div className="mt-1 text-xs text-[color:var(--color-text-secondary)]">
  {new Date(
    contribution.createdAt
  ).toLocaleString("es-CR")}
</div>

            <div className="mt-2 text-[color:var(--color-text-primary)]">
              {contribution.comment}
            </div>
            <Link
  href={`/articulo/${contribution.articleId}`}
  className="mt-4 inline-block text-[color:var(--color-text-primary)] transition-colors duration-150 hover:text-[color:var(--color-proposal)]"
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