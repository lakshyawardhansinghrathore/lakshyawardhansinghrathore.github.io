/**
 * BLOG POSTS — markdown bodies rendered by react-markdown on /blog/[slug].
 * TODO: replace with your real writing. Keep each post's `content` as plain
 * markdown; the layout applies prose styling automatically.
 */

export interface Post {
  slug: string;
  title: string;
  date: string; // ISO date
  readTime: string;
  excerpt: string;
  tags: string[];
  content: string;
}

export const posts: Post[] = [
  {
    slug: "surviving-fest-week-with-redis",
    title: "Surviving fest week: how CampusFlow handled 2,100 ticket scans in 10 minutes",
    date: "2025-01-18",
    readTime: "8 min read",
    excerpt:
      "What actually breaks when 2,000 students scan QR codes at the same time — and how a $0 Redis instance saved our Postgres database.",
    tags: ["Redis", "PostgreSQL", "Architecture", "War story"],
    content: `## The night before the fest

Our university's cultural fest sells out in minutes. That means ~2,000 students standing at venue entrances, phones out, scanning QR tickets in a burst that lasts about ten minutes. The previous year, the Google-Form-plus-spreadsheet system melted into a puddle of duplicated rows.

I had six weeks to make sure CampusFlow didn't do the same.

## The naive version (and why it dies)

The obvious design: scan QR code → validate against Postgres → mark as used. One query per scan, a primary key on the ticket code, done.

Under load testing, this version died at around 60 concurrent scans — not because Postgres is slow, but because every scan did a read *and* a write, connections piled up, and the connection pool became the bottleneck. At 200 concurrent scans, the API was returning 500s.

## What actually fixed it

Three changes, in order of impact:

1. **Deduplicate with Redis SETNX.** A ticket code that has been seen is simply *never re-validated* — Redis rejects it in sub-millisecond time. Postgres never hears about the scan storm.
2. **Batch the writes.** Postgres is updated by a background job that drains a queue, so the database sees a gentle stream instead of a flood.
3. **Fail open, reconcile later.** If Redis is unreachable, we accept the scan and flag it for reconciliation. For a campus tool, a double-scan is annoying; a queue of angry students at the door is a disaster.

## The numbers

| Metric | Before | After |
| --- | --- | --- |
| Peak concurrent scans | ~60 | 2,100 |
| P95 validation latency | 1.8s | 48ms |
| Database load during peak | Saturated | ~4% CPU |

## What I learned

The lesson wasn't "use Redis" — it was that **bottlenecks move**. After the scan path was fixed, the next failure was the WebSocket fan-out overloading the Node process. (That's a story for another post.)

The deeper lesson: load-test with *realistic* patterns. My first tests used a uniform rate. Nothing in real life is uniform — especially not students at a fest gate.`,
  },
  {
    slug: "generators-for-algorithm-visualization",
    title: "Why generators made my algorithm visualizer 10× easier to build",
    date: "2024-09-02",
    readTime: "6 min read",
    excerpt:
      "Turning algorithms into generator functions that yield state snapshots — and getting perfect time-travel scrubbing for free.",
    tags: ["TypeScript", "Teaching", "React"],
    content: `## The problem with animating algorithms

Every algorithm visualizer I'd seen coupled *execution* to *animation*: the algorithm calls a "highlight this node" callback, and the renderer mutates the DOM. It sounds simple until you want pause, rewind, or scrub. Now you're reverse-engineering state from animation callbacks.

## The insight: an algorithm is a sequence of states

I rewrote every algorithm as a **generator function** that yields immutable snapshots:

\`\`\`ts
function* dijkstra(graph: Graph, source: string) {
  const dist = new Map<string, number>();
  const visited = new Set<string>();
  dist.set(source, 0);
  while (true) {
    const u = closestUnvisited(dist, visited);
    if (!u) break;
    visited.add(u);
    yield { dist: new Map(dist), visited: new Set(visited), current: u };
    for (const [v, w] of graph.neighbors(u)) {
      if (dist.get(u)! + w < (dist.get(v) ?? Infinity)) {
        dist.set(v, dist.get(u)! + w);
        yield { dist: new Map(dist), visited: new Set(visited), current: u, relaxed: v };
      }
    }
  }
}
\`\`\`

The renderer doesn't know what Dijkstra is. It receives a snapshot and paints it. Playback is just indexing into an array of snapshots — which means rewind is free.

## Why this scales

- **Testing** algorithms is plain array equality — no DOM, no timing.
- **Adding BFS** took one afternoon, including its own custom highlights.
- **Stepping backwards** costs nothing because the timeline is recorded.

The trade-off: memory. Every snapshot costs ~2KB, so a 500-step visualization is ~1MB. For teaching algorithms, that's nothing.

## Generators everywhere?

No. But whenever you hear yourself saying "I need to pause this halfway and resume it later," a generator is probably the cleanest answer in JavaScript.`,
  },
  {
    slug: "docker-for-students",
    title: "Docker for students: the 80/20 I wish someone had taught me",
    date: "2024-05-20",
    readTime: "7 min read",
    excerpt:
      "You don't need to know everything about containers. You need images, ports, volumes, and one honest multi-stage build. Here's the cheat sheet.",
    tags: ["Docker", "DevOps", "Beginner"],
    content: `## Docker is easier than it looks

Most Docker tutorials start with "what is a container?" and forty minutes later you still haven't run anything. Let's skip to the parts that actually matter for a student project.

## The four concepts that carry you

1. **Image vs. container** — an image is the recipe, a container is the running dish. You build images; you run containers.
2. **Ports** — \`-p 3000:3000\` maps *your laptop's* port 3000 to the *container's* port 3000. "It doesn't work" is usually a port mismatch.
3. **Volumes** — containers are ephemeral. \`-v data:/var/lib/postgresql/data\` is why your database isn't empty after every restart.
4. **Multi-stage builds** — build in a fat image, run in a slim one. This one trick took my images from 1.2GB to 120MB.

## An honest multi-stage build for a Next.js app

\`\`\`dockerfile
# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: run
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
\`\`\`

## docker-compose: the real MVP

One YAML file that runs your app *and* its database:

\`\`\`yaml
services:
  app:
    build: .
    ports: ["3000:3000"]
    environment:
      DATABASE_URL: postgres://postgres:postgres@db:5432/app
    depends_on: [db]
  db:
    image: postgres:16
    volumes: [pgdata:/var/lib/postgresql/data]
volumes:
  pgdata:
\`\`\`

Now "it works on my machine" means "it works on everyone's machine."

## When you actually need more

You don't need Kubernetes for a student project. You need this, plus a reverse proxy if you're hosting two things on one VPS. Ship first; complicate later.`,
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
