# 🚀 Lakshyawardhan Singh Rathore — Developer Portfolio

> Final-year CSE undergraduate at VIT Bhopal · AI Engineer · Full-Stack Developer

A production-grade personal portfolio built as a product, not a template. Features an interactive terminal, a ⌘K command palette, live GitHub & competitive-programming stats, full project case studies, and a PostgreSQL-backed contact form.

**Live site:** [lakshyawardhansinghrathore.github.io](https://github.com/lakshyawardhansinghrathore) &nbsp;|&nbsp; **Resume:** [View CV](https://github.com/lakshyawardhansinghrathore/Resume)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖥️ **Interactive Terminal** | `help`, `whoami`, `projects`, `goto <section>`, `neofetch`, `theme`, `sudo hire-me` — with ↑/↓ history & tab-completion |
| ⌘ **Command Palette** | `Ctrl+K` / `⌘K` — instantly jump to any section, project, post or external link |
| 📊 **Live Stats** | GitHub contribution graph + LeetCode / Codeforces cards, fetched server-side with ISR (hourly) |
| 📝 **Blog** | Markdown-powered posts rendered with `react-markdown` + Tailwind Typography |
| 📬 **Contact Form** | Zod-validated, honeypot-protected, persisted to PostgreSQL via Drizzle ORM |
| 🌙 **Dark Mode** | Dark-first design with a smooth light/dark toggle |
| ♿ **Accessible** | Skip links, keyboard-navigable, semantic landmarks, `prefers-reduced-motion` respected |
| 🔍 **SEO Ready** | OpenGraph image, sitemap, robots.txt, per-page metadata |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) + TypeScript 5 |
| **Styling** | Tailwind CSS v4 (CSS-first config) + Framer Motion |
| **Database** | PostgreSQL + Drizzle ORM |
| **Validation** | Zod |
| **Markdown** | react-markdown + @tailwindcss/typography |
| **Icons** | Lucide React |
| **Deployment** | Vercel |

---

## 🚦 Getting Started

### Prerequisites

- Node.js ≥ 18
- A PostgreSQL database (for the contact form)

### 1. Clone & install

```bash
git clone https://github.com/lakshyawardhansinghrathore/portfolio.git
cd portfolio
npm install
```

### 2. Set environment variables

Create a `.env` file in the project root:

```env
# Required — PostgreSQL connection string
DATABASE_URL=postgresql://user:password@host:5432/dbname

# Optional — raises GitHub API rate limits for the stats section
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
```

### 3. Push the database schema

```bash
npx drizzle-kit push
```

### 4. Run the dev server

```bash
npm run dev
# → http://localhost:3000
```

---

## 📁 Folder Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Fonts, theme, nav/footer, metadata
│   ├── page.tsx                  # Home page — assembles all sections
│   ├── globals.css               # Tailwind v4 theme tokens + dark mode
│   ├── not-found.tsx             # Terminal-styled 404
│   ├── opengraph-image.tsx       # OG image for link previews
│   ├── sitemap.ts / robots.ts    # SEO
│   ├── projects/[slug]/          # Project case-study pages (auto-generated)
│   ├── blog/[slug]/              # Blog post pages
│   ├── changelog/                # Site version history
│   └── api/
│       ├── contact/              # POST — validates & stores messages
│       └── health/               # DB healthcheck
│
├── components/
│   ├── ui/                       # Primitive components (button, badge)
│   ├── sections/                 # One component per page section
│   ├── command-palette.tsx       # ⌘K palette
│   ├── nav.tsx / footer.tsx      # Navigation & footer
│   ├── theme-toggle.tsx          # Light / dark toggle
│   ├── contribution-graph.tsx    # GitHub activity grid
│   ├── particle-field.tsx        # Canvas hero background
│   └── brand-icons.tsx           # GitHub / LinkedIn SVG icons
│
├── content/                      # ← Edit here — all site content
│   ├── site.ts                   # Name, links, handles, education
│   ├── projects.ts               # Project cards + case-study data
│   ├── skills.ts                 # Skill groups
│   ├── experience.ts             # Timeline (education + internships)
│   ├── certifications.ts         # Certifications list
│   ├── posts.ts                  # Blog posts (Markdown body)
│   ├── testimonials.ts           # Testimonials
│   └── changelog.ts             # Changelog entries
│
├── db/
│   ├── index.ts                  # Drizzle client
│   └── schema.ts                 # Messages table schema
│
└── lib/utils.ts                  # cn() utility helper
```

---

## ✏️ Updating Content

All content lives in **`src/content/`** — no component code changes needed.

| What | File |
|---|---|
| Name, email, social links | [`src/content/site.ts`](src/content/site.ts) |
| GitHub / LeetCode / Codeforces handles | [`src/content/site.ts`](src/content/site.ts) |
| Projects + case studies | [`src/content/projects.ts`](src/content/projects.ts) |
| Skills | [`src/content/skills.ts`](src/content/skills.ts) |
| Experience timeline | [`src/content/experience.ts`](src/content/experience.ts) |
| Certifications | [`src/content/certifications.ts`](src/content/certifications.ts) |
| Blog posts | [`src/content/posts.ts`](src/content/posts.ts) |
| Testimonials | [`src/content/testimonials.ts`](src/content/testimonials.ts) |
| Changelog | [`src/content/changelog.ts`](src/content/changelog.ts) |

---

## 🌍 Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | ✅ Yes | PostgreSQL connection (contact form) |
| `GITHUB_TOKEN` | ❌ No | Raises GitHub API rate limits for the stats section |

---

## 📜 Available Scripts

```bash
npm run dev        # Start dev server at localhost:3000
npm run build      # Production build
npm run start      # Start production server
npm run lint       # ESLint check
npm run typecheck  # TypeScript type-check (tsc --noEmit)
```

---

## 🚀 Deployment

Deploy to Vercel in one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your repo to GitHub.
2. Import it in the Vercel dashboard.
3. Add `DATABASE_URL` (and optionally `GITHUB_TOKEN`) as environment variables.
4. Hit **Deploy**.

---

## 📬 Contact

**Lakshyawardhan Singh Rathore**  
📧 [lakshyasr7711@gmail.com](mailto:lakshyasr7711@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/lakshyawardhan-singh-rathore-1082513b0/)  
💻 [GitHub](https://github.com/lakshyawardhansinghrathore)  
📍 Bhopal, India

---

<p align="center">Built with ❤️ using Next.js · Tailwind CSS · Framer Motion</p>
