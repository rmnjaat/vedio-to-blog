// Clip l08-redlock — "Winning a majority": two clients race for one lock on five independent Redis nodes. C1 lands
// first on r1-r3 (3/5, in time: acquired), C2 on r4-r5 (2/5: failed), so C2 gives them back and waits a random delay;
// r2 goes down, C1 still holds, and C2's retry again reaches only 2/5. Fault tolerant, not faster.
// Storyboard: lectures/lec08/animations/l08-redlock/storyboard.{yaml,md}.
// Ledger: L-0275, L-0278, L-0279, L-0280, L-0281, L-0282 (+ A-LDA-05 'took < TTL', A-LDA-06 'random delay').
// Frame 0 = Fig 7·a (five independent cylinders, clients wired to every node); the last frame is the annotated poster.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, cylinder, endDir, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META, NODES, RACE_DUR, RACE_START, RETRY_DUR, RETRY_START, arrival, winner} from './timeline';
import {clock, cross, tick} from './glyphs';

export type RedlockProps = {theme: ThemeName; layout?: Layout};

type Box = {x: number; y: number; w: number; h: number};

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: clients in a left column (C1 top, C2 bottom); C1's rail runs above the row of five cylinders and
// drops into each top, C2's rail runs below and rises into each bottom. C1's verdict is a header row above C1, the
// board's note sits in the left column between the clients, C2's log is one row under its rail, the takeaway under it.
// phone 720×1000: the note on its own top row; C1 box with its verdict to the right; narrower cylinders; C2 box with
// its log in three rows to the right; the takeaway under the log.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const S = typeFor(layout).label;
  const NX = ph ? [150, 264, 378, 492, 606] : [440, 600, 760, 920, 1080];
  const RX = ph ? 44 : 56;
  const RY = ph ? 13 : 16;
  const TOP = ph ? 290 : 250;
  const H = ph ? 110 : 120;
  const C1: Box = ph ? {x: 24, y: 92, w: 120, h: 56} : {x: 40, y: 108, w: 150, h: 64};
  const C2: Box = ph ? {x: 24, y: 520, w: 120, h: 56} : {x: 40, y: 428, w: 150, h: 64};
  const RAIL1 = ph ? 200 : 140;
  const RAIL2 = ph ? 470 : 460;
  const hs = ph ? 14 : 18;
  const arrow = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
  };
  const top1 = TOP - RY - (ph ? 5 : 6); // C1's arrow tips, just above each cylinder
  const bot2 = TOP + H + RY + (ph ? 5 : 6); // C2's arrow tips, just below each cylinder
  const p1 = NX.map((x, i) =>
    arrow(
      ph
        ? [[C1.x + C1.w / 2, C1.y + C1.h], [C1.x + C1.w / 2, RAIL1], [x, RAIL1], [x, top1]]
        : [[C1.x + C1.w, RAIL1], [x, RAIL1], [x, top1]],
      `p1-${i}`,
    ),
  );
  const p2 = NX.map((x, i) =>
    arrow(
      ph
        ? [[C2.x + C2.w / 2, C2.y], [C2.x + C2.w / 2, RAIL2], [x, RAIL2], [x, bot2]]
        : [[C2.x + C2.w, RAIL2], [x, RAIL2], [x, bot2]],
      `p2-${i}`,
    ),
  );
  const cellY = TOP + (ph ? 78 : 95); // centre of the value cell
  return {
    ph, S, NX, RX, TOP, H, C1, C2, p1, p2,
    W: ph ? META.phone.width : META.width,
    H_: ph ? META.phone.height : META.height,
    cyl: NX.map((x, i) => cylinder(x, TOP, RX, RY, H, `r${i + 1}`)),
    C1D: serverBox(C1.x, C1.y, C1.w, C1.h, 'c1box'),
    C2D: serverBox(C2.x, C2.y, C2.w, C2.h, 'c2box'),
    nameY: TOP + (ph ? 44 : 55),
    valY: cellY + S * 0.35,
    // refusal marks on the loser's drop, next to the node
    x1: NX.map((x, i) => cross(x, (RAIL1 + top1) / 2, ph ? 10 : 12, `x1-${i}`)),
    x2: NX.map((x, i) => cross(x, (RAIL2 + bot2) / 2, ph ? 10 : 12, `x2-${i}`)),
    crash: cross(NX[1], cellY, ph ? 15 : 20, 'crash'),
    setnx: ph ? {x: 100, y: RAIL1 - 12} : {x: C1.x + C1.w + 22, y: RAIL1 - 16},
    note: ph
      ? [{x: 360, y: 52, text: 'no replication · all independent', anchor: 'middle' as const}]
      : [
          {x: 36, y: 288, text: 'no replication,', anchor: 'start' as const},
          {x: 36, y: 338, text: 'all independent', anchor: 'start' as const},
        ],
    c1Verdict: ph ? {x: 166, y: 131} : {x: 40, y: 72},
    c1Tick: ph ? tick(392, 121, 10, 'tk') : tick(336, 58, 14, 'tk'),
    c1Ttl: ph ? {x: 422, y: 131} : {x: 386, y: 72},
    r2Note: ph ? {x: 700, y: 176} : {x: 1170, y: 72}, // right-aligned: wide after 'took < TTL', phone under it
    c2Verdict: ph ? {x: 166, y: 560} : {x: 40, y: 545},
    c2Cross: ph ? cross(342, 550, 10, 'c2x') : cross(272, 532, 13, 'c2x'),
    clock: ph ? clock(182, 606, 13, 'clk') : clock(352, 532, 17, 'clk'),
    delay: ph ? {x: 210, y: 616} : {x: 384, y: 545},
    retry: ph ? {x: 166, y: 672} : {x: 720, y: 545},
    retryCross: ph ? cross(342, 662, 10, 'rtx') : cross(954, 532, 13, 'rtx'),
    takeaway: ph ? {x: 360, y: 752} : {x: 600, y: 610},
    pr: ph ? 8 : 10,
    CAPTION_TOP: ph ? 800 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const at = (r: readonly [number, number]) => r;
const C1_WINS = NODES.filter((i) => winner(i) === 'c1'); // r1, r2, r3
const C2_WINS = NODES.filter((i) => winner(i) === 'c2'); // r4, r5
const retryArr = (i: number) => RETRY_START + RETRY_DUR[i];

export const Redlock: React.FC<RedlockProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const S = G.S;

  // ---- B1: the race (blue on every path, then back to graphite) ----
  const raceP = (who: 'c1' | 'c2', i: number) => ramp(frame, RACE_START, RACE_DUR[who][i], EASE_MOVE);
  const raceBlue = 1 - ramp(frame, EV.raceInk, 14, EASE_FADE);
  // ---- B2: verdicts ----
  const greenP = ramp(frame, ...at(EV.c1Green));
  const redP = ramp(frame, ...at(EV.c2Red));
  const redOn = 1 - ramp(frame, EV.rel1Out, 14, EASE_FADE);
  // ---- B3 / B4: releases and the retry ----
  const rel1P = ramp(frame, ...at(EV.rel1), EASE_MOVE);
  const rel1Blue = 1 - ramp(frame, EV.rel1Out, 14, EASE_FADE);
  const retryP = (i: number) => ramp(frame, RETRY_START, RETRY_DUR[i], EASE_MOVE);
  const retryBlue = 1 - ramp(frame, EV.retryInk, 14, EASE_FADE);
  const rel2P = ramp(frame, ...at(EV.rel2), EASE_MOVE);
  const rel2Blue = 1 - ramp(frame, EV.rel2Out, 14, EASE_FADE);

  // refusal marks: stamped on arrival (8 f), ghosted at B3; C2's are re-stamped by the retry and ghost again at B5
  const refusal1 = (i: number) => fade(frame, arrival('c1', i), Infinity, 8) * ghost(frame, EV.refusalGhost);
  const refusal2 = (i: number) =>
    Math.max(
      fade(frame, arrival('c2', i), Infinity, 8) * ghost(frame, EV.refusalGhost),
      fade(frame, retryArr(i), Infinity, 8) * ghost(frame, EV.retryGhost),
    );

  return (
    <Sheet theme={theme}>
      <Stage title="Redlock: winning a majority of five nodes" desc={META.alt} width={G.W} height={G.H_}>
        {/* ===== static wiring (frame 0): every client path, graphite, chevron at the node ===== */}
        {[...G.p1, ...G.p2].map((a, k) => (
          <g key={`w${k}`}>
            <Ink d={a.d} />
            <Ink d={a.head} />
          </g>
        ))}

        {/* ===== B2/B4 marker overlays that persist: C1's green majority, C2's red failure ===== */}
        {C1_WINS.map((i) => (
          <Pen key={`g${i}`} d={G.p1[i].d} head={G.p1[i].head} progress={greenP} color="green" width={STROKE.ink + 0.8}
            opacity={i === 1 ? 1 - ramp(frame, EV.r2Out, 14, EASE_FADE) : 1} />
        ))}
        {C2_WINS.map((i) => (
          <Pen key={`r${i}`} d={G.p2[i].d} head={G.p2[i].head} progress={redP} color="red" width={STROKE.ink + 0.8} opacity={redOn} />
        ))}

        {/* ===== B1: the race ===== */}
        {NODES.map((i) => (
          <g key={`race${i}`}>
            <Pen d={G.p1[i].d} head={G.p1[i].head} progress={raceP('c1', i)} color="blue" opacity={raceBlue} />
            <Pen d={G.p2[i].d} head={G.p2[i].head} progress={raceP('c2', i)} color="blue" opacity={raceBlue} />
          </g>
        ))}
        {/* ===== B3: C2 releases r4, r5 ===== */}
        {C2_WINS.map((i) => (
          <Pen key={`rel1${i}`} d={G.p2[i].d} head={G.p2[i].head} progress={rel1P} color="blue" opacity={rel1Blue} />
        ))}
        {/* ===== B4: C2 retries on all five, then releases again ===== */}
        {NODES.map((i) => (
          <Pen key={`rt${i}`} d={G.p2[i].d} head={G.p2[i].head} progress={retryP(i)} color="blue" opacity={retryBlue} />
        ))}
        {C2_WINS.map((i) => (
          <Pen key={`rel2${i}`} d={G.p2[i].d} head={G.p2[i].head} progress={rel2P} color="blue" opacity={rel2Blue} />
        ))}

        {/* refusal ✕ marks on the loser's drops */}
        {NODES.map((i) =>
          winner(i) === 'c1' ? (
            <Ink key={`x2${i}`} d={G.x2[i]} color="red" opacity={refusal2(i)} />
          ) : (
            <Ink key={`x1${i}`} d={G.x1[i]} color="red" opacity={refusal1(i)} />
          ),
        )}

        {/* packets ride on top of the lines */}
        {NODES.map((i) => (
          <g key={`pk${i}`}>
            <Packet d={G.p1[i].d} progress={raceP('c1', i)} color="blue" r={G.pr} />
            <Packet d={G.p2[i].d} progress={raceP('c2', i)} color="blue" r={G.pr} />
            <Packet d={G.p2[i].d} progress={retryP(i)} color="blue" r={G.pr} />
          </g>
        ))}
        {C2_WINS.map((i) => (
          <g key={`pkr${i}`}>
            <Packet d={G.p2[i].d} progress={rel1P} color="blue" r={G.pr} />
            <Packet d={G.p2[i].d} progress={rel2P} color="blue" r={G.pr} />
          </g>
        ))}

        {/* ===== static glyphs (frame 0) ===== */}
        {G.cyl.map((c, i) => (
          <g key={`cyl${i}`}>
            <path d={c.bodyFill} fill={T.sheet} />
            <Ink d={c.sides} />
            <Ink d={c.front} />
            <Ink d={c.top} fill={T.sheet} />
            <Write x={G.NX[i]} y={G.nameY} text={`r${i + 1}`} variant="mono" size={S} color="ink2" anchor="middle" />
          </g>
        ))}
        <Write x={G.NX[1]} y={G.nameY} text="r2" variant="mono" size={S} color="red" anchor="middle" opacity={fade(frame, EV.r2Cross[0], Infinity, 12)} />
        <Ink d={G.C1D} fill={T.sheet} />
        <Ink d={G.C2D} fill={T.sheet} />
        <Write x={G.C1.x + G.C1.w / 2} y={G.C1.y + G.C1.h / 2 + S * 0.35} text="C1" variant="mono" size={S} anchor="middle" />
        <Write x={G.C2.x + G.C2.w / 2} y={G.C2.y + G.C2.h / 2 + S * 0.35} text="C2" variant="mono" size={S} anchor="middle" />
        <Write x={G.setnx.x} y={G.setnx.y} text="SET NX" variant="mono" size={S} color="ink2" />
        {G.note.map((n, k) => (
          <Write key={`n${k}`} x={n.x} y={n.y} text={n.text} size={S} color="ink2" anchor={n.anchor} />
        ))}

        {/* ===== values in the cells ===== */}
        {C1_WINS.map((i) => (
          <Write key={`v1${i}`} x={G.NX[i]} y={G.valY} text="c1" variant="mono" size={S} anchor="middle"
            progress={ramp(frame, arrival('c1', i), 16)} opacity={i === 1 ? fade(frame, 0, EV.r2Out, 1, 10) : 1} />
        ))}
        {C2_WINS.map((i) => (
          <g key={`v2${i}`}>
            <Write x={G.NX[i]} y={G.valY} text="c2" variant="mono" size={S} anchor="middle"
              progress={ramp(frame, arrival('c2', i), 16)} opacity={fade(frame, 0, EV.rel1Out, 1, 10)} />
            <Write x={G.NX[i]} y={G.valY} text="c2" variant="mono" size={S} anchor="middle"
              progress={ramp(frame, retryArr(i), 16)} opacity={fade(frame, 0, EV.rel2Out, 1, 10)} />
          </g>
        ))}
        {/* B4: r2 goes down; its key is gone */}
        <Pen d={G.crash} progress={ramp(frame, ...at(EV.r2Cross))} color="red" width={STROKE.ink + 1.2} />

        {/* ===== B2: C1's verdict ===== */}
        <Write x={G.c1Verdict.x} y={G.c1Verdict.y} text="3/5 acquired" size={S} color="green" weight={640} progress={ramp(frame, ...at(EV.c1Verdict))} />
        <Pen d={G.c1Tick} progress={ramp(frame, ...at(EV.c1Tick))} color="green" width={STROKE.ink + 0.8} />
        <Write x={G.c1Ttl.x} y={G.c1Ttl.y} text="took < TTL" size={S} color="ink2" progress={ramp(frame, ...at(EV.c1Ttl))} />
        {/* B4: the 3/5 was won before r2 died; say so, so the poster's count matches the cells */}
        <Write x={G.r2Note.x} y={G.r2Note.y} text="r2 down later: C1 holds" size={S} anchor="end" progress={ramp(frame, ...at(EV.r2Note))} />

        {/* ===== B2–B4: C2's log ===== */}
        <Write x={G.c2Verdict.x} y={G.c2Verdict.y} text="2/5 failed" size={S} color="red" weight={640} progress={ramp(frame, ...at(EV.c2Verdict))} />
        <Pen d={G.c2Cross} progress={ramp(frame, ...at(EV.c2Cross))} color="red" width={STROKE.ink + 0.8} />
        <Pen d={G.clock.face} progress={ramp(frame, ...at(EV.clock))} />
        <Ink d={G.clock.hands} opacity={fade(frame, EV.clock[0] + EV.clock[1] - 4, Infinity, 8)} />
        <Write x={G.delay.x} y={G.delay.y} text="random delay" size={S} progress={ramp(frame, ...at(EV.delay))} />
        <Write x={G.retry.x} y={G.retry.y} text="retry: 2/5" size={S} color="red" weight={640} progress={ramp(frame, ...at(EV.retryLbl))} />
        <Pen d={G.retryCross} progress={ramp(frame, ...at(EV.retryCross))} color="red" width={STROKE.ink + 0.8} />

        {/* ===== B5: the takeaway ===== */}
        <Write x={G.takeaway.x} y={G.takeaway.y} text="fault tolerant, not faster" size={S} anchor="middle" weight={620} progress={ramp(frame, ...at(EV.takeaway))} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default Redlock;
