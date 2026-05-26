import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderAlign = "left" | "center";

export type SectionHeaderProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  align?: SectionHeaderAlign;
  headingLevel?: 1 | 2 | 3;
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

function SectionTitle({
  level,
  className,
  children,
}: {
  level: 1 | 2 | 3;
  className?: string;
  children: ReactNode;
}) {
  if (level === 1) {
    return <h1 className={className}>{children}</h1>;
  }
  if (level === 3) {
    return <h3 className={className}>{children}</h3>;
  }
  return <h2 className={className}>{children}</h2>;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
  headingLevel = 2,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const titleClasses = cn(
    "font-serif text-3xl font-medium leading-tight text-foreground md:text-5xl",
    titleClassName,
  );

  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        isCenter ? "items-center text-center" : "items-start text-left",
        action && !isCenter && "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-3xl", isCenter && "mx-auto")}>
        {eyebrow && (
          <div
            className={cn(
              "mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8b7650]",
              eyebrowClassName,
            )}
          >
            {eyebrow}
          </div>
        )}
        <SectionTitle level={headingLevel} className={titleClasses}>
          {title}
        </SectionTitle>
        {description && (
          <div
            className={cn(
              "mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7",
              isCenter && "mx-auto",
              descriptionClassName,
            )}
          >
            {description}
          </div>
        )}
      </div>
      {action && <div className={cn("shrink-0", isCenter && "mt-1")}>{action}</div>}
    </div>
  );
}
