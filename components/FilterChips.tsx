"use client";

type Filter = { id: string; label: string };

export function FilterChips({
  filters,
  active,
  onChange,
}: {
  filters: Filter[];
  active: string;
  onChange: (id: string) => void;
}) {
  const chips: Filter[] = [{ id: "todas", label: "Todas" }, ...filters];

  return (
    <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chips.map((chip) => {
        const selected = chip.id === active;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            className={`shrink-0 rounded-full px-4 py-2 font-sans text-[13px] tracking-wide uppercase ${
              selected
                ? "bg-ink text-paper"
                : "bg-cream text-ink"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
