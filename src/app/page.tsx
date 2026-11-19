import { AboutSection } from "@/components/about-section";
import { PublicActivity } from "@/components/public-activity";
import { Download, GitFork, Mail } from "lucide-react";
import { LinkedinIcon } from "@/components/brand-icons";
import { CinematicIntro } from "@/components/cinematic-intro";
import { PortfolioMotion } from "@/components/portfolio-motion";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Certifications } from "@/components/sections/certifications";
import { site, projects, codingProfiles } from "@/content/portfolio";

export default function Home() {
  return <PortfolioMotion><CinematicIntro/><div className="portfolio-container chapters">
    <AboutSection/>
    <Projects/><Skills visual/><Experience/><Certifications/>
    <section className="portfolio-section" id="development"><p className="eyebrow">Developer activity</p><h2>On GitHub</h2>
      <div className="repo-list">{projects.map(p => <a href={p.githubUrl} key={p.slug}><GitFork size={20}/><strong>{p.title}</strong><span>{p.tech.slice(0, 3).join(" · ")}</span></a>)}</div>
      <a className="text-link" href={site.social.github}>Explore my repositories</a>
      <PublicActivity username={site.githubUsername}/>
    </section>
    <section className="portfolio-section contact-panel" id="contact"><div className="closing-optic" aria-hidden="true"/><p className="eyebrow">Contact</p><h2><span className="closing-line"><span>Have an interesting</span></span><span className="closing-line"><span>problem?</span></span><em>Let&apos;s build something intelligent.</em></h2>
      <div className="action-row"><a className="portfolio-button primary" href={`mailto:${site.email}`}><Mail size={16}/>{site.email}</a><a className="portfolio-button secondary" download href={site.resumeUrl}><Download size={16}/>Download Resume</a></div>
      <div className="social-row">{codingProfiles.map(profile => <a href={profile.url} key={profile.label}>{profile.label}</a>)}<a href={site.social.linkedin}><LinkedinIcon/>LinkedIn</a></div>
    </section>
  </div></PortfolioMotion>;
}

