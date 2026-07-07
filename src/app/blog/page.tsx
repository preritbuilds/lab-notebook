import type { Metadata } from "next";
import { PageHeader } from "@/components/SiteNav";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description: "Longer-form writing: essays, retrospectives, and opinions.",
};

export default function BlogIndex() {
  return (
    <main className="ruled-paper min-h-screen">
      <PageHeader current="/blog" />
      <PostList
        heading="Blog"
        blurb="Essays and retrospectives — the parts of the notebook written in full sentences."
        base="/blog"
        posts={getPosts("blog")}
      />
    </main>
  );
}
