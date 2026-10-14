// Lecture 09 (lec07): the kit's Fig with a text-size floor, so every label stays >= 12px on screen at every
// width the gates check (FIGURES.md rule 3). Added by the assembler, as lec06/floor.tsx: the figures were written at
// the kit's 12.5-14 sizes, which hold at 390 and 1440 but drop to ~11px where the column is narrowest:
//   - a phone layout (<= 360 units) is drawn ~302px wide at a 360px viewport (rule-box sketches ~290px);
//   - a desk layout wider than the ~711px column at 768 is scaled down (880 units -> 0.81), so it needs 12.1 * w / 711.
// Every <text> the children render (Label, and the text inside Box, Cyl, Pipe, Worker, Num, local parts …) is raised
// to the floor; nothing is moved or shrunk. Pass `minText` where a figure sits in a narrower frame (a MarginNote).
// Chapter 2's figures use their own floor (s2-one-node-parts.tsx) and do not import this.
// `halo` (design fixer, as lec06/floor.tsx): for step-throughs, a knockout group of paper boxes before each <Step>,
// one behind each of its labels, so a lifeline behind a label is interrupted instead of striking through it (a stroke
// halo on the text doesn't paint with these variable fonts). Same data-step, inline opacity 1 so it stays opaque past.
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Fig as KitFig, Step } from '../kit/Kit';

const TEXT_RE = /<text\b([^>]*)>([^<]*)<\/text>/g;
const attr = (a: string, k: string) => a.match(new RegExp(`\\b${k}="([^"]*)"`))?.[1];

function boxes(markup: string, floor: number): string {
  const out: string[] = [];
  for (const [, a, raw] of markup.matchAll(TEXT_RE)) {
    if (attr(a, 'transform')) continue; // rotated labels (the time axis) sit off the lanes
    const x = Number(attr(a, 'x')), y = Number(attr(a, 'y')), size = Math.max(Number(attr(a, 'font-size')), floor);
    const text = raw.replace(/&[^;]+;/g, '_').trim();
    if (!text || !Number.isFinite(x) || !Number.isFinite(y)) continue;
    const w = text.length * size * (/t-mono/.test(attr(a, 'class') ?? '') ? 0.6 : 0.58) + 6;
    const anchor = attr(a, 'text-anchor') ?? 'start';
    const x0 = anchor === 'middle' ? x - w / 2 : anchor === 'end' ? x - w + 3 : x - 3;
    out.push(`<rect x="${x0.toFixed(1)}" y="${(y - size * 0.86).toFixed(1)}" width="${w.toFixed(1)}" height="${(size * 1.14).toFixed(1)}" rx="2" class="fillpaper"></rect>`);
  }
  return out.join('');
}

function knockout(children: React.ReactNode, floor: number): React.ReactNode {
  return React.Children.map(children, (c) => {
    if (!React.isValidElement(c) || c.type !== Step) return c;
    const { n, children: inner } = c.props as { n: number; children: React.ReactNode };
    return [
      <g key={`ko${n}`} className="step ko" data-step={n} aria-hidden="true" style={{ opacity: 1 }}
        dangerouslySetInnerHTML={{ __html: boxes(renderToStaticMarkup(<>{inner}</>), floor) }} />,
      c,
    ];
  });
}

const isRule = (id: string) => /rule|-r\d/.test(id);

export function floorFor(id: string, w: number) {
  if (w <= 360) return Math.max(12.5, Math.ceil((121 * w) / (isRule(id) ? 290 : 302)) / 10);
  return Math.max(12.5, Math.ceil((121 * w) / 711) / 10);
}

export function Fig({ minText, halo, children, ...rest }: Parameters<typeof KitFig>[0] & { minText?: number; halo?: boolean }) {
  const floor = minText ?? floorFor(rest.id, rest.w);
  const html = renderToStaticMarkup(<>{halo ? knockout(children, floor) : children}</>).replace(/font-size="([\d.]+)"/g,
    (_m, v: string) => `font-size="${Math.max(parseFloat(v), floor)}"`);
  return <KitFig {...rest}><g dangerouslySetInnerHTML={{ __html: html }} /></KitFig>;
}
