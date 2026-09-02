import { AppShell } from "@/components/AppShell";
import { ProductGridSkeleton } from "@/components/Skeleton";

export default function MarcaLoading() {
  return (
    <AppShell>
      <div className="px-5 pb-10 pt-2">
        <div className="h-2.5 w-14 animate-pulse rounded-full bg-terracotta/25" />
        <div className="mt-3 h-8 w-48 animate-pulse rounded-full bg-terracotta/20" />
        <div className="mt-3 h-4 w-56 max-w-full animate-pulse rounded-full bg-terracotta/15" />
        <ProductGridSkeleton
          count={4}
          className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8"
        />
      </div>
    </AppShell>
  );
}
