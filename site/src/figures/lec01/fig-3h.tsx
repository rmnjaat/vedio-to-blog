// Lecture 01, §3.6. Fig 3·h "As many consumers as partitions" (D-14 redraw).
import React from 'react';
import { Arrow, Box, Fig, Label, Line, Mark, Pipe, Worker } from '../kit/Kit';

function Lane({ x0, x1, y, seed }: { x0: number; x1: number; y: number; seed: string }) {
  return <Line pts={[[x0, y], [x1, y]]} weight="thin" className="faint" seed={seed} />;
}

const TITLE = 'As many consumers as partitions';
const DESC = 'A topic with three partitions. In the search consumer group, Kafka gives each partition to exactly one consumer: search consumers 1, 2 and 3 each pull from one (a dashed ask to the topic, the messages coming back in blue). Consumers 4 and 5 are struck out: no messages are sent to them. A counter group reads the same topic separately and has its own cap of three: the cap applies per group.';

export function Fig3h({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const C = [100, 142, 184];
    return (
      <Fig id="fig3h-p" w={340} h={444} title={TITLE} desc={DESC}>
        <Label kind="mono" anchor="start" x={20} y={16}>#partitions = 3</Label>
        <Pipe x={20} cy={50} w={300} ry={26} seed="f3h-p-pipe" />
        {[42, 58].map((y, i) => <Lane key={i} x0={40} x1={310} y={y} seed={`f3h-p-l${i}`} />)}
        {/* each search consumer pulls its partition: dashed ask up to the topic, blue messages back */}
        {C.map((y, i) => {
          const xa = 96 - i * 28, xb = xa + 11;
          return (
            <g key={i}>
              <Arrow dashed pts={[[122, y + 10], [xa, y + 10], [xa, 78]]} seed={`f3h-p-ask${i}`} />
              <Arrow tone="blue" pts={[[xb, 78], [xb, y + 23], [122, y + 23]]} seed={`f3h-p-get${i}`} />
              <Worker x={124} y={y} w={206} h={32} label={`search consumer ${i + 1}`} seed={`f3h-p-c${i}`} />
            </g>
          );
        })}
        {[226, 268].map((y, i) => (
          <g key={i}>
            <Worker x={124} y={y} w={206} h={32} label={`consumer ${i + 4}`} seed={`f3h-p-x${i}`} />
            <Mark tone="red" a={[118, y + 16]} b={[336, y + 16]} seed={`f3h-p-s${i}`} />
          </g>
        ))}
        <Label tone="red" anchor="end" x={108} y={254}>no</Label>
        <Label tone="red" anchor="end" x={108} y={272}>messages</Label>
        <Label muted x={170} y={326}>a second group on the same topic</Label>
        <Line dashed pts={[[14, 336], [326, 336], [326, 392], [14, 392], [14, 336]]} seed="f3h-p-grp" />
        {[22, 124, 226].map((x, i) => <Box key={i} x={x} y={346} w={92} h={30} label="counter" seed={`f3h-p-g${i}`} />)}
        <Label x={170} y={412}>counter group (its own 3)</Label>
        <Label x={170} y={434}>the cap applies per group</Label>
      </Fig>
    );
  }
  return (
    <Fig id="fig3h" w={760} h={350} title={TITLE} desc={DESC}>
      <Line pts={[[70, 82], [80, 82], [80, 92], [70, 92], [70, 82]]} className="shape" seed="f3h-msg" />
      <Arrow dashed pts={[[40, 110], [128, 110]]} seed="f3h-in" />
      <Pipe x={150} cy={110} w={280} ry={58} seed="f3h-pipe" />
      {[85, 135].map((y, i) => <Lane key={i} x0={176} x1={424} y={y} seed={`f3h-l${i}`} />)}
      {[60, 110, 160].map((y, i) => <Label key={'p' + i} kind="mono" muted anchor="start" x={186} y={y + 5}>{`p${i}`}</Label>)}
      <Label kind="mono" anchor="end" x={270} y={202}>#partitions = 3</Label>
      {/* each search consumer pulls one partition: dashed ask to the topic, blue messages back */}
      {[60, 110, 160].map((y, i) => (
        <g key={'c' + i}>
          <Arrow dashed pts={[[516, y - 6], [454, y - 6]]} seed={`f3h-ask${i}`} />
          <Arrow tone="blue" pts={[[454, y + 7], [516, y + 7]]} seed={`f3h-get${i}`} />
          <Worker x={520} y={y - 16} w={212} h={32} label={`search consumer ${i + 1}`} seed={`f3h-c${i}`} />
        </g>
      ))}
      {[198, 242].map((y, i) => (
        <g key={i}>
          <Worker x={520} y={y} w={212} h={32} label={`consumer ${i + 4}`} seed={`f3h-x${i}`} />
          <Mark tone="red" a={[508, y + 16]} b={[744, y + 16]} seed={`f3h-s${i}`} />
        </g>
      ))}
      <Label tone="red" x={626} y={298}>no messages sent to them</Label>
      <Arrow dashed pts={[[290, 228], [290, 170]]} seed="f3h-gask" />
      <Arrow tone="blue" pts={[[306, 170], [306, 228]]} seed="f3h-gget" />
      <Line dashed pts={[[150, 230], [456, 230], [456, 300], [150, 300], [150, 230]]} seed="f3h-grp" />
      {[160, 256, 352].map((x, i) => <Box key={i} x={x} y={244} w={92} h={30} label="counter" seed={`f3h-g${i}`} />)}
      <Label x={303} y={293}>counter group (its own 3)</Label>
      <Label x={303} y={330}>the cap applies per group</Label>
    </Fig>
  );
}
