export function Wordmark({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md";
  className?: string;
}) {
  const text = size === "sm" ? "text-[20px]" : "text-[22px]";
  return (
    <span
      className={`font-serif leading-none tracking-tight text-ink ${text} ${className}`}
    >
      Cura
      <span className="italic">dario</span>
      <span className="text-terracotta">.</span>
    </span>
  );
}
