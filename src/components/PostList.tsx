import Link from "next/link";
import type { PostMeta } from "@/lib/content";

export default function PostList({
  heading,
  blurb,
  base,
  posts,
}: {
  heading: string;
  blurb: string;
  base: string;
  posts: PostMeta[];
}) {
  return (
    <div className="relative mx-auto max-w-3xl px-4 py-14 sm:px-6">
      <div className="absolute inset-y-0 left-0 hidden w-px bg-string/40 sm:block" />
      <h1 className="font-mono text-3xl font-semibold text-ink">{heading}</h1>
      <p className="mt-2 max-w-xl font-serif text-graphite">{blurb}</p>

      <ol className="mt-10 space-y-8">
        {posts.length === 0 && (
          <li className="font-serif italic text-graphite">
            Nothing here yet — add an <code>.mdx</code> file to{" "}
            <code>content{base}</code> and it will appear.
          </li>
        )}
        {posts.map((p) => (
          <li key={p.slug} className="group">
            <Link href={`${base}/${p.slug}`} className="block">
              <p className="font-mono text-xs text-graphite/70">{p.date}</p>
              <h2 className="mt-1 font-mono text-lg font-semibold text-ink underline decoration-dotted decoration-ink/40 underline-offset-4 group-hover:text-string">
                {p.title}
              </h2>
              <p className="mt-1 font-serif text-graphite">{p.summary}</p>
              {p.tags.length > 0 && (
                <p className="mt-2 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-ink/25 bg-white/70 px-2 py-0.5 font-mono text-[11px] text-graphite"
                    >
                      {t}
                    </span>
                  ))}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
