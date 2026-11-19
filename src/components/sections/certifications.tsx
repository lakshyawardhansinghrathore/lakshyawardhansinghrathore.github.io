import { BadgeCheck } from "lucide-react";
import { certifications, additionalAchievements } from "@/content/portfolio";

export function Certifications() {
  return (
    <section className="portfolio-section" id="certifications" aria-labelledby="certifications-title">
      <h2 id="certifications-title">Certifications</h2>
      <div className="credentials">
        {certifications.map((credential) => (
          <article key={credential.name} className="credential">
            <BadgeCheck size={24} aria-hidden="true" />
            <div>
              <p className="eyebrow">{credential.issuer}{"exam" in credential && ` · ${credential.exam}`}</p>
              <h3>{credential.name}</h3>
            </div>
          </article>
        ))}
      </div>
      {additionalAchievements.filter(group => group.entries.length).map(group => <section key={group.category}><h3>{group.category}</h3><ul>{group.entries.map(entry => <li key={entry}>{entry}</li>)}</ul></section>)}
    </section>
  );
}
