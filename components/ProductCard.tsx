import Link from "next/link";
import { BrandNameLink } from "@/components/BrandNameLink";
import { HeartButton } from "@/components/HeartButton";
import { ProductPhoto } from "@/components/ProductPhoto";
import { ShareFindingButton } from "@/components/ShareFindingButton";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function ProductCard({
  sku,
  showMeta = true,
  dense = false,
}: {
  sku: Sku;
  showMeta?: boolean;
  dense?: boolean;
}) {
  const attributes = [sku.talle, sku.tela, sku.corte]
    .map((value) => value.toUpperCase())
    .join(" · ");

  return (
    <article>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2px] bg-cream">
        <Link href={routes.pieza(sku.id)} className="absolute inset-0">
          <ProductPhoto
            src={sku.image}
            alt={`${sku.brand} — ${sku.name}`}
            sizes="(max-width: 430px) 50vw, 215px"
          />
        </Link>
        <ShareFindingButton
          skuId={sku.id}
          variant="icon"
          className="absolute top-2 left-2 z-10"
        />
        <HeartButton
          skuId={sku.id}
          variant="overlay"
          className="absolute top-2 right-2 z-10"
        />
      </div>
      <div className={dense ? "pt-1.5" : "pt-2.5"}>
        <BrandNameLink
          brand={sku.brand}
          className={
            dense
              ? "block py-0.5 font-sans text-[11px] font-bold tracking-wide text-ink uppercase"
              : "block py-0.5 font-mono text-[10px] font-medium tracking-[0.14em] text-terracotta uppercase"
          }
        />
        <Link href={routes.pieza(sku.id)} className="block">
          <h3
            className={
              dense
                ? "mt-0.5 font-sans text-[13px] leading-snug text-ink"
                : "mt-0.5 font-serif text-[17px] leading-tight text-ink"
            }
          >
            {sku.name}
          </h3>
          <p
            className={
              dense
                ? "mt-0.5 font-sans text-[13px] font-bold tracking-tight text-terracotta"
                : "mt-1 font-mono text-[12px] tracking-tight text-ink"
            }
          >
            {formatARS(sku.price_ars)}
          </p>
          {showMeta ? (
            <p className="mt-1 font-mono text-[9px] tracking-[0.08em] text-ink/45 uppercase">
              {attributes}
            </p>
          ) : null}
        </Link>
        <ShareFindingButton skuId={sku.id} variant="link" />
      </div>
    </article>
  );
}
