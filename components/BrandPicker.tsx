"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BackIcon, CloudIcon, SearchIcon } from "@/components/Icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { brandCopy, elegirCopy, publishCta, syncBanner } from "@/lib/brand";
import { formatARS } from "@/lib/money";
import { setPublishedIds } from "@/lib/published";
import { bumpRecien, catalogIdsFromTn } from "@/lib/recien";
import { routes } from "@/lib/routes";
import { defaultSelectedIds } from "@/lib/tiendanube";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

export function BrandPicker({
  store,
  products,
  source = "mock",
}: {
  store: TiendaNubeStore;
  products: TiendaNubeProduct[];
  source?: "mock" | "live";
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Set<string>>(
    () => new Set(source === "live" ? [] : defaultSelectedIds()),
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((product) => product.name.toLowerCase().includes(q));
  }, [products, query]);

  const count = selected.size;

  function toggle(id: string) {
    setSelected((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function publish() {
    const ids = [...selected];
    setPublishedIds(ids);
    bumpRecien(catalogIdsFromTn(ids));
    router.push(routes.landing);
  }

  return (
    <PhoneFrame>
      <header className="relative z-20 flex h-14 items-center justify-between px-4">
        <Link
          href={routes.marcas}
          aria-label="Volver"
          className="flex h-10 w-10 items-center justify-start"
        >
          <BackIcon />
        </Link>
        <Link href={routes.landing} className="absolute left-1/2 -translate-x-1/2">
          <Wordmark />
        </Link>
        <span className="h-10 w-10" />
      </header>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="px-5 pt-2">
          <h1 className="font-serif text-[34px] leading-[1.05] text-ink">
            {elegirCopy.title}
          </h1>
          <div className="mt-4 flex items-center gap-2.5 rounded-full bg-cream px-3.5 py-2.5">
            <CloudIcon className="h-4 w-4 text-ink/55" />
            <p className="font-sans text-[13px] leading-tight text-ink/70">
              {source === "mock"
                ? brandCopy.mockPicker
                : syncBanner(store.syncedCount)}
            </p>
          </div>
          <label className="mt-5 flex items-center gap-2 border-b border-ink/15">
            <SearchIcon className="h-5 w-5 text-ink/40" />
            <span className="sr-only">{elegirCopy.search}</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={elegirCopy.search}
              className="h-11 w-full bg-transparent font-sans text-[16px] text-ink outline-none placeholder:text-ink/35"
              autoCapitalize="off"
              autoCorrect="off"
            />
          </label>
        </div>

        <ul className="flex-1 overflow-y-auto px-5 pt-3 pb-4">
          {visible.length === 0 ? (
            <li className="py-8 font-sans text-[15px] text-ink/60">
              {elegirCopy.empty}
            </li>
          ) : (
            visible.map((product) => {
              const on = selected.has(product.id);
              return (
                <li
                  key={product.id}
                  className="flex items-center gap-3 border-b border-ink/6 py-3 last:border-b-0"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="56px"
                      unoptimized={product.image.startsWith("http")}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-serif text-[17px] leading-tight text-ink">
                      {product.name}
                    </p>
                    <p className="mt-0.5 font-sans text-[13px] text-ink/55">
                      {formatARS(product.price_ars)} ARS
                    </p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={
                      on
                        ? `Quitar ${product.name}`
                        : `Publicar ${product.name}`
                    }
                    onClick={() => toggle(product.id)}
                    className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                      on ? "bg-ink" : "bg-ink/15"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-paper shadow-sm transition-transform ${
                        on ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </li>
              );
            })
          )}
        </ul>

        <div className="sticky bottom-0 bg-surface px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
          {count === 0 ? (
            <p className="mb-3 text-center font-sans text-[13px] leading-5 text-terracotta">
              {elegirCopy.emptyFeed}
            </p>
          ) : null}
          <button
            type="button"
            onClick={publish}
            disabled={count === 0}
            className="flex h-12 w-full items-center justify-center rounded-full bg-ink font-sans text-[16px] font-medium text-paper disabled:opacity-40"
          >
            {publishCta(count)}
          </button>
          <p className="mt-3 text-center font-sans text-[12px] leading-5 text-ink/50">
            {elegirCopy.noteHidden}
            <br />
            {elegirCopy.noteCheckout}
          </p>
        </div>
      </div>
    </PhoneFrame>
  );
}
