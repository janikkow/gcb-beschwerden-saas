"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export type AccordionItem = {
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: AccordionItem[];
};

export function FAQAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article
            key={item.question}
            className={cn(
              "overflow-hidden rounded-2xl border transition-colors duration-200",
              isOpen
                ? "border-white/20 bg-white/[0.08]"
                : "border-white/10 bg-white/[0.05]",
            )}
            style={{ backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}
          >
            <button
              type="button"
              className="flex w-full items-start gap-3 px-5 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span
                className={cn(
                  "min-w-0 flex-1 text-pretty break-words text-sm font-semibold sm:text-base transition-colors",
                  isOpen ? "text-white" : "text-zinc-200",
                )}
              >
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-sm font-light transition-all duration-300",
                  isOpen
                    ? "rotate-45 border-brand-400/50 bg-brand-500/20 text-brand-300"
                    : "rotate-0 border-white/15 bg-white/[0.06] text-zinc-400",
                )}
              >
                +
              </span>
            </button>
            {isOpen ? (
              <div className="border-t border-white/10 px-5 py-4 text-pretty text-sm leading-relaxed text-zinc-400 break-words">
                {item.answer}
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
