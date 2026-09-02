import { AppShell } from "@/components/AppShell";
import { ProductGridSkeleton } from "@/components/Skeleton";

export default function GuardadosLoading() {
  return (
    <AppShell header="none">
      <div className="px-5 pb-10 pt-2">
        <div className="h-8 w-40 animate-pulse rounded-full bg-terracotta/20" />
        <div className="mt-2 h-4 w-48 animate-pulse rounded-full bg-terracotta/15" />
        <ProductGridSkeleton
          count={4}
          className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8"
        />
      </div>
    </AppShell>
  );
}
