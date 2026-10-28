import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { posts } from "@/content/posts";

export function Blog() {
  return (
    <section id="blog" className="scroll-mt-24 py-20 md:py-28" aria-label="Blog">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="08"
          title="Writing"
          description="Long-form notes on things I built and broke — architecture deep-dives, war stories and student-friendly cheat sheets."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.07}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-border/70 hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="flex items-center gap-4 font-mono text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarDays className="size-3" aria-hidden />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3" aria-hidden />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {post.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <ul className="flex flex-wrap gap-1.5" aria-label="Tags">
                    {post.tags.slice(0, 2).map((tag) => (
                      <li
                        key={tag}
                        className="rounded border border-border bg-muted/60 px-2 py-0.5 font-mono text-[10px] text-muted-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <ArrowUpRight
                    className="size-4 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    aria-hidden
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
