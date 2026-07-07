import type { Metadata } from "next";
import { PageHeader } from "@/components/SiteNav";
import { SITE } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach me — email, GitHub, LinkedIn.",
};

const CHANNELS = [
  {
    label: "Email",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    note: "best for research, internships, collaborations",
    rotate: -1.2,
    color: "bg-stickyYellow",
  },
  {
    label: "GitHub",
    value: SITE.github.replace("https://", ""),
    href: SITE.github,
    note: "code, pipelines, half-finished experiments",
    rotate: 1.4,
    color: "bg-stickyBlue",
  },
  {
    label: "LinkedIn",
    value: SITE.linkedin.replace("https://www.", ""),
    href: SITE.linkedin,
    note: "the formal channel",
    rotate: -0.8,
    color: "bg-stickyPink",
  },
];

export default function ContactPage() {
  return (
    <main className="graph-paper min-h-screen">
      <PageHeader current="/contact" />
      <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <h1 className="font-mono text-3xl font-semibold text-ink">Correspondence</h1>
        <p className="mt-2 max-w-xl font-serif text-graphite">
          If something on the board overlaps with what you&apos;re working on —
          a lab, a fund, a company, or just an idea — I&apos;d genuinely like to
          hear about it.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.href}
              className={`sticky-note relative block p-4 pt-6 ${c.color} transition-transform hover:-translate-y-1`}
              style={{ transform: `rotate(${c.rotate}deg)` }}
            >
              <span className="pin" style={{ left: "calc(50% - 7px)", top: -6 }} />
              <p className="font-mono text-[10px] uppercase tracking-widest text-graphite/60">
                {c.label}
              </p>
              <p className="mt-1 break-words font-mono text-sm font-semibold text-ink">
                {c.value}
              </p>
              <p className="mt-2 font-hand text-lg leading-snug text-graphite">{c.note}</p>
            </a>
          ))}
        </div>

        <p className="margin-note mt-12">
          response time scales inversely with problem set load.
        </p>
      </div>
    </main>
  );
}
