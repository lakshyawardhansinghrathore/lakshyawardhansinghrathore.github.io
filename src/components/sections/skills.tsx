import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { skillGroups, currentlyLearning } from "@/content/skills";

/** Split skill groups into 3 marquee rows */
const ROW_1 = skillGroups.slice(0, 2).flatMap((g) => g.skills);
const ROW_2 = skillGroups.slice(2, 4).flatMap((g) => g.skills);
const ROW_3 = skillGroups.slice(4).flatMap((g) => g.skills).concat(currentlyLearning);

/** Color accent dots per group category */
const CATEGORY_COLOR: Record<string, string> = {
  Languages: "bg-accent",
  "AI / Machine Learning": "bg-cyan",
  "Full Stack Development": "bg-accent",
  Databases: "bg-cyan",
  "Tools & DevOps": "bg-accent",
};

function SkillPill({ skill, category, dim }: { skill: string; category: string; dim?: boolean }) {
  const dot = CATEGORY_COLOR[category] ?? "bg-accent";
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 hover:border-accent-border/70 hover:bg-accent-soft hover:text-accent hover:shadow-md hover:shadow-accent/10 ${
        dim
          ? "border-border/60 bg-muted/40 text-muted-foreground/70"
          : "border-border bg-card text-muted-foreground"
      }`}
    >
      <span className={`size-1.5 rounded-full ${dot}`} aria-hidden />
      {skill}
    </span>
  );
}

function MarqueeRow({
  skills,
  category,
  direction,
  speed,
}: {
  skills: string[];
  category: string;
  direction: "left" | "right";
  speed: "normal" | "fast";
}) {
  const cls =
    direction === "left"
      ? speed === "fast"
        ? "animate-marquee-left-fast"
        : "animate-marquee-left"
      : "animate-marquee-right";

  const doubled = [...skills, ...skills];
  return (
    <div className="group relative flex overflow-hidden py-1.5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className={`flex gap-3 ${cls} group-hover:[animation-play-state:paused]`}>
        {doubled.map((skill, i) => (
          <SkillPill key={`${skill}-${i}`} skill={skill} category={category} />
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-20 md:py-28" aria-label="Skills">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="03"
          title="Skills"
          description="Tools I use to build intelligent, production-ready applications — from training ML models to shipping the full-stack systems around them."
        />
      </div>

      {/* Full-bleed marquee rows */}
      <div className="mt-10 space-y-3">
        <MarqueeRow
          skills={ROW_1}
          category="Languages"
          direction="left"
          speed="normal"
        />
        <MarqueeRow
          skills={ROW_2}
          category="AI / Machine Learning"
          direction="right"
          speed="normal"
        />
        <MarqueeRow
          skills={ROW_3}
          category="Tools & DevOps"
          direction="left"
          speed="fast"
        />
      </div>

      {/* Category legend */}
      <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((group, i) => (
              <div
                key={group.category}
                className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent-border/60 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="font-display text-sm font-semibold text-foreground">
                    {group.category}
                  </h3>
                  <span className="font-mono text-[10px] text-muted-foreground/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="mb-3 text-[11px] text-muted-foreground">{group.blurb}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-[11px] font-medium text-muted-foreground transition-colors group-hover:border-accent-border/40 group-hover:text-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Currently learning strip */}
        <Reveal delay={0.15} className="mt-5">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-dashed border-accent-border/50 bg-accent-soft/30 px-5 py-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-accent">
              <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
              Currently learning
            </span>
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
              {currentlyLearning.map((s) => (
                <li key={s} className="flex items-center gap-1.5">
                  <span className="size-1 rounded-full bg-cyan" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
