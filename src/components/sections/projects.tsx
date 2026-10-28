import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink, Star } from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/** Featured (first) project — full-width hero card */
function FeaturedProjectCard({ project }: { project: (typeof projects)[0] }) {
  return (
    <Reveal>
      <article className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:border-accent-border/70 hover:shadow-2xl hover:shadow-accent/10 lg:grid lg:grid-cols-[1.1fr_1fr]">
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto">
          <Image
            src={project.image}
            alt={`${project.title} preview — ${project.tagline}`}
            fill
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent lg:hidden" />

          {/* Overlay controls */}
          <div className="absolute right-4 top-4 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 focus-within:opacity-100">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="glass flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:text-accent"
              >
                <GithubIcon className="size-4" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live demo`}
                className="glass flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:text-accent"
              >
                <ExternalLink className="size-4" />
              </a>
            )}
          </div>
          <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-accent-border/50 bg-accent-soft/80 px-3 py-1 font-mono text-[11px] font-semibold text-accent backdrop-blur">
            <Star className="size-3 fill-current" aria-hidden />
            Featured
          </span>
        </div>

        {/* Body */}
        <div className="flex flex-col justify-center p-8 lg:p-10">
          <span className="mb-3 font-mono text-xs text-muted-foreground">{project.year}</span>
          <h3 className="font-display text-2xl font-extrabold text-foreground lg:text-3xl">
            {project.title}
          </h3>
          <p className="mt-3 leading-relaxed text-muted-foreground">{project.tagline}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-border bg-muted/60 px-3 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:border-accent-border/60 hover:text-accent"
              >
                {t}
              </li>
            ))}
          </ul>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30"
          >
            Read case study <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

/** Grid card for the rest */
function ProjectCard({
  project,
  delay,
}: {
  project: (typeof projects)[0];
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-border/70 hover:shadow-2xl hover:shadow-accent/10">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          <div className="absolute right-3 top-3 flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100 focus-within:opacity-100">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="glass flex size-8 items-center justify-center rounded-lg text-foreground transition-colors hover:text-accent"
              >
                <GithubIcon className="size-3.5" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live`}
                className="glass flex size-8 items-center justify-center rounded-lg text-foreground transition-colors hover:text-accent"
              >
                <ExternalLink className="size-3.5" />
              </a>
            )}
          </div>

          <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-background/70 px-2.5 py-0.5 font-mono text-[10px] text-muted-foreground backdrop-blur">
            {project.year}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-lg font-bold text-foreground">{project.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
            {project.tech.slice(0, 5).map((t) => (
              <li
                key={t}
                className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
              >
                {t}
              </li>
            ))}
            {project.tech.length > 5 && (
              <li className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                +{project.tech.length - 5}
              </li>
            )}
          </ul>

          <Link
            href={`/projects/${project.slug}`}
            className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all hover:gap-3"
          >
            Case study <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="scroll-mt-24 py-20 md:py-28" aria-label="Projects">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="04"
          title="Featured projects"
          description="Each project has a full case study — the problem, the constraints, the decisions and what I'd do differently. No tutorial clones."
        />

        <div className="space-y-6">
          {/* Featured full-width */}
          {featured && <FeaturedProjectCard project={featured} />}

          {/* Rest in grid */}
          {rest.length > 0 && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((project, i) => (
                <ProjectCard key={project.slug} project={project} delay={(i % 3) * 0.07} />
              ))}
            </div>
          )}
        </div>

        <Reveal delay={0.1} className="mt-10 text-center">
          <p className="text-sm text-muted-foreground">
            More experiments and half-finished ideas live on{" "}
            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent hover:underline"
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
