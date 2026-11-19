"use client";

import { animateChapters } from "./chapter-motion";
import { useEffect, useRef, type ReactNode } from "react";

const cinematicViewport = "(min-width: 850px) and (min-height: 620px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

export function PortfolioMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = root.current;
    if (!host) return;
    const media = matchMedia(cinematicViewport);
    let generation = 0;
    let revert = () => {};
    async function install() {
      const current = ++generation;
      revert();
      if (!host || !media.matches) return;
      const [{gsap}, {ScrollTrigger}] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (current !== generation) return;
      gsap.registerPlugin(ScrollTrigger);
      const runway = host.querySelector<HTMLElement>(".opening-runway");
      const screen = host.querySelector<HTMLElement>(".opening-screen");
      const entrance = host.querySelector<HTMLElement>(".entrance-content");
      const interior = host.querySelector<HTMLElement>(".interior-scene");
      if (!runway || !screen || !entrance || !interior) return;
      runway.classList.add("has-camera");
      interior.inert = true;
      const navHeight = () => document.querySelector(".portfolio-header")?.getBoundingClientRect().height ?? 68;
      const context = gsap.context(() => {
        const passage = gsap.timeline({scrollTrigger:{
          trigger:runway, pin:screen, pinSpacing:false,
          start:()=> "top top+=" + navHeight(),
          end:()=> "+=" + (runway.offsetHeight - screen.offsetHeight),
          scrub:true, invalidateOnRefresh:true,
          onUpdate: self => { entrance.inert = self.progress > .39; interior.inert = self.progress < .48; },
        }});
        passage.to(".identity h1 span",{xPercent:-13, ease:"power1.in",duration:.43},0)
          .to(".identity h1 em",{xPercent:-19, ease:"power1.in",duration:.43},0)
          .to(entrance,{autoAlpha:0,duration:.42,ease:"power1.in"},0)
          .to(".optical-frame",{scale:8.5,rotate:9,xPercent:-20,yPercent:4,duration:.91,ease:"power2.in"},0)
          .to(".entrance-backdrop",{opacity:0,duration:.49,ease:"sine.inOut"},.12)
          .fromTo(".interior-copy",{y:38,opacity:0},{y:0,opacity:1,duration:.33},.62)
          .fromTo(".interior-mesh",{scale:.84},{scale:1,duration:.61,ease:"sine.out"},.34);
        animateChapters(host,gsap,ScrollTrigger,navHeight);
      },host);
      ScrollTrigger.refresh();
      let refreshFrame = 0;
      let height = host.offsetHeight;
      const resize = new ResizeObserver(() => {
        if (height === host.offsetHeight) return;
        height = host.offsetHeight;
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
      });
      resize.observe(host);
      // Restore the active panel when a keyboard user tabs into a covered link.
      function showFocusedPanel(event: FocusEvent) {
        const link = event.target;
        if (!(link instanceof HTMLAnchorElement) || !link.matches(":focus-visible")) return;
        const cover = link.closest<HTMLElement>("[data-cover]");
        if (!cover) return;
        const rect = link.getBoundingClientRect();
        const atLink = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
        if (!link.contains(atLink)) document.getElementById("work-" + cover.dataset.cover)?.scrollIntoView({behavior:"instant"});
      }
      host.addEventListener("focusin",showFocusedPanel);
      revert = () => {
        host.removeEventListener("focusin",showFocusedPanel);
        resize.disconnect();
        cancelAnimationFrame(refreshFrame);
        context.revert();
        runway.classList.remove("has-camera");
        entrance.inert = false;
        interior.inert = false;
      };
    }
    void install();
    media.addEventListener("change",install);
    return () => { generation++; media.removeEventListener("change",install); revert(); };
  }, []);
  return <div ref={root}>{children}</div>;
}

