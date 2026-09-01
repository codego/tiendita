"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { FilterChips } from "@/components/FilterChips";
import { ProductCard } from "@/components/ProductCard";
import { routes } from "@/lib/routes";
import type { Collection, Sku } from "@/lib/types";

export function CollectionGrid({
  collection,
  skus,
  filters,
}: {
  collection: Collection;
  skus: Sku[];
  filters: { id: string; label: string }[];
}) {
  const [active, setActive] = useState("todas");
  const visible = useMemo(
    () =>
      active === "todas" ? skus : skus.filter((sku) => sku.category === active),
    [active, skus],
  );

  return (
    <div className="px-5 pb-8">
      <p className="font-mono text-[11px] tracking-[0.16em] text-terracotta uppercase">
        Colección · {collection.number}
      </p>
      <h1 className="mt-2 font-serif text-[32px] leading-[1.05] text-ink">
        {collection.title}
      </h1>
      <p className="mt-2 font-serif text-[17px] italic text-ink/80">
        {collection.subtitle}
      </p>
      {collection.onTapa ? (
        <Link
          href={routes.compartir}
          className="mt-3 inline-flex font-sans text-[14px] text-ink underline underline-offset-2"
        >
          Compartir el look →
        </Link>
      ) : null}
      <div className="mt-5">
        <FilterChips filters={filters} active={active} onChange={setActive} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-8">
        {visible.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </div>
    </div>
  );
}
