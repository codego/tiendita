import { shareFailCopy } from "@/lib/edges";

export function ShareFailBanner({ onRetry }: { onRetry: () => void }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-4"
    >
      <div className="flex w-full max-w-[398px] items-center justify-between gap-3 rounded-2xl bg-[#EFE9DD] px-4 py-3 text-ink shadow-[0_8px_24px_rgba(22,21,19,0.16)]">
        <p className="font-sans text-[13px] leading-snug">{shareFailCopy.line}</p>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRetry();
          }}
          className="shrink-0 rounded-full bg-ink px-3 py-1.5 font-sans text-[12px] font-medium text-paper"
        >
          {shareFailCopy.retry}
        </button>
      </div>
    </div>
  );
}
