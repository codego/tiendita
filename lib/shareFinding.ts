import { shareCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function findingPath(skuId: string): string {
  return routes.pieza(skuId);
}

export function findingUrl(origin: string, skuId: string): string {
  return `${origin}${findingPath(skuId)}`;
}

export function findingShareText(url: string, sku: Sku): string {
  return [shareCopy.kit, `${sku.brand} — ${sku.name}`, url].join("\n");
}

export function whatsappShareHref(url: string, sku: Sku): string {
  return `https://wa.me/?text=${encodeURIComponent(findingShareText(url, sku))}`;
}
