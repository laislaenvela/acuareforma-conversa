import Link from "next/link";
import ParticipationGate from "../../../components/ParticipationGate";
import { getArticles, getArticleById, getChapters } from "../../lib/data";
import type { Metadata } from "next";
import { createArticleMetadata } from "../../lib/metadata";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    id: article.id.toString(),
  }));
}

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(Number(id));

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
  const article = await getArticleById(Number(id));

if (!article) {
  return (
    <main className="p-8">
      <h1>Artículo no encontrado</h1>
    </main>
  );
}

const chapters = await getChapters();

console.log(article);
console.log(chapters);

const chapter = chapters.find(
  (c) => c.id === article.chapterId
);
const articles = await getArticles();
const articleIndex = articles.findIndex(
  (a) => a.id === article.id
);

const previousArticle =
  articleIndex > 0
    ? articles[articleIndex - 1]
    : null;

const nextArticle =
  articleIndex < articles.length - 1
    ? articles[articleIndex + 1]
    : null;
  return (
    <main className="mx-auto max-w-5xl p-8">

      <h1 className="text-4xl font-bold">
  {article.title}
</h1>

<p className="mt-3 text-lg text-gray-600">
  {article.numero
    ? `Artículo ${article.numero}`
    : "Preámbulo"}
</p>

<p className="mt-2 text-sm text-gray-500">
  Capítulo {chapter?.number} · {chapter?.title}
</p>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">
          ¿Qué cambia?
        </h2>

        <div className="mt-4 grid gap-6 md:grid-cols-2">

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Texto vigente
            </h3>

            <p className="mt-3 text-sm text-gray-700">
              {article.currentText}
            </p>
          </div>

          <div className="rounded-xl border p-6">
            <h3 className="font-semibold">
              Texto propuesto
            </h3>

            <p className="mt-3 text-sm text-gray-700">
              {article.proposedText}
            </p>
          </div>

        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">
          ¿Por qué se propone este cambio?
        </h2>

        <p className="mt-4 text-gray-700">
          {article.rationale}
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold">
          Pregunta para la comunidad
        </h2>

        <p className="mt-4 text-gray-700">
          {article.communityQuestion}
        </p>
      </section>


<ParticipationGate
  articleId={article.id}
  articleTitle={article.title}
/>
      <div className="mt-12 border-t pt-8">

  <div className="flex flex-col gap-4 text-center">

    {previousArticle && (
      <Link
        href={`/articulo/${previousArticle.id}`}
        className="rounded-lg border p-3 hover:bg-gray-50"
      >
        ← Artículo anterior
        <div className="text-sm text-gray-500">
          {previousArticle.title}
        </div>
      </Link>
    )}

    <Link
      href="/explorar"
      className="rounded-lg border p-3 hover:bg-gray-50"
    >
      Volver a la propuesta
    </Link>

    {nextArticle && (
      <Link
        href={`/articulo/${nextArticle.id}`}
        className="rounded-lg border p-3 hover:bg-gray-50"
      >
        Artículo siguiente →
        <div className="text-sm text-gray-500">
          {nextArticle.title}
        </div>
      </Link>
    )}

  </div>

</div>

    </main>
  );

}