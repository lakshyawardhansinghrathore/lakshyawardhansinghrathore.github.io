import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { PortfolioNav } from "@/components/portfolio-nav";
import { site } from "@/content/site";
import "./globals.css";
import "./portfolio.css";
import "./cinema.css";
import "./chapters.css";

const title = `${site.name} | ML & GenAI Portfolio`;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  openGraph: { type: "website", url: site.siteUrl, title, description: site.description },
};

export const viewport: Viewport = { themeColor: "#151513" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="portfolio">
        <a className="skip-link" href="#main">Skip to content</a>
        <PortfolioNav />
        <main id="main" tabIndex={-1}>{children}</main>
        <footer className="portfolio-footer">
          <div className="portfolio-container">
            <span>{site.name}</span>
            <a href="/resume/">Résumé</a>
          </div>
        </footer>
      </body>
    </html>
  );
}

