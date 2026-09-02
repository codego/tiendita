"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandNameLink } from "@/components/BrandNameLink";
import { EmptyState } from "@/components/EmptyState";
import { ChevronUpIcon, CloseIcon } from "@/components/Icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ShareFindingButton } from "@/components/ShareFindingButton";
import { StoreCta } from "@/components/StoreCta";
import { Wordmark } from "@/components/Wordmark";
import { emptyRecien } from "@/lib/edges";
import { homeCopy } from "@/lib/home";
import { formatARSCode } from "@/lib/money";
import { routes } from "@/lib/routes";
import { relativeHace } from "@/lib/time";
import { useRecienEntries } from "@/lib/useRecien";

const STORY_MS = 5000;

export function RecienStories({ startId }: { startId?: string }) {
  const entries = useRecienEntries();
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const [alignedTo, setAlignedTo] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const alignmentKey = `${startId ?? ""}:${entries.map((entry) => entry.sku.id).join(",")}`;
  if (entries.length > 0 && alignedTo !== alignmentKey) {
    const next = startId
      ? entries.findIndex((entry) => entry.sku.id === startId)
      : 0;
    setAlignedTo(alignmentKey);
    setIndex(next < 0 ? 0 : next);
    setProgress(0);
  }

  const current = entries[index];

  useEffect(() => {
    if (entries.length === 0) return;
    const begun = performance.now();
    const currentIndex = index;
    const count = entries.length;
    let frame = 0;
    function tick(now: number) {
      const next = Math.min(1, (now - begun) / STORY_MS);
      setProgress(next);
      if (next >= 1) {
        if (currentIndex + 1 >= count) {
          router.push(routes.landing);
        } else {
          setIndex(currentIndex + 1);
        }
        return;
      }
      frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [index, entries.length, router]);

  function go(delta: number) {
    const next = index + delta;
    if (next < 0 || next >= entries.length) {
      router.push(routes.landing);
      return;
    }
    setIndex(next);
  }

  if (!current) {
    return (
      <PhoneFrame>
        <EmptyState
          title={emptyRecien.title}
          body={emptyRecien.body}
          cta={emptyRecien.cta}
          href={routes.landing}
          wordmark
        />
      </PhoneFrame>
    );
  }

  const { sku, at } = current;

  return (
    <PhoneFrame className="overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <Image
          src={sku.image}
          alt={`${sku.brand} — ${sku.name}`}
          fill
          priority
          sizes="430px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-ink/35" />
      </div>

      <div className="relative z-20 flex h-full min-h-dvh flex-col px-4 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
        <div className="flex gap-1">
          {entries.map((entry, entryIndex) => (
            <div
              key={`${entry.sku.id}-${entry.at}`}
              className="h-[3px] flex-1 overflow-hidden rounded-full bg-paper/30"
            >
              <div
                className="h-full bg-paper"
                style={{
                  width:
                    entryIndex < index
                      ? "100%"
                      : entryIndex === index
                        ? `${Math.round(progress * 100)}%`
                        : "0%",
                }}
              />
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center justify-between">
          <Link href={routes.landing} aria-label="Curadario">
            <Wordmark tone="paper" />
          </Link>
          <Link
            href={routes.landing}
            aria-label="Cerrar"
            className="flex h-10 w-10 items-center justify-end text-paper"
          >
            <CloseIcon />
          </Link>
        </div>

        <div className="relative mt-3 min-h-0 flex-1">
          <button
            type="button"
            aria-label="Anterior"
            className="absolute inset-y-0 left-0 z-10 w-[32%]"
            onClick={() => go(-1)}
          />
          <button
            type="button"
            aria-label="Siguiente"
            className="absolute inset-y-0 right-0 z-10 w-[68%]"
            onClick={() => go(1)}
          />
        </div>

        <div
          className="relative z-20 mt-auto"
          onTouchStart={(event) => {
            touch.current = {
              x: event.touches[0].clientX,
              y: event.touches[0].clientY,
            };
          }}
          onTouchEnd={(event) => {
            if (!touch.current) return;
            const dx = event.changedTouches[0].clientX - touch.current.x;
            const dy = event.changedTouches[0].clientY - touch.current.y;
            touch.current = null;
            if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
              go(dx < 0 ? 1 : -1);
              return;
            }
            if (Math.abs(dy) > 40 && Math.abs(dy) > Math.abs(dx)) {
              if (dy < 0) go(1);
              else router.push(routes.landing);
            }
          }}
        >
          <span className="inline-flex rounded-sm bg-ink px-2 py-0.5 font-sans text-[10px] font-semibold tracking-[0.14em] text-paper uppercase">
            {homeCopy.recientBadge}
          </span>
          <p className="mt-2 font-sans text-[12px] text-paper/70">
            {relativeHace(at)}
          </p>
          <BrandNameLink
            brand={sku.brand}
            className="mt-3 block font-sans text-[15px] font-semibold text-paper"
          />
          <h1 className="mt-1 font-serif text-[34px] leading-[1.02] text-paper">
            {sku.name}
          </h1>
          <p className="mt-2 font-sans text-[22px] font-bold text-paper">
            {formatARSCode(sku.price_ars)}
          </p>
          <BrandNameLink
            brand={sku.brand}
            className="mt-1 block font-sans text-[11px] tracking-[0.28em] text-paper/80 uppercase"
          />

          <div className="mt-5 flex items-center gap-3">
            <StoreCta sku={sku} variant="cream" />
            <ShareFindingButton skuId={sku.id} sku={sku} variant="native" />
          </div>
          <p className="mt-4 text-center font-sans text-[12px] text-paper/80">
            {homeCopy.hero}
          </p>
          <div className="mt-1 flex justify-center text-paper/70">
            <ChevronUpIcon className="h-4 w-4" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
