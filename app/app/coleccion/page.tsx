import { AppShell } from "@/components/AppShell";
import { CollectionGrid } from "@/components/CollectionGrid";
import {
  getCollectionFilters,
  getTapaCollection,
  getTapaSkus,
} from "@/lib/catalog";

export const metadata = {
  title: "Colección · Sastrería de agosto — Curadario",
  description: "Cinco piezas. Un look. Un lugar.",
};

export default function ColeccionPage() {
  const collection = getTapaCollection();
  const skus = getTapaSkus();
  const filters = getCollectionFilters(collection.id);

  return (
    <AppShell>
      <div className="pt-2">
        <CollectionGrid
          collection={collection}
          skus={skus}
          filters={filters}
        />
      </div>
    </AppShell>
  );
}
