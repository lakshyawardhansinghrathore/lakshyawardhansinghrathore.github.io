"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site, sections } from "@/content/site";
import { projects } from "@/content/projects";
import { skillGroups } from "@/content/skills";
import { timeline } from "@/content/experience";
import { certifications } from "@/content/certifications";
import { posts } from "@/content/posts";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

type LineType = "cmd" | "out" | "dim" | "ok" | "err" | "accent" | "warn";

interface Line {
  text: string;
  type: LineType;
}

const LINE_COLORS: Record<LineType, string> = {
  cmd: "text-emerald-400",
  out: "text-zinc-300",
  dim: "text-zinc-500",
  ok: "text-emerald-400",
  err: "text-red-400",
  accent: "text-emerald-300",
  warn: "text-amber-400",
};

const BOOT_LINES: Line[] = [
  { text: `Last login: ${new Date().toDateString()} on ttys001`, type: "dim" },
  { text: "Welcome to lakshya.dev — an interactive portfolio.", type: "out" },
  { text: "Type `help` to see available commands.", type: "accent" },
  { text: "", type: "out" },
];

/* ------------------------------------------------------------------ */
/* Command registry                                                    */
/* ------------------------------------------------------------------ */

function runCommand(raw: string): Line[] {
  const input = raw.trim();
  const lower = input.toLowerCase();
  const [cmd, ...args] = lower.split(/\s+/);
  const arg = args.join(" ");

  switch (cmd) {
    case "":
      return [];

    case "help":
      return [
        { text: "available commands:", type: "dim" },
        { text: "  help              show this help", type: "out" },
        { text: "  whoami            who is this guy?", type: "out" },
        { text: "  projects          list featured projects", type: "out" },
        { text: "  skills            tech stack by category", type: "out" },
        { text: "  experience        education & internships", type: "out" },
        { text: "  certs             certifications", type: "out" },
        { text: "  blog              recent writing", type: "out" },
        { text: "  contact           how to reach me", type: "out" },
        { text: "  goto <section>    scroll to a section (try: goto projects)", type: "out" },
        { text: "  github            open GitHub profile", type: "out" },
        { text: "  resume            download resume (pdf)", type: "out" },
        { text: "  theme             toggle light/dark mode", type: "out" },
        { text: "  neofetch          system info", type: "out" },
        { text: "  clear             clear the terminal", type: "out" },
        { text: "  ...and a few secrets. try `sudo hire-me`.", type: "dim" },
      ];

    case "whoami":
      return [
        { text: site.name, type: "accent" },
        { text: `${site.role} @ ${site.education.school}`, type: "out" },
        { text: site.tagline, type: "out" },
        { text: `location: ${site.location} · status: ${site.availability}`, type: "dim" },
      ];

    case "projects":
      return [
        ...projects.map((p) => ({
          text: `  ▸ ${p.title} — ${p.tagline}  [${p.tech.slice(0, 3).join(", ")}]`,
          type: "out" as LineType,
        })),
        { text: "run `goto projects` or scroll down for full case studies →", type: "dim" },
      ];

    case "skills":
      return skillGroups.map((g) => ({
        text: `  ${g.category.padEnd(22)} ${g.skills.join(", ")}`,
        type: "out" as LineType,
      }));

    case "experience":
    case "exp":
      return timeline.map((t) => ({
        text: `  ${t.date.padEnd(20)} ${t.title} · ${t.org}`,
        type: "out" as LineType,
      }));

    case "certs":
      return certifications.map((c) => ({
        text: `  ▸ ${c.name} (${c.issuer}, ${c.date})`,
        type: "out" as LineType,
      }));

    case "blog":
      return [
        ...posts.map((p) => ({
          text: `  ▸ ${p.title} — ${p.date}`,
          type: "out" as LineType,
        })),
        { text: "run `goto blog` to read them →", type: "dim" },
      ];

    case "contact":
      return [
        { text: `  email     ${site.email}`, type: "out" },
        { text: `  github    ${site.social.github}`, type: "out" },
        { text: `  linkedin  ${site.social.linkedin}`, type: "out" },
        { text: "run `goto contact` to use the contact form →", type: "dim" },
      ];

    case "goto": {
      const target = sections.find((s) => s.id === arg || s.label.toLowerCase() === arg);
      if (!target) {
        return [
          { text: `goto: unknown section '${arg}'`, type: "err" },
          { text: `valid sections: ${sections.map((s) => s.id).join(", ")}`, type: "dim" },
        ];
      }
      // Defer the scroll so the output renders first
      setTimeout(() => {
        document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth" });
      }, 150);
      return [{ text: `→ scrolling to ${target.label.toLowerCase()}…`, type: "ok" }];
    }

    case "github":
      window.open(site.social.github, "_blank", "noopener,noreferrer");
      return [{ text: `opening ${site.social.github} …`, type: "ok" }];

    case "leetcode":
      window.open(site.social.leetcode, "_blank", "noopener,noreferrer");
      return [{ text: "opening leetcode profile…", type: "ok" }];

    case "codeforces":
      window.open(site.social.codeforces, "_blank", "noopener,noreferrer");
      return [{ text: "opening codeforces profile…", type: "ok" }];

    case "resume":
      setTimeout(() => {
        if (site.resumeUrl.startsWith("http")) {
          window.open(site.resumeUrl, "_blank", "noopener,noreferrer");
        } else {
          const a = document.createElement("a");
          a.href = site.resumeUrl;
          a.download = "";
          a.click();
        }
      }, 200);
      return [{ text: site.resumeUrl.endsWith(".pdf") ? "downloading resume.pdf …" : "opening resume …", type: "ok" }];

    case "theme": {
      const next = !document.documentElement.classList.contains("dark");
      document.documentElement.classList.toggle("dark", next);
      try {
        localStorage.setItem("theme", next ? "dark" : "light");
      } catch {}
      return [{ text: `theme switched to ${next ? "dark" : "light"} ✓`, type: "ok" }];
    }

    case "neofetch":
      return [
        { text: "  ╭─────╮    visitor@lakshya.dev", type: "accent" },
        { text: "  │ >_  │    ─────────────────────────", type: "accent" },
        { text: "  ╰─────╯    OS:       Next.js 16 (App Router)", type: "out" },
        { text: "            Shell:    portfolio-sh 2.1.0", type: "out" },
        { text: "            Theme:    emerald-on-zinc", type: "out" },
        { text: "            Host:     Vercel edge network", type: "out" },
        { text: "            Uptime:   since 2023 (VIT Bhopal)", type: "out" },
        { text: "            Coffee:   excessively consumed", type: "out" },
      ];

    case "ls":
      return [
        { text: "about.md   skills.json   projects/   experience.log", type: "out" },
        { text: "certs/   blog/   contact.txt   resume.pdf", type: "out" },
      ];

    case "pwd":
      return [{ text: "/home/visitor/lakshya-portfolio", type: "out" }];

    case "date":
      return [{ text: new Date().toString(), type: "out" }];

    case "echo":
      return [{ text: arg, type: "out" }];

    case "sudo":
      if (arg === "hire-me" || arg === "hire me") {
        // Easter egg — after the theatrics, jump to the contact form
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 2000);
        return [
          { text: "[sudo] password for visitor: ••••••••", type: "dim" },
          { text: "access granted. excellent decision. ✓", type: "ok" },
          { text: "initialising recruitment protocol…", type: "accent" },
          { text: "→ opening contact form in 3… 2… 1…", type: "accent" },
        ];
      }
      return [
        { text: `sudo: ${arg || ""}: command not found`, type: "err" },
        { text: "nice try. you're not root here — try `sudo hire-me`.", type: "warn" },
      ];

    case "rm":
      return [{ text: "rm: permission denied — this portfolio is immutable 😄", type: "warn" }];

    case "vim":
    case "emacs":
    case "nano":
      return [{ text: `${cmd}: exiting immediately. real devs use VS Code anyway.`, type: "dim" }];

    default:
      return [
        { text: `zsh: command not found: ${cmd}`, type: "err" },
        { text: "type `help` to see available commands.", type: "dim" },
      ];
  }
}

const ALL_COMMANDS = [
  "help", "whoami", "projects", "skills", "experience", "certs", "blog", "contact",
  "goto", "github", "leetcode", "codeforces", "resume", "theme", "neofetch", "ls",
  "pwd", "date", "echo", "sudo hire-me", "clear",
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function Terminal() {
  const [booted, setBooted] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Boot the welcome text the first time the terminal scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setBooted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (booted) setLines(BOOT_LINES);
  }, [booted]);

  /* Auto-focus on desktop when in view (never on touch devices) */
  useEffect(() => {
    if (!booted) return;
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isDesktop) return;
    const t = setTimeout(() => inputRef.current?.focus(), 400);
    return () => clearTimeout(t);
  }, [booted]);

  /* Keep the terminal scrolled to the latest output */
  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, input]);

  const submit = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      const promptLine: Line = { text: `visitor@lakshya:~$ ${trimmed}`, type: "cmd" };

      if (trimmed.toLowerCase() === "clear") {
        setLines([]);
        setInput("");
        setHistoryIndex(null);
        return;
      }

      const output = runCommand(trimmed);
      setLines((prev) => [...prev, promptLine, ...output]);
      if (trimmed) {
        setHistory((prev) => [...prev, trimmed]);
      }
      setInput("");
      setHistoryIndex(null);
    },
    [],
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(input);
    } else if (e.key === "ArrowUp") {
      // Walk backwards through command history
      e.preventDefault();
      if (history.length === 0) return;
      const next =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setInput(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      if (next >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(next);
        setInput(history[next]);
      }
    } else if (e.key === "Tab") {
      // Simple tab completion against known commands
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      if (!partial) return;
      const matches = ALL_COMMANDS.filter((c) => c.startsWith(partial));
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { text: `visitor@lakshya:~$ ${input}`, type: "cmd" },
          { text: matches.join("   "), type: "dim" },
        ]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  }

  return (
    <section id="terminal" ref={sectionRef} className="scroll-mt-24 py-20 md:py-28" aria-label="Interactive terminal">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {/* Window chrome */}
          <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0c] shadow-2xl shadow-black/40">
            <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/70 px-4 py-3">
              <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
              <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
              <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
              <span className="ml-3 font-mono text-xs text-zinc-500">
                visitor@lakshya.dev — zsh — interactive portfolio
              </span>
              <span className="ml-auto hidden font-mono text-[10px] text-zinc-600 sm:block">
                {history.length} commands run
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={containerRef}
              className="relative h-[380px] overflow-y-auto p-4 font-mono text-[13px] leading-relaxed sm:text-sm"
              onClick={() => inputRef.current?.focus()}
              role="log"
              aria-live="polite"
              aria-label="Terminal output"
            >
              {/* Command & output lines */}
              {lines.map((line, i) => (
                <p key={`line-${i}`} className={cn("whitespace-pre-wrap", LINE_COLORS[line.type])}>
                  {line.text || "\u00A0"}
                </p>
              ))}

              {/* Prompt row */}
              {booted && (
                <div className="flex items-baseline">
                  <span className="shrink-0 whitespace-pre text-emerald-400">
                    visitor@lakshya<span className="text-zinc-500">:~$ </span>
                  </span>
                  <span className="whitespace-pre-wrap break-all text-zinc-200">{input}</span>
                  <span className="ml-px inline-block h-[1.1em] w-[7px] translate-y-[2px] animate-blink bg-emerald-400" aria-hidden />
                </div>
              )}

              {/* Invisible input that captures keystrokes (tap anywhere to focus) */}
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="absolute inset-0 h-full w-full cursor-text bg-transparent text-transparent caret-transparent outline-none"
                aria-label="Terminal input — type a command"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </div>

          <p className="mt-3 text-center font-mono text-xs text-muted-foreground">
            psst — try <span className="text-accent">help</span>,{" "}
            <span className="text-accent">projects</span> or{" "}
            <span className="text-accent">sudo hire-me</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
