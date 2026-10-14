// Clip l07-mod-vs-ring — "Add one node".
// Storyboard: lectures/lec07/animations/l07-mod-vs-ring/storyboard.{yaml,md}. Ledger: L-0272, L-0273, L-0274, L-0291, L-0292, L-0294.
// Frame 0 = Fig 6·a's first table drawn as two nodes holding six keys (h % 2); the ring (Fig 6·b/6·d) is drawn in ③.
// The last frame is the annotated poster: both panels, both tallies, both averages.
// Two layouts share one timeline: 'wide' (1200×800, panels side by side) and 'phone' (720×1070, mod above the ring).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {chevron, endDir, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, TYPE_PHONE, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, KEY_STEP, META, NODE_STEP, RECHECK_DUR, RECHECK_STEP} from './timeline';

export type ModVsRingProps = {theme: ThemeName; layout?: Layout};

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

// ---------- the two examples (the board's numbers) ----------
type Key = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';
const KEYS: Key[] = ['K1', 'K2', 'K3', 'K4', 'K5', 'K6'];
// h % 2 (D-17 table 1): K1, K2, K6 on c0; K3, K4, K5 on c1. [column, slot]
const MOD_FROM: Record<Key, [number, number]> = {K1: [0, 0], K2: [0, 1], K6: [0, 2], K3: [1, 0], K4: [1, 1], K5: [1, 2]};
// h % 3 (D-17 table 2): K6 and K2 to c2, K5 to c0 (into the slot K2 left)
const MOD_TO: Partial<Record<Key, [number, number]>> = {K6: [2, 0], K2: [2, 1], K5: [0, 1]};
// ring 0..15 (D-18/D-19): nodes at their board positions; keys at page-made positions (K1 at 0 as on the board)
const NODES = [
  {name: 'c1', pos: 3},
  {name: 'c3', pos: 5},
  {name: 'c4', pos: 10},
  {name: 'c2', pos: 12},
] as const;
const C5 = {name: 'c5', pos: 1};
// Fig 6·d's drawing: nodes are small rectangles straddling the circle (name outside, position number inside); keys are
// small hatched squares on the circle (name inside). Only the keys that change owner get arrows (critic C-03): K1's
// old arrow to c1 runs inside the ring (the board's arrow, drawn in ③); in ④ K1 and K6 get short red arcs outside the
// ring to c5, K1 on the inner track, K6 on the outer one, over the red (12, 1] band on the ring.
const RING_KEYS: {key: Key; pos: number}[] = [
  {key: 'K1', pos: 0},
  {key: 'K2', pos: 2},
  {key: 'K3', pos: 4},
  {key: 'K4', pos: 7},
  {key: 'K5', pos: 11},
  {key: 'K6', pos: 14},
];
// the two moves' arcs: [from, to] in ring positions (unwrapped past 16) and their track (0 inner, 1 outer)
const NEW_ARC: Partial<Record<Key, {from: number; to: number; track: 0 | 1}>> = {
  K1: {from: 0.12, to: 0.82, track: 0},
  K6: {from: 14.06, to: 16.88, track: 1},
};

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const S = typeFor(layout).label;
  const L = ph
    ? {hx: 30, hy: 40, cols: [120, 360, 600], boxTop: 58, boxW: 150, boxH: 50, slotTop: [120, 172, 224], chipW: 110, chipH: 46, lane: 292, tallyX: 30, tallyY: 340, avgY: 376}
    : {hx: 40, hy: 60, cols: [130, 310, 490], boxTop: 96, boxW: 130, boxH: 60, slotTop: [176, 240, 304], chipW: 110, chipH: 52, lane: 392, tallyX: 40, tallyY: 566, avgY: 614};
  // keyIn: radius offset of the key names, a track well inside the nodes' position numbers (those sit just inside
  // their own rectangle, see ringNode), so no name or number touches a box or a neighbour (critic C-22);
  // gap: node rectangle → its name; old: K1's old arrow (inside); tracks: the two red arcs (outside);
  // pkt: the c1 → c5 copy; slice: label spot
  const R = ph
    ? {cx: 360, cy: 640, r: 160, keyIn: 82, nodeW: 44, nodeH: 18, gap: 12, sq: 20, old: 15, tracks: [20, 40], pkt: 22, band: 18, slice: {pos: 14.5, dr: 66}, tallyX: 30, tallyY: 870, avgY: 908, head: 12}
    : {cx: 900, cy: 290, r: 180, keyIn: 92, nodeW: 50, nodeH: 20, gap: 12, sq: 22, old: 16, tracks: [20, 42], pkt: 24, band: 20, slice: {pos: 15, dr: 68}, tallyX: 640, tallyY: 566, avgY: 614, head: 14};

  // --- left: hash % N ---
  const chipC = ([c, s]: [number, number]): Pt => [L.cols[c], L.slotTop[s] + L.chipH / 2];
  const chipBox = (seed: string) => serverBox(-L.chipW / 2, -L.chipH / 2, L.chipW, L.chipH, seed);
  const nodeBox = (c: number, seed: string) => serverBox(L.cols[c] - L.boxW / 2, L.boxTop, L.boxW, L.boxH, seed);
  const movePts = (k: Key): Pt[] => {
    const a = chipC(MOD_FROM[k]);
    const b = chipC(MOD_TO[k]!);
    return [a, [a[0], L.lane], [b[0], L.lane], b];
  };

  // --- right: the ring ---
  const P = (p: number, rad: number): Pt => {
    const a = (p / 16) * Math.PI * 2;
    return [R.cx + rad * Math.sin(a), R.cy - rad * Math.cos(a)];
  };
  const arcPts = (from: number, to: number, rad: number, step = 0.25): Pt[] => {
    const n = Math.max(2, Math.ceil(Math.abs(to - from) / step));
    return Array.from({length: n + 1}, (_, i) => P(from + ((to - from) * i) / n, rad));
  };
  // a clockwise arc at radius `rad`; `key` = start with a short radial lead from that key's square to the track
  const arcArrow = (from: number, to: number, rad: number, seed: string, key?: number) => {
    const lead: Pt[] = key === undefined ? [] : [P(key, rad > R.r ? R.r + R.sq / 2 + 6 : R.r - R.sq / 2 - 6)];
    const pts = [...lead, ...arcPts(from, to, rad, 0.12)];
    const [ux, uy] = endDir(pts);
    return {d: handPoly(pts, seed), head: chevron(pts[pts.length - 1], ux, uy, R.head, seed + 'h')};
  };
  // a node: rectangle straddling the circle; its name outside (beside it on the sides, above/below at top/bottom)
  const ringNode = (pos: number, seed: string) => {
    const [x, y] = P(pos, R.r);
    const a = (pos / 16) * Math.PI * 2;
    const s = Math.sin(a);
    const anchor = s > 0.35 ? 'start' : s < -0.35 ? 'end' : 'middle';
    const lbl: Pt = anchor === 'start' ? [x + R.nodeW / 2 + R.gap, y + S * 0.35]
      : anchor === 'end' ? [x - R.nodeW / 2 - R.gap, y + S * 0.35]
      : Math.cos(a) > 0 ? [x, y - R.nodeH / 2 - R.gap] : [x, y + R.nodeH / 2 + R.gap + S * 0.7];
    // its position number inside the ring, pushed in past the rectangle's own extent along the radius (wide on the
    // sides, short at top/bottom) plus the number's half size and an 8-px gap
    const tw = S * 0.6 * String(pos).length;
    const inset = (R.nodeW / 2 + 8 + tw / 2) * Math.abs(s) + (R.nodeH / 2 + 8 + S * 0.4) * Math.abs(Math.cos(a));
    const num = P(pos, R.r - inset);
    return {x, y, d: serverBox(x - R.nodeW / 2, y - R.nodeH / 2, R.nodeW, R.nodeH, seed), lbl, num, anchor: anchor as 'start' | 'end' | 'middle'};
  };
  // a key: a small square on the circle with two hatch strokes (Fig 6·d's key glyph)
  const ringKey = (pos: number, seed: string) => {
    const [x, y] = P(pos, R.r);
    const s = R.sq;
    const x0 = x - s / 2;
    const y0 = y - s / 2;
    return {
      x, y,
      box: serverBox(x0, y0, s, s, seed),
      hatch: handPoly([[x0 + 3, y0 + s * 0.55], [x0 + s * 0.55, y0 + 3]], seed + 'h1') + ' ' + handPoly([[x0 + s * 0.42, y0 + s - 3], [x0 + s - 3, y0 + s * 0.42]], seed + 'h2'),
    };
  };

  return {
    ph,
    W,
    H,
    S,
    L,
    R,
    P,
    chipC,
    CHIP: Object.fromEntries(KEYS.map((k) => [k, chipBox('chip' + k)])) as Record<Key, string>,
    NODE_D: [0, 1, 2].map((c) => nodeBox(c, 'node' + c)),
    MOVE: Object.fromEntries((Object.keys(MOD_TO) as Key[]).map((k) => {
      const pts = movePts(k);
      return [k, {pts, d: handPoly(pts, 'trail' + k)}];
    })) as Record<Key, {pts: Pt[]; d: string}>,
    RING_D: handPoly(arcPts(0, 16, R.r, 1 / 3), 'ring'),
    RNODES: NODES.map((n) => ({...n, ...ringNode(n.pos, 'r' + n.name)})),
    RC5: {...C5, ...ringNode(C5.pos, 'rc5')},
    RKEYS: Object.fromEntries(RING_KEYS.map((k) => [k.key, ringKey(k.pos, 'rk' + k.key)])) as Record<Key, ReturnType<typeof ringKey>>,
    // K1's owner before c5: c1, the board's arrow, inside the ring (as in Fig 6·b/6·d)
    OLD_K1: arcArrow(0.4, 2.3, R.r - R.old, 'ownK1'),
    NEW: Object.fromEntries((Object.keys(NEW_ARC) as Key[]).map((k) => {
      const a = NEW_ARC[k]!;
      return [k, arcArrow(a.from, a.to, R.r + R.tracks[a.track], 'new' + k, RING_KEYS.find((r) => r.key === k)!.pos)];
    })) as Partial<Record<Key, {d: string; head: string}>>,
    // c5's slice (12, 1]: a red band laid on the ring itself
    BAND_D: handPoly(arcPts(12, 17, R.r, 0.2), 'slice'),
    PKT_D: handPoly(arcPts(2.55, 1.45, R.r + R.pkt), 'copy'),
    DIVIDER_D: ph ? null : handPoly([[600, 30], [600, 612]], 'divider'),
    CAPTION_TOP: ph ? 935 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

/** Point at fraction t along a polyline (constant speed). */
const along = (pts: Pt[], t: number): Pt => {
  const lens = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
  let d = Math.max(0, Math.min(1, t)) * lens.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lens.length; i++) {
    if (d <= lens[i] || i === lens.length - 1) {
      const u = lens[i] ? Math.min(1, d / lens[i]) : 0;
      return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * u, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * u];
    }
    d -= lens[i];
  }
  return pts[pts.length - 1];
};

const end = (s: readonly [number, number]) => s[0] + s[1];

export const ModVsRing: React.FC<ModVsRingProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const {L, R, S} = G;
  const MONO_W = S * 0.6; // Recursive MONO advance

  // the left panel is past context while the ring plays, and comes back for the summary
  const leftO = 1 - (1 - ghost(frame, BEAT.ring)) * (1 - ramp(frame, ...EV.restore, EASE_FADE));

  // left tally: one digit rewritten per landing
  const lands = EV.moves.map((m) => end(m.at));
  const ringLands = EV.ringMoves.map((m) => end(m.arrow));

  return (
    <Sheet theme={theme}>
      <Stage title="Add one node: hash mod N against the ring" desc={META.alt} width={G.W} height={G.H}>
        {G.DIVIDER_D ? <Ink d={G.DIVIDER_D} color="ink3" width={STROKE.thin} dash="10 12" /> : null}

        {/* ===================== left: hash % N ===================== */}
        <g opacity={leftO}>
          <Write x={L.hx} y={L.hy} text="node = h % " variant="mono" size={S} />
          <Write x={L.hx + 11 * MONO_W} y={L.hy} text="2" variant="mono" size={S} opacity={1 - ramp(frame, ...EV.digitOut, EASE_FADE)} />
          <Write x={L.hx + 11 * MONO_W} y={L.hy} text="3" variant="mono" size={S} progress={ramp(frame, ...EV.digitIn)} />

          {/* nodes: c0, c1 from frame 0; c2 penned in ① */}
          {[0, 1, 2].map((c) => {
            const p = c < 2 ? 1 : ramp(frame, ...EV.c2Box);
            const lp = c < 2 ? 1 : ramp(frame, EV.c2Box[0] + 8, 14);
            return (
              <g key={c}>
                <path d={G.NODE_D[c]} fill={T.sheet} opacity={p > 0 ? 1 : 0} />
                <Pen d={G.NODE_D[c]} progress={p} />
                <Write x={L.cols[c]} y={L.boxTop + L.boxH / 2 + S * 0.35} text={`c${c}`} variant="mono" size={S} anchor="middle" progress={lp} />
              </g>
            );
          })}

          {/* slots the moved keys left: dashed red, until a key takes the place */}
          {(Object.keys(MOD_TO) as Key[]).map((k, i) => {
            const [x, y] = G.chipC(MOD_FROM[k]);
            const at = EV.moves.find((m) => m.key === k)!.at;
            return (
              <g key={k} transform={`translate(${x} ${y})`} opacity={fade(frame, at[0] + 4, Infinity, 8)}>
                <Ink d={G.CHIP[k]} color="red" width={STROKE.thin + 0.6} dash="9 8" />
              </g>
            );
          })}

          {/* trails while a key travels (they go once it has landed) */}
          {EV.moves.map((m) => {
            const mv = G.MOVE[m.key as Key];
            return (
              <Pen key={m.key} d={mv.d} progress={ramp(frame, ...m.at, EASE_MOVE)} color="red" width={STROKE.thin + 0.6} dash="9 8" opacity={1 - ramp(frame, end(m.at) + 6, 14, EASE_FADE)} />
            );
          })}

          {/* the six keys */}
          {KEYS.map((k, i) => {
            const mv = EV.moves.find((m) => m.key === k);
            const t = mv ? ramp(frame, ...mv.at, EASE_MOVE) : 0;
            const pos = mv ? along(G.MOVE[k].pts, t) : G.chipC(MOD_FROM[k]);
            const rc = EV.recheck0 + i * RECHECK_STEP;
            const red = mv ? ramp(frame, mv.at[0], 8, EASE_FADE) : 0;
            return (
              <g key={k} transform={`translate(${pos[0]} ${pos[1]})`}>
                <path d={G.CHIP[k]} fill={T.sheet} />
                <Ink d={G.CHIP[k]} opacity={1 - red} />
                <Ink d={G.CHIP[k]} color="red" opacity={red} width={STROKE.ink + 0.4} />
                <Pen d={G.CHIP[k]} progress={ramp(frame, rc, RECHECK_DUR)} color="blue" width={STROKE.ink + 0.6} opacity={1 - ramp(frame, rc + 22, 12, EASE_FADE)} />
                <Write x={0} y={S * 0.35} text={k} variant="mono" size={S} anchor="middle" />
                {mv ? (
                  <Write x={L.chipW / 2 + 8} y={S * 0.35} text="*" variant="mono" size={S} color="red" progress={ramp(frame, end(mv.at) + 2, 8)} weight={600} />
                ) : null}
              </g>
            );
          })}
        </g>

        {/* left tally (full ink throughout: it is half of the summary) */}
        {lands.map((at, i) => (
          <Write key={i} x={L.tallyX} y={L.tallyY} text={String(i + 1)} variant="mono" size={S} color="red" weight={600}
            progress={ramp(frame, at + 4, 8)} opacity={1 - (lands[i + 1] ? ramp(frame, lands[i + 1], 6, EASE_FADE) : 0)} />
        ))}
        <Write x={L.tallyX + 2 * MONO_W} y={L.tallyY} text="of 6 moved" variant="mono" size={S} color="red" weight={600} progress={ramp(frame, lands[0] + 8, 16)} />
        <Write x={L.tallyX + 13 * MONO_W} y={L.tallyY} text="= 50%" variant="mono" size={S} color="red" weight={600} progress={ramp(frame, ...EV.half)} />
        <Write x={L.tallyX} y={L.avgY} text="on average ~N/(N+1)" size={S} color="ink2" progress={ramp(frame, ...EV.avgL)} />

        {/* ===================== right: the ring (Fig 6·d's glyphs) ===================== */}
        {/* c5's slice (12, 1]: a red band laid on the ring, under its line */}
        <Pen d={G.BAND_D} progress={ramp(frame, ...EV.band)} color="red" width={R.band} opacity={0.26} />
        <Pen d={G.RING_D} progress={ramp(frame, ...EV.ringPen)} />
        {(() => {
          const [sx, sy] = G.P(R.slice.pos, R.r + R.slice.dr);
          return <Write x={sx} y={sy} text="(12, 1]" variant="mono" size={S} color="red" anchor="end" progress={ramp(frame, ...EV.sliceLbl)} weight={560} />;
        })()}

        {/* ownership: K1's arrow to c1 (the board's), inside; it goes when K1 moves, so no grey arc is left beside the
            red one (critic C-22) */}
        <Pen d={G.OLD_K1.d} head={G.OLD_K1.head} progress={ramp(frame, ...EV.arrowK1)} opacity={1 - ramp(frame, EV.ringMoves[1].arrow[0], 12, EASE_FADE)} />
        {/* the two moves: short red arcs outside the ring to c5 */}
        {EV.ringMoves.map((m) => {
          const a = G.NEW[m.key as Key]!;
          return <Pen key={m.key} d={a.d} head={a.head} progress={ramp(frame, ...m.arrow)} color="red" width={STROKE.ink + 0.4} />;
        })}

        {/* data for the slice comes from c1, its old owner */}
        {EV.ringMoves.map((m) => (
          <Packet key={m.key} d={G.PKT_D} progress={ramp(frame, ...m.pkt, EASE_MOVE)} color="red" r={G.ph ? 9 : 10} />
        ))}

        {/* keys: hatched squares on the ring, names inside */}
        {RING_KEYS.map((k, i) => {
          const at = EV.key0 + i * KEY_STEP;
          const rm = EV.ringMoves.find((m) => m.key === k.key);
          const red = rm ? ramp(frame, rm.arrow[0], 8, EASE_FADE) : 0;
          const g = G.RKEYS[k.key];
          const [lx, ly] = G.P(k.pos, R.r - R.keyIn);
          const p = ramp(frame, at, 10);
          return (
            <g key={k.key}>
              <path d={g.box} fill={T.sheet} opacity={p > 0 ? 1 : 0} />
              <Pen d={g.box} progress={p} width={STROKE.thin + 0.6} opacity={1 - red} />
              <Pen d={g.hatch} progress={p} width={STROKE.thin} opacity={1 - red} />
              {rm ? (
                <g opacity={red}>
                  <Ink d={g.box} color="red" width={STROKE.ink} />
                  <Ink d={g.hatch} color="red" width={STROKE.thin + 0.4} />
                </g>
              ) : null}
              <Write x={lx} y={ly + S * 0.35} text={k.key} variant="mono" size={S} anchor="middle" progress={ramp(frame, at, 12)} opacity={1 - red} />
              {rm ? <Write x={lx} y={ly + S * 0.35} text={k.key} variant="mono" size={S} anchor="middle" color="red" weight={600} progress={ramp(frame, rm.arrow[0], 12)} /> : null}
            </g>
          );
        })}

        {/* nodes: rectangles straddling the ring, names outside, positions inside */}
        {[...G.RNODES.map((n, i) => ({n, at: [EV.node0 + i * NODE_STEP, 12] as const, num: [EV.node0 + i * NODE_STEP + 4, 10] as const})),
          {n: G.RC5, at: EV.c5Box, num: EV.c5Num}].map(({n, at, num}) => {
          const p = ramp(frame, ...at);
          const [nx, ny] = n.num;
          return (
            <g key={n.name}>
              <path d={n.d} fill={T.sheet} opacity={p > 0 ? 1 : 0} />
              <Pen d={n.d} progress={p} />
              <Write x={n.lbl[0]} y={n.lbl[1]} text={n.name} variant="mono" size={S} anchor={n.anchor} progress={ramp(frame, at[0] + 6, 12)} />
              <Write x={nx} y={ny + S * 0.35} text={String(n.pos)} variant="num" size={S} anchor="middle" color="ink2" progress={ramp(frame, ...num)} />
            </g>
          );
        })}

        {/* right tally */}
        {ringLands.map((at, i) => (
          <Write key={i} x={R.tallyX} y={R.tallyY} text={String(i + 1)} variant="mono" size={S} color="red" weight={600}
            progress={ramp(frame, at, 8)} opacity={1 - (ringLands[i + 1] ? ramp(frame, ringLands[i + 1] - 4, 6, EASE_FADE) : 0)} />
        ))}
        <Write x={R.tallyX + 2 * MONO_W} y={R.tallyY} text="of 6 moved" variant="mono" size={S} color="red" weight={600} progress={ramp(frame, ringLands[0] + 4, 16)} />
        <Write x={R.tallyX} y={R.avgY} text="on average ~1/(N+1)" size={S} color="ink2" progress={ramp(frame, ...EV.avgR)} />
      </Stage>
      <Captions top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default ModVsRing;
