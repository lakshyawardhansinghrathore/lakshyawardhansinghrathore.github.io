import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { skillGroups, currentlyLearning } from "@/content/skills";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 md:py-28" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          title="Skills"
          description="Tools I use to build intelligent, production-ready applications — from training and integrating ML models to building the full-stack systems around them."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.06}>
              <div className="group h-full rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border/60 hover:shadow-lg hover:shadow-accent/5">
                <div className="mb-1 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {group.category}
                  </h3>
                  <span className="font-mono text-xs text-muted-foreground/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mb-4 text-xs text-muted-foreground">{group.blurb}</p>
                <ul className="flex flex-wrap gap-2" aria-label={`${group.category} skills`}>
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-accent-border/40 group-hover:text-foreground"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Currently learning strip */}
        <Reveal delay={0.15} className="mt-6">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-dashed border-accent-border/50 bg-accent-soft/30 px-5 py-4">
            <span className="flex items-center gap-2 text-sm font-medium text-accent">
              <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
              Currently learning
            </span>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              {currentlyLearning.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
