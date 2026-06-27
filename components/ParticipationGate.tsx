"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Participant } from "@/app/lib/types";
import { POSITION_OPTIONS, CONTRIBUTION_TYPE_OPTIONS } from "@/app/lib/types";
import { registrarAporte } from "@/app/lib/data";
import { getParticipant } from "@/app/lib/storage";
import { STYLES } from "@/app/lib/styles";

const POSITION_VALUE_MAP = {
  "De acuerdo": "de_acuerdo",
  "Parcialmente de acuerdo": "parcialmente_de_acuerdo",
  "En desacuerdo": "en_desacuerdo",
  "Necesito más información": "necesito_mas_informacion",
} as const;

type ParticipationGateProps = {
  articleId: number;
  articleTitle: string;
};

export default function ParticipationGate({
  articleId,
  articleTitle,
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

  useEffect(() => {
    setParticipant(getParticipant());
    setLoaded(true);
  }, []);

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
      const normalizedComment = comment.trim();
      const normalizedJustification = justification.trim();
      const normalizedPosition = POSITION_VALUE_MAP[
        position as keyof typeof POSITION_VALUE_MAP
      ];

      if (!normalizedPosition) {
        setSubmitError("Selecciona una posición válida antes de enviar tu aporte.");
        setIsSubmitting(false);
        return;
      }

      await registrarAporte({
        participant: {
          name: participant.fullName,
          email: participant.email,
          userCode: participant.userNumber,
        },
        contribution: {
          articleId,
          type: contributionType as typeof CONTRIBUTION_TYPE_OPTIONS[number],
          position: normalizedPosition as never,
          content: normalizedComment,
          justification: normalizedJustification,
          proposedText: alternativeText,
          anonymous: false,
        },
      });

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
    <section className={`mt-12 ${STYLES.card}`}>

      <h2 className={STYLES.h2}>
        Gracias por participar
      </h2>

      <p className="mt-4 text-[color:var(--color-text-muted)]">
        Tu aporte fue guardado correctamente.
      </p>

      <div className="mt-6 flex flex-col gap-3">

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
          className={STYLES.buttonPrimary}
        >
          Hacer otro aporte sobre este artículo
        </button>

        <Link
  href="/participacion"
  className={`${STYLES.buttonSecondary} text-center`}
>
  Ir a Mi participación
</Link>

      </div>

    </section>
  );
}
  return (
    <>
      <section className={`mt-12 ${STYLES.card}`}>

        <h2 className={STYLES.h2}>
          Participando como:
        </h2>

        <p className="mt-4 font-medium text-[color:var(--color-text)]">
          {participant.fullName}
        </p>

        <p className="text-sm text-[color:var(--color-text-muted)]">
          Usuario {participant.userNumber}
        </p>

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