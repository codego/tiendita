"use client";

type Chip = { id: string; label: string };

export function CategoryChips({
  chips,
  active,
  onChange,
}: {
  chips: Chip[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {chips.map((chip) => {
        const selected = chip.id === active;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            className={`shrink-0 rounded-full px-4 py-2 font-sans text-[13px] tracking-wide ${
              selected
                ? "bg-ink text-paper"
                : "border border-ink bg-paper text-ink"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
