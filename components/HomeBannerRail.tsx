"use client";

import Link from "next/link";
import { HOME_RAIL } from "@/lib/home";

export function HomeBannerRail({
  onScrollFeed,
}: {
  onScrollFeed: () => void;
}) {
  return (
    <section
      className="pt-3"
      aria-label="Llegó. De esta semana. Hoy a las 21."
    >
      <div className="flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {HOME_RAIL.map((item) => {
          const tile = (
            <img
              src={item.src}
              alt={item.alt}
              width={1024}
              height={1024}
              className="aspect-square h-[168px] w-[168px] rounded-md object-cover"
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
              onClick={onScrollFeed}
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
