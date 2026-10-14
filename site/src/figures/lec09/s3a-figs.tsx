// Lecture 07 (lec09), §3.1–3.3: Fig 3·a (the brainstorm list), the §3 RuleBox sketch (simple is hard: D-03's arc)
// and Fig 3·b (three paths for one photo: D-03 rows b–c redrawn, row a new). The photo's bytes are the small filled
// chip: it appears only where the 5 MB actually travels.
import React from 'react';
import { Actor, Arrow, Box, Fig, Label, Line } from './kit';
import { arcPts, BandwidthBar, Bucket, ChTag, PhotoChip, Tick } from './s3a-parts';

/* ------------------------------------------------------------------ Fig 3·a */

const LIST: { item: string; no: string; href?: string; aside?: string }[] = [
  { item: 'storage', no: '3.1' },
  { item: 'data flow', no: '3.2–3.4', href: '#s3-2' },
  { item: 'separation of concerns', no: '4' },
  { item: 'privacy', no: '5', aside: 'not what you think' },
  { item: 'extensibility', no: '6.1' },
  { item: 'optimization', no: '6.2' },
];

/** Fig 3·a: the board's checklist for the upload service, each item linked to the chapter that covers it. 340 wide. */
export function BrainstormList() {
  const Y0 = 98, RH = 36;
  return (
    <Fig id="fig3a" w={340} h={Y0 + LIST.length * RH + 6} title="The brainstorm list"
      desc="The six things the class listed for Instagram's image upload service (storage, data flow, separation of concerns, privacy, extensibility and optimization) under the requirement of 5 million photo uploads a day, each tagged with the chapter of this page that covers it.">
      <Label kind="mono" anchor="start" x={14} y={28} size={15}>image upload service</Label>
      <Line pts={[[14, 38], [196, 38]]} weight="thin" seed="f3a-ul" />
      <Label anchor="start" x={14} y={66} size={14}>requirement: 5M photo uploads / day</Label>
      {LIST.map((r, i) => {
        const y = Y0 + i * RH;
        return (
          <g key={r.item}>
            <Box x={14} y={y - 12} w={14} h={14} seed={`f3a-cb${i}`} />
            <Label anchor="start" x={40} y={y} size={14}>{r.item}</Label>
            {r.aside && <Label muted anchor="start" x={102} y={y} size={13}>{`(${r.aside})`}</Label>}
            <ChTag x={326} y={y} no={r.no} href={r.href} anchor="end" size={14} />
          </g>
        );
      })}
    </Fig>
  );
}

/* ------------------------------------------------------------------ RuleBox §3 sketch */

const R3_TITLE = 'Simple is hard';
const R3_DESC = 'The user sends the photo along one long arc straight to S3, with a signed, short-lived permission; the API server under the arc is crossed out because the bytes never pass through it.';

export function SimpleSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const W = P ? 320 : 480, H = P ? 168 : 150;
  const id = P ? 'rule3s-p' : 'rule3s';
  const s = (k: string) => `${id}-${k}`;
  const ux = P ? 28 : 40, bx = P ? 270 : 410, by = P ? 84 : 74;
  const api = P ? { x: 124, y: 82, w: 62 } : { x: 186, y: 74, w: 82 };
  return (
    <Fig id={id} w={W} h={H} title={R3_TITLE} desc={R3_DESC} className="bottomup">
      <Actor x={ux} y={by - 10} seed={s('u')} />
      <PhotoChip x={ux + 8} y={by - 34} seed={s('chip')} />
      <Arrow tone="blue" pts={arcPts([ux + 10, by - 38], [bx - 46, by - 10], P ? -30 : -34)} seed={s('arc')} />
      <Bucket cx={bx} cy={by} w={P ? 84 : 96} h={P ? 52 : 58} seed={s('s3')} />
      <Box x={api.x} y={api.y} w={api.w} h={34} label="api" seed={s('api')} faint />
      <Line pts={[[api.x - 6, api.y + 40], [api.x + api.w + 6, api.y - 6]]} weight="heavy" seed={s('x1')} />
      <Label x={W / 2} y={H - 14} size={14}>one request, signed, short-lived</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·b */

const F3B_TITLE = 'Three paths for one photo';
const F3B_DESC =
  'Three ways to move a 5 MB photo into S3. a: over a held connection in chunks, which is unnecessary because one HTTP request carries 5 MB. b: through the API server, synchronously, so the bytes cross its network card twice (5 MB in, 5 MB out) and fill it, and other API calls suffer; a crash mid-upload is not the problem, since the server returns a 5xx and the client retries. c: through a dedicated upload service with a bigger network card, which takes the load off the API servers but still carries every byte; can we do better?';

export function ThreePaths({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3b-p' : 'fig3b';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 820;
  // row heights (phone rows differ: row b carries five lines of notes); TOP[i] is row i's top
  const RH = P ? [184, 262, 206] : [162, 162, 162];
  const TOP = [4, 4 + RH[0], 4 + RH[0] + RH[1]];
  const D = P ? 30 : 26;                         // each row: title on top, then the drawing shifted down by D
  const T = 14;
  // geometry shared by the rows (relative to the row's top Y)
  const ux = P ? 26 : 50;                        // user
  const mid = P ? { x: 120, w: 98, h: 38 } : { x: 330, w: 116, h: 44 };
  const bcx = P ? 292 : 724, bw = P ? 78 : 96, bh = P ? 48 : 58;
  const ay = P ? 56 : 50;                        // arrow line
  const bl = bcx - bw / 2;                       // bucket's left edge
  const mx1 = mid.x + mid.w;

  const row = (i: number, Y: number) => {
    const user = (
      <g>
        <Actor x={ux} y={Y + ay - 18} seed={s(`u${i}`)} />
        <PhotoChip x={ux - 22} y={Y + ay - 36} tone="ink" seed={s(`uc${i}`)} />
        {i === 0 && <Label kind="mono" anchor="start" x={ux - 4} y={Y + ay - 28} size={13}>5 MB</Label>}
      </g>
    );
    const bucket = <Bucket cx={bcx} cy={Y + ay} w={bw} h={bh} seed={s(`s3${i}`)} size={P ? 13 : 14} />;
    const box = (label: string) => <Box x={mid.x} y={Y + ay - mid.h / 2} w={mid.w} h={mid.h} label={label} seed={s(`m${i}`)} />;

    if (i === 0) {
      return (
        <g key={i}>
          {user}{box('api')}{bucket}
          {/* the held connection: a double line with chunk fragments on it */}
          <Line pts={[[ux + 18, Y + ay - 5], [mid.x - 2, Y + ay - 5]]} seed={s('a-l1')} />
          <Line pts={[[ux + 18, Y + ay + 5], [mid.x - 2, Y + ay + 5]]} seed={s('a-l2')} />
          {(P ? [58, 76, 94] : [120, 160, 200, 240]).map((x, k) => (
            <PhotoChip key={k} x={x} y={Y + ay - 4} w={8} h={8} seed={s(`a-f${k}`)} />
          ))}
          <Arrow pts={[[mx1, Y + ay], [bl, Y + ay]]} seed={s('a-s3')} />
          {/* the graphite strike over the chunked connection */}
          <Line pts={[[P ? ux + 30 : 104, Y + ay + 24], [P ? mid.x - 14 : 286, Y + ay - 24]]} weight="heavy" seed={s('a-x')} />
          {P ? (
            <g>
              <Label anchor="start" x={6} y={Y + 112} size={T}>unnecessary: one HTTP request</Label>
              <Label anchor="start" x={6} y={Y + 130} size={T}>carries 5 MB</Label>
            </g>
          ) : (
            <Label anchor="start" x={mx1 + 20} y={Y + ay + 44} size={T}>unnecessary: one HTTP request carries 5 MB</Label>
          )}
        </g>
      );
    }
    if (i === 1) {
      return (
        <g key={i}>
          {user}{box('api')}{bucket}
          <Arrow tone="blue" pts={[[ux + 18, Y + ay], [mid.x - 2, Y + ay]]} seed={s('b-in')} />
          <PhotoChip x={P ? 70 : 150} y={Y + ay - 13} seed={s('b-c1')} />
          <Arrow tone="blue" pts={[[mx1, Y + ay], [bl, Y + ay]]} seed={s('b-out')} />
          <PhotoChip x={P ? 230 : 500} y={Y + ay - 13} seed={s('b-c2')} />
          {!P && <Label kind="mono" tone="blue" anchor="start" x={170} y={Y + ay - 6} size={13}>5 MB in</Label>}
          {!P && <Label kind="mono" tone="blue" anchor="start" x={520} y={Y + ay - 6} size={13}>5 MB out</Label>}
          <BandwidthBar x={mid.x + (P ? 3 : 18)} y={Y + ay + mid.h / 2 + 10} w={80} level={1} full seed={s('b-bar')} />
          {!P && <Label muted x={mid.x + mid.w / 2} y={Y + 16} size={13}>must be synchronous: users want to see it now</Label>}
          {P ? (
            <g>
              {/* on phone the note sits under the drawing, clear of the photo chip */}
              <Label muted anchor="start" x={6} y={Y + 114} size={13}>must be synchronous: users want to see it now</Label>
              <Label kind="mono" tone="blue" anchor="start" x={6} y={Y + 136} size={T}>5 MB in, then 5 MB out</Label>
              <Label tone="red" anchor="start" x={6} y={Y + 156} size={T}>network card limit:</Label>
              <Label tone="red" anchor="start" x={6} y={Y + 174} size={T}>other API calls suffer</Label>
              <Label muted anchor="start" x={6} y={Y + 196} size={T}>crash mid-upload? 5xx, client retries</Label>
              <Tick x={292} y={Y + 192} seed={s('b-ok')} />
            </g>
          ) : (
            <g>
              <Label tone="red" anchor="start" x={mid.x + 112} y={Y + ay + 39} size={T}>network card limit: other API calls suffer</Label>
              <Label muted anchor="start" x={20} y={Y + ay + 66} size={T}>crash mid-upload? send a 5xx, the client retries</Label>
              <Tick x={406} y={Y + ay + 62} seed={s('b-ok')} />
            </g>
          )}
        </g>
      );
    }
    return (
      <g key={i}>
        {user}{box('upload svc')}{bucket}
        <Arrow tone="blue" pts={[[ux + 18, Y + ay], [mid.x - 2, Y + ay]]} seed={s('c-in')} />
        <PhotoChip x={P ? 70 : 150} y={Y + ay - 13} seed={s('c-c1')} />
        <Arrow tone="blue" pts={[[mx1, Y + ay], [bl, Y + ay]]} seed={s('c-out')} />
        <PhotoChip x={P ? 230 : 500} y={Y + ay - 13} seed={s('c-c2')} />
        <BandwidthBar x={mid.x - (P ? 0 : 2)} y={Y + ay + mid.h / 2 + 10} w={P ? 86 : 120} level={0.55} seed={s('c-bar')} />
        {/* the question the row ends on: an arc from the user toward S3 that stops short */}
        <Line dashed pts={arcPts([ux + 8, Y + ay - 40], [P ? bl - 34 : 520, Y + (P ? 12 : 14)], P ? -8 : -10)} seed={s('c-arc')} />
        <Label anchor="start" x={P ? bl - 30 : 526} y={Y + (P ? 18 : 20)} size={15}>?</Label>
        {P ? (
          <g>
            <Label muted anchor="start" x={6} y={Y + 118} size={T}>bigger network card</Label>
            <Label anchor="start" x={6} y={Y + 138} size={T}>takes load off the API servers,</Label>
            <Label anchor="start" x={6} y={Y + 156} size={T}>still carries every byte. Better?</Label>
          </g>
        ) : (
          <g>
            <Label muted anchor="start" x={mid.x + 130} y={Y + ay + mid.h / 2 + 19} size={13}>bigger network card</Label>
            <Label anchor="start" x={20} y={Y + ay + 66} size={T}>takes load off the API servers, but still carries every byte</Label>
            <Label anchor="start" x={544} y={Y + 20} size={T}>can we do better?</Label>
          </g>
        )}
      </g>
    );
  };

  return (
    <Fig id={id} w={W} h={TOP[2] + RH[2]} title={F3B_TITLE} desc={F3B_DESC}>
      {/* title, then the drawing and its notes: the separator rule above each title closes the previous row */}
      {['a · a persistent connection, in chunks', 'b · through the API server', 'c · a dedicated upload service'].map((t, i) => (
        <g key={i}>
          <Label kind="title" anchor="start" x={P ? 6 : 20} y={TOP[i] + 20} size={15}>{t}</Label>
          <g transform={`translate(0 ${D})`}>{row(i, TOP[i])}</g>
        </g>
      ))}
      {[1, 2].map((i) => <Line key={i} className="lifeline" pts={[[6, TOP[i] - 2], [W - 6, TOP[i] - 2]]} weight="thin" seed={s(`rule${i}`)} />)}
    </Fig>
  );
}
