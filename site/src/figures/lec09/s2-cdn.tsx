// Lecture 07 (lec09), chapter 2 "A CDN as a black box" (writer w1).
// LectureMarks (this lecture's glyphs, under the course NotationKey; desk 640 / phone 340), Fig 2·a "Without a CDN"
// (new; desk 880 / phone 340), Fig 2·b (D-02 plain copy; one layout, 360), rule-box sketch §2 (D-02 shrunk, 480),
// Fig 2·c (D-02 copy with addresses, step-through; desk 420 / phone 340), Fig 2·d "The URL rewrite" (new; desk 720 /
// phone 340). The CDN always pulls: its arrow to the origin starts at the CDN; nothing is drawn pushing into it.
import React from 'react';
import { Actor, Arrow, Box, Bubble, Client, Cloud, Disk, Fig, Fleet, Label, Lifeline, Line, LoadBalancer, Num, Pipe, Step, TimeAxis } from './kit';
import { minTextFor } from './kit';
import { chamferRect } from '../kit/hand';
import { BandwidthBar, Bucket, CacheSlot, DnsBox, KeyTag, Paper, PhoneScreen, PhotoChip, Ring, TextBox, Tick } from './s2-cdn-parts';

type Layout = { layout?: 'desk' | 'phone' };
/** mono advance per character (Recursive MONO 1 = 0.6 em) */
const cw = (size: number) => size * 0.6;

/* ------------------------------------------------------------------ this lecture's marks */

export function LectureMarks({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-marks-p' : 'l09-marks';
  const s = (k: string) => `${id}-${k}`;
  const title = 'This lecture’s marks';
  const desc = 'Marks used in this lecture’s figures: a plain cloud is a CDN; a cloud with a bucket mark is an S3 or GCS bucket; a small filled rectangle is the photo’s bytes, drawn only where they actually travel; a tube with a name in capitals is a Kafka topic; stacked boxes are a fleet of workers; a tall rounded box is an app screen; a tag with a clock on a URL is its signature and expiry.';
  const items = (pos: [number, number][], ly: number[]) => {
    const [c, b, p, k, f, ph, t] = pos;
    return (
      <g>
        <Cloud cx={c[0]} cy={c[1]} w={84} h={50} label="cdn" seed={s('cdn')} />
        <Label x={c[0]} y={ly[0]}>cdn</Label>
        <Bucket cx={b[0]} cy={b[1]} w={84} h={52} seed={s('s3')} />
        <Label x={b[0]} y={ly[1]}>s3 / gcs bucket</Label>
        <PhotoChip x={p[0] - 26} y={p[1] - 5} seed={s('chip')} />
        <Label kind="mono" anchor="start" x={p[0] - 6} y={p[1] + 5}>5 MB</Label>
        <Label x={p[0]} y={ly[2]}>the photo’s bytes</Label>
        <Label kind="mono" x={k[0]} y={k[1] - 22} size={13}>POST_HASHTAG</Label>
        <Pipe x={k[0] - 60} cy={k[1]} w={120} ry={12} seed={s('pipe')} />
        <Label x={k[0]} y={ly[3]}>kafka topic</Label>
        <Fleet x={f[0] - 40} y={f[1] - 8} w={64} h={26} n={3} label="worker" size={12.5} countLabel={false} seed={s('fleet')} />
        <Label x={f[0]} y={ly[4]}>fleet of workers</Label>
        <PhoneScreen x={ph[0] - 15} y={ph[1] - 28} seed={s('phone')} />
        <Label x={ph[0]} y={ly[5]}>app screen</Label>
        <KeyTag x={t[0] - 72} y={t[1] - 11} w={126} text="…?oh=…&oe=…" seed={s('tag')} />
        <Label x={t[0]} y={ly[6]}>URL signature + expiry</Label>
      </g>
    );
  };
  if (P)
    return (
      <Fig id={id} w={340} h={404} title={title} desc={desc}>
        {items(
          [[85, 40], [255, 40], [85, 150], [255, 150], [85, 260], [255, 250], [160, 346]],
          [90, 90, 186, 186, 298, 298, 390],
        )}
      </Fig>
    );
  return (
    <Fig id={id} w={640} h={226} title={title} desc={desc}>
      {items(
        [[70, 50], [215, 50], [355, 50], [525, 54], [100, 160], [270, 156], [450, 160]],
        [100, 100, 100, 100, 210, 210, 210],
      )}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·a */

export function WithoutCdn({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-f2a-p' : 'l09-f2a';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Without a CDN';
  const desc = 'The image URL resolves to the origin’s load balancer; an API server reads the 10 MB image from disk and sends it back from Singapore to a user in the US, spending its own network card, the one every API call also uses, on every view.';
  if (P)
    return (
      <Fig id={id} w={340} h={436} title={title} desc={desc}>
        <Actor x={40} y={40} seed={s('user')} />
        <Label x={40} y={108} size={13}>user (US)</Label>
        <DnsBox x={236} y={18} w={58} h={34} seed={s('dns')} />
        <Arrow tone="blue" weight="thin" pts={[[62, 30], [234, 30]]} seed={s('res')} />
        <Label x={148} y={22} size={13}>resolve</Label>
        <Arrow dashed weight="thin" pts={[[234, 46], [62, 46]]} seed={s('ip')} />
        <Label kind="mono" x={148} y={62} size={13}>IP of lb</Label>
        <Arrow tone="blue" pts={[[40, 118], [40, 212], [64, 212]]} seed={s('get')} />
        <Label kind="mono" tone="blue" anchor="start" x={54} y={136} size={13}>GET /system-design</Label>
        <Label kind="mono" tone="blue" anchor="start" x={54} y={152} size={13}>/logo.png</Label>
        <LoadBalancer x={66} y={188} h={52} seed={s('lb')} size={13} />
        <Arrow tone="blue" pts={[[92, 214], [148, 214]]} seed={s('fwd')} />
        <Label x={195} y={184} size={13}>Singapore</Label>
        <Box x={150} y={194} w={90} h={40} label="api" seed={s('api')} />
        <Arrow weight="thin" pts={[[195, 234], [195, 253]]} seed={s('read')} />
        <Disk cx={195} cy={266} w={46} h={22} seed={s('disk')} />
        <Label x={195} y={298} size={13}>image on disk</Label>
        <Label anchor="end" x={142} y={331} size={13}>network card</Label>
        <BandwidthBar x={150} y={322} w={84} fill={0.9} tone="red" seed={s('bw')} />
        <Label tone="red" x={170} y={356} size={13}>every image on the same card</Label>
        <Label tone="red" x={170} y={372} size={13}>as every API call</Label>
        <Arrow tone="green" pts={[[240, 212], [316, 212], [316, 72], [60, 72]]} seed={s('back')} />
        <PhotoChip x={309} y={136} tone="green" seed={s('chip')} />
        <Label kind="mono" anchor="end" x={302} y={146} size={13}>10 MB</Label>
        <Label x={170} y={402} size={13}>Singapore → US: slow</Label>
        <Label muted x={170} y={424} size={13}>“a crime”, in the lecture’s word</Label>
      </Fig>
    );
  return (
    <Fig id={id} w={880} h={300} title={title} desc={desc}>
      <Actor x={70} y={112} seed={s('user')} />
      <Label x={70} y={184}>user (US)</Label>
      <DnsBox x={196} y={24} w={58} h={34} seed={s('dns')} />
      <Arrow tone="blue" weight="thin" pts={[[70, 100], [70, 34], [194, 34]]} seed={s('res')} />
      <Label x={132} y={26} size={13}>resolve</Label>
      <Arrow dashed weight="thin" pts={[[196, 50], [86, 50], [86, 100]]} seed={s('ip')} />
      <Label kind="mono" anchor="start" x={96} y={72} size={13}>IP of lb</Label>
      <Arrow tone="blue" pts={[[92, 130], [466, 130]]} seed={s('get')} />
      <Label kind="mono" tone="blue" x={278} y={121} size={13}>GET /system-design/logo.png</Label>
      <LoadBalancer x={468} y={98} h={66} seed={s('lb')} />
      <Arrow tone="blue" pts={[[492, 130], [558, 130]]} seed={s('fwd')} />
      <Label x={540} y={66}>Singapore</Label>
      <Box x={560} y={108} w={96} h={44} label="api" seed={s('api')} />
      <Arrow weight="thin" pts={[[614, 152], [614, 173]]} seed={s('read')} />
      <Disk cx={614} cy={186} w={46} h={22} seed={s('disk')} />
      <Label x={614} y={220} size={13}>image on disk</Label>
      <Label x={742} y={104} size={13}>network card</Label>
      <BandwidthBar x={700} y={116} w={84} fill={0.9} tone="red" seed={s('bw')} />
      <Label tone="red" x={772} y={152} size={13}>every image on the same card</Label>
      <Label tone="red" x={772} y={168} size={13}>as every API call</Label>
      <Arrow tone="green" pts={[[574, 152], [574, 262], [118, 262], [118, 162]]} seed={s('back')} />
      <PhotoChip x={330} y={257} tone="green" seed={s('chip')} />
      <Label kind="mono" anchor="start" x={352} y={252} size={13}>10 MB</Label>
      <Line weight="thin" pts={[[118, 280], [574, 280]]} seed={s('span')} />
      <Line weight="thin" pts={[[118, 275], [118, 285]]} seed={s('span-l')} />
      <Line weight="thin" pts={[[574, 275], [574, 285]]} seed={s('span-r')} />
      <Label x={346} y={296} size={13}>Singapore → US: slow</Label>
      <Label muted anchor="end" x={872} y={36} size={13}>“a crime”, in the lecture’s word</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b */

export function UserCdnOrigin() {
  const s = (k: string) => `l09-f2b-${k}`;
  return (
    <Fig id="l09-f2b" w={360} h={196} title="User, CDN, origin"
      desc="A CDN sits between the user and the origin. It answers from its cache, and only it ever calls the origin, on a miss; nobody pushes content into it.">
      <Bubble x={14} y={8} w={184} h={34} tail={[168, 88]} lines={['nobody pushes to me']} size={14} seed={s('bub')} />
      <Actor x={36} y={106} seed={s('user')} />
      <Label x={36} y={176} size={14}>user</Label>
      <Arrow tone="blue" pts={[[56, 116], [118, 116]]} seed={s('req')} />
      <Arrow tone="green" pts={[[118, 132], [56, 132]]} seed={s('rep')} />
      <Cloud cx={180} cy={120} w={120} h={64} label="cdn" seed={s('cdn')} />
      <CacheSlot x={196} y={132} w={24} h={14} seed={s('slot')} />
      <Label x={180} y={180} size={14}>cached copy</Label>
      <Arrow pts={[[242, 112], [288, 112]]} seed={s('pull')} />
      <Arrow tone="green" pts={[[288, 128], [242, 128]]} seed={s('orep')} />
      <Label anchor="end" x={356} y={84} size={14}>fetches on a miss</Label>
      <Box x={290} y={96} w={64} h={44} label="origin" seed={s('origin')} />
      <Label anchor="end" x={356} y={162} size={14}>S3 bucket, backend,</Label>
      <Label anchor="end" x={356} y={178} size={14}>anything</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §2 */

export function InBetween() {
  const s = (k: string) => `l09-r2-${k}`;
  return (
    <Fig id="l09-r2" w={320} h={136} title="Transparently in between"
      desc="A user, a CDN cloud and an origin box in a row. The only arrow runs from the CDN to the origin: the CDN pulls.">
      <Actor x={30} y={48} seed={s('user')} />
      <Label x={30} y={120} size={14}>user</Label>
      <Line pts={[[50, 76], [104, 76]]} seed={s('l')} />
      <Cloud cx={152} cy={76} w={92} h={58} label="cdn" seed={s('cdn')} />
      <Arrow pts={[[198, 76], [246, 76]]} seed={s('pull')} />
      <Label x={222} y={64} size={14}>pulls</Label>
      <Box x={248} y={56} w={66} h={40} label="origin" seed={s('origin')} />
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·c */

export function PropertyRequest({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-f2c-p' : 'l09-f2c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const BR = 64, DN = P ? 136 : 150, CD = P ? 214 : 240, OR = P ? 296 : 362;
  const H = P ? 560 : 566; // desk steps 4–5 sit 14 lower than the phone's, clear of step 3's note
  const NX = P ? 38 : 38;
  const ms = minTextFor(W); // mono size of URLs: >= 12px on screen
  const CX0 = P ? 70 : 160; // property card left
  const path = '/system-design/logo.png';
  return (
    <Fig id={id} w={W} h={H} title="One request through a CDN property"
      desc="Five steps. 1: the browser asks DNS for a.mycdn.net and gets the CDN provider’s IP. 2: it sends GET /system-design/logo.png to the CDN, which looks up the origin configured for the property a.mycdn.net, arpitbhayani.me. 3: the CDN swaps the host and keeps the path. 4: it fetches the same path from the origin, which answers as it always does. 5: the CDN caches the bytes and returns them to the browser.">
      {/* the property card */}
      <path className="ink shape" d={chamferRect(CX0, 8, W - 6 - CX0, 50, s('card'), 2)} />
      <Label x={(CX0 + W - 6) / 2} y={27} size={13}>CDN property</Label>
      <Line weight="thin" pts={[[CX0 + 6, 34], [W - 12, 34]]} seed={s('card-r')} />
      <Label kind="mono" x={(CX0 + W - 6) / 2} y={51} size={ms}>a.mycdn.net → arpitbhayani.me</Label>
      {/* lanes */}
      <Client x={BR - 22} y={76} w={44} h={32} seed={s('br')} />
      <Label x={BR} y={126} size={13}>browser</Label>
      <DnsBox x={DN - 27} y={76} w={54} h={32} seed={s('dns')} size={13} />
      <Cloud cx={CD} cy={92} w={P ? 66 : 76} h={40} label="cdn" seed={s('cdn')} size={13} />
      <Box x={OR - (P ? 37 : 38)} y={76} w={P ? 74 : 76} h={32} label="origin" seed={s('or')} labelSize={13} />
      {!P && <Label kind="mono" x={CD} y={128} size={ms}>a.mycdn.net</Label>}
      {!P && <Label kind="mono" x={OR} y={128} size={ms}>arpitbhayani.me</Label>}
      <Lifeline x={BR} y0={136} y1={H - 10} seed={s('l0')} />
      <Lifeline x={DN} y0={136} y1={H - 10} seed={s('l1')} />
      <Lifeline x={CD} y0={136} y1={H - 10} seed={s('l2')} />
      <Lifeline x={OR} y0={136} y1={H - 10} seed={s('l3')} />
      <TimeAxis x={P ? 8 : 10} y0={144} y1={H - 12} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={160} n={1} tone="blue" />
        <Paper x={68} y={144} w={98} h={16} seed={s('p1')} />
        <Label kind="mono" tone="blue" anchor="start" x={70} y={156} size={ms}>a.mycdn.net?</Label>
        <Arrow tone="blue" pts={[[BR, 164], [DN - 2, 180]]} seed={s('1a')} />
        <Arrow pts={[[DN, 196], [BR + 2, 212]]} seed={s('1b')} />
        <Paper x={70} y={220} w={66} h={16} seed={s('p1b')} />
        <Label kind="mono" anchor="start" x={72} y={232} size={ms}>CDN’s IP</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={262} n={2} tone="blue" />
        <Paper x={68} y={246} w={cw(ms) * 27 + 6} h={16} seed={s('p2')} />
        <Label kind="mono" tone="blue" anchor="start" x={70} y={258} size={ms}>GET {path}</Label>
        <Arrow tone="blue" pts={[[BR, 266], [CD - 4, 286]]} seed={s('2a')} />
        <Ring x={(CX0 + W - 6) / 2} y={46} rx={(W - 6 - CX0) / 2 - 4} ry={11} seed={s('2r')} />
      </Step>
      <Step n={3}>
        <Num x={NX} y={318} n={3} />
        {P ? (
          <g>
            <Paper x={94} y={302} w={244} h={92} seed={s('p3')} />
            <Label kind="mono" anchor="start" x={100} y={318} size={ms}>a.mycdn.net</Label>
            <Label kind="mono" anchor="start" x={100} y={337} size={ms}>{path}</Label>
            <TextBox x0={96} x1={100 + cw(ms) * 23 + 4} y={333} h={19} seed={s('3b1')} />
            <Label kind="mono" anchor="start" x={100} y={365} size={ms}>arpitbhayani.me</Label>
            <Label kind="mono" anchor="start" x={100} y={384} size={ms}>{path}</Label>
            <TextBox x0={96} x1={100 + cw(ms) * 23 + 4} y={380} h={19} seed={s('3b2')} />
            <Label x={298} y={357} size={13}>same path</Label>
          </g>
        ) : (
          <g>
            <Paper x={112} y={302} w={304} h={84} seed={s('p3')} />
            <Label kind="mono" anchor="start" x={118} y={322} size={ms}>a.mycdn.net</Label>
            <Label kind="mono" anchor="start" x={118 + cw(ms) * 11} y={322} size={ms}>{path}</Label>
            <TextBox x0={118 + cw(ms) * 11 - 4} x1={118 + cw(ms) * 34 + 4} y={318} h={19} seed={s('3b1')} />
            <Arrow weight="thin" pts={[[150, 330], [150, 344]]} seed={s('3sw')} />
            <Label kind="mono" anchor="start" x={118} y={358} size={ms}>arpitbhayani.me</Label>
            <Label kind="mono" anchor="start" x={118 + cw(ms) * 15} y={358} size={ms}>{path}</Label>
            <TextBox x0={118 + cw(ms) * 15 - 4} x1={118 + cw(ms) * 38 + 4} y={354} h={19} seed={s('3b2')} />
            <Label x={300} y={381} size={13}>same path</Label>
          </g>
        )}
      </Step>
      <Step n={4}>
        <Num x={NX} y={P ? 420 : 418} n={4} />
        <Paper x={W - 6 - cw(ms) * 27 - 4} y={P ? 400 : 400} w={cw(ms) * 27 + 6} h={16} seed={s('p4')} />
        <Label kind="mono" anchor="end" x={W - 6} y={P ? 412 : 412} size={ms}>GET {path}</Label>
        <Arrow pts={[[CD + 2, P ? 422 : 422], [OR - 2, P ? 436 : 438]]} seed={s('4a')} />
        <Arrow tone="green" pts={[[OR, P ? 452 : 456], [CD + 4, P ? 466 : 472]]} seed={s('4b')} />
        <PhotoChip x={(CD + OR) / 2 - 7} y={P ? 454 : 459} tone="green" seed={s('4c')} />
      </Step>
      <Step n={5}>
        <Num x={NX} y={P ? 494 : 500} n={5} tone="green" />
        <CacheSlot x={CD + 12} y={P ? 478 : 486} filled seed={s('5s')} />
        <Tick x={CD + 54} y={P ? 488 : 496} seed={s('5t')} />
        <Label anchor="start" x={CD + 64} y={P ? 492 : 500} size={13}>cached</Label>
        <Arrow tone="green" pts={[[CD - 2, P ? 506 : 514], [BR + 2, P ? 532 : 542]]} seed={s('5a')} />
        <PhotoChip x={(CD + BR) / 2 - 7} y={P ? 514 : 523} tone="green" seed={s('5c')} />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·d */

/** One URL segment: a hand box with a mono string. */
function Seg({ x, y, w, h, text, tone = 'ink', size, seed }: { x: number; y: number; w: number; h: number; text: string; tone?: 'ink' | 'blue'; size: number; seed: string }) {
  return (
    <g>
      <path className={`${tone} shape`} d={chamferRect(x, y, w, h, seed, 2)} />
      <Label kind="mono" tone={tone} anchor="start" x={x + 7} y={y + h / 2 + size * 0.36} size={size}>{text}</Label>
    </g>
  );
}

export function UrlRewrite({ layout = 'desk' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'l09-f2d-p' : 'l09-f2d';
  const s = (k: string) => `${id}-${k}`;
  const title = 'The URL rewrite';
  const desc = 'The page asks for https://edge.arpitbhayani.me/img/arpit.png. On a miss the CDN fetches https://arpitbhayani.me/static/img/arpit.png: the CDN host is replaced by the configured origin, which here includes /static, and the path after it is carried over unchanged. It is string concatenation, fetch(origin + path).';
  if (P) {
    const m = minTextFor(340);
    const w1 = cw(m) * 28 + 14, w2 = cw(m) * 30 + 14, wp = cw(m) * 14 + 14; // host segments and the path
    const x1 = 14 + w1 - wp, x2 = 14 + w2 - wp; // each path sits under the end of its host
    return (
      <Fig id={id} w={340} h={312} title={title} desc={desc}>
        <Label anchor="start" x={16} y={22} size={13}>the page asks</Label>
        <Seg x={14} y={30} w={w1} h={24} text="https://edge.arpitbhayani.me" size={m} seed={s('h1')} />
        <Seg x={x1} y={60} w={wp} h={24} text="/img/arpit.png" tone="blue" size={m} seed={s('p1')} />
        <Label anchor="start" x={16} y={126} size={13}>the CDN fetches (miss)</Label>
        <Seg x={14} y={134} w={w2} h={24} text="https://arpitbhayani.me" size={m} seed={s('h2')} />
        <Label kind="mono" anchor="start" x={21 + cw(m) * 23} y={146 + m * 0.36} size={m}>/static</Label>
        <Line weight="thin" pts={[[19 + cw(m) * 23, 161], [19 + cw(m) * 23, 167], [23 + cw(m) * 30, 167], [23 + cw(m) * 30, 161]]} seed={s('br')} />
        <Seg x={x2} y={176} w={wp} h={24} text="/img/arpit.png" size={m} seed={s('p2')} />
        <Line dotted pts={[[x1 + wp + 2, 72], [304, 72], [304, 188], [x2 + wp + 2, 188]]} seed={s('con')} />
        <Label x={318} y={130} rotate={90} size={13}>unchanged</Label>
        <Label x={150} y={224} size={13}>origin path (/static),</Label>
        <Label x={150} y={241} size={13}>set once in the property</Label>
        <Label kind="mono" x={170} y={274} size={m}>fetch(origin + path)</Label>
        <Label x={170} y={298} size={13}>string concatenation, nothing more</Label>
      </Fig>
    );
  }
  const m = 14;
  return (
    <Fig id={id} w={720} h={234} title={title} desc={desc}>
      <Label anchor="start" x={20} y={60}>the page asks</Label>
      <Seg x={200} y={40} w={268} h={30} text="https://edge.arpitbhayani.me" size={m} seed={s('h1')} />
      <Seg x={468} y={40} w={134} h={30} text="/img/arpit.png" tone="blue" size={m} seed={s('p1')} />
      <Label anchor="start" x={20} y={140}>the CDN fetches (miss)</Label>
      <Seg x={200} y={120} w={268} h={30} text="https://arpitbhayani.me" size={m} seed={s('h2')} />
      <Label kind="mono" anchor="start" x={207 + cw(m) * 23} y={135 + m * 0.36} size={m}>/static</Label>
      <Seg x={468} y={120} w={134} h={30} text="/img/arpit.png" size={m} seed={s('p2')} />
      <Line dotted pts={[[535, 72], [535, 118]]} seed={s('con')} />
      <Label anchor="start" x={545} y={100} size={13}>unchanged</Label>
      <Label muted x={334} y={100} size={13}>host swapped</Label>
      <Line weight="thin" pts={[[205 + cw(m) * 23, 154], [205 + cw(m) * 23, 160], [209 + cw(m) * 30, 160], [209 + cw(m) * 30, 154]]} seed={s('br')} />
      <Label x={430} y={180} size={13}>origin path, set once in the property</Label>
      <Label kind="mono" anchor="start" x={200} y={218}>fetch(origin + path)</Label>
      <Label anchor="start" x={390} y={218} size={13}>string concatenation, nothing more</Label>
    </Fig>
  );
}
