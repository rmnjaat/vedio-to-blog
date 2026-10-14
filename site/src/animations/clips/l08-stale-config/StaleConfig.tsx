// Clip l08-stale-config — "Nine seconds of errors": LB servers route from a stale in-memory copy until the next poll;
// replayed with a push to the meta port, the window nearly closes.
// Storyboard: lectures/lec08/animations/l08-stale-config/storyboard.{yaml,md}.
// Ledger: L-0154, L-0164, L-0167, L-0169, L-0170, L-0171, L-0174, L-0176 (context L-0152).
// Frame 0 = the architecture (Fig 4·b/4·d) over two empty time lanes; the last frame is the annotated poster.
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, cylinder, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {PAST, fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BACK, BEAT, CAPTIONS, EV, META, OUT, REQ_A, REQ_B, T, type Req} from './timeline';

export type StaleConfigProps = {theme: ThemeName; layout?: Layout};

const LIN = Easing.linear;
const poly = (pts: Pt[]) => 'M ' + pts.map((p) => `${p[0]} ${p[1]}`).join(' L ');

// ---------- geometry per layout (canvas px) ----------
// wide 1200×800: orchestrator + db left, lb servers stack centre, bus, backends right; the health-check rail runs
// across the top and down the right; two time lanes below (y 380-640); caption band from 652.
// phone 720×940: orchestrator top left, db under it, the stack right of the db, backends in a row under the stack,
// the health-check rail loops under them; lanes with titles and event labels on their own rows; caption from 800.
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const TS = TY.label;
  const hs = ph ? 13 : 16; // chevron size
  const arrow = (pts: Pt[], seed: string) => {
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
  };
  const cross = (x: number, y: number, r: number, seed: string) =>
    `${handLine([x - r, y - r], [x + r, y + r], seed + 'a')} ${handLine([x + r, y - r], [x - r, y + r], seed + 'b')}`;

  // --- boxes ---
  const ORCH = ph ? {x: 20, y: 30, w: 236, h: 56} : {x: 30, y: 34, w: 280, h: 66};
  const DB = ph ? {cx: 100, top: 168, rx: 56, ry: 13, h: 76} : {cx: 170, top: 200, rx: 66, ry: 15, h: 80};
  const STK = ph ? {x: 300, y: 150, w: 300, h: 100, off: 10} : {x: 430, y: 160, w: 380, h: 110, off: 12};
  const CARD = ph ? {x: 312, y: 200, w: 170, h: 40, tx: 322, ty: 230, adv: 18} : {x: 446, y: 218, w: 214, h: 44, tx: 458, ty: 252, adv: 24};
  // backends: wide = a column (box x, mid y); phone = a row (mid x, box y)
  const BW = ph ? 90 : 102;
  const BH = ph ? 54 : 60;
  const BMID = ph ? [330, 450, 570] : [100, 215, 320];
  const bBox = (j: number) => (ph ? {x: BMID[j] - BW / 2, y: 316, w: BW, h: BH} : {x: 980, y: BMID[j] - BH / 2, w: BW, h: BH});

  // --- lines ---
  // health checks orchestrator → backends (heads at the backends). The b2 path is one polyline so its re-ink matches.
  const hbPts: Pt[] = ph
    ? [[20, 58], [10, 58], [10, 404], [330, 404], [450, 404], [450, 372]]
    : [[60, 34], [60, 14], [1150, 14], [1150, 100], [1150, 215], [1084, 215]];
  const HB2 = arrow(hbPts, 'hb2');
  const HB1 = ph ? arrow([[330, 404], [330, 372]], 'hb1') : arrow([[1150, 100], [1084, 100]], 'hb1');
  const HB3 = ph ? arrow([[450, 404], [570, 404], [570, 372]], 'hb3') : arrow([[1150, 215], [1150, 320], [1084, 320]], 'hb3');
  const hbFail: Pt = ph ? [476, 390] : [1117, 236]; // red ✕ beside the b2 stub
  const ORCH_DB = ph ? arrow([[100, 86], [100, 152]], 'odb') : arrow([[170, 100], [170, 182]], 'odb');
  const META_ARR = ph ? arrow([[256, 50], [450, 50], [450, 128]], 'meta') : arrow([[310, 66], [620, 66], [620, 134]], 'meta');
  const PULL = ph ? arrow([[300, 240], [158, 240]], 'pull') : arrow([[430, 255], [238, 255]], 'pull');
  // requests: lb servers → bus → backend (heads at the backends)
  const BUS = ph
    ? {stem: arrow([[450, 250], [450, 314]], 'bs2'), segs: [handLine([450, 282], [330, 282], 'bus1'), handLine([450, 282], [570, 282], 'bus3')], drops: [arrow([[330, 282], [330, 314]], 'bd1'), arrow([[570, 282], [570, 314]], 'bd3')]}
    : {stem: arrow([[810, 215], [978, 215]], 'bs2'), segs: [handLine([870, 215], [870, 100], 'bus1'), handLine([870, 215], [870, 320], 'bus3')], drops: [arrow([[870, 100], [978, 100]], 'bd1'), arrow([[870, 320], [978, 320]], 'bd3')]};
  const reqPath = (j: number) =>
    ph
      ? j === 1 ? poly([[450, 252], [450, 314]]) : poly([[450, 252], [450, 282], [BMID[j], 282], [BMID[j], 314]])
      : j === 1 ? poly([[812, 215], [978, 215]]) : poly([[812, 215], [870, 215], [870, BMID[j]], [978, BMID[j]]]);
  const REQ_PATHS = [0, 1, 2].map(reqPath);
  const REQ_BACK = [0, 1, 2].map((j) => {
    const pts = REQ_PATHS[j].replace('M ', '').split(' L ').map((s) => s.split(' ').map(Number) as Pt).reverse();
    return poly(pts);
  });

  // --- the card: b2 sits at characters 3-4 of "b1 b2 b3" ---
  const b2x0 = CARD.tx + 3 * CARD.adv;
  const b2x1 = b2x0 + 2 * CARD.adv;
  const RING = serverBox(b2x0 - 8, CARD.y + 4, b2x1 - b2x0 + 16, CARD.h - 8, 'ring');
  const STRIKE = handLine([b2x0 - 4, CARD.ty - CARD.adv * 0.55], [b2x1 + 4, CARD.ty - CARD.adv * 0.55], 'strike');

  // --- lanes ---
  const X = (t: number) => (ph ? 44 + 52 * t : 100 + 84 * t);
  const AX = ph ? {x0: 24, x1: 704} : {x0: 70, x1: 1160};
  const lane = (i: 0 | 1) =>
    ph
      ? i === 0
        ? {title: 486, ev: 528, span: 546, ax: 578, below: 622}
        : {title: 676, ev: 718, span: 736, ax: 768, below: 0}
      : i === 0
        ? {title: 410, ev: 410, span: 430, ax: 460, below: 512}
        : {title: 568, ev: 568, span: 586, ax: 616, below: 0};
  const L = [lane(0), lane(1)];
  const AXES = L.map((l, i) => arrow([[AX.x0, l.ax], [AX.x1, l.ax]], `ax${i}`));
  const tick = (t: number, l: (typeof L)[number], r: number, seed: string) => handLine([X(t), l.ax - r], [X(t), l.ax + r], seed);
  const MINOR = L.map((l, i) => Array.from({length: 12}, (_, k) => tick(k + 1, l, 7, `mt${i}-${k}`)).filter((_, k) => !(i === 0 && k + 1 === 10)).join(' '));
  const POLL_TICKS = [tick(0, L[0], 20, 'pt0'), tick(10, L[0], 20, 'pt10')];
  // event marks reach only 14 px below the axis so they never cut the label row under it
  const CRASH = L.map((l, i) => handLine([X(T.crash), l.ax - 24], [X(T.crash), l.ax + 14], `ct${i}`));
  const SPAN_END = (t: number, l: (typeof L)[number], seed: string) => handLine([X(t), l.span - 9], [X(t), l.span + 9], seed);

  return {
    ph, W, H, TS, hs, ORCH, DB, STK, CARD, BW, BH, BMID, bBox, cross,
    CYL: cylinder(DB.cx, DB.top, DB.rx, DB.ry, DB.h, 'db'),
    ORCH_BOX: serverBox(ORCH.x, ORCH.y, ORCH.w, ORCH.h, 'orch'),
    STACK: [2, 1, 0].map((n) => serverBox(STK.x - n * STK.off, STK.y - n * STK.off, STK.w, STK.h, `stk${n}`)),
    CARD_BOX: serverBox(CARD.x, CARD.y, CARD.w, CARD.h, 'card'),
    BACKENDS: [0, 1, 2].map((j) => {
      const b = bBox(j);
      return serverBox(b.x, b.y, b.w, b.h, `be${j}`);
    }),
    B2X: (() => {
      const b = bBox(1);
      return cross(b.x + b.w / 2, b.y + b.h / 2, ph ? 22 : 26, 'b2x');
    })(),
    HB1, HB2, HB3, hbFail, HB_FAIL: cross(hbFail[0], hbFail[1], ph ? 8 : 9, 'hbx'),
    ORCH_DB, META_ARR, PULL, BUS, REQ_PATHS, REQ_BACK, RING, STRIKE, b2x1,
    X, L, AXES, MINOR, POLL_TICKS, CRASH, SPAN_END,
    // label anchors
    orchLbl: ph ? {x: 34, y: 68} : {x: 48, y: 80},
    hbLbl: ph ? {x: 24, y: 436} : {x: 640, y: 50},
    removeLbl: ph ? {x: 114, y: 126} : {x: 186, y: 150},
    metaLbl: ph ? {x: 266, y: 38} : {x: 330, y: 54},
    pullLbl: ph ? {x: 176, y: 226} : {x: 272, y: 240},
    stackLbl: ph ? {x: 316, y: 186} : {x: 448, y: 204},
    statusLbl: ph ? {x: 494, y: CARD.ty} : {x: 676, y: CARD.ty},
    titleX: ph ? AX.x0 : AX.x1,
    titleAnchor: (ph ? 'start' : 'end') as 'start' | 'end',
    errLblX: ph ? X(6) : X(5.5),
    slowLbl: ph ? {x: 300, text: 'slowed down'} : {x: 540, text: 'time, slowed down'},
    CAPTION_TOP: ph ? 800 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Class time on the poll lane's playhead. */
const timeA = (f: number) => {
  if (f < EV.play0[0] + EV.play0[1]) return ramp(f, ...EV.play0, LIN);
  if (f < EV.playA1[0] + EV.playA1[1]) return 1 + 8.7 * ramp(f, ...EV.playA1, LIN);
  if (f < EV.playA3[0]) return 9.7 + 0.3 * ramp(f, ...EV.playA2, LIN);
  return 10 + 2.5 * ramp(f, ...EV.playA3, LIN);
};
/** Class time on the push lane's playhead (starts at the crash, 1 s). */
const timeB = (f: number) => (f < EV.playB2[0] ? 1 + 0.25 * ramp(f, ...EV.playB1, LIN) : 1.25 + 11.25 * ramp(f, ...EV.playB2, LIN));

/** Is the card stale (b2 still listed after the crash) at frame f? */
const staleO = (f: number) => fade(f, EV.staleRing, EV.strikeA[0], 10, 10) + fade(f, EV.reset[0], EV.strikeB[0], 10, 10);
const strikeP = (f: number) => (f < EV.reset[0] ? ramp(f, ...EV.strikeA) : f < EV.strikeB[0] ? 1 - ramp(f, ...EV.reset, EASE_FADE) : ramp(f, ...EV.strikeB));
const freshO = (f: number) => fade(f, EV.freshA[0], EV.reset[0], 10, 10) + fade(f, EV.freshB[0], Infinity, 10);

export const StaleConfig: React.FC<StaleConfigProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const {X, L, TS} = G;
  const Th = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const pr = G.ph ? 7 : 9;
  const dot = G.ph ? 6 : 8;

  const tA = timeA(frame);
  const tB = timeB(frame);
  // lane focus: the poll lane ghosts during the push replay and comes back for the summary
  const laneAO = frame < EV.reset[0] ? 1 : frame < EV.back ? ghost(frame, EV.reset[0]) : PAST + (1 - PAST) * ramp(frame, EV.back, 12, EASE_FADE);
  const playAO = fade(frame, EV.playIn, EV.playA3[0] + EV.playA3[1] + 12, 10, 12);
  const playBO = fade(frame, EV.crashB[0], EV.playB2[0] + EV.playB2[1] + 12, 10, 12);

  // red stale span on the poll lane (grows with the playhead, closed at the poll); sliver on the push lane
  const spanA1 = Math.min(tA, T.poll);
  const spanB1 = Math.min(tB, T.pushDone);

  const Playhead: React.FC<{t: number; ax: number; o: number}> = ({t, ax, o}) =>
    o <= 0 ? null : <line x1={X(t)} y1={ax - 26} x2={X(t)} y2={ax + 14} stroke={Th.ink2} strokeWidth={STROKE.thin + 0.6} strokeLinecap="round" opacity={o} />;

  /** A request's outcome on its lane: a blue dot, or a red ✕ when it came back as an error. */
  const Stamp: React.FC<{r: Req; ax: number}> = ({r, ax}) => {
    const at = r.fail ? r.at + OUT + BACK : r.at + OUT;
    const o = fade(frame, at, Infinity, 8);
    if (o <= 0) return null;
    const x = X(r.t);
    return r.fail ? (
      <g opacity={o}>
        <circle cx={x} cy={ax} r={dot + 4} fill={Th.sheet} />
        <Ink d={G.cross(x, ax, dot + 1, `rx${r.k}`)} color="red" width={STROKE.ink} />
      </g>
    ) : (
      <g opacity={o}>
        <circle cx={x} cy={ax} r={dot + 3} fill={Th.sheet} />
        <circle cx={x} cy={ax} r={dot} fill={Th.blue} />
      </g>
    );
  };
  /** A request in flight: blue out to its backend; from dead b2 a red error packet comes back. */
  const Flight: React.FC<{r: Req}> = ({r}) => (
    <>
      <Packet d={G.REQ_PATHS[r.to]} progress={ramp(frame, r.at, OUT, EASE_MOVE)} color="blue" r={pr} />
      {r.fail ? <Packet d={G.REQ_BACK[r.to]} progress={ramp(frame, r.at + OUT, BACK, EASE_MOVE)} color="red" r={pr} /> : null}
    </>
  );

  const blueOff = (from: number) => 1 - ramp(frame, from, 14, EASE_FADE);
  // story-carrying labels ghost while later beats play and return to full ink for the summary / poster (EV.back),
  // like the poll lane; only superseded state (b2's health-check ✕, the struck b2) stays as drawn
  const storyO = (from: number) =>
    frame < from ? 1 : frame < EV.back ? ghost(frame, from) : PAST + (1 - PAST) * ramp(frame, EV.back, 12, EASE_FADE);
  const sliceO = staleO(frame);

  return (
    <Sheet theme={theme}>
      <Stage title="Nine seconds of errors: polling vs push for LB config" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {/* health checks */}
        <Ink d={G.HB2.d} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.HB2.head} color="ink2" width={STROKE.thin + 0.6} />
        {[G.HB1, G.HB3].map((a, i) => (
          <g key={i}>
            <Ink d={a.d} color="ink2" width={STROKE.thin + 0.6} />
            <Ink d={a.head} color="ink2" width={STROKE.thin + 0.6} />
          </g>
        ))}
        <Write x={G.hbLbl.x} y={G.hbLbl.y} size={TS} text="health checks" color="ink2" />
        {/* orchestrator → db */}
        <Ink d={G.ORCH_DB.d} />
        <Ink d={G.ORCH_DB.head} />
        {/* lb servers → db: the config pull (dashed) */}
        <Ink d={G.PULL.d} dash="10 10" />
        <Ink d={G.PULL.head} />
        {/* request bus */}
        <Ink d={G.BUS.stem.d} />
        <Ink d={G.BUS.stem.head} />
        {G.BUS.segs.map((d, i) => (
          <Ink key={i} d={d} />
        ))}
        {G.BUS.drops.map((a, i) => (
          <g key={i}>
            <Ink d={a.d} />
            <Ink d={a.head} />
          </g>
        ))}
        {/* glyphs */}
        <Ink d={G.ORCH_BOX} fill={Th.sheet} />
        <Write x={G.orchLbl.x} y={G.orchLbl.y} size={TS} text="orchestrator" weight={600} />
        <Ink d={G.CYL.bodyFill} color="ink" width={0} fill={Th.sheet} />
        <Ink d={G.CYL.sides} />
        <Ink d={G.CYL.front} />
        <Ink d={G.CYL.top} fill={Th.sheet} />
        <Write x={G.DB.cx} y={G.DB.top + G.DB.h * 0.62 + TS * 0.33} size={TS} text="db" variant="mono" anchor="middle" />
        {G.STACK.map((d, i) => (
          <Ink key={i} d={d} fill={Th.sheet} />
        ))}
        <Write x={G.stackLbl.x} y={G.stackLbl.y} size={TS} text="lb servers" weight={600} />
        <Ink d={G.CARD_BOX} color="ink2" width={STROKE.thin + 0.6} fill={Th.sheet} />
        <Write x={G.CARD.tx} y={G.CARD.ty} size={TS} text="b1 b2 b3" variant="mono" />
        {G.BACKENDS.map((d, j) => {
          const b = G.bBox(j);
          return (
            <g key={j}>
              <Ink d={d} fill={Th.sheet} />
              <Write x={b.x + b.w / 2} y={b.y + b.h / 2 + TS * 0.36} size={TS} text={`b${j + 1}`} variant="mono" anchor="middle" />
            </g>
          );
        })}

        {/* ===== lanes ===== */}
        <g opacity={laneAO}>
          <Write x={G.titleX} y={L[0].title} size={TS} text="poll every 10 s" anchor={G.titleAnchor} weight={640} />
          <Ink d={G.AXES[0].d} color="ink2" width={STROKE.thin + 0.6} />
          <Ink d={G.AXES[0].head} color="ink2" width={STROKE.thin + 0.6} />
          <Ink d={G.MINOR[0]} color="ink3" width={STROKE.thin} />
          {G.POLL_TICKS.map((d, i) => (
            <Ink key={i} d={d} width={STROKE.ink} />
          ))}
          <Write x={X(0) - 30} y={L[0].below} size={TS} text="0 s: poll" color="ink2" />
          <Write x={X(10)} y={L[0].below} size={TS} text="10 s: poll" color="ink2" anchor="middle" />
          <Write x={G.slowLbl.x} y={L[0].below} size={TS} text={G.slowLbl.text} color="ink3" anchor="middle" />
          {/* crash at 1 s */}
          <g opacity={fade(frame, EV.crash, Infinity, 8)}>
            <Ink d={G.CRASH[0]} color="red" width={STROKE.ink} />
          </g>
          <Write x={X(T.crash) + 12} y={L[0].ev} size={TS} text="b2 dies" color="red" weight={600} progress={ramp(frame, ...EV.crashLabel)} />
          {/* the stale window */}
          {frame >= EV.playA1[0] && spanA1 > T.crash ? (
            <line x1={X(T.crash)} y1={L[0].span} x2={X(spanA1)} y2={L[0].span} stroke={Th.red} strokeWidth={STROKE.thick} strokeLinecap="round" />
          ) : null}
          <g opacity={fade(frame, EV.playA1[0], Infinity, 8)}>
            <Ink d={G.SPAN_END(T.crash, L[0], 'se0')} color="red" width={STROKE.ink} />
          </g>
          <g opacity={fade(frame, EV.bracket[0], Infinity, 8)}>
            <Ink d={G.SPAN_END(T.poll, L[0], 'se1')} color="red" width={STROKE.ink} />
          </g>
          <Write x={G.errLblX} y={L[0].ev} size={TS} text="9 s of errors" color="red" anchor="middle" weight={600} progress={ramp(frame, ...EV.bracket)} />
          {REQ_A.map((r) => (
            <Stamp key={r.k} r={r} ax={L[0].ax} />
          ))}
          <Playhead t={tA} ax={L[0].ax} o={playAO} />
        </g>

        <Write x={G.titleX} y={L[1].title} size={TS} text="push (meta port)" anchor={G.titleAnchor} weight={640} />
        <Ink d={G.AXES[1].d} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.AXES[1].head} color="ink2" width={STROKE.thin + 0.6} />
        <Ink d={G.MINOR[1]} color="ink3" width={STROKE.thin} />
        <Pen d={G.CRASH[1]} progress={ramp(frame, ...EV.crashB)} color="red" width={STROKE.ink} />
        {frame >= EV.playB1[0] ? (
          <line x1={X(T.crash)} y1={L[1].span} x2={X(spanB1)} y2={L[1].span} stroke={Th.red} strokeWidth={STROKE.thick} strokeLinecap="round" />
        ) : null}
        <Write x={X(T.pushDone) + 14} y={L[1].ev} size={TS} text="near zero" color="red" weight={600} progress={ramp(frame, ...EV.nearZero)} />
        {REQ_B.map((r) => (
          <Stamp key={r.k} r={r} ax={L[1].ax} />
        ))}
        <Playhead t={tB} ax={L[1].ax} o={playBO} />

        {/* ===== ① crash, health check, db update ===== */}
        <g opacity={fade(frame, EV.crash, Infinity, 8)}>
          <Ink d={G.B2X} color="red" width={STROKE.ink + 1} />
        </g>
        <Pen d={G.HB2.d} progress={ramp(frame, ...EV.hbCheck)} head={G.HB2.head} color="blue" opacity={blueOff(BEAT.stale)} />
        <g opacity={fade(frame, EV.hbFail, Infinity, 8) * (frame < BEAT.stale ? 1 : ghost(frame, BEAT.stale))}>
          <circle cx={G.hbFail[0]} cy={G.hbFail[1]} r={G.ph ? 11 : 13} fill={Th.sheet} />
          <Ink d={G.HB_FAIL} color="red" width={STROKE.ink} />
        </g>
        <Pen d={G.ORCH_DB.d} progress={ramp(frame, ...EV.dbWrite)} head={G.ORCH_DB.head} color="blue" opacity={blueOff(BEAT.stale)} />
        <Write x={G.removeLbl.x} y={G.removeLbl.y} size={TS} text="remove b2" color="blue" weight={600} progress={ramp(frame, ...EV.dbLabel)} opacity={storyO(BEAT.stale)} />

        {/* ===== the card: stale, then fresh ===== */}
        {sliceO > 0 ? (
          <g opacity={sliceO}>
            <Ink d={G.RING} color="red" width={STROKE.thin + 0.8} dash="6 6" />
          </g>
        ) : null}
        <Write x={G.statusLbl.x} y={G.statusLbl.y} size={TS} text="stale" color="red" weight={640} progress={frame < EV.reset[0] ? ramp(frame, ...EV.staleWord) : 1} opacity={sliceO} />
        <Pen d={G.STRIKE} progress={strikeP(frame)} color="ink" width={STROKE.ink} />
        <Write x={G.statusLbl.x} y={G.statusLbl.y} size={TS} text="fresh" color="green" weight={640} opacity={freshO(frame)} progress={frame < EV.reset[0] ? ramp(frame, ...EV.freshA) : ramp(frame, ...EV.freshB)} />

        {/* ===== ③ the 10 s poll ===== */}
        <Pen d={G.PULL.d} progress={ramp(frame, ...EV.pollPen)} head={G.PULL.head} color="blue" dash="10 10" width={STROKE.ink + 0.8} opacity={blueOff(EV.bracket[0])} />
        <Write x={G.pullLbl.x} y={G.pullLbl.y} size={TS} text="poll" color="blue" weight={600} progress={ramp(frame, ...EV.pollLabel)} opacity={1 - ramp(frame, ...EV.reset, EASE_FADE)} />

        {/* ===== ④ push: the meta port, then the pull ===== */}
        <Pen d={G.META_ARR.d} progress={ramp(frame, ...EV.metaPen)} head={G.META_ARR.head} color="ink" dash="10 10" />
        <Pen d={G.META_ARR.d} progress={ramp(frame, ...EV.metaPen)} head={G.META_ARR.head} color="blue" dash="10 10" width={STROKE.ink + 0.8} opacity={blueOff(BEAT.skip)} />
        <Write x={G.metaLbl.x} y={G.metaLbl.y} size={TS} text=":9091 meta" variant="mono" color="blue" progress={ramp(frame, ...EV.metaLabel)} />
        <Pen d={G.PULL.d} progress={ramp(frame, ...EV.pullPen)} head={G.PULL.head} color="blue" dash="10 10" width={STROKE.ink + 0.8} opacity={blueOff(BEAT.skip)} />
        <Write x={G.pullLbl.x} y={G.pullLbl.y} size={TS} text="pull" color="blue" weight={600} progress={ramp(frame, ...EV.pullLabel)} />

        {/* ===== requests in flight ===== */}
        {REQ_A.map((r) => (
          <Flight key={`a${r.k}`} r={r} />
        ))}
        {REQ_B.map((r) => (
          <Flight key={`b${r.k}`} r={r} />
        ))}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default StaleConfig;
