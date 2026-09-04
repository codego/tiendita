"use client";

import { Wordmark } from "@/components/Wordmark";
import { las21PushCopy } from "@/lib/edges";
import {
  markPushSheetDismissed,
  requestLas21Permission,
} from "@/lib/las21-push";

export function Las21PushSheet() {
  return (
    <div
      className="fixed inset-0 z-40 flex justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="las21-push-title"
    >
      <div className="relative flex h-full w-full max-w-[430px] flex-col justify-end bg-ink/35 backdrop-blur-[10px]">
        <div className="rounded-t-[32px] bg-cream px-6 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center shadow-[0_-16px_48px_rgba(22,21,19,0.14)]">
          <Wordmark className="text-[24px]" />
          <h2
            id="las21-push-title"
            className="mt-8 font-sans text-[26px] leading-tight font-bold text-ink"
          >
            {las21PushCopy.title}
          </h2>
          <p className="mt-3 font-sans text-[15px] leading-6 text-ink/70">
            {las21PushCopy.line}
          </p>
          <p className="font-sans text-[15px] leading-6 text-ink/70">
            {las21PushCopy.quiet}
          </p>
          <button
            type="button"
            onClick={() => {
              void requestLas21Permission();
            }}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-ink font-sans text-[16px] font-medium text-paper"
          >
            {las21PushCopy.cta}
          </button>
          <button
            type="button"
            onClick={markPushSheetDismissed}
            className="mt-3 flex h-12 w-full items-center justify-center rounded-full border border-ink bg-transparent font-sans text-[16px] font-medium text-ink"
          >
            {las21PushCopy.later}
          </button>
        </div>
      </div>
    </div>
  );
}
