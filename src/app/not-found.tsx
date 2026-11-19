import Link from "next/link";

export default function NotFound() {
  return (
    <section className="portfolio-container case-study">
      <h1>Page not found</h1>
      <p className="intro">Explore the current projects and case studies from the portfolio home page.</p>
      <Link href="/#projects" className="portfolio-button primary">Browse projects</Link>
    </section>
  );
}
