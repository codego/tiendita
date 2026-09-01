import Link from "next/link";
import { SearchIcon } from "@/components/Icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { Wordmark } from "@/components/Wordmark";
import { notFoundCopy } from "@/lib/not-found-copy";
import { routes } from "@/lib/routes";

export default function NotFound() {
  return (
    <PhoneFrame>
      <header className="flex items-center justify-between px-5 pt-6">
        <Link href={routes.landing} aria-label="Curadario">
          <Wordmark tone="terracotta" />
        </Link>
        <Link
          href={routes.buscar}
          aria-label="Buscar"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-terracotta text-terracotta"
        >
          <SearchIcon className="h-5 w-5" />
        </Link>
      </header>
      <div className="flex flex-1 flex-col justify-center px-6 pb-24">
        <h1 className="max-w-[12ch] font-serif text-[40px] leading-[1.05] text-terracotta">
          {notFoundCopy.title}
        </h1>
        <p className="mt-4 font-sans text-[18px] text-terracotta">
          {notFoundCopy.body}
        </p>
        <Link
          href={routes.landing}
          className="mt-10 inline-flex h-12 w-fit items-center justify-center rounded-full bg-terracotta px-7 font-sans text-[16px] text-paper"
        >
          {notFoundCopy.cta}
        </Link>
      </div>
    </PhoneFrame>
  );
}
