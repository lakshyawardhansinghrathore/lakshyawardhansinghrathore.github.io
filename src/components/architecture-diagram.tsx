import { ArrowDown } from "lucide-react";

interface Layer {
  title: string;
  items: string[];
}

/**
 * Layered architecture diagram rendered with theme-aware HTML/CSS.
 * Data comes from each project's `caseStudy.diagram` in content/projects.ts.
 */
export function ArchitectureDiagram({ layers }: { layers: Layer[] }) {
  return (
    <div aria-label="Architecture diagram" role="img">
      {layers.map((layer, i) => (
        <div key={layer.title}>
          <div className="rounded-xl border border-border bg-background/70 p-4 sm:p-5">
            <p className="mb-3 flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-wider text-accent">
              <span className="flex size-5 items-center justify-center rounded border border-accent-border/50 bg-accent-soft text-[10px]">
                {i + 1}
              </span>
              {layer.title}
            </p>
            <ul className="flex flex-wrap gap-2">
              {layer.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
          {i < layers.length - 1 ? (
            <div className="flex items-center justify-center py-1" aria-hidden>
              <ArrowDown className="size-4 text-accent/60" />
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
