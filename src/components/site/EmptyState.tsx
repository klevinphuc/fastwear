import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EmptyStateProps = {
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  primaryAction,
  secondaryAction,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-72 flex-col items-center justify-center border border-[#d8cdb5]/80 bg-white/70 px-6 py-12 text-center",
        className,
      )}
    >
      {icon && (
        <div className="mb-5 flex h-12 w-12 items-center justify-center border border-[#d8cdb5] bg-[#fbf8ef] text-primary">
          {icon}
        </div>
      )}
      <h2 className="max-w-xl font-serif text-3xl font-medium leading-tight text-foreground">
        {title}
      </h2>
      {description && (
        <div className="mt-3 max-w-lg text-sm leading-6 text-muted-foreground">{description}</div>
      )}
      {(primaryAction || secondaryAction) && (
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          {primaryAction}
          {secondaryAction}
        </div>
      )}
      {children && <div className="mt-6 w-full max-w-xl">{children}</div>}
    </div>
  );
}
