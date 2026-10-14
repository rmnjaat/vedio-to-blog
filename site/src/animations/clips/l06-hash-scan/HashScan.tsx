// Clip l06-hash-scan — "Rows touched per query".
// Storyboard: lectures/lec06/animations/l06-hash-scan/storyboard.{yaml,md}. Ledger: L-0080, L-0081, L-0082, L-0083.
// Frame 0 = Fig 2·b without its annotations: WHERE HASH(email) = ? over a users table (left) and WHERE hash = ? over an
// index on hash and one users row (right), both counters at 0. The last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, panels side by side) and 'phone' (720×980, panels stacked).
import React from 'react';
import {Easing, useCurrentFrame} from 'remotion';
import {chevron, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE, PAST} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, EV, META} from './timeline';

export type HashScanProps = {theme: ThemeName; layout?: Layout};

const EMAILS = ['a@…', 'b@…', 'c@…', 'd@…', 'e@…'];
const MATCH = 2; // row 3 holds the match (illustrative position)

type Box = {x: number; y: number; w: number; h: number};
const mid = (b: Box): Pt => [b.x + b.w / 2, b.y + b.h / 2];

// ---------- layout (canvas px), one geometry per layout ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);

  // ----- left / top panel: the scan -----
  const T = ph
    ? {x: 32, w: 388, hashX: 156, head: 72, rowH: 40, markX: 290}
    : {x: 70, w: 486, hashX: 250, head: 92, rowH: 48, markX: 400};
  const rowsTop = T.head + T.rowH; // first data row
  const rowY = (i: number) => rowsTop + i * T.rowH; // top of row i (i = 5 is the '⋮' row)
  const dotsBottom = rowY(6);
  const SCAN = {
    query: ph ? {x: 32, y: 48} : {x: 50, y: 60},
    // counter column: right of the table (phone), under it (wide)
    lbl: ph ? {x: 450, y: 136} : {x: 70, y: 500},
    num: ph ? {x: 450, y: 192} : {x: 300, y: 503},
    full: ph ? [{x: 450, y: 244, t: 'full table'}, {x: 450, y: 282, t: 'scan'}] : [{x: 70, y: 555, t: 'full table scan'}],
    req: ph ? {x: 450, y: 336} : {x: 70, y: 610},
  };
  const tableD = serverBox(T.x, T.head, T.w, rowsTop - T.head + 5 * T.rowH, 'users');
  const headRule = handLine([T.x, rowsTop], [T.x + T.w, rowsTop], 'hr');
  const colRule = handLine([T.hashX, T.head], [T.hashX, rowsTop + 5 * T.rowH], 'cr');
  const rowRules = [1, 2, 3, 4].map((i) => handLine([T.x, rowY(i)], [T.x + T.w, rowY(i)], `rr${i}`));
  const bx = ph ? 20 : 50; // bracket spine
  const bracketD = handPoly(
    [
      [bx + 9, rowsTop + 2],
      [bx, rowsTop + 2],
      [bx, dotsBottom - 4],
      [bx + 9, dotsBottom - 4],
    ],
    'brk',
  );

  // ----- right / bottom panel: the index -----
  const IDX = ph
    ? {
        query: {x: 32, y: 444},
        root: {x: 170, y: 470, w: 80, h: 34},
        inner: [
          {x: 75, y: 530, w: 70, h: 34},
          {x: 275, y: 530, w: 70, h: 34},
        ],
        leaf: [
          {x: 44, y: 590, w: 52, h: 34},
          {x: 124, y: 590, w: 52, h: 34},
          {x: 244, y: 590, w: 52, h: 34},
          {x: 324, y: 590, w: 52, h: 34},
        ],
        row: {x: 60, y: 668, w: 320, h: 40},
        rowText: {x: 74, y: 697},
        rowMarkX: 330,
        usersLbl: {x: 60, y: 748, anchor: 'start' as const},
        idxLbl: [{x: 450, y: 492, t: 'index on hash'}],
        lbl: {x: 450, y: 562},
        num: {x: 450, y: 618},
        one: {x: 450, y: 668},
        req: {x: 450, y: 720},
        note: {x: 60, y: 796},
      }
    : {
        query: {x: 640, y: 60},
        root: {x: 750, y: 92, w: 100, h: 44},
        inner: [
          {x: 655, y: 168, w: 90, h: 44},
          {x: 855, y: 168, w: 90, h: 44},
        ],
        leaf: [
          {x: 628, y: 244, w: 64, h: 44},
          {x: 708, y: 244, w: 64, h: 44},
          {x: 828, y: 244, w: 64, h: 44},
          {x: 908, y: 244, w: 64, h: 44},
        ],
        row: {x: 680, y: 340, w: 320, h: 48},
        rowText: {x: 696, y: 376},
        rowMarkX: 940,
        usersLbl: {x: 1016, y: 376, anchor: 'start' as const},
        idxLbl: [
          {x: 1000, y: 124, t: 'index'},
          {x: 1000, y: 168, t: 'on hash'},
        ],
        lbl: {x: 640, y: 500},
        num: {x: 870, y: 503},
        one: {x: 640, y: 555},
        req: {x: 640, y: 610},
        note: {x: 680, y: 440},
      };
  const bottomC = (b: Box): Pt => [b.x + b.w / 2, b.y + b.h];
  const topC = (b: Box): Pt => [b.x + b.w / 2, b.y];
  const root = IDX.root;
  const [in0, in1] = IDX.inner;
  const leaves = IDX.leaf;
  const edges: [Box, Box][] = [
    [root, in0],
    [root, in1],
    [in0, leaves[0]],
    [in0, leaves[1]],
    [in1, leaves[2]],
    [in1, leaves[3]],
  ];
  const leafHit = leaves[2]; // the lookup goes root -> inner 2 -> leaf 3 -> the users row
  const rowTop: Pt = [leafHit.x + leafHit.w / 2, IDX.row.y];
  const hopPts: Pt[][] = [
    [bottomC(root), topC(in1)],
    [bottomC(in1), topC(leafHit)],
    [bottomC(leafHit), rowTop],
  ];
  const hops = hopPts.map((p, i) => handPoly(p, `hop${i}`));
  const [ux, uy] = endDir(hopPts[2]);
  const rowHead = chevron(rowTop, ux, uy, ph ? 12 : 15, 'rowhead');
  // the whole lookup in one path, for the request packets in B3
  const lookupD = handPoly([bottomC(root), topC(in1), bottomC(in1), topC(leafHit), bottomC(leafHit), rowTop], 'lookup');

  // divider between the panels
  const divider = ph ? handLine([20, 384], [700, 384], 'div') : handLine([600, 36], [600, 620], 'div');

  return {
    ph,
    W,
    H,
    TY,
    T,
    rowY,
    tableD,
    headRule,
    colRule,
    rowRules,
    bracketD,
    SCAN,
    IDX,
    edges: edges.map(([a, b], i) => handLine(bottomC(a), topC(b), `e${i}`)),
    boxes: {
      root: serverBox(root.x, root.y, root.w, root.h, 'root'),
      inner: IDX.inner.map((b, i) => serverBox(b.x, b.y, b.w, b.h, `in${i}`)),
      leaf: leaves.map((b, i) => serverBox(b.x, b.y, b.w, b.h, `lf${i}`)),
      row: serverBox(IDX.row.x, IDX.row.y, IDX.row.w, IDX.row.h, 'urow'),
    },
    hops,
    rowHead,
    lookupD,
    divider,
    NUM_SIZE: ph ? 44 : 52,
    MARK: ph ? 9 : 11,
    CAPTION_TOP: ph ? 828 : 652,
  };
};
const LAYOUTS = {wide: build('wide'), phone: build('phone')};

const LIN = Easing.linear;
const fmt = (n: number) => (n >= 1000 ? `${Math.floor(n / 1000)},${String(n % 1000).padStart(3, '0')}` : String(n));

// ---------- the scan cursor: which row (0..5, 5 = '⋮') it is on, as a continuous index ----------
const cursorIndex = (frame: number): number => {
  // B3 re-sweeps: the same row-by-row walk, faster (6 stops, half of each stop spent moving)
  for (const r of EV.req) {
    if (frame >= r.sweep[0] && frame <= r.sweep[0] + r.sweep[1]) {
      const step = r.sweep[1] / 6;
      const k = Math.min(5, Math.floor((frame - r.sweep[0]) / step));
      return k === 0 ? 0 : k - 1 + ramp(frame, r.sweep[0] + k * step, step / 2, EASE_MOVE);
    }
  }
  if (frame < EV.rowAt[0]) return 0;
  const stops = [...EV.rowAt, EV.dotsAt];
  for (let i = stops.length - 1; i >= 1; i--) {
    if (frame >= stops[i] - EV.rowMove) return i - 1 + ramp(frame, stops[i] - EV.rowMove, EV.rowMove, EASE_MOVE);
  }
  return 0;
};
const cursorOpacity = (frame: number) => {
  const b1 = fade(frame, EV.cursorIn, EV.cursorOut, 8, 10);
  const b3 = EV.req.reduce((o, r) => Math.max(o, fade(frame, r.sweep[0] - 4, r.sweep[0] + r.sweep[1] + 2, 4, 8)), 0);
  return Math.max(b1, b3);
};

// ---------- counters ----------
const scanCount = (frame: number): number => {
  const [r2, r3] = EV.req;
  if (frame >= r3.sweep[0]) return 20000 + Math.round(10000 * ramp(frame, r3.sweep[0], r3.sweep[1], LIN));
  if (frame >= r2.sweep[0]) return 10000 + Math.round(10000 * ramp(frame, r2.sweep[0], r2.sweep[1], LIN));
  if (frame >= EV.run[0]) return 5 + Math.round(9995 * ramp(frame, EV.run[0], EV.run[1], LIN));
  return EV.rowAt.filter((a) => frame >= a).length;
};
const lookupCount = (frame: number): number => {
  const [r2, r3] = EV.req;
  if (frame >= r3.hop[0] + r3.hop[1]) return 3;
  if (frame >= r2.hop[0] + r2.hop[1]) return 2;
  return frame >= EV.rowTick ? 1 : 0;
};
const requestCount = (frame: number) => (frame >= EV.req[1].sweep[0] ? 3 : frame >= EV.req[0].sweep[0] ? 2 : 1);

export const HashScan: React.FC<HashScanProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const C = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const {T, SCAN, IDX} = G;

  // left panel ghosts while the index is the subject (B2), and comes back for the comparison (B3)
  const leftO = 1 - (1 - PAST) * ramp(frame, EV.ghostL, 12, EASE_FADE) * (1 - ramp(frame, EV.unghostL, 12, EASE_FADE));

  // cursor
  const ci = cursorIndex(frame);
  const curO = cursorOpacity(frame);
  const curY = G.rowY(ci);

  const n = scanCount(frame);
  const scanColor = frame >= EV.scanRed ? 'red' : 'ink';
  const m = lookupCount(frame);
  const reqN = requestCount(frame);
  const reqO = ramp(frame, ...EV.requests);
  // the request digit is re-written when it changes
  const reqSince = reqN === 3 ? EV.req[1].sweep[0] : reqN === 2 ? EV.req[0].sweep[0] : EV.requests[0];

  // index path: re-inked blue in B2 and kept (it is the request path); packets ride it again in B3
  const hopP = EV.hops.map(([s, d]) => ramp(frame, s, d, EASE_MOVE));
  const rootBlue = ramp(frame, ...EV.rootBlue);

  const rowsMarked = EV.rowAt.map((a) => ramp(frame, a + 3, 8, EASE_FADE));

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        <Ink d={G.divider} color="ink3" width={STROKE.thin} dash="10 10" />

        {/* ===================== left / top: WHERE HASH(email) = ? ===================== */}
        <g opacity={leftO}>
          <Write x={SCAN.query.x} y={SCAN.query.y} text="WHERE HASH(email) = ?" size={G.TY.mono} variant="mono" />
          {/* cursor wash sits under the table lines */}
          {curO > 0 ? (
            <rect x={T.x + 4} y={curY + 4} width={T.w - 8} height={T.rowH - 8} rx={6} fill={C.blueWash} opacity={curO} />
          ) : null}
          <Ink d={G.tableD} fill="none" />
          <Ink d={G.headRule} />
          <Ink d={G.colRule} width={STROKE.thin} color="ink2" />
          {G.rowRules.map((d, i) => (
            <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
          ))}
          <Write x={T.x + 14} y={T.head + T.rowH * 0.74} text="email" size={TS} color="ink2" />
          <Write x={T.hashX + 12} y={T.head + T.rowH * 0.74} text="HASH(email)" size={G.TY.mono} variant="mono" color="ink2" />
          {EMAILS.map((e, i) => (
            <Write key={e} x={T.x + 14} y={G.rowY(i) + T.rowH * 0.74} text={e} size={G.TY.mono} variant="mono" />
          ))}
          {/* the rest of the table: a drawn vertical ellipsis + its size */}
          {[0.3, 0.5, 0.7].map((f) => (
            <circle key={f} cx={T.x + 22} cy={G.rowY(5) + T.rowH * f} r={G.ph ? 2.6 : 3.2} fill={C.ink2} />
          ))}
          <Write x={T.x + 44} y={G.rowY(5) + T.rowH * 0.74} text="10,000 users" size={TS} color="ink2" />

          {/* each row hashed and compared: ✕, or ✓ at the match */}
          {rowsMarked.map((o, i) =>
            i === MATCH ? (
              <Tick key={i} x={T.markX} y={G.rowY(i) + T.rowH / 2} color={C.green} o={o} s={G.MARK} />
            ) : (
              <Cross key={i} x={T.markX} y={G.rowY(i) + T.rowH / 2} color={C.red} o={o} s={G.MARK} />
            ),
          )}

          {/* cursor outline: the row being read */}
          {curO > 0 ? (
            <rect
              x={T.x + 4}
              y={curY + 4}
              width={T.w - 8}
              height={T.rowH - 8}
              rx={6}
              fill="none"
              stroke={C.blue}
              strokeWidth={STROKE.ink + 0.8}
              opacity={curO}
            />
          ) : null}

          {/* the whole table, red */}
          <Pen d={G.bracketD} progress={ramp(frame, ...EV.bracket)} color="red" width={STROKE.ink + 1} />

          <Write x={SCAN.lbl.x} y={SCAN.lbl.y} text="rows read" size={TS} />
          <Write x={SCAN.num.x} y={SCAN.num.y} text={fmt(n)} size={G.NUM_SIZE} variant="mono" color={scanColor} weight={600} />
          {SCAN.full.map((l, i) => (
            <Write
              key={i}
              x={l.x}
              y={l.y}
              text={l.t}
              size={TS}
              color="red"
              weight={600}
              progress={ramp(frame, EV.fullScan[0] + i * 12, EV.fullScan[1] - i * 8)}
            />
          ))}
          <Write x={SCAN.req.x} y={SCAN.req.y} text="requests:" size={TS} color="ink2" progress={reqO} />
          <Write
            x={SCAN.req.x + (G.ph ? 160 : 206)}
            y={SCAN.req.y}
            text={String(reqN)}
            size={G.TY.mono}
            variant="mono"
            color="ink2"
            weight={600}
            progress={ramp(frame, reqSince + (reqN === 1 ? 12 : 0), 8)}
          />
        </g>

        {/* ===================== right / bottom: WHERE hash = ? ===================== */}
        <Write x={IDX.query.x} y={IDX.query.y} text="WHERE hash = ?" size={G.TY.mono} variant="mono" />
        {G.edges.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" />
        ))}
        <Ink d={G.boxes.root} fill={C.sheet} />
        {G.boxes.inner.map((d, i) => (
          <Ink key={i} d={d} fill={C.sheet} />
        ))}
        {G.boxes.leaf.map((d, i) => (
          <Ink key={i} d={d} fill={C.sheet} />
        ))}
        {IDX.idxLbl.map((l) => (
          <Write key={l.t} x={l.x} y={l.y} text={l.t} size={TS} color="ink2" />
        ))}
        <Ink d={G.boxes.row} fill={C.sheet} />
        <Write x={IDX.rowText.x} y={IDX.rowText.y} text="c@…" size={G.TY.mono} variant="mono" />
        <Write x={IDX.usersLbl.x} y={IDX.usersLbl.y} text="users" size={TS} color="ink2" anchor={IDX.usersLbl.anchor} />

        {/* ② the lookup: root, then three hops, re-inked blue */}
        <g>
          <Pen d={G.boxes.root} progress={rootBlue} color="blue" />
          {G.hops.map((d, i) => (
            <Pen key={i} d={d} progress={hopP[i]} color="blue" width={STROKE.ink + 1} head={i === 2 ? G.rowHead : undefined} />
          ))}
          <Pen d={G.boxes.inner[1]} progress={ramp(frame, EV.boxBlue[0], 8)} color="blue" />
          <Pen d={G.boxes.leaf[2]} progress={ramp(frame, EV.boxBlue[1], 8)} color="blue" />
        </g>
        {G.hops.map((d, i) => (
          <Packet key={i} d={d} progress={hopP[i]} color="blue" r={G.ph ? 8 : 10} />
        ))}
        <Pen d={G.boxes.row} progress={ramp(frame, EV.rowTick - 2, 10)} color="green" />
        <Tick x={IDX.rowMarkX} y={IDX.row.y + IDX.row.h / 2} color={C.green} o={ramp(frame, EV.rowTick, 8, EASE_FADE)} s={G.MARK} />

        {/* ③ the same lookup for each further request */}
        {EV.req.map((r, i) => (
          <Packet key={i} d={G.lookupD} progress={ramp(frame, r.hop[0], r.hop[1], EASE_MOVE)} color="blue" r={G.ph ? 8 : 10} />
        ))}

        <Write x={IDX.lbl.x} y={IDX.lbl.y} text="rows read" size={TS} />
        <Write x={IDX.num.x} y={IDX.num.y} text={String(m)} size={G.NUM_SIZE} variant="mono" color={m > 0 ? 'green' : 'ink'} weight={600} />
        <Write x={IDX.one.x} y={IDX.one.y} text="one lookup" size={TS} color="green" weight={600} progress={ramp(frame, ...EV.oneLookup)} />
        <Write x={IDX.req.x} y={IDX.req.y} text="requests:" size={TS} color="ink2" progress={reqO} />
        <Write
          x={IDX.req.x + (G.ph ? 160 : 206)}
          y={IDX.req.y}
          text={String(reqN)}
          size={G.TY.mono}
          variant="mono"
          color="ink2"
          weight={600}
          progress={ramp(frame, reqSince + (reqN === 1 ? 12 : 0), 8)}
        />

        {/* B4: the takeaway */}
        <Write x={IDX.note.x} y={IDX.note.y} text="store it, index it" size={TS} color="green" weight={600} progress={ramp(frame, ...EV.note)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

const Cross: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 11}) =>
  o <= 0 ? null : (
    <path d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`} stroke={color} strokeWidth={STROKE.ink + 1} strokeLinecap="round" opacity={o} />
  );

const Tick: React.FC<{x: number; y: number; color: string; o: number; s?: number}> = ({x, y, color, o, s = 11}) => {
  if (o <= 0) return null;
  const k = s / 11;
  return (
    <path
      d={`M ${x - 12 * k} ${y + 1 * k} L ${x - 3 * k} ${y + 10 * k} L ${x + 13 * k} ${y - 11 * k}`}
      fill="none"
      stroke={color}
      strokeWidth={STROKE.ink + 1}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={o}
    />
  );
};

export default HashScan;
