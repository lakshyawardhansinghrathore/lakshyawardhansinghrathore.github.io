import { site } from "@/content/portfolio";
import { mesh, projectPoint } from "@/lib/feature-surface";

export function AboutSection() {
  return <section className="portfolio-section editorial" id="about" aria-labelledby="about-title">
    <div className="about-anchor"><p className="eyebrow">About</p>
      <h2 id="about-title">From model<br/>to <em>application.</em></h2>
      <svg className="about-relief" viewBox="-188 -178 376 300" aria-hidden="true">
        {mesh.filter((_,i)=>i%2===0).map((row,i)=><polyline key={i} points={row.map(p=>projectPoint(p,.66,355).map(v=>v.toFixed(1)).join(",")).join(" ")}/>)}
      </svg>
    </div>
    <div className="about-reading">
      <p className="lead">{["I like problems where","a model has to earn","its place in a working","application."].map(line=><span className="reading-line" key={line}><span>{line}</span><i aria-hidden="true">{line}</i></span>)}</p>
      <p>{site.tagline} At {site.education.school}, I study Computer Science and Engineering. My projects explore what it takes to search a financial report, match the meaning of two documents, or recognize a voice in a classroom.</p>
      <p>I’m looking for AI/ML engineering roles where I can work on evaluation, deployment, and the decisions that connect them.</p>
    </div>
  </section>;
}
