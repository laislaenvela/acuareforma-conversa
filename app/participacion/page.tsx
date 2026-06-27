"use client";

import Link from "next/link";
import { useEffect, useState, useMemo } from "react";
import { articles } from "../data/proposal";
import type { Participant, Contribution } from "../lib/types";
import { 
  getParticipant, 
  saveParticipant as saveParticipantToStorage, 
  clearParticipant as clearParticipantFromStorage,
  getContributions 
} from "../lib/storage";
import { STYLES } from "../lib/styles";
import StatCard from "@/components/StatCard";

export default function ParticipacionPage() {
  const [participant, setParticipant] = useState<Participant | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const [fullName, setFullName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setParticipant(getParticipant());
    setContributions(getContributions());
  }, []);

  function saveParticipant() {
    if (!fullName.trim() || !userNumber.trim() || !email.trim()) return;
    const data = {
      fullName: fullName.trim(),
      userNumber: userNumber.trim(),
      email: email.trim(),
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
        contribution.participantUser === participant?.userNumber
    ),
    [contributions, participant?.userNumber]
  );

  const agreedCount = useMemo(() =>
    userContributions.filter((c) => c.position === "De acuerdo").length,
    [userContributions]
  );

  const partiallyAgreedCount = useMemo(() =>
    userContributions.filter((c) => c.position === "Parcialmente de acuerdo").length,
    [userContributions]
  );

  const disagreedCount = useMemo(() =>
    userContributions.filter((c) => c.position === "En desacuerdo").length,
    [userContributions]
  );

  const needInfoCount = useMemo(() =>
    userContributions.filter((c) => c.position === "Necesito más información").length,
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
  const pendingArticles = totalArticles - articlesWithOpinion;

  const positionBadgeMap: Record<string, string> = {
    "De acuerdo": STYLES.badgeTeal,
    "Parcialmente de acuerdo": STYLES.badgeOrange,
    "En desacuerdo": STYLES.badgeGray,
    "Necesito más información": STYLES.badgeBlue,
  };

  const typeBadgeMap: Record<string, string> = {
    "Pregunta": "bg-sky-50 text-sky-700 ring-1 ring-sky-600/10",
    "Observación": "bg-teal-50 text-teal-700 ring-1 ring-teal-600/10",
    "Riesgo identificado": "bg-rose-50 text-rose-700 ring-1 ring-rose-600/10",
    "Comentario de apoyo": "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10",
  };

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className={`${STYLES.container} max-w-4xl`}>
        
        {/* Header */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className={STYLES.h1}>Mi participación</h1>
          <p className={STYLES.subtitle}>
            Identifícate en el sistema para aportar tu opinión sobre los estatutos. 
            Tus datos se almacenan de forma local en tu navegador para proteger tu privacidad.
          </p>
        </header>

        {!participant ? (
          /* Login Card Form */
          <div className="mx-auto max-w-md mt-12">
            <div className={`${STYLES.card} border-slate-100 p-8 shadow-lg bg-white relative overflow-hidden`}>
              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-sky-600" />
              
              <h2 className="text-xl font-bold text-slate-800 text-center mb-6">Identificación de Usuario</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className={STYLES.label}>Nombre completo</label>
                  <div className="relative">
                    <input
                      id="fullName"
                      type="text"
                      placeholder="Ej. Juan Pérez"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className={STYLES.input}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="userNumber" className={STYLES.label}>Número de usuario</label>
                  <input
                    id="userNumber"
                    type="text"
                    placeholder="Ej. 1045"
                    value={userNumber}
                    onChange={(e) => setUserNumber(e.target.value)}
                    className={STYLES.input}
                  />
                  <p className="mt-1 text-[10px] text-slate-400">
                    Número único asignado por el acueducto comunitario.
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className={STYLES.label}>Correo electrónico</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={STYLES.input}
                  />
                </div>

                <button
                  onClick={saveParticipant}
                  disabled={!fullName.trim() || !userNumber.trim() || !email.trim()}
                  className={`${STYLES.btnPrimary} w-full mt-6 py-3.5`}
                >
                  Entrar a participar
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* User Profile Dashboard */
          <div className="space-y-8">
            
            {/* Profile banner */}
            <div className={`${STYLES.card} border-slate-100 bg-white shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6`}>
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-sky-650 text-white font-extrabold text-xl shadow-md shadow-teal-500/20">
                  {participant.fullName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{participant.fullName}</h2>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                    <span className="flex items-center gap-1">
                      👤 Usuario: <strong className="text-slate-700">{participant.userNumber}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      ✉️ {participant.email}
                    </span>
                  </div>
                </div>
              </div>
              
              <button
                onClick={clearParticipant}
                className={STYLES.btnSecondary}
              >
                Cambiar de usuario
              </button>
            </div>

            {/* Participation Metrics Grid */}
            <section className="space-y-4">
              <h3 className={STYLES.h3}>Resumen de aportes</h3>
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                <StatCard label="Aportes totales" value={userContributions.length} />
                <StatCard label="Artículos comentados" value={articlesWithOpinion} />
                <StatCard label="Pendientes de opinión" value={pendingArticles} />
                <StatCard label="De acuerdo" value={agreedCount} />
                <StatCard label="Parcialmente" value={partiallyAgreedCount} />
                <StatCard label="En desacuerdo" value={disagreedCount} />
              </div>
            </section>

            {/* User contribution lists */}
            <section className="space-y-4">
              <h3 className={STYLES.h3}>Historial de mis aportes</h3>
              
              {userContributions.length === 0 ? (
                <div className={`${STYLES.card} text-center border-slate-100 p-8`}>
                  <div className="text-3xl mb-2">✍️</div>
                  <p className="text-slate-500 text-sm">Aún no has realizado aportes en la propuesta.</p>
                  <Link href="/explorar" className="mt-4 inline-block text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline">
                    Explorar la propuesta para opinar →
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {userContributions.map((contribution, index) => (
                    <div
                      key={index}
                      className="rounded-2xl border border-slate-100 bg-white p-5 hover:shadow-xs transition-shadow duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-50">
                        <div>
                          <span className="text-[10px] font-bold text-teal-600 uppercase tracking-wider block">
                            Artículo {contribution.articleId}
                          </span>
                          <h4 className="font-bold text-slate-800 text-sm mt-0.5">
                            {contribution.articleTitle}
                          </h4>
                        </div>
                        <div className="flex flex-wrap gap-2 items-center">
                          <span className={`${positionBadgeMap[contribution.position] || STYLES.badgeGray} text-[10px] py-0.5 px-2 rounded-full font-bold`}>
                            {contribution.position}
                          </span>
                          <span className={`${typeBadgeMap[contribution.contributionType] || STYLES.badgeGray} text-[10px] py-0.5 px-2 rounded-full font-semibold`}>
                            {contribution.contributionType}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Comentario</div>
                        <p className="mt-1 text-slate-700 text-sm leading-relaxed whitespace-pre-line">
                          {contribution.comment}
                        </p>
                      </div>

                      {contribution.justification && (
                        <div className="mt-3 bg-slate-50/50 rounded-xl p-3">
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Justificación</div>
                          <p className="mt-1 text-slate-650 text-xs leading-relaxed">
                            {contribution.justification}
                          </p>
                        </div>
                      )}

                      {contribution.alternativeText && (
                        <div className="mt-3 bg-teal-50/10 border border-teal-100/50 rounded-xl p-3">
                          <div className="text-[10px] font-bold text-teal-600 uppercase tracking-wider">Propuesta Alternativa</div>
                          <p className="mt-1 text-slate-700 text-xs italic font-serif leading-relaxed">
                            "{contribution.alternativeText}"
                          </p>
                        </div>
                      )}

                      <div className="mt-5 flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400 font-medium">
                          {new Date(contribution.createdAt).toLocaleDateString("es-CR", {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                        <Link
                          href={`/articulo/${contribution.articleId}`}
                          className="font-bold text-teal-600 hover:text-teal-700 hover:underline flex items-center gap-1"
                        >
                          Ir al artículo
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

          </div>
        )}
      </div>
    </main>
  );
}