"use client";

import { useSyncExternalStore } from "react";
import {
  getRecienIds,
  getServerRecienIds,
  subscribeRecien,
} from "@/lib/recien";

export function useRecienIds(): string[] {
  return useSyncExternalStore(subscribeRecien, getRecienIds, getServerRecienIds);
}
