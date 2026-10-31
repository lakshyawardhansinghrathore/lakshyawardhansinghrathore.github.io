"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Download, Mail, Trophy, Zap, Sparkles, Cpu, Layers, Terminal } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/* ── Rotating typed words ──────────────────────────────────── */
const TYPED_WORDS = [
  "AI-powered products.",
  "real-time platforms.",
  "developer tooling.",
  "open-source software.",
];

function TypedWords() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const word = TYPED_WORDS[index];
    let delay = deleting ? 36 : 62;
    if (!deleting && sub === word.length) delay = 2000;
    if (deleting && sub === 0) delay = 320;
    const t = setTimeout(() => {
      if (!deleting) {
        if (sub < word.length) setSub(sub + 1);
        else setDeleting(true);
      } else {
        if (sub > 0) setSub(sub - 1);
        else {
          setDeleting(false);
          setIndex((i) => (i + 1) % TYPED_WORDS.length);
        }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [sub, deleting, index, reduce]);

  const word = TYPED_WORDS[index];
  const shown = reduce ? TYPED_WORDS[0] : word.slice(0, sub);

  return (
    <span className="text-gradient animate-gradient font-display">
      {shown}
      <span
        className="ml-0.5 inline-block h-[1em] w-[3px] translate-y-[3px] animate-blink rounded-sm bg-accent"
        aria-hidden
      />
    </span>
  );
}

/* ── Animated counter ──────────────────────────────────────── */
function AnimatedCounter({ to, suffix = "" }: { to: number; suffix?: string }) {
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
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * to));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ── Socials ───────────────────────────────────────────────── */
const SOCIALS = [
  { label: "GitHub", href: site.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.social.linkedin, icon: LinkedinIcon },
  { label: "Codeforces", href: site.social.codeforces, icon: Trophy },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

const STATS = [
  { label: "LeetCode solved", value: 500, suffix: "+" },
  { label: "CGPA", value: 9.02, suffix: "" },
  { label: "Open-source PRs", value: 30, suffix: "+" },
];

/* ── Hero ──────────────────────────────────────────────────── */
export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Scroll parallax depths for floating tech badges
  const yBadge1 = useTransform(scrollY, [0, 600], [0, -150]);
  const yBadge2 = useTransform(scrollY, [0, 600], [0, -90]);
  const yBadge3 = useTransform(scrollY, [0, 600], [0, 130]);
  const yBadge4 = useTransform(scrollY, [0, 600], [0, 80]);
  const rot1 = useTransform(scrollY, [0, 600], [-4, 10]);
  const rot2 = useTransform(scrollY, [0, 600], [4, -8]);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* ── Aurora gradient orbs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Primary orb — violet */}
        <div className="animate-aurora absolute -top-40 left-1/4 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />
        {/* Secondary orb — cyan */}
        <div className="animate-aurora-delay absolute -top-20 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-cyan/15 blur-[100px]" />
        {/* Bottom glow */}
        <div className="animate-aurora-slow absolute bottom-0 left-1/2 h-[400px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      {/* ── Grid pattern overlay ── */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
      />

      {/* ── Floating Parallax Tech Badges (Visible on larger screens) ── */}
      <motion.div
        style={{ y: yBadge1, rotate: rot1 }}
        className="pointer-events-none absolute left-8 top-1/3 hidden lg:flex items-center gap-2 rounded-2xl border border-accent-border/50 bg-card/70 px-4 py-2.5 shadow-xl shadow-accent/10 backdrop-blur-md"
      >
        <span className="flex size-7 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Sparkles className="size-4" />
        </span>
        <div className="text-left font-mono text-xs">
          <p className="font-semibold text-foreground">PyTorch &amp; GenAI</p>
          <p className="text-[10px] text-muted-foreground">Deep Learning</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yBadge2, rotate: rot2 }}
        className="pointer-events-none absolute right-8 top-1/4 hidden lg:flex items-center gap-2 rounded-2xl border border-cyan/40 bg-card/70 px-4 py-2.5 shadow-xl shadow-cyan/10 backdrop-blur-md"
      >
        <span className="flex size-7 items-center justify-center rounded-xl bg-cyan-soft text-cyan">
          <Cpu className="size-4" />
        </span>
        <div className="text-left font-mono text-xs">
          <p className="font-semibold text-foreground">Java &amp; DSA</p>
          <p className="text-[10px] text-muted-foreground">500+ Solved</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yBadge3 }}
        className="pointer-events-none absolute left-14 bottom-1/4 hidden xl:flex items-center gap-2 rounded-2xl border border-border/70 bg-card/70 px-4 py-2.5 shadow-xl backdrop-blur-md"
      >
        <span className="flex size-7 items-center justify-center rounded-xl bg-muted text-foreground">
          <Layers className="size-4" />
        </span>
        <div className="text-left font-mono text-xs">
          <p className="font-semibold text-foreground">Next.js 16 + PostgreSQL</p>
          <p className="text-[10px] text-muted-foreground">Drizzle ORM</p>
        </div>
      </motion.div>

      <motion.div
        style={{ y: yBadge4 }}
        className="pointer-events-none absolute right-14 bottom-1/3 hidden xl:flex items-center gap-2 rounded-2xl border border-border/70 bg-card/70 px-4 py-2.5 shadow-xl backdrop-blur-md"
      >
        <span className="flex size-7 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Terminal className="size-4" />
        </span>
        <div className="text-left font-mono text-xs">
          <p className="font-semibold text-foreground">VIT Bhopal</p>
          <p className="text-[10px] text-muted-foreground">B.Tech CSE &apos;27</p>
        </div>
      </motion.div>

      {/* ── Fade to background at bottom ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent"
      />

      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative mx-auto max-w-5xl px-4 pb-28 pt-36 text-center sm:px-6"
      >
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-accent-border/60 bg-accent-soft/70 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-accent backdrop-blur"
        >
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
          {site.availability}
        </motion.div>

        {/* Giant heading */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="font-display text-5xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-foreground">{site.name.split(" ")[0]} </span>
          <span className="text-gradient animate-gradient">
            {site.name.split(" ").slice(1).join(" ")}
          </span>
        </motion.h1>

        {/* Subtitle with typed words */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.18 }}
          className="mt-6 text-xl font-medium text-muted-foreground sm:text-2xl"
        >
          I build{" "}
          <TypedWords />
        </motion.p>

        {/* Role / tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.26 }}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {site.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.34 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#projects"
            className={cn(
              buttonVariants({ size: "lg" }),
              "glow-accent-sm relative overflow-hidden bg-accent font-semibold text-accent-foreground transition-all duration-300 hover:scale-[1.03] hover:glow-accent",
            )}
          >
            <span className="animate-shimmer absolute inset-0" aria-hidden />
            View projects <ArrowDown className="size-4" aria-hidden />
          </a>
          <a
            href={site.resumeUrl}
            target={site.resumeUrl.startsWith("http") ? "_blank" : undefined}
            rel={site.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            download={site.resumeUrl.endsWith(".pdf") ? true : undefined}
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-accent-border/50 font-semibold hover:border-accent/70 hover:bg-accent-soft",
            )}
          >
            Resume <Download className="size-4" aria-hidden />
          </a>
        </motion.div>

        {/* Social icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="group flex size-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-border/70 hover:bg-accent-soft hover:text-accent hover:shadow-lg hover:shadow-accent/20"
            >
              <Icon className="size-[18px]" />
            </a>
          ))}
        </motion.div>

        {/* Animated stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.62 }}
          className="mt-14 grid grid-cols-3 divide-x divide-border overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur"
        >
          {STATS.map(({ label, value, suffix }) => (
            <div key={label} className="flex flex-col items-center px-4 py-5">
              <span className="text-gradient font-display text-3xl font-bold sm:text-4xl">
                {Number.isInteger(value) ? (
                  <AnimatedCounter to={value} suffix={suffix} />
                ) : (
                  `${value}${suffix}`
                )}
              </span>
              <span className="mt-1 text-center text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-accent sm:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1.5">
          <motion.span
            className="size-1 rounded-full bg-current"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <Zap className="size-3 opacity-40" aria-hidden />
      </motion.a>
    </section>
  );
}
