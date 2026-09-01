import Link from "next/link";
import { CloudOffIcon } from "@/components/Icons";
import { PhoneFrame } from "@/components/PhoneFrame";
import { loadErrorCopy } from "@/lib/edges";
import { routes } from "@/lib/routes";

export function LoadError({ onRetry }: { onRetry: () => void }) {
  return (
    <PhoneFrame>
      <div className="flex min-h-0 flex-1 flex-col items-center px-6 pt-16 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
        <CloudOffIcon className="h-[72px] w-[72px] text-terracotta" />
        <h1 className="mt-6 text-center font-serif text-[34px] leading-[1.08] text-terracotta">
          {loadErrorCopy.title}
        </h1>
        <p className="mt-3 max-w-[26ch] text-center font-sans text-[15px] leading-6 text-ink">
          {loadErrorCopy.body}
        </p>
        <div className="mt-16 flex w-full max-w-[280px] flex-col gap-3">
          <button
            type="button"
            onClick={onRetry}
            className="flex h-12 w-full items-center justify-center rounded-full bg-terracotta font-sans text-[16px] font-medium text-paper"
          >
            {loadErrorCopy.retry}
          </button>
          <Link
            href={routes.landing}
            className="flex h-12 w-full items-center justify-center rounded-full border border-terracotta font-sans text-[16px] font-medium text-terracotta"
          >
            {loadErrorCopy.home}
          </Link>
        </div>
        <p className="mt-auto pt-10 text-center font-sans text-[13px] leading-5 text-ink/55">
          {loadErrorCopy.footerLead}
          <br />
          {loadErrorCopy.footerSub}
        </p>
      </div>
    </PhoneFrame>
  );
}
