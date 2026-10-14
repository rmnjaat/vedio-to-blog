// The course: its lectures in course order, from ../lectures/course.json (repo root) when it exists.
// course.json is a list of { id, position, week, day, title, promise, ... }; `position` is the lecture's place in the
// course and the number shown everywhere ("Lecture 02"), whatever its folder id (lec01 is the course's 2nd lecture).
// Without course.json the order falls back to the lecture ids (lec01, lec02, … found under ../lectures/, else 10).
// A lecture without an MDX file shows as "coming soon". Server-side only (reads the file system at build time).
import fs from 'node:fs';
import path from 'node:path';

export const COURSE = {
  title: 'System design',
  subtitle: 'Ten lectures from a live cohort class, worked through on running cases: Medium, Slack and more.',
};

export interface CourseLecture {
  number: number; // position in the course (1-based)
  id: string; // folder id, e.g. lec01
  title?: string; // from course.json
  promise?: string;
  week?: number;
  day?: number;
}

const repo = path.resolve(process.cwd(), '..');
function load(): CourseLecture[] {
  try {
    const raw = JSON.parse(fs.readFileSync(path.join(repo, 'lectures', 'course.json'), 'utf8'));
    const list: any[] = Array.isArray(raw) ? raw : raw.lectures ?? [];
    const rows = list
      .filter((l) => l && typeof l.id === 'string')
      .map((l, i) => ({ id: l.id, pos: Number(l.position ?? l.order ?? l.number ?? i + 1), l }))
      .sort((a, b) => a.pos - b.pos);
    if (rows.length) return rows.map((r, i) => ({
      number: i + 1, id: r.id, title: r.l.title, promise: r.l.promise, week: r.l.week, day: r.l.day,
    }));
  } catch { /* no course.json (or unreadable): fall back to the ids */ }
  let ids: string[] = [];
  try { ids = fs.readdirSync(path.join(repo, 'lectures')).filter((d) => /^lec\d+$/.test(d)); } catch { /* none */ }
  if (!ids.length) ids = Array.from({ length: 10 }, (_, i) => `lec${String(i + 1).padStart(2, '0')}`);
  return ids.sort((a, b) => Number(a.slice(3)) - Number(b.slice(3))).map((id) => ({ number: Number(id.slice(3)), id }));
}

export const LECTURES: CourseLecture[] = load();
export const pad = (n: number) => String(n).padStart(2, '0');

/** The number shown for a lecture: its course position (falls back to the frontmatter number, then the id). */
export function numberOf(id: string, fallback?: number): number {
  return LECTURES.find((l) => l.id === id)?.number ?? fallback ?? Number(id.replace(/\D/g, ''));
}
/** A frontmatter kicker with its leading "Lecture NN" set to the course number. */
export function kickerOf(id: string, kicker: string, fallback?: number): string {
  return kicker.replace(/^Lecture\s+\d+/, `Lecture ${pad(numberOf(id, fallback))}`);
}
