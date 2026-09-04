export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cream = className.includes("bg-cream");
  return (
    <div className="min-h-dvh bg-cream">
      <div
        className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col shadow-[0_0_0_1px_rgba(22,21,19,0.06)] ${
          cream ? "bg-cream" : "bg-surface"
        } ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
