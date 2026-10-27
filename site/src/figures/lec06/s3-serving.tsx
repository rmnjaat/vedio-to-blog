// Lecture 08 (lec06) §3 "Serving Gravatar at every size": Fig 3·a (redraw of board D-03, frame b_010715),
// Fig 3·b (redraw of board D-05, frame b_011130; panel a serving, panel b invalidation), Fig 3·c (new) and the
// §3 rule-box sketch. Specs: lectures/lec06/lesson/figures.md §3. Glyphs: ./s1-images-parts.
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cross, Cyl, Fleet, Label, Line, Num, Pipe, Worker } from '../kit/Kit';
import { Fig } from './floor';
import { Photo, Picture, Pill, Ring } from './s1-images-parts';

type Layout = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ Fig 3·a  Upload with a signed URL (D-03) */

const F3A_DESC = 'Uploading a photo, as in Lecture 7. One: the user asks the photo upload service to prepare an upload; it picks a random photo id and returns a signed URL. Two: the user uploads the file straight to S3 with that URL. Three: the user calls the API, which registers the photo with a row in the database. The S3 key is s3://gravatar-images/{user_id}/{random photo id}.';

export function UploadSigned({ layout = 'desk' }: Layout) {
  const title = 'Upload with a signed URL';
  if (layout === 'phone') {
    const s = (k: string) => `f3a-p-${k}`;
    return (
      <Fig id="f3a-p" w={340} h={380} title={title} desc={F3A_DESC}>
        {/* critic C-17: the square is labelled (the photo the user holds), and the rows read ① ② ③ top to bottom */}
        <Label muted anchor="start" x={2} y={98} size={13}>photo</Label>
        <Photo x={8} y={104} s={12} seed={s('photo')} />
        <Actor x={34} y={124} seed={s('user')} />
        <Label x={34} y={196} size={13}>user</Label>
        {/* 1: prepare */}
        <Arrow tone="blue" pts={[[34, 110], [34, 52], [124, 52]]} seed={s('prep')} />
        <Num x={56} y={24} n={1} />
        <Label anchor="start" x={70} y={28} size={13}>prepare</Label>
        <Box x={126} y={30} w={204} h={42} label="photo upload service" seed={s('svc')} labelSize={13} />
        <Label muted x={228} y={92} size={13}>random id + signed URL</Label>
        {/* 2: straight to s3 */}
        <Arrow tone="blue" pts={[[52, 140], [194, 140]]} seed={s('up')} />
        <Num x={88} y={126} n={2} />
        <Label anchor="start" x={60} y={164} size={13}>upload with the</Label>
        <Label anchor="start" x={60} y={182} size={13}>signed URL</Label>
        <Cloud cx={256} cy={142} w={118} h={56} seed={s('s3')} label="s3" />
        {/* 3: register */}
        <Arrow tone="blue" pts={[[34, 200], [34, 252], [124, 252]]} seed={s('reg')} />
        <Num x={80} y={238} n={3} />
        <Label anchor="start" x={44} y={280} size={13}>register the photo</Label>
        <Box x={126} y={234} w={80} h={36} label="api" seed={s('api')} />
        <Arrow tone="blue" pts={[[206, 252], [252, 252]]} seed={s('db-a')} />
        <Cyl cx={278} top={238} rx={22} ry={6} h={28} seed={s('db')} label="db" />
        <Label kind="mono" anchor="start" x={10} y={334} size={12.5}>s3://gravatar-images/</Label>
        <Label kind="mono" anchor="start" x={10} y={354} size={12.5}>{'{user_id}/{random photo id}'}</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3a-${k}`;
  return (
    <Fig id="f3a" w={640} h={310} title={title} desc={F3A_DESC}>
      {/* critic C-17: the square is labelled (the photo the user holds), and the rows read ① ② ③ top to bottom */}
      <Label muted x={34} y={92} size={13}>photo</Label>
      <Photo x={28} y={98} s={12} seed={s('photo')} />
      <Actor x={56} y={118} seed={s('user')} />
      <Label x={56} y={190} size={13}>user</Label>
      <Arrow tone="blue" pts={[[56, 104], [56, 64], [198, 64]]} seed={s('prep')} />
      <Num x={120} y={48} n={1} />
      <Label anchor="start" x={134} y={52} size={13}>prepare</Label>
      <Box x={200} y={42} w={200} h={44} label="photo upload service" seed={s('svc')} labelSize={13} />
      <Label muted x={300} y={106} size={13}>random id + signed URL</Label>
      <Arrow tone="blue" pts={[[74, 134], [468, 134]]} seed={s('up')} />
      <Num x={136} y={120} n={2} />
      <Label anchor="start" x={150} y={124} size={13}>upload straight to S3 with the signed URL</Label>
      <Cloud cx={540} cy={134} w={136} h={64} seed={s('s3')} label="s3" />
      <Arrow tone="blue" pts={[[56, 196], [56, 236], [218, 236]]} seed={s('reg')} />
      <Num x={136} y={222} n={3} />
      <Label anchor="start" x={70} y={258} size={13}>register the photo</Label>
      <Box x={220} y={218} w={90} h={36} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[310, 236], [372, 236]]} seed={s('db-a')} />
      <Cyl cx={398} top={222} rx={22} ry={6} h={28} seed={s('db')} label="db" />
      <Label kind="mono" anchor="start" x={20} y={298} size={13}>{'key: s3://gravatar-images/{user_id}/{random photo id}'}</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b  Gravatar end to end (D-05) */

const F3B_DESC = 'Panel a, serving: a site visitor requests gravatar.com/<hash>, which is the CDN. On a hit the CDN answers. Only on a miss does the CDN call the API at api.gravatar.com/photos/<hash>; the API asks the database which photo is active and reads its bytes from S3, and the answer goes back through the CDN, which caches it for one to two days. Panel b, invalidation: the user updates the photo through the API, which writes the database and puts a photo_updated event on Kafka. An invalidation worker pulls the event and tells the CDN to purge /h1, so the cached old photo is gone and the next request misses.';

function ServingPanel({ id, untitled = false }: { id: string; untitled?: boolean }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Actor x={30} y={42} seed={s('visitor')} />
      <Label x={30} y={114} size={13}>site visitor</Label>
      <Arrow tone="blue" pts={[[48, 58], [98, 58]]} seed={s('req')} />
      <Arrow tone="green" pts={[[98, 74], [48, 74]]} seed={s('ans')} />
      <Cloud cx={170} cy={66} w={140} h={64} seed={s('cdn')} label="cdn" />
      {/* critic C-15: a plain hand annotation, not a speech bubble */}
      <Label x={281} y={18} size={13}>why not</Label>
      <Label x={281} y={36} size={13}>straight to S3?</Label>
      <Label kind="mono" anchor="start" x={244} y={82} size={12.5}>gravatar.com</Label>
      <Label anchor="start" x={244} y={100} size={13} muted>caches,</Label>
      <Label anchor="start" x={244} y={116} size={13} muted>TTL 1–2 days</Label>
      {/* only on a miss: the CDN calls the API (head at the api) */}
      <Arrow tone="blue" pts={[[146, 98], [146, 172]]} seed={s('miss')} />
      <Label tone="blue" anchor="end" x={138} y={134} size={13}>only on</Label>
      <Label tone="blue" anchor="end" x={138} y={150} size={13}>a miss</Label>
      <Arrow tone="green" pts={[[194, 172], [194, 98]]} seed={s('fill')} />
      <Label tone="green" anchor="start" x={202} y={142} size={13}>cached, served</Label>
      <Box x={110} y={174} w={120} h={38} label="api" seed={s('api')} />
      {/* the board's endpoint, on two lines so it stays clear of the db and s3 arrows */}
      <Label kind="mono" x={150} y={230} size={12.5}>api.gravatar.com</Label>
      <Label kind="mono" x={140} y={246} size={12.5}>/photos/&lt;hash&gt;</Label>
      <Arrow tone="blue" pts={[[110, 193], [52, 193], [52, 262]]} seed={s('db-a')} />
      <Cyl cx={52} top={266} rx={22} ry={6} h={28} seed={s('db')} label="db" />
      <Label anchor="start" x={82} y={282} size={13}>which photo</Label>
      <Label anchor="start" x={82} y={298} size={13}>is active?</Label>
      <Arrow tone="blue" pts={[[230, 193], [286, 193], [286, 258]]} seed={s('s3-a')} />
      <Label anchor="end" x={278} y={252} size={13}>read bytes</Label>
      <Cloud cx={286} cy={288} w={90} h={50} seed={s('s3')} label="s3" />
      {!untitled && <Label kind="title" x={170} y={356}>a · serving</Label>}
    </g>
  );
}

function InvalidationPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Actor x={30} y={42} seed={s('user')} />
      <Label x={30} y={114} size={13}>user</Label>
      <Arrow tone="blue" pts={[[48, 62], [114, 62]]} seed={s('upd')} />
      <Label anchor="start" x={50} y={96} size={13}>update photo</Label>
      <Box x={116} y={44} w={90} h={36} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[206, 62], [274, 62]]} seed={s('db-a')} />
      <Cyl cx={300} top={48} rx={22} ry={6} h={28} seed={s('db')} label="db" />
      <Arrow dashed pts={[[161, 80], [161, 124]]} seed={s('evt')} />
      <Label kind="mono" anchor="start" x={169} y={108} size={12.5}>photo_updated</Label>
      <Pipe x={76} cy={140} w={180} seed={s('kafka')} />
      <Label kind="mono" anchor="end" x={68} y={145} size={13}>kafka</Label>
      {/* the worker pulls: arrow starts at the worker */}
      <Arrow pts={[[150, 206], [150, 156]]} seed={s('pull')} />
      <Label anchor="start" x={158} y={186} size={13} muted>pulls</Label>
      <Worker x={70} y={208} w={176} h={38} label="cdn invalidation" seed={s('worker')} size={13} />
      <Arrow dashed pts={[[150, 246], [150, 282]]} seed={s('purge')} />
      <Label kind="mono" anchor="start" x={158} y={270} size={13}>purge /h1</Label>
      <Cloud cx={150} cy={312} w={150} h={54} seed={s('cdn')} label="cdn" />
      <Photo x={196} y={302} s={14} seed={s('old')} />
      <Cross x={203} y={309} size={22} seed={s('x')} />
      <Label anchor="start" x={234} y={316} size={13} tone="red">old copy</Label>
      <Label kind="title" x={170} y={364}>b · invalidation</Label>
    </g>
  );
}

const F3B_SERVING_DESC = 'Serving: a site visitor requests gravatar.com/<hash>, which is the CDN. On a hit the CDN answers. Only on a miss does the CDN call the API at api.gravatar.com/photos/<hash>; the API asks the database which photo is active and reads its bytes from S3, and the answer goes back through the CDN, which caches it for one to two days. A note asks: why not straight to S3?';

export function GravatarEndToEnd({ layout = 'desk', servingOnly = false }: Layout & { servingOnly?: boolean }) {
  const title = 'Gravatar end to end';
  if (servingOnly)
    return (
      <Fig id={layout === 'phone' ? 'f3b-s-p' : 'f3b-s'} w={340} h={330} title="Gravatar behind a CDN" desc={F3B_SERVING_DESC}>
        <ServingPanel untitled id={layout === 'phone' ? 'f3b-s-pa' : 'f3b-s-a'} />
      </Fig>
    );
  if (layout === 'phone')
    return (
      <Fig id="f3b-p" w={340} h={756} title={title} desc={F3B_DESC}>
        <ServingPanel id="f3b-pa" />
        <Line pts={[[10, 374], [330, 374]]} weight="thin" dotted seed="f3b-p-sep" className="faint" />
        <g transform="translate(0 382)"><InvalidationPanel id="f3b-pb" /></g>
      </Fig>
    );
  return (
    <Fig id="f3b" w={700} h={376} title={title} desc={F3B_DESC}>
      <g transform="translate(2 0)"><ServingPanel id="f3b-a" /></g>
      <Line pts={[[350, 14], [350, 362]]} weight="thin" dotted seed="f3b-sep" className="faint" />
      <g transform="translate(358 0)"><InvalidationPanel id="f3b-b" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·c  One original, any width */

const F3C_DESC = 'Two img tags ask for the same photo at w=32 and w=512. Both go to the CDN, whose cache key includes the width. On a miss the CDN calls the origin, a fleet of many-core API servers, which reads the single 1024×1024 original from S3, resizes it with ImageMagick and returns a 32×32 or a 512×512 image. The transform is the one extra step.';

export function OneOriginalAnyWidth({ layout = 'desk' }: Layout) {
  const title = 'One original, any width';
  if (layout === 'phone') {
    const s = (k: string) => `f3c-p-${k}`;
    return (
      <Fig id="f3c-p" w={340} h={470} title={title} desc={F3C_DESC}>
        <Pill x={6} y={20} w={198} text="gravatar.com/h1?w=32" seed={s('p1')} />
        <Pill x={6} y={58} w={198} text="gravatar.com/h1?w=512" seed={s('p2')} />
        <Arrow tone="blue" pts={[[204, 33], [214, 33], [214, 52], [226, 52]]} seed={s('r1')} />
        <Arrow tone="blue" pts={[[204, 71], [214, 71], [214, 60], [226, 60]]} seed={s('r2')} />
        <Cloud cx={280} cy={58} w={108} h={56} seed={s('cdn')} label="cdn" />
        <Label x={282} y={136} size={13}>cache key</Label>
        <Label x={282} y={152} size={13}>includes ?w=</Label>
        <Arrow tone="blue" pts={[[244, 86], [244, 112], [150, 112], [150, 156]]} seed={s('miss')} />
        <Label tone="blue" anchor="end" x={132} y={136} size={13}>on a miss</Label>
        <Fleet x={110} y={158} w={90} h={40} n={3} label="api" countLabel={false} seed={s('api')} />
        <Label anchor="end" x={100} y={176} size={13}>many</Label>
        <Label anchor="end" x={100} y={192} size={13}>cores</Label>
        <Arrow tone="blue" pts={[[155, 198], [155, 250]]} seed={s('read')} />
        <Cloud cx={155} cy={278} w={100} h={50} seed={s('s3')} label="s3" />
        <Label kind="mono" x={155} y={322} size={12.5}>one 1024×1024 original</Label>
        <Arrow tone="blue" pts={[[205, 278], [232, 278]]} seed={s('in')} />
        <Box x={234} y={254} w={102} h={54} label="resize" sub="imagemagick" seed={s('rs')} />
        <Label x={285} y={226} size={13}>the one extra</Label>
        <Label x={285} y={242} size={13}>step: transform</Label>
        <Arrow tone="green" pts={[[285, 308], [285, 352], [236, 352]]} seed={s('out')} />
        <Picture x={196} y={342} w={24} h={20} seed={s('small')} />
        <Label kind="mono" x={208} y={384} size={12.5}>32×32</Label>
        <Picture x={100} y={340} w={70} h={58} seed={s('big')} />
        <Label kind="mono" x={135} y={420} size={12.5}>512×512</Label>
        <Label tone="green" x={170} y={452} size={13}>back through the cdn, cached per width</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f3c-${k}`;
  return (
    <Fig id="f3c" w={880} h={300} title={title} desc={F3C_DESC}>
      <Pill x={8} y={50} w={212} text="gravatar.com/h1?w=32" seed={s('p1')} />
      <Pill x={8} y={110} w={212} text="gravatar.com/h1?w=512" seed={s('p2')} />
      <Arrow tone="blue" pts={[[220, 63], [244, 63], [244, 88], [270, 88]]} seed={s('r1')} />
      <Arrow tone="blue" pts={[[220, 123], [244, 123], [244, 100], [270, 100]]} seed={s('r2')} />
      <Cloud cx={330} cy={94} w={118} h={62} seed={s('cdn')} label="cdn" />
      <Label x={330} y={152} size={13}>cache key includes ?w=</Label>
      <Arrow tone="blue" pts={[[390, 94], [472, 94]]} seed={s('miss')} />
      <Label tone="blue" x={430} y={82} size={13}>on a miss</Label>
      <Fleet x={474} y={74} w={92} h={40} n={3} label="api" countLabel={false} seed={s('api')} />
      <Label x={520} y={136} size={13}>many cores</Label>
      <Arrow tone="blue" pts={[[594, 94], [644, 94]]} seed={s('read')} />
      <Cloud cx={696} cy={94} w={100} h={54} seed={s('s3')} label="s3" />
      <Label kind="mono" x={696} y={142} size={12.5}>one 1024×1024 original</Label>
      <Arrow tone="blue" pts={[[696, 152], [696, 216], [600, 216]]} seed={s('in')} />
      <Box x={486} y={188} w={112} h={56} label="resize" sub="imagemagick" seed={s('rs')} />
      <Label x={542} y={272} size={13}>the one extra step: transform</Label>
      <Arrow tone="green" pts={[[486, 217], [412, 217]]} seed={s('out')} />
      <Picture x={376} y={206} w={24} h={20} seed={s('small')} />
      <Label kind="mono" x={388} y={250} size={12.5}>32×32</Label>
      <Picture x={270} y={186} w={70} h={58} seed={s('big')} />
      <Label kind="mono" x={305} y={264} size={12.5}>512×512</Label>
      <Label tone="green" x={170} y={220} size={13}>back through the cdn,</Label>
      <Label tone="green" x={170} y={236} size={13}>cached per width</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §3 */

const R3_DESC = 'The CDN’s origin is the API. The API asks the database, circled, which knows which photo is active; S3 hangs off the API and only holds bytes.';

export function SourceOfTruthOrigin({ layout = 'desk' }: Layout) {
  const title = 'The origin is the API, because the database knows';
  if (layout === 'phone') {
    const s = (k: string) => `r3-p-${k}`;
    return (
      <Fig id="l06-rule3-p" w={320} h={170} title={title} desc={R3_DESC} className="bottomup">
        <Cloud cx={46} cy={44} w={80} h={42} seed={s('cdn')} label="cdn" size={13} />
        <Arrow tone="blue" pts={[[86, 44], [118, 44]]} seed={s('a1')} />
        <Box x={120} y={28} w={66} h={32} label="api" seed={s('api')} />
        <Arrow tone="blue" pts={[[186, 44], [226, 44]]} seed={s('a2')} />
        <Cyl cx={250} top={30} rx={20} ry={5.5} h={26} seed={s('db')} />
        <Ring x={250} y={46} rx={34} ry={30} seed={s('ring')} />
        <Label x={250} y={96} size={13}>knows which</Label>
        <Label x={250} y={112} size={13}>photo is active</Label>
        <Arrow tone="blue" pts={[[153, 60], [153, 104]]} seed={s('a3')} />
        <Cloud cx={153} cy={128} w={76} h={38} seed={s('s3')} label="s3" size={13} />
        <Label anchor="end" x={110} y={132} size={13}>just bytes</Label>
      </Fig>
    );
  }
  const s = (k: string) => `r3-${k}`;
  return (
    <Fig id="l06-rule3" w={480} h={150} title={title} desc={R3_DESC} className="bottomup">
      <Cloud cx={60} cy={56} w={100} h={50} seed={s('cdn')} label="cdn" size={13} />
      <Arrow tone="blue" pts={[[110, 56], [166, 56]]} seed={s('a1')} />
      <Box x={168} y={40} w={72} h={32} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[240, 56], [296, 56]]} seed={s('a2')} />
      <Cyl cx={322} top={42} rx={20} ry={5.5} h={26} seed={s('db')} />
      <Ring x={322} y={58} rx={36} ry={30} seed={s('ring')} />
      <Label anchor="start" x={366} y={52} size={13}>knows which</Label>
      <Label anchor="start" x={366} y={68} size={13}>photo is active</Label>
      <Arrow tone="blue" pts={[[204, 72], [204, 106]]} seed={s('a3')} />
      <Cloud cx={204} cy={126} w={80} h={36} seed={s('s3')} label="s3" size={13} />
      <Label anchor="start" x={252} y={131} size={13}>just bytes</Label>
    </Fig>
  );
}
