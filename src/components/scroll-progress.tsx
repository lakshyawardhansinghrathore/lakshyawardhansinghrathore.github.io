"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * Award-winning scroll progress:
 * 1. Radiant top gradient bar with glowing runner tip
 * 2. Floating interactive circular progress pill with percentage and click-to-top
 */
export function ScrollProgress() {
  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [percent, setPercent] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercent(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setVisible(latest > 300);
    });
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Top glowing progress line */}
      <div className="fixed inset-x-0 top-0 z-[100] h-[3px] pointer-events-none">
        <motion.div
          className="h-full origin-left bg-gradient-to-r from-accent via-cyan to-accent"
          style={{ scaleX }}
          aria-hidden
        />
        {/* Glow behind the line */}
        <motion.div
          className="h-2 w-full origin-left bg-gradient-to-r from-accent/50 via-cyan/50 to-accent/50 blur-[4px] -translate-y-1"
          style={{ scaleX }}
          aria-hidden
        />
      </div>

      {/* Floating Bottom-Right Scroll Indicator & Back-To-Top */}
      <motion.button
        type="button"
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={
          visible
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 0, scale: 0.8, y: 20 }
        }
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2 rounded-full border border-border/80 bg-card/80 px-3.5 py-2 text-xs font-mono font-medium text-foreground backdrop-blur-xl shadow-xl shadow-black/20 hover:border-accent-border/70 hover:text-accent transition-all duration-200 group cursor-pointer"
        aria-label="Scroll back to top"
      >
        <div className="relative flex size-5 items-center justify-center">
          {/* Circular progress SVG */}
          <svg className="size-5 -rotate-90" viewBox="0 0 36 36">
            <path
              className="text-border"
              strokeWidth="3.5"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <path
              className="text-accent transition-all duration-150"
              strokeDasharray={`${percent}, 100`}
              strokeWidth="3.5"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <ArrowUp className="absolute size-2.5 text-accent group-hover:-translate-y-0.5 transition-transform duration-200" />
        </div>
        <span className="tabular-nums font-semibold">{percent}%</span>
      </motion.button>
    </>
  );
}
