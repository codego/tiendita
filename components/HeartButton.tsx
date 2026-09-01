"use client";

import { HeartIcon } from "@/components/Icons";
import { useSaved } from "@/lib/useSaved";

type HeartButtonProps = {
  skuId: string;
  variant?: "overlay" | "circle" | "plain" | "onImage";
  className?: string;
};

export function HeartButton({
  skuId,
  variant = "plain",
  className = "",
}: HeartButtonProps) {
  const { saved, toggle } = useSaved(skuId);

  const base =
    "inline-flex items-center justify-center transition-opacity active:opacity-70";
  const variants = {
    overlay:
      "h-10 w-10 rounded-full bg-paper/95 text-ink shadow-[0_1px_8px_rgba(22,21,19,0.12)]",
    circle: "h-12 w-12 rounded-full border border-ink bg-paper text-ink",
    plain: "h-10 w-10 text-ink",
    onImage: "h-8 w-8 text-paper drop-shadow-[0_1px_3px_rgba(22,21,19,0.45)]",
  };

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle();
      }}
      aria-pressed={saved}
      aria-label={saved ? "Quitar de guardados" : "Guardar pieza"}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <HeartIcon className="h-[18px] w-[18px]" filled={saved} />
    </button>
  );
}
