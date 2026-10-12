// Demo clip "demo-replica-pull": plumbing proof for the site. Built with the shared lab primitives.
// Frame 0 = the static architecture (api, master, replica, the dashed pull arrow replica -> master).
import React from 'react';
import { useCurrentFrame } from 'remotion';
import { reversePath } from '@remotion/paths';
import { chevron, cylinder, endDir, handPoly, serverBox, slot, type Pt } from '../../lib/hand';
import { EASE_FADE, EASE_MOVE, fade, ghost, ramp } from '../../lib/anim';
import { CaptionBand, Ink, Packet, Pen, Sheet, Stage, StepBadge, Write, useTheme } from '../../lib/primitives';
import { STROKE, TYPE, type ThemeName } from '../../lib/tokens';
import { BEAT, CAPTIONS, EV, META } from './timeline';

export type ReplicaPullProps = { theme: ThemeName };

const API = { x: 420, y: 40, w: 200, h: 84 };
const CYL = { top: 200, rx: 120, ry: 24, h: 170 };
const MASTER_X = 520;
const REPLICA_X = 1000;
const ROW1_Y = 284;
const ROW2_Y = 338;

const WRITE_PTS: Pt[] = [[MASTER_X, API.y + API.h], [MASTER_X, CYL.top - CYL.ry - 8]];
// The replica starts the pull, so the request arrow runs replica -> master (head at the master).
const PULL_PTS: Pt[] = [[REPLICA_X - CYL.rx - 8, 250], [MASTER_X + CYL.rx + 10, 250]];
// The changes come back master -> replica along a second dashed line.
const DATA_PTS: Pt[] = [[MASTER_X + CYL.rx + 10, 336], [REPLICA_X - CYL.rx - 8, 336]];

const WRITE_D = handPoly(WRITE_PTS, 'write');
const PULL_D = handPoly(PULL_PTS, 'pull');
const DATA_D = handPoly(DATA_PTS, 'data');
const head = (pts: Pt[], seed: string) => {
  const [ux, uy] = endDir(pts);
  return chevron(pts[pts.length - 1], ux, uy, 20, seed);
};
const WRITE_HEAD = head(WRITE_PTS, 'wh');
const PULL_HEAD = head(PULL_PTS, 'ph');
const DATA_HEAD = head(DATA_PTS, 'dh');
const MASTER = cylinder(MASTER_X, CYL.top, CYL.rx, CYL.ry, CYL.h, 'master');
const REPLICA = cylinder(REPLICA_X, CYL.top, CYL.rx, CYL.ry, CYL.h, 'replica');
const API_D = serverBox(API.x, API.y, API.w, API.h, 'api');
const SLOT_D = slot(REPLICA_X - 96, ROW2_Y - 34, 192, 48, 'slot');

const Cylinder: React.FC<{ c: ReturnType<typeof cylinder>; dashed?: boolean }> = ({ c, dashed }) => {
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

export const ReplicaPull: React.FC<ReplicaPullProps> = ({ theme }) => {
  const frame = useCurrentFrame();
  const at = (r: readonly [number, number]) => r;
  const writeP = ramp(frame, ...at(EV.writeReq), EASE_MOVE);
  const ackP = ramp(frame, ...at(EV.ackPacket), EASE_MOVE);
  const pullP = ramp(frame, ...at(EV.pullReq), EASE_MOVE);
  const dataP = ramp(frame, ...at(EV.pullResp), EASE_MOVE);
  const s1 = ghost(frame, BEAT.pull);
  const s2 = ghost(frame, BEAT.pull);
  const sheet = useTheme().sheet;
  return (
    <Sheet theme={theme}>
      <Stage title={META.title} desc={META.alt}>
        {/* static figure */}
        <Ink d={WRITE_D} />
        <Ink d={WRITE_HEAD} />
        <Ink d={PULL_D} dash="14 11" />
        <Ink d={PULL_HEAD} />
        <Ink d={API_D} fill={sheet} />
        <Write x={API.x + API.w / 2} y={API.y + 56} text="api" variant="mono" size={40} anchor="middle" />
        <Cylinder c={MASTER} />
        <Cylinder c={REPLICA} dashed />
        <Write x={MASTER_X} y={CYL.top + CYL.h + 76} text="master" anchor="middle" />
        <Write x={REPLICA_X} y={CYL.top + CYL.h + 76} text="replica" anchor="middle" />
        <Write x={MASTER_X} y={ROW1_Y} text="story 41" variant="mono" size={TYPE.small} anchor="middle" />
        <Write x={REPLICA_X} y={ROW1_Y} text="story 41" variant="mono" size={TYPE.small} anchor="middle" />

        {/* 1: write */}
        <Pen d={WRITE_D} progress={writeP} color="blue" head={WRITE_HEAD} opacity={s1} />
        <Packet d={WRITE_D} progress={writeP} color="blue" />
        <StepBadge x={56} y={138} n={1} color="blue" opacity={fade(frame, EV.writeReq[0]) * s1} />
        <Write x={MASTER_X - 28} y={152} anchor="end" size={TYPE.small} text="INSERT story 42" variant="mono" color="blue" progress={ramp(frame, EV.writeReq[0], 30)} opacity={s1} />
        <Write x={MASTER_X} y={ROW2_Y} text="story 42" variant="mono" size={TYPE.small} anchor="middle" progress={ramp(frame, ...at(EV.masterRow))} />

        {/* 2: commit + ack */}
        <Packet d={reversePath(WRITE_D)} progress={ackP} color="green" />
        <StepBadge x={56} y={218} n={2} color="green" opacity={fade(frame, EV.ackPacket[0]) * s2} />
        <Write x={MASTER_X - CYL.rx - 16} y={232} anchor="end" text="OK, committed" color="green" progress={ramp(frame, ...at(EV.ackLabel))} opacity={s2} />
        <Ink d={SLOT_D} color="red" dash="9 8" opacity={fade(frame, EV.slot[0], EV.replicaRow[0], EV.slot[1], 14)} width={STROKE.ink * 0.9} />

        {/* 3: replica pulls (ink, dashed: async replication is not the request path) */}
        <Pen d={PULL_D} progress={pullP} color="ink" width={STROKE.ink + 1.2} dash="14 11" head={PULL_HEAD} />
        <Packet d={PULL_D} progress={pullP} color="ink" r={9} />
        <StepBadge x={(PULL_PTS[0][0] + PULL_PTS[1][0]) / 2} y={92} n={3} opacity={fade(frame, EV.pullReq[0])} />
        <Write x={(PULL_PTS[0][0] + PULL_PTS[1][0]) / 2} y={162} text="changes since 41?" anchor="middle" size={TYPE.small} progress={ramp(frame, ...at(EV.pullLabel))} />
        <Pen d={DATA_D} progress={dataP} color="ink" dash="14 11" head={DATA_HEAD} />
        <Packet d={DATA_D} progress={dataP} color="ink" r={9} />
        <Write x={(DATA_PTS[0][0] + DATA_PTS[1][0]) / 2} y={384} text="story 42" variant="mono" anchor="middle" size={TYPE.small} progress={ramp(frame, EV.pullResp[0], 24)} />
        <Write x={REPLICA_X} y={ROW2_Y} text="story 42" variant="mono" size={TYPE.small} anchor="middle" progress={ramp(frame, ...at(EV.replicaRow))} />
        <Write x={1150} y={CYL.top + CYL.h + 130} text="applied, a moment later" anchor="end" size={TYPE.small} color="green" progress={ramp(frame, BEAT.applied + 8, 24)} opacity={fade(frame, BEAT.applied + 8, Infinity, 10, 10) || 0} />
      </Stage>
      <CaptionBand cues={CAPTIONS} top={652} />
    </Sheet>
  );
};
export default ReplicaPull;
