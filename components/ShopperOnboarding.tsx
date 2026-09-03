"use client";

import {
  useRef,
  useState,
  useSyncExternalStore,
  type PointerEvent,
} from "react";
import { Wordmark } from "@/components/Wordmark";
import { onboardingCopy, onboardingSlides } from "@/lib/edges";
import {
  getOnboardingSeen,
  getServerOnboardingSeen,
  markOnboardingSeen,
  subscribeOnboarding,
} from "@/lib/onboarding";

const SWIPE_PX = 48;

const slideArt = [
  [
    "h-[58%] w-[22%] self-end rounded-md bg-terracotta/55",
    "h-[78%] w-[28%] self-center rounded-md bg-terracotta",
    "h-[46%] w-[20%] self-end rounded-md bg-[#d8c7a8]",
  ],
  [
    "h-[70%] w-[24%] self-center rounded-md bg-[#d8c7a8]",
    "h-[52%] w-[22%] self-end rounded-md bg-terracotta/70",
    "h-[64%] w-[26%] self-center rounded-md bg-terracotta/40",
  ],
  [
    "h-[48%] w-[20%] self-end rounded-md bg-terracotta/45",
    "h-[72%] w-[30%] self-center rounded-md bg-[#e2d4b8]",
    "h-[60%] w-[22%] self-end rounded-md bg-terracotta",
  ],
] as const;

export function ShopperOnboarding() {
  const seen = useSyncExternalStore(
    subscribeOnboarding,
    getOnboardingSeen,
    getServerOnboardingSeen,
  );
  const [index, setIndex] = useState(0);
  const touchX = useRef<number | null>(null);

  if (seen) return null;

  const slide = onboardingSlides[index];
  const last = index >= onboardingSlides.length - 1;
  const progress = `${index + 1} de ${onboardingSlides.length}`;

  function finish() {
    markOnboardingSeen();
  }

  function next() {
    if (last) {
      finish();
      return;
    }
    setIndex((current) => current + 1);
  }

  function goTo(slideIndex: number) {
    setIndex(slideIndex);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    touchX.current = event.clientX;
  }

  function onPointerUp(event: PointerEvent<HTMLDivElement>) {
    const start = touchX.current;
    touchX.current = null;
    if (start == null) return;
    const delta = event.clientX - start;
    if (delta <= -SWIPE_PX && !last) {
      setIndex((current) => current + 1);
    } else if (delta >= SWIPE_PX && index > 0) {
      setIndex((current) => current - 1);
    }
  }

  return (
    <div
      className="fixed inset-0 z-40 flex justify-center bg-cream"
      role="dialog"
      aria-modal="true"
      aria-labelledby="onboarding-title"
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="flex h-dvh w-full max-w-[430px] flex-col">
        <div className="flex shrink-0 items-center justify-center pt-[calc(1.25rem+env(safe-area-inset-top))] pb-4">
          <Wordmark />
        </div>

        <div className="flex min-h-0 flex-1 flex-col rounded-t-[28px] bg-paper px-6 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))] shadow-[0_-12px_40px_rgba(22,21,19,0.08)]">
          <div
            className="mx-auto h-1 w-10 rounded-full bg-ink/20"
            aria-hidden
          />
          <p className="mt-5 shrink-0 text-center font-sans text-[13px] text-terracotta">
            {progress}
          </p>
          <h2
            id="onboarding-title"
            className="mt-3 shrink-0 text-center font-serif text-[26px] leading-[1.15] text-ink"
          >
            {slide.title}
          </h2>

          <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
            <div
              className="flex aspect-[5/3] h-[38%] max-h-[168px] w-full max-w-[280px] items-center justify-center rounded-[22px] bg-cream"
              aria-hidden
            >
              <div className="flex h-[72%] w-[78%] items-stretch justify-center gap-3">
                {slideArt[index].map((className) => (
                  <span key={className} className={className} />
                ))}
              </div>
            </div>

            <div className="mt-5 flex items-center justify-center gap-2" aria-hidden>
              {onboardingSlides.map((item, slideIndex) => (
                <button
                  key={item.title}
                  type="button"
                  tabIndex={-1}
                  onClick={() => goTo(slideIndex)}
                  onPointerDown={(event) => event.stopPropagation()}
                  onPointerUp={(event) => event.stopPropagation()}
                  className={`h-2 w-2 rounded-full ${
                    slideIndex === index ? "bg-terracotta" : "bg-cream"
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={next}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            className="mt-4 flex h-12 w-full shrink-0 items-center justify-center rounded-xl bg-ink font-sans text-[16px] font-medium text-paper"
          >
            {last ? onboardingCopy.start : onboardingCopy.next}
          </button>
          <button
            type="button"
            onClick={finish}
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            className="mt-3 flex h-10 w-full shrink-0 items-center justify-center font-sans text-[15px] text-ink/40"
          >
            {onboardingCopy.skip}
          </button>
        </div>
      </div>
    </div>
  );
}
