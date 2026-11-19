import { timeline, activities } from "@/content/portfolio";

export function Experience() {
  return (
    <section className="portfolio-section" id="experience" aria-labelledby="experience-title">
      <h2 id="experience-title">Experience & education</h2>
      <div className="career-track"><div className="career-rail" aria-hidden="true"><i/></div>
      {timeline.map((item) => (
        <article key={item.title} className="timeline-item">
          <div>
            <p className="eyebrow">{item.date}</p>
            <h3>{item.org}</h3>
          </div>
          <div>
            <h3>{item.title}</h3>
            {item.points.map((point) => <p key={point}>{point}</p>)}
            {item.methods && <details className="preview-details"><summary>Forecasting methodology</summary><p>{item.methods}</p></details>}
          </div>
        </article>
      ))}
      <article className="timeline-item">
        <h3>Campus involvement</h3>
        <div>
          {activities.map(a => <p key={a.role}><strong>{a.role}</strong><br/>{a.detail}</p>)}
        </div>
      </article>
      </div>
    </section>
  );
}
