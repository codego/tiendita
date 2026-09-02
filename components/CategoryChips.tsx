"use client";

type Chip = { id: string; label: string; color?: string };

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
        const color = chip.color;
        return (
          <button
            key={chip.id}
            type="button"
            onClick={() => onChange(chip.id)}
            style={
              color
                ? selected
                  ? { backgroundColor: color, color: "#FFFFFF" }
                  : { backgroundColor: "#FFFFFF", color, borderColor: color }
                : undefined
            }
            className={`shrink-0 rounded-full px-4 py-1.5 font-sans text-[13px] tracking-wide ${
              color
                ? selected
                  ? "border border-transparent"
                  : "border"
                : selected
                  ? "bg-ink text-paper"
                  : "border border-ink/15 bg-cream text-ink"
            }`}
          >
            {chip.label}
          </button>
        );
      })}
    </div>
  );
}
