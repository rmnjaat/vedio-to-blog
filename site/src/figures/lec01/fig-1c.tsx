// Fig 1·c: What's on an API server (new). Panel a: RAM bar vs disk bar. Panel b: latency ladder (log-spaced).
// Panels are 300 × 330; desk = side by side (640 wide), phone = stacked (300 wide).
import React from 'react';
import { Fig, Label, Line, Mark } from '../kit/Kit';
import { chamferRect, poly } from '../kit/hand';
import { SpanBracket } from './s1-parts';

function Bars({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  const X = 20, W = 260;
  const ramSeg = [0, 52, 146, 238, 260]; // os | app server | other jobs | free
  const ramLab = ['os', 'app server', 'other jobs'];
  const used = 36; // 2–3 GB of 20 GB
  return (
    <g>
      <Label kind="mono" anchor="start" x={X} y={36}>RAM · 8 GB</Label>
      <path className="ink shape" d={chamferRect(X, 46, W, 42, s('ram'))} />
      {ramSeg.slice(1, -1).map((v, i) => <path key={i} className="ink thin" d={poly([[X + v, 50], [X + v, 84]], s('rs' + i))} />)}
      {ramLab.map((t, i) => <Label key={i} x={X + (ramSeg[i] + ramSeg[i + 1]) / 2} y={72} size={13}>{t}</Label>)}
      <SpanBracket x0={X + ramSeg[3] + 2} x1={X + W - 2} y={98} down={false} tone="red" seed={s('free')} />
      <Label tone="red" anchor="end" x={X + W} y={116} size={13}>little left: free</Label>

      <Label kind="mono" anchor="start" x={X} y={168}>disk · 20 GB</Label>
      <path className="ink shape" d={chamferRect(X, 178, W, 42, s('disk'))} />
      <path className="ink thin" d={poly([[X + used, 182], [X + used, 216]], s('du'))} />
      <Label muted x={X + (used + W) / 2} y={204} size={13}>unused</Label>
      <SpanBracket x0={X + 2} x1={X + used - 2} y={230} down={false} seed={s('used')} />
      <Label anchor="start" x={X} y={250} size={13}>os · jars · packages</Label>
      <Label kind="mono" anchor="start" x={X} y={268} size={13}>2–3 GB</Label>
      <Label kind="title" x={150} y={318}>one api server</Label>
    </g>
  );
}

function Ladder({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  const AX = 36; // axis
  const rung = (y: number, name: string, val: string, k: string, tone: 'ink' | 'red' = 'ink') => (
    <g>
      <Line pts={[[AX - 8, y], [AX + 8, y]]} tone={tone} seed={s(k)} />
      <Label anchor="start" tone={tone} x={AX + 16} y={y + 5} size={13}>{name}</Label>
      <Label kind="mono" anchor="end" tone={tone} x={292} y={y + 5} size={13}>{val}</Label>
    </g>
  );
  // log scale: 52 units per decade, 100 ns at y = 40
  const y = (sec: number) => 40 + 52 * Math.log10(sec / 1e-7);
  return (
    <g>
      <Line pts={[[AX, 26], [AX, 252]]} weight="thin" seed={s('ax')} />
      <Label muted anchor="start" x={AX - 8} y={18} size={12.5}>fast</Label>
      <Label muted anchor="start" x={AX - 8} y={270} size={12.5}>slow (log scale)</Label>
      {rung(y(1e-7), 'RAM read', '~100 ns', 'r1')}
      {rung(y(1.5e-4), 'SSD random read', '~150 µs', 'r2')}
      {rung(y(5e-4), 'network round trip', '~500 µs', 'r3', 'red')}
      {/* the page cache keeps a hot "disk" cache in RAM */}
      <Line pts={[[AX + 26, y(1.5e-4) - 14], [AX + 26, y(1e-7) + 12]]} weight="thin" dashed seed={s('pc')} />
      <Mark a={[AX + 26, y(1e-7) + 12]} b={[AX + 21, y(1e-7) + 20]} weight="thin" seed={s('pc-h1')} />
      <Mark a={[AX + 26, y(1e-7) + 12]} b={[AX + 31, y(1e-7) + 20]} weight="thin" seed={s('pc-h2')} />
      <Label anchor="start" x={AX + 36} y={100} size={13}>a hot “disk” cache is</Label>
      <Label anchor="start" x={AX + 36} y={117} size={13}>served from the OS</Label>
      <Label anchor="start" x={AX + 36} y={134} size={13}>page cache, in RAM</Label>
      <Label muted x={150} y={286} size={12.5}>classic numbers, c. 2012</Label>
      <Label muted x={150} y={301} size={12.5}>(Jeff Dean · jboner gist)</Label>
      <Label kind="title" x={150} y={326}>latency ladder</Label>
    </g>
  );
}

const DESC =
  'Panel a: an API server with 8 GB of RAM, almost all taken by the OS, the application server and other jobs, leaving a thin free slice; and a 20 GB disk of which only 2 to 3 GB hold the OS, jar files and packages, the rest unused. Panel b: a latency ladder on a log scale: a RAM read about 100 ns, a random SSD read about 150 microseconds, a network round trip inside one datacenter about 500 microseconds (classic c. 2012 figures). A hot disk cache is actually served from the OS page cache in RAM.';

export function ApiServerSpace({ layout = 'desk' }: { layout?: 'desk' | 'phone' }) {
  const title = 'What’s on an API server';
  if (layout === 'phone')
    return (
      <Fig id="f1c-p" w={300} h={680} title={title} desc={DESC}>
        <Bars id="f1c-pa" />
        <Line pts={[[10, 342], [290, 342]]} weight="thin" dotted seed="f1c-p-sep" className="faint" />
        <g transform="translate(0 350)"><Ladder id="f1c-pb" /></g>
      </Fig>
    );
  return (
    <Fig id="f1c" w={640} h={332} title={title} desc={DESC}>
      <g transform="translate(6 0)"><Bars id="f1c-a" /></g>
      <Line pts={[[320, 14], [320, 318]]} weight="thin" dotted seed="f1c-sep" className="faint" />
      <g transform="translate(334 0)"><Ladder id="f1c-b" /></g>
    </Fig>
  );
}
