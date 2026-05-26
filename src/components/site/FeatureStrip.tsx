import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type FeatureStripItem = {
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
};

export type FeatureStripProps = {
  items: FeatureStripItem[];
  className?: string;
  itemClassName?: string;
};

export function FeatureStrip({ items, className, itemClassName }: FeatureStripProps) {
  return (
    <div
      className={cn(
        "grid overflow-hidden border border-[#d8cdb5]/80 bg-white/65 md:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className={cn(
            "flex min-h-28 gap-4 border-[#d8cdb5]/70 p-5 md:border-r md:last:border-r-0",
            index >= 2 && "md:border-t lg:border-t-0",
            itemClassName,
          )}
        >
          {item.icon && (
            <div className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#d8cdb5] bg-[#fbf8ef] text-primary">
              {item.icon}
            </div>
          )}
          <div>
            <div className="text-sm font-semibold leading-5 text-foreground">{item.label}</div>
            {item.description && (
              <div className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
