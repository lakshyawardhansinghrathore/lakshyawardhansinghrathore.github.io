import { BadgeCheck, Cloud, Code2, ExternalLink, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { certifications } from "@/content/certifications";

const ICONS = {
  cloud: Cloud,
  code: Code2,
  shield: ShieldCheck,
} as const;

export function Certifications() {
  return (
    <section id="certifications" className="scroll-mt-24 py-20 md:py-28" aria-label="Certifications">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="07"
          title="Certifications"
          description="Credentials with verification links — no participation trophies, promise."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {certifications.map((cert, i) => {
            const Icon = ICONS[cert.icon as keyof typeof ICONS] ?? BadgeCheck;
            return (
              <Reveal key={cert.name} delay={(i % 2) * 0.06}>
                <div className="group flex h-full items-start gap-4 rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:border-accent-border/60 hover:shadow-lg hover:shadow-accent/5">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-accent-border/50 bg-accent-soft text-accent">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display font-semibold leading-snug text-foreground">
                      {cert.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {cert.issuer} · {cert.date}
                    </p>
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 inline-flex items-center gap-1 text-xs font-medium text-accent transition-all hover:gap-1.5"
                    >
                      Verify credential <ExternalLink className="size-3" aria-hidden />
                    </a>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
