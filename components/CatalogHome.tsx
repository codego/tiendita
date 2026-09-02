"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { Las21Module } from "@/components/Las21Module";
import { ProductCard } from "@/components/ProductCard";
import { RailCard } from "@/components/RailCard";
import { RecienRailSkeleton } from "@/components/Skeleton";
import { SchedulePiece } from "@/components/SchedulePiece";
import { SearchIcon } from "@/components/Icons";
import { SiteLinks } from "@/components/SiteLinks";
import { Wordmark } from "@/components/Wordmark";
import { getSku, searchSkus } from "@/lib/catalog";
import { filterFeedSkus } from "@/lib/published";
import { HOME_CHIPS, homeCopy } from "@/lib/home";
import { ANOCHE_LABEL, VER_TODO } from "@/lib/las21";
import { routes } from "@/lib/routes";
import { useHydrated } from "@/lib/useHydrated";
import { usePublishedIds, usePublishedOverride } from "@/lib/usePublished";
import { useRecienIds } from "@/lib/useRecien";
import { useRouter } from "next/navigation";
import type { Sku } from "@/lib/types";

const PAGE = 16;

export function CatalogHome({
  skus,
  forceDrop = false,
  drop = [],
  anoche = [],
  initialNow,
}: {
  skus: Sku[];
  forceDrop?: boolean;
  drop?: Sku[];
  anoche?: Sku[];
  initialNow?: number;
}) {
  const router = useRouter();
  const [chip, setChip] = useState("todas");
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(2);
  const recientIds = useRecienIds();
  const hydrated = useHydrated();
  const publishedIds = usePublishedIds();
  const publishedOverride = usePublishedOverride();
  const sentinel = useRef<HTMLDivElement>(null);

  const catalog = useMemo(
    () => (hydrated ? filterFeedSkus(skus, publishedIds, publishedOverride) : skus),
    [hydrated, publishedIds, publishedOverride, skus],
  );

  const visible = useMemo(() => {
    const q = query.trim();
    const pool = q
      ? (() => {
          const found = new Set(searchSkus(q).map((sku) => sku.id));
          return catalog.filter((sku) => found.has(sku.id));
        })()
      : catalog;
    return pool.filter((sku) => chip === "todas" || sku.chip === chip);
  }, [catalog, chip, query]);

  const recient = useMemo(
    () =>
      filterFeedSkus(
        recientIds
          .map((id) => getSku(id))
          .filter((sku): sku is Sku => sku != null),
        publishedIds,
        hydrated && publishedOverride,
      ).slice(0, 12),
    [hydrated, publishedIds, publishedOverride, recientIds],
  );

  const feed = useMemo(() => {
    if (visible.length === 0) return [];
    const need = Math.max(visible.length, pages * PAGE);
    return Array.from({ length: need }, (_, index) => {
      const sku = visible[index % visible.length];
      return { key: `${sku.id}-${index}`, sku };
    });
  }, [pages, visible]);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPages((current) => current + 1);
        }
      },
      { rootMargin: "240px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <header className="px-4 pt-3">
        <div className="flex items-center gap-3">
          <Link href={routes.landing} aria-label="Curadario" className="shrink-0">
            <Wordmark />
          </Link>
          <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-full bg-cream px-3">
            <SearchIcon className="h-4 w-4 shrink-0 text-ink/45" />
            <span className="sr-only">{homeCopy.search}</span>
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPages(2);
              }}
              placeholder={homeCopy.search}
              className="h-full w-full bg-transparent font-sans text-[13px] text-ink outline-none placeholder:text-ink/40"
              autoCapitalize="off"
              autoCorrect="off"
              autoComplete="off"
              onKeyDown={(event) => {
                if (event.key !== "Enter") return;
                const q = query.trim();
                if (!q) return;
                event.preventDefault();
                router.push(`${routes.buscar}?q=${encodeURIComponent(q)}`);
              }}
            />
          </label>
        </div>
        <h1 className="mt-3 font-sans text-[15px] leading-snug text-ink">
          {homeCopy.hero}
        </h1>
      </header>

      <Las21Module
        forceDrop={forceDrop}
        drop={drop}
        initialNow={initialNow ?? Date.now()}
      />

      <div className="mt-3 px-4">
        <CategoryChips
          chips={HOME_CHIPS.map((item) => ({ id: item.id, label: item.label }))}
          active={chip}
          onChange={(id) => {
            setChip(id);
            setPages(2);
          }}
        />
      </div>

      <section className="mx-4 mt-3 flex items-center justify-between gap-3 rounded-md bg-terracotta px-3 py-3">
        <p className="min-w-0 font-sans text-[14px] font-medium leading-snug text-paper">
          {homeCopy.banner}
        </p>
        <Link
          href={routes.marcas}
          className="shrink-0 rounded-full bg-paper px-3 py-1.5 font-sans text-[12px] font-medium text-terracotta"
        >
          {homeCopy.bannerCta}
        </Link>
      </section>

      {!hydrated ? <RecienRailSkeleton /> : recient.length > 0 ? (
        <section className="pt-4" aria-label={homeCopy.recient}>
          <div className="px-4">
            <Link href={routes.recient}>
              <h2 className="font-sans text-[15px] font-semibold text-ink">
                {homeCopy.recient}
              </h2>
            </Link>
          </div>
          <div className="mt-2 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {recient.map((sku) => (
              <RailCard key={sku.id} sku={sku} />
            ))}
          </div>
        </section>
      ) : null}

      {anoche.length > 0 ? (
        <section className="px-4 pt-4" aria-label={ANOCHE_LABEL}>
          <div className="flex items-end justify-between gap-3">
            <h2 className="font-sans text-[15px] font-semibold text-ink">
              {homeCopy.anoche}
            </h2>
            <Link
              href={routes.anoche}
              className="font-sans text-[13px] text-ink underline underline-offset-2"
            >
              {VER_TODO}
            </Link>
          </div>
          <div className="mt-3 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {anoche.map((sku) => (
              <div key={sku.id} className="w-[128px] shrink-0">
                <SchedulePiece sku={sku} />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-3 grid grid-cols-2 gap-x-2 gap-y-4 px-3">
        {feed.map((item) => (
          <ProductCard key={item.key} sku={item.sku} showMeta={false} dense />
        ))}
      </div>
      <div ref={sentinel} className="h-4" aria-hidden="true" />
      <SiteLinks className="px-5 pt-8 pb-6 text-center font-sans text-[13px] text-ink/45" />
    </div>
  );
}
