import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CommandPaletteProvider } from "@/components/command-palette";
import { ScrollProgress } from "@/components/scroll-progress";
import { CustomCursor } from "@/components/custom-cursor";
import { site } from "@/content/site";

/* Two typefaces for identity + mono strictly for terminal/code surfaces */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", display: "swap" });

const title = `${site.name} — ${site.role}`;
const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(site.siteUrl),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    site.name,
    "portfolio",
    "full-stack developer",
    "computer science",
    "VIT Bhopal",
    "Next.js",
    "React",
    "TypeScript",
    "student developer",
  ],
  authors: [{ name: site.name, url: site.siteUrl }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.siteUrl,
    title,
    description,
    siteName: `${site.name} — Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint — applies the persisted theme (dark by default)
 * so there is no flash of the wrong theme.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("theme");if(t==="light"){document.documentElement.classList.remove("dark")}else{document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} bg-background font-sans text-foreground antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        {/* Keyboard accessibility: skip straight to content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-accent-foreground"
        >
          Skip to content
        </a>

        <ScrollProgress />
        <CustomCursor />

        <CommandPaletteProvider>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </CommandPaletteProvider>
      </body>
    </html>
  );
}
