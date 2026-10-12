// Clip l01-replica-lag — "A read replica lags behind the master".
// Storyboard: ./storyboard.md + ./storyboard.yaml. Ledger: L-0107, L-0109, L-0110, L-0113.
// Frame 0 equals the static architecture figure (D-06b); the last frame is the annotated poster.
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {reversePath} from '@remotion/paths';
import {cylinder, chevron, endDir, handLine, handPoly, serverBox, slot, type Pt} from '../../lib/hand';
import {fade, ghost, ramp, EASE_MOVE, EASE_FADE} from '../../lib/anim';
import {CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write, useTheme} from '../../lib/primitives';
import {STROKE, THEMES, TYPE, type ThemeName} from '../../lib/tokens';
import {BEAT, CAPTIONS, EV, META} from './timeline';

export type ReplicaLagProps = {theme: ThemeName};

// ---------- layout (canvas px) ----------
const API = {x: 500, y: 40, w: 200, h: 84};
const CYL = {top: 250, rx: 120, ry: 24, h: 150};
const MASTER_X = 255;
const REPLICA_X = 945;
const ROW1_Y = 318; // "story 41"
const ROW2_Y = 370; // "story 42"
const PULL_Y = 300;

const WRITE_PTS: Pt[] = [
  [API.x, 82],
  [MASTER_X, 82],
  [MASTER_X, CYL.top - CYL.ry - 6],
];
const READ_PTS: Pt[] = [
  [API.x + API.w, 82],
  [REPLICA_X, 82],
  [REPLICA_X, CYL.top - CYL.ry - 6],
];
// Replica initiates the pull, so the arrowhead sits at the master (L-0109: the replica calls the master).
const PULL_PTS: Pt[] = [
  [REPLICA_X - CYL.rx - 8, PULL_Y],
  [MASTER_X + CYL.rx + 10, PULL_Y],
];

const WRITE_D = handPoly(WRITE_PTS, 'write');
const READ_D = handPoly(READ_PTS, 'read');
const PULL_D = handPoly(PULL_PTS, 'pull');
const head = (pts: Pt[], seed: string) => {
  const [ux, uy] = endDir(pts);
  return chevron(pts[pts.length - 1], ux, uy, 20, seed);
};
const WRITE_HEAD = head(WRITE_PTS, 'wh');
const READ_HEAD = head(READ_PTS, 'rh');
const PULL_HEAD = head(PULL_PTS, 'ph');

const MASTER = cylinder(MASTER_X, CYL.top, CYL.rx, CYL.ry, CYL.h, 'master');
const REPLICA = cylinder(REPLICA_X, CYL.top, CYL.rx, CYL.ry, CYL.h, 'replica');
const API_D = serverBox(API.x, API.y, API.w, API.h, 'api');
const SLOT_D = slot(REPLICA_X - 96, ROW2_Y - 34, 192, 48, 'slot');

// time track
const AX = {x0: 110, x1: 1080, y: 568};
const T0 = BEAT.write; // track starts when the first event starts
const T1 = EV.trackEnd;
const TX0 = 150;
const TX1 = 1040;
const tx = (frame: number) => TX0 + ((frame - T0) / (T1 - T0)) * (TX1 - TX0);
const AXIS_D = handLine([AX.x0, AX.y], [AX.x1, AX.y], 'axis');
const AXIS_HEAD = chevron([AX.x1, AX.y], 1, 0, 16, 'axh');

const at = (r: readonly [number, number]) => r; // readability: [start, dur]

// ---------- glyphs ----------
const Cylinder: React.FC<{c: ReturnType<typeof cylinder>; dashed?: boolean}> = ({c, dashed}) => {
  const t = useTheme();
  const dash = dashed ? '13 10' : undefined;
  return (
    <g>
      <path d={c.bodyFill} fill={t.sheet} stroke="none" />
      <Ink d={c.sides} dash={dash} />
      <Ink d={c.front} dash={dash} />
      <Ink d={c.top} dash={dash} fill={t.sheet} />
    </g>
  );
};

export const ReplicaLag: React.FC<ReplicaLagProps> = ({theme}) => {
  const frame = useCurrentFrame();
  const T = THEMES[theme]; // this component sits outside <Sheet>'s context; read tokens directly

  // ---- ① write ----
  const writeP = ramp(frame, ...at(EV.writeReq), EASE_MOVE);
  const writeBlueO = 1 - ramp(frame, BEAT.staleRead, 14, EASE_FADE); // blue overlay returns to ink
  const s1Ghost = ghost(frame, BEAT.staleRead);

  // ---- ② ack ----
  const ackP = ramp(frame, ...at(EV.ackPacket), EASE_MOVE);
  const s2Ghost = ghost(frame, BEAT.staleRead);

  // ---- ③ stale read ----
  const read1P = ramp(frame, ...at(EV.read1Req), EASE_MOVE);
  const read1RespP = ramp(frame, ...at(EV.read1Resp), EASE_MOVE);
  const read1Out = BEAT.freshRead; // replaced by read #2 in the same place
  const s3Ghost = ghost(frame, BEAT.pull);
  const read1BlueO = 1 - ramp(frame, BEAT.pull, 14, EASE_FADE);

  // ---- ④ pull ----
  const pullP = ramp(frame, ...at(EV.pullReq), EASE_MOVE);
  const pullRespP = ramp(frame, ...at(EV.pullResp), EASE_MOVE);
  const s4Ghost = ghost(frame, BEAT.freshRead);
  const pullInkO = 1; // the pull arrow is ink (async replication is not the request path)

  // ---- ⑤ fresh read ----
  const read2P = ramp(frame, ...at(EV.read2Req), EASE_MOVE);
  const read2RespP = ramp(frame, ...at(EV.read2Resp), EASE_MOVE);
  const read2BlueO = 1 - ramp(frame, BEAT.end, 14, EASE_FADE);

  // ---- rows / slot ----
  const masterRowP = ramp(frame, ...at(EV.masterRow));
  const replicaRowP = ramp(frame, ...at(EV.replicaRow));
  const slotO = fade(frame, EV.slot[0], EV.replicaRow[0], EV.slot[1], 14);

  // ---- time track ----
  const playX = tx(Math.min(Math.max(frame, T0), T1));
  const playO = fade(frame, T0, T1 + 4, 8, 10);
  const lagEnd = Math.min(frame, EV.applied);
  const lagW = frame >= EV.commit ? tx(lagEnd) - tx(EV.commit) : 0;
  const behindO = fade(frame, EV.behindLabel[0], EV.lagLabelSwap, 12, 10);
  const lagLabelO = ramp(frame, EV.lagLabelSwap + 6, 12, EASE_FADE);

  const desc = META.alt;

  return (
    <Sheet theme={theme}>
      <Stage title="Replication lag" desc={desc}>
        {/* ===== static figure (frame 0) ===== */}
        <Ink d={WRITE_D} />
        <Ink d={WRITE_HEAD} />
        <Ink d={READ_D} />
        <Ink d={READ_HEAD} />
        <Ink d={PULL_D} dash="14 11" />
        <Ink d={PULL_HEAD} />

        <Ink d={API_D} fill={T.sheet} />
        <Write x={600} y={96} text="api" variant="mono" size={40} anchor="middle" />

        <Cylinder c={MASTER} />
        <Cylinder c={REPLICA} dashed />
        <Write x={MASTER_X} y={468} text="master" anchor="middle" />
        <Write x={REPLICA_X} y={468} text="replica" anchor="middle" />
        <Write x={MASTER_X} y={ROW1_Y} text="story 41" variant="mono" size={TYPE.small} anchor="middle" />
        <Write x={REPLICA_X} y={ROW1_Y} text="story 41" variant="mono" size={TYPE.small} anchor="middle" />

        {/* time axis */}
        <Ink d={AXIS_D} width={STROKE.thin + 0.6} color="ink2" />
        <Ink d={AXIS_HEAD} width={STROKE.thin + 0.6} color="ink2" />
        <Write x={AX.x1} y={AX.y + 52} text="time (slowed down)" size={TYPE.small} color="ink2" anchor="end" />

        {/* ===== ① write: pen re-inks the write arrow in blue, packet at the tip ===== */}
        <Pen d={WRITE_D} progress={writeP} color="blue" head={WRITE_HEAD} opacity={writeBlueO} />
        <Packet d={WRITE_D} progress={writeP} color="blue" />
        <StepBadge x={84} y={50} n={1} color="blue" opacity={fade(frame, EV.writeReq[0], Infinity, 8) * s1Ghost} />
        <Write x={486} y={64} text="INSERT story 42" variant="mono" color="blue" anchor="end" progress={ramp(frame, ...at(EV.writeLabel))} opacity={s1Ghost} />
        <Write x={MASTER_X} y={ROW2_Y} text="story 42" variant="mono" size={TYPE.small} anchor="middle" progress={masterRowP} />

        {/* ===== ② ack: green packet travels back; label ===== */}
        <Packet d={reversePath(WRITE_D)} progress={ackP} color="green" />
        <StepBadge x={MASTER_X - 44} y={160} n={2} color="green" opacity={fade(frame, EV.ackPacket[0], Infinity, 8) * s2Ghost} />
        <Write x={MASTER_X + 26} y={174} text="OK, published" color="green" progress={ramp(frame, ...at(EV.ackLabel))} opacity={s2Ghost} />

        {/* replica is missing the row: red dashed empty slot */}
        <Ink d={SLOT_D} color="red" dash="9 8" opacity={slotO} width={STROKE.ink * 0.9} />

        {/* ===== ③ stale read ===== */}
        <Pen d={READ_D} progress={read1P} color="blue" head={READ_HEAD} opacity={read1BlueO} />
        <Packet d={READ_D} progress={read1P} color="blue" />
        <Packet d={reversePath(READ_D)} progress={read1RespP} color="red" />
        <StepBadge x={1112} y={50} n={3} color="blue" opacity={fade(frame, EV.read1Req[0], read1Out, 8) * s3Ghost} />
        <Write x={714} y={64} text="SELECT story 42" variant="mono" color="blue" progress={ramp(frame, ...at(EV.read1Label))} opacity={s3Ghost * fade(frame, 0, read1Out, 1)} />
        <Write x={REPLICA_X - 26} y={174} text="0 rows: stale" color="red" anchor="end" progress={ramp(frame, ...at(EV.read1RespLabel))} opacity={s3Ghost * fade(frame, 0, read1Out, 1)} />

        {/* ===== ④ replica pulls (dashed, ink: async replication) ===== */}
        <Pen d={PULL_D} progress={pullP} color="ink" width={STROKE.ink + 1.2} dash="14 11" head={PULL_HEAD} opacity={pullInkO * (1 - ramp(frame, BEAT.freshRead, 14, EASE_FADE))} />
        <Packet d={PULL_D} progress={pullP} color="ink" r={9} />
        <Packet d={reversePath(PULL_D)} progress={pullRespP} color="ink" r={9} />
        <StepBadge x={600} y={232} n={4} opacity={fade(frame, EV.pullReq[0], Infinity, 8) * s4Ghost} />
        <Write x={600} y={284} text="changes since 41?" anchor="middle" size={TYPE.small} progress={ramp(frame, ...at(EV.pullLabel))} opacity={s4Ghost} />
        <Write x={600} y={346} text="story 42" variant="mono" size={TYPE.small} anchor="middle" progress={ramp(frame, ...at(EV.pullRespLabel))} opacity={s4Ghost} />
        <Write x={REPLICA_X} y={ROW2_Y} text="story 42" variant="mono" size={TYPE.small} anchor="middle" progress={replicaRowP} />

        {/* ===== ⑤ fresh read ===== */}
        <Pen d={READ_D} progress={read2P} color="blue" head={READ_HEAD} opacity={read2BlueO} />
        <Packet d={READ_D} progress={read2P} color="blue" />
        <Packet d={reversePath(READ_D)} progress={read2RespP} color="green" />
        <StepBadge x={1112} y={50} n={5} color="blue" opacity={fade(frame, EV.read2Req[0], Infinity, 8)} />
        <Write x={714} y={64} text="SELECT story 42" variant="mono" color="blue" progress={ramp(frame, ...at(EV.read2Label))} />
        <Write x={REPLICA_X - 26} y={174} text="1 row: story 42" color="green" anchor="end" progress={ramp(frame, ...at(EV.read2RespLabel))} />

        {/* ===== time track: events stamped as they happen ===== */}
        {/* lag span grows from commit to "now" while the replica is behind */}
        {lagW > 0 ? (
          <line x1={tx(EV.commit)} y1={AX.y} x2={tx(EV.commit) + lagW} y2={AX.y} stroke={T.red} strokeWidth={STROKE.thick + 2} strokeLinecap="round" />
        ) : null}
        <TrackMark x={tx(EV.commit)} at={EV.commit} frame={frame} color="green" label="commit" />
        <TrackMark x={tx(EV.staleMark)} at={EV.staleMark} frame={frame} color="red" label="stale read" kind="cross" />
        <TrackMark x={tx(EV.applied)} at={EV.applied} frame={frame} color="ink" label="applied" />
        <TrackMark x={tx(EV.freshMark)} at={EV.freshMark} frame={frame} color="green" label="fresh read" kind="tick" />
        <Write x={(tx(EV.commit) + tx(Math.max(lagEnd, EV.commit + 60))) / 2} y={AX.y + 52} text="replica behind…" color="red" size={TYPE.small} anchor="middle" opacity={behindO} />
        <Write x={(tx(EV.commit) + tx(EV.applied)) / 2} y={AX.y + 52} text="replication lag" color="red" size={TYPE.small} anchor="middle" opacity={lagLabelO} weight={600} />
        {/* playhead: "now" */}
        <g opacity={playO}>
          <line x1={playX} y1={AX.y - 18} x2={playX} y2={AX.y + 9} stroke={T.ink} strokeWidth={STROKE.ink} strokeLinecap="round" />
        </g>
      </Stage>
      <CaptionBand cues={CAPTIONS} top={652} />
    </Sheet>
  );
};

/** An event stamped on the time track: dot (or ✕ / ✓) on the axis + label above. */
const TrackMark: React.FC<{x: number; at: number; frame: number; color: 'ink' | 'red' | 'green'; label: string; kind?: 'dot' | 'cross' | 'tick'}> = ({
  x,
  at: atF,
  frame,
  color,
  label,
  kind = 'dot',
}) => {
  const t = useTheme();
  const c = t[color];
  const o = ramp(frame, atF, 8, EASE_FADE);
  if (o <= 0) return null;
  const y = AX.y;
  return (
    <g opacity={o}>
      {kind === 'dot' ? <circle cx={x} cy={y} r={10} fill={c} stroke={t.sheet} strokeWidth={3} /> : null}
      {kind === 'cross' ? (
        <>
          <circle cx={x} cy={y} r={15} fill={t.sheet} />
          <path d={`M ${x - 11} ${y - 11} L ${x + 11} ${y + 11} M ${x + 11} ${y - 11} L ${x - 11} ${y + 11}`} stroke={c} strokeWidth={STROKE.ink + 1} strokeLinecap="round" />
        </>
      ) : null}
      {kind === 'tick' ? (
        <>
          <circle cx={x} cy={y} r={15} fill={t.sheet} />
          <path d={`M ${x - 12} ${y + 1} L ${x - 3} ${y + 10} L ${x + 13} ${y - 11}`} fill="none" stroke={c} strokeWidth={STROKE.ink + 1} strokeLinecap="round" strokeLinejoin="round" />
        </>
      ) : null}
      <Write x={x} y={y - 26} text={label} color={color} size={TYPE.small} anchor="middle" progress={ramp(frame, atF, 16)} />
    </g>
  );
};

export default ReplicaLag;
