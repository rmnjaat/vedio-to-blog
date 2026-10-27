// Lecture 10 (lec10), chapter 4 "Serving it from S3" (figures.md §4): the §4 rule-box sketch, Fig 4·a (one copy
// per server, and what that costs), Fig 4·b (D-05 redraw: pointed reads on S3), Fig 4·c (step-through: boot, then
// one GET). Arrowheads on the initiator: an API server reads S3, so its arrow points at the cloud.
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cross, Disk, Fleet, Label, Lifeline, LoadBalancer, Mark, Num, Step, TimeAxis } from '../kit/Kit';
import { EmptySlot, Fig, FileBar } from './s3-one-file-parts';

type L = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ rule-box sketch §4 */

export function BareMinimumRule({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule4-p' : 'l10-rule4';
  const s = (k: string) => `${id}-${k}`;
  const bx = P ? 12 : 40, bw = P ? 80 : 96;
  const ccx = P ? 222 : 340, cw = P ? 132 : 170;
  return (
    <Fig id={id} w={P ? 300 : 480} h={150} title="One shared copy"
      desc="A server with its own 1 TB disk is crossed out; the server reads one shared copy in the cloud instead.">
      <Box x={bx} y={30} w={bw} h={40} label="api" seed={s('api')} />
      <Disk cx={bx + bw / 2} cy={106} w={56} h={26} seed={s('disk')} />
      <Label kind="mono" x={bx + bw / 2} y={140} size={14}>1 TB</Label>
      <Mark a={[bx + bw / 2, 72]} b={[bx + bw / 2, 92]} seed={s('dl')} weight="thin" />
      <Cross x={bx + bw / 2} y={106} size={30} seed={s('x')} />
      <Arrow tone="blue" pts={[[bx + bw, 50], [ccx - cw / 2 - 2, 50]]} seed={s('read')} />
      <Cloud cx={ccx} cy={50} w={cw} h={64} label="s3" seed={s('s3')} />
      <Label x={ccx} y={116} size={14}>one shared copy</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·a */

export function OneCopyPerServer({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f4a-p' : 'l10-f4a';
  const s = (k: string) => `${id}-${k}`;
  const desc = 'Copying the 1 TB dictionary to every API server: tedious updates and brief inconsistency are tolerable for a weekly update, but a hundred servers hold a hundred terabytes of redundant data. Cost is the real problem.';
  if (P) {
    return (
      <Fig id={id} w={340} h={372} title="One copy per server" desc={desc}>
        <Actor x={24} y={40} seed={s('user')} />
        <Arrow tone="blue" pts={[[42, 64], [78, 64]]} seed={s('u')} />
        <LoadBalancer x={80} y={34} h={64} w={22} seed={s('lb')} />
        <Arrow tone="blue" pts={[[102, 66], [134, 66]]} seed={s('l')} />
        <Fleet x={136} y={48} w={78} h={36} n={100} label="api" seed={s('api')} countLabel={false} />
        <Mark a={[214, 66]} b={[244, 66]} seed={s('dl')} weight="thin" />
        <Disk cx={272} cy={66} w={54} h={26} seed={s('disk')} />
        <Label kind="mono" x={272} y={104} size={14}>1 TB</Label>
        <Label kind="mono" tone="blue" anchor="start" x={6} y={120} size={14}>GET /word</Label>
        <Label x={176} y={120} size={14}>× 100 servers</Label>
        <Label kind="mono" anchor="start" x={10} y={164} size={14}>100 × 1 TB = 100 TB</Label>
        <Label anchor="start" x={10} y={188} size={14}>redundant copies, on SSDs</Label>
        <Label anchor="start" x={10} y={230} size={14}>update tedious</Label>
        <Label muted anchor="start" x={30} y={252} size={14}>fine: weekly, bulk</Label>
        <Label anchor="start" x={10} y={282} size={14}>inconsistency</Label>
        <Label muted anchor="start" x={30} y={304} size={14}>fine: meanings barely change</Label>
        <Label tone="red" anchor="start" x={10} y={350} size={28}>COST !!</Label>
      </Fig>
    );
  }
  const ys = [64, 130, 196];
  return (
    <Fig id={id} w={700} h={268} title="One copy per server" desc={desc}>
      <Actor x={30} y={108} seed={s('user')} />
      <Label kind="mono" tone="blue" x={36} y={184} size={14}>GET /word</Label>
      <Arrow tone="blue" pts={[[48, 130], [96, 130]]} seed={s('u')} />
      <LoadBalancer x={98} y={40} h={180} seed={s('lb')} />
      {ys.map((y, i) => (
        <g key={i}>
          <Arrow tone="blue" pts={[[122, y], [166, y]]} seed={s(`l${i}`)} />
          <Box x={168} y={y - 18} w={86} h={36} label="api" seed={s(`api${i}`)} />
          <Mark a={[254, y]} b={[272, y]} seed={s(`dl${i}`)} weight="thin" />
          <Disk cx={300} cy={y} w={54} h={26} seed={s(`disk${i}`)} />
          <Label kind="mono" anchor="start" x={334} y={y + 5} size={14}>1 TB</Label>
        </g>
      ))}
      <Label x={211} y={244} size={14}>… × 100 servers</Label>
      <Label kind="mono" anchor="start" x={420} y={56} size={14}>100 servers × 1 TB</Label>
      <Label kind="mono" anchor="start" x={420} y={80} size={14}>= 100 TB</Label>
      <Label anchor="start" x={420} y={104} size={14}>redundant copies, on SSDs</Label>
      <Label anchor="start" x={420} y={150} size={14}>update tedious</Label>
      <Label muted anchor="start" x={540} y={150} size={14}>fine: weekly, bulk</Label>
      <Label anchor="start" x={420} y={180} size={14}>inconsistency</Label>
      <Label muted anchor="start" x={530} y={180} size={14}>fine: meanings barely change</Label>
      <Label tone="red" anchor="start" x={420} y={236} size={30}>COST !!</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·b */

export function PointedReads({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f4b-p' : 'l10-f4b';
  const s = (k: string) => `${id}-${k}`;
  const desc = "Users' GET /word requests go through a load balancer to API servers that each hold the word-to-offset map in memory. Each lookup is one ranged read of n bytes at an offset in the single file on S3.";
  if (P) {
    return (
      <Fig id={id} w={340} h={430} title="Pointed reads on S3" desc={desc}>
        <Label anchor="start" x={6} y={166} size={14}>file path on S3:</Label>
        <Label anchor="start" x={6} y={186} size={14}>static config</Label>
        <Actor x={24} y={52} seed={s('user')} />
        <Arrow tone="blue" pts={[[42, 76], [78, 76]]} seed={s('u')} />
        <LoadBalancer x={80} y={46} h={66} w={22} seed={s('lb')} />
        <Arrow tone="blue" pts={[[102, 80], [146, 80]]} seed={s('l')} />
        <Fleet x={148} y={60} w={110} h={48} n={3} seed={s('api')} countLabel={false} />
        <Label kind="mono" x={203} y={80} size={14}>api</Label>
        <Label kind="mono" muted x={203} y={100} size={14}>w → o, n</Label>
        <Label kind="mono" tone="blue" anchor="start" x={6} y={140} size={14}>GET /word</Label>
        {/* one ranged read per server */}
        {[172, 194, 216].map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 112], [x, 186]]} seed={s(`rd${i}`)} />)}
        <Label kind="mono" tone="blue" anchor="start" x={226} y={150} size={14}>(file, off, n)</Label>
        <Cloud cx={190} cy={230} w={240} h={96} label="" seed={s('s3')} />
        <Label kind="mono" x={112} y={236} size={14}>s3</Label>
        <FileBar x={150} y={218} h={26} segs={[{ w: 30, label: 'I' }, { w: 54, label: 'D' }]} seed={s('file')} size={14} />
        <Label x={190} y={304} size={14}>network attached storage</Label>
        <Label x={190} y={326} size={14}>hdfs · network hdd</Label>
        <Label x={190} y={348} size={14}>+ file system semantics</Label>
        <Label x={190} y={370} size={14}>(random read)</Label>
        <Label x={190} y={406} size={16}>pointed read</Label>
        <Mark a={[136, 413]} b={[244, 413]} seed={s('pu1')} weight="thin" />
        <Mark a={[138, 418]} b={[242, 418]} seed={s('pu2')} weight="thin" />
      </Fig>
    );
  }
  const ys = [66, 136, 206];
  const cx = 590;
  return (
    <Fig id={id} w={700} h={300} title="Pointed reads on S3" desc={desc}>
      <Actor x={30} y={98} seed={s('user')} />
      <Label kind="mono" tone="blue" x={36} y={174} size={14}>GET /word</Label>
      <Arrow tone="blue" pts={[[48, 120], [88, 120]]} seed={s('u')} />
      <LoadBalancer x={90} y={40} h={192} seed={s('lb')} />
      <Label x={215} y={26} size={14}>file path on S3 (config)</Label>
      {ys.map((y, i) => (
        <g key={i}>
          <Arrow tone="blue" pts={[[114, y], [158, y]]} seed={s(`l${i}`)} />
          <Box x={160} y={y - 22} w={110} h={44} label="api" sub="w → o, n" seed={s(`api${i}`)} />
        </g>
      ))}
      {/* each server makes its own ranged read: three connectors into three ports on the cloud */}
      <Arrow tone="blue" pts={[[270, 66], [372, 66], [372, 112], [494, 112]]} seed={s('r0')} />
      <Arrow tone="blue" pts={[[270, 136], [490, 136]]} seed={s('r1')} />
      <Arrow tone="blue" pts={[[270, 206], [372, 206], [372, 160], [494, 160]]} seed={s('r2')} />
      <Label kind="mono" tone="blue" x={436} y={102} size={13}>(file, off, n)</Label>
      <Cloud cx={cx} cy={136} w={200} h={110} seed={s('s3')} />
      <Label kind="mono" x={cx - 58} y={141} size={14}>s3</Label>
      <FileBar x={cx - 30} y={123} h={26} segs={[{ w: 30, label: 'I' }, { w: 60, label: 'D' }]} seed={s('file')} size={14} />
      <Label x={cx} y={216} size={14}>network attached storage</Label>
      <Label x={cx} y={238} size={14}>hdfs · network hdd</Label>
      <Label x={cx} y={260} size={14}>+ file system semantics</Label>
      <Label x={cx} y={282} size={14}>(random read)</Label>
      <Label x={cx} y={40} size={16}>pointed read</Label>
      <Mark a={[cx - 52, 47]} b={[cx + 52, 47]} seed={s('pu1')} weight="thin" />
      <Mark a={[cx - 50, 52]} b={[cx + 50, 52]} seed={s('pu2')} weight="thin" />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c (step-through) */

export function BootThenGet({ layout = 'desk' }: L) {
  const P = layout === 'phone';
  const id = P ? 'l10-f4c-p' : 'l10-f4c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const A = P ? 96 : 112; // api lane
  const S = P ? 292 : 360; // s3 lane
  const NX = P ? 34 : 38;
  const mid = (A + S) / 2;
  const req = (y: number, label: string[], k: string) => (
    <g>
      <Arrow tone="blue" pts={[[A + 2, y], [S - 2, y]]} seed={s(k)} />
      {label.map((t, i) => (
        <Label key={i} kind="mono" tone="blue" x={mid} y={y - 8 - (label.length - 1 - i) * 17} size={14}>{t}</Label>
      ))}
    </g>
  );
  const ret = (y: number, label: string, k: string) => (
    <g>
      <Arrow tone="green" pts={[[S - 2, y], [A + 2, y]]} seed={s(k)} weight="thin" />
      <Label kind="mono" tone="green" x={mid} y={y + 18} size={14}>{label}</Label>
    </g>
  );
  return (
    <Fig id={id} w={W} h={596} halo title="Boot, then one GET"
      desc="Time runs down. Lanes: an API server and S3. 1: the server starts with the file's S3 path. 2: one ranged read gets the 16-byte header. 3: a second ranged read gets exactly index-size bytes. 4: it builds the in-memory map and starts serving. 5: a GET for apple; the map gives its offset and length. 6: one ranged read of that record, and 200 goes back. 7: an unknown word misses the map and gets 404 without touching S3.">
      <Box x={A - 48} y={20} w={96} h={34} label="api" seed={s('api')} />
      <Cloud cx={S} cy={36} w={P ? 92 : 112} h={46} label="s3" seed={s('s3')} />
      <Lifeline x={A} y0={56} y1={584} seed={s('la')} />
      <Lifeline x={S} y0={62} y1={584} seed={s('ls')} />
      <TimeAxis x={P ? 6 : 8} y0={60} y1={584} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={90} n={1} size={14} />
        <Label kind="mono" anchor="start" x={A + 10} y={88} size={14}>path =</Label>
        <Label kind="mono" anchor="start" x={A + 10} y={106} size={14}>s3://word-dictionary/</Label>
        <Label kind="mono" anchor="start" x={A + 10} y={124} size={14}>dictionary1.dictionary</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={172} n={2} tone="blue" size={14} />
        {req(172, ['Range: bytes=0-15'], '2q')}
        {ret(190, P ? 'OUR_DICT·1·3,502,000' : 'OUR_DICT · 1 · 3,502,000', '2r')}
      </Step>
      <Step n={3}>
        <Num x={NX} y={250} n={3} tone="blue" size={14} />
        {req(250, ['bytes=16-3502015'], '3q')}
        {ret(268, 'the index', '3r')}
      </Step>
      <Step n={4}>
        <Num x={NX} y={318} n={4} tone="green" size={14} />
        <EmptySlot x={A - 44} y={302} w={88} h={30} seed={s('map')} />
        <Label kind="mono" tone="green" x={A} y={322} size={14}>w → o, n</Label>
        <Label tone="green" anchor="start" x={A + 54} y={322} size={14}>hash map built</Label>
      </Step>
      <Step n={5}>
        <Num x={NX} y={372} n={5} tone="blue" size={14} />
        <Arrow tone="blue" pts={[[NX + 14, 384], [A - 2, 384]]} seed={s('5in')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 10} y={370} size={14}>GET /word?w=apple</Label>
        <Label kind="mono" anchor="start" x={A + 10} y={392} size={14}>map: apple → 0, 14</Label>
      </Step>
      <Step n={6}>
        <Num x={NX} y={448} n={6} tone="blue" size={14} />
        {req(448, P ? ['bytes=3502016-', '3502029'] : ['bytes=3502016-3502029'], '6q')}
        {ret(466, 'apple,a fruit⏎', '6r')}
        <Arrow tone="green" pts={[[A - 2, 506], [NX + 14, 506]]} seed={s('6out')} weight="thin" />
        <Label kind="mono" tone="green" x={(A + NX + 12) / 2} y={498} size={14}>200</Label>
      </Step>
      <Step n={7}>
        <Num x={NX} y={540} n={7} tone="red" size={14} />
        <Arrow tone="blue" pts={[[NX + 14, 552], [A - 2, 552]]} seed={s('7in')} />
        <Label kind="mono" tone="blue" anchor="start" x={A + 10} y={538} size={14}>GET /word?w=qwzx</Label>
        <Label kind="mono" tone="red" anchor="start" x={A + 10} y={562} size={14}>map miss</Label>
        <Arrow tone="red" pts={[[A - 2, 574], [NX + 14, 574]]} seed={s('7out')} weight="thin" />
        <Label kind="mono" tone="red" x={(A + NX + 12) / 2} y={568} size={14}>404</Label>
        <Label anchor="start" x={A + 10} y={582} size={14}>S3 never touched</Label>
      </Step>
    </Fig>
  );
}
