"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Download, Menu, X } from "lucide-react";
import { sections, site } from "@/content/portfolio";

export function PortfolioNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const path = usePathname();
  const progress = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const elements = sections.map(({ id }) => document.getElementById(id)).filter((el) => el !== null);
    const update = () => {
      const current = elements.filter((el) => el.getBoundingClientRect().top <= innerHeight * .4).at(-1);
      setActive(current?.id ?? "");
      const range = document.documentElement.scrollHeight - innerHeight;
      if (progress.current) progress.current.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, scrollY/range)) : 0})`;
    };
    const resize = new ResizeObserver(update);
    resize.observe(document.body);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && button.current?.getAttribute("aria-expanded") === "true") {
        setOpen(false); button.current.focus();
      }
    };
    document.addEventListener("keydown", escape);
    return () => { resize.disconnect(); window.removeEventListener("scroll", update); document.removeEventListener("keydown", escape); };
  }, [path]);
  return <header className={`portfolio-header ${active && active !== "home" ? "scrolled" : ""}`}>
    <div ref={progress} className="page-progress" aria-hidden="true"/>
    <nav className="portfolio-container navigation" aria-label="Main navigation"
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
      <Link prefetch={false} href="/#home" onClick={() => setOpen(false)} className="monogram" aria-label={site.initials + ". " + site.name + ", home"}>{site.initials}<span>.</span></Link>
      <div id="nav-items" className={`nav-links ${open ? "expanded" : ""}`}>
        {sections.map(({id,label}) => <a key={id} href={`/#${id}`} aria-current={active === id ? "location" : undefined} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
      <a className="nav-github" href={site.resumeUrl} download><Download size={15}/> Résumé</a>
      <button ref={button} className="menu-toggle" aria-controls="nav-items" aria-expanded={open} aria-label={open ? "Close navigation" : "Open navigation"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
    </nav>
  </header>;
}
