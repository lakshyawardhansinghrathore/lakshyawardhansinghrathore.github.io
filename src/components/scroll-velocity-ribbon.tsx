"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from "framer-motion";

interface VelocityTextProps {
  children: string;
  baseVelocity?: number;
  className?: string;
  outline?: boolean;
}

function ParallaxText({
  children,
  baseVelocity = 1.8,
  className = "",
  outline = false,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${(v % 25) - 25}%`);
  const directionFactor = useRef<number>(1);

  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    // React dynamically to scroll direction
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap select-none py-1">
      <motion.div className="flex whitespace-nowrap gap-8" style={{ x }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <span
            key={i}
            className={`font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight flex items-center gap-8 ${
              outline
                ? "text-transparent [-webkit-text-stroke:1px_oklch(from_var(--border)_l_c_h_/_0.8)] dark:[-webkit-text-stroke:1px_oklch(from_var(--muted-foreground)_l_c_h_/_0.3)]"
                : "text-foreground/90"
            } ${className}`}
          >
            {children}
            <span className="size-2.5 sm:size-3 rounded-full bg-gradient-to-r from-accent to-cyan" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/**
 * Award-winning dual-ribbon scroll velocity ticker.
 * Reacts dynamically to scroll speed & direction.
 */
export function ScrollVelocityRibbon() {
  return (
    <section aria-hidden className="relative my-12 sm:my-16 overflow-hidden py-4 opacity-80 hover:opacity-100 transition-opacity duration-300">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-48 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-48 bg-gradient-to-l from-background to-transparent z-10" />

      <ParallaxText baseVelocity={-1.5}>
        FULL STACK ARCHITECT • MACHINE LEARNING • DATA SYSTEMS
      </ParallaxText>
      <ParallaxText baseVelocity={1.5} outline>
        CAMPUSFLOW • PREPWISE • 500+ LEETCODE • VIT BHOPAL
      </ParallaxText>
    </section>
  );
}
