import seed from "@/data/tiendanube.json";
import type { TiendaNubeCatalog, TiendaNubeProduct } from "@/lib/types";

const catalog = seed as TiendaNubeCatalog;

/**
 * Mock TiendaNube Products API.
 * Local seed only — no live OAuth or store calls.
 */
export function getTiendaNubeCatalog(): TiendaNubeCatalog {
  return catalog;
}

export function getTiendaNubeStore() {
  return catalog.store;
}

export function getTiendaNubeProducts(): TiendaNubeProduct[] {
  return catalog.products;
}

export function searchTiendaNubeProducts(query: string): TiendaNubeProduct[] {
  const q = query.trim().toLowerCase();
  if (!q) return catalog.products;
  return catalog.products.filter((product) =>
    product.name.toLowerCase().includes(q),
  );
}

export function defaultSelectedIds(): string[] {
  return catalog.products.filter((product) => product.selected).map((p) => p.id);
}
