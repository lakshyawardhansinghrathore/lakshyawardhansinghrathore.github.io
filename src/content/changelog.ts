/**
 * CHANGELOG — rendered at /changelog and linked from the footer.
 * TODO: keep this updated as you iterate on the site.
 */

export interface ChangelogEntry {
  version: string;
  date: string;
  tag: "launch" | "feature" | "design" | "fix";
  changes: string[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "v1.2.0",
    date: "2025-06-10",
    tag: "feature",
    changes: [
      "Added command palette (⌘K) for jumping to any section, project or post.",
      "Interactive terminal with command history, tab completion and easter eggs.",
      "Live GitHub contribution graph with graceful demo-data fallback.",
    ],
  },
  {
    version: "v1.1.0",
    date: "2025-05-24",
    tag: "feature",
    changes: [
      "Case-study pages for every project: problem, constraints, architecture diagrams and trade-offs.",
      "MDX-style markdown blog with three launch posts.",
      "Reading progress bar on long-form pages.",
    ],
  },
  {
    version: "v1.0.0",
    date: "2025-05-10",
    tag: "launch",
    changes: [
      "Initial launch: hero, about, skills, projects, experience timeline, certifications, testimonials and contact form.",
      "Dark/light theme with dark as default.",
      "Contact form persists messages to PostgreSQL via Drizzle ORM.",
    ],
  },
];
