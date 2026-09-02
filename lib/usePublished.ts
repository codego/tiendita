"use client";

import { useSyncExternalStore } from "react";
import {
  getPublishedIds,
  getServerPublishedIds,
  hasPublishedOverride,
  subscribePublished,
} from "@/lib/published";

export function usePublishedIds(): string[] {
  return useSyncExternalStore(
    subscribePublished,
    getPublishedIds,
    getServerPublishedIds,
  );
}

export function usePublishedCount(): number {
  return useSyncExternalStore(
    subscribePublished,
    () => getPublishedIds().length,
    () => 0,
  );
}

export function usePublishedOverride(): boolean {
  return useSyncExternalStore(
    subscribePublished,
    hasPublishedOverride,
    () => false,
  );
}
