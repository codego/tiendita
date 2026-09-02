"use client";

import { ShareIcon } from "@/components/Icons";
import { LIVE_SHARE_COPY } from "@/lib/las21";
import { liveShareText, liveShareUrl } from "@/lib/shareFinding";

export function LiveShareButton({ className = "" }: { className?: string }) {
  async function shareLive() {
    const url = liveShareUrl(window.location.origin);
    const text = liveShareText(url);
    if (navigator.share) {
      try {
        await navigator.share({
          title: LIVE_SHARE_COPY,
          text,
          url,
        });
        return;
      } catch {
        // Cancelled or unsupported — copy instead.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Share must never block the live window.
    }
  }

  return (
    <button
      type="button"
      onClick={() => {
        void shareLive();
      }}
      aria-label={LIVE_SHARE_COPY}
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink ${className}`}
    >
      <ShareIcon className="h-5 w-5" />
    </button>
  );
}
