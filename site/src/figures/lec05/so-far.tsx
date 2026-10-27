// Lecture 03 (lec05): the "so far" map shown at the top of every chapter. One small drawing per build that grows
// chapter by chapter. Each chapter opens on the design as it stands, with the piece the previous chapter added on a
// blue wash with a "new" note (stage 0 is the starting design, nothing marked).
//   check-in: 120 kiosks → check-in → MySQL, and the booking query: unchecked UPDATE → first free seat →
//             + FOR UPDATE → + SKIP LOCKED
//   kv store: client → kv api → MySQL `store`: key/value → expired_at + cleanup job → GET filter, DELETE as -1 →
//             PUT as upsert → (stage 4: the same, nothing marked)
// Desk layouts are 640 wide (shown ~1:1 on a laptop); phone layouts are 330 wide.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Actor, Arrow, Box, Cyl, Fig, Label, Worker } from './floor';
import { MiniTable } from './s2a-check-in-parts';

export type SeatsStage = 0 | 1 | 2 | 3;
export type StoreStage = 0 | 1 | 2 | 3 | 4;
type Layout = 'desk' | 'phone';

/** The blue wash behind the piece a chapter adds, with a small "new" note. */
function New({ x, y, w, h, seed, nx, ny, anchor = 'start' }: {
  x: number; y: number; w: number; h: number; seed: string; nx: number; ny: number; anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 7, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      <Label muted x={nx} y={ny} anchor={anchor} size={13}>new</Label>
    </g>
  );
}

/* ------------------------------------------------------------------ the check-in */

const SEATS_DESC: Record<SeatsStage, string> = {
  0: 'The check-in so far: 120 kiosks call a check-in service, which writes to the seats table in MySQL. The booking query is a plain UPDATE of a seat, with no checks.',
  1: 'The check-in so far: 120 kiosks, the check-in service and MySQL. The booking query now selects the first free seat, WHERE user_id IS NULL ORDER BY id LIMIT 1, then updates it and commits. Marked new: the first-free-seat condition.',
  2: 'The check-in so far: 120 kiosks, the check-in service and MySQL. The first-free-seat query now ends with FOR UPDATE. Marked new: FOR UPDATE.',
  3: 'The check-in so far: 120 kiosks, the check-in service and MySQL. The first-free-seat query ends with FOR UPDATE SKIP LOCKED; a seat the passenger chose is booked without SKIP LOCKED. Marked new: SKIP LOCKED.',
};

function seatLines(stage: SeatsStage): { t: string; muted?: boolean }[] {
  if (stage === 0) return [{ t: 'UPDATE seats' }, { t: 'SET user_id = ?' }, { t: 'WHERE id = ?' }, { t: 'any seat, no checks', muted: true }];
  const l = [{ t: 'SELECT … FROM seats' }, { t: 'WHERE user_id IS NULL' }, { t: 'ORDER BY id LIMIT 1' }];
  if (stage === 1) return [...l, { t: 'then UPDATE, COMMIT', muted: true }];
  if (stage === 2) return [...l, { t: 'FOR UPDATE' }];
  return [...l, { t: 'FOR UPDATE SKIP LOCKED' }, { t: 'a chosen seat: no SKIP LOCKED', muted: true }];
}

function SeatsDesk({ stage }: { stage: SeatsStage }) {
  const id = `sf-seats${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const ys = [42, 64, 86, 108, 130];
  return (
    <Fig id={id} w={640} h={188} title="The check-in so far" desc={SEATS_DESC[stage]}>
      {stage === 1 && <New x={362} y={49} w={200} h={44} seed={s('n')} nx={570} ny={75} />}
      {stage === 2 && <New x={362} y={93} w={98} h={22} seed={s('n')} nx={468} ny={109} />}
      {stage === 3 && <New x={448} y={93} w={104} h={22} seed={s('n')} nx={560} ny={109} />}

      {[30, 54, 78].map((x, i) => <Actor key={x} x={x} y={44} s={0.8} seed={s('a' + i)} />)}
      <Label x={54} y={110} size={14}>120 kiosks</Label>
      <Arrow tone="blue" pts={[[96, 68], [146, 68]]} seed={s('a1')} />
      <Box x={148} y={48} w={96} h={40} label="check-in" seed={s('ci')} />
      <Arrow tone="blue" pts={[[244, 68], [288, 68]]} seed={s('a2')} />
      <Cyl cx={316} top={48} rx={24} ry={6} h={36} label="mysql" seed={s('db')} />

      {seatLines(stage).map((l, i) => (
        <Label key={i} kind={l.muted ? 'hand' : 'mono'} muted={l.muted} anchor="start" x={370} y={ys[i]} size={13}>{l.t}</Label>
      ))}

      <Label kind="title" x={320} y={176}>the check-in so far</Label>
    </Fig>
  );
}

function SeatsPhone({ stage }: { stage: SeatsStage }) {
  const id = `sf-seats${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const ys = [118, 140, 162, 184, 206];
  return (
    <Fig id={id} w={330} h={262} title="The check-in so far" desc={SEATS_DESC[stage]}>
      {stage === 1 && <New x={8} y={125} w={196} h={44} seed={s('n')} nx={212} ny={151} />}
      {stage === 2 && <New x={8} y={169} w={100} h={22} seed={s('n')} nx={116} ny={185} />}
      {stage === 3 && <New x={98} y={169} w={106} h={22} seed={s('n')} nx={212} ny={185} />}

      {[20, 38, 56].map((x, i) => <Actor key={x} x={x} y={22} s={0.7} seed={s('a' + i)} />)}
      <Label x={38} y={82} size={13.5}>120 kiosks</Label>
      <Arrow tone="blue" pts={[[70, 42], [100, 42]]} seed={s('a1')} />
      <Box x={102} y={24} w={88} h={36} label="check-in" seed={s('ci')} />
      <Arrow tone="blue" pts={[[190, 42], [222, 42]]} seed={s('a2')} />
      <Cyl cx={250} top={24} rx={20} ry={5} h={30} label="mysql" seed={s('db')} />

      {seatLines(stage).map((l, i) => (
        <Label key={i} kind={l.muted ? 'hand' : 'mono'} muted={l.muted} anchor="start" x={16} y={ys[i]} size={13.5}>{l.t}</Label>
      ))}

      <Label kind="title" x={165} y={252}>the check-in so far</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ the key-value store */

const STORE_DESC: Record<StoreStage, string> = {
  0: 'The key-value store so far: a client calls a key-value API server, which talks to one MySQL table called store, with the key as primary key and the value. GET reads by key; PUT inserts; how DELETE and per-key expiry work is still open.',
  1: 'The key-value store so far: client, key-value API, one MySQL table. Marked new: an expired_at column, the absolute expiry time, with an index on it, and a cleanup job that runs every 10 minutes: DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP().',
  2: 'The key-value store so far: client, key-value API, MySQL table store (key, value, expired_at) and the cleanup job. Marked new: GET adds AND expired_at > UNIX_TIMESTAMP(), and DELETE sets expired_at to -1 when the key is still live.',
  3: 'The key-value store so far: client, key-value API, MySQL table store (key, value, expired_at) and the cleanup job; GET filters expired keys, DELETE sets expired_at to -1. Marked new: PUT is one upsert, INSERT … ON DUPLICATE KEY UPDATE.',
  4: 'The key-value store on one node: client, key-value API, MySQL table store (key, value, expired_at, indexed) and a cleanup job every 10 minutes. GET filters expired keys in SQL, DELETE sets expired_at to -1 when the key is live, PUT is one upsert, and the cleanup deletes every row with expired_at <= UNIX_TIMESTAMP().',
};

function storeOps(stage: StoreStage, phone: boolean): { op: string; q: string; muted?: boolean }[] {
  return [
    { op: 'get', q: stage >= 2 ? 'AND expired_at > UNIX_TIMESTAMP()' : 'WHERE `key` = k' },
    { op: 'del', q: stage >= 2 ? (phone ? 'SET expired_at = -1 if live' : 'SET expired_at = -1 if still live') : '?', muted: stage < 2 },
    { op: 'put', q: stage >= 3 ? (phone ? 'upsert, one statement' : 'INSERT … ON DUPLICATE KEY UPDATE') : stage >= 1 ? 'INSERT (k, v, exp)' : 'INSERT (k, v)' },
    stage >= 1
      ? { op: 'clean', q: 'expired_at <= UNIX_TIMESTAMP()' }
      : { op: 'ttl', q: '?', muted: true },
  ];
}

function storeCols(stage: StoreStage, phone: boolean) {
  const c = [{ h: 'key (pk)', w: phone ? 76 : 90 }, { h: 'value', w: phone ? 62 : 76 }];
  return stage >= 1 ? [...c, { h: 'expired_at', w: phone ? 106 : 112 }] : c;
}

function StoreDesk({ stage }: { stage: StoreStage }) {
  const id = `sf-store${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const ys = [114, 138, 162, 186];
  return (
    <Fig id={id} w={640} h={236} title="The key-value store so far" desc={STORE_DESC[stage]}>
      {stage === 1 && <g>
        <New x={460} y={26} w={124} h={62} seed={s('n1')} nx={592} ny={60} />
        <New x={292} y={170} w={318} h={24} seed={s('n2')} nx={612} ny={187} />
      </g>}
      {stage === 2 && <New x={292} y={98} w={318} h={48} seed={s('n')} nx={612} ny={126} />}
      {stage === 3 && <New x={292} y={146} w={318} h={24} seed={s('n')} nx={612} ny={163} />}

      <Actor x={28} y={40} seed={s('u')} />
      <Label x={28} y={108} size={14}>client</Label>
      <Arrow tone="blue" pts={[[48, 62], [86, 62]]} seed={s('a1')} />
      <Box x={88} y={42} w={84} h={40} label="kv api" seed={s('api')} />
      <Arrow pts={[[172, 62], [210, 62]]} seed={s('a2')} />
      <Cyl cx={238} top={40} rx={24} ry={6} h={36} label="mysql" seed={s('db')} />
      {stage >= 1 && <g>
        <Worker x={184} y={140} w={108} h={34} label="cleanup" seed={s('job')} />
        <Arrow pts={[[238, 138], [238, 110]]} seed={s('a3')} />
        <Label muted x={238} y={194} size={13}>every 10 min</Label>
      </g>}

      <MiniTable x={300} y={34} title="store" cols={storeCols(stage, false)} rows={[stage >= 1 ? ['k1', 'v1', '12:02'] : ['k1', 'v1']]} seed={s('t')} />

      {storeOps(stage, false).map((o, i) => (
        <g key={o.op}>
          <Label anchor="start" x={300} y={ys[i]} size={13}>{o.op}</Label>
          <Label kind="mono" muted={o.muted} anchor="start" x={350} y={ys[i]} size={12.5}>{o.q}</Label>
        </g>
      ))}

      <Label kind="title" x={320} y={226}>the key-value store so far</Label>
    </Fig>
  );
}

function StorePhone({ stage }: { stage: StoreStage }) {
  const id = `sf-store${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const ys = [214, 244, 274, 304];
  return (
    <Fig id={id} w={330} h={350} title="The key-value store so far" desc={STORE_DESC[stage]}>
      {stage === 1 && <g>
        <New x={146} y={126} w={120} h={62} seed={s('n1')} nx={272} ny={162} />
        <New x={4} y={290} w={322} h={22} seed={s('n2')} nx={322} ny={286} anchor="end" />
      </g>}
      {stage === 2 && <New x={4} y={200} w={322} h={50} seed={s('n')} nx={322} ny={196} anchor="end" />}
      {stage === 3 && <New x={4} y={260} w={322} h={22} seed={s('n')} nx={322} ny={256} anchor="end" />}

      <Actor x={20} y={28} s={0.8} seed={s('u')} />
      <Label x={20} y={88} size={13.5}>client</Label>
      <Arrow tone="blue" pts={[[36, 48], [64, 48]]} seed={s('a1')} />
      <Box x={66} y={30} w={70} h={36} label="kv api" seed={s('api')} />
      <Arrow pts={[[136, 48], [166, 48]]} seed={s('a2')} />
      <Cyl cx={192} top={28} rx={20} ry={5} h={30} label="mysql" seed={s('db')} />
      {stage >= 1 && <g>
        <Worker x={234} y={30} w={90} h={34} label="cleanup" seed={s('job')} />
        <Arrow pts={[[232, 47], [214, 47]]} seed={s('a3')} />
      </g>}

      <MiniTable x={12} y={134} title="store" cols={storeCols(stage, true)} rows={[stage >= 1 ? ['k1', 'v1', '12:02'] : ['k1', 'v1']]} seed={s('t')} size={13.5} />

      {storeOps(stage, true).map((o, i) => (
        <g key={o.op}>
          <Label anchor="start" x={12} y={ys[i]} size={13.5}>{o.op}</Label>
          <Label kind="mono" muted={o.muted} anchor="start" x={60} y={ys[i]} size={13.5}>{o.q}</Label>
        </g>
      ))}

      <Label kind="title" x={165} y={342}>the key-value store so far</Label>
    </Fig>
  );
}

export function SoFarSeats({ stage, layout = 'desk' }: { stage: SeatsStage; layout?: Layout }) {
  return layout === 'phone' ? <SeatsPhone stage={stage} /> : <SeatsDesk stage={stage} />;
}

export function SoFarStore({ stage, layout = 'desk' }: { stage: StoreStage; layout?: Layout }) {
  return layout === 'phone' ? <StorePhone stage={stage} /> : <StoreDesk stage={stage} />;
}
