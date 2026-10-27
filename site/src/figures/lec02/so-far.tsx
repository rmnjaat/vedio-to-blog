// Lecture 04 (lec02): the "so far" maps shown at the top of every chapter. One small drawing per build that grows
// chapter by chapter. Each chapter opens on the design as it stands, with the piece the previous chapter added on a
// blue wash with a "new" note (stage 0 is the starting state, nothing marked).
//   field guide (build 1): five families, what each is good at and what it gives up, filled in chapter by chapter:
//             0 nothing → 1 relational → 2 document + key-value → 3 column (graph is filled in by chapter 4 itself)
//   Slack (build 2): users and a sharded message store → 1 the four tables, sharded by channel_id → 2 the send road
//             (http → api → save → push from ws1) → 3 E on ws2, a tcp link → 4 redis pub/sub + balancer
//             → 5 timed fetch, three replicas, no db credentials on the ws servers
// Desk layouts are 640 wide (shown ~1:1 on a laptop); phone layouts are 330 wide. Built only from kit parts.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Actor, Arrow, Line, Fig, Label, Box, Cyl, EdgeServer, PubSub, Balancer } from './s1-nosql-kit';
import { WsLine } from './s8a-websockets-parts';

export type GuideStage = 0 | 1 | 2 | 3;
export type SlackStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;
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

/* ------------------------------------------------------------------ the field guide */

const FAMILIES: { name: string; good: string; gives: string; from: number }[] = [
  { name: 'relational', good: 'correct data: FK checks, ACID', gives: 'spreading for free: shard it yourself', from: 1 },
  { name: 'document', good: 'queries inside, one-field updates', gives: 'thousands of partitions', from: 2 },
  { name: 'key-value', good: 'one key per op: 1,000s of shards', gives: 'any query inside the value', from: 2 },
  { name: 'column layout', good: 'reading 2 of 100 columns', gives: 'whole-row reads, cheap inserts', from: 3 },
  { name: 'graph', good: '', gives: '', from: 9 },
];

const GUIDE_DESC: Record<GuideStage, string> = {
  0: 'The field guide so far: five kinds of store, relational, document, key-value, column and graph, with a question mark where each one’s strength and its price will go.',
  1: 'The field guide so far. Relational: good at correct data, through foreign-key checks and ACID; gives up spreading for free, so you shard it yourself, because the checks want related data in one place. Marked new. The other four families are still question marks.',
  2: 'The field guide so far. Relational: correct data, gives up spreading out. Marked new: document, good at queries inside a value and one-field updates, gives up thousands of partitions; key-value, one key per operation and thousands of shards, gives up any query inside the value. Column and graph are still question marks.',
  3: 'The field guide so far. Relational: correct data, gives up spreading out. Document: queries inside, gives up thousands of partitions. Key-value: one key per operation, gives up queries inside the value. Marked new: column, good at reading 2 of 100 columns, gives up whole-row reads and cheap inserts. Graph is still a question mark.',
};

function GuideDesk({ stage }: { stage: GuideStage }) {
  const id = `sf-guide${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const ys = [58, 94, 130, 166, 202];
  return (
    <Fig id={id} w={640} h={262} title="The field guide so far" desc={GUIDE_DESC[stage]}>
      {stage === 1 && <New x={8} y={ys[0] - 20} w={592} h={30} seed={s('n')} nx={630} ny={ys[0]} anchor="end" />}
      {stage === 2 && <New x={8} y={ys[1] - 20} w={592} h={66} seed={s('n')} nx={630} ny={ys[1] + 18} anchor="end" />}
      {stage === 3 && <New x={8} y={ys[3] - 20} w={592} h={30} seed={s('n')} nx={630} ny={ys[3]} anchor="end" />}

      <Label muted anchor="start" x={16} y={26} size={13}>family</Label>
      <Label muted anchor="start" x={140} y={26} size={13}>good at</Label>
      <Label muted anchor="start" x={380} y={26} size={13}>gives up</Label>
      <Line pts={[[14, 36], [598, 36]]} weight="thin" seed={s('rule')} />
      {FAMILIES.map((f, i) => {
        const shown = stage >= f.from;
        return (
          <g key={f.name}>
            <Label anchor="start" x={16} y={ys[i]}>{f.name}</Label>
            {shown
              ? <Label anchor="start" x={140} y={ys[i]} size={13}>{f.good}</Label>
              : <Label muted anchor="start" x={140} y={ys[i]}>?</Label>}
            {shown
              ? <Label anchor="start" x={380} y={ys[i]} size={13}>{f.gives}</Label>
              : <Label muted anchor="start" x={380} y={ys[i]}>?</Label>}
          </g>
        );
      })}
      <Label kind="title" x={320} y={250}>the field guide so far</Label>
    </Fig>
  );
}

function GuidePhone({ stage }: { stage: GuideStage }) {
  const id = `sf-guide${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const y0 = [56, 122, 188, 254, 320];
  return (
    <Fig id={id} w={330} h={412} title="The field guide so far" desc={GUIDE_DESC[stage]}>
      {stage === 1 && <New x={4} y={y0[0] - 18} w={322} h={64} seed={s('n')} nx={322} ny={y0[0]} anchor="end" />}
      {stage === 2 && <New x={4} y={y0[1] - 18} w={322} h={130} seed={s('n')} nx={322} ny={y0[1]} anchor="end" />}
      {stage === 3 && <New x={4} y={y0[3] - 18} w={322} h={64} seed={s('n')} nx={322} ny={y0[3]} anchor="end" />}

      <Label muted anchor="start" x={12} y={22} size={13.5}>+ good at   − gives up</Label>
      {FAMILIES.map((f, i) => {
        const shown = stage >= f.from;
        return (
          <g key={f.name}>
            <Label anchor="start" x={12} y={y0[i]} size={14}>{f.name}</Label>
            {shown ? (
              <g>
                <Label anchor="start" x={24} y={y0[i] + 20} size={13.5}>{'+ ' + f.good}</Label>
                <Label anchor="start" x={24} y={y0[i] + 40} size={13.5}>{'− ' + f.gives}</Label>
              </g>
            ) : <Label muted anchor="start" x={24} y={y0[i] + 20} size={13.5}>?</Label>}
          </g>
        );
      })}
      <Label kind="title" x={165} y={400}>the field guide so far</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Slack */

const TABLES = ['users', 'channels (type)', 'membership (checkpoint)', 'messages (channel_id)'];
const LATER = ['client: timed fetch of the last 50', 'db: three replicas', 'ws servers: no db credentials'];

const SLACK_DESC: Record<SlackStage, string> = {
  0: 'The Slack design so far: users in one organisation and a sharded store for their messages. How a message travels from one user to the others is still a question mark.',
  1: 'The Slack design so far: users and the messages database, sharded by channel_id. Marked new: four tables, users, channels with a type, membership with a checkpoint, and messages that point at one channel. How a message travels is still a question mark.',
  2: 'The Slack design so far: users A to E, the messages database sharded by channel_id, and four tables. Marked new: A sends over HTTP to an API server, which saves the message, then hands it to WebSocket server ws1, which pushes it to the members over their WebSockets.',
  3: 'The Slack design so far: the send road from A over HTTP to the API server, saved, then pushed by ws1 to A to D. Marked new: E is connected to a second WebSocket server, ws2, which ws1 reaches over a plain TCP link.',
  4: 'The Slack design so far: the send road, ws1 with A to D and ws2 with E. Marked new: the TCP link is gone; both servers are linked to a Redis Pub/Sub instead, and a Balancer tells each client which WebSocket server to connect to.',
  5: 'The Slack design so far: users, the API server and the sharded messages database, two WebSocket servers joined through a Redis Pub/Sub, and the Balancer. Marked new: the client fetches the last 50 messages on a timer, the database keeps three replicas, and the WebSocket servers hold no database credentials.',
  6: 'The whole Slack design: A sends over HTTP to the API server, which saves the message in the messages database, sharded by channel_id with three replicas, then hands it to WebSocket server ws1, which pushes it to A to D. ws1 and ws2, where E is connected, share messages through a Redis Pub/Sub, and a Balancer tells each client where to connect. Tables: users, channels with a type, membership with a checkpoint, messages. The client fetches the last 50 messages on a timer, and the WebSocket servers hold no database credentials.',
};

function SlackDesk({ stage }: { stage: SlackStage }) {
  const id = `sf-slack${stage}`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={640} h={292} title={stage === 6 ? 'The whole Slack design' : 'The Slack design so far'} desc={SLACK_DESC[stage]}>
      {stage === 1 && <New x={400} y={16} w={210} h={92} seed={s('n')} nx={614} ny={34} />}
      {stage === 2 && <New x={140} y={20} w={150} h={132} seed={s('n')} nx={290} ny={166} anchor="end" />}
      {stage === 3 && <New x={22} y={150} w={232} h={94} seed={s('n')} nx={258} ny={244} />}
      {stage === 4 && <g>
        <New x={262} y={146} w={126} h={66} seed={s('n1')} nx={392} ny={218} />
        <New x={402} y={112} w={136} h={66} seed={s('n2')} nx={542} ny={130} />
      </g>}
      {stage === 5 && <New x={402} y={186} w={232} h={68} seed={s('n')} nx={634} ny={180} anchor="end" />}

      <Actor x={40} y={66} seed={s('a')} />
      <Label kind="mono" anchor="start" x={58} y={70}>A</Label>
      <Label muted x={40} y={134} size={13}>{stage >= 3 ? 'A–D' : 'A–E'}</Label>

      <Cyl cx={330} top={22} rx={30} h={40} label="messages" sub={stage >= 1 ? 'by channel_id' : 'sharded'} seed={s('db')} />

      {stage >= 1 && TABLES.map((t, i) => (
        <Label key={t} kind="mono" anchor="start" x={410} y={36 + i * 22} size={13}>{t}</Label>
      ))}

      {stage < 2 && <Label muted x={198} y={150} size={34}>?</Label>}

      {stage >= 2 && <g>
        <Arrow tone="blue" pts={[[60, 80], [148, 48]]} seed={s('send')} />
        <Label anchor="middle" x={96} y={42} size={13}>send (http)</Label>
        <Box x={150} y={28} w={96} h={34} label="api" seed={s('api')} />
        <Arrow tone="green" pts={[[246, 44], [298, 44]]} seed={s('save')} />
        <Label x={272} y={34} size={13}>save</Label>
        <Arrow dashed pts={[[198, 62], [198, 106]]} seed={s('push')} />
        <Label anchor="start" x={206} y={90} size={13}>then push</Label>
        <EdgeServer x={150} y={110} w={96} h={34} label="ws1" seed={s('ws1')} />
        <WsLine pts={[[150, 127], [62, 98]]} seed={s('wsA')} />
      </g>}

      {stage >= 3 && <g>
        <Actor x={40} y={190} seed={s('e')} />
        <Label kind="mono" anchor="start" x={58} y={196}>E</Label>
        <EdgeServer x={150} y={196} w={96} h={34} label="ws2" seed={s('ws2')} />
        <WsLine pts={[[150, 213], [60, 212]]} seed={s('wsE')} />
      </g>}

      {stage === 3 && <g>
        <Line pts={[[198, 144], [198, 196]]} seed={s('tcp')} />
        <Label kind="mono" anchor="start" x={206} y={176} size={13}>tcp</Label>
      </g>}

      {stage >= 4 && <g>
        <PubSub x={270} cy={170} w={110} seed={s('ps')} />
        <Line pts={[[246, 127], [274, 162]]} weight="thin" seed={s('l1')} />
        <Line pts={[[246, 213], [274, 178]]} weight="thin" seed={s('l2')} />
        <Label kind="mono" x={325} y={202} size={13}>redis pub/sub</Label>
        <Balancer x={410} y={120} w={120} h={32} label="balancer" seed={s('bal')} />
        <Label muted x={470} y={170} size={13}>where to connect</Label>
      </g>}

      {stage >= 5 && LATER.map((t, i) => (
        <Label key={t} anchor="start" x={410} y={206 + i * 20} size={13}>{t}</Label>
      ))}

      <Label kind="title" x={320} y={282}>{stage === 6 ? 'the whole Slack design' : 'the Slack design so far'}</Label>
    </Fig>
  );
}

function SlackPhone({ stage }: { stage: SlackStage }) {
  const id = `sf-slack${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={330} h={454} title={stage === 6 ? 'The whole Slack design' : 'The Slack design so far'} desc={SLACK_DESC[stage]}>
      {stage === 1 && <New x={4} y={246} w={322} h={90} seed={s('n')} nx={322} ny={244} anchor="end" />}
      {stage === 2 && <New x={44} y={6} w={186} h={142} seed={s('n')} nx={234} ny={156} />}
      {stage === 3 && <New x={4} y={150} w={210} h={92} seed={s('n')} nx={218} ny={242} />}
      {stage === 4 && <g>
        <New x={214} y={98} w={112} h={40} seed={s('n2')} nx={322} ny={94} anchor="end" />
        <New x={214} y={146} w={112} h={72} seed={s('n1')} nx={322} ny={234} anchor="end" />
      </g>}
      {stage === 5 && <New x={4} y={340} w={322} h={70} seed={s('n')} nx={322} ny={338} anchor="end" />}

      <Actor x={30} y={22} s={0.85} seed={s('a')} />
      <Label kind="mono" anchor="start" x={44} y={26} size={13.5}>A</Label>
      <Label muted x={30} y={84} size={13.5}>{stage >= 3 ? 'A–D' : 'A–E'}</Label>

      <Cyl cx={276} top={12} rx={24} h={32} label="messages" sub={stage >= 1 ? 'by channel_id' : 'sharded'} seed={s('db')} />

      {stage < 2 && <Label muted x={150} y={160} size={34}>?</Label>}

      {stage >= 2 && <g>
        <Arrow tone="blue" pts={[[48, 36], [104, 32]]} seed={s('send')} />
        <Box x={106} y={14} w={84} h={32} label="api" seed={s('api')} />
        <Arrow tone="green" pts={[[190, 30], [248, 30]]} seed={s('save')} />
        <Arrow dashed pts={[[148, 46], [148, 104]]} seed={s('push')} />
        <Label anchor="start" x={156} y={82} size={13.5}>then push</Label>
        <EdgeServer x={106} y={106} w={84} h={32} label="ws1" seed={s('ws1')} />
        <WsLine pts={[[106, 122], [46, 66]]} seed={s('wsA')} />
      </g>}

      {stage >= 3 && <g>
        <Actor x={30} y={176} s={0.85} seed={s('e')} />
        <Label kind="mono" anchor="start" x={44} y={180} size={13.5}>E</Label>
        <EdgeServer x={106} y={196} w={84} h={32} label="ws2" seed={s('ws2')} />
        <WsLine pts={[[106, 212], [46, 206]]} seed={s('wsE')} />
      </g>}

      {stage === 3 && <g>
        <Line pts={[[148, 138], [148, 196]]} seed={s('tcp')} />
        <Label kind="mono" anchor="start" x={156} y={172} size={13.5}>tcp</Label>
      </g>}

      {stage >= 4 && <g>
        <PubSub x={222} cy={180} w={98} seed={s('ps')} />
        <Line pts={[[190, 122], [226, 172]]} weight="thin" seed={s('l1')} />
        <Line pts={[[190, 212], [226, 188]]} weight="thin" seed={s('l2')} />
        <Label kind="mono" x={271} y={212} size={13.5}>redis</Label>
        <Balancer x={220} y={102} w={102} h={32} label="balancer" seed={s('bal')} />
      </g>}

      {stage >= 1 && TABLES.map((t, i) => (
        <Label key={t} kind="mono" anchor="start" x={12} y={266 + i * 20} size={13.5}>{t}</Label>
      ))}

      {stage >= 5 && LATER.map((t, i) => (
        <Label key={t} anchor="start" x={12} y={360 + i * 20} size={13.5}>{t}</Label>
      ))}

      <Label kind="title" x={165} y={442}>{stage === 6 ? 'the whole Slack design' : 'the Slack design so far'}</Label>
    </Fig>
  );
}

export function SoFarGuide({ stage, layout = 'desk' }: { stage: GuideStage; layout?: Layout }) {
  return layout === 'phone' ? <GuidePhone stage={stage} /> : <GuideDesk stage={stage} />;
}

export function SoFarSlack({ stage, layout = 'desk' }: { stage: SlackStage; layout?: Layout }) {
  return layout === 'phone' ? <SlackPhone stage={stage} /> : <SlackDesk stage={stage} />;
}
