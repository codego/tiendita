"use client";

import Link from "next/link";
import { brandSlug } from "@/lib/marca";
import { routes } from "@/lib/routes";

export function BrandNameLink({
  brand,
  className = "",
  children,
}: {
  brand: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Link
      href={routes.marca(brandSlug(brand))}
      onClick={(event) => event.stopPropagation()}
      className={`relative z-10 ${className}`}
    >
      {children ?? brand}
    </Link>
  );
}
