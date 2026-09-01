import { AppShell } from "@/components/AppShell";
import { CatalogHome } from "@/components/CatalogHome";
import { getSkus } from "@/lib/catalog";
import { homeCopy } from "@/lib/home";
import { getAnocheForwarded, getTonightDrop, isForceDropParam } from "@/lib/las21";

export const metadata = {
  title: "Curadario — Marcas de TiendaNube",
  description: homeCopy.hero,
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ drop?: string }>;
}) {
  const { drop } = await searchParams;
  return (
    <AppShell header="none">
      <CatalogHome
        skus={getSkus()}
        forceDrop={isForceDropParam(drop)}
        drop={getTonightDrop()}
        anoche={getAnocheForwarded()}
        initialNow={Date.now()}
      />
    </AppShell>
  );
}
