// Clip l05-deadlock — "One cycle": two transactions, two rows; one wait is harmless, the second wait in the opposite
// order closes the cycle, the engine rolls one back (here T2) and the other commits. Lock rows in one order.
// Storyboard: lectures/lec05/animations/l05-deadlock/storyboard.{yaml,md}.
// Ledger: L-0025, L-0026, L-0028, L-0031, L-0032, L-0033 (softened per SN-04), L-0096.
// Frame 0 = Fig 1·e's parts without edges; the last frame is the annotated poster.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {chevron, endDir, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META} from './timeline';
import {handCircle, hourglass, padlock, tick} from './glyphs';

export type DeadlockProps = {theme: ThemeName; layout?: Layout};

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

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: T1 left, T2 right, row 1 top middle, row 2 bottom middle (Fig 1·e); the four edges form one
// orthogonal ring, status labels sit inside the ring, verdicts and the fix note under it, the stamp above it.
// phone 720×1000: T1 top, T2 bottom, row 1 left, row 2 right; the stamp on its own top row, verdicts and the fix
// note under T2.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const TY = typeFor(layout);
  const S = TY.label;
  const base = (yc: number) => yc + S * 0.35; // text baseline for a visual centre yc
  const R = ph ? 50 : 58;
  const T1: Pt = ph ? [360, 170] : [190, 300];
  const T2: Pt = ph ? [360, 630] : [1010, 300];
  const ROW1 = ph ? {x: 40, y: 365, w: 200, h: 70} : {x: 470, y: 120, w: 260, h: 80};
  const ROW2 = ph ? {x: 480, y: 365, w: 200, h: 70} : {x: 470, y: 400, w: 260, h: 80};
  const hs = ph ? 16 : 20;
  const arrow = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
  };
  // holds: drawn from the transaction to the row it locks (no head); wants: transaction -> row (head at the row)
  const P = ph
    ? {
        wantT1: [[T1[0] - R, T1[1]], [140, T1[1]], [140, ROW1.y - 4]] as Pt[],
        holdT1: [[T1[0] + R, T1[1]], [580, T1[1]], [580, ROW2.y]] as Pt[],
        holdT2: [[T2[0] - R, T2[1]], [140, T2[1]], [140, ROW1.y + ROW1.h]] as Pt[],
        wantT2: [[T2[0] + R, T2[1]], [580, T2[1]], [580, ROW2.y + ROW2.h + 4]] as Pt[],
      }
    : {
        wantT1: [[T1[0], T1[1] - R], [T1[0], 160], [ROW1.x - 4, 160]] as Pt[],
        holdT1: [[T1[0], T1[1] + R], [T1[0], 440], [ROW2.x, 440]] as Pt[],
        holdT2: [[T2[0], T2[1] - R], [T2[0], 160], [ROW1.x + ROW1.w, 160]] as Pt[],
        wantT2: [[T2[0], T2[1] + R], [T2[0], 440], [ROW2.x + ROW2.w + 4, 440]] as Pt[],
      };
  const wantT1 = arrow(P.wantT1, 'w1');
  const wantT2 = arrow(P.wantT2, 'w2');
  const holdT1 = handPoly(P.holdT1, 'h1');
  const holdT2 = handPoly(P.holdT2, 'h2');
  const rowLbl = (b: typeof ROW1) => ({x: b.x + b.w * (ph ? 0.35 : 0.37), y: base(b.y + b.h / 2)});
  const lockAt = (b: typeof ROW1) => padlock(b.x + b.w - (ph ? 40 : 50), b.y + b.h / 2 + (ph ? 6 : 8), ph ? 13 : 16, `lk${b.x}${b.y}`);
  const hgS = ph ? 14 : 17;
  // status slots ("waits" -> "commits ✓" for T1, "waits" -> "retry" for T2), inside the ring next to each transaction
  const st1 = ph ? {hx: 322, x: 342, y: 270} : {hx: 276, x: 302, y: 300};
  const st2 = ph ? {hx: 322, x: 342, y: 538} : {hx: 924, x: 898, y: 300};
  return {
    ph, S, TY, R, T1, T2, ROW1, ROW2, wantT1, wantT2, holdT1, holdT2,
    W: ph ? META.phone.width : META.width,
    H: ph ? META.phone.height : META.height,
    T1C: handCircle(T1[0], T1[1], R, 't1'),
    T2C: handCircle(T2[0], T2[1], R, 't2'),
    ROW1D: serverBox(ROW1.x, ROW1.y, ROW1.w, ROW1.h, 'row1'),
    ROW2D: serverBox(ROW2.x, ROW2.y, ROW2.w, ROW2.h, 'row2'),
    row1Lbl: rowLbl(ROW1),
    row2Lbl: rowLbl(ROW2),
    lockRow1: lockAt(ROW1),
    lockRow2: lockAt(ROW2),
    // the loop, in its direction of travel: T1 -> row 1 -> T2 -> row 2 -> T1
    LEGS: [wantT1.d, reversePath(holdT2), wantT2.d, reversePath(holdT1)],
    wantsLbl: ph ? {x: 225, y: 150} : {x: 330, y: 140},
    holdsLbl: ph ? {x: 495, y: 150} : {x: 330, y: 494},
    hg1: hourglass(st1.hx, st1.y, hgS, 'hg1'),
    hg2: hourglass(st2.hx, st2.y, hgS, 'hg2'),
    wait1: {x: st1.x, y: base(st1.y), anchor: 'start' as const},
    wait2: ph ? {x: st2.x, y: base(st2.y), anchor: 'start' as const} : {x: st2.x, y: base(st2.y), anchor: 'end' as const},
    commit: ph ? {x: 290, y: base(st1.y)} : {x: 268, y: base(st1.y)},
    commitTick: ph ? tick(436, st1.y - 3, 11) : tick(462, st1.y - 4, 14),
    retry: ph ? {x: 374, y: base(st2.y), anchor: 'middle' as const} : {x: 930, y: base(st2.y), anchor: 'end' as const},
    cycle: ph ? {x: 360, y: base(400)} : {x: 600, y: base(300)},
    stamp: ph ? {x: 360, y: 78} : {x: 600, y: 72},
    err: ph ? {x: 350, y: 728, anchor: 'end' as const} : {x: T2[0], y: 548, anchor: 'middle' as const},
    rolled: ph ? {x: 372, y: 728, anchor: 'start' as const} : {x: T2[0], y: 604, anchor: 'middle' as const},
    fix: ph ? {x: 360, y: 792} : {x: 560, y: 604},
    pr: ph ? 8 : 10,
    CAPTION_TOP: ph ? 850 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const at = (r: readonly [number, number]) => r;
// The broken cycle's label ghosts less far than its lines (0.55, not 0.38): at 0.38 the red word was illegible on the
// blackboard sheet, and the poster still names the loop.
const LABEL_PAST = (frame: number) => 1 - 0.45 * ramp(frame, EV.release, 12, EASE_FADE);

export const Deadlock: React.FC<DeadlockProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const S = G.S;

  // ---- B1: two locks ----
  const hold1P = ramp(frame, ...at(EV.hold1));
  const hold2P = ramp(frame, ...at(EV.hold2));
  // ---- B2: T1 wants row 1 and waits ----
  const want1P = ramp(frame, ...at(EV.want1), EASE_MOVE);
  const want1Blue = 1 - ramp(frame, EV.want1Ink, 14, EASE_FADE);
  const wait1O = fade(frame, EV.wait1[0], EV.wait1Out, 8, 10);
  // ---- B3: T2 wants row 2, the loop closes ----
  const want2P = ramp(frame, ...at(EV.want2), EASE_MOVE);
  const want2Blue = 1 - ramp(frame, EV.want2Ink, 14, EASE_FADE);
  const wait2O = fade(frame, EV.wait2[0], EV.wait2Out, 8, 10);
  const legP = (i: number) => ramp(frame, EV.loop[0] + i * EV.loop[1], EV.loop[1]);
  // ---- B5: T2's side ghosts; T1's red legs give way (green grant on one, plain hold on the other) ----
  const t2Side = ghost(frame, EV.release);
  const t1Red = 1 - ramp(frame, EV.release, 12, EASE_FADE);

  const Lock: React.FC<{l: ReturnType<typeof padlock>; o: number}> = ({l, o}) =>
    o <= 0 ? null : (
      <g opacity={o}>
        <Ink d={l.shackle} color="green" />
        <Ink d={l.body} color="green" fill={T.greenWash} />
      </g>
    );

  return (
    <Sheet theme={theme}>
      <Stage title="A deadlock: one cycle of waits" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== B1–B3 edges, under the glyphs ===== */}
        {/* T1's side: holds row 2, wants row 1 */}
        <Pen d={G.holdT1} progress={hold1P} />
        <Pen d={G.wantT1.d} progress={want1P} head={G.wantT1.head} />
        <Pen d={G.wantT1.d} progress={want1P} head={G.wantT1.head} color="blue" opacity={want1Blue} />
        <Packet d={G.wantT1.d} progress={want1P} color="blue" r={G.pr} />
        {/* red loop on T1's legs (removed when the cycle is broken) */}
        <g opacity={t1Red}>
          <Pen d={G.LEGS[0]} progress={legP(0)} color="red" head={G.wantT1.head} />
          <Pen d={G.LEGS[3]} progress={legP(3)} color="red" />
        </g>
        {/* T2's side: holds row 1, wants row 2; ghosts with its half of the loop once T2 is rolled back */}
        <g opacity={t2Side}>
          <Pen d={G.holdT2} progress={hold2P} />
          <Pen d={G.wantT2.d} progress={want2P} head={G.wantT2.head} />
          <Pen d={G.wantT2.d} progress={want2P} head={G.wantT2.head} color="blue" opacity={want2Blue} />
          <Pen d={G.LEGS[1]} progress={legP(1)} color="red" />
          <Pen d={G.LEGS[2]} progress={legP(2)} color="red" head={G.wantT2.head} />
        </g>
        <Packet d={G.wantT2.d} progress={want2P} color="blue" r={G.pr} />
        {/* B5: T1 is granted row 1 */}
        <Pen d={G.wantT1.d} progress={ramp(frame, ...at(EV.grant))} head={G.wantT1.head} color="green" width={STROKE.ink + 0.8} />

        {/* ===== static figure (frame 0) ===== */}
        <Ink d={G.T1C} fill={T.sheet} />
        <Ink d={G.T2C} fill={T.sheet} />
        <Write x={G.T1[0]} y={G.T1[1] + S * 0.35} text="T1" variant="mono" size={S} anchor="middle" />
        <Write x={G.T2[0]} y={G.T2[1] + S * 0.35} text="T2" variant="mono" size={S} anchor="middle" />
        <Ink d={G.ROW1D} fill={T.sheet} />
        <Ink d={G.ROW2D} fill={T.sheet} />
        <Write x={G.row1Lbl.x} y={G.row1Lbl.y} text="row 1" variant="mono" size={S} anchor="middle" />
        <Write x={G.row2Lbl.x} y={G.row2Lbl.y} text="row 2" variant="mono" size={S} anchor="middle" />

        {/* ===== B1: padlocks (green = granted) + "holds" ===== */}
        <Lock l={G.lockRow2} o={fade(frame, EV.lock1)} />
        <Lock l={G.lockRow1} o={fade(frame, EV.lock2, EV.release, 8, 10)} />
        <Lock l={G.lockRow1} o={fade(frame, EV.lock3)} />
        <Write x={G.holdsLbl.x} y={G.holdsLbl.y} text="holds" size={S} color="ink2" anchor="middle" progress={ramp(frame, ...at(EV.holdsLbl))} />

        {/* ===== B2: "wants", T1 waits ===== */}
        <Write x={G.wantsLbl.x} y={G.wantsLbl.y} text="wants" size={S} color="ink2" anchor="middle" progress={ramp(frame, ...at(EV.wantsLbl))} />
        <Ink d={G.hg1} opacity={wait1O} />
        <Write x={G.wait1.x} y={G.wait1.y} text="waits" size={S} anchor={G.wait1.anchor} progress={ramp(frame, ...at(EV.wait1))} opacity={fade(frame, 0, EV.wait1Out, 1, 10)} />

        {/* ===== B3: T2 waits; the loop is named ===== */}
        <Ink d={G.hg2} opacity={wait2O} />
        <Write x={G.wait2.x} y={G.wait2.y} text="waits" size={S} anchor={G.wait2.anchor} progress={ramp(frame, ...at(EV.wait2))} opacity={fade(frame, 0, EV.wait2Out, 1, 10)} />
        <Write x={G.cycle.x} y={G.cycle.y} text="cycle" size={S} color="red" anchor="middle" weight={640} progress={ramp(frame, ...at(EV.cycleLbl))} opacity={LABEL_PAST(frame)} />

        {/* ===== B4: detected; T2 rolled back ===== */}
        <Write x={G.stamp.x} y={G.stamp.y} text="deadlock detected" size={S} color="red" anchor="middle" weight={640} progress={ramp(frame, ...at(EV.stamp))} />
        <Pen d={G.T2C} progress={ramp(frame, ...at(EV.victim))} color="red" width={STROKE.ink + 0.8} />
        <Write x={G.T2[0]} y={G.T2[1] + S * 0.35} text="T2" variant="mono" size={S} anchor="middle" color="red" opacity={fade(frame, EV.victim[0] + 8, Infinity, 12)} />
        <Write x={G.err.x} y={G.err.y} text="ERROR 1213" variant="mono" size={S} color="red" anchor={G.err.anchor} progress={ramp(frame, ...at(EV.err))} />
        <Write x={G.rolled.x} y={G.rolled.y} text="rolled back" size={S} color="red" anchor={G.rolled.anchor} progress={ramp(frame, ...at(EV.rolled))} />

        {/* ===== B5: T1 commits, T2 retries ===== */}
        <Write x={G.commit.x} y={G.commit.y} text="commits" size={S} color="green" weight={600} progress={ramp(frame, ...at(EV.commit))} />
        <Pen d={G.commitTick} progress={ramp(frame, EV.commit[0] + EV.commit[1] - 8, 10)} color="green" width={STROKE.ink + 0.8} />
        <Write x={G.retry.x} y={G.retry.y} text="retry" size={S} anchor={G.retry.anchor} progress={ramp(frame, ...at(EV.retry))} />

        {/* ===== B6: the fix ===== */}
        <Write x={G.fix.x} y={G.fix.y} text="lock rows in one order" size={S} anchor="middle" weight={620} progress={ramp(frame, ...at(EV.fix))} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default Deadlock;
