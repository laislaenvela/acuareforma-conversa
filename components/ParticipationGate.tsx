"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Participant } from "@/app/lib/types";
import { POSITION_OPTIONS, CONTRIBUTION_TYPE_OPTIONS } from "@/app/lib/types";
import { getParticipant, addContribution } from "@/app/lib/storage";

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
      <section className="mt-12 rounded-xl border p-6">
        <h2 className="text-2xl font-semibold">
          Participación
        </h2>

        <p className="mt-2 text-gray-600">
          Debes identificarte antes de participar.
        </p>

        <Link
          href="/participacion"
          className="mt-4 inline-block rounded-lg border px-4 py-2"
        >
          Ir a Mi participación
        </Link>
      </section>
    );
  }
if (submitted) {
  return (
    <section className="mt-12 rounded-xl border p-6">

      <h2 className="text-2xl font-semibold">
        Gracias por participar
      </h2>

      <p className="mt-4 text-gray-600">
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
          className="rounded-lg bg-black px-4 py-2 text-white"
        >
          Hacer otro aporte sobre este artículo
        </button>

        <Link
  href="/participacion"
  className="rounded-lg border px-4 py-2 text-center"
>
  Ir a Mi participación
</Link>

      </div>

    </section>
  );
}
  return (
    <>
      <section className="mt-12 rounded-xl border p-6">

        <h2 className="text-2xl font-semibold">
          Participando como:
        </h2>

        <p className="mt-4 font-medium">
          {participant.fullName}
        </p>

        <p className="text-sm text-gray-500">
          Usuario {participant.userNumber}
        </p>

      </section>

      <section className="mt-10 rounded-xl border p-6">

        <h2 className="text-2xl font-semibold">
          ¿Cómo te posicionas?
        </h2>

        <div className="mt-6 flex flex-col gap-3">
          {POSITION_OPTIONS.map((pos) => (
            <label key={pos}>
              <input
                type="radio"
                name="position"
                value={pos}
                onChange={(e) => setPosition(e.target.value)}
              /> {pos}
            </label>
          ))}
        </div>

      </section>

      <section className="mt-10 rounded-xl border p-6">

        <h2 className="text-2xl font-semibold">
          Comparte tu aporte
        </h2>

        <p className="mt-2 text-gray-600">
          Comparte tu perspectiva sobre este artículo para enriquecer la conversación comunitaria.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {CONTRIBUTION_TYPE_OPTIONS.map((type) => (
            <label key={type}>
              <input
                type="radio"
                name="contribution"
                value={type}
                onChange={(e) => setContributionType(e.target.value)}
              /> {type}
            </label>
          ))}
        </div>

        <textarea
          placeholder="Comparte tu pregunta, observación o comentario sobre este artículo."
          value={comment}
onChange={(e) => setComment(e.target.value)}
          className="mt-6 min-h-32 w-full rounded-lg border p-3"
        />

        <textarea
          placeholder="Puedes compartir experiencias, argumentos o ejemplos que ayuden a comprender mejor tu punto de vista. (Opcional)"
          value={justification}
onChange={(e) => setJustification(e.target.value)}
          className="mt-4 min-h-32 w-full rounded-lg border p-3"
        />

        <textarea
          placeholder="¿Tienes una propuesta de redacción alternativa? (Opcional)"
          value={alternativeText}
onChange={(e) => setAlternativeText(e.target.value)}
          className="mt-4 min-h-32 w-full rounded-lg border p-3"
        />

        <button
  onClick={handleSubmit}
  className="mt-6 rounded-lg bg-black px-5 py-3 text-white"
>
          Compartir aporte
        </button>

      </section>
    </>
  );
}