// HTML post-processing for rendered lecture MDX (used by Prose.astro and DocsShell.astro).
//
// processProse(html):
//   1. Coverage markers: [[L-0001 L-0002]] at the end of a paragraph, list item, heading, table cell or quote is
//      removed and its ids are added to that element's data-k attribute (scripts/coverage.mjs reads them).
//   2. h3 headings get an id (if missing), the hover "#" anchor link, and an optional rail label ([[rail: Short]]).
// extractToc(html): the page's sub-index (Section articles with their h2, and the h3s inside them).
// rewriteHashLinks(html, resolve): sends href="#id" to the page that holds the id (lectures are split into chapters).

const BLOCK = /<(p|li|h[1-6]|td|th|blockquote|figcaption|dd|dt|summary)(\s[^>]*)?>/gi;
const MARK = /\s*\[\[\s*((?:L-\d{4}[\s,]*)+)\]\]/g;

export const slug = (t: string) =>
  t.replace(/<[^>]+>/g, '').toLowerCase().replace(/&[a-z]+;|&#\d+;/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export function processProse(html: string): string {
  let out = html;
  for (;;) {
    const all = [...out.matchAll(MARK)];
    if (!all.length) break;
    const m = all[all.length - 1]; // last marker first, so earlier offsets stay valid
    const ids = m[1].trim().split(/[\s,]+/).join(' ');
    const before = out.slice(0, m.index);
    let last: RegExpExecArray | null = null, t: RegExpExecArray | null;
    BLOCK.lastIndex = 0;
    while ((t = BLOCK.exec(before))) last = t;
    out = out.slice(0, m.index) + out.slice(m.index! + m[0].length);
    if (!last) continue;
    const tag = last[0];
    const merged = /data-k="([^"]*)"/.test(tag)
      ? tag.replace(/data-k="([^"]*)"/, (_, v) => `data-k="${(v + ' ' + ids).trim()}"`)
      : tag.replace(/>$/, ` data-k="${ids}">`);
    out = out.slice(0, last.index) + merged + out.slice(last.index + tag.length);
  }
  const seen = new Set<string>();
  out = out.replace(/<h3(\s[^>]*)?>([\s\S]*?)<\/h3>/g, (all, attrs = '', inner) => {
    if (inner.includes('class="anchor"')) return all;
    // optional short label for the side rail: ### Long heading [[rail: Short]]
    const rail = /\s*\[\[rail:\s*([^\]]+)\]\]/.exec(inner);
    if (rail) { inner = inner.replace(rail[0], ''); attrs = attrs.replace(/\sid="[^"]*"/, '') + ` data-rail="${rail[1].trim()}"`; }
    let id = /\sid="([^"]+)"/.exec(attrs)?.[1];
    if (!id) { id = slug(inner); let n = 2; while (seen.has(id)) id = slug(inner) + '-' + n++; attrs += ` id="${id}"`; }
    else if (seen.has(id)) {
      // nested MDX files each slug their own headings, so two parts can produce the same id: keep ids unique on the page
      const base = id; let n = 2; while (seen.has(id)) id = base + '-' + n++;
      attrs = attrs.replace(/\sid="[^"]+"/, ` id="${id}"`);
    }
    seen.add(id);
    return `<h3${attrs}>${inner} <a class="anchor" href="#${id}" aria-label="Link to this heading">#</a></h3>`;
  });
  return out;
}

export interface TocHead { id: string; label: string }
export interface TocEntry { id: string; no: string; title: string; crumb: string; heads: TocHead[] }

const text = (h: string) => h.replace(/<a class="anchor"[\s\S]*?<\/a>/g, '').replace(/<[^>]+>/g, '')
  .replace(/&#x27;|&#39;/g, '’').replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim();
const attr = (tag: string, name: string) => new RegExp(`\\s${name}="([^"]*)"`).exec(tag)?.[1];

/** Section articles (h2) in page order, each with the h3s that follow it. h3s before the first section go to `lead`. */
export function extractToc(html: string): { sections: TocEntry[]; lead: TocHead[] } {
  const sections: TocEntry[] = [];
  const lead: TocHead[] = [];
  const re = /<article\b[^>]*\bclass="col section"[^>]*>|<h2\b[^>]*>([\s\S]*?)<\/h2>|<h3\b([^>]*)>([\s\S]*?)<\/h3>/g;
  let m: RegExpExecArray | null;
  let cur: TocEntry | null = null;
  while ((m = re.exec(html))) {
    if (m[0].startsWith('<article')) {
      const id = attr(m[0], 'id');
      if (!id) continue;
      cur = { id, no: attr(m[0], 'data-no') ?? '', title: '', crumb: attr(m[0], 'data-crumb') ?? '', heads: [] };
      sections.push(cur);
    } else if (m[0].startsWith('<h2')) {
      if (cur && !cur.title && attr(m[0], 'id') === 'h-' + cur.id) cur.title = text(m[1]);
    } else {
      const id = attr(m[2], 'id');
      if (!id) continue;
      const h = { id, label: attr(m[2], 'data-rail') ?? text(m[3]) };
      (cur ? cur.heads : lead).push(h);
    }
  }
  return { sections, lead };
}

/** Every id="…" in the HTML. */
export const idsIn = (html: string) => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));

/** Rewrite href="#x" whose target is not on this page: resolve(x) returns the URL of the page that has it, or null. */
export function rewriteHashLinks(html: string, resolve: (id: string) => string | null): string {
  const here = idsIn(html);
  return html.replace(/(\shref=")#([^"]+)"/g, (all, pre, hash) => {
    const id = decodeURIComponent(hash).replace(/\/step-\d+$/, '');
    if (here.has(id)) return all;
    const page = resolve(id);
    return page ? `${pre}${page}#${hash}"` : all;
  });
}
