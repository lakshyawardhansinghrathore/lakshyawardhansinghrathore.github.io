import { cn } from "@/lib/utils";
import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  description?: string;
  className?: string;
}

/** Award-style section heading with giant watermark index + gradient underline */
export function SectionHeading({ index, title, description, className }: SectionHeadingProps) {
  return (
    <Reveal className={cn("mb-12 md:mb-16", className)}>
      <div className="relative">
        {/* Giant faded watermark number */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-8 left-0 select-none font-display text-[7rem] font-extrabold leading-none text-foreground/[0.04] sm:text-[9rem]"
        >
          {index}
        </span>

        <div className="flex items-end gap-4">
          <div>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {index}.
            </span>
            <h2 className="mt-0.5 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h2>
            {/* Gradient underline */}
            <span
              aria-hidden
              className="mt-2 block h-[3px] w-16 rounded-full bg-gradient-to-r from-accent to-cyan"
            />
          </div>
          <span aria-hidden className="mb-1 h-px flex-1 bg-gradient-to-r from-border to-transparent" />
        </div>

        {description && (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  );
}
