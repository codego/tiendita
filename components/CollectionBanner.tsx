import Image from "next/image";
import Link from "next/link";
import type { Collection } from "@/lib/types";

export function CollectionBanner({
  collection,
  href,
  variant = "hero",
}: {
  collection: Collection;
  href: string;
  variant?: "hero" | "split";
}) {
  if (variant === "split") {
    return (
      <section className="flex overflow-hidden bg-cream">
        <div className="flex min-w-0 flex-1 flex-col justify-center px-5 py-6">
          <p className="font-mono text-[11px] tracking-[0.16em] text-terracotta uppercase">
            Colección · {collection.number}
          </p>
          <h2 className="mt-2 font-serif text-[26px] leading-[1.05] text-ink">
            {collection.title}
          </h2>
          <p className="mt-2 font-serif text-[15px] italic text-ink/70">
            {collection.subtitle}
          </p>
          <Link
            href={href}
            className="mt-4 inline-flex h-11 w-fit items-center justify-center rounded-full bg-ink px-5 font-sans text-[14px] font-medium tracking-tight text-paper"
          >
            {collection.coverCta} →
          </Link>
        </div>
        <div className="relative w-[42%] shrink-0 self-stretch min-h-[200px]">
          <Image
            src={collection.coverImage}
            alt={collection.title}
            fill
            sizes="180px"
            className="rounded-none object-cover"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative aspect-[4/5] overflow-hidden bg-cream">
      <Image
        src={collection.coverImage}
        alt={collection.title}
        fill
        priority
        sizes="430px"
        className="rounded-none object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-ink/75 via-ink/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 px-5 pb-6">
        <p className="font-mono text-[11px] tracking-[0.18em] text-terracotta uppercase">
          Colección · {collection.number}
        </p>
        <h1 className="mt-2 max-w-[14ch] font-serif text-[36px] leading-[0.95] text-paper">
          {collection.title}
        </h1>
        <p className="mt-2 font-serif text-[17px] italic text-paper">
          {collection.subtitle}
        </p>
        <Link
          href={href}
          className="mt-5 flex h-12 w-full items-center justify-center rounded-full bg-ink font-sans text-[15px] font-medium tracking-tight text-paper"
        >
          {collection.coverCta} →
        </Link>
      </div>
    </section>
  );
}
