"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Award-winning fluid custom cursor and ambient spotlight.
 * - Magnetic feel with spring physics
 * - Expands and changes style over interactive targets (a, button, input)
 * - Soft ambient spotlight that illuminates cards and page surface on hover
 * - Hidden on touch screens
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for delayed fluid follower
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slower spring for ambient background glow
  const ambientSpring = { damping: 45, stiffness: 120, mass: 1 };
  const ambientX = useSpring(mouseX, ambientSpring);
  const ambientY = useSpring(mouseY, ambientSpring);

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const isFinePointer = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (!isFinePointer) return;

    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest("a, button, input, textarea, select, [role='button'], .interactive-hover")
      );
      setHovered(isInteractive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient background mouse spotlight */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-10 size-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 dark:opacity-40 blur-[100px]"
        style={{
          x: ambientX,
          y: ambientY,
          background:
            "radial-gradient(circle, oklch(0.68 0.22 285 / 0.15) 0%, oklch(0.72 0.19 210 / 0.08) 50%, transparent 80%)",
        }}
      />

      {/* Outer fluid cursor ring */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[120] rounded-full border border-accent/60 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovered ? 46 : 28,
          height: hovered ? 46 : 28,
          backgroundColor: hovered ? "rgba(168, 85, 247, 0.15)" : "transparent",
          borderColor: hovered ? "rgba(34, 211, 238, 0.8)" : "rgba(168, 85, 247, 0.6)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      />

      {/* Tiny center precision dot */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[121] size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 0 : 1,
          opacity: hovered ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
