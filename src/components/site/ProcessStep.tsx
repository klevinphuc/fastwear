import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ProcessStepProps = {
  step: number | string;
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  visual?: ReactNode;
  isLast?: boolean;
  className?: string;
};

export function ProcessStep({
  step,
  title,
  description,
  icon,
  visual,
  isLast = false,
  className,
}: ProcessStepProps) {
  return (
    <article className={cn("relative grid gap-4 md:grid-cols-[auto_1fr]", className)}>
      <div className="flex md:flex-col md:items-center">
        <div className="flex h-11 min-w-11 items-center justify-center border border-[#d8cdb5] bg-white text-sm font-semibold tabular-nums text-primary">
          {icon ?? step}
        </div>
        {!isLast && <div className="ml-4 h-px flex-1 bg-[#d8cdb5] md:ml-0 md:mt-3 md:h-full md:w-px" />}
      </div>

      <div className="border border-[#d8cdb5]/80 bg-white/70 p-5">
        {visual && <div className="mb-4 overflow-hidden border border-[#e7ddc8] bg-[#fbf8ef]">{visual}</div>}
        <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b7650]">
          Bước {step}
        </div>
        <h3 className="mt-2 font-serif text-2xl font-medium leading-tight text-foreground">{title}</h3>
        {description && (
          <div className="mt-2 text-sm leading-6 text-muted-foreground">{description}</div>
        )}
      </div>
    </article>
  );
}
