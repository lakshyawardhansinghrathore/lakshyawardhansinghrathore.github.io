/**
 * ─────────────────────────────────────────────────────────────────────────────
 * SITE CONFIG — single source of truth for your identity, links and metadata.
 * TODO: replace every placeholder value below with your real data.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "Lakshyawardhan Singh Rathore", 
  initials: "LSR",
  role: "Final-year CSE undergraduate · AI Engineer · Full-Stack Developer",
  tagline:
    "I design and build fast, thoughtful software for the web — from real-time campus platforms to developer tooling.",
  location: "Bhopal, India",
  email: "lakshyasr7711@gmail.com",
  resumeUrl: "https://github.com/lakshyawardhansinghrathore/Resume",
  siteUrl: "https://github.com/lakshyawardhansinghrathore",
  availability: "Open to SDE internships & new-grad roles (2027)",
  description:
    "Portfolio of Lakshyawardhan Singh Rathore — final-year Computer Science student at VIT Bhopal. Full-stack projects, case studies, blog posts and contact.",

  // Used by the live GitHub stats section (src/components/sections/github-stats.tsx).
  githubUsername: "lakshyawardhansinghrathore",
  codeforcesHandle: "Its_Me.",

  social: {
    github: "https://github.com/lakshyawardhansinghrathore",
    linkedin: "https://www.linkedin.com/in/lakshyawardhan-singh-rathore-1082513b0/",
    codeforces: "https://codeforces.com/profile/Its_Me.",
  },

  education: {
    school: "VIT Bhopal University",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2023 — 2027",
    detail: "CGPA 9.02 / 10",
  },
} as const;

/** Ordered section registry — powers the nav, command palette and terminal. */
export const sections = [
  { id: "about", label: "About", index: "01" },
  { id: "terminal", label: "Terminal", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "projects", label: "Projects", index: "04" },
  { id: "stats", label: "GitHub & CP", index: "05" },
  { id: "experience", label: "Experience", index: "06" },
  { id: "certifications", label: "Certifications", index: "07" },
  { id: "blog", label: "Blog", index: "08" },
  { id: "testimonials", label: "Testimonials", index: "09" },
  { id: "contact", label: "Contact", index: "10" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
