"use client";

import { useSyncExternalStore } from "react";
import { ajustesCopy } from "@/lib/edges";
import {
  getLas21PingBlocked,
  getLas21PingEnabled,
  getServerLas21PingBlocked,
  getServerLas21PingEnabled,
  notificationPermission,
  openOsSettingsSheet,
  optInLas21Ping,
  optOutLas21Ping,
  subscribeLas21Push,
} from "@/lib/las21-push";

export function AjustesPingToggle() {
  const on = useSyncExternalStore(
    subscribeLas21Push,
    getLas21PingEnabled,
    getServerLas21PingEnabled,
  );
  const blocked = useSyncExternalStore(
    subscribeLas21Push,
    getLas21PingBlocked,
    getServerLas21PingBlocked,
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4 border-y border-ink/10 py-4">
        <span id="avisame-21-label" className="font-sans text-[16px] text-ink">
          {ajustesCopy.toggle}
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={on}
          aria-labelledby="avisame-21-label"
          onClick={() => {
            if (on) {
              optOutLas21Ping();
              return;
            }
            if (notificationPermission() === "denied") {
              openOsSettingsSheet();
              return;
            }
            void optInLas21Ping();
          }}
          className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
            on ? "bg-terracotta" : "bg-ink/20"
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-paper shadow-sm transition-transform ${
              on ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
      {blocked ? (
        <p className="mt-3 font-sans text-[14px] leading-5 text-ink/60">
          {ajustesCopy.blocked}
        </p>
      ) : null}
    </div>
  );
}
