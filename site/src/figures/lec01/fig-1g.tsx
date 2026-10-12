// Fig 1·g: A config platform that can't afford a miss (new; sits inside the §1.8 "From practice" margin note).
// One panel, 340 wide (show it at max 340px: no phone layout needed). Orthogonal routes, none crossing:
// control plane → s3 (snapshot) on the top row, control plane → cdn routed above s3, on boot s3 → disk,
// background fetch cdn → memory along the bottom of the app.
import React from 'react';
import { Arrow, Box, Fig, Label } from '../kit/Kit';
import { CacheDot, Cloud, Cube, Disk } from './s1-parts';

export function ConfigPlatform() {
  const s = (k: string) => `f1g-${k}`;
  return (
    <Fig id="f1g" w={340} h={414} title="A config platform that can’t afford a miss"
      desc="A control plane snapshots every config change and publishes it to S3, and to a CDN for mobile clients. Inside each app, reads always hit an in-memory copy. On boot the app loads the snapshot onto local disk and into memory, so the disk path runs on every start; if memory is flushed, reads fall back to that disk copy. A background thread keeps fetching the latest config from the CDN. Adding more than 3 ms of latency is a no-go.">
      {/* control plane: snapshot to s3; the same change goes to the cdn, routed above s3 */}
      <Box x={6} y={46} w={128} h={36} label="control plane" labelSize={15} seed={s('cp')} />
      <Arrow pts={[[134, 64], [210, 64]]} seed={s('snap')} />
      <Label x={172} y={56} size={15}>snapshot</Label>
      <Cube x={214} y={40} s={30} d={8} seed={s('s3')} label="s3" size={15} />
      <Arrow pts={[[70, 46], [70, 24], [290, 24], [290, 104]]} seed={s('pub')} />
      <Label x={180} y={16} size={15}>to the cdn, for mobile</Label>
      <Cloud cx={290} cy={130} w={84} h={42} seed={s('cdn')} label="cdn" size={15} />

      {/* the app */}
      <Box x={8} y={196} w={324} h={156} seed={s('app')} />
      <Label kind="mono" anchor="start" x={18} y={216} size={15}>app</Label>
      {/* reads always hit memory */}
      <Arrow tone="blue" pts={[[40, 254], [70, 254]]} seed={s('read')} />
      <Label tone="blue" anchor="start" x={16} y={242} size={15}>reads</Label>
      <CacheDot x={82} y={254} r={7} seed={s('mem')} />
      <Label anchor="end" x={74} y={284} size={15}>memory</Label>
      {/* memory empty (boot) or flushed: read the disk copy */}
      <Arrow pts={[[92, 254], [204, 254]]} seed={s('fall')} />
      <Label x={148} y={246} size={15}>if empty</Label>
      <Disk cx={229} cy={254} w={44} h={24} seed={s('disk')} label="disk" size={15} />
      {/* on boot: load the snapshot from s3 */}
      <Arrow pts={[[229, 240], [229, 82]]} seed={s('boot')} />
      <Label anchor="end" x={221} y={150} size={15}>on boot</Label>
      {/* background thread pulls the latest from the cdn */}
      <Arrow dashed pts={[[82, 264], [82, 316], [314, 316], [314, 152]]} seed={s('bg')} />
      <Label x={200} y={340} size={15}>background fetch</Label>

      <Label muted x={170} y={380} size={15}>every change: git + cdn, together</Label>
      <Label tone="red" x={170} y={404} size={15}>+3 ms = no-go</Label>
    </Fig>
  );
}
