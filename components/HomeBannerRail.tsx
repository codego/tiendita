"use client";

import Image from "next/image";
import Link from "next/link";
import { visibleHomeRail } from "@/lib/home";

export function HomeBannerRail({
  dropLive,
  onChip,
  onScrollFeed,
}: {
  dropLive: boolean;
  onChip: (chip: string) => void;
  onScrollFeed: () => void;
}) {
  const items = visibleHomeRail(dropLive);

  return (
    <section className="pt-3" aria-label={items.map((item) => item.alt).join(" ")}>
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const tile = (
            <div className="relative aspect-square overflow-hidden rounded-md bg-cream">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="156px"
                className="object-cover"
              />
            </div>
          );

          if ("href" in item && item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                className="w-[156px] shrink-0"
              >
                {tile}
              </Link>
            );
          }

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                if ("chip" in item && item.chip) onChip(item.chip);
                onScrollFeed();
              }}
              className="w-[156px] shrink-0 text-left"
            >
              {tile}
            </button>
          );
        })}
      </div>
    </section>
  );
}
