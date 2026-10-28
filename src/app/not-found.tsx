import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, FolderGit2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "404 — command not found",
};

/** Terminal-styled 404 page. */
export default function NotFound() {
  return (
    <section className="flex min-h-[92vh] items-center justify-center px-4 py-32">
      <div className="w-full max-w-xl">
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#0a0a0c] font-mono text-[13px] shadow-2xl shadow-black/40 sm:text-sm">
          {/* Window chrome */}
          <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/70 px-4 py-3">
            <span className="size-3 rounded-full bg-[#ff5f57]" aria-hidden />
            <span className="size-3 rounded-full bg-[#febc2e]" aria-hidden />
            <span className="size-3 rounded-full bg-[#28c840]" aria-hidden />
            <span className="ml-3 text-xs text-zinc-500">zsh — 404</span>
          </div>

          <div className="space-y-1.5 p-5 leading-relaxed">
            <p className="text-zinc-500">
              <span className="text-emerald-400">visitor@lakshya</span>:~$ cd /the-page-you-wanted
            </p>
            <p className="text-red-400">zsh: no such file or directory: /the-page-you-wanted</p>
            <p className="text-zinc-500">
              <span className="text-emerald-400">visitor@lakshya</span>:~$ <span className="text-zinc-300">echo $?</span>
            </p>
            <p className="text-amber-400">404</p>
            <p className="pt-2 text-zinc-300">
              This page doesn&apos;t exist — maybe it never did, maybe it&apos;s in a branch that
              wasn&apos;t merged.
            </p>
            <p className="text-zinc-500">
              <span className="animate-blink text-emerald-400">▊</span>
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/" className={cn(buttonVariants())}>
            <ArrowLeft className="size-4" aria-hidden /> Back home
          </Link>
          <Link href="/#projects" className={cn(buttonVariants({ variant: "outline" }))}>
            <FolderGit2 className="size-4" aria-hidden /> Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}
