import type { MetadataRoute } from "next";
import { getPosts, SITE } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/blog", "/lab-notes", "/cv", "/contact"].map((p) => ({
    url: `${SITE.url}${p}`,
    lastModified: new Date(),
  }));
  const blog = getPosts("blog").map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));
  const labNotes = getPosts("lab-notes").map((p) => ({
    url: `${SITE.url}/lab-notes/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : new Date(),
  }));
  return [...staticPages, ...blog, ...labNotes];
}
