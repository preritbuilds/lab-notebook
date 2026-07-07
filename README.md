# Prerit's Laboratory Notebook

A personal site that behaves like a physicist's lab notebook: a buckram cover
that swings open as you scroll, a graph-paper research board with draggable
sticky notes joined by red string, a live double-pendulum "experiment," and
MDX-powered lab notes with equations and code.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS 3**
- **MDX** via `next-mdx-remote`, with `remark-math` + `rehype-katex`
  (equations) and `rehype-highlight` (code)
- Static rendering everywhere; the board is a client component that saves note
  positions to `localStorage`

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Editing content — no code required

| What | Where |
| --- | --- |
| Sticky notes, red string connections | `src/lib/board-data.ts` |
| Blog posts | `content/blog/*.mdx` |
| Lab notes | `content/lab-notes/*.mdx` |
| CV | replace `public/cv.pdf` |
| Name, email, domain, social links | `SITE` object in `src/lib/content.ts` |

### MDX frontmatter

```yaml
---
title: "Post title"
date: "2026-07-01"
summary: "One line shown in lists."
tags: ["quantum", "markets"]
status: "in progress"   # lab notes only, optional
---
```

Math: `$inline$` and `$$display$$` (KaTeX). Code fences get syntax
highlighting. Images: drop files in `public/` and use standard Markdown
`![alt](/image.png)`.

### Board notes

Each note in `board-data.ts` has a `section` (`built` | `thinking`), a title,
a one-liner, a color, a default position, and a fastener (`pin` or `tape`).
Connections are pairs of note ids with an optional handwritten label — that's
the red string. Visitor layouts are stored under the
`lab-board-positions-v1` localStorage key; bump the key name if you reshuffle
defaults and want everyone to see the new layout.

## Before you deploy

Search the repo for `TODO` — set your domain (`SITE.url`, used by the sitemap,
robots.txt, and OpenGraph tags), email, GitHub, and LinkedIn in
`src/lib/content.ts`. Then deploy anywhere Next.js runs (Vercel is
zero-config: `vercel deploy`).

## Included

- `sitemap.xml` and `robots.txt` (generated from content at build time)
- SVG favicon (`src/app/icon.svg`)
- Per-page SEO metadata + OpenGraph
- `prefers-reduced-motion` support (cover and pendulum degrade gracefully)
- Keyboard-visible focus states, 404 page
