// Lecture 05 (lec08), §5.4–5.7 One name, many LB servers, part b.
// Fig 5·c The finished load balancer (D-06 redraw, frames b_015105, b_030845): wide 880 + phone as two panels of 340
//   (request path, config path). The request path is the only blue line; the config path is dashed graphite with letters.
// Fig 5·d Base of the recursion (new): wide 640 + phone 340.
// Fig 5·e Public front door, private load balancer (new): wide 880 + phone 340.
// Arrowheads sit on the initiator: the orchestrator asks /health and queries Prometheus, Prometheus scrapes, the client looks up.
import React from 'react';
import { Actor, Arrow, Box, Cross, Cyl, Fig, Fleet, Label, Line, Mark, Num, Pipe } from '../kit/Kit';
import { LbServer, Orchestrator, TimeSeries } from './s3-one-laptop-parts';
import { DnsServer } from './s5a-dns';

/** The LB server fleet with its config-copy square on the front box. */
function LbFleet({ x, y, w, h, seed, size = 14 }: { x: number; y: number; w: number; h: number; seed: string; size?: number }) {
  return (
    <g>
      <Fleet x={x} y={y} w={w} h={h} n={3} label="LB servers" seed={seed} countLabel={false} size={size} />
      <Box x={x + w - 17} y={y + 5} w={11} h={11} seed={seed + '-copy'} />
    </g>
  );
}

/* ------------------------------------------------------------------ Fig 5·c */

const T5C = 'The finished load balancer';
const D5C =
  'The whole design with two traced paths. Request path, blue, numbered 1 to 5: the client looks up payments.lb.google.com in the private CoreDNS, gets 10.0.0.1 back, connects to that LB server, the LB server picks a backend by its strategy, and the response goes back to the client in green. Config path, dashed, lettered A to D: a developer through the LB console, autoscaling, or the orchestrator changes the config database; CDC carries the change to Redis Pub/Sub; Pub/Sub pushes it to every LB server; each LB server refreshes its in-memory config copy. Control lines, thin: the orchestrator sends health checks to the LB servers and the backends, queries Prometheus, and adds or removes LB IPs in CoreDNS; Prometheus scrapes the backends and feeds autoscaling, and autoscaling points into the LB console / APIs. The orchestrator runs with leader election (the board wrote leaderElec above it).';

export function FinishedDesign({ layout = 'wide' }: { layout?: 'wide' | 'request' | 'config' }) {
  if (layout === 'request') {
    const s = (k: string) => `f5c-r-${k}`;
    return (
      <Fig id="fig5c-r" w={340} h={378} title={`${T5C}: request path`} desc={D5C}>
        <Label muted anchor="start" x={14} y={20} size={14}>private infra</Label>
        <DnsServer x={14} y={30} w={120} h={38} seed={s('dns')} size={14} />
        <Arrow tone="blue" pts={[[34, 70], [34, 140]]} seed={s('2')} />
        <Num x={14} y={82} n={2} tone="blue" size={15} />
        <Label kind="mono" tone="blue" x={25} y={114} rotate={-90} size={14}>10.0.0.1</Label>
        <Arrow tone="blue" pts={[[90, 140], [90, 70]]} seed={s('1')} />
        <Num x={106} y={84} n={1} tone="blue" size={15} />
        <Label kind="mono" tone="blue" anchor="start" x={100} y={114} size={14}>payments.lb.google.com?</Label>
        <Actor x={62} y={152} seed={s('c')} />
        <Arrow tone="blue" pts={[[82, 172], [170, 172]]} seed={s('3')} />
        <Num x={126} y={156} n={3} tone="blue" size={15} />
        <Arrow tone="green" pts={[[170, 190], [84, 190]]} seed={s('5b')} />
        <LbFleet x={172} y={156} w={124} h={48} seed={s('lb')} size={14} />
        <Arrow tone="blue" pts={[[214, 204], [214, 296]]} seed={s('4')} />
        <Num x={198} y={252} n={4} tone="blue" size={15} />
        <Arrow tone="green" pts={[[262, 296], [262, 206]]} seed={s('5a')} />
        <Num x={278} y={252} n={5} tone="green" size={15} />
        <Box x={170} y={298} w={130} h={40} label="backend" seed={s('b')} labelSize={14} />
        <Label muted x={170} y={366} size={14}>(a) request path</Label>
      </Fig>
    );
  }
  if (layout === 'config') {
    const s = (k: string) => `f5c-k-${k}`;
    return (
      <Fig id="fig5c-k" w={340} h={420} title={`${T5C}: config path`} desc={D5C}>
        <Box x={4} y={30} w={110} h={34} label="orchestrator" seed={s('o')} labelSize={14} />
        <Box x={118} y={30} w={104} h={34} label="autoscaling" seed={s('as')} labelSize={14} />
        <Box x={228} y={30} w={106} h={34} label="lb console" seed={s('con')} labelSize={14} />
        <Label muted x={281} y={20} size={14}>developers</Label>
        <Arrow dashed pts={[[59, 64], [59, 126], [136, 126]]} seed={s('a1')} />
        <Arrow dashed pts={[[170, 64], [170, 108]]} seed={s('a2')} />
        <Arrow dashed pts={[[281, 64], [281, 126], [204, 126]]} seed={s('a3')} />
        <Num x={190} y={88} n="A" size={15} />
        <Cyl cx={170} top={110} rx={32} h={34} seed={s('db')} />
        <Label kind="mono" anchor="start" x={212} y={162} size={14}>config db</Label>
        <Arrow dashed pts={[[170, 156], [170, 198]]} seed={s('b')} />
        <Label kind="mono" anchor="end" x={160} y={182} size={14}>cdc</Label>
        <Num x={190} y={180} n="B" size={15} />
        <Pipe x={50} cy={214} w={200} ry={14} seed={s('pipe')} />
        <Label kind="mono" anchor="start" x={258} y={210} size={14}>redis</Label>
        <Label kind="mono" anchor="start" x={258} y={227} size={14}>pub/sub</Label>
        {[100, 150, 200].map((x, i) => <Arrow key={i} dashed pts={[[x, 229], [x, 268]]} seed={s(`c${i}`)} />)}
        <Num x={30} y={250} n="C" size={15} />
        <LbFleet x={60} y={300} w={150} h={48} seed={s('lb')} size={14} />
        <Num x={250} y={312} n="D" size={15} />
        <Label x={140} y={378} size={14}>each refreshes its config copy</Label>
        <Label muted x={170} y={408} size={14}>(b) config path</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f5c-${k}`;
  return (
    <Fig id="fig5c" w={880} h={560} title={T5C} desc={D5C}>
      {/* CoreDNS, top left */}
      <Label muted anchor="start" x={30} y={38} size={15}>private infra</Label>
      <DnsServer x={30} y={48} w={130} h={40} seed={s('dns')} size={15} />

      {/* clients */}
      <Actor x={64} y={214} seed={s('c1')} />
      <Actor x={64} y={318} seed={s('c2')} />

      {/* request path: blue, numbered. ① carries the name looked up, ② the IP that comes back */}
      <Arrow tone="blue" pts={[[40, 90], [40, 204]]} seed={s('r2')} />
      <Num x={22} y={104} n={2} tone="blue" size={15} />
      <Label kind="mono" tone="blue" x={30} y={156} rotate={-90} size={15}>10.0.0.1</Label>
      <Arrow tone="blue" pts={[[88, 204], [88, 90]]} seed={s('r1')} />
      <Num x={104} y={110} n={1} tone="blue" size={15} />
      <Label kind="mono" tone="blue" anchor="start" x={98} y={144} size={15}>payments.lb.google.com?</Label>
      <Arrow tone="blue" pts={[[82, 236], [298, 236]]} seed={s('r3')} />
      <Num x={190} y={222} n={3} tone="blue" size={15} />
      <Arrow tone="blue" pts={[[82, 340], [220, 340], [220, 262], [298, 262]]} seed={s('r3b')} />
      <Arrow tone="green" pts={[[298, 278], [240, 278], [240, 254], [84, 254]]} seed={s('r5b')} />
      <Num x={160} y={268} n={5} tone="green" size={15} />

      <LbFleet x={300} y={226} w={140} h={60} seed={s('lb')} size={15} />

      {/* backends */}
      <Box x={650} y={196} w={120} h={40} label="backend" seed={s('b1')} labelSize={15} />
      <Box x={650} y={262} w={120} h={40} label="backend" seed={s('b2')} labelSize={15} />
      <Arrow tone="blue" pts={[[440, 244], [600, 244], [600, 216], [648, 216]]} seed={s('r4')} />
      <Num x={520} y={232} n={4} tone="blue" size={15} />
      <Arrow tone="green" pts={[[648, 228], [612, 228], [612, 270], [442, 270]]} seed={s('r5a')} />
      <Num x={630} y={248} n={5} tone="green" size={15} />

      {/* orchestrator, top centre */}
      <Label x={560} y={60} size={15}>leader election</Label>
      <Orchestrator x={470} y={110} w={150} h={44} seed={s('o')} size={15} />

      {/* control lines: thin graphite */}
      <Arrow weight="thin" pts={[[470, 132], [380, 132], [380, 196]]} seed={s('hb1')} />
      <Label kind="mono" anchor="start" x={388} y={172} size={15}>hb</Label>
      <Arrow weight="thin" pts={[[600, 154], [600, 176], [710, 176], [710, 194]]} seed={s('hb2')} />
      <Label kind="mono" anchor="start" x={716} y={172} size={15}>hb</Label>
      <Arrow weight="thin" pts={[[470, 118], [250, 118], [250, 70], [162, 70]]} seed={s('dnsw')} />
      <Label anchor="start" x={256} y={96} size={15}>add / remove LB IPs</Label>
      <Arrow weight="thin" pts={[[648, 102], [768, 102]]} seed={s('q')} />
      <Label kind="mono" x={712} y={94} size={15}>query</Label>
      <TimeSeries cx={800} top={84} rx={30} h={36} seed={s('prom')} labelSize={15} />
      <Arrow weight="thin" pts={[[812, 170], [812, 282], [772, 282]]} seed={s('scr2')} />
      <Arrow weight="thin" pts={[[812, 216], [772, 216]]} seed={s('scr1')} />
      <Label kind="mono" x={812} y={316} size={15}>scrape</Label>
      <Arrow weight="thin" pts={[[830, 104], [858, 104], [858, 392], [812, 392]]} seed={s('as')} />

      {/* config path: dashed graphite, lettered */}
      <Arrow dashed pts={[[560, 154], [560, 352], [552, 352]]} seed={s('upd')} />
      <Label kind="mono" anchor="start" x={568} y={300} size={15}>updates</Label>
      <Cyl cx={520} top={336} rx={30} h={36} seed={s('db')} />
      <Label kind="mono" anchor="start" x={548} y={398} size={15}>config db</Label>
      <Arrow dashed pts={[[520, 450], [520, 392]]} seed={s('con')} />
      <Num x={538} y={428} n="A" size={15} />
      <Arrow dashed pts={[[488, 366], [434, 366]]} seed={s('cdc')} />
      <Label kind="mono" x={461} y={356} size={15}>cdc</Label>
      <Num x={461} y={386} n="B" size={15} />
      <Pipe x={280} cy={366} w={150} ry={15} seed={s('pipe')} />
      <Label kind="mono" x={355} y={404} size={15}>redis pub/sub</Label>
      {[330, 365, 400].map((x, i) => <Arrow key={i} dashed pts={[[x, 350], [x, 290]]} seed={s(`up${i}`)} />)}
      <Num x={290} y={320} n="C" size={15} />
      <Num x={480} y={196} n="D" size={15} />
      <Line pts={[[430, 232], [470, 204]]} weight="thin" seed={s('dlead')} />

      {/* console, developer, autoscaling */}
      <Box x={430} y={452} w={180} h={40} label="lb console / apis" seed={s('cons')} labelSize={15} />
      <Actor x={650} y={456} seed={s('dev')} />
      <Label x={650} y={522} size={15}>developer</Label>
      <Arrow pts={[[638, 476], [612, 476]]} seed={s('dev2')} />
      <Box x={680} y={372} w={130} h={40} label="autoscaling" seed={s('auto')} labelSize={15} />
      <Arrow pts={[[745, 412], [745, 436], [596, 436], [596, 450]]} seed={s('a2c')} />

      <Label x={440} y={548} size={15}>read: Maglev, a fast and reliable software network load balancer</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·d */

const T5D = 'Base of the recursion';
const D5D =
  'Three tiers. Top: a global monitor with a standby; its only job is to watch the master orchestrators. Middle: the orchestrator as one leader and two followers that do grunt work rather than sit idle. The leader sends health checks to the LB servers and the backends. All state lives in the config database, so followers copy nothing. The leader has failed (red outline, a cross at its corner), and a follower takes over as leader within one or two seconds and simply starts sending health checks.';

export function BaseOfRecursion({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f5d-p-${k}`;
    return (
      <Fig id="fig5d-p" w={340} h={404} title={T5D} desc={D5D}>
        <Label x={170} y={22} size={14}>tiny job: watch the masters</Label>
        <Box x={14} y={36} w={156} h={40} label="global monitor" seed={s('g')} labelSize={14} />
        <Mark a={[170, 56]} b={[190, 56]} weight="thin" dashed seed={s('gs')} />
        <Box x={190} y={36} w={110} h={40} label="standby" seed={s('st')} faint labelSize={14} />
        <Arrow weight="thin" pts={[[90, 76], [90, 146]]} seed={s('ghb')} />
        <Label kind="mono" anchor="start" x={96} y={116} size={14}>hb</Label>
        <Label tone="green" x={226} y={118} size={14}>takes over as leader in 1–2 s</Label>
        {[4, 116, 228].map((x, i) => (
          <g key={i}>
            {/* label + sub drawn here (Box's own sub line is 12.5, too small at phone width) */}
            <Box x={x} y={150} w={108} h={50} seed={s(`o${i}`)} tone={i === 0 ? 'red' : 'ink'} />
            <Label kind="mono" x={x + 54} y={180} size={14}>{i === 0 ? 'leader' : 'follower'}</Label>
          </g>
        ))}
        <Label muted anchor="end" x={336} y={140} size={14}>orchestrator ×3</Label>
        <Cross x={110} y={152} size={20} seed={s('x')} />
        <Label anchor="start" x={86} y={224} size={14}>followers do grunt work,</Label>
        <Label anchor="start" x={86} y={240} size={14}>not idle</Label>
        <Arrow dashed weight="thin" pts={[[280, 200], [280, 248]]} seed={s('db-l')} />
        <Cyl cx={280} top={250} rx={28} h={30} seed={s('db')} />
        <Label kind="mono" anchor="end" x={244} y={262} size={14}>config db</Label>
        <Label anchor="end" x={244} y={279} size={14}>all state lives here</Label>
        <Arrow weight="thin" pts={[[40, 200], [40, 308]]} seed={s('hb1')} />
        <Arrow weight="thin" pts={[[78, 200], [78, 296], [200, 296], [200, 306]]} seed={s('hb2')} />
        <Label kind="mono" anchor="end" x={72} y={262} size={14}>hb</Label>
        <Fleet x={10} y={338} w={124} h={38} n={3} label="LB servers" seed={s('lb')} countLabel={false} size={14} />
        <Fleet x={172} y={338} w={124} h={38} n={3} label="backends" seed={s('be')} countLabel={false} size={14} />
      </Fig>
    );
  }
  const s = (k: string) => `f5d-${k}`;
  const OX = [60, 210, 360];
  return (
    <Fig id="fig5d" w={640} h={372} title={T5D} desc={D5D}>
      <Label x={225} y={26}>tiny job: watch the masters</Label>
      <Box x={150} y={40} w={150} h={40} label="global monitor" seed={s('g')} />
      <Mark a={[300, 60]} b={[320, 60]} weight="thin" dashed seed={s('gs')} />
      <Box x={320} y={40} w={100} h={40} label="standby" seed={s('st')} faint />
      <Arrow weight="thin" pts={[[200, 80], [200, 120], [125, 120], [125, 146]]} seed={s('ghb')} />
      <Label kind="mono" anchor="start" x={206} y={110} size={13.5}>hb</Label>
      <Label tone="green" anchor="start" x={222} y={140} size={13.5}>takes over as leader in 1–2 s</Label>
      {OX.map((x, i) => (
        <Box key={i} x={x} y={160} w={130} h={54} label="orchestrator" sub={i === 0 ? 'leader' : 'follower'}
          seed={s(`o${i}`)} tone={i === 0 ? 'red' : 'ink'} />
      ))}
      <Cross x={188} y={162} size={22} seed={s('x')} />
      <Label x={350} y={234} size={13.5}>followers do grunt work, not idle</Label>

      <Arrow dashed weight="thin" pts={[[490, 187], [548, 187]]} seed={s('db-l')} />
      <Cyl cx={580} top={164} rx={30} h={40} seed={s('db')} label="config db" />
      <Label anchor="end" x={636} y={252} size={13.5}>all state lives here:</Label>
      <Label anchor="end" x={636} y={269} size={13.5}>followers copy nothing</Label>

      <Arrow weight="thin" pts={[[100, 214], [100, 280]]} seed={s('hb1')} />
      <Label kind="mono" anchor="end" x={94} y={254} size={13.5}>hb</Label>
      <Arrow weight="thin" pts={[[160, 214], [160, 256], [400, 256], [400, 280]]} seed={s('hb2')} />
      <Label kind="mono" anchor="start" x={406} y={274} size={13.5}>hb</Label>
      <Fleet x={60} y={310} w={140} h={40} n={3} label="LB servers" seed={s('lb')} countLabel={false} />
      <Fleet x={330} y={310} w={140} h={40} n={3} label="backends" seed={s('be')} countLabel={false} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 5·e */

const T5E = 'Public front door, private load balancer';
const D5E =
  'A user resolves payments.google.com through public DNS, which points to the API gateway’s IP, and connects to the gateway; often three or four more proxy layers sit in front of it, drawn ghosted. The gateway is public and the load balancer is private: a dashed line separates them. The gateway looks up payments.lb.google.com in the private CoreDNS and connects to the load balancer, which forwards to the backends.';

export function FrontDoor({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const s = (k: string) => `f5e-p-${k}`;
    return (
      <Fig id="fig5e-p" w={340} h={432} title={T5E} desc={D5E}>
        <Actor x={40} y={30} seed={s('u')} />
        <Arrow dashed pts={[[54, 40], [148, 40]]} seed={s('l1')} />
        <DnsServer x={150} y={20} w={150} h={36} label="public dns" seed={s('pd')} size={14} />
        <Label kind="mono" x={225} y={76} size={14}>payments.google.com</Label>
        <Label kind="mono" x={225} y={93} size={14}>→ gateway ip</Label>
        {[112, 128, 144].map((y, i) => <Box key={i} x={16} y={y} w={48} h={12} seed={s(`gh${i}`)} faint />)}
        <Label muted anchor="start" x={72} y={136} size={14}>often 3–4 more proxy layers</Label>
        <Arrow tone="blue" pts={[[40, 84], [40, 206], [108, 206]]} seed={s('u2g')} />
        <Box x={110} y={186} w={140} h={40} label="api gateway" seed={s('gw')} labelSize={14} />
        <Label anchor="start" x={258} y={202} size={14}>powered</Label>
        <Label anchor="start" x={258} y={218} size={14}>proxy</Label>
        <Line pts={[[6, 262], [334, 262]]} dashed weight="thin" seed={s('div')} />
        <Label anchor="start" x={10} y={254} size={14}>public</Label>
        <Label anchor="start" x={10} y={280} size={14}>private</Label>
        <Arrow dashed pts={[[240, 226], [240, 274]]} seed={s('l2')} />
        <DnsServer x={200} y={276} w={120} h={34} seed={s('cd')} size={14} />
        <Arrow tone="blue" pts={[[150, 226], [150, 352]]} seed={s('g2l')} />
        <LbServer x={60} y={354} w={130} h={40} seed={s('lb')} size={14} />
        <Label kind="mono" x={125} y={414} size={14}>payments.lb.google.com</Label>
        <Arrow tone="blue" pts={[[190, 378], [224, 378]]} seed={s('l2b')} />
        <Fleet x={226} y={362} w={80} h={34} n={3} label="backend" seed={s('be')} countLabel={false} size={14} />
      </Fig>
    );
  }
  const s = (k: string) => `f5e-${k}`;
  return (
    <Fig id="fig5e" w={880} h={250} title={T5E} desc={D5E}>
      <Actor x={40} y={130} seed={s('u')} />
      <Arrow dashed pts={[[40, 120], [40, 60], [108, 60]]} seed={s('l1')} />
      <Label muted anchor="start" x={48} y={96} size={15}>lookup</Label>
      <DnsServer x={110} y={40} w={150} h={40} label="public dns" seed={s('pd')} size={15} />
      <Label kind="mono" x={205} y={102} size={15}>payments.google.com</Label>
      <Label kind="mono" x={205} y={120} size={15}>→ gateway ip</Label>

      {[134, 150, 166].map((y, i) => <Box key={i} x={296} y={y} w={56} h={12} seed={s(`gh${i}`)} faint />)}
      <Label muted x={324} y={226} size={15}>often 3–4 more proxy layers</Label>
      <Arrow tone="blue" pts={[[56, 154], [388, 154]]} seed={s('u2g')} />

      <Box x={390} y={132} w={130} h={44} label="api gateway" seed={s('gw')} labelSize={15} />
      <Label x={455} y={196} size={15}>powered proxy</Label>

      <Line pts={[[560, 20], [560, 240]]} dashed weight="thin" seed={s('div')} />
      <Label anchor="end" x={552} y={30} size={15}>public</Label>
      <Label anchor="start" x={568} y={30} size={15}>private</Label>

      <Arrow dashed pts={[[500, 132], [500, 62], [618, 62]]} seed={s('l2')} />
      <Label muted anchor="start" x={508} y={100} size={15}>lookup</Label>
      <DnsServer x={620} y={42} w={120} h={40} seed={s('cd')} size={15} />
      <Arrow tone="blue" pts={[[520, 154], [608, 154]]} seed={s('g2l')} />
      <LbServer x={610} y={132} w={120} h={44} seed={s('lb')} size={15} />
      <Label kind="mono" x={670} y={196} size={15}>payments.lb.google.com</Label>
      <Arrow tone="blue" pts={[[730, 154], [774, 154]]} seed={s('l2b')} />
      <Fleet x={776} y={134} w={72} h={40} n={3} label="backend" seed={s('be')} countLabel={false} size={15} />
    </Fig>
  );
}
