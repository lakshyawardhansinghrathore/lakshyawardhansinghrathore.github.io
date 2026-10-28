import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  className?: string;
}

/** Numbered section heading, e.g. "01. / About" with a hairline rule. */
export function SectionHeading({ index, title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-accent">{index}.</span>
        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h2>
        <span aria-hidden className="h-px flex-1 bg-border" />
      </div>
      {description ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
