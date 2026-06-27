"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Participant, ContributionPosition, ContributionType } from "@/app/lib/types";
import { POSITION_OPTIONS, CONTRIBUTION_TYPE_OPTIONS } from "@/app/lib/types";
import { getParticipant, addContribution } from "@/app/lib/storage";
import { STYLES } from "@/app/lib/styles";

type ParticipationGateProps = {
  articleId: number;
  articleTitle: string;
};

const positionMeta: Record<ContributionPosition, { activeClass: string; hoverClass: string; icon: string; desc: string }> = {
  "De acuerdo": {
    activeClass: "border-teal-500 bg-teal-50/30 text-teal-800 ring-2 ring-teal-500/20",
    hoverClass: "hover:border-teal-200 hover:bg-teal-50/10",
    icon: "👍",
    desc: "Apoyo la redacción propuesta."
  },
  "Parcialmente de acuerdo": {
    activeClass: "border-amber-500 bg-amber-50/20 text-amber-800 ring-2 ring-amber-500/20",
    hoverClass: "hover:border-amber-200 hover:bg-amber-50/10",
    icon: "🌗",
    desc: "Apoyo la idea general pero con ajustes."
  },
  "En desacuerdo": {
    activeClass: "border-rose-500 bg-rose-50/20 text-rose-800 ring-2 ring-rose-500/20",
    hoverClass: "hover:border-rose-200 hover:bg-rose-50/10",
    icon: "👎",
    desc: "No concuerdo con el texto o enfoque."
  },
  "Necesito más información": {
    activeClass: "border-sky-500 bg-sky-50/30 text-sky-850 ring-2 ring-sky-500/20",
    hoverClass: "hover:border-sky-200 hover:bg-sky-50/10",
    icon: "❓",
    desc: "Requiero aclaraciones antes de opinar."
  }
};

const typeMeta: Record<ContributionType, { activeClass: string; hoverClass: string; icon: string }> = {
  "Pregunta": {
    activeClass: "bg-sky-550 border-sky-500 text-sky-700 shadow-xs ring-2 ring-sky-500/20 font-semibold",
    hoverClass: "hover:border-sky-250 hover:bg-sky-50/20",
    icon: "❓"
  },
  "Observación": {
    activeClass: "bg-teal-50 border-teal-500 text-teal-700 shadow-xs ring-2 ring-teal-500/20 font-semibold",
    hoverClass: "hover:border-teal-250 hover:bg-teal-50/20",
    icon: "💡"
  },
  "Riesgo identificado": {
    activeClass: "bg-rose-50 border-rose-500 text-rose-700 shadow-xs ring-2 ring-rose-500/20 font-semibold",
    hoverClass: "hover:border-rose-250 hover:bg-rose-50/20",
    icon: "⚠️"
  },
  "Comentario de apoyo": {
    activeClass: "bg-emerald-50 border-emerald-500 text-emerald-750 shadow-xs ring-2 ring-emerald-500/20 font-semibold",
    hoverClass: "hover:border-emerald-250 hover:bg-emerald-50/20",
    icon: "✨"
  }
};

export default function ParticipationGate({
  articleId,
  articleTitle,
}: ParticipationGateProps) {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [position, setPosition] = useState<ContributionPosition | "">("");
  const [contributionType, setContributionType] = useState<ContributionType | "">("");
  const [comment, setComment] = useState("");
  const [justification, setJustification] = useState("");
  const [alternativeText, setAlternativeText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setParticipant(getParticipant());
    setLoaded(true);
  }, []);

  function handleSubmit() {
    if (!position || !contributionType || !comment.trim()) return;

    const newContribution = {
      articleId,
      articleTitle,
      participantName: participant?.fullName,
      participantUser: participant?.userNumber,
      position: position,
      contributionType: contributionType,
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
      <section className={`${STYLES.card} text-center border-dashed border-teal-200 mt-12 py-8`}>
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-teal-50 text-teal-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-slate-800">¿Deseas participar?</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
          Identifícate en la plataforma antes de agregar observaciones o comentarios a este artículo.
        </p>
        <Link
          href="/participacion"
          className={`${STYLES.btnPrimary} mt-6 px-6 py-2.5`}
        >
          Ir a Mi participación
        </Link>
      </section>
    );
  }

  if (submitted) {
    return (
      <section className={`${STYLES.card} text-center border-teal-200 bg-teal-50/5 mt-12 py-8`}>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-teal-100 text-teal-600 animate-bounce">
          <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h2 className="mt-4 text-2xl font-extrabold text-slate-800">¡Muchas gracias por participar!</h2>
        <p className="mt-2 text-sm text-slate-500 max-w-md mx-auto">
          Tu valioso aporte ha sido guardado exitosamente. Formará parte de los reportes consolidados de la comunidad.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              setSubmitted(false);
              setPosition("");
              setContributionType("");
              setComment("");
              setJustification("");
              setAlternativeText("");
            }}
            className={STYLES.btnPrimary}
          >
            Hacer otro aporte sobre este artículo
          </button>
          <Link
            href="/participacion"
            className={STYLES.btnSecondary}
          >
            Ir a Mi participación
          </Link>
        </div>
      </section>
    );
  }

  const isFormValid = position !== "" && contributionType !== "" && comment.trim() !== "";

  return (
    <div className="space-y-8 mt-12">
      {/* Participant info banner */}
      <div className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 font-bold text-sm">
            {participant.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Identificado como</div>
            <div className="text-sm font-semibold text-slate-700">
              {participant.fullName} <span className="text-slate-450 font-normal">(Usuario {participant.userNumber})</span>
            </div>
          </div>
        </div>
        <Link href="/participacion" className="text-xs text-teal-600 font-semibold hover:underline">
          Cambiar
        </Link>
      </div>

      {/* 1. Posicionamiento */}
      <section className={`${STYLES.card} border-slate-100`}>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-600">1</span>
          ¿Cuál es tu posición frente a la propuesta de este artículo?
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {POSITION_OPTIONS.map((pos) => {
            const isSelected = position === pos;
            const meta = positionMeta[pos];
            return (
              <button
                key={pos}
                type="button"
                onClick={() => setPosition(pos)}
                className={`flex flex-col text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected ? meta.activeClass : `border-slate-100 bg-white hover:border-slate-200 ${meta.hoverClass}`
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                    <span>{meta.icon}</span>
                    {pos}
                  </span>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-teal-600 ring-4 ring-teal-500/20" />
                  )}
                </div>
                <span className="mt-1 text-xs text-slate-500 leading-normal">
                  {meta.desc}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Tipo de aporte */}
      <section className={`${STYLES.card} border-slate-100`}>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-600">2</span>
          Selecciona el tipo de aporte
        </h2>
        <div className="mt-5 grid gap-3 grid-cols-2 sm:grid-cols-4">
          {CONTRIBUTION_TYPE_OPTIONS.map((type) => {
            const isSelected = contributionType === type;
            const meta = typeMeta[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => setContributionType(type)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer text-xs ${
                  isSelected ? meta.activeClass : `border-slate-100 bg-white hover:border-slate-200 ${meta.hoverClass} text-slate-650`
                }`}
              >
                <span className="text-xl mb-1">{meta.icon}</span>
                <span className="font-medium leading-tight">{type}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Comentarios */}
      <section className={`${STYLES.card} border-slate-100`}>
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-50 text-xs font-bold text-teal-600">3</span>
          Detalles de tu aporte
        </h2>
        <p className="mt-2 text-xs text-slate-400">
          Comparte tu perspectiva, justificaciones o propuestas para enriquecer el diálogo.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className={STYLES.label}>Comentario principal *</label>
            <textarea
              placeholder="Resume tu pregunta, observación o comentario sobre este artículo..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={STYLES.textarea}
              required
            />
          </div>

          <div>
            <label className={STYLES.label}>Justificación / Contexto (Opcional)</label>
            <textarea
              placeholder="Puedes detallar experiencias, argumentos o ejemplos que ayuden a comprender mejor tu punto de vista..."
              value={justification}
              onChange={(e) => setJustification(e.target.value)}
              className={STYLES.textarea}
            />
          </div>

          <div>
            <label className={STYLES.label}>Propuesta alternativa (Opcional)</label>
            <textarea
              placeholder="Si deseas sugerir una redacción o texto alternativo para este artículo, escríbelo aquí..."
              value={alternativeText}
              onChange={(e) => setAlternativeText(e.target.value)}
              className={STYLES.textarea}
            />
          </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-5 flex items-center justify-between">
          <span className="text-xs text-slate-400">* Campos obligatorios</span>
          <button
            onClick={handleSubmit}
            disabled={!isFormValid}
            className={`${STYLES.btnPrimary} px-6`}
          >
            <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            Compartir aporte
          </button>
        </div>
      </section>
    </div>
  );
}