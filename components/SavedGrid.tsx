"use client";

import { ProductCard } from "@/components/ProductCard";
import { getSku } from "@/lib/catalog";
import { useSavedIds } from "@/lib/useSaved";

export function SavedGrid() {
  const ids = useSavedIds();
  const skus = ids.map((id) => getSku(id)).filter((sku) => sku != null);

  if (skus.length === 0) {
    return (
      <p className="mt-8 font-sans text-[15px] text-ink/60">
        Todavía no guardaste piezas. El corazón en cada ficha las deja acá.
      </p>
    );
  }

  return (
    <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8">
      {skus.map((sku) => (
        <ProductCard key={sku.id} sku={sku} />
      ))}
    </div>
  );
}
