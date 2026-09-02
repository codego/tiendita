"use client";

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
    <section
      className="pt-3"
      aria-label={items.map((item) => item.alt).join(" ")}
    >
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item) => {
          const tile = (
            <img
              src={item.src}
              alt={item.alt}
              width={1024}
              height={1024}
              className="aspect-square h-[168px] w-[168px] rounded-md bg-terracotta object-cover"
            />
          );

          if ("href" in item && item.href) {
            return (
              <Link key={item.id} href={item.href} className="shrink-0">
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
              className="shrink-0 text-left"
            >
              {tile}
            </button>
          );
        })}
      </div>
    </section>
  );
}
