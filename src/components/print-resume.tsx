"use client";

export function PrintResume() {
  return <button className="portfolio-button secondary print-button" type="button" onClick={() => window.print()}>Print résumé</button>;
}
