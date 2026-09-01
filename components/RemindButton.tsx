"use client";

import { useEffect, useState } from "react";
import { PING_HOUR, PING_MINUTE, REMIND_CTA, REMIND_DONE } from "@/lib/las21";

const STORAGE_KEY = `curadario:avisame-${PING_HOUR}${PING_MINUTE}`;

export function RemindButton() {
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
        className="mt-8 text-center font-sans text-[14px] text-ink/60"
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
      className="mt-8 flex h-12 w-full items-center justify-center rounded-full border border-ink bg-transparent font-sans text-[15px] font-medium text-ink"
    >
      {REMIND_CTA}
    </button>
  );
}
