import Link from "next/link";
import { PageHeader } from "@/components/SiteNav";

export default function NotFound() {
  return (
    <main className="graph-paper min-h-screen">
      <PageHeader />
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="font-mono text-6xl font-semibold text-ink">404</p>
        <p className="mt-4 font-serif text-graphite">
          This page was torn out of the notebook, or never written.
        </p>
        <p className="margin-note mt-2">— probably during finals week</p>
        <Link
          href="/"
          className="mt-8 inline-block border border-ink/40 bg-stickyYellow px-4 py-2 font-mono text-sm text-ink shadow-note"
        >
          back to the board
        </Link>
      </div>
    </main>
  );
}
