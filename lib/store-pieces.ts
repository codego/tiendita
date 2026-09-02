import { getSkus } from "@/lib/catalog";
import { TN_TO_SKU } from "@/lib/recien";
import type { TiendaNubeProduct } from "@/lib/types";

export type StorePiece = {
  id: string;
  name: string;
  image: string;
};

export function storePieces(
  storeName: string,
  products: TiendaNubeProduct[],
): StorePiece[] {
  const owned = getSkus().filter((sku) => sku.brand === storeName);
  if (owned.length > 0) {
    return owned.map((sku) => ({
      id: sku.id,
      name: sku.name,
      image: sku.image,
    }));
  }

  const seen = new Set<string>();
  const out: StorePiece[] = [];
  for (const product of products) {
    const id = TN_TO_SKU[product.id] ?? product.id.replace(/^tn-/, "");
    if (seen.has(id)) continue;
    seen.add(id);
    out.push({
      id,
      name: product.name,
      image: product.image,
    });
  }
  return out;
}
