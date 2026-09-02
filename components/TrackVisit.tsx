"use client";

import { useEffect } from "react";
import { trackVisit } from "@/lib/visits";

export function TrackVisit({
  skuId,
  brand,
}: {
  skuId?: string;
  brand?: string;
}) {
  useEffect(() => {
    trackVisit({ sku_id: skuId, brand });
  }, [skuId, brand]);
  return null;
}
