import { GitCommitHorizontal, Flame, Star, Users, Trophy, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { ContributionGraph, type ContributionDay } from "@/components/contribution-graph";
import { site } from "@/content/site";

export const revalidate = 3600; // refresh stats hourly

/* ------------------------------------------------------------------ */
/* Demo-data fallbacks — used when the APIs are unreachable or the     */
/* usernames in content/site.ts are still placeholders (marked TODO).  */
/* ------------------------------------------------------------------ */

function hashDate(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

/** Deterministic, realistic-looking demo contribution history. */
function demoContributions(): ContributionDay[] {
  const days: ContributionDay[] = [];
  const today = new Date();
  for (let i = 369; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);
    const h = hashDate(iso);
    const weekend = d.getDay() === 0 || d.getDay() === 6;
    // Occasional off-days, quieter weekends, a busy-semester rhythm
    const count =
      h % 13 === 0 ? 0 : weekend ? h % 4 : (h % 6) + (h % 4 === 0 ? 4 : 0);
    const level = count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4;
    days.push({ date: iso, count, level });
  }
  return days;
}

function demoStats() {
  const days = demoContributions();
  return {
    days,
    total: days.reduce((a, b) => a + b.count, 0),
    followers: 384,
    repos: 42,
    stars: 217,
    demo: true,
  };
}

/* ------------------------------------------------------------------ */
/* Live fetchers                                                       */
/* ------------------------------------------------------------------ */

interface GithubStatsResult {
  days: ContributionDay[];
  total: number;
  followers: number;
  repos: number;
  stars: number;
  demo: boolean;
}

async function fetchGithubStats(): Promise<GithubStatsResult> {
  const username = site.githubUsername;
  // Optional: set GITHUB_TOKEN in .env to raise the API rate limit
  const headers: HeadersInit = process.env.GITHUB_TOKEN
    ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json" }
    : { Accept: "application/vnd.github+json" };

  try {
    // Contribution calendar from the jogruber mirror (no auth needed)
    const contribRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { next: { revalidate: 3600 } },
    );
    if (!contribRes.ok) throw new Error("contributions failed");
    const contrib = await contribRes.json();

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`, {
        headers,
        next: { revalidate: 3600 },
      }),
    ]);
    if (!userRes.ok) throw new Error("user failed");
    const user = await userRes.json();

    let stars = 0;
    if (reposRes.ok) {
      const repos = await reposRes.json();
      stars = repos.reduce(
        (acc: number, r: { stargazers_count?: number }) => acc + (r.stargazers_count ?? 0),
        0,
      );
    }

    // A placeholder account returns an empty calendar → treat as demo
    const days: ContributionDay[] = contrib.contributions ?? [];
    if (!Array.isArray(days) || days.length === 0) throw new Error("no contributions");

    return {
      days,
      total: contrib.total?.lastYear ?? days.reduce((a, b) => a + b.count, 0),
      followers: user.followers ?? 0,
      repos: user.public_repos ?? 0,
      stars,
      demo: false,
    };
  } catch {
    return demoStats();
  }
}

interface LeetCodeResult {
  total: number;
  easy: number;
  medium: number;
  hard: number;
  demo: boolean;
}

async function fetchLeetCode(): Promise<LeetCodeResult> {
  try {
    const res = await fetch(`https://leetcode-stats-api.herokuapp.com/${site.leetcodeUsername}`, {
      next: { revalidate: 3600 } },
    );
    if (!res.ok) throw new Error();
    const d = await res.json();
    if (!d.totalSolved) throw new Error();
    return {
      total: d.totalSolved,
      easy: d.easySolved,
      medium: d.mediumSolved,
      hard: d.hardSolved,
      demo: false,
    };
  } catch {
    return { total: 512, easy: 221, medium: 241, hard: 50, demo: true };
  }
}

interface CodeforcesResult {
  rating: number;
  maxRating: number;
  rank: string;
  demo: boolean;
}

async function fetchCodeforces(): Promise<CodeforcesResult> {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${site.codeforcesHandle}`,
      { next: { revalidate: 3600 } },
    );
    const d = await res.json();
    if (d.status !== "OK" || !d.result?.[0]) throw new Error();
    const u = d.result[0];
    return {
      rating: u.rating ?? 1400,
      maxRating: u.maxRating ?? 1500,
      rank: (u.rank ?? "specialist").replace(/^\w/, (c: string) => c.toUpperCase()),
      demo: false,
    };
  } catch {
    return { rating: 1447, maxRating: 1546, rank: "Specialist", demo: true };
  }
}

/** Longest streak of consecutive contribution days ending today/yesterday. */
function calcStreak(days: ContributionDay[]): number {
  let i = days.length - 1;
  if (days[i]?.count === 0) i -= 1; // today may not have committed yet
  let streak = 0;
  for (; i >= 0; i--) {
    if (days[i].count > 0) streak++;
    else break;
  }
  return streak;
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export async function GithubStats() {
  const [gh, leetcode, codeforces] = await Promise.all([
    fetchGithubStats(),
    fetchLeetCode(),
    fetchCodeforces(),
  ]);

  const streak = calcStreak(gh.days);
  const isDemo = gh.demo || leetcode.demo || codeforces.demo;

  const statCards = [
    { icon: GitCommitHorizontal, label: "Contributions", value: gh.total, suffix: "past year" },
    { icon: Flame, label: "Current streak", value: streak, suffix: "days" },
    { icon: Star, label: "Stars earned", value: gh.stars, suffix: "across repos" },
    { icon: Users, label: "Followers", value: gh.followers, suffix: "on GitHub" },
  ];

  return (
    <section id="stats" className="scroll-mt-24 py-20 md:py-28" aria-label="GitHub and competitive programming stats">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="05"
          title="GitHub & competitive programming"
          description="Numbers I'm proud of — fetched live from the GitHub, LeetCode and Codeforces APIs."
        />

        <Reveal>
          <div className="rounded-xl border border-border bg-card p-5 shadow-sm sm:p-7">
            {/* Header row */}
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-accent-soft font-mono text-xs font-bold text-accent">
                  @{site.githubUsername}
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Contribution activity</p>
                  <p className="text-xs text-muted-foreground">Last 12 months</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  title={
                    isDemo
                      ? "Usernames are still placeholders — set them in src/content/site.ts. Showing demo data."
                      : "Fetched live from the GitHub API"
                  }
                  className={
                    isDemo
                      ? "inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium text-amber-500"
                      : "inline-flex items-center gap-1.5 rounded-full border border-accent-border/50 bg-accent-soft px-2.5 py-1 text-[11px] font-medium text-accent"
                  }
                >
                  <span className={isDemo ? "size-1.5 rounded-full bg-amber-500" : "size-1.5 animate-pulse-dot rounded-full bg-accent"} aria-hidden />
                  {isDemo ? "demo data — edit content/site.ts" : "live"}
                </span>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-accent-border hover:text-accent"
                  aria-label="Open GitHub profile"
                >
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
              </div>
            </div>

            {/* Contribution graph */}
            <ContributionGraph days={gh.days} />

            {/* Stat cards */}
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
              {statCards.map((s) => (
                <div key={s.label} className="rounded-lg border border-border bg-background/60 p-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <s.icon className="size-3.5" aria-hidden />
                    <span className="text-[11px] font-medium uppercase tracking-wide">{s.label}</span>
                  </div>
                  <p className="mt-1.5 font-display text-2xl font-bold text-foreground">
                    {s.value.toLocaleString()}
                  </p>
                  <p className="text-[11px] text-muted-foreground">{s.suffix}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* LeetCode + Codeforces */}
        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <Reveal delay={0.05}>
            <div className="h-full rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground">LeetCode</h3>
                <a
                  href={site.social.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  @{site.leetcodeUsername}
                </a>
              </div>
              <p className="font-display text-3xl font-bold text-foreground">
                {leetcode.total}
                <span className="ml-1.5 text-sm font-normal text-muted-foreground">solved</span>
              </p>
              <div className="mt-4 space-y-2.5">
                {(
                  [
                    { label: "Easy", value: leetcode.easy, total: 875, color: "bg-emerald-500" },
                    { label: "Medium", value: leetcode.medium, total: 1868, color: "bg-amber-500" },
                    { label: "Hard", value: leetcode.hard, total: 826, color: "bg-red-500" },
                  ] as const
                ).map((row) => (
                  <div key={row.label} className="flex items-center gap-3 text-xs">
                    <span className="w-11 shrink-0 text-muted-foreground">{row.label}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${row.color}`}
                        style={{ width: `${Math.min(100, (row.value / row.total) * 100)}%` }}
                      />
                    </div>
                    <span className="w-8 shrink-0 text-right font-mono text-muted-foreground">
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-semibold text-foreground">Codeforces</h3>
                <a
                  href={site.social.codeforces}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition-colors hover:text-accent"
                >
                  @{site.codeforcesHandle}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex size-14 items-center justify-center rounded-full border border-accent-border/50 bg-accent-soft text-accent">
                  <Trophy className="size-6" aria-hidden />
                </span>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">
                    {codeforces.rating}
                    <span className="ml-1.5 text-sm font-normal text-muted-foreground">
                      max {codeforces.maxRating}
                    </span>
                  </p>
                  <p className="mt-0.5 inline-flex rounded-full border border-accent-border/50 bg-accent-soft px-2 py-0.5 text-[11px] font-medium text-accent">
                    {codeforces.rank}
                  </p>
                </div>
              </div>
              <p className="mt-auto pt-4 text-xs text-muted-foreground">
                Active in campus ICPC-style contests and the college competitive programming
                chapter. {/* TODO: replace with your real CP story */}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
