import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type StickySummaryProps = {
  eyebrow?: ReactNode;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  sticky?: boolean;
  className?: string;
  bodyClassName?: string;
};

export function StickySummary({
  eyebrow,
  title,
  children,
  footer,
  sticky = true,
  className,
  bodyClassName,
}: StickySummaryProps) {
  return (
    <aside
      className={cn(
        "border border-[#d8cdb5]/80 bg-white/80 shadow-[0_1px_2px_rgba(31,29,23,0.035)]",
        sticky && "lg:sticky lg:top-28",
        className,
      )}
    >
      {(eyebrow || title) && (
        <div className="border-b border-[#d8cdb5]/70 px-5 py-5">
          {eyebrow && (
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b7650]">
              {eyebrow}
            </div>
          )}
          {title && (
            <h2 className="font-serif text-2xl font-medium leading-tight text-foreground">{title}</h2>
          )}
        </div>
      )}
      <div className={cn("space-y-4 px-5 py-5", bodyClassName)}>{children}</div>
      {footer && <div className="border-t border-[#d8cdb5]/70 px-5 py-5">{footer}</div>}
    </aside>
  );
}
