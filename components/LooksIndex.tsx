import Image from "next/image";
import Link from "next/link";
import { emptyLooks } from "@/lib/edges";
import { routes } from "@/lib/routes";
import type { Collection } from "@/lib/types";

export const LOOK_LINES: Record<string, string> = {
  "sastreria-de-agosto": "Look de sastrería, varias marcas",
  "lo-que-lleva-el-look": "Carteras de distintas tiendas",
  "un-solo-traje": "Trajes de baño de distintas tiendas",
};

export function LooksIndex({ collections }: { collections: Collection[] }) {
  return (
    <div className="px-5 pb-10">
      <p className="font-mono text-[11px] tracking-[0.16em] text-terracotta uppercase">
        Looks
      </p>
      <h1 className="mt-2 font-serif text-[34px] leading-[1.05] text-ink">
        Looks
      </h1>
      <p className="mt-2 max-w-[28ch] font-sans text-[15px] leading-6 text-ink/65">
        Colecciones curadas. Sastrería de agosto es una. No es la marca.
      </p>
      {collections.length === 0 ? (
        <p className="mt-10 max-w-[22ch] font-serif text-[28px] leading-snug text-ink">
          {emptyLooks.line}
        </p>
      ) : (
        <ul className="mt-6 flex flex-col gap-4">
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link
                href={routes.coleccionId(collection.id)}
                className="block overflow-hidden rounded-md bg-cream"
              >
                <div className="relative aspect-[16/10] bg-cream">
                  <Image
                    src={collection.coverImage}
                    alt={collection.title}
                    fill
                    sizes="400px"
                    className="object-cover"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="font-sans text-[10px] font-medium tracking-[0.14em] text-terracotta uppercase">
                    {collection.homeChip}
                  </p>
                  <h2 className="mt-1 font-serif text-[22px] leading-tight text-ink">
                    {collection.title}
                  </h2>
                  {LOOK_LINES[collection.id] ? (
                    <p className="mt-1 font-sans text-[14px] text-ink/65">
                      {LOOK_LINES[collection.id]}
                    </p>
                  ) : null}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
