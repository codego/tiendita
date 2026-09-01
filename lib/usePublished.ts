"use client";

import { useSyncExternalStore } from "react";
import { dashboardMetrics } from "@/lib/brand";
import {
  getPublishedIds,
  subscribePublished,
} from "@/lib/published";

export function usePublishedIds(): string[] {
  return useSyncExternalStore(
    subscribePublished,
    getPublishedIds,
    () => [],
  );
}

export function usePublishedCount(): number {
  return useSyncExternalStore(
    subscribePublished,
    () => getPublishedIds().length,
    () => dashboardMetrics.published,
  );
}
