import Image from "next/image";
import Link from "next/link";
import { HeartButton } from "@/components/HeartButton";
import { formatARS } from "@/lib/money";
import { routes } from "@/lib/routes";
import type { Sku } from "@/lib/types";

export function FeedCard({
  sku,
  shape = "portrait",
}: {
  sku: Sku;
  shape?: "portrait" | "tall" | "square" | "wide";
}) {
  const frame =
    shape === "wide"
      ? "col-span-2 aspect-[16/9]"
      : shape === "tall"
        ? "aspect-[3/5]"
        : shape === "square"
          ? "aspect-square"
          : "aspect-[3/4]";

  return (
    <article className={frame}>
      <Link href={routes.pieza(sku.id)} className="relative block h-full overflow-hidden rounded-md bg-cream">
        <Image
          src={sku.image}
          alt={`${sku.brand} — ${sku.name}`}
          fill
          sizes={shape === "wide" ? "430px" : "(max-width: 430px) 50vw, 215px"}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-ink/55 via-transparent to-transparent" />
        <HeartButton
          skuId={sku.id}
          variant="onImage"
          className="absolute top-2 right-2"
        />
        <div className="absolute inset-x-0 bottom-0 px-2 pb-2">
          <p className="font-sans text-[11px] font-medium tracking-wide text-paper uppercase">
            {sku.brand}
          </p>
          <p className="font-sans text-[13px] font-medium text-paper">
            {formatARS(sku.price_ars)}
          </p>
        </div>
      </Link>
    </article>
  );
}
