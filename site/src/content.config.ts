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
  }),
});

export const collections = { lectures };
