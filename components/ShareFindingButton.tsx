"use client";

import Link from "next/link";
import { ShareIcon } from "@/components/Icons";
import { shareCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";

export function ShareFindingButton({
  skuId,
  variant = "icon",
  className = "",
}: {
  skuId: string;
  variant?: "icon" | "onImage" | "link";
  className?: string;
}) {
  const href = routes.compartirSku(skuId);

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
