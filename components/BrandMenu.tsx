"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "@/components/Icons";
import { dashboardCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export function BrandMenu() {
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
          aria-label="Marcas"
          className="absolute top-11 right-0 z-30 w-56 rounded-2xl border border-ink/10 bg-paper py-2 shadow-[0_8px_24px_rgba(22,21,19,0.08)]"
        >
          <Link
            href={routes.marcasDashboard}
            className="block px-4 py-2.5 font-sans text-[14px] text-ink"
            onClick={() => setOpen(false)}
          >
            {dashboardCopy.title}
          </Link>
          <Link
            href={routes.marcasElegir}
            className="block px-4 py-2.5 font-sans text-[14px] text-ink"
            onClick={() => setOpen(false)}
          >
            {dashboardCopy.edit}
          </Link>
          <Link
            href={routes.landing}
            className="block px-4 py-2.5 font-sans text-[14px] text-ink"
            onClick={() => setOpen(false)}
          >
            {dashboardCopy.vitrina}
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
