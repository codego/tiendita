"use client";

import { useSyncExternalStore } from "react";
import {
  getServerShareMap,
  getWeekShareMap,
  subscribeShares,
} from "@/lib/shares";

export function useWeekShareMap(): Record<string, number> {
  return useSyncExternalStore(
    subscribeShares,
    getWeekShareMap,
    getServerShareMap,
  );
}
