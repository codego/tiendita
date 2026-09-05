"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/Icons";
import { ShareFailBanner } from "@/components/ShareFailBanner";
import { shareOrCopy } from "@/lib/shareAction";

export function DayShareButton({
  countdown,
  className = "",
}: {
  countdown: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  async function shareDay() {
    const text = countdown;
    const result = await shareOrCopy({
      title: "Con pinta",
      text,
    });
    if (result === "aborted") return;
    if (result === "failed") {
      setFailed(true);
      return;
    }
    setFailed(false);
  }

  return (
    <>
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
      {failed ? (
        <ShareFailBanner
          onRetry={() => {
            void shareDay();
          }}
        />
      ) : null}
    </>
  );
}
