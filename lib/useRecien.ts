"use client";

import { useSyncExternalStore } from "react";
import {
  getRecienEntries,
  getRecienIds,
  getServerRecienEntries,
  getServerRecienIds,
  subscribeRecien,
} from "@/lib/recien";

export function useRecienIds(): string[] {
  return useSyncExternalStore(subscribeRecien, getRecienIds, getServerRecienIds);
}

export function useRecienEntries() {
  return useSyncExternalStore(
    subscribeRecien,
    getRecienEntries,
    getServerRecienEntries,
  );
}
