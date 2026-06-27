import { STYLES } from "../lib/styles";

export default function ComparadorPage() {
  return (
    <main className={STYLES.page}>
      <section className={`${STYLES.container} py-12 md:py-16`}>
      <h1 className={STYLES.h1}>
        ¿Por qué existe Acuareforma Conversa?
      </h1>

      <p className={`${STYLES.subtitle} mt-4 max-w-3xl`}>
        Comprender un documento jurídico no siempre es sencillo.
        Esta plataforma fue creada para acercar la propuesta de reforma a la comunidad,
        facilitar su lectura y apoyar una conversación informada antes de opinar.
      </p>
      </section>
    </main>
  );
}