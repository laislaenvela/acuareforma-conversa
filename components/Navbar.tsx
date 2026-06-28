"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { STYLES } from "@/app/lib/styles";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const getLinkClass = (href: string) => {
    const isActive = pathname === href;
    return isActive
      ? "font-[family-name:var(--font-display)] text-[15px] font-semibold text-[color:var(--color-primary)] underline decoration-[3px] underline-offset-8"
      : STYLES.navLink;
  };

  return (
    <nav className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <div className={`${STYLES.container} py-5`}>

        <div className="flex items-center justify-between">

          <Link
  href="/"
  className="leading-none text-[color:var(--color-primary-dark)]"
>
  <div className="font-[family-name:var(--font-display)] text-[29px] font-extrabold tracking-[-0.02em]">
    Acuareforma
  </div>

  <div className="font-[family-name:var(--font-display)] text-[29px] font-extrabold tracking-[-0.02em]">
    conversa
  </div>
</Link>

          <button
            onClick={toggleMenu}
            className="text-2xl text-[color:var(--color-primary-dark)] md:hidden"
          >
            ☰
          </button>

          <div className="hidden gap-8 md:flex">
            <Link href="/" className={getLinkClass("/")}>Inicio</Link>

            <Link href="/explorar" className={getLinkClass("/explorar")}>
              Explorar la propuesta
            </Link>

            <Link href="/participacion" className={getLinkClass("/participacion")}>
              Participación
            </Link>

            <Link href="/acerca" className={getLinkClass("/acerca")}>
              Acerca
            </Link>
          </div>

        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-3 border-t border-[color:var(--color-border)] pt-4 md:hidden">

            <Link href="/" className={getLinkClass("/")}>
              Inicio
            </Link>

            <Link href="/explorar" className={getLinkClass("/explorar")}>
              Explorar la propuesta
            </Link>

            <Link href="/participacion" className={getLinkClass("/participacion")}>
              Participación
            </Link>

            <Link href="/acerca" className={getLinkClass("/acerca")}>
              Acerca
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}