// Lecture 07 (lec09), §3.4–3.5: Fig 3·c (GitHub's attachment upload, call by call: an annotated mock of the DevTools
// Network panel over four swim lanes; StepThrough) and Fig 3·d (private bucket, public CDN).
// Blue = a request, green = a reply, the filled chip = the photo's bytes (only on the S3 POST and the step-5 replies).
import React from 'react';
import { Actor, Arrow, Box, Cloud, Cross, Fig, Label, Lifeline, Line, Num, Step } from './kit';
import { Bucket, KeyTag, PhotoChip } from './s3a-parts';

/* ------------------------------------------------------------------ Fig 3·c */

const F3C_TITLE = 'GitHub’s attachment upload, call by call';
const F3C_DESC =
  'Swim lanes for the browser, github.com, S3 and GitHub’s CDN, time running down, under a mock of the browser’s Network panel. 1: the browser POSTs only metadata (name, size 183938 bytes, content type image/png, a token) to github.com to register the upload. 2: the reply holds S3’s upload URL, the signed form fields (key, acl, policy, the X-Amz fields) and the future image URL, a CDN URL. 3: the browser POSTs the form fields and the 179 KB file straight to S3, which answers 204. 4: a PUT to github.com confirms the asset (200) and the image markdown, starting with an exclamation mark, goes into the comment. 5: opening the image goes to the CDN, which misses, reads the key from S3, caches it and serves it; the next load is a hit.';

export function GitHubUpload({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const id = P ? 'fig3c-p' : 'fig3c';
  const s = (k: string) => `${id}-${k}`;
  const W = P ? 340 : 420;
  const L = P ? { br: 34, gh: 120, s3: 212, cdn: 304 } : { br: 46, gh: 160, s3: 276, cdn: 376 };
  const M = 12.5; // mono size inside the mock cards
  const H = 784;
  const NX = P ? 13 : 16;
  const CX = P ? 46 : 60;            // left edge of the annotation cards
  const CW = P ? 290 : 350;          // card width
  // status · method · target, in columns (SVG collapses runs of spaces)
  const rows: [string, string, string][] = P
    ? [['201', 'POST', 'assets'], ['204', 'POST', 's3'], ['200', 'PUT', '221335625']]
    : [['201', 'POST', 'github.com  assets'], ['200', 'OPTIONS', '…user-asset… (s3)'], ['204', 'POST', '…user-asset-6210df.s3…'], ['200', 'PUT', 'github.com  221335625']];
  const COL = P ? [18, 54, 100] : [18, 54, 124];
  const RY0 = 48, RS = 20;
  const panelH = 26 + rows.length * RS;
  const rowY = (i: number) => RY0 + i * RS;
  // which panel row each step underlines
  const hi = P ? { 1: 0, 3: 1, 4: 2 } : { 1: 0, 3: 2, 4: 3 };
  const under = (n: 1 | 3 | 4) => <Line tone="blue" weight="thin" pts={[[16, rowY(hi[n]) + 5], [P ? 200 : 310, rowY(hi[n]) + 5]]} seed={s(`hi${n}`)} />;
  const card = (y: number, h: number, w = CW) => <Box x={CX} y={y} w={w} h={h} seed={s(`card${y}`)} />;
  const lanesTop = panelH + 44;

  return (
    <Fig id={id} w={W} h={H} title={F3C_TITLE} desc={F3C_DESC}>
      {/* the mock Network panel */}
      <Box x={8} y={8} w={W - 16} h={panelH} seed={s('panel')} />
      <Label muted anchor="start" x={18} y={27} size={13}>DevTools · Network</Label>
      <Line pts={[[8, 34], [W - 8, 34]]} weight="thin" seed={s('panel-bar')} />
      {rows.map((r, i) => (
        <g key={i} className={!P && i === 1 ? 'faint' : undefined}>
          {r.map((t, j) => <Label key={j} kind="mono" anchor="start" x={COL[j]} y={rowY(i)} size={M}>{t}</Label>)}
        </g>
      ))}

      {/* lanes */}
      <Label kind="mono" x={L.br} y={lanesTop - 8} size={13}>browser</Label>
      <Label kind="mono" x={L.gh} y={lanesTop - 8} size={13}>github.com</Label>
      <Label kind="mono" x={L.s3} y={lanesTop - 8} size={13}>s3</Label>
      {[L.br, L.gh, L.s3].map((x, i) => <Lifeline key={i} x={x} y0={lanesTop} y1={H - 12} seed={s(`l${i}`)} />)}

      <Step n={1}>
        {under(1)}
        <Arrow tone="blue" weight="thin" pts={[[L.br + 2, 186], [L.gh - 2, 186]]} seed={s('1')} />
        {card(198, 64, P ? 270 : 262)}
        <Label kind="mono" anchor="start" x={CX + 10} y={216} size={M}>name: n_t0lO0mq5Q.png</Label>
        <Label kind="mono" anchor="start" x={CX + 10} y={234} size={M}>size: 183938 (179 KB)</Label>
        <Label kind="mono" anchor="start" x={CX + 10} y={252} size={M}>image/png · auth token</Label>
        <Label anchor="start" x={CX} y={282} size={14}>metadata only: no image yet</Label>
        <Num x={NX} y={186} n={1} tone="blue" />
      </Step>

      <Step n={2}>
        <Arrow tone="green" pts={[[L.gh - 2, 308], [L.br + 2, 308]]} seed={s('2')} />
        {card(320, 122)}
        <Label kind="mono" anchor="start" x={CX + 10} y={338} size={M}>{P ? 'upload_url: …6210df.s3.amazonaws.com' : 'upload_url: …-6210df.s3.amazonaws.com'}</Label>
        <Label tone="blue" anchor="start" x={CX + 10} y={354} size={13}>S3’s URL, not GitHub’s</Label>
        <Label kind="mono" anchor="start" x={CX + 10} y={376} size={M}>{'form: { key, acl, policy, X-Amz-… }'}</Label>
        <Label tone="blue" anchor="start" x={CX + 10} y={392} size={13}>policy: signed, expiry inside</Label>
        <Label kind="mono" anchor="start" x={CX + 10} y={414} size={M}>{P ? 'href: user-images.github…/….png' : 'href: user-images.githubusercontent.com/…'}</Label>
        <Label tone="blue" anchor="start" x={CX + 10} y={430} size={13}>a CDN URL, image ID in the path</Label>
        <Num x={NX} y={308} n={2} tone="green" />
      </Step>

      <Step n={3}>
        {under(3)}
        <PhotoChip x={P ? 70 : 104} y={456} seed={s('3c')} />
        <Label kind="mono" anchor="start" x={P ? 88 : 122} y={465} size={M}>179 KB</Label>
        <Arrow tone="blue" pts={[[L.br + 2, 472], [L.s3 - 2, 472]]} seed={s('3')} />
        <Label anchor="start" x={L.s3 + 8} y={476} size={13}>form fields</Label>
        <Label anchor="start" x={L.s3 + 8} y={492} size={13}>+ file</Label>
        <Arrow tone="green" pts={[[L.s3 - 2, 496], [L.br + 2, 496]]} seed={s('3r')} />
        <Label kind="mono" tone="green" x={(L.br + L.s3) / 2} y={490} size={M}>204</Label>
        <Num x={NX} y={472} n={3} tone="blue" />
      </Step>

      <Step n={4}>
        {under(4)}
        <Label kind="mono" x={(L.br + L.gh) / 2 + 4} y={520} size={M}>PUT …/221335625</Label>
        <Arrow tone="blue" weight="thin" pts={[[L.br + 2, 528], [L.gh - 2, 528]]} seed={s('4')} />
        <Arrow tone="green" pts={[[L.gh - 2, 548], [L.br + 2, 548]]} seed={s('4r')} />
        <Label kind="mono" tone="green" anchor="start" x={L.gh + 8} y={552} size={M}>200</Label>
        {card(564, 28, P ? 270 : 280)}
        <Label kind="mono" anchor="start" x={CX + 10} y={583} size={M}>{P ? '![…](https://user-images…)' : '![…](https://user-images…png)'}</Label>
        <Label anchor="start" x={CX} y={612} size={14}>“!” = render as image</Label>
        <Num x={NX} y={538} n={4} tone="blue" />
      </Step>

      <Step n={5}>
        <Label kind="mono" x={L.cdn} y={lanesTop - 8} size={13}>cdn</Label>
        <Lifeline x={L.cdn} y0={lanesTop} y1={H - 12} seed={s('lcdn')} />
        <Label kind="mono" x={(L.br + L.cdn) / 2} y={632} size={M}>GET …/221335625-….png</Label>
        <Arrow tone="blue" pts={[[L.br + 2, 640], [L.cdn - 2, 640]]} seed={s('5a')} />
        <Label x={(L.s3 + L.cdn) / 2} y={658} size={13}>miss: read the key</Label>
        <Arrow pts={[[L.cdn - 2, 666], [L.s3 + 2, 666]]} seed={s('5pull')} />
        <PhotoChip x={(L.s3 + L.cdn) / 2 - 7} y={672} tone="green" seed={s('5c1')} />
        <Arrow tone="green" pts={[[L.s3 + 2, 688], [L.cdn - 2, 688]]} seed={s('5b')} />
        <PhotoChip x={(L.br + L.cdn) / 2 - 7} y={694} tone="green" seed={s('5c2')} />
        <Arrow tone="green" pts={[[L.cdn - 2, 710], [L.br + 2, 710]]} seed={s('5c')} />
        <Arrow tone="blue" pts={[[L.br + 2, 740], [L.cdn - 2, 740]]} seed={s('5d')} />
        <Label tone="green" x={(L.br + L.cdn) / 2} y={756} size={13}>next load: hit</Label>
        <Arrow tone="green" pts={[[L.cdn - 2, 764], [L.br + 2, 764]]} seed={s('5e')} />
        <Num x={NX} y={640} n={5} tone="blue" />
      </Step>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·d */

export function PrivateBucket() {
  const s = (k: string) => `fig3d-${k}`;
  return (
    <Fig id="fig3d" w={360} h={248} title="Private bucket, public CDN"
      desc="The bucket stays private. The user’s app only ever gets CDN URLs; the CDN reads the bucket with credentials (access keys for third-party CDNs, origin access control for CloudFront) using a normal authenticated read, while a direct read of the bucket by the user is refused.">
      <Label x={246} y={22} size={14}>authenticated read with the SDK</Label>
      <Actor x={30} y={58} seed={s('u')} />
      <Arrow tone="blue" pts={[[48, 64], [118, 64]]} seed={s('get')} />
      <Arrow tone="green" pts={[[118, 84], [48, 84]]} seed={s('rep')} />
      <PhotoChip x={76} y={90} tone="green" seed={s('c1')} />
      <Cloud cx={168} cy={72} w={100} h={60} label="cdn" seed={s('cdn')} />
      <Arrow pts={[[220, 64], [264, 64]]} seed={s('pull')} />
      <Arrow tone="green" pts={[[264, 84], [220, 84]]} seed={s('rep2')} />
      <Bucket cx={310} cy={72} w={88} h={54} seed={s('s3')} lock />
      <KeyTag x={114} y={108} w={112} h={24} seed={s('key')} kind="mono" size={14}>keys | OAC</KeyTag>
      <Label muted x={170} y={152} size={14}>keys (third-party CDNs)</Label>
      <Label muted x={170} y={169} size={14}>or OAC (CloudFront)</Label>
      <Arrow tone="blue" dashed pts={[[30, 118], [30, 190], [310, 190], [310, 106]]} seed={s('direct')} />
      <Cross x={310} y={146} size={18} seed={s('x')} />
      <Label tone="red" x={186} y={210} size={14}>private: only the CDN may read</Label>
      <Label kind="mono" anchor="start" x={8} y={238} size={14}>the app renders the CDN URL</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 3·e */

// Design fix (critic C-04): §3.5 ran three screens of prose after Fig 3·d. This draws the Q&A's answer to "why is a
// CDN faster than S3": geography first (a nearby edge vs a far region), then storage and the promise each one makes.
