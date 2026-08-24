import { AppShell } from "@/components/AppShell";
import { HomeFeed } from "@/components/HomeFeed";
import { getCollections, getSkus } from "@/lib/catalog";

export default function HomePage() {
  return (
    <AppShell>
      <HomeFeed collections={getCollections()} skus={getSkus()} />
    </AppShell>
  );
}
