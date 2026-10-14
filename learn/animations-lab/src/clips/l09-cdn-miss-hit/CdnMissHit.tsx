// Clip l09-cdn-miss-hit — "One fetch, then thousands of hits" (a CDN miss, then hits, then one refetch per expiry).
// Storyboard: lectures/lec09/animations/l09-cdn-miss-hit/storyboard.{yaml,md}. Ledger: L-0036, L-0037, L-0038, L-0043.
// Frame 0 = Fig 2·b with three viewers (viewers → cdn cloud with an empty slot → origin); the last frame is the poster.
// Two layouts share one timeline: 'wide' (1200×800, left to right) and 'phone' (720×960, top to bottom, ≤ 640 px).
import React from 'react';
import {Easing, random, useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength, reversePath} from '@remotion/paths';
import {chevron, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useColor, useTheme, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, HIT, HITS, META, MISSES} from './timeline';

export type CdnMissHitProps = {theme: ThemeName; layout?: Layout};

const head = (pts: Pt[], seed: string, size = 20) => {
  const [ux, uy] = endDir(pts);
  return chevron(pts[pts.length - 1], ux, uy, size, seed);
};
const circ = (x: number, y: number, r: number) => `M ${x - r} ${y} a ${r} ${r} 0 1 0 ${2 * r} 0 a ${r} ${r} 0 1 0 ${-2 * r} 0`;
// stick figure (viewer): head + body + arms + legs, one path. (x, y) = the hips' top.
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
const comma = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

type Lbl = {x: number; y: number; anchor?: 'start' | 'middle' | 'end'};

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  if (layout === 'wide') {
    // viewers (left) → bus x 130 → trunk y 290 → cdn cloud (centre) → right, down → origin box
    const VY = [170, 290, 410];
    const MID = 290;
    const BUS = 130;
    const C = {cx: 640, cy: 290, rx: 180, ry: 115};
    const L_IN = C.cx - C.rx - 4;
    const R_OUT = C.cx + C.rx + 4;
    const O = {x: 920, y: 440, w: 180, h: 80};
    const OX = O.x + O.w / 2;
    const SLOT = {x: 585, y: 262, w: 110, h: 50};
    return {
      ph: false,
      W: META.width,
      H: META.height,
      viewers: VY.map((y) => ({x: 60, y})),
      C, O, SLOT,
      CHIP: {w: 34, h: 24},
      TTL: {x: SLOT.x, y: 326, w: SLOT.w, h: 12},
      STUBS: VY.map((y) => [[90, y], [BUS, y]] as Pt[]),
      BUS_PTS: [[BUS, VY[0]], [BUS, VY[2]]] as Pt[],
      TRUNK: [[BUS, MID], [L_IN, MID]] as Pt[],
      REQ: VY.map((y) => (y === MID ? [[90, MID], [L_IN, MID]] : [[90, y], [BUS, y], [BUS, MID], [L_IN, MID]]) as Pt[]),
      MISS: [[R_OUT, MID], [OX, MID], [OX, O.y - 4]] as Pt[],
      lbl: {
        cdn: {x: C.cx, y: 246, anchor: 'middle'},
        ttl: {x: SLOT.x - 12, y: 342, anchor: 'end'},
        status: {x: C.cx, y: 150, anchor: 'middle'},
        req: {x: BUS + 16, y: 262},
        fetch: {x: R_OUT + 18, y: 262},
        more: {x: 24, y: 520},
        cdnHost: {x: C.cx, y: 456, anchor: 'middle'},
        cdnCount: {x: C.cx, y: 512, anchor: 'middle'},
        origin: {x: OX, y: O.y + O.h / 2 + 14, anchor: 'middle'},
        oHost: {x: OX - 5, y: 574, anchor: 'middle'},
        oCount: {x: OX, y: 626, anchor: 'middle'},
        onMiss: {x: OX - 16, y: 404, anchor: 'end'},
        scale: {x: 1176, y: 60, anchor: 'end'},
      } as Record<string, Lbl>,
      countWords: true, // '1,200 requests' on one line
      CAPTION_TOP: 652,
    };
  }
  // phone: viewers row → bus y 180 → trunk down into the cloud → miss leg down → origin box
  const VX = [120, 280, 440];
  const MID = 280;
  const BUS = 195;
  const C = {cx: MID, cy: 410, rx: 150, ry: 95};
  const T_IN = C.cy - C.ry - 4;
  const B_OUT = C.cy + C.ry + 4;
  const O = {x: 190, y: 650, w: 180, h: 70};
  const SLOT = {x: 230, y: 385, w: 100, h: 42};
  return {
    ph: true,
    W: META.phone.width,
    H: META.phone.height,
    viewers: VX.map((x) => ({x, y: 110})),
    C, O, SLOT,
    CHIP: {w: 28, h: 20},
    TTL: {x: SLOT.x, y: 439, w: SLOT.w, h: 11},
    STUBS: VX.map((x) => [[x, 160], [x, BUS]] as Pt[]),
    BUS_PTS: [[VX[0], BUS], [VX[2], BUS]] as Pt[],
    TRUNK: [[MID, BUS], [MID, T_IN]] as Pt[],
    REQ: VX.map((x) => (x === MID ? [[MID, 160], [MID, T_IN]] : [[x, 160], [x, BUS], [MID, BUS], [MID, T_IN]]) as Pt[]),
    MISS: [[MID, B_OUT], [MID, O.y - 4]] as Pt[],
    lbl: {
      cdn: {x: C.cx, y: 370, anchor: 'middle'},
      ttl: {x: SLOT.x - 10, y: 452, anchor: 'end'},
      status: {x: 24, y: 420},
      req: {x: MID + 24, y: 262},
      fetch: {x: MID + 24, y: 590},
      more: {x: 24, y: 262},
      cdnHost: {x: 462, y: 397},
      cdnCount: {x: 462, y: 443},
      cdnWord: {x: 462, y: 481},
      origin: {x: MID, y: O.y + O.h / 2 + 10, anchor: 'middle'},
      oHost: {x: O.x + O.w + 16, y: 672},
      oCount: {x: O.x + O.w + 16, y: 718},
      oWord: {x: O.x + O.w + 16, y: 756},
      onMiss: {x: MID - 16, y: 590, anchor: 'end'},
      scale: {x: 24, y: 766},
    } as Record<string, Lbl>,
    countWords: false, // number, then 'requests' under it
    CAPTION_TOP: 790,
  };
};

const paths = (layout: Layout) => {
  const g = build(layout);
  const hs = g.ph ? 16 : 18;
  return {
    ...g,
    STICK_D: g.viewers.map((v, i) => stick(v.x, v.y, `viewer${i}`)),
    STUB_D: g.STUBS.map((p, i) => handPoly(p, `stub${i}`)),
    BUS_D: handPoly(g.BUS_PTS, 'bus'),
    TRUNK_D: handPoly(g.TRUNK, 'trunk'),
    TRUNK_HEAD: head(g.TRUNK, 'trunkh', hs + 2),
    REQ_D: g.REQ.map((p, i) => handPoly(p, `req${i}`)),
    MISS_D: handPoly(g.MISS, 'miss'),
    MISS_HEAD: head(g.MISS, 'missh', hs + 2),
    CLOUD_D: cloud(g.C.cx, g.C.cy, g.C.rx, g.C.ry, 'cdn'),
    SLOT_D: serverBox(g.SLOT.x, g.SLOT.y, g.SLOT.w, g.SLOT.h, 'slot'),
    TTL_D: serverBox(g.TTL.x, g.TTL.y, g.TTL.w, g.TTL.h, 'ttl'),
    O_D: serverBox(g.O.x, g.O.y, g.O.w, g.O.h, 'origin'),
  };
};
const LAYOUTS = {wide: paths('wide'), phone: paths('phone')};

// ---------- frame-driven state ----------
const EASE_COUNT = Easing.in(Easing.cubic);
/** Requests the cdn has received: single arrivals, then the thinned stream's counter ramps (illustrative counts). */
const cdnCount = (f: number) => {
  const [m1, m2] = MISSES;
  if (f >= EV.count1200[0]) return 1001 + Math.round(199 * ramp(f, EV.count1200[0], EV.count1200[1], EASE_COUNT));
  if (f >= m2.req[0] + m2.req[1]) return 1001;
  if (f >= EV.count1k[0]) return 4 + Math.round(996 * ramp(f, EV.count1k[0], EV.count1k[1], EASE_COUNT));
  const singles = HITS.filter((h) => h.at < EV.count1k[0] && f >= h.at + HIT.req[1]).length;
  return (f >= m1.req[0] + m1.req[1] ? 1 : 0) + singles;
};
const originCount = (f: number) => EV.origin.filter((at) => f >= at).length;
const TTL_LIFE = EV.ttlEmpty - EV.ttlFull; // frames the copy lives (compressed, not to scale)
const ttlLevel = (f: number) => {
  const since = f >= MISSES[1].store ? MISSES[1].store : f >= EV.ttlFull && f < EV.ttlEmpty ? EV.ttlFull : -1;
  return since < 0 ? 0 : Math.max(0, 1 - (f - since) / TTL_LIFE);
};
/** Is a copy in the slot (opacity)? */
const slotO = (f: number) => fade(f, EV.ttlFull, EV.ttlEmpty, 8, 10) + fade(f, MISSES[1].store, Infinity, 8);

/** The photo's bytes travelling along `d` (the board's small filled rectangle), shown only in flight. */
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

export const CdnMissHit: React.FC<CdnMissHitProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TY = typeFor(layout);
  const TS = TY.label;
  const L = G.lbl;
  const pr = G.ph ? 8 : 9;
  const tsz = G.ph ? 12 : 15;
  const [m1, m2] = MISSES;

  const lbl = (k: string, text: string, rest: Partial<React.ComponentProps<typeof Write>> = {}) => (
    <Write x={L[k].x} y={L[k].y} anchor={L[k].anchor ?? 'start'} text={text} size={TS} {...rest} />
  );

  // ---- the two misses: blue re-ink of the viewer's path, graphite fetch, green replies ----
  const renderMiss = (m: (typeof MISSES)[number], i: number) => {
    const reqP = ramp(frame, m.req[0], m.req[1], EASE_MOVE);
    const back = reversePath(G.REQ_D[m.v]);
    return (
      <g key={`miss${i}`}>
        <Packet d={G.REQ_D[m.v]} progress={reqP} color="blue" r={pr} />
        <Packet d={G.MISS_D} progress={ramp(frame, m.fetch[0], m.fetch[1], EASE_MOVE)} color="ink" r={pr} />
        <Chip d={reversePath(G.MISS_D)} progress={ramp(frame, m.fetchBack[0], m.fetchBack[1], EASE_MOVE)} w={G.CHIP.w} h={G.CHIP.h} />
        <Chip d={back} progress={ramp(frame, m.back[0], m.back[1], EASE_MOVE)} w={G.CHIP.w} h={G.CHIP.h} />
      </g>
    );
  };
  const renderHit = (h: (typeof HITS)[number], i: number) => {
    if (frame < h.at || frame > h.at + HIT.back[0] + HIT.back[1]) return null;
    return (
      <g key={`hit${i}`}>
        <Packet d={G.REQ_D[h.v]} progress={ramp(frame, h.at + HIT.req[0], HIT.req[1], EASE_MOVE)} color="blue" r={pr} />
        <Chip d={reversePath(G.REQ_D[h.v])} progress={ramp(frame, h.at + HIT.back[0], HIT.back[1], EASE_MOVE)} w={G.CHIP.w} h={G.CHIP.h} />
      </g>
    );
  };

  // ---- labels that come and go ----
  const getO = ghost(frame, BEAT.hits) + (1 - ghost(frame, m2.req[0], 12)); // GET labels: past at ③, back in use at ④
  const missO = fade(frame, EV.miss1[0], EV.missOut1, 1, 10) + fade(frame, EV.miss2[0], EV.missOut2, 1, 10);
  const missP = Math.max(ramp(frame, ...EV.miss1), frame >= EV.miss2[0] ? ramp(frame, ...EV.miss2) : 0);
  const hitO = fade(frame, EV.hit1[0], EV.hitOut, 8, 10) + fade(frame, EV.hit2[0], Infinity, 8);
  const hitP = frame >= EV.hit2[0] ? ramp(frame, ...EV.hit2) : ramp(frame, ...EV.hit1);

  // status slot: 'miss' (ink2) or '✓ hit' (green), replaced in place
  const S = L.status;
  const hitX = G.ph ? S.x + tsz * 2 + 14 : S.x - 18;
  const tickAt: Pt = G.ph ? [S.x + tsz, S.y - tsz * 0.9] : [S.x - 48, S.y - tsz * 0.9];

  const nCdn = cdnCount(frame);
  const nOrigin = originCount(frame);
  const level = ttlLevel(frame);
  const sO = slotO(frame);
  const {SLOT, TTL, CHIP} = G;

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): Fig 2·b with three viewers ===== */}
        {G.viewers.map((v, i) => (
          <g key={`v${i}`}>
            <Ink d={G.STICK_D[i]} />
            <Ink d={G.STUB_D[i]} />
          </g>
        ))}
        <Ink d={G.BUS_D} />
        <Ink d={G.TRUNK_D} />
        <Ink d={G.TRUNK_HEAD} />
        <Ink d={G.MISS_D} />
        <Ink d={G.MISS_HEAD} />

        {/* request re-inks run under the glyphs */}
        {MISSES.map((m, i) => (
          <Pen key={`rq${i}`} d={G.REQ_D[m.v]} progress={ramp(frame, m.req[0], m.req[1], EASE_MOVE)} color="blue" head={G.TRUNK_HEAD}
            opacity={1 - ramp(frame, m.back[0] + m.back[1], 14, EASE_FADE)} />
        ))}

        {/* cdn cloud with its slot and ttl bar */}
        <Ink d={G.CLOUD_D} fill={T.sheet} />
        {lbl('cdn', 'cdn', {variant: 'mono'})}
        <Ink d={G.SLOT_D} fill={T.sheet} width={STROKE.ink - 0.6} />
        {sO > 0 ? (
          <g opacity={Math.min(1, sO)}>
            <rect x={SLOT.x + 12} y={SLOT.y + (SLOT.h - CHIP.h) / 2} width={CHIP.w + 6} height={CHIP.h + 2} rx={3} fill={T.ink2} />
            <Ink d={tick(SLOT.x + SLOT.w - 30, SLOT.y + SLOT.h / 2 - 2, tsz, 'slotk')} color="green" width={STROKE.ink + 0.6} />
          </g>
        ) : null}
        <Ink d={G.TTL_D} fill={T.sheet} width={STROKE.thin} />
        {level > 0 ? <rect x={TTL.x + 3} y={TTL.y + 3} width={(TTL.w - 6) * level} height={TTL.h - 6} fill={T.ink2} /> : null}
        {lbl('ttl', 'ttl', {variant: 'mono', color: 'ink2'})}

        {/* origin */}
        <Ink d={G.O_D} fill={T.sheet} />
        {lbl('origin', 'origin', {variant: 'mono'})}

        {/* hosts (as on the board) and counters */}
        {lbl('cdnHost', 'a.mycdn.net', {variant: 'mono', color: 'ink2'})}
        {lbl('oHost', 'arpitbhayani.me', {variant: 'mono', color: 'ink2'})}
        {G.countWords ? (
          <>
            {lbl('cdnCount', `${comma(nCdn)} request${nCdn === 1 ? '' : 's'}`, {variant: 'mono', weight: 600})}
            {lbl('oCount', `${nOrigin} request${nOrigin === 1 ? '' : 's'}`, {variant: 'mono', weight: 600})}
          </>
        ) : (
          <>
            {lbl('cdnCount', comma(nCdn), {variant: 'mono', weight: 600})}
            {lbl('cdnWord', nCdn === 1 ? 'request' : 'requests', {variant: 'mono'})}
            {lbl('oCount', String(nOrigin), {variant: 'mono', weight: 600})}
            {lbl('oWord', nOrigin === 1 ? 'request' : 'requests', {variant: 'mono'})}
          </>
        )}

        {/* ① ④ the request and the fetch carry the same path */}
        {lbl('req', 'GET logo.png', {variant: 'mono', color: 'blue', progress: ramp(frame, ...EV.reqLabel), opacity: getO})}
        {lbl('fetch', 'GET logo.png', {variant: 'mono', progress: ramp(frame, ...EV.fetchLabel), opacity: getO})}

        {/* status: miss / ✓ hit */}
        <Write x={S.x} y={S.y} anchor={S.anchor ?? 'start'} text="miss" size={TS} color="ink2" progress={missP} opacity={missO} />
        <g opacity={hitO}>
          <Ink d={tick(tickAt[0], tickAt[1], tsz, 'hitk')} color="green" width={STROKE.ink + 0.6} />
        </g>
        <Write x={hitX} y={S.y} text="hit" size={TS} color="green" weight={600} progress={hitP} opacity={hitO} />

        {/* the crowd */}
        {lbl('more', 'and many more', {color: 'ink2', progress: ramp(frame, ...EV.more)})}

        {/* packets and chips on top of everything they ride */}
        {MISSES.map(renderMiss)}
        {HITS.map(renderHit)}

        {/* ⑤ summary */}
        {lbl('onMiss', 'on a miss', {color: 'ink2', progress: ramp(frame, ...EV.onMiss)})}
        {lbl('scale', '(not to scale)', {color: 'ink2'})}
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default CdnMissHit;
