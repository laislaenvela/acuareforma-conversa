import Link from "next/link";
import { STYLES } from "../lib/styles";

export default function AcercaPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <div className={`${STYLES.container} max-w-3xl`}>
        
        {/* Header Section */}
        <header className="mb-10 text-center sm:text-left">
          <h1 className={STYLES.h1}>Acerca del Proyecto</h1>
          <p className={STYLES.subtitle}>
            Conoce el propósito, alcance y metodología detrás de la propuesta de reforma estatutaria del acueducto comunitario.
          </p>
        </header>

        {/* Content Body */}
        <div className="space-y-8 text-slate-700">
          
          {/* Section 1: Intro */}
          <section className={`${STYLES.card} border-slate-100 bg-white`}>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
              🏛️ ¿Qué es Acuareforma Conversa?
            </h2>
            <p className="text-sm leading-relaxed text-slate-650">
              Es una plataforma digital interactiva diseñada para promover la democracia directa, el diálogo constructivo y la transparencia en el proceso de actualización de los estatutos de nuestra asociación de acueducto comunitario.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-650">
              Los estatutos vigentes han regido el acueducto por años, pero los desafíos climáticos, legales y el crecimiento poblacional exigen modernizar las reglas de juego. Esta herramienta facilita que cada usuario estudie los cambios propuestos a su propio ritmo y comparta sus valiosos aportes.
            </p>
          </section>

          {/* Section 2: Core Pillars */}
          <section className="space-y-4">
            <h2 className={STYLES.h3}>Pilares Fundamentales de la Propuesta</h2>
            <p className="text-xs text-slate-450">Los temas estructurales sobre los que gira la reforma.</p>
            
            <div className="grid gap-4 sm:grid-cols-3">
              {/* Pillar 1 */}
              <div className="p-5 rounded-2xl bg-teal-50/20 border border-teal-100/50">
                <span className="text-2xl">💧</span>
                <h3 className="mt-2 text-sm font-bold text-teal-850">Cuidado del Recurso</h3>
                <p className="mt-1.5 text-xs text-teal-900/80 leading-relaxed">
                  Definición explícita de zonas de recarga hídrica, conservación de fuentes e incentivos para el consumo responsable.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-2xl bg-sky-50/30 border border-sky-100/50">
                <span className="text-2xl">🗳️</span>
                <h3 className="mt-2 text-sm font-bold text-sky-850">Gobernanza Democrática</h3>
                <p className="mt-1.5 text-xs text-sky-900/80 leading-relaxed">
                  Elección justa de dignatarios, rotación obligatoria de cargos y asambleas comunitarias con voto transparente.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/50">
                <span className="text-2xl">🛡️</span>
                <h3 className="mt-2 text-sm font-bold text-slate-800">Control Comunitario</h3>
                <p className="mt-1.5 text-xs text-slate-650 leading-relaxed">
                  Creación de comités de veeduría y fiscalización de cuentas claras en formatos de rendición pública semestral.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: How it works */}
          <section className={`${STYLES.card} border-slate-100 bg-white`}>
            <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-3">
              📝 ¿Cómo funciona tu participación?
            </h2>
            <ol className="space-y-3 text-sm text-slate-650 list-decimal pl-4">
              <li>
                <strong>Identificación:</strong> Regístrate brevemente en la sección de <Link href="/participacion" className="font-bold text-teal-650 hover:underline">Mi participación</Link> usando tu número de usuario del acueducto.
              </li>
              <li>
                <strong>Estudio comparativo:</strong> Entra al <Link href="/explorar" className="font-bold text-teal-650 hover:underline">Explorador</Link> y navega por los artículos. Verás el texto original, la propuesta de cambio, y las justificaciones técnicas o legales.
              </li>
              <li>
                <strong>Aportación:</strong> Selecciona tu postura (a favor, en contra, etc.), clasifica tu aporte (observación, riesgo, sugerencia) y escribe tu opinión o una redacción alternativa si lo deseas.
              </li>
            </ol>
          </section>

          {/* Section 4: Privacy */}
          <section className="rounded-2xl border border-dashed border-slate-250 bg-slate-50/20 p-6">
            <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2 mb-2">
              🔒 Privacidad de Datos y Almacenamiento Local
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Esta aplicación respeta tu derecho a la privacidad. Tus datos de identificación, tus comentarios y tus aportes **se guardan únicamente en el almacenamiento local de tu navegador (Local Storage)**. No se transmiten ni guardan en ningún servidor externo, y no se realiza rastreo comercial.
            </p>
            <p className="mt-2 text-xs text-slate-500 leading-relaxed">
              En las asambleas generales de la asociación se compilarán las opiniones de forma consolidada para refinar la propuesta final.
            </p>
          </section>

          {/* Call to action */}
          <div className="text-center pt-4">
            <Link href="/explorar" className={STYLES.btnPrimary}>
              Comenzar a explorar la propuesta
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}