"use client";

import { useState } from "react";
import { LiveShareButton } from "@/components/LiveShareButton";
import { ProductPhoto } from "@/components/ProductPhoto";
import { StoreCta } from "@/components/StoreCta";
import { Wordmark } from "@/components/Wordmark";
import {
  LAS21_LABEL,
  LIVE_LABEL,
  RAIL_LABEL,
  RECIEN_STAMP,
  splitStageAndRail,
} from "@/lib/las21";
import { formatARS } from "@/lib/money";
import type { Sku } from "@/lib/types";

export function LiveStage({
  drop,
  countdown,
}: {
  drop: Sku[];
  countdown: string;
}) {
  const split = splitStageAndRail(drop);
  const [pickedId, setPickedId] = useState<string | null>(null);
  const stage = drop.find((sku) => sku.id === pickedId) ?? split.stage;
  const rail = drop.filter((sku) => sku.id !== stage.id);

  return (
    <div className="min-h-dvh bg-ink">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-ink text-cream">
        <header className="flex items-end justify-between px-5 pt-6">
          <Wordmark tone="paper" />
          <p className="font-serif text-[18px] tracking-[0.16em] text-cream">
            {LAS21_LABEL}
          </p>
        </header>

        <div className="mt-5 flex items-center justify-between px-5">
          <p className="flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.2em] text-terracotta uppercase">
            <span className="h-2 w-2 animate-pulse rounded-full bg-terracotta" />
            {LIVE_LABEL}
          </p>
          <p className="font-mono text-[22px] tracking-tight text-cream tabular-nums">
            {countdown}
          </p>
        </div>

        <section className="relative mx-5 mt-4 min-h-[52vh] flex-1 overflow-hidden bg-ink">
          <ProductPhoto
            src={stage.image}
            alt={`${stage.brand} — ${stage.name}`}
            priority
            sizes="430px"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-ink/10" />
          <span className="absolute top-4 left-4 rotate-[-8deg] rounded-[2px] bg-terracotta px-2 py-1 font-sans text-[10px] font-semibold tracking-[0.16em] text-cream uppercase">
            {RECIEN_STAMP}
          </span>
          <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
            <p className="font-sans text-[11px] font-medium tracking-[0.16em] text-cream/70 uppercase">
              {stage.brand}
            </p>
            <h1 className="mt-1 font-serif text-[34px] leading-[1.02] text-cream">
              {stage.name}
            </h1>
            <p className="mt-1 font-sans text-[18px] font-medium text-cream">
              {formatARS(stage.price_ars)}
            </p>
          </div>
        </section>

        <div className="flex items-center gap-3 px-5 pt-4">
          <StoreCta sku={stage} variant="live" />
          <LiveShareButton />
        </div>

        <section className="pt-6 pb-[calc(1.25rem+env(safe-area-inset-bottom))]" aria-label={RAIL_LABEL}>
          <h2 className="px-5 font-sans text-[13px] font-medium tracking-[0.08em] text-cream/70 uppercase">
            {RAIL_LABEL}
          </h2>
          <div className="mt-3 flex gap-3 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {rail.map((sku) => (
              <button
                key={sku.id}
                type="button"
                onClick={() => setPickedId(sku.id)}
                className="w-[112px] shrink-0 text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-cream/10">
                  <ProductPhoto
                    src={sku.image}
                    alt={`${sku.brand} — ${sku.name}`}
                    sizes="112px"
                  />
                </div>
                <p className="mt-1.5 truncate font-sans text-[10px] tracking-[0.12em] text-cream/65 uppercase">
                  {sku.brand}
                </p>
                <p className="truncate font-serif text-[14px] text-cream">
                  {sku.name}
                </p>
                <p className="font-sans text-[12px] text-cream">
                  {formatARS(sku.price_ars)}
                </p>
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
