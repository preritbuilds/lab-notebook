import Link from "next/link";
import NotebookCover from "@/components/NotebookCover";
import ResearchBoard from "@/components/ResearchBoard";
import SiteNav from "@/components/SiteNav";
import { getPosts, SITE } from "@/lib/content";

export default function Home() {
  const latestNotes = getPosts("lab-notes").slice(0, 2);
  const latestPosts = getPosts("blog").slice(0, 2);

  return (
    <main>
      <NotebookCover />

      {/* ---------- the workspace ---------- */}
      <section id="workspace" className="graph-paper border-t border-ink/15 pb-20">
        <div className="mx-auto flex max-w-6xl items-start justify-between px-4 pt-0 sm:px-6">
          <div className="pt-5">
            <h2 className="font-mono text-xl font-semibold text-ink">
              The research board
            </h2>
            <p className="mt-1 max-w-xl font-serif text-sm text-graphite">
              A living wall of what&apos;s been built and what&apos;s currently
              rattling around. Red string means two things are secretly the same
              problem.
            </p>
          </div>
          <SiteNav />
        </div>

        <div className="mt-8 px-4 sm:px-6">
          <ResearchBoard />
        </div>

        {/* ---------- freshest pages torn from the notebook ---------- */}
        <div className="mx-auto mt-16 grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6">
          <RecentStack
            title="Latest lab notes"
            href="/lab-notes"
            items={latestNotes.map((p) => ({
              href: `/lab-notes/${p.slug}`,
              title: p.title,
              summary: p.summary,
              date: p.date,
            }))}
          />
          <RecentStack
            title="Latest from the blog"
            href="/blog"
            items={latestPosts.map((p) => ({
              href: `/blog/${p.slug}`,
              title: p.title,
              summary: p.summary,
              date: p.date,
            }))}
          />
        </div>
      </section>

      <footer className="border-t border-ink/15 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 font-mono text-xs text-graphite sm:px-6">
          <span>© {new Date().getFullYear()} Prerit · notebook № 04</span>
          <span>
            <Link href="/contact" className="underline decoration-dotted underline-offset-4 hover:text-string">
              correspondence
            </Link>
            {" · "}
            <a href={SITE.github} className="underline decoration-dotted underline-offset-4 hover:text-string">
              github
            </a>
          </span>
        </div>
      </footer>
    </main>
  );
}

function RecentStack({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { href: string; title: string; summary: string; date: string }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-graphite/80">
        {title}
      </h3>
      <div className="mt-4 space-y-4">
        {items.map((it, i) => (
          <Link
            key={it.href}
            href={it.href}
            className="block bg-white/85 p-4 shadow-note transition-transform hover:-translate-y-0.5"
            style={{ transform: `rotate(${i % 2 ? 0.6 : -0.6}deg)` }}
          >
            <p className="font-mono text-[11px] text-graphite/70">{it.date}</p>
            <p className="mt-1 font-mono text-sm font-semibold text-ink">{it.title}</p>
            <p className="mt-1 font-serif text-sm text-graphite">{it.summary}</p>
          </Link>
        ))}
      </div>
      <Link
        href={href}
        className="mt-4 inline-block font-mono text-xs text-string underline decoration-dotted underline-offset-4"
      >
        see all →
      </Link>
    </div>
  );
}
