"use client";

import Image from "next/image";
import Link from "next/link";
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
import { shareCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";
import { lookShareText, lookUrl, whatsappShareHref } from "@/lib/shareLook";
import type { Collection, Sku } from "@/lib/types";

export function ShareSheet({
  look,
  pieces,
  hero,
}: {
  look: Collection;
  pieces: Sku[];
  hero: string;
}) {
  const [status, setStatus] = useState("");

  function currentUrl() {
    return lookUrl(window.location.origin);
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
  }

  async function shareNative() {
    const url = currentUrl();
    const text = lookShareText(url);
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareCopy.lookTitle,
          text,
          url,
        });
        return;
      } catch {
        // Cancelled or unsupported — copy instead.
      }
    }
    await copyLink();
  }

  function openWhatsApp() {
    window.open(whatsappShareHref(currentUrl()), "_blank", "noopener,noreferrer");
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
        void copyLink(shareCopy.storiesHint, lookShareText(currentUrl()));
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
        <Image
          src={hero}
          alt={look.title}
          fill
          priority
          sizes="430px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/25" />
      </div>

      <Link
        href={routes.coleccion}
        aria-label="Volver al look"
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
          href={routes.coleccion}
          className="mt-5 flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper px-3 py-3"
        >
          <div className="grid w-[56px] shrink-0 grid-cols-2 gap-0.5">
            {pieces.slice(0, 6).map((sku) => (
              <div
                key={sku.id}
                className="relative aspect-square overflow-hidden rounded-[3px] bg-cream"
              >
                <Image
                  src={sku.image}
                  alt=""
                  fill
                  sizes="28px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-sans text-[15px] font-semibold text-ink">
              {shareCopy.lookTitle}
            </p>
            <p className="mt-0.5 font-sans text-[12px] text-ink/55">
              {shareCopy.meta}
            </p>
            <p className="mt-0.5 font-sans text-[12px] text-ink/45">
              {shareCopy.byline}
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
