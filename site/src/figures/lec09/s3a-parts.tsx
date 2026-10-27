// Lecture 07 (lec09), chapters 3 and 6: this lecture's extra glyphs (figures.md §0), thin wrappers around kit parts.
// The S3 bucket is a Cloud with a small bucket mark (the CDN cloud has none), the private-bucket lock, the photo's
// bytes as a small filled chip (drawn only where the bytes actually travel), a network card's bandwidth bar,
// a phone screen, a URL key tag and a chapter tag that links to the section covering a box.
import React from 'react';
import { Cloud, Label, Line, type Tone } from './kit';
import { chamferRect, ellipse, f, poly } from '../kit/hand';

/** S3 bucket: a cloud (the board draws S3/GCS as one) with a trapezoid bucket mark in its lower half. */
export function Bucket({ cx, cy, w = 96, h = 58, seed, label = 's3', size = 14, lock }: {
  cx: number; cy: number; w?: number; h?: number; seed: string; label?: string; size?: number; lock?: boolean;
}) {
  const by = cy + h * 0.08;
  return (
    <g>
      <Cloud cx={cx} cy={cy} w={w} h={h} seed={seed} />
      <Label kind="mono" x={cx} y={cy - h * 0.08} size={size}>{label}</Label>
      <Line pts={[[cx - 11, by], [cx + 11, by]]} weight="thin" seed={`${seed}-bt`} />
      <Line pts={[[cx - 11, by], [cx - 8, by + 12], [cx + 8, by + 12], [cx + 11, by]]} weight="thin" seed={`${seed}-bb`} />
      {lock && <Lock x={cx + w * 0.3} y={cy - h * 0.42} seed={`${seed}-lock`} />}
    </g>
  );
}

/** Private-bucket lock: a 12×9 body with a thin shackle arc above it. (x, y) = top-left of the body. */
export function Lock({ x, y, seed, tone = 'ink' }: { x: number; y: number; seed: string; tone?: Tone }) {
  return (
    <g>
      <path className={`${tone} fillpaper`} d={chamferRect(x, y, 12, 9, seed, 1.5)} />
      <path className={`${tone} thin`} d={ellipse(x + 6, y, 3.6, 4.6, `${seed}-s`, 'back')} />
    </g>
  );
}

/** The photo's bytes: a small chip filled with the marker tone. Only where the 5 MB actually travels. */
export function PhotoChip({ x, y, w = 14, h = 10, tone = 'blue', seed, faint }: {
  x: number; y: number; w?: number; h?: number; tone?: Tone; seed: string; faint?: boolean;
}) {
  const fill = tone === 'ink' ? 'dot' : `dot-${tone}`;
  return <path className={`${tone} ${fill}${faint ? ' faint' : ''}`} d={chamferRect(x, y, w, h, seed, 1.5)} />;
}

/** A network card's bandwidth gauge: an 80×10 box with a fill; red with a limit tick when `full`. */
export function BandwidthBar({ x, y, w = 80, level, full, seed }: { x: number; y: number; w?: number; level: number; full?: boolean; seed: string }) {
  const fw = Math.max(4, (w - 4) * Math.min(1, level));
  const tone: Tone = full ? 'red' : 'ink';
  return (
    <g>
      <path className="ink fillpaper" d={chamferRect(x, y, w, 10, seed, 1.5)} />
      <path className={`${tone} ${full ? 'dot-red' : 'dot'}`} d={chamferRect(x + 2, y + 2, fw, 6, `${seed}-f`, 1)} />
      {full && <path className="red heavy" d={poly([[x + w + 3, y - 4], [x + w + 3, y + 14]], `${seed}-c`)} />}
    </g>
  );
}

/** A phone screen: a tall chamfered box with a speaker slot. */
export function PhoneScreen({ x, y, w = 34, h = 64, seed }: { x: number; y: number; w?: number; h?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 6)} />
      <path className="ink thin" d={poly([[x + w / 2 - 7, y + 7], [x + w / 2 + 7, y + 7]], `${seed}-spk`)} />
    </g>
  );
}

/** URL key tag: a chamfered tag with a hole at its left end, holding a short text. */
export function KeyTag({ x, y, w, h = 22, seed, children, size = 13, kind = 'hand' }: {
  x: number; y: number; w: number; h?: number; seed: string; children: React.ReactNode; size?: number; kind?: 'hand' | 'mono';
}) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 6)} />
      <circle className="dot" cx={f(x + 8)} cy={f(y + h / 2)} r={2.2} />
      <Label kind={kind} anchor="start" x={x + 16} y={y + h / 2 + size * 0.36} size={size}>{children}</Label>
    </g>
  );
}

/** Section ids of this lecture. Links between chapters are plain #sN-M hrefs; the template routes them. */
const HREF: Record<string, string> = {
  '1': '#s1', '2': '#s2', '3': '#s3', '3.4': '#s3-4', '4': '#s4', '5.1': '#s5-1', '5.2': '#s5-2', '8.2': '#s8-2',
};

/** A chapter tag: mono, muted, a link to the section that covers the box. `href` overrides the lookup (ranges). */
export function ChTag({ x, y, no, href, anchor = 'middle', size = 14 }: {
  x: number; y: number; no: string; href?: string; anchor?: 'start' | 'middle' | 'end'; size?: number;
}) {
  return (
    <a href={href ?? HREF[no]} className="fig-tag">
      <Label kind="mono" muted anchor={anchor} x={x} y={y} size={size}>{`§${no}`}</Label>
    </a>
  );
}

/** Points along a quadratic arc from a to b, its middle lifted by `lift` (negative = up): the board's long upload
 *  arc, the one diagonal the architecture views keep. Feed it to Arrow/Line. */
export function arcPts(a: [number, number], b: [number, number], lift: number, n = 10): [number, number][] {
  const c: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + lift * 2];
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n, u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]] as [number, number];
  });
}

/** A small hand tick (✓), green by default: "not the problem", "accepted". */
export function Tick({ x, y, tone = 'green', seed }: { x: number; y: number; tone?: Tone; seed: string }) {
  return <Line pts={[[x, y], [x + 4, y + 5], [x + 12, y - 6]]} tone={tone} seed={seed} />;
}
