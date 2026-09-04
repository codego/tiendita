"use client";

import { CheckIcon } from "@/components/Icons";
import { dashboardCopy } from "@/lib/brand";

export function MerchantResyncOk({
  onPanel,
  onClose,
}: {
  onPanel: () => void;
  onClose: () => void;
}) {
  return (
    <div
      className="absolute inset-0 z-40 flex flex-col justify-end bg-ink/25"
      role="dialog"
      aria-modal="true"
      aria-labelledby="resync-ok-title"
    >
      <div className="rounded-t-[32px] bg-cream px-6 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] text-center">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#D8E6D9]"
          aria-hidden="true"
        >
          <CheckIcon className="h-8 w-8 text-forest" />
        </div>
        <h2
          id="resync-ok-title"
          className="mt-5 font-serif text-[28px] leading-tight text-ink"
        >
          {dashboardCopy.resyncOkTitle}
        </h2>
        <button
          type="button"
          onClick={onPanel}
          className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-forest font-sans text-[16px] font-medium text-paper"
        >
          {dashboardCopy.resyncOkPanel}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 flex h-11 w-full items-center justify-center font-sans text-[15px] text-ink/55"
        >
          {dashboardCopy.resyncOkClose}
        </button>
      </div>
    </div>
  );
}
