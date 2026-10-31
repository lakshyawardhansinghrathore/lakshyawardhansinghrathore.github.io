"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Copy,
  FileDown,
  FolderGit2,
  Hash,
  History,
  Mail,
  Moon,
  Search,
  Trophy,
} from "lucide-react";
import { CodeforcesIcon, GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { site, sections } from "@/content/site";
import { projects } from "@/content/projects";
import { posts } from "@/content/posts";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Context so the nav button (and anything else) can open the palette */
/* ------------------------------------------------------------------ */

const CommandPaletteContext = createContext<{ open: boolean; setOpen: (v: boolean) => void }>({
  open: false,
  setOpen: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

/* ------------------------------------------------------------------ */
/* Palette items                                                        */
/* ------------------------------------------------------------------ */

/** Any icon component that takes a className prop (lucide icons + brand SVGs). */
type IconType = React.ComponentType<{ className?: string }>;

interface PaletteItem {
  id: string;
  label: string;
  group: string;
  icon: IconType;
  hint?: string;
  keywords?: string;
  action: () => void;
}

function buildItems(
  router: ReturnType<typeof useRouter>,
  close: () => void,
  note: (msg: string) => void,
): PaletteItem[] {
  const items: PaletteItem[] = [];

  // --- Navigate to sections ---
  for (const s of sections) {
    items.push({
      id: `nav-${s.id}`,
      label: s.label,
      group: "Navigate",
      icon: Hash,
      keywords: `section ${s.id} goto jump`,
      action: () => {
        close();
        // Navigate home first if we're on a sub-page
        if (window.location.pathname !== "/") {
          router.push(`/#${s.id}`);
        } else {
          document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
        }
      },
    });
  }

  // --- Projects ---
  for (const p of projects) {
    items.push({
      id: `project-${p.slug}`,
      label: p.title,
      group: "Projects",
      icon: FolderGit2,
      hint: p.tagline,
      keywords: `${p.tech.join(" ")} case study`,
      action: () => {
        close();
        router.push(`/projects/${p.slug}`);
      },
    });
  }

  // --- Blog posts ---
  for (const post of posts) {
    items.push({
      id: `post-${post.slug}`,
      label: post.title,
      group: "Writing",
      icon: BookOpen,
      hint: post.readTime,
      keywords: `blog article ${post.tags.join(" ")}`,
      action: () => {
        close();
        router.push(`/blog/${post.slug}`);
      },
    });
  }

  // --- External links ---
  const links: { label: string; url: string; icon: IconType; keywords: string }[] = [
    { label: "GitHub profile", url: site.social.github, icon: GithubIcon, keywords: "code repos" },
    { label: "LinkedIn profile", url: site.social.linkedin, icon: LinkedinIcon, keywords: "professional" },
    { label: "Codeforces profile", url: site.social.codeforces, icon: CodeforcesIcon, keywords: "competitive programming cp" },
  ];
  for (const l of links) {
    items.push({
      id: `link-${l.label}`,
      label: l.label,
      group: "Links",
      icon: l.icon,
      keywords: l.keywords,
      action: () => {
        close();
        window.open(l.url, "_blank", "noopener,noreferrer");
      },
    });
  }

  // --- Actions ---
  items.push({
    id: "action-resume",
    label: site.resumeUrl.endsWith(".pdf") ? "Download resume (PDF)" : "View resume",
    group: "Actions",
    icon: FileDown,
    keywords: "cv resume download pdf",
    action: () => {
      close();
      if (site.resumeUrl.startsWith("http")) {
        window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
      } else {
        const a = document.createElement("a");
        a.href = site.resumeUrl;
        a.download = "";
        a.click();
      }
    },
  });

  items.push({
    id: "action-email",
    label: "Copy email address",
    group: "Actions",
    icon: Copy,
    keywords: `mail ${site.email}`,
    action: async () => {
      try {
        await navigator.clipboard.writeText(site.email);
        note("✓ Email copied to clipboard");
        setTimeout(close, 900);
      } catch {
        close();
        window.open(`mailto:${site.email}`, "_self");
      }
    },
  });

  items.push({
    id: "action-theme",
    label: "Toggle light / dark theme",
    group: "Actions",
    icon: Moon,
    keywords: "appearance dark light mode contrast",
    action: () => {
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      note(next ? "Switched to dark theme" : "Switched to light theme");
      setTimeout(close, 600);
    },
  });

  items.push({
    id: "action-changelog",
    label: "View changelog",
    group: "Actions",
    icon: History,
    keywords: "versions updates site",
    action: () => {
      close();
      router.push("/changelog");
    },
  });

  items.push({
    id: "action-contact",
    label: "Send me a message",
    group: "Actions",
    icon: Mail,
    keywords: "hire contact form talk",
    action: () => {
      close();
      if (window.location.pathname !== "/") {
        router.push("/#contact");
      } else {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }
    },
  });

  return items;
}

/* ------------------------------------------------------------------ */
/* Highlight matched substring in a label                              */
/* ------------------------------------------------------------------ */

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-accent">{text.slice(i, i + query.length)}</span>
      {text.slice(i + query.length)}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Provider + modal                                                    */
/* ------------------------------------------------------------------ */

const GROUP_ORDER = ["Navigate", "Projects", "Writing", "Links", "Actions"];

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [note, setNote] = useState<string | null>(null);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setNote(null);
  }, []);

  const items = useMemo(() => buildItems(router, close, (m) => setNote(m)), [router, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) =>
      `${it.label} ${it.group} ${it.keywords ?? ""}`.toLowerCase().includes(q),
    );
  }, [items, query]);

  /* Global ⌘K / Ctrl+K listener */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* Reset state + focus input whenever the palette opens */
  useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      setNote(null);
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Keep the active item in view */
  useEffect(() => {
    itemRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filtered[activeIndex];
      if (item) void item.action();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  }

  /* Group the flat filtered list for rendering */
  const grouped = useMemo(() => {
    const map = new Map<string, PaletteItem[]>();
    for (const it of filtered) {
      const arr = map.get(it.group) ?? [];
      arr.push(it);
      map.set(it.group, arr);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)!] as const);
  }, [filtered]);

  let flatIndex = -1;

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={close} />

            <div className="relative mx-auto mt-[10vh] w-[calc(100%-2rem)] max-w-xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40"
              >
                {/* Input */}
                <div className="flex items-center gap-3 border-b border-border px-4">
                  <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
                  <input
                    ref={inputRef}
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setActiveIndex(0);
                    }}
                    onKeyDown={onKeyDown}
                    placeholder="Search sections, projects, posts, links…"
                    className="h-13 w-full bg-transparent py-4 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    aria-label="Search commands"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd className="shrink-0 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[min(24rem,50vh)] overflow-y-auto p-2">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-10 text-center">
                      <p className="font-mono text-sm text-muted-foreground">
                        No results for &quot;{query}&quot;
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        Try &quot;projects&quot;, &quot;github&quot; or &quot;resume&quot;
                      </p>
                    </div>
                  ) : (
                    grouped.map(([group, groupItems]) => (
                      <div key={group} className="mb-1.5">
                        <div className="px-3 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/70">
                          {group}
                        </div>
                        {groupItems.map((item) => {
                          flatIndex += 1;
                          const idx = flatIndex;
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.id}
                              ref={(el) => {
                                itemRefs.current[idx] = el;
                              }}
                              type="button"
                              onMouseEnter={() => setActiveIndex(idx)}
                              onClick={() => void item.action()}
                              className={cn(
                                "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors",
                                idx === activeIndex
                                  ? "bg-accent-soft text-accent"
                                  : "text-foreground",
                              )}
                            >
                              <Icon className="size-4 shrink-0 opacity-80" aria-hidden />
                              <span className="min-w-0 flex-1">
                                <span className="block truncate font-medium">
                                  <Highlight text={item.label} query={query.trim()} />
                                </span>
                                {item.hint ? (
                                  <span className="block truncate text-xs text-muted-foreground">
                                    {item.hint}
                                  </span>
                                ) : null}
                              </span>
                              {idx === activeIndex ? (
                                <ArrowRight className="size-3.5 shrink-0" aria-hidden />
                              ) : null}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-3">
                    <span>↑↓ navigate</span>
                    <span>↵ select</span>
                    <span>esc close</span>
                  </span>
                  <span className="font-mono">{note ?? "⌘K"}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </CommandPaletteContext.Provider>
  );
}
