import type { Metadata } from "next";
import { site, codingProfiles } from "@/content/portfolio";
import { projects } from "@/content/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { PrintResume } from "@/components/print-resume";

export const metadata: Metadata = { title: "Résumé" };

export default function ResumePage() {
  return (
    <article className="portfolio-container case-study resume">
      <div className="resume-header">
        <div>
          <h1>{site.name}</h1>
          <p className="hero-role">{site.role}</p>
        </div>
        <PrintResume />
      </div>
      <p className="intro">{site.tagline}</p>
      <a className="text-link" href={`mailto:${site.email}`}>{site.email}</a>
      <nav className="social-row" aria-label="Coding profiles">{codingProfiles.map(profile => <a href={profile.url} key={profile.label}>{profile.label}</a>)}</nav>
      <section className="portfolio-section">
        <h2>Projects</h2>
        <div className="resume-projects">
          {projects.map((project) => (
            <section key={project.slug}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <ul>{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
            </section>
          ))}
        </div>
      </section>
      <Experience />
      <Certifications />
      <Skills />
    </article>
  );
}
