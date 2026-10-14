// Clip l09-presigned-upload — "The bytes leave your servers' path" (uploads through the api fill its network card;
// with a pre-signed URL the photo goes straight to S3 and the api's bar stops moving).
// Storyboard: lectures/lec09/animations/l09-presigned-upload/storyboard.{yaml,md}.
// Ledger: L-0068, L-0072, L-0076, L-0077, L-0078, L-0081, L-0082, L-0084, L-0085.
// Frame 0 = Fig 3·b row b (user → api → s3); the last frame is the poster.
// Two layouts share one timeline: 'wide' (1200×800, left to right) and 'phone' (720×1090, top to bottom).
import React from 'react';
import {random, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength, reversePath} from '@remotion/paths';
import {chevron, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useColor, useTheme, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BAR_STEPS, CAPTIONS, CROSSINGS, DIRECT, EV, FULL_AT, META, VIA_API} from './timeline';

export type PresignedUploadProps = {theme: ThemeName; layout?: Layout};

const head = (pts: Pt[], seed: string, size = 20) => {
  const [ux, uy] = endDir(pts);
  return chevron(pts[pts.length - 1], ux, uy, size, seed);
};
const circ = (x: number, y: number, r: number) => `M ${x - r} ${y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
// stick figure (user): head + body + arms + legs, one path. (x, y) = the hips' top.
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
// the bucket mark inside the s3 cloud: an open trapezoid (top wider than the bottom)
const bucket = (cx: number, y: number, top: number, bottom: number, h: number, seed: string) =>
  handPoly([[cx - top / 2, y], [cx - bottom / 2, y + h], [cx + bottom / 2, y + h], [cx + top / 2, y]], seed);
const tick = (x: number, y: number, s: number, seed: string) => handPoly([[x - s, y], [x - s * 0.3, y + s * 0.7], [x + s, y - s * 0.8]], seed);
// clock: ring + two hands (expiry)
const clock = (x: number, y: number, r: number, seed: string) =>
  [circ(x, y, r), handLine([x, y], [x, y - r * 0.62], seed + 'h'), handLine([x, y], [x + r * 0.5, y + r * 0.1], seed + 'm')].join(' ');

type Lbl = {x: number; y: number; anchor?: 'start' | 'middle' | 'end'};

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  if (layout === 'wide') {
    const U = {x: 100, y: 330}; // user's hips
    const A = {x: 418, y: 290, w: 164, h: 80}; // api
    const AY = A.y + A.h / 2;
    const C = {cx: 1000, cy: AY, rx: 125, ry: 80}; // s3 cloud
    const ARC0: Pt = [112, 244];
    const ARC_END: Pt = [990, 236];
    const ARC_C: Pt = [540, -40];
    return {
      ph: false,
      W: META.width,
      H: META.height,
      U, A, C,
      HELD: {x: U.x, y: 262}, // the chip above the user's head
      CHIP: {w: 34, h: 24},
      BAR: {x: A.x, y: 392, w: A.w, h: 24},
      IN: [[136, AY], [A.x - 4, AY]] as Pt[],
      OUT: [[A.x + A.w + 4, AY], [C.cx - C.rx - 4, AY]] as Pt[],
      FEED: [[A.x + A.w / 2, 226], [A.x + A.w / 2, A.y - 4]] as Pt[],
      FEED_BOX: {x: 372, y: 166, w: 256, h: 56},
      ARC_D: `M ${ARC0[0]} ${ARC0[1]} Q ${ARC_C[0]} ${ARC_C[1]} ${ARC_END[0]} ${ARC_END[1]}`,
      ARC_DIR: [ARC_C, ARC_END] as Pt[],
      BUCKET: {cx: C.cx, y: AY + 10, top: 44, bottom: 32, h: 24},
      TICK: {x: C.cx + 62, y: AY + 22, s: 15},
      TAG: {x: 40, y: 506, w: 548, h: 52},
      CLOCK: {x: 66, y: 600, r: 16},
      lbl: {
        user: {x: U.x, y: 430, anchor: 'middle'},
        api: {x: A.x + A.w / 2, y: AY + 14, anchor: 'middle'},
        s3: {x: C.cx, y: AY - 2, anchor: 'middle'},
        card: {x: A.x + A.w / 2, y: 462, anchor: 'middle'},
        full: {x: A.x + A.w + 16, y: 413},
        in: {x: 276, y: 306, anchor: 'middle'},
        out: {x: 728, y: 306, anchor: 'middle'},
        feed: {x: A.x + A.w / 2, y: 206, anchor: 'middle'},
        waits: {x: 646, y: 206},
        prep: {x: 276, y: 380, anchor: 'middle'},
        post: {x: 440, y: 80, anchor: 'middle'},
        tag: {x: 84, y: 545},
        valid: {x: 96, y: 613},
        before: {x: 640, y: 545},
        after: {x: 640, y: 613},
      } as Record<string, Lbl>,
      CAPTION_TOP: 652,
    };
  }
  // phone: a column. user top, api middle (bar right of it), s3 bottom; the arc runs down the left edge.
  const U = {x: 360, y: 120};
  const A = {x: 280, y: 340, w: 160, h: 72};
  const AX = A.x + A.w / 2;
  const C = {cx: AX, cy: 690, rx: 130, ry: 80};
  const ARC0: Pt = [342, 52];
  const ARC_END: Pt = [C.cx - C.rx - 4, C.cy];
  const ARC_C2: Pt = [30, C.cy];
  return {
    ph: true,
    W: META.phone.width,
    H: META.phone.height,
    U, A, C,
    HELD: {x: U.x, y: 50},
    CHIP: {w: 28, h: 20},
    BAR: {x: 474, y: 364, w: 190, h: 24},
    IN: [[AX, 172], [AX, A.y - 4]] as Pt[],
    OUT: [[AX, A.y + A.h + 4], [AX, C.cy - C.ry - 4]] as Pt[],
    FEED: [[466, 233], [400, 233], [400, A.y - 4]] as Pt[],
    FEED_BOX: {x: 470, y: 208, w: 220, h: 46},
    ARC_D: `M ${ARC0[0]} ${ARC0[1]} C 40 60 ${ARC_C2[0]} ${ARC_C2[1]} ${ARC_END[0]} ${ARC_END[1]}`,
    ARC_DIR: [ARC_C2, ARC_END] as Pt[],
    BUCKET: {cx: C.cx, y: C.cy + 8, top: 34, bottom: 24, h: 18},
    TICK: {x: C.cx + 52, y: C.cy + 18, s: 12},
    TAG: {x: 24, y: 808, w: 444, h: 44},
    CLOCK: {x: 500, y: 830, r: 13},
    lbl: {
      user: {x: U.x + 40, y: 132},
      api: {x: AX, y: A.y + A.h / 2 + 10, anchor: 'middle'},
      s3: {x: C.cx, y: C.cy - 2, anchor: 'middle'},
      card: {x: 569, y: 432, anchor: 'middle'},
      full: {x: 569, y: 346, anchor: 'middle'},
      in: {x: AX - 20, y: 262, anchor: 'end'},
      out: {x: AX - 20, y: 520, anchor: 'end'},
      feed: {x: 580, y: 242, anchor: 'middle'},
      waits: {x: 580, y: 190, anchor: 'middle'},
      prep: {x: AX - 20, y: 314, anchor: 'end'},
      post: {x: 142, y: 446}, // clear of the chip riding the arc (m7)
      tag: {x: 58, y: 840},
      valid: {x: 522, y: 840},
      before: {x: 24, y: 894},
      after: {x: 24, y: 940},
    } as Record<string, Lbl>,
    CAPTION_TOP: 966,
  };
};

const paths = (layout: Layout) => {
  const g = build(layout);
  const hs = g.ph ? 16 : 18;
  const B = g.BUCKET;
  const [ux, uy] = endDir(g.ARC_DIR);
  return {
    ...g,
    STICK_D: stick(g.U.x, g.U.y, 'user'),
    IN_D: handPoly(g.IN, 'in'),
    IN_HEAD: head(g.IN, 'inh', hs + 2),
    OUT_D: handPoly(g.OUT, 'out'),
    OUT_HEAD: head(g.OUT, 'outh', hs + 2),
    FEED_D: handPoly(g.FEED, 'feed'),
    FEED_HEAD: head(g.FEED, 'feedh', hs),
    API_D: serverBox(g.A.x, g.A.y, g.A.w, g.A.h, 'api'),
    BAR_D: serverBox(g.BAR.x, g.BAR.y, g.BAR.w, g.BAR.h, 'bar'),
    CLOUD_D: cloud(g.C.cx, g.C.cy, g.C.rx, g.C.ry, 's3'),
    BUCKET_D: bucket(B.cx, B.y, B.top, B.bottom, B.h, 'bucket'),
    ARC_HEAD: chevron(g.ARC_DIR[1], ux, uy, hs + 2, 'arch'),
    TICK_D: tick(g.TICK.x, g.TICK.y, g.TICK.s, 's3tick'),
    TAG_D: serverBox(g.TAG.x, g.TAG.y, g.TAG.w, g.TAG.h, 'tag'),
    HOLE_D: circ(g.TAG.x + (g.ph ? 16 : 22), g.TAG.y + g.TAG.h / 2, g.ph ? 5 : 6),
    CLOCK_D: clock(g.CLOCK.x, g.CLOCK.y, g.CLOCK.r, 'clock'),
  };
};
const LAYOUTS = {wide: paths('wide'), phone: paths('phone')};

// ---------- frame-driven state ----------
/** Fraction of the network card in use: one step per crossing (each step drawn over 8 frames). */
const barLevel = (f: number) => Math.min(1, CROSSINGS.reduce((s, at) => s + ramp(f, at, 8, EASE_MOVE), 0) / BAR_STEPS);
const AFTER_LEVEL = 0.05; // the prepare calls: a sliver, no photo bytes

/** The photo's bytes travelling along `d` (the board's small filled rectangle), shown only in flight. */
const Chip: React.FC<{d: string; progress: number; w: number; h: number; color?: MarkerColor}> = ({d, progress, w, h, color = 'blue'}) => {
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

export const PresignedUpload: React.FC<PresignedUploadProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TS = typeFor(layout).label;
  const L = G.lbl;
  const pr = G.ph ? 8 : 9;

  const lbl = (k: string, text: string, rest: Partial<React.ComponentProps<typeof Write>> = {}) => (
    <Write x={L[k].x} y={L[k].y} anchor={L[k].anchor ?? 'start'} text={text} size={TS} {...rest} />
  );

  const past = ghost(frame, EV.ghost); // the before state, from ③ on
  const first = VIA_API[0];
  const level = barLevel(frame);
  const isFull = frame >= FULL_AT;
  const swap = ramp(frame, EV.barSwap, 10, EASE_FADE); // ④ the old fill is replaced in place
  const {BAR, CHIP, HELD, FEED_BOX: FB} = G;
  const inner = BAR.w - 6;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): Fig 3·b row b ===== */}
        <Ink d={G.STICK_D} />
        <rect x={HELD.x - CHIP.w / 2} y={HELD.y - CHIP.h / 2} width={CHIP.w} height={CHIP.h} rx={3} fill={T.blue} />
        {lbl('user', 'user')}
        <Ink d={G.IN_D} />
        <Ink d={G.IN_HEAD} />
        <g opacity={past}>
          <Ink d={G.OUT_D} />
          <Ink d={G.OUT_HEAD} />
        </g>

        {/* ① ② the straight route re-inked blue while photos ride it; ghosted from ③ */}
        <Pen d={G.IN_D} progress={ramp(frame, first.in[0], first.in[1], EASE_MOVE)} color="blue" head={G.IN_HEAD} opacity={past} />
        <Pen d={G.OUT_D} progress={ramp(frame, first.out[0], first.out[1], EASE_MOVE)} color="blue" head={G.OUT_HEAD} opacity={past} />
        {lbl('in', '5 MB in', {variant: 'mono', color: 'blue', progress: ramp(frame, ...EV.inLbl), opacity: past})}
        {lbl('out', '5 MB out', {variant: 'mono', color: 'blue', progress: ramp(frame, ...EV.outLbl), opacity: past})}

        {/* ③ prepare: a thin blue call, no bytes */}
        <Pen d={G.IN_D} progress={ramp(frame, EV.prep[0], EV.prep[1], EASE_MOVE)} color="blue" width={STROKE.thin} />
        {lbl('prep', 'prepare', {variant: 'mono', color: 'blue', progress: ramp(frame, ...EV.prepLbl)})}

        {/* api with its network card */}
        <Ink d={G.API_D} fill={T.sheet} />
        {lbl('api', 'api', {variant: 'mono'})}
        <Ink d={G.BAR_D} fill={T.sheet} width={STROKE.thin + 0.6} />
        {level > 0 ? (
          <rect x={BAR.x + 3} y={BAR.y + 3} width={inner * level} height={BAR.h - 6} fill={isFull ? T.red : T.ink2} opacity={past * (1 - swap)} />
        ) : null}
        {swap > 0 ? <rect x={BAR.x + 3} y={BAR.y + 3} width={inner * AFTER_LEVEL} height={BAR.h - 6} fill={T.ink2} opacity={swap} /> : null}
        {lbl('card', 'network card', {color: 'ink2'})}
        {lbl('full', 'full', {color: 'red', weight: 600, progress: ramp(frame, ...EV.full), opacity: past * (1 - swap)})}

        {/* ② another API call waits */}
        <g opacity={past}>
          <Pen d={G.FEED_D} progress={ramp(frame, ...EV.feedArrow)} head={G.FEED_HEAD} />
          {lbl('feed', 'GET /feed', {variant: 'mono', progress: ramp(frame, ...EV.feedLbl)})}
          <rect x={FB.x} y={FB.y} width={FB.w} height={FB.h} rx={6} fill="none" stroke={T.red} strokeWidth={STROKE.ink * 0.8}
            strokeDasharray="13 10" strokeLinecap="round" opacity={fade(frame, EV.feedBox, Infinity, 10)} />
          {lbl('waits', 'waits', {color: 'red', weight: 600, progress: ramp(frame, ...EV.waits)})}
        </g>

        {/* s3: cloud with the bucket mark */}
        <Ink d={G.CLOUD_D} fill={T.sheet} />
        {lbl('s3', 's3', {variant: 'mono'})}
        <Ink d={G.BUCKET_D} width={STROKE.ink - 0.6} />
        <g opacity={fade(frame, EV.tick, Infinity, 8)}>
          <Ink d={G.TICK_D} color="green" width={STROKE.ink + 0.6} />
        </g>

        {/* ④ the long arc straight to s3 */}
        <Pen d={G.ARC_D} progress={ramp(frame, DIRECT[0][0], DIRECT[0][1], EASE_MOVE)} color="blue" head={G.ARC_HEAD} />
        {lbl('post', 'POST', {variant: 'mono', color: 'blue', weight: 600, progress: ramp(frame, ...EV.postLbl)})}

        {/* ③ the pre-signed URL, held by the user */}
        <Pen d={G.TAG_D} progress={ramp(frame, ...EV.tag)} />
        <g opacity={fade(frame, EV.tag[0] + EV.tag[1] - 4, Infinity, 6)}>
          <Ink d={G.HOLE_D} width={STROKE.thin} />
        </g>
        {lbl('tag', 's3://images/<id>.png', {variant: 'mono', progress: ramp(frame, ...EV.tagLbl)})}
        <g opacity={fade(frame, EV.clock, Infinity, 8)}>
          <Ink d={G.CLOCK_D} width={STROKE.ink - 0.8} />
        </g>
        {lbl('valid', 'valid 60 s', {progress: ramp(frame, ...EV.valid)})}

        {/* packets and chips on top of the lines they ride */}
        {VIA_API.map((u, i) => (
          <g key={`via${i}`}>
            <Chip d={G.IN_D} progress={ramp(frame, u.in[0], u.in[1], EASE_MOVE)} w={CHIP.w} h={CHIP.h} />
            <Chip d={G.OUT_D} progress={ramp(frame, u.out[0], u.out[1], EASE_MOVE)} w={CHIP.w} h={CHIP.h} />
          </g>
        ))}
        <Packet d={G.IN_D} progress={ramp(frame, EV.prep[0], EV.prep[1], EASE_MOVE)} color="blue" r={pr} />
        <Packet d={reversePath(G.IN_D)} progress={ramp(frame, EV.reply[0], EV.reply[1], EASE_MOVE)} color="green" r={pr} />
        {DIRECT.map((sp, i) => (
          <Chip key={`arc${i}`} d={G.ARC_D} progress={ramp(frame, sp[0], sp[1], EASE_MOVE)} w={CHIP.w} h={CHIP.h} />
        ))}

        {/* summary */}
        {lbl('before', 'before: 5 MB in + out', {color: 'ink2', progress: ramp(frame, ...EV.before)})}
        {lbl('after', 'after: 5 MB, one trip', {color: 'blue', weight: 600, progress: ramp(frame, ...EV.after)})}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default PresignedUpload;
