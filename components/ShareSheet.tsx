"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  BackIcon,
  ChevronRightIcon,
  InstagramIcon,
  LinkIcon,
  MoreIcon,
  WhatsAppIcon,
} from "@/components/Icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { ProductPhoto } from "@/components/ProductPhoto";
import { shareCopy } from "@/lib/brand";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import {
  findingShareText,
  findingUrl,
  whatsappShareHref,
} from "@/lib/shareFinding";
import { trackShare } from "@/lib/shares";
import type { Sku } from "@/lib/types";

export function ShareSheet({ sku }: { sku: Sku }) {
  const router = useRouter();
  const [status, setStatus] = useState("");

  function currentUrl() {
    return findingUrl(window.location.origin, sku.id);
  }

  async function copyLink(
    message: string = shareCopy.copied,
    payload?: string,
  ) {
    const url = currentUrl();
    const text = payload ?? url;
    try {
      await navigator.clipboard.writeText(text);
      setStatus(message);
    } catch {
      setStatus(text);
    }
    trackShare(sku.id);
  }

  async function shareNative() {
    const url = currentUrl();
    const text = findingShareText(url, sku);
    if (navigator.share) {
      try {
        await navigator.share({
          title: sku.name,
          text,
          url,
        });
        trackShare(sku.id);
        router.push(routes.landing);
        return;
      } catch {
        // Cancelled or unsupported — copy instead.
      }
    }
    await copyLink();
    router.push(routes.landing);
  }

  function openWhatsApp() {
    trackShare(sku.id);
    window.open(whatsappShareHref(currentUrl(), sku), "_blank", "noopener,noreferrer");
  }

  const actions = [
    {
      id: "copy",
      label: shareCopy.copyLink,
      icon: LinkIcon,
      onClick: () => {
        void copyLink();
      },
    },
    {
      id: "stories",
      label: shareCopy.stories,
      icon: InstagramIcon,
      onClick: () => {
        void copyLink(shareCopy.storiesHint, findingShareText(currentUrl(), sku));
      },
    },
    {
      id: "whatsapp",
      label: shareCopy.whatsapp,
      icon: WhatsAppIcon,
      onClick: openWhatsApp,
    },
    {
      id: "more",
      label: shareCopy.more,
      icon: MoreIcon,
      onClick: () => {
        void shareNative();
      },
    },
  ] as const;

  return (
    <PhoneFrame className="overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <ProductPhoto
          src={sku.image}
          alt={`${sku.brand} — ${sku.name}`}
          priority
          sizes="430px"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      <Link
        href={routes.landing}
        aria-label="Volver al feed"
        className="absolute top-4 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-paper/95 text-ink shadow-[0_1px_8px_rgba(22,21,19,0.12)]"
      >
        <BackIcon />
      </Link>

      <div className="relative z-10 mt-auto rounded-t-[28px] bg-surface px-5 pt-3 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-ink/15" />
        <h1 className="font-serif text-[28px] leading-[1.1] text-ink">
          {shareCopy.headline}
        </h1>
        <p className="mt-1.5 font-sans text-[15px] text-ink/60">
          {shareCopy.sub}
        </p>

        <Link
          href={routes.pieza(sku.id)}
          className="mt-5 flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-3 py-3"
        >
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[2px] bg-cream">
            <ProductPhoto src={sku.image} alt="" sizes="64px" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] font-medium tracking-[0.14em] text-terracotta uppercase">
              {sku.brand}
            </p>
            <p className="mt-0.5 font-sans text-[15px] font-semibold text-ink">
              {sku.name}
            </p>
            <p className="mt-0.5 font-sans text-[13px] text-ink/70">
              {formatARS(sku.price_ars)}
            </p>
          </div>
          <ChevronRightIcon className="h-5 w-5 shrink-0 text-ink/35" />
        </Link>

        <div className="mt-6 grid grid-cols-4 gap-2">
          {actions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                type="button"
                onClick={action.onClick}
                className="flex flex-col items-center gap-2 text-center text-ink"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-cream">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="font-sans text-[11px] leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        <p
          className="mt-4 min-h-5 text-center font-sans text-[12px] text-ink/50"
          aria-live="polite"
        >
          {status}
        </p>

        <button
          type="button"
          onClick={() => {
            void shareNative();
          }}
          className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-ink font-sans text-[16px] font-medium text-paper"
        >
          {shareCopy.cta}
        </button>
      </div>
    </PhoneFrame>
  );
}
