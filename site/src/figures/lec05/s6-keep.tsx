// Lecture 03 (lec05), §6.4 — Fig 6·a "The store, end of Lecture 3": the key-value store as chapter 5 left it (users,
// lb, kv-api fleet with range routing, two range-sharded masters with a replica and a batch cleanup each), plus the
// store table and a row lock from chapters 1–3. Every part carries a section tag that links to its section (a recap).
// Phone: a vertical list (glyph + tag + one line) instead of the diagram.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Fleet, Label, LoadBalancer, Replica, Worker } from './floor';
import { LockMark, MiniTable } from './s2a-check-in-parts';

const HREF: Record<string, string> = {
  '1.3': '#s1-3', '2.4': '#s2-4', '3.2': '#s3-2', '3.7': '#s3-7', '4.1': '#s4-1',
  '5.1': '#s5-1', '5.2': '#s5-2', '5.3': '#s5-3', '5.4': '#s5-4',
};

function Tag({ x, y, no, anchor = 'middle', size = 14 }: { x: number; y: number; no: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return (
    <a href={HREF[no]} className="fig-tag">
      <Label kind="mono" muted anchor={anchor} x={x} y={y} size={size}>{`§${no}`}</Label>
    </a>
  );
}

const TITLE = 'The store, end of Lecture 3';
const DESC = 'Users reach a load balancer and a fleet of key-value API servers. The API servers hold the routing: keys a to m go to master 1, n to z to master 2. Each master has a read replica that pulls its changes and its own batch cleanup job that deletes expired rows. Inside each master is the store table (key, value, expired_at); a write locks the row it touches. Transactions stay ACID within one master, not across the two. If the data lived in memory, expiry would work the Redis way instead. Each part is tagged with the section that covers it.';

function MasterRow({ y, n, range }: { y: number; n: number; range: string }) {
  const k = `f6a-m${n}`;
  return (
    <g>
      <Cyl cx={430} top={y} rx={36} ry={8} h={46} seed={k} />
      <Label kind="mono" x={430} y={y + 76} size={14}>{`master ${n} · ${range}`}</Label>
      <Replica cx={630} top={y} rx={26} ry={7} h={46} seed={k + 'r'} />
      <Label kind="mono" x={630} y={y + 76} size={14}>replica</Label>
      {/* the replica asks (arrow starts at it); the words say the changes come from the master (F-018) */}
      <Arrow dashed pts={[[600, y + 22], [470, y + 22]]} seed={k + 'pull'} />
      <Label x={535} y={y + 14} size={13}>pulls changes</Label>
      <Label x={535} y={y + 40} size={13}>from master</Label>
      <Worker x={680} y={y + 6} w={172} h={36} label="batch cleanup" size={14} seed={k + 'w'} />
      <Arrow dashed pts={[[766, y + 4], [766, y - 22], [430, y - 22], [430, y - 2]]} seed={k + 'del'} />
    </g>
  );
}

export function StoreEnd({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <StoreEndList />;
  return (
    <Fig id="fig6a" w={880} h={420} title={TITLE} desc={DESC}>
      <Actor x={30} y={124} seed="f6a-user" />
      <Label x={30} y={196} size={14}>users</Label>
      <Arrow tone="blue" pts={[[50, 150], [80, 150]]} seed="f6a-a1" />
      <LoadBalancer x={82} y={110} h={80} seed="f6a-lb" />
      <Tag x={94} y={214} no="5.1" />
      <Arrow tone="blue" pts={[[108, 150], [148, 150]]} seed="f6a-a2" />
      <Fleet x={150} y={128} w={112} h={46} n={3} label="kv-api ×3" countLabel={false} seed="f6a-api" size={14} />
      <Tag x={206} y={92} no="5.1" />
      <Label kind="mono" muted anchor="start" x={124} y={198} size={13}>a–m → m1 · n–z → m2</Label>
      <Tag x={206} y={216} no="5.3" />

      <Arrow tone="blue" pts={[[264, 166], [330, 166], [330, 96], [392, 96]]} seed="f6a-b1" />
      <Arrow tone="blue" pts={[[330, 166], [330, 286], [392, 286]]} seed="f6a-b2" />
      <MasterRow y={74} n={1} range="a–m" />
      <MasterRow y={264} n={2} range="n–z" />
      <Tag x={430} y={168} no="5.3" />
      <Tag x={630} y={168} no="5.2" />
      <Tag x={766} y={136} no="3.7" />
      <Label muted x={470} y={204} size={13}>ACID within a master, not across</Label>
      <Tag x={470} y={222} no="5.4" />

      <MiniTable x={30} y={290} title="store (inside each master)" seed="f6a-store" size={13}
        cols={[{ h: 'key', w: 46 }, { h: 'value', w: 66 }, { h: 'expired_at', w: 112 }]}
        rows={[['k1', 'v2', 'now + 60'], ['a', '…', '-1']]} />
      <LockMark x={268} y={328} tone="ink" seed="f6a-lock" />
      <Label kind="mono" anchor="start" x={280} y={334} size={13}>T1</Label>
      <Tag x={30} y={390} no="3.2" anchor="start" />
      <Tag x={268} y={360} no="1.3" anchor="start" />
      <Tag x={268} y={378} no="2.4" anchor="start" />

      <a href={HREF['4.1']} className="fig-tag">
        <Label muted x={760} y={190} size={14}>if it lived in memory: §4.1</Label>
      </a>
    </Fig>
  );
}

function StoreEndList() {
  const rows: { no: string; name: string; line: string; glyph: (y: number) => React.ReactNode }[] = [
    { no: '5.1', name: 'kv-api ×3', line: 'API servers behind the lb', glyph: (y) => <g><Box x={20} y={y - 16} w={36} h={20} faint seed="f6a-p-g1b" /><Box x={14} y={y - 10} w={36} h={20} seed="f6a-p-g1" /></g> },
    { no: '5.3', name: 'range routing', line: 'a–m → master 1, n–z → master 2', glyph: (y) => <Label kind="mono" x={35} y={y + 5} size={13}>a–m</Label> },
    { no: '3.2', name: 'store table', line: 'key · value · expired_at', glyph: (y) => <Cyl cx={35} top={y - 14} rx={18} ry={5} h={22} seed="f6a-p-g3" /> },
    { no: '1.3', name: 'row locks', line: 'FOR UPDATE; SKIP LOCKED (§2.4–2.5)', glyph: (y) => <LockMark x={35} y={y} tone="ink" seed="f6a-p-g4" /> },
    { no: '3.7', name: 'batch cleanup', line: 'one job deletes expired rows', glyph: (y) => <Worker x={10} y={y - 14} w={52} h={26} label="" seed="f6a-p-g5" /> },
    { no: '5.2', name: 'replicas', line: 'pull changes from their master', glyph: (y) => <Replica cx={35} top={y - 14} rx={18} ry={5} h={22} seed="f6a-p-g6" /> },
    { no: '5.4', name: 'ACID', line: 'within one master, not across', glyph: (y) => <Label kind="mono" x={35} y={y + 5} size={13}>ACID</Label> },
    { no: '4.1', name: 'if in memory', line: 'delete on access, sample 20', glyph: (y) => <Label kind="mono" x={35} y={y + 5} size={13}>RAM</Label> },
  ];
  const RH = 50, Y0 = 30;
  return (
    <Fig id="fig6a-p" w={340} h={Y0 + rows.length * RH} title={TITLE} desc={DESC}>
      {rows.map((r, i) => {
        const y = Y0 + i * RH;
        return (
          <g key={r.no + r.name}>
            {r.glyph(y)}
            <a href={HREF[r.no]} className="fig-tag">
              <Label kind="mono" muted anchor="start" x={76} y={y - 4} size={14}>{`§${r.no}`}</Label>
            </a>
            <Label kind="mono" anchor="start" x={124} y={y - 4} size={14}>{r.name}</Label>
            <Label muted anchor="start" x={76} y={y + 15} size={14}>{r.line}</Label>
          </g>
        );
      })}
    </Fig>
  );
}
