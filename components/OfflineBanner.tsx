"use client";

import { useSyncExternalStore } from "react";
import { offlineBannerCopy } from "@/lib/edges";
import { isBrowserOffline, subscribeOnlineStatus } from "@/lib/network";

export function OfflineBanner() {
  const offline = useSyncExternalStore(
    subscribeOnlineStatus,
    isBrowserOffline,
    () => false,
  );

  if (!offline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-ink/10 bg-paper px-4 py-2.5"
    >
      <p className="font-sans text-[13px] leading-snug text-ink/70">
        {offlineBannerCopy.line}
      </p>
    </div>
  );
}
