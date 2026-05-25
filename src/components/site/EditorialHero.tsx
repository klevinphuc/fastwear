import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type EditorialHeroProps = {
  eyebrow?: ReactNode;
  headline: ReactNode;
  description?: ReactNode;
  primaryAction?: ReactNode;
  secondaryAction?: ReactNode;
  media?: ReactNode;
  trustNote?: ReactNode;
  imagePosition?: "left" | "right";
  className?: string;
  contentClassName?: string;
  mediaClassName?: string;
};

export function EditorialHero({
  eyebrow,
  headline,
  description,
  primaryAction,
  secondaryAction,
  media,
  trustNote,
  imagePosition = "right",
  className,
  contentClassName,
  mediaClassName,
}: EditorialHeroProps) {
  const mediaBlock = media ? (
    <div
      className={cn(
        "min-h-[360px] overflow-hidden border border-[#d8cdb5]/80 bg-white/70 md:min-h-[520px]",
        mediaClassName,
      )}
    >
      {media}
    </div>
  ) : null;

  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-16", className)}>
      <div className="grid items-center gap-8 md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-10">
        {imagePosition === "left" && mediaBlock}

        <div
          className={cn(
            "flex flex-col items-start border-y border-[#d8cdb5]/80 py-10 md:py-14",
            contentClassName,
          )}
        >
          {eyebrow && (
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b7650]">
              {eyebrow}
            </div>
          )}
          <h1 className="max-w-3xl font-serif text-5xl font-medium leading-[1.08] text-foreground md:text-7xl">
            {headline}
          </h1>
          {description && (
            <div className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">
              {description}
            </div>
          )}
          {(primaryAction || secondaryAction) && (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
          {trustNote && (
            <div className="mt-7 border-l border-[#c7ae70]/70 pl-4 text-sm leading-6 text-[#5f625c]">
              {trustNote}
            </div>
          )}
        </div>

        {imagePosition === "right" && mediaBlock}
      </div>
    </section>
  );
}
