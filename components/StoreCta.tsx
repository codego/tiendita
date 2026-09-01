"use client";

import type { Sku } from "@/lib/types";
import { trackCtaToStore } from "@/lib/analytics";
import { storeUrlWithUtm } from "@/lib/storeUrl";

export function StoreCta({
  sku,
  variant = "ink",
}: {
  sku: Sku;
  variant?: "ink" | "cream";
}) {
  const href = storeUrlWithUtm(sku);
  const look =
    variant === "cream"
      ? "bg-cream text-ink"
      : "bg-ink text-paper";

  return (
    <a
      href={href}
      className={`inline-flex h-12 flex-1 items-center justify-center rounded-full px-6 font-sans text-[15px] font-medium tracking-tight ${look}`}
      onClick={() =>
        trackCtaToStore({
          sku_id: sku.id,
          collection_id: sku.collection_id,
          store_url: sku.store_url,
        })
      }
    >
      Ir a la tienda →
    </a>
  );
}
