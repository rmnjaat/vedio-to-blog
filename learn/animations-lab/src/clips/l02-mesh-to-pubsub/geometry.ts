// Clip-local geometry for l02-mesh-to-pubsub: one layout per composition ('wide' 1200×800, 'phone' 720×1010),
// built once at module load (seeded hand paths, stable across frames). Glyphs follow lectures/lec02/lesson/figures.md §0:
// edge server = chamfered box + two-prong plug mark; users = mono letters on WS stubs (two thin rails, no head);
// tcp link = one plain line, no head; real-time pub/sub = a pipe with empty dotted lanes; slots = small boxes.
import {chevron, endDir, handLine, serverBox, type Pt} from '../../lib/hand';
import {typeFor, type Layout} from '../../lib/tokens';
import {LINKS, META} from './timeline';

const f = (n: number) => Math.round(n * 10) / 10;
const cont = (a: Pt, b: Pt, seed: string) => handLine(a, b, seed).replace(/^M [^C]+/, '');

/** Pipe with round ends, horizontal or vertical (x, y = top-left). */
const pipe = (x: number, y: number, w: number, h: number, seed: string) => {
  if (w >= h) {
    const r = h / 2;
    return (
      `M ${f(x + r)} ${f(y)} ` +
      cont([x + r, y], [x + w - r, y], seed + 't') +
      ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + w - r)} ${f(y + h)} ` +
      cont([x + w - r, y + h], [x + r, y + h], seed + 'b') +
      ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + r)} ${f(y)} Z`
    );
  }
  const r = w / 2;
  return (
    `M ${f(x + w)} ${f(y + r)} ` +
    cont([x + w, y + r], [x + w, y + h - r], seed + 'r') +
    ` A ${f(r)} ${f(r)} 0 0 1 ${f(x)} ${f(y + h - r)} ` +
    cont([x, y + h - r], [x, y + r], seed + 'l') +
    ` A ${f(r)} ${f(r)} 0 0 1 ${f(x + w)} ${f(y + r)} Z`
  );
};

const straight = (pts: Pt[]) => 'M ' + pts.map((p) => `${f(p[0])} ${f(p[1])}`).join(' L ');
const plen = (pts: Pt[]) => pts.slice(1).reduce((s, p, i) => s + Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]), 0);

type User = {name: string; inner: Pt; outer: Pt; label: Pt; anchor: 'start' | 'middle' | 'end'};

const build = (layout: Layout) => {
  const ph = layout === 'phone';
  const W = ph ? META.phone.width : META.width;
  const H = ph ? META.phone.height : META.height;
  const TY = typeFor(layout);
  const BOX = ph ? {w: 160, h: 60} : {w: 150, h: 70};
  // ws1, ws2, ws3, ws4, ws5
  const C: Pt[] = ph
    ? [
        [115, 250],
        [605, 250],
        [605, 470],
        [115, 470],
        [360, 640],
      ]
    : [
        [270, 160],
        [930, 160],
        [1060, 365],
        [140, 365],
        [600, 455],
      ];
  const box = (i: number) => ({x: C[i][0] - BOX.w / 2, y: C[i][1] - BOX.h / 2, w: BOX.w, h: BOX.h});
  const SERVERS = C.map((c, i) => {
    const b = box(i);
    const r = b.x + b.w;
    const s = ph ? 9 : 10;
    return {
      c,
      b,
      d: serverBox(b.x, b.y, b.w, b.h, `ws${i + 1}`),
      plug: `${handLine([r - 2.4 * s, b.y], [r - 2.4 * s, b.y - s], `plug${i}a`)} ${handLine([r - 1.3 * s, b.y], [r - 1.3 * s, b.y - s], `plug${i}b`)}`,
      label: [c[0], c[1] + TY.mono * 0.35] as Pt,
    };
  });

  // users: letters on WS stubs (board D-05: B, A above ws1, C, D at its left; E above ws2; F below ws3)
  const users: User[] = ph
    ? [
        ...['A', 'B', 'C', 'D'].map((n, k): User => {
          const x = 48 + 34 * k;
          return {name: n, inner: [x, 220], outer: [x, 182], label: [x, 168], anchor: 'middle'};
        }),
        {name: 'E', inner: [605, 220], outer: [605, 182], label: [605, 168], anchor: 'middle'},
        {name: 'F', inner: [605, 500], outer: [605, 536], label: [605, 572], anchor: 'middle'},
      ]
    : [
        {name: 'B', inner: [225, 125], outer: [225, 78], label: [225, 64], anchor: 'middle'},
        {name: 'A', inner: [285, 125], outer: [285, 78], label: [285, 64], anchor: 'middle'},
        {name: 'C', inner: [195, 145], outer: [148, 145], label: [130, 159], anchor: 'end'},
        {name: 'D', inner: [195, 178], outer: [148, 178], label: [130, 192], anchor: 'end'},
        {name: 'E', inner: [930, 125], outer: [930, 78], label: [930, 64], anchor: 'middle'},
        {name: 'F', inner: [1060, 400], outer: [1060, 444], label: [1060, 484], anchor: 'middle'},
      ];
  const GAP = ph ? 5 : 6;
  const USERS = users.map((u, k) => {
    const len = Math.hypot(u.outer[0] - u.inner[0], u.outer[1] - u.inner[1]) || 1;
    const nx = (-(u.outer[1] - u.inner[1]) / len) * (GAP / 2);
    const ny = ((u.outer[0] - u.inner[0]) / len) * (GAP / 2);
    return {
      ...u,
      rails: [
        handLine([u.inner[0] + nx, u.inner[1] + ny], [u.outer[0] + nx, u.outer[1] + ny], `u${k}r1`),
        handLine([u.inner[0] - nx, u.inner[1] - ny], [u.outer[0] - nx, u.outer[1] - ny], `u${k}r2`),
      ],
      down: straight([u.outer, u.inner]), // a message from the user to the server
      up: straight([u.inner, u.outer]), // a message from the server to the user
    };
  });
  const U = (n: string) => USERS.find((u) => u.name === n)!;

  // mesh links, centre to centre (the boxes, drawn on top, hide the ends)
  const LINK_D = LINKS.map((l, k) => handLine(C[l.a], C[l.b], `tcp${k}`));

  // the pub/sub pipe and one connector per server (server -> pipe wall: the server opens the connection)
  const P = ph ? {x: 335, y: 200, w: 50, h: 360} : {x: 110, y: 245, w: 980, h: 40};
  const PIPE_D = pipe(P.x, P.y, P.w, P.h, 'pipe');
  const LANES = ph
    ? [handLine([352, 226], [352, 534], 'lane1'), handLine([368, 226], [368, 534], 'lane2')]
    : [handLine([140, 259], [1060, 259], 'lane1'), handLine([140, 271], [1060, 271], 'lane2')];
  // connector end points [server edge, pipe wall]
  const EL: [Pt, Pt][] = ph
    ? [
        [[195, 250], [335, 250]],
        [[525, 250], [385, 250]],
        [[525, 470], [385, 470]],
        [[195, 470], [335, 470]],
        [[360, 610], [360, 560]],
      ]
    : [
        [[270, 195], [270, 245]],
        [[930, 195], [930, 245]],
        [[1060, 330], [1060, 285]],
        [[140, 330], [140, 285]],
        [[600, 420], [600, 285]],
      ];
  const HS = ph ? 14 : 16;
  const ELBOWS = EL.map(([s, w], i) => {
    const out = handLine(s, w, `el${i}`); // server -> pipe
    const back = handLine(w, s, `elb${i}`); // pipe -> server (the push re-ink)
    const [ux, uy] = endDir([s, w]);
    return {
      d: out,
      back,
      headPipe: chevron(w, ux, uy, HS, `elh${i}`),
      headServer: chevron(s, -ux, -uy, HS, `els${i}`),
    };
  });
  // the message's route through the pipe: from where ws1's connector meets the pipe's centre line
  const PUB: Pt = ph ? [360, 250] : [270, 265];
  const PUSH = [1, 2, 3, 4].map((i) => {
    const [s, w] = EL[i];
    const pts: Pt[] = ph
      ? i === 1
        ? [PUB, s]
        : i === 4
          ? [PUB, [360, 560], s]
          : [PUB, [360, w[1]], s]
      : [PUB, [w[0], 265], s];
    const total = plen(pts);
    const conn = Math.hypot(s[0] - w[0], s[1] - w[1]);
    return {i, d: straight(pts), f0: (total - conn) / total};
  });

  // ws1's slot bar (Fig 8·c): 4 user slots, cap tick, then peer slots
  const BAR = ph
    ? {x0: 100, step: 58, w: 50, y: 752, h: 48, lbl: [30, 786] as Pt, total: [30, 852] as Pt, note: [212, 852] as Pt, toyY: 728}
    : {x0: 140, step: 70, w: 60, y: 546, h: 54, lbl: [40, 586] as Pt, total: [745, 568] as Pt, note: [745, 621] as Pt, toyY: 528};
  // the cap tick sits in its own gap, clear of D and of the first peer slot (as SlotStrip in fig-8a draws it)
  const CLEAR = ph ? 12 : 14;
  const tickX = BAR.x0 + 3 * BAR.step + BAR.w + CLEAR;
  const slotX = (k: number) => BAR.x0 + k * BAR.step + (k >= 4 ? 2 * CLEAR - (BAR.step - BAR.w) : 0);
  const SLOTS = Array.from({length: 8}, (_, k) => ({
    x: slotX(k),
    d: serverBox(slotX(k), BAR.y, BAR.w, BAR.h, `slot${k}`),
  }));
  const TICK_D = handLine([tickX, BAR.y - (ph ? 6 : 12)], [tickX, BAR.y + BAR.h + 12], 'cap');

  return {
    ph,
    W,
    H,
    TY,
    SERVERS,
    USERS,
    U,
    LINK_D,
    TCP_LBL: (ph ? [360, 236] : [600, 210]) as Pt,
    COUNTER: ph ? {x: 250, numX: 418, y: 54, size: 40} : {x: 498, numX: 700, y: 58, size: 48},
    NOTE: (ph ? [360, 104] : [615, 106]) as Pt,
    PIPE_D,
    LANES,
    ELBOWS,
    PUSH,
    PIPE_LBL: ph
      ? {redis: [360, 140] as Pt, rt: [360, 186] as Pt, anchor: 'middle' as const}
      : {redis: [330, 234] as Pt, rt: [470, 234] as Pt, anchor: 'start' as const},
    KEEPS: (ph ? [30, 655] : [680, 334]) as Pt,
    ILLUS: (ph ? [456, 655] : [690, 498]) as Pt,
    TICKS: {E: (ph ? [640, 158] : [966, 52]) as Pt, F: (ph ? [640, 562] : [1096, 474]) as Pt},
    BAR,
    SLOTS,
    TICK_D,
    TICK_X: tickX,
    HS,
    PKT: ph ? 15 : 17,
    CAPTION_TOP: ph ? 880 : 652,
  };
};

export const LAYOUTS = {wide: build('wide'), phone: build('phone')};
export type Geo = ReturnType<typeof build>;
