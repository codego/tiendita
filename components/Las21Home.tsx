"use client";

import { useEffect, useState } from "react";
import { DaySchedule } from "@/components/DaySchedule";
import { LiveStage } from "@/components/LiveStage";
import {
  formatDayCountdown,
  formatLiveCountdown,
  isLas21Live,
  liveRemainingMs,
} from "@/lib/las21";
import type { Sku } from "@/lib/types";

export function Las21Home({
  forceDrop,
  initialNow,
  drop,
  esta,
  anoche,
}: {
  forceDrop: boolean;
  initialNow: number;
  drop: Sku[];
  esta: Sku[];
  anoche: Sku[];
}) {
  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const live = isLas21Live(now, forceDrop);

  if (live) {
    const remainingMs = liveRemainingMs(now, forceDrop);
    return (
      <LiveStage
        drop={drop}
        countdown={formatLiveCountdown(remainingMs)}
      />
    );
  }

  return (
    <DaySchedule
      countdown={formatDayCountdown(now)}
      esta={esta}
      anoche={anoche}
    />
  );
}
