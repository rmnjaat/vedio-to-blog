// Clip l09-signed-url-expiry — "A forwarded URL, before and after it expires" (a window in time on a signed URL).
// Storyboard: lectures/lec09/animations/l09-signed-url-expiry/storyboard.{yaml,md}.
// Ledger: L-0162, L-0164, L-0168, L-0169, L-0172, L-0177, L-0178.
// Frame 0: a time track (0 · 2 · 5 · 10 min) over B → api and C → cdn (the cdn already holds A's photo); the last
// frame is the poster. Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×1000, ≤ 640 px).
import React from 'react';
import {interpolate, random, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength, reversePath} from '@remotion/paths';
import {chevron, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useColor, useTheme, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, MIN} from './timeline';

export type SignedUrlExpiryProps = {theme: ThemeName; layout?: Layout};

const head = (pts: Pt[], seed: string, size = 20) => {
  const [ux, uy] = endDir(pts);
  return chevron(pts[pts.length - 1], ux, uy, size, seed);
};
const circ = (x: number, y: number, r: number) => `M ${x - r} ${y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
// stick figure: head + body + arms + legs, one path. (x, y) = the hips' top; arms at y - 4.
const stick = (x: number, y: number, seed: string) =>
  [
    circ(x, y - 32, 14),
    handLine([x, y - 18], [x, y + 16], seed + 'b'),
    handLine([x - 22, y - 4], [x + 22, y - 4], seed + 'a'),
    handLine([x, y + 16], [x - 17, y + 44], seed + 'l'),
    handLine([x, y + 16], [x + 17, y + 44], seed + 'r'),
  ].join(' ');
// the kit's cloud: n scallops round an ellipse, valleys on the ellipse (one at each axis end, where the lines attach).
const cloud = (cx: number, cy: number, rx: number, ry: number, seed: string, n = 12) => {
  const P = (th: number, k = 1): Pt => [cx + rx * k * Math.cos(th), cy + ry * k * Math.sin(th)];
  const f = (p: Pt) => `${Math.round(p[0] * 10) / 10} ${Math.round(p[1] * 10) / 10}`;
  let d = `M ${f(P(Math.PI))}`;
  for (let i = 0; i < n; i++) {
    const a = Math.PI + (2 * Math.PI * i) / n;
    const b = Math.PI + (2 * Math.PI * (i + 1)) / n;
    const k = 1.22 + (random(`${seed}-${i}`) - 0.5) * 0.06;
    d += ` Q ${f(P((a + b) / 2, k))} ${f(P(b))}`;
  }
  return d + ' Z';
};
const tick = (x: number, y: number, s: number, seed: string) => handPoly([[x - s, y], [x - s * 0.3, y + s * 0.7], [x + s, y - s * 0.8]], seed);
const cross = (x: number, y: number, s: number, seed: string) =>
  `${handLine([x - s, y - s], [x + s, y + s], seed + 'a')} ${handLine([x + s, y - s], [x - s, y + s], seed + 'b')}`;
// clock: ring + two hands (the URL's expiry)
const clock = (x: number, y: number, r: number, seed: string) =>
  [circ(x, y, r), handLine([x, y], [x, y - r * 0.62], seed + 'h'), handLine([x, y], [x + r * 0.5, y + r * 0.1], seed + 'm')].join(' ');

type Lbl = {x: number; y: number; anchor?: 'start' | 'middle' | 'end'};
type Box = {x: number; y: number; w: number; h: number};

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  if (layout === 'wide') {
    // people on the left (B top row, C bottom row, each holding the key tag at their left); servers on the right
    const ROW1 = 270;
    const ROW2 = 540;
    const B = {x: 330, y: ROW1 + 4};
    const C = {x: 330, y: ROW2 + 4};
    const API: Box = {x: 880, y: 216, w: 260, h: 104};
    const CL = {cx: 1000, cy: ROW2, rx: 170, ry: 84};
    const TAG_B: Box = {x: 32, y: 216, w: 250, h: 108};
    const TAG_C: Box = {x: 32, y: 486, w: 250, h: 108};
    return {
      ph: false,
      W: META.width,
      H: META.height,
      TR: {y: 84, x0: 400, per: 68, end: 1160, tickH: 10, numY: 124, stampY: 36, stampLblY: 46, stampS: 15, phTop: 62, phBot: 95},
      B, C, API, CL, TAG_B, TAG_C,
      TAG: {hole: 20, holeR: 6, tx: 44, l1: 46, l2: 92, clockDx: 34, clockDy: 34, clockR: 18},
      SLOT: {x: 955, y: 516, w: 120, h: 48},
      CHIP: {w: 34, h: 24},
      CHECK: {x: 880, box: 30, tx: 926, rows: [392, 434]},
      REQ_B: [[B.x + 22, ROW1], [API.x - 4, ROW1]] as Pt[],
      REQ_C: [[C.x + 22, ROW2], [CL.cx - CL.rx - 4, ROW2]] as Pt[],
      COPY: [[240, TAG_B.y + TAG_B.h + 4], [240, TAG_C.y - 4]] as Pt[],
      lbl: {
        time: {x: 376, y: 92, anchor: 'end'},
        sped: {x: 376, y: 132, anchor: 'end'},
        oe: {x: 774, y: 124},
        probably: {x: 774, y: 164},
        bName: {x: 300, y: 206, anchor: 'end'},
        cName: {x: 300, y: 476, anchor: 'end'},
        bRole: {x: 40, y: 206},
        cRole: {x: 40, y: 632},
        get: {x: 400, y: 248},
        api: {x: API.x + API.w / 2, y: 258, anchor: 'middle'},
        follows: {x: 896, y: 302},
        result: {x: 590, y: 516, anchor: 'middle'},
        cdn: {x: 900, y: 552, anchor: 'middle'},
        cached: {x: 1015, y: 604, anchor: 'middle'},
        decides1: {x: 860, y: 318, anchor: 'end'},
        decides2: {x: 860, y: 360, anchor: 'end'},
        knows: {x: 812, y: 590, anchor: 'end'},
      } as Record<string, Lbl>,
      FOLLOW_TICK: {x: 1120, y: 292, s: 12},
      CAPTION_TOP: 652,
    };
  }
  // phone: the same two rows, narrower; the api's check under its box; 'knows no one' under the cloud
  const ROW1 = 290;
  const ROW2 = 680;
  const B = {x: 262, y: ROW1 + 4};
  const C = {x: 262, y: ROW2 + 4};
  const API: Box = {x: 520, y: 256, w: 180, h: 72};
  const CL = {cx: 578, cy: ROW2, rx: 126, ry: 78};
  const TAG_B: Box = {x: 24, y: 240, w: 204, h: 88};
  const TAG_C: Box = {x: 24, y: 630, w: 204, h: 88};
  return {
    ph: true,
    W: META.phone.width,
    H: META.phone.height,
    TR: {y: 80, x0: 120, per: 52, end: 700, tickH: 9, numY: 114, stampY: 30, stampLblY: 40, stampS: 12, phTop: 60, phBot: 90},
    B, C, API, CL, TAG_B, TAG_C,
    TAG: {hole: 15, holeR: 5, tx: 32, l1: 36, l2: 72, clockDx: 24, clockDy: 26, clockR: 13},
    SLOT: {x: 550, y: 664, w: 96, h: 38},
    CHIP: {w: 28, h: 20},
    CHECK: {x: 470, box: 24, tx: 506, rows: [520, 560]},
    REQ_B: [[B.x + 22, ROW1], [API.x - 4, ROW1]] as Pt[],
    REQ_C: [[C.x + 22, ROW2], [CL.cx - CL.rx - 4, ROW2]] as Pt[],
    COPY: [[200, TAG_B.y + TAG_B.h + 4], [200, TAG_C.y - 4]] as Pt[],
    lbl: {
      time: {x: 24, y: 150},
      oe: {x: 380, y: 150, anchor: 'middle'},
      probably: {x: 380, y: 186, anchor: 'middle'},
      bName: {x: 238, y: 232, anchor: 'end'},
      cName: {x: 238, y: 622, anchor: 'end'},
      bRole: {x: 24, y: 232},
      cRole: {x: 24, y: 756},
      get: {x: 290, y: 240},
      api: {x: API.x + API.w / 2, y: 302, anchor: 'middle'},
      follows: {x: 510, y: 368},
      result: {x: 354, y: 724, anchor: 'middle'},
      cdn: {x: 512, y: 692, anchor: 'middle'},
      cached: {x: 598, y: 742, anchor: 'middle'},
      decides1: {x: 700, y: 408, anchor: 'end'},
      decides2: {x: 700, y: 444, anchor: 'end'},
      knows: {x: 578, y: 800, anchor: 'middle'},
    } as Record<string, Lbl>,
    FOLLOW_TICK: {x: 694, y: 358, s: 11},
    CAPTION_TOP: 828,
  };
};

const paths = (layout: Layout) => {
  const g = build(layout);
  const hs = g.ph ? 16 : 20;
  const xm = (m: number) => g.TR.x0 + g.TR.per * m;
  return {
    ...g,
    xm,
    AXIS_D: handLine([g.TR.x0 - 16, g.TR.y], [g.TR.end, g.TR.y], 'axis'),
    TICKS_D: [0, MIN.first, MIN.expiry, MIN.second].map((m, i) => handLine([xm(m), g.TR.y - g.TR.tickH], [xm(m), g.TR.y + g.TR.tickH], `tk${i}`)).join(' '),
    SPAN_D: handLine([xm(0), g.TR.y], [xm(MIN.expiry), g.TR.y], 'span'),
    MARK_D: handLine([xm(MIN.expiry), g.TR.y - 26], [xm(MIN.expiry), g.TR.y + (g.ph ? 8 : 10)], 'mark'),
    STICK_B: stick(g.B.x, g.B.y, 'figB'),
    STICK_C: stick(g.C.x, g.C.y, 'figC'),
    REQ_B_D: handPoly(g.REQ_B, 'reqB'),
    REQ_B_HEAD: head(g.REQ_B, 'reqBh', hs),
    REQ_C_D: handPoly(g.REQ_C, 'reqC'),
    REQ_C_HEAD: head(g.REQ_C, 'reqCh', hs),
    COPY_D: handPoly(g.COPY, 'copy'),
    COPY_HEAD: head(g.COPY, 'copyh', hs - 2),
    API_D: serverBox(g.API.x, g.API.y, g.API.w, g.API.h, 'api'),
    CLOUD_D: cloud(g.CL.cx, g.CL.cy, g.CL.rx, g.CL.ry, 'cdn'),
    SLOT_D: serverBox(g.SLOT.x, g.SLOT.y, g.SLOT.w, g.SLOT.h, 'slot'),
    BOX_D: g.CHECK.rows.map((y, i) => serverBox(g.CHECK.x, y - g.CHECK.box + 3, g.CHECK.box, g.CHECK.box, `chk${i}`)),
    TAG_B_D: serverBox(g.TAG_B.x, g.TAG_B.y, g.TAG_B.w, g.TAG_B.h, 'tagB'),
  };
};
const LAYOUTS = {wide: paths('wide'), phone: paths('phone')};
type G = (typeof LAYOUTS)['wide'];

/** Minutes on the track at frame f: 0, then 0 → 2 (③), then 2 → 10 (④). Linear: the playhead's speed is time. */
const minutesAt = (f: number) => {
  const lin = (span: readonly [number, number], a: number, b: number) =>
    interpolate(f, [span[0], span[0] + span[1]], [a, b], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  if (f < EV.play2[0]) return lin(EV.play1, 0, MIN.first);
  return lin(EV.play2, MIN.first, MIN.second);
};

/** The key tag (signed URL): chamfered tag with a hole, mono 'oh=…' / 'oe=…', a clock for the expiry. */
const KeyTag: React.FC<{
  g: G;
  box: {x: number; y: number};
  outline: number;
  text: number;
  clockO: number;
  oeEdit?: {outO: number; laterP: number};
  size: number;
}> = ({g, box, outline, text, clockO, oeEdit, size}) => {
  const sheet = useTheme().sheet;
  const T = g.TAG;
  const {w, h} = g.TAG_B;
  const d = serverBox(0, 0, w, h, 'tag');
  const holeD = circ(T.hole, h / 2, T.holeR);
  const clockD = clock(w - T.clockDx, T.clockDy, T.clockR, 'tagclock');
  const oeO = oeEdit ? 1 - oeEdit.outO : 1;
  return (
    <g transform={`translate(${box.x} ${box.y})`}>
      {outline >= 1 ? <path d={d} fill={sheet} stroke="none" /> : null}
      <Pen d={d} progress={outline} />
      <Pen d={holeD} progress={outline} width={STROKE.thin} />
      <Write x={T.tx} y={T.l1} text="oh=…" variant="mono" size={size} progress={Math.min(1, text * 2)} />
      <Write x={T.tx} y={T.l2} text="oe=…" variant="mono" size={size} progress={Math.max(0, text * 2 - 1)} opacity={oeO} />
      {oeEdit ? <Write x={T.tx} y={T.l2} text="oe=later" variant="mono" size={size} color="red" weight={560} progress={oeEdit.laterP} /> : null}
      <g opacity={clockO}>
        <Ink d={clockD} width={STROKE.ink - 0.8} />
      </g>
    </g>
  );
};

/** The photo's bytes travelling along `d` (a small filled rectangle), shown only in flight. */
const Chip: React.FC<{d: string; progress: number; w: number; h: number; color?: MarkerColor}> = ({d, progress, w, h, color = 'green'}) => {
  const c = useColor(color);
  const sheet = useTheme().sheet;
  if (progress <= 0 || progress >= 1) return null;
  const pt = getPointAtLength(d, getLength(d) * progress);
  if (!pt) return null;
  const o = Math.min(1, progress / 0.06, (1 - progress) / 0.06);
  return (
    <g opacity={o}>
      <rect x={pt.x - w / 2 - 3} y={pt.y - h / 2 - 3} width={w + 6} height={h + 6} rx={4} fill={sheet} />
      <rect x={pt.x - w / 2} y={pt.y - h / 2} width={w} height={h} rx={3} fill={c} />
    </g>
  );
};

export const SignedUrlExpiry: React.FC<SignedUrlExpiryProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TY = typeFor(layout);
  const TS = TY.label;
  const L = G.lbl;
  const pr = G.ph ? 8 : 9;
  const sw = STROKE.ink + 0.6;

  const lbl = (k: string, text: string, rest: Partial<React.ComponentProps<typeof Write>> = {}) => (
    <Write x={L[k].x} y={L[k].y} anchor={L[k].anchor ?? 'start'} text={text} size={TS} {...rest} />
  );
  const r = (span: readonly [number, number], e = undefined as undefined | ((t: number) => number)) => ramp(frame, span[0], span[1], e);
  const mv = (span: readonly [number, number]) => ramp(frame, span[0], span[1], EASE_MOVE);

  // ---- the track ----
  const mins = minutesAt(frame);
  const phX = G.xm(mins);
  const pastX = G.xm(Math.min(MIN.last, Math.max(MIN.expiry, mins)));
  const TR = G.TR;

  // ---- re-inks (fade back 14 f after the step's reply arrives) ----
  const reink = (req: readonly [number, number], back: readonly [number, number]) => ({
    p: mv(req),
    o: 1 - ramp(frame, back[0] + back[1], 14, EASE_FADE),
  });
  const ink1 = reink(EV.req1, EV.reply1);
  const ink2 = reink(EV.req2, EV.reply2);
  const ink3 = reink(EV.req3, EV.reply3);
  const ink4 = reink(EV.req4, EV.reply4);
  const backC = reversePath(G.REQ_C_D);

  // ---- the copy: slides from B's tag to C's tag ----
  const slide = mv(EV.slide);
  const slideY = G.TAG_B.y + (G.TAG_C.y - G.TAG_B.y) * slide;
  const landed = frame >= EV.slide[0] + EV.slide[1];

  // ---- checklist marks (replaced in place each attempt) ----
  const CK = G.CHECK;
  const markAt = (row: 0 | 1) => ({x: CK.x + CK.box / 2, y: CK.rows[row] - CK.box / 2 + 3});
  const ms = G.ph ? 9 : 11;
  const marks: {row: 0 | 1; kind: 'ok' | 'no'; o: number}[] = [
    {row: 0, kind: 'ok', o: fade(frame, EV.sig1[0], EV.out1[0])},
    {row: 1, kind: 'ok', o: fade(frame, EV.exp1[0], EV.out1[0])},
    {row: 0, kind: 'ok', o: fade(frame, EV.sig2[0], EV.out2[0])},
    {row: 1, kind: 'no', o: fade(frame, EV.exp2[0], EV.out2[0])},
    {row: 0, kind: 'no', o: fade(frame, EV.sig3[0])},
  ];

  // ---- result label on C's line: 'photo' then 'bad url' (replaced in place) ----
  const photoO = 1 - ramp(frame, EV.out1[0], EV.out1[1], EASE_FADE);
  const bad1O = 1 - ramp(frame, EV.badOut[0], EV.badOut[1], EASE_FADE);

  // ---- stamps on the track ----
  const sY = TR.stampY;
  const ss = TR.stampS;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== the time track ===== */}
        <Ink d={G.AXIS_D} width={STROKE.thin + 0.4} />
        <Ink d={G.TICKS_D} width={STROKE.thin + 0.4} />
        {[0, MIN.first, MIN.expiry].map((m) => (
          <Write key={m} x={G.xm(m)} y={TR.numY} anchor="middle" text={String(m)} variant="mono" size={TS} color="ink2" />
        ))}
        <Write x={G.xm(MIN.second)} y={TR.numY} anchor="middle" text={`${MIN.second} min`} variant="mono" size={TS} color="ink2" />
        {G.ph ? (
          lbl('time', 'time (sped up)', {color: 'ink2'})
        ) : (
          <>
            {lbl('time', 'time', {color: 'ink2'})}
            {lbl('sped', '(sped up)', {color: 'ink2'})}
          </>
        )}
        {/* ① the URL's window: valid 0 → 5, expiry mark at 5 */}
        <Pen d={G.SPAN_D} progress={r(EV.span)} color="green" width={STROKE.thick + 1} />
        <g opacity={fade(frame, EV.mark[0])}>
          <Ink d={G.MARK_D} color="red" width={STROKE.ink} dash="9 8" />
        </g>
        {lbl('oe', 'oe: expiry', {color: 'red', progress: r(EV.oeLbl), weight: 560})}
        
        {/* ④ time past the expiry grows red as the playhead crosses 5 */}
        {pastX > G.xm(MIN.expiry) + 1 ? (
          <Ink d={handLine([G.xm(MIN.expiry), TR.y], [pastX, TR.y], 'past')} color="red" width={STROKE.thick + 1} />
        ) : null}
        {/* playhead */}
        <Ink d={handLine([phX, TR.phTop + 8], [phX, TR.phBot], 'ph')} width={STROKE.ink} />
        <path d={`M ${phX - 9} ${TR.phTop} L ${phX + 9} ${TR.phTop} L ${phX} ${TR.phTop + 12} Z`} fill={T.ink} />
        {/* stamps: ✓ photo at minute 2, ✕ expired at minute 10 */}
        <g opacity={fade(frame, EV.stamp1[0])}>
          <Ink d={tick(G.xm(MIN.first), sY, ss, 'st1')} color="green" width={sw} />
        </g>
        <Write x={G.xm(MIN.first) + ss + 8} y={TR.stampLblY} text="photo" size={TS} color="green" weight={600} progress={r(EV.stamp1Lbl)} />
        <g opacity={fade(frame, EV.stamp2[0])}>
          <Ink d={cross(G.xm(MIN.second), sY, ss * 0.75, 'st2')} color="red" width={sw} />
        </g>
        <Write x={G.xm(MIN.second) - ss - 8} y={TR.stampLblY} anchor="end" text="expired" size={TS} color="red" weight={600} progress={r(EV.stamp2Lbl)} />

        {/* ===== row 1: B → api ===== */}
        <Ink d={G.STICK_B} />
        {lbl('bName', 'B', {weight: 640})}
        {lbl('bRole', 'follower', {color: 'ink2'})}
        <Ink d={G.REQ_B_D} />
        <Ink d={G.REQ_B_HEAD} />
        <Pen d={G.REQ_B_D} progress={ink1.p} color="blue" head={G.REQ_B_HEAD} opacity={ink1.o} />
        {/* kept at full blue to the poster: this request is the step that decides who gets the URL (critic C-06) */}
        {lbl('get', 'GET /users/A/posts', {variant: 'mono', color: 'blue', progress: r(EV.getLbl)})}
        <Ink d={G.API_D} fill={T.sheet} />
        {lbl('api', 'api', {variant: 'mono'})}
        {lbl('follows', 'follows A?', {progress: r(EV.follows)})}
        <g opacity={fade(frame, EV.followTick[0])}>
          <Ink d={tick(G.FOLLOW_TICK.x, G.FOLLOW_TICK.y, G.FOLLOW_TICK.s, 'ftk')} color="green" width={sw} />
        </g>
        {/* B's key tag (the signed URL) */}
        <KeyTag g={G} box={G.TAG_B} outline={r(EV.tagB)} text={r(EV.tagText)} clockO={fade(frame, EV.clock[0])} size={TS} />

        {/* ② the copy: dashed graphite (a copy, not a call), head at C */}
        <Pen d={G.COPY_D} progress={r(EV.path)} dash="12 10" head={G.COPY_HEAD} opacity={ghost(frame, BEAT.min2)} />

        {/* ===== row 2: C → cdn ===== */}
        <Ink d={G.STICK_C} />
        {lbl('cName', 'C', {weight: 640})}
        {lbl('cRole', 'not a follower', {color: 'ink2'})}
        <Ink d={G.REQ_C_D} />
        <Ink d={G.REQ_C_HEAD} />
        {[ink2, ink3, ink4].map((k, i) => (
          <Pen key={`rc${i}`} d={G.REQ_C_D} progress={k.p} color="blue" head={G.REQ_C_HEAD} opacity={k.o} />
        ))}
        <Ink d={G.CLOUD_D} fill={T.sheet} />
        {lbl('cdn', 'cdn', {variant: 'mono'})}
        <Ink d={G.SLOT_D} fill={T.sheet} width={STROKE.ink - 0.6} />
        <rect x={G.SLOT.x + (G.SLOT.w - G.CHIP.w - 6) / 2} y={G.SLOT.y + (G.SLOT.h - G.CHIP.h) / 2} width={G.CHIP.w + 6} height={G.CHIP.h + 2} rx={3} fill={T.ink2} />
        {lbl('cached', 'cached', {color: 'ink2'})}

        {/* the cdn's check: signature, then expiry */}
        {G.BOX_D.map((d, i) => (
          <Ink key={`bx${i}`} d={d} fill={T.sheet} width={STROKE.thin + 0.4} />
        ))}
        <Write x={CK.tx} y={CK.rows[0]} text="signature" size={TS} />
        <Write x={CK.tx} y={CK.rows[1]} text="not expired" size={TS} />
        {marks.map((m, i) => {
          if (m.o <= 0) return null;
          const p = markAt(m.row);
          return (
            <g key={`mk${i}`} opacity={m.o}>
              <Ink d={m.kind === 'ok' ? tick(p.x, p.y, ms, `mk${i}`) : cross(p.x, p.y, ms * 0.8, `mk${i}`)} color={m.kind === 'ok' ? 'green' : 'red'} width={sw} />
            </g>
          );
        })}

        {/* C's tag: the copy slides down, then stays; ⑤ C edits oe */}
        {frame >= EV.slide[0] && !landed ? (
          <KeyTag g={G} box={{x: G.TAG_C.x, y: slideY}} outline={1} text={1} clockO={1} size={TS} />
        ) : null}
        {landed ? (
          <KeyTag g={G} box={G.TAG_C} outline={1} text={1} clockO={1} size={TS}
            oeEdit={{outO: r(EV.oeOut, EASE_FADE), laterP: r(EV.oeLater)}} />
        ) : null}

        {/* results on C's line */}
        <Write x={L.result.x} y={L.result.y} anchor="middle" text="photo" size={TS} color="green" weight={600} progress={r(EV.photoLbl)} opacity={photoO} />
        <Write x={L.result.x} y={L.result.y} anchor="middle" text="bad url" variant="mono" size={TS} color="red" weight={560} progress={r(EV.badLbl1)} opacity={bad1O} />
        <Write x={L.result.x} y={L.result.y} anchor="middle" text="bad url" variant="mono" size={TS} color="red" weight={560} progress={r(EV.badLbl2)} />

        {/* summary */}
        {lbl('decides1', 'decides who', {color: 'ink2', progress: r(EV.decides1)})}
        {lbl('decides2', 'gets the URL', {color: 'ink2', progress: r(EV.decides2)})}
        {lbl('knows', 'knows no one', {color: 'ink2', progress: r(EV.knows)})}

        {/* packets on top of everything they ride */}
        <Packet d={G.REQ_B_D} progress={mv(EV.req1)} color="blue" r={pr} />
        <Packet d={reversePath(G.REQ_B_D)} progress={mv(EV.reply1)} color="green" r={pr} />
        <Packet d={G.REQ_C_D} progress={mv(EV.req2)} color="blue" r={pr} />
        <Chip d={backC} progress={mv(EV.reply2)} w={G.CHIP.w} h={G.CHIP.h} />
        <Packet d={G.REQ_C_D} progress={mv(EV.req3)} color="blue" r={pr} />
        <Packet d={backC} progress={mv(EV.reply3)} color="red" r={pr} />
        <Packet d={G.REQ_C_D} progress={mv(EV.req4)} color="blue" r={pr} />
        <Packet d={backC} progress={mv(EV.reply4)} color="red" r={pr} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default SignedUrlExpiry;
