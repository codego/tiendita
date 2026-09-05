"use client";

import { useEffect, useState } from "react";
import { Las21Empty } from "@/components/Las21Empty";
import { LiveStage } from "@/components/LiveStage";
import {
  formatLiveCountdown,
  isLas21Live,
  liveRemainingMs,
  tonightStoreCount,
} from "@/lib/las21";
import type { Sku } from "@/lib/types";

export function Las21Home({
  forceDrop,
  drop,
}: {
  forceDrop: boolean;
  drop: Sku[];
}) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const live = isLas21Live(now, forceDrop, tonightStoreCount(drop));

  if (live) {
    const remainingMs = liveRemainingMs(now, forceDrop);
    return (
      <LiveStage
        drop={drop}
        countdown={formatLiveCountdown(remainingMs)}
      />
    );
  }

  return <Las21Empty />;
}
