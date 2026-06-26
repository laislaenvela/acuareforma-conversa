"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  return (
    <nav className="border-b">
      <div className="mx-auto max-w-6xl p-4">

        <div className="flex items-center justify-between">

          <Link
  href="/"
  className="leading-none"
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
            className="md:hidden text-2xl"
          >
            ☰
          </button>

          <div className="hidden md:flex gap-6">
            <Link href="/">Inicio</Link>

            <Link href="/explorar">
              Explorar la propuesta
            </Link>

            <Link href="/participacion">
              Participación
            </Link>

            <Link href="/acerca">
              Acerca
            </Link>
          </div>

        </div>

        {open && (
          <div className="mt-4 flex flex-col gap-3 md:hidden">

            <Link href="/">
              Inicio
            </Link>

            <Link href="/explorar">
              Explorar la propuesta
            </Link>

            <Link href="/participacion">
              Participación
            </Link>

            <Link href="/acerca">
              Acerca
            </Link>

          </div>
        )}

      </div>
    </nav>
  );
}