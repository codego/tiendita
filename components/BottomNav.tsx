"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HangerIcon, HeartIcon, HomeIcon, SearchIcon } from "@/components/Icons";
import { routes } from "@/lib/routes";

const items = [
  { href: routes.landing, label: "Inicio", icon: HomeIcon },
  { href: routes.coleccion, label: "Looks", icon: HangerIcon },
  { href: routes.buscar, label: "Buscar", icon: SearchIcon },
  { href: routes.guardados, label: "Guardados", icon: HeartIcon },
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sticky bottom-0 z-30 grid grid-cols-4 border-t border-ink/8 bg-cream pb-[env(safe-area-inset-bottom)]"
      aria-label="Principal"
    >
      {items.map((item) => {
        const active =
          item.href === routes.landing
            ? pathname === routes.landing
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 py-2.5 ${
              active ? "text-terracotta" : "text-ink/40"
            }`}
          >
            <Icon className="h-5 w-5" />
            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.14em]">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
