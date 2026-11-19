import { Fragment } from "react";
import Image from "next/image";
import { projects } from "@/content/portfolio";
import { StageTrace } from "@/components/stage-trace";
import { ProjectPreview } from "@/components/project-preview";
import { ArchitectureStory } from "@/components/architecture-story";

export function Projects() {
  return (
    <section className="portfolio-section" id="projects" aria-labelledby="projects-title">
      <header className="work-heading">
        <h2 id="projects-title">Selected projects</h2>
        <nav aria-label="Jump to a project">{projects.map(p => <a key={p.slug} href={`#work-${p.slug}`}>{p.title}</a>)}</nav>
      </header>
      <div className="project-deck">
        {projects.map(project => <Fragment key={project.slug}><div className="shot-anchor" id={`work-${project.slug}`}/>
            <header className={`project-cover ${project.slug}`} data-cover={project.slug}>
              <div className="cover-art" aria-hidden="true">
                <Image src={`/cinema/${project.slug}.webp`} width={900} height={900} sizes="(max-width: 740px) 100vw, 65vw" alt="" loading="lazy"/>
              </div>
              <div className="cover-copy">
                <p className="eyebrow">{project.category}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-links">
                  <a href={`#details-${project.slug}`}>Architecture</a>
                  <a href={`/projects/${project.slug}/`} aria-label={`Read case study for ${project.title}`}>Read case study</a>
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Live demo for ${project.title} (opens in a new tab)`}>Demo</a>
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Source code for ${project.title} (opens in a new tab)`}>Code</a>
                </div>
              </div>
              <div className="shot-result"><strong>{project.outcome}</strong><span>{project.outcomeLabel}</span></div>
            </header>
        </Fragment>)}
      </div>
      <div className="work-stories">
        {projects.map(project => (
          <ArchitectureStory key={project.slug} slug={project.slug}>
            <header className="detail-heading"><p className="eyebrow">Architecture</p><h3>{project.title}</h3><a className="text-link" href={`#work-${project.slug}`}>Back to showcase ↑</a></header>
            <div className="story-instrument">
              <div className="instrument-surface">
                <p className="eyebrow">{project.category}</p>
                <div className="trace-stack">
                  {project.pipeline.map((stage, index) => (
                    <div key={stage.title} data-trace-panel={index} hidden={index !== 0}>
                      <p className="trace-title">{stage.title}</p><StageTrace stage={stage} />
                    </div>
                  ))}
                </div>
                <nav className="stage-nav" aria-label={`${project.title} architecture stages`}>
                  {project.pipeline.map((step, index) => <a key={step.title} href={`#${project.slug}-stage-${index+1}`} data-stage-link={index}><i aria-hidden="true"/>{step.title}</a>)}
                </nav>
              </div>
            </div>
            <div className="story-text">
              <ProjectPreview project={project} />
              <ol className="story-stages">
                {project.pipeline.map((step,index) => <li key={step.title} id={`${project.slug}-stage-${index+1}`} data-stage={index}>
                  <h4>{step.title}</h4><p>{step.detail}</p>
                </li>)}
              </ol>
              <details className="preview-details"><summary>Preview approach</summary><h4>{project.decisions[0].title}</h4><p>{project.decisions[0].detail}</p></details>
              <ul className="tag-list" aria-label="Technologies">{project.tech.map(tool=><li key={tool}>{tool}</li>)}</ul>
            </div>
          </ArchitectureStory>
        ))}
      </div>
    </section>
  );
}

