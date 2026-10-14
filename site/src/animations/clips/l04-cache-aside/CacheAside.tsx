// Clip l04-cache-aside — "One join, many hits" (cache-aside with one shared cache).
// Storyboard: lectures/lec04/animations/l04-cache-aside/storyboard.{yaml,md}. Ledger: L-0248, L-0249, L-0250, L-0251, L-0252.
// Frame 0 = Fig 6·b before the cache is drawn (users → lb → api ×3 → bus → db); the last frame is the annotated poster.
// Two layouts share one timeline: 'wide' (1200×800, left to right) and 'phone' (720×960, top to bottom, ≤ 640 px).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {chevron, endDir, handLine, handPoly, cylinder, serverBox, type Pt} from '../../lib/hand';
import {fade, ramp, EASE_FADE, EASE_MOVE, ghost} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, Write} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META, READS, STEP, type Read} from './timeline';

export type CacheAsideProps = {theme: ThemeName; layout?: Layout};

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
// the kit's cube (remote cache): back outline, chamfered front face, one depth edge. (x, y) = top-left of the back top edge.
const cube = (x: number, y: number, s: number, d: number, seed: string) => {
  const fy = y + d;
  return {
    back: handPoly([[x, fy], [x + d, y], [x + s + d, y], [x + s + d, y + s], [x + s, fy + s]], seed + 'k'),
    front: serverBox(x, fy, s, s, seed + 'f'),
    edge: handLine([x + s, fy], [x + s + d, y], seed + 'e'),
    fill: `M ${x} ${fy} L ${x + d} ${y} L ${x + s + d} ${y} L ${x + s + d} ${y + s} L ${x + s} ${fy + s} L ${x} ${fy + s} Z`,
    cx: x + s / 2,
    cy: fy + s / 2,
  };
};
const tick = (x: number, y: number, s: number, seed: string) => handPoly([[x - s, y], [x - s * 0.3, y + s * 0.7], [x + s, y - s * 0.8]], seed);

type Lbl = {x: number; y: number; anchor?: 'start' | 'middle' | 'end'};

// ---------- geometry per layout (canvas px) ----------
const build = (layout: Layout) => {
  const ph = layout === 'phone';
  if (!ph) {
    // wide: users | lb | api ×3 | bus x 540 → db (right) and → cache (top, between)
    const CY = [190, 310, 430];
    const MID = 310;
    const BUS = 540;
    const API = {x: 290, w: 150, h: 64};
    const LB = {x: 180, y: 150, w: 24, h: 320};
    const DB = {cx: 1000, top: 274, rx: 86, ry: 20, h: 96};
    const DB_IN = DB.cx - DB.rx - 6;
    const CUBE = {x: 640, y: 40, s: 124, d: 26};
    const C_Y = CUBE.y + CUBE.d + CUBE.s / 2; // 128
    const C_IN = CUBE.x - 6;
    const right = API.x + API.w;
    return {
      ph,
      W: META.width,
      H: META.height,
      users: CY.map((y) => ({x: 70, y})),
      apis: CY.map((cy) => ({x: API.x, y: cy - API.h / 2, w: API.w, h: API.h, cx: API.x + API.w / 2, cy})),
      LB, DB, CUBE,
      U_PTS: CY.map((y) => [[100, y], [LB.x - 4, y]] as Pt[]),
      L_PTS: CY.map((y) => [[LB.x + LB.w + 2, y], [API.x - 4, y]] as Pt[]),
      REQ: CY.map((y) => [[100, y], [API.x - 4, y]] as Pt[]),
      STUBS: CY.map((y) => [[right, y], [BUS, y]] as Pt[]),
      BUS_PTS: [[BUS, CY[0]], [BUS, CY[2]]] as Pt[],
      DB_PTS: [[BUS, MID], [DB_IN, MID]] as Pt[],
      C_PTS: [[BUS, CY[0]], [BUS, C_Y], [C_IN, C_Y]] as Pt[],
      Q_DB: CY.map((y) => (y === MID ? [[right, MID], [DB_IN, MID]] : [[right, y], [BUS, y], [BUS, MID], [DB_IN, MID]]) as Pt[]),
      Q_C: CY.map((y) => [[right, y], [BUS, y], [BUS, C_Y], [C_IN, C_Y]] as Pt[]),
      lbl: {
        lb: {x: LB.x + LB.w / 2, y: LB.y - 18, anchor: 'middle'},
        cache: {x: 822, y: 112},
        status: {x: 822, y: 170},
        hop: {x: 822, y: 228},
        db: {x: DB.cx, y: DB.top + DB.h + DB.ry + 50, anchor: 'middle'},
        join: {x: DB.cx, y: DB.top + DB.h + DB.ry + 100, anchor: 'middle'},
      } as Record<string, Lbl>,
      HEADER: 0,
      ROWS: [556, 612],
      COLS: {title: 60, reads: 400, joins: 620, note: 830, tick: 852, noteAfterTick: 884},
      tickAt: (y: number) => [852, y - 14] as Pt,
      CAPTION_TOP: 652,
    };
  }
  // phone: users row → lb bar → api ×3 row → bus y 400 → cache (left) and db (right) below
  const CX = [180, 360, 540];
  const BUS = 400;
  const API = {w: 130, h: 60, top: 270};
  const LB = {x: 120, y: 196, w: 480, h: 24};
  const DB = {cx: 480, top: 498, rx: 76, ry: 20, h: 86};
  const DB_IN = DB.top - DB.ry - 6;
  const CUBE = {x: 225, y: 448, s: 90, d: 22};
  const C_X = CUBE.x + CUBE.s / 2; // 270
  const C_IN = CUBE.y - 4;
  const bottom = API.top + API.h;
  return {
    ph,
    W: META.phone.width,
    H: META.phone.height,
    users: CX.map((x) => ({x, y: 106})),
    apis: CX.map((cx) => ({x: cx - API.w / 2, y: API.top, w: API.w, h: API.h, cx, cy: API.top + API.h / 2})),
    LB, DB, CUBE,
    U_PTS: CX.map((x) => [[x, 158], [x, LB.y - 4]] as Pt[]),
    L_PTS: CX.map((x) => [[x, LB.y + LB.h + 2], [x, API.top - 4]] as Pt[]),
    REQ: CX.map((x) => [[x, 158], [x, API.top - 4]] as Pt[]),
    STUBS: CX.map((x) => [[x, bottom], [x, BUS]] as Pt[]),
    BUS_PTS: [[CX[0], BUS], [CX[2], BUS]] as Pt[],
    DB_PTS: [[DB.cx, BUS], [DB.cx, DB_IN]] as Pt[],
    C_PTS: [[C_X, BUS], [C_X, C_IN]] as Pt[],
    Q_DB: CX.map((x) => [[x, bottom], [x, BUS], [DB.cx, BUS], [DB.cx, DB_IN]] as Pt[]),
    Q_C: CX.map((x) => [[x, bottom], [x, BUS], [C_X, BUS], [C_X, C_IN]] as Pt[]),
    lbl: {
      lb: {x: LB.x - 16, y: LB.y + 22, anchor: 'end'},
      cache: {x: C_X, y: 604, anchor: 'middle'},
      status: {x: C_X, y: 646, anchor: 'middle'},
      hop: {x: 24, y: 694},
      db: {x: DB.cx, y: DB.top + DB.h + DB.ry + 42, anchor: 'middle'},
      join: {x: DB.cx + 14, y: 694, anchor: 'middle'},
    } as Record<string, Lbl>,
    // phone tally is a small table: a 'reads joins' header row, then counts only (no room for 'reads 3' words)
    HEADER: 752,
    ROWS: [800, 848],
    COLS: {title: 24, reads: 290, joins: 412, note: 480, tick: 494, noteAfterTick: 520},
    tickAt: (y: number) => [494, y - 10] as Pt,
    CAPTION_TOP: 872,
  };
};

const paths = (layout: Layout) => {
  const g = build(layout);
  const hs = g.ph ? 16 : 18;
  const C = cube(g.CUBE.x, g.CUBE.y, g.CUBE.s, g.CUBE.d, 'cube');
  return {
    ...g,
    U_D: g.U_PTS.map((p, i) => handPoly(p, `u${i}`)),
    U_HEAD: g.U_PTS.map((p, i) => head(p, `uh${i}`, hs)),
    L_D: g.L_PTS.map((p, i) => handPoly(p, `l${i}`)),
    L_HEAD: g.L_PTS.map((p, i) => head(p, `lh${i}`, hs)),
    REQ_D: g.REQ.map((p, i) => handPoly(p, `rq${i}`)),
    STUB_D: g.STUBS.map((p, i) => handPoly(p, `st${i}`)),
    BUS_D: handPoly(g.BUS_PTS, 'bus'),
    DB_D: handPoly(g.DB_PTS, 'dbl'),
    DB_HEAD: head(g.DB_PTS, 'dbh', hs + 2),
    C_D: handPoly(g.C_PTS, 'cl'),
    C_HEAD: head(g.C_PTS, 'ch', hs + 2),
    QDB_D: g.Q_DB.map((p, i) => handPoly(p, `qd${i}`)),
    QC_D: g.Q_C.map((p, i) => handPoly(p, `qc${i}`)),
    API_D: g.apis.map((a, i) => serverBox(a.x, a.y, a.w, a.h, `api${i}`)),
    LB_D: serverBox(g.LB.x, g.LB.y, g.LB.w, g.LB.h, 'lb'),
    DB_C: cylinder(g.DB.cx, g.DB.top, g.DB.rx, g.DB.ry, g.DB.h, 'db'),
    CUBE_P: C,
    STICK_D: g.users.map((u, i) => stick(u.x, u.y, `user${i}`)),
  };
};
const LAYOUTS = {wide: paths('wide'), phone: paths('phone')};

// counts that change with the frame
const countReads = (frame: number, kinds: Read['kind'][]) =>
  READS.filter((r) => kinds.includes(r.kind) && frame >= r.at + STEP[r.kind].req[0] + STEP[r.kind].req[1]).length;
const countJoins = (frame: number, kinds: Read['kind'][]) =>
  READS.filter((r) => kinds.includes(r.kind) && r.kind !== 'hit' && frame >= r.at + (r.kind === 'join' ? STEP.join.join : STEP.miss.join)).length;

const MISS = READS.find((r) => r.kind === 'miss')!;
const FIRST_HIT = READS.find((r) => r.kind === 'hit')!;

export const CacheAside: React.FC<CacheAsideProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // root sits outside <Sheet>'s context
  const G = LAYOUTS[layout];
  const TY = typeFor(layout);
  const TS = TY.label;
  const L = G.lbl;
  const pr = G.ph ? 8 : 9;
  const tsz = G.ph ? 13 : 16; // tick size

  const lbl = (k: string, text: string, rest: Partial<React.ComponentProps<typeof Write>> = {}) => (
    <Write x={L[k].x} y={L[k].y} anchor={L[k].anchor ?? 'start'} text={text} size={TS} {...rest} />
  );

  // ---- the cache, drawn in at ② ----
  const cubeP = ramp(frame, ...EV.cacheDraw);
  const cLineP = ramp(frame, ...EV.cacheLine);
  const C = G.CUBE_P;

  // ---- status slot: 'miss' then 'hit ✓' ----
  const missP = ramp(frame, MISS.at + STEP.miss.missLabel[0], STEP.miss.missLabel[1]);
  const hitAt = FIRST_HIT.at + STEP.hit.hit;
  const missO = 1 - ramp(frame, hitAt, 10, EASE_FADE);
  const hitP = ramp(frame, hitAt + 4, 14);
  const statusX = L.status.anchor === 'middle' ? L.status.x - (G.ph ? 30 : 0) : L.status.x;

  // ---- tally ----
  const row1O = ghost(frame, EV.row1Ghost) + (1 - ghost(frame, EV.row1Back[0], EV.row1Back[1]));
  const row2P = ramp(frame, ...EV.row2);
  const counter = (x: number, y: number, word: string, n: number, opacity: number, progress = 1) =>
    G.ph ? (
      <Write x={x} y={y} text={`${n}`} size={TS} variant="mono" anchor="middle" progress={progress} opacity={opacity} />
    ) : (
      <Write x={x} y={y} text={`${word} ${n}`} size={TS} variant="mono" progress={progress} opacity={opacity} />
    );

  // ---- one read: its overlays (blue re-inks fade together after the reply) ----
  const renderRead = (r: Read, idx: number) => {
    const k = r.api;
    const st = STEP[r.kind];
    const fadeO = 1 - ramp(frame, r.at + st.fade, 14, EASE_FADE);
    if (frame < r.at || fadeO <= 0) return null;
    const reqP = ramp(frame, r.at + st.req[0], st.req[1], EASE_MOVE);
    const out: React.ReactNode[] = [];
    out.push(<Pen key="rq" d={G.REQ_D[k]} progress={reqP} color="blue" head={G.L_HEAD[k]} opacity={fadeO} />);
    out.push(<Packet key="rqp" d={G.REQ_D[k]} progress={reqP} color="blue" r={pr} />);
    const back2 = 'back2' in st ? st.back2 : null;
    if (r.kind === 'join' || r.kind === 'miss') {
      const q = r.kind === 'join' ? STEP.join.query : STEP.miss.query;
      const qP = ramp(frame, r.at + q[0], q[1], EASE_MOVE);
      out.push(<Pen key="q" d={G.QDB_D[k]} progress={qP} color="blue" head={G.DB_HEAD} opacity={fadeO} />);
      out.push(<Packet key="qp" d={G.QDB_D[k]} progress={qP} color="blue" r={pr} />);
      const b1 = r.kind === 'join' ? STEP.join.back1 : STEP.miss.back1;
      out.push(<Packet key="b1" d={reversePath(G.QDB_D[k])} progress={ramp(frame, r.at + b1[0], b1[1], EASE_MOVE)} color="green" r={pr} />);
    }
    if (r.kind === 'miss' || r.kind === 'hit') {
      const c = r.kind === 'miss' ? STEP.miss.check : STEP.hit.check;
      const cP = ramp(frame, r.at + c[0], c[1], EASE_MOVE);
      out.push(<Pen key="c" d={G.QC_D[k]} progress={cP} color="blue" head={G.C_HEAD} opacity={fadeO} />);
      out.push(<Packet key="cp" d={G.QC_D[k]} progress={cP} color="blue" r={pr} />);
    }
    if (r.kind === 'miss') {
      out.push(<Packet key="sp" d={G.QC_D[k]} progress={ramp(frame, r.at + STEP.miss.store[0], STEP.miss.store[1], EASE_MOVE)} color="blue" r={pr} />);
    }
    if (r.kind === 'hit') {
      out.push(<Packet key="hb" d={reversePath(G.QC_D[k])} progress={ramp(frame, r.at + STEP.hit.back1[0], STEP.hit.back1[1], EASE_MOVE)} color="green" r={pr} />);
    }
    if (back2) {
      out.push(<Packet key="b2" d={reversePath(G.REQ_D[k])} progress={ramp(frame, r.at + back2[0], back2[1], EASE_MOVE)} color="green" r={pr} />);
    }
    return <g key={`read${idx}`}>{out}</g>;
  };

  const {DB_C} = G;
  const r1 = G.ROWS[0];
  const r2 = G.ROWS[1];
  const [tx, ty] = G.tickAt(r2);
  const [sx, sy] = [statusX, L.status.y];

  return (
    <Sheet theme={theme}>
      <Stage title="One join, many hits" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): Fig 6·b before the cache ===== */}
        {G.users.map((u, i) => (
          <g key={`u${i}`}>
            <Ink d={G.STICK_D[i]} />
            <Ink d={G.U_D[i]} />
            <Ink d={G.U_HEAD[i]} />
            <Ink d={G.L_D[i]} />
            <Ink d={G.L_HEAD[i]} />
          </g>
        ))}
        {G.STUB_D.map((d, i) => (
          <Ink key={`st${i}`} d={d} />
        ))}
        <Ink d={G.BUS_D} />
        <Ink d={G.DB_D} />
        <Ink d={G.DB_HEAD} />
        <path d={DB_C.bodyFill} fill={T.sheet} stroke="none" />
        <path d={DB_C.top} fill={T.sheet} stroke="none" />
        <Ink d={DB_C.sides} />
        <Ink d={DB_C.front} />
        <Ink d={DB_C.top} />
        {lbl('db', 'db', {variant: 'mono'})}
        {lbl('join', '3–4 table join', {color: 'ink2', progress: ramp(frame, ...EV.joinLabel)})}

        {/* ===== ② the shared cache is drawn in ===== */}
        <Pen d={G.C_D} progress={cLineP} head={G.C_HEAD} />
        {cubeP > 0 ? (
          <>
            <path d={C.fill} fill={T.sheet} opacity={Math.min(1, cubeP * 3)} />
            <Pen d={C.back} progress={cubeP} />
            <Pen d={C.front} progress={cubeP} />
            <Pen d={C.edge} progress={ramp(frame, EV.cacheDraw[0] + 16, 10)} width={STROKE.thin + 0.6} />
          </>
        ) : null}
        {lbl('cache', 'cache', {variant: 'mono', progress: ramp(frame, ...EV.cacheLabel)})}

        {/* ===== reads ===== */}
        {READS.map(renderRead)}

        {/* lb and api boxes sit on top of the re-inked lines */}
        <Ink d={G.LB_D} fill={T.sheet} />
        {lbl('lb', 'lb', {variant: 'mono'})}
        {G.apis.map((a, i) => (
          <g key={`api${i}`}>
            <Ink d={G.API_D[i]} fill={T.sheet} />
            <Write x={a.cx} y={a.cy + TS * 0.35} text={`api ${i + 1}`} size={TS} variant="mono" anchor="middle" />
          </g>
        ))}

        {/* cache contents + status */}
        <Write x={C.cx} y={C.cy + TS * 0.35} text="blog" size={TS} variant="mono" anchor="middle" color="blue"
          progress={ramp(frame, MISS.at + STEP.miss.storeLabel[0], STEP.miss.storeLabel[1])} />
        <Write x={sx} y={sy} anchor={L.status.anchor ?? 'start'} text="miss" size={TS} color="ink2" progress={missP} opacity={missO} />
        <g opacity={fade(frame, hitAt + 4, Infinity, 8)}>
          <Ink d={tick(sx + (L.status.anchor === 'middle' ? -44 : tsz), sy - tsz * 0.8, tsz, 'hitk')} color="green" width={STROKE.ink + 0.6} />
        </g>
        <Write x={sx + (L.status.anchor === 'middle' ? 18 : tsz * 2 + 14)} y={sy} anchor={L.status.anchor ?? 'start'} text="hit" size={TS} color="green" progress={hitP} weight={600} />
        {lbl('hop', 'one network hop', {color: 'ink2', progress: ramp(frame, ...EV.hopLabel)})}

        {/* ===== tally ===== */}
        <g>
          {G.ph ? (
            <>
              <Write x={G.COLS.reads} y={G.HEADER} text="reads" size={TS} variant="mono" anchor="middle" color="ink2" />
              <Write x={G.COLS.joins} y={G.HEADER} text="joins" size={TS} variant="mono" anchor="middle" color="ink2" />
            </>
          ) : null}
          <Write x={G.COLS.title} y={r1} text="no cache" size={TS} opacity={row1O} />
          {counter(G.COLS.reads, r1, 'reads', countReads(frame, ['join']), row1O)}
          {counter(G.COLS.joins, r1, 'joins', countJoins(frame, ['join']), row1O)}
          <Write x={G.COLS.note} y={r1} text="every read" size={TS} color="ink2" progress={ramp(frame, ...EV.perRead)} />

          <Write x={G.COLS.title} y={r2} text="shared cache" size={TS} progress={row2P} />
          {counter(G.COLS.reads, r2, 'reads', countReads(frame, ['miss', 'hit']), 1, row2P)}
          {counter(G.COLS.joins, r2, 'joins', countJoins(frame, ['miss']), 1, row2P)}
          <g opacity={ramp(frame, EV.thenHits[0], 8, EASE_FADE)}>
            <Ink d={tick(tx, ty, tsz, 'oncek')} color="green" width={STROKE.ink + 0.6} />
          </g>
          <Write x={G.COLS.noteAfterTick} y={r2} text="once" size={TS} color="green" weight={600} progress={ramp(frame, EV.thenHits[0] + 4, EV.thenHits[1] - 4)} />
        </g>
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

export default CacheAside;
