import type { Metadata } from "next";
import { PageHeader } from "@/components/SiteNav";
import PostList from "@/components/PostList";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Lab Notes",
  description:
    "Technical working notes — derivations, code, equations, and experiments in progress.",
};

export default function LabNotesIndex() {
  return (
    <main className="ruled-paper min-h-screen">
      <PageHeader current="/lab-notes" />
      <PostList
        heading="Lab Notes"
        blurb="Working notes with equations and code. Less polished than the blog, closer to the bench."
        base="/lab-notes"
        posts={getPosts("lab-notes")}
      />
    </main>
  );
}
