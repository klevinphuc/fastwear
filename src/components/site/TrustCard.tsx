import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type TrustCardProps = {
  icon?: ReactNode;
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function TrustCard({ icon, label, title, description, action, className }: TrustCardProps) {
  return (
    <article
      className={cn(
        "border border-[#d8cdb5]/80 bg-white/75 p-5 text-left shadow-[0_1px_2px_rgba(31,29,23,0.035)]",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-[#d8cdb5] bg-[#fbf8ef] text-primary">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          {label && (
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#8b7650]">
              {label}
            </div>
          )}
          <h3 className="font-serif text-xl font-medium leading-tight text-foreground">{title}</h3>
          {description && (
            <div className="mt-2 text-sm leading-6 text-muted-foreground">{description}</div>
          )}
          {action && <div className="mt-4">{action}</div>}
        </div>
      </div>
    </article>
  );
}
