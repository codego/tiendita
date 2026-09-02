"use client";

import { useSyncExternalStore } from "react";
import { getLastSyncAt, subscribeLastSync } from "@/lib/sync";

export function useLastSyncAt(): number {
  return useSyncExternalStore(subscribeLastSync, getLastSyncAt, () => 0);
}
