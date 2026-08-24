import type { Sku } from "@/lib/types";

export function storeUrlWithUtm(sku: Sku): string {
  const url = new URL(sku.store_url);
  url.searchParams.set("utm_source", "curadario");
  url.searchParams.set("utm_medium", "app");
  url.searchParams.set("utm_campaign", sku.collection_id);
  url.searchParams.set("utm_content", sku.id);
  return url.toString();
}
