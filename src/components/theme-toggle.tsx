"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Theme switcher. Dark is the default (set by the inline script in layout.tsx);
 * this toggle flips the `.dark` class on <html> and persists the choice.
 */
function readTheme() { return document.documentElement.classList.contains("dark"); }

function observeTheme(update: () => void) {
  const observer = new MutationObserver(update);
  observer.observe(document.documentElement, {attributes: true, attributeFilter: ["class"]});
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const isDark = useSyncExternalStore(observeTheme, readTheme, () => true);

  function toggle() {
    const next = !isDark;

    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — ignore */
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {/* Render both icons; CSS hides the inactive one to avoid hydration flicker */}
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="block size-4 dark:hidden" aria-hidden />
    </Button>
  );
}
