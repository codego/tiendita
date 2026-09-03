export function Wordmark({
  size = "md",
  tone = "ink",
  className = "",
}: {
  size?: "sm" | "md";
  tone?: "ink" | "paper" | "terracotta";
  className?: string;
}) {
  const text = size === "sm" ? "text-[20px]" : "text-[22px]";
  const color =
    tone === "paper"
      ? "text-paper"
      : tone === "terracotta"
        ? "text-terracotta"
        : "text-ink";
  const dot = tone === "paper" ? "text-paper" : "text-terracotta";
  return (
    <span
      className={`font-serif italic leading-none tracking-tight ${color} ${text} ${className}`}
    >
      Con pinta
      <span className={`${dot} not-italic`}>.</span>
    </span>
  );
}
