"use client";

import { useRouter } from "next/navigation";
import { BackIcon } from "@/components/Icons";
import { goBackInApp } from "@/lib/history.mjs";

export function FichaBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      aria-label="Volver"
      className="flex h-10 w-10 items-center justify-start"
      onClick={() =>
        goBackInApp(router, {
          state: window.history.state,
          referrer: document.referrer,
          origin: window.location.origin,
        })
      }
    >
      <BackIcon />
    </button>
  );
}
