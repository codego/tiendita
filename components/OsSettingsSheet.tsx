"use client";

import { useSyncExternalStore } from "react";
import { Wordmark } from "@/components/Wordmark";
import { osSettingsCopy } from "@/lib/edges";
import {
  closeOsSettingsSheet,
  getOsSettingsSheetOpen,
  getServerOsSettingsSheetOpen,
  subscribeLas21Push,
} from "@/lib/las21-push";
import { isIosDevice } from "@/lib/pwa";

export function OsSettingsSheet() {
  const open = useSyncExternalStore(
    subscribeLas21Push,
    getOsSettingsSheetOpen,
    getServerOsSettingsSheetOpen,
  );

  if (!open) return null;

  const title = isIosDevice()
    ? osSettingsCopy.titleIos
    : osSettingsCopy.titleAndroid;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="os-settings-title"
    >
      <div className="relative flex h-full w-full max-w-[430px] flex-col justify-end bg-ink/35 backdrop-blur-[10px]">
        <div className="rounded-t-[32px] bg-cream px-6 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center shadow-[0_-16px_48px_rgba(22,21,19,0.14)]">
          <Wordmark className="text-[24px]" />
          <h2
            id="os-settings-title"
            className="mt-8 font-serif text-[28px] leading-[1.12] font-bold text-ink"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={closeOsSettingsSheet}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-full border border-ink bg-transparent font-sans text-[16px] font-medium text-ink"
          >
            {osSettingsCopy.later}
          </button>
        </div>
      </div>
    </div>
  );
}
