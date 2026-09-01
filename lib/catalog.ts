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

export function getLooksCollections(): Collection[] {
  return catalog.collections.filter((collection) => collection.id !== "vitrina");
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

export function foldQuery(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "");
}

function skuHaystack(sku: Sku): string {
  const chipLabel =
    HOME_CHIPS.find((chip) => chip.id === sku.chip)?.label ?? sku.chip;
  return foldQuery(
    [
      sku.name,
      sku.brand,
      sku.category,
      sku.categoryLabel,
      sku.chip,
      chipLabel,
      sku.tela,
      sku.corte,
      sku.description,
    ].join(" "),
  );
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
  const tokens = foldQuery(query).split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return getSkus();
  return catalog.skus.filter((sku) => {
    const haystack = skuHaystack(sku);
    return tokens.every((token) => haystack.includes(token));
  });
}
