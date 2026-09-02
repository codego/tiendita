"use client";

import { EmptyState } from "@/components/EmptyState";
import { HeartIcon } from "@/components/Icons";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/Skeleton";
import { getSku } from "@/lib/catalog";
import { emptyGuardados } from "@/lib/edges";
import { useHydrated } from "@/lib/useHydrated";
import { useSavedIds } from "@/lib/useSaved";

export function SavedGrid() {
  const ids = useSavedIds();
  const hydrated = useHydrated();
  const skus = ids.map((id) => getSku(id)).filter((sku) => sku != null);

  if (!hydrated) {
    return (
      <div className="px-5 pb-10 pt-2">
        <div className="skeleton-shimmer h-8 w-40 rounded-full" />
        <ProductGridSkeleton
          count={4}
          className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8"
        />
      </div>
    );
  }

  if (skus.length === 0) {
    return (
      <EmptyState
        title={emptyGuardados.title}
        body={emptyGuardados.body}
        cta={emptyGuardados.cta}
        wordmark="terracotta"
        icon={<HeartIcon className="h-12 w-12" />}
      />
    );
  }

  return (
    <div className="px-5 pb-10 pt-2">
      <h1 className="font-serif text-[32px] leading-tight text-ink">
        Guardados
      </h1>
      <p className="mt-1 font-serif text-[16px] italic text-ink/70">
        Lo que te quedaste mirando.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8">
        {skus.map((sku) => (
          <ProductCard key={sku.id} sku={sku} />
        ))}
      </div>
    </div>
  );
}
