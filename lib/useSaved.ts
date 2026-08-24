"use client";

import { useSyncExternalStore } from "react";
import {
  getSavedIds,
  getServerSavedIds,
  subscribeSaved,
  toggleSaved,
} from "@/lib/saved";

export function useSavedIds(): string[] {
  return useSyncExternalStore(subscribeSaved, getSavedIds, getServerSavedIds);
}

export function useSaved(skuId: string) {
  const ids = useSavedIds();
  return {
    saved: ids.includes(skuId),
    toggle: () => toggleSaved(skuId),
  };
}
