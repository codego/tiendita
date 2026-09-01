import seed from "@/data/seed.json";
import { HOME_CHIPS } from "@/lib/home";
import type { Catalog, Collection, Sku } from "@/lib/types";

const catalog = seed as Catalog;

export function getCatalog(): Catalog {
  return catalog;
}

export function getCollections(): Collection[] {
  return catalog.collections;
}

export function getTapaCollection(): Collection {
  const tapa = catalog.collections.find((collection) => collection.onTapa);
  if (!tapa) {
    throw new Error("No collection is marked onTapa");
  }
  return tapa;
}

export function getCollection(id: string): Collection | undefined {
  return catalog.collections.find((collection) => collection.id === id);
}

export function getSkus(): Sku[] {
  return catalog.skus;
}

export function getSku(id: string): Sku | undefined {
  return catalog.skus.find((sku) => sku.id === id);
}

export function getSkusByCollection(collectionId: string): Sku[] {
  return catalog.skus.filter((sku) => sku.collection_id === collectionId);
}

export function getTapaSkus(): Sku[] {
  return getSkusByCollection(getTapaCollection().id);
}

export function getHomeChips() {
  return HOME_CHIPS.map((chip) => ({ id: chip.id, label: chip.label }));
}

export function getSkusByChip(chip: string): Sku[] {
  if (chip === "todas") return getSkus();
  return catalog.skus.filter((sku) => sku.chip === chip);
}

function skuHaystack(sku: Sku): string {
  const chipLabel =
    HOME_CHIPS.find((chip) => chip.id === sku.chip)?.label ?? sku.chip;
  return [
    sku.name,
    sku.brand,
    sku.tela,
    sku.corte,
    sku.categoryLabel,
    sku.description,
    chipLabel,
  ]
    .join(" ")
    .toLowerCase();
}

export function getCollectionFilters(collectionId: string) {
  const seen = new Map<string, string>();
  for (const sku of getSkusByCollection(collectionId)) {
    if (!seen.has(sku.category)) {
      seen.set(sku.category, sku.categoryLabel);
    }
  }
  return [...seen.entries()].map(([id, label]) => ({ id, label }));
}

export function searchSkus(query: string): Sku[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return catalog.skus.filter((sku) => skuHaystack(sku).includes(q));
}
