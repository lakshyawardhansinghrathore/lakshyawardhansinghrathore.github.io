import type { Metadata } from "next";
import { site } from "@/content/portfolio";

export const metadata: Metadata = { title: "Résumé" };

export default function ResumePage() {
  return (
    <article className="portfolio-container case-study resume">
      <div className="resume-header">
        <h1>{site.name} — Résumé</h1>
        <a className="portfolio-button primary" href={site.resumeUrl} download>Download résumé</a>
      </div>
      <p><a className="text-link" href={site.resumeUrl}>Open full PDF</a></p>
      <object aria-label="Résumé PDF" data={site.resumeUrl} type="application/pdf"
        style={{ width: "100%", height: "80vh", marginTop: "1rem" }}>
        <a href={site.resumeUrl}>View résumé PDF</a>
      </object>
    </article>
  );
}
