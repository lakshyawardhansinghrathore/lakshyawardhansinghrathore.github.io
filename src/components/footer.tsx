import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { site, sections } from "@/content/site";
import { changelog } from "@/content/changelog";

/** Compact "about this site" note shown above the footer. */
function AboutThisSite() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <span className="font-mono text-accent">$</span> about this site
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion and PostgreSQL via
        Drizzle — deployed on Vercel. One accent colour, two typefaces, and an interactive terminal
        because a dev portfolio should feel like a dev built it. The source is a single
        <code className="mx-1 rounded bg-muted px-1.5 py-0.5 font-mono text-xs">content/</code>
        folder away from being yours.
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "Drizzle ORM", "Vercel"].map(
          (tech) => (
            <li
              key={tech}
              className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
            >
              {tech}
            </li>
          ),
        )}
      </ul>
    </div>
  );
}

export function Footer() {
  const latest = changelog[0];

  return (
    <footer className="border-t border-border bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* About this site */}
          <AboutThisSite />

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="font-display text-sm font-semibold text-foreground">Explore</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {sections.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a
                    href={`/#${s.id}`}
                    className="text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs text-accent/60">{s.index}.</span> {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Elsewhere */}
          <div>
            <h3 className="font-display text-sm font-semibold text-foreground">Elsewhere</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                >
                  <GithubIcon className="size-3.5" /> GitHub <ArrowUpRight className="size-3" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                >
                  <LinkedinIcon className="size-3.5" /> LinkedIn <ArrowUpRight className="size-3" aria-hidden />
                </a>
              </li>
              <li>
                <a
                  href={site.resumeUrl}
                  target={site.resumeUrl.startsWith("http") ? "_blank" : undefined}
                  rel={site.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                  download={site.resumeUrl.endsWith(".pdf") ? true : undefined}
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                >
                  <span className="font-mono text-xs text-accent/60">↗</span> Resume
                </a>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                >
                  <span className="font-mono text-xs text-accent/60">v{latest.version.slice(1)}</span>
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.education.school}
          </p>
          <p className="flex items-center gap-1.5">
            Designed & built with <Heart className="size-3 text-accent" aria-hidden /> and an
            unreasonable amount of chai.
          </p>
        </div>
      </div>
    </footer>
  );
}
