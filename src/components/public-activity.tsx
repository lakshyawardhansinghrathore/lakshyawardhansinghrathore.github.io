"use client";

import { useEffect, useRef, useState } from "react";

interface EventDay { day: string; count: number }

// Public events are a bounded feed. Show observed days only, without implying
// that these events represent the user's complete contribution history.
export function PublicActivity({ username }: { username: string }) {
  const anchor = useRef<HTMLDivElement>(null);
  const [days, setDays] = useState<EventDay[]>([]);
  useEffect(() => {
    if (!anchor.current) return;
    const controller = new AbortController();
    async function load() {
      try {
        const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`, { signal: controller.signal });
        if (!response.ok) return;
        const events: unknown = await response.json();
        if (!Array.isArray(events)) return;
        const daily = new Map<string, number>();
        for (const event of events) {
          if (typeof event?.created_at !== "string" || !/^\d{4}-\d{2}-\d{2}T/.test(event.created_at)) continue;
          const day = event.created_at.slice(0, 10);
          daily.set(day, (daily.get(day) ?? 0) + 1);
        }
        if (!controller.signal.aborted) setDays(Array.from(daily, ([day,count]) => ({day,count})).sort((a,b)=>b.day.localeCompare(a.day)).slice(0,5));
      } catch { /* The repository links remain available when the feed is unavailable. */ }
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { observer.disconnect(); void load(); }
    });
    observer.observe(anchor.current);
    return () => { controller.abort(); observer.disconnect(); };
  }, [username]);
  const peak = Math.max(1,...days.map(item=>item.count));
  return <div ref={anchor} className="activity-chart">{days.length > 0 && <>
    <h3>Recent public activity</h3>
    <p>Active days in the latest public events returned by GitHub.</p>
    <ul>{days.map(({day,count}) => <li key={day}>
      <time dateTime={day}>{day}</time><i aria-hidden="true" style={{width: (count / peak * 100) + "%"}}/><span>{count} {count === 1 ? "event" : "events"}</span>
    </li>)}</ul>
  </>}</div>;
}
