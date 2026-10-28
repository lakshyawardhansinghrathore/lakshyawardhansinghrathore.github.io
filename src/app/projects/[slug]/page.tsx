import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Lightbulb,
  RefreshCcw,
  Scale,
  Target,
  Layers,
} from "lucide-react";
import { GithubIcon } from "@/components/brand-icons";
import { ArchitectureDiagram } from "@/components/architecture-diagram";
import { ScrollProgress } from "@/components/scroll-progress";
import { buttonVariants } from "@/components/ui/button";
import { getProject, projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — case study`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — case study`,
      description: project.tagline,
      images: [{ url: project.image }],
    },
  };
}

function Section({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scroll-mt-24">
      <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold text-foreground sm:text-2xl">
        <span className="flex size-9 items-center justify-center rounded-lg border border-accent-border/50 bg-accent-soft text-accent">
          <Icon className="size-4" aria-hidden />
        </span>
        {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const prev = projects[(idx - 1 + projects.length) % projects.length];
  const next = projects[(idx + 1) % projects.length];
  const cs = project.caseStudy;

  return (
    <>
      <ScrollProgress />

      <article className="mx-auto max-w-4xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden /> All projects
        </Link>

        {/* Header */}
        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs text-accent">
            <span>{project.year}</span>
            <span aria-hidden className="text-border">·</span>
            <span>{project.role}</span>
          </div>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {project.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants())}>
                Live demo <ExternalLink className="size-4" aria-hidden />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: "outline" }))}>
                <GithubIcon className="size-4" /> Source
              </a>
            ) : null}
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Tech stack">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-md border border-border bg-muted/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {t}
              </li>
            ))}
          </ul>
        </header>

        {/* Hero image */}
        <div className="relative mt-10 overflow-hidden rounded-xl border border-border">
          <Image
            src={project.image}
            alt={`${project.title} interface preview`}
            width={1600}
            height={900}
            priority
            className="h-auto w-full object-cover"
          />
        </div>

        {/* Body */}
        <div className="mt-14 space-y-16">
          <Section icon={Target} title="The problem">
            <p className="leading-relaxed text-muted-foreground">{cs.problem}</p>
          </Section>

          <Section icon={AlertTriangle} title="Constraints">
            <ul className="grid gap-3 sm:grid-cols-2">
              {cs.constraints.map((c) => (
                <li
                  key={c}
                  className="flex gap-3 rounded-lg border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
                >
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                  {c}
                </li>
              ))}
            </ul>
          </Section>

          <Section icon={Layers} title="Architecture & key decisions">
            <p className="mb-6 leading-relaxed text-muted-foreground">{cs.architectureNote}</p>
            <ArchitectureDiagram layers={cs.diagram} />

            <div className="mt-8 space-y-4">
              {cs.decisions.map((d, i) => (
                <div key={d.title} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="flex items-center gap-2.5 font-display font-semibold text-foreground">
                    <span className="flex size-7 items-center justify-center rounded-md bg-accent-soft font-mono text-xs text-accent">
                      D{i + 1}
                    </span>
                    {d.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{d.detail}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={Scale} title="Trade-offs & what I'd do differently">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 font-display font-semibold text-foreground">
                  <Scale className="size-4 text-accent" aria-hidden /> Trade-offs accepted
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{cs.tradeOffs}</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 font-display font-semibold text-foreground">
                  <RefreshCcw className="size-4 text-accent" aria-hidden /> Doing it again
                </h3>
                <ul className="mt-2.5 space-y-2">
                  {cs.differently.map((d) => (
                    <li key={d} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                      <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent/70" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Section>

          <Section icon={(props) => <CheckCircle2 {...props} />} title="Impact & metrics">
            <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {cs.metrics.map((m) => (
                <div key={m.label} className="rounded-xl border border-border bg-card p-5">
                  <dd className="font-display text-2xl font-bold text-accent sm:text-3xl">{m.value}</dd>
                  <dt className="mt-1 text-sm font-medium text-foreground">{m.label}</dt>
                  {m.detail ? (
                    <p className="mt-0.5 text-xs text-muted-foreground">{m.detail}</p>
                  ) : null}
                </div>
              ))}
            </dl>
          </Section>

          <Section icon={Layers} title="Tech stack breakdown">
            <div className="space-y-4">
              {cs.stack.map((group) => (
                <div key={group.category} className="flex flex-col gap-2 rounded-xl border border-border bg-card p-5 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className="w-32 shrink-0 font-mono text-xs font-medium uppercase tracking-wider text-accent">
                    {group.category}
                  </span>
                  <ul className="flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-border bg-muted/60 px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* Prev / next */}
        <nav className="mt-20 grid gap-4 border-t border-border pt-10 sm:grid-cols-2" aria-label="More projects">
          <Link
            href={`/projects/${prev.slug}`}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent-border/60"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" aria-hidden /> Previous project
            </span>
            <span className="mt-1.5 block font-display font-semibold text-foreground transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group rounded-xl border border-border bg-card p-5 text-right transition-all hover:border-accent-border/60"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Next project <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-1.5 block font-display font-semibold text-foreground transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </nav>
      </article>
    </>
  );
}
