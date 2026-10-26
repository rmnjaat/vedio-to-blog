// Lecture 01 (lec04): the "so far" map shown at the top of every chapter. One small drawing per build that grows
// chapter by chapter. Each chapter opens on the design as it stands, with the piece the previous chapter added on a
// blue wash with a "new" note (stage 0 is the starting design, nothing marked). The last stage closes the build.
//   green dot: laptop → api → store (+ TTL) → which store → pool → pool budget across a fleet
//   blog:      reader → api → db (posts, is_deleted) → archive → row layout → cache
// Desk layouts are 640 wide (shown ~1:1 on a laptop, ~708 at 768); phone layouts are 330 wide.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Actor, Arrow, Box, Ceiling, Cube, Cyl, Fig, Fleet, Label, Line } from './_kit';
import { Laptop, Pulse, Timer } from './s2a-parts';
import { VTable } from './s5a-parts';

export type DotStage = 0 | 1 | 2 | 3 | 4 | 5;
export type BlogStage = 0 | 1 | 2 | 3;
type Layout = 'desk' | 'phone';

/** The blue wash behind the piece a chapter adds, with a small "new" note. */
function New({ x, y, w, h, seed, nx, ny, anchor = 'middle' }: {
  x: number; y: number; w: number; h: number; seed: string; nx?: number; ny?: number; anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <g>
      <path d={roundRect(x, y, w, h, 8, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />
      <Label muted x={nx ?? x + w / 2} y={ny ?? y - 6} anchor={anchor} size={13}>new</Label>
    </g>
  );
}

const DOT_DESC: Record<DotStage, string> = {
  0: 'The green dot so far: the obvious design. A laptop tells an API server online at login and offline at logout, and the server stores true or false for each user.',
  1: 'The green dot so far. A laptop sends a heartbeat every 10 seconds to an API server, which writes the user and the time of the last beat to a store. Marked new: the periodic heartbeat.',
  2: 'The green dot so far. Laptop, heartbeat every 10 seconds, API server, store. Marked new: every write carries a 30-second TTL, so the store deletes a key on its own when the beats stop.',
  3: 'The green dot so far. Laptop, heartbeats, API server, and a key-value store with a 30-second TTL. Marked new: the store is chosen, Redis or DynamoDB.',
  4: 'The green dot so far. Laptop, heartbeats, API server, key-value store with a 30-second TTL. Marked new: the API server writes over a pool of connections it keeps open instead of opening one per write.',
  5: 'The green dot so far. Many API servers now share the store, each with its own pool. Marked new: all the pools together must fit under the database’s maximum number of connections.',
};

function DotDesk({ stage }: { stage: DotStage }) {
  const id = `sf-dot${stage}`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={640} h={170} title="The green dot so far" desc={DOT_DESC[stage]}>
      {stage === 1 && <New x={66} y={34} w={136} h={62} seed={s('n')} />}
      {stage === 2 && <New x={490} y={50} w={110} h={42} seed={s('n')} />}
      {stage === 3 && <New x={372} y={112} w={150} h={30} seed={s('n')} nx={550} ny={132} />}
      {stage === 4 && <New x={288} y={52} w={128} h={66} seed={s('n')} />}
      {stage === 5 && <New x={194} y={8} w={232} h={128} seed={s('n')} nx={176} ny={22} />}

      <Laptop x={26} y={58} w={40} h={26} seed={s('lap')} />
      <Label x={46} y={116}>laptop</Label>

      <Arrow pts={[[78, 73], [194, 73]]} tone="blue" seed={s('hb')} />
      {stage === 0 ? <g>
        <Label x={136} y={56} size={13}>login: online</Label>
        <Label x={136} y={94} size={13}>logout: offline</Label>
      </g> : <g>
        {[104, 128, 152].map((x) => <Pulse key={x} x={x} y={73} />)}
        <Label x={136} y={56} size={13}>heartbeat</Label>
        <Label kind="mono" x={136} y={92} size={12.5}>every 10 s</Label>
      </g>}

      {stage === 5
        ? <Fleet x={200} y={52} w={84} h={42} n={3} label="api" seed={s('api')} size={13} />
        : <Box x={200} y={52} w={84} h={42} label="api" seed={s('api')} />}

      {stage < 4 && <Arrow pts={[[284, 73], [418, 73]]} seed={s('w')} />}
      {stage < 4 && <Label x={351} y={62} size={13}>write</Label>}
      {stage >= 4 && <g>
        <Line pts={[[284, 63], [420, 63]]} weight="thin" seed={s('c1')} />
        <Line pts={[[284, 73], [420, 73]]} weight="thin" tone="blue" seed={s('c2')} />
        <Line pts={[[284, 83], [420, 83]]} weight="thin" seed={s('c3')} />
        <Label x={352} y={106} size={13}>pool, kept open</Label>
      </g>}
      {stage === 5 && <Ceiling x0={300} x1={416} y={44} label="≤ max connections" labelX={382} seed={s('cap')} />}

      <Cube x={424} y={50} s={38} d={10} seed={s('store')} />
      <Label kind="mono" x={447} y={130}>{stage >= 3 ? 'redis or dynamodb' : 'store'}</Label>
      {stage === 0 && <Label kind="mono" anchor="start" x={480} y={78} size={13}>user → true/false</Label>}
      {stage === 1 && <Label kind="mono" anchor="start" x={480} y={78} size={13}>user → last beat</Label>}
      {stage >= 2 && <g>
        <Timer x={510} y={71} r={10} seed={s('ttl')} />
        <Label kind="mono" anchor="start" x={528} y={76} size={13}>ttl 30 s</Label>
      </g>}

      <Label kind="title" x={320} y={162}>the green dot so far</Label>
    </Fig>
  );
}

function DotPhone({ stage }: { stage: DotStage }) {
  const id = `sf-dot${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  return (
    <Fig id={id} w={330} h={204} title="The green dot so far" desc={DOT_DESC[stage]}>
      {stage === 1 && <New x={46} y={30} w={76} h={66} seed={s('n')} nx={84} ny={24} />}
      {stage === 2 && <New x={262} y={16} w={66} h={58} seed={s('n')} nx={296} ny={88} />}
      {stage === 3 && <New x={220} y={96} w={84} h={52} seed={s('n')} nx={262} ny={164} />}
      {stage === 4 && <New x={180} y={46} w={62} h={68} seed={s('n')} nx={211} ny={40} />}
      {stage === 5 && <New x={112} y={4} w={132} h={148} seed={s('n')} nx={62} ny={140} />}

      <Laptop x={10} y={52} w={30} h={20} seed={s('lap')} />
      <Label x={25} y={104} size={13.5}>laptop</Label>

      <Arrow pts={[[48, 64], [116, 64]]} tone="blue" seed={s('hb')} />
      {stage === 0 ? <g>
        <Label x={82} y={48} size={13.5}>login</Label>
        <Label x={82} y={86} size={13.5}>logout</Label>
      </g> : <g>
        {[64, 84].map((x) => <Pulse key={x} x={x} y={64} />)}
        <Label x={82} y={48} size={13.5}>beat</Label>
        <Label kind="mono" x={82} y={86} size={13.5}>10 s</Label>
      </g>}

      {stage === 5
        ? <Fleet x={120} y={46} w={58} h={38} n={3} label="api" seed={s('api')} countLabel={false} />
        : <Box x={120} y={46} w={58} h={38} label="api" seed={s('api')} />}
      {stage === 5 && <Label x={150} y={122} size={13.5}>×3 servers</Label>}

      {stage < 4 && <Arrow pts={[[178, 64], [236, 64]]} seed={s('w')} />}
      {stage >= 4 && <g>
        <Line pts={[[178, 56], [238, 56]]} weight="thin" seed={s('c1')} />
        <Line pts={[[178, 64], [238, 64]]} weight="thin" tone="blue" seed={s('c2')} />
        <Line pts={[[178, 72], [238, 72]]} weight="thin" seed={s('c3')} />
        <Label x={208} y={100} size={13.5}>pool</Label>
      </g>}
      {stage === 5 && <Label tone="red" x={190} y={162} size={13.5}>≤ max connections</Label>}

      <Cube x={240} y={46} s={30} d={8} seed={s('store')} />
      {stage >= 3
        ? <g><Label kind="mono" x={262} y={118} size={13.5}>redis or</Label><Label kind="mono" x={262} y={136} size={13.5}>dynamodb</Label></g>
        : <Label kind="mono" x={260} y={112} size={13.5}>store</Label>}
      {stage === 0 && <Label kind="mono" x={262} y={130} size={13.5}>true/false</Label>}
      {stage >= 2 && <g>
        <Timer x={296} y={38} r={9} seed={s('ttl')} />
        <Label kind="mono" x={296} y={66} size={13.5}>30 s</Label>
      </g>}

      <Label kind="title" x={165} y={196}>the green dot so far</Label>
    </Fig>
  );
}

const BLOG_DESC: Record<BlogStage, string> = {
  0: 'The blog so far: a reader calls an API server, which reads a database holding the blogs table: title, body, published_at and is_deleted.',
  1: 'The blog so far. A reader calls an API server, which reads a database holding the blogs table: title, body, published_at and is_deleted. A background job moves soft-deleted posts to an archive. Marked new: soft-deleted rows (is_deleted) and the archive they move to.',
  2: 'The blog so far. Reader, API server, database with the blogs table and an archive. Marked new: the body is stored off the row, and published_at gets a storage format chosen for the queries that read it.',
  3: 'The blog so far. Reader, API server, database with the blogs table and an archive. Marked new: one shared cache that every API server checks before going to the database.',
};

function BlogDesk({ stage }: { stage: BlogStage }) {
  const id = `sf-blog${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const rows = ['title', stage >= 2 ? 'body → off-row' : 'body', 'published_at', 'is_deleted'];
  return (
    <Fig id={id} w={640} h={196} title="The blog so far" desc={BLOG_DESC[stage]}>
      {stage === 1 && <New x={354} y={132} w={264} h={36} seed={s('n')} nx={480} ny={186} />}
      {stage === 2 && <New x={354} y={88} w={186} h={52} seed={s('n')} nx={548} ny={118} anchor="start" />}
      {stage === 3 && <New x={238} y={4} w={112} h={48} seed={s('n')} nx={372} ny={30} />}

      <Actor x={30} y={56} seed={s('u')} />
      <Label x={30} y={124}>reader</Label>
      <Arrow pts={[[48, 82], [118, 82]]} tone="blue" seed={s('r')} />

      <Box x={120} y={60} w={76} h={42} label="api" seed={s('api')} />

      {stage === 3 && <g>
        <Arrow pts={[[196, 70], [224, 70], [224, 30], [246, 30]]} tone="blue" seed={s('ac')} />
        <Cube x={250} y={10} s={28} d={8} seed={s('cache')} />
        <Label kind="mono" anchor="start" x={292} y={34}>cache</Label>
      </g>}

      <Arrow pts={[[196, 88], [282, 88]]} seed={s('ad')} />
      <Cyl cx={306} top={68} rx={22} ry={6} h={34} seed={s('db')} label="db" />

      <VTable x={362} y={70} w={170} name="blogs" fields={rows} rowH={22} seed={s('posts')} />

      {stage >= 1 && <g>
      <Arrow pts={[[532, 147], [574, 147]]} dashed seed={s('arch')} />
      <Cube x={578} y={124} s={30} d={8} seed={s('archive')} />
      <Label kind="mono" x={597} y={182}>archive</Label>
      </g>}

      <Label kind="title" x={190} y={170}>the blog so far</Label>
    </Fig>
  );
}

function BlogPhone({ stage }: { stage: BlogStage }) {
  const id = `sf-blog${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const rows = ['title', stage >= 2 ? 'body → off-row' : 'body', 'published_at', 'is_deleted'];
  return (
    <Fig id={id} w={330} h={290} title="The blog so far" desc={BLOG_DESC[stage]}>
      {stage === 1 && <New x={52} y={226} w={256} h={28} seed={s('n')} nx={300} ny={270} />}
      {stage === 2 && <New x={52} y={180} w={190} h={50} seed={s('n')} nx={250} ny={200} anchor="start" />}
      {stage === 3 && <New x={146} y={0} w={104} h={46} seed={s('n')} nx={198} ny={60} />}

      <Actor x={18} y={52} seed={s('u')} />
      <Label x={20} y={120} size={13.5}>reader</Label>
      <Arrow pts={[[34, 78], [68, 78]]} tone="blue" seed={s('r')} />

      <Box x={70} y={58} w={58} h={38} label="api" seed={s('api')} />

      {stage === 3 && <g>
        <Arrow pts={[[128, 66], [140, 66], [140, 24], [150, 24]]} tone="blue" seed={s('ac')} />
        <Cube x={154} y={6} s={26} d={7} seed={s('cache')} />
        <Label kind="mono" anchor="start" x={192} y={30} size={13.5}>cache</Label>
      </g>}

      <Arrow pts={[[128, 84], [178, 84]]} seed={s('ad')} />
      <Cyl cx={202} top={64} rx={20} ry={5} h={30} seed={s('db')} label="db" />

      <VTable x={60} y={162} w={176} name="blogs (in the db)" fields={rows} rowH={22} seed={s('posts')} size={13.5} />

      {stage >= 1 && <g>
      <Arrow pts={[[236, 239], [292, 239], [292, 104]]} dashed seed={s('arch')} />
      <Cube x={276} y={66} s={28} d={7} seed={s('archive')} />
      <Label kind="mono" x={292} y={58} size={13.5}>archive</Label>
      </g>}

      <Label kind="title" x={150} y={284}>the blog so far</Label>
    </Fig>
  );
}

export function SoFarDot({ stage, layout = 'desk' }: { stage: DotStage; layout?: Layout }) {
  return layout === 'phone' ? <DotPhone stage={stage} /> : <DotDesk stage={stage} />;
}

export function SoFarBlog({ stage, layout = 'desk' }: { stage: BlogStage; layout?: Layout }) {
  return layout === 'phone' ? <BlogPhone stage={stage} /> : <BlogDesk stage={stage} />;
}
