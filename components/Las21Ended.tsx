import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { endedLas21 } from "@/lib/edges";
import { routes } from "@/lib/routes";

export function Las21Ended() {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-[#EFE9DD]">
        <div
          role="status"
          aria-live="polite"
          className="border-b border-ink/10 bg-paper px-4 py-2.5"
        >
          <p className="font-sans text-[13px] leading-snug text-ink/70">
            {endedLas21.toast}
          </p>
        </div>
        <header className="flex justify-center px-6 pt-10">
          <Link href={routes.landing} aria-label="Con pinta">
            <Wordmark />
          </Link>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
          <Link
            href={routes.landing}
            className="flex h-12 w-full max-w-[280px] items-center justify-center rounded-full bg-ink font-sans text-[16px] font-medium text-paper"
          >
            {endedLas21.cta}
          </Link>
        </main>
      </div>
    </div>
  );
}
