// Lecture 07 (lec09), chapter 4 "Storing the post": Fig 4·a (posts and the path it implies), the §4 rule sketch,
// Fig 4·b (image service and post service) and Fig 4·c (B loads A's profile, StepThrough). Specs: figures.md §4.
// Board: D-03 bottom-right, D-04 top + middle, D-05 (b_011325, b_011515).
import React from 'react';
import { Actor, Arrow, Box, Client, Cloud, Cyl, Fig, Label, Lifeline, Line, Num, Step, TimeAxis } from './kit';
import { Bucket, PhotoChip, PhotoTile, TableBlock, tableRowY } from './s4-parts';

type Layout = { layout?: 'wide' | 'phone' };

/* ---------------------------------------------------------------- Fig 4·a  posts, and the path it implies */

export function PostsAndPath({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-fig4a-p' : 'l09-fig4a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'posts, and the path it implies';
  const desc = 'The posts table keeps id, user_id, image_id and caption; the URL column is struck out because the S3 path, s3://insta-images/<user_id>/<image_id>.png, is built from user_id and image_id.';
  const rows = ['id', 'user_id', 'image_id', 'caption', 'url'];
  if (P) {
    const tx = 14, ty = 10;
    const gloss = ['from an id generator', 'author of the post', 'random id, from image svc', '', ''];
    const urlY = tableRowY(ty, 4);
    return (
      <Fig id={id} w={340} h={330} title={title} desc={desc}>
        <TableBlock x={tx} y={ty} w={312} name="posts" rows={rows} seed={s('t')} size={14} />
        {gloss.map((g, i) => g && <Label key={i} anchor="start" x={108} y={tableRowY(ty, i) + 5} size={14}>{g}</Label>)}
        <Line weight="heavy" pts={[[20, urlY], [60, urlY]]} seed={s('strike')} />
        <Label anchor="start" x={108} y={urlY + 5} size={14}>derivable: don’t store it</Label>
        <Label kind="mono" anchor="start" x={14} y={256} size={14}>s3://insta-images/</Label>
        <Label kind="mono" anchor="start" x={14} y={280} size={14}>&lt;user_id&gt;/&lt;image_id&gt;.png</Label>
        <Label anchor="start" x={14} y={312} size={14}>the S3 path, built from user_id and image_id</Label>
      </Fig>
    );
  }
  const tx = 60, ty = 20, tw = 170;
  const gx = tw + tx + 14;
  const ry = (i: number) => tableRowY(ty, i);
  const x0 = 300, xu = x0 + 156, xi = x0 + 250; // path segments
  const cu = xu + 38, ci = xi + 42;
  return (
    <Fig id={id} w={760} h={350} title={title} desc={desc}>
      <TableBlock x={tx} y={ty} w={tw} name="posts" rows={rows} seed={s('t')} />
      <Label anchor="start" x={gx} y={ry(0) + 5}>→ from an id generator</Label>
      <Label anchor="start" x={gx} y={ry(1) + 5}>→ author of the post</Label>
      <Label anchor="start" x={gx} y={ry(2) + 5}>→ random photo id from the image svc</Label>
      <Line weight="heavy" pts={[[tx + 6, ry(4)], [tx + 52, ry(4)]]} seed={s('strike')} />
      <Label anchor="start" x={gx} y={ry(4) + 5}>→ derivable: don’t store it</Label>

      <Label anchor="start" x={x0} y={262}>the photo’s S3 path can be computed:</Label>
      <Label kind="mono" anchor="start" x={x0} y={294}>s3://insta-images/</Label>
      <Label kind="mono" anchor="start" x={xu} y={294}>&lt;user_id&gt;</Label>
      <Label kind="mono" anchor="start" x={xu + 80} y={294}>/</Label>
      <Label kind="mono" anchor="start" x={xi} y={294}>&lt;image_id&gt;.png</Label>
      <Arrow weight="thin" pts={[[tx, ry(1)], [42, ry(1)], [42, 318], [cu, 318], [cu, 302]]} seed={s('cu')} />
      <Arrow weight="thin" pts={[[tx, ry(2)], [26, ry(2)], [26, 334], [ci, 334], [ci, 302]]} seed={s('ci')} />
    </Fig>
  );
}

/* ---------------------------------------------------------------- RuleBox §4 sketch: derivable, so not stored */

/* ---------------------------------------------------------------- Fig 4·b  image service and post service */

export function ImageAndPostServices({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-fig4b-p' : 'l09-fig4b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Image service and post service';
  const desc = 'A asks the image service to prepare an upload and gets back a signed URL and an image ID, uploads the photo straight to S3, then asks the post service to create the post with the image ID and caption; the post service writes the row and can check that the image ID belongs to A. Posts and media are linked only by that ID, so a video or reels service can be added without changing the post.';
  if (P) {
    const L = 34; // A's lane
    return (
      <Fig id={id} w={340} h={530} title={title} desc={desc}>
        <Actor x={L} y={22} s={0.9} seed={s('a')} />
        <Label x={L} y={90}>A</Label>
        <Lifeline x={L} y0={98} y1={420} seed={s('ll')} />

        <Box x={234} y={100} w={98} h={40} label="image svc" seed={s('img')} labelSize={14} />
        <Num x={52} y={98} n={1} tone="blue" size={14} />
        <Label tone="blue" anchor="start" x={66} y={103}>prepare upload</Label>
        <Arrow tone="blue" pts={[[L + 2, 114], [232, 114]]} seed={s('1a')} />
        <Arrow tone="green" pts={[[232, 130], [L + 4, 130]]} seed={s('1b')} />
        <Label tone="green" anchor="start" x={44} y={152} size={14}>signed URL + image_id</Label>
        <Box x={234} y={162} w={98} h={24} label="video svc" seed={s('g1')} faint labelSize={14} />
        <Box x={234} y={192} w={98} h={24} label="reels svc" seed={s('g2')} faint labelSize={14} />
        <Label muted anchor="end" x={330} y={236} size={14}>add later;</Label>
        <Label muted anchor="end" x={330} y={252} size={14}>the post doesn’t change</Label>

        <Bucket cx={262} cy={288} w={120} h={58} seed={s('s3')} />
        <Num x={52} y={264} n={2} tone="blue" size={14} />
        <Label tone="blue" anchor="start" x={66} y={269}>upload</Label>
        <Label kind="mono" tone="blue" anchor="start" x={120} y={269} size={14}>5 MB</Label>
        <Arrow tone="blue" pts={[[L + 2, 288], [200, 288]]} seed={s('2a')} />
        <PhotoChip x={150} y={288} seed={s('chip')} />

        <Line dashed pts={[[14, 350], [330, 350]]} seed={s('div')} />
        <Label anchor="end" x={330} y={342} size={14}>linked only by image_id</Label>

        <Box x={234} y={380} w={98} h={40} label="post svc" seed={s('post')} labelSize={14} />
        <Num x={52} y={366} n={3} tone="blue" size={14} />
        <Label kind="mono" tone="blue" anchor="start" x={66} y={371} size={14}>create post</Label>
        <Label kind="mono" tone="blue" anchor="start" x={66} y={387} size={14}>(image_id, caption)</Label>
        <Arrow tone="blue" pts={[[L + 2, 396], [232, 396]]} seed={s('3a')} />
        <Arrow tone="green" pts={[[232, 410], [L + 4, 410]]} seed={s('3b')} />
        <Arrow tone="blue" pts={[[278, 422], [278, 448]]} seed={s('3c')} />
        <Cyl cx={278} top={452} rx={28} ry={7} h={30} seed={s('db')} label="posts db" />
        <Label muted anchor="end" x={238} y={466} size={14}>checks image_id</Label>
        <Label muted anchor="end" x={238} y={482} size={14}>belongs to A</Label>
      </Fig>
    );
  }
  const ax = 90;
  return (
    <Fig id={id} w={760} h={310} title={title} desc={desc}>
      <Actor x={ax} y={150} seed={s('a')} />
      <Label x={ax} y={218}>A</Label>

      <Box x={330} y={52} w={140} h={44} label="image svc" seed={s('img')} />
      <Bucket cx={672} cy={74} w={130} h={74} seed={s('s3')} />
      <Box x={488} y={44} w={104} h={28} label="video svc" seed={s('g1')} faint labelSize={14} />
      <Box x={488} y={80} w={104} h={28} label="reels svc" seed={s('g2')} faint labelSize={14} />
      <Label muted x={540} y={132} size={14}>add later; the post doesn’t change</Label>

      {/* ① prepare upload */}
      <Arrow tone="blue" pts={[[106, 146], [170, 146], [170, 66], [328, 66]]} seed={s('1a')} />
      <Num x={186} y={52} n={1} tone="blue" size={14} />
      <Label tone="blue" anchor="start" x={200} y={57}>prepare upload</Label>
      <Arrow tone="green" pts={[[328, 84], [186, 84], [186, 156], [108, 156]]} seed={s('1b')} />
      <Label tone="green" anchor="start" x={198} y={106} size={14}>signed URL</Label>
      <Label tone="green" anchor="start" x={198} y={122} size={14}>+ image_id</Label>

      {/* ② upload, straight to S3 */}
      <Arrow tone="blue" pts={[[ax, 140], [ax, 30], [672, 30], [672, 40]]} seed={s('2a')} />
      <Num x={186} y={16} n={2} tone="blue" size={14} />
      <Label tone="blue" anchor="start" x={200} y={21}>upload</Label>
      <PhotoChip x={270} y={30} seed={s('chip')} />
      <Label kind="mono" tone="blue" anchor="start" x={284} y={21} size={14}>5 MB</Label>

      <Line dashed pts={[[240, 172], [740, 172]]} seed={s('div')} />
      <Label anchor="end" x={740} y={164} size={14}>linked only by image_id</Label>

      {/* ③ create the post */}
      <Box x={330} y={222} w={140} h={44} label="post svc" seed={s('post')} />
      <Cyl cx={672} top={226} rx={32} ry={8} h={34} seed={s('db')} label="posts db" />
      <Arrow tone="blue" pts={[[106, 172], [170, 172], [170, 236], [328, 236]]} seed={s('3a')} />
      <Num x={216} y={202} n={3} tone="blue" size={14} />
      <Label kind="mono" tone="blue" anchor="start" x={230} y={207} size={14}>create post (image_id, caption)</Label>
      <Arrow tone="green" pts={[[328, 254], [186, 254], [186, 180], [108, 180]]} seed={s('3b')} />
      <Arrow tone="blue" pts={[[472, 244], [638, 244]]} seed={s('3c')} />
      <Label muted x={400} y={292} size={14}>checks image_id belongs to A</Label>
    </Fig>
  );
}

/* ---------------------------------------------------------------- Fig 4·c  B loads A's profile (StepThrough) */

export function ProfileLoad({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-fig4c-p' : 'l09-fig4c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const [APP, POST, DB, CDN, S3] = P ? [74, 136, 196, 256, 314] : [82, 160, 236, 310, 384];
  const NX = P ? 28 : 38;      // step numerals on the time axis
  const LX = P ? 42 : 54;      // left edge for long labels
  const T = 14;
  const NS = 14;
  const mid = (a: number, b: number) => (a + b) / 2;
  return (
    <Fig id={id} w={W} h={690} title="B loads A's profile"
      desc="Swim lanes for B's app, the post service, the posts database, the CDN at instacdn.net and S3; time runs down. 1: the app asks GET /users/A/posts. 2: the post service reads A's rows, which hold image IDs and captions but no URLs. 3: for each row it builds the CDN URL from the CDN prefix, the user ID and the image ID, and returns it in the JSON. 4: the app puts the URL in an image tag, which GETs it from the CDN. 5: first view, a miss: the CDN reads the photo from S3, caches it and returns it. 6: the next viewer gets a hit and S3 is not touched.">
      {/* lane heads */}
      <Client x={APP - (P ? 18 : 22)} y={24} w={P ? 36 : 44} h={P ? 28 : 34} seed={s('app')} />
      <Box x={POST - (P ? 22 : 30)} y={28} w={P ? 44 : 60} h={28} seed={s('post')} />
      <Cyl cx={DB} top={28} rx={P ? 14 : 18} ry={5} h={24} seed={s('db')} />
      <Cloud cx={CDN} cy={42} w={P ? 52 : 64} h={P ? 34 : 40} seed={s('cdn')} />
      <Bucket cx={S3} cy={42} w={P ? 52 : 64} h={P ? 36 : 42} seed={s('s3')} size={14} />
      {P ? <Label kind="mono" x={APP} y={88} size={T}>app</Label> : <Label x={APP} y={88}>B’s app</Label>}
      <Label kind="mono" x={POST} y={88} size={T}>{P ? 'post' : 'post svc'}</Label>
      <Label kind="mono" x={DB} y={88} size={T}>{P ? 'db' : 'posts db'}</Label>
      <Label kind="mono" x={CDN} y={88} size={T}>cdn</Label>
      <Label kind="mono" muted x={CDN} y={106} size={14}>instacdn.net</Label>
      {[APP, POST, DB, CDN, S3].map((x, i) => <Lifeline key={i} x={x} y0={114} y1={672} seed={s('l' + i)} />)}
      <TimeAxis x={P ? 2 : 6} y0={122} y1={668} seed={s('t')} size={14} />

      <Step n={1}>
        <Num x={NX} y={142} n={1} tone="blue" size={NS} />
        <Label kind="mono" tone="blue" anchor="start" x={LX} y={138} size={T}>GET /users/A/posts</Label>
        <Arrow tone="blue" pts={[[APP, 146], [POST - 2, 158]]} seed={s('1')} />
      </Step>
      <Step n={2}>
        <Num x={NX} y={190} n={2} tone="blue" size={NS} />
        <Label kind="mono" tone="blue" x={mid(POST, DB)} y={184} size={T}>WHERE user_id = A</Label>
        <Arrow tone="blue" pts={[[POST, 192], [DB - 2, 204]]} seed={s('2a')} />
        <Arrow tone="green" pts={[[DB, 214], [POST + 2, 226]]} seed={s('2b')} />
        <Label kind="mono" tone="green" x={mid(POST, DB)} y={246} size={T}>(id, A, 12345, caption)</Label>
      </Step>
      <Step n={3}>
        <Num x={NX} y={288} n={3} tone="green" size={NS} />
        <Box x={P ? 44 : 104} y={264} w={P ? 290 : 300} h={56} seed={s('card')} />
        <Label kind="mono" anchor="start" x={P ? 54 : 114} y={286} size={T}>url = "https://instacdn.net/"</Label>
        <Label kind="mono" anchor="start" x={P ? 86 : 146} y={308} size={T}>+ A + "/" + 12345 + ".png"</Label>
        {P ? (
          <>
            <Label muted x={189} y={338} size={T}>built per request,</Label>
            <Label muted x={189} y={354} size={T}>maybe per CDN experiment</Label>
          </>
        ) : <Label muted x={254} y={340} size={T}>built per request, maybe per CDN experiment</Label>}
        <Arrow tone="green" pts={[[POST, 366], [APP + 2, 378]]} seed={s('3')} />
        <Label kind="mono" tone="green" anchor="start" x={LX} y={398} size={T}>[{'{'} id, user_id, caption, url {'}'}]</Label>
      </Step>
      <Step n={4}>
        <Num x={NX} y={436} n={4} tone="blue" size={NS} />
        <Box x={APP - 14} y={416} w={28} h={50} seed={s('phone')} />
        <Line pts={[[APP - 6, 422], [APP + 6, 422]]} weight="thin" seed={s('spk')} />
        <PhotoTile x={APP - 9} y={430} w={18} h={18} seed={s('tile')} />
        <Label kind="mono" x={APP + (P ? 10 : 0)} y={486} size={T}>&lt;img src=…&gt;</Label>
        <Label kind="mono" tone="blue" x={mid(APP, CDN) + 10} y={432} size={T}>GET /A/12345.png</Label>
        <Arrow tone="blue" pts={[[APP + 16, 438], [CDN - 2, 450]]} seed={s('4')} />
      </Step>
      <Step n={5}>
        <Num x={NX} y={514} n={5} size={NS} />
        <Label x={mid(CDN, S3)} y={506} size={T}>miss</Label>
        <Arrow pts={[[CDN, 512], [S3 - 2, 524]]} seed={s('5a')} />
        <Arrow tone="green" pts={[[S3, 534], [CDN + 2, 546]]} seed={s('5b')} />
        <PhotoChip x={mid(CDN, S3) + 4} y={552} seed={s('5c')} tone="green" />
        <Box x={CDN + 6} y={562} w={P ? 44 : 50} h={22} seed={s('slot')} />
        <PhotoChip x={CDN + (P ? 28 : 31)} y={573} seed={s('5d')} tone="ink" />
        <Label x={CDN + (P ? 22 : 31)} y={600} size={T}>cached copy</Label>
        <Arrow tone="green" pts={[[CDN, 566], [APP + 2, 578]]} seed={s('5e')} />
        <PhotoChip x={mid(APP, CDN)} y={584} seed={s('5f')} tone="green" />
      </Step>
      <Step n={6}>
        <Num x={NX} y={622} n={6} tone="green" size={NS} />
        <Label muted x={APP + (P ? 8 : 0)} y={614} size={T}>next viewer</Label>
        <Arrow tone="blue" pts={[[APP, 622], [CDN - 2, 632]]} seed={s('6a')} />
        <Arrow tone="green" pts={[[CDN, 642], [APP + 2, 652]]} seed={s('6b')} />
        <Label tone="green" anchor="end" x={W - 4} y={668} size={T}>hit: S3 isn’t touched</Label>
      </Step>
    </Fig>
  );
}
