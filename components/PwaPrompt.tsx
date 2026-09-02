"use client";

import { useEffect, useState } from "react";
import { pwaCopy } from "@/lib/edges";
import { markPwaDismissed } from "@/lib/pwa";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

export function PwaPrompt() {
  const [deferred, setDeferred] = useState<InstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as InstallPromptEvent);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);

  async function add() {
    if (deferred) {
      try {
        await deferred.prompt();
        await deferred.userChoice;
      } catch {
        // Prompt cancelled or unavailable.
      }
    }
    markPwaDismissed();
  }

  return (
    <div
      className="absolute inset-0 z-30 flex items-center justify-center bg-ink/40 px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-title"
    >
      <div className="w-full rounded-2xl bg-paper px-6 py-7 text-center shadow-[0_16px_48px_rgba(22,21,19,0.16)]">
        <h2
          id="pwa-title"
          className="font-serif text-[28px] leading-[1.1] text-ink"
        >
          {pwaCopy.title}
        </h2>
        <div
          className="mx-auto mt-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-cream"
          aria-hidden="true"
        >
          <span className="font-serif text-[36px] leading-none text-terracotta">
            C
          </span>
        </div>
        <p className="mt-5 font-sans text-[15px] leading-6 text-ink/70">
          {pwaCopy.body}
        </p>
        <button
          type="button"
          onClick={() => {
            void add();
          }}
          className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[16px] font-medium text-paper"
        >
          {pwaCopy.add}
        </button>
        <button
          type="button"
          onClick={markPwaDismissed}
          className="mt-3 flex h-12 w-full items-center justify-center rounded-full border border-ink/15 bg-transparent font-sans text-[16px] font-medium text-ink"
        >
          {pwaCopy.later}
        </button>
      </div>
    </div>
  );
}
