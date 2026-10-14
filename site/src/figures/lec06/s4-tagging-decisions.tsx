// Lecture 08 (lec06), chapter 4 figures added by the design fixer (critic C-02: §4.2–4.4 had no drawing).
//  Fig 4·b WhoCanTagMe        §4.2  the tag request checked against the tagged person's own rule; self-removal
//  Fig 4·c FiveOrTenThousand  §4.3  an array in the record vs a row per tag in posts_tags, served by pages
//  Fig 4·d OnePerTagOrClubbed §4.3  N tags, N notifications (a flood) vs one clubbed rich notification
//  Fig 4·e SyncSuggestions    §4.4  a synchronous call to the ML team's API, its SLA and timeout, and the fallback
// Ledger: L-0186 L-0200 L-0201 L-0202 · L-0189 L-0190 L-0195 L-0197 L-0198 · L-0204 L-0205 L-0206 L-0207.
// Desktop 700/760 units; each has a phone layout at 340.
import React from 'react';
import { Actor, Arrow, Box, Client, Label, Line, Mark } from '../kit/Kit';
import { chamferRect, poly } from '../kit/hand';
import { Fig } from './floor';

type Layout = { layout?: 'wide' | 'phone' };

/* ------------------------------------------------------------------ Fig 4·b */

/** The authz layer's rule for the tagged person: who may tag me. (x, y) top-left. */
function AclTable({ x, y, w, seed }: { x: number; y: number; w: number; seed: string }) {
  const c1 = x + 14, c2 = x + w * 0.5, c3 = x + w - 16;
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, 86, seed, 2)} />
      <Label kind="mono" muted anchor="start" x={c1} y={y + 22} size={13}>tagger</Label>
      <Label kind="mono" muted x={c2} y={y + 22} size={13}>tags</Label>
      <Label kind="mono" muted anchor="end" x={c3} y={y + 22} size={13}>ok?</Label>
      <path className="ink thin" d={poly([[x + 8, y + 31], [x + w - 8, y + 31]], seed + '-h')} />
      <Label kind="mono" anchor="start" x={c1} y={y + 52} size={13.5}>user 1</Label>
      <Label kind="mono" x={c2} y={y + 52} size={13.5}>me</Label>
      <Label kind="mono" tone="green" anchor="end" x={c3} y={y + 52} size={13.5}>✓</Label>
      <Label kind="mono" anchor="start" x={c1} y={y + 74} size={13.5}>anyone</Label>
      <Label kind="mono" x={c2} y={y + 74} size={13.5}>me</Label>
      <Label kind="mono" tone="red" anchor="end" x={c3} y={y + 74} size={13.5}>✕</Label>
    </g>
  );
}

export function WhoCanTagMe({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4who-p' : 'fig4who';
  const s = (k: string) => `${id}-${k}`;
  const title = 'Who can tag me?';
  const desc = 'User 1, the photo’s owner, tags me. The tagging service asks a separate authorization layer whether user 1 may tag me, and that layer keeps a per-user rule set by the tagged person: who is allowed to tag whom, the same switch as a “can anyone tag me?” profile setting. Self-removal: I can take my own tag off user 1’s photo, so someone who doesn’t own the photo may change it, which makes the authorization more granular.';
  if (P) {
    return (
      <Fig id={id} w={340} h={392} title={title} desc={desc}>
        <Actor x={40} y={24} seed={s('owner')} />
        <Label x={40} y={92} size={14}>user 1</Label>
        <Label muted x={40} y={110} size={14}>owner</Label>
        <Arrow tone="blue" pts={[[62, 50], [128, 50]]} seed={s('tag')} />
        <Label x={95} y={40} size={14}>tag me</Label>
        <Box x={130} y={28} w={180} h={44} label="tagging service" seed={s('svc')} />
        <Arrow tone="blue" pts={[[220, 72], [220, 150]]} seed={s('chk')} />
        <Label anchor="start" x={228} y={106} size={14}>can user 1</Label>
        <Label anchor="start" x={228} y={124} size={14}>tag me?</Label>
        <Box x={165} y={152} w={110} h={42} label="authz" seed={s('authz')} />
        <Line weight="thin" pts={[[220, 194], [220, 210]]} seed={s('al')} />
        <AclTable x={130} y={210} w={180} seed={s('acl')} />
        <Label muted x={220} y={316} size={14}>my rule: who can tag me</Label>
        <Actor x={40} y={200} seed={s('me')} />
        <Label x={40} y={268} size={14}>me</Label>
        <Arrow tone="blue" pts={[[62, 224], [104, 224], [104, 62], [128, 62]]} seed={s('rm')} />
        <Label anchor="end" x={98} y={150} size={14}>remove</Label>
        <Label anchor="end" x={98} y={168} size={14}>my tag</Label>
        <Label x={170} y={350} size={14}>the photo is user 1’s, yet I may</Label>
        <Label x={170} y={370} size={14}>change it: finer-grained authz</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={700} h={254} title={title} desc={desc}>
      <Actor x={50} y={36} seed={s('owner')} />
      <Label x={50} y={104} size={14}>user 1</Label>
      <Label muted x={50} y={120} size={13}>photo owner</Label>
      <Arrow tone="blue" pts={[[74, 62], [196, 62]]} seed={s('tag')} />
      <Label x={135} y={52} size={14}>tag me</Label>
      <Box x={200} y={40} w={170} h={46} label="tagging service" seed={s('svc')} />
      <Arrow tone="blue" pts={[[370, 62], [516, 62]]} seed={s('chk')} />
      <Label x={443} y={52} size={13.5}>can user 1 tag me?</Label>
      <Box x={520} y={40} w={120} h={46} label="authz" seed={s('authz')} />
      <Line weight="thin" pts={[[580, 86], [580, 112]]} seed={s('al')} />
      <AclTable x={480} y={112} w={200} seed={s('acl')} />
      <Label muted x={580} y={222} size={13}>my rule: who can tag me</Label>
      <Actor x={50} y={160} seed={s('me')} />
      <Label x={50} y={228} size={14}>me</Label>
      <Arrow tone="blue" pts={[[74, 184], [285, 184], [285, 88]]} seed={s('rm')} />
      <Label x={180} y={174} size={14}>remove my tag</Label>
      <Label anchor="start" x={300} y={128} size={13.5}>the photo is user 1’s,</Label>
      <Label anchor="start" x={300} y={146} size={13.5}>yet I may change it:</Label>
      <Label anchor="start" x={300} y={164} size={13.5}>finer-grained authz</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·c */

/** One photo's document, tags kept as an array inside it. */
function PhotoDoc({ x, y, w, seed, size }: { x: number; y: number; w: number; seed: string; size: number }) {
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, 92, seed, 2)} />
      <Label kind="mono" anchor="start" x={x + 12} y={y + 26} size={size}>photo p1 {'{'}</Label>
      <Label kind="mono" anchor="start" x={x + 12 + size * 1.2} y={y + 50} size={size}>tags: [u1, u2, u3, u4, u5]</Label>
      <Label kind="mono" anchor="start" x={x + 12} y={y + 74} size={size}>{'}'}</Label>
    </g>
  );
}

/** posts_tags: one row per tag. */
function TagRows({ x, y, w, seed, size }: { x: number; y: number; w: number; seed: string; size: number }) {
  const a = x + 14, b = x + w - 14;
  const rows: [string, string][] = [['p1', 'u1'], ['p1', 'u2'], ['p1', 'u3']];
  return (
    <g>
      <Label kind="mono" anchor="start" x={x} y={y - 10} size={size}>posts_tags</Label>
      <path className="ink shape" d={chamferRect(x, y, w, 132, seed, 2)} />
      <Label kind="mono" muted anchor="start" x={a} y={y + 22} size={size - 1}>post_id</Label>
      <Label kind="mono" muted anchor="end" x={b} y={y + 22} size={size - 1}>user_id</Label>
      <path className="ink thin" d={poly([[x + 8, y + 31], [x + w - 8, y + 31]], seed + '-h')} />
      {rows.map(([p, u], i) => (
        <g key={u}>
          <Label kind="mono" anchor="start" x={a} y={y + 52 + i * 20} size={size}>{p}</Label>
          <Label kind="mono" anchor="end" x={b} y={y + 52 + i * 20} size={size}>{u}</Label>
        </g>
      ))}
      <Label kind="mono" muted x={x + w / 2} y={y + 108} size={size}>⋮</Label>
      <Label kind="mono" anchor="start" x={a} y={y + 124} size={size}>p1</Label>
      <Label kind="mono" anchor="end" x={b} y={y + 124} size={size}>u10000</Label>
    </g>
  );
}

/** A small notification card. */
function Note({ x, y, w, h = 24, label, sub, seed }: { x: number; y: number; w: number; h?: number; label: string; sub?: string; seed: string }) {
  return <Box x={x} y={y} w={w} h={h} label={label} sub={sub} seed={seed} labelSize={13} />;
}

export function FiveOrTenThousand({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4lim-p' : 'fig4lim';
  const s = (k: string) => `${id}-${k}`;
  const title = '5 tags or 10,000';
  const desc = 'With a limit of five, the tagged people fit in an array inside the photo’s document. With a limit of 10,000 they need separate entries, one row per tag in posts_tags, and nobody reads 10,000 names at once, so they are served page by page through a paginated endpoint.';
  if (P) {
    return (
      <Fig id={id} w={340} h={404} title={title} desc={desc}>
        <PhotoDoc x={14} y={14} w={312} seed={s('doc')} size={14} />
        <Label kind="title" x={170} y={134}>limit 5</Label>
        <Label muted x={170} y={154} size={14}>an array inside the photo’s record</Label>
        <Line weight="thin" dotted className="faint" pts={[[10, 172], [330, 172]]} seed={s('d1')} />
        <TagRows x={14} y={212} w={172} seed={s('rows')} size={14} />
        <Client x={264} y={240} w={60} h={48} seed={s('cl')} />
        <Arrow tone="blue" pts={[[262, 258], [190, 258]]} seed={s('page')} />
        <Label kind="mono" tone="blue" x={226} y={250} size={14}>?page=2</Label>
        <Arrow tone="green" pts={[[190, 280], [262, 280]]} seed={s('back')} />
        <Label tone="green" x={226} y={300} size={14}>one page</Label>
        <Label kind="title" x={170} y={374}>limit 10,000</Label>
        <Label muted x={170} y={394} size={14}>a row per tag, a paginated endpoint</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={760} h={232} title={title} desc={desc}>
      <PhotoDoc x={30} y={40} w={310} seed={s('doc')} size={14} />
      <Label kind="title" x={185} y={196}>limit 5</Label>
      <Label muted x={185} y={216} size={13.5}>an array inside the photo’s record</Label>
      <Line weight="thin" dotted className="faint" pts={[[380, 14], [380, 220]]} seed={s('dv')} />
      <TagRows x={410} y={36} w={160} seed={s('rows')} size={14} />
      <Client x={656} y={70} w={70} h={52} seed={s('cl')} />
      <Arrow tone="blue" pts={[[654, 88], [574, 88]]} seed={s('page')} />
      <Label kind="mono" tone="blue" x={614} y={80} size={13.5}>?page=2</Label>
      <Arrow tone="green" pts={[[574, 110], [654, 110]]} seed={s('back')} />
      <Label tone="green" x={614} y={130} size={13.5}>one page</Label>
      <Label kind="title" x={570} y={196}>limit 10,000</Label>
      <Label muted x={570} y={216} size={13.5}>a row per tag, a paginated endpoint</Label>
    </Fig>
  );
}

export function OnePerTagOrClubbed({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4ntf-p' : 'fig4ntf';
  const s = (k: string) => `${id}-${k}`;
  const title = 'One notification per tag, or clubbed';
  const desc = 'Left: one photo goes up and many people tag a celebrity in it; one notification per tag floods them. Right: clubbed, the same tags become one rich notification. Over-notifying makes people uninstall: by the instructor’s rule of thumb, good apps send only about three to five notifications a week.';
  const flood = [0, 1, 2, 3];
  if (P) {
    return (
      <Fig id={id} w={340} h={378} title={title} desc={desc}>
        <Actor x={40} y={26} seed={s('celeb')} />
        {flood.map((i) => <Note key={i} x={90} y={14 + i * 28} w={220} label="you were tagged" seed={s('n' + i)} />)}
        <Label tone="red" x={200} y={146} size={14}>× N: a flood</Label>
        <Label kind="title" x={170} y={176}>one per tag</Label>
        <Line weight="thin" dotted className="faint" pts={[[10, 194], [330, 194]]} seed={s('d')} />
        <Actor x={40} y={222} seed={s('celeb2')} />
        <Note x={90} y={220} w={226} h={48} label="tagged by N people" sub="in one photo" seed={s('one')} />
        <Label kind="title" x={170} y={306}>clubbed: one rich notification</Label>
        <Label muted x={170} y={330} size={14}>instructor’s rule of thumb:</Label>
        <Label muted x={170} y={350} size={14}>good apps send 3–5 a week</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={760} h={204} title={title} desc={desc}>
      <Actor x={56} y={36} seed={s('celeb')} />
      {flood.map((i) => <Note key={i} x={110} y={20 + i * 28} w={220} label="you were tagged" seed={s('n' + i)} />)}
      <Label tone="red" x={220} y={150} size={14}>× N: a flood</Label>
      <Label kind="title" x={185} y={180}>one notification per tag</Label>
      <Line weight="thin" dotted className="faint" pts={[[380, 14], [380, 192]]} seed={s('dv')} />
      <Actor x={436} y={36} seed={s('celeb2')} />
      <Note x={490} y={40} w={236} h={50} label="tagged by N people" sub="in one photo" seed={s('one')} />
      <Label tone="green" x={608} y={116} size={14}>one rich notification</Label>
      <Label kind="title" x={570} y={180}>clubbed</Label>
      <Label muted x={570} y={198} size={13.5}>instructor’s rule of thumb: good apps send 3–5 a week</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 4·e */

export function SyncSuggestions({ layout = 'wide' }: Layout) {
  const P = layout === 'phone';
  const id = P ? 'fig4sync-p' : 'fig4sync';
  const s = (k: string) => `${id}-${k}`;
  const title = 'A synchronous dependency on the ML team';
  const desc = 'When the user opens a photo and starts tagging, the tagging service calls the ML team’s suggestions API synchronously, so that API needs a strict SLA. If it doesn’t answer in time, the product has to decide: block tagging, or fall back to tagging manually.';
  if (P) {
    return (
      <Fig id={id} w={340} h={384} title={title} desc={desc}>
        <Actor x={40} y={24} seed={s('u')} />
        <Label x={40} y={94} size={14}>starts</Label>
        <Label x={40} y={112} size={14}>tagging</Label>
        <Arrow tone="blue" pts={[[62, 52], [128, 52]]} seed={s('open')} />
        <Box x={130} y={30} w={170} h={44} label="tagging service" seed={s('svc')} />
        <Arrow tone="blue" pts={[[215, 74], [215, 170]]} seed={s('call')} />
        <Label anchor="start" x={223} y={100} size={14}>suggest tags?</Label>
        <Label anchor="start" x={223} y={118} size={14}>synchronous,</Label>
        <Label anchor="start" x={223} y={136} size={14}>strict SLA</Label>
        <Mark tone="red" a={[205, 154]} b={[225, 154]} seed={s('tick')} />
        <Label tone="red" anchor="start" x={231} y={159} size={14}>timeout</Label>
        <Box x={130} y={172} w={170} h={50} label="ml suggestions" sub="ML team’s API" seed={s('ml')} />
        <Line tone="red" pts={[[205, 154], [40, 154], [40, 272]]} seed={s('fb')} />
        <Label tone="red" anchor="start" x={48} y={180} size={14}>no answer</Label>
        <Label tone="red" anchor="start" x={48} y={198} size={14}>in time</Label>
        <Line pts={[[40, 272], [262, 272]]} seed={s('split')} />
        <Arrow pts={[[80, 272], [80, 294]]} seed={s('o1')} />
        <Arrow pts={[[262, 272], [262, 294]]} seed={s('o2')} />
        <Label x={80} y={314} size={14}>block tagging</Label>
        <Label x={262} y={314} size={14}>fallback:</Label>
        <Label x={262} y={332} size={14}>tag manually</Label>
        <Label muted x={170} y={370} size={14}>which one is a product call</Label>
      </Fig>
    );
  }
  return (
    <Fig id={id} w={760} h={230} title={title} desc={desc}>
      <Actor x={44} y={46} seed={s('u')} />
      <Label anchor="start" x={6} y={122} size={13}>starts tagging</Label>
      <Arrow tone="blue" pts={[[66, 72], [186, 72]]} seed={s('open')} />
      <Label x={126} y={60} size={13.5}>opens a photo</Label>
      <Box x={188} y={50} w={170} h={46} label="tagging service" seed={s('svc')} />
      <Arrow tone="blue" pts={[[358, 73], [546, 73]]} seed={s('call')} />
      <Label x={440} y={60} size={13.5}>suggest tags? (sync)</Label>
      <Label x={426} y={96} size={13.5}>strict SLA</Label>
      <Mark tone="red" a={[514, 63]} b={[514, 83]} seed={s('tick')} />
      <Box x={548} y={48} w={190} h={52} label="ml suggestions" sub="ML team’s API" seed={s('ml')} />
      <Line tone="red" pts={[[514, 83], [514, 146]]} seed={s('fb')} />
      <Label tone="red" anchor="start" x={522} y={126} size={13.5}>timeout: no answer in time</Label>
      <Line pts={[[170, 146], [514, 146]]} seed={s('split')} />
      <Arrow pts={[[170, 146], [170, 168]]} seed={s('o1')} />
      <Arrow pts={[[380, 146], [380, 168]]} seed={s('o2')} />
      <Label x={170} y={188} size={14}>block tagging</Label>
      <Label x={380} y={188} size={14}>fallback: tag manually</Label>
      <Label muted x={275} y={218} size={13.5}>which one is a product call</Label>
    </Fig>
  );
}
