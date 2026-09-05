"use client";

import Image from "next/image";
import { useState } from "react";
import { photoFailCopy } from "@/lib/edges";
import { hasProductImage } from "@/lib/product-image.mjs";

function CreamFrame({ alt }: { alt: string }) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 flex items-center justify-center bg-[#EFE9DD]"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 40 48"
        className="h-[32%] max-h-20 w-auto text-terracotta"
      >
        <text
          x="20"
          y="38"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="var(--font-playfair), Georgia, serif"
          fontStyle="italic"
          fontSize="42"
        >
          C
        </text>
      </svg>
    </div>
  );
}

function retrySrc(src: string, n: number): string {
  if (n <= 0) return src;
  const hash = src.indexOf("#");
  const base = hash === -1 ? src : src.slice(0, hash);
  const frag = hash === -1 ? "" : src.slice(hash);
  const join = base.includes("?") ? "&" : "?";
  return `${base}${join}r=${n}${frag}`;
}

function FailedFrame({
  alt,
  onRetry,
}: {
  alt: string;
  onRetry: () => void;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#EFE9DD] px-3 text-center"
    >
      <p className="font-sans text-[13px] leading-snug text-ink">
        {photoFailCopy.title}
      </p>
      <button
        type="button"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onRetry();
        }}
        onPointerDown={(event) => {
          event.preventDefault();
          event.stopPropagation();
        }}
        className="mt-2 inline-flex h-8 items-center justify-center rounded-full bg-ink px-3 font-sans text-[12px] font-medium text-paper"
      >
        {photoFailCopy.retry}
      </button>
    </div>
  );
}

export function ProductPhoto({
  src,
  alt,
  sizes,
  priority = false,
  className = "object-cover",
  unoptimized,
}: {
  src?: string | null;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  unoptimized?: boolean;
}) {
  const valid = hasProductImage(src);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [retry, setRetry] = useState(0);
  const broken = Boolean(valid && failedSrc === src);

  if (!valid) {
    return <CreamFrame alt={alt} />;
  }

  if (broken) {
    return (
      <FailedFrame
        alt={alt}
        onRetry={() => {
          setFailedSrc(null);
          setRetry((n) => n + 1);
        }}
      />
    );
  }

  return (
    <Image
      key={retry}
      src={retrySrc(src, retry)}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized={unoptimized ?? /^https?:\/\//i.test(src)}
      className={className}
      onError={() => setFailedSrc(src)}
    />
  );
}
