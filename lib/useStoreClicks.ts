"use client";

import { useSyncExternalStore } from "react";
import {
  countStoreClicks,
  getClickMap,
  getServerClickMap,
  subscribeAnalytics,
} from "@/lib/analytics";

export function useLiveStoreClicks(skuId?: string): number {
  return useSyncExternalStore(
    subscribeAnalytics,
    () => countStoreClicks(skuId),
    () => 0,
  );
}

export function useLiveClickMap(): Record<string, number> {
  return useSyncExternalStore(
    subscribeAnalytics,
    getClickMap,
    getServerClickMap,
  );
}
