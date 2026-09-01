"use client";

import { useState, useSyncExternalStore } from "react";
import { onboardingSlides } from "@/lib/edges";
import {
  getOnboardingSeen,
  getServerOnboardingSeen,
  markOnboardingSeen,
  subscribeOnboarding,
} from "@/lib/onboarding";

export function ShopperOnboarding() {
  const seen = useSyncExternalStore(
    subscribeOnboarding,
    getOnboardingSeen,
    getServerOnboardingSeen,
  );
  const [index, setIndex] = useState(0);

  if (seen) return null;

  const slide = onboardingSlides[index];
  const last = index >= onboardingSlides.length - 1;

  function next() {
    if (last) {
      markOnboardingSeen();
      return;
    }
    setIndex((current) => current + 1);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-end justify-center bg-ink/40"
      role="dialog"
      aria-modal="true"
      aria-label={slide.title}
    >
      <div className="w-full max-w-[430px] rounded-t-[28px] bg-surface px-6 pt-8 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(22,21,19,0.12)]">
        <p className="font-mono text-[11px] tracking-[0.18em] text-terracotta uppercase">
          Curadario
        </p>
        <h2 className="mt-4 max-w-[16ch] font-serif text-[34px] leading-[1.08] text-ink">
          {slide.title}
        </h2>
        <div className="mt-8 flex items-center gap-2" aria-hidden="true">
          {onboardingSlides.map((item, slideIndex) => (
            <span
              key={item.title}
              className={`h-1.5 rounded-full ${
                slideIndex === index ? "w-6 bg-terracotta" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={next}
          className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[16px] font-medium text-paper"
        >
          {last ? "Empezar" : "Siguiente"}
        </button>
      </div>
    </div>
  );
}
