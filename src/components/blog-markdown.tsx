import ReactMarkdown from "react-markdown";

/**
 * Markdown renderer for blog posts, styled with @tailwindcss/typography.
 * The prose customisations below keep code blocks and tables on-brand.
 */
export function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="prose prose-zinc max-w-none dark:prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent prose-a:decoration-accent/40 prose-a:underline-offset-4 hover:prose-a:text-accent/80 prose-code:rounded prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-mono prose-code:text-[0.85em] prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-zinc-950 prose-pre:text-zinc-200 prose-strong:text-foreground prose-blockquote:border-l-accent prose-blockquote:not-italic prose-th:text-foreground prose-td:text-muted-foreground">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
