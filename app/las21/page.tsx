import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { emptyGuardados } from "@/lib/edges";
import { LIVE_SHARE_COPY } from "@/lib/las21";
import { routes } from "@/lib/routes";
import { dropMetadata } from "@/lib/seo";

export const metadata = dropMetadata();

export default function Las21SharePage() {
  return (
    <PhoneFrame>
      <header className="px-6 pt-7">
        <Link href={routes.landing} aria-label="Con pinta">
          <Wordmark />
        </Link>
      </header>
      <main className="flex flex-1 flex-col px-6 pt-16">
        <p className="font-sans text-[11px] font-semibold tracking-[0.18em] text-terracotta uppercase">
          LAS 21
        </p>
        <h1 className="mt-4 font-serif text-[40px] leading-[1.02] text-ink">
          {LIVE_SHARE_COPY}
        </h1>
        <Link
          href={routes.landing}
          className="mt-10 flex h-12 items-center justify-center rounded-full bg-terracotta font-sans text-[16px] font-medium text-paper"
        >
          {emptyGuardados.cta}
        </Link>
      </main>
    </PhoneFrame>
  );
}
