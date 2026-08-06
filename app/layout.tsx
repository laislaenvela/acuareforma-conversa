import type { Metadata } from "next";
import { Sora, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { defaultMetadata } from "@/app/lib/metadata";

const sora = Sora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${sourceSans.variable} h-full antialiased`}
    >
     <body className="flex min-h-full flex-col bg-[color:var(--color-background)] text-[color:var(--color-text)]">
  <Navbar />
  <div className="flex-1">{children}</div>

  <footer className="mt-16 border-t border-[color:var(--color-border)] bg-[color:var(--color-background)]">
    <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-12 md:grid-cols-3 md:px-8 md:py-14">
      <div>
        <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none tracking-[-0.02em] text-[color:var(--color-primary-dark)]">
          Acuareforma
        </div>
        <div className="font-[family-name:var(--font-display)] text-3xl font-extrabold leading-none tracking-[-0.02em] text-[color:var(--color-primary-dark)]">
          conversa
        </div>
      </div>

      <div className="font-[family-name:var(--font-body)] text-[16px] leading-7 text-[color:var(--color-primary-dark)]">
        Una herramienta comunitaria para comprender la propuesta de reforma,
        dialogar con respeto y construir decisiones informadas.
      </div>

      <div className="self-end flex w-full flex-col items-end font-[family-name:var(--font-body)] text-sm text-right text-[color:var(--color-primary-dark)]">
        <div className="mb-1 w-full text-right">Desarrollado por</div>
        <a
          href="https://laislaenvela.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-[color:var(--color-link)] transition-colors duration-150 hover:text-[color:var(--color-link-hover)]"
        >
          <img
            src="/graficos/la-isla-en-vela-logo.png"
            alt="Logo de La Isla en Vela"
            className="h-[100px] w-auto"
          />
        </a>
      </div>
    </div>
  </footer>
</body>
    </html>
  );
}
