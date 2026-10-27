// Lecture 02 (lec01): the "so far" map shown at the top of every chapter. One drawing of the blog from Lecture 1
// that grows chapter by chapter. Each chapter opens on the design as it stands, with the piece the previous chapter
// added on a blue wash with a "new" note (stage 0 is where Lecture 1 left the blog, nothing marked).
//   0 reader → api ×3 → shared cache + db           (end of Lecture 1)
//   1 + browser, cdn, lb caches; ram · disk on the api servers
//   2 + api ×5, read replicas that pull from the db
//   3 + kafka with a counter and a search consumer
//   4 + claps = claps + 1, done by the database
//   5 + a live channel (websocket) back to the reader
//   6 + a push service for readers whose app is closed
// Desk layout 640 wide (shown ~1:1 on a laptop), phone layout 330 wide (labels >= 13.5 units).
import React from 'react';
import { roundRect } from '../kit/hand';
import { Actor, Arrow, Box, Client, Cloud, Cube, Cyl, Fig, Fleet, Label, LoadBalancer, Pipe, Replica, Worker } from '../kit/Kit';

export type MediumStage = 0 | 1 | 2 | 3 | 4 | 5 | 6;
type Layout = 'desk' | 'phone';

/** The blue wash behind a piece a chapter adds; the first one of a stage carries the "new" note. */
function Wash({ x, y, w, h, seed, nx, ny, anchor = 'middle', size = 13 }: {
  x: number; y: number; w: number; h: number; seed: string; nx?: number; ny?: number; anchor?: 'start' | 'middle' | 'end'; size?: number;
}) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 8, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      {nx !== undefined && <Label muted x={nx} y={ny ?? y - 6} anchor={anchor} size={size}>new</Label>}
    </g>
  );
}

const DESC: Record<MediumStage, string> = {
  0: 'The blog where Lecture 1 left it: a reader’s request goes to one of three API servers, which check one shared cache and otherwise read the database.',
  1: 'The blog so far: reader, three API servers, a shared cache and the database. Marked new: caches along the route, in the reader’s browser, at the CDN and at the reverse proxy beside the load balancer, and on each API server’s own RAM and disk.',
  2: 'The blog so far: browser, CDN, load balancer, API servers with their RAM and disk caches, a shared cache and the database. Marked new: five API servers instead of three, and read replicas that pull changes from the database.',
  3: 'The blog so far: browser, CDN, load balancer, five API servers, shared cache, database and read replicas. Marked new: the API servers hand each publish event to Kafka, where a counter consumer updates total_blogs and a search consumer indexes the story in Elasticsearch.',
  4: 'The blog so far: the route with its caches, five API servers, the database with replicas, and Kafka with a counter and a search consumer. Marked new: a clap is one atomic step in the database, claps = claps + 1.',
  5: 'The blog so far: the route with its caches, API servers, database with replicas, Kafka with two consumers, and claps added by the database. Marked new: a WebSocket kept open between the reader and a real-time likes service on the server side, which carries live claps.',
  6: 'The blog at the end of this lecture: browser, CDN and reverse-proxy caches, five API servers with RAM and disk caches, a shared cache, the database with read replicas and atomic claps, Kafka with counter and search consumers, and a WebSocket to a real-time likes service for live claps. Marked new: a push service, FCM or APNs, that reaches readers whose app is closed.',
};

function Desk({ stage }: { stage: MediumStage }) {
  const id = `sf-med${stage}`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={640} h={262} title="The blog so far" desc={DESC[stage]}>
      {stage === 1 && <g>
        <Wash x={36} y={58} w={170} h={58} seed={s('n1')} nx={120} />
        <Wash x={212} y={115} w={80} h={19} seed={s('n2')} />
      </g>}
      {stage === 2 && <g>
        <Wash x={474} y={58} w={54} h={84} seed={s('n1')} nx={501} />
        <Wash x={206} y={58} w={102} h={58} seed={s('n2')} />
      </g>}
      {stage === 3 && <Wash x={190} y={166} w={360} h={76} seed={s('n')} nx={370} ny={160} />}
      {stage === 4 && <Wash x={350} y={140} w={142} h={19} seed={s('n')} nx={500} ny={154} anchor="start" />}
      {stage === 5 && <Wash x={16} y={10} w={214} h={26} seed={s('n')} nx={240} ny={28} anchor="start" />}
      {stage === 6 && <Wash x={18} y={168} w={132} h={66} seed={s('n')} nx={84} ny={162} />}

      {/* the reader (and, from stage 1, the browser cache) */}
      <Actor x={24} y={62} seed={s('u')} />
      <Label x={24} y={136}>reader</Label>
      {stage >= 1 && <g>
        <Client x={44} y={76} w={30} h={24} seed={s('br')} />
        <Label x={59} y={116} size={13}>browser</Label>
      </g>}

      {/* the route to the api servers */}
      {stage === 0
        ? <Arrow tone="blue" pts={[[42, 88], [212, 88]]} seed={s('r0')} />
        : <g>
          <Arrow tone="blue" pts={[[76, 88], [97, 88]]} seed={s('r1')} />
          <Cloud cx={130} cy={88} w={62} h={38} label="cdn" seed={s('cdn')} />
          <Arrow tone="blue" pts={[[162, 88], [178, 88]]} seed={s('r2')} />
          <LoadBalancer x={180} y={62} w={16} h={52} seed={s('lb')} />
          <Arrow tone="blue" pts={[[198, 88], [212, 88]]} seed={s('r3')} />
        </g>}

      <Fleet x={214} y={66} w={84} h={44} n={stage >= 2 ? 5 : 3} label={stage >= 2 ? 'api ×5' : 'api ×3'} countLabel={false} seed={s('api')} />
      {stage >= 1 && <Label muted x={250} y={128} size={13}>ram · disk</Label>}

      {/* the shared cache from Lecture 1 */}
      <Arrow pts={[[326, 52], [344, 36]]} seed={s('ca')} />
      <Cube x={346} y={8} s={26} d={7} seed={s('cache')} />
      <Label kind="mono" anchor="start" x={388} y={30}>shared cache</Label>

      {/* the database, and from stage 2 its replicas */}
      <Arrow pts={[[314, 94], [394, 94]]} seed={s('db')} />
      <Cyl cx={420} top={70} rx={24} ry={6} h={38} label="db" seed={s('dbc')} />
      {stage >= 2 && <g>
        <Replica cx={500} top={70} rx={22} ry={6} h={38} label="replicas" seed={s('rep')} />
        <Arrow dashed pts={[[476, 92], [446, 92]]} seed={s('pull')} />
        <Label muted x={461} y={82} size={12.5}>pull</Label>
      </g>}
      {stage >= 4 && <Label kind="mono" x={420} y={154} size={13}>claps = claps + 1</Label>}

      {/* delegation: kafka and two consumers */}
      {stage >= 3 && <g>
        <Arrow dashed pts={[[292, 112], [292, 190]]} seed={s('pub')} />
        <Pipe x={196} cy={204} w={130} ry={12} label="kafka" seed={s('k')} />
        <Arrow pts={[[328, 198], [352, 186]]} seed={s('k1')} />
        <Arrow pts={[[328, 210], [352, 222]]} seed={s('k2')} />
        <Worker x={356} y={170} w={86} h={28} label="counter" seed={s('wc')} />
        <Worker x={356} y={210} w={86} h={28} label="search" seed={s('ws')} />
        <Label muted anchor="start" x={450} y={189} size={13}>total_blogs</Label>
        <Label muted anchor="start" x={450} y={229} size={13}>elasticsearch</Label>
      </g>}

      {/* live claps back to the reader */}
      {stage >= 5 && <g>
        <Arrow tone="blue" pts={[[222, 64], [222, 30], [24, 30], [24, 52]]} seed={s('wsl')} />
        <Label tone="blue" x={120} y={24} size={13}>websocket: live claps</Label>
      </g>}

      {/* push, for readers whose app is closed */}
      {stage >= 6 && <g>
        <Arrow dashed pts={[[214, 106], [146, 186]]} seed={s('pa')} />
        <Box x={24} y={176} w={118} h={30} label="push service" seed={s('push')} />
        <Label muted x={83} y={224} size={13}>fcm / apns</Label>
      </g>}

      <Label kind="title" x={575} y={254}>the blog so far</Label>
    </Fig>
  );
}

function Phone({ stage }: { stage: MediumStage }) {
  const id = `sf-med${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={330} h={404} title="The blog so far" desc={DESC[stage]}>
      {stage === 1 && <g>
        <Wash x={32} y={20} w={136} h={62} seed={s('n1')} nx={96} ny={14} size={13.5} />
        <Wash x={170} y={83} w={78} h={18} seed={s('n2')} />
      </g>}
      {stage === 2 && <g>
        <Wash x={264} y={116} w={50} h={72} seed={s('n1')} nx={289} ny={110} size={13.5} />
        <Wash x={172} y={8} w={100} h={76} seed={s('n2')} />
      </g>}
      {stage === 3 && <Wash x={24} y={214} w={280} h={80} seed={s('n')} nx={164} ny={208} size={13.5} />}
      {stage === 4 && <Wash x={132} y={188} w={154} h={20} seed={s('n')} nx={302} ny={203} size={13.5} />}
      {stage === 5 && <Wash x={24} y={100} w={162} h={46} seed={s('n')} nx={104} ny={96} size={13.5} />}
      {stage === 6 && <Wash x={14} y={298} w={148} h={68} seed={s('n')} nx={176} ny={322} anchor="start" size={13.5} />}

      <Actor x={18} y={40} seed={s('u')} />
      <Label x={18} y={108} size={13.5}>reader</Label>
      {stage >= 1 && <Client x={38} y={50} w={24} h={20} seed={s('br')} />}

      {stage === 0
        ? <Arrow tone="blue" pts={[[34, 60], [176, 60]]} seed={s('r0')} />
        : <g>
          <Arrow tone="blue" pts={[[63, 60], [80, 60]]} seed={s('r1')} />
          <Cloud cx={106} cy={60} w={50} h={32} label="cdn" seed={s('cdn')} />
          <Arrow tone="blue" pts={[[132, 60], [146, 60]]} seed={s('r2')} />
          <LoadBalancer x={148} y={38} w={12} h={44} seed={s('lb')} />
          <Arrow tone="blue" pts={[[162, 60], [176, 60]]} seed={s('r3')} />
        </g>}

      <Fleet x={178} y={42} w={60} h={36} n={stage >= 2 ? 5 : 3} label="api" countLabel={false} seed={s('api')} />
      {stage >= 1 && <Label muted x={208} y={97} size={13.5}>ram · disk</Label>}
      <Label muted anchor="start" x={244} y={80} size={13.5}>{stage >= 2 ? '×5' : '×3'}</Label>

      <Arrow pts={[[266, 26], [284, 20]]} seed={s('ca')} />
      <Cube x={286} y={4} s={22} d={6} seed={s('cache')} />
      <Label kind="mono" x={300} y={50} size={13.5}>cache</Label>

      <Arrow pts={[[208, 102], [208, 120]]} seed={s('db')} />
      <Cyl cx={208} top={124} rx={22} ry={6} h={32} label="db" seed={s('dbc')} />
      {stage >= 2 && <g>
        <Replica cx={289} top={124} rx={20} ry={5} h={32} label="replicas" seed={s('rep')} />
        <Arrow dashed pts={[[267, 140], [232, 140]]} seed={s('pull')} />
      </g>}
      {stage >= 4 && <Label kind="mono" x={208} y={203} size={13.5}>claps = claps + 1</Label>}

      {stage >= 3 && <g>
        <Arrow dashed pts={[[176, 72], [150, 100], [122, 224]]} seed={s('pub')} />
        <Pipe x={30} cy={238} w={150} ry={12} label="kafka" seed={s('k')} />
        <Arrow pts={[[182, 234], [196, 234]]} seed={s('k1')} />
        <Arrow pts={[[182, 244], [196, 272]]} seed={s('k2')} />
        <Worker x={198} y={222} w={100} h={26} label="counter" seed={s('wc')} />
        <Worker x={198} y={262} w={100} h={26} label="search" seed={s('ws')} />
      </g>}

      {stage >= 5 && <g>
        <Arrow tone="blue" pts={[[180, 80], [132, 120], [30, 120]]} seed={s('wsl')} />
        <Label tone="blue" x={84} y={140} size={13.5}>websocket: claps</Label>
      </g>}

      {stage >= 6 && <g>
        <Box x={20} y={306} w={136} h={30} label="push service" seed={s('push')} />
        <Label muted x={88} y={356} size={13.5}>fcm / apns</Label>
      </g>}

      <Label kind="title" x={165} y={394}>the blog so far</Label>
    </Fig>
  );
}

export function SoFarMedium({ stage, layout = 'desk' }: { stage: MediumStage; layout?: Layout }) {
  return layout === 'phone' ? <Phone stage={stage} /> : <Desk stage={stage} />;
}
