"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Participant } from "@/app/lib/types";
import { POSITION_OPTIONS, CONTRIBUTION_TYPE_OPTIONS } from "@/app/lib/types";
import { getParticipant, addContribution } from "@/app/lib/storage";
import { STYLES } from "@/app/lib/styles";

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

  useEffect(() => {
    setParticipant(getParticipant());
    setLoaded(true);
  }, []);

  function handleSubmit() {
    const newContribution = {
      articleId,
      articleTitle,
      participantName: participant?.fullName,
      participantUser: participant?.userNumber,
      position: position as typeof POSITION_OPTIONS[number],
      contributionType: contributionType as typeof CONTRIBUTION_TYPE_OPTIONS[number],
      comment,
      justification,
      alternativeText,
      createdAt: new Date().toISOString(),
    };

    addContribution(newContribution);
    setSubmitted(true);
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

        <button
  onClick={handleSubmit}
  className={`mt-6 ${STYLES.buttonPrimary}`}
>
          Compartir aporte
        </button>

      </section>
    </>
  );
}