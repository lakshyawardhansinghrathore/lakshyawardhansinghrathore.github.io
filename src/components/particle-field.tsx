"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle animated particle-network background for the hero.
 * - Slow-drifting dots connected by faint lines (classic "network" effect)
 * - Theme-aware (emerald on dark, deeper green on light)
 * - Renders a single static frame when prefers-reduced-motion is set
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Non-null assertions: guarded by the runtime check below
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    if (!canvasRef.current || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let w = 0;
    let h = 0;

    interface P {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    }
    let particles: P[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Density scales with area, capped so huge screens stay cheap
      const count = Math.min(80, Math.floor((w * h) / 16000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.4 + 0.6,
      }));
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      const isDark = document.documentElement.classList.contains("dark");
      const rgb = isDark ? "16,185,129" : "5,150,105"; // emerald-400 / emerald-600

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -12) p.x = w + 12;
        if (p.x > w + 12) p.x = -12;
        if (p.y < -12) p.y = h + 12;
        if (p.y > h + 12) p.y = -12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},0.45)`;
        ctx.fill();
      }

      // Connect particles within 120px with fading lines
      const max = 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * 0.16;
            ctx.strokeStyle = `rgba(${rgb},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function loop() {
      draw();
      raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    if (reduce) {
      draw(); // single static frame
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
