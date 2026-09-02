import { foldQuery, getSkus } from "@/lib/catalog";
import type { BrandProfile, Sku } from "@/lib/types";

export function brandSlug(name: string): string {
  return foldQuery(name)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getBrandBySlug(slug: string): BrandProfile | undefined {
  const sku = getSkus().find((item) => brandSlug(item.brand) === slug);
  if (!sku) return undefined;
  return { slug, name: sku.brand };
}

export function getSkusByBrandSlug(slug: string): Sku[] {
  return getSkus().filter((sku) => brandSlug(sku.brand) === slug);
}

export function getBrandSlugs(): string[] {
  return [...new Set(getSkus().map((sku) => brandSlug(sku.brand)))];
}
