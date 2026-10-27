// Lecture 09 (lec07), §1 part a (1.1–1.4): figures.
//   LectureMarks  this lecture's own marks, under the notation key (log strip, struct block, ring)
//   Fig 1·a DayZero      redraw of board D-01 (frames b_000500, b_000415)
//   Fig 1·b EventLeaks   redraw of board D-02 (frames b_000845, b_000830), the four gaps as numbered red marks
//   Fig 1·c CdcReads     redraw of board D-03 (frames b_001330, b_001045)
//   Fig 1·d TwoWays      new: row scan vs log tail
// Desk layouts are 600–680 wide (shown at about 1:1); every one has a phone layout about 340 wide.
import React from 'react';
import { Actor, Arrow, Box, Bubble, Cross, Cyl, Fleet, Label, Line, Num, Pipe, Replica, Worker } from '../kit/Kit';
import { Fig } from './floor';
import { KeySquare, LogStrip, MiniTable, Msg, Ring, RingCircle } from './s1a-etl-and-cdc-parts';

type Layout = 'desk' | 'phone';

/* ------------------------------------------------------------------ lecture marks */

const DESC_MARKS =
  'Three marks this lecture adds to the notation key. A log strip: a row of cells under a database, newest on the right, with a caret marking how far a reader has got (its checkpoint). A struct block: a box headed MyValue with one row per field. A ring: a circle with 0 at the top, a cache node drawn as a small box on the circle and a key drawn as a small hatched square.';

function MarkLog({ id }: { id: string }) {
  return (
    <g>
      <LogStrip x={10} y={26} w={150} cells={6} caret={3} seed={`${id}-log`} />
      <Label x={85} y={98}>log, newest on the right</Label>
    </g>
  );
}
function MarkStruct({ id }: { id: string }) {
  return (
    <g>
      <Box x={10} y={8} w={140} h={66} seed={`${id}-struct`} />
      <Label kind="mono" anchor="start" x={22} y={28} size={13}>{'MyValue {'}</Label>
      <Label kind="mono" anchor="start" x={34} y={47} size={13}>type  4 bits</Label>
      <Label kind="mono" anchor="start" x={22} y={66} size={13}>{'}'}</Label>
      <Label x={80} y={98}>struct block</Label>
    </g>
  );
}
function MarkRing({ id }: { id: string }) {
  return (
    <g>
      <RingCircle cx={70} cy={44} r={34} seed={`${id}-ring`} />
      <Box x={92} y={12} w={30} h={16} seed={`${id}-node`} />
      <KeySquare x={38} y={66} seed={`${id}-key`} />
      <Label anchor="start" x={126} y={25} size={13}>node</Label>
      <Label anchor="end" x={28} y={84} size={13}>key</Label>
      <Label x={70} y={98}>hash ring</Label>
    </g>
  );
}

export function LectureMarks({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'This lecture’s own marks';
  if (layout === 'phone')
    return (
      <Fig id="l07-marks-p" w={340} h={236} title={title} desc={DESC_MARKS}>
        <g transform="translate(0 4)"><MarkLog id="l07-mk-p1" /></g>
        <g transform="translate(176 4)"><MarkStruct id="l07-mk-p2" /></g>
        <g transform="translate(100 124)"><MarkRing id="l07-mk-p3" /></g>
      </Fig>
    );
  return (
    <Fig id="l07-marks" w={560} h={112} title={title} desc={DESC_MARKS}>
      <g transform="translate(0 4)"><MarkLog id="l07-mk-1" /></g>
      <g transform="translate(206 4)"><MarkStruct id="l07-mk-2" /></g>
      <g transform="translate(400 4)"><MarkRing id="l07-mk-3" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·a */

const DESC_1A =
  'Day zero of the blogging app. A reader calls the API server, which talks to the production MongoDB; readers never touch the database. Below, a dashboard tool, Metabase, used by two analysts, fires its queries straight at production (the blue arrow). The database holds personal data, ringed in red. A dashed arrow shows the usual first step: point the dashboard at a read replica, which pulls its changes from the primary. There is no warehouse yet.';

export function DayZero({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'Day zero: the dashboard reads production';
  if (layout === 'phone') {
    const s = (k: string) => `f1a-p-${k}`;
    return (
      <Fig id="f1a-p" w={340} h={304} title={title} desc={DESC_1A}>
        <Actor x={18} y={52} s={0.85} seed={s('reader')} />
        <Label x={18} y={112} size={13}>reader</Label>
        <Arrow pts={[[30, 70], [44, 70]]} seed={s('a1')} />
        <Box x={46} y={54} w={74} h={32} label="api" seed={s('api')} />
        <Arrow pts={[[120, 70], [166, 70]]} seed={s('a2')} />
        <Label kind="mono" x={198} y={26}>mongodb</Label>
        <Cyl cx={198} top={44} rx={30} ry={7.5} h={46} seed={s('db')} />
        <Label kind="mono" x={198} y={78} size={13}>pii</Label>
        <Ring x={198} y={73} rx={17} ry={12} tone="red" seed={s('pii')} />
        <Label kind="mono" x={292} y={26}>replica</Label>
        <Replica cx={292} top={44} rx={24} ry={6} h={46} seed={s('rep')} />
        <Arrow pts={[[268, 62], [230, 62]]} dashed seed={s('pull')} />
        {/* analysts and the dashboard */}
        <Actor x={50} y={196} s={0.85} seed={s('an1')} />
        <Actor x={82} y={196} s={0.85} seed={s('an2')} />
        <Label x={66} y={256} size={13}>analysts</Label>
        <Line pts={[[98, 216], [146, 216]]} seed={s('l-an')} />
        <Box x={148} y={200} w={100} h={34} label="metabase" seed={s('mb')} />
        <Arrow pts={[[198, 200], [198, 102]]} tone="blue" seed={s('q')} />
        <Label tone="blue" anchor="end" x={190} y={146}>fires queries</Label>
        <Label tone="blue" anchor="end" x={190} y={163}>on prod</Label>
        <Arrow pts={[[248, 217], [292, 217], [292, 102]]} dashed seed={s('to-rep')} />
        <Label x={292} y={252} size={13}>usual first step:</Label>
        <Label x={292} y={268} size={13}>a replica</Label>
        <Label muted x={110} y={294}>no warehouse yet</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f1a-${k}`;
  return (
    <Fig id="f1a" w={620} h={262} title={title} desc={DESC_1A}>
      <Actor x={40} y={46} seed={s('reader')} />
      <Label x={40} y={116}>reader</Label>
      <Arrow pts={[[58, 66], [110, 66]]} seed={s('a1')} />
      <Box x={112} y={48} w={96} h={36} label="api" seed={s('api')} />
      <Arrow pts={[[208, 66], [284, 66]]} seed={s('a2')} />
      <Label kind="mono" x={320} y={24}>mongodb</Label>
      <Cyl cx={320} top={40} rx={34} ry={8.5} h={52} seed={s('db')} />
      <Label kind="mono" x={320} y={80} size={13}>pii</Label>
      <Ring x={320} y={75} rx={18} ry={12.5} tone="red" seed={s('pii')} />
      <Label kind="mono" x={470} y={24}>replica</Label>
      <Replica cx={470} top={40} rx={30} ry={7.5} h={52} seed={s('rep')} />
      <Arrow pts={[[440, 62], [356, 62]]} dashed seed={s('pull')} />
      {/* analysts and the dashboard */}
      <Actor x={176} y={190} seed={s('an1')} />
      <Actor x={212} y={190} seed={s('an2')} />
      <Label x={194} y={256}>analysts</Label>
      <Line pts={[[228, 212], [262, 212]]} seed={s('l-an')} />
      <Box x={264} y={194} w={112} h={36} label="metabase" seed={s('mb')} />
      <Arrow pts={[[320, 194], [320, 104]]} tone="blue" seed={s('q')} />
      <Label tone="blue" anchor="end" x={311} y={146}>fires queries</Label>
      <Label tone="blue" anchor="end" x={311} y={163}>on prod</Label>
      <Arrow pts={[[376, 212], [470, 212], [470, 104]]} dashed seed={s('to-rep')} />
      <Label anchor="start" x={480} y={150}>usual first step:</Label>
      <Label anchor="start" x={480} y={167}>a replica</Label>
      <Label muted x={60} y={190}>no warehouse</Label>
      <Label muted x={60} y={207}>yet</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·b */

const DESC_1B =
  'The obvious pipeline. A reader calls the API server, which writes MongoDB and publishes a blog_published event carrying only the blog id to Kafka. Three consumers pull from Kafka and write rows into an analytics MySQL that the insights team queries. Four red marks show where the copy drifts: 1, a views++ counter and a likes aggregation job change MongoDB with no event at all; 2, the event lacks the data, so a consumer has to read the rest back from MongoDB; 3, the API saves the row and crashes before publishing; 4, a new table whose event nobody remembered to add. The API says: every change has an event, right?';

const GAPS = [
  'views++, a likes job: no event',
  'event lacks data: fetch the rest',
  'saved, then crashed before publish',
  'new table? did someone add its event?',
];

export function EventLeaks({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'Events through Kafka, and where they leak';
  if (layout === 'phone') {
    const s = (k: string) => `f1b-p-${k}`;
    return (
      <Fig id="f1b-p" w={340} h={540} title={title} desc={DESC_1B}>
        <Bubble x={8} y={4} w={236} h={30} tail={[86, 52]} lines={['every change has an event, right?']} size={13} seed={s('bub')} />
        <Actor x={16} y={60} s={0.8} seed={s('reader')} />
        <Arrow pts={[[28, 76], [44, 76]]} seed={s('a1')} />
        <Box x={46} y={60} w={78} h={32} label="api" seed={s('api')} />
        <Arrow pts={[[124, 76], [196, 76]]} seed={s('a2')} />
        <Cyl cx={226} top={58} rx={28} ry={7} h={36} seed={s('db')} />
        <Label kind="mono" anchor="start" x={250} y={46} size={13}>mongodb</Label>
        {/* gap 1: a job with no API call */}
        <Worker x={176} y={130} w={104} h={30} label="likes job" seed={s('job')} />
        <Arrow pts={[[226, 130], [226, 104]]} seed={s('job-w')} />
        <Num x={300} y={128} n={1} tone="red" size={13} />
        {/* gap 3 on the publish arrow */}
        <Arrow pts={[[85, 92], [85, 192]]} tone="blue" seed={s('pub')} />
        <Cross x={85} y={136} size={16} seed={s('x')} />
        <Num x={112} y={136} n={3} tone="red" size={13} />
        <Pipe x={30} cy={206} w={262} ry={14} seed={s('kafka')} />
        <Label kind="mono" x={161} y={211} size={13}>{'blog_published{id}'}</Label>
        <Label kind="mono" anchor="start" x={138} y={184} size={13}>kafka</Label>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Worker x={6 + i * 106} y={252} w={100} h={30} label="consumer" seed={s('c' + i)} />
            <Arrow pts={[[56 + i * 106, 252], [56 + i * 106, 222]]} seed={s('pull' + i)} />
          </g>
        ))}
        {/* gap 2: read back the rest */}
        <Arrow pts={[[318, 267], [330, 267], [330, 78], [256, 78]]} weight="thin" tone="red" seed={s('fetch')} />
        <Num x={318} y={190} n={2} tone="red" size={13} />
        <Line pts={[[56, 282], [56, 300], [268, 300], [268, 282]]} tone="blue" seed={s('w-l')} />
        <Arrow pts={[[164, 282], [164, 316]]} tone="blue" seed={s('w')} />
        <Cyl cx={164} top={320} rx={30} ry={7.5} h={40} label="mysql" seed={s('mysql')} />
        <Actor x={36} y={326} s={0.8} seed={s('in1')} />
        <Actor x={66} y={326} s={0.8} seed={s('in2')} />
        <Label x={51} y={384} size={13}>insights</Label>
        <Arrow pts={[[80, 342], [132, 342]]} tone="blue" seed={s('q')} />
        <Num x={220} y={336} n={4} tone="red" size={13} />
        {GAPS.map((g, i) => (
          <g key={'g' + i}>
            <Num x={20} y={420 + i * 28} n={i + 1} tone="red" size={13} />
            <Label tone="red" anchor="start" x={36} y={425 + i * 28} size={13.5}>{g}</Label>
          </g>
        ))}
      </Fig>
    );
  }
  const s = (k: string) => `f1b-${k}`;
  return (
    <Fig id="f1b" w={680} h={436} title={title} desc={DESC_1B}>
      <Bubble x={48} y={2} w={246} h={28} tail={[150, 48]} lines={['every change has an event, right?']} seed={s('bub')} />
      <Actor x={34} y={50} seed={s('reader')} />
      <Arrow pts={[[52, 68], [110, 68]]} seed={s('a1')} />
      <Box x={112} y={50} w={96} h={36} label="api" seed={s('api')} />
      <Arrow pts={[[208, 68], [342, 68]]} seed={s('a2')} />
      <Cyl cx={380} top={44} rx={36} ry={9} h={50} seed={s('db')} />
      <Label kind="mono" anchor="start" x={424} y={110}>mongodb</Label>
      {/* gap 1: views++ and a job with no API call */}
      <Num x={330} y={20} n={1} tone="red" />
      <Label kind="mono" tone="red" x={380} y={24}>views++</Label>
      <Label tone="red" anchor="start" x={424} y={24}>no event</Label>
      <Worker x={478} y={52} w={108} h={32} label="likes job" seed={s('job')} />
      <Arrow pts={[[478, 68], [418, 68]]} seed={s('job-w')} />
      <Label tone="red" anchor="start" x={496} y={106}>no API call at all</Label>
      {/* gap 3: the publish that never happened */}
      <Arrow pts={[[160, 86], [160, 168]]} tone="blue" seed={s('pub')} />
      <Label tone="blue" anchor="end" x={150} y={112}>publish</Label>
      <Cross x={160} y={128} size={18} seed={s('x')} />
      <Num x={186} y={124} n={3} tone="red" />
      <Label tone="red" anchor="start" x={200} y={124}>saved, then crashed</Label>
      <Label tone="red" anchor="start" x={200} y={140}>before publish</Label>
      <Pipe x={70} cy={182} w={290} ry={14} seed={s('kafka')} />
      <Label kind="mono" x={215} y={187} size={13}>{'blog_published{id}'}</Label>
      <Label kind="mono" anchor="end" x={62} y={187}>kafka</Label>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Worker x={58 + i * 110} y={238} w={102} h={32} label="consumer" seed={s('c' + i)} />
          <Arrow pts={[[109 + i * 110, 238], [109 + i * 110, 198]]} seed={s('pull' + i)} />
        </g>
      ))}
      {/* gap 2: the thin event, read back from the source */}
      <Arrow pts={[[380, 254], [400, 254], [400, 104]]} weight="thin" tone="red" seed={s('fetch')} />
      <Num x={414} y={176} n={2} tone="red" />
      <Label tone="red" anchor="start" x={428} y={181}>event lacks data:</Label>
      <Label tone="red" anchor="start" x={428} y={197}>fetch the rest</Label>
      {/* consumers write the analytics copy */}
      <Line pts={[[109, 270], [109, 296], [329, 296], [329, 270]]} tone="blue" seed={s('w-l')} />
      <Arrow pts={[[219, 270], [219, 328]]} tone="blue" seed={s('w')} />
      <Cyl cx={219} top={332} rx={36} ry={9} h={44} label="mysql" seed={s('mysql')} />
      <Actor x={82} y={340} seed={s('in1')} />
      <Actor x={116} y={340} seed={s('in2')} />
      <Label x={99} y={408}>insights</Label>
      <Arrow pts={[[134, 362], [180, 362]]} tone="blue" seed={s('q')} />
      {/* gap 4 */}
      <Num x={280} y={352} n={4} tone="red" />
      <Label tone="red" anchor="start" x={294} y={357}>new table? did someone</Label>
      <Label tone="red" anchor="start" x={294} y={373}>add its event?</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·c */

const DESC_1C =
  'Change data capture. The reader, the API server and MongoDB are unchanged. Under MongoDB sits its log, the oplog, which CDC tools read through change streams. A CDC tool, drawn as a stack of instances (Airbyte, Debezium), reads that log (dashed arrow, the tool starts it), applies an optional transform, and writes the rows into MySQL in your format (green). Other sinks are possible: Kafka, SQS, Kinesis, local disk. Inset: in a Blogs table, an insert, an update and a delete each produce one CDC event, one per changed row.';

function BlogsInset({ x, y, id }: { x: number; y: number; id: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Label kind="mono" anchor="start" x={0} y={-8} size={13}>Blogs</Label>
      <MiniTable x={0} y={0} cols={[{ name: 'change', w: 76 }, { name: 'id', w: 40 }]} rows={[['insert', '7'], ['update', '3'], ['delete', '5']]} seed={`${id}-tbl`} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Arrow pts={[[122, 36 + i * 24], [146, 36 + i * 24]]} weight="thin" seed={`${id}-ev${i}`} />
          <Msg x={150} y={30 + i * 24} seed={`${id}-m${i}`} />
        </g>
      ))}
      <Label x={86} y={124} size={13}>one event per changed row</Label>
    </g>
  );
}

export function CdcReads({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'Change data capture';
  if (layout === 'phone') {
    const s = (k: string) => `f1c-p-${k}`;
    return (
      <Fig id="f1c-p" w={340} h={560} title={title} desc={DESC_1C}>
        <Actor x={16} y={30} s={0.8} seed={s('reader')} />
        <Arrow pts={[[28, 46], [42, 46]]} seed={s('a1')} />
        <Box x={44} y={30} w={76} h={32} label="api" seed={s('api')} />
        <Arrow pts={[[120, 46], [178, 46]]} seed={s('a2')} />
        <Cyl cx={210} top={26} rx={30} ry={7.5} h={40} seed={s('db')} />
        <Label kind="mono" anchor="start" x={246} y={40} size={13}>mongodb</Label>
        <LogStrip x={168} y={84} w={84} cells={6} seed={s('log')} />
        <Line pts={[[210, 74], [210, 84]]} weight="thin" seed={s('att')} />
        <Label kind="mono" anchor="start" x={258} y={98} size={13}>oplog</Label>
        <Fleet x={150} y={168} w={110} h={38} n={3} countLabel={false} seed={s('cdc')} />
        <Label kind="mono" x={205} y={184}>cdc</Label>
        <Line pts={[[156, 192], [254, 192]]} weight="thin" seed={s('band')} />
        <Label kind="mono" muted x={205} y={203} size={12.5}>transform</Label>
        <Arrow pts={[[190, 168], [190, 104]]} dashed seed={s('reads')} />
        <Label anchor="end" x={182} y={140}>reads</Label>
        <Label anchor="end" x={140} y={186}>airbyte ·</Label>
        <Label anchor="end" x={140} y={203}>debezium</Label>
        <Arrow pts={[[205, 206], [205, 280]]} tone="green" seed={s('writes')} />
        <Label tone="green" anchor="start" x={215} y={238}>writes, in</Label>
        <Label tone="green" anchor="start" x={215} y={255}>your format</Label>
        <Cyl cx={205} top={286} rx={30} ry={7.5} h={40} label="mysql" seed={s('mysql')} />
        <Label kind="mono" muted x={170} y={378} size={13}>or: kafka · sqs · kinesis · disk</Label>
        <BlogsInset x={60} y={424} id={s('in')} />
      </Fig>
    );
  }
  const s = (k: string) => `f1c-${k}`;
  return (
    <Fig id="f1c" w={680} h={330} title={title} desc={DESC_1C}>
      <Actor x={34} y={36} seed={s('reader')} />
      <Arrow pts={[[52, 56], [110, 56]]} seed={s('a1')} />
      <Box x={112} y={38} w={96} h={36} label="api" seed={s('api')} />
      <Arrow pts={[[208, 56], [290, 56]]} seed={s('a2')} />
      <Cyl cx={326} top={32} rx={34} ry={8.5} h={46} seed={s('db')} />
      <Label kind="mono" anchor="start" x={368} y={50}>mongodb</Label>
      <Line pts={[[326, 87], [326, 104]]} weight="thin" seed={s('att')} />
      <LogStrip x={274} y={104} w={104} cells={6} seed={s('log')} />
      <Label kind="mono" anchor="start" x={386} y={118}>oplog</Label>
      <Fleet x={262} y={210} w={124} h={42} n={3} countLabel={false} seed={s('cdc')} />
      <Label kind="mono" x={324} y={228}>cdc</Label>
      <Line pts={[[268, 236], [380, 236]]} weight="thin" seed={s('band')} />
      <Label kind="mono" muted x={324} y={248} size={12.5}>transform</Label>
      <Arrow pts={[[300, 182], [300, 126]]} dashed seed={s('reads')} />
      <Label anchor="end" x={292} y={160}>reads</Label>
      <Label anchor="start" x={428} y={190}>airbyte · debezium</Label>
      <Arrow pts={[[386, 244], [578, 244]]} tone="green" seed={s('writes')} />
      <Label tone="green" x={490} y={268}>writes, in your format</Label>
      <Cyl cx={614} top={222} rx={34} ry={8.5} h={44} label="mysql" seed={s('mysql')} />
      <Label kind="mono" muted x={556} y={316} size={13}>or: kafka · sqs · kinesis · disk</Label>
      <BlogsInset x={26} y={168} id={s('in')} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·d */

const DESC_1D =
  'Two ways a CDC tool reads the source. Left, scan the rows: the tool iterates a table from top to bottom; a row deleted between two scans is never seen, so the delete is missed. Right, tail the log: the database appends every commit to its log (c1 to c6); the tool reads the log and remembers its checkpoint, here after c4. c5 and c6 belong to one transaction, written to the log together at commit. Which way you get depends on what the database exposes.';

function ScanPanel({ id }: { id: string }) {
  return (
    <g>
      <Label anchor="start" x={60} y={22}>iterate rows, top to bottom</Label>
      <Arrow pts={[[36, 60], [36, 168]]} tone="blue" seed={`${id}-it`} />
      <MiniTable x={60} y={34} cols={[{ name: 'id', w: 50 }, { name: 'title', w: 130 }]}
        rows={[['1', 'day zero'], ['2', 'cdc'], ['3', 'kafka'], ['4', 'spark'], ['5', 'redis']]} strike={3} seed={`${id}-tbl`} />
      <Label tone="red" x={150} y={206}>a delete between scans</Label>
      <Label tone="red" x={150} y={223}>is missed</Label>
      <Label kind="title" x={150} y={262}>scan the rows</Label>
    </g>
  );
}

function LogPanel({ id }: { id: string }) {
  return (
    <g>
      <Cyl cx={62} top={22} rx={32} ry={8} h={42} seed={`${id}-db`} />
      <Label kind="mono" anchor="start" x={70} y={96} size={13}>log</Label>
      <Line pts={[[62, 80], [62, 104]]} weight="thin" seed={`${id}-att`} />
      <Box x={142} y={30} w={76} h={34} label="cdc" seed={`${id}-cdc`} />
      <Arrow pts={[[180, 64], [180, 102]]} dashed seed={`${id}-reads`} />
      <Label anchor="start" x={188} y={88}>reads</Label>
      <LogStrip x={20} y={104} w={240} h={22} cells={6} labels={['c1', 'c2', 'c3', 'c4', 'c5', 'c6']} caret={3} seed={`${id}-log`} size={13} />
      <Line pts={[[184, 132], [184, 140], [256, 140], [256, 132]]} seed={`${id}-tx`} />
      <Label anchor="end" x={292} y={180}>one transaction,</Label>
      <Label anchor="end" x={292} y={197}>written at commit</Label>
      <Label kind="title" x={150} y={262}>tail the log</Label>
    </g>
  );
}

export function TwoWays({ layout = 'desk' }: { layout?: Layout }) {
  const title = 'Two ways to read the source';
  if (layout === 'phone')
    return (
      <Fig id="f1d-p" w={300} h={606} title={title} desc={DESC_1D}>
        <ScanPanel id="f1d-p1" />
        <Line pts={[[10, 280], [290, 280]]} weight="thin" dotted seed="f1d-p-sep" className="faint" />
        <g transform="translate(0 292)"><LogPanel id="f1d-p2" /></g>
        <Label x={150} y={578}>which one you get depends on</Label>
        <Label x={150} y={596}>what the database exposes</Label>
      </Fig>
    );
  return (
    <Fig id="f1d" w={640} h={300} title={title} desc={DESC_1D}>
      <g transform="translate(6 0)"><ScanPanel id="f1d-1" /></g>
      <Line pts={[[320, 14], [320, 250]]} weight="thin" dotted seed="f1d-sep" className="faint" />
      <g transform="translate(334 0)"><LogPanel id="f1d-2" /></g>
      <Label x={320} y={292}>which one you get depends on what the database exposes</Label>
    </Fig>
  );
}
