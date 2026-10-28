"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, MapPin, Sparkles, Cpu, BookOpen, Code2, Star } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Badge } from "@/components/ui/badge";
import { site } from "@/content/site";
import { currentlyLearning } from "@/content/skills";

function AnimatedCounter({ to, suffix = "", decimals = 0 }: { to: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1600;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(parseFloat((eased * to).toFixed(decimals)));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, decimals]);

  return (
    <span ref={ref} className="tabular-nums">
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
}

/**
 * ABOUT — bento grid layout (award-winning style).
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

        {/* Bento grid */}
        <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">

          {/* ── Bio card — spans 2 cols ── */}
          <Reveal className="sm:col-span-2">
            <div className="group h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-accent-border/60 hover:shadow-xl hover:shadow-accent/5">
              <div className="mb-5 flex items-center gap-4">
                <div className="relative flex size-16 items-center justify-center rounded-2xl border border-accent-border/60 bg-accent-soft font-display text-xl font-extrabold text-accent">
                  {site.initials}
                  <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-accent">
                    <Star className="size-2.5 fill-current text-accent-foreground" aria-hidden />
                  </span>
                </div>
                <div>
                  <p className="font-display text-lg font-bold text-foreground">{site.name}</p>
                  <p className="text-xs text-muted-foreground">{site.role}</p>
                </div>
              </div>

              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p className="text-base text-foreground/90">
                  I&apos;m {site.name.split(" ")[0]} — a final-year Computer Science student at{" "}
                  {site.education.school} who fell into programming through the classic gateway:{" "}
                  <code className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-xs text-accent">
                    while (true) {"{ learn(); build(); }"}
                  </code>{" "}
                  a loop I still haven&apos;t escaped.
                </p>
                <p>
                  Over the past four years, I&apos;ve grown from writing my first Java programs to building
                  a strong foundation in software development and exploring AI and Machine Learning. What
                  excites me most is the journey from idea to working solution — problem to design, design
                  to clean code, code to production.
                </p>
                <p>
                  Right now, final year — focused on Java, DSA, and AI/ML while shipping projects that turn
                  concepts into practical tools. Next stop: a team where I can build meaningful software and
                  keep growing.
                </p>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <Badge>Machine Learning</Badge>
                <Badge variant="outline">Generative AI</Badge>
                <Badge variant="outline">Full-Stack Dev</Badge>
                <Badge variant="outline">Open Source</Badge>
              </div>
            </div>
          </Reveal>

          {/* ── CGPA stat card ── */}
          <Reveal delay={0.05}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-accent-border/50 bg-accent-soft p-7 transition-all duration-300 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10">
              <div className="absolute -right-6 -top-6 size-28 rounded-full bg-accent/10 blur-2xl" aria-hidden />
              <GraduationCap className="mb-3 size-7 text-accent" aria-hidden />
              <p className="text-gradient font-display text-5xl font-extrabold">
                <AnimatedCounter to={9.02} suffix="" decimals={2} />
              </p>
              <p className="mt-1 text-sm font-semibold text-accent">CGPA / 10</p>
              <p className="mt-2 text-xs text-muted-foreground">
                {site.education.degree}
              </p>
              <p className="text-xs text-muted-foreground">
                {site.education.school} · {site.education.period}
              </p>
            </div>
          </Reveal>

          {/* ── Currently learning marquee card ── */}
          <Reveal delay={0.08}>
            <div className="h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border/60 hover:shadow-xl hover:shadow-accent/5">
              <div className="mb-4 flex items-center gap-2">
                <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
                <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Currently learning
                </p>
              </div>
              {/* Scrolling marquee */}
              <div className="overflow-hidden">
                <div className="flex animate-marquee-left-fast gap-3 whitespace-nowrap">
                  {[...currentlyLearning, ...currentlyLearning, ...currentlyLearning].map((s, i) => (
                    <span
                      key={i}
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-accent-border/50 bg-accent-soft px-3 py-1.5 text-xs font-medium text-accent"
                    >
                      <Code2 className="size-3" aria-hidden />
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Cpu className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Interests</p>
                    <p className="text-xs text-muted-foreground">
                      Real-time systems · DX tooling · Performance engineering
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Current focus</p>
                    <p className="text-xs text-muted-foreground">
                      Placement prep · CampusFlow · PrepWise
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* ── Location card ── */}
          <Reveal delay={0.1}>
            <div className="relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border/60 hover:shadow-xl hover:shadow-accent/5">
              {/* Faint map pin glow */}
              <div className="absolute -bottom-8 -right-8 size-32 rounded-full bg-cyan/10 blur-2xl" aria-hidden />
              <MapPin className="mb-3 size-6 text-cyan" aria-hidden />
              <p className="font-display text-lg font-bold text-foreground">{site.location}</p>
              <p className="mt-1 text-xs text-muted-foreground">Open to relocation &amp; remote</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Seeking
              </p>
              <p className="mt-1 text-sm text-foreground">{site.availability}</p>
            </div>
          </Reveal>

          {/* ── Reading / BookOpen card ── */}
          <Reveal delay={0.12}>
            <div className="h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent-border/60 hover:shadow-xl hover:shadow-accent/5">
              <BookOpen className="mb-3 size-6 text-accent" aria-hidden />
              <p className="font-display text-lg font-bold text-foreground">VIT Bhopal</p>
              <p className="mt-1 text-xs text-muted-foreground">B.Tech · CSE · 2023 – 2027</p>
              <ul className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  Core — Android Club & CISCO Community
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-cyan" aria-hidden />
                  500+ LeetCode · Codeforces Specialist
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-accent" aria-hidden />
                  30+ merged open-source PRs
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
