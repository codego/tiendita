import Image from "next/image";
import Link from "next/link";
import { HeartButton } from "@/components/HeartButton";
import { homeCopy } from "@/lib/home";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function RailCard({ sku }: { sku: Sku }) {
  return (
    <article className="w-[128px] shrink-0">
      <Link
        href={routes.pieza(sku.id)}
        className="relative block aspect-[3/4] overflow-hidden rounded-md bg-cream"
      >
        <Image
          src={sku.image}
          alt={`${sku.brand} — ${sku.name}`}
          fill
          sizes="128px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
        <span className="absolute top-2 left-2 rounded-full bg-terracotta px-1.5 py-0.5 font-sans text-[9px] font-semibold tracking-[0.12em] text-paper uppercase">
          {homeCopy.recientBadge}
        </span>
        <HeartButton
          skuId={sku.id}
          variant="onImage"
          className="absolute top-1.5 right-1.5"
        />
        <div className="absolute inset-x-0 bottom-0 px-1.5 pb-1.5">
          <p className="truncate font-sans text-[10px] font-medium tracking-wide text-paper uppercase">
            {sku.brand}
          </p>
          <p className="font-sans text-[12px] font-medium text-paper">
            {formatARS(sku.price_ars)}
          </p>
        </div>
      </Link>
    </article>
  );
}
