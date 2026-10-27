// Lecture 10 (lec10), chapter 6 part b (6.4–6.5): the §6 rule-box sketch (trigger a deployment),
// Fig 6·d (D-06 full redraw: the update, end to end) and Fig 6·e (D-12 redraw: cold data you can still query).
// Specs: lectures/lec10/lesson/figures.md §6. Parts: ./s6a-switching-servers-parts.
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cyl, Fleet, Label, Line, LoadBalancer, Num } from '../kit/Kit';
import type { Pt } from '../kit/Kit';
import { chamferRect } from '../kit/hand';
import { Fig, FileBar, MetaFile, StripeFile, Tick, type Layout } from './s6a-switching-servers-parts';

/* ------------------------------------------------------------------ rule-box sketch §6 */

/** points along a quadratic curve a → b with control point c */
function curve(a: Pt, c: Pt, b: Pt, k = 14): Pt[] {
  return Array.from({ length: k + 1 }, (_, i) => {
    const t = i / k, u = 1 - t;
    return [u * u * a[0] + 2 * u * t * c[0] + t * t * b[0], u * u * a[1] + 2 * u * t * c[1] + t * t * b[1]] as Pt;
  });
}

export function DeploySketch({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-rule6-p' : 'l10-rule6';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 300 : 480;
  const sw = P ? 50 : 64, gap = P ? 12 : 22, sx = P ? 116 : 236;
  const xs = [0, 1, 2].map((i) => sx + i * (sw + gap));
  return (
    <Fig id={id} w={W} h={P ? 170 : 150} title="Trigger a deployment"
      desc="The update job calls the AWS SDK to trigger a rolling deployment; servers are replaced one at a time and each new one reads the new file on boot.">
      {xs.map((x, i) => i === 2 ? (
        <g key={i}>
          <path className="ink shape faint" d={chamferRect(x + 7, 14, sw, 34, s('old'))} />
          <Box x={x} y={22} w={sw} h={34} label="new" labelSize={13} seed={s('srv' + i)} />
        </g>
      ) : <Box key={i} x={x} y={22} w={sw} h={34} label="api" labelSize={13} seed={s('srv' + i)} />)}
      <Box x={14} y={P ? 112 : 96} w={P ? 92 : 104} h={34} label="aws sdk" labelSize={13} seed={s('sdk')} />
      <Arrow dashed pts={curve([P ? 60 : 66, P ? 112 : 96], [P ? 64 : 80, 40], [xs[0] - 4, 40])} seed={s('dep')} />
      <Label x={P ? 72 : 120} y={P ? 72 : 52}>deploy</Label>
      <Label anchor="start" x={P ? 116 : 236} y={P ? 90 : 84}>a reload is a boot</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·d: the update, end to end */

function JobThumbs({ x, y, s }: { x: number; y: number; s: (k: string) => string }) {
  return (
    <g>
      <StripeFile x={x} y={y} w={28} h={36} lines={4} seed={s('jd')} />
      <Label kind="mono" x={x + 14} y={y + 54} size={12.5}>dict1</Label>
      <Label x={x + 50} y={y + 24}>+</Label>
      <StripeFile x={x + 72} y={y + 6} w={22} h={28} lines={3} seed={s('jc')} />
      <Label kind="mono" x={x + 83} y={y + 54} size={12.5}>changelog</Label>
      <Arrow pts={[[x + 110, y + 18], [x + 150, y + 18]]} seed={s('merge')} />
      <StripeFile x={x + 156} y={y} w={28} h={36} lines={4} tone="green" seed={s('jn')} />
      <Label kind="mono" x={x + 170} y={y + 54} size={12.5}>dict2</Label>
    </g>
  );
}

export function UpdateEndToEnd({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f6d-p' : 'l10-f6d';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The update, end to end';
  const desc = 'The weekly update in four steps: the update job merges the dictionary and the changelog into a new file, uploads it to a new S3 path, points meta.json at it, then uses the AWS SDK to trigger a rolling deployment. Each new API server reads meta.json on boot and loads the new file, while users keep sending GET /word through the load balancer.';
  if (P)
    return (
      <Fig id={id} w={340} h={560} title={title} desc={desc}>
        {/* servers on top */}
        <Actor x={26} y={34} seed={s('act')} />
        <Label kind="mono" x={28} y={104} size={13}>GET /word</Label>
        <Arrow tone="blue" pts={[[40, 58], [62, 58]]} seed={s('u1')} />
        <LoadBalancer x={64} y={26} h={64} seed={s('lb')} />
        <Arrow tone="blue" pts={[[88, 58], [128, 58]]} seed={s('u2')} />
        <Fleet x={130} y={40} w={88} h={36} n={3} label="api" countLabel={false} seed={s('api')} />
        <Label anchor="start" x={252} y={30}>×3 servers</Label>
        <Arrow pts={[[174, 76], [174, 128]]} weight="thin" seed={s('boot')} />
        <Label anchor="start" x={182} y={108}>read on boot</Label>
        {/* S3 in the middle */}
        <Cloud cx={170} cy={198} w={320} h={140} seed={s('cl')} />
        <StripeFile x={56} y={186} w={28} h={36} lines={4} name="dict1" nameAbove seed={s('d1')} />
        <StripeFile x={110} y={186} w={28} h={36} lines={4} name="dict2" nameAbove seed={s('d2')} />
        <Tick x={146} y={198} seed={s('tk')} />
        <Label kind="mono" x={232} y={176}>meta.json</Label>
        <MetaFile x={176} y={186} w={112} h={36} lines={['path: dict2']} name="" seed={s('meta')} />
        {/* the job at the bottom */}
        <Box x={10} y={320} w={320} h={110} seed={s('job')} />
        <Label kind="mono" anchor="start" x={22} y={342}>update job</Label>
        <JobThumbs x={22} y={356} s={s} />
        <Num x={152} y={360} n={1} />
        <Box x={232} y={360} w={88} h={34} label="aws sdk" labelSize={13} seed={s('sdk')} />
        <Arrow dashed pts={[[200, 320], [200, 290], [124, 290], [124, 224]]} seed={s('up')} />
        <Num x={162} y={290} n={2} />
        <Arrow dashed pts={[[262, 320], [262, 224]]} seed={s('upm')} />
        <Num x={262} y={282} n={3} />
        <Arrow dashed pts={[[320, 377], [334, 377], [334, 66], [222, 66]]} seed={s('dep')} />
        <Num x={334} y={290} n={4} />
        {/* the steps, in order */}
        {['merge into a new file', 'upload it to a new path', 'point meta.json at it', 'trigger a rolling deployment'].map((t, i) => (
          <g key={i}>
            <Num x={22} y={456 + i * 26} n={i + 1} />
            <Label anchor="start" x={40} y={461 + i * 26}>{t}</Label>
          </g>
        ))}
      </Fig>
    );
  return (
    <Fig id={id} w={720} h={400} title={title} desc={desc}>
      {/* user → lb → api servers */}
      <Actor x={40} y={78} seed={s('act')} />
      <Label kind="mono" x={42} y={148} size={13}>GET /word</Label>
      <Arrow tone="blue" pts={[[56, 106], [106, 106]]} seed={s('u0')} />
      <LoadBalancer x={108} y={40} h={136} seed={s('lb')} />
      {[57, 107, 157].map((y, i) => (
        <g key={y}>
          <Arrow tone="blue" pts={[[132, y], [178, y]]} seed={s('u' + (i + 1))} />
          <Box x={180} y={y - 17} w={90} h={34} label="api" seed={s('api' + i)} />
          {/* each new server reads meta.json itself: its own connector into its own port on the cloud */}
          <Arrow weight="thin" pts={i === 1 ? [[270, y], [348, y]] : [[270, y], [314, y], [314, 107 + (i - 1) * 20], [350, 107 + (i - 1) * 20]]} seed={s('b' + i)} />
        </g>
      ))}
      <Label muted x={312} y={30}>read on boot</Label>
      {/* S3 */}
      <Cloud cx={490} cy={104} w={290} h={156} seed={s('cl')} />
      <StripeFile x={392} y={82} w={30} h={40} lines={4} name="dict1" nameAbove seed={s('d1')} />
      <StripeFile x={442} y={82} w={30} h={40} lines={4} name="dict2" nameAbove seed={s('d2')} />
      <Tick x={480} y={94} seed={s('tk')} />
      <Label kind="mono" x={555} y={73}>meta.json</Label>
      <MetaFile x={500} y={82} w={110} h={40} lines={['path: dict2']} name="" seed={s('meta')} />
      {/* the update job, with the sdk inside it */}
      <Box x={250} y={262} w={370} h={98} seed={s('job')} />
      <Label kind="mono" anchor="start" x={262} y={284}>update job</Label>
      <Box x={262} y={300} w={96} h={34} label="aws sdk" labelSize={13} seed={s('sdk')} />
      <JobThumbs x={400} y={290} s={s} />
      <Num x={530} y={282} n={1} />
      <Label x={530} y={328}>merge</Label>
      {/* ② upload, ③ update the path, ④ deploy */}
      <Arrow dashed pts={[[520, 262], [520, 204], [457, 204], [457, 124]]} seed={s('up')} />
      <Num x={488} y={204} n={2} />
      <Label anchor="end" x={512} y={232}>upload to a new path</Label>
      <Arrow dashed pts={[[592, 262], [592, 124]]} seed={s('upm')} />
      <Num x={592} y={232} n={3} />
      <Label anchor="start" x={602} y={204}>update</Label>
      <Label anchor="start" x={602} y={222}>the path</Label>
      <Arrow dashed pts={[[300, 300], [300, 226], [225, 226], [225, 176]]} seed={s('dep')} />
      <Num x={262} y={226} n={4} />
      <Label anchor="start" x={20} y={214}>trigger a rolling</Label>
      <Label anchor="start" x={20} y={234}>deployment</Label>
      <Label x={360} y={390}>merge → upload → update meta.json → deploy</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 6·e: cold data you can still query */

export function ColdData({ layout = 'desk' }: { layout?: Layout }) {
  const P = layout === 'phone';
  const id = P ? 'l10-f6e-p' : 'l10-f6e';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Cold data you can still query';
  const desc = 'Recent orders stay in the hot MySQL database; orders older than six months move to S3 in an indexed file, so they can still be looked up by order id, slower but much cheaper. Data lakes rest on the same ability.';
  const bar = [{ w: 20, label: 'H' }, { w: 30, label: 'I' }, { w: 76, label: 'D' }];
  if (P)
    return (
      <Fig id={id} w={340} h={500} title={title} desc={desc}>
        <Label anchor="start" x={14} y={24}>multi-tiered storage</Label>
        <Actor x={36} y={56} seed={s('act')} />
        <Label x={38} y={120}>my orders</Label>
        <Arrow tone="blue" pts={[[52, 82], [96, 82]]} seed={s('u')} />
        <Box x={98} y={64} w={80} h={36} label="api" seed={s('api')} />
        <Arrow tone="blue" pts={[[178, 82], [236, 82], [236, 148]]} seed={s('hot')} />
        <Cyl cx={236} top={152} rx={40} h={42} seed={s('db')} label="mysql" />
        <Label anchor="start" x={284} y={176} size={13}>latest</Label>
        <Label anchor="start" x={284} y={194} size={13}>orders</Label>
        <Arrow tone="blue" pts={[[138, 100], [138, 314]]} seed={s('cold')} />
        <Label anchor="end" x={130} y={180}>slower,</Label>
        <Label anchor="end" x={130} y={198}>much cheaper</Label>
        <Label kind="mono" anchor="end" x={130} y={236} size={13}>order_id</Label>
        <Label kind="mono" anchor="end" x={130} y={254} size={13}>→ offset</Label>
        <Label kind="mono" anchor="end" x={130} y={272} size={13}>→ ranged read</Label>
        <Cloud cx={170} cy={370} w={300} h={110} seed={s('cl')} />
        <Label kind="mono" x={170} y={346}>s3</Label>
        <FileBar x={107} y={360} segs={bar} seed={s('fb')} />
        <Label x={170} y={442}>historical orders (6+ months)</Label>
        <Label x={170} y={466}>without losing the ability to query</Label>
        <Label kind="mono" muted x={170} y={492} size={13}>same idea: data lakes</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={660} h={320} title={title} desc={desc}>
      <Label anchor="start" x={20} y={26}>multi-tiered storage</Label>
      <Actor x={40} y={104} seed={s('act')} />
      <Label x={40} y={168}>my orders</Label>
      <Arrow tone="blue" pts={[[56, 128], [88, 128]]} seed={s('u')} />
      <Box x={90} y={108} w={80} h={40} label="api" seed={s('api')} />
      <Arrow tone="blue" pts={[[170, 120], [240, 120], [240, 62], [354, 62]]} seed={s('hot')} />
      <Cyl cx={400} top={36} rx={42} h={46} seed={s('db')} label="mysql" />
      <Label anchor="start" x={456} y={68}>latest orders</Label>
      <Arrow tone="blue" pts={[[170, 136], [270, 136], [270, 214], [293, 214]]} seed={s('cold')} />
      <Label anchor="end" x={262} y={192}>slower, much cheaper</Label>
      <Label kind="mono" anchor="end" x={262} y={240} size={13}>order_id → offset</Label>
      <Label kind="mono" anchor="end" x={262} y={258} size={13}>→ ranged read</Label>
      <Cloud cx={400} cy={214} w={210} h={110} seed={s('cl')} />
      <Label kind="mono" x={400} y={190}>s3</Label>
      <FileBar x={337} y={204} segs={bar} seed={s('fb')} />
      <Label anchor="start" x={512} y={206}>historical orders</Label>
      <Label anchor="start" x={512} y={226}>(6+ months)</Label>
      <Label kind="mono" muted anchor="end" x={640} y={150} size={13}>same idea: data lakes</Label>
      <Label x={400} y={302}>without losing the ability to query the data</Label>
    </Fig>
  );
}
