// Lecture pages: chapters, the course navigation, and where each id lives (for links across chapter pages).
import fs from 'node:fs';
import path from 'node:path';
import { getCollection, getEntry, render, type CollectionEntry } from 'astro:content';
import { LECTURES, pad, numberOf } from '../data/course';
import { url } from './url';
import { lectureOnDisk } from './xlec';

export type Lecture = CollectionEntry<'lectures'>;

export interface Chapter {
  no: string; slug: string; title: string; summary: string; parts: string[];
  href: string; // page URL (base-aware)
  sections: { no: string; title: string; href?: string }[]; // from `contents`
}

// the MDX parts of every lecture: src/content/lectures/<id>/<part>.mdx (the `parts` collection, id "<id>/<part>")
export async function loadPart(lectureId: string, part: string) {
  const entry = await getEntry('parts', `${lectureId}/${part}`);
  if (!entry) throw new Error(`lecture ${lectureId}: chapter part not found: src/content/lectures/${lectureId}/${part}.mdx`);
  return (await render(entry)).Content;
}
// isolated build with VTB_PARTS: only chapters whose parts are all loaded get a page
const ONLY_PARTS = (process.env.VTB_PARTS ?? '').split(',').map((x) => x.trim()).filter(Boolean);

export const lectureHref = (id: string) => url(`lectures/${id}/`);

export function chaptersOf(entry: Lecture): Chapter[] {
  const d = entry.data;
  return (d.chapters ?? []).filter((c) => !ONLY_PARTS.length || c.parts.every((p) => ONLY_PARTS.includes(p))).map((c) => {
    const item = d.contents.find((x) => x.no === c.no);
    if (!item) throw new Error(`lecture ${entry.id}: chapter ${c.no} has no item in contents`);
    return {
      no: c.no, slug: c.slug, title: item.title, summary: c.summary, parts: c.parts,
      href: url(`lectures/${entry.id}/${c.slug}/`),
      sections: (item.children ?? []).map((s) => ({ no: s.no, title: s.title, href: s.href })),
    };
  });
}

/** Every id="…" attribute written in a chapter's MDX parts (Section, Figure, StepThrough, … ids). */
export function partIds(lectureId: string, parts: string[]): string[] {
  const out: string[] = [];
  for (const part of parts) {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/content/lectures', lectureId, part + '.mdx'), 'utf8');
    for (const m of src.matchAll(/\bid=["']([A-Za-z][\w-]*)["']/g)) out.push(m[1]);
  }
  return out;
}

/** id -> chapter slug: the ids written in each chapter's parts, plus s<no> for each chapter. */
export function idMap(entry: Lecture): Map<string, string> {
  const map = new Map<string, string>();
  for (const c of entry.data.chapters ?? []) {
    map.set('s' + c.no, c.slug);
    for (const id of partIds(entry.id, c.parts)) if (!map.has(id)) map.set(id, c.slug);
  }
  return map;
}

/** Resolver for rewriteHashLinks on a page of this lecture. "#toc" is the overview's chapter list. */
export function resolver(entry: Lecture) {
  const map = idMap(entry);
  return (id: string) => {
    if (id === 'toc') return lectureHref(entry.id);
    const slug = map.get(id);
    return slug ? url(`lectures/${entry.id}/${slug}/`) : null;
  };
}

export interface NavLecture { number: number; id: string; label: string; title?: string; href?: string; chapters?: Chapter[] }

/** The course's lectures in course order (lectures/course.json) for the navigation; a lecture without an MDX file
    is "coming soon" (in an isolated build, so is one outside the build unless it is published). The number shown is the course position. */
export async function courseNav(): Promise<NavLecture[]> {
  const written = new Map((await getCollection('lectures')).map((e) => [e.id, e]));
  const ids = new Set(LECTURES.map((l) => l.id));
  const extra = [...written.keys()].filter((id) => !ids.has(id)).sort().map((id) => ({ id, number: numberOf(id, written.get(id)?.data.number), title: undefined as string | undefined }));
  return [...LECTURES, ...extra].map((l) => {
    const e = written.get(l.id);
    // isolated build (VTB_ONLY): a lecture outside the build that is published still links (read from its MDX file)
    const d = !e ? lectureOnDisk(l.id) : null;
    if (d && d.status === 'published') return {
      number: l.number, id: l.id, label: `Lecture ${pad(l.number)}`, title: d.title, href: lectureHref(l.id),
      chapters: d.chapters.map((c) => ({
        no: c.no, slug: c.slug, title: d.contents.find((x) => x.no === c.no)?.title ?? c.slug, summary: c.summary ?? '',
        parts: c.parts, href: url(`lectures/${l.id}/${c.slug}/`), sections: [],
      })),
    };
    return {
      number: l.number, id: l.id, label: `Lecture ${pad(l.number)}`,
      title: e?.data.title ?? l.title, href: e ? lectureHref(l.id) : undefined, chapters: e ? chaptersOf(e) : undefined,
    };
  });
}

/** Reading order across the course: each lecture's overview, then its chapters. Unwritten lectures stay in the
    order (without a link), so the last chapter of a lecture points to the next lecture even when it is coming soon. */
export interface Stop { href?: string; kind: 'lecture' | 'chapter'; lecture: string; title: string }
export function readingOrder(nav: NavLecture[]): Stop[] {
  const out: Stop[] = [];
  for (const l of nav) {
    out.push({ href: l.href, kind: 'lecture', lecture: l.id, title: l.href ? `${l.label} · ${l.title}` : `${l.label}${l.title ? ` · ${l.title}` : ''} · coming soon` });
    for (const c of l.chapters ?? []) out.push({ href: c.href, kind: 'chapter', lecture: l.id, title: `${c.no} · ${c.title}` });
  }
  return out;
}

/** Previous and next stop around the page at `href`, with their labels. */
export function around(nav: NavLecture[], href: string) {
  const order = readingOrder(nav);
  const i = order.findIndex((s) => s.href === href);
  const me = order[i];
  const label = (s: Stop, dir: 'prev' | 'next') =>
    s.kind === 'chapter' ? (dir === 'prev' ? 'Previous chapter' : 'Next chapter')
      : s.lecture === me.lecture ? 'Lecture overview' : dir === 'prev' ? 'Previous lecture' : 'Next lecture';
  const prev = i > 0 && order[i - 1].href ? { ...order[i - 1], label: label(order[i - 1], 'prev') } : undefined;
  const next = order[i + 1] ? { ...order[i + 1], label: label(order[i + 1], 'next') } : undefined;
  return { prev, next };
}
