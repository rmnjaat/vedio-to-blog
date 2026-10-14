// Lecture 06 (lec03), §8. Fig 8·a "Skip vs seek" (new, two panels), Fig 8·b "Skip-limit vs ID-limit, the
// benchmark's shape" (redraw of the screen-shared chart's shape only, 01:50:42) and the §8 rule-box sketch.
// Ledger: Fig 8·a L-0224, L-0228, L-0233; Fig 8·b L-0230, L-0231, L-0305; rule sketch L-0249.
import React from 'react';
import { Arrow, Bubble, Fig, Label, Line, Mark } from '../kit/Kit';
import type { Pt } from '../kit/Kit';

/** A ruled strip of row cells from x0 to x1 (cell width cw), optionally with a break mark. */
function Strip({ x0, x1, y, h, cw, seed, gap }: { x0: number; x1: number; y: number; h: number; cw: number; seed: string; gap?: [number, number] }) {
  const parts: [number, number][] = gap ? [[x0, gap[0]], [gap[1], x1]] : [[x0, x1]];
  return (
    <g>
      {parts.map(([a, b], i) => (
        <g key={i}>
          <Line pts={[[a, y], [b, y]]} seed={`${seed}-t${i}`} />
          <Line pts={[[a, y + h], [b, y + h]]} seed={`${seed}-b${i}`} />
          {Array.from({ length: Math.floor((b - a) / cw) + 1 }, (_, k) => a + k * cw).filter((x) => x <= b + 0.5).map((x, k) => (
            <Mark key={k} a={[x, y]} b={[x, y + h]} weight="thin" seed={`${seed}-c${i}-${k}`} />
          ))}
        </g>
      ))}
      {gap && <>
        <Mark a={[gap[0] + 4, y + h + 5]} b={[gap[0] + 10, y - 5]} weight="thin" seed={`${seed}-g1`} />
        <Mark a={[gap[1] - 10, y + h + 5]} b={[gap[1] - 4, y - 5]} weight="thin" seed={`${seed}-g2`} />
      </>}
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 8·a */

export function SkipPanel() {
  return (
    <Fig id="fig8a-skip" w={340} h={300} title="Skip: LIMIT 10 OFFSET 9990"
      desc="The rows of the result as one long strip. To return page 1,000 the database computes the first 9,990 rows, throws them away, and returns the 10 after them, so the work grows with the page number. A speech bubble asks: page 1,000 costs the same, right?">
      <Bubble x={150} y={8} w={180} h={50} tail={[120, 84]} lines={['page 1,000 costs', 'the same, right?']} size={14} seed="f8a-s-bub" />
      <Label kind="mono" anchor="start" x={14} y={104} size={14}>LIMIT 10 OFFSET 9990</Label>
      <Arrow tone="blue" head="none" pts={[[16, 130], [236, 130]]} seed="f8a-s-run" />
      <Arrow tone="red" weight="heavy" pts={[[236, 130], [268, 130]]} seed="f8a-s-cost" />
      <Strip x0={16} x1={324} y={144} h={26} cw={14} gap={[114, 142]} seed="f8a-s-strip" />
      <Line tone="green" pts={[[268, 140], [326, 140], [326, 174], [268, 174], [268, 140]]} seed="f8a-s-ring" />
      <Line pts={[[16, 184], [16, 192], [264, 192], [264, 184]]} weight="thin" seed="f8a-s-br" />
      <Label x={140} y={212} size={14}>9,990 rows computed,</Label>
      <Label x={140} y={230} size={14}>then thrown away</Label>
      <Label tone="green" x={297} y={198} size={14}>10 back</Label>
      <Label kind="title" x={170} y={284}>skip: cost grows with the page</Label>
    </Fig>
  );
}

export function SeekPanel() {
  const root: Pt = [170, 92], inner: Pt[] = [[96, 146], [244, 146]];
  const leaves = [44, 124, 204, 284];
  const lw = 60, lh = 22, ly = 196;
  return (
    <Fig id="fig8a-seek" w={340} h={300} title="Seek: WHERE id > 9990 LIMIT 10"
      desc="A B+ tree ordered by id: a root, two inner nodes and four leaves joined left to right. The query walks down from the root to the leaf holding id 9990, about log n steps, then reads the next 10 entries along the leaves. The work is the same at page 1 and page 1,000.">
      <Label kind="mono" anchor="start" x={14} y={30} size={14}>WHERE id &gt; 9990</Label>
      <Label kind="mono" anchor="start" x={14} y={50} size={14}>ORDER BY id LIMIT 10</Label>
      {/* tree edges */}
      {inner.map((p, i) => <Line key={i} weight="thin" pts={[[root[0], root[1] + 11], [p[0], p[1] - 11]]} seed={`f8a-k-e${i}`} />)}
      {leaves.map((x, i) => {
        const p = inner[i < 2 ? 0 : 1];
        return <Line key={i} weight="thin" pts={[[p[0], p[1] + 11], [x, ly]]} seed={`f8a-k-l${i}`} />;
      })}
      {/* nodes */}
      {[root, ...inner].map((p, i) => (
        <Line key={i} pts={[[p[0] - 30, p[1] - 11], [p[0] + 30, p[1] - 11], [p[0] + 30, p[1] + 11], [p[0] - 30, p[1] + 11], [p[0] - 30, p[1] - 11]]} seed={`f8a-k-n${i}`} className="shape" />
      ))}
      {leaves.map((x, i) => (
        <Line key={i} pts={[[x - lw / 2, ly], [x + lw / 2, ly], [x + lw / 2, ly + lh], [x - lw / 2, ly + lh], [x - lw / 2, ly]]} seed={`f8a-k-f${i}`} />
      ))}
      <Line weight="thin" pts={[[44 + lw / 2, ly + lh / 2], [124 - lw / 2, ly + lh / 2]]} seed="f8a-k-j1" />
      <Line weight="thin" pts={[[124 + lw / 2, ly + lh / 2], [204 - lw / 2, ly + lh / 2]]} seed="f8a-k-j2" />
      <Line weight="thin" pts={[[204 + lw / 2, ly + lh / 2], [284 - lw / 2, ly + lh / 2]]} seed="f8a-k-j3" />
      {/* the seek: down to the leaf with 9990, then 10 across */}
      <Arrow tone="blue" pts={[[root[0] + 8, root[1] + 12], [inner[1][0] - 10, inner[1][1] - 12]]} seed="f8a-k-d1" />
      <Arrow tone="blue" pts={[[inner[1][0] - 6, inner[1][1] + 12], [204 + 4, ly - 3]]} seed="f8a-k-d2" />
      <Label kind="mono" tone="blue" x={204} y={ly + lh / 2 + 5} size={14}>9990</Label>
      <Arrow tone="blue" pts={[[204, ly + lh + 12], [300, ly + lh + 12]]} seed="f8a-k-across" />
      <Label tone="green" anchor="start" x={306} y={ly + lh + 17} size={16}>✓</Label>
      <Label x={170} y={258} size={14}>log n down, then 10 across</Label>
      <Label kind="title" x={170} y={284}>seek: same cost at any page</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·b */

export function BenchmarkShape({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig8b-p' : 'fig8b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Skip-limit vs ID-limit, the shape of the benchmark';
  const desc = 'A chart with records paged through on the x axis and response time on the y axis, no values. The skip plus limit line rises in a straight line as pagination goes deeper; the _id plus limit line stays flat. Near the origin the two are about the same. Two spikes on the rising line are annotated: disk throttling during a flush, and other processes on the same laptop.';
  const W = P ? 340 : 600, H = P ? 358 : 330;
  const ox = P ? 40 : 70, oy = P ? 270 : 270, xr = P ? 326 : 570, yt = P ? 50 : 40;
  const X = (t: number) => ox + t * (xr - ox), Y = (v: number) => oy - v * (oy - yt);
  const T = 14;
  // rising line with two spikes (t in 0..1, v in 0..1)
  const rise: Pt[] = [[0.02, 0.05], [0.25, 0.22], [0.40, 0.33], [0.43, 0.62], [0.46, 0.36], [0.68, 0.52], [0.71, 0.80], [0.74, 0.56], [0.97, 0.74]]
    .map(([t, v]) => [X(t), Y(v)]);
  return (
    <Fig id={id} w={W} h={H} title={title} desc={desc}>
      {/* axes */}
      <Arrow weight="thin" pts={[[ox, oy], [ox, yt - 14]]} seed={s('ya')} />
      <Arrow weight="thin" pts={[[ox, oy], [xr + 6, oy]]} seed={s('xa')} />
      <Label muted x={ox - 16} y={(oy + yt) / 2} rotate={-90} size={T}>response time</Label>
      <Label muted x={(ox + xr) / 2} y={oy + 26} size={T}>records paged through (deeper →)</Label>
      {/* about the same near the origin */}
      <Line dotted pts={[[ox, Y(0.14)], [X(0.1), Y(0.14)], [X(0.1), oy]]} seed={s('same')} />
      <Line weight="thin" pts={[[X(0.05), Y(0.14) - 3], [X(0.05), Y(0.45) + 10]]} seed={s('same-lead')} />
      <Label anchor="start" x={ox + 8} y={Y(0.45) - 12} size={T}>about the same</Label>
      <Label anchor="start" x={ox + 8} y={Y(0.45) + 4} size={T}>up to ~500–600</Label>
      {/* the two lines */}
      <Line tone="red" pts={rise} seed={s('rise')} />
      <Line tone="green" pts={[[X(0.02), Y(0.045)], [X(0.97), Y(0.07)]]} seed={s('flat')} />
      <Label kind="mono" tone="red" anchor="end" x={P ? xr : X(0.97)} y={P ? Y(0.42) : Y(0.74) - 12} size={T}>skip + limit</Label>
      <Label kind="mono" tone="green" anchor="end" x={X(0.97)} y={Y(0.07) - 10} size={T}>_id + limit</Label>
      {/* annotations on the spikes */}
      <Line weight="thin" pts={[[X(0.43), Y(0.62) - 4], [X(0.43), Y(0.62) - (P ? 30 : 34)]]} seed={s('n1')} />
      <Label x={X(0.43)} y={Y(0.62) - (P ? 52 : 56)} size={T}>disk throttling</Label>
      <Label x={X(0.43)} y={Y(0.62) - (P ? 36 : 40)} size={T}>during a flush</Label>
      <Line weight="thin" pts={[[X(0.71), Y(0.80) - 4], [X(0.71), Y(0.80) - (P ? 26 : 18)]]} seed={s('n2')} />
      <Label anchor={P ? 'end' : 'middle'} x={P ? X(0.71) + 40 : X(0.71)} y={Y(0.80) - (P ? 48 : 40)} size={T}>other processes</Label>
      <Label anchor={P ? 'end' : 'middle'} x={P ? X(0.71) + 40 : X(0.71)} y={Y(0.80) - (P ? 32 : 24)} size={T}>on the same laptop</Label>
      {P
        ? <>
            <Label muted x={W / 2} y={H - 28} size={14}>shape only, redrawn from the benchmark;</Label>
            <Label muted x={W / 2} y={H - 10} size={14}>no values</Label>
          </>
        : <Label muted x={W / 2} y={H - 10} size={13}>shape only, redrawn from the benchmark; no values</Label>}
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §8 */

export function RuleDisk({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule8-p' : 'rule8';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Know how your data sits on disk';
  const desc = 'A small B+ tree: a root, two inner nodes and four leaves in key order. A blue path runs from the root down to one leaf, then a short blue arrow runs along the leaves: a seek, then a sequential read.';
  const W = P ? 320 : 480, H = P ? 180 : 160;
  const cx = P ? 160 : 170;
  const root: Pt = [cx, 26], inner: Pt[] = [[cx - 70, 70], [cx + 70, 70]];
  const leaves = [cx - 105, cx - 35, cx + 35, cx + 105];
  const ly = 108, lw = 50, lh = 18;
  const box = (p: Pt, w: number, h: number, k: string) => (
    <Line key={k} pts={[[p[0] - w / 2, p[1] - h / 2], [p[0] + w / 2, p[1] - h / 2], [p[0] + w / 2, p[1] + h / 2], [p[0] - w / 2, p[1] + h / 2], [p[0] - w / 2, p[1] - h / 2]]} seed={s(k)} />
  );
  return (
    <Fig id={id} w={W} h={H} title={title} desc={desc}>
      {inner.map((p, i) => <Line key={'e' + i} weight="thin" pts={[[root[0], root[1] + 9], [p[0], p[1] - 9]]} seed={s('e' + i)} />)}
      {leaves.map((x, i) => <Line key={'l' + i} weight="thin" pts={[[inner[i < 2 ? 0 : 1][0], inner[0][1] + 9], [x, ly - lh / 2]]} seed={s('l' + i)} />)}
      {box(root, 48, 18, 'r')}
      {inner.map((p, i) => box(p, 48, 18, 'i' + i))}
      {leaves.map((x, i) => box([x, ly], lw, lh, 'f' + i))}
      <Arrow tone="blue" pts={[[root[0] + 6, root[1] + 10], [inner[1][0] - 8, inner[1][1] - 10]]} seed={s('d1')} />
      <Arrow tone="blue" pts={[[inner[1][0] - 6, inner[1][1] + 10], [leaves[2] + 2, ly - lh / 2 - 2]]} seed={s('d2')} />
      <Arrow tone="blue" pts={[[leaves[2] - 10, ly + lh / 2 + 10], [leaves[3] + 20, ly + lh / 2 + 10]]} seed={s('across')} />
      {P
        ? <Label x={cx} y={H - 10} size={15}>know how your data sits on disk</Label>
        : <>
            <Label anchor="start" x={318} y={70} size={15}>know how</Label>
            <Label anchor="start" x={318} y={90} size={15}>your data</Label>
            <Label anchor="start" x={318} y={110} size={15}>sits on disk</Label>
          </>}
    </Fig>
  );
}
