import Link from "next/link";
import { ArrowUpRight, Heart, Zap } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { site, sections } from "@/content/site";
import { changelog } from "@/content/changelog";

function AboutThisSite() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
      <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-foreground">
        <span className="font-mono text-accent">$</span> about this site
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Built with Next.js (App Router), TypeScript, Tailwind CSS v4, Framer Motion and PostgreSQL
        via Drizzle — deployed on Vercel. Award-winning design system, two typefaces, and an
        interactive terminal because a dev portfolio should{" "}
        <em>feel</em> like a dev built it.
      </p>
      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "Drizzle ORM", "Vercel"].map(
          (tech) => (
            <li
              key={tech}
              className="rounded-full border border-border bg-muted/60 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground transition-colors hover:border-accent-border/60 hover:text-accent"
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
    <footer className="relative overflow-hidden">
      {/* Gradient top border */}
      <div
        aria-hidden
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
      />
      {/* Subtle glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl"
      />

      <div className="bg-card/30 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
            <AboutThisSite />

            {/* Quick links */}
            <nav aria-label="Footer navigation">
              <h3 className="font-display text-sm font-semibold text-foreground">Explore</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {sections.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <a
                      href={`/#${s.id}`}
                      className="group flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                    >
                      <span className="font-mono text-xs text-accent/50 transition-colors group-hover:text-accent">
                        {s.index}.
                      </span>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Elsewhere */}
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground">Elsewhere</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li>
                  <a
                    href={site.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                  >
                    <GithubIcon className="size-3.5" />
                    GitHub
                    <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href={site.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                  >
                    <LinkedinIcon className="size-3.5" />
                    LinkedIn
                    <ArrowUpRight className="size-3 opacity-0 transition-all group-hover:opacity-100" aria-hidden />
                  </a>
                </li>
                <li>
                  <a
                    href={site.resumeUrl}
                    target={site.resumeUrl.startsWith("http") ? "_blank" : undefined}
                    rel={site.resumeUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    download={site.resumeUrl.endsWith(".pdf") ? true : undefined}
                    className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs text-accent/50">↗</span>
                    Resume
                  </a>
                </li>
                <li>
                  <Link
                    href="/changelog"
                    className="group inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs text-accent/50">
                      {latest?.version ?? "v1"}
                    </span>
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>
              © {new Date().getFullYear()}{" "}
              <span className="text-gradient font-semibold">{site.name}</span>
              {" "}· {site.education.school}
            </p>
            <p className="flex items-center gap-1.5">
              Designed &amp; built with{" "}
              <Heart className="size-3 fill-current text-accent" aria-hidden />
              {" "}and{" "}
              <Zap className="size-3 text-cyan" aria-hidden />
              {" "}powered by coffee.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
