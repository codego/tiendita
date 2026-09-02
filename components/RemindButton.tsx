"use client";

import { useEffect, useState } from "react";
import { PING_HOUR, PING_MINUTE, REMIND_CTA, REMIND_DONE } from "@/lib/las21";

const STORAGE_KEY = `curadario:avisame-${PING_HOUR}${PING_MINUTE}`;

export function RemindButton({
  compact = false,
  onAccent = false,
}: {
  compact?: boolean;
  onAccent?: boolean;
}) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      setSaved(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      setSaved(false);
    }
  }, []);

  function remind() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Local stub — still show the confirmation.
    }
    setSaved(true);
  }

  if (saved) {
    return (
      <p
        className={`${compact ? "mt-2" : "mt-8"} text-center font-sans text-[14px] ${
          onAccent ? "text-paper/80" : "text-ink/60"
        }`}
        aria-live="polite"
      >
        {REMIND_DONE}
      </p>
    );
  }

  return (
    <button
      type="button"
      onClick={remind}
      className={`${
        compact ? "mt-3 h-10 text-[13px]" : "mt-8 h-12 text-[15px]"
      } flex w-full items-center justify-center rounded-full border bg-transparent font-sans font-medium ${
        onAccent
          ? "border-paper text-paper"
          : "border-ink text-ink"
      }`}
    >
      {REMIND_CTA}
    </button>
  );
}
