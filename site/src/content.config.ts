// Lecture pages are MDX files in src/content/lectures/<id>.mdx (id = lec01 … lec10); each chapter's parts are MDX files
// in src/content/lectures/<id>/<part>.mdx (the `parts` collection, id "<lecture>/<part>").
// Isolated builds (the pipeline builds one lecture at a time while others are being written):
//   VTB_ONLY=lec02[,lec05]   load only these lectures (and their parts)
//   VTB_PARTS=s1-x,s2-y      load only these parts of them (chapters whose parts are not all loaded are skipped)
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const toc = z.object({
  no: z.string(),
  title: z.string(),
  href: z.string().optional(),
  children: z.array(z.object({ no: z.string(), title: z.string(), href: z.string().optional() })).optional(),
});

const list = (v?: string) => (v ?? '').split(',').map((x) => x.trim()).filter(Boolean);
export const ONLY = list(process.env.VTB_ONLY);
export const ONLY_PARTS = list(process.env.VTB_PARTS);
const lecturePattern = ONLY.length ? ONLY.map((id) => `${id}.mdx`) : '*.mdx';
const partPattern = ONLY.length
  ? ONLY.flatMap((id) => (ONLY_PARTS.length ? ONLY_PARTS.map((p) => `${id}/${p}.mdx`) : [`${id}/*.mdx`]))
  : '*/*.mdx';

const lectures = defineCollection({
  loader: glob({ pattern: lecturePattern, base: './src/content/lectures' }),
  schema: z.object({
    number: z.number().int().min(1).max(99).optional(), // shown number comes from lectures/course.json (position)
    title: z.string(), // the H1, e.g. "Medium under load"
    kicker: z.string(), // "Lecture 02 · week 1, day 2 · running case: Medium" (the "Lecture NN" is reset from course.json)
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

// chapter parts: rendered by src/pages/lectures/[id]/[chapter].astro (lib/lecture.ts loadPart)
const parts = defineCollection({
  loader: glob({ pattern: partPattern, base: './src/content/lectures', generateId: ({ entry }) => entry.replace(/\.mdx$/, '') }),
});

export const collections = { lectures, parts };
