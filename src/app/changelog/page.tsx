import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, GitCommitHorizontal } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { changelog } from "@/content/changelog";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Version history of this portfolio — what shipped, when, and why.",
};

const TAG_STYLES: Record<string, string> = {
  launch: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500",
  feature: "border-accent-border/50 bg-accent-soft text-accent",
  design: "border-violet-500/30 bg-violet-500/10 text-violet-400",
  fix: "border-amber-500/30 bg-amber-500/10 text-amber-500",
};

export default function ChangelogPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back home
      </Link>

      <header className="mt-6">
        <h1 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Changelog
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          This site is versioned like a product. New features, design changes and fixes get logged
          here — mostly so future me can remember why things are the way they are.
        </p>
      </header>

      <div className="relative mt-12">
        <div aria-hidden className="absolute bottom-4 left-[7px] top-4 w-px bg-border" />
        <div className="space-y-8">
          {changelog.map((entry, i) => (
            <Reveal key={entry.version} delay={i * 0.05}>
              <article className="relative pl-10">
                <span
                  className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center rounded-full border-2 border-accent bg-background"
                  aria-hidden
                >
                  <GitCommitHorizontal className="size-2.5 text-accent" />
                </span>

                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-mono text-lg font-semibold text-foreground">{entry.version}</h2>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium capitalize ${TAG_STYLES[entry.tag] ?? TAG_STYLES.feature}`}
                  >
                    {entry.tag}
                  </span>
                  <time className="font-mono text-xs text-muted-foreground">{entry.date}</time>
                </div>

                <ul className="mt-3 space-y-2">
                  {entry.changes.map((change) => (
                    <li
                      key={change}
                      className="flex gap-2.5 rounded-lg border border-border bg-card p-3.5 text-sm leading-relaxed text-muted-foreground"
                    >
                      <span aria-hidden className="mt-2 size-1 shrink-0 rounded-full bg-accent/70" />
                      {change}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
