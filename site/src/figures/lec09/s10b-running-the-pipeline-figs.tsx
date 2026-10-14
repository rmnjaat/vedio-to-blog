// Lecture 07 (lec09), §10 Running the pipeline, part b (writer w5): Fig 10·b (two orders: the usual database-first
// write with an event after it, and high-volume ingestion with Kafka as the first point of entry). Phone: two columns.
import React from 'react';
import { Arrow, Box, Cyl, Fig, Fleet, Label, LoadBalancer, Pipe, Worker } from './kit';
import { chamferRect } from '../kit/hand';
import { BandwidthBar } from './s3a-parts';

const F10B_TITLE = 'Two orders';
const F10B_DESC =
  'Usually the API writes the database first and then puts an event on Kafka, which consumers pull. For massive analytics ingestion such as Google Analytics or YouTube watch time, the API puts every event on Kafka first, the first point of entry; aggregators pull and process the events later into analytics stores, because writing the raw rate straight into a database might make it cry.';

export function TwoOrders({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') return <TwoOrdersPhone />;
  const s = (k: string) => `fig10b-${k}`;
  return (
    <Fig id="fig10b" w={820} h={330} title={F10B_TITLE} desc={F10B_DESC}>
      {/* row a: the usual order */}
      <Label anchor="start" x={20} y={24} size={15}>usual: database first</Label>
      <Box x={40} y={50} w={90} h={40} label="api" seed={s('a-api')} />
      <Arrow tone="blue" pts={[[130, 70], [206, 70]]} seed={s('a-write')} />
      <Cyl cx={240} top={54} rx={30} ry={7} h={30} label="db" seed={s('a-db')} />
      <Arrow tone="blue" dashed pts={[[272, 70], [366, 70]]} seed={s('a-event')} />
      <Label x={322} y={52} size={13}>then the event</Label>
      <Pipe x={370} cy={70} w={150} ry={16} seed={s('a-kafka')} />
      <Label kind="mono" x={445} y={106}>kafka</Label>
      <Worker x={578} y={34} w={110} h={30} label="consumer" seed={s('a-w1')} size={13} />
      <Worker x={578} y={82} w={110} h={30} label="consumer" seed={s('a-w2')} size={13} />
      <Arrow dashed pts={[[578, 49], [550, 49], [550, 62], [524, 62]]} seed={s('a-p1')} />
      <Arrow dashed pts={[[578, 97], [550, 97], [550, 80], [524, 80]]} seed={s('a-p2')} />
      <Label muted anchor="start" x={696} y={74} size={13}>the usual order</Label>

      {/* row b: high-volume ingestion */}
      <Label anchor="start" x={20} y={164} size={15}>high-volume ingestion: Kafka first</Label>
      <Label anchor="start" x={14} y={192} size={13}>every event</Label>
      {[200, 212, 224, 236].map((y, i) => (
        <Arrow key={i} tone="blue" weight="thin" pts={[[20, y], [98, y]]} seed={s(`b-in${i}`)} />
      ))}
      <Box x={100} y={198} w={80} h={40} label="api" seed={s('b-api')} />
      <Arrow tone="blue" dashed pts={[[180, 218], [256, 218]]} seed={s('b-pub')} />
      <Pipe x={260} cy={218} w={150} ry={16} seed={s('b-kafka')} />
      <Label kind="mono" x={335} y={194}>kafka</Label>
      <Label x={335} y={256} size={13}>first point of entry</Label>
      <Fleet x={480} y={198} w={130} h={40} n={2} countLabel={false} label="aggregators" seed={s('b-agg')} size={13} />
      <Arrow dashed pts={[[480, 218], [412, 218]]} seed={s('b-pull')} />
      <Label x={446} y={210} size={13}>pulls</Label>
      <Arrow tone="blue" pts={[[624, 218], [672, 218]]} seed={s('b-store')} />
      <Cyl cx={698} top={202} rx={24} ry={6} h={28} seed={s('b-s1')} />
      <Cyl cx={756} top={202} rx={24} ry={6} h={28} seed={s('b-s2')} />
      <Label kind="mono" x={727} y={258} size={13}>analytics stores</Label>
      {/* the direct write that is not taken */}
      <Arrow tone="red" dashed pts={[[140, 238], [140, 284], [204, 284]]} seed={s('b-direct')} />
      <Cyl cx={232} top={270} rx={26} ry={6} h={26} tone="red" seed={s('b-cry')} />
      <Label tone="red" anchor="start" x={266} y={292} size={14}>“might cry”</Label>
      <Label muted anchor="end" x={806} y={300} size={13}>Google Analytics, YouTube watch time</Label>
    </Fig>
  );
}

function TwoOrdersPhone() {
  const s = (k: string) => `fig10b-p-${k}`;
  const L = 82, R = 250;
  return (
    <Fig id="fig10b-p" w={340} h={470} title={F10B_TITLE} desc={F10B_DESC}>
      {/* left: the usual order */}
      <Label x={L} y={18} size={13}>usual:</Label>
      <Label x={L} y={34} size={13}>database first</Label>
      <Box x={L - 40} y={50} w={80} h={36} label="api" seed={s('a-api')} />
      <Arrow tone="blue" pts={[[L, 86], [L, 118]]} seed={s('a-write')} />
      <Cyl cx={L} top={124} rx={26} ry={6} h={26} seed={s('a-db')} />
      <Label kind="mono" anchor="start" x={L + 32} y={146} size={13}>db</Label>
      <Arrow tone="blue" dashed pts={[[L, 162], [L, 206]]} seed={s('a-event')} />
      <Label anchor="start" x={L + 6} y={180} size={12.5}>then</Label>
      <Label anchor="start" x={L + 6} y={196} size={12.5}>the event</Label>
      <Pipe x={L - 58} cy={220} w={116} ry={13} seed={s('a-kafka')} />
      <Label kind="mono" anchor="start" x={L - 58} y={198} size={13}>kafka</Label>
      <Worker x={L - 56} y={266} w={112} h={30} label="consumers" seed={s('a-w1')} size={12.5} />
      <Arrow dashed pts={[[L, 266], [L, 235]]} seed={s('a-p1')} />
      <Label anchor="start" x={L + 6} y={254} size={12.5}>pulls</Label>
      <Label muted x={L} y={320} size={12.5}>the usual order</Label>
      {/* right: Kafka first */}
      <Label x={R} y={18} size={13}>high volume:</Label>
      <Label x={R} y={34} size={13}>Kafka first</Label>
      {[R - 24, R - 8, R + 8, R + 24].map((x, i) => (
        <Arrow key={i} tone="blue" weight="thin" pts={[[x, 40], [x, 64]]} seed={s(`b-in${i}`)} />
      ))}
      <Box x={R - 40} y={66} w={80} h={36} label="api" seed={s('b-api')} />
      <Arrow tone="blue" dashed pts={[[R, 102], [R, 136]]} seed={s('b-pub')} />
      <Pipe x={R - 58} cy={150} w={116} ry={13} seed={s('b-kafka')} />
      <Label kind="mono" anchor="start" x={R + 6} y={124} size={13}>kafka</Label>
      <Label anchor="start" x={R - 56} y={186} size={12.5}>first point</Label>
      <Label anchor="start" x={R - 56} y={202} size={12.5}>of entry</Label>
      <Box x={R - 56} y={226} w={112} h={34} label="aggregators" seed={s('b-agg')} labelSize={12.5} />
      <Arrow dashed pts={[[R + 46, 226], [R + 46, 165]]} seed={s('b-pull')} />
      <Arrow tone="blue" pts={[[R, 260], [R, 290]]} seed={s('b-store')} />
      <Cyl cx={R - 28} top={296} rx={22} ry={6} h={24} seed={s('b-s1')} />
      <Cyl cx={R + 28} top={296} rx={22} ry={6} h={24} seed={s('b-s2')} />
      <Label kind="mono" x={R + 8} y={346} size={12.5}>analytics</Label>
      <Label kind="mono" x={R + 8} y={362} size={12.5}>stores</Label>
      {/* the direct write that is not taken */}
      <Arrow tone="red" dashed pts={[[R - 40, 92], [R - 66, 92], [R - 66, 384]]} seed={s('b-direct')} />
      <Cyl cx={R - 66} top={392} rx={24} ry={6} h={24} tone="red" seed={s('b-cry')} />
      <Label tone="red" anchor="start" x={R - 34} y={414} size={13}>“might cry”</Label>
      <Label muted x={170} y={448} size={12.5}>Google Analytics, YouTube watch time</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 10·c */

// Design fix (critic C-04): §10.5 ran five screens with no figure. Fig 10·c draws the 90/10 split with a profiled
// canary and the profile it yields; Fig 10·d draws "see which of the four you use the most, and add more of that".
const F10C_TITLE = 'Profile a slice of production';
const F10C_DESC =
  'A load balancer splits production 90/10: 90% of requests go to plain servers, 10% to a canary that runs an application profiler, which costs it response time while profiling is on. The profile shows how long each function under the handler took (the handler may call, say, 5,000 functions), so the one that takes most of the time, the bottleneck, stands out.';
const FLAME = [0.07, 0.05, 0.6, 0.06, 0.09]; // the handler's calls, as fractions of its time; the widest is the bottleneck
const FLAME_GAP = 6;

function FlameBars({ x, y, w, seed }: { x: number; y: number; w: number; seed: string }) {
  const bh = 22, max = Math.max(...FLAME);
  let cx = x;
  return (
    <g>
      <path className="ink fillpaper" d={chamferRect(x, y, w, bh, `${seed}-h`, 1.5)} />
      <Label kind="mono" anchor="start" x={x + 8} y={y + 16} size={13}>handler()</Label>
      {FLAME.map((f, i) => {
        const bx = cx, bw = f * w;
        cx += bw + FLAME_GAP;
        return <path key={i} className={f === max ? 'red dot-red' : 'ink fillpaper'} d={chamferRect(bx, y + bh + 6, bw, bh, `${seed}-c${i}`, 1.5)} />;
      })}
    </g>
  );
}

/** left edge of the bottleneck bar, for its label */
function hotLeft(x: number, w: number) {
  const i = FLAME.indexOf(Math.max(...FLAME));
  return x + FLAME.slice(0, i).reduce((a, f) => a + f * w + FLAME_GAP, 0);
}

export function CanaryProfile({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig10c-p' : 'fig10c';
  const s = (k: string) => `${id}-${k}`;
  if (P) {
    const fx = 14, fw = 312, fy = 300;
    return (
      <Fig id={id} w={340} h={440} title={F10C_TITLE} desc={F10C_DESC}>
        <Label anchor="start" x={14} y={20} size={13}>requests</Label>
        {[100, 120, 140].map((x, i) => <Arrow key={i} tone="blue" weight="thin" pts={[[x, 28], [x, 62]]} seed={s(`in${i}`)} />)}
        <LoadBalancer x={60} y={66} w={220} h={18} seed={s('lb')} label="" />
        <Label kind="mono" anchor="start" x={288} y={80} size={13}>lb</Label>
        <Arrow tone="blue" pts={[[110, 86], [78, 148]]} seed={s('to90')} />
        <Label kind="mono" anchor="end" x={86} y={122} size={14}>90%</Label>
        <Arrow tone="blue" pts={[[230, 86], [250, 150]]} seed={s('to10')} />
        <Label kind="mono" anchor="start" x={250} y={122} size={14}>10%</Label>
        <Fleet x={14} y={160} w={128} h={40} n={3} countLabel={false} label="servers" seed={s('fleet')} size={13} />
        <Box x={196} y={154} w={130} h={44} label="canary" seed={s('canary')} labelSize={13} />
        <Label tone="red" anchor="end" x={326} y={218} size={13}>profiled: slower responses</Label>
        <Arrow pts={[[256, 226], [256, fy - 8]]} seed={s('out')} />
        <Label anchor="end" x={248} y={262} size={13}>time per function</Label>
        <FlameBars x={fx} y={fy} w={fw} seed={s('fl')} />
        <Label tone="red" anchor="start" x={hotLeft(fx, fw)} y={fy + 72} size={13}>one function = most of the time</Label>
        <Label muted anchor="start" x={fx} y={fy + 94} size={13}>the handler calls, say, 5,000 functions</Label>
        <Arrow weight="thin" pts={[[fx, fy + 112], [fx + fw, fy + 112]]} seed={s('t')} />
        <Label muted anchor="end" x={fx + fw} y={fy + 130} size={12.5}>time</Label>
      </Fig>
    );
  }
  const fx = 470, fw = 330, fy = 58;
  return (
    <Fig id={id} w={820} h={240} title={F10C_TITLE} desc={F10C_DESC}>
      <Label anchor="start" x={14} y={84} size={13}>requests</Label>
      {[104, 120, 136].map((y, i) => <Arrow key={i} tone="blue" weight="thin" pts={[[20, y], [90, y]]} seed={s(`in${i}`)} />)}
      <LoadBalancer x={94} y={68} h={104} seed={s('lb')} />
      <Arrow tone="blue" pts={[[120, 96], [224, 64]]} seed={s('to90')} />
      <Label kind="mono" x={168} y={66} size={14}>90%</Label>
      <Arrow tone="blue" pts={[[120, 144], [224, 172]]} seed={s('to10')} />
      <Label kind="mono" x={168} y={184} size={14}>10%</Label>
      <Fleet x={228} y={40} w={150} h={44} n={3} countLabel={false} label="servers" seed={s('fleet')} size={13} />
      <Box x={228} y={150} w={150} h={44} label="canary" seed={s('canary')} labelSize={13} />
      <Label tone="red" anchor="start" x={228} y={216} size={13}>profiled: slower responses</Label>
      <Arrow pts={[[384, 166], [fx - 12, 104]]} seed={s('out')} />
      <Label anchor="start" x={fx} y={36} size={13}>time per function</Label>
      <FlameBars x={fx} y={fy} w={fw} seed={s('fl')} />
      <Label tone="red" anchor="start" x={hotLeft(fx, fw)} y={fy + 72} size={13}>one function = most of the time</Label>
      <Label muted anchor="start" x={fx} y={fy + 98} size={13}>the handler calls, say, 5,000 functions</Label>
      <Arrow weight="thin" pts={[[fx, fy + 120], [fx + fw, fy + 120]]} seed={s('t')} />
      <Label muted anchor="end" x={fx + fw} y={fy + 114} size={12.5}>time</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 10·d */

const F10D_TITLE = 'Add more of the resource you use most';
const F10D_DESC =
  'Four resources, CPU, memory, network and disk, for a CPU-heavy encryption and decryption workload: CPU is at its limit, the others are low. More CPU helps; more RAM gains nothing. See which one you use the most, and add more of that.';

export function FourResources({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig10d-p' : 'fig10d';
  const s = (k: string) => `${id}-${k}`;
  const lx = P ? 6 : 20;
  const bx = P ? 84 : 110, bw = P ? 120 : 220, ax = bx + bw + 16;
  const rows: [string, number][] = [['cpu', 0.94], ['memory', 0.3], ['network', 0.24], ['disk', 0.14]];
  const y0 = 58, dy = 32;
  return (
    <Fig id={id} w={P ? 340 : 600} h={P ? 230 : 214} title={F10D_TITLE} desc={F10D_DESC}>
      <Label anchor="start" x={lx} y={24} size={14}>an encryption / decryption workload</Label>
      {rows.map(([l, v], i) => (
        <g key={l}>
          <Label kind="mono" anchor="start" x={lx} y={y0 + i * dy + 9} size={13}>{l}</Label>
          <BandwidthBar x={bx} y={y0 + i * dy} w={bw} level={v} full={i === 0} seed={s(`b${i}`)} />
        </g>
      ))}
      <Label tone="green" anchor="start" x={ax} y={y0 + 9} size={13}>{P ? '+ CPU: helps' : '+ more CPU: helps'}</Label>
      <Label tone="red" anchor="start" x={ax} y={y0 + dy + 9} size={13}>{P ? '+ RAM: no gain' : '+ more RAM: gains nothing'}</Label>
      <Label anchor="start" x={lx} y={y0 + 4 * dy + 22} size={14}>see which one you use the most,</Label>
      <Label anchor="start" x={lx} y={y0 + 4 * dy + 40} size={14}>and add more of that</Label>
    </Fig>
  );
}
