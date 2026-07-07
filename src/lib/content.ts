import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const SITE = {
  name: "Prerit",
  title: "Prerit — Laboratory Notebook",
  description:
    "The working notebook of a physicist-engineer at UC Berkeley: quantum computing experiments, neural quantum states, markets, and things built along the way.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com", // TODO: set your domain
  email: "you@example.com", // TODO: set your email
  github: "https://github.com/your-handle", // TODO
  linkedin: "https://www.linkedin.com/in/your-handle", // TODO
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

export function getPosts(section: "blog" | "lab-notes"): PostMeta[] {
  const dir = path.join(CONTENT_ROOT, section);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const { data } = matter(raw);
      return {
        slug: file.replace(/\.mdx?$/, ""),
        title: data.title ?? file,
        date: data.date ?? "",
        summary: data.summary ?? "",
        tags: (data.tags as string[]) ?? [],
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(section: "blog" | "lab-notes", slug: string) {
  const dir = path.join(CONTENT_ROOT, section);
  for (const ext of [".mdx", ".md"]) {
    const file = path.join(dir, slug + ext);
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, "utf8");
      const { data, content } = matter(raw);
      return { meta: data, content };
    }
  }
  return null;
}
