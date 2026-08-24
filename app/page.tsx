import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";
import { getTapaCollection } from "@/lib/catalog";

export default function HomePage() {
  const collection = getTapaCollection();

  return (
    <AppShell header="overlay">
      <section className="relative min-h-[calc(100dvh-4.25rem)]">
        <Image
          src={collection.coverImage}
          alt={collection.title}
          fill
          priority
          sizes="430px"
          className="rounded-none object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 px-5 pb-7 pt-24">
          <p className="font-mono text-[11px] tracking-[0.18em] text-terracotta uppercase">
            Colección · {collection.number}
          </p>
          <h1 className="mt-2 max-w-[14ch] font-serif text-[42px] leading-[0.95] text-paper">
            {collection.title}
          </h1>
          <p className="mt-3 font-serif text-[18px] italic text-paper">
            {collection.subtitle}
          </p>
          <p className="mt-3 max-w-[28ch] font-sans text-[13px] leading-5 text-paper/90">
            {collection.lede}
          </p>
          <Link
            href="/coleccion"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-paper font-sans text-[15px] font-medium tracking-tight text-ink"
          >
            {collection.coverCta} →
          </Link>
        </div>
      </section>
    </AppShell>
  );
}
