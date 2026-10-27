// Lecture 07 (lec09): the "so far" maps shown at the top of every chapter. One small drawing per build that grows
// chapter by chapter. Each chapter opens on the design as it stands, with the piece the previous chapter added on a
// blue wash ("new" on desk; a legend line on phone).
//   photos (Build 1):  0 app → api servers → db (the two boxes) · 1 + cdn, pulling from the api servers ·
//                      2 + private s3 bucket as origin, pre-signed upload straight to it · 3 image svc + post svc,
//                      posts table without URLs · 4 signed, expiring URLs; only allowed viewers get them ·
//                      5 + ?w=360 resizing at the cdn, kafka "post published"
//   hashtag (Build 2): 0 post svc → kafka, the page with nothing behind it · 1 hashtag api + one document per tag ·
//                      2 extractor → POST_HASHTAG → counting (count += n) · 3 popularity → their kafka → workers,
//                      cdn in front of the hashtag api
// Desk layouts are 640 wide (shown ~1:1 on a laptop); phone layouts are 330 wide.
import React from 'react';
import { roundRect } from '../kit/hand';
import { Actor, Arrow, Box, Cloud, Cyl, Fig, Label, Pipe, Worker } from './kit';
import { Bucket } from './s2-cdn-parts';

export type PhotosStage = 0 | 1 | 2 | 3 | 4 | 5;
export type HashtagStage = 0 | 1 | 2 | 3;
type Layout = 'desk' | 'phone';

/** The blue wash behind the piece a chapter adds. */
function Wash({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: string }) {
  return <path d={roundRect(x, y, w, h, 7, seed)} style={{ fill: 'var(--blue-wash)', stroke: 'none' }} />;
}

/* ------------------------------------------------------------------ Build 1: the photos */

const PHOTOS_DESC: Record<PhotosStage, string> = {
  0: 'The photos so far: two boxes. The app sends every photo to the API servers and loads every photo from them; the API servers keep posts and photos in one database.',
  1: 'The photos so far: the app reads photos from a CDN at instacdn.net, which pulls from the API servers on a miss. Uploads still go through the API servers to the database. Marked new: the CDN.',
  2: 'The photos so far: the app uploads each photo straight to a private S3 bucket with a pre-signed URL from the API servers, and reads photos from the CDN, which pulls from the bucket on a miss. Marked new: the S3 bucket and the pre-signed upload.',
  3: 'The photos so far: an image service hands out pre-signed upload URLs; the photo goes straight to the private S3 bucket; a post service stores posts as id, user_id, image_id and caption, with no URL, and builds each photo URL per request. The CDN pulls from the bucket. Marked new: the image and post services and the posts table.',
  4: 'The photos so far: image service, private S3 bucket, post service and posts table as before. Photo URLs are now signed and expire; the CDN checks the signature and the expiry, and the post service gives URLs only to viewers allowed to see the photo. Marked new: signed, expiring URLs.',
  5: 'The photos, end to end: image service and pre-signed upload to a private S3 bucket; post service and posts table with URLs built and signed per request; the CDN checks signatures and resizes on ?w=360; and the post service puts a post published event on Kafka. Marked new: resizing and Kafka.',
};

function PhotosDesk({ stage }: { stage: PhotosStage }) {
  const id = `sf-photos${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const split = stage >= 3;
  const H = stage >= 5 ? 316 : 256;
  return (
    <Fig id={id} w={640} h={H} title="The photos so far" desc={PHOTOS_DESC[stage]}>
      {stage === 1 && <Wash x={160} y={34} w={146} h={74} seed={s('n')} />}
      {stage === 2 && <Wash x={394} y={4} w={140} h={124} seed={s('n')} />}
      {stage === 3 && <Wash x={112} y={154} w={524} h={84} seed={s('n')} />}
      {stage === 4 && <g><Wash x={140} y={106} w={180} h={20} seed={s('n')} /><Wash x={456} y={212} w={180} h={20} seed={s('n2')} /></g>}
      {stage === 5 && <g><Wash x={140} y={126} w={180} h={20} seed={s('n')} /><Wash x={232} y={244} w={292} h={62} seed={s('n2')} /></g>}
      {stage >= 1 && stage <= 5 && <Label muted anchor="start" x={stage === 1 ? 312 : stage === 2 ? 540 : stage === 3 ? 590 : stage === 4 ? 326 : 530} y={stage === 3 ? 148 : stage === 4 ? 121 : stage === 5 ? 286 : 52} size={13}>new</Label>}

      <Actor x={44} y={96} seed={s('app')} />
      <Label x={44} y={164} size={14}>app</Label>

      {stage >= 1 && <g>
        <Cloud cx={230} cy={70} w={120} h={58} label="cdn" seed={s('cdn')} />
        <Arrow tone="blue" pts={[[64, 104], [166, 78]]} seed={s('read')} />
      </g>}
      {stage === 1 && <g>
        <Arrow pts={[[236, 100], [240, 160]]} seed={s('pull1')} />
        <Label muted anchor="start" x={248} y={136} size={13}>pulls on a miss</Label>
      </g>}
      {stage >= 2 && <g>
        <Bucket cx={460} cy={70} w={104} h={58} seed={s('s3')} />
        <Label muted x={460} y={116} size={13}>private</Label>
        <Arrow pts={[[292, 70], [406, 70]]} seed={s('pull')} />
        <Label muted x={350} y={60} size={13}>pulls on a miss</Label>
        <Arrow tone="blue" pts={[[40, 88], [70, 28], [440, 24], [452, 38]]} seed={s('up')} />
        <Label anchor="start" x={84} y={18} size={13}>photo straight to s3, pre-signed</Label>
      </g>}
      {stage >= 4 && <Label x={230} y={121} size={13}>checks signature + expiry</Label>}
      {stage >= 5 && <Label x={230} y={141} size={13}>resizes on ?w=360</Label>}

      {!split && <g>
        <Box x={180} y={162} w={120} h={38} label="api servers" seed={s('api')} />
        <Arrow tone="blue" pts={[[64, 124], [178, 176]]} seed={s('call')} />
        <Label muted anchor="start" x={70} y={170} size={13}>{stage === 0 ? 'every photo' : stage === 1 ? 'uploads' : 'ask to upload'}</Label>
        <Arrow pts={[[300, 181], [390, 181]]} seed={s('w')} />
        <Cyl cx={420} top={162} rx={28} ry={7} h={38} label="db" seed={s('db')} />
      </g>}
      {split && <g>
        <Box x={120} y={162} w={108} h={38} label="image svc" seed={s('img')} />
        <Box x={244} y={162} w={108} h={38} label="post svc" seed={s('post')} />
        <Arrow tone="blue" pts={[[64, 124], [118, 172]]} seed={s('prep')} />
        <Arrow tone="blue" pts={[[50, 150], [50, 232], [270, 232], [270, 202]]} seed={s('postcall')} />
        <Arrow pts={[[352, 181], [390, 181]]} seed={s('w')} />
        <Cyl cx={420} top={162} rx={28} ry={7} h={38} label="posts" seed={s('db')} />
        <Label kind="mono" anchor="start" x={462} y={170} size={13}>id, user_id,</Label>
        <Label kind="mono" anchor="start" x={462} y={188} size={13}>image_id, caption</Label>
        <Label muted anchor="start" x={462} y={206} size={13}>{stage >= 4 ? 'url: signed per request' : 'url: built per request'}</Label>
        {stage >= 4 && <Label muted anchor="start" x={462} y={226} size={13}>only for allowed viewers</Label>}
      </g>}
      {stage >= 5 && <g>
        <Arrow tone="blue" dashed pts={[[326, 202], [326, 248]]} seed={s('ev')} />
        <Pipe x={240} cy={264} w={130} ry={13} label="kafka" seed={s('k')} />
        <Label muted anchor="start" x={382} y={268} size={13}>post published</Label>
      </g>}
    </Fig>
  );
}

function PhotosPhone({ stage }: { stage: PhotosStage }) {
  const id = `sf-photos${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const split = stage >= 3;
  const base = stage >= 5 ? 362 : 286;
  const marked = stage >= 1;
  const H = base + (marked ? 22 : 0);
  return (
    <Fig id={id} w={330} h={H} title="The photos so far" desc={PHOTOS_DESC[stage]}>
      {stage === 1 && <Wash x={98} y={32} w={104} h={56} seed={s('n')} />}
      {stage === 2 && <g><Wash x={226} y={32} w={96} h={78} seed={s('n')} /><Wash x={14} y={2} w={300} h={30} seed={s('n2')} /></g>}
      {stage === 3 && <Wash x={4} y={128} w={322} h={150} seed={s('n')} />}
      {stage === 4 && <g><Wash x={60} y={92} w={180} h={18} seed={s('n')} /><Wash x={6} y={258} w={180} h={18} seed={s('n2')} /></g>}
      {stage === 5 && <g><Wash x={60} y={110} w={180} h={18} seed={s('n')} /><Wash x={170} y={282} w={156} h={76} seed={s('n2')} /></g>}

      <Actor x={28} y={44} s={0.8} seed={s('app')} />
      <Label x={28} y={100} size={13.5}>app</Label>

      {stage >= 1 && <g>
        <Cloud cx={150} cy={60} w={96} h={48} label="cdn" seed={s('cdn')} />
        <Arrow tone="blue" pts={[[42, 60], [100, 60]]} seed={s('read')} />
      </g>}
      {stage === 1 && <g>
        <Arrow pts={[[150, 86], [150, 132]]} seed={s('pull1')} />
        <Label muted anchor="start" x={160} y={114} size={13.5}>pulls on a miss</Label>
      </g>}
      {stage >= 2 && <g>
        <Bucket cx={272} cy={60} w={84} h={48} seed={s('s3')} />
        <Label muted x={272} y={102} size={13.5}>private</Label>
        <Arrow pts={[[200, 60], [228, 60]]} seed={s('pull')} />
        <Arrow tone="blue" pts={[[20, 40], [40, 26], [258, 24], [270, 34]]} seed={s('up')} />
        <Label x={150} y={18} size={13.5}>photo straight to s3, pre-signed</Label>
      </g>}
      {stage >= 4 && <Label x={150} y={106} size={13.5}>checks signature + expiry</Label>}
      {stage >= 5 && <Label x={150} y={124} size={13.5}>resizes on ?w=360</Label>}

      {!split && <g>
        <Box x={90} y={134} w={120} h={34} label="api servers" seed={s('api')} />
        <Arrow tone="blue" pts={[[28, 108], [28, 151], [88, 151]]} seed={s('call')} />
        <Arrow pts={[[210, 151], [250, 151], [250, 204]]} seed={s('w')} />
        <Cyl cx={250} top={206} rx={22} ry={6} h={34} label="db" seed={s('db')} />
      </g>}
      {split && <g>
        <Box x={46} y={134} w={112} h={34} label="image svc" seed={s('img')} />
        <Box x={174} y={134} w={112} h={34} label="post svc" seed={s('post')} />
        <Arrow tone="blue" pts={[[28, 108], [28, 151], [44, 151]]} seed={s('prep')} />
        <Arrow tone="blue" pts={[[14, 108], [14, 190], [200, 190], [200, 170]]} seed={s('postcall')} />
        <Arrow pts={[[250, 168], [250, 204]]} seed={s('w')} />
        <Cyl cx={250} top={206} rx={22} ry={6} h={34} label="posts" seed={s('db')} />
        <Label kind="mono" anchor="start" x={12} y={216} size={13.5}>id, user_id,</Label>
        <Label kind="mono" anchor="start" x={12} y={234} size={13.5}>image_id, caption</Label>
        <Label muted anchor="start" x={12} y={252} size={13.5}>{stage >= 4 ? 'url: signed per request' : 'url: built per request'}</Label>
        {stage >= 4 && <Label muted anchor="start" x={12} y={271} size={13.5}>only for allowed viewers</Label>}
      </g>}
      {stage >= 5 && <g>
        <Arrow tone="blue" dashed pts={[[288, 151], [318, 151], [318, 300], [300, 300]]} seed={s('ev')} />
        <Pipe x={176} cy={300} w={120} ry={12} label="kafka" seed={s('k')} />
        <Label muted x={236} y={352} size={13.5}>post published</Label>
      </g>}
      {marked && <Label muted anchor="start" x={6} y={H - 8} size={13.5}>shaded: new since the last chapter</Label>}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Build 2: the hashtag page */

const HASHTAG_DESC: Record<HashtagStage, string> = {
  0: 'The hashtag page so far: the post service puts every new post on Kafka. A user asks for the #sunset page, which must show the photo count and the top 100; where that is stored and how the count changes is open.',
  1: 'The hashtag page so far: a user’s GET /hashtag/sunset goes to a hashtag API, which reads one document per hashtag from the hashtag database: tag, total_photos and top_100 as post IDs. The post service still puts every post on Kafka; how the count changes is open. Marked new: the hashtag API and the document.',
  2: 'The hashtag page so far: the post service puts every post on Kafka; extractors write one message per hashtag to POST_HASHTAG, keyed by hashtag; counting servers batch them and write count += n into the hashtag database. Readers ask the hashtag API, which reads one document. Marked new: the extractor, POST_HASHTAG and the counting servers.',
  3: 'The hashtag page, complete: post service, Kafka, extractors, POST_HASHTAG and counting servers writing count += n; the popularity service puts each new top 100 on its own Kafka, and workers replace the top_100 array; readers ask a CDN, which pulls from the hashtag API on a miss. Marked new: the popularity path and the CDN.',
};

function HashtagDesk({ stage }: { stage: HashtagStage }) {
  const id = `sf-hashtag${stage}`;
  const s = (k: string) => `${id}-${k}`;
  const ry = 286;
  return (
    <Fig id={id} w={640} h={344} title="The hashtag page so far" desc={HASHTAG_DESC[stage]}>
      {stage === 1 && <g><Wash x={222} y={124} w={364} h={82} seed={s('n')} /><Wash x={218} y={262} w={136} h={48} seed={s('n2')} /></g>}
      {stage === 2 && <Wash x={202} y={16} w={376} h={98} seed={s('n')} />}
      {stage === 3 && <g><Wash x={4} y={192} w={306} h={64} seed={s('n')} /><Wash x={96} y={260} w={110} h={54} seed={s('n2')} /></g>}
      {stage >= 1 && <Label muted anchor="start" x={stage === 1 ? 592 : stage === 2 ? 584 : 316} y={stage === 1 ? 140 : stage === 2 ? 32 : 206} size={13}>new</Label>}

      <Box x={10} y={26} w={92} h={34} label="post svc" seed={s('post')} />
      <Arrow tone="blue" dashed pts={[[102, 43], [118, 43]]} seed={s('pk')} />
      <Pipe x={120} cy={43} w={70} ry={13} label="kafka" seed={s('k')} />
      {stage < 2 && <Label muted anchor="start" x={210} y={48} size={13}>how does the count change?</Label>}
      {stage >= 2 && <g>
        <Arrow dashed pts={[[192, 43], [208, 43]]} seed={s('a1')} />
        <Worker x={210} y={26} w={104} h={34} label="extractor" seed={s('ex')} />
        <Arrow tone="blue" dashed pts={[[314, 43], [328, 43]]} seed={s('a2')} />
        <Pipe x={330} cy={43} w={120} ry={13} label="POST_HASHTAG" seed={s('ph')} />
        <Arrow dashed pts={[[452, 43], [466, 43]]} seed={s('a3')} />
        <Worker x={468} y={26} w={100} h={34} label="counting" seed={s('cnt')} />
        <Arrow tone="green" pts={[[540, 62], [540, 124]]} seed={s('a4')} />
        <Label anchor="start" x={550} y={98} size={13}>count += n</Label>
      </g>}

      {stage >= 1 && <g>
        <Cyl cx={540} top={128} rx={30} ry={7} h={40} label="hashtag db" seed={s('db')} />
        <Label kind="mono" anchor="start" x={232} y={144} size={13}>{'{ tag: "sunset",'}</Label>
        <Label kind="mono" anchor="start" x={232} y={164} size={13}>{'  total_photos: 1.2m,'}</Label>
        <Label kind="mono" anchor="start" x={232} y={184} size={13}>{'  top_100: [post IDs] }'}</Label>
      </g>}

      {stage >= 3 && <g>
        <Box x={10} y={200} w={100} h={34} label="popularity" seed={s('pop')} />
        <Arrow tone="blue" dashed pts={[[110, 217], [124, 217]]} seed={s('b1')} />
        <Pipe x={126} cy={217} w={70} ry={13} label="their kafka" seed={s('tk')} />
        <Arrow dashed pts={[[198, 217], [212, 217]]} seed={s('b2')} />
        <Worker x={214} y={200} w={88} h={34} label="workers" seed={s('wk')} />
        <Arrow tone="green" pts={[[302, 217], [470, 217], [470, 152], [508, 152]]} seed={s('b3')} />
        <Label muted x={390} y={208} size={13}>replace top_100</Label>
      </g>}

      <Actor x={30} y={ry - 24} seed={s('u')} />
      <Label x={30} y={ry + 42} size={14}>user</Label>
      {stage === 0 && <g>
        <Arrow tone="blue" pts={[[48, ry], [224, ry]]} seed={s('r0')} />
        <Box x={226} y={ry - 17} w={150} h={34} label="#sunset page" seed={s('page')} />
        <Label muted anchor="start" x={390} y={ry - 4} size={13}>count + top 100:</Label>
        <Label muted anchor="start" x={390} y={ry + 14} size={13}>stored where?</Label>
      </g>}
      {stage >= 1 && <g>
        {stage >= 3 ? <g>
          <Arrow tone="blue" pts={[[48, ry], [98, ry]]} seed={s('r1')} />
          <Cloud cx={150} cy={ry} w={100} h={46} label="cdn" seed={s('cdn')} />
          <Arrow pts={[[202, ry], [224, ry]]} seed={s('r2')} />
        </g> : <Arrow tone="blue" pts={[[48, ry], [224, ry]]} seed={s('r1')} />}
        <Box x={226} y={ry - 17} w={120} h={34} label="hashtag api" seed={s('api')} />
        <Arrow pts={[[346, ry], [604, ry], [604, 150], [574, 150]]} seed={s('r3')} />
        <Label muted x={470} y={ry - 8} size={13}>read one document</Label>
      </g>}
      <Label kind="mono" muted anchor="start" x={60} y={ry + 42} size={13}>GET /hashtag/sunset</Label>
    </Fig>
  );
}

function HashtagPhone({ stage }: { stage: HashtagStage }) {
  const id = `sf-hashtag${stage}-p`;
  const s = (k: string) => `${id}-${k}`;
  const ry = 330;
  const marked = stage >= 1;
  const H = 396 + (marked ? 22 : 0);
  return (
    <Fig id={id} w={330} h={H} title="The hashtag page so far" desc={HASHTAG_DESC[stage]}>
      {stage === 1 && <g><Wash x={4} y={156} w={322} h={72} seed={s('n')} /><Wash x={164} y={ry - 22} w={132} h={44} seed={s('n2')} /></g>}
      {stage === 2 && <Wash x={4} y={12} w={322} h={132} seed={s('n')} />}
      {stage === 3 && <g><Wash x={4} y={234} w={322} h={62} seed={s('n')} /><Wash x={66} y={ry - 26} w={88} h={52} seed={s('n2')} /></g>}

      <Box x={8} y={18} w={88} h={32} label="post svc" seed={s('post')} />
      <Arrow tone="blue" dashed pts={[[96, 34], [108, 34]]} seed={s('pk')} />
      <Pipe x={110} cy={34} w={56} ry={12} label="kafka" seed={s('k')} />
      {stage < 2 && <Label muted anchor="start" x={184} y={39} size={13.5}>count changes how?</Label>}
      {stage >= 2 && <g>
        <Arrow dashed pts={[[168, 34], [188, 34]]} seed={s('a1')} />
        <Worker x={190} y={18} w={132} h={32} label="extractor" seed={s('ex')} />
        <Arrow tone="blue" dashed pts={[[256, 50], [256, 86]]} seed={s('a2')} />
        <Pipe x={190} cy={100} w={132} ry={12} label="POST_HASHTAG" seed={s('ph')} />
        <Arrow dashed pts={[[188, 100], [130, 100]]} seed={s('a3')} />
        <Worker x={8} y={84} w={120} h={32} label="counting" seed={s('cnt')} />
        <Arrow tone="green" pts={[[40, 116], [40, 158]]} seed={s('a4')} />
        <Label anchor="start" x={52} y={140} size={13.5}>count += n</Label>
      </g>}

      {stage >= 1 && <g>
        <Cyl cx={50} top={162} rx={26} ry={6} h={34} label="hashtag db" seed={s('db')} />
        <Label kind="mono" anchor="start" x={104} y={176} size={13.5}>{'{ tag, total_photos,'}</Label>
        <Label kind="mono" anchor="start" x={104} y={196} size={13.5}>{'  top_100: [post IDs] }'}</Label>
      </g>}

      {stage >= 3 && <g>
        <Box x={8} y={240} w={100} h={32} label="popularity" seed={s('pop')} />
        <Arrow tone="blue" dashed pts={[[108, 256], [120, 256]]} seed={s('b1')} />
        <Pipe x={122} cy={256} w={60} ry={12} label="their kafka" seed={s('tk')} />
        <Arrow dashed pts={[[184, 256], [198, 256]]} seed={s('b2')} />
        <Worker x={200} y={240} w={112} h={32} label="workers" seed={s('wk')} />
        <Label muted x={256} y={290} size={13.5}>replace top_100</Label>
      </g>}

      <Actor x={22} y={ry - 20} s={0.8} seed={s('u')} />
      <Label x={22} y={ry + 36} size={13.5}>user</Label>
      {stage === 0 && <g>
        <Arrow tone="blue" pts={[[36, ry], [168, ry]]} seed={s('r0')} />
        <Box x={170} y={ry - 16} w={130} h={32} label="#sunset page" seed={s('page')} />
        <Label muted x={235} y={ry - 30} size={13.5}>count + top 100?</Label>
      </g>}
      {stage >= 1 && <g>
        {stage >= 3 ? <g>
          <Arrow tone="blue" pts={[[36, ry], [68, ry]]} seed={s('r1')} />
          <Cloud cx={110} cy={ry} w={80} h={40} label="cdn" seed={s('cdn')} />
          <Arrow pts={[[152, ry], [168, ry]]} seed={s('r2')} />
        </g> : <Arrow tone="blue" pts={[[36, ry], [168, ry]]} seed={s('r1')} />}
        <Box x={170} y={ry - 16} w={120} h={32} label="hashtag api" seed={s('api')} />
        <Arrow pts={[[290, ry], [322, ry], [322, 150], [90, 150], [72, 162]]} seed={s('r3')} />
      </g>}
      <Label kind="mono" muted x={165} y={ry + 56} size={13.5}>GET /hashtag/sunset</Label>
      {marked && <Label muted anchor="start" x={6} y={H - 8} size={13.5}>shaded: new since the last chapter</Label>}
    </Fig>
  );
}

export function SoFarPhotos({ stage, layout = 'desk' }: { stage: PhotosStage; layout?: Layout }) {
  return layout === 'phone' ? <PhotosPhone stage={stage} /> : <PhotosDesk stage={stage} />;
}

export function SoFarHashtag({ stage, layout = 'desk' }: { stage: HashtagStage; layout?: Layout }) {
  return layout === 'phone' ? <HashtagPhone stage={stage} /> : <HashtagDesk stage={stage} />;
}
