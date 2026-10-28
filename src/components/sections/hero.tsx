"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Download, Mail, Trophy } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { ParticleField } from "@/components/particle-field";
import { buttonVariants } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

/* Rotating typed words in the hero subtitle */
const TYPED_WORDS = [
  "web platforms.",
  "developer tools.",
  "real-time systems.",
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
    let delay = deleting ? 38 : 68;
    if (!deleting && sub === word.length) delay = 1800; // hold the full word
    if (deleting && sub === 0) delay = 350;
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
    <span className="font-mono text-accent">
      {shown}
      <span className="ml-0.5 inline-block h-[1em] w-[8px] translate-y-[3px] animate-blink bg-accent" aria-hidden />
    </span>
  );
}

const SOCIALS = [
  { label: "GitHub", href: site.social.github, icon: GithubIcon },
  { label: "LinkedIn", href: site.social.linkedin, icon: LinkedinIcon },
  { label: "LeetCode", href: site.social.leetcode, icon: Trophy },
  { label: "Email", href: `mailto:${site.email}`, icon: Mail },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Animated particle background + soft gradient glows */}
      <ParticleField className="absolute inset-0 h-full w-full" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-background to-transparent"
      />

      <div className="relative mx-auto max-w-4xl px-4 pb-24 pt-32 text-center sm:px-6">
        {/* Availability badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-accent-border/50 bg-accent-soft/60 px-4 py-1.5 text-xs font-medium text-accent backdrop-blur"
        >
          <span className="size-2 animate-pulse-dot rounded-full bg-accent" aria-hidden />
          {site.availability}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-display text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          {site.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.16 }}
          className="mt-5 text-lg text-muted-foreground sm:text-xl"
        >
          <span className="text-foreground">I build </span>
          <TypedWords />
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.24 }}
          className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base"
        >
          {site.tagline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a href="#projects" className={cn(buttonVariants({ size: "lg" }))}>
            View projects <ArrowDown className="size-4" aria-hidden />
          </a>
          <a
            href={site.resumeUrl}
            target={site.resumeUrl.startsWith("http") ? "_blank" : undefined}
            rel={site.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
            download={site.resumeUrl.endsWith(".pdf") ? true : undefined}
            className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
          >
            Resume <Download className="size-4" aria-hidden />
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-9 flex items-center justify-center gap-2"
        >
          {SOCIALS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-accent-border hover:text-accent"
            >
              <Icon className="size-[18px]" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-accent sm:flex"
        aria-label="Scroll to about section"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-current p-1.5">
          <motion.span
            className="size-1 rounded-full bg-current"
            animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
