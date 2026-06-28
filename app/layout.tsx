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

      <div className="self-end text-left font-[family-name:var(--font-body)] text-sm text-[color:var(--color-primary-dark)] md:text-right">
        © 2026 Acueducto Comunitario Acuareforma
      </div>
    </div>
  </footer>
</body>
    </html>
  );
}
