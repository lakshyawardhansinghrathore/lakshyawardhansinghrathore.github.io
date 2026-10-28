"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin accent bar at the top of the page that fills as you read. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.4 });

  return (
    <motion.div
      className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-accent"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
