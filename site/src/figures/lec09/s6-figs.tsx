// Lecture 07 (lec09), §6 Extend and optimize: Fig 6·a (one post, many consumers: D-04 bottom redrawn), the §6 RuleBox
// sketch (reuse what exists), Fig 6·b (`?w=360` through the CDN; StepThrough) and Fig 6·c (Instagram photos, end to
// end: the recap, each box tagged with the chapter that covers it; phone = a vertical list).
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cyl, Fig, Label, Lifeline, Num, Pipe, Step, Worker } from './kit';
import { ellipse } from '../kit/hand';
import { arcPts, Bucket, ChTag, PhoneScreen, PhotoChip } from './s3a-parts';

/* ------------------------------------------------------------------ Fig 6·a */

const F6A_TITLE = 'One post, many consumers';
const F6A_DESC =
  'The post service writes the post to MySQL and drops one “post published” event on a Kafka topic keyed by user_id. Search, notification, analytics and feed each pull the event at their own pace.';

export function PostConsumers({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const s = (k: string) => `fig6a${layout === 'phone' ? '-p' : ''}-${k}`;
  if (layout === 'phone') {
    const work = [
      { x: 20, y: 236, l: 'search' }, { x: 180, y: 236, l: 'feed' },
      { x: 20, y: 290, l: 'notification' }, { x: 180, y: 290, l: 'analytics' },
    ];
    return (
      <Fig id="fig6a-p" w={340} h={360} title={F6A_TITLE} desc={F6A_DESC}>
        <Box x={20} y={24} w={110} h={40} label="post svc" seed={s('post')} />
        <Arrow pts={[[130, 44], [238, 44]]} seed={s('write')} />
        <Cyl cx={270} top={24} rx={28} ry={7} h={36} label="mysql" seed={s('db')} />
        <Arrow tone="blue" dashed pts={[[75, 64], [75, 154]]} seed={s('pub')} />
        <Label tone="blue" anchor="start" x={84} y={104} size={14}>post published</Label>
        <Label kind="mono" x={172} y={146} size={13}>kafka · key: user_id</Label>
        <Pipe x={36} cy={170} w={254} ry={14} seed={s('kafka')} />
        {work.map((w, i) => <Worker key={i} x={w.x} y={w.y} w={140} h={34} label={w.l} seed={s(`w${i}`)} />)}
        {/* every consumer pulls: the top two straight up, the bottom two around the outside */}
        <Arrow dashed pts={[[90, 234], [90, 186]]} seed={s('p0')} />
        <Arrow dashed pts={[[250, 234], [250, 186]]} seed={s('p1')} />
        <Arrow dashed pts={[[20, 307], [10, 307], [10, 170], [28, 170]]} seed={s('p2')} />
        <Arrow dashed pts={[[320, 307], [332, 307], [332, 170], [298, 170]]} seed={s('p3')} />
        <Label anchor="start" x={98} y={222} size={13}>pulls</Label>
        <Label x={170} y={348} size={14}>each at its own pace</Label>
      </Fig>
    );
  }
  const WX = [186, 322, 458, 594];
  const labels = ['search', 'notification', 'analytics', 'feed'];
  return (
    <Fig id="fig6a" w={820} h={344} title={F6A_TITLE} desc={F6A_DESC}>
      <Box x={60} y={40} w={130} h={44} label="post svc" seed={s('post')} />
      <Label muted x={327} y={54} size={14}>write the post</Label>
      <Arrow pts={[[190, 62], [464, 62]]} seed={s('write')} />
      <Cyl cx={500} top={40} rx={34} ry={8} h={42} label="mysql" seed={s('db')} />
      <Arrow tone="blue" dashed pts={[[125, 84], [125, 196], [190, 196]]} seed={s('pub')} />
      <Label tone="blue" anchor="start" x={134} y={150} size={14}>post published</Label>
      <Pipe x={200} cy={196} w={446} ry={16} seed={s('kafka')} />
      {/* the key is the topic's, so it sits with the kafka label, not between two consumers' pulls (critic C-11) */}
      <Label kind="mono" anchor="start" x={214} y={172} size={14}>kafka · key: user_id</Label>
      {WX.map((x, i) => (
        <g key={i}>
          <Worker x={x} y={268} w={130} h={36} label={labels[i]} seed={s(`w${i}`)} size={13} />
          <Arrow dashed pts={[[x + 40, 266], [x + 40, 214]]} seed={s(`p${i}`)} />
        </g>
      ))}
      <Label anchor="start" x={234} y={250} size={14}>pulls</Label>
      <Label x={440} y={334} size={14}>each at its own pace</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox §6 sketch */

const R6_TITLE = 'Reuse what exists';
const R6_DESC = 'A request with ?w=360 goes into the CDN, and a small resized photo comes out next to the ghost of the large original: the CDN already does the resizing, for a little money.';

/* ------------------------------------------------------------------ Fig 6·b */

const F6B_TITLE = '?w=360 through the CDN';
const F6B_DESC =
  'Lanes for the app, the CDN and S3, time running down; the CDN looks in its cache for the resized copy, then the original. 1: the app, whose screen is 360 px wide, requests from the CDN the photo URL the backend signed with w=360 in it. 2: the CDN looks for the resized copy: none. 3: it looks for the original: none. 4: it fetches the original from S3. 5: it resizes on the CDN server, caches the resized copy and sends it. 6: the next request for the same width is a hit on the resized copy.';

export function ResizeSteps({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig6b-p' : 'fig6b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const L = P ? { app: 46, cdn: 182, s3: 300 } : { app: 60, cdn: 222, s3: 366 };
  const H = 470;
  const NX = P ? 14 : 18;
  const M = 12.5;
  const slot = { x: L.cdn - (P ? 74 : 98), w: P ? 148 : 196, h: 24 };
  const S1 = 36, S2 = 72; // slot tops: resized copy, original
  const ring = (y: number, k: string) => (
    <path className="ink thin" d={ellipse(L.cdn, y + slot.h / 2, slot.w / 2 + 8, slot.h / 2 + 4, s(k))} />
  );
  return (
    <Fig id={id} w={W} h={H} title={F6B_TITLE} desc={F6B_DESC}>
      <Label kind="mono" x={L.app} y={22} size={13}>app</Label>
      <PhoneScreen x={L.app - 13} y={34} w={26} h={46} seed={s('phone')} />
      <Label x={L.app} y={98} size={13}>360 px</Label>
      <Label kind="mono" x={L.cdn} y={22} size={13}>cdn</Label>
      <Label kind="mono" x={L.s3} y={22} size={13}>s3</Label>
      <Box x={slot.x} y={S1} w={slot.w} h={slot.h} seed={s('slot1')} />
      <Label kind="mono" anchor="start" x={slot.x + 8} y={S1 + 16} size={M}>{P ? '?w=360' : '1729_4275.jpg?w=360'}</Label>
      <Box x={slot.x} y={S2} w={slot.w} h={slot.h} seed={s('slot2')} />
      <Label kind="mono" anchor="start" x={slot.x + 8} y={S2 + 16} size={M}>{P ? 'original' : '1729_4275.jpg'}</Label>
      {[L.app, L.cdn, L.s3].map((x, i) => <Lifeline key={i} x={x} y0={112} y1={H - 10} seed={s(`l${i}`)} />)}

      <Step n={1}>
        <Label kind="mono" tone="blue" x={(L.app + L.cdn) / 2} y={134} size={M}>…/1729_4275.jpg?w=360</Label>
        <Arrow tone="blue" pts={[[L.app + 2, 142], [L.cdn - 2, 142]]} seed={s('1')} />
        <Label anchor="start" x={L.app + 8} y={162} size={13}>w=360 in the URL</Label>
        <Num x={NX} y={142} n={1} tone="blue" />
      </Step>
      <Step n={2}>
        {ring(S1, 'r1')}
        <Label anchor="start" x={L.cdn + 8} y={196} size={13}>resized copy? none</Label>
        <Num x={NX} y={192} n={2} />
      </Step>
      <Step n={3}>
        {ring(S2, 'r2')}
        <Label anchor="start" x={L.cdn + 8} y={228} size={13}>original? none</Label>
        <Num x={NX} y={224} n={3} />
      </Step>
      <Step n={4}>
        <Label x={(L.cdn + L.s3) / 2} y={256} size={13}>fetch original</Label>
        <Arrow pts={[[L.cdn + 2, 264], [L.s3 - 2, 264]]} seed={s('4')} />
        <PhotoChip x={(L.cdn + L.s3) / 2 - 11} y={272} w={22} h={15} tone="green" seed={s('4c')} />
        <Arrow tone="green" pts={[[L.s3 - 2, 294], [L.cdn + 2, 294]]} seed={s('4r')} />
        {/* the original is not cached: only the resized copy fills a slot, at step 5 */}
        <Num x={NX} y={264} n={4} />
      </Step>
      <Step n={5}>
        <PhotoChip x={L.cdn - 34} y={318} w={22} h={15} tone="ink" seed={s('5big')} />
        <Arrow pts={[[L.cdn - 8, 326], [L.cdn + 14, 326]]} seed={s('5rs')} />
        <PhotoChip x={L.cdn + 18} y={322} w={10} h={8} tone="green" seed={s('5small')} />
        <Label anchor="start" x={L.cdn + 36} y={331} size={13}>resize on the CDN</Label>
        <PhotoChip x={slot.x + slot.w - 24} y={S1 + 8} w={10} h={8} tone="green" seed={s('5slot')} />
        <PhotoChip x={(L.app + L.cdn) / 2 - 5} y={350} w={10} h={8} tone="green" seed={s('5c')} />
        <Arrow tone="green" pts={[[L.cdn - 2, 364], [L.app + 2, 364]]} seed={s('5r')} />
        <Num x={NX} y={330} n={5} tone="green" />
      </Step>
      <Step n={6}>
        <Arrow tone="blue" pts={[[L.app + 2, 404], [L.cdn - 2, 404]]} seed={s('6')} />
        <Label tone="green" x={(L.app + L.cdn) / 2} y={420} size={13}>hit: the resized copy</Label>
        <Arrow tone="green" pts={[[L.cdn - 2, 430], [L.app + 2, 430]]} seed={s('6r')} />
        <Num x={NX} y={416} n={6} tone="green" />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·c */

const F6C_TITLE = 'Instagram photos, end to end';
const F6C_DESC =
  'The upload service on one page. A asks the image service to prepare an upload, sends the photo straight to S3 with the signed URL, and posts through the post service, which stores ids in the posts database and drops an event on Kafka for search, feed and other consumers. B asks the post service for A’s posts, gets CDN URLs, and fetches the photos from the CDN, which pulls from the private bucket. Each box is tagged with the chapter that covers it.';

export function PhotosEndToEnd({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <PhotosEndToEndList />;
  const s = (k: string) => `fig6c-${k}`;
  const Z = 15; // labels: the figure is 880 wide, so they stay >= 12 px down to ~700 px
  return (
    <Fig id="fig6c" w={880} h={446} title={F6C_TITLE} desc={F6C_DESC}>
      {/* A, the uploader */}
      <Actor x={50} y={84} seed={s('A')} />
      <Label x={50} y={152} size={Z}>A</Label>
      <Arrow tone="blue" pts={[[68, 106], [148, 106]]} seed={s('prep')} />
      <Label anchor="start" x={74} y={98} size={14}>prepare</Label>
      <Box x={150} y={84} w={130} h={44} label="image svc" seed={s('img')} labelSize={Z} />
      <ChTag x={215} y={146} no="2" size={Z} />
      {/* the upload arc, over the image service, with the bytes */}
      <Arrow tone="blue" pts={arcPts([56, 64], [386, 92], -22)} seed={s('arc')} />
      <PhotoChip x={214} y={36} seed={s('chip')} />
      <Label kind="mono" tone="blue" anchor="start" x={234} y={46} size={14}>upload, signed URL</Label>
      <Bucket cx={440} cy={104} w={104} h={62} seed={s('s3')} size={Z} lock />
      <ChTag x={440} y={158} no="2" size={Z} />
      {/* B, the viewer, and the CDN */}
      <Cloud cx={650} cy={104} w={116} h={64} label="cdn" seed={s('cdn')} size={Z} />
      <ChTag x={624} y={58} no="1" size={Z} />
      <ChTag x={650} y={58} no="4" size={Z} />
      <ChTag x={684} y={58} no="5.1" size={Z} />
      <Arrow pts={[[592, 104], [494, 104]]} seed={s('pull')} />
      <Label muted x={543} y={96} size={14}>pulls</Label>
      <Actor x={830} y={84} seed={s('B')} />
      <Label x={830} y={152} size={Z}>B</Label>
      <Arrow tone="blue" pts={[[812, 106], [710, 106]]} seed={s('getimg')} />
      <Label kind="mono" anchor="middle" x={761} y={98} size={14}>GET photo</Label>
      {/* posting, and B reading A's posts */}
      <Arrow tone="blue" pts={[[50, 160], [50, 264], [148, 264]]} seed={s('post')} />
      <Label anchor="start" x={60} y={256} size={14}>post</Label>
      <Box x={150} y={242} w={130} h={44} label="post svc" seed={s('postsvc')} labelSize={Z} />
      <ChTag x={300} y={240} no="3" anchor="start" size={Z} />
      <Arrow pts={[[280, 264], [396, 264]]} seed={s('write')} />
      <Cyl cx={440} top={244} rx={40} ry={9} h={40} label="posts db" seed={s('db')} />
      <ChTag x={496} y={312} no="3" anchor="start" size={Z} />
      <Arrow tone="blue" pts={[[830, 160], [830, 212], [250, 212], [250, 240]]} seed={s('getposts')} />
      <Label kind="mono" anchor="middle" x={600} y={204} size={14}>GET /users/A/posts</Label>
      <ChTag x={712} y={204} no="3.4" anchor="start" size={Z} />
      {/* extensibility */}
      <Arrow tone="blue" dashed pts={[[200, 286], [200, 342]]} seed={s('event')} />
      <Pipe x={140} cy={356} w={300} ry={14} seed={s('kafka')} />
      <Label kind="mono" anchor="end" x={128} y={361} size={Z}>kafka</Label>
      <ChTag x={456} y={361} no="5.2" anchor="start" size={Z} />
      {['search', 'feed', '…'].map((l, i) => (
        <g key={i}>
          <Worker x={160 + i * 104} y={398} w={92} h={34} label={l} seed={s(`w${i}`)} size={Z} />
          <Arrow dashed pts={[[200 + i * 104, 396], [200 + i * 104, 374]]} seed={s(`pk${i}`)} />
        </g>
      ))}
      <Label muted anchor="start" x={480} y={420} size={14}>consumers pull</Label>
      <Label x={700} y={370} size={Z}>boxes are the easy part;</Label>
      <Label x={700} y={390} size={Z}>the details at each step are the work</Label>
    </Fig>
  );
}

function PhotosEndToEndList() {
  const rows: { no: string; name: string; line: string; glyph: (y: number) => React.ReactNode }[] = [
    { no: '2', name: 'image svc', line: 'signs an upload URL', glyph: (y) => <Box x={10} y={y - 14} w={50} h={28} seed="fig6c-p-g1" /> },
    { no: '2', name: 's3', line: 'holds the bytes, private', glyph: (y) => <Bucket cx={35} cy={y} w={54} h={34} seed="fig6c-p-g2" label="" lock /> },
    { no: '1', name: 'cdn', line: 'serves, checks signatures, resizes', glyph: (y) => <Cloud cx={35} cy={y} w={54} h={32} seed="fig6c-p-g3" /> },
    { no: '3', name: 'post svc', line: 'stores ids, builds URLs', glyph: (y) => <Box x={10} y={y - 14} w={50} h={28} seed="fig6c-p-g4" /> },
    { no: '3.4', name: 'B reads A', line: 'GET /users/A/posts, then the photos', glyph: (y) => <Actor x={35} y={y - 18} s={0.8} seed="fig6c-p-g5" /> },
    { no: '5.2', name: 'kafka', line: 'tells everyone', glyph: (y) => <Pipe x={12} cy={y} w={46} ry={11} seed="fig6c-p-g6" /> },
  ];
  const RH = 54, Y0 = 30;
  return (
    <Fig id="fig6c-p" w={340} h={Y0 + rows.length * RH + 36} title={F6C_TITLE} desc={F6C_DESC}>
      {rows.map((r, i) => {
        const y = Y0 + i * RH;
        return (
          <g key={r.name}>
            {r.glyph(y)}
            <ChTag x={76} y={y - 4} no={r.no} anchor="start" size={14} />
            <Label kind="mono" anchor="start" x={122} y={y - 4} size={14}>{r.name}</Label>
            <Label muted anchor="start" x={76} y={y + 15} size={13}>{r.line}</Label>
          </g>
        );
      })}
      <Label x={170} y={Y0 + rows.length * RH + 10} size={13}>boxes are the easy part;</Label>
      <Label x={170} y={Y0 + rows.length * RH + 28} size={13}>the details at each step are the work</Label>
    </Fig>
  );
}
