"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { FeedCard } from "@/components/FeedCard";
import { RailCard } from "@/components/RailCard";
import { ChevronRightIcon, SearchIcon } from "@/components/Icons";
import { Wordmark } from "@/components/Wordmark";
import { getSku } from "@/lib/catalog";
import { HOME_CHIPS, homeCopy } from "@/lib/home";
import { routes } from "@/lib/routes";
import { useRecienIds } from "@/lib/useRecien";
import type { Sku } from "@/lib/types";

const PAGE = 14;

function matchesQuery(sku: Sku, query: string): boolean {
  const haystack = [
    sku.name,
    sku.brand,
    sku.tela,
    sku.corte,
    sku.categoryLabel,
    sku.description,
    HOME_CHIPS.find((chip) => chip.id === sku.chip)?.label ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function shapeFor(index: number): "portrait" | "tall" | "square" | "wide" {
  if (index % 9 === 3) return "wide";
  if (index % 5 === 1) return "tall";
  if (index % 4 === 2) return "square";
  return "portrait";
}

export function CatalogHome({ skus }: { skus: Sku[] }) {
  const [chip, setChip] = useState("todas");
  const [query, setQuery] = useState("");
  const [pages, setPages] = useState(2);
  const recientIds = useRecienIds();
  const sentinel = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skus.filter((sku) => {
      if (chip !== "todas" && sku.chip !== chip) return false;
      if (!q) return true;
      return matchesQuery(sku, q);
    });
  }, [chip, query, skus]);

  const recient = useMemo(
    () =>
      recientIds
        .map((id) => getSku(id))
        .filter((sku): sku is Sku => sku != null)
        .filter((sku) => {
          if (chip !== "todas" && sku.chip !== chip) return false;
          const q = query.trim().toLowerCase();
          return q ? matchesQuery(sku, q) : true;
        })
        .slice(0, 16),
    [chip, query, recientIds],
  );

  const feed = useMemo(() => {
    if (visible.length === 0) return [];
    const need = pages * PAGE;
    return Array.from({ length: need }, (_, index) => {
      const sku = visible[index % visible.length];
      return { key: `${sku.id}-${index}`, sku, shape: shapeFor(index) };
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
      <header className="flex items-center justify-between px-4 pt-3">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
        <Link
          href={routes.buscar}
          aria-label={homeCopy.search}
          className="flex h-10 w-10 items-center justify-end"
        >
          <SearchIcon />
        </Link>
      </header>

      <h1 className="px-4 pt-2 font-sans text-[15px] leading-snug text-ink">
        {homeCopy.hero}
      </h1>

      <Link
        href={routes.marcas}
        className="mt-2 flex items-center justify-between px-4 py-2"
      >
        <span className="font-sans text-[14px] font-medium text-ink">
          {homeCopy.marcasRow}
        </span>
        <ChevronRightIcon className="h-5 w-5 text-ink/45" />
      </Link>

      <div className="px-4 pt-1">
        <label className="sr-only" htmlFor="home-search">
          {homeCopy.search}
        </label>
        <input
          id="home-search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPages(2);
          }}
          placeholder={homeCopy.search}
          className="sr-only"
        />
        <CategoryChips
          chips={HOME_CHIPS.map((item) => ({ id: item.id, label: item.label }))}
          active={chip}
          onChange={(id) => {
            setChip(id);
            setPages(2);
          }}
        />
      </div>

      <section className="pt-4" aria-label={homeCopy.recient}>
        <div className="flex items-center justify-between px-4">
          <h2 className="font-sans text-[15px] font-semibold text-ink">
            {homeCopy.recient}
          </h2>
          <ChevronRightIcon className="h-5 w-5 text-ink/40" />
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {recient.map((sku) => (
            <RailCard key={sku.id} sku={sku} />
          ))}
        </div>
      </section>

      <div className="mt-3 grid grid-cols-2 gap-1.5 px-2">
        {feed.map((item) => (
          <FeedCard key={item.key} sku={item.sku} shape={item.shape} />
        ))}
      </div>
      <div ref={sentinel} className="h-4" aria-hidden="true" />
    </div>
  );
}
