import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { emptyLas21 } from "@/lib/edges";
import { routes } from "@/lib/routes";

export function Las21Empty() {
  return (
    <div className="min-h-dvh bg-cream">
      <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-[#EFE9DD]">
        <header className="flex justify-center px-6 pt-10">
          <Link href={routes.landing} aria-label="Con pinta">
            <Wordmark />
          </Link>
        </header>
        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-16 text-center">
          <h1 className="font-serif text-[34px] leading-[1.08] font-bold text-ink">
            {emptyLas21.title}
          </h1>
          <p className="mt-3 font-sans text-[15px] leading-6 text-ink/55">
            {emptyLas21.sub}
          </p>
          <Link
            href={routes.landing}
            className="mt-8 flex h-12 w-full max-w-[280px] items-center justify-center rounded-full bg-ink font-sans text-[16px] font-medium text-paper"
          >
            {emptyLas21.cta}
          </Link>
        </main>
      </div>
    </div>
  );
}
