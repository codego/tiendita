import Link from "next/link";
import { DayShareButton } from "@/components/DayShareButton";
import { RemindButton } from "@/components/RemindButton";
import { SchedulePiece } from "@/components/SchedulePiece";
import { Wordmark } from "@/components/Wordmark";
import {
  ANOCHE_LABEL,
  BRAND_TEASE,
  DAY_LINE,
  ESTA_LABEL,
  VER_TODO,
} from "@/lib/las21";
import { brandCopy } from "@/lib/brand";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function DaySchedule({
  countdown,
  esta,
  anoche,
}: {
  countdown: string;
  esta: Sku[];
  anoche: Sku[];
}) {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-surface shadow-[0_0_0_1px_rgba(22,21,19,0.06)]">
        <header className="px-6 pt-7">
          <Link href={routes.landing} aria-label="Curadario">
            <Wordmark />
          </Link>
        </header>

        <main className="flex-1 px-6 pt-10 pb-10">
          <div className="flex items-start gap-3">
            <h1 className="min-w-0 flex-1 font-serif text-[38px] leading-[1.04] text-ink">
              {countdown}
            </h1>
            <DayShareButton countdown={countdown} className="mt-1" />
          </div>
          <p className="mt-5 max-w-[28ch] font-sans text-[16px] leading-6 text-ink/70">
            {DAY_LINE}
          </p>
          <RemindButton />

          <section className="mt-14" aria-label={ESTA_LABEL}>
            <h2 className="font-serif text-[26px] text-ink">{ESTA_LABEL}</h2>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {esta.map((sku) => (
                <SchedulePiece key={sku.id} sku={sku} tease={BRAND_TEASE} />
              ))}
            </div>
          </section>

          <section className="mt-12" aria-label={ANOCHE_LABEL}>
            <div className="flex items-end justify-between gap-3">
              <h2 className="font-serif text-[26px] leading-tight text-ink">
                {ANOCHE_LABEL}
              </h2>
              <Link
                href={routes.anoche}
                className="shrink-0 pb-1 font-sans text-[13px] text-ink underline underline-offset-2"
              >
                {VER_TODO}
              </Link>
            </div>
            <div className="mt-4 flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {anoche.map((sku) => (
                <div key={sku.id} className="w-[140px] shrink-0">
                  <SchedulePiece sku={sku} />
                </div>
              ))}
            </div>
          </section>

          <p className="mt-16 text-center font-sans text-[13px] text-ink/50">
            <Link href={routes.marcas} className="underline underline-offset-2">
              {brandCopy.landingCta}
            </Link>
            <span className="mx-2">·</span>
            <Link href={routes.terminos} className="underline underline-offset-2">
              Términos
            </Link>
            <span className="mx-2">·</span>
            <Link
              href={routes.privacidad}
              className="underline underline-offset-2"
            >
              Privacidad
            </Link>
          </p>
        </main>
      </div>
    </div>
  );
}
