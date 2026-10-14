// Links to other lectures, resolved from their MDX files on disk, so they work in isolated builds (VTB_ONLY), where
// the other lectures are not in the content collection. Only a lecture with `status: published` is linked.
// Used by the course navigation (lib/lecture.ts courseNav) and by <LectureLink> in lecture text.
// Server-side only (reads the file system at build time).
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'yaml';
import { url } from './url';

interface DiskLecture {
  id: string; title: string; status: string;
  contents: { no: string; title: string }[];
  chapters: { no: string; slug: string; summary?: string; parts: string[] }[];
}

const cache = new Map<string, DiskLecture | null>();
export function lectureOnDisk(id: string): DiskLecture | null {
  if (cache.has(id)) return cache.get(id)!;
  let out: DiskLecture | null = null;
  try {
    const src = fs.readFileSync(path.join(process.cwd(), 'src/content/lectures', id + '.mdx'), 'utf8');
    const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(src);
    const d = m ? parse(m[1]) : null;
    if (d && typeof d.title === 'string')
      out = { id, title: d.title, status: d.status ?? 'draft', contents: d.contents ?? [], chapters: d.chapters ?? [] };
  } catch { /* no such lecture */ }
  cache.set(id, out);
  return out;
}

export const isPublished = (id: string) => lectureOnDisk(id)?.status === 'published';

/** The page for a section of a published lecture: "s3-5" → its chapter page #s3-5, "s3" → the chapter page,
    nothing → the lecture overview. Undefined when the lecture isn't published; an unknown section is a build error. */
export function xlecHref(id: string, sec?: string): string | undefined {
  const l = lectureOnDisk(id);
  if (!l || l.status !== 'published') return undefined;
  if (!sec) return url(`lectures/${id}/`);
  const m = /^s(\d+)(?:-\d+)?$/.exec(sec);
  const ch = m && l.chapters.find((c) => c.no === m[1]);
  if (!ch) throw new Error(`xlecHref: lecture ${id} has no chapter for section ${sec}`);
  return url(`lectures/${id}/${ch.slug}/`) + (sec.includes('-') ? '#' + sec : '');
}
