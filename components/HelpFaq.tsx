"use client";

import { useState } from "react";
import { ChevronUpIcon, EnvelopeIcon } from "@/components/Icons";

export type FaqItem = {
  question: string;
  answer: string;
};

export function HelpFaq({
  items,
  contactPrompt,
  contactEmail,
}: {
  items: readonly FaqItem[];
  contactPrompt: string;
  contactEmail: string;
}) {
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(items.map((_, index) => index)),
  );

  function toggle(index: number) {
    setOpen((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  }

  return (
    <div className="px-5 pb-12">
      <div className="overflow-hidden rounded-2xl border border-ink/8 bg-paper">
        {items.map((item, index) => {
          const expanded = open.has(index);
          return (
            <div
              key={item.question}
              className="border-b border-ink/8 last:border-b-0"
            >
              <button
                type="button"
                aria-expanded={expanded}
                onClick={() => toggle(index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left"
              >
                <span className="font-sans text-[15px] font-semibold text-ink">
                  {item.question}
                </span>
                <ChevronUpIcon
                  className={`h-4 w-4 shrink-0 text-ink/50 transition-transform ${
                    expanded ? "" : "rotate-180"
                  }`}
                />
              </button>
              {expanded ? (
                <p className="px-4 pb-4 font-sans text-[14px] leading-6 text-ink/70">
                  {item.answer}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="mt-8 border-t border-ink/10 pt-8 text-center">
        <EnvelopeIcon className="mx-auto h-5 w-5 text-ink/55" />
        <p className="mt-3 font-sans text-[14px] text-ink">{contactPrompt}</p>
        <a
          href={`mailto:${contactEmail}`}
          className="mt-1 inline-block font-sans text-[14px] text-terracotta underline underline-offset-2"
        >
          {contactEmail}
        </a>
      </div>
    </div>
  );
}
