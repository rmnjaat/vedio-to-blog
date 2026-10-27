// Lecture 07 (lec09), chapter 5 "Who can see a private photo?": Fig 5·a (the incognito test), Fig 5·b (one signed
// URL) and the §5 rule sketch. Specs: figures.md §5. Screen share S39–S40 (b_012145, b_012230, b_012300) and the notes
// page "3. Privacy" (b_012057); no account content is drawn.
import React from 'react';
import { Actor, Arrow, Box, Bubble, Fig, Label, Line } from './kit';
import { KeyTag, Lock, PhotoTile, Window } from './s4-parts';

type Layout = { layout?: 'wide' | 'phone' };

/* ---------------------------------------------------------------- Fig 5·a  the incognito test */

function Tick({ x, y, seed }: { x: number; y: number; seed: string }) {
  return <Line tone="green" weight="heavy" pts={[[x, y], [x + 10, y + 12], [x + 32, y - 20]]} seed={seed} />;
}

export function IncognitoTest({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-fig5a-p' : 'l09-fig5a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The incognito test';
  const desc = 'Panel a: a follower sees a private profile’s photo grid and copies one photo’s image URL from the inspector: an fbcdn.net address with oh and oe parameters. Panel b: someone who does not follow the account opens that URL in a private window and the photo loads. The private setting hides the list of photos, not the photos.';
  const url = '…fbcdn.net/…_n.jpg?…&oh=…&oe=…';
  if (P) {
    return (
      <Fig id={id} w={340} h={596} title={title} desc={desc}>
        <Bubble x={30} y={4} w={300} h={34} tail={[44, 70]} lines={['private hides the list, not the photos']} seed={s('bub')} size={14} />
        <Window x={16} y={50} w={308} h={150} url="instagram.com/…" seed={s('wa')} />
        <Lock x={36} y={86} seed={s('lock')} />
        <Label anchor="start" x={56} y={95} size={14}>private account</Label>
        <PhotoTile x={190} y={80} w={50} h={46} seed={s('t1')} />
        <PhotoTile x={248} y={80} w={50} h={46} seed={s('t2')} />
        <PhotoTile x={190} y={134} w={50} h={46} seed={s('t3')} />
        <PhotoTile x={248} y={134} w={50} h={46} seed={s('t4')} />
        <Box x={16} y={210} w={308} h={50} seed={s('insp')} />
        <Label kind="mono" anchor="start" x={26} y={231} size={14}>&lt;img src="https://…fbcdn.net/</Label>
        <Label kind="mono" anchor="start" x={26} y={250} size={14}>…_n.jpg?…&amp;oh=…&amp;oe=…"&gt;</Label>
        <Label kind="title" x={170} y={286} size={15}>a · a follower’s view</Label>

        <Actor x={40} y={312} seed={s('f')} />
        <Label x={40} y={380} size={14}>follower</Label>
        <Arrow dashed pts={[[62, 334], [276, 334]]} seed={s('copy')} />
        <KeyTag x={92} y={322} w={110} text="…?oh=…&oe=…" seed={s('tag')} />
        <Label x={160} y={366} size={14}>copy the URL, send it</Label>
        <Actor x={300} y={312} seed={s('nf')} />
        <Label anchor="end" x={336} y={380} size={14}>not a follower</Label>

        <Window x={16} y={398} w={308} h={160} url={url} seed={s('wb')} dashed />
        <PhotoTile x={100} y={432} w={120} h={96} seed={s('big')} />
        <Tick x={238} y={494} seed={s('tick')} />
        <Label tone="green" x={262} y={530} size={14}>loads</Label>
        <Label kind="title" x={170} y={584} size={15}>b · a private window</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={800} h={344} title={title} desc={desc}>
      <Bubble x={40} y={38} w={300} h={34} tail={[52, 112]} lines={['private hides the list, not the photos']} seed={s('bub')} size={14} />
      <Window x={30} y={92} w={280} h={150} url="instagram.com/…" seed={s('wa')} />
      <Lock x={46} y={128} seed={s('lock')} />
      <Label anchor="start" x={66} y={137}>private account</Label>
      <PhotoTile x={190} y={122} w={50} h={46} seed={s('t1')} />
      <PhotoTile x={248} y={122} w={50} h={46} seed={s('t2')} />
      <PhotoTile x={190} y={176} w={50} h={46} seed={s('t3')} />
      <PhotoTile x={248} y={176} w={50} h={46} seed={s('t4')} />
      <Box x={30} y={252} w={280} h={50} seed={s('insp')} />
      <Label kind="mono" anchor="start" x={40} y={273} size={14}>&lt;img src="https://…fbcdn.net/</Label>
      <Label kind="mono" anchor="start" x={40} y={292} size={14}>…_n.jpg?…&amp;oh=…&amp;oe=…"&gt;</Label>
      <Actor x={355} y={140} seed={s('f')} />
      <Label x={355} y={210}>follower</Label>
      <Label kind="title" x={190} y={334}>a · a follower’s view</Label>

      <Arrow dashed pts={[[355, 130], [355, 22], [762, 22], [762, 128]]} seed={s('copy')} />
      <KeyTag x={492} y={10} w={112} text="…?oh=…&oe=…" seed={s('tag')} />
      <Label x={560} y={56}>copy the URL, send it</Label>

      <Window x={436} y={92} w={284} h={160} url={url} seed={s('wb')} dashed />
      <PhotoTile x={506} y={130} w={120} h={96} seed={s('big')} />
      <Tick x={644} y={194} seed={s('tick')} />
      <Label tone="green" x={670} y={232}>loads</Label>
      <Actor x={762} y={140} seed={s('nf')} />
      <Label x={762} y={210}>not a</Label>
      <Label x={762} y={228}>follower</Label>
      <Label kind="title" x={578} y={334}>b · a private window</Label>
    </Fig>
  );
}

/* ---------------------------------------------------------------- Fig 5·b  one signed URL */

const SEGS = [
  { t: 'https://instacdn.net', l: ['cdn domain'] },
  { t: '/ul/', l: ['cdn path'] },
  { t: '1729_4275.jpg', l: ['image name (random id)', 'image name', '(random id)'] },
  { t: '?ig_cache_key=…', l: ['instagram’s cache key', 'instagram’s', 'cache key'] },
  { t: '&oh=…', l: ['hash (the signature)', 'hash', '(the signature)'] },
  { t: '&oe=…', l: ['expiry', 'expiry', ''] },
  { t: '&nc_sid=…', l: ['the CDN’s own'] },
];

export function SignedUrl({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-fig5b-p' : 'l09-fig5b';
  const s = (k: string) => `${id}-${k}`;
  const title = 'One signed URL';
  const desc = 'An Instagram photo URL is a CDN host, a CDN path, an image name with the random ID, and query parameters: Instagram’s cache key, oh, a hash that works as the signature, oe, the expiry, and the CDN’s own parameters. oh and oe are signed together, so changing one makes the check fail. The real host in the demo was Facebook’s CDN, instagram.fblr22-1.fna.fbcdn.net.';
  if (P) {
    const CW = 8.6, rowH = 46, y0 = 12;
    return (
      <Fig id={id} w={340} h={470} title={title} desc={desc}>
        {SEGS.map((g, i) => {
          const y = y0 + i * rowH;
          const lines = g.l.length > 1 ? g.l.slice(1) : g.l;
          return (
            <g key={i}>
              <Box x={10} y={y} w={g.t.length * CW + 20} h={30} seed={s('b' + i)} />
              <Label kind="mono" anchor="start" x={20} y={y + 20} size={14}>{g.t}</Label>
              {lines.map((ln, j) => (
                <Label key={j} anchor="start" x={214} y={y + (lines.length > 1 ? 12 + j * 16 : 20)} size={14}>{ln}</Label>
              ))}
            </g>
          );
        })}
        <Line pts={[[198, y0 + 4 * rowH + 4], [204, y0 + 4 * rowH + 4], [204, y0 + 5 * rowH + 26], [198, y0 + 5 * rowH + 26]]} seed={s('sig')} />
        <Label anchor="start" x={10} y={350} size={14}>oh + oe are signed together:</Label>
        <Label anchor="start" x={10} y={367} size={14}>change one and the check fails</Label>
        <Line dotted pts={[[10, 392], [330, 392]]} seed={s('sep')} />
        <Label kind="mono" anchor="start" x={10} y={420} size={14}>instagram.fblr22-1.fna.fbcdn.net</Label>
        <Label muted anchor="start" x={10} y={444} size={14}>the real host: Facebook’s CDN</Label>
      </Fig>
    );
  }
  const CW = 8.6, pad = 8, gap = 4;
  let x = 24;
  const box = SEGS.map((g) => { const w = g.t.length * CW + pad * 2; const b = { x, w, c: x + w / 2 }; x += w + gap; return b; });
  const by = 56, bh = 30;
  const rowY = { A: 124, B: 150, C: 176 } as const;
  const place: { row: keyof typeof rowY; anchor: 'middle' | 'start' | 'end'; dx: number }[] = [
    { row: 'A', anchor: 'middle', dx: 0 }, { row: 'B', anchor: 'middle', dx: 0 }, { row: 'A', anchor: 'middle', dx: 0 },
    { row: 'B', anchor: 'middle', dx: 0 }, { row: 'C', anchor: 'end', dx: 24 }, { row: 'C', anchor: 'start', dx: -10 },
    { row: 'A', anchor: 'middle', dx: 0 },
  ];
  const b5 = box[4], b6 = box[5];
  return (
    <Fig id={id} w={800} h={226} title={title} desc={desc}>
      <Line pts={[[b5.x + 4, 48], [b5.x + 4, 42], [b6.x + b6.w - 4, 42], [b6.x + b6.w - 4, 48]]} seed={s('top')} />
      <Label x={(b5.x + b6.x + b6.w) / 2} y={32}>signed: change one and the check fails</Label>
      {SEGS.map((g, i) => {
        const b = box[i], p = place[i];
        const ly = rowY[p.row];
        return (
          <g key={i}>
            <Box x={b.x} y={by} w={b.w} h={bh} seed={s('b' + i)} />
            <Label kind="mono" x={b.c} y={by + 20}>{g.t}</Label>
            <Line pts={[[b.x + 4, by + bh + 6], [b.x + 4, by + bh + 12], [b.x + b.w - 4, by + bh + 12], [b.x + b.w - 4, by + bh + 6]]} weight="thin" seed={s('br' + i)} />
            {p.row !== 'A' && <Line pts={[[b.c, by + bh + 12], [b.c, ly - 14]]} weight="thin" seed={s('ld' + i)} />}
            <Label anchor={p.anchor} x={b.c + p.dx} y={ly}>{g.l[0]}</Label>
          </g>
        );
      })}
      <Line dotted pts={[[24, 192], [776, 192]]} seed={s('sep')} />
      <Label kind="mono" anchor="start" x={24} y={214} size={14}>instagram.fblr22-1.fna.fbcdn.net</Label>
      <Label muted anchor="start" x={318} y={214}>← the real host: Facebook’s CDN</Label>
    </Fig>
  );
}

/* ---------------------------------------------------------------- RuleBox §5 sketch: privacy lives in the API */

