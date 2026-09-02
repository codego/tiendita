"use client";

import { trackCtaToStore } from "@/lib/analytics";
import { marcaCta } from "@/lib/edges";
import { isBrowserOffline, reportNetworkFail } from "@/lib/network";
import { storeUrlWithUtm } from "@/lib/storeUrl";
import type { Sku } from "@/lib/types";

export function BrandStoreCta({ sku }: { sku: Sku }) {
  const href = storeUrlWithUtm(sku);
  return (
    <a
      href={href}
      className="mt-4 inline-flex h-10 items-center justify-center rounded-full border border-terracotta px-5 font-sans text-[14px] font-medium text-terracotta"
      onClick={(event) => {
        if (isBrowserOffline()) {
          event.preventDefault();
          reportNetworkFail();
          return;
        }
        trackCtaToStore({
          sku_id: sku.id,
          collection_id: sku.collection_id,
          store_url: sku.store_url,
        });
      }}
    >
      {marcaCta}
    </a>
  );
}
