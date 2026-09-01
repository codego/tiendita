"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "@/components/Icons";
import { routes } from "@/lib/routes";

const items = [
  { href: routes.landing, label: "Feed" },
  { href: routes.queEs, label: "Qué es" },
  { href: routes.faq, label: "FAQ" },
  { href: routes.contacto, label: "Contacto" },
  { href: routes.marcas, label: "Marcas" },
] as const;

export function SiteMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-label="Menú"
        onClick={() => setOpen((value) => !value)}
        className="flex h-10 w-10 items-center justify-end text-ink"
      >
        <MenuIcon />
      </button>
      {open ? (
        <nav
          aria-label="Sitio"
          className="absolute top-11 right-0 z-30 w-48 rounded-2xl border border-ink/10 bg-paper py-2 shadow-[0_8px_24px_rgba(22,21,19,0.08)]"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-4 py-2.5 font-sans text-[14px] text-ink"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
