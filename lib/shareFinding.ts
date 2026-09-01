import { shareCopy } from "@/lib/brand";
import { LIVE_SHARE_COPY, dayShareText as countdownShare } from "@/lib/las21";
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

export function liveShareText(): string {
  return LIVE_SHARE_COPY;
}

export function dayShareText(now: number): string {
  return countdownShare(now);
}

export function whatsappShareHref(url: string, sku: Sku): string {
  return `https://wa.me/?text=${encodeURIComponent(findingShareText(url, sku))}`;
}
