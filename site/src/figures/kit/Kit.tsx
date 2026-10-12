// The figure kit: every page figure is built from these parts and nothing else.
// Pure React, no hooks, no state: rendered to static SVG at build time (no client JS).
// Colours come from CSS custom properties via classes, so figures follow the Paper/Blackboard theme.
// See site/FIGURES.md for the rules.
import React from 'react';
import { chamferRect, chevron, cylinder, dir, ellipse, f, poly, roundRect, seg, tube, type Pt } from './hand';

export type Tone = 'ink' | 'blue' | 'red' | 'green';
export type Weight = 'thin' | 'regular' | 'heavy';
export type { Pt };

/** Smallest label size in figure units. With figures authored ~1:1 this is the on-screen floor. */
export const MIN_TEXT = 12.5;
export const TEXT = { small: 12.5, label: 14, mono: 14, title: 17, num: 12.5 } as const;
const HEAD = { thin: 7, regular: 8, heavy: 12 } as const;

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(' ');

/* ------------------------------------------------------------------ sheet */

/** The SVG element of a figure. `id` must be unique on the page (used for title/desc ids). */
export function Fig({ id, w, h, title, desc, className, children, label }: {
  id: string; w: number; h: number; title: string; desc: string; className?: string; children: React.ReactNode;
  /** set false for decorative glyphs inside other text (aria-hidden) */ label?: boolean;
}) {
  if (label === false)
    return <svg className={cx('fig-svg', className)} viewBox={`0 0 ${w} ${h}`} aria-hidden="true" focusable="false">{children}</svg>;
  return (
    // One scale for every figure: never wider than its viewBox, so 1 unit = 1 CSS px at most (FIGURES.md rule 1).
    <svg className={cx('fig-svg', className)} viewBox={`0 0 ${w} ${h}`} role="img" aria-labelledby={`${id}-t ${id}-d`} data-fig={id}
      style={{ maxWidth: `${w}px` }}>
      <title id={`${id}-t`}>{title}</title>
      <desc id={`${id}-d`}>{desc}</desc>
      {children}
    </svg>
  );
}

/** A group revealed by StepThrough. Steps are numbered from 1. */
export function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return <g className="step" data-step={n}>{children}</g>;
}

/* ------------------------------------------------------------------ text */

export function Label({ x, y, children, size, kind = 'hand', tone, muted, anchor = 'middle', rotate, className }: {
  x: number; y: number; children: React.ReactNode; size?: number;
  /** hand = annotation, mono = identifiers/SQL/sizes, title = panel title (under the drawing), num = numerals */
  kind?: 'hand' | 'mono' | 'title' | 'num'; tone?: Tone; muted?: boolean;
  anchor?: 'start' | 'middle' | 'end'; rotate?: number; className?: string;
}) {
  const s = Math.max(MIN_TEXT, size ?? (kind === 'title' ? TEXT.title : kind === 'num' ? TEXT.num : TEXT.label));
  return (
    <text
      className={cx(`t-${kind}`, tone && tone !== 'ink' && tone, muted && 'muted', className)}
      x={f(x)} y={f(y)} textAnchor={anchor} fontSize={s}
      transform={rotate ? `rotate(${rotate} ${f(x)} ${f(y)})` : undefined}
    >{children}</text>
  );
}

/* ------------------------------------------------------------------ lines and arrows */

function strokeClass(tone: Tone, weight: Weight) {
  return cx(tone, weight !== 'regular' && weight);
}

/** A hand line through orthogonal points (no head). */
export function Line({ pts, tone = 'ink', dashed, dotted, weight = 'regular', seed, className }: {
  pts: Pt[]; tone?: Tone; dashed?: boolean; dotted?: boolean; weight?: Weight; seed: string; className?: string;
}) {
  return <path className={cx(strokeClass(tone, weight), className)} d={poly(pts, seed)}
    strokeDasharray={dashed ? '6 5' : dotted ? '2 4' : undefined} />;
}

/**
 * Arrow along `pts` (route it orthogonally in architecture views; diagonals only in time-sequence views).
 * tone: blue = request / data path, green = ack / success, red = failure / stale / timeout, ink = everything else.
 * dashed = asynchronous (replication, queues). The head sits on the INITIATOR's direction: draw a pull
 * from the puller to the source.
 */
export function Arrow({ pts, tone = 'ink', dashed, weight = 'regular', head = 'end', seed, className }: {
  pts: Pt[]; tone?: Tone; dashed?: boolean; weight?: Weight; head?: 'end' | 'start' | 'both' | 'none'; seed: string; className?: string;
}) {
  const sc = strokeClass(tone, weight);
  const size = HEAD[weight];
  const heads: string[] = [];
  if (head === 'end' || head === 'both') {
    const [ux, uy] = dir(pts[pts.length - 2], pts[pts.length - 1]);
    heads.push(chevron(pts[pts.length - 1], ux, uy, size, seed + 'he'));
  }
  if (head === 'start' || head === 'both') {
    const [ux, uy] = dir(pts[1], pts[0]);
    heads.push(chevron(pts[0], ux, uy, size, seed + 'hs'));
  }
  return (
    <g className={cx('arrow', className)}>
      <path className={sc} d={poly(pts, seed)} strokeDasharray={dashed ? '6 5' : undefined} />
      {heads.map((d, i) => <path key={i} className={cx(sc, 'head')} d={d} />)}
    </g>
  );
}

/* ------------------------------------------------------------------ shapes */

/** Service / API server: chamfered box, name in mono. */
export function Box({ x, y, w, h, label, sub, seed, tone = 'ink', faint, labelSize = TEXT.mono }: {
  x: number; y: number; w: number; h: number; label?: string; sub?: string; seed: string; tone?: Tone; faint?: boolean; labelSize?: number;
}) {
  const ly = sub ? y + h / 2 - 2 : y + h / 2 + labelSize * 0.36;
  return (
    <g>
      <path className={cx(tone, 'shape', faint && 'faint')} d={chamferRect(x, y, w, h, seed)} />
      {label && <Label kind="mono" x={x + w / 2} y={ly} size={labelSize}>{label}</Label>}
      {sub && <Label kind="mono" muted x={x + w / 2} y={y + h / 2 + 15} size={TEXT.small}>{sub}</Label>}
    </g>
  );
}

/** A fleet of identical servers: n-1 faint copies offset behind the front one, plus "×n". */
export function Fleet({ x, y, w, h, n, label, seed, tone = 'ink', countLabel = true, size = TEXT.label }: {
  x: number; y: number; w: number; h: number; n: number; label?: string; seed: string; tone?: Tone; countLabel?: boolean; size?: number;
}) {
  const back = Math.min(2, n - 1);
  return (
    <g>
      {Array.from({ length: back }, (_, i) => {
        const o = (back - i) * 14;
        return <path key={i} className="ink shape faint" d={chamferRect(x + o, y - o, w, h, `${seed}-b${i}`)} />;
      })}
      <Box x={x} y={y} w={w} h={h} label={label} seed={seed} tone={tone} labelSize={size} />
      {countLabel && <Label x={x + w / 2} y={y + h + size + 12} size={size}>{`×${n} servers`}</Label>}
    </g>
  );
}

/** Database cylinder. `dashed` = replica (always label it). The label sits under the drawing. */
export function Cyl({ cx: x, top, rx, ry, h, seed, tone = 'ink', dashed, label, sub }: {
  cx: number; top: number; rx: number; ry?: number; h: number; seed: string; tone?: Tone; dashed?: boolean; label?: string; sub?: string;
}) {
  const ery = ry ?? Math.max(4, rx * 0.26);
  const c = cylinder(x, top, rx, ery, h, seed);
  const da = dashed ? '5 4' : undefined;
  const base = top + h + ery;
  return (
    <g className="cyl">
      <path className={cx(tone, 'shape')} d={c.body} strokeDasharray={da} />
      <path className={cx(tone, 'shape')} d={c.top} strokeDasharray={da} />
      {label && <Label kind="mono" x={x} y={base + 18} size={TEXT.mono}>{label}</Label>}
      {sub && <Label muted x={x} y={base + 35} size={TEXT.small}>{sub}</Label>}
    </g>
  );
}

/** Read replica: a dashed cylinder. */
export function Replica(props: Omit<Parameters<typeof Cyl>[0], 'dashed'>) {
  return <Cyl {...props} dashed />;
}

/** Load balancer: narrow vertical bar, "lb" written above it. */
export function LoadBalancer({ x, y, w = 24, h, seed, label = 'lb', size = TEXT.mono }: { x: number; y: number; w?: number; h: number; seed: string; label?: string; size?: number }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} />
      <Label kind="mono" x={x + w / 2} y={y - 10} size={size}>{label}</Label>
    </g>
  );
}

/** Cache: a box with a key | value table inside. */
export function Cache({ x, y, w, h, label = 'cache', seed, rows = 2 }: { x: number; y: number; w: number; h: number; label?: string; seed: string; rows?: number }) {
  const ix = x + 10, iw = w - 20, iy = y + 28, ih = h - 38;
  const lines: React.ReactNode[] = [];
  for (let i = 1; i < rows + 1; i++) {
    const yy = iy + (ih / (rows + 1)) * i;
    lines.push(<path key={'r' + i} className="ink thin" d={poly([[ix, yy], [ix + iw, yy]], `${seed}-r${i}`)} />);
  }
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} />
      <Label kind="mono" x={x + w / 2} y={y + 19}>{label}</Label>
      <path className="ink thin" d={chamferRect(ix, iy, iw, ih, seed + 'in', 2)} />
      <path className="ink thin" d={poly([[ix + iw * 0.4, iy], [ix + iw * 0.4, iy + ih]], seed + 'v')} />
      {lines}
    </g>
  );
}

/** Queue: a long box divided into cells; the oldest message leaves on the right. `filled` cells get a dot. */
export function Queue({ x, y, w, h, cells = 5, filled = 0, label, seed }: { x: number; y: number; w: number; h: number; cells?: number; filled?: number; label?: string; seed: string }) {
  const cw = w / cells;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed)} />
      {Array.from({ length: cells - 1 }, (_, i) => (
        <path key={i} className="ink thin" d={poly([[x + cw * (i + 1), y + 4], [x + cw * (i + 1), y + h - 4]], `${seed}-c${i}`)} />
      ))}
      {Array.from({ length: filled }, (_, i) => (
        <circle key={'d' + i} className="dot" cx={f(x + w - cw * (i + 0.5))} cy={f(y + h / 2)} r={3.2} />
      ))}
      {label && <Label kind="mono" x={x + w / 2} y={y + h + 18}>{label}</Label>}
    </g>
  );
}

/** Pipe / stream: a horizontal tube. */
export function Pipe({ x, cy: y, w, ry = 14, label, seed }: { x: number; cy: number; w: number; ry?: number; label?: string; seed: string }) {
  const t = tube(x, y, w, ry, ry * 0.35, seed);
  return (
    <g>
      <path className="ink shape" d={t.body} />
      <path className="ink shape" d={t.cap} />
      {label && <Label kind="mono" x={x + w / 2} y={y + ry + 18}>{label}</Label>}
    </g>
  );
}

/** Worker / consumer: a round-cornered box with a small loop mark (it keeps pulling work). */
export function Worker({ x, y, w, h, label = 'worker', seed, size = TEXT.mono }: { x: number; y: number; w: number; h: number; label?: string; seed: string;
  /** label size in units: raise it when the figure is shown below 1:1 (e.g. a wide figure at 768px) so it stays >= 12px */ size?: number }) {
  const lx = x + w - 14, ly = y + 13, lr = 6;
  // three-quarter circle ending at the top, with a small head pointing right (a loop that keeps running)
  const loop = `M${f(lx - lr)} ${f(ly)}A${lr} ${lr} 0 1 0 ${f(lx)} ${f(ly - lr)}`;
  return (
    <g>
      <path className="ink shape" d={roundRect(x, y, w, h, 9, seed)} />
      <path className="ink thin" d={loop} />
      <path className="ink thin" d={chevron([lx, ly - lr], -1, 0, 4, seed + 'lh')} />
      {/* centred in the space left of the loop mark, so a long name never runs into it */}
      {label && <Label kind="mono" x={x + (w - 16) / 2} y={y + h / 2 + size * 0.36} size={size}>{label}</Label>}
    </g>
  );
}

/** CDN cloud: one outline made of overlapping lobes (stroke layer, then a fill layer that hides the inner strokes).
 *  The leftmost point is exactly cx - w/2 at cy, the rightmost cx + w/2, so arrows can meet it. */
export function Cloud({ cx, cy, w, h, seed, label, size = TEXT.mono }: { cx: number; cy: number; w: number; h: number; seed: string; label?: string; size?: number }) {
  const lobes: [number, number, number, number][] = [
    [-0.3, 0.0, 0.2, 0.34],
    [-0.12, -0.2, 0.2, 0.32],
    [0.1, -0.22, 0.22, 0.3],
    [0.3, 0.0, 0.2, 0.34],
    [0.0, 0.16, 0.3, 0.34],
  ];
  const L = lobes.map(([dx, dy, rx, ry]) => [cx + dx * w, cy + dy * h, rx * w, ry * h] as const);
  return (
    <g className="cloud">
      {L.map(([x, y, rx, ry], i) => <path key={'s' + i} className="ink" d={ellipse(x, y, rx, ry, `${seed}-l${i}`)} />)}
      {L.map(([x, y, rx, ry], i) => <path key={'f' + i} className="fillpaper" d={ellipse(x, y, rx - 1.6, ry - 1.6, `${seed}-l${i}`)} />)}
      {label && <Label kind="mono" x={cx} y={cy + size * 0.36 + 2} size={size}>{label}</Label>}
    </g>
  );
}

/** Remote cache (redis) / bucket (s3): a small cube. (x, y) is the top-left of the back top edge's bounding box. */
export function Cube({ x, y, s = 26, d = 8, seed, label, size = TEXT.mono }: { x: number; y: number; s?: number; d?: number; seed: string; label?: string; size?: number }) {
  const fy = y + d; // front face top
  return (
    <g>
      <path className="ink shape" d={poly([[x, fy], [x + d, y], [x + s + d, y], [x + s + d, y + s], [x + s, fy + s]], `${seed}-back`, true)} />
      <path className="ink shape" d={chamferRect(x, fy, s, s, `${seed}-front`, 2)} />
      <path className="ink thin" d={poly([[x + s, fy], [x + s + d, y]], `${seed}-edge`)} />
      {label && <Label kind="mono" x={x + s / 2} y={fy + s / 2 + size * 0.36} size={size}>{label}</Label>}
    </g>
  );
}

/** A local disk: a small rounded slab with a platter mark. Centre (cx, cy). */
export function Disk({ cx, cy, w = 40, h = 22, seed, label, size = TEXT.small }: { cx: number; cy: number; w?: number; h?: number; seed: string; label?: string; size?: number }) {
  const x = cx - w / 2, y = cy - h / 2;
  return (
    <g>
      <path className="ink shape" d={roundRect(x, y, w, h, 5, seed)} />
      <path className="ink thin" d={ellipse(x + w - 10, cy, 4.5, 4.5, seed + '-p')} />
      <path className="ink thin" d={poly([[x + 6, cy], [x + w - 20, cy]], seed + '-l')} />
      {label && <Label kind="mono" x={cx} y={y + h + size + 4} size={size}>{label}</Label>}
    </g>
  );
}

/** A person (as on the board). Use at most 3 in a figure; prefer <Client> once the reader knows who is asking. */
export function Actor({ x, y, s = 1, seed }: { x: number; y: number; s?: number; seed: string }) {
  const hr = 6 * s;
  const neck = y + hr, hip = y + hr + 24 * s, foot = hip + 16 * s;
  return (
    <g>
      <path className="ink" d={ellipse(x, y, hr, hr, seed + 'h')} />
      <path className="ink" d={poly([[x, neck], [x, hip]], seed + 'b')} />
      <path className="ink" d={poly([[x - 11 * s, neck + 9 * s], [x + 11 * s, neck + 7 * s]], seed + 'a')} />
      <path className="ink" d={poly([[x, hip], [x - 9 * s, foot]], seed + 'l')} />
      <path className="ink" d={poly([[x, hip], [x + 9 * s, foot]], seed + 'r')} />
    </g>
  );
}

/** Client: a small browser window. */
export function Client({ x, y, w = 44, h = 34, label, seed }: { x: number; y: number; w?: number; h?: number; label?: string; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, h, seed, 2)} />
      <path className="ink thin" d={poly([[x, y + 9], [x + w, y + 9]], seed + 'bar')} />
      {[0, 1, 2].map((i) => <circle key={i} className="dot" cx={x + 6 + i * 5} cy={y + 4.6} r={1.3} />)}
      {label && <Label x={x + w / 2} y={y + h + 18}>{label}</Label>}
    </g>
  );
}

/** Speech bubble (at most one per section, only for the misconception). Tail points at `tail`. */
export function Bubble({ x, y, w, h, tail, lines, seed, size = TEXT.small }: { x: number; y: number; w: number; h: number; tail: Pt; lines: string[]; seed: string;
  /** lettering size in units (default 12.5): raise it on layouts shown below 1:1 so it stays >= 12px */ size?: number }) {
  const c = 6;
  const tx = Math.min(Math.max(tail[0] - 9, x + c + 4), x + w - c - 22);
  const pts: Pt[] = [
    [x + c, y], [x + w - c, y], [x + w, y + c], [x + w, y + h - c], [x + w - c, y + h],
    [tx + 18, y + h], tail, [tx, y + h], [x + c, y + h], [x, y + h - c], [x, y + c],
  ];
  const lh = size + 3.5;
  const y0 = y + h / 2 - ((lines.length - 1) * lh) / 2 + size * 0.36;
  return (
    <g>
      <path className="ink shape" d={poly(pts, seed, true)} />
      {lines.map((l, i) => <Label key={i} x={x + w / 2} y={y0 + i * lh} size={size}>{l}</Label>)}
    </g>
  );
}

/** Circled numeral, matched one-to-one with numbered step text. */
export function Num({ x, y, n, tone = 'ink', size = TEXT.num }: { x: number; y: number; n: number | string; tone?: Tone; size?: number }) {
  const r = 9 * (size / TEXT.num);
  return (
    <g className="num">
      <path className={cx(tone, 'fillpaper')} d={ellipse(x, y, r, r * 0.93, `num-${n}-${x}-${y}`)} />
      <Label kind="num" tone={tone} x={x} y={y + size * 0.34} size={size}>{String(n)}</Label>
    </g>
  );
}

export function Dot({ x, y, tone = 'ink' }: { x: number; y: number; tone?: Tone }) {
  return <circle className={cx('dot', tone !== 'ink' && 'dot-' + tone)} cx={x} cy={y} r={3.2} />;
}

/** A red cross over something that has failed. */
export function Cross({ x, y, size = 22, seed }: { x: number; y: number; size?: number; seed: string }) {
  const s = size / 2;
  return (
    <g>
      <path className="red heavy" d={poly([[x - s, y - s], [x + s, y + s]], seed + 'a')} />
      <path className="red heavy" d={poly([[x + s, y - s], [x - s, y + s]], seed + 'b')} />
    </g>
  );
}

/** Hard limit: a dotted red line with a label above it. */
export function Ceiling({ x0, x1, y, label, labelX, seed }: { x0: number; x1: number; y: number; label?: string; labelX?: number; seed: string }) {
  return (
    <g>
      {label && <Label tone="red" x={labelX ?? (x0 + x1) / 2} y={y - 14}>{label}</Label>}
      <path className="red" d={poly([[x0, y], [x1, y]], seed)} strokeDasharray="3 5" />
    </g>
  );
}

/** Vertical span bracket on the right of a time-sequence view (e.g. replication lag). */
export function Bracket({ x, y0, y1, label, tone = 'red', seed, from, size = TEXT.small }: { x: number; y0: number; y1: number; label?: string; tone?: Tone; seed: string; /** optional dotted lead-in from this x at y0 */ from?: number; size?: number }) {
  return (
    <g>
      {from !== undefined && <path className={cx(tone, 'thin')} d={poly([[from, y0], [x - 9, y0]], seed + 'lead')} strokeDasharray="2 4" />}
      <path className={tone} d={poly([[x - 9, y0], [x, y0], [x, y1], [x - 9, y1]], seed)} />
      {label && <Label tone={tone} x={x + 6 + size * 0.7} y={(y0 + y1) / 2} rotate={90} size={size}>{label}</Label>}
    </g>
  );
}

/** Swim-lane lifeline. */
export function Lifeline({ x, y0, y1, seed }: { x: number; y0: number; y1: number; seed: string }) {
  return <path className="lifeline" d={poly([[x, y0], [x, y1]], seed)} />;
}

/** "time" axis running down the left of a sequence view. */
export function TimeAxis({ x, y0, y1, seed, label = 'time', size = TEXT.small }: { x: number; y0: number; y1: number; seed: string; label?: string; size?: number }) {
  return (
    <g>
      <path className="lifeline" d={poly([[x, y0], [x, y1]], seed)} />
      <path className="lifeline" d={chevron([x, y1], 0, 1, 7, seed + 'h')} />
      <Label muted anchor="start" x={x + 6} y={y0 + 4} rotate={90} size={size}>{label}</Label>
    </g>
  );
}

/** Straight segment helper for one-off marks (ticks, underlines). */
export function Mark({ a, b, tone = 'ink', weight = 'regular', seed, dashed }: { a: Pt; b: Pt; tone?: Tone; weight?: Weight; seed: string; dashed?: boolean }) {
  return <path className={strokeClass(tone, weight)} d={`M${f(a[0])} ${f(a[1])}` + seg(a, b, seed)} strokeDasharray={dashed ? '6 5' : undefined} />;
}
