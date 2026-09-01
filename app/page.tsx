import { AppShell } from "@/components/AppShell";
import { CatalogHome } from "@/components/CatalogHome";
import { getSkus } from "@/lib/catalog";
import { homeCopy } from "@/lib/home";

export const metadata = {
  title: "Curadario — Marcas de TiendaNube",
  description: homeCopy.hero,
};

export default function HomePage() {
  return (
    <AppShell header="none">
      <CatalogHome skus={getSkus()} />
    </AppShell>
  );
}
