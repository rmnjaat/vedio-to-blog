// Clip l02-three-ways-to-persist — "One message, three guarantees": saved then shown (1, Slack as the instructor's
// hypothesis), shown then saved after a lag (2, a hypothetical WhatsApp-like app), shown and never saved (3, Zoom
// chat by default; a rejoin shows no history); then B reloads from the DB inside path 2's lag window, and after the
// worker's write a reload finds it.
// Storyboard: lectures/lec02/animations/l02-three-ways-to-persist/storyboard.{yaml,md}.
// Ledger: L-0204, L-0206, L-0209, L-0210, L-0214, L-0218, L-0219, L-0220, L-0221, L-0389, L-0390.
// Frame 0 = Fig 7·c's phone form (three paths, each with only its own parts); the last frame is the poster.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {cylinder, serverBox, type Pt} from '../../lib/hand';
import {PAST, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, typeFor, type Layout, type ThemeName} from '../../lib/tokens';
import {arrow, capsule, chamferBox, cross, plug, tick, wsLine} from './glyphs';
import {BEAT, CAPTIONS, EV, META} from './timeline';

export type ThreeWaysToPersistProps = {theme: ThemeName; layout?: Layout};

type Arrow = {d: string; head: string};
type WS = {d: string; rails: string[]};
type Txt = {x: number; y: number};
type Lane = {
  badge: Txt & {r: number};
  title: Txt & {text: string};
  sub: Txt & {text: string};
  A: Txt;
  http?: Arrow; // lane 1: A -> api
  wsIn?: WS; // lanes 2, 3: A -> edge
  inLabel: Txt & {text: string; anchor: 'start' | 'middle' | 'end'};
  api?: {d: string; l: Txt};
  apiDb?: Arrow;
  apiEdge?: Arrow;
  db?: {cyl: ReturnType<typeof cylinder>; l: Txt; ok: Txt};
  edge: {d: string; l: Txt; plug: string};
  out: WS;
  outLabel?: Txt;
  screen: {d: string; strip: string; B: Txt; refresh: Txt; bubble: string; lines: (Txt & {text: string})[]};
  fetch?: Arrow;
  kafka?: {d: string; l: Txt; sq: Txt};
  edgeKafka?: Arrow;
  worker?: {d: string; l: Txt};
  pull?: Arrow;
  workerDb?: Arrow;
  lag?: {label: Txt; note: Txt; bar: string; ends: string; tick: string; endMark: string};
  order: {y: number; w1: number; arrow: Arrow; w2: number};
  result: {y: number; mark: number; text: number};
  sep?: string;
};

const TITLES = [
  {n: 1, title: 'Slack', sub: '(a hypothesis)'},
  {n: 2, title: 'WhatsApp-like', sub: '(hypothetical)'},
  {n: 3, title: 'Zoom chat', sub: '(by default)'},
];

// ---------- wide: three columns, flow top -> bottom (1200×800) ----------
// Column x: path 1 0-380, path 2 380-850, path 3 850-1200. Spine (A, edge, B's screen) at column x + 120.
const buildWide = (): Lane[] => {
  const X0 = [0, 380, 850];
  const hs = 16;
  const gap = 8;
  return X0.map((x0, i) => {
    const s = x0 + 120; // spine
    const seed = `w${i}`;
    const lane: Lane = {
      badge: {x: x0 + 36, y: 40, r: 22},
      title: {x: x0 + 70, y: 54, text: TITLES[i].title},
      sub: {x: x0 + 22, y: 100, text: TITLES[i].sub},
      A: {x: s, y: 152},
      inLabel: i === 0 ? {x: s - 14, y: 196, text: 'HTTP', anchor: 'end'} : {x: s - 16, y: 244, text: 'WS', anchor: 'end'},
      edge: {d: serverBox(s - 78, 296, 156, 54, seed + 'edge'), l: {x: s, y: 336}, plug: plug(s + 78, 296, 12, seed + 'plug')},
      out: wsLine([s, 350], [s, 396], seed + 'out', gap),
      outLabel: i === 0 ? {x: s - 14, y: 388} : undefined,
      screen: {
        d: serverBox(x0 + 12, 396, 220, 146, seed + 'scr'),
        strip: `M ${x0 + 14} 440 L ${x0 + 230} 440`,
        B: {x: x0 + 28, y: 430},
        refresh: {x: x0 + 222, y: 430},
        bubble: chamferBox(x0 + 24, 450, 196, 84, 14, seed + 'bub'),
        lines: [
          {x: x0 + 40, y: 484, text: 'standup'},
          {x: x0 + 40, y: 522, text: 'in 5'},
        ],
      },
      order: {y: 588, w1: x0 + 14, arrow: arrow([[x0 + 150, 576], [x0 + 194, 576]], seed + 'ord', 12), w2: x0 + 208},
      result: {y: 634, mark: x0 + 14, text: x0 + 54},
      sep: i > 0 ? `M ${x0} 18 L ${x0} 628` : undefined,
    };
    if (i === 0) {
      lane.http = arrow([[s, 166], [s, 206]], seed + 'http', hs);
      lane.api = {d: serverBox(s - 50, 208, 100, 52, seed + 'api'), l: {x: s, y: 247}};
      lane.apiDb = arrow([[s + 50, 236], [x0 + 234, 236]], seed + 'apidb', hs);
      lane.db = {cyl: cylinder(x0 + 282, 208, 46, 11, 52, seed + 'db'), l: {x: x0 + 282, y: 252}, ok: {x: x0 + 338, y: 214}};
      lane.apiEdge = arrow([[s, 260], [s, 294]], seed + 'apiedge', hs);
      lane.fetch = arrow([[x0 + 232, 470], [x0 + 282, 470], [x0 + 282, 274]], seed + 'fetch', hs);
    } else {
      lane.wsIn = wsLine([s, 166], [s, 296], seed + 'in', gap);
    }
    if (i === 1) {
      // the message square waits at the inlet, left of the label, so the two never touch
      lane.kafka = {d: capsule(x0 + 246, 300, 204, 50, seed + 'kafka'), l: {x: x0 + 368, y: 339}, sq: {x: x0 + 282, y: 325}};
      lane.edgeKafka = arrow([[s + 78, 325], [x0 + 244, 325]], seed + 'ek', hs);
      lane.worker = {d: serverBox(x0 + 250, 382, 190, 50, seed + 'worker'), l: {x: x0 + 345, y: 420}};
      lane.pull = arrow([[x0 + 345, 382], [x0 + 345, 352]], seed + 'pull', 13);
      lane.workerDb = arrow([[x0 + 345, 432], [x0 + 345, 468]], seed + 'wdb', 13);
      lane.db = {cyl: cylinder(x0 + 345, 482, 46, 11, 46, seed + 'db'), l: {x: x0 + 345, y: 522}, ok: {x: x0 + 404, y: 488}};
      lane.fetch = arrow([[x0 + 232, 510], [x0 + 297, 510]], seed + 'fetch', hs);
      const b0 = x0 + 182;
      const b1 = x0 + 452;
      const by = 184;
      lane.lag = {
        label: {x: x0 + 176, y: 152},
        note: {x: x0 + 176, y: 234},
        bar: `M ${b0} ${by} L ${b1} ${by}`,
        ends: `M ${b0} ${by - 11} L ${b0} ${by + 11}`,
        tick: `M ${b0 + 0.42 * (b1 - b0)} ${by - 14} L ${b0 + 0.42 * (b1 - b0)} ${by + 14}`,
        endMark: `M ${b1} ${by - 11} L ${b1} ${by + 11}`,
      };
    }
    return lane;
  });
};

// ---------- phone: three stacked strips, flow left -> right (720×1060) ----------
const buildPhone = (): Lane[] => {
  const P = [8, 318, 698];
  const hs = 13;
  const gap = 7;
  const subX = [156, 290, 223]; // the qualifier follows the title on the same line
  return P.map((p, i) => {
    const seed = `p${i}`;
    const row = i === 0 ? p + 186 : p + 100; // edge row centre
    const scrTop = i === 0 ? p + 150 : p + 58;
    const lane: Lane = {
      badge: {x: 30, y: p + 28, r: 18},
      title: {x: 58, y: p + 38, text: TITLES[i].title},
      sub: {x: subX[i], y: p + 38, text: TITLES[i].sub},
      A: {x: 30, y: i === 0 ? p + 92 : row + 10},
      inLabel: i === 0 ? {x: 100, y: p + 68, text: 'HTTP', anchor: 'middle'} : {x: 86, y: row - 12, text: 'WS', anchor: 'middle'},
      edge: {d: serverBox(120, row - 26, 152, 52, seed + 'edge'), l: {x: 196, y: row + 10}, plug: plug(272, row - 26, 10, seed + 'plug')},
      out: wsLine([272, row], [330, row], seed + 'out', gap),
      outLabel: {x: 301, y: row - 12},
      screen: {
        d: serverBox(330, scrTop, 370, 96, seed + 'scr'),
        strip: `M 332 ${scrTop + 34} L 698 ${scrTop + 34}`,
        B: {x: 346, y: scrTop + 26},
        refresh: {x: 688, y: scrTop + 26},
        bubble: chamferBox(344, scrTop + 42, 262, 46, 12, seed + 'bub'),
        lines: [{x: 358, y: scrTop + 74, text: 'standup in 5'}],
      },
      order: {y: i === 0 ? p + 288 : i === 1 ? p + 360 : p + 200, w1: 24, arrow: arrow([[0, 0], [1, 0]], seed + 'x', 1), w2: 172},
      result: {y: i === 0 ? p + 288 : i === 1 ? p + 360 : p + 200, mark: 396, text: 428},
      sep: i > 0 ? `M 20 ${p - 6} L 700 ${p - 6}` : undefined,
    };
    const oy = lane.order.y - 10;
    lane.order.arrow = arrow([[124, oy], [158, oy]], seed + 'ord', 10);
    if (i === 0) {
      lane.http = arrow([[52, p + 82], [148, p + 82]], seed + 'http', hs);
      lane.api = {d: serverBox(150, p + 58, 92, 48, seed + 'api'), l: {x: 196, y: p + 92}};
      lane.apiDb = arrow([[242, p + 82], [296, p + 82]], seed + 'apidb', hs);
      lane.db = {cyl: cylinder(338, p + 58, 40, 10, 40, seed + 'db'), l: {x: 338, y: p + 98}, ok: {x: 390, y: p + 66}};
      lane.apiEdge = arrow([[196, p + 106], [196, row - 28]], seed + 'apiedge', hs);
      lane.fetch = arrow([[338, scrTop], [338, p + 110]], seed + 'fetch', hs);
    } else {
      lane.wsIn = wsLine([52, row], [120, row], seed + 'in', gap);
    }
    if (i === 1) {
      const r2 = p + 224; // store row centre
      lane.kafka = {d: capsule(112, r2 - 24, 172, 48, seed + 'kafka'), l: {x: 222, y: r2 + 10}, sq: {x: 147, y: r2}};
      lane.edgeKafka = arrow([[196, row + 26], [196, r2 - 26]], seed + 'ek', hs);
      lane.worker = {d: serverBox(330, r2 - 24, 132, 48, seed + 'worker'), l: {x: 396, y: r2 + 10}};
      lane.pull = arrow([[330, r2], [286, r2]], seed + 'pull', hs);
      lane.workerDb = arrow([[462, r2], [520, r2]], seed + 'wdb', hs);
      lane.db = {cyl: cylinder(562, r2 - 18, 40, 10, 38, seed + 'db'), l: {x: 562, y: r2 + 16}, ok: {x: 614, y: r2 - 14}};
      lane.fetch = arrow([[562, scrTop + 96], [562, r2 - 30]], seed + 'fetch', hs);
      const b0 = 140;
      const b1 = 562;
      const by = p + 318;
      lane.lag = {
        label: {x: 130, y: p + 294},
        note: {x: 372, y: p + 294},
        bar: `M ${b0} ${by} L ${b1} ${by}`,
        ends: `M ${b0} ${by - 10} L ${b0} ${by + 10}`,
        tick: `M ${b0 + 0.42 * (b1 - b0)} ${by - 13} L ${b0 + 0.42 * (b1 - b0)} ${by + 13}`,
        endMark: `M ${b1} ${by - 10} L ${b1} ${by + 10}`,
      };
    }
    return lane;
  });
};

const LAYOUTS = {
  wide: {lanes: buildWide(), W: META.width, H: META.height, captionTop: 652},
  phone: {lanes: buildPhone(), W: META.phone.width, H: META.phone.height, captionTop: 930},
};

type Ev = readonly [number, number];

export const ThreeWaysToPersist: React.FC<ThreeWaysToPersistProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const G = LAYOUTS[layout];
  const ph = layout === 'phone';
  const TS = typeFor(layout).label;
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const pr = ph ? 8 : 9;
  const thin = STROKE.thin;
  const mk = ph ? 22 : 26; // ✓ / ✕ size
  const L = G.lanes;

  const r = (e: Ev) => ramp(frame, e[0], e[1]);
  const rm = (e: Ev) => ramp(frame, e[0], e[1], EASE_MOVE);
  /** blue re-ink that fades back to graphite when its beat is over */
  const blueUntil = (at: number) => 1 - ramp(frame, at, 14, EASE_FADE);
  /** opacity through a list of [frame, target] transitions (12 f each) */
  const focus = (steps: [number, number][]) => steps.reduce((o, [at, to]) => o + (to - o) * ramp(frame, at, 12, EASE_FADE), 1);
  const laneO = [
    focus([[BEAT.wa, PAST], [BEAT.refresh, 1], [BEAT.later, PAST], [BEAT.end, 1]]),
    focus([[BEAT.zoom, PAST], [BEAT.refresh, 1]]),
    focus([[BEAT.refresh, PAST], [BEAT.end, 1]]),
  ];

  // ----- small drawing helpers -----
  /** blue re-ink + packet; `persist` leaves the arrow in graphite once drawn (for arrows that are not in frame 0) */
  const ReInk: React.FC<{a: Arrow; e: Ev; until: number; color?: MarkerColor; dash?: string; persist?: boolean}> = ({
    a,
    e,
    until,
    color = 'blue',
    dash,
    persist,
  }) => (
    <>
      {persist ? <Pen d={a.d} head={a.head} progress={r(e)} dash={dash} /> : null}
      <Pen d={a.d} head={a.head} progress={r(e)} color={color} dash={dash} opacity={blueUntil(until)} />
      <Packet d={a.d} progress={rm(e)} color={color} r={pr} />
    </>
  );
  const ReInkWs: React.FC<{w: WS; e: Ev; until: number}> = ({w, e, until}) => (
    <>
      {w.rails.map((d, k) => (
        <Pen key={k} d={d} progress={r(e)} color="blue" width={thin} opacity={blueUntil(until)} />
      ))}
      <Packet d={w.d} progress={rm(e)} color="blue" r={pr} />
    </>
  );
  const Rails: React.FC<{w: WS}> = ({w}) => (
    <>
      {w.rails.map((d, k) => (
        <Ink key={k} d={d} width={thin} />
      ))}
    </>
  );
  const Arr: React.FC<{a: Arrow; dash?: string}> = ({a, dash}) => (
    <>
      <Ink d={a.d} dash={dash} />
      <Ink d={a.head} />
    </>
  );
  const Cyl: React.FC<{c: ReturnType<typeof cylinder>}> = ({c}) => (
    <>
      <path d={c.bodyFill} fill={T.sheet} />
      <Ink d={c.sides} />
      <Ink d={c.front} />
      <Ink d={c.top} fill={T.sheet} />
    </>
  );
  const Bubble: React.FC<{l: Lane; e: Ev; te: Ev; goneAt?: number}> = ({l, e, te, goneAt}) => {
    const o = goneAt === undefined ? 1 : 1 - ramp(frame, goneAt, 10, EASE_FADE);
    if (o <= 0 || frame < e[0]) return null;
    return (
      <g opacity={o}>
        <path d={l.screen.bubble} fill={T.blueWash} opacity={r(e)} />
        <Pen d={l.screen.bubble} progress={r(e)} />
        {l.screen.lines.map((t, k) => (
          <Write key={k} x={t.x} y={t.y} text={t.text} size={TS} variant="mono" progress={ramp(frame, te[0] + k * 8, te[1] - 4)} />
        ))}
      </g>
    );
  };
  const Empty: React.FC<{l: Lane; at: number}> = ({l, at}) => <Pen d={l.screen.bubble} progress={ramp(frame, at + 2, 10)} color="red" dash="12 9" />;

  return (
    <Sheet theme={theme}>
      <Stage title="One message, three guarantees" desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0) ===== */}
        {L.map((l, i) => (
          <g key={`t${i}`}>
            {l.sep ? <Ink d={l.sep} color="ink3" width={thin} dash="6 10" opacity={0.7} /> : null}
            <StepBadge x={l.badge.x} y={l.badge.y} n={i + 1} r={l.badge.r} />
            <Write x={l.title.x} y={l.title.y} text={l.title.text} size={TS} weight={640} />
            <Write x={l.sub.x} y={l.sub.y} text={l.sub.text} size={TS} color="ink2" />
          </g>
        ))}

        {L.map((l, i) => (
          <g key={`l${i}`} opacity={laneO[i]}>
            <Write x={l.A.x} y={l.A.y} text="A" size={TS} variant="mono" anchor={ph ? 'start' : 'middle'} weight={600} />
            {l.http ? <Arr a={l.http} /> : null}
            {l.wsIn ? <Rails w={l.wsIn} /> : null}
            <Write x={l.inLabel.x} y={l.inLabel.y} text={l.inLabel.text} size={TS} variant="mono" color="ink2" anchor={l.inLabel.anchor} />
            {l.api ? (
              <>
                <path d={l.api.d} fill={T.sheet} />
                <Ink d={l.api.d} />
                <Write x={l.api.l.x} y={l.api.l.y} text="api" size={TS} variant="mono" anchor="middle" />
              </>
            ) : null}
            {l.apiDb ? <Arr a={l.apiDb} /> : null}
            {l.apiEdge ? <Arr a={l.apiEdge} /> : null}
            {l.edgeKafka ? <Arr a={l.edgeKafka} dash="10 8" /> : null}
            {l.pull ? <Arr a={l.pull} dash="10 8" /> : null}
            {l.workerDb ? <Arr a={l.workerDb} /> : null}
            {l.db ? (
              <>
                <Cyl c={l.db.cyl} />
                <Write x={l.db.l.x} y={l.db.l.y} text="db" size={TS} variant="mono" anchor="middle" />
              </>
            ) : null}
            <path d={l.edge.d} fill={T.sheet} />
            <Ink d={l.edge.d} />
            <Ink d={l.edge.plug} />
            <Write x={l.edge.l.x} y={l.edge.l.y} text="edge" size={TS} variant="mono" anchor="middle" />
            {l.kafka ? (
              <>
                <path d={l.kafka.d} fill={T.sheet} />
                <Ink d={l.kafka.d} />
                <Write x={l.kafka.l.x} y={l.kafka.l.y} text="kafka" size={TS} variant="mono" anchor="middle" />
              </>
            ) : null}
            {l.worker ? (
              <>
                <path d={l.worker.d} fill={T.sheet} />
                <Ink d={l.worker.d} />
                <Write x={l.worker.l.x} y={l.worker.l.y} text="worker" size={TS} variant="mono" anchor="middle" />
              </>
            ) : null}
            <Rails w={l.out} />
            {l.outLabel ? <Write x={l.outLabel.x} y={l.outLabel.y} text="WS" size={TS} variant="mono" color="ink2" anchor={ph ? 'middle' : 'end'} /> : null}
            <path d={l.screen.d} fill={T.sheet} />
            <Ink d={l.screen.d} />
            <Ink d={l.screen.strip} width={thin} color="ink2" />
            <Write x={l.screen.B.x} y={l.screen.B.y} text="B" size={TS} variant="mono" weight={600} />
          </g>
        ))}

        {/* ===== path 1: saved, then shown ===== */}
        <g opacity={laneO[0]}>
          <ReInk a={L[0].http!} e={EV.in1} until={BEAT.wa} />
          <ReInk a={L[0].apiDb!} e={EV.apiDb} until={BEAT.wa} />
          <Pen d={tick(L[0].db!.ok.x, L[0].db!.ok.y, mk, 'ok1')} progress={r(EV.dbOk1)} color="green" width={STROKE.ink + 0.8} />
          <ReInk a={L[0].apiEdge!} e={EV.apiEdge} until={BEAT.wa} />
          <ReInkWs w={L[0].out} e={EV.out1} until={BEAT.wa} />
          <Bubble l={L[0]} e={EV.bubble1} te={EV.text1} />
          <Write x={L[0].order.w1} y={L[0].order.y} text="saved" size={TS} color="green" weight={600} progress={r(EV.saved1)} />
          <Pen d={L[0].order.arrow.d} head={L[0].order.arrow.head} progress={r(EV.arrow1)} color="ink2" width={thin + 0.6} />
          <Write x={L[0].order.w2} y={L[0].order.y} text="shown" size={TS} weight={600} progress={r(EV.shown1)} />
          {/* reload: B reads the db, the message is still there */}
          <Write x={L[0].screen.refresh.x} y={L[0].screen.refresh.y} text="reload" size={TS} color="ink2" anchor="end" progress={r(EV.refreshLbl)} />
          <ReInk a={L[0].fetch!} e={EV.fetch1} until={EV.fetch2[0]} persist />
          <Packet d={reversePath(L[0].fetch!.d)} progress={rm(EV.back1)} color="green" r={pr} />
          <Pen d={tick(L[0].result.mark, L[0].result.y, mk, 'res1')} progress={ramp(frame, EV.ok1[0], 8)} color="green" width={STROKE.ink + 0.8} />
          <Write x={L[0].result.text} y={L[0].result.y} text="still there" size={TS} color="green" weight={600} progress={ramp(frame, EV.ok1[0] + 4, EV.ok1[1] - 4)} />
        </g>

        {/* ===== path 2: shown at once, saved later ===== */}
        <g opacity={laneO[1]}>
          <ReInkWs w={L[1].wsIn!} e={EV.in2} until={BEAT.zoom} />
          <ReInkWs w={L[1].out} e={EV.out2} until={BEAT.zoom} />
          <Bubble l={L[1]} e={EV.bubble2} te={EV.text2} goneAt={EV.gone2[0]} />
          <Write x={L[1].order.w1} y={L[1].order.y} text="shown" size={TS} weight={600} progress={r(EV.shown2)} />
          <ReInk a={L[1].edgeKafka!} e={EV.edgeKafka} until={BEAT.zoom} dash="10 8" />
          {frame >= EV.square[0] ? (
            <g opacity={ramp(frame, EV.square[0], EV.square[1], EASE_FADE)}>
              <rect x={L[1].kafka!.sq.x - 9} y={L[1].kafka!.sq.y - 9} width={18} height={18} fill={T.ink} />
              <rect x={L[1].kafka!.sq.x - 9} y={L[1].kafka!.sq.y - 9} width={18} height={18} fill={T.blue} opacity={blueUntil(BEAT.zoom)} />
            </g>
          ) : null}
          <Write x={L[1].lag!.label.x} y={L[1].lag!.label.y} text="≈ 10 min lag" size={TS} weight={600} progress={r(EV.lagLabel)} />
          <Pen d={L[1].lag!.bar} progress={r(EV.lagBar)} color="ink2" width={STROKE.ink} />
          <Ink d={L[1].lag!.ends} color="ink2" width={STROKE.ink} opacity={ramp(frame, EV.lagBar[0], 6, EASE_FADE)} />
          <Ink d={L[1].lag!.endMark} color="ink2" width={STROKE.ink} opacity={ramp(frame, EV.lagBar[0] + EV.lagBar[1] - 4, 6, EASE_FADE) * (1 - ramp(frame, EV.endTick[0], EV.endTick[1], EASE_FADE))} />
          <Write x={L[1].lag!.note.x} y={L[1].lag!.note.y} text="not to scale" size={TS} color="ink2" progress={r(EV.lagNote)} />
          {/* refresh inside the window: the db does not have it yet */}
          <Ink d={L[1].lag!.tick} color="red" width={STROKE.ink + 1.4} opacity={ramp(frame, EV.tick[0], EV.tick[1], EASE_FADE)} />
          <Write x={L[1].screen.refresh.x} y={L[1].screen.refresh.y} text="reload" size={TS} color="ink2" anchor="end" progress={r(EV.refreshLbl)} />
          <ReInk a={L[1].fetch!} e={EV.fetch2} until={BEAT.later} persist />
          <Packet d={reversePath(L[1].fetch!.d)} progress={rm(EV.back2)} color="red" r={pr} />
          <g opacity={1 - ramp(frame, EV.bubble2b[0], 10, EASE_FADE)}>
            <Empty l={L[1]} at={EV.gone2[0]} />
          </g>
          <Pen d={cross(L[1].result.mark, L[1].result.y, mk, 'res2')} progress={ramp(frame, EV.no2[0], 8)} color="red" width={STROKE.ink + 0.8} />
          <Write x={L[1].result.text} y={L[1].result.y} text="gone in the lag" size={TS} color="red" weight={600} progress={ramp(frame, EV.no2[0] + 4, EV.no2[1] - 4)} />
          {/* later: the worker pulls from kafka and writes the db */}
          <Pen d={L[1].pull!.d} head={L[1].pull!.head} progress={ramp(frame, EV.pull[0], 10)} color="blue" dash="10 8" opacity={blueUntil(BEAT.end)} />
          <Packet d={reversePath(L[1].pull!.d)} progress={ramp(frame, EV.pull[0] + 8, EV.pull[1] - 8, EASE_MOVE)} color="blue" r={pr} />
          <ReInk a={L[1].workerDb!} e={EV.workerDb} until={BEAT.end} />
          <Pen d={tick(L[1].db!.ok.x, L[1].db!.ok.y, mk, 'ok2')} progress={r(EV.dbOk2)} color="green" width={STROKE.ink + 0.8} />
          <Ink d={L[1].lag!.endMark} color="green" width={STROKE.ink + 1.4} opacity={ramp(frame, EV.endTick[0], EV.endTick[1], EASE_FADE)} />
          <Pen d={L[1].order.arrow.d} head={L[1].order.arrow.head} progress={r(EV.arrow2)} color="ink2" width={thin + 0.6} />
          <Write x={L[1].order.w2} y={L[1].order.y} text="saved" size={TS} color="green" weight={600} progress={r(EV.saved2)} />
          {/* after the save: a reload finds it */}
          <ReInk a={L[1].fetch!} e={EV.refetch2} until={BEAT.end} />
          <Packet d={reversePath(L[1].fetch!.d)} progress={rm(EV.back2b)} color="green" r={pr} />
          <Bubble l={L[1]} e={EV.bubble2b} te={EV.text2b} />
        </g>

        {/* ===== path 3: shown only ===== */}
        <g opacity={laneO[2]}>
          <ReInkWs w={L[2].wsIn!} e={EV.in3} until={BEAT.refresh} />
          <ReInkWs w={L[2].out} e={EV.out3} until={BEAT.refresh} />
          <Bubble l={L[2]} e={EV.bubble3} te={EV.text3} goneAt={EV.gone3[0]} />
          <Write x={L[2].order.w1} y={L[2].order.y} text="shown only" size={TS} weight={600} progress={r(EV.shown3)} />
          <Write x={L[2].screen.refresh.x} y={L[2].screen.refresh.y} text="rejoin" size={TS} color="ink2" anchor="end" progress={r(EV.rejoin)} />
          <Empty l={L[2]} at={EV.gone3[0]} />
          <Pen d={cross(L[2].result.mark, L[2].result.y, mk, 'res3')} progress={ramp(frame, EV.no3[0], 8)} color="red" width={STROKE.ink + 0.8} />
          <Write x={L[2].result.text} y={L[2].result.y} text="history gone" size={TS} color="red" weight={600} progress={ramp(frame, EV.no3[0] + 4, EV.no3[1] - 4)} />
        </g>
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.captionTop} layout={layout} />
    </Sheet>
  );
};

export default ThreeWaysToPersist;

// geometry sanity: keep Pt referenced for helper signatures
export type {Pt};
