"use client";

import Link from "next/link";
import { BrandMenu } from "@/components/BrandMenu";
import { CloudOffIcon } from "@/components/Icons";
import { DisconnectTiendaNube } from "@/components/MerchantDisconnectConfirm";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { dashboardCopy } from "@/lib/brand";
import { brandSlug } from "@/lib/marca";
import { routes } from "@/lib/routes";

export function MerchantSyncFail({
  storeName = "Tu tienda",
  onRetry,
  busy = false,
}: {
  storeName?: string;
  onRetry: () => void;
  busy?: boolean;
}) {
  const vitrinaHref = routes.marca(brandSlug(storeName));

  return (
    <PhoneFrame className="bg-cream">
      <header className="flex items-start justify-between gap-3 px-4 pt-6">
        <div className="flex min-w-0 items-center gap-2">
          <BrandMenu vitrinaHref={vitrinaHref} align="left" />
          <Link href={routes.landing} aria-label="Con pinta">
            <Wordmark />
          </Link>
        </div>
        <div className="min-w-0 pt-1 text-right">
          <p className="truncate font-sans text-[13px] text-ink">{storeName}</p>
          <p className="mt-0.5 font-sans text-[12px] text-terracotta">
            {dashboardCopy.disconnected}
          </p>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-6 pt-16 pb-[calc(1.25rem+env(safe-area-inset-bottom))] text-center">
        <CloudOffIcon className="h-[72px] w-[72px] text-ink" />
        <h1 className="mt-6 max-w-[16ch] font-serif text-[34px] leading-[1.08] text-ink">
          {dashboardCopy.syncFailTitle}
        </h1>
        <p className="mt-3 font-sans text-[15px] leading-6 text-ink/65">
          {dashboardCopy.syncFailSub}
        </p>
        <div className="mt-10 flex w-full max-w-[320px] flex-col gap-3">
          <button
            type="button"
            onClick={onRetry}
            disabled={busy}
            className="flex h-12 w-full items-center justify-center rounded-2xl bg-ink font-sans text-[16px] font-medium text-paper disabled:opacity-60"
          >
            {dashboardCopy.resync}
          </button>
          <a
            href={routes.marcasSalir}
            className="flex h-12 w-full items-center justify-center rounded-2xl border border-ink bg-paper font-sans text-[16px] font-medium text-ink"
          >
            {dashboardCopy.logout}
          </a>
          <DisconnectTiendaNube className="mt-1 font-sans text-[14px] text-ink/55 underline underline-offset-2" />
        </div>
      </main>
    </PhoneFrame>
  );
}
