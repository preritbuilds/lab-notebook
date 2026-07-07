import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Mdx from "@/components/Mdx";
import { PageHeader } from "@/components/SiteNav";
import { getPost, getPosts } from "@/lib/content";

export function generateStaticParams() {
  return getPosts("blog").map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPost("blog", params.slug);
  if (!post) return {};
  return {
    title: String(post.meta.title ?? params.slug),
    description: String(post.meta.summary ?? ""),
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost("blog", params.slug);
  if (!post) notFound();
  return (
    <main className="ruled-paper min-h-screen">
      <PageHeader current="/blog" />
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <p className="font-mono text-xs text-graphite/70">{String(post.meta.date ?? "")}</p>
        <h1 className="mt-2 font-mono text-3xl font-semibold text-ink">
          {String(post.meta.title ?? params.slug)}
        </h1>
        <div className="mt-8">
          <Mdx source={post.content} />
        </div>
      </article>
    </main>
  );
}
