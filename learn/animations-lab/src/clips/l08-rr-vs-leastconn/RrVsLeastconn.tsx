// Clip l08-rr-vs-leastconn — "Why long requests pile up".
// Storyboard: lectures/lec08/animations/l08-rr-vs-leastconn/storyboard.{yaml,md}. Ledger: L-0053, L-0070, L-0072,
// L-0074, L-0075, L-0077, L-0078.
// Frame 0 = two panels (round robin above, least connections below): an lb bar, three fan lines to s1 s2 s3 with
// open-connection counts of 0, and empty time tracks. The last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, desktop) and 'phone' (720×900, portrait re-flow, ≤ 640 px).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handLine, serverBox} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, CLOCK, EV, HOP, META, PLACED, openConns, type Lane} from './timeline';

export type RrVsLeastconnProps = {theme: ThemeName; layout?: Layout};

const LANES: Lane[] = ['rr', 'lc'];
const NAMES = ['s1', 's2', 's3'];

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const DY = ph ? 346 : 306; // second panel offset
  const ROWS = ph ? [120, 204, 288] : [118, 192, 266];
  const LB = ph ? {x: 20, w: 18, y0: 82, y1: 326} : {x: 34, w: 22, y0: 84, y1: 300};
  const BOX = ph ? {x: 70, w: 110, h: 60, label: 82, div: 124, cx: 153} : {x: 128, w: 140, h: 56, label: 144, div: 204, cx: 237};
  const TRACK = ph ? [200, 552] : [300, 820]; // track end leaves a clear gutter before the notes column
  const rowY = (lane: number, s: number) => ROWS[s] + lane * DY;
  const geo = LANES.map((_, li) => ({
    lb: serverBox(LB.x, LB.y0 + li * DY, LB.w, LB.y1 - LB.y0, `lb${li}`),
    fan: ROWS.map((_, s) => handLine([LB.x + LB.w, rowY(li, s)], [BOX.x - 3, rowY(li, s)], `fan${li}${s}`)),
    head: ROWS.map((_, s) => chevron([BOX.x - 3, rowY(li, s)], 1, 0, ph ? 12 : 14, `fh${li}${s}`)),
    hop: ROWS.map((_, s) => handLine([LB.x + LB.w + 4, rowY(li, s)], [BOX.x - 10, rowY(li, s)], `hop${li}${s}`)),
    box: ROWS.map((_, s) => serverBox(BOX.x, rowY(li, s) - BOX.h / 2, BOX.w, BOX.h, `box${li}${s}`)),
    div: ROWS.map((_, s) => handLine([BOX.div, rowY(li, s) - BOX.h / 2 + 10], [BOX.div, rowY(li, s) + BOX.h / 2 - 10], `div${li}${s}`)),
  }));
  return {
    ph,
    W,
    H,
    TY,
    DY,
    ROWS,
    LB,
    BOX,
    TRACK,
    rowY,
    geo,
    TITLE: {x: LB.x, y: ph ? 52 : 54, size: ph ? TY.title : TY.title},
    COUNT_SIZE: ph ? 36 : 44,
    SUB: ph ? [0, -22, 22] : [0, -22, 22],
    BAR_W: ph ? 12 : 10,
    NOTE_X: ph ? 584 : 846,
    HEAD_X: ph ? 700 : 1164,
    RING: serverBox(BOX.x - 10, ROWS[0] - BOX.h / 2 - 10, BOX.w + 20, BOX.h + 20, 'ring'),
    TIME: {x: TRACK[1], y: ph ? 712 : 640},
    CAPTION_TOP: ph ? 740 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Playhead x for a frame: linear in clip time between CLOCK[0] and CLOCK[1]. */
const clockX = (G: ReturnType<typeof build>, frame: number) => {
  const t = Math.min(Math.max(frame, CLOCK[0]), CLOCK[1]);
  return G.TRACK[0] + ((t - CLOCK[0]) / (CLOCK[1] - CLOCK[0])) * (G.TRACK[1] - G.TRACK[0]);
};

/** Frame of the last change of a server's count at or before `frame` (for the in-place re-write). */
const lastChange = (lane: Lane, s: number, frame: number) => {
  let f = -Infinity;
  for (const p of PLACED[lane]) {
    if (p.server !== s) continue;
    if (p.start <= frame) f = Math.max(f, p.start);
    if (p.end <= frame) f = Math.max(f, p.end);
  }
  return f;
};

export const RrVsLeastconn: React.FC<RrVsLeastconnProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const px = (f: number) => clockX(G, f);
  const nowX = px(frame);

  const ringO = fade(frame, EV.ring[0], Infinity, EV.ring[1]);
  const lcGreen = frame >= EV.headBottom[0];

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {LANES.map((lane, li) => {
          const g = G.geo[li];
          const dy = li * G.DY;
          return (
            <g key={lane}>
              {/* ===== static figure (frame 0) ===== */}
              <Write x={G.TITLE.x} y={G.TITLE.y + dy} text={lane === 'rr' ? 'lb: round robin' : 'lb: least connections'} size={G.TITLE.size} />
              <Ink d={g.lb} fill={T.sheet} />
              {G.ROWS.map((_, s) => {
                const y = G.rowY(li, s);
                return (
                  <g key={s}>
                    <Ink d={g.fan[s]} />
                    <Ink d={g.head[s]} />
                    <Ink d={g.box[s]} fill={T.sheet} />
                    <Ink d={g.div[s]} color="ink3" width={STROKE.thin} />
                    <Write x={G.BOX.label} y={y + TS * 0.36} text={NAMES[s]} size={TS} variant="mono" />
                  </g>
                );
              })}
              {/* playhead: thin dashed line across the panel's three tracks (it means time) */}
              <line
                x1={nowX}
                x2={nowX}
                y1={G.ROWS[0] + dy - G.BOX.h / 2 - 8}
                y2={G.ROWS[2] + dy + G.BOX.h / 2 + 8}
                stroke={T.ink3}
                strokeWidth={STROKE.thin}
                strokeDasharray="6 8"
                strokeLinecap="round"
              />

              {/* ===== requests: packet lb -> server, then a bar on the server's track ===== */}
              {PLACED[lane].map((p) => {
                const y = G.rowY(li, p.server);
                const hopP = ramp(frame, p.at, HOP, EASE_MOVE);
                const blueO = 1 - ramp(frame, p.at + HOP + 6, 14, EASE_FADE);
                const by = y + G.SUB[p.row];
                // round caps are inset by half the bar width, so a bar's ink spans exactly its time on the server
                const cap = G.BAR_W / 2;
                const x0 = px(p.start) + cap;
                const done = frame >= p.end;
                const xEnd = Math.max(x0, px(Math.min(frame, p.end)) - cap);
                const runO = done ? 1 - ramp(frame, p.end, 10, EASE_FADE) : 1;
                return (
                  <g key={p.n}>
                    <Pen d={g.hop[p.server]} progress={hopP} color="blue" width={STROKE.ink + 1} opacity={blueO} />
                    <Packet d={g.hop[p.server]} progress={hopP} color="blue" r={G.ph ? 9 : 10} />
                    {frame >= p.start ? (
                      <>
                        {done ? <line x1={x0} x2={Math.max(x0, px(p.end) - cap)} y1={by} y2={by} stroke={T.ink2} strokeWidth={G.BAR_W} strokeLinecap="round" /> : null}
                        {runO > 0 ? (
                          <line x1={x0} x2={xEnd} y1={by} y2={by} stroke={T.blue} strokeWidth={G.BAR_W} strokeLinecap="round" opacity={runO} />
                        ) : null}
                      </>
                    ) : null}
                  </g>
                );
              })}

              {/* ===== open-connection counts (re-written in place when they change) ===== */}
              {G.ROWS.map((_, s) => {
                const y = G.rowY(li, s);
                const n = openConns(lane, s, frame);
                const ch = lastChange(lane, s, frame);
                const red = lane === 'rr' && s === 0 && frame >= EV.ring[0];
                const color = red ? 'red' : lane === 'lc' && lcGreen ? 'green' : 'ink';
                return (
                  <Write
                    key={s}
                    x={G.BOX.cx}
                    y={y + G.COUNT_SIZE * 0.36}
                    text={String(n)}
                    size={G.COUNT_SIZE}
                    variant="num"
                    anchor="middle"
                    color={color}
                    progress={ch === -Infinity ? 1 : ramp(frame, ch, 8)}
                  />
                );
              })}
            </g>
          );
        })}

        {/* ===== B3: request 7 — round robin's turn lands on busy s1; least connections finds s2 ===== */}
        <Ink d={G.RING} color="red" dash="12 9" opacity={ringO} />
        <Write x={G.NOTE_X} y={G.rowY(0, 0) + TS * 0.36} text="its turn" size={TS} color="red" weight={600} progress={ramp(frame, ...EV.noteTurn)} />
        <Write x={G.NOTE_X} y={G.rowY(1, 1) + TS * 0.36} text="fewest" size={TS} color="blue" weight={600} progress={ramp(frame, ...EV.noteFewest)} />

        {/* ===== B4: s2 and s3 idle under round robin ===== */}
        <Write x={G.NOTE_X} y={G.rowY(0, 1) + TS * 0.36} text="idle" size={TS} color="ink2" progress={ramp(frame, ...EV.idle2)} />
        <Write x={G.NOTE_X} y={G.rowY(0, 2) + TS * 0.36} text="idle" size={TS} color="ink2" progress={ramp(frame, ...EV.idle3)} />

        {/* ===== B5: the summary, written in each panel's header ===== */}
        <Write x={G.HEAD_X} y={G.TITLE.y} text="long ones pile up" size={TS} color="red" anchor="end" weight={600} progress={ramp(frame, ...EV.headTop)} />
        <Write x={G.HEAD_X - (G.ph ? 40 : 50)} y={G.TITLE.y + G.DY} text="spread out" size={TS} color="green" anchor="end" weight={600} progress={ramp(frame, ...EV.headBottom)} />
        <Tick x={G.HEAD_X - (G.ph ? 16 : 20)} y={G.TITLE.y + G.DY - TS * 0.32} color={T.green} o={ramp(frame, EV.headBottom[0] + EV.headBottom[1] - 4, 8, EASE_FADE)} s={G.ph ? 0.8 : 1} />

        {/* time axis label (time is not to scale) */}
        <Write x={G.TIME.x - (G.ph ? 30 : 40)} y={G.TIME.y} text="time (not to scale)" size={TS} color="ink2" anchor="end" />
        <Ink d={handLine([G.TIME.x - (G.ph ? 24 : 32), G.TIME.y - TS * 0.32], [G.TIME.x, G.TIME.y - TS * 0.32], 'tarr')} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={chevron([G.TIME.x, G.TIME.y - TS * 0.32], 1, 0, 12, 'tarh')} color="ink2" width={STROKE.thin + 0.6} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const Tick: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 1}) =>
  o <= 0 ? null : (
    <path
      d={`M ${x - 13 * s} ${y + 1 * s} L ${x - 3 * s} ${y + 11 * s} L ${x + 14 * s} ${y - 12 * s}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink + 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );

export default RrVsLeastconn;
