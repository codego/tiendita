"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "@/components/Icons";
import { dashboardCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export function BrandMenu({
  vitrinaHref,
  align = "right",
  variant = "menu",
}: {
  vitrinaHref: string;
  align?: "left" | "right";
  variant?: "menu" | "person";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Menú"
        onClick={() => setOpen((value) => !value)}
        className={`flex h-10 w-10 items-center text-ink ${
          align === "left" ? "justify-start" : "justify-end"
        }`}
      >
        {variant === "person" ? (
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-serif text-[15px] text-paper">
            C
          </span>
        ) : (
          <MenuIcon />
        )}
      </button>
      {open ? (
        <nav
          aria-label="Marcas"
          className={`absolute top-11 z-30 w-56 rounded-2xl border border-ink/10 bg-paper py-2 shadow-[0_8px_24px_rgba(22,21,19,0.08)] ${
            align === "left" ? "left-0" : "right-0"
          }`}
        >
          <Link
            href={routes.marcasElegir}
            className="block px-4 py-2.5 font-sans text-[14px] text-ink"
            onClick={() => setOpen(false)}
          >
            {dashboardCopy.pick}
          </Link>
          <Link
            href={vitrinaHref}
            className="block px-4 py-2.5 font-sans text-[14px] text-ink"
            onClick={() => setOpen(false)}
          >
            {dashboardCopy.vitrina}
          </Link>
          <a
            href={routes.marcasSalir}
            className="block px-4 py-2.5 font-sans text-[14px] text-ink"
          >
            {dashboardCopy.logout}
          </a>
        </nav>
      ) : null}
    </div>
  );
}
