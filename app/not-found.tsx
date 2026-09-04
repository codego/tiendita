import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { notFoundCopy } from "@/lib/not-found-copy";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <PhoneFrame className="bg-cream">
      <header className="px-6 pt-7">
        <Link href={routes.landing} aria-label="Con pinta">
          <Wordmark />
        </Link>
      </header>
      <div className="flex flex-1 flex-col justify-center px-6 pb-24">
        <h1 className="max-w-[12ch] font-serif text-[44px] leading-[1.02] text-ink">
          {notFoundCopy.titleLead}
          <br />
          {notFoundCopy.titleRest}
        </h1>
        <p className="mt-4 font-sans text-[18px] text-ink">{notFoundCopy.body}</p>
        <Link
          href={routes.landing}
          className="mt-10 inline-flex h-12 w-fit items-center justify-center rounded-full bg-ink px-7 font-sans text-[16px] text-paper"
        >
          {notFoundCopy.cta}
        </Link>
      </div>
    </PhoneFrame>
  );
}
