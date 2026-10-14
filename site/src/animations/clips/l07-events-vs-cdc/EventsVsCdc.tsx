// Clip l07-events-vs-cdc — "The same changes, two pipelines".
// Storyboard: lectures/lec07/animations/l07-events-vs-cdc/storyboard.{yaml,md}.
// Ledger: L-0026, L-0028, L-0033, L-0034, L-0040, L-0065, L-0346 (+ A-CDP-03, sourced).
// Frame 0 = Fig 1·b's lane (api → kafka ← consumer → mysql) and Fig 1·c's lane (mongodb's log ← cdc → mysql) on one
// sheet, every row empty; the last frame is the poster (1 of 4 vs 4 of 4).
// Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×960, ≤ 640 px). On the phone the events lane
// turns down from the consumer into its mysql and the CDC lane runs down from cdc into its mysql; lettering is 30 px.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, cylinder, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useTheme} from '../../lib/primitives';
import {FONT, STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, CH, CHANGES, EV, META} from './timeline';

export type EventsVsCdcProps = {theme: ThemeName; layout?: Layout};

// Wide lettering pinned to the page's sheets (critic C-17): the stage shows at ×0.45 (540 px), so 34 canvas px lands
// at ~15 px and the 36 px caption at ~16 px, beside the sheets' 13–14 px labels. Phone keeps the shared sizes
// (30 → 15 px at 358 px).
const typeFor = (l: Layout) => (l === 'phone' ? TYPE_PHONE : {...TYPE, label: 34, mono: 34, small: 34, title: 36, caption: 36});
const CAP_K = 36 / TYPE.caption;
/** The shared caption band; on the wide stage drawn in a 1/CAP_K-size box and scaled down, so it letters at 36 px. */
const Captions: React.FC<{top: number; layout: Layout}> = ({top, layout}) =>
  layout === 'phone' ? (
    <CaptionBand cues={CAPTIONS} top={top} layout="phone" />
  ) : (
    <div style={{position: 'absolute', left: 0, top: 0, width: `${100 / CAP_K}%`, height: `${100 / CAP_K}%`, transform: `scale(${CAP_K})`, transformOrigin: '0 0'}}>
      <CaptionBand cues={CAPTIONS} top={top / CAP_K} layout="wide" />
    </div>
  );

const K4 = [0, 1, 2, 3];
type Box = {x: number; y: number; w: number; h: number};
const cx = (b: Box) => b.x + b.w / 2;
const cy = (b: Box) => b.y + b.h / 2;

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const LY = ph ? 80 : 80; // events lane centre line
  const API: Box = ph ? {x: 20, y: 50, w: 130, h: 60} : {x: 30, y: 50, w: 130, h: 60};
  const PIPE = ph ? {x0: 214, x1: 324, ry: 26, capRx: 10} : {x0: 236, x1: 396, ry: 30, capRx: 12};
  const CONS: Box = ph ? {x: 385, y: 50, w: 170, h: 60} : {x: 466, y: 50, w: 220, h: 60};
  const DB = ph ? {cx: 85, top: 206, rx: 70, ry: 14, h: 62} : {cx: 110, top: 196, rx: 88, ry: 16, h: 80};
  const LOG = ph ? {x: 180, y: 206, w: 150, h: 40, pitch: 46} : {x: 272, y: 196, w: 200, h: 46, pitch: 52};
  const CDC: Box = ph ? {x: 410, y: 424, w: 120, h: 56} : {x: 616, y: 268, w: 160, h: 60};
  const MQ = ph ? {cx: 470, top: 170, rx: 52, ry: 12, h: 56} : {cx: 816, top: 48, rx: 76, ry: 16, h: 64}; // events mysql
  const MC = ph ? {cx: 470, top: 548, rx: 52, ry: 12, h: 60} : {cx: 816, top: 432, rx: 76, ry: 16, h: 70}; // cdc mysql
  const TAB = ph ? {x: 562, w: 150, h: 40, pitch: 46, yq: 136, yc: 516, mark: 536} : {x: 956, w: 228, h: 44, pitch: 50, yq: 24, yc: 408, mark: 922};
  const WORK: Box = ph ? {x: 14, y: 560, w: 180, h: 56} : {x: 14, y: 520, w: 250, h: 60};
  const READ_X = ph ? 374 : 548; // the read arrow's vertical leg
  const head = ph ? 15 : 18;

  const rowY = (k: number) => LOG.y + LOG.pitch * k + LOG.h / 2;
  const logRight = LOG.x + LOG.w;
  const dbTopTip = DB.top - DB.ry - 4;
  const dbBotTip = DB.top + DB.h + DB.ry + 4;

  // arrows (drawing direction = initiator → target; heads on the target)
  const apiDbPts: Pt[] = [[cx(API), API.y + API.h], [cx(API), dbTopTip]];
  const apiKafkaPts: Pt[] = [[API.x + API.w, LY], [PIPE.x0 - PIPE.capRx - 4, LY]];
  const pullPts: Pt[] = [[CONS.x, LY], [PIPE.x1 + PIPE.capRx + 4, LY]]; // consumer pulls from kafka
  const consMqPts: Pt[] = ph ? [[cx(CONS), CONS.y + CONS.h], [MQ.cx, MQ.top - MQ.ry - 4]] : [[CONS.x + CONS.w, LY], [MQ.cx - MQ.rx - 4, LY]];
  const cdcMcPts: Pt[] = ph
    ? [[cx(CDC), CDC.y + CDC.h], [MC.cx, MC.top - MC.ry - 4]]
    : [[CDC.x + CDC.w, cy(CDC)], [MC.cx, cy(CDC)], [MC.cx, MC.top - MC.ry - 4]];
  const workPts: Pt[] = [[DB.cx, WORK.y], [DB.cx, dbBotTip]]; // straight up into mongodb
  const dir = (pts: Pt[]) => {
    const a = pts[pts.length - 2];
    const b = pts[pts.length - 1];
    const l = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    return [(b[0] - a[0]) / l, (b[1] - a[1]) / l] as const;
  };
  const arrow = (pts: Pt[], seed: string) => {
    const [ux, uy] = dir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, head, seed + 'h'), pts};
  };
  const straight = (pts: Pt[]) => pts.map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');

  const pipeMid = (PIPE.x0 + PIPE.x1) / 2;
  const pipeD = (() => {
    const {x0, x1, ry, capRx} = PIPE;
    const top = handLine([x0, LY - ry], [x1, LY - ry], 'pt');
    const bot = handLine([x0, LY + ry], [x1, LY + ry], 'pb');
    const left = `M ${x0} ${LY - ry} A ${capRx} ${ry} 0 1 0 ${x0} ${LY + ry} A ${capRx} ${ry} 0 1 0 ${x0} ${LY - ry}`;
    const right = `M ${x1} ${LY - ry} A ${capRx} ${ry} 0 0 1 ${x1} ${LY + ry}`;
    return `${top} ${bot} ${left} ${right}`;
  })();
  const pipeFill = `M ${PIPE.x0} ${LY - PIPE.ry} L ${PIPE.x1} ${LY - PIPE.ry} A ${PIPE.capRx} ${PIPE.ry} 0 0 1 ${PIPE.x1} ${LY + PIPE.ry} L ${PIPE.x0} ${LY + PIPE.ry} Z`;

  return {
    ph, W, H, TY, LY, API, PIPE, CONS, DB, LOG, CDC, MQ, MC, TAB, WORK, READ_X, head, rowY, logRight,
    API_D: serverBox(API.x, API.y, API.w, API.h, 'api'),
    CONS_D: serverBox(CONS.x, CONS.y, CONS.w, CONS.h, 'cons'),
    CDC_D: serverBox(CDC.x, CDC.y, CDC.w, CDC.h, 'cdc'),
    WORK_D: serverBox(WORK.x, WORK.y, WORK.w, WORK.h, 'work'),
    PIPE_D: pipeD,
    PIPE_FILL: pipeFill,
    DB_C: cylinder(DB.cx, DB.top, DB.rx, DB.ry, DB.h, 'db'),
    MQ_C: cylinder(MQ.cx, MQ.top, MQ.rx, MQ.ry, MQ.h, 'mq'),
    MC_C: cylinder(MC.cx, MC.top, MC.rx, MC.ry, MC.h, 'mc'),
    LOG_ROW: K4.map((k) => serverBox(LOG.x, LOG.y + LOG.pitch * k, LOG.w, LOG.h, `lr${k}`)),
    MQ_ROW: K4.map((k) => serverBox(TAB.x, TAB.yq + TAB.pitch * k, TAB.w, TAB.h, `qr${k}`)),
    MC_ROW: K4.map((k) => serverBox(TAB.x, TAB.yc + TAB.pitch * k, TAB.w, TAB.h, `cr${k}`)),
    DB_LOG: handLine([DB.cx + DB.rx, rowY(0)], [LOG.x, rowY(0)], 'dblog'),
    A_API_DB: arrow(apiDbPts, 'apidb'),
    A_API_KAFKA: arrow(apiKafkaPts, 'apik'),
    A_PULL: arrow(pullPts, 'pull'),
    A_CONS_MQ: arrow(consMqPts, 'consmq'),
    A_CDC_MC: arrow(cdcMcPts, 'cdcmc'),
    A_WORK: arrow(workPts, 'work'),
    // packet routes (plain polylines so the dot rides the line exactly)
    P_API_DB: straight(apiDbPts),
    P_WORK_DB: straight(workPts),
    P_HOPS: ph
      ? [straight([[API.x + API.w, LY], [pipeMid, LY]]), straight([[pipeMid, LY], [CONS.x, LY]]), straight(consMqPts)]
      : [straight([[API.x + API.w, LY], [pipeMid, LY]]), straight([[pipeMid, LY], [CONS.x, LY]]), straight(consMqPts)],
    P_CDC_MC: straight(cdcMcPts),
    // read path for row k (cdc → log); reversed for the data packet
    readPts: (y: number): Pt[] => [[CDC.x, cy(CDC)], [READ_X, cy(CDC)], [READ_X, y], [logRight + 10, y]],
    lbl: ph
      ? {
          kafka: {x: (PIPE.x0 + PIPE.x1) / 2, y: 40},
          crashed: {x: cx(API), y: 36},
          noEvent: {x: cx(API) + 20, y: 152},
          log: {x: LOG.x - 12, y: rowY(3) + TY.label * 0.35, anchor: 'end' as const}, // beside its last row
          down: {x: cx(CDC), y: CDC.y - 16},
          checkpoint: {x: READ_X - 10, y: cy(CDC) - 12, anchor: 'end' as const}, // over the read arrow's last leg
          oneOf4: {x: MQ.cx, y: MQ.top + MQ.h + MQ.ry + 40},
          fourOf4: {x: MC.cx, y: MC.top + MC.h + MC.ry + 40},
        }
      : {
          kafka: {x: (PIPE.x0 + PIPE.x1) / 2, y: 38},
          crashed: {x: cx(API), y: 38},
          noEvent: {x: cx(API) + 22, y: 150},
          log: {x: LOG.x + LOG.w / 2, y: LOG.y + LOG.pitch * 3 + LOG.h + 46, anchor: 'middle' as const},
          down: {x: cx(CDC), y: CDC.y - 16},
          checkpoint: {x: READ_X + 14, y: 380, anchor: 'start' as const},
          oneOf4: {x: MQ.cx, y: MQ.top + MQ.h + MQ.ry + 50},
          fourOf4: {x: MC.cx, y: MC.top + MC.h + MC.ry + 50},
        },
    CAPTION_TOP: ph ? 740 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type Geo = (typeof LAYOUTS)['wide'];

const crossD = (x: number, y: number, s: number) => `M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`;
const tickD = (x: number, y: number, s: number) => `M ${x - s} ${y} L ${x - s * 0.3} ${y + s * 0.75} L ${x + s} ${y - s * 0.8}`;
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A cylinder drawn in ink with its mono name inside. */
const Cyl: React.FC<{c: ReturnType<typeof cylinder>; x: number; y: number; name: string; size: number}> = ({c, x, y, name, size}) => {
  const t = useTheme();
  return (
    <g>
      <path d={c.bodyFill} fill={t.sheet} />
      <Ink d={c.sides} />
      <Ink d={c.front} />
      <Ink d={c.top} fill={t.sheet} />
      <Write x={x} y={y} text={name} size={size} variant="mono" anchor="middle" />
    </g>
  );
};

/** A red ✕ or green ✓ with a sheet-coloured halo, drawn as strokes (not font glyphs). */
const Mark: React.FC<{kind: 'x' | 'tick'; x: number; y: number; s: number; opacity: number}> = ({kind, x, y, s, opacity}) => {
  const t = useTheme();
  if (opacity <= 0) return null;
  const d = kind === 'x' ? crossD(x, y, s) : tickD(x, y, s);
  const c = kind === 'x' ? t.red : t.green;
  return (
    <g opacity={opacity}>
      <path d={d} stroke={t.sheet} strokeWidth={STROKE.ink + 6} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d={d} stroke={c} strokeWidth={STROKE.ink + 1.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  );
};

/**
 * One row slot. 'empty' = thin dashed graphite; 'written' (log) = solid ink + name; 'copied' = solid green + green name + ✓;
 * 'missed' = red dashed + red name + ✕. `p` is the progress of the change into the new state.
 */
const Row: React.FC<{G: Geo; d: string; x: number; y: number; name: string; state: 'written' | 'copied' | 'missed'; p: number; mark?: number}> = ({
  G,
  d,
  x,
  y,
  name,
  state,
  p,
  mark,
}) => {
  const TS = G.TY.label;
  const o = ramp(p, 0, 0.35, EASE_FADE); // outline swaps over the first third of the write
  const col = state === 'written' ? 'ink' : state === 'copied' ? 'green' : 'red';
  const h = G.LOG.h;
  return (
    <g>
      <Ink d={d} color="ink3" width={STROKE.thin} dash="8 8" opacity={1 - o} />
      {o > 0 ? <Ink d={d} color={col} dash={state === 'missed' ? '12 9' : undefined} opacity={o} /> : null}
      <Write x={x + (G.ph ? 10 : 14)} y={y + h / 2 + TS * 0.35} text={name} size={TS} variant="mono" color={col} progress={p} />
      {mark !== undefined ? <Mark kind={state === 'missed' ? 'x' : 'tick'} x={mark} y={y + h / 2} s={G.ph ? 9 : 11} opacity={ramp(p, 0.5, 0.5, EASE_FADE)} /> : null}
    </g>
  );
};

/** A graphite arrow that is re-inked in a marker colour while a packet rides it, then fades back. */
const Reink: React.FC<{d: string; head: string; frame: number; at: readonly [number, number]; color?: 'blue'}> = ({d, head, frame, at, color = 'blue'}) => {
  const p = ramp(frame, at[0], at[1], EASE_MOVE);
  const back = ramp(frame, at[0] + at[1] + 4, EV.reinkFade, EASE_FADE);
  if (p <= 0 || back >= 1) return null;
  return <Pen d={d} progress={p} head={head} color={color} opacity={1 - back} />;
};

export const EventsVsCdc: React.FC<EventsVsCdcProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T: Theme = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const L = G.lbl;
  const dy = TS * 0.35;
  const {API, CONS, CDC, DB, LOG, MQ, MC, TAB, WORK} = G;

  // ---- CDC read position (row index, 0..3) and its state ----
  const caret = CH.reduce((s, c) => s + (c.caret ? ramp(frame, c.caret[0], c.caret[1], EASE_MOVE) : 0), 0);
  const readY = lerp(G.rowY(Math.floor(caret)), G.rowY(Math.min(3, Math.floor(caret) + 1)), caret - Math.floor(caret));
  const readPts = G.readPts(readY);
  const readD = handPoly(readPts, 'read');
  const readHead = chevron(readPts[3], -1, 0, G.head, 'readh');
  const down = ramp(frame, ...EV.cdcDown, EASE_FADE) * (1 - ramp(frame, ...EV.cdcBack, EASE_FADE));

  // ---- marks of the misses ----
  const noEventO = fade(frame, EV.noEventX[0], Infinity, EV.noEventX[1]) * ghost(frame, BEAT.crash);
  const crashO = fade(frame, EV.crashX[0], Infinity, EV.crashX[1]) * ghost(frame, BEAT.likes);
  const workerO = ghost(frame, BEAT.resume);

  const xS = G.ph ? 16 : 22;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {/* events lane: api → kafka ← consumer → mysql */}
        <Ink d={G.API_D} fill={T.sheet} />
        <Write x={cx(API)} y={cy(API) + dy} text="api" size={TS} variant="mono" anchor="middle" />
        <Ink d={G.A_API_KAFKA.d} />
        <Ink d={G.A_API_KAFKA.head} />
        <path d={G.PIPE_FILL} fill={T.sheet} />
        <Ink d={G.PIPE_D} />
        <Write x={L.kafka.x} y={L.kafka.y} text="kafka" size={TS} variant="mono" anchor="middle" />
        <Ink d={G.A_PULL.d} />
        <Ink d={G.A_PULL.head} />
        <Ink d={G.CONS_D} fill={T.sheet} />
        <Write x={cx(CONS)} y={cy(CONS) + dy} text="consumer" size={TS} variant="mono" anchor="middle" />
        <Ink d={G.A_CONS_MQ.d} />
        <Ink d={G.A_CONS_MQ.head} />
        <Cyl c={G.MQ_C} x={MQ.cx} y={MQ.top + MQ.h / 2 + MQ.ry * 0.6 + dy} name="mysql" size={TS} />

        {/* source: api → mongodb, its log */}
        <Ink d={G.A_API_DB.d} />
        <Ink d={G.A_API_DB.head} />
        <Cyl c={G.DB_C} x={DB.cx} y={DB.top + DB.h / 2 + DB.ry * 0.6 + dy} name="mongodb" size={TS} />
        <Ink d={G.DB_LOG} width={STROKE.thin} />
        <Write x={L.log.x} y={L.log.y} text="log" size={TS} variant="mono" anchor={L.log.anchor} />

        {/* cdc lane: cdc reads the log, writes mysql */}
        <Ink d={readD} dash="12 10" opacity={1 - down} />
        <Ink d={readHead} opacity={1 - down} />
        <Ink d={readD} color="red" dash="12 10" opacity={down} />
        <Ink d={readHead} color="red" opacity={down} />
        <Ink d={G.CDC_D} fill={T.sheet} opacity={1} />
        <Ink d={G.CDC_D} color="red" dash="12 9" opacity={down} fill={T.sheet} />
        <Write x={cx(CDC)} y={cy(CDC) + dy} text="cdc" size={TS} variant="mono" anchor="middle" color={down > 0.5 ? 'red' : 'ink'} />
        <Ink d={G.A_CDC_MC.d} />
        <Ink d={G.A_CDC_MC.head} />
        <Cyl c={G.MC_C} x={MC.cx} y={MC.top + MC.h / 2 + MC.ry * 0.6 + dy} name="mysql" size={TS} />

        {/* rows: log (source), events mysql, cdc mysql */}
        {K4.map((k) => {
          const c = CH[k];
          const ly = LOG.y + LOG.pitch * k;
          const qy = TAB.yq + TAB.pitch * k;
          const cyy = TAB.yc + TAB.pitch * k;
          const ev = c.events;
          const qState = 'miss' in ev ? 'missed' : 'copied';
          const qSpan = 'miss' in ev ? ev.miss : ev.row;
          return (
            <g key={`rows${k}`}>
              <Row G={G} d={G.LOG_ROW[k]} x={LOG.x} y={ly} name={CHANGES[k]} state="written" p={ramp(frame, ...c.logRow)} />
              <Row G={G} d={G.MQ_ROW[k]} x={TAB.x} y={qy} name={CHANGES[k]} state={qState} p={ramp(frame, ...qSpan)} mark={TAB.mark} />
              <Row G={G} d={G.MC_ROW[k]} x={TAB.x} y={cyy} name={CHANGES[k]} state="copied" p={ramp(frame, ...c.cdcRow)} mark={TAB.mark} />
            </g>
          );
        })}

        {/* ===== ④ the likes job (drawn when it first acts) ===== */}
        <g opacity={workerO}>
          <path d={G.WORK_D} fill={T.sheet} opacity={ramp(frame, ...EV.workerBox) > 0 ? 1 : 0} />
          <Pen d={G.WORK_D} progress={ramp(frame, ...EV.workerBox)} />
          <Write x={cx(WORK)} y={cy(WORK) + dy} text="likes job" size={TS} variant="mono" anchor="middle" progress={ramp(frame, ...EV.workerLabel)} />
          <Pen d={G.A_WORK.d} progress={ramp(frame, ...EV.workerArrow)} head={G.A_WORK.head} />
        </g>

        {/* ===== motion: writes into mongodb, event hops, cdc copies ===== */}
        {K4.map((k) => {
          const c = CH[k];
          const ev = c.events;
          const fromWorker = k === 3;
          return (
            <g key={`mv${k}`}>
              {fromWorker ? (
                <Reink d={G.A_WORK.d} head={G.A_WORK.head} frame={frame} at={c.dbWrite} />
              ) : (
                <Reink d={G.A_API_DB.d} head={G.A_API_DB.head} frame={frame} at={c.dbWrite} />
              )}
              <Packet d={fromWorker ? G.P_WORK_DB : G.P_API_DB} progress={ramp(frame, ...c.dbWrite, EASE_MOVE)} color="blue" />
              {'hops' in ev ? (
                <>
                  <Reink d={G.A_API_KAFKA.d} head={G.A_API_KAFKA.head} frame={frame} at={ev.hops[0]} />
                  <Packet d={G.P_HOPS[0]} progress={ramp(frame, ...ev.hops[0], EASE_MOVE)} color="blue" />
                  <Packet d={G.P_HOPS[1]} progress={ramp(frame, ...ev.hops[1], EASE_MOVE)} color="blue" />
                  <Reink d={G.A_CONS_MQ.d} head={G.A_CONS_MQ.head} frame={frame} at={ev.hops[2]} />
                  <Packet d={G.P_HOPS[2]} progress={ramp(frame, ...ev.hops[2], EASE_MOVE)} color="blue" />
                </>
              ) : null}
              <Packet d={handPolyStraightReverse(readPts)} progress={ramp(frame, ...c.cdc[0], EASE_MOVE)} color="blue" />
              <Reink d={G.A_CDC_MC.d} head={G.A_CDC_MC.head} frame={frame} at={c.cdc[1]} />
              <Packet d={G.P_CDC_MC} progress={ramp(frame, ...c.cdc[1], EASE_MOVE)} color="blue" />
            </g>
          );
        })}

        {/* ===== ② no event ===== */}
        <Mark kind="x" x={(API.x + API.w + G.PIPE.x0 - G.PIPE.capRx) / 2} y={G.LY} s={xS * 0.8} opacity={noEventO} />
        <Write x={L.noEvent.x} y={L.noEvent.y} text="no event" size={TS} color="red" progress={ramp(frame, ...EV.noEventLabel)} opacity={ghost(frame, BEAT.crash)} />

        {/* ===== ③ the api crashes after saving ===== */}
        {/* the api box turns red dashed (like cdc's `down`), so the ✕ never covers its name */}
        {crashO > 0 ? (
          <g opacity={crashO}>
            <Ink d={G.API_D} color="red" dash="12 9" fill={T.sheet} />
            <Write x={cx(API)} y={cy(API) + dy} text="api" size={TS} variant="mono" anchor="middle" color="red" />
          </g>
        ) : null}
        <Write x={L.crashed.x} y={L.crashed.y} text="crashed" size={TS} color="red" anchor="middle" progress={ramp(frame, ...EV.crashLabel)} opacity={ghost(frame, BEAT.likes)} />

        {/* ===== ④ cdc down → back ===== */}
        <Write x={L.down.x} y={L.down.y} text="down" size={TS} color="red" anchor="middle" progress={ramp(frame, ...EV.downLabel)} opacity={1 - ramp(frame, ...EV.cdcBack, EASE_FADE)} weight={600} />
        <Write x={L.down.x} y={L.down.y} text="back" size={TS} color="green" anchor="middle" progress={ramp(frame, ...EV.backLabel)} weight={600} />
        <Write x={L.checkpoint.x} y={L.checkpoint.y} text="checkpoint" size={TS} anchor={L.checkpoint.anchor} progress={ramp(frame, ...EV.checkpointLabel)} />

        {/* ===== summary ===== */}
        <Write x={L.oneOf4.x} y={L.oneOf4.y} text="1 of 4" size={TS} color="red" anchor="middle" progress={ramp(frame, ...EV.oneOf4)} weight={600} />
        <Write x={L.fourOf4.x} y={L.fourOf4.y} text="4 of 4" size={TS} color="green" anchor="middle" progress={ramp(frame, ...EV.fourOf4)} weight={600} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** The read path reversed as a plain polyline: the data rides from the log row back to cdc. */
const handPolyStraightReverse = (pts: Pt[]) =>
  [...pts].reverse().map((p, i) => `${i ? 'L' : 'M'} ${p[0]} ${p[1]}`).join(' ');

export default EventsVsCdc;
