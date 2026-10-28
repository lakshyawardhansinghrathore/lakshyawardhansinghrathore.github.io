"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { site, sections } from "@/content/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { useCommandPalette } from "@/components/command-palette";
import { cn } from "@/lib/utils";

/** Links shown in the top bar (the command palette covers every section). */
const NAV_IDS = ["about", "projects", "experience", "blog", "contact"] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { setOpen: setPaletteOpen } = useCommandPalette();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy: highlight the nav link whose section owns the viewport middle */
  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    for (const s of sections) {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [isHome]);

  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6" aria-label="Primary">
        {/* Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="flex size-8 items-center justify-center rounded-lg border border-accent-border/60 bg-accent-soft font-display text-sm font-bold text-accent">
            {site.initials}
          </span>
          <span className="hidden font-mono text-sm text-muted-foreground transition-colors group-hover:text-foreground sm:block">
            ~/{site.name.split(" ")[0].toLowerCase()}
            <span className="animate-blink text-accent">▍</span>
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_IDS.map((id) => {
            const s = sections.find((x) => x.id === id);
            if (!s) return null;
            return (
              <a
                key={id}
                href={hrefFor(id)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  active === id
                    ? "text-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="font-mono text-xs text-accent/70">{s.index}.</span> {s.label}
              </a>
            );
          })}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-border bg-card/60 px-2.5 text-muted-foreground transition-colors hover:border-accent-border hover:text-foreground"
            aria-label="Open command palette"
          >
            <Search className="size-4" aria-hidden />
            <span className="hidden text-xs lg:inline">Search</span>
            <kbd className="hidden rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] lg:inline">
              ⌘K
            </kbd>
          </button>
          <ThemeToggle />
          {/* Mobile menu button */}
          <button
            type="button"
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-xl md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-4 py-3 sm:px-6">
            {NAV_IDS.map((id) => {
              const s = sections.find((x) => x.id === id);
              if (!s) return null;
              return (
                <a
                  key={id}
                  href={hrefFor(id)}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <span className="font-mono text-xs text-accent/70">{s.index}.</span> {s.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
