"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { searchSkus } from "@/lib/catalog";

export function SearchPanel() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchSkus(query), [query]);

  return (
    <div className="px-5 pb-10">
      <h1 className="font-serif text-[32px] leading-tight text-ink">Buscar</h1>
      <p className="mt-1 font-serif text-[16px] italic text-ink/70">
        Piezas, marcas, telas.
      </p>
      <label className="mt-5 block">
        <span className="sr-only">Buscar piezas</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Tapado, lana, Recoleta…"
          className="h-12 w-full rounded-none border-b border-ink/20 bg-transparent font-sans text-[16px] text-ink outline-none placeholder:text-ink/35 focus:border-ink"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </label>
      {query.trim() && results.length === 0 ? (
        <p className="mt-8 font-sans text-[15px] text-ink/60">
          No hay piezas con eso.
        </p>
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
