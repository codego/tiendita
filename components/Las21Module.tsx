"use client";

import { useEffect, useState } from "react";
import { LiveShareButton } from "@/components/LiveShareButton";
import { ProductPhoto } from "@/components/ProductPhoto";
import { RemindButton } from "@/components/RemindButton";
import { StoreCta } from "@/components/StoreCta";
import {
  LAS21_LABEL,
  LIVE_LABEL,
  RAIL_LABEL,
  REMIND_CTA,
  formatDayCountdown,
  formatLiveCountdown,
  isLas21Live,
  liveRemainingMs,
  splitStageAndRail,
  tonightStoreCount,
} from "@/lib/las21";
import { formatARS } from "@/lib/money";
import type { Sku } from "@/lib/types";

export function Las21Module({
  forceDrop,
  drop,
  initialNow,
}: {
  forceDrop: boolean;
  drop: Sku[];
  initialNow: number;
}) {
  const [now, setNow] = useState(initialNow);
  const [pickedId, setPickedId] = useState<string | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const live = isLas21Live(now, forceDrop, tonightStoreCount(drop));

  if (!live) {
    return (
      <section
        className="mx-4 mt-3 rounded-md border border-ink/10 bg-cream px-3 py-3"
        aria-label={LAS21_LABEL}
      >
        <p className="font-sans text-[11px] font-semibold tracking-[0.16em] text-terracotta uppercase">
          {LAS21_LABEL}
        </p>
        <p className="mt-1 font-serif text-[22px] leading-tight text-ink">
          {formatDayCountdown(now)}
        </p>
        <RemindButton compact />
      </section>
    );
  }

  const remainingMs = liveRemainingMs(now, forceDrop);
  const split = splitStageAndRail(drop);
  const stage = drop.find((sku) => sku.id === pickedId) ?? split.stage;
  const rail = drop.filter((sku) => sku.id !== stage.id);

  return (
    <section
      className="mx-4 mt-3 overflow-hidden rounded-md bg-ink text-cream"
      aria-label={LAS21_LABEL}
    >
      <div className="flex items-center justify-between px-3 pt-3">
        <p className="flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.18em] text-terracotta uppercase">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-terracotta" />
          {LIVE_LABEL} {LAS21_LABEL}
        </p>
        <p className="font-mono text-[16px] text-cream tabular-nums">
          {formatLiveCountdown(remainingMs)}
        </p>
      </div>

      <div className="relative mx-3 mt-3 aspect-[3/4] overflow-hidden bg-ink">
        <ProductPhoto
          src={stage.image}
          alt={`${stage.brand} — ${stage.name}`}
          sizes="400px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-3 pb-3">
          <p className="font-sans text-[10px] tracking-[0.14em] text-cream/70 uppercase">
            {stage.brand}
          </p>
          <p className="font-serif text-[24px] leading-tight text-cream">
            {stage.name}
          </p>
          <p className="mt-0.5 font-sans text-[15px] text-cream">
            {formatARS(stage.price_ars)}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 px-3 pt-3">
        <StoreCta sku={stage} variant="live" />
        <LiveShareButton />
      </div>

      <div className="pt-3 pb-3" aria-label={RAIL_LABEL}>
        <p className="px-3 font-sans text-[11px] tracking-[0.08em] text-cream/65 uppercase">
          {RAIL_LABEL}
        </p>
        <div className="mt-2 flex gap-2 overflow-x-auto px-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {rail.map((sku) => (
            <button
              key={sku.id}
              type="button"
              onClick={() => setPickedId(sku.id)}
              className="w-[96px] shrink-0 text-left"
            >
              <div className="relative aspect-[3/4] overflow-hidden bg-cream/10">
                <ProductPhoto
                  src={sku.image}
                  alt={`${sku.brand} — ${sku.name}`}
                  sizes="96px"
                />
              </div>
              <p className="mt-1 truncate font-sans text-[9px] tracking-[0.1em] text-cream/65 uppercase">
                {sku.brand}
              </p>
              <p className="truncate font-sans text-[12px] text-cream">
                {formatARS(sku.price_ars)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
