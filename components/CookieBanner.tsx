"use client";

import Link from "next/link";
import { cookieCopy } from "@/lib/edges";
import { markCookieAccepted } from "@/lib/cookie";
import { routes } from "@/lib/routes";

export function CookieBanner() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[430px] rounded-t-[24px] bg-paper px-5 pt-5 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(22,21,19,0.1)]"
      role="dialog"
      aria-label={cookieCopy.line}
    >
      <p className="font-serif text-[22px] leading-snug text-ink">
        {cookieCopy.line}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <Link
          href={routes.privacidad}
          className="font-sans text-[14px] text-ink underline underline-offset-2"
        >
          {cookieCopy.privacy}
        </Link>
        <button
          type="button"
          onClick={markCookieAccepted}
          className="inline-flex h-11 items-center justify-center rounded-full bg-terracotta px-6 font-sans text-[15px] font-medium text-paper"
        >
          {cookieCopy.accept}
        </button>
      </div>
    </div>
  );
}
