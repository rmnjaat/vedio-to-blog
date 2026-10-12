// Lecture 01, §3.5. Fig 3·f "One event, two kinds of consumer" (D-11 bottom + D-12 merged),
// plus the poster (end state) of the clip l01-queue-vs-stream while the clip is pending.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Fleet, Label, Line, Pipe, Worker } from '../kit/Kit';

/** A message: a small square. */
function Msg({ x, y, seed, faint }: { x: number; y: number; seed: string; faint?: boolean }) {
  const s = 5;
  return <Line pts={[[x - s, y - s], [x + s, y - s], [x + s, y + s], [x - s, y + s], [x - s, y - s]]} className={faint ? 'shape faint' : 'shape'} seed={seed} />;
}

const TITLE = 'One event, two kinds of consumer';
const DESC = 'A reader publishes; the API server hands an ON_PUBLISH event to Kafka, which keeps five messages in its pipe. Two consumer types pull from it, each from its own position in the same messages (a dashed ask up to the pipe, the messages coming back down): the search service (three workers) indexes into Elasticsearch, and the counter service increments total_blogs in the database. Nobody deletes the messages; they stay until retention ends. Each team owns its own service.';

export function Fig3f({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const sq = [60, 110, 160, 210, 260];
    return (
      <Fig id="fig3f-p" w={340} h={424} title={TITLE} desc={DESC}>
        <Actor x={36} y={22} s={0.9} seed="f3f-p-reader" />
        <Arrow tone="blue" pts={[[56, 44], [108, 44]]} seed="f3f-p-a1" />
        <Box x={110} y={26} w={70} h={36} label="api" seed="f3f-p-api" />
        <Label anchor="start" x={198} y={38}>same event,</Label>
        <Label anchor="start" x={198} y={56}>two consumers</Label>
        <Arrow dashed pts={[[145, 62], [145, 108]]} seed="f3f-p-pub" />
        <Label kind="mono" anchor="start" x={155} y={92}>ON_PUBLISH</Label>
        <Label kind="mono" anchor="start" x={22} y={104}>kafka</Label>
        <Pipe x={20} cy={130} w={300} ry={16} seed="f3f-p-pipe" />
        {sq.map((x, i) => <Msg key={i} x={x} y={130} seed={`f3f-p-m${i}`} />)}
        {/* each consumer type pulls from its own position: dashed ask up to the pipe, blue messages back down */}
        <Arrow dashed pts={[[102, 184], [102, 148]]} seed="f3f-p-ask1" />
        <Arrow tone="blue" pts={[[118, 148], [118, 184]]} seed="f3f-p-get1" />
        <Arrow dashed pts={[[252, 212], [252, 148]]} seed="f3f-p-ask2" />
        <Arrow tone="blue" pts={[[268, 148], [268, 212]]} seed="f3f-p-get2" />
        <Label anchor="end" x={94} y={166}>pulls from</Label>
        <Label anchor="end" x={94} y={182}>own position</Label>
        <Label anchor="end" x={244} y={176}>own position</Label>
        <Fleet x={20} y={214} w={124} h={44} n={3} label="search service" seed="f3f-p-search" countLabel={false} size={14} />
        <Box x={184} y={214} w={140} h={44} label="counter service" seed="f3f-p-counter" labelSize={14} />
        <Arrow tone="blue" pts={[[82, 258], [82, 288]]} seed="f3f-p-a2" />
        <Arrow tone="blue" pts={[[254, 258], [254, 288]]} seed="f3f-p-a3" />
        <Cyl cx={82} top={296} rx={24} ry={6} h={34} label="es" seed="f3f-p-es" />
        <Cyl cx={254} top={296} rx={24} ry={6} h={34} label="db" seed="f3f-p-db" />
        <Label muted x={82} y={378}>search team’s code</Label>
        <Label muted x={254} y={378}>counter team’s code</Label>
        <Label x={170} y={410}>nobody deletes: kept until retention</Label>
      </Fig>
    );
  }
  const sq = [334, 384, 434, 484, 534];
  return (
    <Fig id="fig3f" w={760} h={400} title={TITLE} desc={DESC}>
      <Label x={444} y={34}>same event, two consumers</Label>
      <Actor x={40} y={70} seed="f3f-reader" />
      <Arrow tone="blue" pts={[[62, 95], [106, 95]]} seed="f3f-a1" />
      <Box x={108} y={76} w={80} h={38} label="api" seed="f3f-api" />
      <Arrow dashed pts={[[190, 95], [288, 95]]} seed="f3f-pub" />
      <Label kind="mono" x={239} y={84}>ON_PUBLISH</Label>
      <Label kind="mono" x={444} y={66}>kafka</Label>
      <Pipe x={294} cy={95} w={300} ry={16} seed="f3f-pipe" />
      {sq.map((x, i) => <Msg key={i} x={x} y={95} seed={`f3f-m${i}`} />)}
      <Label muted anchor="start" x={612} y={92}>nobody deletes:</Label>
      <Label muted anchor="start" x={612} y={110}>kept until retention</Label>
      {/* each consumer type pulls from its own position: dashed ask up to the pipe, blue messages back down */}
      <Arrow dashed pts={[[376, 184], [376, 113]]} seed="f3f-ask1" />
      <Arrow tone="blue" pts={[[392, 113], [392, 184]]} seed="f3f-get1" />
      <Arrow dashed pts={[[526, 212], [526, 113]]} seed="f3f-ask2" />
      <Arrow tone="blue" pts={[[542, 113], [542, 212]]} seed="f3f-get2" />
      <Label anchor="end" x={366} y={150}>pulls from its</Label>
      <Label anchor="end" x={366} y={168}>own position</Label>
      <Label anchor="start" x={552} y={150}>pulls from its</Label>
      <Label anchor="start" x={552} y={168}>own position</Label>
      <Fleet x={300} y={214} w={160} h={46} n={3} label="search service" seed="f3f-search" countLabel={false} />
      <Label muted anchor="end" x={292} y={242}>×3 workers</Label>
      <Box x={520} y={214} w={160} h={46} label="counter service" seed="f3f-counter" />
      <Arrow tone="blue" pts={[[380, 260], [380, 294]]} seed="f3f-a2" />
      <Label anchor="start" x={390} y={284}>index</Label>
      <Arrow tone="blue" pts={[[600, 260], [600, 294]]} seed="f3f-a3" />
      <Label kind="mono" anchor="start" x={610} y={284}>total_blogs++</Label>
      <Cyl cx={380} top={302} rx={26} ry={7} h={38} label="es" seed="f3f-es" />
      <Cyl cx={600} top={302} rx={26} ry={7} h={38} label="db" seed="f3f-db" />
      <Label muted x={380} y={390}>search team’s code</Label>
      <Label muted x={600} y={390}>counter team’s code</Label>
    </Fig>
  );
}

/* ---------------------------------------------------------------- poster for the pending clip l01-queue-vs-stream */

const P_TITLE = 'Clip poster: same messages, a queue and a stream';
const P_DESC = 'End state of the clip. Top: an SQS queue, now empty; each message went to one of three identical workers, which deleted it when done. Bottom: a Kafka stream still holding the messages; the search and counter consumers each reached the newest message at their own pace, search after Elasticsearch came back up. The two oldest messages fade out by retention, not because any consumer deleted them.';

export function QueueStreamPoster({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const sq = [60, 110, 160, 210, 260];
    return (
      <Fig id="qvs-poster-p" w={340} h={420} title={P_TITLE} desc={P_DESC}>
        <Label anchor="start" x={20} y={22}>queue (sqs)</Label>
        <Pipe x={20} cy={50} w={300} ry={14} seed="qp-p-q" />
        <Label muted x={170} y={55}>empty</Label>
        {[60, 170, 280].map((x, i) => <Arrow key={i} tone="blue" pts={[[x, 66], [x, 88]]} seed={`qp-p-qa${i}`} />)}
        {[8, 118, 228].map((x, i) => <Worker key={i} x={x} y={92} w={104} h={28} seed={`qp-p-w${i}`} />)}
        <Label tone="green" x={170} y={142}>each deleted when done</Label>
        <Label anchor="start" x={20} y={184}>stream (kafka)</Label>
        <Pipe x={20} cy={212} w={300} ry={14} seed="qp-p-s" />
        {sq.map((x, i) => <Msg key={i} x={x} y={212} faint={i < 2} seed={`qp-p-m${i}`} />)}
        <Line pts={[[254, 218], [254, 246], [84, 246], [84, 268]]} seed="qp-p-t1" />
        <Line pts={[[262, 218], [262, 268]]} seed="qp-p-t2" />
        <Worker x={20} y={270} w={128} h={28} label="search" seed="qp-p-search" />
        <Worker x={196} y={270} w={128} h={28} label="counter" seed="qp-p-counter" />
        <Arrow tone="blue" pts={[[84, 298], [84, 318]]} seed="qp-p-a" />
        <Cyl cx={84} top={324} rx={20} ry={5.5} h={26} label="es" seed="qp-p-es" />
        <Label tone="green" anchor="start" x={112} y={344}>back up</Label>
        <Label muted x={170} y={406}>old messages expire by retention</Label>
      </Fig>
    );
  }
  const sq = [180, 230, 280, 330, 380];
  return (
    <Fig id="qvs-poster" w={760} h={430} title={P_TITLE} desc={P_DESC}>
      <Label anchor="start" x={20} y={84}>queue (sqs)</Label>
      <Pipe x={140} cy={80} w={300} ry={16} seed="qp-q" />
      <Label muted x={290} y={85}>empty</Label>
      <Arrow tone="blue" pts={[[446, 80], [480, 80], [480, 44], [514, 44]]} seed="qp-qa0" />
      <Arrow tone="blue" pts={[[446, 80], [514, 80]]} seed="qp-qa1" />
      <Arrow tone="blue" pts={[[446, 80], [480, 80], [480, 116], [514, 116]]} seed="qp-qa2" />
      {[30, 66, 102].map((y, i) => <Worker key={i} x={518} y={y} w={110} h={28} seed={`qp-w${i}`} />)}
      <Label tone="green" x={290} y={126}>each deleted when done</Label>
      <Label anchor="start" x={20} y={244}>stream (kafka)</Label>
      <Pipe x={140} cy={240} w={300} ry={16} seed="qp-s" />
      {sq.map((x, i) => <Msg key={i} x={x} y={240} faint={i < 2} seed={`qp-m${i}`} />)}
      <Label muted x={205} y={210}>retention</Label>
      <Line pts={[[376, 246], [376, 290]]} seed="qp-t1" />
      <Line pts={[[384, 246], [384, 272], [490, 272], [490, 290]]} seed="qp-t2" />
      <Worker x={300} y={292} w={110} h={28} label="search" seed="qp-search" />
      <Worker x={436} y={292} w={110} h={28} label="counter" seed="qp-counter" />
      <Arrow tone="blue" pts={[[298, 306], [262, 306]]} seed="qp-a" />
      <Cyl cx={236} top={292} rx={20} ry={5.5} h={26} label="es" seed="qp-es" />
      <Label tone="green" x={236} y={282}>back up</Label>
      <Label muted anchor="start" x={572} y={300}>both at the</Label>
      <Label muted anchor="start" x={572} y={318}>newest message</Label>
      <Label muted x={290} y={370}>nobody deletes from a stream: old messages expire by retention</Label>
    </Fig>
  );
}
