"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { BrandMenu } from "@/components/BrandMenu";
import { MerchantResyncOk } from "@/components/MerchantResyncOk";
import { MerchantSyncFail } from "@/components/MerchantSyncFail";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProductPhoto } from "@/components/ProductPhoto";
import { Wordmark } from "@/components/Wordmark";
import { rankForwarded, tonightXor } from "@/lib/cockpit.mjs";
import { brandCopy, dashboardCopy, elegirCopy } from "@/lib/brand";
import { tonightPieceForStore } from "@/lib/las21";
import { brandSlug } from "@/lib/marca";
import { routes } from "@/lib/routes";
import { storePieces } from "@/lib/store-pieces";
import { setLastSyncAt } from "@/lib/sync";
import { useHydrated } from "@/lib/useHydrated";
import { usePublishedIds } from "@/lib/usePublished";
import { useWeekShareMap } from "@/lib/useShares";
import { useWeekClickMap } from "@/lib/useStoreClicks";
import type { TiendaNubeProduct, TiendaNubeStore } from "@/lib/types";

function ResyncButton({
  onClick,
  busy,
  className,
}: {
  onClick: () => void;
  busy: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className={className}
    >
      {dashboardCopy.resync}
    </button>
  );
}

export function BrandDashboard({
  store,
  products = [],
  source = "mock",
  syncFailed = false,
  syncOk = false,
}: {
  store?: TiendaNubeStore | null;
  products?: TiendaNubeProduct[];
  source?: "mock" | "live";
  syncFailed?: boolean;
  syncOk?: boolean;
}) {
  const router = useRouter();
  const hydrated = useHydrated();
  const publishedIds = usePublishedIds();
  const clickMap = useWeekClickMap();
  const shareMap = useWeekShareMap();
  const [retryFailed, setRetryFailed] = useState(false);
  const [showOk, setShowOk] = useState(syncOk);
  const [busy, setBusy] = useState(false);
  const failed = syncFailed || retryFailed;

  const storeName = store?.name ?? "Tu tienda";
  const vitrinaHref = routes.marca(brandSlug(storeName));
  const empty = !hydrated || publishedIds.length === 0;
  const status = source === "mock" ? brandCopy.mockLabel : dashboardCopy.connected;
  const tonight = tonightPieceForStore(storeName);
  const drop = tonightXor(tonight);

  const pieces = useMemo(
    () => storePieces(storeName, products),
    [products, storeName],
  );

  const salidas = useMemo(
    () => pieces.reduce((sum, piece) => sum + (clickMap[piece.id] ?? 0), 0),
    [clickMap, pieces],
  );

  const forwarded = useMemo(
    () =>
      rankForwarded(
        pieces.map((piece) => ({
          ...piece,
          count: shareMap[piece.id] ?? 0,
        })),
      ),
    [pieces, shareMap],
  );

  async function resync() {
    setBusy(true);
    try {
      const response = await fetch(routes.marcasSync, { method: "POST" });
      if (!response.ok) {
        setRetryFailed(true);
        return;
      }
      setLastSyncAt();
      setRetryFailed(false);
      setShowOk(true);
      router.replace(`${routes.marcas}?sync=ok`);
      router.refresh();
    } catch {
      setRetryFailed(true);
    } finally {
      setBusy(false);
    }
  }

  function dismissOk() {
    setShowOk(false);
    router.replace(routes.marcas);
  }

  const okSheet = showOk ? (
    <MerchantResyncOk onPanel={dismissOk} onClose={dismissOk} />
  ) : null;

  if (failed) {
    return (
      <MerchantSyncFail
        storeName={storeName}
        onRetry={resync}
        busy={busy}
      />
    );
  }

  if (empty) {
    return (
      <PhoneFrame>
        <header className="relative z-20 flex h-14 items-center justify-between px-4">
          <BrandMenu vitrinaHref={vitrinaHref} align="left" />
          <Link
            href={routes.landing}
            className="absolute left-1/2 -translate-x-1/2"
            aria-label="Con pinta"
          >
            <Wordmark />
          </Link>
          <span className="h-10 w-10" />
        </header>

        <div className="flex items-center gap-3 px-5 pt-2 pb-5">
          <BrandMark name={storeName} />
          <div className="min-w-0">
            <h1 className="font-serif text-[28px] leading-none text-ink">
              {storeName}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 font-sans text-[13px] text-ink/60">
              <span
                className="h-2 w-2 shrink-0 rounded-full bg-[#3D8B5A]"
                aria-hidden="true"
              />
              {status}
            </p>
            <ResyncButton
              onClick={resync}
              busy={busy}
              className="mt-2 font-sans text-[13px] text-terracotta underline underline-offset-2 disabled:opacity-60"
            />
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
        {okSheet}
      </PhoneFrame>
    );
  }

  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <p className="font-serif text-[18px] leading-none text-ink">
          Con pinta ·{" "}
          <span className="text-terracotta">{dashboardCopy.kickerAccent}</span>
        </p>
        <BrandMenu vitrinaHref={vitrinaHref} variant="person" />
      </header>

      <main className="flex-1 px-5 pt-7">
        <h1 className="font-serif text-[40px] leading-[1.02] text-ink">
          {storeName}
        </h1>
        <p className="mt-2 font-sans text-[15px] text-ink/65">{status}</p>
        <ResyncButton
          onClick={resync}
          busy={busy}
          className="mt-2 font-sans text-[14px] text-terracotta underline underline-offset-2 disabled:opacity-60"
        />

        <section className="mt-8 rounded-[28px] bg-paper px-6 pt-8 pb-6 text-center">
          <p className="font-serif text-[88px] leading-none text-terracotta">
            {hydrated ? salidas : "—"}
          </p>
          <p className="mt-3 font-sans text-[15px] text-ink">
            {dashboardCopy.salidas}
          </p>
          <p className="mt-8 font-sans text-[12px] text-ink/45">
            {dashboardCopy.footer}
          </p>
        </section>

        <h2 className="mt-10 font-serif text-[26px] leading-snug text-ink">
          {dashboardCopy.forwarded}
        </h2>
        {hydrated && forwarded.length > 0 ? (
          <ul className="mt-3">
            {forwarded.map((piece) => (
              <li
                key={piece.id}
                className="flex items-center gap-3 border-b border-ink/10 py-3 last:border-b-0"
              >
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-cream">
                  <ProductPhoto
                    src={piece.image}
                    alt={piece.name}
                    sizes="48px"
                  />
                </div>
                <p className="min-w-0 flex-1 truncate font-serif text-[18px] leading-tight text-ink">
                  {piece.name}
                </p>
                <p className="shrink-0 font-serif text-[22px] leading-none text-terracotta">
                  {piece.count}
                </p>
              </li>
            ))}
          </ul>
        ) : null}

        <h2 className="mt-10 font-serif text-[26px] leading-snug text-ink">
          {dashboardCopy.tonightTitle}
        </h2>
        {drop.showCard && tonight ? (
          <div className="mt-3">
            <div className="flex items-center gap-3 rounded-[22px] bg-paper px-3 py-3">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream">
                <ProductPhoto
                  src={tonight.image}
                  alt={tonight.name}
                  sizes="56px"
                />
              </div>
              <p className="min-w-0 flex-1 truncate font-serif text-[18px] leading-tight text-ink">
                {tonight.name}
              </p>
              <span className="shrink-0 rounded-full bg-terracotta px-3 py-1 font-sans text-[12px] font-medium text-paper">
                {dashboardCopy.tonightChip}
              </span>
            </div>
            <div className="mt-3 flex justify-end">
              <Link
                href={routes.marcasElegir}
                className="rounded-full border border-ink px-4 py-1.5 font-sans text-[13px] font-medium text-ink"
              >
                {dashboardCopy.change}
              </Link>
            </div>
          </div>
        ) : null}
        {drop.showEmpty ? (
          <p className="mt-3 font-sans text-[15px] leading-6 text-ink/70">
            {dashboardCopy.tonightEmpty}
          </p>
        ) : null}
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
      </div>
      {okSheet}
    </PhoneFrame>
  );
}
