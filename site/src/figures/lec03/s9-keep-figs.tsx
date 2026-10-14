// Lecture 06 (lec03), §9.2. Fig 9·a "Where the ID is born" (new, a recap map): one axis with four places an ID can be
// made, and every scheme of the lecture placed on it with the section it came from. Summary only, no new ids.
import React from 'react';
import { Dot, Fig, Label, Line } from '../kit/Kit';
import { chamferRect } from '../kit/hand';

const STOPS: { name: string; note: string; tags: string[] }[] = [
  { name: 'in your function', note: 'no network call', tags: ['getid() v1–v6 · §2', 'time-first · §3'] },
  { name: 'a central service', note: 'a call per id, or per batch', tags: ['one id server · §3', 'amazon ranges · §5', 'flickr tickets · §5'] },
  { name: 'inside the database', note: 'made during the insert', tags: ['auto-increment · §1', 'instagram next_id · §7'] },
  { name: 'a library on every server', note: 'no network call', tags: ['snowflake · §6', 'discord · §6', 'mongodb objectid · §4', 'uuid · §4'] },
];

const TITLE = 'Where the ID is born';
const DESC = 'Four places an ID can be made, with the schemes of this lecture under each. In your own function: getid() versions 1 to 6 and the time-first IDs. In a central service: the single ID server, Amazon ranges and Flickr’s ticket servers. Inside the database: auto-increment and Instagram next_id(). In a library on every server: Snowflake, Discord, MongoDB ObjectId and UUID.';

// Text sizes: the phone layout (340) shows at ~0.88 on a 360px phone, the wide one (880) at ~0.8 at 768px,
// so both use 14–15 to stay >= 12px on screen.
function Tag({ x, y, text, seed, anchor = 'middle', size = 14 }: { x: number; y: number; text: string; seed: string; anchor?: 'middle' | 'start'; size?: number }) {
  const w = text.length * size * 0.6 + 12;
  const left = anchor === 'middle' ? x - w / 2 : x;
  return (
    <g>
      <path className="ink thin" d={chamferRect(left, y - 15, w, 22, seed, 2)} />
      <Label kind="mono" x={left + w / 2} y={y} size={size}>{text}</Label>
    </g>
  );
}

export function WhereBorn({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  if (layout === 'phone') {
    const blocks: number[] = [];
    let y = 30;
    for (const st of STOPS) { blocks.push(y); y += 54 + st.tags.length * 28 + 12; }
    const H = y;
    return (
      <Fig id="fig9a-p" w={340} h={H} title={TITLE} desc={DESC}>
        <Line weight="thin" pts={[[20, 20], [20, H - 16]]} seed="f9a-p-ax" />
        {STOPS.map((st, i) => {
          const y0 = blocks[i];
          return (
            <g key={i}>
              <Dot x={20} y={y0 - 5} />
              <Label anchor="start" x={36} y={y0} size={16}>{st.name}</Label>
              <Label muted anchor="start" x={36} y={y0 + 20} size={14}>{st.note}</Label>
              {st.tags.map((t, j) => <Tag key={j} anchor="start" x={36} y={y0 + 52 + j * 28} text={t} seed={`f9a-p-${i}-${j}`} />)}
            </g>
          );
        })}
      </Fig>
    );
  }
  const xs = [108, 318, 540, 774]; // chips of neighbouring columns keep >= 16 units apart
  return (
    <Fig id="fig9a" w={880} h={236} title={TITLE} desc={DESC}>
      <Line weight="thin" pts={[[30, 62], [850, 62]]} seed="f9a-ax" />
      {STOPS.map((st, i) => (
        <g key={i}>
          <Dot x={xs[i]} y={62} />
          <Label x={xs[i]} y={44} size={16}>{st.name}</Label>
          <Label muted x={xs[i]} y={88} size={15}>{st.note}</Label>
          {st.tags.map((t, j) => <Tag key={j} x={xs[i]} y={124 + j * 30} text={t} seed={`f9a-${i}-${j}`} size={15} />)}
        </g>
      ))}
    </Fig>
  );
}
