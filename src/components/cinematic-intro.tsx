import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { projects, site } from "@/content/portfolio";
import { NetworkSculpture } from "./network-sculpture";

export function CinematicIntro() {
  const [first, ...family] = site.name.split(" ");
  return <section id="home" className="opening-runway" aria-labelledby="intro-title">
    <div className="opening-screen">
      <div className="entrance-backdrop" aria-hidden="true"/>
      <div className="optical-frame" aria-hidden="true"><Image src="/cinema/aperture.webp" width={900} height={900} sizes="(max-width: 650px) 95vw, 60vw" priority alt="" /></div>
      <div className="entrance-content">
        <div className="opening-meta"><span>ML &amp; GenAI Engineering</span><span>{site.location}</span></div>
        <div className="identity">
          <h1 id="intro-title"><span>{first}</span>{" "}<em>{family.join(" ")}</em></h1>
          <p className="availability"><i aria-hidden="true"/>{site.availability}</p>
          <div className="entry-actions"><a href="#projects">View my work <ArrowUpRight size={17}/></a><a href={site.resumeUrl} download>Download résumé <Download size={15}/></a></div>
        </div>
        <div className="entrance-foot"><a className="scroll-cue" href="#about"><ArrowDown size={15}/>Scroll to explore</a>
          <nav aria-label="Project shortcuts">{projects.map(project => <a key={project.slug} href={`#work-${project.slug}`}>{project.title}</a>)}</nav>
          <div><a href={site.social.github}>GitHub <ArrowUpRight size={13}/></a><a href={site.social.linkedin}>LinkedIn <ArrowUpRight size={13}/></a></div></div>
      </div>
      <div className="interior-scene">
        <div className="interior-copy"><p className="eyebrow">Machine learning &amp; GenAI</p>
          <h2>Building Intelligence.<br/><em>Engineering What&apos;s Next.</em></h2>
          <p>I’m a final-year Computer Science student at Vellore Institute of Technology. I build and evaluate models, then put them to work in deployed applications.</p>
        </div>
        <figure className="interior-mesh"><NetworkSculpture/><figcaption>Feature surface · highlighted cross section</figcaption></figure>
      </div>
    </div>
  </section>;
}

