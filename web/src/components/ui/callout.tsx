import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CalloutProps = {
  title: string;
  children: ReactNode;
  tone?: "info" | "success" | "warning";
  className?: string;
};

const toneClass = {
  info: "border-brand-200 bg-brand-50/60 text-brand-900",
  success: "border-emerald-200 bg-emerald-50/70 text-emerald-900",
  warning: "border-amber-200 bg-amber-50/70 text-amber-900",
};

export function Callout({
  title,
  children,
  tone = "info",
  className,
}: CalloutProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border p-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)]",
        toneClass[tone],
        className,
      )}
    >
      <p className="mb-2 text-sm font-semibold">{title}</p>
      <div className="text-sm leading-relaxed">{children}</div>
    </aside>
  );
}
