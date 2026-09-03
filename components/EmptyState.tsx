import Link from "next/link";
import { Wordmark } from "@/components/Wordmark";
import { routes } from "@/lib/routes";

export function EmptyState({
  title,
  body,
  icon,
  cta,
  href = routes.landing,
  wordmark = false,
}: {
  title: string;
  body: string;
  icon?: React.ReactNode;
  cta?: string;
  href?: string;
  wordmark?: boolean | "terracotta";
}) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col items-center px-6 pt-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
      {wordmark ? (
        <Link href={routes.landing} aria-label="Con pinta" className="pt-1">
          <Wordmark
            tone={wordmark === "terracotta" ? "terracotta" : "ink"}
          />
        </Link>
      ) : null}
      <div className="mt-16 max-w-[22ch] text-center">
        <h1 className="font-serif text-[32px] leading-[1.12] text-ink">{title}</h1>
        <p className="mt-3 font-sans text-[15px] leading-6 text-ink">{body}</p>
      </div>
      {icon ? (
        <div className="mt-8 text-terracotta" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      {cta ? (
        <div className="mt-auto w-full pt-16">
          <Link
            href={href}
            className="flex h-12 w-full items-center justify-center rounded-full border border-ink/12 bg-cream font-sans text-[16px] text-terracotta"
          >
            {cta}
          </Link>
        </div>
      ) : null}
    </div>
  );
}
