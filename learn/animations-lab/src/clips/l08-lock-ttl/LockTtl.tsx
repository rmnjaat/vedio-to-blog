// Clip l08-lock-ttl — "A lock outlives its holder's time": the key's TTL runs out while consumer 1 is still working,
// consumer 2 takes the lock, and consumer 1's plain DEL removes consumer 2's lock; replayed with an atomic EVAL release.
// Storyboard: lectures/lec08/animations/l08-lock-ttl/storyboard.{yaml,md}.
// Ledger: L-0257, L-0263, L-0264, L-0267, L-0268, L-0269, L-0270, L-0273 (context L-0265, L-0271, L-0310).
// Frame 0 = Fig 6·d's three lanes (consumer 1 · redis key queue7 · consumer 2) on an empty time axis; the last frame
// is the annotated poster.
import React, {useId} from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {PAST, fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, NIL_DUR, RETRY_AT, RETRY_DUR, T} from './timeline';

export type LockTtlProps = {theme: ThemeName; layout?: Layout};

const LIN = Easing.linear;

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: lane titles in a left column (x 24-290); time runs left→right from x 300 (112 px per class minute);
// consumer 1 on top, the redis key in the middle, consumer 2 below; label rows in the gaps; axis at y 500;
// caption band from 652.
// phone 720×940: same three lanes, time left→right from x 60 (84 px per minute); lane titles on their own rows
// (consumer 2's under its lane, clear of the retry arrows); the axis at y 650; caption band from 790.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TS = typeFor(layout).label;
  const hs = ph ? 13 : 16;
  const X = (t: number) => (ph ? 60 + 84 * t : 300 + 112 * t);
  const arrow = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
  };
  const lane = (top: number, bot: number) => ({top, bot, mid: (top + bot) / 2, base: (top + bot) / 2 + TS * 0.35});
  const C1 = ph ? lane(132, 174) : lane(80, 128);
  const RK = ph ? lane(346, 396) : lane(236, 292);
  const C2 = ph ? lane(500, 542) : lane(396, 444);
  const box = (t0: number, t1: number, l: {top: number; bot: number}, seed: string, d0 = 0, d1 = 0) =>
    serverBox(X(t0) + d0, l.top, X(t1) - X(t0) - d0 + d1, l.bot - l.top, seed);
  const gap = 4; // arrows stop this far from the bars
  const off = ph ? 16 : 18; // an event's arrow sits this far inside the bar it starts from
  const down = (x: number, seed: string) => arrow([[x, C1.bot + gap], [x, RK.top - gap]], seed);
  const up = (x: number, seed: string) => arrow([[x, C2.top - gap], [x, RK.bot + gap]], seed);
  const xSet = X(0) + off;
  const xDel = X(T.c1Done) - off;
  const xTake = X(T.c2Take) + off;
  const SET = down(xSet, 'set');
  const DEL = down(xDel, 'del');
  const TAKE = up(xTake, 'take');
  const RETRIES = T.retries.map((t, i) => up(X(t), `rt${i}`));
  const rev = (x: number, a: number, b: number) => handLine([x, a], [x, b], `rv${x}`);
  const AXY = ph ? 650 : 500;
  const AX = arrow([[ph ? 40 : 290, AXY], [ph ? 708 : 1172, AXY]], 'axis');
  const TICKS = Array.from({length: 8}, (_, k) => handLine([X(k), AXY - (k === 0 || k === 5 ? 14 : 8)], [X(k), AXY + (k === 0 || k === 5 ? 14 : 8)], `tk${k}`)).join(' ');
  const rowA = ph ? 228 : 172;
  const rowB = ph ? 276 : 220;
  const lowRow = ph ? 458 : 360;
  return {
    ph, W, H, TS, X, C1, RK, C2,
    C1_BOX: box(0, T.c1Done, C1, 'c1w'),
    C2_WAIT: box(0, T.c2Take, C2, 'c2r'),
    C2_WORK: box(T.c2Take, T.max, C2, 'c2w'),
    TTL_BOX: box(0, T.ttl, RK, 'ttl'),
    KEY1: box(0, T.ttl, RK, 'k1'),
    KEY2: box(T.c2Take, T.max, RK, 'k2'),
    KEY2_DEL: box(T.c2Take, T.c1Done, RK, 'k2d'),
    SET, DEL, TAKE, RETRIES, xSet, xDel, xTake,
    SET_BACK: rev(xSet, RK.top - gap, C1.bot + gap),
    DEL_BACK: rev(xDel, RK.top - gap, C1.bot + gap),
    TAKE_BACK: rev(xTake, RK.bot + gap, C2.top - gap),
    AX, AXY, TICKS,
    rowA, rowB, lowRow,
    topRow: ph ? 54 : 52,
    pr: ph ? 7 : 9,
    // titles
    t1: ph ? {x: 24, y: C1.top - 16} : {x: 24, y: C1.base},
    tRk: ph ? {x: 108, y: RK.top - 16} : {x: 24, y: RK.mid - 8},
    tRk2: ph ? {x: 108 + 9 * TS * 0.56 + 14, y: RK.top - 16} : {x: 24, y: RK.mid + 38},
    t2: ph ? {x: 24, y: C2.bot + 42} : {x: 24, y: C2.base},
    tickLblY: AXY + (ph ? 46 : 48),
    timeLbl: ph ? {x: 704, y: AXY + 92, anchor: 'end' as const, text: 'time (sped up)', two: ''} : {x: 24, y: AXY + 6, anchor: 'start' as const, text: 'time', two: '(sped up)'},
    CAPTION_TOP: ph ? 790 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Class minutes on the axis at frame f. Constant speed (PER_MIN frames per minute) whenever the playhead moves. */
const timeAt = (f: number) =>
  2 * ramp(f, ...EV.play1, LIN) +
  3 * ramp(f, ...EV.play2, LIN) +
  0.2 * ramp(f, ...EV.play3, LIN) +
  0.6 * ramp(f, ...EV.play4, LIN) +
  0.2 * ramp(f, ...EV.play5, LIN) +
  1.5 * ramp(f, ...EV.play6, LIN);

export const LockTtl: React.FC<LockTtlProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const {X, C1, RK, C2, TS} = G;
  const Th = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const uid = useId().replace(/:/g, '');
  const t = timeAt(frame);

  const blueOff = (from: number) => 1 - ramp(frame, from, 14, EASE_FADE);
  const past = (from: number) => (frame < from ? 1 : ghost(frame, from));
  // story-carrying labels ghost while later beats play, then return to full ink for the summary / poster (B6);
  // only superseded state (the expired c1 key) stays ghosted
  const story = (from: number) =>
    frame < BEAT.end ? past(from) : PAST + (1 - PAST) * ramp(frame, BEAT.end, 12, EASE_FADE);

  // bars are hand boxes revealed up to the playhead through a clip rectangle (the open right end is "now")
  const clipTo = (id: string, x1: number) => (
    <clipPath id={id}>
      <rect x={0} y={0} width={Math.max(0, x1)} height={G.H} />
    </clipPath>
  );
  const acquired = frame >= EV.ttlBox[0];
  const keyEdge = acquired ? Math.max(X(Math.min(t, T.ttl)), X(0) + 14) : 0;
  const c2Taken = frame >= EV.ok2[0];
  const k2Edge = c2Taken ? Math.max(X(t), X(T.c2Take) + 14) : 0;
  const c1Edge = frame >= EV.play1[0] ? Math.max(X(Math.min(t, T.c1Done)), X(0) + 4) : 0;
  const c2WaitEdge = frame >= EV.play1[0] ? X(Math.min(t, T.c2Take)) : 0;
  const c2WorkEdge = c2Taken ? Math.max(X(t), X(T.c2Take) + 4) : 0;

  // the c2 key: ghosted while deleted (B4), restored in place by the replay (B5)
  const k2Gone = frame < EV.unring ? ramp(frame, ...EV.ring, EASE_FADE) : 1 - ramp(frame, EV.unring, 10, EASE_FADE);
  const k2O = 1 - (1 - PAST) * k2Gone;
  const delMarkO = fade(frame, EV.ring[0], EV.unring, 10, 10);

  const WashBox: React.FC<{d: string; clip: string; dash?: string; o?: number}> = ({d, clip, dash, o = 1}) => (
    <g clipPath={`url(#${clip})`} opacity={o}>
      <path d={d} fill={Th.ink} fillOpacity={0.07} stroke="none" />
      <Ink d={d} dash={dash} />
    </g>
  );

  return (
    <Sheet theme={theme}>
      <Stage title="A lock outlives its holder’s time" desc={META.alt} width={G.W} height={G.H}>
        <defs>
          {clipTo(`${uid}c1`, c1Edge)}
          {clipTo(`${uid}c2r`, c2WaitEdge)}
          {clipTo(`${uid}c2w`, c2WorkEdge)}
          {clipTo(`${uid}k1`, keyEdge)}
          {clipTo(`${uid}k2`, k2Edge)}
        </defs>

        {/* ===== static figure (frame 0): lanes, titles, axis ===== */}
        <Write x={G.t1.x} y={G.t1.y} size={TS} text="consumer 1" weight={640} />
        <Write x={G.tRk.x} y={G.tRk.y} size={TS} text="redis key" weight={640} />
        <Write x={G.tRk2.x} y={G.tRk2.y} size={TS} text="queue7" variant="mono" />
        <Write x={G.t2.x} y={G.t2.y} size={TS} text="consumer 2" weight={640} />
        <Write x={X(0) + 16} y={RK.base} size={TS} text="empty" color="ink3" opacity={1 - ramp(frame, EV.emptyOut, 10, EASE_FADE)} />
        <Ink d={G.AX.d} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.AX.head} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.TICKS} color="ink2" width={STROKE.thin + 0.4} />
        <Write x={X(0)} y={G.tickLblY} size={TS} text="0" color="ink2" anchor="middle" />
        <Write x={X(5)} y={G.tickLblY} size={TS} text="5 min" color="ink2" anchor="middle" />
        <Write x={G.timeLbl.x} y={G.timeLbl.y} size={TS} text={G.timeLbl.text} color="ink3" anchor={G.timeLbl.anchor} />
        {G.timeLbl.two ? <Write x={G.timeLbl.x} y={G.timeLbl.y + TS * 1.1} size={TS} text={G.timeLbl.two} color="ink3" /> : null}

        {/* playhead on the axis */}
        <g opacity={fade(frame, EV.play1[0] - 10, Infinity, 10)}>
          <line x1={X(t)} y1={G.AXY - 24} x2={X(t)} y2={G.AXY + 24} stroke={Th.ink} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>

        {/* ===== the key in redis ===== */}
        {/* c1: the dashed TTL box is the whole 5 minutes; the solid key fills it as time passes */}
        <g opacity={past(EV.c1Ghost)}>
          <Pen d={G.TTL_BOX} progress={ramp(frame, ...EV.ttlBox)} color="ink2" dash="10 9" width={STROKE.thin + 0.6} />
          {acquired ? <WashBox d={G.KEY1} clip={`${uid}k1`} /> : null}
          <Write x={X(0) + 16} y={RK.base} size={TS} text="c1" variant="mono" progress={ramp(frame, ...EV.c1Lbl)} />
        </g>
        <Write x={X(T.ttl) - 14} y={RK.base} size={TS} text="TTL 5 min" color="ink2" anchor="end" progress={ramp(frame, ...EV.ttlLbl)} opacity={1 - ramp(frame, EV.ttlOut, 10, EASE_FADE)} />
        <Write x={X(T.ttl) - 14} y={RK.base} size={TS} text="expired" color="red" anchor="end" weight={640} progress={ramp(frame, ...EV.expired)} />
        {/* c2 */}
        {c2Taken ? <WashBox d={G.KEY2} clip={`${uid}k2`} o={k2O} /> : null}
        <Write x={X(T.c2Take) + 14} y={RK.base} size={TS} text="c2" variant="mono" progress={ramp(frame, ...EV.c2Lbl)} opacity={k2O} />
        <g opacity={delMarkO}>
          <Ink d={G.KEY2_DEL} color="red" dash="10 9" width={STROKE.ink} />
        </g>
        <Write x={X(T.c1Done) + 16} y={RK.base} size={TS} text="empty" color="red" weight={640} progress={ramp(frame, ...EV.emptyRed)} opacity={delMarkO} />
        <Write x={X(T.max) - 14} y={RK.base} size={TS} text="kept" color="green" anchor="end" weight={640} progress={ramp(frame, ...EV.kept)} />

        {/* ===== consumer 1: working, past the TTL ===== */}
        {c1Edge > 0 ? <WashBox d={G.C1_BOX} clip={`${uid}c1`} /> : null}
        <Write x={X(0) + 16} y={C1.base} size={TS} text="working" progress={ramp(frame, ...EV.workLbl)} />

        {/* ===== consumer 2: retrying (dashed), then working ===== */}
        {c2WaitEdge > 0 ? <WashBox d={G.C2_WAIT} clip={`${uid}c2r`} dash="10 9" /> : null}
        <Write x={X(0) + 16} y={C2.base} size={TS} text="retries" color="ink2" progress={ramp(frame, ...EV.retryLbl)} />
        {c2Taken ? <WashBox d={G.C2_WORK} clip={`${uid}c2w`} /> : null}
        <Write x={X(T.c2Take) + 14} y={C2.base} size={TS} text="working" progress={ramp(frame, ...EV.work2Lbl)} />

        {/* retries: SET NX into an existing key, refused */}
        {G.RETRIES.map((a, i) => (
          <Pen key={i} d={a.d} head={a.head} progress={ramp(frame, RETRY_AT[i], RETRY_DUR)} color="ink2" width={STROKE.thin + 0.6} />
        ))}
        {T.retries.map((m, i) => (
          <Write key={`nil${i}`} x={X(m) + (G.ph ? 8 : 10)} y={G.lowRow} size={TS} text="nil" variant="mono" color="ink2" progress={ramp(frame, RETRY_AT[i] + RETRY_DUR - 2, NIL_DUR)} />
        ))}

        {/* ===== ① SET queue7 c1 NX EX 300 → OK ===== */}
        <g opacity={story(BEAT.expire)}>
          <Pen d={G.SET.d} head={G.SET.head} progress={ramp(frame, ...EV.setPen)} />
          <Pen d={G.SET.d} head={G.SET.head} progress={ramp(frame, ...EV.setPen)} color="blue" width={STROKE.ink + 0.8} opacity={blueOff(EV.setInk)} />
          <Write x={G.xSet + 18} y={G.rowA} size={TS} text="SET queue7 c1 NX EX 300" variant="mono" color="blue" progress={ramp(frame, ...EV.setLbl)} />
          <Write x={G.xSet + 18} y={G.rowB} size={TS} text="OK" variant="mono" color="green" weight={600} progress={ramp(frame, ...EV.ok1)} />
        </g>
        <Packet d={G.SET_BACK} progress={ramp(frame, ...EV.okBack1, EASE_MOVE)} color="green" r={G.pr} />

        {/* ===== ③ consumer 2's retry lands: OK ===== */}
        <g opacity={story(BEAT.del)}>
          <Pen d={G.TAKE.d} head={G.TAKE.head} progress={ramp(frame, ...EV.takePen)} />
          <Pen d={G.TAKE.d} head={G.TAKE.head} progress={ramp(frame, ...EV.takePen)} color="blue" width={STROKE.ink + 0.8} opacity={blueOff(EV.takeInk)} />
          <Write x={G.xTake + 18} y={G.lowRow} size={TS} text="OK" variant="mono" color="green" weight={600} progress={ramp(frame, ...EV.ok2)} />
        </g>
        <Packet d={G.TAKE_BACK} progress={ramp(frame, ...EV.okBack2, EASE_MOVE)} color="green" r={G.pr} />

        {/* ===== ④ DEL queue7, then ⑤ the same release as EVAL ===== */}
        <Pen d={G.DEL.d} head={G.DEL.head} progress={ramp(frame, ...EV.delPen)} />
        <Pen d={G.DEL.d} head={G.DEL.head} progress={ramp(frame, ...EV.delPen)} color="blue" width={STROKE.ink + 0.8} opacity={blueOff(BEAT.eval)} />
        <Write x={G.xDel - 18} y={G.rowB} size={TS} text="DEL queue7" variant="mono" color="blue" anchor="end" progress={ramp(frame, ...EV.delLbl)} opacity={story(EV.delGhost)} />
        <Pen
          d={handLine([G.xDel - 18 - 10 * TS * 0.62 - 6, G.rowB - TS * 0.32], [G.xDel - 12, G.rowB - TS * 0.32], 'strike')}
          progress={ramp(frame, ...EV.strike)}
          width={STROKE.ink}
          opacity={story(EV.delGhost + 14)}
        />
        <Pen d={G.DEL.d} head={G.DEL.head} progress={ramp(frame, ...EV.evalPen)} color="blue" width={STROKE.ink + 0.8} opacity={blueOff(EV.evalInk)} />
        <Write x={X(T.c1Done) + 4} y={G.topRow} size={TS} text="EVAL: if get==c1: del" variant="mono" color="blue" anchor="end" progress={ramp(frame, ...EV.evalLbl)} />
        <Packet d={G.DEL_BACK} progress={ramp(frame, ...EV.zeroBack, EASE_MOVE)} color="green" r={G.pr} />
        <Write x={G.xDel + 18} y={G.rowB} size={TS} text="0" variant="mono" color="green" weight={600} progress={ramp(frame, ...EV.zero)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default LockTtl;
