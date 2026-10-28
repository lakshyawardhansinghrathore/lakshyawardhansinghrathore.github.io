"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length),
    [],
  );

  /* Auto-advance every 6s unless the user is interacting */
  useEffect(() => {
    if (paused) return;
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next, paused]);

  const current = testimonials[index];

  return (
    <section id="testimonials" className="scroll-mt-24 py-20 md:py-28" aria-label="Testimonials">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="09" title="Kind words" description="What professors, mentors and teammates say — testimonials." />

        <Reveal>
          <div
            className="relative overflow-hidden rounded-xl border border-border bg-card p-8 sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Quote
              className="absolute -right-4 -top-4 size-32 rotate-12 text-accent/5"
              aria-hidden
            />

            <div aria-live="polite">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={index}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                >
                  <blockquote className="max-w-3xl text-base leading-relaxed text-foreground sm:text-lg">
                    &ldquo;{current.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <span className="flex size-10 items-center justify-center rounded-full border border-accent-border/60 bg-accent-soft font-display text-sm font-bold text-accent">
                      {current.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground">{current.name}</p>
                      <p className="text-xs text-muted-foreground">{current.role}</p>
                    </div>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex gap-2" role="tablist" aria-label="Testimonial selector">
                {testimonials.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    aria-label={`Show testimonial from ${t.name}`}
                    onClick={() => setIndex(i)}
                    className={cn(
                      "h-1.5 cursor-pointer rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-accent" : "w-3 bg-border hover:bg-muted-foreground",
                    )}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent-border hover:text-accent"
                >
                  <ChevronLeft className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent-border hover:text-accent"
                >
                  <ChevronRight className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
