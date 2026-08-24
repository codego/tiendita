"use client";

import { useMemo, useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { CollectionBanner } from "@/components/CollectionBanner";
import { ProductCard } from "@/components/ProductCard";
import type { Collection, Sku } from "@/lib/types";

export function HomeFeed({
  collections,
  skus,
}: {
  collections: Collection[];
  skus: Sku[];
}) {
  const banner01 = collections.find((collection) => collection.onTapa);
  const rest = collections.filter((collection) => !collection.onTapa);
  const chips = collections.map((collection) => ({
    id: collection.id,
    label: collection.homeChip,
  }));
  const defaultId = banner01?.id ?? collections[0]?.id ?? "";
  const [active, setActive] = useState(defaultId);

  const visible = useMemo(
    () => skus.filter((sku) => sku.collection_id === active),
    [active, skus],
  );

  if (!banner01) return null;

  return (
    <div className="pb-10">
      <CollectionBanner
        collection={banner01}
        href="/coleccion"
        variant="hero"
      />
      <section className="px-5 pt-6">
        <p className="font-mono text-[10px] tracking-[0.18em] text-ink/40 uppercase">
          Categorías
        </p>
        <div className="mt-3">
          <CategoryChips chips={chips} active={active} onChange={setActive} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8">
          {visible.map((sku) => (
            <ProductCard key={sku.id} sku={sku} showMeta={false} />
          ))}
        </div>
      </section>
      <div className="mt-10 flex flex-col gap-4">
        {rest.map((collection) => (
          <CollectionBanner
            key={collection.id}
            collection={collection}
            href={`/coleccion/${collection.id}`}
            variant="split"
          />
        ))}
      </div>
    </div>
  );
}
