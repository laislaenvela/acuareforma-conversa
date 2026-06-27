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
      ? "font-semibold text-[color:var(--color-primary-dark)]"
      : STYLES.navLink;
  };

  return (
    <nav className="border-b border-[color:var(--color-border)] bg-[color:var(--color-surface)]">
      <div className={`${STYLES.container} py-4`}>

        <div className="flex items-center justify-between">

          <Link
  href="/"
  className="leading-none text-[color:var(--color-primary-dark)]"
>
  <div className="font-bold text-xl">
    Acuareforma
  </div>

  <div className="font-bold text-xl">
    conversa
  </div>
</Link>

          <button
            onClick={toggleMenu}
            className="text-2xl text-[color:var(--color-primary-dark)] md:hidden"
          >
            ☰
          </button>

          <div className="hidden gap-6 text-sm font-medium md:flex">
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
          <div className="mt-4 flex flex-col gap-3 border-t border-[color:var(--color-border)] pt-4 text-sm font-medium md:hidden">

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