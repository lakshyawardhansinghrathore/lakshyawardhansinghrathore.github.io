export const site = {
  name: "Lakshyawardhan Singh Rathore", 
  initials: "LSR",
  role: "Final-year Computer Science student · ML & GenAI",
  tagline:
    "I build ML and GenAI systems end to end, from training and evaluating models to shipping applications with FastAPI and Docker.",
  location: "Bhopal, India",
  email: "lakshyasr7711@gmail.com",
  resumeUrl: "/resume.pdf",
  siteUrl: "https://lakshyawardhan.me",
  availability: "Open to AI/ML opportunities",
  description:
    "Portfolio of Lakshyawardhan Singh Rathore, a final-year Computer Science student building machine learning and generative AI systems.",

  // Used by the live GitHub stats section (src/components/sections/github-stats.tsx).
  githubUsername: "lakshyawardhansinghrathore",
  leetcodeUsername: "Lakshyawardhan77",
  codeforcesHandle: "Its_Me.",

  social: {
    github: "https://github.com/lakshyawardhansinghrathore",
    linkedin: "https://www.linkedin.com/in/lakshyawardhan-singh-rathore-1082513b0/",
    leetcode: "https://leetcode.com/u/Lakshyawardhan77/",
    codeforces: "https://codeforces.com/profile/Its_Me.",
  },

  education: {
    school: "Vellore Institute of Technology",
    degree: "B.Tech. in Computer Science and Engineering (Core)",
    period: "2023 — 2027",
    detail: "CGPA 9.04 / 10",
  },
} as const;

export const codingProfiles = [
  { label: "GitHub", url: site.social.github },
  { label: "LeetCode", url: site.social.leetcode },
  { label: "Codeforces", url: site.social.codeforces },
] as const;

/** Ordered section registry — powers the nav, command palette and terminal. */
export const sections = [
  { id: "home", label: "Home", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "skills", label: "Skills", index: "04" },
  { id: "experience", label: "Experience", index: "05" },
  { id: "contact", label: "Contact", index: "06" },
] as const;
export type SectionId = (typeof sections)[number]["id"];

export interface Project {
  slug: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  outcome: string;
  outcomeLabel: string;
  tech: string[];
  decisions: { title: string; detail: string }[];
  comparison?: { label: string; value: number }[];
  liveUrl: string;
  githubUrl: string;
  pipeline: { title: string; input: string; operation: string; output: string; detail: string }[];
  evidence: { heading: string; context: string; rows: { label: string; value: string }[] };
  highlights: string[];
}

export const projects: Project[] = [
  {
    slug: "resupulse",
    title: "ResuPulse",
    category: "Semantic matching",
    tagline: "ATS resume analysis with evidence-based skill matching.",
    description: "ResuPulse evaluates a resume against a target job description, identifies gaps, and turns a five-component ATS score into actionable feedback.",
    decisions: [
      { title: "Evaluate on unseen pairs", detail: "The 266 labeled pairs were split by match label into 186 training, 40 validation, and 40 test examples. On the held-out test split, mean absolute error fell from 0.1562 to 0.0468 after fine-tuning MPNet." },
      { title: "Check the evidence behind a skill", detail: "A skill claim is checked against project and experience text. A literal match handles explicit mentions, while sentence embeddings help find evidence expressed in different words." },
    ],
    evidence: {
      heading: "What the held-out test measured",
      context: "The experiment compared base and fine-tuned MPNet on the same 40 unseen resume–job pairs. MAE measures the average size of a scoring error. RMSE gives larger errors more weight. These results describe the matching experiment.",
      rows: [{ label: "Training / validation / test", value: "186 / 40 / 40 pairs" }, { label: "Mean absolute error", value: "0.1562 → 0.0468" }, { label: "Root mean squared error", value: "0.1791 → 0.0665" }],
    },
    comparison: [{ label: "Baseline", value: 0.156 }, { label: "Fine-tuned", value: 0.047 }],
    outcome: "70%",
    outcomeLabel: "lower MAE on held-out resume–job description pairs",
    tech: ["FastAPI", "Streamlit", "Groq", "Sentence Transformers", "Supabase"],
    liveUrl: "https://resupulse-g6n5fobiubjyyzridsa8pj.streamlit.app/",
    githubUrl: "https://github.com/lakshyawardhansinghrathore/ResuPulse",
    pipeline: [
      { title: "Parse", input: "Resume document", operation: "Extract fields with Groq", output: "Structured candidate profile", detail: "Extract structured resume content with Groq and a four-model fallback chain." },
      { title: "Match", input: "Profile and job description", operation: "Combine fuzzy and semantic scores", output: "Job alignment and skill evidence", detail: "Combine RapidFuzz matching with sentence embeddings to assess job alignment and check whether listed skills appear in the candidate’s work." },
      { title: "Report", input: "Scores and evidence gaps", operation: "Prioritize diagnostics", output: "Feedback and PDF report", detail: "Generate severity-ranked feedback and downloadable PDF reports through a Dockerized FastAPI backend with Supabase JWT authentication and row-level security." },
    ],
    highlights: [
      "Fine-tuned all-mpnet-base-v2 with PyTorch and CosineSimilarityLoss on 266 labeled resume–job description pairs.",
      "Held-out mean absolute error fell from 0.156 to 0.047. Root mean square error fell by 63%.",
    ],
  },
  {
    slug: "finsight",
    title: "FinSight",
    category: "Retrieval-augmented generation",
    tagline: "Annual report analysis with financial KPIs and document Q&A.",
    description: "FinSight turns annual report PDFs into searchable financial data. Investors can review extracted KPIs, compare companies, and ask questions about their reports.",
    decisions: [
      { title: "Keep table context intact", detail: "PyMuPDF4LLM converts tables into Markdown so values retain their row and column labels. Semantic chunking then separates changes of topic before indexing." },
      { title: "Scope retrieval before generation", detail: "ChromaDB stores the company, report year, and source file with each chunk. Retrieval can filter by company and year before passing passages to Gemini. KPI extraction uses a Pydantic schema, with the results stored in PostgreSQL for comparison." },
    ],
    evidence: {
      heading: "Following a question back to a report",
      context: "A question about one company and year can otherwise retrieve passages from a different filing. The chat endpoint accepts both filters before assembling its context for Gemini. Structured financial metrics take a separate path to the dashboard.",
      rows: [{ label: "Retrieval scope", value: "Company and fiscal year" }, { label: "Text representation", value: "384-dimensional MiniLM vectors" }, { label: "Dashboard storage", value: "PostgreSQL financial_metrics" }],
    },
    outcome: "PDF → RAG",
    outcomeLabel: "from annual reports to searchable financial insights",
    tech: ["FastAPI", "LangChain", "Gemini", "ChromaDB", "PostgreSQL", "Docker"],
    liveUrl: "https://finsight-64nj.onrender.com",
    githubUrl: "https://github.com/lakshyawardhansinghrathore/FinSight",
    pipeline: [
      { title: "Ingest", input: "Annual report PDF", operation: "Parse tables and split by topic", output: "Tagged Markdown passages", detail: "Convert reports to Markdown with PyMuPDF4LLM and apply semantic chunking with LangChain." },
      { title: "Retrieve", input: "Question, company, fiscal year", operation: "Search filtered ChromaDB vectors", output: "Relevant report passages", detail: "Embed chunks with all-MiniLM-L6-v2 and index them in ChromaDB for similarity search." },
      { title: "Analyze", input: "Retrieved filing context", operation: "Generate a grounded answer or extract KPIs", output: "Report Q&A and dashboard metrics", detail: "Use Gemini for structured KPI extraction and document Q&A, then store extracted metrics in Supabase PostgreSQL for dashboard comparisons." },
    ],
    highlights: [
      "Built an asynchronous FastAPI backend for document ingestion, chat, and KPI retrieval.",
      "Containerized the app with Docker and deployed it on Render.",
    ],
  },
  {
    slug: "attendo",
    title: "Attendo",
    category: "Computer vision & audio",
    tagline: "Classroom attendance from group photos and multi-speaker audio.",
    description: "Attendo helps teachers record attendance using group photos or classroom audio. Teachers review recognition results before confirming who was present.",
    decisions: [
      { title: "Verify the proposed identity", detail: "A linear SVM proposes a student from a 128-dimensional face embedding. The system checks the Euclidean distance to the enrolled reference and rejects candidates beyond 0.6." },
      { title: "Separate speech from room noise", detail: "The audio path converts input to 16 kHz mono and discards speech segments shorter than half a second. It compares 256-dimensional speaker embeddings with enrolled voices using a cosine similarity threshold of 0.65." },
    ],
    evidence: {
      heading: "When does a match count?",
      context: "Face and voice inputs use different decision rules. The face classifier proposes a candidate, while the audio path compares speech segments with enrolled voices. Both paths produce candidates for a teacher to review before attendance is saved.",
      rows: [{ label: "Face verification", value: "Euclidean distance ≤ 0.60" }, { label: "Voice verification", value: "Cosine similarity ≥ 0.65" }, { label: "Audio preprocessing", value: "16 kHz mono, segments ≥ 0.5 s" }],
    },
    outcome: "<5 sec",
    outcomeLabel: "per class, down from 10–15 minutes",
    tech: ["Python", "Streamlit", "dlib", "scikit-learn", "Resemblyzer", "Supabase"],
    liveUrl: "https://tinyurl.com/Attendo-App",
    githubUrl: "https://github.com/lakshyawardhansinghrathore/Attendo",
    pipeline: [
      { title: "Recognize faces", input: "Group photo", operation: "Classify and verify face embeddings", output: "Candidate student identities", detail: "Detect faces with dlib HOG, classify 128-dimensional ResNet embeddings with a linear SVM, and apply a distance threshold to reject unenrolled faces." },
      { title: "Identify speakers", input: "Classroom audio", operation: "Segment speech and compare voice embeddings", output: "Candidate speaker identities", detail: "Segment classroom audio with voice activity detection and match Resemblyzer embeddings by cosine similarity." },
      { title: "Review and save", input: "Recognition candidates", operation: "Teacher confirms the attendance list", output: "Saved class attendance", detail: "Let teachers confirm attendance before writing to Supabase. Students can join through QR enrollment and sign in using face recognition." },
    ],
    highlights: [
      "Combined group-photo recognition and multi-speaker identification in a single Streamlit app.",
      "Built separate teacher and student flows for attendance review, enrollment, and reporting.",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { category: "Languages", skills: ["Python", "Java", "SQL"] },
  { category: "ML & Data Science", skills: ["PyTorch", "scikit-learn", "XGBoost", "SVM", "Pandas", "NumPy", "Matplotlib", "Feature engineering", "Forecasting"] },
  { category: "GenAI & NLP", skills: ["RAG", "LangChain", "Embeddings", "Semantic and hybrid search", "Prompt engineering", "LLM APIs", "Azure AI Search"] },
  { category: "Computer Vision & Audio", skills: ["OpenCV", "dlib", "Face recognition", "Speaker identification"] },
  { category: "Backend & Tools", skills: ["FastAPI", "Streamlit", "REST APIs", "Docker", "Git", "GitHub"] },
  { category: "Databases & Cloud", skills: ["PostgreSQL", "MySQL", "Supabase", "AWS", "Azure"] },
];

export const certifications = [
  { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", exam: "SAA-C03" },
  { name: "Oracle Agentic AI Certified Foundations Associate", issuer: "Oracle" },
];

export interface TimelineItem {
  date: string;
  title: string;
  org: string;
  type: "education" | "internship" | "milestone";
  points: string[];
  methods?: string;
  tags?: string[];
}

export const timeline: TimelineItem[] = [
  {
    date: "May – June 2026",
    title: "Machine Learning Intern",
    org: "Aeroflex Neu Limited",
    type: "internship",
    points: [
      "Built a demand forecasting pipeline for PP Woven, BOPP, FIBC, and PP Woven Fabric. Cleaned sales data and engineered time-series features with Pandas and NumPy.",
      "Benchmarked Linear Regression, Random Forest, and XGBoost with TimeSeriesSplit. Reduced RMSE by 13% over the baseline and served predictions through Streamlit.",
    ],
    methods: "For each product and destination, I used demand from one and three months earlier alongside a three-month rolling average. I reserved the final 20% of months for testing and used three chronological cross-validation splits for model selection. The public demo uses synthetic data with the ERP schema. Its comparison reports RMSE of 15.18 for Linear Regression, 14.54 for Random Forest, and 12.86 for tuned XGBoost. Those figures describe the public benchmark.",
    tags: ["Python", "XGBoost", "TimeSeriesSplit", "Streamlit"],
  },
  {
    date: site.education.period,
    title: site.education.degree,
    org: site.education.school,
    type: "education",
    points: [site.education.detail],
  },
];


export const activities = [
  { role: "Data Science Club · Technical Team", detail: "Helped plan and deliver technical events and workshops." },
  { role: "Fusion Club · Content Lead & Anchor", detail: "Led content creation and hosted club events." },
];

// Add confirmed entries here when available. Empty categories stay hidden.
export const additionalAchievements: { category: string; entries: string[] }[] = [
  { category: "Research", entries: [] },
  { category: "Publications", entries: [] },
  { category: "Hackathons", entries: [] },
];
