import Link from "next/link";

const TABS = [
  { href: "/cv", label: "CV", color: "bg-stickyYellow" },
  { href: "/blog", label: "Blog", color: "bg-stickyBlue" },
  { href: "/lab-notes", label: "Lab Notes", color: "bg-stickyPink" },
  { href: "/contact", label: "Contact", color: "bg-label" },
];

export default function SiteNav({ current }: { current?: string }) {
  return (
    <nav aria-label="Sections" className="flex items-start gap-2 sm:gap-3">
      {TABS.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          className={`index-tab ${t.color} px-3 sm:px-5 pb-2 pt-1.5 font-mono text-xs sm:text-sm text-ink ${
            current === t.href ? "font-semibold underline underline-offset-4" : ""
          }`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}

export function PageHeader({ current }: { current?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/15 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-start justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="pt-3 font-mono text-sm font-semibold tracking-wide text-ink hover:text-string"
        >
          ← Prerit&nbsp;/ notebook
        </Link>
        <SiteNav current={current} />
      </div>
    </header>
  );
}
