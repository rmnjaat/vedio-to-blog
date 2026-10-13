// Lecture pages are MDX files in src/content/lectures/<id>.mdx (id = lec01 … lec10).
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const toc = z.object({
  no: z.string(),
  title: z.string(),
  href: z.string().optional(),
  children: z.array(z.object({ no: z.string(), title: z.string(), href: z.string().optional() })).optional(),
});

const lectures = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/lectures' }),
  schema: z.object({
    number: z.number().int().min(1).max(10),
    title: z.string(), // the H1, e.g. "Medium under load"
    kicker: z.string(), // "Lecture 01 · week 1, day 2 · running case: Medium"
    dek: z.string(),
    description: z.string(), // <meta name="description">
    reviewed: z.string().optional(), // "11 Oct 2026"
    status: z.enum(['draft', 'published']).default('draft'),
    contents: z.array(toc), // the lecture contents block; hrefs point at section ids (#s2-4)
    ledger: z.string().optional(), // path to the ledger, relative to the repo root (for coverage)
    // One page per chapter: /lectures/<id>/<slug>/. `no` matches a top-level `contents` item (its title is used);
    // `parts` are MDX files in src/content/lectures/<id>/ (without .mdx), rendered in order; `summary` is the
    // one-line summary on the lecture overview. Without `chapters`, the whole lecture body is one page.
    chapters: z.array(z.object({
      no: z.string(),
      slug: z.string().regex(/^[a-z0-9-]+$/),
      parts: z.array(z.string()).min(1),
      summary: z.string(),
    })).optional(),
  }),
});

export const collections = { lectures };
