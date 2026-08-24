import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { CollectionGrid } from "@/components/CollectionGrid";
import {
  getCollection,
  getCollectionFilters,
  getCollections,
  getSkusByCollection,
} from "@/lib/catalog";

export function generateStaticParams() {
  return getCollections().map((collection) => ({ id: collection.id }));
}

export default async function CollectionByIdPage({
  params,
}: PageProps<"/coleccion/[id]">) {
  const { id } = await params;
  const collection = getCollection(id);
  if (!collection) notFound();

  return (
    <AppShell>
      <div className="pt-2">
        <CollectionGrid
          collection={collection}
          skus={getSkusByCollection(collection.id)}
          filters={getCollectionFilters(collection.id)}
        />
      </div>
    </AppShell>
  );
}
