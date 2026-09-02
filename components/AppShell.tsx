import { AppHeader } from "@/components/AppHeader";
import { BottomNav } from "@/components/BottomNav";
import { ShopperChrome } from "@/components/ShopperChrome";
import { ShopperOnboarding } from "@/components/ShopperOnboarding";

type AppShellProps = {
  children: React.ReactNode;
  header?: "default" | "overlay" | "ficha" | "none";
  headerSkuId?: string;
  nav?: boolean;
  className?: string;
};

export function AppShell({
  children,
  header = "default",
  headerSkuId,
  nav = true,
  className = "",
}: AppShellProps) {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-surface shadow-[0_0_0_1px_rgba(22,21,19,0.06)]">
        {header === "overlay" ? (
          <div className="absolute top-0 right-0 left-0 z-20">
            <AppHeader variant="overlay" />
          </div>
        ) : header !== "none" ? (
            <AppHeader variant={header} skuId={headerSkuId} />
        ) : null}
        <main className={`flex min-h-0 flex-1 flex-col ${className}`}>
          {children}
        </main>
        {nav ? <BottomNav /> : null}
        <ShopperOnboarding />
        <ShopperChrome />
      </div>
    </div>
  );
}
