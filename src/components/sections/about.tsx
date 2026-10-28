import { GraduationCap, MapPin, Sparkles, Cpu, BookOpen } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { currentlyLearning } from "@/content/skills";

/**
 * ABOUT — narrative + quick facts.
 * TODO: personalise the narrative paragraphs below.
 */
export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28" aria-label="About">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          title="About"
          description="The short version — for the long version, open the terminal below."
        />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Narrative */}
          <Reveal className="space-y-5">
            <p className="text-base leading-relaxed text-foreground sm:text-lg">
              I&apos;m {site.name.split(" ")[0]} — a final-year Computer Science student at{" "}
              {site.education.school} who fell into programming through the classic gateway:
              a{" "}
              <span className="font-mono text-sm text-accent">while (true) {"{"} learn(); build(); {"}"}</span>{" "}
              loop I still haven&apos;t escaped.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Over the past four years, I&apos;ve grown from writing my first Java programs to
              building a strong foundation in software development and exploring the world of AI
              and Machine Learning. What excites me most is the journey from an idea to a working
              solution — understanding the problem, designing the approach, writing clean code,
              experimenting with models, and continuously improving what I&apos;ve built.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Right now, I&apos;m in my final year, focused on strengthening my skills in Java,
              Data Structures &amp; Algorithms, and AI/ML while working on projects that turn
              concepts into practical solutions. I&apos;m constantly learning, experimenting with
              new technologies, and documenting what I discover along the way.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Next stop: a team where I can build meaningful software, solve challenging problems
              with AI/ML, and keep growing as an engineer.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <Badge>Machine Learning Systems</Badge>
              <Badge variant="outline">LLM & Generative AI</Badge>
              <Badge variant="outline">Data & Model Pipelines</Badge>
              <Badge variant="outline">Developer tooling</Badge>
              <Badge variant="outline">Open source</Badge>
            </div>
          </Reveal>

          {/* Quick facts card */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-xl border border-accent-border/60 bg-accent-soft font-display text-lg font-bold text-accent">
                  {site.initials}
                </div>
                <div>
                  <p className="font-display font-semibold text-foreground">{site.name}</p>
                  <p className="text-xs text-muted-foreground">{site.role}</p>
                </div>
              </div>

              <dl className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <GraduationCap className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="sr-only">Education</dt>
                    <dd className="font-medium text-foreground">{site.education.degree}</dd>
                    <dd className="text-xs text-muted-foreground">
                      {site.education.school} · {site.education.period} · {site.education.detail}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="sr-only">Current focus</dt>
                    <dd className="font-medium text-foreground">Current focus</dd>
                    <dd className="text-xs text-muted-foreground">
                      Placement prep, CampusFlow, and shipping PrepWise
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Cpu className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="sr-only">Interests</dt>
                    <dd className="font-medium text-foreground">Interests</dd>
                    <dd className="text-xs text-muted-foreground">
                      Real-time systems, DX tooling, performance engineering
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <BookOpen className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="sr-only">Currently learning</dt>
                    <dd className="font-medium text-foreground">Currently learning</dd>
                    <dd className="mt-1 flex flex-wrap gap-1.5">
                      {currentlyLearning.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-border bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </dd>
                  </div>
                </div>
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <dt className="sr-only">Location</dt>
                    <dd className="font-medium text-foreground">{site.location}</dd>
                    <dd className="text-xs text-muted-foreground">
                      Open to relocation
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
