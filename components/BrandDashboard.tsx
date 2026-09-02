"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { BrandMark } from "@/components/BrandMark";
import { BrandMenu } from "@/components/BrandMenu";
import { PhoneFrame } from "@/components/PhoneFrame";
import { RefreshIcon } from "@/components/Icons";
import { Wordmark } from "@/components/Wordmark";
import { brandCopy, dashboardCopy, elegirCopy, lastSyncLine } from "@/lib/brand";
import { brandSlug } from "@/lib/marca";
import { bumpRecien, catalogIdsFromTn, TN_TO_SKU } from "@/lib/recien";
import { setPublishedIds } from "@/lib/published";
import { routes } from "@/lib/routes";
import { setLastSyncAt } from "@/lib/sync";
import { relativeHace } from "@/lib/time";
import { useLastSyncAt } from "@/lib/useLastSync";
import { usePublishedIds } from "@/lib/usePublished";
import { useWeekClickMap, useWeekStoreClicks } from "@/lib/useStoreClicks";
import { useHydrated } from "@/lib/useHydrated";
import { useWeekVisits } from "@/lib/useVisits";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

export function BrandDashboard({
  store,
  products,
  source = "mock",
}: {
  store: TiendaNubeStore;
  products: TiendaNubeProduct[];
  source?: "mock" | "live";
}) {
  const router = useRouter();
  const hydrated = useHydrated();
  const publishedIds = usePublishedIds();
  const weekClicks = useWeekStoreClicks();
  const clickMap = useWeekClickMap();
  const visits = useWeekVisits();
  const lastSync = useLastSyncAt();
  const [hidden, setHidden] = useState<string[]>([]);

  const vitrinaHref = routes.marca(brandSlug(store.name));
  const publishedSet = useMemo(() => new Set(publishedIds), [publishedIds]);

  const listed = useMemo(() => {
    const ids = new Set([...publishedIds, ...hidden]);
    return products.filter((product) => ids.has(product.id));
  }, [hidden, products, publishedIds]);

  const empty = !hydrated || (publishedIds.length === 0 && hidden.length === 0);

  function toggle(id: string) {
    const on = publishedSet.has(id);
    const next = on
      ? publishedIds.filter((item) => item !== id)
      : [...publishedIds, id];
    setPublishedIds(next);
    if (on) {
      setHidden((current) =>
        current.includes(id) ? current : [...current, id],
      );
    } else {
      setHidden((current) => current.filter((item) => item !== id));
      bumpRecien(catalogIdsFromTn([id]));
    }
  }

  function sync() {
    setLastSyncAt(Date.now());
    router.refresh();
  }

  const status =
    source === "mock"
      ? brandCopy.mockLabel
      : lastSyncLine(hydrated ? relativeHace(lastSync) : "hace instantes");

  if (empty) {
    return (
      <PhoneFrame>
        <header className="relative z-20 flex h-14 items-center justify-between px-4">
          <BrandMenu vitrinaHref={vitrinaHref} align="left" />
          <Link
            href={routes.landing}
            className="absolute left-1/2 -translate-x-1/2"
            aria-label="Curadario"
          >
            <Wordmark />
          </Link>
          <span className="h-10 w-10" />
        </header>

        <div className="flex items-center gap-3 px-5 pt-2 pb-5">
          <BrandMark name={store.name} />
          <div className="min-w-0">
            <h1 className="font-serif text-[28px] leading-none text-ink">
              {store.name}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 font-sans text-[13px] text-ink/60">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#3D8B5A]"
                aria-hidden="true"
              />
              {source === "mock" ? brandCopy.mockLabel : dashboardCopy.connected}
            </p>
          </div>
        </div>
        <hr className="border-ink/10" />

        <main className="flex flex-1 flex-col items-center px-6 pt-16 text-center">
          <h2 className="max-w-[16ch] font-serif text-[34px] leading-[1.08] text-ink">
            {elegirCopy.emptyTitle}
          </h2>
          <p className="mt-3 max-w-[28ch] font-sans text-[15px] leading-6 text-ink/65">
            {elegirCopy.emptyFeed}
          </p>
          <Link
            href={routes.marcasElegir}
            className="mt-10 flex h-12 w-full max-w-[320px] items-center justify-center rounded-2xl bg-terracotta font-sans text-[16px] font-medium text-paper"
          >
            {dashboardCopy.pick}
          </Link>
          <a
            href={routes.marcasSalir}
            className="mt-3 flex h-12 w-full max-w-[320px] items-center justify-center rounded-2xl border border-ink/15 bg-transparent font-sans text-[16px] font-medium text-ink"
          >
            {dashboardCopy.logout}
          </a>
        </main>
      </PhoneFrame>
    );
  }

  const metrics = [
    { value: visits, label: dashboardCopy.visitsLabel },
    { value: weekClicks, label: dashboardCopy.clicksLabel },
    { value: publishedIds.length, label: dashboardCopy.publishedLabel },
  ];

  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <p className="font-serif text-[18px] leading-none text-ink">
          Curadario ·{" "}
          <span className="text-terracotta">{dashboardCopy.kickerAccent}</span>
        </p>
        <BrandMenu vitrinaHref={vitrinaHref} variant="person" />
      </header>

      <main className="flex-1 px-5 pt-7">
        <h1 className="font-serif text-[40px] leading-[1.02] text-ink">
          {store.name}
        </h1>
        <p className="mt-2 flex items-center gap-1.5 font-sans text-[13px] text-ink/60">
          <span
            className="h-2 w-2 shrink-0 rounded-full bg-[#3D8B5A]"
            aria-hidden="true"
          />
          <span>{status}</span>
        </p>

        <button
          type="button"
          onClick={sync}
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-ink/20 bg-transparent font-sans text-[15px] font-medium text-ink"
        >
          <RefreshIcon className="h-4 w-4" />
          {dashboardCopy.sync}
        </button>

        <h2 className="mt-8 font-serif text-[22px] leading-snug text-ink">
          {dashboardCopy.title}
        </h2>
        <dl className="mt-4 grid grid-cols-3 gap-2">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`text-center ${
                index === 1 ? "border-x border-ink/10" : ""
              }`}
            >
              <dt className="sr-only">{metric.label}</dt>
              <dd className="font-serif text-[28px] leading-none text-ink">
                {hydrated ? metric.value : "—"}
              </dd>
              <p className="mt-2 font-sans text-[11px] leading-4 text-ink/55">
                {metric.label}
              </p>
            </div>
          ))}
        </dl>

        <h2 className="mt-8 font-serif text-[22px] leading-snug text-ink">
          {dashboardCopy.list}
        </h2>
        <ul className="mt-2">
          {listed.map((product) => {
            const on = publishedSet.has(product.id);
            const skuId = TN_TO_SKU[product.id] ?? product.id.replace(/^tn-/, "");
            const clicks = clickMap[skuId] ?? 0;
            return (
              <li
                key={product.id}
                className="flex items-center gap-3 border-b border-ink/8 py-3 last:border-b-0"
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
                  <p className="mt-0.5 font-sans text-[12px] text-ink/55">
                    {dashboardCopy.clicksWeek} {hydrated ? clicks : "—"}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={on}
                    aria-label={
                      on
                        ? `Ocultar ${product.name}`
                        : `Publicar ${product.name}`
                    }
                    onClick={() => toggle(product.id)}
                    className={`relative h-7 w-12 rounded-full transition-colors ${
                      on ? "bg-terracotta" : "bg-ink/15"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-paper shadow-sm transition-transform ${
                        on ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                  {on ? null : (
                    <p className="mt-1 font-sans text-[11px] font-medium text-ink/45">
                      {dashboardCopy.hidden}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </main>

      <div className="sticky bottom-0 bg-surface px-5 pt-3 pb-[calc(1rem+env(safe-area-inset-bottom))]">
        <Link
          href={routes.marcasElegir}
          className="flex h-12 w-full items-center justify-center rounded-2xl bg-ink font-sans text-[15px] font-medium text-paper"
        >
          {dashboardCopy.more}
        </Link>
        <Link
          href={vitrinaHref}
          className="mt-2.5 flex h-12 w-full items-center justify-center rounded-2xl border border-ink bg-transparent font-sans text-[15px] font-medium text-ink"
        >
          {dashboardCopy.vitrina}
        </Link>
        <p className="mt-3 text-center font-sans text-[12px] text-ink/45">
          {dashboardCopy.footer}
        </p>
      </div>
    </PhoneFrame>
  );
}
