// Lecture 05 (lec08), §6.1–6.4 Remote locks, part a.
// Fig 6·a(1) A central lock manager (D-07 redraw, frame b_020015): 340, one layout.
// Fig 6·a(2) The sharing ladder (board S56/S57, frames b_020015, b_020615): wide 600 + phone 340.
// Fig 6·b Queue 7 and three consumers (D-08, frames b_021030, b_021415, b_021745): two states, wide 700 + phone 340.
// Rule-box sketch §6: nearest shared storage: 480 + phone 320.
// Arrowheads sit on the initiator: machines ask the lock manager; consumers pop the queue and write the lock store.
import React from 'react';
import { Arrow, Box, Cloud, Disk, Fig, Label, Line } from '../kit/Kit';
import { Chip, QueueScene, ThreadMark } from './s6a-remote-locks-parts';

/* ------------------------------------------------------------------ Fig 6·a part 1 */

export function LockManager() {
  const s = (k: string) => `f6a1-${k}`;
  const X = [10, 125, 240];
  return (
    <Fig id="fig6a1" w={340} h={226} title="A central lock manager"
      desc="Three machines below one lock manager. Each machine sends its requests up to the lock manager, which keeps track of which item is locked by which machine. The three machines coordinate through this central lock manager.">
      <Box x={90} y={14} w={160} h={52} seed={s('lm')} />
      <Label kind="mono" x={170} y={36}>lock manager</Label>
      <Label kind="mono" muted x={170} y={56}>item → machine</Label>
      {X.map((x, i) => <Box key={i} x={x} y={134} w={90} h={40} label={`machine ${i + 1}`} seed={s(`m${i}`)} />)}
      <Arrow pts={[[55, 134], [55, 100], [130, 100], [130, 68]]} seed={s('a0')} />
      <Arrow pts={[[170, 134], [170, 68]]} seed={s('a1')} />
      <Arrow pts={[[285, 134], [285, 100], [210, 100], [210, 68]]} seed={s('a2')} />
      <Label x={170} y={200}>the 3 machines coordinate</Label>
      <Label x={170} y={218}>through a central lock manager</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·a part 2 */

const T6A2 = 'The sharing ladder';
const D6A2 =
  'Three rows. Threads: two threads inside one process share a RAM chip, and synchronize with a mutex, a semaphore or atomic instructions. Processes: two apt-get processes share the disk, through the lock file /var/lib/dpkg/lock; run apt-get upgrade twice and the second one refuses. Machines: two machines share nothing but the network, so they need a remote lock. An arrow down the side reads: nearest storage they share.';

export function SharingLadder({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig6a2-p' : 'fig6a2';
  const s = (k: string) => `${id}-${k}`;
  const R = P ? [10, 160, 310] : [16, 116, 216];
  // drawing span: x0..x1 with centre c
  const x0 = P ? 40 : 160, x1 = P ? 330 : 410, c = (x0 + x1) / 2;
  const T = P ? 14 : 14;
  const bw = P ? 92 : 86;
  return (
    <Fig id={id} w={P ? 340 : 600} h={P ? 460 : 310} title={T6A2} desc={D6A2}>
      <Arrow pts={[[P ? 12 : 22, 18], [P ? 12 : 22, P ? 448 : 296]]} seed={s('side')} />
      <Label x={P ? 18 : 30} y={P ? 230 : 156} rotate={90} size={T}>nearest storage they share</Label>

      {/* threads */}
      <Label kind="title" anchor="start" x={x0 - (P ? 0 : 104)} y={R[0] + (P ? 16 : 46)} size={P ? 15 : 16}>threads</Label>
      {(() => {
        const y = R[0] + (P ? 26 : 6), mid = y + 36;
        return (
          <g>
            <Box x={x0} y={y} w={x1 - x0} h={72} seed={s('proc')} />
            <ThreadMark x={x0 + 30} top={y + 12} seed={s('t1')} />
            <ThreadMark x={x1 - 30} top={y + 12} seed={s('t2')} />
            <Line pts={[[x0 + 40, mid], [c - 30, mid]]} weight="thin" seed={s('tl1')} />
            <Line pts={[[c + 30, mid], [x1 - 40, mid]]} weight="thin" seed={s('tl2')} />
            <Chip cx={c} cy={mid} seed={s('chip')} size={14} />
          </g>
        );
      })()}

      {/* processes */}
      <Label kind="title" anchor="start" x={x0 - (P ? 0 : 104)} y={R[1] + (P ? 16 : 46)} size={P ? 15 : 16}>processes</Label>
      {(() => {
        const y = R[1] + (P ? 40 : 14), mid = y + 18;
        return (
          <g>
            <Box x={x0} y={y} w={P ? 84 : 80} h={36} label="apt-get" seed={s('p1')} labelSize={14} />
            <Box x={x1 - (P ? 84 : 80)} y={y} w={P ? 84 : 80} h={36} label="apt-get" seed={s('p2')} tone="red" labelSize={14} />
            <Line pts={[[x0 + (P ? 84 : 80), mid], [c - 30, mid]]} weight="thin" seed={s('pl1')} />
            <Line pts={[[c + 30, mid], [x1 - (P ? 84 : 80), mid]]} weight="thin" seed={s('pl2')} />
            <Disk cx={c} cy={mid} w={60} h={26} seed={s('disk')} label="/var/lib/dpkg/lock" size={P ? 14 : 13} />
          </g>
        );
      })()}

      {/* machines */}
      <Label kind="title" anchor="start" x={x0 - (P ? 0 : 104)} y={R[2] + (P ? 16 : 46)} size={P ? 15 : 16}>machines</Label>
      {(() => {
        const y = R[2] + (P ? 40 : 20), mid = y + 20;
        return (
          <g>
            <Box x={x0} y={y} w={bw} h={40} label="machine 1" seed={s('m1')} labelSize={14} />
            <Box x={x1 - bw} y={y} w={bw} h={40} label="machine 2" seed={s('m2')} labelSize={14} />
            <Line pts={[[x0 + bw, mid], [c - 32, mid]]} weight="thin" seed={s('ml1')} />
            <Line pts={[[c + 32, mid], [x1 - bw, mid]]} weight="thin" seed={s('ml2')} />
            <Cloud cx={c} cy={mid} w={64} h={48} seed={s('net')} />
            <Label x={c} y={mid + 40} size={14}>network</Label>
          </g>
        );
      })()}

      {/* notes */}
      {P ? (
        <g>
          <Label anchor="start" x={x0} y={R[0] + 120} size={T}>mutex · semaphore · atomic instructions</Label>
          <Label anchor="start" x={x0} y={R[1] + 118} size={T}>apt-get upgrade, twice:</Label>
          <Label anchor="start" tone="red" x={x0} y={R[1] + 135} size={T}>the second one refuses</Label>
          <Label anchor="start" x={x0} y={R[2] + 128} size={T}>a remote lock</Label>
        </g>
      ) : (
        <g>
          <Label anchor="start" x={430} y={R[0] + 36}>mutex · semaphore ·</Label>
          <Label anchor="start" x={430} y={R[0] + 54}>atomic instructions</Label>
          <Label anchor="start" x={430} y={R[1] + 30}>apt-get upgrade, twice:</Label>
          <Label anchor="start" tone="red" x={430} y={R[1] + 48}>the second one refuses</Label>
          <Label anchor="start" x={430} y={R[2] + 44}>a remote lock</Label>
        </g>
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·b */

const T6B1 = 'Queue 7 protects nothing';
const D6B1 =
  'Queue 7 is a remote queue with no protection: its only API is pop. Three consumers on three machines each call pop. Consumers 1 and 2 call it at the same moment and both get message 1. There is no lock, and no access to the queue’s server.';
const T6B2 = 'A database as the lock manager';
const D6B2 =
  'The same queue and three consumers, now with a database below them. Each consumer writes to the database. The database holds one entry, queue7 → c1, with a TTL: consumer 1 holds the lock and pops from the queue, consumers 2 and 3 wait. The entry expires on its own. The store needs key-value access, atomic instructions and TTL.';

export function QueueSeven({ layout = 'wide', state = 1 }: { layout?: 'wide' | 'phone'; state?: 1 | 2 }) {
  const P = layout === 'phone';
  const id = `fig6b${state}${P ? '-p' : ''}`;
  const h = state === 1 ? (P ? 272 : 288) : (P ? 390 : 390);
  return (
    <Fig id={id} w={P ? 340 : 700} h={h} title={state === 1 ? T6B1 : T6B2} desc={state === 1 ? D6B1 : D6B2}>
      <QueueScene layout={layout} mode={state === 1 ? 'race' : 'db'} id={id} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule sketch §6 */

const TR6 = 'Nearest shared storage';
const DR6 = 'Three rows of two boxes: threads share memory (a RAM chip), processes share the disk, machines share the network.';

export function NearestStorage({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule6-p' : 'rule6';
  const s = (k: string) => `${id}-${k}`;
  const ROWS = [
    { who: 'threads', via: 'memory' },
    { who: 'processes', via: 'disk' },
    { who: 'machines', via: 'network' },
  ];
  const lx = P ? 86 : 125, b1 = P ? 94 : 140, b2 = P ? 202 : 300, bw = P ? 40 : 50, gc = P ? 168 : 245, rx = P ? 252 : 365;
  return (
    <Fig id={id} w={P ? 320 : 480} h={170} title={TR6} desc={DR6}>
      {ROWS.map((r, i) => {
        const y = 14 + i * 52, mid = y + 18;
        return (
          <g key={i}>
            <Label anchor="end" x={lx} y={mid + 5} size={14}>{r.who}</Label>
            <Box x={b1} y={y + 3} w={bw} h={30} seed={s(`a${i}`)} />
            <Box x={b2} y={y + 3} w={bw} h={30} seed={s(`b${i}`)} />
            <Line pts={[[b1 + bw, mid], [gc - (P ? 22 : 26), mid]]} weight="thin" seed={s(`la${i}`)} />
            <Line pts={[[gc + (P ? 22 : 26), mid], [b2, mid]]} weight="thin" seed={s(`lb${i}`)} />
            {i === 0 && <Chip cx={gc} cy={mid} w={P ? 40 : 48} h={22} label="" seed={s('chip')} />}
            {i === 1 && <Disk cx={gc} cy={mid} w={P ? 40 : 48} h={22} seed={s('disk')} />}
            {i === 2 && <Cloud cx={gc} cy={mid} w={P ? 44 : 52} h={36} seed={s('net')} />}
            <Label kind="mono" anchor="start" x={rx} y={mid + 5} size={14}>{r.via}</Label>
          </g>
        );
      })}
    </Fig>
  );
}
