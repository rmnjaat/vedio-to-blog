// Lecture 07 (lec09), §9 The whole hashtag design (writer w5): Fig 9·a (the hashtag service, D-09 redrawn, Post Svc
// label as corrected in class), Fig 9·b (the two paths, D-10 redrawn) and the §9 RuleBox sketch (one path at a time).
// Phone layouts: Fig 9·a as two vertical chains feeding one database, the read chain under it; Fig 9·b as two columns.
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cyl, Dot, Fig, Fleet, Label, Line, Pipe, Worker } from './kit';
import { ellipse } from '../kit/hand';
import { Knock, Topic } from './s7-hashtag-storage-parts';

/** Three cylinders, one on top and two under it: the board's partitioned database. (cx, top) = the top cylinder. */
function PartDb({ cx, top, rx = 26, h = 28, dx = 40, dy = 58, seed }: { cx: number; top: number; rx?: number; h?: number; dx?: number; dy?: number; seed: string }) {
  return (
    <g>
      <Cyl cx={cx} top={top} rx={rx} ry={7} h={h} seed={`${seed}-0`} />
      <Cyl cx={cx - dx} top={top + dy} rx={rx} ry={7} h={h} seed={`${seed}-1`} />
      <Cyl cx={cx + dx} top={top + dy} rx={rx} ry={7} h={h} seed={`${seed}-2`} />
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 9·a */

const F9A_TITLE = 'The hashtag service';
const F9A_DESC =
  'Three paths into one partitioned database. Write: the post service drops each post on Kafka, the hashtag extractor pulls it and writes one (hashtag, post) tuple per tag to POST_HASHTAG, keyed by hashtag, and counting servers pull those, batch them and write counts. Popularity: data science’s popularity service puts each new top 100 on its own Kafka, and a few workers pull it and write it into the hashtag document. Read: a user’s GET /hashtag/<tag> goes to the CDN, which pulls from the hashtag API on a miss; the API reads one document from the partitioned database, with an optional cache.';

export function HashtagService({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <HashtagServicePhone />;
  const s = (k: string) => `fig9a-${k}`;
  return (
    <Fig id="fig9a" w={880} h={590} title={F9A_TITLE} desc={F9A_DESC}>
      {/* write band */}
      <Box x={24} y={40} w={110} h={44} label="post svc" seed={s('post')} />
      <Arrow tone="blue" dashed pts={[[134, 62], [196, 62]]} seed={s('pub')} />
      <Pipe x={200} cy={62} w={150} ry={14} seed={s('kafka')} />
      <Label kind="mono" x={275} y={36}>kafka</Label>
      <Fleet x={430} y={40} w={180} h={44} n={3} countLabel={false} label="hashtag extraction" seed={s('ext')} />
      <Arrow dashed pts={[[430, 62], [352, 62]]} seed={s('pull-ext')} />
      <Label x={391} y={54} size={13}>pulls</Label>
      <Arrow tone="blue" dashed pts={[[520, 84], [520, 146]]} seed={s('tuples')} />
      <Label tone="blue" kind="mono" anchor="start" x={528} y={120} size={13}>{'<hashtag, post>'}</Label>
      <Topic x={420} cy={164} w={200} ry={16} parts={3} seed={s('ph')} />
      <Label kind="mono" x={520} y={202}>POST_HASHTAG</Label>
      <Label kind="mono" muted x={520} y={220} size={13}>key: hashtag</Label>
      <Fleet x={690} y={142} w={160} h={44} n={3} countLabel={false} label="counting servers" seed={s('count')} />
      <Arrow dashed pts={[[690, 164], [622, 164]]} seed={s('pull-count')} />
      <Arrow pts={[[780, 186], [780, 318]]} seed={s('count-db')} />
      <Knock x={786} y={262} text="count += n" kind="mono" size={13} anchor="start" />
      <Label kind="mono" anchor="start" x={786} y={262} size={13}>count += n</Label>

      {/* popularity band */}
      <Box x={24} y={150} w={150} h={44} label="popularity svc" seed={s('pop')} />
      <Arrow tone="blue" dashed pts={[[99, 194], [99, 250]]} seed={s('pop-pub')} />
      <Label anchor="start" x={110} y={228} size={13}>per hashtag popular photos</Label>
      <Pipe x={30} cy={266} w={150} ry={14} seed={s('their')} />
      <Label kind="mono" x={105} y={300}>their kafka</Label>
      <Label muted x={105} y={322} size={13}>* not high throughput</Label>
      <Worker x={240} y={248} w={120} h={36} label="workers" seed={s('wrk')} />
      <Arrow dashed pts={[[240, 266], [182, 266]]} seed={s('pull-wrk')} />
      <Arrow pts={[[300, 284], [300, 348], [750, 348]]} seed={s('wrk-db')} />
      <Knock x={420} y={340} text="replace the top 100" size={13} />
      <Label x={420} y={340} size={13}>replace the top 100</Label>

      {/* the shared database */}
      <PartDb cx={780} top={330} seed={s('db')} />
      <Label kind="mono" x={780} y={448}>partitioned db</Label>

      {/* read band */}
      <Actor x={40} y={392} seed={s('user')} />
      <Label x={40} y={468}>user</Label>
      <Label kind="mono" tone="blue" x={149} y={404} size={13}>GET /hashtag/&lt;tag&gt;</Label>
      <Arrow tone="blue" pts={[[60, 412], [240, 412]]} seed={s('get')} />
      <Arrow tone="green" pts={[[240, 430], [60, 430]]} seed={s('reply')} />
      <Label tone="green" x={149} y={450} size={13}>one JSON document</Label>
      <Cloud cx={300} cy={420} w={116} h={62} label="cdn" seed={s('cdn')} />
      <Arrow pts={[[358, 420], [428, 420]]} seed={s('cdn-api')} />
      <Label muted x={393} y={444} size={12.5}>on a miss</Label>
      <Fleet x={430} y={398} w={140} h={44} n={3} countLabel={false} label="hashtag api" seed={s('api')} />
      <Arrow pts={[[570, 420], [712, 420]]} seed={s('api-db')} />
      <Label muted x={652} y={410} size={13}>read one doc</Label>
      <Arrow pts={[[500, 442], [500, 474]]} seed={s('api-cache')} />
      <Cyl cx={500} top={478} rx={24} ry={6} h={22} label="cache" seed={s('cache')} />
      <Label muted anchor="start" x={530} y={500} size={13}>optional</Label>

      {/* the board's key takeaways */}
      <Line pts={[[120, 548], [760, 548]]} weight="thin" seed={s('rule')} className="faint" />
      <Label x={440} y={572} size={14}>Kafka as a glue · adapter pattern · effective batching and counting · read and write path optimizations</Label>
    </Fig>
  );
}

function HashtagServicePhone() {
  const s = (k: string) => `fig9a-p-${k}`;
  const L = 88, R = 254; // column centres
  return (
    <Fig id="fig9a-p" w={340} h={760} title={F9A_TITLE} desc={F9A_DESC}>
      <Label x={L} y={18} size={13}>posts</Label>
      <Label x={R} y={18} size={13}>top 100</Label>
      {/* write chain, left */}
      <Box x={L - 62} y={28} w={124} h={38} label="post svc" seed={s('post')} />
      <Arrow tone="blue" dashed pts={[[L, 66], [L, 94]]} seed={s('pub')} />
      <Pipe x={L - 60} cy={108} w={120} ry={13} seed={s('kafka')} />
      <Label kind="mono" anchor="start" x={L + 8} y={86} size={13}>kafka</Label>
      <Box x={L - 62} y={148} w={124} h={38} label="extractor" seed={s('ext')} />
      <Arrow dashed pts={[[L - 30, 148], [L - 30, 123]]} seed={s('pull-ext')} />
      <Label anchor="start" x={L - 24} y={140} size={12.5}>pulls</Label>
      <Arrow tone="blue" dashed pts={[[L, 186], [L, 216]]} seed={s('tuples')} />
      <Topic x={L - 60} cy={230} w={120} ry={13} parts={3} seed={s('ph')} />
      <Label kind="mono" x={L} y={262} size={13}>POST_HASHTAG</Label>
      <Label kind="mono" muted x={L} y={278} size={12.5}>key: hashtag</Label>
      <Box x={L - 72} y={292} w={144} h={38} label="counting servers" seed={s('count')} labelSize={13} />
      <Arrow dashed pts={[[L + 58, 292], [L + 58, 241]]} seed={s('pull-count')} />
      <Arrow pts={[[L, 330], [L, 382], [144, 382]]} seed={s('count-db')} />
      <Label kind="mono" anchor="end" x={L - 6} y={360} size={12.5}>count += n</Label>
      {/* popularity chain, right */}
      <Box x={R - 74} y={28} w={148} h={38} label="popularity svc" seed={s('pop')} labelSize={13} />
      <Arrow tone="blue" dashed pts={[[R, 66], [R, 94]]} seed={s('pop-pub')} />
      <Pipe x={R - 60} cy={108} w={120} ry={13} seed={s('their')} />
      <Label kind="mono" anchor="end" x={R - 8} y={86} size={13}>their kafka</Label>
      <Label muted anchor="start" x={R + 6} y={262} size={12.5}>* not high</Label>
      <Label muted anchor="start" x={R + 6} y={278} size={12.5}>throughput</Label>
      <Worker x={R - 56} y={196} w={112} h={34} label="workers" seed={s('wrk')} size={13} />
      <Arrow dashed pts={[[R + 40, 196], [R + 40, 123]]} seed={s('pull-wrk')} />
      <Arrow pts={[[R, 230], [R, 382], [196, 382]]} seed={s('wrk-db')} />
      <Label anchor="start" x={R + 6} y={300} size={12.5}>replace</Label>
      <Label anchor="start" x={R + 6} y={316} size={12.5}>the top 100</Label>
      {/* the shared database */}
      <PartDb cx={170} top={364} rx={24} h={24} dx={36} dy={48} seed={s('db')} />
      <Label kind="mono" anchor="start" x={184} y={470} size={13}>partitioned db</Label>
      {/* read chain, bottom: user at the foot, requests go up */}
      <Arrow pts={[[170, 560], [170, 400]]} seed={s('api-db')} />
      <Label muted anchor="start" x={176} y={530} size={12.5}>read one doc</Label>
      <Box x={110} y={562} w={120} h={38} label="hashtag api" seed={s('api')} labelSize={13} />
      <Arrow pts={[[230, 581], [268, 581]]} seed={s('api-cache')} />
      <Cyl cx={296} top={568} rx={24} ry={6} h={20} seed={s('cache')} />
      <Label kind="mono" x={296} y={616} size={12.5}>cache</Label>
      <Arrow pts={[[170, 640], [170, 602]]} seed={s('cdn-api')} />
      <Label muted anchor="start" x={178} y={626} size={12.5}>on a miss</Label>
      <Cloud cx={170} cy={668} w={96} h={52} label="cdn" seed={s('cdn')} />
      <Actor x={60} y={662} s={0.9} seed={s('user')} />
      <Label x={60} y={740} size={13}>user</Label>
      <Arrow tone="blue" pts={[[76, 676], [120, 676]]} seed={s('get')} />
      <Arrow tone="green" pts={[[120, 692], [76, 692]]} seed={s('reply')} />
      <Label kind="mono" tone="blue" x={190} y={716} size={12.5}>GET /hashtag/&lt;tag&gt;</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 9·b */

const F9B_TITLE = 'The two paths';
const F9B_DESC =
  'The write path runs post service, Kafka, hashtag workers that batch and update, and the partitioned database. The read path runs from the user’s GET /hashtag/<tag> to the hashtag API, which does not count anything and reads one value per key from the partitioned database (MySQL, MongoDB or DynamoDB), or from a cache.';

export function TwoPaths({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <TwoPathsPhone />;
  const s = (k: string) => `fig9b-${k}`;
  return (
    <Fig id="fig9b" w={820} h={366} title={F9B_TITLE} desc={F9B_DESC}>
      {/* write row */}
      <Box x={30} y={38} w={120} h={44} label="post svc" seed={s('post')} />
      <Arrow tone="blue" dashed pts={[[150, 60], [216, 60]]} seed={s('pub')} />
      <Pipe x={220} cy={60} w={150} ry={14} seed={s('kafka')} />
      <Label kind="mono" x={295} y={34}>kafka</Label>
      <Fleet x={440} y={38} w={140} h={44} n={3} countLabel={false} label="hashtag wrk" seed={s('wrk')} />
      <Arrow dashed pts={[[440, 60], [372, 60]]} seed={s('pull')} />
      <Label x={406} y={52} size={13}>pulls</Label>
      <Label muted x={510} y={104} size={13}>batch and update</Label>
      <Arrow tone="blue" pts={[[580, 60], [700, 60], [700, 102]]} seed={s('wrk-db')} />
      <Arrow dashed pts={[[40, 128], [400, 128]]} seed={s('wpath')} />
      <Label x={220} y={152} size={15}>WRITE PATH</Label>

      {/* the database both paths share */}
      <PartDb cx={700} top={112} seed={s('db')} />
      <Label kind="mono" x={700} y={232}>partitioned db</Label>
      <Label x={700} y={252} size={13}>MySQL, MongoDB, DDB</Label>

      {/* read row */}
      <Actor x={50} y={178} seed={s('user')} />
      <Label kind="mono" tone="blue" x={190} y={190} size={13}>GET /hashtag/&lt;tag&gt;</Label>
      <Arrow tone="blue" pts={[[72, 198], [310, 198]]} seed={s('get')} />
      <Box x={312} y={176} w={140} h={44} label="hashtag api" seed={s('api')} />
      {/* L-0279: the API servers won't count (the workers do); kept with the api box, clear of the cache arrow (critic C-11) */}
      <Label muted anchor="end" x={372} y={242} size={13}>the api won’t count</Label>
      <Arrow tone="blue" pts={[[452, 198], [632, 198]]} seed={s('api-db')} />
      <Arrow tone="blue" pts={[[382, 220], [382, 274]]} seed={s('api-cache')} />
      <Cyl cx={382} top={278} rx={24} ry={6} h={22} seed={s('cache')} />
      <Label kind="mono" x={382} y={336} size={13}>cache (optional)</Label>
      <Arrow pts={[[40, 262], [260, 262]]} seed={s('rpath')} />
      <Label x={150} y={286} size={15}>READ PATH</Label>

      <Label anchor="start" x={30} y={318} size={13}>key value based access:</Label>
      <Label anchor="start" x={30} y={336} size={13}>for a key (hashtag),</Label>
      <Label anchor="start" x={30} y={354} size={13}>get the value (details)</Label>
    </Fig>
  );
}

function TwoPathsPhone() {
  const s = (k: string) => `fig9b-p-${k}`;
  const L = 86, R = 254;
  return (
    <Fig id="fig9b-p" w={340} h={520} title={F9B_TITLE} desc={F9B_DESC}>
      <Label x={L} y={20} size={14}>WRITE PATH</Label>
      <Arrow dashed pts={[[L - 44, 32], [L + 44, 32]]} seed={s('wpath')} />
      <Label x={R} y={20} size={14}>READ PATH</Label>
      <Arrow pts={[[R - 44, 32], [R + 44, 32]]} seed={s('rpath')} />
      {/* write column */}
      <Box x={L - 60} y={50} w={120} h={38} label="post svc" seed={s('post')} />
      <Arrow tone="blue" dashed pts={[[L, 88], [L, 114]]} seed={s('pub')} />
      <Pipe x={L - 58} cy={128} w={116} ry={13} seed={s('kafka')} />
      <Label kind="mono" anchor="start" x={L + 68} y={133} size={13}>kafka</Label>
      <Box x={L - 60} y={168} w={120} h={38} label="hashtag wrk" seed={s('wrk')} labelSize={13} />
      <Arrow dashed pts={[[L - 30, 168], [L - 30, 143]]} seed={s('pull')} />
      <Label anchor="start" x={L - 24} y={160} size={12.5}>pulls</Label>
      <Label muted anchor="start" x={L + 6} y={228} size={12.5}>batch and</Label>
      <Label muted anchor="start" x={L + 6} y={245} size={12.5}>update</Label>
      <Arrow tone="blue" pts={[[L, 206], [L, 322], [144, 322]]} seed={s('wrk-db')} />
      {/* read column */}
      <Actor x={R} y={50} s={0.9} seed={s('user')} />
      <Arrow tone="blue" pts={[[R, 98], [R, 166]]} seed={s('get')} />
      <Label kind="mono" tone="blue" anchor="end" x={R - 8} y={130} size={12.5}>GET</Label>
      <Label kind="mono" tone="blue" anchor="start" x={R + 8} y={124} size={12.5}>/hashtag/</Label>
      <Label kind="mono" tone="blue" anchor="start" x={R + 8} y={140} size={12.5}>&lt;tag&gt;</Label>
      <Box x={R - 66} y={168} w={132} h={38} label="hashtag api" seed={s('api')} labelSize={13} />
      {/* under the api box, between its two arrows: the api servers won't count (critic C-11) */}
      <Label muted anchor="start" x={R - 32} y={226} size={12.5}>won’t count</Label>
      <Arrow tone="blue" pts={[[R - 40, 206], [R - 40, 322], [196, 322]]} seed={s('api-db')} />
      <Arrow tone="blue" pts={[[R + 44, 206], [R + 44, 246]]} seed={s('api-cache')} />
      <Cyl cx={R + 44} top={250} rx={22} ry={6} h={20} seed={s('cache')} />
      <Label kind="mono" x={R + 44} y={300} size={12.5}>cache</Label>
      <Label muted x={R + 44} y={316} size={12.5}>optional</Label>
      {/* shared database */}
      <PartDb cx={170} top={304} rx={24} h={24} dx={36} dy={48} seed={s('db')} />
      <Label kind="mono" x={170} y={418} size={13}>partitioned db</Label>
      <Label x={170} y={436} size={12.5}>MySQL, MongoDB, DDB</Label>
      <Label x={170} y={470} size={13}>key value based access:</Label>
      <Label x={170} y={488} size={13}>for a key (hashtag),</Label>
      <Label x={170} y={506} size={13}>get the value (details)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox §9 sketch */

const R9_TITLE = 'One path at a time';
const R9_DESC = 'Two long arrows, the write path dashed on top and the read path solid underneath, each passing through a few hops; a magnifier sits over one hop of the write path, asking what happens if this hop gets a huge load.';

export function OnePathSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'rule9s-p' : 'rule9s';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 320 : 480;
  const x0 = P ? 16 : 30, x1 = W - (P ? 16 : 30);
  const yw = P ? 70 : 62, yr = P ? 124 : 112;
  const hops = [0.28, 0.52, 0.76].map((t) => x0 + (x1 - x0) * t);
  const mx = hops[1], my = yw;
  return (
    <Fig id={id} w={W} h={P ? 150 : 136} title={R9_TITLE} desc={R9_DESC} className="bottomup">
      <Label anchor="start" x={x0} y={yw - 12} size={14}>WRITE</Label>
      <Arrow dashed pts={[[x0, yw], [x1, yw]]} seed={s('w')} />
      <Label anchor="start" x={x0} y={yr - 12} size={14}>READ</Label>
      <Arrow pts={[[x0, yr], [x1, yr]]} seed={s('r')} />
      {hops.map((x, i) => <Dot key={'w' + i} x={x} y={yw} />)}
      {hops.map((x, i) => <Dot key={'r' + i} x={x} y={yr} />)}
      <path className="ink" d={ellipse(mx, my, 15, 15, s('lens'))} />
      <Line pts={[[mx + 11, my + 11], [mx + 24, my + 24]]} weight="heavy" seed={s('handle')} />
      <Label x={P ? W / 2 : mx + 40} y={P ? 26 : 24} size={P ? 13 : 14}>what if this gets a huge load?</Label>
    </Fig>
  );
}
