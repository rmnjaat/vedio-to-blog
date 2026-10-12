// Clip l01-cascade — "One database under five API servers" (cascading failure).
// Storyboard: lectures/lec01/animations/l01-cascade/storyboard.{yaml,md}. Ledger: L-0099, L-0101, L-0102 (+ L-0100 final caption).
// Frame 0 = the pre-campaign row reader → lb → api → db; the last frame is the annotated poster (CascadePoster).
// Two layouts share one timeline: 'wide' (1200×800, left-to-right) and 'phone' (720×1040, top-to-bottom, ≤ 640 px).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {chevron, cylinder, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META} from './timeline';

export type CascadeProps = {theme: ThemeName; layout?: Layout};

const head = (pts: Pt[], seed: string, size = 20) => {
  const [ux, uy] = endDir(pts);
  return chevron(pts[pts.length - 1], ux, uy, size, seed);
};
const circ = (x: number, y: number, r: number) => `M ${x - r} ${y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
// stick figure (reader): head + body + arms + legs, as one path so a Pen can draw it. (x, y) = the hips' top.
const stick = (x: number, y: number, seed: string) =>
  [
    circ(x, y - 32, 14),
    handLine([x, y - 18], [x, y + 16], seed + 'b'),
    handLine([x - 22, y - 4], [x + 22, y - 4], seed + 'a'),
    handLine([x, y + 16], [x - 17, y + 44], seed + 'l'),
    handLine([x, y + 16], [x + 17, y + 44], seed + 'r'),
  ].join(' ');

type Lbl = {x: number; y: number; anchor?: 'start' | 'middle' | 'end'};

// ---------- geometry per layout (canvas px) ----------
// Arrays are indexed by position; index 1 (reader) and 2 (api) exist at frame 0.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);

  if (!ph) {
    // wide: readers | lb | api ×5 | bus → trunk → db, left to right
    const MID = 290;
    const READER_X = 88;
    const READER_Y = [150, MID, 430];
    const LB = {x: 236, y: 70, w: 26, h: 440};
    const LB_MX = LB.x + LB.w / 2;
    const API = {x: 360, w: 160, h: 64};
    const API_Y = [98, 194, MID, 386, 482];
    const BUS_X = 620;
    const DB = {cx: 990, top: 200, rx: 100, ry: 22, h: 180};
    const DB_IN = DB.cx - DB.rx - 6;
    const R_PTS: Pt[][] = READER_Y.map((y) => [[122, y], [LB.x - 4, y]]);
    const L_PTS: Pt[][] = API_Y.map((y) => [[LB.x + LB.w + 2, y], [API.x - 4, y]]);
    const STREAM = READER_Y.map((y) => (y === MID ? ([[122, MID], [API.x - 4, MID]] as Pt[]) : ([[122, y], [LB_MX, y], [LB_MX, MID], [API.x - 4, MID]] as Pt[])));
    const Q_PTS: Pt[][] = API_Y.map((y) => (y === MID ? [[API.x + API.w, MID], [DB_IN, MID]] : [[API.x + API.w, y], [BUS_X, y], [BUS_X, MID], [DB_IN, MID]]));
    const STUB = API_Y.map((y) => (y === MID ? null : ([[API.x + API.w, y], [BUS_X, y], [BUS_X, MID]] as Pt[])));
    const DB_BOTTOM = DB.top + DB.h + DB.ry;
    return {
      ph, W, H, TY,
      readers: READER_Y.map((y) => ({x: READER_X, y})),
      apis: API_Y.map((y) => ({x: API.x, y: y - API.h / 2, w: API.w, h: API.h, cx: API.x + API.w / 2, cy: y})),
      R_PTS, L_PTS, STREAM, Q_PTS, STUB,
      TRUNK: [[BUS_X, MID], [DB_IN, MID]] as Pt[],
      LB, DB, DB_BOTTOM,
      QUEUE: [866, 840, 814, 788].map((x) => [x, MID] as Pt),
      lbl: {
        lb: {x: LB_MX, y: LB.y + LB.h + 52, anchor: 'middle'},
        spike: {x: 36, y: 50},
        x5: {x: API.x + API.w / 2, y: 44, anchor: 'middle'},
        queries: {x: (BUS_X + DB_IN) / 2, y: MID - 20, anchor: 'middle'},
        timeouts: {x: (BUS_X + DB_IN) / 2, y: MID + 58, anchor: 'middle'},
        load: {x: DB.cx, y: DB.top + DB.h + 10, anchor: 'middle'},
        db: {x: DB.cx, y: DB_BOTTOM + 50, anchor: 'middle'},
        same: {x: DB.cx, y: DB_BOTTOM + 98, anchor: 'middle'},
        sat: {x: DB.cx - 14, y: DB.top - 44, anchor: 'middle'},
        fails: {x: API.x + API.w / 2 + 10, y: 570, anchor: 'middle'},
        errors: {x: READER_X, y: 540, anchor: 'middle'},
      } as Record<string, Lbl>,
      satX: [DB.cx + DB.rx + 30, DB.top - 34] as Pt,
      apiX: (a: {x: number; y: number; w: number}) => [a.x + a.w + 26, a.y + 6] as Pt,
      readerX: (r: {x: number; y: number}) => [r.x + 40, r.y - 40] as Pt,
      CAPTION_TOP: 652,
    };
  }

  // phone: readers on top, lb as a horizontal bar, api ×5 in a row, queries converge down onto the db
  const MIDX = 336;
  const READER_X = [216, MIDX, 456];
  const READER_HIP = 112; // stick figure: head ~66, feet ~156
  const LB = {x: 60, y: 210, w: 556, h: 26};
  const LB_MY = LB.y + LB.h / 2;
  const API = {w: 100, h: 56, top: 312};
  const API_X = [96, 216, MIDX, 456, 576];
  const API_BOT = API.top + API.h;
  const BUS_Y = 420;
  const DB = {cx: MIDX, top: 600, rx: 120, ry: 24, h: 150};
  const DB_IN = DB.top - DB.ry - 6;
  const R_PTS: Pt[][] = READER_X.map((x) => [[x, 166], [x, LB.y - 4]]);
  const L_PTS: Pt[][] = API_X.map((x) => [[x, LB.y + LB.h + 2], [x, API.top - 4]]);
  const STREAM = READER_X.map((x) => (x === MIDX ? ([[MIDX, 166], [MIDX, API.top - 4]] as Pt[]) : ([[x, 166], [x, LB_MY], [MIDX, LB_MY], [MIDX, API.top - 4]] as Pt[])));
  const Q_PTS: Pt[][] = API_X.map((x) => (x === MIDX ? [[MIDX, API_BOT], [MIDX, DB_IN]] : [[x, API_BOT], [x, BUS_Y], [MIDX, BUS_Y], [MIDX, DB_IN]]));
  const STUB = API_X.map((x) => (x === MIDX ? null : ([[x, API_BOT], [x, BUS_Y], [MIDX, BUS_Y]] as Pt[])));
  const DB_BOTTOM = DB.top + DB.h + DB.ry;
  return {
    ph, W, H, TY,
    readers: READER_X.map((x) => ({x, y: READER_HIP})),
    apis: API_X.map((cx) => ({x: cx - API.w / 2, y: API.top, w: API.w, h: API.h, cx, cy: API.top + API.h / 2})),
    R_PTS, L_PTS, STREAM, Q_PTS, STUB,
    TRUNK: [[MIDX, BUS_Y], [MIDX, DB_IN]] as Pt[],
    LB, DB, DB_BOTTOM,
    QUEUE: [552, 528, 504, 480].map((y) => [MIDX, y] as Pt),
    lbl: {
      lb: {x: LB.x + LB.w + 16, y: LB_MY + 10},
      spike: {x: 32, y: 44},
      x5: {x: 638, y: API.top + 38},
      queries: {x: MIDX + 22, y: 470},
      timeouts: {x: MIDX + 22, y: 510},
      load: {x: DB.cx, y: DB.top + DB.h + 6, anchor: 'middle'},
      db: {x: DB.cx, y: DB_BOTTOM + 42, anchor: 'middle'},
      same: {x: DB.cx, y: DB_BOTTOM + 80, anchor: 'middle'},
      sat: {x: DB.cx + DB.rx + 20, y: DB.top + 14},
      fails: {x: 32, y: 470},
      errors: {x: 530, y: 124},
    } as Record<string, Lbl>,
    satX: [DB.cx + DB.rx + 66, DB.top + 52] as Pt,
    apiX: (a: {x: number; y: number; w: number}) => [a.x + a.w - 8, a.y - 18] as Pt,
    readerX: (r: {x: number; y: number}) => [r.x + 38, r.y - 46] as Pt,
    CAPTION_TOP: 880,
  };
};

const paths = (layout: Layout) => {
  const g = build(layout);
  const hs = g.ph ? 16 : 18;
  return {
    ...g,
    R_D: g.R_PTS.map((p, i) => handPoly(p, `r${i}`)),
    R_HEAD: g.R_PTS.map((p, i) => head(p, `rh${i}`, hs)),
    L_D: g.L_PTS.map((p, i) => handPoly(p, `l${i}`)),
    L_HEAD: g.L_PTS.map((p, i) => head(p, `lh${i}`, hs)),
    STREAM_D: g.STREAM.map((p, i) => handPoly(p, `s${i}`)),
    Q_D: g.Q_PTS.map((p, i) => handPoly(p, `q${i}`)),
    Q_HEAD: head(g.Q_PTS[2], 'qh', g.ph ? 18 : 20),
    STUB_D: g.STUB.map((p, i) => (p ? handPoly(p, `q${i}`) : '')),
    TRUNK_D: handPoly(g.TRUNK, 'trunk'),
    API_D: g.apis.map((a, i) => serverBox(a.x, a.y, a.w, a.h, `api${i}`)),
    LB_D: serverBox(g.LB.x, g.LB.y, g.LB.w, g.LB.h, 'lb'),
    DB_C: cylinder(g.DB.cx, g.DB.top, g.DB.rx, g.DB.ry, g.DB.h, 'db'),
    STICK_D: g.readers.map((r, i) => stick(r.x, r.y, `u${i}`)),
  };
};
const LAYOUTS = {wide: paths('wide'), phone: paths('phone')};

const NEW_API = [0, 1, 3, 4];
const FAIL_ORDER = [2, 1, 3, 0, 4]; // nearest the db's reply first (middle out)
const cross = (x: number, y: number, s: number) => `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`;

export const Cascade: React.FC<CascadeProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const L = G.lbl;
  const pr = G.ph ? 8 : 9; // packet radius

  // ---- ① spike ----
  const readersP = ramp(frame, ...EV.readersDraw);
  const spikeLabelP = ramp(frame, ...EV.spikeLabel);
  const streamStart = EV.readerStream[0];
  const blueReaderP = ramp(frame, streamStart, 30, EASE_MOVE);
  const blueReaderO = 1 - ramp(frame, EV.errors[0], 14, EASE_FADE);

  // ---- ② fleet ----
  const boxP = (k: number) => ramp(frame, EV.fleetDraw[0] + k * 8, 24);
  const fleetLabelP = ramp(frame, ...EV.fleetLabel);
  const qP = (i: number) => ramp(frame, EV.queries[0] + i * 6, 36, EASE_MOVE);
  const blueQO = 1 - ramp(frame, EV.timeouts[0], 14, EASE_FADE);

  // ---- db load gauge ----
  const load = 0.3 + 0.28 * ramp(frame, ...EV.loadUp1, EASE_MOVE) + 0.42 * ramp(frame, EV.loadUp2[0], EV.loadUp2[1], (t) => t);
  const redF = ramp(frame, ...EV.redFill, EASE_FADE);
  const {DB, DB_BOTTOM, DB_C} = G;
  const levelY = DB_BOTTOM - load * (DB_BOTTOM - (DB.top - DB.ry));

  // ---- ③ queued ----
  const queuedO = (k: number) => fade(frame, EV.queued[0] + k * 15, EV.queuedOut[0], 8, EV.queuedOut[1]);

  // ---- ④ cascade ----
  const toP = ramp(frame, ...EV.timeouts, EASE_MOVE);
  const failO = (k: number) => ramp(frame, EV.apiFail[0] + k * 12, 10, EASE_FADE);
  const errP = ramp(frame, ...EV.errors, EASE_MOVE);
  const ERR_D = G.STREAM_D.map((d) => reversePath(d));

  const lbl = (k: string, text: string, rest: Partial<React.ComponentProps<typeof Write>> = {}) => (
    <Write x={L[k].x} y={L[k].y} anchor={L[k].anchor ?? 'start'} text={text} size={TS} {...rest} />
  );

  return (
    <Sheet theme={theme}>
      <Stage title="Cascading failure" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        <Ink d={G.R_D[1]} />
        <Ink d={G.R_HEAD[1]} />
        <Ink d={G.STICK_D[1]} />
        <Ink d={G.LB_D} fill={T.sheet} />
        {lbl('lb', 'lb', {variant: 'mono'})}
        <Ink d={G.L_D[2]} />
        <Ink d={G.L_HEAD[2]} />
        <Ink d={G.Q_D[2]} />
        <Ink d={G.Q_HEAD} />

        {/* db with its load gauge */}
        <defs>
          <clipPath id={`dbclip-${theme}-${layout}`}>
            <path d={DB_C.bodyFill} />
            <path d={DB_C.top} />
          </clipPath>
        </defs>
        <path d={DB_C.bodyFill} fill={T.sheet} stroke="none" />
        <path d={DB_C.top} fill={T.sheet} stroke="none" />
        <g clipPath={`url(#dbclip-${theme}-${layout})`}>
          <rect x={DB.cx - DB.rx - 4} y={levelY} width={DB.rx * 2 + 8} height={DB_BOTTOM - levelY + 4} fill={T.blue} opacity={0.2 * (1 - redF)} />
          <rect x={DB.cx - DB.rx - 4} y={levelY} width={DB.rx * 2 + 8} height={DB_BOTTOM - levelY + 4} fill={T.red} opacity={0.24 * redF} />
          <line x1={DB.cx - DB.rx} y1={levelY} x2={DB.cx + DB.rx} y2={levelY} stroke={T.blue} strokeWidth={STROKE.ink} opacity={1 - redF} />
          <line x1={DB.cx - DB.rx} y1={levelY} x2={DB.cx + DB.rx} y2={levelY} stroke={T.red} strokeWidth={STROKE.ink} opacity={redF} />
        </g>
        <Ink d={DB_C.sides} />
        <Ink d={DB_C.front} />
        <Ink d={DB_C.top} />
        {lbl('load', 'load', {color: 'ink2'})}
        {lbl('db', 'db', {variant: 'mono'})}

        {/* api (middle, frame 0) */}
        <Ink d={G.API_D[2]} fill={T.sheet} />
        <Write x={G.apis[2].cx} y={G.apis[2].cy + TS * 0.35} text="api" size={TS} variant="mono" anchor="middle" />

        {/* ===== ① readers flood in ===== */}
        {[0, 2].map((i) => (
          <g key={`rd${i}`}>
            <Pen d={G.STICK_D[i]} progress={readersP} />
            <Pen d={G.R_D[i]} progress={readersP} head={G.R_HEAD[i]} />
          </g>
        ))}
        {lbl('spike', 'campaign spike', {progress: spikeLabelP})}
        {/* request path re-inked blue */}
        {[0, 1, 2].map((i) => (
          <Pen key={`rb${i}`} d={G.R_D[i]} progress={blueReaderP} color="blue" head={G.R_HEAD[i]} opacity={blueReaderO} />
        ))}
        <Pen d={G.L_D[2]} progress={ramp(frame, streamStart + 14, 22, EASE_MOVE)} color="blue" head={G.L_HEAD[2]} opacity={blueReaderO} />
        {[0, 1, 2].flatMap((i) =>
          [0, 1].map((k) => <Packet key={`sp${i}${k}`} d={G.STREAM_D[i]} progress={ramp(frame, streamStart + i * 5 + k * 16, 26, EASE_MOVE)} color="blue" r={pr} />),
        )}

        {/* ===== ② the fleet widens to five ===== */}
        {NEW_API.map((i, k) => (
          <g key={`f${i}`}>
            <Pen d={G.L_D[i]} progress={boxP(k)} head={G.L_HEAD[i]} />
            <Pen d={G.L_D[i]} progress={boxP(k)} color="blue" head={G.L_HEAD[i]} opacity={blueReaderO} />
            <Pen d={G.STUB_D[i]} progress={boxP(k)} />
            {boxP(k) > 0 ? <path d={G.API_D[i]} fill={T.sheet} opacity={Math.min(1, boxP(k) * 3)} /> : null}
            <Pen d={G.API_D[i]} progress={boxP(k)} />
            <Write x={G.apis[i].cx} y={G.apis[i].cy + TS * 0.35} text="api" size={TS} variant="mono" anchor="middle" progress={ramp(frame, EV.fleetDraw[0] + k * 8 + 14, 14)} />
          </g>
        ))}
        {lbl('x5', '×5', {progress: fleetLabelP})}
        {/* five query paths, re-inked blue, converging on the db */}
        <Pen d={G.TRUNK_D} progress={ramp(frame, EV.queries[0] + 18, 20, EASE_MOVE)} color="blue" width={STROKE.thick + 1} opacity={blueQO} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`q${i}`}>
            <Pen d={G.Q_D[i]} progress={qP(i)} color="blue" head={i === 2 ? G.Q_HEAD : undefined} opacity={blueQO} />
            <Packet d={G.Q_D[i]} progress={qP(i)} color="blue" r={pr} />
          </g>
        ))}
        <Pen d={G.Q_HEAD} progress={qP(4)} color="blue" opacity={blueQO} width={STROKE.ink + 0.6} />
        {/* stays fully inked: it is still true at the end, and a ghosted blue label on red lines can't be read */}
        {lbl('queries', '5× queries', {color: 'blue', progress: ramp(frame, ...EV.queriesLabel)})}
        {lbl('same', 'same size', {color: 'ink2', progress: ramp(frame, ...EV.unchangedLabel)})}

        {/* ===== ③ saturation: queries queue, fill reaches the top and turns red ===== */}
        {G.QUEUE.map(([x, y], k) => {
          const o = queuedO(k);
          return o > 0 ? (
            <g key={`qq${k}`} opacity={o}>
              <circle cx={x} cy={y} r={12} fill={T.sheet} />
              <circle cx={x} cy={y} r={9} fill={T.blue} />
            </g>
          ) : null;
        })}
        <g opacity={ramp(frame, EV.satMark, 8, EASE_FADE)}>
          <path d={cross(G.satX[0], G.satX[1], 15)} stroke={T.red} strokeWidth={STROKE.ink + 1.4} strokeLinecap="round" fill="none" />
        </g>
        {lbl('sat', 'saturated', {color: 'red', progress: ramp(frame, ...EV.satLabel), weight: 600})}

        {/* ===== ④ cascade: timeouts run back, servers fail, readers get errors ===== */}
        <Pen d={reversePath(G.TRUNK_D)} progress={ramp(frame, EV.timeouts[0], 20, EASE_MOVE)} color="red" dash="13 10" width={STROKE.ink + 0.6} />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={`t${i}`}>
            <Pen d={reversePath(G.Q_D[i])} progress={toP} color="red" dash="13 10" width={STROKE.ink + 0.6} />
            <Packet d={reversePath(G.Q_D[i])} progress={toP} color="red" r={pr} />
          </g>
        ))}
        {lbl('timeouts', 'timeouts', {color: 'red', progress: ramp(frame, ...EV.timeoutsLabel)})}
        {FAIL_ORDER.map((i, k) => {
          const o = failO(k);
          const [cx, cy] = G.apiX(G.apis[i]);
          return o > 0 ? (
            <g key={`af${i}`} opacity={o}>
              <Ink d={G.API_D[i]} color="red" width={STROKE.ink + 1.2} />
              <path d={cross(cx, cy, 9)} stroke={T.red} strokeWidth={STROKE.ink} strokeLinecap="round" fill="none" />
            </g>
          ) : null;
        })}
        {lbl('fails', 'fails with it', {color: 'red', progress: ramp(frame, ...EV.failLabel)})}
        <Pen d={reversePath(G.L_D[2])} progress={ramp(frame, EV.errors[0], 12, EASE_MOVE)} color="red" dash="13 10" />
        {[0, 1, 2].map((i) => {
          const [cx, cy] = G.readerX(G.readers[i]);
          return (
            <g key={`e${i}`}>
              <Pen d={reversePath(G.R_D[i])} progress={ramp(frame, EV.errors[0] + 14, 20, EASE_MOVE)} color="red" dash="13 10" />
              <Packet d={ERR_D[i]} progress={errP} color="red" r={pr} />
              <g opacity={ramp(frame, EV.errorMarks, 8, EASE_FADE)}>
                <path d={cross(cx, cy, 11)} stroke={T.red} strokeWidth={STROKE.ink + 1} strokeLinecap="round" fill="none" />
              </g>
            </g>
          );
        })}
        {lbl('errors', 'errors', {color: 'red', progress: ramp(frame, ...EV.errorsLabel)})}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default Cascade;
