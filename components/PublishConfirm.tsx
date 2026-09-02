"use client";

import Link from "next/link";
import { CloseIcon } from "@/components/Icons";
import { publishCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export function PublishConfirm({ onClose }: { onClose: () => void }) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center bg-ink/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="publish-title"
    >
      <div className="relative w-full rounded-2xl bg-paper px-6 pt-8 pb-6 text-center shadow-[0_16px_48px_rgba(22,21,19,0.16)]">
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center text-ink/55"
        >
          <CloseIcon className="h-5 w-5" />
        </button>
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-cream"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-8 w-8 text-terracotta">
            <path
              d="M6 12.5 10.2 16.5 18 8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          id="publish-title"
          className="mt-5 font-serif text-[34px] leading-none text-ink"
        >
          {publishCopy.title}
        </h2>
        <p className="mt-2 font-sans text-[16px] text-ink/70">
          {publishCopy.sub}
        </p>
        <Link
          href={routes.landing}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[16px] font-medium text-paper"
        >
          {publishCopy.feed}
        </Link>
      </div>
    </div>
  );
}
