"use client";

import { useState } from "react";
import { ShareIcon } from "@/components/Icons";
import { ShareFailBanner } from "@/components/ShareFailBanner";
import { LIVE_SHARE_COPY } from "@/lib/las21";
import { shareOrCopy } from "@/lib/shareAction";
import { liveShareText, liveShareUrl } from "@/lib/shareFinding";

export function LiveShareButton({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  async function shareLive() {
    const url = liveShareUrl(window.location.origin);
    const text = liveShareText(url);
    const result = await shareOrCopy({
      title: LIVE_SHARE_COPY,
      text,
      url,
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
          void shareLive();
        }}
        aria-label={LIVE_SHARE_COPY}
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-ink ${className}`}
      >
        <ShareIcon className="h-5 w-5" />
      </button>
      {failed ? (
        <ShareFailBanner
          onRetry={() => {
            void shareLive();
          }}
        />
      ) : null}
    </>
  );
}
