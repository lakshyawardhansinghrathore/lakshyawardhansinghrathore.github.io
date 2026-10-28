import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28" aria-label="Projects">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          title="Featured projects"
          description="Each project has a full case study — the problem, the constraints, the decisions and what I'd do differently. No tutorial clones."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={(i % 2) * 0.08}>
              <article className="group h-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-accent-border/70 hover:shadow-xl hover:shadow-accent/5">
                {/* Preview image */}
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={`${project.title} preview — ${project.tagline}`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  {/* Quick links overlay */}
                  <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 focus-within:opacity-100">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} on GitHub`}
                        className="flex size-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-300 backdrop-blur transition-colors hover:border-accent hover:text-accent"
                      >
                        <GithubIcon className="size-4" />
                      </a>
                    ) : null}
                    {project.liveUrl ? (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} live demo`}
                        className="flex size-9 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-900/90 text-zinc-300 backdrop-blur transition-colors hover:border-accent hover:text-accent"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    ) : null}
                  </div>
                  {/* Year chip */}
                  <span className="absolute left-3 top-3 rounded-full border border-zinc-700/60 bg-zinc-950/70 px-2.5 py-0.5 font-mono text-[11px] text-zinc-300 backdrop-blur">
                    {project.year}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                    {project.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={`/projects/${project.slug}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-all hover:gap-2.5"
                  >
                    Read case study
                    <ArrowUpRight className="size-4" aria-hidden />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            More experiments and half-finished ideas live on{" "}
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
