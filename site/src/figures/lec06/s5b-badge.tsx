// Lecture 08 (lec06), §5.4–5.6 figures (writer w4), plus the D-13 drawing shared with §6.
//  RuleBox sketch §5 SourceOrSet      big messages cylinder with a long arrow vs a tiny set with a short one
//  Fig 5·e GetClear    "Get and clear" (D-10 redraw, board 02:26–02:28, frame b_022800)
//  Fig 5·f WhoKnows    "Who knows a message wasn't delivered" (D-11 + D-12 redraw, frames b_022942, b_023142)
//  Fig 5·g / 6·c Paths "Read path, write path" (D-13 redraw, frames b_023215 and, with `aux`, b_024045)
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fleet, Label, Line, Pipe, Worker } from '../kit/Kit';
import { Fig } from './floor';
import { Code } from './s1-images-parts';
import { Cluster } from './s5a-badge-parts';

type Layout = { layout?: 'wide' | 'phone' };

/* ------------------------------------------------------------------ rule sketch §5 */

export function SourceOrSet({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'rule5-p' : 'rule5';
  const s = (k: string) => `${id}-${k}`;
  const desc = 'Two ways to get the badge. Left: query the source of truth, a big messages table, along a long arrow: exact, but expensive. Right: read a tiny pre-computed set of senders along a short arrow: cheap, but now you must keep it updated.';
  if (P) {
    return (
      <Fig id={id} w={320} h={300} title="Source of truth or pre-computed" desc={desc}>
        <Arrow tone="blue" pts={[[14, 66], [196, 66]]} seed={s('long')} />
        <Cyl cx={250} top={30} rx={40} ry={9} h={62} seed={s('msgs')} label="messages" />
        <Label x={130} y={150} size={14}>exact, expensive</Label>
        <Label muted x={160} y={182} size={14}>or</Label>
        <Arrow tone="blue" pts={[[90, 232], [140, 232]]} seed={s('short')} />
        <Label kind="mono" anchor="start" x={150} y={238} size={18}>{'{A, C, D}'}</Label>
        <Label x={160} y={280} size={14}>cheap, you keep it updated</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={480} h={170} title="Source of truth or pre-computed" desc={desc}>
      <Arrow tone="blue" pts={[[10, 66], [150, 66]]} seed={s('long')} />
      <Cyl cx={196} top={30} rx={40} ry={9} h={62} seed={s('msgs')} label="messages" />
      <Label x={120} y={156} size={14}>exact, expensive</Label>
      <Label muted x={268} y={72} size={14}>or</Label>
      <Arrow tone="blue" pts={[[306, 66], [346, 66]]} seed={s('short')} />
      <Label kind="mono" anchor="start" x={354} y={72} size={18}>{'{A, C, D}'}</Label>
      <Label x={392} y={156} size={14}>cheap, you keep it updated</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·e */

export function GetClear({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig5e-p' : 'fig5e';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Get and clear';
  const desc = 'The read path and the trivial write path. The user’s app calls getStatus, and the status API asks Redis for the size of the user’s set (SCARD B) and returns it for the badge. A tap on the icon calls clear, and the status API deletes the user’s key (DEL B). Redis is a key-value store whose value is a set.';
  if (P) {
    return (
      <Fig id={id} w={340} h={356} title={title} desc={desc}>
        <Actor x={85} y={14} seed={s('u')} />
        <Arrow tone="blue" pts={[[72, 80], [72, 140]]} seed={s('get')} />
        <Label kind="mono" anchor="end" x={64} y={116}>getStatus</Label>
        <Arrow tone="blue" pts={[[100, 80], [100, 140]]} seed={s('clr')} />
        <Label kind="mono" anchor="start" x={108} y={116}>clear</Label>
        <Box x={14} y={142} w={150} h={46} label="status api" seed={s('api')} />
        <Arrow tone="blue" pts={[[72, 188], [72, 246]]} seed={s('scard')} />
        <Label kind="mono" anchor="end" x={64} y={222}>SCARD B</Label>
        <Arrow tone="blue" pts={[[100, 188], [100, 246]]} seed={s('del')} />
        <Label kind="mono" anchor="start" x={108} y={222}>DEL B</Label>
        <Cyl cx={86} top={252} rx={36} ry={8} h={48} seed={s('redis')} label="redis" />
        <Label anchor="start" x={148} y={282} size={14}>k/v store</Label>
        <Label anchor="start" x={148} y={302} size={14}>value is a set</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={620} h={176} title={title} desc={desc}>
      <Actor x={50} y={56} seed={s('u')} />
      <Arrow tone="blue" pts={[[72, 74], [196, 74]]} seed={s('get')} />
      <Label kind="mono" x={134} y={64}>getStatus</Label>
      <Arrow tone="blue" pts={[[72, 104], [196, 104]]} seed={s('clr')} />
      <Label kind="mono" x={134} y={126}>clear</Label>
      <Box x={200} y={64} w={140} h={50} label="status api" seed={s('api')} />
      <Arrow tone="blue" pts={[[342, 74], [462, 74]]} seed={s('scard')} />
      <Label kind="mono" x={402} y={64}>SCARD B</Label>
      <Arrow tone="blue" pts={[[342, 104], [462, 104]]} seed={s('del')} />
      <Label kind="mono" x={402} y={126}>DEL B</Label>
      <Cyl cx={504} top={58} rx={38} ry={9} h={50} seed={s('redis')} label="redis" />
      <Label x={504} y={164} size={14}>k/v store · value is a set</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·f */

const EVENT = ['{ src: "C", dest: "B",', '  msg: "…" }'];

export function WhoKnows({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig5f-p' : 'fig5f';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Who knows a message wasn’t delivered';
  const desc = 'Users C and B each hold a WebSocket to the messaging service, which stores chats in a partitioned chat database. Because every persistent connection ends at its servers, the messaging service knows whether B is connected and on which tab; it can also ask an online/offline service. When a message can’t be delivered in real time, it publishes an ON_MSG_UNSENT event, an umbrella for every case that should bump the badge, carrying src C, dest B and the message. That stream becomes the input to the badge system.';
  if (P) {
    return (
      <Fig id={id} w={340} h={548} title={title} desc={desc}>
        <Box x={100} y={8} w={190} h={34} label="online/offline svc" seed={s('oo')} labelSize={13} />
        <Line weight="thin" pts={[[180, 44], [180, 86]]} seed={s('ool')} />
        <Label anchor="start" x={188} y={70} size={13.5}>or ask this</Label>
        <Fleet x={100} y={100} w={170} h={46} n={3} label="messaging svc" countLabel={false} seed={s('ms')} size={13} />
        <Actor x={30} y={78} s={0.85} seed={s('c')} />
        <Label anchor="start" x={6} y={78} size={14}>C</Label>
        <Actor x={30} y={168} s={0.85} seed={s('b')} />
        <Label anchor="start" x={6} y={168} size={14}>B</Label>
        <Line pts={[[44, 100], [70, 100], [70, 116], [98, 116]]} seed={s('wc')} />
        <Line pts={[[44, 190], [70, 190], [70, 136], [98, 136]]} seed={s('wb')} />
        <Label kind="mono" anchor="start" x={76} y={170} size={13}>ws</Label>
        <Label anchor="start" x={6} y={238} size={13.5}>knows if B</Label>
        <Label anchor="start" x={6} y={256} size={13.5}>is connected</Label>
        <Line pts={[[236, 148], [236, 196]]} seed={s('db')} />
        <Cluster x={188} y={204} label="partitioned chat db" seed={s('cl')} size={13} />
        <Arrow tone="blue" dashed pts={[[140, 148], [140, 324]]} seed={s('pub')} />
        <Pipe x={14} cy={340} w={312} ry={14} seed={s('k')} />
        <Label kind="mono" x={170} y={346}>ON_MSG_UNSENT</Label>
        <Label x={170} y={386} size={14}>umbrella event: offline, other tab, …</Label>
        <Code x={14} y={404} w={312} lines={EVENT} seed={s('ev')} size={14} />
        <Label x={170} y={490} size={14}>each event: who sent what to whom</Label>
        <Label x={170} y={516} size={14}>becomes the input to our system</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={880} h={352} title={title} desc={desc}>
      <Box x={250} y={8} w={190} h={36} label="online/offline svc" seed={s('oo')} />
      <Line weight="thin" pts={[[330, 46], [330, 84]]} seed={s('ool')} />
      <Label anchor="start" x={340} y={70} size={14}>or ask this</Label>
      <Actor x={56} y={64} seed={s('c')} />
      <Label anchor="start" x={22} y={70} size={15}>C</Label>
      <Actor x={56} y={176} seed={s('b')} />
      <Label anchor="start" x={22} y={182} size={15}>B</Label>
      <Line pts={[[76, 92], [160, 92], [160, 118], [246, 118]]} seed={s('wc')} />
      <Label kind="mono" x={118} y={84}>ws</Label>
      <Line pts={[[76, 204], [160, 204], [160, 144], [246, 144]]} seed={s('wb')} />
      <Label kind="mono" x={118} y={196}>ws</Label>
      {/* critic C-16: the note sits below B, clear of B's legs and the ws line */}
      <Label anchor="start" x={22} y={254} size={14}>knows if B</Label>
      <Label anchor="start" x={22} y={272} size={14}>is connected</Label>
      <Fleet x={250} y={104} w={170} h={50} n={3} label="messaging svc" countLabel={false} seed={s('ms')} />
      <Line pts={[[450, 128], [598, 128]]} seed={s('db')} />
      <Cluster x={606} y={96} label="partitioned chat db" seed={s('cl')} />
      <Arrow tone="blue" dashed pts={[[335, 156], [335, 236]]} seed={s('pub')} />
      <Label anchor="start" x={345} y={206} size={14}>publishes</Label>
      <Pipe x={190} cy={252} w={290} ry={14} seed={s('k')} />
      <Label kind="mono" x={335} y={258}>ON_MSG_UNSENT</Label>
      <Label x={335} y={294} size={14}>umbrella event: offline, other tab, …</Label>
      <Code x={530} y={228} w={300} lines={EVENT} seed={s('ev')} size={14} />
      <Label x={680} y={306} size={14}>each event: who sent what to whom</Label>
      <Label x={680} y={330} size={14}>becomes the input to our system</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·g and 6·c */

export function Paths({ layout = 'wide', aux = false }: Layout & { aux?: boolean }) {
  const P = layout === 'phone';
  const id = (aux ? 'fig6c' : 'fig5g') + (P ? '-p' : '');
  const s = (k: string) => `${id}-${k}`;
  const title = aux ? 'With the auxiliary Redis' : 'Read path, write path';
  const desc = aux
    ? 'The full design. Read path: get_status and clean_status go through the status check API to the Redis cluster, where B’s set is {C, D}. Write path: status update workers pull ON_MSG_UNSENT events and first check a small auxiliary Redis that holds one existence key per pair, B_C : true and B_D : true. Only when the pair is new do they write to the main cluster. A clear deletes in both stores. The same stream also feeds the notification system.'
    : 'Read path: the user’s app calls get_status and clean_status on a status check API, which reads or deletes the user’s set in a Redis cluster, where B’s set is {C, D}. Write path: the messaging service’s ON_MSG_UNSENT events are pulled by status update workers, which add the sender to the recipient’s set (SADD B C). The same stream also feeds the notification system. A note by the workers: they can batch writes if the stream is partitioned by recipient.';
  if (P) {
    return (
      // critic C-08: every note sits on what it labels: the set beside the cluster, the batching note and the
      // workers' name beside the worker stack, the aux check on its own arrow from the workers' bus. The clear is
      // said at the aux store instead of drawn down the page edge (C-16); the notification system pulls (C-19).
      <Fig id={id} w={340} h={aux ? 614 : 580} title={title} desc={desc}>
        <Label anchor="start" x={10} y={24} size={15}>read path</Label>
        <Actor x={30} y={44} seed={s('u')} />
        <Arrow tone="blue" pts={[[48, 64], [146, 64]]} seed={s('get')} />
        <Label kind="mono" x={97} y={56} size={12.5}>get_status</Label>
        <Arrow tone="blue" pts={[[48, 90], [146, 90]]} seed={s('cln')} />
        <Label kind="mono" x={97} y={108} size={12.5}>clean_status</Label>
        <Fleet x={150} y={52} w={150} h={48} n={3} label="status check api" countLabel={false} seed={s('api')} size={12.5} />
        <Arrow tone="blue" pts={[[225, 102], [225, 140]]} seed={s('rd')} />
        <Cluster x={177} y={152} label="redis cluster" seed={s('cl')} />
        <Label kind="mono" anchor="end" x={174} y={194}>B : {'{'}C, D{'}'}</Label>

        <Label anchor="start" x={10} y={280} size={15}>write path</Label>
        <Pipe x={10} cy={316} w={150} ry={13} seed={s('k')} />
        <Label kind="mono" x={85} y={350} size={13}>ON_MSG_UNSENT</Label>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Worker x={195} y={298 + i * 44} w={130} h={32} label="worker" size={13} seed={s('w' + i)} />
            <Line pts={[[195, 314 + i * 44], [182, 314 + i * 44]]} seed={s('wl' + i)} />
          </g>
        ))}
        <Line pts={[[182, 314], [182, 402]]} seed={s('bus')} />
        <Arrow pts={[[182, 316], [164, 316]]} seed={s('pull')} />
        <Arrow tone="blue" pts={[[300, 298], [300, 166], [276, 166]]} seed={s('sadd')} />
        <Label kind="mono" x={250} y={266} size={13}>SADD B C</Label>
        <Arrow pts={[[22, 390], [22, 331]]} seed={s('nl')} />
        <Label anchor="start" x={30} y={374} size={13.5}>pulls</Label>
        {/* critic C-25: the name sits on two lines so it doesn't fill the box edge to edge */}
        <Box x={10} y={392} w={150} h={46} seed={s('ns')} />
        <Label kind="mono" x={85} y={411} size={13}>notification</Label>
        <Label kind="mono" x={85} y={428} size={13}>system</Label>
        <Label anchor="start" x={196} y={440} size={13.5}>status update</Label>
        <Label anchor="start" x={196} y={457} size={13.5}>workers</Label>
        <Label anchor="start" muted x={196} y={480} size={13.5}>can batch? if</Label>
        <Label anchor="start" muted x={196} y={497} size={13.5}>partitioned</Label>
        <Label anchor="start" muted x={196} y={514} size={13.5}>by recipient</Label>
        {aux ? (
          <g>
            <Line pts={[[182, 402], [182, 490]]} seed={s('axv')} />
            <Arrow tone="blue" pts={[[182, 490], [126, 490]]} seed={s('ax')} />
            <Label kind="mono" x={154} y={482} size={13}>check</Label>
            <Cyl cx={90} top={470} rx={32} ry={8} h={34} seed={s('aux')} />
            <Label kind="mono" x={90} y={532}>auxiliary redis</Label>
            <Label kind="mono" x={90} y={554} size={13}>B_C : true</Label>
            <Label kind="mono" x={90} y={573} size={13}>B_D : true</Label>
            <Label x={90} y={596} size={13.5}>a clear deletes here too</Label>
          </g>
        ) : (
          <g>
            <Label x={170} y={548} size={14}>workers update the users in Redis</Label>
            <Label x={170} y={568} size={14}>as events arrive</Label>
          </g>
        )}
      </Fig>
    );
  }
  return (
    <Fig id={id} w={880} h={aux ? 456 : 390} title={title} desc={desc}>
      <Label anchor="start" x={30} y={30} size={15}>read path</Label>
      <Actor x={44} y={58} seed={s('u')} />
      <Arrow tone="blue" pts={[[66, 76], [216, 76]]} seed={s('get')} />
      <Label kind="mono" x={140} y={68}>get_status</Label>
      <Arrow tone="blue" pts={[[66, 104], [216, 104]]} seed={s('cln')} />
      <Label kind="mono" x={140} y={124}>clean_status</Label>
      <Fleet x={220} y={64} w={190} h={54} n={3} label="status check api" countLabel={false} seed={s('api')} />
      <Arrow tone="blue" pts={[[442, 90], [646, 90]]} seed={s('rd')} />
      <Cluster x={650} y={60} seed={s('cl')} />
      <Label kind="mono" anchor="start" x={758} y={84}>redis cluster</Label>
      <Label kind="mono" anchor="start" x={758} y={110}>B : {'{'}C, D{'}'}</Label>

      <Label anchor="start" x={30} y={196} size={15}>write path</Label>
      <Pipe x={40} cy={262} w={200} ry={14} seed={s('k')} />
      <Label kind="mono" x={140} y={296}>ON_MSG_UNSENT</Label>
      <Label x={390} y={190} size={14}>can batch? (if partitioned by recipient)</Label>
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Worker x={330} y={208 + i * 50} w={120} h={34} label="worker" seed={s('w' + i)} />
          <Line pts={[[330, 225 + i * 50], [292, 225 + i * 50]]} seed={s('wl' + i)} />
          <Line pts={[[450, 225 + i * 50], [490, 225 + i * 50]]} seed={s('wr' + i)} />
        </g>
      ))}
      <Line pts={[[292, 225], [292, 325]]} seed={s('busl')} />
      <Arrow pts={[[292, 262], [244, 262]]} seed={s('pull')} />
      <Label x={390} y={366} size={14}>status update workers</Label>
      <Line pts={[[490, 225], [490, 325]]} seed={s('busr')} />
      <Arrow tone="blue" pts={[[490, 262], [698, 262], [698, 130]]} seed={s('sadd')} />
      <Label kind="mono" x={aux ? 548 : 594} y={252}>SADD B C</Label>
      {/* critic C-19: the notification system pulls from the stream, as the consumers of Fig 4·g do */}
      <Arrow pts={[[60, 330], [60, 279]]} seed={s('nl')} />
      <Label anchor="start" x={68} y={316} size={13.5}>pulls</Label>
      <Box x={20} y={332} w={190} h={36} label="notification system" seed={s('ns')} />
      {aux ? (
        <g>
          <Arrow tone="blue" pts={[[490, 325], [490, 396], [574, 396]]} seed={s('ax')} />
          <Label kind="mono" x={532} y={388} size={13.5}>check</Label>
          <Cyl cx={612} top={372} rx={34} ry={8} h={38} seed={s('aux')} label="auxiliary redis" />
          <Label kind="mono" anchor="start" x={672} y={392}>B_C : true</Label>
          <Label kind="mono" anchor="start" x={672} y={414}>B_D : true</Label>
          {/* critic C-16: the api → aux clear line crossed the SADD route; the clear is noted at the aux store */}
          <Label anchor="start" x={672} y={368} size={13.5}>a clear deletes here too</Label>
          <Label x={428} y={446} size={14}>checks here, writes there</Label>
        </g>
      ) : (
        <g>
          <Label x={740} y={318} size={14}>workers update the users</Label>
          <Label x={740} y={338} size={14}>in Redis as events arrive</Label>
        </g>
      )}
    </Fig>
  );
}
