// Clip l04-connection-pool — "Where a heartbeat's time goes": the same five heartbeat writes without a pool
// (open, query, close every time) and through a pool of three open connections.
// Storyboard: lectures/lec04/animations/l04-connection-pool/storyboard.{yaml,md}.
// Ledger: L-0109, L-0111, L-0112, L-0113, L-0114, L-0115, L-0116, L-0103.
// Frame 0 = two idle lanes (top: no connection open; bottom: Fig 4·c's three lines); the last frame is the poster.
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {chevron, cylinder, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {PAST, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, NOPOOL, POOL_LINE, TRIPS, noPoolWrite, poolWrite, type TripKind} from './timeline';

export type ConnectionPoolProps = {theme: ThemeName; layout?: Layout};

const EM = 0.49; // hand lettering width per char × size (measured on the b5 still: "all 5 done" 196 px at 40)

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: lanes at y 0 and 318, bars 28 px per trip from x 40. phone 720×920: lanes at y 0 and 372,
// bars 18 px per trip from x 24, the same rows stacked tighter. Every trip is one equal bar segment (not to scale).
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const TS = TY.label;
  const OY = ph ? [0, 372] : [0, 318];
  const g = ph
    ? {head: 44, slot: 96, box: {x: 24, y: 112, w: 100, h: 84}, line: 154, pool: [132, 154, 176], db: {cx: 380, rx: 40, ry: 11, top: 118, h: 64},
       above: 246, bar: {y: 262, h: 26}, axis: 298, below: 336, sep: 360, x0: 24, seg: 18, gap: 6, axisEnd: 700, right: 696, pre: {x: 438, y: [150, 186]}}
    : {head: 44, slot: 96, box: {x: 40, y: 66, w: 140, h: 92}, line: 112, pool: [88, 112, 136], db: {cx: 730, rx: 56, ry: 14, top: 74, h: 74},
       above: 204, bar: {y: 218, h: 28}, axis: 256, below: 292, sep: 312, x0: 40, seg: 28, gap: 8, axisEnd: 1150, right: 1160, pre: {x: 806, y: [104, 146]}};
  const lx0 = g.box.x + g.box.w;
  const lx1 = g.db.cx - g.db.rx;
  const conn = (y: number, seed: string) => {
    const d = handLine([lx0, y], [lx1, y], seed);
    return {d, back: reversePath(d)};
  };
  const lanes = OY.map((oy, i) => ({
    oy,
    box: serverBox(g.box.x, oy + g.box.y, g.box.w, g.box.h, `api${i}`),
    cyl: cylinder(g.db.cx, oy + g.db.top, g.db.rx, g.db.ry, g.db.h, `db${i}`),
    axis: handLine([g.x0, oy + g.axis], [g.axisEnd, oy + g.axis], `ax${i}`),
    axisHead: chevron([g.axisEnd, oy + g.axis], 1, 0, ph ? 12 : 15, `axh${i}`),
  }));
  // no-pool write k, trip j -> bar segment x; pool write k, trip j (0 = UPDATE, 1 = OK)
  const segX1 = (k: number, j: number) => g.x0 + (k - 1) * (7 * g.seg + g.gap) + j * g.seg;
  const segX2 = (k: number, j: number) => g.x0 + (k - 1) * (2 * g.seg + g.gap) + j * g.seg;
  const end1 = segX1(5, 7);
  const end2 = segX2(5, 2);
  const tickAt = (x: number, y: number, seed: string): string => {
    const u = TS / 40;
    const pts: Pt[] = [[x - 14 * u, y - 2 * u], [x - 4 * u, y + 10 * u], [x + 16 * u, y - 16 * u]];
    return handPoly(pts, seed);
  };
  const doneW = 'all 5 done'.length * TS * EM;
  const barMid = (i: number) => OY[i] + g.bar.y + g.bar.h / 2;
  return {
    ph, W, H, TS, OY, g, lanes,
    slotX: (lx0 + lx1) / 2,
    line1: conn(g.line, 'c1'),
    pool: g.pool.map((y, i) => conn(OY[1] + y, `p${i}`)),
    segX1, segX2, end1, end2,
    // lane 1: ✓ + "all 5 done" under the end of its long bar; lane 2: right of its short bar
    done1: {tick: tickAt(end1 - doneW - TS * 0.7, OY[0] + g.below - TS * 0.32, 'tk1'), x: end1, y: OY[0] + g.below},
    done2: {tick: tickAt(end2 + TS * 0.75, barMid(1), 'tk2'), x: end2 + TS * 1.5, y: barMid(1) + TS * 0.33},
    sep: handLine([g.x0 - 8, g.sep], [W - g.x0 + 8, g.sep], 'sep'),
    CAPTION_TOP: ph ? 760 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;

const fillOf = (kind: TripKind) => (kind === 'query' ? 'blue' : kind === 'ok' ? 'green' : null);
const colorOf = (kind: TripKind) => (kind === 'query' ? 'blue' : kind === 'ok' ? 'green' : 'ink');

export const ConnectionPool: React.FC<ConnectionPoolProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const {g, TS, OY} = G;
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const pr = G.ph ? 8 : 10;
  const at = (r: readonly [number, number]) => r;

  // lane 1 ghosts while the pool lane is explained, and comes back for the comparison
  const lane1O = frame < BEAT.compare ? ghost(frame, BEAT.pool) : PAST + (1 - PAST) * ramp(frame, BEAT.compare, 12, EASE_FADE);

  const writes1 = [1, 2, 3, 4, 5].map((k) => noPoolWrite(k));
  const writes2 = [1, 2, 3, 4, 5].map((k) => poolWrite(k));
  const opened = writes1.filter((w) => frame >= w.trip(2).at + w.dur).length;

  // one time-bar segment: hollow graphite for an open/close trip, filled blue (UPDATE) or green (OK)
  const Seg: React.FC<{x: number; y: number; p: number; kind: TripKind}> = ({x, y, p, kind}) => {
    if (p <= 0) return null;
    const w = Math.max(0, (g.seg - 3) * p);
    const f = fillOf(kind);
    return (
      <rect x={x + 1.5} y={y} width={w} height={g.bar.h} rx={2.5}
        fill={f ? T[f] : T.sheet} stroke={f ? T[f] : T.ink2} strokeWidth={STROKE.thin} />
    );
  };

  // the trip slot above lane 1's line: one label at a time, each replaced in place by the next
  const slotCues: {from: number; text: string; color: 'ink2' | 'blue' | 'green'}[] = [
    ...TRIPS.map((t, j) => ({from: writes1[0].trip(j).at, text: t.label, color: (t.kind === 'query' ? 'blue' : t.kind === 'ok' ? 'green' : 'ink2') as 'ink2' | 'blue' | 'green'})),
    {from: EV.closed1[0], text: 'closed', color: 'ink2'},
    ...[2, 3, 4, 5].map((k) => ({from: writes1[k - 1].start, text: `write ${k}`, color: 'ink2' as const})),
    {from: EV.closed5[0], text: 'closed', color: 'ink2'},
  ];

  const counter = (i: number) => {
    const y = OY[i] + g.head;
    const sw = i === 0 ? EV.swap1 : EV.swap2;
    const oldO = 1 - ramp(frame, sw[0], 8, EASE_FADE);
    return (
      <>
        <Write x={g.right} y={y} size={TS} anchor="end" color="ink" opacity={oldO} text={`new connections: ${i === 0 ? opened : 0}`} />
        <Write x={g.right} y={y} size={TS} anchor="end" color="ink" weight={640} progress={ramp(frame, sw[0] + 4, sw[1] - 4)}
          text={i === 0 ? '6M new connections/min' : 'same 3, reused'} />
      </>
    );
  };

  return (
    <Sheet theme={theme}>
      <Stage title="Where a heartbeat's time goes: no pool vs a pool of three" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): two lanes ===== */}
        <Ink d={G.sep} color="ink3" width={STROKE.thin} dash="6 10" opacity={0.7} />
        {G.lanes.map((l, i) => (
          <g key={i} opacity={i === 0 ? lane1O : 1}>
            <Ink d={l.box} fill={T.sheet} />
            <Write x={g.box.x + g.box.w / 2} y={l.oy + g.box.y + g.box.h / 2 + TS * 0.33} text="api" size={TS} variant="mono" anchor="middle" />
            <path d={l.cyl.bodyFill} fill={T.sheet} />
            <Ink d={l.cyl.sides} />
            <Ink d={l.cyl.front} />
            <Ink d={l.cyl.top} fill={T.sheet} />
            <Write x={g.db.cx} y={l.oy + g.db.top + g.db.h * 0.72} text="db" size={TS} variant="mono" anchor="middle" />
            <Ink d={l.axis} color="ink3" width={STROKE.thin} />
            <Ink d={l.axisHead} color="ink3" width={STROKE.thin} />
            <Write x={g.x0} y={l.oy + g.head} size={TS} text={i === 0 ? 'no pool' : 'pool of 3'} weight={640} />
          </g>
        ))}
        <Write x={g.right} y={OY[1] + g.below} size={TS} text="time, not to scale" anchor="end" color="ink2" />

        {/* ===== lane 1: no pool ===== */}
        <g opacity={lane1O}>
          {/* closed: a dashed ghost of the line nobody draws */}
          <Ink d={G.line1.d} color="ink2" dash="10 12" opacity={PAST} />
          {writes1.map((w, i) => {
            if (frame < w.start || frame > w.end + NOPOOL.closeFade + 2) return null;
            const t0 = w.trip(0);
            const t3 = w.trip(3);
            const t4 = w.trip(4);
            const openP = ramp(frame, t0.at, t0.dur, EASE_MOVE);
            const closeO = 1 - ramp(frame, w.end, NOPOOL.closeFade, EASE_FADE);
            return (
              <g key={i}>
                <Pen d={G.line1.d} progress={openP} opacity={closeO} />
                <Pen d={G.line1.d} progress={ramp(frame, t3.at, t3.dur, EASE_MOVE)} color="blue" width={STROKE.ink + 1}
                  opacity={1 - ramp(frame, t4.at + t4.dur, 10, EASE_FADE)} />
                {TRIPS.map((t, j) => {
                  const tr = w.trip(j);
                  return <Packet key={j} d={t.dir === 1 ? G.line1.d : G.line1.back} progress={ramp(frame, tr.at, tr.dur, EASE_MOVE)} color={colorOf(t.kind)} r={pr} />;
                })}
              </g>
            );
          })}
          {slotCues.map((c, i) => {
            const next = slotCues[i + 1]?.from ?? Infinity;
            if (frame < c.from || frame >= next) return null;
            return (
              <Write key={i} x={G.slotX} y={OY[0] + g.slot} size={TS} text={c.text} variant="mono" anchor="middle" color={c.color}
                progress={ramp(frame, c.from, Math.min(8, Math.max(4, next - c.from - 2)))} />
            );
          })}
          {counter(0)}
          {/* time bar: one segment per trip */}
          {writes1.map((w, i) =>
            TRIPS.map((t, j) => {
              const tr = w.trip(j);
              return <Seg key={`${i}-${j}`} x={G.segX1(i + 1, j)} y={OY[0] + g.bar.y} p={ramp(frame, tr.at, tr.dur, LIN)} kind={t.kind} />;
            }),
          )}
          <Write x={g.x0} y={OY[0] + g.above} size={TS} text="open + close: 5 trips" progress={ramp(frame, ...at(EV.openClose))} />
          <Write x={g.x0 + 'open + close: 5 trips'.length * TS * EM + TS * 0.45} y={OY[0] + g.above} size={TS} text="(+ db login)" color="ink2"
            progress={ramp(frame, ...at(EV.login))} />
          <Write x={G.segX1(1, 4)} y={OY[0] + g.below} size={TS} text="query" color="blue" anchor="middle" progress={ramp(frame, ...at(EV.queryLbl))} />
          <Pen d={G.done1.tick} progress={ramp(frame, ...at(EV.tick1))} color="green" width={STROKE.ink + 0.8} />
          <Write x={G.done1.x} y={G.done1.y} size={TS} text="all 5 done" color="green" anchor="end" weight={600} progress={ramp(frame, ...at(EV.done1))} />
        </g>

        {/* ===== lane 2: a pool of three open connections ===== */}
        {G.pool.map((c, i) => (
          <Ink key={i} d={c.d} />
        ))}
        <Write x={g.pre.x} y={OY[1] + g.pre.y[0]} size={TS} text="pre-established" color="ink2" progress={ramp(frame, ...at(EV.preEst))} />
        <Write x={g.pre.x} y={OY[1] + g.pre.y[1]} size={TS} text="at startup" color="ink2" progress={ramp(frame, ...at(EV.startup))} />
        {writes2.map((w, i) => {
          const c = G.pool[POOL_LINE[i]];
          if (frame < w.pick || frame > w.end + 2) return null;
          return (
            <g key={i}>
              <Pen d={c.d} progress={ramp(frame, w.pick, 6, EASE_MOVE)} color="blue" width={STROKE.ink + 1} opacity={1 - ramp(frame, w.release, 8, EASE_FADE)} />
              <Packet d={c.d} progress={ramp(frame, w.up, 10, EASE_MOVE)} color="blue" r={pr} />
              <Packet d={c.back} progress={ramp(frame, w.ok, 10, EASE_MOVE)} color="green" r={pr} />
            </g>
          );
        })}
        {counter(1)}
        {writes2.map((w, i) => (
          <g key={i}>
            <Seg x={G.segX2(i + 1, 0)} y={OY[1] + g.bar.y} p={ramp(frame, w.up, 10, LIN)} kind="query" />
            <Seg x={G.segX2(i + 1, 1)} y={OY[1] + g.bar.y} p={ramp(frame, w.ok, 10, LIN)} kind="ok" />
          </g>
        ))}
        <Write x={g.x0} y={OY[1] + g.above} size={TS} text="just the query" progress={ramp(frame, ...at(EV.justQuery))} />
        <Pen d={G.done2.tick} progress={ramp(frame, ...at(EV.tick2))} color="green" width={STROKE.ink + 0.8} />
        <Write x={G.done2.x} y={G.done2.y} size={TS} text="all 5 done" color="green" weight={600} progress={ramp(frame, ...at(EV.done2))} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default ConnectionPool;
