// Lecture 07 (lec09), chapter 1 "Instagram's first year" (writer w1).
// Fig 1·a (D-01 redraw): Instagram, end of year one. Desk 880, phone 340. The board's ten diagonals become two buses.
// Rule-box sketch §1: two stack waves and a "?" over the next one. 480 wide, ≤ 5 glyphs, one layout.
import React from 'react';
import { Actor, Box, Cloud, Cyl, Dot, Fig, Label, Line, Pipe } from './kit';
import { Bucket } from './s2-cdn-parts';

type Layout = { layout?: 'desk' | 'phone' };

const STORES = ['cassandra', 'postgresql', 'memcached', 'redis'];
const TITLE = 'Instagram, end of year one';
const DESC = 'Nginx in front of Django, with Celery for background work; both use Cassandra, PostgreSQL, Memcached, Redis and RabbitMQ, all on AWS, as drawn in class. A faint addition from the sources, not on the board: photos sat on S3 behind CloudFront.';

export function YearOne({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-f1a-p' : 'l09-f1a';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const BX = 20, BW = 104, BH = 36;
    const apps = ['nginx', 'django', 'celery'];
    const ay = (i: number) => 56 + i * 66;
    const SX = 268, BUS = 190;
    const sy = (i: number) => 40 + i * 66; // cylinder tops
    const PY = sy(4) + 16; // pipe centre
    return (
      <Fig id={id} w={340} h={562} title={TITLE} desc={DESC}>
        <Label kind="title" x={170} y={20} size={15}>Instagram’s year-one architecture</Label>
        {apps.map((a, i) => (
          <g key={a}>
            <Box x={BX} y={ay(i)} w={BW} h={BH} label={a} seed={s('b' + a)} />
            {i > 0 && <Line pts={[[BX + BW / 2, ay(i - 1) + BH], [BX + BW / 2, ay(i)]]} seed={s('v' + i)} />}
          </g>
        ))}
        {/* django and celery join one bus that reaches all five stores */}
        <Line pts={[[BX + BW, ay(1) + BH / 2], [BUS, ay(1) + BH / 2]]} seed={s('dj')} />
        <Line pts={[[BX + BW, ay(2) + BH / 2], [BUS, ay(2) + BH / 2]]} seed={s('ce')} />
        <Line pts={[[BUS, sy(0) + 14], [BUS, PY]]} seed={s('bus')} />
        <Dot x={BUS} y={ay(1) + BH / 2} />
        <Dot x={BUS} y={ay(2) + BH / 2} />
        {STORES.map((st, i) => (
          <g key={st}>
            <Line pts={[[BUS, sy(i) + 14], [SX - 24, sy(i) + 14]]} seed={s('t' + st)} />
            <Cyl cx={SX} top={sy(i)} rx={22} ry={6} h={24} label={st} seed={s('c' + st)} />
          </g>
        ))}
        <Line pts={[[BUS, PY], [SX - 42, PY]]} seed={s('trmq')} />
        <Pipe x={SX - 42} cy={PY} w={86} ry={11} label="rabbitmq" seed={s('rmq')} />
        <Label x={86} y={292} size={14}>django and celery</Label>
        <Label x={86} y={310} size={14}>use all five</Label>
        <Label x={170} y={386} size={14}>all on AWS</Label>
        <Label x={170} y={414} size={14}>why famous?  1 year · 14 million · 3 engineers</Label>
        <g className="faint">
          <Bucket cx={122} cy={472} w={84} h={52} seed={s('s3')} />
          <Cloud cx={218} cy={472} w={84} h={52} label="cdn" seed={s('cdn')} />
          <Label x={170} y={526} size={13}>photos: S3 + CloudFront</Label>
          <Label x={170} y={546} size={13}>(source, not on the board)</Label>
        </g>
      </Fig>
    );
  }
  const AY = 60, AW = 110, AH = 44;
  const apps: [string, number][] = [['nginx', 180], ['django', 385], ['celery', 590]];
  const SXS = [120, 300, 480, 660], PX = 760, PW = 100, PC = PX + PW / 2;
  const B1 = 150, B2 = 172, TOP = 214;
  const drops = [...SXS, PC];
  return (
    <Fig id={id} w={880} h={384} title={TITLE} desc={DESC}>
      <Label kind="title" x={385} y={30}>Instagram’s year-one architecture</Label>
      {apps.map(([a, x]) => <Box key={a} x={x - AW / 2} y={AY} w={AW} h={AH} label={a} seed={s('b' + a)} />)}
      <Line pts={[[180 + AW / 2, AY + AH / 2], [385 - AW / 2, AY + AH / 2]]} seed={s('nd')} />
      <Line pts={[[385 + AW / 2, AY + AH / 2], [590 - AW / 2, AY + AH / 2]]} seed={s('dc')} />
      {/* two buses: django's at y 150, celery's at y 172; every store's drop meets both */}
      <Line pts={[[385, AY + AH], [385, B1]]} seed={s('d-down')} />
      <Line pts={[[590, AY + AH], [590, B2]]} seed={s('c-down')} />
      <Line pts={[[SXS[0], B1], [PC, B1]]} seed={s('bus1')} />
      <Line pts={[[SXS[0], B2], [PC, B2]]} seed={s('bus2')} />
      <Dot x={385} y={B1} />
      <Dot x={590} y={B2} />
      <Label anchor="start" x={396} y={B1 - 8} size={13}>django</Label>
      <Label anchor="start" x={600} y={B2 + 18} size={13}>celery</Label>
      {drops.map((x, i) => (
        <g key={i}>
          <Line pts={[[x, B1], [x, i === 4 ? 228 : TOP]]} seed={s('drop' + i)} />
          <Dot x={x} y={B1} />
          <Dot x={x} y={B2} />
        </g>
      ))}
      {STORES.map((st, i) => <Cyl key={st} cx={SXS[i]} top={TOP} rx={30} ry={8} h={38} label={st} seed={s('c' + st)} />)}
      <Pipe x={PX} cy={242} w={PW} ry={14} label="rabbitmq" seed={s('rmq')} />
      <Label x={490} y={322}>all on AWS</Label>
      <Label x={440} y={362} size={15}>why famous?   1 year · 14 million · 3 engineers</Label>
      <g className="faint">
        <Bucket cx={712} cy={46} w={78} h={48} seed={s('s3')} />
        <Cloud cx={812} cy={46} w={78} h={48} label="cdn" seed={s('cdn')} />
        <Label x={762} y={96} size={13}>photos: S3 + CloudFront</Label>
        <Label x={762} y={113} size={13}>(source, not on the board)</Label>
      </g>
    </Fig>
  );
}

/** Rule-box sketch §1: two waves of stacks, and a "?" over the next one. 320 wide so labels stay >= 12px on a phone. */
export function WatchTheWave() {
  const s = (k: string) => `l09-r1-${k}`;
  const AX = 130;
  return (
    <Fig id="l09-r1" w={320} h={156} title="Watch whoever grows fastest"
      desc="A timeline of stack waves: PHP/MySQL around 2008–2011, then Django/Celery, then a dashed third wave marked with a question mark, and a person under it asking whether they need it.">
      <g transform="translate(0 -50)">
      <Line pts={[[12, AX], [308, AX]]} seed={s('axis')} />
      <Label anchor="end" x={310} y={AX + 20} size={14}>years</Label>
      <Line pts={[[22, AX], [44, 100], [68, 86], [92, 100], [112, AX]]} seed={s('w1')} />
      <Label kind="mono" x={64} y={72}>PHP/MySQL</Label>
      <Label x={66} y={AX + 20} size={14}>2008–2011</Label>
      <Line pts={[[120, AX], [142, 100], [166, 86], [190, 100], [210, AX]]} seed={s('w2')} />
      <Label kind="mono" x={170} y={72}>Django/Celery</Label>
      <Line dashed pts={[[218, AX], [236, 104], [256, 94], [276, 104], [294, AX]]} seed={s('w3')} />
      <Label kind="title" x={256} y={80}>?</Label>
      <Actor x={246} y={160} s={0.8} seed={s('me')} />
      <Label anchor="end" x={230} y={184} size={14}>need it?</Label>
      </g>
    </Fig>
  );
}
