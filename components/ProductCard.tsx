import Image from "next/image";
import Link from "next/link";
import { HeartButton } from "@/components/HeartButton";
import { formatARS } from "@/lib/money";
import type { Sku } from "@/lib/types";

export function ProductCard({
  sku,
  showMeta = true,
}: {
  sku: Sku;
  showMeta?: boolean;
}) {
  const attributes = [sku.talle, sku.tela, sku.corte]
    .map((value) => value.toUpperCase())
    .join(" · ");

  return (
    <article>
      <Link href={`/pieza/${sku.id}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-none bg-cream">
          <Image
            src={sku.image}
            alt={`${sku.brand} — ${sku.name}`}
            fill
            sizes="(max-width: 430px) 50vw, 215px"
            className="object-cover"
          />
          <HeartButton
            skuId={sku.id}
            variant="overlay"
            className="absolute top-2.5 right-2.5"
          />
        </div>
        <div className="pt-2.5">
          <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-terracotta uppercase">
            {sku.brand}
          </p>
          <h3 className="mt-0.5 font-serif text-[17px] leading-tight text-ink">
            {sku.name}
          </h3>
          <p className="mt-1 font-mono text-[12px] tracking-tight text-ink">
            {formatARS(sku.price_ars)}
          </p>
          {showMeta ? (
            <p className="mt-1 font-mono text-[9px] tracking-[0.08em] text-ink/45 uppercase">
              {attributes}
            </p>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
