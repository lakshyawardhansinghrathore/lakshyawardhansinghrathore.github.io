import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { BlogMarkdown } from "@/components/blog-markdown";
import { ScrollProgress } from "@/components/scroll-progress";
import { getPost, posts } from "@/content/posts";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === slug);
  const prev = posts[(idx - 1 + posts.length) % posts.length];
  const next = posts[(idx + 1) % posts.length];

  return (
    <>
      <ScrollProgress />

      <article className="mx-auto max-w-3xl px-4 pb-24 pt-28 sm:px-6 md:pt-36">
        <Link
          href="/#blog"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" aria-hidden /> All posts
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-4 font-mono text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-3.5 text-accent" aria-hidden />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5 text-accent" aria-hidden />
              {post.readTime}
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-accent-border/50 bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="mt-10 border-t border-border pt-10">
          <BlogMarkdown content={post.content} />
        </div>

        {/* Author card */}
        <footer className="mt-14 flex items-center gap-4 rounded-xl border border-border bg-card p-5">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-accent-border/60 bg-accent-soft font-display text-sm font-bold text-accent">
            {site.initials}
          </span>
          <div>
            <p className="font-display font-semibold text-foreground">
              Written by {site.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {site.role} — usually debugging something at {site.education.school}.
            </p>
          </div>
        </footer>

        {/* Prev / next */}
        <nav className="mt-10 grid gap-4 border-t border-border pt-10 sm:grid-cols-2" aria-label="More posts">
          <Link
            href={`/blog/${prev.slug}`}
            className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-accent-border/60"
          >
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <ArrowLeft className="size-3.5" aria-hidden /> Previous post
            </span>
            <span className="mt-1.5 block font-display font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/blog/${next.slug}`}
            className="group rounded-xl border border-border bg-card p-5 text-right transition-all hover:border-accent-border/60"
          >
            <span className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
              Next post <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-1.5 block font-display font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
              {next.title}
            </span>
          </Link>
        </nav>
      </article>
    </>
  );
}
