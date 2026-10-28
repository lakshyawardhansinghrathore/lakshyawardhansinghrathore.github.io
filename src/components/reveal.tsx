"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** stagger delay in seconds */
  delay?: number;
  /** vertical offset in px */
  y?: number;
  /** horizontal offset in px */
  x?: number;
  /** scale entry */
  scale?: number;
  /** perspective depth effect */
  perspective3D?: boolean;
}

/**
 * Award-winning scroll-triggered reveal:
 * - Subtle 3D perspective fold-in (rotateX)
 * - Cinematic unblur filter
 * - Scale & smooth cubic bezier easing
 * - Respects prefers-reduced-motion
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 35,
  x = 0,
  scale = 0.96,
  perspective3D = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={perspective3D ? { perspective: 1200 } : undefined}
      initial={{
        opacity: 0,
        y,
        x,
        scale,
        rotateX: perspective3D ? 8 : 0,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1], // cinematic Apple/Linear curve
      }}
    >
      {children}
    </motion.div>
  );
}
