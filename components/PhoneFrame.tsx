export function PhoneFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="min-h-dvh bg-cream">
      <div
        className={`relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-surface shadow-[0_0_0_1px_rgba(22,21,19,0.06)] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
