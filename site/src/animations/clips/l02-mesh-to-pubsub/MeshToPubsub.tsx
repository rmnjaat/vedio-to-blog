// Clip l02-mesh-to-pubsub — "Mesh to Pub/Sub".
// Storyboard: lectures/lec02/animations/l02-mesh-to-pubsub/storyboard.{yaml,md}.
// Ledger: L-0265, L-0276, L-0277, L-0278, L-0280, L-0281, L-0282, L-0283.
// Frame 0 = Fig 8·b step 1's end state (ws1 with A-D, one tcp link to ws2 with E) + Fig 8·c's slot bar; servers arrive
// and link to every other (links 1 -> 3 -> 6 -> 10), then the links collapse into one pub/sub pipe; the last frame is
// the annotated poster. Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×1010, portrait re-flow).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write, useTheme, type MarkerColor} from '../../lib/primitives';
import {FONT, STROKE, THEMES, type Layout, type ThemeName} from '../../lib/tokens';
import {CAPTIONS, ELBOWS, EV, LINKS, META, end} from './timeline';
import {LAYOUTS} from './geometry';

export type MeshToPubsubProps = {theme: ThemeName; layout?: Layout};

type Step = {at: number; text: string};
/** A value that is rewritten in place: the old text fades over 6 f, the new one is written on. */
const stepped = (frame: number, list: Step[], dur: number) => {
  let i = -1;
  for (let k = 0; k < list.length; k++) if (list[k].at <= frame) i = k;
  if (i < 0 || !list[i].text) return null;
  const cur = list[i];
  const nextAt = list[i + 1]?.at ?? Infinity;
  return {
    text: cur.text,
    prog: cur.at <= 0 ? 1 : ramp(frame, cur.at, dur),
    o: nextAt === Infinity ? 1 : 1 - ramp(frame, nextAt - 6, 6, EASE_FADE),
  };
};

// ---------- what each rewritten label says, and when ----------
const COUNT: Step[] = [
  {at: 0, text: '1'},
  ...LINKS.slice(1).map((l, k) => ({at: end(l.ev), text: String(k + 2)})),
  {at: end(EV.erase), text: '0'},
  ...ELBOWS.map((e, k) => ({at: end(e), text: String(k + 1)})),
];
const TOTAL: Step[] = [
  {at: 0, text: '4 + 1 = 5'},
  {at: end(EV.l31), text: '4 + 2 = 6'},
  {at: end(EV.l41), text: '4 + 3 = 7'},
  {at: end(EV.l51), text: '4 + 4 = 8'},
  {at: EV.erase[0], text: ''},
  {at: end(EV.el1), text: '4 + 1 = 5'},
];
const WASTE: Step[] = [
  {at: EV.waste[0], text: '3 serve no user'},
  {at: end(EV.l51), text: '4 serve no user'},
  {at: EV.erase[0], text: ''},
];
const TOP_NOTE: Step[] = [
  {at: EV.meshNote[0], text: 'every server to every other'},
  {at: EV.erase[0], text: ''},
  {at: EV.oneNote[0], text: 'one per server (mesh: 10)'},
];
const SERVER_IN = [null, null, EV.ws3, EV.ws4, EV.ws5] as const;
const SERVER_LBL = [null, null, EV.ws3Lbl, EV.ws4Lbl, EV.ws5Lbl] as const;
// peer slots 5..8 on ws1's bar: the frame each one is taken (its tcp link to ws1 lands)
const PEER_SLOT_AT = [0, end(EV.l31), end(EV.l41), end(EV.l51)];

export const MeshToPubsub: React.FC<MeshToPubsubProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const MS = G.TY.mono;

  const meshO = 1 - ramp(frame, ...EV.erase, EASE_FADE); // the mesh and its red slots go when the pipe replaces them
  const serverP = (i: number) => (SERVER_IN[i] ? ramp(frame, ...SERVER_IN[i]!) : 1);
  const count = stepped(frame, COUNT, 10);
  const total = stepped(frame, TOTAL, 12);
  const waste = stepped(frame, WASTE, 20);
  const topNote = stepped(frame, TOP_NOTE, 22);

  // B5 message progress
  const mv = (s: readonly [number, number]) => ramp(frame, s[0], s[1], EASE_MOVE);
  const sendP = mv(EV.send);
  const localP = mv(EV.local);
  const pubP = mv(EV.pub);
  const pushP = mv(EV.push);
  const deliverP = mv(EV.deliver);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== mesh: tcp links, centre to centre, under the boxes ===== */}
        {LINKS.map((l, k) => (
          <Pen key={k} d={G.LINK_D[k]} progress={k === 0 ? 1 : ramp(frame, ...l.ev)} opacity={meshO} />
        ))}
        <Write x={G.TCP_LBL[0]} y={G.TCP_LBL[1]} text="tcp" size={MS} variant="mono" color="ink2" anchor="middle" opacity={meshO} />

        {/* ===== the real-time pub/sub pipe and one connector per server ===== */}
        <path d={G.PIPE_D} fill={T.sheet} opacity={ramp(frame, end(EV.pipe) - 6, 6, EASE_FADE)} />
        {G.LANES.map((d, k) => (
          <Ink key={k} d={d} color="ink3" width={STROKE.thin} dash="2 9" opacity={ramp(frame, end(EV.pipe) - 4, 8, EASE_FADE)} />
        ))}
        <Pen d={G.PIPE_D} progress={ramp(frame, ...EV.pipe)} />
        {G.ELBOWS.map((e, i) => (
          <Pen key={i} d={e.d} progress={ramp(frame, ...ELBOWS[i])} />
        ))}
        <Write x={G.PIPE_LBL.redis[0]} y={G.PIPE_LBL.redis[1]} text="redis" size={MS} variant="mono" anchor={G.PIPE_LBL.anchor} progress={ramp(frame, ...EV.redisLbl)} />
        <Write x={G.PIPE_LBL.rt[0]} y={G.PIPE_LBL.rt[1]} text="real-time pub/sub" size={TS} anchor={G.PIPE_LBL.anchor} progress={ramp(frame, ...EV.pipeLbl)} />

        {/* ===== users on their WS stubs ===== */}
        {G.USERS.map((u) => {
          const p = u.name === 'F' ? ramp(frame, ...EV.ws3User) : 1;
          return (
            <g key={u.name}>
              {u.rails.map((d, k) => (
                <Pen key={k} d={d} progress={p} width={STROKE.thin} />
              ))}
              <Write x={u.label[0]} y={u.label[1]} text={u.name} size={MS} variant="mono" anchor={u.anchor} progress={u.name === 'F' ? ramp(frame, EV.ws3User[0] + 6, 12) : 1} />
            </g>
          );
        })}

        {/* ===== edge servers ===== */}
        {G.SERVERS.map((s, i) => {
          const p = serverP(i);
          if (p <= 0) return null;
          return (
            <g key={i}>
              <path d={s.d} fill={T.sheet} />
              <Pen d={s.d} progress={p} />
              <Pen d={s.plug} progress={ramp(frame, (SERVER_IN[i]?.[0] ?? -20) + 14, 8)} />
              <Write x={s.label[0]} y={s.label[1]} text={`ws${i + 1}`} size={MS} variant="mono" anchor="middle" progress={SERVER_LBL[i] ? ramp(frame, ...SERVER_LBL[i]!) : 1} />
            </g>
          );
        })}
        <Write x={G.ILLUS[0]} y={G.ILLUS[1]} text="illustrative" size={TS} color="ink2" progress={ramp(frame, ...EV.illus)} />

        {/* ===== B5: A's message — local delivery, publish once, the push ===== */}
        <Route d={G.U('A').down} p={sendP} pkt={G.PKT} />
        {['B', 'C', 'D'].map((n) => (
          <Route key={n} d={G.U(n).up} p={localP} pkt={G.PKT} />
        ))}
        <Route d={G.ELBOWS[0].d} p={pubP} pkt={G.PKT} head={G.ELBOWS[0].headPipe} />
        {G.PUSH.map((q) => {
          const penP = Math.max(0, (pushP - q.f0) / (1 - q.f0));
          return (
            <g key={q.i}>
              <Pen d={G.ELBOWS[q.i].back} progress={penP} color="blue" width={STROKE.ink + 1} head={G.ELBOWS[q.i].headServer} />
              <Msg d={q.d} p={pushP} size={G.PKT} />
            </g>
          );
        })}
        {['E', 'F'].map((n) => (
          <Route key={n} d={G.U(n).up} p={deliverP} pkt={G.PKT} />
        ))}
        <Tick x={G.TICKS.E[0]} y={G.TICKS.E[1]} o={ramp(frame, end(EV.deliver), 8, EASE_FADE)} s={G.ph ? 0.8 : 1} />
        <Tick x={G.TICKS.F[0]} y={G.TICKS.F[1]} o={ramp(frame, end(EV.deliver), 8, EASE_FADE)} s={G.ph ? 0.8 : 1} />
        <Write x={G.KEEPS[0]} y={G.KEEPS[1]} text="keeps nothing" size={TS} progress={ramp(frame, ...EV.keeps)} weight={600} />

        {/* ===== counter + its note line ===== */}
        <Write x={G.COUNTER.x} y={G.COUNTER.y} text="links:" size={G.COUNTER.size} variant="mono" />
        {count ? (
          <Write x={G.COUNTER.numX} y={G.COUNTER.y} text={count.text} size={G.COUNTER.size} variant="mono" progress={count.prog} opacity={count.o} weight={600} />
        ) : null}
        {topNote ? <Write x={G.NOTE[0]} y={G.NOTE[1]} text={topNote.text} size={TS} anchor="middle" progress={topNote.prog} opacity={topNote.o} /> : null}

        {/* ===== ws1's connection slots (Fig 8·c) ===== */}
        <Write x={G.BAR.lbl[0]} y={G.BAR.lbl[1]} text="ws1" size={MS} variant="mono" />
        {G.SLOTS.map((s, k) => {
          if (k < 4) return <Slot key={k} d={s.d} color="blue" o={1} text={'ABCD'[k]} x={s.x + G.BAR.w / 2} y={G.BAR.y + G.BAR.h / 2 + MS * 0.36} size={MS} />;
          const at = PEER_SLOT_AT[k - 4];
          const red = (at <= 0 ? 1 : ramp(frame, at, 8, EASE_FADE)) * meshO;
          return (
            <g key={k}>
              <Slot d={s.d} color="red" o={red} />
              {k === 4 ? <Slot d={s.d} color="ink2" o={ramp(frame, end(EV.el1), 8, EASE_FADE)} /> : null}
            </g>
          );
        })}
        <Ink d={G.TICK_D} color="red" width={STROKE.ink + 0.6} />
        <Write x={G.TICK_X} y={G.BAR.toyY} text="toy limit" size={TS} color="ink2" anchor="middle" />
        {total ? <Write x={G.BAR.total[0]} y={G.BAR.total[1]} text={total.text} size={MS} variant="mono" progress={total.prog} opacity={total.o} /> : null}
        {waste ? <Write x={G.BAR.note[0]} y={G.BAR.note[1]} text={waste.text} size={TS} color="red" progress={waste.prog} opacity={waste.o} weight={600} /> : null}
        <Write x={G.BAR.note[0]} y={G.BAR.note[1]} text="4 users + 1 link" size={TS} progress={ramp(frame, ...EV.barNote)} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** One slot of ws1's bar: filled in its marker colour, with an optional letter in the sheet colour. */
const Slot: React.FC<{d: string; color: MarkerColor; o: number; text?: string; x?: number; y?: number; size?: number}> = ({d, color, o, text, x, y, size}) => {
  const t = useTheme();
  if (o <= 0) return null;
  return (
    <g opacity={o}>
      <path d={d} fill={t[color]} stroke={t[color]} strokeWidth={STROKE.thin} strokeLinejoin="round" />
      {text ? (
        <text x={x} y={y} textAnchor="middle" fontSize={size} fill={t.sheet} style={{...FONT.mono, fontWeight: 600}}>
          {text}
        </text>
      ) : null}
    </g>
  );
};

/** A message square riding `d` (hidden at 0 and 1), with a sheet-coloured halo. */
const Msg: React.FC<{d: string; p: number; size: number}> = ({d, p, size}) => {
  const t = useTheme();
  if (p <= 0 || p >= 1) return null;
  const pt = getPointAtLength(d, getLength(d) * p);
  if (!pt) return null;
  const o = p < 0.06 ? p / 0.06 : p > 0.94 ? (1 - p) / 0.06 : 1;
  const h = size / 2;
  return (
    <g opacity={o}>
      <rect x={pt.x - h - 3} y={pt.y - h - 3} width={size + 6} height={size + 6} fill={t.sheet} />
      <rect x={pt.x - h} y={pt.y - h} width={size} height={size} fill={t.blue} />
    </g>
  );
};

/** The pen re-inks a route blue while the message square rides it. */
const Route: React.FC<{d: string; p: number; pkt: number; head?: string}> = ({d, p, pkt, head}) => (
  <>
    <Pen d={d} progress={p} color="blue" width={STROKE.ink + 1} head={head} />
    <Msg d={d} p={p} size={pkt} />
  </>
);

/** Delivered: a green tick on a sheet-coloured disc. */
const Tick: React.FC<{x: number; y: number; o: number; s?: number}> = ({x, y, o, s = 1}) => {
  const t = useTheme();
  if (o <= 0) return null;
  return (
    <g opacity={o} transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx={0} cy={0} r={18} fill={t.sheet} />
      <path d="M -13 1 L -3 11 L 14 -12" fill="none" stroke={t.green} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" />
    </g>
  );
};

export default MeshToPubsub;
