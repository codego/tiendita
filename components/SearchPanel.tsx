"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { searchSkus } from "@/lib/catalog";
import { emptySearch } from "@/lib/edges";
import { routes } from "@/lib/routes";

export function SearchPanel({ initialQuery = "" }: { initialQuery?: string }) {
  const [query, setQuery] = useState(initialQuery);
  const results = useMemo(() => searchSkus(query), [query]);
  const searching = query.trim().length > 0;
  const empty = searching && results.length === 0;

  return (
    <div className="px-5 pb-10">
      <h1 className="font-serif text-[32px] leading-tight text-ink">Buscar</h1>
      <p className="mt-1 font-serif text-[16px] italic text-ink/70">
        Piezas, marcas, categorías.
      </p>
      <label className="mt-5 block">
        <span className="sr-only">Buscar piezas</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar marcas, prendas y más"
          className="h-12 w-full rounded-none border-b border-ink/20 bg-transparent font-sans text-[16px] text-ink outline-none placeholder:text-ink/35 focus:border-ink"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </label>
      {empty ? (
        <div
          role="status"
          aria-live="polite"
          className="mt-16 flex flex-col items-center text-center"
        >
          <p className="max-w-[16ch] font-serif text-[34px] leading-[1.1] text-ink">
            {emptySearch.title}
          </p>
          <Link
            href={routes.landing}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full border border-ink/12 bg-cream px-8 font-sans text-[16px] text-terracotta"
          >
            {emptySearch.cta}
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8">
          {results.map((sku) => (
            <ProductCard key={sku.id} sku={sku} />
          ))}
        </div>
      )}
    </div>
  );
}
