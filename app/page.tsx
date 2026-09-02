import { AppShell } from "@/components/AppShell";
import { CatalogHome } from "@/components/CatalogHome";
import { getSkus } from "@/lib/catalog";
import { getAnocheForwarded } from "@/lib/las21";
import { homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata();

export default async function HomePage() {
  return (
    <AppShell header="none">
      <CatalogHome skus={getSkus()} anoche={getAnocheForwarded()} />
    </AppShell>
  );
}
