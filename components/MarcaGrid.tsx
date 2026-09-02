"use client";

import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { TrackVisit } from "@/components/TrackVisit";
import { emptyMarca } from "@/lib/edges";
import { filterFeedSkus } from "@/lib/published";
import { routes } from "@/lib/routes";
import { usePublishedIds, usePublishedOverride } from "@/lib/usePublished";
import type { Sku } from "@/lib/types";

export function MarcaGrid({ skus, brand }: { skus: Sku[]; brand: string }) {
  const published = usePublishedIds();
  const override = usePublishedOverride();
  const visible = filterFeedSkus(skus, published, override);

  return (
    <>
      <TrackVisit brand={brand} />
      {visible.length === 0 ? (
        <div className="mt-10">
          <p className="max-w-[20ch] font-serif text-[28px] leading-snug text-ink">
            {emptyMarca.title}
          </p>
          <p className="mt-2 font-sans text-[15px] text-ink/65">
            {emptyMarca.body}
          </p>
          <Link
            href={routes.landing}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-ink/12 bg-cream px-8 font-sans text-[16px] text-terracotta"
          >
            {emptyMarca.cta}
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8">
          {visible.map((sku) => (
            <ProductCard key={sku.id} sku={sku} />
          ))}
        </div>
      )}
    </>
  );
}
