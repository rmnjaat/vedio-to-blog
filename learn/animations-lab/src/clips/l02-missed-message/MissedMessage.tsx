// Clip l02-missed-message — "Lost in real time".
// Storyboard: lectures/lec02/animations/l02-missed-message/storyboard.{yaml,md}. Ledger: L-0332, L-0284, L-0344, L-0345, L-0334, L-0379.
// Frame 0 = reduced Fig 9·b (A on ws1, redis pub/sub, ws2 with E's screen; kafka -> worker -> db; api under E);
// the last frame is the annotated poster. Two layouts share one timeline: 'wide' (1200×800) and 'phone' (720×1040).
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {getLength, getPointAtLength} from '@remotion/paths';
import {fade, ghost, ramp, EASE_FADE, EASE_MOVE} from '../../lib/anim';
import {CaptionBand, Ink, Pen, Sheet, Stage, Write, useTheme, type MarkerColor} from '../../lib/primitives';
import {STROKE, THEMES, type Layout, type ThemeName} from '../../lib/tokens';
import {LAYOUTS} from './geometry';
import {BEAT, CAPTIONS, EV, META} from './timeline';

export type MissedMessageProps = {theme: ThemeName; layout?: Layout};

type R = readonly [number, number];

export const MissedMessage: React.FC<MissedMessageProps> = ({theme, layout = 'wide'}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // outside <Sheet>'s context: read tokens directly
  const G = LAYOUTS[layout];
  const TS = G.TY.label;
  const MS = G.TY.mono;

  const pen = (r: R) => ramp(frame, r[0], r[1]);
  const move = (r: R) => ramp(frame, r[0], r[1], EASE_MOVE);
  const off = (at: number) => 1 - ramp(frame, at, 14, EASE_FADE); // a blue re-ink fades back to graphite

  // B1: the message travels A -> ws1 -> kafka; the worker pulls a copy and writes it
  const b1Off = off(EV.b1Fade[0]);
  const sqInKafka = frame >= EV.toKafka[0] + EV.toKafka[1] - 2;
  // B2: WS2's link breaks; PUBLISH rides into the pipe and is lost
  const linkGone = ramp(frame, EV.linkBreak[0], 10, EASE_FADE) * (1 - ramp(frame, EV.linkRedraw[0], 10, EASE_FADE));
  const brokenO = fade(frame, EV.linkBreak[0] + 4, EV.linkRedraw[0], 10, 10);
  const b2Off = off(EV.b2Fade[0]);
  const ringO = ramp(frame, EV.lostRing[0], EV.lostRing[1], EASE_FADE);
  const lostLblO = 1 - ramp(frame, EV.notGuaranteed[0], 10, EASE_FADE);
  // B3: reconnected
  const discO = 1 - ramp(frame, EV.reconnected[0], 10, EASE_FADE);
  const qO = fade(frame, EV.question[0], EV.qFade[0], 10, EV.qFade[1]);
  // B4: the timer fetch
  const b4Off = off(EV.b4Fade[0]);
  const clockTurn = ramp(frame, EV.clock[0], EV.clock[1], EASE_MOVE);

  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt} width={G.W} height={G.H}>
        {/* ===== static figure (frame 0): reduced Fig 9·b ===== */}
        {/* user A on its WS stub */}
        {G.stubRails.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} />
        ))}
        <Write x={G.A_LBL.x} y={G.A_LBL.y} text="A" variant="mono" size={MS} anchor="middle" />
        {/* connectors to the pipe (ws2's is replaced by a broken red line in B2) */}
        <Ink d={G.C1.d} />
        <Ink d={G.C2} opacity={1 - linkGone} />
        {/* the real-time pub/sub: empty dotted lanes, it holds nothing */}
        <Ink d={G.PIPE_D} fill={T.sheet} />
        {G.LANES.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} color="ink2" dash="2 9" />
        ))}
        <Write x={G.PIPE_LBL.x} y={G.PIPE_LBL.y} text="redis pub/sub" variant="mono" size={MS} anchor="middle" />
        {/* edge servers */}
        <Ink d={G.boxes.ws1} fill={T.sheet} />
        <Ink d={G.boxes.ws2} fill={T.sheet} />
        {G.plugs.map((d, i) => (
          <Ink key={i} d={d} />
        ))}
        <Write {...G.labels.ws1} text="ws1" variant="mono" size={MS} />
        <Write {...G.labels.ws2} text="ws2" variant="mono" size={MS} />
        {/* ws2 -> E: a WebSocket, no head */}
        {G.WS_RAILS.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.thin} />
        ))}
        {/* E's screen: clock, header, two earlier messages, an empty slot */}
        <Ink d={G.boxes.screen} fill={T.sheet} />
        <Clock x={G.CLOCK.x} y={G.CLOCK.y} r={G.CLOCK.r} turn={clockTurn} />
        <Write x={G.SCR_HEAD.x} y={G.SCR_HEAD.y} text="E #c1" variant="mono" size={MS} />
        <Ink d={G.SCR_RULE} width={STROKE.thin} color="ink2" />
        {G.OLD_LINES.map((d, i) => (
          <Ink key={i} d={d} width={STROKE.ink + 2} color="ink3" />
        ))}
        {/* persistence column */}
        <Ink d={G.TO_KAFKA.d} dash="13 10" />
        <Ink d={G.TO_KAFKA.head} />
        <Ink d={G.KAFKA_D} fill={T.sheet} />
        <Write {...G.KAFKA_LBL} text="kafka" variant="mono" size={MS} />
        <Ink d={G.PULL.d} dash="13 10" />
        <Ink d={G.PULL.head} />
        <Write {...G.PULL_LBL} text="pull" size={TS} color="ink2" />
        <Ink d={G.boxes.worker} fill={T.sheet} />
        <Write {...G.labels.worker} text="worker" variant="mono" size={MS} />
        <Ink d={G.TO_DB.d} />
        <Ink d={G.TO_DB.head} />
        <path d={G.CYL.bodyFill} fill={T.sheet} />
        <Ink d={G.CYL.sides} />
        <Ink d={G.CYL.front} />
        <Ink d={G.CYL.top} fill={T.sheet} />
        <Write {...G.DB_LBL} text="db" variant="mono" size={MS} />
        {/* the non-real-time path: E's client -> api -> db */}
        <Ink d={G.TO_API.d} />
        <Ink d={G.TO_API.head} />
        <Ink d={G.API_DB.d} />
        <Ink d={G.API_DB.head} />
        <Ink d={G.boxes.api} fill={T.sheet} />
        <Write {...G.labels.api} text="api" variant="mono" size={MS} />

        {/* ===== B1: persisted through Kafka ===== */}
        <Shift {...G.MSG_LBL} text="standup in 5" variant="mono" size={MS} progress={pen(EV.msgText)} blue={b1Off} />
        <Route d={G.stubRide} p={move(EV.aToWs1)} o={b1Off} size={G.PKT} width={STROKE.thin + 1.4} />
        <Route d={G.TO_KAFKA.ride} p={move(EV.toKafka)} o={b1Off} size={G.PKT} dash="13 10" head={G.TO_KAFKA.head} />
        {sqInKafka ? <Square x={G.KAFKA_SQ[0]} y={G.KAFKA_SQ[1]} size={G.PKT} blue={b1Off} o={ramp(frame, EV.toKafka[0] + EV.toKafka[1] - 2, 6, EASE_FADE)} /> : null}
        {/* the worker asks (pull), then a copy rides back kafka -> worker; the square stays in kafka */}
        <Pen d={G.PULL.ride} progress={pen(EV.pullPen)} color="blue" width={STROKE.ink + 1} dash="13 10" head={G.PULL.head} opacity={b1Off} />
        <Msg d={G.PULL.back} p={move(EV.pullCopy)} size={G.PKT} color="blue" />
        <Route d={G.TO_DB.ride} p={move(EV.toDb)} o={b1Off} size={G.PKT} head={G.TO_DB.head} />
        <Write x={G.SAVED.x} y={G.SAVED.y} text="saved" size={TS} color="green" anchor={G.SAVED.anchor} progress={pen(EV.saved)} weight={600} />
        <Tick x={G.SAVED.tick.x} y={G.SAVED.tick.y} o={ramp(frame, EV.saved[0] + 12, 8, EASE_FADE)} s={G.ph ? 0.8 : 1} />

        {/* ===== B2: WS2 disconnected; PUBLISH is lost ===== */}
        {G.BROKEN.map((d, i) => (
          <Ink key={i} d={d} color="red" dash="10 8" opacity={brokenO} />
        ))}
        <Write {...G.DISC_LBL} text="disconnected" size={TS} color="red" progress={pen(EV.disconnected)} opacity={discO} weight={600} />
        <Shift {...G.PUB_LBL} text="PUBLISH c1" variant="mono" size={MS} progress={pen(EV.publishLabel)} blue={b2Off} opacity={ghost(frame, BEAT.back)} />
        <Route d={G.C1.d} p={pen(EV.publish)} o={b2Off} size={G.PKT} head={G.C1.head} />
        <Msg d={G.PIPE_RIDE} p={move(EV.inPipe)} size={G.PKT} color="blue" keepEnd={frame < EV.lostRing[0] + EV.lostRing[1]} fadeOut={ramp(frame, EV.lostRing[0], EV.lostRing[1], EASE_FADE)} />
        <LostRing x={G.RING.x} y={G.RING.y} r={G.RING.r} o={ringO} />
        <Write {...G.LOST_LBL} text="lost: keeps nothing" size={TS} color="red" progress={pen(EV.lostLabel)} opacity={lostLblO} weight={600} />

        {/* ===== B3: back, but nothing replays ===== */}
        <Pen d={G.C2} progress={pen(EV.linkRedraw)} />
        <Write {...G.DISC_LBL} text="reconnected" size={TS} color="ink2" progress={ramp(frame, EV.reconnected[0] + 10, EV.reconnected[1] - 10)} />
        <Write x={G.SLOT.q.x} y={G.SLOT.q.y} text="?" size={G.ph ? 40 : 52} color="red" opacity={qO} weight={700} />

        {/* ===== B4: the timer fetches the last 50 ===== */}
        <Write {...G.CORR_LBL} text="correction job" size={TS} progress={pen(EV.corrJob)} />
        <Route d={G.TO_API.ride} p={move(EV.req)} o={b4Off} size={G.PKT} head={G.TO_API.head} />
        <Shift {...G.GET_LBL} text="GET last 50 (c1)" variant="mono" size={MS} progress={pen(EV.getLabel)} blue={b4Off} />
        <Route d={G.API_DB.ride} p={move(EV.apiDb)} o={b4Off} size={G.PKT} head={G.API_DB.head} />
        <Msg d={G.API_DB.back} p={move(EV.resp1)} size={G.PKT} color="green" />
        <Msg d={G.TO_API.back} p={move(EV.resp2)} size={G.PKT} color="green" />
        {G.SLOT.lines.map((l, i) => (
          <Write key={i} x={l.x} y={l.y} text={l.text} variant="mono" size={MS} color="green" weight={560} progress={ramp(frame, EV.fill[0] + i * 10, EV.fill[1] - 10)} />
        ))}
        <Tick x={G.SLOT.tick.x} y={G.SLOT.tick.y} o={ramp(frame, EV.fill[0] + EV.fill[1] - 6, 8, EASE_FADE)} s={G.ph ? 0.8 : 1} />

        {/* ===== B5: guaranteed / not guaranteed ===== */}
        <Write {...G.LOST_LBL} text="push: not guaranteed" size={TS} color="red" progress={ramp(frame, EV.notGuaranteed[0] + 10, EV.notGuaranteed[1] - 10)} weight={600} />
        {G.GUAR.bracket ? <Pen d={G.GUAR.bracket} progress={pen(EV.guaranteed)} color="green" width={STROKE.thin + 0.6} /> : null}
        <Write {...G.GUAR.lbl} text="persisted: guaranteed" size={TS} color="green" progress={pen(EV.guaranteed)} weight={600} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={G.CAPTION_TOP} layout={layout} />
    </Sheet>
  );
};

/** A message square riding `d` (hidden at 0 and 1 unless `keepEnd`), with a sheet-coloured halo. */
const Msg: React.FC<{d: string; p: number; size: number; color: MarkerColor; keepEnd?: boolean; fadeOut?: number}> = ({d, p, size, color, keepEnd, fadeOut = 0}) => {
  const t = useTheme();
  if (p <= 0 || (p >= 1 && !keepEnd)) return null;
  const pt = getPointAtLength(d, getLength(d) * Math.min(p, 1));
  if (!pt) return null;
  const o = (p < 0.06 ? p / 0.06 : p > 0.94 && !keepEnd ? (1 - p) / 0.06 : 1) * (1 - fadeOut);
  if (o <= 0) return null;
  const h = size / 2;
  return (
    <g opacity={o}>
      <rect x={pt.x - h - 3} y={pt.y - h - 3} width={size + 6} height={size + 6} fill={t.sheet} />
      <rect x={pt.x - h} y={pt.y - h} width={size} height={size} fill={t[color]} />
    </g>
  );
};

/** The pen re-inks a route blue while the message square rides it; the blue fades back by `o`. */
const Route: React.FC<{d: string; p: number; o: number; size: number; head?: string; dash?: string; width?: number; ride?: string}> = ({
  d,
  p,
  o,
  size,
  head,
  dash,
  width = STROKE.ink + 1,
  ride,
}) => (
  <>
    <Pen d={d} progress={p} color="blue" width={width} dash={dash} head={head} opacity={o} />
    <Msg d={ride ?? d} p={p} size={size} color="blue" />
  </>
);

/** A message square at rest (kept in kafka): blue while it is the moving message, then graphite. */
const Square: React.FC<{x: number; y: number; size: number; blue: number; o: number}> = ({x, y, size, blue, o}) => {
  const t = useTheme();
  const h = size / 2;
  return (
    <g opacity={o}>
      <rect x={x - h} y={y - h} width={size} height={size} fill={t.ink} />
      <rect x={x - h} y={y - h} width={size} height={size} fill={t.blue} opacity={blue} />
    </g>
  );
};

/** A label written in blue that settles to graphite once its step is over (the colour fades, the text stays). */
const Shift: React.FC<{
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  text: string;
  variant: 'mono' | 'hand';
  size: number;
  progress: number;
  blue: number;
  opacity?: number;
}> = ({blue, opacity = 1, ...p}) => (
  <>
    <Write {...p} color="ink" opacity={opacity * (1 - blue)} />
    <Write {...p} color="blue" opacity={opacity * blue} />
  </>
);

/** Lost: a red ring with a ✕ where the square was. */
const LostRing: React.FC<{x: number; y: number; r: number; o: number}> = ({x, y, r, o}) => {
  const t = useTheme();
  if (o <= 0) return null;
  const s = r * 0.5;
  return (
    <g opacity={o}>
      <circle cx={x} cy={y} r={r} fill={t.sheet} stroke={t.red} strokeWidth={STROKE.ink} />
      <path d={`M ${x - s} ${y - s} L ${x + s} ${y + s} M ${x + s} ${y - s} L ${x - s} ${y + s}`} stroke={t.red} strokeWidth={STROKE.ink} strokeLinecap="round" />
    </g>
  );
};

/** Delivered / saved: a green tick on a sheet-coloured disc. */
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

/** E's client timer: a clock whose long hand sweeps one turn as `turn` goes 0 → 1. No number: the class gave none. */
const Clock: React.FC<{x: number; y: number; r: number; turn: number}> = ({x, y, r, turn}) => {
  const t = useTheme();
  const a = -Math.PI / 2 + turn * Math.PI * 2;
  const lx = x + Math.cos(a) * r * 0.75;
  const ly = y + Math.sin(a) * r * 0.75;
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={t.sheet} stroke={t.ink} strokeWidth={STROKE.ink * 0.8} />
      <path d={`M ${x} ${y} L ${x + r * 0.45} ${y + r * 0.1}`} stroke={t.ink} strokeWidth={STROKE.ink * 0.8} strokeLinecap="round" />
      <path d={`M ${x} ${y} L ${lx} ${ly}`} stroke={t.ink} strokeWidth={STROKE.ink * 0.8} strokeLinecap="round" />
      <circle cx={x} cy={y} r={2.2} fill={t.ink} />
    </g>
  );
};

export default MissedMessage;
