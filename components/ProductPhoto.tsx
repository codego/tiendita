"use client";

import Image from "next/image";
import { useState } from "react";
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
  const broken = Boolean(valid && failedSrc === src);

  if (!valid || broken) {
    return <CreamFrame alt={alt} />;
  }

  return (
    <Image
      src={src}
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
