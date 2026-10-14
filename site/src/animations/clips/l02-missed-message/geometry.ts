// Clip-local geometry for l02-missed-message: one layout per composition ('wide' 1200×800, 'phone' 720×1040),
// built once at module load (seeded hand paths, stable across frames). Glyphs follow lectures/lec02/lesson/figures.md §0:
// edge server = chamfered box + two-prong plug mark; user = mono letter on a WS stub (two thin rails, no head);
// real-time pub/sub = a pipe with empty dotted lanes (never holds a square); kafka = a horizontal pipe that keeps its
// square; db = solid cylinder; clock = circle + two hands. Arrows: solid = sync, dashed = async, head at the target.
import {chevron, cylinder, endDir, handLine, handPoly, serverBox, type Pt} from '../../lib/hand';
import {typeFor, type Layout} from '../../lib/tokens';
import {META} from './timeline';

const f = (n: number) => Math.round(n * 10) / 10;
const cont = (a: Pt, b: Pt, seed: string) => handLine(a, b, seed).replace(/^M [^C]+/, '');

/** Horizontal pipe with round ends (x, y = top-left). */
const capsule = (x: number, y: number, w: number, h: number, seed: string) => {
  const r = h / 2;
  return (
    `M ${f(x + r)} ${f(y)} ` +
    cont([x + r, y], [x + w - r, y], seed + 't') +
    ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)} ` +
    cont([x + w - r, y + h], [x + r, y + h], seed + 'b') +
    ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)} Z`
  );
};

/** Straight polyline (packets ride it; the hand-drawn twin is what is inked). */
const straight = (pts: Pt[]) => 'M ' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L ');

type Box = {x: number; y: number; w: number; h: number};
type Anchor = 'start' | 'middle' | 'end';
type Label = {x: number; y: number; anchor: Anchor};

const arrow = (pts: Pt[], seed: string, hs: number) => {
  const [ux, uy] = endDir(pts);
  return {d: handPoly(pts, seed), ride: straight(pts), back: straight([...pts].reverse()), head: chevron(pts[pts.length - 1], ux, uy, hs, seed + 'h')};
};

const plug = (b: Box, s: number, seed: string) => {
  const r = b.x + b.w;
  return `${handLine([r - 2.4 * s, b.y], [r - 2.4 * s, b.y - s], seed + 'a')} ${handLine([r - 1.3 * s, b.y], [r - 1.3 * s, b.y - s], seed + 'b')}`;
};

const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const HS = ph ? 14 : 16; // arrowhead size
  const GAP = ph ? 5 : 6; // WS rail gap

  // ---------- boxes ----------
  const WS1: Box = ph ? {x: 30, y: 90, w: 160, h: 60} : {x: 50, y: 140, w: 160, h: 70};
  const WS2: Box = ph ? {x: 520, y: 350, w: 160, h: 60} : {x: 740, y: 140, w: 160, h: 70};
  const WORKER: Box = ph ? {x: 20, y: 530, w: 180, h: 60} : {x: 355, y: 330, w: 170, h: 70};
  const API: Box = ph ? {x: 420, y: 740, w: 160, h: 60} : {x: 985, y: 345, w: 160, h: 70};
  const SCREEN: Box = ph ? {x: 300, y: 460, w: 400, h: 220} : {x: 960, y: 40, w: 210, h: 230};
  const PIPE: Box = ph ? {x: 230, y: 200, w: 460, h: 44} : {x: 300, y: 150, w: 350, h: 50};
  const KAFKA: Box = ph ? {x: 20, y: 430, w: 200, h: 44} : {x: 30, y: 340, w: 240, h: 50};
  const DB = ph ? {cx: 110, top: 712, rx: 60, ry: 15, h: 70} : {cx: 660, top: 330, rx: 70, ry: 18, h: 80};
  const cy = (b: Box) => b.y + b.h / 2;
  const cx = (b: Box) => b.x + b.w / 2;
  const boxLabel = (b: Box): Label => ({x: cx(b), y: cy(b) + TY.mono * 0.35, anchor: 'middle'});

  // ---------- user A on a WS stub into ws1's top ----------
  const aX = ph ? 110 : 130;
  const stubTop = ph ? 64 : 94;
  const A_LBL: Label = {x: aX, y: ph ? 52 : 78, anchor: 'middle'};
  const stubRails = [
    handLine([aX - GAP / 2, WS1.y], [aX - GAP / 2, stubTop], 'stub1'),
    handLine([aX + GAP / 2, WS1.y], [aX + GAP / 2, stubTop], 'stub2'),
  ];
  const stubRide = straight([[aX, stubTop], [aX, WS1.y]]);
  const MSG_LBL: Label = {x: ph ? 150 : 172, y: A_LBL.y, anchor: 'start'};

  // ---------- connectors to the pipe (plain lines, no head: persistent connections) ----------
  const pipeMidY = cy(PIPE);
  const c1Pts: Pt[] = ph
    ? [
        [WS1.x + WS1.w, cy(WS1)],
        [270, cy(WS1)],
        [270, PIPE.y],
      ]
    : [
        [WS1.x + WS1.w, cy(WS1)],
        [PIPE.x, cy(WS1)],
      ];
  const C1 = arrow(c1Pts, 'c1', HS); // its head is inked only while PUBLISH rides it
  const c2a: Pt = ph ? [600, PIPE.y + PIPE.h] : [PIPE.x + PIPE.w, pipeMidY];
  const c2b: Pt = ph ? [600, WS2.y] : [WS2.x, pipeMidY];
  const C2 = handLine(c2a, c2b, 'c2');
  // broken link: two red dashed halves with a gap in the middle
  const mid: Pt = [(c2a[0] + c2b[0]) / 2, (c2a[1] + c2b[1]) / 2];
  const [bx, by] = endDir([c2a, c2b]);
  const g = ph ? 12 : 12;
  const BROKEN = [handLine(c2a, [mid[0] - bx * g, mid[1] - by * g], 'brk1'), handLine([mid[0] + bx * g, mid[1] + by * g], c2b, 'brk2')];
  // the square's ride inside the pipe: from where ws1's connector enters to the ws2 end
  const rideIn: Pt = ph ? [270, pipeMidY] : [PIPE.x + 6, pipeMidY];
  const rideEnd: Pt = ph ? [600, pipeMidY] : [PIPE.x + PIPE.w - 30, pipeMidY];
  const PIPE_RIDE = straight([rideIn, rideEnd]);
  const RING = {x: rideEnd[0], y: rideEnd[1], r: ph ? 16 : 19};
  const LANES = [-1, 1].map((k, i) =>
    handLine([PIPE.x + PIPE.h / 2, pipeMidY + k * PIPE.h * 0.17], [PIPE.x + PIPE.w - PIPE.h / 2, pipeMidY + k * PIPE.h * 0.17], `lane${i}`),
  );

  // ---------- ws2 -> E's screen (WS line, no head) ----------
  const wsA: Pt = ph ? [600, WS2.y + WS2.h] : [WS2.x + WS2.w, cy(WS2)];
  const wsB: Pt = ph ? [600, SCREEN.y] : [SCREEN.x, cy(WS2)];
  const [wx, wy] = endDir([wsA, wsB]);
  const wn: Pt = [-wy * (GAP / 2), wx * (GAP / 2)];
  const WS_RAILS = [
    handLine([wsA[0] + wn[0], wsA[1] + wn[1]], [wsB[0] + wn[0], wsB[1] + wn[1]], 'wsr1'),
    handLine([wsA[0] - wn[0], wsA[1] - wn[1]], [wsB[0] - wn[0], wsB[1] - wn[1]], 'wsr2'),
  ];

  // ---------- E's screen ----------
  const CLOCK = ph ? {x: 330, y: 497, r: 16} : {x: 995, y: 80, r: 20};
  const SCR_HEAD: Label = ph ? {x: 362, y: 508, anchor: 'start'} : {x: 1030, y: 94, anchor: 'start'};
  const ruleY = ph ? 528 : 116;
  const SCR_RULE = handLine([SCREEN.x + 14, ruleY], [SCREEN.x + SCREEN.w - 14, ruleY], 'rule');
  const lineX = SCREEN.x + (ph ? 24 : 20);
  const OLD_LINES = (ph ? [556, 588] : [146, 176]).map((y, i) =>
    handLine([lineX, y], [lineX + (ph ? [300, 220][i] : [140, 100][i]), y], `old${i}`),
  );
  // the missing message: one line on the phone, two on the wide screen
  const SLOT = ph
    ? {lines: [{x: lineX, y: 640, text: 'standup in 5'}], q: {x: lineX + 6, y: 644}, tick: {x: 600, y: 630}}
    : {
        lines: [
          {x: lineX, y: 220, text: 'standup'},
          {x: lineX, y: 258, text: 'in 5'},
        ],
        q: {x: lineX + 8, y: 246},
        tick: {x: 1128, y: 244},
      };

  // ---------- persistence column ----------
  const k1: Pt = ph ? [160, WS1.y + WS1.h] : [180, WS1.y + WS1.h];
  const k2: Pt = ph ? [160, KAFKA.y] : [180, KAFKA.y];
  const TO_KAFKA = arrow([k1, k2], 'tok', HS);
  const KAFKA_LBL: Label = ph ? {x: 88, y: cy(KAFKA) + TY.mono * 0.35, anchor: 'middle'} : {x: 120, y: cy(KAFKA) + TY.mono * 0.35, anchor: 'middle'};
  const KAFKA_SQ: Pt = ph ? [194, cy(KAFKA)] : [240, cy(KAFKA)];
  const PULL = ph
    ? arrow([[110, WORKER.y], [110, KAFKA.y + KAFKA.h]], 'pull', HS)
    : arrow([[WORKER.x, cy(WORKER)], [KAFKA.x + KAFKA.w, cy(WORKER)]], 'pull', HS);
  const PULL_LBL: Label = ph ? {x: 124, y: 512, anchor: 'start'} : {x: 312, y: 434, anchor: 'middle'};
  const TO_DB = ph
    ? arrow([[110, WORKER.y + WORKER.h], [110, DB.top - DB.ry]], 'todb', HS)
    : arrow([[WORKER.x + WORKER.w, cy(WORKER)], [DB.cx - DB.rx, cy(WORKER)]], 'todb', HS);
  const CYL = cylinder(DB.cx, DB.top, DB.rx, DB.ry, DB.h, 'db');
  const DB_LBL: Label = {x: DB.cx, y: DB.top + DB.h * 0.62 + TY.mono * 0.35, anchor: 'middle'};
  const SAVED = ph ? {x: 84, y: 848, anchor: 'middle' as Anchor, tick: {x: 148, y: 836}} : {x: 638, y: 474, anchor: 'middle' as Anchor, tick: {x: 730, y: 462}};

  // ---------- the correction fetch ----------
  const TO_API = ph
    ? arrow([[cx(API), SCREEN.y + SCREEN.h], [cx(API), API.y]], 'toapi', HS)
    : arrow([[cx(API), SCREEN.y + SCREEN.h], [cx(API), API.y]], 'toapi', HS);
  const API_DB = ph
    ? arrow([[API.x, cy(API)], [DB.cx + DB.rx, cy(API)]], 'apidb', HS)
    : arrow([[API.x, cy(API)], [DB.cx + DB.rx, cy(API)]], 'apidb', HS);
  const GET_LBL: Label = ph ? {x: cx(API), y: 848, anchor: 'middle'} : {x: 1170, y: 474, anchor: 'end'};
  const CORR_LBL: Label = ph ? {x: SCREEN.x, y: 446, anchor: 'start'} : {x: 948, y: 64, anchor: 'end'};

  // ---------- labels on the real-time side ----------
  const PIPE_LBL: Label = ph ? {x: 470, y: 186, anchor: 'middle'} : {x: 475, y: 128, anchor: 'middle'};
  const DISC_LBL: Label = ph ? {x: 505, y: 396, anchor: 'end'} : {x: 808, y: 124, anchor: 'middle'};
  const PUB_LBL: Label = ph ? {x: 230, y: 286, anchor: 'start'} : {x: 300, y: 246, anchor: 'start'};
  const LOST_LBL: Label = ph ? {x: 230, y: 328, anchor: 'start'} : {x: 300, y: 292, anchor: 'start'};

  // ---------- the closing bracket under the persistence column ----------
  const GUAR = ph
    ? {bracket: null as string | null, lbl: {x: 20, y: 898, anchor: 'start' as Anchor}}
    : {
        bracket: handPoly(
          [
            [40, 492],
            [40, 506],
            [760, 506],
            [760, 492],
          ],
          'guar',
        ),
        lbl: {x: 400, y: 556, anchor: 'middle' as Anchor},
      };

  return {
    ph,
    W,
    H,
    TY,
    PKT: ph ? 14 : 18,
    WS1,
    WS2,
    WORKER,
    API,
    SCREEN,
    boxes: {
      ws1: serverBox(WS1.x, WS1.y, WS1.w, WS1.h, 'ws1'),
      ws2: serverBox(WS2.x, WS2.y, WS2.w, WS2.h, 'ws2'),
      worker: serverBox(WORKER.x, WORKER.y, WORKER.w, WORKER.h, 'worker'),
      api: serverBox(API.x, API.y, API.w, API.h, 'api'),
      screen: serverBox(SCREEN.x, SCREEN.y, SCREEN.w, SCREEN.h, 'screen'),
    },
    plugs: [plug(WS1, ph ? 9 : 10, 'plug1'), plug(WS2, ph ? 9 : 10, 'plug2')],
    labels: {ws1: boxLabel(WS1), ws2: boxLabel(WS2), worker: boxLabel(WORKER), api: boxLabel(API)},
    A_LBL,
    stubRails,
    stubRide,
    MSG_LBL,
    PIPE_D: capsule(PIPE.x, PIPE.y, PIPE.w, PIPE.h, 'pipe'),
    LANES,
    C1,
    C2,
    BROKEN,
    PIPE_RIDE,
    RING,
    WS_RAILS,
    CLOCK,
    SCR_HEAD,
    SCR_RULE,
    OLD_LINES,
    SLOT,
    KAFKA_D: capsule(KAFKA.x, KAFKA.y, KAFKA.w, KAFKA.h, 'kafka'),
    KAFKA_LBL,
    KAFKA_SQ,
    TO_KAFKA,
    PULL,
    PULL_LBL,
    TO_DB,
    CYL,
    DB_LBL,
    SAVED,
    TO_API,
    API_DB,
    GET_LBL,
    CORR_LBL,
    PIPE_LBL,
    DISC_LBL,
    PUB_LBL,
    LOST_LBL,
    GUAR,
    CAPTION_TOP: ph ? 922 : 652,
  };
};

export type Geo = ReturnType<typeof build>;
export const LAYOUTS: Record<Layout, Geo> = {wide: build('wide'), phone: build('phone')};
