// Lecture 01, §6 — Fig 6·a "Medium, end of Lecture 1": the request route of Fig 1·f (browser, cdn, lb / api gateway,
// api ram + disk, redis, database) grown with everything the lecture added: the api fleet behind the lb, read replicas
// that pull from the master, shards as the later option, kafka with search and counter consumers, and the ws / sse
// channel back to the readers. Every part carries a section tag that links to its section (a recap; no new ids).
// Phone: a vertical list (glyph + tag + one line) instead of the diagram.
import React from 'react';
import {
  Actor, Arrow, Box, Client, Cloud, Cube, Cyl, Dot, Fig, Fleet, Label, LoadBalancer, Pipe, Replica, Worker,
} from '../kit/Kit';

/** Section ids the tags link to. The page's sections use ids s<chapter>-<n> (as #s2-4) and #s6. */
const HREF: Record<string, string> = {
  '1.1': '#s1-1', '1.2': '#s1-2', '1.3': '#s1-3', '1.4': '#s1-4', '1.5': '#s1-5', '1.6': '#s1-6', '1.7': '#s1-7',
  '2.2': '#s2-2', '2.4': '#s2-4', '3.5': '#s3-5', '3.6': '#s3-6', '4.3': '#s4-3', '5.4': '#s5-4', '5.5': '#s5-5', '5.7': '#s5-7',
};

/** A section tag: mono, muted, a link to the section. */
function Tag({ x, y, no, anchor = 'middle', size = 15 }: { x: number; y: number; no: string; anchor?: 'start' | 'middle' | 'end'; size?: number }) {
  return (
    <a href={HREF[no]} className="fig-tag">
      <Label kind="mono" muted anchor={anchor} x={x} y={y} size={size}>{`§${no}`}</Label>
    </a>
  );
}

const TITLE = 'Medium, end of Lecture 1';
const DESC =
  'A reader’s request runs from the browser through the CDN and the load balancer or API gateway to a fleet of five API servers, each with its own RAM and disk cache and a shared Redis, and on to the master database, which can hold materialized views. Read replicas connect to the master and pull its changes; shards are the next step when writes outgrow one master. The API servers hand events to Kafka without waiting, and a search consumer and a counter consumer each pull from it. Live updates such as claps go back to readers over a WebSocket or server-sent events. Each part is tagged with the section that covers it.';

export function MediumEnd({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <MediumEndList />;
  return (
    <Fig id="fig6a" w={880} h={440} title={TITLE} desc={DESC}>
      {/* the reader and the route */}
      <Actor x={30} y={126} s={1} seed="f6a-reader" />
      <Label x={30} y={212} size={15}>reader</Label>
      <Client x={56} y={134} w={50} h={38} seed="f6a-browser" />
      <Label kind="mono" x={81} y={190} size={15}>browser</Label>
      <Tag x={81} y={124} no="1.4" />

      <Arrow tone="blue" pts={[[108, 153], [146, 153]]} seed="f6a-r1" />
      <Cloud cx={181} cy={153} w={70} h={44} label="cdn" seed="f6a-cdn" size={15} />
      <Tag x={181} y={124} no="1.5" />

      <Arrow tone="blue" pts={[[216, 153], [254, 153]]} seed="f6a-r2" />
      <LoadBalancer x={256} y={112} w={24} h={84} label="lb / gw" seed="f6a-lb" size={15} />
      <Tag x={268} y={220} no="1.6" />
      <Tag x={268} y={238} no="2.2" />

      <Arrow tone="blue" pts={[[282, 153], [326, 153]]} seed="f6a-r3" />
      <Fleet x={328} y={128} w={98} h={50} n={5} label="api ×5" countLabel={false} seed="f6a-api" size={15} />
      <Dot x={418} y={136} />
      <Label muted anchor="start" x={344} y={196} size={15}>ram · disk</Label>
      <Tag x={474} y={92} no="1.2" anchor="start" />
      <Tag x={474} y={110} no="1.3" anchor="start" />
      <Tag x={474} y={128} no="2.2" anchor="start" />

      {/* shared cache */}
      <Cube x={321} y={28} s={30} d={8} seed="f6a-redis" />
      <Label kind="mono" anchor="start" x={364} y={56} size={15}>redis</Label>
      <Arrow tone="blue" pts={[[336, 126], [336, 66]]} seed="f6a-rr" />
      <Tag x={414} y={56} no="1.1" anchor="start" />

      {/* the database, replicas and (later) shards */}
      <Arrow tone="blue" pts={[[444, 160], [536, 160]]} seed="f6a-r4" />
      <Cyl cx={572} top={128} rx={34} ry={8} h={54} seed="f6a-master" />
      <Label kind="mono" x={572} y={208} size={15}>master</Label>
      <Label muted x={572} y={226} size={15}>materialized views</Label>
      <Tag x={548} y={116} no="1.7" />
      <Tag x={596} y={116} no="2.4" />
      <Replica cx={736} top={128} rx={32} ry={8} h={54} seed="f6a-replica" />
      <Label kind="mono" x={736} y={208} size={15}>replica ×N</Label>
      <Arrow dashed pts={[[702, 146], [608, 146]]} seed="f6a-pull" />
      <Arrow dashed pts={[[608, 172], [702, 172]]} seed="f6a-copy" />
      <Label x={655} y={137} size={15}>pulls</Label>
      <Tag x={736} y={116} no="2.4" />
      <a href={HREF['4.3']} className="fig-tag">
        <Label muted x={655} y={250} size={15}>§4.3 · claps = claps + 1, in SQL</Label>
      </a>
      <g className="faint">
        {[600, 656, 712].map((x, i) => <Cyl key={i} cx={x} top={290} rx={20} ry={5} h={26} seed={`f6a-shard${i}`} />)}
      </g>
      <Label muted x={656} y={350} size={15}>shards, when writes outgrow one master</Label>

      {/* delegation */}
      <Arrow dashed pts={[[424, 180], [424, 284]]} seed="f6a-hand" />
      <Pipe x={300} cy={300} w={170} ry={14} seed="f6a-kafka" />
      <Label kind="mono" anchor="start" x={480} y={305} size={15}>kafka</Label>
      <Tag x={536} y={305} no="3.5" anchor="start" />
      <Worker x={250} y={370} w={112} h={36} label="search" size={15} seed="f6a-search" />
      <Worker x={400} y={370} w={124} h={36} label="counter" size={15} seed="f6a-counter" />
      {/* consumers pull: dashed ask up to kafka, blue messages back down (same glyph as the replica pull) */}
      <Arrow dashed pts={[[298, 368], [298, 316]]} seed="f6a-p1" />
      <Arrow tone="blue" pts={[[314, 316], [314, 368]]} seed="f6a-g1" />
      <Arrow dashed pts={[[446, 368], [446, 316]]} seed="f6a-p2" />
      <Arrow tone="blue" pts={[[462, 316], [462, 368]]} seed="f6a-g2" />
      <Tag x={538} y={393} no="3.6" anchor="start" />

      {/* communication back to the readers */}
      <Arrow tone="blue" pts={[[334, 180], [334, 250], [30, 250], [30, 222]]} seed="f6a-ws" />
      <Label tone="blue" anchor="start" x={60} y={242} size={15}>ws / sse: live claps</Label>
      <Tag x={60} y={272} no="5.4" anchor="start" />
      <Tag x={110} y={272} no="5.5" anchor="start" />
    </Fig>
  );
}

/** Phone layout: one row per part, glyph on the left, section tag and one line on the right. */
function MediumEndList() {
  const rows: { no: string; name: string; line: string; glyph: (y: number) => React.ReactNode }[] = [
    { no: '1.4', name: 'browser', line: 'assets and some responses', glyph: (y) => <Client x={14} y={y - 15} w={42} h={30} seed="f6a-p-g1" /> },
    { no: '1.5', name: 'cdn', line: 'near-static responses', glyph: (y) => <Cloud cx={35} cy={y} w={50} h={30} seed="f6a-p-g2" /> },
    { no: '1.6', name: 'lb / api gateway', line: 'responses with a ttl', glyph: (y) => <LoadBalancer x={26} y={y - 16} w={18} h={34} label="" seed="f6a-p-g3" /> },
    { no: '1.2', name: 'api ram · disk', line: 'hot and rendered stories', glyph: (y) => <g><Box x={12} y={y - 15} w={46} h={30} label="api" seed="f6a-p-g4" labelSize={14} /><Dot x={52} y={y - 9} /></g> },
    { no: '2.2', name: 'api fleet ×5', line: 'stateless servers behind the lb', glyph: (y) => <g><Box x={22} y={y - 16} w={36} h={20} faint seed="f6a-p-g5c" /><Box x={16} y={y - 10} w={36} h={20} faint seed="f6a-p-g5b" /><Box x={10} y={y - 4} w={36} h={20} seed="f6a-p-g5" /></g> },
    { no: '1.1', name: 'redis', line: 'shared hot keys', glyph: (y) => <Cube x={22} y={y - 14} s={22} d={6} seed="f6a-p-g6" /> },
    { no: '1.7', name: 'master', line: 'writes; materialized views', glyph: (y) => <Cyl cx={35} top={y - 14} rx={18} ry={5} h={22} seed="f6a-p-g7" /> },
    { no: '2.4', name: 'replicas, then shards', line: 'replicas pull from the master', glyph: (y) => <Replica cx={35} top={y - 14} rx={18} ry={5} h={22} seed="f6a-p-g8" /> },
    { no: '3.5', name: 'kafka', line: 'search and counter consumers pull', glyph: (y) => <Pipe x={10} cy={y} w={50} ry={11} seed="f6a-p-g9" /> },
    { no: '4.3', name: 'claps = claps + 1', line: 'one atomic step, in SQL', glyph: (y) => <Label kind="mono" tone="green" x={35} y={y + 5} size={14}>+1</Label> },
    { no: '5.4', name: 'ws / sse', line: 'live claps back to readers', glyph: (y) => <Arrow tone="blue" pts={[[60, y], [12, y]]} seed="f6a-p-g11" /> },
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
