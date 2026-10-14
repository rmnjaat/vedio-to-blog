// Lecture 07 (lec09), §11 What to keep (writer w5): Fig 11·a (one CDN, three jobs: serve photos, signatures and
// resizing, cache the hashtag JSON; each card links back to its sections). Phone: the cards stack under the cloud.
import React from 'react';
import { Box, Cloud, Fig, Label, Line } from './kit';
import { ChTag, KeyTag, PhotoChip } from './s3a-parts';
import { DocCard } from './s7-hashtag-storage-parts';

const F11A_TITLE = 'One CDN, three jobs';
const F11A_DESC =
  'One CDN does three jobs in this lecture: it serves the photos (chapters 2 and 4.4), it checks signed URLs and resizes images with a width parameter (chapters 5 and 6.2), and it caches the hashtag page’s JSON document (section 9.2).';

type Card = { title: string; tags: { no: string; href: string }[]; body: (x: number, y: number, k: string) => React.ReactNode };

const CARDS: Card[] = [
  {
    title: 'serve photos',
    tags: [{ no: '2', href: '#s2' }, { no: '4.4', href: '#s4-4' }],
    body: (x, y, k) => (
      <g>
        <PhotoChip x={x + 18} y={y + 6} w={28} h={20} tone="ink" seed={`${k}-chip`} />
        <Label kind="mono" anchor="start" x={x + 56} y={y + 21} size={13}>…/1729_4275.jpg</Label>
      </g>
    ),
  },
  {
    title: 'signatures + resizing',
    tags: [{ no: '5', href: '#s5' }, { no: '6.2', href: '#s6-2' }],
    body: (x, y, k) => (
      <g>
        <KeyTag x={x + 14} y={y + 4} w={124} seed={`${k}-tag`} kind="mono" size={12.5}>?oh=…&amp;oe=…</KeyTag>
        <Label kind="mono" anchor="start" x={x + 146} y={y + 20} size={13}>?w=360</Label>
      </g>
    ),
  },
  {
    title: 'cache the hashtag JSON',
    tags: [{ no: '9.2', href: '#s9-2' }],
    body: (x, y, k) => <DocCard x={x + 14} y={y - 4} w={174} lines={['{ tag,', '  total_photos,', '  top_100 }']} row={19} size={12.5} seed={`${k}-doc`} />,
  },
];

function CardAt({ c, x, y, w, h, k }: { c: Card; x: number; y: number; w: number; h: number; k: string }) {
  return (
    <g>
      <Box x={x} y={y} w={w} h={h} seed={`${k}-box`} />
      <Label anchor="start" x={x + 14} y={y + 26} size={14}>{c.title}</Label>
      {c.body(x, y + 40, k)}
      {c.tags.map((t, i) => <ChTag key={t.no} x={x + 14 + i * 44} y={y + h - 14} no={t.no} href={t.href} anchor="start" size={13.5} />)}
    </g>
  );
}

export function OneCdnThreeJobs({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig11a-p' : 'fig11a';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const cw = 300, ch = 128, x = 20, y0 = 120, gap = 16;
    return (
      <Fig id={id} w={340} h={y0 + 3 * ch + 2 * gap + 10} title={F11A_TITLE} desc={F11A_DESC}>
        <Cloud cx={170} cy={52} w={128} h={70} label="cdn" seed={s('cdn')} />
        <Line pts={[[170, 88], [170, y0]]} weight="thin" seed={s('spine')} />
        {CARDS.map((c, i) => (
          <CardAt key={c.title} c={c} x={x} y={y0 + i * (ch + gap)} w={cw} h={ch} k={s(`c${i}`)} />
        ))}
      </Fig>
    );
  }
  const cw = 200, ch = 130, y0 = 128, xs = [12, 220, 428];
  return (
    <Fig id={id} w={640} h={y0 + ch + 12} title={F11A_TITLE} desc={F11A_DESC}>
      <Cloud cx={320} cy={54} w={140} h={76} label="cdn" seed={s('cdn')} />
      <Line pts={[[262, 74], [112, 74], [112, y0]]} weight="thin" seed={s('l0')} />
      <Line pts={[[320, 92], [320, y0]]} weight="thin" seed={s('l1')} />
      <Line pts={[[378, 74], [528, 74], [528, y0]]} weight="thin" seed={s('l2')} />
      {CARDS.map((c, i) => (
        <CardAt key={c.title} c={c} x={xs[i]} y={y0} w={cw} h={ch} k={s(`c${i}`)} />
      ))}
    </Fig>
  );
}
