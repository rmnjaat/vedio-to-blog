// Clip l10-sawtooth — "Keep it under the cap".
// Storyboard: lectures/lec10/animations/l10-sawtooth/storyboard.{yaml,md}. Ledger: L-0244, L-0245, L-0246, L-0247, L-0248.
// Frame 0 = Fig 8·c's empty plot (axes, red 1 TB cap, empty CPU bar); the last frame is the annotated poster.
// The same writes are drawn three times on one plot; only the merge interval changes (P, P/2, 2P). Two layouts share
// one timeline: 'wide' (1200×800, dials in a right-hand column) and 'phone' (720×1024, dials under the CPU bar).
import React, {useId} from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, handLine, handPoly, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, RUN} from './timeline';

export type SawtoothProps = {theme: ThemeName; layout?: Layout};

// Wide lettering pinned to the page's sheets (critic C-05): the stage shows at ×0.45 (540 px), so 34 canvas px lands
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


// ---------- the model (layout-free): time u in [0, 1] along the axis, usage v (0 = live-data floor, 1 = the cap) ----------
const P = 1 / 3.75; // healthy merge interval: three full teeth, then a climb
const SLOPE = 0.5 / P; // the same write rate for every run: a healthy tooth climbs half-way to the cap
type Run = {key: 'healthy' | 'often' | 'rarely'; q: number; stopU: number; start: number};
const RUNS: Record<Run['key'], Run> = {
  healthy: {key: 'healthy', q: P, stopU: 1, start: EV.healthyRun},
  often: {key: 'often', q: P / 2, stopU: 1, start: EV.oftenRun},
  // merged every 2P, the first peak reaches the cap before its merge runs: the line stops there (crash)
  rarely: {key: 'rarely', q: 2 * P, stopU: 2 * P, start: EV.rarelyRun},
};
/** Merge times (drops) of a run, strictly inside the axis and before the run stops. */
const drops = (r: Run) => {
  const out: number[] = [];
  for (let k = 1; k * r.q < r.stopU - 1e-6; k++) out.push(k * r.q);
  return out;
};
const level = (r: Run, u: number) => (u - Math.floor(u / r.q + 1e-9) * r.q) * SLOPE;
const CRASH_F = RUNS.rarely.start + RUNS.rarely.stopU * RUN; // the frame the line touches the cap
const dropFrame = (r: Run, u: number) => r.start + u * RUN;

const rectPath = (x: number, y: number, w: number, h: number, seed: string) =>
  handPoly(
    [
      [x, y],
      [x + w, y],
      [x + w, y + h],
      [x, y + h],
      [x, y],
    ],
    seed,
  ) + ' Z';
const circlePath = (cx: number, cy: number, r: number, seed: string) =>
  handPoly(
    Array.from({length: 21}, (_, i) => {
      const a = -Math.PI / 2 + (i / 20) * Math.PI * 2;
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as Pt;
    }),
    seed,
  );

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const A = ph
    ? {yx: 110, axisY: 560, yTop: 88, xEnd: 650, x0: 120, x1: 540, floor: 515, cap: 160}
    : {yx: 150, axisY: 420, yTop: 96, xEnd: 660, x0: 160, x1: 640, floor: 380, cap: 150};
  const X = (u: number) => A.x0 + u * (A.x1 - A.x0);
  const Y = (v: number) => A.floor - v * (A.floor - A.cap);
  const pts = (r: Run): Pt[] => {
    const out: Pt[] = [[X(0), Y(0)]];
    for (const u of drops(r)) out.push([X(u), Y(level(r, u - 1e-9))], [X(u), Y(0)]);
    out.push([X(r.stopU), Y(r.stopU === 1 ? level(r, 1) : SLOPE * r.stopU)]);
    return out;
  };
  const tick = (u: number, seed: string) => handLine([X(u), A.axisY + (ph ? 8 : 9)], [X(u), A.axisY + (ph ? 34 : 40)], seed);
  const BAR = ph ? {x: 340, y: 688, w: 350, h: 32} : {x: 556, y: 566, w: 400, h: 36};
  const DIAL = ph
    ? {r: 22, d1: {x: 60, y: 770}, d2: {x: 60, y: 846}, tx: 98, l1: 781, l2a: 836, l2b: 873}
    : {r: 26, d1: {x: 740, y: 190}, d2: {x: 740, y: 270}, tx: 784, l1: 204, l2a: 262, l2b: 306};
  const dial = (c: {x: number; y: number}, seed: string) => {
    const a = (-50 * Math.PI) / 180;
    return {
      ring: circlePath(c.x, c.y, DIAL.r, seed),
      ptr: handLine([c.x, c.y], [c.x + DIAL.r * 0.72 * Math.cos(a), c.y + DIAL.r * 0.72 * Math.sin(a)], seed + 'p'),
    };
  };
  return {
    ph,
    W,
    H,
    TY,
    A,
    X,
    Y,
    yAxis: handLine([A.yx, A.axisY], [A.yx, A.yTop], 'yaxis'),
    yHead: chevron([A.yx, A.yTop], 0, -1, ph ? 13 : 16, 'yh'),
    xAxis: handLine([A.yx, A.axisY], [A.xEnd, A.axisY], 'xaxis'),
    xHead: chevron([A.xEnd, A.axisY], 1, 0, ph ? 13 : 16, 'xh'),
    capD: handLine([A.yx, A.cap], [A.xEnd, A.cap], 'cap'),
    curve: {
      healthy: handPoly(pts(RUNS.healthy), 'healthy'),
      often: handPoly(pts(RUNS.often), 'often'),
      rarely: handPoly(pts(RUNS.rarely), 'rarely'),
    },
    ticks: {
      healthy: drops(RUNS.healthy).map((u, i) => tick(u, `th${i}`)),
      often: drops(RUNS.often).map((u, i) => tick(u, `to${i}`)),
    },
    BAR,
    barD: rectPath(BAR.x, BAR.y, BAR.w, BAR.h, 'bar'),
    DIAL,
    dial1: dial(DIAL.d1, 'dial1'),
    dial2: dial(DIAL.d2, 'dial2'),
    crash: {x: X(RUNS.rarely.stopU), y: A.cap},
    L: ph
      ? {
          yLbl: {x: 130, y: 104},
          tb: {x: 98, y: 171},
          time: {x: 650, y: 604, anchor: 'end' as const},
          merge: {x: X(P) - 24, y: 646},
          cpu: {x: 30, y: 713},
          often: {x: 552, y: Y(level(RUNS.often, 1)) + 11},
          rarely: {x: 312, y: 262},
          crash: {x: 366, y: 144},
          monitor: [
            {x: 440, y: 796},
            {x: 440, y: 834},
          ],
        }
      : {
          yLbl: {x: 172, y: 106},
          tb: {x: 138, y: 164},
          time: {x: 676, y: 433, anchor: 'start' as const},
          merge: {x: X(P) - 28, y: 502},
          cpu: {x: 150, y: 596},
          often: {x: 656, y: Y(level(RUNS.often, 1)) + 13},
          rarely: {x: 372, y: 232},
          crash: {x: 444, y: 128},
          monitor: [{x: 1170, y: 70}],
        },
    DOT: ph ? 8 : 9,
    X_SIZE: ph ? 11 : 13,
    CAPTION_TOP: ph ? 904 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

export const Sawtooth: React.FC<SawtoothProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const C = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const uid = useId().replace(/:/g, '');

  // ----- each run's time (linear: the pen's speed along the axis IS time) -----
  const uOf = (r: Run) => Math.min(r.stopU, Math.max(0, (frame - r.start) / RUN));
  const u = {healthy: uOf(RUNS.healthy), often: uOf(RUNS.often), rarely: uOf(RUNS.rarely)};

  // ----- opacities: past runs ghost at 38%; the healthy run returns for the poster -----
  const back = ramp(frame, EV.unghostHealthy, 12, EASE_FADE);
  const oH = ghost(frame, EV.ghostHealthy) + (1 - ghost(frame, EV.ghostHealthy)) * back;
  const oO = ghost(frame, EV.ghostOften);
  const oR = ghost(frame, EV.unghostHealthy);
  // ghosted lettering stops at 55%: red at 38% on the blackboard sheet is illegible (lec10 review lesson)
  const TEXT_PAST = 0.55;
  const tO = 1 - (1 - TEXT_PAST) * ramp(frame, EV.ghostOften, 12, EASE_FADE);
  const tR = 1 - (1 - TEXT_PAST) * ramp(frame, EV.unghostHealthy, 12, EASE_FADE);

  // ----- CPU spent merging: one equal chunk per merge (counts merges; no cost claimed) -----
  const chunk = G.BAR.w / 10;
  const fillW = (r: Run) => drops(r).reduce((w, d) => w + chunk * ramp(frame, dropFrame(r, d), 8, EASE_FADE), 0);

  const redO = ramp(frame, CRASH_F, EV.crashRed, EASE_FADE);

  // a run's line, revealed left to right up to "now" (drops are vertical, so they appear at once: a sudden drop)
  const runLine = (r: Run, d: string, o: number, extra?: React.ReactNode) => {
    const uu = u[r.key];
    if (frame < r.start) return null;
    const x = G.X(uu) + (uu >= r.stopU ? 6 : 0);
    const id = `cl${uid}${r.key}`;
    return (
      <g opacity={o}>
        <clipPath id={id}>
          <rect x={0} y={0} width={x} height={G.H} />
        </clipPath>
        <g clipPath={`url(#${id})`}>
          <Ink d={d} width={STROKE.ink + 0.6} />
          {extra}
        </g>
      </g>
    );
  };
  // the pen dot at the tip of the run being drawn
  const penDot = (r: Run) => {
    const uu = u[r.key];
    if (frame <= r.start || uu >= r.stopU) return null;
    const o = fade(frame, r.start, Infinity, 6);
    return (
      <g opacity={o}>
        <circle cx={G.X(uu)} cy={G.Y(level(r, uu))} r={G.DOT + 3} fill={C.sheet} />
        <circle cx={G.X(uu)} cy={G.Y(level(r, uu))} r={G.DOT} fill={C.ink} />
      </g>
    );
  };
  const ticks = (r: Run, ds: string[], o: number) => (
    <g opacity={o}>
      {drops(r).map((d, i) => {
        const to = fade(frame, dropFrame(r, d), Infinity, 8);
        return to > 0 ? <Ink key={i} d={ds[i]} color="ink2" width={STROKE.thin + 0.8} dash="7 6" opacity={to} /> : null;
      })}
    </g>
  );
  const fill = (r: Run, o: number) => {
    const w = fillW(r);
    return w > 0.5 ? <rect x={G.BAR.x + 4} y={G.BAR.y + 4} width={Math.min(w, G.BAR.w - 8)} height={G.BAR.h - 8} rx={3} fill={C.ink3} opacity={o} /> : null;
  };
  const dial = (dd: {ring: string; ptr: string}, at: readonly [number, number]) => (
    <g>
      <Pen d={dd.ring} progress={ramp(frame, at[0], at[1] * 0.7)} width={STROKE.ink} />
      <Pen d={dd.ptr} progress={ramp(frame, at[0] + at[1] * 0.6, at[1] * 0.4)} width={STROKE.ink} />
    </g>
  );

  const firstMerge = dropFrame(RUNS.healthy, P);
  const monitorP = ramp(frame, ...EV.monitor);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure: Fig 8·c's empty plot ===== */}
        <Ink d={G.yAxis} />
        <Ink d={G.yHead} />
        <Ink d={G.xAxis} />
        <Ink d={G.xHead} />
        <Write x={G.L.yLbl.x} y={G.L.yLbl.y} text="disk used" size={TS} color="ink2" />
        <Write x={G.L.time.x} y={G.L.time.y} text="time" size={TS} color="ink2" anchor={G.L.time.anchor} />
        <Ink d={G.capD} color="red" width={STROKE.ink + 0.6} />
        <Write x={G.L.tb.x} y={G.L.tb.y} text="1 TB" size={G.TY.mono} variant="mono" color="red" anchor="end" weight={560} />
        <Write x={G.L.cpu.x} y={G.L.cpu.y} text="CPU spent merging" size={TS} color="ink2" />
        <Ink d={G.barD} width={STROKE.ink * 0.8} />

        {/* ===== CPU fills (too often under, healthy on top, so the poster shows healthy solid over too-often ghost) ===== */}
        {fill(RUNS.often, oO)}
        {fill(RUNS.healthy, oH)}

        {/* ===== B1: the healthy sawtooth ===== */}
        {runLine(RUNS.healthy, G.curve.healthy, oH)}
        {ticks(RUNS.healthy, G.ticks.healthy, oH)}
        <Write x={G.L.merge.x} y={G.L.merge.y} text="merge & compaction" size={TS} color="ink2" progress={ramp(frame, firstMerge + 4, EV.mergeLbl)} />

        {/* ===== B2: merge too often ===== */}
        {runLine(RUNS.often, G.curve.often, oO)}
        {ticks(RUNS.often, G.ticks.often, oO)}
        <Write x={G.L.often.x} y={G.L.often.y} text="too often" size={TS} progress={ramp(frame, ...EV.oftenLbl)} opacity={tO} />

        {/* ===== B3: merge too rarely: the peak hits the cap ===== */}
        {runLine(RUNS.rarely, G.curve.rarely, oR, redO > 0 ? <Ink d={G.curve.rarely} color="red" width={STROKE.ink + 0.6} opacity={redO} /> : null)}
        <g opacity={oR}>
          <Cross x={G.crash.x} y={G.crash.y} s={G.X_SIZE} color={C.red} sheet={C.sheet} o={fade(frame, CRASH_F + 2, Infinity, 8)} />
        </g>
        <Write x={G.L.crash.x} y={G.L.crash.y} text="disk full: crash" size={TS} color="red" weight={600} progress={ramp(frame, ...EV.crashLbl)} opacity={tR} />
        <Write x={G.L.rarely.x} y={G.L.rarely.y} text="too rarely" size={TS} progress={ramp(frame, ...EV.rarelyLbl)} opacity={tR} />

        {/* pen dots last, so the tip sits over every line */}
        {penDot(RUNS.healthy)}
        {penDot(RUNS.often)}
        {penDot(RUNS.rarely)}

        {/* ===== B4: the two knobs (board: 1. MC freq, 2. file rotation threshold) ===== */}
        {dial(G.dial1, EV.dial1)}
        <Write x={G.DIAL.tx} y={G.DIAL.l1} text="1. MC freq" size={G.TY.mono} variant="mono" progress={ramp(frame, ...EV.dial1Lbl)} />
        {dial(G.dial2, EV.dial2)}
        <Write x={G.DIAL.tx} y={G.DIAL.l2a} text="2. file rotation" size={G.TY.mono} variant="mono" progress={ramp(frame, ...EV.dial2Lbl)} />
        <Write x={G.DIAL.tx} y={G.DIAL.l2b} text="threshold" size={G.TY.mono} variant="mono" progress={ramp(frame, ...EV.dial2Lbl2)} />

        {/* ===== B5: monitor the sawtooth ===== */}
        {G.L.monitor.length === 1 ? (
          <Write x={G.L.monitor[0].x} y={G.L.monitor[0].y} text="monitor the sawtooth" size={TS} weight={600} anchor="end" progress={monitorP} />
        ) : (
          <>
            <Write x={G.L.monitor[0].x} y={G.L.monitor[0].y} text="monitor the" size={TS} weight={600} progress={Math.min(1, monitorP / 0.55)} />
            <Write x={G.L.monitor[1].x} y={G.L.monitor[1].y} text="sawtooth" size={TS} weight={600} progress={Math.max(0, (monitorP - 0.55) / 0.45)} />
          </>
        )}
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** A red ✕ stamped where the line touches the cap (paired with the words 'disk full: crash'). */
const Cross: React.FC<{x: number; y: number; s: number; color: string; sheet: string; o: number}> = ({x, y, s, color, sheet, o}) =>
  o <= 0 ? null : (
    <g opacity={o}>
      <circle cx={x} cy={y} r={s + 5} fill={sheet} />
      <path d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`} stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" fill="none" />
    </g>
  );

export default Sawtooth;
