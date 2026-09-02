"use client";

import Link from "next/link";
import { ShareIcon } from "@/components/Icons";
import { shareCopy } from "@/lib/brand";
import { getSku } from "@/lib/catalog";
import { routes } from "@/lib/routes";
import { findingShareText, findingUrl } from "@/lib/shareFinding";
import { trackShare } from "@/lib/shares";
import type { Sku } from "@/lib/types";

export function ShareFindingButton({
  skuId,
  sku,
  variant = "icon",
  className = "",
}: {
  skuId: string;
  sku?: Sku;
  variant?: "icon" | "onImage" | "link" | "native";
  className?: string;
}) {
  const href = routes.compartirSku(skuId);

  async function shareHere() {
    const piece = sku ?? getSku(skuId);
    if (!piece) return;
    const url = findingUrl(window.location.origin, piece.id);
    const text = findingShareText(url, piece);
    if (navigator.share) {
      try {
        await navigator.share({
          title: piece.name,
          text,
          url,
        });
        trackShare(piece.id);
        return;
      } catch {
        // Cancelled or unsupported — copy instead.
      }
    }
    try {
      await navigator.clipboard.writeText(text);
      trackShare(piece.id);
    } catch {
      // Ignore clipboard failures; the finding still lives on this screen.
    }
  }

  if (variant === "native") {
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          void shareHere();
        }}
        aria-label={shareCopy.headline}
        className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-paper text-ink ${className}`}
      >
        <ShareIcon className="h-5 w-5" />
      </button>
    );
  }

  if (variant === "link") {
    return (
      <Link
        href={href}
        onClick={(event) => event.stopPropagation()}
        className={`mt-1 inline-flex font-sans text-[12px] text-ink underline underline-offset-2 ${className}`}
      >
        {shareCopy.cta}
      </Link>
    );
  }

  const look =
    variant === "onImage"
      ? "h-8 w-8 text-paper drop-shadow-[0_1px_3px_rgba(22,21,19,0.45)]"
      : "h-8 w-8 rounded-full bg-paper/95 text-ink shadow-[0_1px_8px_rgba(22,21,19,0.12)]";

  return (
    <Link
      href={href}
      aria-label={shareCopy.headline}
      onClick={(event) => event.stopPropagation()}
      className={`inline-flex items-center justify-center ${look} ${className}`}
    >
      <ShareIcon className="h-[16px] w-[16px]" />
    </Link>
  );
}
