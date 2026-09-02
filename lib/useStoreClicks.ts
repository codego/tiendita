"use client";

import { useSyncExternalStore } from "react";
import {
  countStoreClicks,
  countStoreClicksThisWeek,
  getClickMap,
  getServerClickMap,
  getWeekClickMap,
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

export function useWeekStoreClicks(skuId?: string): number {
  return useSyncExternalStore(
    subscribeAnalytics,
    () => countStoreClicksThisWeek(skuId),
    () => 0,
  );
}

export function useWeekClickMap(): Record<string, number> {
  return useSyncExternalStore(
    subscribeAnalytics,
    getWeekClickMap,
    getServerClickMap,
  );
}
