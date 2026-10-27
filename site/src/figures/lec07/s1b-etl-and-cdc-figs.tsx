// Lecture 09 (lec07), §1 part b (1.5–1.7): figures.
//   RuleSourceOfTruth  RuleBox sketch §1: one source with its log, a CDC tool reading it, a second database
//   Fig 1·e Tiers       redraw of board D-04 (frames b_024345, b_001645)
//   Fig 1·f SixtyToTwo  new: the consulting story, before and after
// Desk layouts are 480–700 wide; every one has a phone layout about 300–340 wide.
import React from 'react';
import { Arrow, Box, Cloud, Cross, Cyl, Fleet, Label, Line, Pipe } from '../kit/Kit';
import { Fig } from './floor';
import { LogStrip } from './s1a-etl-and-cdc-parts';

type Layout = 'desk' | 'phone';

/* ------------------------------------------------------------------ rule sketch */

const DESC_RULE =
  'The source of truth is a database with its log. A small CDC box reads the log (a dashed arrow from the CDC box to the log) and writes the change into a second database (a solid green arrow).';

export function RuleSourceOfTruth({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'Read the source of truth';
  const P = layout === 'phone';
  const s = (k: string) => `${P ? 'r1-p' : 'r1'}-${k}`;
  const W = P ? 320 : 480;
  const k = P ? 320 / 480 : 1;
  const X = (x: number) => x * k;
  return (
    <Fig id={P ? 'rule-l07-1-p' : 'rule-l07-1'} w={W} h={150} title={title} desc={DESC_RULE} className="bottomup">
      <Cyl cx={X(86)} top={22} rx={P ? 28 : 36} ry={P ? 7 : 9} h={44} seed={s('src')} />
      <Line pts={[[X(86), 76], [X(86), 94]]} weight="thin" seed={s('att')} />
      <LogStrip x={X(86) - (P ? 46 : 56)} y={94} w={P ? 92 : 112} cells={6} seed={s('log')} />
      <Label x={X(86)} y={140}>source of truth</Label>
      <Box x={X(214)} y={36} w={P ? 64 : 80} h={34} label="cdc" seed={s('cdc')} />
      <Arrow pts={[[X(214) + (P ? 20 : 26), 70], [X(214) + (P ? 20 : 26), 103], [X(86) + (P ? 48 : 58), 103]]} dashed seed={s('reads')} />
      <Arrow pts={[[X(214) + (P ? 64 : 80), 53], [X(400) - (P ? 30 : 38), 53]]} tone="green" seed={s('writes')} />
      <Cyl cx={X(400)} top={22} rx={P ? 28 : 36} ry={P ? 7 : 9} h={44} seed={s('sink')} />
      <Label x={X(400)} y={100} kind="mono">sink</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·e */

const DESC_1E =
  'One source, many tiers. Four columns: transactional (MySQL), search (Elasticsearch), analytics (Redshift) and backup (S3). One CDC reads MySQL and writes Elasticsearch; a second CDC reads MySQL and writes Redshift; a third reads Redshift and writes S3. Dashed arrows are the reads, started by the CDC tool; green arrows are the writes. With some tools the first two could share one read of the source, at the cost of a transform per sink and more memory. Tiered storage is only introduced here.';

export function Tiers({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'One source, many tiers';
  if (layout === 'phone') {
    const s = (k: string) => `f1e-p-${k}`;
    return (
      <Fig id="f1e-p" w={340} h={622} title={title} desc={DESC_1E}>
        <Label x={170} y={20}>transactional</Label>
        <Cyl cx={170} top={34} rx={30} ry={7.5} h={40} label="mysql" seed={s('mysql')} />
        <Box x={40} y={140} w={96} h={34} label="cdc" seed={s('cdc1')} />
        <Box x={204} y={140} w={96} h={34} label="cdc" seed={s('cdc2')} />
        <Arrow pts={[[88, 140], [88, 60], [138, 60]]} dashed seed={s('r1')} />
        <Arrow pts={[[252, 140], [252, 60], [202, 60]]} dashed seed={s('r2')} />
        <Label anchor="start" x={94} y={116} size={13}>reads</Label>
        <Arrow pts={[[88, 174], [88, 226]]} tone="green" seed={s('w1')} />
        <Arrow pts={[[252, 174], [252, 226]]} tone="green" seed={s('w2')} />
        <Label tone="green" anchor="start" x={94} y={204} size={13}>writes</Label>
        <Cyl cx={88} top={232} rx={30} ry={7.5} h={40} label="elasticsearch" sub="search" seed={s('es')} />
        <Cyl cx={252} top={232} rx={30} ry={7.5} h={40} label="redshift" sub="analytics" seed={s('rs')} />
        <Box x={204} y={350} w={96} h={34} label="cdc" seed={s('cdc3')} />
        <Arrow pts={[[300, 367], [322, 367], [322, 254], [284, 254]]} dashed seed={s('r3')} />
        <Arrow pts={[[252, 384], [252, 424]]} tone="green" seed={s('w3')} />
        <Cloud cx={252} cy={456} w={110} h={56} label="s3" seed={s('s3')} />
        <Label x={252} y={506}>backup</Label>
        <Label anchor="start" x={14} y={366} size={13}>the first two could be</Label>
        <Label anchor="start" x={14} y={383} size={13}>one cdc, two sinks:</Label>
        <Label anchor="start" x={14} y={400} size={13}>one transform per</Label>
        <Label anchor="start" x={14} y={417} size={13}>sink, more memory</Label>
        <Label muted x={170} y={566} size={13}>tiered storage: introduced here,</Label>
        <Label muted x={170} y={583} size={13}>built in a later week</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f1e-${k}`;
  const cyl = (cx: number, head: string, name: string, k: string) => (
    <g>
      <Label x={cx} y={20}>{head}</Label>
      <Label kind="mono" x={cx} y={42}>{name}</Label>
      <Cyl cx={cx} top={58} rx={30} ry={7.5} h={40} seed={s(k)} />
    </g>
  );
  return (
    <Fig id="f1e" w={700} h={360} title={title} desc={DESC_1E}>
      {cyl(90, 'transactional', 'mysql', 'mysql')}
      {cyl(300, 'search', 'elasticsearch', 'es')}
      {cyl(470, 'analytics', 'redshift', 'rs')}
      <Label x={624} y={20}>backup</Label>
      <Cloud cx={624} cy={76} w={104} h={56} label="s3" seed={s('s3')} />
      {/* cdc 1: mysql -> elasticsearch */}
      <Fleet x={150} y={176} w={90} h={34} n={3} countLabel={false} label="cdc" seed={s('cdc1')} />
      <Arrow pts={[[150, 193], [104, 193], [104, 110]]} dashed seed={s('r1')} />
      <Label anchor="start" x={110} y={150} size={13}>reads</Label>
      <Arrow pts={[[240, 193], [300, 193], [300, 110]]} tone="green" seed={s('w1')} />
      <Label tone="green" anchor="start" x={308} y={150} size={13}>writes</Label>
      {/* cdc 2: mysql -> redshift */}
      <Fleet x={330} y={276} w={90} h={34} n={3} countLabel={false} label="cdc" seed={s('cdc2')} />
      <Arrow pts={[[330, 293], [76, 293], [76, 110]]} dashed seed={s('r2')} />
      <Arrow pts={[[420, 293], [470, 293], [470, 110]]} tone="green" seed={s('w2')} />
      {/* cdc 3: redshift -> s3 */}
      <Fleet x={510} y={176} w={80} h={34} n={3} countLabel={false} label="cdc" seed={s('cdc3')} />
      <Arrow pts={[[510, 193], [486, 193], [486, 110]]} dashed seed={s('r3')} />
      <Arrow pts={[[590, 193], [624, 193], [624, 108]]} tone="green" seed={s('w3')} />
      {/* clear of the dashed mysql → cdc 2 read at x 76 (critic C-18) */}
      <Label anchor="start" x={112} y={234} size={13}>could be one cdc with two sinks:</Label>
      <Label anchor="start" x={112} y={251} size={13}>one transform per sink, more memory</Label>
      <Label muted anchor="end" x={694} y={346} size={13}>tiered storage: introduced here, built in a later week</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·f */

const DESC_1F =
  'Before: the API pushes every update to Kafka; a grid of consumer machines (more than sixty, 32 GB each) reads one event at a time and writes one row at a time into the target database; some changes are silently lost, so the two databases drift out of sync. After: two EC2 instances running an Airbyte CDC read the source database’s log and write batches into the target.';

function Before({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Label x={150} y={16} size={13}>one event, one read, one write</Label>
      <Box x={8} y={30} w={66} h={30} label="api" seed={s('api')} />
      <Arrow pts={[[74, 45], [104, 45]]} tone="blue" seed={s('push')} />
      <Pipe x={106} cy={45} w={110} ry={12} seed={s('kafka')} />
      <Label kind="mono" x={161} y={50} size={13}>kafka</Label>
      {Array.from({ length: 12 }, (_, i) => {
        const c = i % 4, r = Math.floor(i / 4);
        return <Box key={i} x={98 + c * 40} y={92 + r * 22} w={32} h={16} seed={s('w' + i)} />;
      })}
      <Arrow pts={[[176, 90], [176, 59]]} seed={s('pull')} />
      <Label anchor="end" x={90} y={110} size={13}>×60,</Label>
      <Label anchor="end" x={90} y={126} size={13}>32 GB</Label>
      <Label anchor="end" x={90} y={142} size={13}>each</Label>
      <Arrow pts={[[176, 158], [176, 196]]} tone="blue" seed={s('write')} />
      <Cross x={140} y={178} size={14} seed={s('x')} />
      <Label tone="red" anchor="end" x={128} y={180} size={13}>silently</Label>
      <Label tone="red" anchor="end" x={128} y={196} size={13}>out of sync</Label>
      <Cyl cx={176} top={200} rx={30} ry={7.5} h={32} label="target" seed={s('db')} />
      <Label kind="title" x={150} y={292}>before</Label>
    </g>
  );
}

function After({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Cyl cx={56} top={60} rx={30} ry={7.5} h={34} seed={s('src')} />
      <Label kind="mono" x={56} y={50}>source</Label>
      <Line pts={[[56, 102], [56, 112]]} weight="thin" seed={s('att')} />
      <LogStrip x={20} y={112} w={72} cells={4} seed={s('log')} />
      <Label x={156} y={98} size={13}>airbyte cdc</Label>
      <Box x={124} y={108} w={64} h={30} label="ec2" seed={s('e1')} />
      <Box x={124} y={148} w={64} h={30} label="ec2" seed={s('e2')} />
      <Arrow pts={[[124, 121], [94, 121]]} dashed seed={s('reads')} />
      <Arrow pts={[[188, 123], [226, 123]]} tone="green" seed={s('w')} />
      <Line pts={[[188, 163], [206, 163], [206, 123]]} tone="green" seed={s('w2')} />
      <Cyl cx={256} top={104} rx={28} ry={7} h={34} label="target" seed={s('db')} />
      <Label tone="green" x={214} y={198} size={13}>batched</Label>
      <Label kind="title" x={150} y={292}>after</Label>
    </g>
  );
}

export function SixtyToTwo({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'Sixty machines down to two';
  if (layout === 'phone')
    return (
      <Fig id="f1f-p" w={300} h={612} title={title} desc={DESC_1F}>
        <Before id="f1f-p1" />
        <Line pts={[[10, 306], [290, 306]]} weight="thin" dotted seed="f1f-p-sep" className="faint" />
        <g transform="translate(0 312)"><After id="f1f-p2" /></g>
      </Fig>
    );
  return (
    <Fig id="f1f" w={640} h={302} title={title} desc={DESC_1F}>
      <g transform="translate(6 0)"><Before id="f1f-1" /></g>
      <Line pts={[[320, 14], [320, 280]]} weight="thin" dotted seed="f1f-sep" className="faint" />
      <g transform="translate(334 0)"><After id="f1f-2" /></g>
    </Fig>
  );
}
