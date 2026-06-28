"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Participant } from "@/app/lib/types";
import { POSITION_OPTIONS, CONTRIBUTION_TYPE_OPTIONS } from "@/app/lib/types";
import { getParticipant } from "@/app/lib/storage";
import {
  getParticipantContributionsByArticle,
  registrarAporte,
} from "@/app/lib/data";
import { STYLES } from "@/app/lib/styles";

type ParticipationGateProps = {
  articleId: number;
  articleTitle: string;
  nextArticle: {
    id: number;
    title: string;
  } | null;
  onCompletionChange?: (completed: boolean) => void;
};

export default function ParticipationGate({
  articleId,
  articleTitle,
  nextArticle,
  onCompletionChange,
}: ParticipationGateProps) {
  const [participant, setParticipant] =
    useState<Participant | null>(null);

  const [loaded, setLoaded] = useState(false);
  const [position, setPosition] = useState("");

const [contributionType, setContributionType] =
  useState("");

const [comment, setComment] = useState("");

const [justification, setJustification] =
  useState("");

const [alternativeText, setAlternativeText] =
  useState("");

const [submitted, setSubmitted] =
  useState(false);

const [submitError, setSubmitError] =
  useState("");

const [isSubmitting, setIsSubmitting] =
  useState(false);

  const [articleParticipationCount, setArticleParticipationCount] =
    useState<number | null>(null);

  useEffect(() => {
    setParticipant(getParticipant());
    setLoaded(true);
  }, []);

  useEffect(() => {
    onCompletionChange?.(submitted);
  }, [submitted, onCompletionChange]);

  useEffect(() => {
    let isCancelled = false;

    async function loadParticipationStatus() {
      if (!participant?.email) {
        setArticleParticipationCount(null);
        return;
      }

      try {
        const contributions = await getParticipantContributionsByArticle(
          participant.email,
          articleId
        );

        if (!isCancelled) {
          setArticleParticipationCount(contributions.length);
        }
      } catch (error) {
        console.error("Error checking article participation status:", error);
        if (!isCancelled) {
          setArticleParticipationCount(null);
        }
      }
    }

    loadParticipationStatus();

    return () => {
      isCancelled = true;
    };
  }, [participant?.email, articleId]);

  async function handleSubmit() {
    if (!participant?.email || !participant.fullName || !participant.userNumber) {
      setSubmitError("Debes completar tu identificación antes de enviar un aporte.");
      return;
    }

    if (!position) {
      setSubmitError("Selecciona cómo te posicionas frente a este artículo.");
      return;
    }

    if (!contributionType) {
      setSubmitError("Selecciona el tipo de aporte que deseas compartir.");
      return;
    }

    if (!comment.trim()) {
      setSubmitError("Escribe tu aporte antes de enviarlo.");
      return;
    }

    setSubmitError("");
    setIsSubmitting(true);

    try {
      const newContribution = {
        articleId,
        articleTitle,
        participantName: participant.fullName,
        participantUser: participant.userNumber,
        position: position as typeof POSITION_OPTIONS[number],
        contributionType: contributionType as typeof CONTRIBUTION_TYPE_OPTIONS[number],
        comment: comment.trim(),
        justification: justification.trim(),
        alternativeText,
        createdAt: new Date().toISOString(),
      };

      const aportePayload = {
        participant: {
          name: participant.fullName,
          userCode: participant.userNumber,
          email: participant.email,
        },
        contribution: {
          articleId: newContribution.articleId,
          type: newContribution.contributionType,
          position: newContribution.position,
          content: newContribution.comment,
          justification: newContribution.justification,
          proposedText: newContribution.alternativeText,
          anonymous: false,
        },
      };

      await registrarAporte(aportePayload);

      setPosition("");
      setContributionType("");
      setComment("");
      setJustification("");
      setAlternativeText("");
      setSubmitted(true);
    } catch (error) {
      console.error("Error registering contribution:", error);
      setSubmitError(
        "No pudimos guardar tu aporte en este momento. Inténtalo de nuevo en unos minutos."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!loaded) {
    return null;
  }

  if (!participant) {
    return (
      <section className={`mt-12 ${STYLES.card}`}>
        <h2 className={STYLES.h2}>
          Participación
        </h2>

        <p className="mt-2 text-[color:var(--color-text-muted)]">
          Debes identificarte antes de participar.
        </p>

        <Link
          href="/participacion"
          className={`mt-4 ${STYLES.buttonSecondary}`}
        >
          Ir a Mi participación
        </Link>
      </section>
    );
  }
if (submitted) {
  return (
    <section className="mt-8 flex min-h-[55vh] items-center justify-center md:mt-12">
      <div className="w-full max-w-3xl rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-background-alt)] px-6 py-10 shadow-[10px_10px_0_var(--color-primary-dark)] md:px-10 md:py-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-community)] text-[color:var(--color-primary-dark)] md:h-16 md:w-16" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 7L9 18l-5-5" />
          </svg>
        </div>

        <h2 className="mt-6 text-center font-[family-name:var(--font-display)] text-[34px] font-bold leading-[1.05] tracking-[-0.02em] text-[color:var(--color-primary-dark)] md:text-[42px]">
          ¡Gracias por participar!
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center text-[17px] leading-[1.7] text-[color:var(--color-text-muted)] md:text-[18px]">
          Tu aporte fue registrado correctamente y hará parte del proceso de revisión de la propuesta. Puedes continuar revisando otros artículos o realizar otro aporte sobre este mismo si lo consideras necesario.
        </p>

        <div className="mt-8 flex flex-col gap-3">

        {nextArticle ? (
          <Link
            href={`/articulo/${nextArticle.id}`}
            className={`${STYLES.buttonPrimary} text-center`}
          >
            Continuar con el siguiente artículo
          </Link>
        ) : null}

        <button
          onClick={() => {
            setSubmitted(false);
            setSubmitError("");

            setPosition("");
            setContributionType("");

            setComment("");
            setJustification("");
            setAlternativeText("");
          }}
          className={STYLES.buttonSecondary}
        >
          Hacer otro aporte sobre este artículo
        </button>

        <Link
          href="/explorar"
          className={`${STYLES.buttonSecondary} text-center`}
        >
          Volver a explorar la propuesta
        </Link>

        </div>
      </div>

    </section>
  );
}
  return (
    <>
      <section className={`mt-12 ${STYLES.card}`}>

        <h2 className={STYLES.h2}>
          Mi participación
        </h2>

        <p className="mt-4 font-medium text-[color:var(--color-text)]">
          {participant.fullName}
        </p>

        <p className="text-sm text-[color:var(--color-text-muted)]">
          Usuario {participant.userNumber}
        </p>

        {articleParticipationCount && articleParticipationCount > 0 ? (
          <div className="mt-4 rounded-xl border border-[color:var(--color-border)] bg-[color:var(--color-background)] p-4">
            <p className="text-sm font-medium text-[color:var(--color-primary-dark)]">
              ✓ Ya participaste en este artículo.
            </p>

            <button
              type="button"
              className="mt-2 text-sm font-medium text-[color:var(--color-primary-dark)] underline decoration-[color:var(--color-border)] underline-offset-4 transition-colors duration-150 hover:text-[color:var(--color-primary)]"
            >
              {articleParticipationCount > 1 ? "Ver mis aportes" : "Ver mi aporte"}
            </button>
          </div>
        ) : null}

      </section>

      <section className={`mt-10 ${STYLES.card}`}>

        <h2 className={STYLES.h2}>
          ¿Cómo te posicionas?
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {POSITION_OPTIONS.map((pos) => (
            <label key={pos} className={`${STYLES.label} flex items-start gap-2`}>
              <input
                type="radio"
                name="position"
                value={pos}
                onChange={(e) => setPosition(e.target.value)}
                className="mt-1 accent-[color:var(--color-primary)]"
              /> {pos}
            </label>
          ))}
        </div>

      </section>

      <section className={`mt-10 ${STYLES.card}`}>

        <h2 className={STYLES.h2}>
          Comparte tu aporte
        </h2>

        <p className="mt-2 text-[color:var(--color-text-muted)]">
          Comparte tu perspectiva sobre este artículo para enriquecer la conversación comunitaria.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {CONTRIBUTION_TYPE_OPTIONS.map((type) => (
            <label key={type} className={`${STYLES.label} flex items-start gap-2`}>
              <input
                type="radio"
                name="contribution"
                value={type}
                onChange={(e) => setContributionType(e.target.value)}
                className="mt-1 accent-[color:var(--color-primary)]"
              /> {type}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Comparte tu pregunta, observación o comentario sobre este artículo."
          value={comment}
onChange={(e) => setComment(e.target.value)}
          className={`mt-6 min-h-32 ${STYLES.textarea}`}
        />

        <textarea
          placeholder="Puedes compartir experiencias, argumentos o ejemplos que ayuden a comprender mejor tu punto de vista. (Opcional)"
          value={justification}
onChange={(e) => setJustification(e.target.value)}
          className={`mt-4 min-h-32 ${STYLES.textarea}`}
        />

        <textarea
          placeholder="¿Tienes una propuesta de redacción alternativa? (Opcional)"
          value={alternativeText}
onChange={(e) => setAlternativeText(e.target.value)}
          className={`mt-4 min-h-32 ${STYLES.textarea}`}
        />

        {submitError ? (
          <p className="mt-4 text-sm text-[color:var(--color-primary-dark)]">
            {submitError}
          </p>
        ) : null}

        <button
  onClick={handleSubmit}
  disabled={isSubmitting}
  className={`mt-6 ${STYLES.buttonPrimary}`}
>
          {isSubmitting ? "Guardando aporte..." : "Compartir aporte"}
        </button>

      </section>
    </>
  );
}