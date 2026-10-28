import { Briefcase, GraduationCap, Rocket, ArrowRight } from "lucide-react";
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

const TYPE_COLOR = {
  education: "from-accent/20 to-cyan/10 border-accent-border/60",
  internship: "from-cyan/20 to-accent/10 border-cyan/30",
  milestone: "from-accent/15 to-transparent border-border",
} as const;

const TYPE_DOT = {
  education: "bg-accent glow-accent-sm",
  internship: "bg-cyan",
  milestone: "bg-accent/60",
} as const;

const TYPE_BADGE = {
  education: "border-accent-border/60 bg-accent-soft text-accent",
  internship: "border-cyan/30 bg-cyan-soft text-cyan",
  milestone: "border-border bg-muted text-muted-foreground",
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
          {/* Timeline rail — gradient */}
          <div
            aria-hidden
            className="absolute bottom-3 left-[11px] top-3 w-px bg-gradient-to-b from-accent/60 via-border to-transparent"
          />

          <div className="space-y-6">
            {timeline.map((item, i) => {
              const Icon = TYPE_ICON[item.type];
              return (
                <Reveal key={`${item.date}-${item.title}`} delay={i * 0.06}>
                  <article className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 pl-12 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 ${TYPE_COLOR[item.type]}`}>
                    {/* Node dot */}
                    <span
                      className={`absolute left-3 top-7 flex size-5 items-center justify-center rounded-full ${TYPE_DOT[item.type]} ring-4 ring-background`}
                      aria-hidden
                    >
                      <Icon className="size-2.5 text-white" />
                    </span>

                    {/* Header row */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                      <time className="font-mono text-xs font-semibold text-accent">
                        {item.date}
                      </time>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TYPE_BADGE[item.type]}`}
                      >
                        {TYPE_LABEL[item.type]}
                      </span>
                    </div>

                    <h3 className="mt-2 font-display text-lg font-bold text-foreground">
                      {item.title}
                    </h3>
                    <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Icon className="size-3.5 text-accent" aria-hidden />
                      {item.org}
                    </p>

                    <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                      {item.points.map((point) => (
                        <li key={point} className="flex gap-2.5">
                          <ArrowRight className="mt-0.5 size-3.5 shrink-0 text-accent/60" aria-hidden />
                          {point}
                        </li>
                      ))}
                    </ul>

                    {item.tags && (
                      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
                        {item.tags.map((tag) => (
                          <li
                            key={tag}
                            className="rounded-md border border-border bg-background/60 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
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
