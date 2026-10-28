/**
 * PROJECTS + CASE STUDIES
 * TODO: replace the placeholder projects below with your real work.
 * Each entry powers both the home-page grid and the /projects/[slug] case study
 * page, so editing this file updates both automatically.
 */

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string; // one-liner shown on cards
  description: string; // short paragraph for the case study hero
  image: string;
  tech: string[]; // stack tags shown on cards
  year: string;
  role: string;
  liveUrl?: string;
  githubUrl?: string;
  caseStudy: {
    problem: string;
    constraints: string[];
    architectureNote: string;
    /** Rendered as a layered diagram by <ArchitectureDiagram /> */
    diagram: { title: string; items: string[] }[];
    decisions: { title: string; detail: string }[];
    tradeOffs: string;
    differently: string[];
    metrics: ProjectMetric[];
    stack: { category: string; items: string[] }[];
  };
}

export const projects: Project[] = [
  {
    slug: "campusflow",
    title: "CampusFlow",
    tagline: "Real-time club & event management platform used by 40+ campus clubs.",
    description:
      "A centralized platform that replaces a messy sprawl of WhatsApp groups, Google Forms and spreadsheets with one real-time system for club discovery, event ticketing and attendance tracking at VIT Bhopal.",
    image: "/images/projects/campusflow.jpg",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "WebSockets", "Redis"],
    year: "2024",
    role: "Lead Full-Stack Developer",
    liveUrl: "https://campusflow.example.com", // TODO: replace
    githubUrl: "https://github.com/aarav-sharma-dev/campusflow", // TODO: replace
    caseStudy: {
      problem:
        "Every club on campus ran its own WhatsApp group and Google Form. Students missed events they cared about, clubs had no unified attendance data, and coordinators manually reconciled QR-code scans against spreadsheets at 1 AM after every event. There was no single source of truth for what was happening on campus — the student council asked for a better system, so I built one.",
      constraints: [
        "Zero budget — had to run on free-tier infrastructure (single small VPS + managed Postgres).",
        "Peak load is spiky: 2,000+ students scanning QR tickets in a 10-minute window during fest week.",
        "Must work on low-end Android devices over flaky campus WiFi.",
        "Clubs needed to self-serve — no central admin bottleneck for creating events.",
        "MVP deadline of 6 weeks, in time for the fall cultural fest.",
      ],
      architectureNote:
        "A pragmatic monolith with a clear module boundary, with Redis handling the hot paths (ticket validation and live seat counts) so Postgres never sees the scan storm. WebSockets fan out live updates; a fallback to polling keeps flaky WiFi clients in sync.",
      diagram: [
        {
          title: "Client",
          items: ["Next.js App Router UI", "PWA + offline ticket cache", "QR scanner (camera API)"],
        },
        {
          title: "Application",
          items: ["Next.js Route Handlers", "Auth (JWT, refresh rotation)", "Zod-validated services"],
        },
        {
          title: "Hot path",
          items: ["Redis — ticket dedup + live seat counts", "WebSocket gateway (live updates)"],
        },
        {
          title: "Data",
          items: ["PostgreSQL (Prisma)", "S3-compatible object storage (posters)"],
        },
      ],
      decisions: [
        {
          title: "Redis for ticket validation, not Postgres",
          detail:
            "QR scan validation needs to be idempotent and sub-50ms. A Redis SETNX with a 10-minute TTL deduplicates scans; Postgres is updated asynchronously in batches. This kept the scan storm off the primary database entirely.",
        },
        {
          title: "Optimistic seat counts",
          detail:
            "Seat availability is incremented in Redis and broadcast over WebSockets, with a periodic reconciliation job against Postgres. Users see live counts instantly; the source of truth settles in the background.",
        },
        {
          title: "Polling fallback for bad WiFi",
          detail:
            "A 15-second polling fallback kicks in when a WebSocket misses 3 heartbeats. It doubled mobile code but meant the app stayed usable in the one venue where WiFi reliably dropped.",
        },
        {
          title: "Monolith with module boundaries, not microservices",
          detail:
            "One deployable, one Postgres — but strict module boundaries (events, clubs, tickets, auth) enforced by lint rules. Microservices on a student VPS would have been resume-driven development, not engineering.",
        },
      ],
      tradeOffs:
        "The Redis-first design means a Redis outage degrades ticket validation (we fail open and reconcile later — annoying for double-scan detection, acceptable for a campus tool). The monolith will need to be split if we ever federate to other campuses. And because I optimized for the fest-week spike, the codebase is over-provisioned for a normal Tuesday: the Redis layer is idle 95% of the time.",
      differently: [
        "I'd add end-to-end tests around the ticket lifecycle from day one — the scariest bugs were race conditions I only found by hand-testing with two phones.",
        "I'd use a job queue (BullMQ) for the Postgres reconciliation instead of a setInterval cron — it works, but it's fragile under restarts.",
        "I'd design the club onboarding flow earlier; adoption stalled for two weeks because club admins found the first-run experience confusing.",
      ],
      metrics: [
        { label: "Peak ticket scans", value: "2,100+", detail: "in a 10-minute fest window" },
        { label: "P95 scan latency", value: "48ms", detail: "end-to-end QR validation" },
        { label: "Clubs onboarded", value: "40+", detail: "self-serve, no manual setup" },
        { label: "Uptime during fest week", value: "99.9%" },
      ],
      stack: [
        { category: "Frontend", items: ["Next.js 14 (App Router)", "TypeScript", "Tailwind CSS", "Framer Motion", "PWA APIs"] },
        { category: "Backend", items: ["Node.js", "tRPC", "Zod", "Socket.IO", "JWT + refresh tokens"] },
        { category: "Data", items: ["PostgreSQL", "Prisma", "Redis"] },
        { category: "Infra", items: ["Docker", "Railway (app)", "Neon (Postgres)", "GitHub Actions CI"] },
      ],
    },
  },
  {
    slug: "algoviz",
    title: "AlgoViz",
    tagline: "Interactive algorithm visualizer that renders graph & DP algorithms step by step.",
    description:
      "A teaching tool that turns dry pseudocode into interactive, step-through visualizations — built after watching juniors struggle to picture Dijkstra in their first DSA semester.",
    image: "/images/projects/algoviz.jpg",
    tech: ["React", "TypeScript", "D3.js", "Zustand", "Vite"],
    year: "2023",
    role: "Solo Developer",
    liveUrl: "https://algoviz.example.com", // TODO: replace
    githubUrl: "https://github.com/aarav-sharma-dev/algoviz", // TODO: replace
    caseStudy: {
      problem:
        "DSA is taught at a level of abstraction that loses a lot of students. Watching a priority queue reshuffle in text form is nothing like seeing Dijkstra relax edges across a graph. Existing visualizers were either Flash-era relics, locked behind paywalls, or only covered sorting. I wanted a free, keyboard-accessible tool where you can scrub through an algorithm's execution like a video.",
      constraints: [
        "Visualizations must stay smooth at 60fps with 1,000+ nodes on screen.",
        "Execution state must be fully scrubbable — pause, step back, jump to any step.",
        "Adding a new algorithm should not require touching visualization code.",
        "Runs entirely client-side — no backend, no login, works offline.",
      ],
      architectureNote:
        "The core idea is a hard separation between execution and rendering: each algorithm is a generator function that yields annotated state snapshots. The renderer just draws whatever the latest snapshot is. This made time-travel (stepping backwards) free — the UI simply replays a recorded list of snapshots.",
      diagram: [
        {
          title: "Algorithm layer",
          items: ["Generator functions (yield snapshots)", "Snapshot = nodes + edges + highlight +Vars"],
        },
        {
          title: "State layer",
          items: ["Zustand store (timeline of snapshots)", "Playback engine (play/pause/scrub)"],
        },
        {
          title: "Render layer",
          items: ["D3 force/canvas renderer", "React UI (controls, code panel)"],
        },
      ],
      decisions: [
        {
          title: "Generators over animation callbacks",
          detail:
            "Each algorithm is a single generator function that yields a snapshot per logical step. No timers, no async, no animation state inside algorithm code — it's testable with plain array equality, and adding BFS took one afternoon.",
        },
        {
          title: "Canvas instead of SVG above 200 nodes",
          detail:
            "SVG is crisp and easy but dies at a few hundred elements. The renderer switches to canvas past 200 nodes and keeps D3 only for math (layouts, scales). Same snapshots, different painter.",
        },
        {
          title: "Recorded timeline, not live re-execution",
          detail:
            "Stepping backwards in a live generator is impossible, so I record the snapshot list. Memory cost: ~2KB per step. A 500-step run costs 1MB — fine, and it makes scrubbing instant.",
        },
      ],
      tradeOffs:
        "Recording every snapshot trades memory for perfect time-travel; visualizing a 10^6-step DP is not feasible (I cap the timeline and warn). Canvas rendering loses the accessibility of DOM nodes — I compensate with a textual step log that screen readers can consume, but it's a real trade-off, not a solved problem.",
      differently: [
        "I'd persist shareable visualizations as compressed URLs so teachers can link a specific step in a lecture.",
        "I'd add a side-by-side mode comparing two algorithms on the same graph — the pedagogical win would be huge.",
        "I'd reach for Web Workers earlier; long-running layouts block the main thread and I shipped without them for months.",
      ],
      metrics: [
        { label: "Algorithms visualized", value: "14", detail: "graphs, DP, sorting, pathfinding" },
        { label: "Max nodes @ 60fps", value: "1,200", detail: "canvas renderer" },
        { label: "GitHub stars", value: "180+", detail: "used by 3 campus clubs" },
        { label: "Lighthouse", value: "98 / 100", detail: "performance, PWA installable" },
      ],
      stack: [
        { category: "Frontend", items: ["React 18", "TypeScript", "D3.js (scales, forces)", "Zustand", "Canvas 2D"] },
        { category: "Build", items: ["Vite", "Vitest + Playwright", "GitHub Pages / Actions"] },
      ],
    },
  },
  {
    slug: "deploypilot",
    title: "DeployPilot",
    tagline: "A lightweight CI/CD pipeline visualizer that turns YAML soup into a live DAG.",
    description:
      "A self-hostable dashboard that parses your existing GitHub Actions workflows and renders them as a live pipeline graph — with run history, flaky-test detection and Slack alerts for the branches you care about.",
    image: "/images/projects/deploypilot.jpg",
    tech: ["Node.js", "Fastify", "React", "Docker", "GitHub API", "SQLite"],
    year: "2024",
    role: "Backend Lead (team of 3)",
    githubUrl: "https://github.com/aarav-sharma-dev/deploypilot", // TODO: replace
    caseStudy: {
      problem:
        "Our project team could not answer basic questions: which workflow is failing most, how long the test stage really takes, which tests are flaky. GitHub's UI shows one run at a time; anything cross-run required clicking through dozens of pages. I wanted one dashboard that answers 'is our CI healthy?' in five seconds.",
      constraints: [
        "Must work with existing workflows — zero changes to user YAML.",
        "Self-hostable in one `docker compose up` — no cloud dependency.",
        "Respect GitHub API rate limits (5,000 req/hr per token) for orgs with 50+ repos.",
        "Fresh data without hammering the API — polling budget is fixed.",
      ],
      architectureNote:
        "A webhook-first design: GitHub pushes events to us, so the API is only touched for backfill and reconciliation. The pipeline DAG is reconstructed by parsing workflow YAML with the same parser GitHub uses for its visualizer (js-yaml + topological sort). A tiny SQLite store keeps the whole thing stateful but dependency-free.",
      diagram: [
        {
          title: "Ingestion",
          items: ["GitHub webhooks (push, workflow_run)", "Rate-limited backfill poller"],
        },
        {
          title: "Core",
          items: ["YAML parser → DAG builder", "Run store (SQLite)", "Flaky-test detector"],
        },
        {
          title: "Presentation",
          items: ["Fastify REST + SSE stream", "React dashboard (live DAG)"],
        },
      ],
      decisions: [
        {
          title: "Webhooks over polling",
          detail:
            "Webhook events give us fresh state in seconds and cost zero API budget. Polling remains only as a reconciliation safety net every 15 minutes — worst case, the dashboard is 15 minutes stale for missed events.",
        },
        {
          title: "SQLite, not Postgres",
          detail:
            "The write load is tiny (a few hundred rows per day per repo) and the deployment promise is one binary + one volume. SQLite in WAL mode handles it with room to spare; Postgres would add an ops burden for zero benefit at this scale.",
        },
        {
          title: "SSE over WebSockets",
          detail:
            "Live updates are one-directional (server → client), so Server-Sent Events give us auto-reconnect and proxy-friendliness for free. WebSockets felt cooler; SSE was correct.",
        },
      ],
      tradeOffs:
        "Single-writer SQLite caps us at one instance — horizontal scaling would need a real database, which is fine until ~5,000 repos. The DAG parser ignores rare `needs` expressions with dynamic continuations, so ~2% of workflows render partially; we surface a warning rather than render a wrong graph.",
      differently: [
        "I'd add per-test timing percentiles from day one — flaky detection came late and retrofitting it was painful.",
        "I'd write the YAML parser against GitHub's actual schema fixtures earlier; I burned two weekends on edge cases in `if:` conditions.",
        "Better onboarding docs — the self-host setup works but the first-run experience assumes too much.",
      ],
      metrics: [
        { label: "Repos monitored", value: "12", detail: "across 2 campus project teams" },
        { label: "Alert latency", value: "< 10s", detail: "webhook → Slack notification" },
        { label: "Flaky tests caught", value: "23", detail: "in the first month of use" },
        { label: "API budget used", value: "~4%", detail: "of hourly rate limit" },
      ],
      stack: [
        { category: "Backend", items: ["Node.js", "Fastify", "better-sqlite3", "Zod", "GitHub REST/webhook APIs"] },
        { category: "Frontend", items: ["React", "TypeScript", "React Flow (DAG)", "SSE client"] },
        { category: "Infra", items: ["Docker Compose", "GitHub Actions (CI for the CI tool)"] },
      ],
    },
  },
  {
    slug: "prepwise",
    title: "PrepWise",
    tagline: "AI-powered placement prep coach with a 1,400-question company-tagged bank.",
    description:
      "An interview prep platform for VIT students: a company-tagged question bank, an AI interviewer that conducts mock interviews, and spaced-repetition practice driven by your own weak areas.",
    image: "/images/projects/prepwise.jpg",
    tech: ["Python", "FastAPI", "LangChain", "React", "PostgreSQL", "OpenAI"],
    year: "2025",
    role: "Full-Stack Developer (AI focus)",
    liveUrl: "https://prepwise.example.com", // TODO: replace
    githubUrl: "https://github.com/aarav-sharma-dev/prepwise", // TODO: replace
    caseStudy: {
      problem:
        "Placement prep at college is tribal knowledge — which companies ask what, which topics actually matter, and how to practice interviewing rather than just solving problems. Seniors' notes live in expired Google Drive links. I built the tool I wished existed in my third year: company-tagged questions, a realistic mock interviewer, and a review queue that resurfaces what you're about to forget.",
      constraints: [
        "LLM inference costs must stay under ₹500/month for the whole student user base.",
        "Question bank must be structured for company tags — scraped/unstructured data wasn't acceptable.",
        "Mock interviews need to feel like a real interviewer: follow-ups, interruptions, time pressure.",
        "Privacy: interview transcripts must never train anything and must be deletable.",
      ],
      architectureNote:
        "The cost insight drives everything: the LLM is only used where it's irreplaceable (interview simulation, answer critique), while retrieval and scheduling are deterministic. Question retrieval is a lightweight TF-IDF search over a curated, hand-tagged bank — an embedded-vector RAG pipeline was overkill for 1,400 items and would have added a vector DB to run for free.",
      diagram: [
        {
          title: "Client",
          items: ["React SPA (interview room, dashboard)", "Web Speech API (voice input)"],
        },
        {
          title: "API",
          items: ["FastAPI", "JWT auth", "Spaced-repetition scheduler (SM-2)"],
        },
        {
          title: "AI layer",
          items: ["Interview orchestrator (state machine)", "LLM calls: questions + critique only", "Cost guard (per-user token budget)"],
        },
        {
          title: "Data",
          items: ["PostgreSQL", "TF-IDF question index", "Transcript store (auto-purge 30d)"],
        },
      ],
      decisions: [
        {
          title: "State-machine interviewer, not free-form chat",
          detail:
            "A plain chatbot lets the candidate steer the interview. An explicit state machine (intro → question → follow-up → critique) keeps the LLM on a leash, makes sessions reproducible, and cuts token usage ~60% because the LLM only fills templates for transitions it doesn't control.",
        },
        {
          title: "TF-IDF over vector RAG",
          detail:
            "With 1,400 curated questions, TF-IDF retrieval is instant, free, and explainable. If the bank grows 50×, the migration path to pgvector is clear — but I didn't ship infrastructure for a scale I don't have.",
        },
        {
          title: "SM-2 spaced repetition as the core loop",
          detail:
            "Every answered question feeds an SM-2 scheduler. The homepage is just the review queue — the product nudges you toward your weak areas instead of letting you grind comfortable problems.",
        },
        {
          title: "Per-user token budgets",
          detail:
            "Each user gets a daily token budget enforced before the LLM is called. It's the difference between a demo and something you can afford to leave running.",
        },
      ],
      tradeOffs:
        "Template-driven interviews are cheaper and consistent, but less surprising — a real interviewer's tangents sometimes teach more. TF-IDF retrieval misses semantic matches ('two pointers' vs 'converging pointers') that embeddings would catch. And the state machine means multi-topic interviews (system design + behavioral in one session) are awkward — the schema assumes one topic per session.",
      differently: [
        "I'd prototype the interview state machine on paper with 5 real users before writing any code — the first version had states no one ever reached.",
        "I'd add streaming responses from the start; waiting 4 seconds for a full critique feels broken.",
        "I'd invest in evals for the LLM prompts (a small set of golden transcripts) — right now prompt changes are vibes-checked.",
      ],
      metrics: [
        { label: "Questions tagged", value: "1,400+", detail: "across 35 companies" },
        { label: "LLM cost / user / month", value: "₹3.10", detail: "vs ₹500 total budget" },
        { label: "Mock interviews run", value: "850+", detail: "in the first semester" },
        { label: "Review-queue retention", value: "2.4×", detail: "vs free practice (weekly active)" },
      ],
      stack: [
        { category: "Backend", items: ["Python", "FastAPI", "SQLAlchemy", "LangChain", "OpenAI API"] },
        { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Web Speech API"] },
        { category: "Data", items: ["PostgreSQL", "Redis (rate limits)", "TF-IDF index"] },
        { category: "Infra", items: ["Docker", "Railway", "GitHub Actions"] },
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
