import type { Metadata } from "next";
import Link from "next/link";

import { StageTrace } from "@/components/stage-trace";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.description } : {};
}

export default async function ProjectPage({ params }: Props) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="case-study portfolio-container">
      <Link className="text-link" href="/#projects" prefetch={false}>All projects</Link>
      <header>
        <p className="eyebrow">{project.category}</p>
        <h1>{project.title}</h1>
        <p className="intro">{project.description}</p>
        <div className="action-row">
          <a className="portfolio-button primary" href={project.liveUrl}>Open demo</a>
          <a className="portfolio-button secondary" href={project.githubUrl}>View source</a>
        </div>
      </header>
      <div className={`project-figure case-result ${project.slug}`}>
        <strong>{project.outcome}</strong>
        <span>{project.outcomeLabel}</span>
      </div>
      <section className="portfolio-section">
        <h2>How it works</h2>
        <div className="pipeline">
          {project.pipeline.map((step, index) => (
            <details key={step.title} open={index === 0}>
              <summary>{step.title}</summary>
              <p>{step.detail}</p>
              <StageTrace stage={step} />
            </details>
          ))}
        </div>
      </section>
      <section className="portfolio-section">
        <h2>{project.evidence.heading}</h2>
        <p className="evidence-context">{project.evidence.context}</p>
        <dl className="evidence-list">{project.evidence.rows.map(row => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      </section>
      <section className="portfolio-section">
        <h2>Engineering decisions</h2>
        <div className="decision-grid">
          {project.decisions.map(decision => <article key={decision.title}><h3>{decision.title}</h3><p>{decision.detail}</p></article>)}
        </div>
      </section>
      <section className="portfolio-section">
        <h2>Implementation highlights</h2>
        <ul className="highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
        <ul className="tag-list" aria-label="Technologies">
          {project.tech.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
      </section>
    </article>
  );
}
