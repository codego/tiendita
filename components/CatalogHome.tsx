"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CategoryChips } from "@/components/CategoryChips";
import { ProductCard } from "@/components/ProductCard";
import { SearchIcon } from "@/components/Icons";
import { Wordmark } from "@/components/Wordmark";
import { HOME_CHIPS, homeCopy } from "@/lib/home";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

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

export function CatalogHome({ skus }: { skus: Sku[] }) {
  const [chip, setChip] = useState("todas");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return skus.filter((sku) => {
      if (chip !== "todas" && sku.chip !== chip) return false;
      if (!q) return true;
      return matchesQuery(sku, q);
    });
  }, [chip, query, skus]);

  return (
    <div className="pb-8">
      <header className="px-4 pt-4">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark />
        </Link>
        <h1 className="mt-3 font-sans text-[15px] leading-snug text-ink">
          {homeCopy.hero}
        </h1>
      </header>

      <div className="px-4 pt-3">
        <label className="flex h-12 items-center gap-2 rounded-full bg-cream px-4">
          <SearchIcon className="h-5 w-5 shrink-0 text-ink/45" />
          <span className="sr-only">{homeCopy.search}</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={homeCopy.search}
            className="h-full w-full bg-transparent font-sans text-[15px] text-ink outline-none placeholder:text-ink/40"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
          />
        </label>
      </div>

      <div className="mt-3 px-4">
        <CategoryChips
          chips={HOME_CHIPS.map((item) => ({ id: item.id, label: item.label }))}
          active={chip}
          onChange={setChip}
        />
      </div>

      <section className="mx-4 mt-4 bg-cream px-4 py-5">
        <p className="font-serif text-[26px] leading-[1.05] text-ink">
          {homeCopy.hero}
        </p>
        <p className="mt-2 font-sans text-[14px] leading-5 text-ink/70">
          {homeCopy.banner}
        </p>
        <Link
          href={routes.marcas}
          className="mt-4 inline-flex h-10 items-center rounded-full bg-terracotta px-4 font-sans text-[13px] font-medium text-paper"
        >
          {homeCopy.bannerCta}
        </Link>
      </section>

      <div className="mt-4 grid grid-cols-2 gap-x-2 gap-y-5 px-3">
        {visible.map((sku) => (
          <ProductCard key={sku.id} sku={sku} showMeta={false} dense />
        ))}
      </div>
    </div>
  );
}
