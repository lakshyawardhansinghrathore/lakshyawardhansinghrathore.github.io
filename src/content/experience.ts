/**
 * EXPERIENCE TIMELINE — education, internships and milestones from year 1 to now.
 * TODO: replace with your real timeline.
 */

export interface TimelineItem {
  date: string;
  title: string;
  org: string;
  type: "education" | "internship" | "milestone";
  points: string[];
  tags?: string[];
}

export const timeline: TimelineItem[] = [
  {
    date: "2023 — 2027",
    title: "B.Tech, Computer Science & Engineering",
    org: "VIT Bhopal University",
    type: "education",
    points: [
      "CGPA 9.02/10.",
      "Core member of the android club and CISCO Community VIT Bhopal",
    ],
    tags: ["Data Structures", "OS", "DBMS", "Computer Networks", "Cloud"],
  },
  {
    date: "Nov 2023",
    title: "First open-source contribution merged",
    org: "privacyguides.org",
    type: "milestone",
    points: [
      "Fixed an accessibility issue in the documentation site — small PR, big deal to me.",
      "Started contributing regularly afterwards; 30+ merged PRs since.", // TODO: replace
    ],
    tags: ["Open Source", "Accessibility"],
  },
  {
    date: "Jan 2025 — Present",
    title: "Placement season & final year",
    org: "VIT Bhopal",
    type: "milestone",
    points: [
      "SDE intern → new grad pipeline: 500+ LeetCode problems, Codeforces Specialist.", // TODO: replace
      "Maintaining CampusFlow (4k+ students) and building PrepWise for placement prep.",
      "This portfolio is my living CV — poke around the terminal above.",
    ],
    tags: ["DSA", "System Design", "Full-stack"],
  },
  {
    date: "July 2025 — September 2025",
    title: "Virtual Internship Google Cloud GenAi",
    org: "nasscom, smartbridge",
    type: "internship",
    points: [
      "Completed a virtual internship focused on the fundamentals and practical applications of Generative AI and Large Language Models (LLMs).",
      "Gained hands-on understanding of prompt engineering, including prompt design, refinement, and effective interaction with AI models.",
      "Explored Generative AI applications such as text generation, summarization, question answering, and content creation.",
      "Learned key concepts related to LLMs, Natural Language Processing (NLP), AI ethics, and responsible AI.",
    ],
    tags: ["Python", "SQL", "JSON"],
  },
  {
    date: "May 2026 — June 2026",
    title: "Software Developer Intern",
    org: "Aeroflex Neu Limited",
    type: "internship",
    points: [
      "Automated the extraction, cleaning, and preprocessing of daily sales datasets using Python (Pandas), eliminating manual data entry and ensuring data integrity within the SQL database.",
      "Analyzed historical sales trends to identify performance gaps and competitive pressure points, delivering actionable data summaries to stakeholders to drive business strategies",
    ],
    tags: ["Python", "Pandas", "SQL"],
  },
];
