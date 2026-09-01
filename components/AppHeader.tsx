import Link from "next/link";
import { HeartButton } from "@/components/HeartButton";
import { BackIcon, HeartIcon, SearchIcon } from "@/components/Icons";
import { Wordmark } from "@/components/Wordmark";
import { routes } from "@/lib/routes";

type AppHeaderProps = {
  variant?: "default" | "overlay" | "ficha";
  skuId?: string;
};

export function AppHeader({ variant = "default", skuId }: AppHeaderProps) {
  const overlay = variant === "overlay";
  const ficha = variant === "ficha";

  return (
    <header
      className={`relative z-20 flex h-14 items-center justify-between px-4 ${
        overlay ? "text-ink" : "bg-surface text-ink"
      }`}
    >
      {ficha ? (
        <Link
          href={routes.coleccion}
          aria-label="Volver a la colección"
          className="flex h-10 w-10 items-center justify-start"
        >
          <BackIcon />
        </Link>
      ) : (
        <Link
          href={routes.buscar}
          aria-label="Buscar"
          className="flex h-10 w-10 items-center justify-start"
        >
          <SearchIcon />
        </Link>
      )}
      <Link href={routes.landing} className="absolute left-1/2 -translate-x-1/2">
        <Wordmark />
      </Link>
      {ficha && skuId ? (
        <HeartButton skuId={skuId} variant="plain" className="justify-end" />
      ) : (
        <Link
          href={routes.guardados}
          aria-label="Guardados"
          className="flex h-10 w-10 items-center justify-end"
        >
          <HeartIcon />
        </Link>
      )}
    </header>
  );
}
