// Clip l04-staggered-delete — "One big delete vs many small ones".
// Storyboard: lectures/lec04/animations/l04-staggered-delete/storyboard.{yaml,md}. Ledger: L-0263, L-0282, L-0283, L-0295, L-0297, L-0298.
// Frame 0 = two lanes (users -> blogs table with 100,000 soft-deleted rows <- cron job; empty "deleting" strips).
// The last frame is the annotated poster: one long DELETE ("slowed, never down") vs ten small batches ("barely slowed").
// No request gives up and nothing goes down (L-0282); the queue only shows requests slowing while the DELETE runs.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×1000, portrait re-flow, ≤ 640 px).
import React, {useId} from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, handLine, serverBox, type Pt} from '../../lib/hand';
import {PAST, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, LANE1, LANE2, META, REQ1, REQ2, STREAM, type Lane, type Req} from './timeline';

export type StaggeredDeleteProps = {theme: ThemeName; layout?: Layout};

const LIN = Easing.linear;
const ROWS = 100000;

// ---------- layout (canvas px), one geometry per layout and lane ----------
const buildLane = (layout: Layout, n: 0 | 1) => {
  const ph = layout === 'phone';
  const OY = ph ? n * 400 : n * 300;
  const M = OY + 150; // the request row
  const TABLE = ph ? {x: 416, y: M - 52, w: 200, h: 104, head: 46} : {x: 580, y: M - 58, w: 220, h: 116, head: 52};
  // the request line starts after "users" (wide); on the phone "users" sits above the line so a long queue has room
  const X0 = ph ? 28 : 165;
  const DOOR_X = TABLE.x - (ph ? 12 : 14);
  const SLOT = ph ? 26 : 28;
  const FRONT = DOOR_X - (ph ? 20 : 22); // the first waiting slot
  const JOB = ph ? {x: 436, y: M + 110, w: 160, h: 50} : {x: 890, y: M - 32, w: 230, h: 64};
  const jobArrowPts: Pt[] = ph
    ? [
        [JOB.x + JOB.w / 2, JOB.y - 4],
        [JOB.x + JOB.w / 2, TABLE.y + TABLE.h + 4],
      ]
    : [
        [JOB.x - 4, M],
        [TABLE.x + TABLE.w + 4, M],
      ];
  const S = ph ? OY + 372 : OY + 262; // strip axis
  const STRIP = ph ? {x0: 24, x1: 696} : {x0: 290, x1: 1150};
  // leave room for the axis chevron: the tenth bar must not touch it
  const cell = (STRIP.x1 - STRIP.x0 - 40) / 10;
  const SHORT = cell * 0.42;
  const BLOCK = {x: TABLE.x + 12, y: TABLE.y + TABLE.head + 8, w: TABLE.w - 24, h: TABLE.h - TABLE.head - 18};
  return {
    OY,
    M,
    TABLE,
    TABLE_D: serverBox(TABLE.x, TABLE.y, TABLE.w, TABLE.h, `tbl${n}`),
    HEAD_D: handLine([TABLE.x + 4, TABLE.y + TABLE.head], [TABLE.x + TABLE.w - 4, TABLE.y + TABLE.head], `hd${n}`),
    BLOCK,
    X0,
    FRONT,
    SLOT,
    LINE_D: handLine([X0, M], [DOOR_X + 6, M], `req${n}`),
    LINE_HEAD: chevron([DOOR_X + 8, M], 1, 0, ph ? 14 : 16, `reqh${n}`),
    JOB,
    JOB_D: serverBox(JOB.x, JOB.y, JOB.w, JOB.h, `job${n}`),
    JOB_ARROW_D: handLine(jobArrowPts[0], jobArrowPts[1], `ja${n}`),
    JOB_HEAD: ph ? chevron(jobArrowPts[1], 0, -1, 14, `jah${n}`) : chevron(jobArrowPts[1], -1, 0, 16, `jah${n}`),
    JOB_TEXT: {x: JOB.x + JOB.w / 2, y: JOB.y + JOB.h / 2 + (ph ? 10 : 13)},
    TITLE: {x: ph ? 24 : 40, y: OY + (ph ? 44 : 56)},
    COUNTER: ph ? {x: 696, y: OY + 44, anchor: 'end' as const} : {x: TABLE.x + TABLE.w / 2, y: OY + 56, anchor: 'middle' as const},
    USERS: {x: ph ? 24 : 40, y: M + (ph ? -26 : 14)},
    // the verdict row under the request line: lane 1 "slowed, never down", lane 2 a tick + "barely slowed"
    TALLY: {x: ph ? 24 : 40, y: M + (ph ? 52 : 56)},
    S,
    STRIP,
    AXIS_D: handLine([STRIP.x0, S], [STRIP.x1, S], `ax${n}`),
    AXIS_HEAD: chevron([STRIP.x1, S], 1, 0, 14, `axh${n}`),
    STRIP_LABEL: ph ? {x: 24, y: S - 24} : {x: 40, y: S + 14},
    // lane 1: one long bar = ten short ones (same rows); lane 2: ten short bars spread evenly
    BAR_H: ph ? 20 : 24,
    LONG: {x: STRIP.x0 + cell * 0.29, w: SHORT * 10},
    shortX: (i: number) => STRIP.x0 + cell * (i + 0.29),
    SHORT,
    AXIS_LABEL: {x: STRIP.x1, y: S + (ph ? 50 : 56)},
    // wide: under the job box (above it, the label crowded the box and the table's corner)
    CONN: ph ? {x: JOB.x - 16, y: JOB.y + 35, anchor: 'end' as const} : {x: 1160, y: JOB.y + JOB.h + 36, anchor: 'end' as const},
    DOT_R: ph ? 9 : 10,
  };
};
type LaneGeo = ReturnType<typeof buildLane>;
const build = (layout: Layout) => ({
  ph: layout === 'phone',
  W: layout === 'phone' ? META.phone.width : META.width,
  H: layout === 'phone' ? META.phone.height : META.height,
  TY: typeFor(layout),
  L: [buildLane(layout, 0), buildLane(layout, 1)] as const,
  CAPTION_TOP: layout === 'phone' ? 850 : 652,
});
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const fmt = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, '0')}` : String(n));

// ---------- the lane's delete progress ----------
/** Rows deleted so far (0..100,000): each DELETE run deletes its share linearly while it runs. */
const deleted = (frame: number, lane: Lane) => {
  const per = ROWS / lane.runs.length;
  return lane.runs.reduce((s, [a, b]) => s + per * ramp(frame, a, b - a, LIN), 0);
};

// ---------- where a request dot is ----------
type DotState = {x: number; y: number; o: number} | null;
const dotAt = (frame: number, reqs: Req[], idx: number, G: LaneGeo, visibleFrom: number): DotState => {
  const r = reqs[idx];
  if (frame < r.spawn) return null;
  const v = (G.FRONT - G.X0) / STREAM.travel;
  const show = ramp(frame, visibleFrom, 8, EASE_FADE);
  // the queue position: every earlier request that has not left yet is ahead of this one
  const queueX = (f: number) => {
    let k = 0;
    for (let j = 0; j < idx; j++) if (reqs[j].spawn <= f) k += 1 - ramp(f, reqs[j].leave, 8, EASE_MOVE);
    return G.FRONT - G.SLOT * k;
  };
  const xWaiting = (f: number) => Math.min(G.X0 + v * (f - r.spawn), queueX(f));
  if (frame < r.leave) return {x: xWaiting(frame), y: G.M, o: show};
  // served (every request is): rides on into the table and fades there
  const x0 = xWaiting(r.leave);
  if (frame - r.leave >= 12) return null;
  return {x: x0 + v * (frame - r.leave), y: G.M, o: show * (1 - ramp(frame, r.leave + 2, 10, EASE_FADE))};
};

export const StaggeredDelete: React.FC<StaggeredDeleteProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const [A, B] = G.L;

  // lane 1 ghosts while lane 2 plays, then comes back for the comparison
  const g1 = frame < EV.unghost1[0] ? ghost(frame, EV.ghost1) : PAST + (1 - PAST) * ramp(frame, ...EV.unghost1, EASE_FADE);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        <g opacity={g1}>
          <LaneView G={A} n={0} lane={LANE1} reqs={REQ1} title="all in one shot" frame={frame} T={T} TS={TS} ph={G.ph} />
          {/* the verdict: requests slowed while the DELETE ran, but every one got through (L-0282: no downtime) */}
          <Write x={A.TALLY.x} y={A.TALLY.y + TS * 0.36} text="slowed, never down" size={TS} weight={600} progress={ramp(frame, ...EV.slowedLabel)} />
        </g>
        <LaneView G={B} n={1} lane={LANE2} reqs={REQ2} title="10,000 an hour" frame={frame} T={T} TS={TS} ph={G.ph} />
        <Write x={B.AXIS_LABEL.x} y={B.AXIS_LABEL.y} text="time (not to scale)" size={TS} color="ink2" anchor="end" />
        {/* B5: the comparison and the price */}
        <Tick x={B.TALLY.x + (G.ph ? 12 : 16)} y={B.TALLY.y} color={T.green} sheet={T.sheet} o={ramp(frame, EV.barelySlowed[0], 8, EASE_FADE)} s={G.ph ? 0.8 : 1} />
        <Write x={B.TALLY.x + (G.ph ? 40 : 50)} y={B.TALLY.y + TS * 0.36} text="barely slowed" size={TS} color="green" weight={600} progress={ramp(frame, EV.barelySlowed[0] + 6, EV.barelySlowed[1] - 6)} />
        <Write x={B.CONN.x} y={B.CONN.y} text="1–2 connections" size={TS} anchor={B.CONN.anchor} progress={ramp(frame, ...EV.connections)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** One lane: users -> request line -> blogs table <- cron job, the request dots and the 'deleting' strip. */
const LaneView: React.FC<{G: LaneGeo; n: 0 | 1; lane: Lane; reqs: Req[]; title: string; frame: number; T: Theme; TS: number; ph: boolean}> = ({
  G,
  n,
  lane,
  reqs,
  title,
  frame,
  T,
  TS,
  ph,
}) => {
  const hatch = `hatch${useId().replace(/:/g, '')}`;
  const gone = deleted(frame, lane);
  const left = Math.max(0, Math.round((ROWS - gone) / 1000) * 1000);
  const blockW = G.BLOCK.w * (1 - gone / ROWS);
  return (
    <g>
      <defs>
        <pattern id={hatch} patternUnits="userSpaceOnUse" width={14} height={14} patternTransform="rotate(45)">
          <line x1={0} y1={0} x2={0} y2={14} stroke={T.ink2} strokeWidth={3} />
        </pattern>
      </defs>
      {/* ===== static figure (frame 0) ===== */}
      <Write x={G.TITLE.x} y={G.TITLE.y} text={title} size={TS} weight={600} />
      <Write x={G.COUNTER.x} y={G.COUNTER.y} text={`${fmt(left)} left`} size={TS} variant="mono" anchor={G.COUNTER.anchor} />
      <Write x={G.USERS.x} y={G.USERS.y} text="users" size={TS} color="ink2" />
      <Ink d={G.LINE_D} />
      <Ink d={G.LINE_HEAD} />
      <Ink d={G.TABLE_D} fill={T.sheet} />
      <Ink d={G.HEAD_D} width={STROKE.thin + 0.6} />
      <Write x={G.TABLE.x + G.TABLE.w / 2} y={G.TABLE.y + G.TABLE.head - (ph ? 12 : 13)} text="blogs" size={TS} variant="mono" anchor="middle" />
      {blockW > 0.5 ? (
        <rect x={G.BLOCK.x} y={G.BLOCK.y} width={blockW} height={G.BLOCK.h} fill={`url(#${hatch})`} stroke={T.ink2} strokeWidth={STROKE.thin} />
      ) : null}
      <Ink d={G.JOB_D} fill={T.sheet} />
      <Write x={G.JOB_TEXT.x} y={G.JOB_TEXT.y} text="cron job" size={TS} variant="mono" anchor="middle" />
      <Ink d={G.JOB_ARROW_D} />
      <Ink d={G.JOB_HEAD} />
      {/* when a DELETE is running */}
      <Write x={G.STRIP_LABEL.x} y={G.STRIP_LABEL.y} text="deleting" size={TS} color="ink2" />
      <Ink d={G.AXIS_D} width={STROKE.thin + 0.6} color="ink2" />
      <Ink d={G.AXIS_HEAD} width={STROKE.thin + 0.6} color="ink2" />
      {lane.runs.map(([a, b], i) => {
        const p = ramp(frame, a, b - a, LIN);
        if (p <= 0) return null;
        const x = n === 0 ? G.LONG.x : G.shortX(i);
        const w = (n === 0 ? G.LONG.w : G.SHORT) * p;
        return <rect key={i} x={x} y={G.S - G.BAR_H / 2} width={w} height={G.BAR_H} rx={3} fill={T.ink2} stroke={T.ink} strokeWidth={STROKE.thin} />;
      })}
      {/* request dots */}
      {reqs.map((_, i) => {
        const d = dotAt(frame, reqs, i, G, lane.visibleFrom);
        if (!d || d.o <= 0) return null;
        return (
          <g key={i} opacity={d.o}>
            <circle cx={d.x} cy={d.y} r={G.DOT_R + 3} fill={T.sheet} />
            <circle cx={d.x} cy={d.y} r={G.DOT_R} fill={T.blue} />
          </g>
        );
      })}
    </g>
  );
};

const Tick: React.FC<{x: number; y: number; color: string; sheet: string; o: number; s?: number}> = ({x, y, color, sheet, o, s = 1}) =>
  o <= 0 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={16 * s} fill={sheet} />
      <path
        d={`M ${x - 13 * s} ${y + 1 * s} L ${x - 3 * s} ${y + 11 * s} L ${x + 14 * s} ${y - 12 * s}`}
        fill="none"
        stroke={color}
        strokeWidth={STROKE.ink + 1}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );

export default StaggeredDelete;
