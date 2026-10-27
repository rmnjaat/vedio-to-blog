// Lecture 03 (lec05), §3.5–3.7 figures: Fig 3·c "Two trips or four" (new), Fig 3·d "Batch deletion with a cron job"
// (D-07 redraw) and the §3 rule-box sketch. Built only from the kit. Spec: lectures/lec05/lesson/figures.md, chapter 3.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Label, Lifeline, Line, Mark, Num, type Tone } from './floor';
import { ellipse } from '../kit/hand';

/* ------------------------------------------------------------------ Fig 3·c: two trips or four */

type Msg = { up: boolean; tone: Tone; text: string };

function TripLane({ ox, oy, P, msgs, title, count, id, variant }: {
  ox: number; oy: number; P: boolean; msgs: Msg[]; title: string; count: string; id: string; variant?: boolean;
}) {
  const s = (k: string) => `${id}-${k}`;
  const apiX = ox + (P ? 50 : 60), dbX = ox + (P ? 290 : 340);
  const NX = ox + (P ? 18 : 24);
  // lifelines end under the last message (phone); side by side, both lanes keep the longer length
  const y1 = P ? oy + 90 + msgs.length * 48 : oy + 282;
  const titleY = P ? y1 + (variant ? 102 : 66) : oy + 384;
  return (
    <g>
      <Box x={apiX - 36} y={oy + 18} w={72} h={34} label="api" seed={s('api')} />
      <Cyl cx={dbX} top={oy + 14} rx={24} ry={6} h={30} label="mysql" seed={s('db')} />
      <Lifeline x={apiX} y0={oy + 62} y1={y1} seed={s('l1')} />
      <Lifeline x={dbX} y0={oy + 80} y1={y1} seed={s('l2')} />
      {msgs.map((m, i) => {
        const y = oy + 100 + i * 48;
        const [a, b] = m.up ? [apiX, dbX] : [dbX, apiX];
        return (
          <g key={i}>
            <Label kind="mono" tone={m.tone === 'green' ? 'green' : undefined} x={(apiX + dbX) / 2} y={y - 4} size={13}>{m.text}</Label>
            <Arrow tone={m.tone} pts={[[a, y + 2], [b, y + 20]]} seed={s('m' + i)} />
            <Num x={NX} y={y + 10} n={i + 1} tone={m.tone} size={13} />
          </g>
        );
      })}
      <Label x={(apiX + dbX) / 2} y={y1 + 30} size={17}>{count}</Label>
      {variant && <Label kind="mono" muted x={(apiX + dbX) / 2} y={y1 + 54} size={13}>SELECT 1 … LIMIT 1 as step 1</Label>}
      {variant && <Label muted x={(apiX + dbX) / 2} y={y1 + 72} size={13}>smaller, still a round trip</Label>}
      <Label kind="title" x={(apiX + dbX) / 2} y={titleY}>{title}</Label>
    </g>
  );
}

export function TwoOrFourTrips({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3c-p' : 'fig3c';
  return (
    <Fig id={id} w={P ? 340 : 880} h={P ? 676 : 400} title="Two trips or four"
      desc="Swim lanes for the API server and MySQL. Get, then write: the API sends SELECT for key k1, the row comes back over the network (perhaps a 10 MB value), the API sends INSERT or UPDATE, and the ack comes back: four network trips. A SELECT 1 … LIMIT 1 existence check shrinks the reply but is still a round trip. Upsert: one INSERT … ON DUPLICATE KEY UPDATE goes to MySQL and one ack comes back: two trips.">
      <TripLane id={id + '-l'} ox={0} oy={0} P={P} title="get, then write" count="4 trips" variant
        msgs={[
          { up: true, tone: 'blue', text: 'SELECT … WHERE `key` = k1' },
          { up: false, tone: 'blue', text: 'row back: value 10 MB?' },
          { up: true, tone: 'blue', text: 'INSERT or UPDATE' },
          { up: false, tone: 'green', text: 'ack' },
        ]} />
      {P && <Line dotted pts={[[10, 398], [330, 398]]} seed={id + '-sep'} />}
      <TripLane id={id + '-r'} ox={P ? 0 : 460} oy={P ? 404 : 0} P={P} title="upsert" count="2 trips"
        msgs={[
          { up: true, tone: 'blue', text: 'INSERT … ON DUPLICATE KEY UPDATE' },
          { up: false, tone: 'green', text: 'ack' },
        ]} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·d: batch deletion with a cron job */

/** The cron clock: a circle with two hands. */
function CronClock({ x, y, r = 14, seed }: { x: number; y: number; r?: number; seed: string }) {
  return (
    <g>
      <path className="ink shape" d={ellipse(x, y, r, r * 0.96, seed)} />
      <Mark weight="thin" a={[x, y]} b={[x, y - r * 0.7]} seed={seed + '-h1'} />
      <Mark weight="thin" a={[x, y]} b={[x + r * 0.55, y]} seed={seed + '-h2'} />
    </g>
  );
}

export function CronBatch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  // Only the cron timeline: the read that filters expired rows is the next chapter's question, so it isn't drawn.
  const P = layout === 'phone';
  const id = P ? 'fig3d-p' : 'fig3d';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Batch deletion with a cron job';
  const desc = 'A time axis with a cron job firing every t minutes (10 in the example); each run is a hard delete, DELETE FROM store WHERE expired_at <= UNIX_TIMESTAMP(). Between runs, a row that has expired is still on disk.';
  const ticks = [0, 1, 2, 3, 4, 5];
  if (P) {
    const ty = (i: number) => 60 + i * 64;
    return (
      <Fig id={id} w={340} h={484} title={title} desc={desc}>
        <Arrow pts={[[44, 30], [44, 410]]} seed={s('ax')} />
        <Label muted anchor="end" x={36} y={416} size={13}>time</Label>
        {ticks.map((i) => (
          <g key={i}>
            <Mark a={[36, ty(i)]} b={[52, ty(i)]} seed={s('tk' + i)} />
            <CronClock x={130} y={ty(i)} r={13} seed={s('ck' + i)} />
            <Arrow dashed pts={[[115, ty(i)], [56, ty(i)]]} seed={s('cr' + i)} />
          </g>
        ))}
        <Label kind="mono" anchor="start" x={152} y={ty(0) + 5} size={13}>cron</Label>
        <Line weight="thin" pts={[[192, ty(1)], [200, ty(1)], [200, ty(2)], [192, ty(2)]]} seed={s('br')} />
        <Label kind="mono" anchor="start" x={210} y={(ty(1) + ty(2)) / 2 + 5} size={13}>t = 10 min</Label>
        <Label anchor="start" x={152} y={ty(4) + 5} size={13}>hard delete</Label>

        <Label muted anchor="start" x={20} y={450} size={13}>between runs, expired rows</Label>
        <Label muted anchor="start" x={20} y={468} size={13}>are still on disk</Label>
      </Fig>
    );
  }
  const tx = (i: number) => 110 + i * 140;
  return (
    <Fig id={id} w={880} h={214} title={title} desc={desc}>
      <Arrow pts={[[40, 120], [852, 120]]} seed={s('ax')} />
      <Label muted anchor="end" x={852} y={144} size={13}>time</Label>
      {ticks.map((i) => (
        <g key={i}>
          <Mark a={[tx(i), 112]} b={[tx(i), 128]} seed={s('tk' + i)} />
          <CronClock x={tx(i)} y={50} seed={s('ck' + i)} />
          <Arrow dashed pts={[[tx(i), 68], [tx(i), 110]]} seed={s('cr' + i)} />
        </g>
      ))}
      <Label kind="mono" x={tx(0)} y={24} size={13}>cron</Label>
      <Label anchor="start" x={tx(2) + 8} y={94} size={13}>hard delete</Label>
      <Line weight="thin" pts={[[tx(1), 134], [tx(1), 142], [tx(2), 142], [tx(2), 134]]} seed={s('br')} />
      <Mark weight="thin" a={[(tx(1) + tx(2)) / 2, 142]} b={[(tx(1) + tx(2)) / 2, 149]} seed={s('brm')} />
      <Label kind="mono" x={(tx(1) + tx(2)) / 2} y={168} size={13}>t = 10 min</Label>

      <Label muted x={(tx(1) + tx(2)) / 2} y={196} size={13}>between runs, expired rows are still on disk</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ §3 rule-box sketch */

export function ClauseCosts({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'l5-rule3-p' : 'l5-rule3';
  const s = (k: string) => `${id}-${k}`;
  const title = 'What one clause costs';
  const desc = 'One GET query, … WHERE `key` = k AND expired_at > UNIX_TIMESTAMP(). Three tags hang off its last clause: network, disk, rows: the three things that clause decides.';
  const tags = ['network', 'disk', 'rows'];
  if (P) {
    const xs = [96, 166, 230];
    return (
      <Fig id={id} w={320} h={128} title={title} desc={desc} className="bottomup">
        <Label kind="mono" x={160} y={28}>… WHERE `key` = k</Label>
        <Label kind="mono" tone="blue" x={160} y={52}>AND expired_at &gt; now_s</Label>
        <Line tone="blue" pts={[[68, 60], [252, 60]]} seed={s('ul')} />
        {xs.map((x, i) => <Line key={i} weight="thin" pts={[[x, 62], [x, 90]]} seed={s('h' + i)} />)}
        {xs.map((x, i) => <Label key={'t' + i} x={x} y={110} size={14}>{tags[i]}</Label>)}
      </Fig>
    );
  }
  const xs = [250, 320, 384];
  return (
    <Fig id={id} w={480} h={118} title={title} desc={desc} className="bottomup">
      <Label kind="mono" anchor="start" x={60} y={36}>… WHERE `key` = k</Label>
      <Label kind="mono" tone="blue" anchor="start" x={198} y={36}>AND expired_at &gt; now_s</Label>
      <Line tone="blue" pts={[[196, 46], [394, 46]]} seed={s('ul')} />
      {xs.map((x, i) => <Line key={i} weight="thin" pts={[[x, 48], [x, 78]]} seed={s('h' + i)} />)}
      {xs.map((x, i) => <Label key={'t' + i} x={x} y={98} size={14}>{tags[i]}</Label>)}
    </Fig>
  );
}
