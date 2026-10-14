// Clip l09-hashtag-repartition — "Re-keyed by hashtag".
// Storyboard: lectures/lec09/animations/l09-hashtag-repartition/storyboard.{yaml,md}.
// Ledger: L-0242, L-0243, L-0244, L-0247, L-0249, L-0250, L-0251, L-0267, L-0269, L-0270 (context L-0240, L-0254, L-0297).
// Frame 0 = Fig 8·b (post topic keyed by user_id, three counters, hashtag db); the last frame is the poster (Fig 8·c's shape).
// Two layouts share one timeline: 'wide' (1200×800): topics stacked on the left, extractors and counters to their right,
// db at the far right; 'phone' (720×1070): a column where partitions become columns in both topics.
import React, {useId} from 'react';
import {useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {chevron, cylinder, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write, useTheme} from '../../lib/primitives';
import {FONT, STROKE, THEMES, typeFor, type Layout, type Theme, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, CHIPS, EMIT, EV, LANE_OF, META, MOVE_DUR, POSTS, type Chip} from './timeline';

export type HashtagRepartitionProps = {theme: ThemeName; layout?: Layout};

const K3 = [0, 1, 2];
const DASH = '11 9';

// Text width estimate (Recursive: mono is exactly 0.6 em; casual hand: '#' ~0.72, space ~0.3, letters ~0.56 em,
// checked against the first render).
const est = (text: string, size: number, variant: 'hand' | 'mono') =>
  variant === 'mono' ? text.length * size * 0.6 : size * [...text].reduce((s, ch) => s + (ch === '#' ? 0.72 : ch === ' ' ? 0.3 : 0.56), 0);

/** Straight polyline (packets and moving chips ride these: no wobble, exact end points). */
const straight = (pts: Pt[]) => {
  const q = pts.filter((p, i) => i === 0 || p[0] !== pts[i - 1][0] || p[1] !== pts[i - 1][1]);
  return 'M ' + q.map((p) => `${p[0]} ${p[1]}`).join(' L ');
};

/** Horizontal pipe glyph (top + bottom rule, full left cap, right half cap) as separate strokes so a pen can draw it. */
const pipe = (x0: number, x1: number, y0: number, y1: number, capRx: number, seed: string) => {
  const ry = (y1 - y0) / 2;
  const cy = y0 + ry;
  return {
    strokes: [
      handPoly([[x0, y0], [x1, y0]], seed + 't'),
      handPoly([[x0, y1], [x1, y1]], seed + 'b'),
      `M ${x0} ${y0} A ${capRx} ${ry} 0 1 0 ${x0} ${y1} A ${capRx} ${ry} 0 1 0 ${x0} ${y0}`,
      `M ${x1} ${y0} A ${capRx} ${ry} 0 0 1 ${x1} ${y1}`,
    ],
    fill: `M ${x0} ${y0} L ${x1} ${y0} A ${capRx} ${ry} 0 0 1 ${x1} ${y1} L ${x0} ${y1} Z`,
    cy,
  };
};

type Lbl = {x: number; y: number; anchor?: 'start' | 'middle' | 'end'};
type Box = {x: number; y: number; w: number; h: number; d: string; cx: number; cy: number};
const box = (x: number, y: number, w: number, h: number, seed: string): Box => ({x, y, w, h, d: serverBox(x, y, w, h, seed), cx: x + w / 2, cy: y + h / 2});

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const S = TY.label; // 40 wide, 30 phone
  const CH = ph ? 36 : 44; // chip height
  const PAD = ph ? 7 : 8;
  const chipW = (tag: string) => Math.round(est(tag, S, 'hand') + 2 * PAD);
  const CHIP_D: Record<string, string> = {};
  for (const tag of Object.keys(LANE_OF)) {
    const w = chipW(tag);
    CHIP_D[tag] = serverBox(-w / 2, -CH / 2, w, CH, `chip${tag}`);
  }

  if (!ph) {
    // ===== wide =====
    const LANE1 = [90, 146, 202]; // post_publish lanes (= extractor rows = staging rows)
    const LANE2 = [428, 484, 540]; // POST_HASHTAG lanes (= counter rows)
    const P1 = pipe(36, 604, 62, 230, 12, 'p1');
    const P2 = pipe(36, 604, 400, 568, 12, 'p2');
    const DIV1 = [118, 174].map((y, i) => handPoly([[50, y], [600, y]], `d1${i}`));
    const DIV2 = [456, 512].map((y, i) => handPoly([[50, y], [600, y]], `d2${i}`));
    const cards = POSTS.map((p, k) => {
      const tags = p.tags.join(' ');
      const w = 12 + est(p.id, S, 'mono') + 10 + est(tags, S, 'hand') + 10;
      const b = box(46, LANE1[k] - 21, Math.round(w), 42, `card${k}`);
      return {b, lines: [{x: 58, y: LANE1[k] + 14, text: p.id, variant: 'mono' as const, anchor: 'start' as const}, {x: 58 + est(p.id, S, 'mono') + 10, y: LANE1[k] + 14, text: tags, variant: 'hand' as const, anchor: 'start' as const}]};
    });
    const ext = K3.map((k) => box(650, LANE1[k] - 22, 230, 44, `ext${k}`));
    const ctr = K3.map((k) => box(650, LANE2[k] - 22, 230, 44, `ctr${k}`));
    const db = cylinder(1120, 398, 48, 12, 156, 'db');
    const writes = K3.map((k) => {
      const pts: Pt[] = [[880, LANE2[k]], [1068, LANE2[k]]];
      return {d: handPoly(pts, `w${k}`), head: chevron(pts[1], 1, 0, 16, `wh${k}`), lbl: {x: 974, y: LANE2[k] - 12, anchor: 'middle'} as Lbl};
    });
    // naive feed: one bus from the post topic down to the three counters (they pull: head at the topic)
    const feedLines = [handPoly([[610, 240], [610, LANE2[2]]], 'bus'), ...K3.map((k) => handPoly([[610, LANE2[k]], [648, LANE2[k]]], `br${k}`))];
    const feedHeads = [chevron([610, 240], 0, -1, 16, 'bush')];
    const feedRide = K3.map((k) => straight([[610, 238], [610, LANE2[k]], [648, LANE2[k]]]));
    const extPull = K3.map((k) => ({d: handPoly([[650, LANE1[k]], [621, LANE1[k]]], `ep${k}`), head: chevron([621, LANE1[k]], -1, 0, 14, `eph${k}`)}));
    const extRead = K3.map((k) => straight([[617, LANE1[k]], [649, LANE1[k]]]));
    const p2Pull = K3.map((k) => ({d: handPoly([[650, LANE2[k]], [621, LANE2[k]]], `pp${k}`), head: chevron([621, LANE2[k]], -1, 0, 14, `pph${k}`)}));
    const STAGE_X = 910;
    const CORR = 316;
    const stage = (c: Chip): Pt => [STAGE_X + chipW(c.tag) / 2, LANE1[c.rowWide]];
    const slot = (c: Chip): Pt => [598 - chipW(c.tag) / 2 - c.slot * (chipW(c.tag) + 4), LANE2[c.lane]];
    const route = (c: Chip) => {
      const [sx, sy] = stage(c);
      const dx = 52 + chipW(c.tag) / 2; // descend through hash(tag) at the topic's left end
      const [tx, ty] = slot(c);
      return straight([[sx, sy], [sx, CORR], [dx, CORR], [dx, ty], [tx, ty]]);
    };
    const emitLine = (c: Chip) => {
      const ye = LANE1[c.post];
      const yr = LANE1[c.rowWide];
      return handPoly(ye === yr ? [[880, ye], [STAGE_X - 3, yr]] : [[880, ye], [895, ye], [895, yr], [STAGE_X - 3, yr]], `em${c.post}${c.rowWide}`);
    };
    const plabel = (c: Chip): Lbl => ({x: STAGE_X + chipW(c.tag) + 10, y: LANE1[c.rowWide] + 14});
    return {
      ph, W, H, TY, S, CH, chipW, CHIP_D, P1, P2, DIV1, DIV2, cards, ext, ctr, db, writes, feedLines, feedHeads, feedRide, extPull, extRead, p2Pull,
      stage, slot, route, emitLine, plabel,
      lbl: {
        h1: {x: 40, y: 46} as Lbl, k1: {x: 350, y: 46} as Lbl, ctx: {x: 1164, y: 46, anchor: 'end'} as Lbl,
        h2: {x: 40, y: 612} as Lbl, k2: {x: 350, y: 612} as Lbl, gate: {x: 252, y: 386} as Lbl,
        db: {x: 1170, y: 612, anchor: 'end'} as Lbl, note: {x: 290, y: 304} as Lbl,
        ctrText: (k: number) => ({x: ctr[k].cx, y: ctr[k].cy + S * 0.35, anchor: 'middle'}) as Lbl,
        extText: (k: number) => ({x: ext[k].cx, y: ext[k].cy + S * 0.35, anchor: 'middle'}) as Lbl,
      },
      DY: 0,
      CAPTION_TOP: 652,
    };
  }

  // ===== phone =====
  const COL = [133, 360, 587];
  const P1 = pipe(20, 700, 100, 262, 10, 'p1');
  const P2 = pipe(20, 700, 544, 690, 10, 'p2');
  const DIV1 = [246.7, 473.3].map((x, i) => handPoly([[x, 108], [x, 254]], `d1${i}`));
  const DIV2 = [246.7, 473.3].map((x, i) => handPoly([[x, 552], [x, 682]], `d2${i}`));
  const cards = POSTS.map((p, k) => {
    const n = 1 + p.tags.length;
    const b = box(COL[k] - 75, 110, 150, 10 + 32 * n, `card${k}`);
    return {
      b,
      lines: [
        {x: COL[k], y: 140, text: p.id, variant: 'mono' as const, anchor: 'middle' as const},
        ...p.tags.map((t, i) => ({x: COL[k], y: 172 + 32 * i, text: t, variant: 'hand' as const, anchor: 'middle' as const})),
      ],
    };
  });
  const ext = K3.map((k) => box(COL[k] - 95, 290, 190, 44, `ext${k}`));
  const ctr = K3.map((k) => box(COL[k] - 95, 776, 190, 44, `ctr${k}`));
  const db = cylinder(360, 874, 90, 16, 64, 'db');
  const wpts: Pt[][] = [
    [[133, 820], [133, 914], [266, 914]],
    [[360, 820], [360, 855]],
    [[587, 820], [587, 914], [454, 914]],
  ];
  const writes = K3.map((k) => {
    const pts = wpts[k];
    const [ux, uy] = k === 1 ? [0, 1] : k === 0 ? [1, 0] : [-1, 0];
    const lbl: Lbl = k === 1 ? {x: 374, y: 846} : {x: k === 0 ? 200 : 520, y: 902, anchor: 'middle'};
    return {d: handPoly(pts, `w${k}`), head: chevron(pts[pts.length - 1], ux, uy, 13, `wh${k}`), lbl};
  });
  // feed / pull x: just inside each counter's edge, clear of the extractor's own pull; the first sits on the left so the
  // topic's name fits between the first two lines
  const FX = [COL[0] - 89, COL[1] + 89, COL[2] + 89];
  const feedLines = K3.map((k) => handPoly([[FX[k], 268], [FX[k], 776]], `feed${k}`));
  const feedHeads = K3.map((k) => chevron([FX[k], 268], 0, -1, 13, `fh${k}`));
  const feedRide = K3.map((k) => straight([[FX[k], 266], [FX[k], 774]]));
  const extPull = K3.map((k) => ({d: handPoly([[COL[k], 290], [COL[k], 269]], `ep${k}`), head: chevron([COL[k], 269], 0, -1, 12, `eph${k}`)}));
  const extRead = K3.map((k) => straight([[COL[k], 264], [COL[k], 290]]));
  const p2Pull = K3.map((k) => ({d: handPoly([[FX[k], 776], [FX[k], 697]], `pp${k}`), head: chevron([FX[k], 697], 0, -1, 12, `pph${k}`)}));
  const ROWS = [370, 414, 458];
  const CORR = 506;
  const stage = (c: Chip): Pt => [COL[c.post] - 95 + chipW(c.tag) / 2, ROWS[c.rowPhone]];
  const slot = (c: Chip): Pt => [COL[c.lane], 666 - 44 * c.slot];
  const route = (c: Chip) => {
    const [sx, sy] = stage(c);
    const [tx, ty] = slot(c);
    return straight([[sx, sy], [sx, CORR], [tx, CORR], [tx, ty]]);
  };
  const emitLine = (c: Chip) => {
    const x = COL[c.post] - 95;
    const y = ROWS[c.rowPhone];
    return handPoly([[x, 312], [x - 11, 312], [x - 11, y], [x - 2, y]], `em${c.post}${c.rowPhone}`);
  };
  const plabel = (c: Chip): Lbl => ({x: COL[c.post] - 95 + chipW(c.tag) + 8, y: ROWS[c.rowPhone] + 11});
  return {
    ph, W, H, TY, S, CH, chipW, CHIP_D, P1, P2, DIV1, DIV2, cards, ext, ctr, db, writes, feedLines, feedHeads, feedRide, extPull, extRead, p2Pull,
    stage, slot, route, emitLine, plabel,
    lbl: {
      h1: {x: 20, y: 64} as Lbl, k1: {x: 250, y: 64} as Lbl, ctx: {x: 20, y: 104} as Lbl,
      // two rows between the first two pull lines (x 44 and 449)
      h2: {x: 58, y: 726} as Lbl, k2: {x: 58, y: 760} as Lbl, gate: {x: 272, y: 760} as Lbl,
      db: {x: 462, y: 964} as Lbl, note: {x: 360, y: 516, anchor: 'middle'} as Lbl,
      ctrText: (k: number) => ({x: ctr[k].cx, y: ctr[k].cy + S * 0.35, anchor: 'middle'}) as Lbl,
      extText: (k: number) => ({x: ext[k].cx, y: ext[k].cy + S * 0.35, anchor: 'middle'}) as Lbl,
    },
    // everything under the header (both topics, extractors, counters, db) sits DY lower, so the header clears the
    // post topic's top outline (critic C-07); the header sits ~24 px below the stage top so its letters aren't shaved
    DY: 48,
    CAPTION_TOP: 1030,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};
type Geo = (typeof LAYOUTS)['wide'];

// how many messages each POST_HASHTAG lane ends up with (= the n of count += n)
const LANE_N = K3.map((k) => CHIPS.filter((c) => c.lane === k).length);

const pointOn = (d: string, p: number): Pt => {
  const len = getLength(d);
  const pt = getPointAtLength(d, len * Math.max(0, Math.min(1, p)));
  return pt ? [pt.x, pt.y] : [0, 0];
};

/** One (hashtag, post) message: a chamfered chip with the tag, in ink and/or blue (blue = on the data path right now). */
const ChipGlyph: React.FC<{G: Geo; tag: string; x: number; y: number; blue: number; outline?: number; text?: number}> = ({G, tag, x, y, blue, outline = 1, text = 1}) => {
  const t = useTheme();
  const id = useId().replace(/:/g, '');
  if (outline <= 0) return null;
  const w = G.chipW(tag);
  const word = (c: string, o: number) =>
    o <= 0 || text <= 0 ? null : (
      <text x={0} y={G.S * 0.35} textAnchor="middle" fontSize={G.S} fill={c} opacity={o} clipPath={text < 1 ? `url(#cw${id})` : undefined} style={FONT.hand}>
        {tag}
      </text>
    );
  const edge = (c: string, o: number) =>
    o <= 0 ? null : <path d={G.CHIP_D[tag]} fill="none" stroke={c} strokeWidth={STROKE.ink} strokeLinejoin="round" strokeLinecap="round" opacity={o} />;
  return (
    <g transform={`translate(${x} ${y})`}>
      {text < 1 ? (
        <clipPath id={`cw${id}`}>
          <rect x={-w / 2} y={-G.CH} width={w * text} height={G.CH * 2} />
        </clipPath>
      ) : null}
      <path d={G.CHIP_D[tag]} fill={t.sheet} stroke="none" opacity={Math.min(1, outline * 2)} />
      {outline < 1 ? (
        <Pen d={G.CHIP_D[tag]} progress={outline} color="blue" />
      ) : (
        <>
          {edge(t.ink, 1 - blue)}
          {edge(t.blue, blue)}
        </>
      )}
      {word(t.ink, 1 - blue)}
      {word(t.blue, blue)}
    </g>
  );
};

export const HashtagRepartition: React.FC<HashtagRepartitionProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T: Theme = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const S = G.S;
  const L = G.lbl;

  // ① naive feed and writes
  const feedO = 1 - ramp(frame, EV.feedOut, 10, EASE_FADE);
  const naiveGhost = ghost(frame, EV.ghostNaive);
  // ② extractors
  const extP = ramp(frame, ...EV.extDraw);
  // ③ POST_HASHTAG
  const p2P = ramp(frame, ...EV.p2Draw);

  // card k is "being read" (blue outline) around its two reads
  const cardBlue = (k: number) => Math.max(fade(frame, EV.naiveBase[k], EV.naiveBase[k] + 40, EV.cardBlue, 14), fade(frame, EV.extRead[k], EV.extRead[k] + 36, EV.cardBlue, 14));

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0 = Fig 8·b) ===== */}
        <Write x={L.h1.x} y={L.h1.y} text="post_publish" size={S} variant="mono" />
        <Write x={L.k1.x} y={L.k1.y} text="key: user_id" size={S} color="ink2" />
        <Write x={L.ctx.x} y={L.ctx.y} text="also: search, notifications" size={S} color="ink3" anchor={L.ctx.anchor} />

        <g transform={G.DY ? `translate(0 ${G.DY})` : undefined}>
        <path d={G.P1.fill} fill={T.sheet} />
        {G.P1.strokes.map((d, i) => (
          <Ink key={`p1${i}`} d={d} />
        ))}
        {G.DIV1.map((d, i) => (
          <Ink key={`d1${i}`} d={d} color="ink3" width={STROKE.thin} dash="8 8" />
        ))}
        {G.cards.map((c, k) => (
          <g key={`card${k}`}>
            <Ink d={c.b.d} fill={T.sheet} />
            <Ink d={c.b.d} color="blue" opacity={cardBlue(k)} />
            {c.lines.map((ln, i) => (
              <Write key={i} x={ln.x} y={ln.y} text={ln.text} size={S} variant={ln.variant} anchor={ln.anchor} />
            ))}
          </g>
        ))}

        {/* naive feed: the counters pull straight from the post topic (removed when POST_HASHTAG feeds them) */}
        <g opacity={feedO}>
          {G.feedLines.map((d, i) => (
            <Ink key={`f${i}`} d={d} dash={DASH} />
          ))}
          {G.feedHeads.map((d, i) => (
            <Ink key={`fh${i}`} d={d} />
          ))}
          {K3.map((k) => {
            const b = EV.naiveBase[k];
            const p = ramp(frame, b + EV.feedRide[0], EV.feedRide[1], EASE_MOVE);
            const o = 1 - ramp(frame, b + 46, 14, EASE_FADE);
            return (
              <g key={`fr${k}`}>
                <Pen d={G.feedRide[k]} progress={p} color="blue" dash={DASH} opacity={o} />
                <Packet d={G.feedRide[k]} progress={p} color="blue" />
              </g>
            );
          })}
        </g>

        {/* counters (the same three boxes before and after) */}
        {G.ctr.map((b, k) => (
          <g key={`ctr${k}`}>
            <Ink d={b.d} fill={T.sheet} />
            <Write {...L.ctrText(k)} text={`counter ${k + 1}`} size={S} variant="mono" />
          </g>
        ))}

        {/* hashtag db */}
        <path d={G.db.bodyFill} fill={T.sheet} />
        <Ink d={G.db.sides} />
        <Ink d={G.db.front} />
        <Ink d={G.db.top} fill={T.sheet} />
        <Write {...L.db} text="hashtag db" size={S} variant="mono" />

        {/* ① three single writes (red), ghosted at ②, replaced in place by the batched writes at ④ */}
        {K3.map((k) => {
          const b = EV.naiveBase[k];
          const gone = ramp(frame, EV.batchBase[k] + EV.greenWrite[0], 12, EASE_FADE);
          const o = naiveGhost * (1 - gone);
          const p = ramp(frame, b + EV.redWrite[0], EV.redWrite[1]);
          return (
            <g key={`rw${k}`}>
              <Pen d={G.writes[k].d} progress={p} color="red" head={G.writes[k].head} opacity={o} />
              <Write {...G.writes[k].lbl} text="count++" size={S} variant="mono" color="red" progress={ramp(frame, b + EV.redLabel[0], EV.redLabel[1])} opacity={o} />
            </g>
          );
        })}

        {/* ===== ② extractors, one per partition of the post topic ===== */}
        {K3.map((k) => (
          <g key={`ext${k}`}>
            {extP > 0 ? <path d={G.ext[k].d} fill={T.sheet} opacity={extP} /> : null}
            <Pen d={G.ext[k].d} progress={extP} />
            <Pen d={G.extPull[k].d} progress={ramp(frame, ...EV.extPull)} dash={DASH} head={G.extPull[k].head} />
            <Write {...L.extText(k)} text="extractor" size={S} variant="mono" progress={ramp(frame, ...EV.extLabel)} />
            <Packet d={G.extRead[k]} progress={ramp(frame, EV.extRead[k] + EV.readRide[0], EV.readRide[1], EASE_MOVE)} color="blue" r={9} />
          </g>
        ))}

        {/* ===== ③ POST_HASHTAG, keyed by hashtag ===== */}
        {p2P > 0 ? <path d={G.P2.fill} fill={T.sheet} opacity={ramp(frame, EV.p2Draw[0], 10, EASE_FADE)} /> : null}
        {G.P2.strokes.map((d, i) => (
          <Pen key={`p2${i}`} d={d} progress={p2P} />
        ))}
        {G.DIV2.map((d, i) => (
          <Pen key={`d2${i}`} d={d} progress={p2P} color="ink3" width={STROKE.thin} dash="8 8" />
        ))}
        <Write {...L.h2} text="POST_HASHTAG" size={S} variant="mono" progress={ramp(frame, ...EV.p2Header)} />
        <Write {...L.k2} text="key: hashtag" size={S} color="ink2" progress={ramp(frame, ...EV.p2Key)} />
        <Write {...L.gate} text="hash(tag)" size={S} variant="mono" color="ink2" progress={ramp(frame, ...EV.gate)} />
        {K3.map((k) => (
          <Pen key={`pp${k}`} d={G.p2Pull[k].d} progress={ramp(frame, ...EV.p2Pull)} dash={DASH} head={G.p2Pull[k].head} />
        ))}

        {/* ④ one batched write per counter (green, heavy) */}
        {K3.map((k) => {
          const b = EV.batchBase[k];
          return (
            <g key={`gw${k}`}>
              <Pen d={G.writes[k].d} progress={ramp(frame, b + EV.greenWrite[0], EV.greenWrite[1])} color="green" width={STROKE.thick} head={G.writes[k].head} />
              <Write {...G.writes[k].lbl} text={`+= ${LANE_N[k]}`} size={S} variant="mono" color="green" weight={620} progress={ramp(frame, b + EV.greenLabel[0], EV.greenLabel[1])} />
            </g>
          );
        })}

        {/* extractor → message links (one per hashtag), gone when the message leaves */}
        {CHIPS.map((c, i) => (
          <Pen key={`em${i}`} d={G.emitLine(c)} progress={ramp(frame, c.emit, EMIT.line)} color="blue" dash="7 6" width={STROKE.thin + 0.6} opacity={1 - ramp(frame, c.move, 10, EASE_FADE)} />
        ))}

        {/* ===== the messages: written at the extractor, then moved one at a time into their lane ===== */}
        {CHIPS.map((c, i) => {
          if (frame < c.emit) return null;
          const outline = ramp(frame, c.emit + 4, EMIT.chip);
          const text = ramp(frame, c.emit + 6, EMIT.chip - 2);
          const mv = ramp(frame, c.move, MOVE_DUR, EASE_MOVE);
          const [x, y] = mv <= 0 ? G.stage(c) : pointOn(G.route(c), mv);
          const landed = c.move + MOVE_DUR;
          const settle = ramp(frame, landed, 10, EASE_FADE); // blue → ink once it sits in its lane
          const bb = EV.batchBase[c.lane];
          const read = ramp(frame, bb + 4 * c.slot, EV.laneBlue, EASE_FADE) * (1 - ramp(frame, bb + 40, 14, EASE_FADE));
          const blue = Math.max(1 - settle, read);
          const pl = G.plabel(c);
          return (
            <g key={`chip${i}`}>
              <Write x={pl.x} y={pl.y} text={POSTS[c.post].id} size={S} variant="mono" color="ink2" progress={ramp(frame, c.emit + EMIT.labelAt, EMIT.label)} opacity={1 - ramp(frame, c.move, 10, EASE_FADE)} />
              <ChipGlyph G={G} tag={c.tag} x={x} y={y} blue={blue} outline={outline} text={text} />
            </g>
          );
        })}

        {/* ===== summary ===== */}
        <Write {...L.note} text="adapter: re-key, then batch" size={S} progress={ramp(frame, ...EV.note)} />
        </g>
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default HashtagRepartition;
