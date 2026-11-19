"use client";

import { useEffect, useRef, type ReactNode } from "react";

// The reading line is also the scroll-margin for stage links. One layout read
// per visible stage keeps keyboard jumps, touch scrolling and reverse scroll in sync.
export function ArchitectureStory({slug, children}: {slug: string; children: ReactNode}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const article = ref.current;
    if (!article) return;
    const stages = Array.from(article.querySelectorAll<HTMLElement>("[data-stage]"));
    const links = Array.from(article.querySelectorAll<HTMLAnchorElement>("[data-stage-link]"));
    const panels = Array.from(article.querySelectorAll<HTMLElement>("[data-trace-panel]"));
    if (!stages.length) return;
    let frame = 0;
    let listening = false;
    let active = -1;
    function update() {
      frame = 0;
      const desktop = matchMedia("(min-width: 850px) and (min-height: 620px)").matches;
      const line = desktop ? innerHeight * .44 : 90;
      const positions = stages.map(stage => stage.getBoundingClientRect().top);
      const index = Math.max(0, positions.filter(top => top <= line + 2).length - 1);
      const range = positions[0] - positions[positions.length-1];
      const progress = range ? Math.min(1,Math.max(0,(line-positions[0])/range)) : 1;
      article!.style.setProperty("--read", progress.toFixed(3));
      if (index === active) return;
      active = index;
      panels.forEach((panel, i) => { panel.hidden = i !== index; });
      links.forEach((link,i) => {
        if (i === index) link.setAttribute("aria-current","step");
        else link.removeAttribute("aria-current");
      });
      stages.forEach((stage,i) => stage.toggleAttribute("data-reading", i === index));
    }
    function schedule() { if (!frame) frame = requestAnimationFrame(update); }
    function detach() {
      window.removeEventListener("scroll",schedule);
      window.removeEventListener("resize",schedule);
      cancelAnimationFrame(frame);
      frame = 0;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting === listening) return;
      listening = entry.isIntersecting;
      if (!listening) { detach(); return; }
      window.addEventListener("scroll",schedule,{passive:true});
      window.addEventListener("resize",schedule);
      schedule();
    }, { rootMargin:"80px" });
    observer.observe(article);
    const resize = new ResizeObserver(schedule);
    resize.observe(article);
    return () => { observer.disconnect(); resize.disconnect(); detach(); };
  }, []);
  return <article ref={ref} id={`details-${slug}`} className={`work-story ${slug}`}>{children}</article>;
}
