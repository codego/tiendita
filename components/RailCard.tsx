import Image from "next/image";
import Link from "next/link";
import { HeartButton } from "@/components/HeartButton";
import { ShareFindingButton } from "@/components/ShareFindingButton";
import { homeCopy } from "@/lib/home";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function RailCard({ sku }: { sku: Sku }) {
  return (
    <article className="w-[128px] shrink-0">
      <div className="relative aspect-[3/4] overflow-hidden rounded-md bg-cream">
        <Link href={routes.recientSku(sku.id)} className="absolute inset-0">
          <Image
            src={sku.image}
            alt={`${sku.brand} — ${sku.name}`}
            fill
            sizes="128px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />
        </Link>
        <span className="absolute top-2 left-2 z-10 rounded-full bg-terracotta px-1.5 py-0.5 font-sans text-[9px] font-semibold tracking-[0.12em] text-paper uppercase">
          {homeCopy.recientBadge}
        </span>
        <HeartButton
          skuId={sku.id}
          variant="onImage"
          className="absolute top-1.5 right-1.5 z-10"
        />
        <ShareFindingButton
          skuId={sku.id}
          variant="onImage"
          className="absolute top-9 right-1.5 z-10"
        />
        <Link href={routes.recientSku(sku.id)} className="absolute inset-x-0 bottom-0 z-10 px-1.5 pb-1.5">
          <p className="truncate font-sans text-[10px] font-medium tracking-wide text-paper uppercase">
            {sku.brand}
          </p>
          <p className="font-sans text-[12px] font-medium text-paper">
            {formatARS(sku.price_ars)}
          </p>
        </Link>
      </div>
    </article>
  );
}
