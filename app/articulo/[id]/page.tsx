import Link from "next/link";
import ParticipationGate from "../../../components/ParticipationGate";
import { articles, chapters } from "../../data/proposal";
import type { Metadata } from "next";
import { createArticleMetadata } from "../../lib/metadata";
import { STYLES } from "../../lib/styles";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return createArticleMetadata(article.title, article.currentText);
}

export default async function ArticuloPage({
  params,
}: Props) {
  const { id } = await params;
  const article = articles.find((a) => a.id === Number(id));

  if (!article) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Artículo no encontrado</h1>
        <Link href="/explorar" className="mt-4 inline-block text-teal-600 hover:underline">
          Volver a la propuesta
        </Link>
      </main>
    );
  }

  const chapter = chapters.find((c) => c.id === article.chapterId);
  const articleIndex = articles.findIndex((a) => a.id === article.id);

  const previousArticle = articleIndex > 0 ? articles[articleIndex - 1] : null;
  const nextArticle = articleIndex < articles.length - 1 ? articles[articleIndex + 1] : null;

  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className={`${STYLES.container} max-w-4xl`}>
        
        {/* Navigation Breadcrumbs */}
        <nav className="mb-6 flex items-center gap-2 text-xs font-semibold text-slate-400">
          <Link href="/explorar" className="hover:text-teal-600 transition-colors">Propuesta</Link>
          <span>/</span>
          <span className="truncate max-w-[200px]" title={chapter?.title}>Cap. {chapter?.number}</span>
          <span>/</span>
          <span className="text-slate-650">Artículo {article.id}</span>
        </nav>

        {/* Header Block */}
        <header className="mb-10">
          <div className="flex flex-wrap gap-2 items-center mb-3">
            <span className="inline-flex items-center rounded-lg bg-teal-50 px-2.5 py-0.5 text-xs font-bold text-teal-700 ring-1 ring-inset ring-teal-600/10">
              Artículo {article.id}
            </span>
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Capítulo {chapter?.number} · {chapter?.title}
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {article.title}
          </h1>
        </header>

        {/* Content sections */}
        <div className="space-y-8">
          
          {/* Comparison Cards: Current vs Proposed */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              📜 Comparación de Textos
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Texto Vigente Card */}
              <div className={`${STYLES.card} border-slate-100 bg-white relative overflow-hidden`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-slate-200" />
                <h3 className="font-bold text-slate-400 text-xs uppercase tracking-wider mb-3">
                  Texto Vigente
                </h3>
                <p className="text-sm text-slate-700 font-serif leading-relaxed bg-slate-50/20 p-4 rounded-xl border border-slate-50/50">
                  {article.currentText}
                </p>
              </div>

              {/* Texto Propuesto Card */}
              <div className={`${STYLES.card} border-teal-100 bg-teal-50/5 relative overflow-hidden`}>
                <div className="absolute top-0 left-0 right-0 h-1 bg-teal-500" />
                <h3 className="font-bold text-teal-600 text-xs uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Texto Propuesto</span>
                  <span className="text-[10px] bg-teal-100/60 text-teal-800 py-0.5 px-2 rounded-full font-bold">Cambio</span>
                </h3>
                <p className="text-sm text-slate-800 font-serif leading-relaxed bg-teal-50/10 p-4 rounded-xl border border-teal-100/30">
                  {article.proposedText}
                </p>
              </div>
            </div>
          </section>

          {/* Rationale Callout Box */}
          <section className="rounded-2xl bg-sky-50/40 border border-sky-100/50 p-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-sky-500/5" />
            <h2 className="text-sm font-bold text-sky-850 flex items-center gap-2 uppercase tracking-wider mb-2">
              💡 ¿Por qué se propone este cambio?
            </h2>
            <p className="text-sm text-sky-900/90 leading-relaxed font-medium">
              {article.rationale}
            </p>
          </section>

          {/* Community Question Callout Box */}
          <section className="rounded-2xl bg-teal-50/30 border border-teal-100/50 p-6 relative overflow-hidden">
            <div className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full bg-teal-500/5" />
            <h2 className="text-sm font-bold text-teal-850 flex items-center gap-2 uppercase tracking-wider mb-2">
              💬 Pregunta orientadora para la comunidad
            </h2>
            <p className="text-sm text-teal-900/90 leading-relaxed font-semibold italic">
              "{article.communityQuestion}"
            </p>
          </section>

          {/* Participation Feedback Portal */}
          <ParticipationGate
            articleId={article.id}
            articleTitle={article.title}
          />

          {/* Bottom Prev/Next navigation cards */}
          <div className="mt-12 border-t border-slate-200/60 pt-8">
            <div className="grid gap-4 sm:grid-cols-2">
              
              {previousArticle ? (
                <Link
                  href={`/articulo/${previousArticle.id}`}
                  className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-teal-100 hover:shadow-xs transition-all duration-200 group text-left flex flex-col justify-center"
                >
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                    ← Artículo anterior
                  </span>
                  <span className="mt-1 text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors line-clamp-1">
                    {previousArticle.title}
                  </span>
                </Link>
              ) : (
                <div className="p-4 rounded-2xl border border-dashed border-slate-100 bg-slate-50/50 text-slate-400 text-xs font-semibold flex items-center justify-center">
                  Primer artículo de la propuesta
                </div>
              )}

              {nextArticle ? (
                <Link
                  href={`/articulo/${nextArticle.id}`}
                  className="p-4 rounded-2xl border border-slate-100 bg-white hover:border-teal-100 hover:shadow-xs transition-all duration-200 group text-right flex flex-col justify-center"
                >
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-teal-600 transition-colors uppercase tracking-wider">
                    Artículo siguiente →
                  </span>
                  <span className="mt-1 text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors line-clamp-1">
                    {nextArticle.title}
                  </span>
                </Link>
              ) : (
                <div className="p-4 rounded-2xl border border-dashed border-slate-100 bg-slate-50/50 text-slate-400 text-xs font-semibold flex items-center justify-center">
                  Último artículo de la propuesta
                </div>
              )}

            </div>

            <div className="mt-6 text-center">
              <Link
                href="/explorar"
                className="inline-flex items-center gap-1.5 text-sm font-bold text-teal-600 hover:text-teal-700 hover:underline"
              >
                📁 Volver al explorador de la propuesta
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}