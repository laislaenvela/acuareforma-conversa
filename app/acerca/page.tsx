import Image from "next/image";
import Link from "next/link";
import { STYLES } from "../lib/styles";

const eyebrow =
  "font-[family-name:var(--font-display)] text-xs font-semibold uppercase tracking-[0.08em] text-[color:var(--color-primary)]";
const lead = `${STYLES.body} mt-5 max-w-2xl`;
const photoFrame =
  "overflow-hidden rounded-2xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)]";
const panel =
  "mt-16 rounded-3xl border border-[color:var(--color-border)] bg-[color:var(--color-surface)] px-6 py-10 md:mt-24 md:px-8 md:py-12";
const pullQuote =
  "font-[family-name:var(--font-display)] text-[26px] font-bold leading-[1.2] tracking-[-0.01em] text-[color:var(--color-primary-dark)] md:text-[32px]";

const herramientas = [
  {
    title: "Aplicativo web",
    text: "para consultar la propuesta, explorar sus contenidos y registrar preguntas, opiniones e inquietudes.",
  },
  {
    title: "Infografías, cartillas y material pedagógico",
    text: "para facilitar la comprensión de los temas más complejos, acompañar las conversaciones y llevar los contenidos a diferentes espacios.",
  },

  {
    title: "Encuentros comunitarios",
    text: "dinamizados por una Red de Mediadores Pedagógicos, para llevar la conversación a distintos sectores de la comunidad.",
  },
];

// Cuando existan los enlaces de descarga, asignar `href` a cada material.
const materiales: { title: string; text: string; href?: string }[] = [
  {
    title: "Infografías de La Ruta",
    href: "https://drive.google.com/drive/folders/13HnytVIDgix0QXLn8ND7PMsYOL07AWkx?usp=drive_link",
    text: "Para entender la propuesta y el recorrido de La Ruta de un vistazo.",
  },
  {
    title: "Material de apoyo",
    href: "https://drive.google.com/drive/folders/1ngEJEklNBkm1Vw5zmYTES-vY69_-gztQ?usp=drive_link",
    text: "Guía para la mediación de los encuentros comunitarios, Glosario y preguntas frecuentes, Líneas rojas de la propuesta.",
  },
];

const capacidades = [
  "diseño",
  "pedagogía",
  "comunicación",
  "tecnología",
  "organización",
  "sistematización",
];

export default function AcercaPage() {
  return (
    <main className={STYLES.page}>
      <div className={`${STYLES.container} pb-20 pt-12 md:pb-28 md:pt-16`}>
        <header className="max-w-3xl">
          <p className={eyebrow}>Acerca de</p>
          <h1 className={`${STYLES.h1} mt-4`}>¿Por qué existe Acuareforma Conversa?</h1>
          <p className={`${STYLES.body} mt-6 text-[color:var(--color-text-muted)]`}>
            Comprender un documento jurídico no siempre es sencillo. Esta plataforma fue creada
            para acercar la propuesta de reforma a la comunidad, facilitar su lectura y apoyar una
            conversación informada antes de opinar.
          </p>
        </header>

        <section className="mt-16 grid items-center gap-10 md:mt-24 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6 lg:col-span-5">
            <h2 className={STYLES.h2}>Todo comenzó con una pregunta antes de votar</h2>
            <p className={lead}>
              En la primera asamblea convocada para discutir y votar la reforma estatutaria de ACUAREFORMA, algunas vecinas sentimos que necesitábamos un espacio para comprender mejor la propuesta antes de tomar una decisión.
            </p>
            <p className={`${STYLES.body} mt-4 max-w-2xl`}>
              Así nació el grupo de estudio <strong>“Comunidad, ¡abraza tu acueducto!”</strong>
              La intención era sencilla: encontrarnos, leer la propuesta, hacer preguntas y construir una comprensión común sobre los cambios que estaban siendo planteados.
No se trataba de llegar a una posición compartida, sino de contar con mejores condiciones para participar en una decisión que nos concernía a todas y todos.

            </p>
          </div>
          <figure className="md:col-span-6 lg:col-span-7">
            <div className={`${photoFrame} mt-10`}>
              <Image
                src="/images/acerca/encuentro-1.jpg"
                alt="Integrantes del grupo de estudio Comunidad, ¡abraza tu acueducto! reunidos"
                width={1600}
                height={1204}
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
            <div className={`${photoFrame} mt-4`}>
              <Image
                src="/images/acerca/encuentro-2.jpg"
                alt="Vecinas del grupo de estudio conversando y revisando la propuesta de reforma durante un encuentro"
                width={1280}
                height={717}
                sizes="(min-width: 1024px) 560px, (min-width: 768px) 50vw, 100vw"
                className="h-auto w-full"
              />
            </div>
            <figcaption className={`${STYLES.subtitle} mt-4`}>
              Comunidad, ¡abraza tu acueducto!
            </figcaption>
          </figure>
        </section>

        <section
          className={`${STYLES.sectionWarm} md:mt-24`}
          aria-labelledby="acerca-reto"
        >
          <div className="mx-auto max-w-3xl">
            <h2 id="acerca-reto" className={STYLES.h2}>
              Pero pronto descubrimos que el reto era más grande
            </h2>
            <p className={lead}>
              A medida que nos acercamos a la reforma estatutaria, entendimos que participar de manera informada no depende solamente de tener acceso a un documento.
Hay conceptos que necesitan ser explicados, preguntas que necesitan tiempo para aparecer y conversaciones que difícilmente caben en una sola asamblea.
Entonces apareció una pregunta más amplia:

            </p>
            <blockquote className="mt-8 border-l-4 border-[color:var(--color-primary)] pl-6">
              <p className={pullQuote}>
                ¿Cómo hacemos para que más personas de la comunidad puedan acercarse a estos cambios, comprenderlos y participar en ellos?
              </p>
            </blockquote>
          </div>
        </section>

        <section className="mt-16 md:mt-24" aria-labelledby="acerca-ruta">
          <div className="max-w-3xl">
        
            <h2 id="acerca-ruta" className={`${STYLES.h2} mt-3`}>
              De ahí nació La Ruta
            </h2>
            <p className={lead}>
              En la siguiente asamblea llevamos una propuesta: crear{" "}
              <strong>
                “La Ruta Pedagógica para la participación comunitaria en ACUAREFORMA.”
              </strong>
              Una estrategia para acercar la reforma estatutaria a la comunidad a través de diferentes herramientas y espacios:
            </p>
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
            <ol className="space-y-6 lg:col-span-6">
              {herramientas.map((item, index) => (
                <li key={item.title} className="flex gap-5">
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-primary)] font-[family-name:var(--font-display)] text-[18px] font-bold text-[color:var(--color-text-inverse)]"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className={STYLES.h3}>{item.title}</h3>
                    <p className={`${STYLES.cardBody} mt-2`}>{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="grid gap-6 lg:col-span-6">
              <figure className={photoFrame}>
                <Image
                  src="/images/acerca/grupo-comunidad.jpg"
                  alt="Encuentro comunitario en el que las personas conversan sobre la propuesta"
                  width={1152}
                  height={648}
                  sizes="(min-width: 1024px) 540px, 100vw"
                  className="h-auto w-full"
                />
              </figure>
              <figure className="sm:ml-10">
                <div className="grid grid-cols-2 items-start gap-4 lg:col-span-5">
              <figure className={`${photoFrame} mt-10`}>
                <Image
                  src="/images/acerca/cartilla-ruta.jpg"
                  alt="Cartilla de La Ruta para acompañar las conversaciones"
                  width={963}
                  height={1280}
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="h-auto w-full"
                />
              </figure>
              <figure className={`${photoFrame} mt-10`}>
                <Image
                  src="/images/acerca/material-ruta.jpg"
                  alt="Material pedagógico de La Ruta"
                  width={963}
                  height={1280}
                  sizes="(min-width: 1024px) 220px, 45vw"
                  className="h-auto w-full"
                />
              </figure>
            </div>
                <figcaption className={`${STYLES.subtitle} mt-3`}>
                  Encuentro comunitario de La Ruta
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className={panel} aria-labelledby="acerca-mediadores">
          <div className="mx-auto max-w-3xl">
            <h2 id="acerca-mediadores" className={STYLES.h2}>
              Una conversación que necesita muchas voces
            </h2>
            <p className={lead}>
              La Red de Mediadores Pedagógicos es una parte fundamental de La Ruta.
Son personas de la comunidad que han decidido disponer de manera voluntaria parte de su tiempo para acompañar los encuentros, facilitar la conversación y ayudar a acercar los materiales y herramientas a otras personas.
Es una labor que implica tiempo, escucha y capacidad para facilitar conversaciones sobre asuntos que no siempre son sencillos.
Por eso, <strong>la red necesita seguir fortaleciéndose.</strong>
Creemos que una tarea así no puede recaer en unas pocas personas. Necesitamos más manos, más voces y más personas dispuestas a acompañar el proceso.

            </p>
            <p
              className={`${STYLES.body} mt-8 rounded-2xl bg-[color:var(--color-sand)] p-6 font-semibold text-[color:var(--color-primary-dark)]`}
            >
              Si quieres conocer la Red de Mediadores Pedagógicos o hacer parte de ella, no dudes en ponerte en contacto a través de los canales oficiales de Acuareforma.

            </p>
          </div>
        </section>

        <section className="mt-16 md:mt-24" aria-labelledby="acerca-materiales">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <h2 id="acerca-materiales" className={STYLES.h2}>
                Materiales para seguir la conversación
              </h2>
              <p className={lead}>
                Estos son algunos de los materiales que hemos creado para acompañar el proceso de participación comunitaria.
              </p>

              <ul className="mt-8 space-y-4">
                {materiales.map((item) => (
                  <li key={item.title} className={`${STYLES.card} shadow-[6px_6px_0_var(--color-brand-primary)]`}>
                    <h3 className={STYLES.h3}>{item.title}</h3>
                    <p className={`${STYLES.cardBody} mt-2`}>{item.text}</p>
                    <div className="mt-4">
                      {item.href ? (
  <a
    href={item.href}
    target="_blank"
    rel="noopener noreferrer"
    className={STYLES.buttonSecondary}
  >
    {item.title === "Infografías de La Ruta" ? "Ver infografías" : "Ver materiales"}
  </a>
) : (
                        <span className={STYLES.badge}>Próximamente</span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            
          </div>
        </section>

        <section className={panel} aria-labelledby="acerca-materializan">
          <div className="mx-auto max-w-3xl">
            <h2 id="acerca-materializan" className={STYLES.h2}>
              ¿Cómo se materializan estas iniciativas?
            </h2>
            <p className={lead}>
              La Isla en Vela ha dispuesto, de manera voluntaria, conocimientos, herramientas y capacidades de la organización para contribuir a que estas iniciativas puedan hacerse realidad junto a otros vecinos y vecinas de la comunidad.
Diseño, pedagogía, comunicación, tecnología, organización y sistematización se han ido poniendo al servicio de una pregunta que compartimos con muchas otras personas de la comunidad:

            </p>
            
            <p className={`${pullQuote} mt-10`}>
              ¿Cómo fortalecemos nuestra capacidad para participar en las decisiones que tienen que ver con nuestro acueducto y con nuestro territorio?
            </p>
            <a
              href="https://laislaenvela.com/"
              target="_blank"
              rel="noopener noreferrer"
              className={`${STYLES.buttonPrimary} mt-8`}
            >
              Conoce La Isla en Vela →
            </a>
          </div>
        </section>

        <footer className="mt-16 text-center md:mt-24">
          <p className={STYLES.h3}>Acuareforma Conversa es una herramienta.</p>
          <p className={`${STYLES.h2} mt-2`}>La conversación la hacemos entre todas y todos.</p>
          <div className="mt-8">
            <Link href="/explorar" className={STYLES.buttonSecondary}>
              Explorar la propuesta
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
