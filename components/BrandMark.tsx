export function BrandMark({ name }: { name: string }) {
  const words = name.trim().split(/\s+/).slice(0, 2);
  return (
    <div
      className="flex h-[92px] w-[92px] shrink-0 flex-col items-center justify-center rounded-full border border-terracotta/25 bg-cream px-2 text-center"
      aria-hidden="true"
    >
      {words.map((word) => (
        <span
          key={word}
          className="font-serif text-[13px] leading-tight tracking-[0.18em] text-terracotta uppercase"
        >
          {word}
        </span>
      ))}
    </div>
  );
}
