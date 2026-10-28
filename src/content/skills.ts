/**
 * SKILLS — grouped by category for the Skills section.
 * TODO: replace with your real skill inventory.
 */

export interface SkillGroup {
  category: string;
  blurb: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    blurb: "Core languages I work with",
    skills: ["Java", "Python", "SQL", "JavaScript", "C++", "Bash"],
  },
  {
    category: "AI / Machine Learning",
    blurb: "Where I build and experiment",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Generative AI",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Pandas",
      "NumPy",
      "Matplotlib",
    ],
  },
  {
    category: "Full Stack Development",
    blurb: "Turning ideas into usable products",
    skills: [
      "Spring Boot",
      "React",
      "Next.js",
      "Node.js",
      "Express.js",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "REST APIs",
    ],
  },
  {
    category: "Databases",
    blurb: "Where the data lives",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "SQLite", "Redis"],
  },
  {
    category: "Tools & DevOps",
    blurb: "How I build, test, and ship",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Linux",
      "Postman",
      "GitHub Actions",
      "AWS",
      "Vercel",
      "Nginx",
    ],
  },
];

export const currentlyLearning = ["Rust", "Kubernetes", "System design at scale", "WebGL / Three.js"];
