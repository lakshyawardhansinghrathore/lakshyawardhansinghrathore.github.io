import { cn } from "@/lib/utils";

export interface ContributionDay {
  date: string;
  count: number;
  level: number; // 0–4
}

interface Week {
  monthLabel: string;
  days: (ContributionDay | null)[]; // null = padding before the first day
}

const LEVEL_CLASSES = [
  "bg-muted", // level 0 — no contributions
  "bg-emerald-900 dark:bg-emerald-950",
  "bg-emerald-700/80",
  "bg-emerald-500/90",
  "bg-emerald-400",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** Chunk a flat list of days into calendar weeks with month labels. */
function toWeeks(days: ContributionDay[]): Week[] {
  if (days.length === 0) return [];
  const weeks: Week[] = [];
  let current: (ContributionDay | null)[] = [];
  let lastMonth = -1;

  for (const day of days) {
    const d = new Date(day.date + "T00:00:00");
    const dow = d.getDay();

    // Pad the first week so day 0 (Sunday) is the first cell
    if (weeks.length === 0 && current.length === 0 && dow !== 0) {
      for (let i = 0; i < dow; i++) current.push(null);
    }

    if (dow === 0 && current.length > 0) {
      weeks.push({ monthLabel: "", days: current });
      current = [];
    }
    current.push(day);
    if (current.length === 7) {
      weeks.push({ monthLabel: "", days: current });
      current = [];
    }
  }
  if (current.length > 0) weeks.push({ monthLabel: "", days: current });

  // Label a week when its first real day starts a new month
  for (const week of weeks) {
    const first = week.days.find((d): d is ContributionDay => d !== null);
    if (first) {
      const m = new Date(first.date + "T00:00:00").getMonth();
      if (m !== lastMonth) {
        week.monthLabel = MONTHS[m];
        lastMonth = m;
      }
    }
  }
  return weeks;
}

export function ContributionGraph({ days }: { days: ContributionDay[] }) {
  const weeks = toWeeks(days);

  return (
    <div>
      <div className="overflow-x-auto pb-1">
        <div className="flex min-w-max gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              <span className="h-3.5 text-[9px] leading-3.5 text-muted-foreground">
                {week.monthLabel}
              </span>
              {week.days.map((day, di) =>
                day ? (
                  <div
                    key={di}
                    title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                    className={cn("size-[11px] rounded-[2px] transition-transform hover:scale-125", LEVEL_CLASSES[day.level])}
                  />
                ) : (
                  <div key={di} className="size-[11px] rounded-[2px] bg-transparent" />
                ),
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-2 flex items-center justify-end gap-1.5 text-[11px] text-muted-foreground">
        <span>Less</span>
        {LEVEL_CLASSES.map((c) => (
          <span key={c} className={cn("size-[11px] rounded-[2px]", c)} aria-hidden />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
