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
        <Label kind="mono" tone="blue" anchor="start" x={54} y={136} size={13}>GET /A/1729.png</Label>
        
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
        <Label muted x={170} y={424} size={13}>wasted on a static file</Label>
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
      <Label kind="mono" tone="blue" x={278} y={121} size={13}>GET /A/1729.png</Label>
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
      <Label muted anchor="end" x={872} y={36} size={13}>wasted on a static file</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 2·b */

/* ------------------------------------------------------------------ rule-box sketch §2 */

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
  const path = '/A/1729.png';
  return (
    <Fig id={id} w={W} h={H} title="One request through a CDN property"
      desc="Five steps. 1: the browser asks DNS for instacdn.net and gets the CDN provider’s IP. 2: it sends GET /A/1729.png to the CDN, which looks up the origin configured for the property instacdn.net, instaimages.com. 3: the CDN swaps the host and keeps the path. 4: it fetches the same path from the origin, which answers as it always does. 5: the CDN caches the bytes and returns them to the browser.">
      {/* the property card */}
      <path className="ink shape" d={chamferRect(CX0, 8, W - 6 - CX0, 50, s('card'), 2)} />
      <Label x={(CX0 + W - 6) / 2} y={27} size={13}>CDN property</Label>
      <Line weight="thin" pts={[[CX0 + 6, 34], [W - 12, 34]]} seed={s('card-r')} />
      <Label kind="mono" x={(CX0 + W - 6) / 2} y={51} size={ms}>instacdn.net → instaimages.com</Label>
      {/* lanes */}
      <Client x={BR - 22} y={76} w={44} h={32} seed={s('br')} />
      <Label x={BR} y={126} size={13}>browser</Label>
      <DnsBox x={DN - 27} y={76} w={54} h={32} seed={s('dns')} size={13} />
      <Cloud cx={CD} cy={92} w={P ? 66 : 76} h={40} label="cdn" seed={s('cdn')} size={13} />
      <Box x={OR - (P ? 37 : 38)} y={76} w={P ? 74 : 76} h={32} label="origin" seed={s('or')} labelSize={13} />
      {!P && <Label kind="mono" x={CD} y={128} size={ms}>instacdn.net</Label>}
      {!P && <Label kind="mono" x={OR} y={128} size={ms}>instaimages.com</Label>}
      <Lifeline x={BR} y0={136} y1={H - 10} seed={s('l0')} />
      <Lifeline x={DN} y0={136} y1={H - 10} seed={s('l1')} />
      <Lifeline x={CD} y0={136} y1={H - 10} seed={s('l2')} />
      <Lifeline x={OR} y0={136} y1={H - 10} seed={s('l3')} />
      <TimeAxis x={P ? 8 : 10} y0={144} y1={H - 12} seed={s('t')} size={13} />

      <Step n={1}>
        <Num x={NX} y={160} n={1} tone="blue" />
        <Paper x={68} y={144} w={cw(ms) * 13 + 6} h={16} seed={s('p1')} />
        <Label kind="mono" tone="blue" anchor="start" x={70} y={156} size={ms}>instacdn.net?</Label>
        <Arrow tone="blue" pts={[[BR, 164], [DN - 2, 180]]} seed={s('1a')} />
        <Arrow pts={[[DN, 196], [BR + 2, 212]]} seed={s('1b')} />
        <Paper x={70} y={220} w={66} h={16} seed={s('p1b')} />
        <Label kind="mono" anchor="start" x={72} y={232} size={ms}>CDN’s IP</Label>
      </Step>
      <Step n={2}>
        <Num x={NX} y={262} n={2} tone="blue" />
        <Paper x={68} y={246} w={cw(ms) * 15 + 6} h={16} seed={s('p2')} />
        <Label kind="mono" tone="blue" anchor="start" x={70} y={258} size={ms}>GET {path}</Label>
        <Arrow tone="blue" pts={[[BR, 266], [CD - 4, 286]]} seed={s('2a')} />
        <Ring x={(CX0 + W - 6) / 2} y={46} rx={(W - 6 - CX0) / 2 - 4} ry={11} seed={s('2r')} />
      </Step>
      <Step n={3}>
        <Num x={NX} y={318} n={3} />
        {P ? (
          <g>
            <Paper x={94} y={302} w={244} h={92} seed={s('p3')} />
            <Label kind="mono" anchor="start" x={100} y={318} size={ms}>instacdn.net</Label>
            <Label kind="mono" anchor="start" x={100} y={337} size={ms}>{path}</Label>
            <TextBox x0={96} x1={100 + cw(ms) * 11 + 4} y={333} h={19} seed={s('3b1')} />
            <Label kind="mono" anchor="start" x={100} y={365} size={ms}>instaimages.com</Label>
            <Label kind="mono" anchor="start" x={100} y={384} size={ms}>{path}</Label>
            <TextBox x0={96} x1={100 + cw(ms) * 11 + 4} y={380} h={19} seed={s('3b2')} />
            <Label x={298} y={357} size={13}>same path</Label>
          </g>
        ) : (
          <g>
            <Paper x={112} y={302} w={304} h={84} seed={s('p3')} />
            <Label kind="mono" anchor="start" x={118} y={322} size={ms}>instacdn.net</Label>
            <Label kind="mono" anchor="start" x={118 + cw(ms) * 12} y={322} size={ms}>{path}</Label>
            <TextBox x0={118 + cw(ms) * 12 - 4} x1={118 + cw(ms) * 23 + 4} y={318} h={19} seed={s('3b1')} />
            <Arrow weight="thin" pts={[[150, 330], [150, 344]]} seed={s('3sw')} />
            <Label kind="mono" anchor="start" x={118} y={358} size={ms}>instaimages.com</Label>
            <Label kind="mono" anchor="start" x={118 + cw(ms) * 15} y={358} size={ms}>{path}</Label>
            <TextBox x0={118 + cw(ms) * 15 - 4} x1={118 + cw(ms) * 26 + 4} y={354} h={19} seed={s('3b2')} />
            <Label x={300} y={381} size={13}>same path</Label>
          </g>
        )}
      </Step>
      <Step n={4}>
        <Num x={NX} y={P ? 420 : 418} n={4} />
        <Paper x={W - 6 - cw(ms) * 15 - 4} y={P ? 400 : 400} w={cw(ms) * 15 + 6} h={16} seed={s('p4')} />
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

