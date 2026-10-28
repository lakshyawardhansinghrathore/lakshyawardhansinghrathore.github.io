import { Briefcase, GraduationCap, Rocket } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { timeline } from "@/content/experience";

const TYPE_ICON = {
  education: GraduationCap,
  internship: Briefcase,
  milestone: Rocket,
} as const;

const TYPE_LABEL = {
  education: "Education",
  internship: "Internship",
  milestone: "Milestone",
} as const;

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-20 md:py-28" aria-label="Experience timeline">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="06"
          title="The journey so far"
          description="From first-year 'hello world' to final-year systems — every step that mattered."
        />

        <div className="relative max-w-3xl">
          {/* Timeline rail */}
          <div aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-border" />

          <div className="space-y-10">
            {timeline.map((item, i) => {
              const Icon = TYPE_ICON[item.type];
              return (
                <Reveal key={`${item.date}-${item.title}`} delay={i * 0.05}>
                  <article className="relative pl-10">
                    {/* Node */}
                    <span
                      className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center rounded-full border-2 border-accent bg-background"
                      aria-hidden
                    >
                      <span className="size-1.5 rounded-full bg-accent" />
                    </span>

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <time className="font-mono text-xs text-accent">{item.date}</time>
                      <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                        {TYPE_LABEL[item.type]}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-display text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Icon className="size-3.5 text-accent" aria-hidden />
                      {item.org}
                    </p>

                    <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {item.tags ? (
                      <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tags">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
