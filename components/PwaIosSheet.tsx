"use client";

import type { ReactNode } from "react";
import { pwaIosCopy } from "@/lib/edges";
import { markPwaIosDismissed } from "@/lib/pwa";

function IosShareGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3.8v10.2" />
      <path d="M8.2 7.2 12 3.8l3.8 3.4" />
      <path d="M6.4 11.2v7.2c0 .9.7 1.6 1.6 1.6h8c.9 0 1.6-.7 1.6-1.6v-7.2" />
    </svg>
  );
}

function IosAddHomeGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="5" width="14" height="14" rx="2.4" />
      <path d="M12 8.4v7.2" />
      <path d="M8.4 12h7.2" />
    </svg>
  );
}

function Step({
  n,
  label,
  last,
  children,
}: {
  n: number;
  label: string;
  last?: boolean;
  children: ReactNode;
}) {
  return (
    <li
      className={`flex items-center gap-3 py-4 ${
        last ? "" : "border-b border-ink/10"
      }`}
    >
      <span
        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-terracotta font-sans text-[13px] font-medium text-paper"
        aria-hidden
      >
        {n}
      </span>
      <span className="min-w-0 flex-1 font-sans text-[16px] leading-6 text-ink">
        {label}
      </span>
      <span className="shrink-0 text-ink" aria-hidden>
        {children}
      </span>
    </li>
  );
}

export function PwaIosSheet() {
  return (
    <div
      className="absolute inset-0 z-30 flex items-end bg-ink/40"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-ios-title"
    >
      <div className="w-full rounded-t-[28px] bg-cream px-6 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(22,21,19,0.12)]">
        <div
          className="mx-auto h-1 w-10 rounded-full bg-ink/25"
          aria-hidden
        />
        <h2
          id="pwa-ios-title"
          className="mt-6 font-serif text-[28px] leading-[1.12] font-bold text-ink"
        >
          {pwaIosCopy.title}
        </h2>
        <p className="mt-2 font-sans text-[15px] leading-6 text-ink/70">
          {pwaIosCopy.sub}
        </p>
        <ol className="mt-4">
          <Step n={1} label={pwaIosCopy.share}>
            <IosShareGlyph />
          </Step>
          <Step n={2} label={pwaIosCopy.home}>
            <IosAddHomeGlyph />
          </Step>
          <Step n={3} label={pwaIosCopy.add} last>
            <span className="rounded-md border border-terracotta px-2 py-1 font-sans text-[13px] font-medium text-terracotta">
              {pwaIosCopy.add}
            </span>
          </Step>
        </ol>
        <button
          type="button"
          onClick={markPwaIosDismissed}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-full border border-terracotta bg-transparent font-sans text-[16px] font-medium text-terracotta"
        >
          {pwaIosCopy.later}
        </button>
      </div>
    </div>
  );
}
