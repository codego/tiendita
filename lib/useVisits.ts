"use client";

import { useSyncExternalStore } from "react";
import { countVisitsThisWeek, subscribeVisits } from "@/lib/visits";

export function useWeekVisits(): number {
  return useSyncExternalStore(
    subscribeVisits,
    countVisitsThisWeek,
    () => 0,
  );
}
