"use client";

import { ShareIcon } from "@/components/Icons";

export function DayShareButton({
  countdown,
  className = "",
}: {
  countdown: string;
  className?: string;
}) {
  async function shareDay() {
    const text = countdown;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Curadario",
          text,
        });
        return;
      } catch {
        // Cancelled or unsupported — copy instead.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Day share must never open a feed.
    }
  }

  return (
    <button
      type="button"
      onClick={() => {
        void shareDay();
      }}
      aria-label={countdown}
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink text-ink ${className}`}
    >
      <ShareIcon className="h-5 w-5" />
    </button>
  );
}
