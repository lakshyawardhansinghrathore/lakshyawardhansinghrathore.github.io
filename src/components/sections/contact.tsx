"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Copy, Loader2, Mail, Send, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/brand-icons";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "success" | "error";
type Errors = Partial<Record<"name" | "email" | "message", string>>;

/** Client-side validation mirrors the server-side zod schema. */
function validate(name: string, email: string, message: string): Errors {
  const errors: Errors = {};
  if (name.trim().length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email.";
  if (message.trim().length < 10) errors.message = "Message should be at least 10 characters.";
  return errors;
}

const inputClasses = (invalid?: boolean) =>
  cn(
    "w-full rounded-lg border bg-background px-3.5 py-2.5 text-sm text-foreground transition-colors placeholder:text-muted-foreground/70",
    invalid ? "border-red-500/60 focus:border-red-500" : "border-border focus:border-accent",
  );

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", company: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate(form.name, form.email, form.message);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <section id="contact" className="scroll-mt-24 py-20 md:py-28" aria-label="Contact">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="10"
          title="Get in touch"
          description="Recruiting, collaborating, or just want to argue about tabs vs spaces? My inbox is open — I usually reply within a day."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
          {/* Direct channels */}
          <Reveal className="space-y-4">
            <button
              type="button"
              onClick={copyEmail}
              className="group flex w-full cursor-pointer items-center justify-between rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-accent-border/60 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-lg border border-accent-border/50 bg-accent-soft text-accent">
                  <Mail className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">{site.email}</p>
                </div>
              </div>
              {copied ? (
                <CheckCircle2 className="size-4 text-accent" aria-hidden />
              ) : (
                <Copy className="size-4 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden />
              )}
            </button>

            <a
              href={site.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-accent-border/60 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-lg border border-accent-border/50 bg-accent-soft text-accent">
                  <GithubIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">GitHub</p>
                  <p className="text-sm text-muted-foreground">@{site.githubUsername}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-accent">
                ↗
              </span>
            </a>

            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-card p-5 transition-all hover:border-accent-border/60 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-4">
                <span className="flex size-11 items-center justify-center rounded-lg border border-accent-border/50 bg-accent-soft text-accent">
                  <LinkedinIcon className="size-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">LinkedIn</p>
                  <p className="text-sm text-muted-foreground">
                    {site.social.linkedin.replace(/^https?:\/\/(www\.)?linkedin\.com\/?/, "") || "LinkedIn"}
                  </p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground transition-colors group-hover:text-accent">
                ↗
              </span>
            </a>

            <div className="rounded-xl border border-dashed border-border bg-card/50 p-5 text-sm text-muted-foreground">
              <p>
                Prefer email?{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-accent hover:underline">
                  {site.email}
                </a>{" "}
                works too — or run <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">contact</code>{" "}
                in the terminal above.
              </p>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={0.1}>
            <div className="rounded-xl border border-border bg-card p-6 sm:p-8">
              {status === "success" ? (
                <div className="flex h-full min-h-[24rem] flex-col items-center justify-center text-center">
                  <span className="flex size-14 items-center justify-center rounded-full border border-accent-border/50 bg-accent-soft text-accent">
                    <CheckCircle2 className="size-7" aria-hidden />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-foreground">
                    Message sent!
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                    Thanks for reaching out — it landed safely in my inbox (and my database). I&apos;ll
                    get back to you within a day.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-6"
                    onClick={() => {
                      setForm({ name: "", email: "", message: "", company: "" });
                      setStatus("idle");
                    }}
                  >
                    Send another
                  </Button>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate className="space-y-5">
                  <div>
                    <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="Ada Lovelace"
                      className={inputClasses(!!errors.name)}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "contact-name-error" : undefined}
                    />
                    {errors.name ? (
                      <p id="contact-name-error" className="mt-1.5 text-xs text-red-500">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="mb-1.5 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                      placeholder="ada@company.com"
                      className={inputClasses(!!errors.email)}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "contact-email-error" : undefined}
                    />
                    {errors.email ? (
                      <p id="contact-email-error" className="mt-1.5 text-xs text-red-500">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      placeholder="Hi Lakshyawardhan — we're hiring interns and your CampusFlow case study caught my eye…"
                      className={cn(inputClasses(!!errors.message), "resize-y")}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "contact-message-error" : undefined}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="mt-1.5 text-xs text-red-500">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  {/* Honeypot — invisible to humans, catnip for bots */}
                  <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                    <label htmlFor="contact-company">Company</label>
                    <input
                      id="contact-company"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.company}
                      onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    />
                  </div>

                  {status === "error" ? (
                    <div className="flex items-start gap-2.5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-500" role="alert">
                      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
                      <p>
                        Something went wrong sending your message. Please try again, or email me
                        directly at{" "}
                        <a href={`mailto:${site.email}`} className="font-medium underline">
                          {site.email}
                        </a>
                        .
                      </p>
                    </div>
                  ) : null}

                  <Button type="submit" size="lg" className="w-full" disabled={status === "sending"}>
                    {status === "sending" ? (
                      <>
                        <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
                      </>
                    ) : (
                      <>
                        Send message <Send className="size-4" aria-hidden />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
