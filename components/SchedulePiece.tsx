import Image from "next/image";
import Link from "next/link";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function SchedulePiece({
  sku,
  tone = "day",
  onSelect,
}: {
  sku: Sku;
  tone?: "day" | "live";
  onSelect?: (sku: Sku) => void;
}) {
  const ink = tone === "day";
  const body = (
    <>
      <div className="relative aspect-[3/4] overflow-hidden bg-cream">
        <Image
          src={sku.image}
          alt={`${sku.brand} — ${sku.name}`}
          fill
          sizes="160px"
          className="object-cover"
        />
      </div>
      <p
        className={`mt-2 font-sans text-[10px] font-medium tracking-[0.14em] uppercase ${
          ink ? "text-terracotta" : "text-cream/70"
        }`}
      >
        {sku.brand}
      </p>
      <p
        className={`mt-0.5 font-serif text-[15px] leading-tight ${
          ink ? "text-ink" : "text-cream"
        }`}
      >
        {sku.name}
      </p>
      <p
        className={`mt-0.5 font-sans text-[13px] ${
          ink ? "text-ink" : "text-cream"
        }`}
      >
        {formatARS(sku.price_ars)}
      </p>
    </>
  );

  if (onSelect) {
    return (
      <button
        type="button"
        onClick={() => onSelect(sku)}
        className="w-[128px] shrink-0 text-left"
      >
        {body}
      </button>
    );
  }

  return (
    <Link href={routes.pieza(sku.id)} className="block min-w-0">
      {body}
    </Link>
  );
}
