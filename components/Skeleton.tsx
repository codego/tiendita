export function CardSkeleton({ dense = false }: { dense?: boolean }) {
  return (
    <article aria-hidden="true">
      <div
        className={`skeleton-shimmer aspect-[3/4] ${
          dense ? "rounded-[2px]" : "rounded-[2px]"
        }`}
      />
      <div className={dense ? "space-y-1.5 pt-1.5" : "space-y-2 pt-2.5"}>
        <div className="skeleton-shimmer h-2.5 w-16 rounded-full" />
        <div className="skeleton-shimmer h-3.5 w-24 rounded-full" />
        <div className="skeleton-shimmer h-3 w-14 rounded-full" />
      </div>
    </article>
  );
}

export function ProductGridSkeleton({
  count = 8,
  dense = false,
  className = "mt-3 grid grid-cols-2 gap-x-2 gap-y-4 px-3",
}: {
  count?: number;
  dense?: boolean;
  className?: string;
}) {
  return (
    <div className={className} aria-busy="true" aria-label="Cargando">
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} dense={dense} />
      ))}
    </div>
  );
}

export function RecienRailSkeleton() {
  return (
    <section className="pt-4" aria-busy="true" aria-label="Cargando Recién">
      <div className="px-4">
        <div className="skeleton-shimmer h-4 w-36 rounded-full" />
      </div>
      <div className="mt-2 flex gap-2 overflow-hidden px-4 pb-1">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="w-[128px] shrink-0">
            <div className="skeleton-shimmer aspect-[3/4] rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function HomeFeedSkeleton() {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-surface shadow-[0_0_0_1px_rgba(22,21,19,0.06)]">
        <div className="px-4 pt-3">
          <div className="flex items-center gap-3">
            <div className="skeleton-shimmer h-6 w-28 shrink-0 rounded-full" />
            <div className="h-11 min-w-0 flex-1 rounded-full bg-cream" />
          </div>
          <div className="mt-3 h-4 w-64 max-w-full rounded-full">
            <div className="skeleton-shimmer h-4 w-full rounded-full" />
          </div>
        </div>
        <div className="mx-4 mt-4 h-20 rounded-md">
          <div className="skeleton-shimmer h-full rounded-md" />
        </div>
        <div className="mt-3 flex gap-2 overflow-hidden px-4">
          {Array.from({ length: 5 }, (_, index) => (
            <div
              key={index}
              className="skeleton-shimmer h-8 w-20 shrink-0 rounded-full"
            />
          ))}
        </div>
        <RecienRailSkeleton />
        <ProductGridSkeleton count={8} dense />
      </div>
    </div>
  );
}
