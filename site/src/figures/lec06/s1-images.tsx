// Lecture 08 (lec06) §1 "Images are just responses": new-glyph key, Fig 1·a (new), Fig 1·b (redraw of board D-01,
// frame b_001200), Fig 1·c (new) and the §1 rule-box sketch. Specs: lectures/lec06/lesson/figures.md §1.
// Board names are replaced: /static/img/arpit.jpg becomes /static/img/logo.jpg.
import React from 'react';
import { Actor, Arrow, Box, Client, Cloud, Cyl, Disk, Label, Line, Num } from '../kit/Kit';
import { Fig } from './floor';
import { chamferRect, poly } from '../kit/hand';
import { Badge, ByteStrip, Code, Picture, Photo, Pill, Ring } from './s1-images-parts';

type Layout = { layout?: 'desk' | 'phone' };

/* ------------------------------------------------------------------ new glyphs (beside the NotationKey) */

const KEY_DESC = 'The glyphs this lecture adds to the notation: a browser window, an img tag, a byte strip whose first cells are the format header, a picture, a photo (a small square), an S3 bucket drawn as a cloud labelled s3, the messages icon with its badge, and Redis used as the store of record, drawn as a database cylinder labelled redis.';

function KeyItem({ x, y, label, children }: { x: number; y: number; label: string; children: React.ReactNode }) {
  return (
    <g>
      {children}
      <Label x={x} y={y} size={13}>{label}</Label>
    </g>
  );
}

export function NewGlyphs({ layout = 'desk' }: Layout) {
  const title = 'New in this lecture';
  const items = (s: (k: string) => string, pos: [number, number][]) => [
    <KeyItem key="b" x={pos[0][0]} y={pos[0][1] + 52} label="browser"><Client x={pos[0][0] - 26} y={pos[0][1]} w={52} h={36} seed={s('br')} /></KeyItem>,
    <KeyItem key="i" x={pos[1][0]} y={pos[1][1] + 52} label="img tag"><Pill x={pos[1][0] - 42} y={pos[1][1] + 6} w={84} text="<img src>" seed={s('img')} /></KeyItem>,
    <KeyItem key="y" x={pos[2][0]} y={pos[2][1] + 52} label="bytes, header first"><ByteStrip x={pos[2][0] - 52} y={pos[2][1] + 8} cells={['89', '50', '4E', '47']} seed={s('bytes')} /></KeyItem>,
    <KeyItem key="p" x={pos[3][0]} y={pos[3][1] + 52} label="picture"><Picture x={pos[3][0] - 22} y={pos[3][1]} w={44} h={36} seed={s('pic')} /></KeyItem>,
    <KeyItem key="o" x={pos[4][0]} y={pos[4][1] + 52} label="photo"><Photo x={pos[4][0] - 8} y={pos[4][1] + 12} s={16} seed={s('photo')} /></KeyItem>,
    <KeyItem key="s" x={pos[5][0]} y={pos[5][1] + 52} label="bucket"><Cloud cx={pos[5][0]} cy={pos[5][1] + 18} w={66} h={34} seed={s('s3')} label="s3" size={13} /></KeyItem>,
    <KeyItem key="g" x={pos[6][0]} y={pos[6][1] + 52} label="unread badge"><Badge x={pos[6][0] - 18} y={pos[6][1] + 6} s={28} seed={s('badge')} /></KeyItem>,
    // critic C-06: chapters 5–6 use Redis as the store of record, drawn as a cylinder (the key's cube is Redis as a cache)
    <KeyItem key="r" x={pos[7][0]} y={pos[7][1] + 52} label="redis as store"><Cyl cx={pos[7][0]} top={pos[7][1] + 6} rx={16} ry={5} h={22} seed={s('redis')} /></KeyItem>,
  ];
  if (layout === 'phone') {
    const s = (k: string) => `l06key-p-${k}`;
    return (
      <Fig id="l06key-p" w={340} h={250} title={title} desc={KEY_DESC}>
        {items(s, [[58, 14], [164, 14], [266, 14], [58, 96], [164, 96], [266, 96], [100, 178], [240, 178]])}
      </Fig>
    );
  }
  const s = (k: string) => `l06key-${k}`;
  return (
    <Fig id="l06key" w={840} h={84} title={title} desc={KEY_DESC}>
      {items(s, [[46, 10], [148, 10], [266, 10], [380, 10], [470, 10], [566, 10], [660, 10], [772, 10]])}
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·a  From <img> to pixels */

const F1A_DESC = 'The img tag makes the browser send a GET. The server returns bytes; the browser reads the first bytes to recognise the format, picks a decoder and paints the picture. The file extension plays no part. Inset: the first bytes of PNG (89 50 4E 47), JPEG (FF D8 FF), GIF (GIF89a) and BMP (BM); SVG is not sniffed and needs Content-Type image/svg+xml.';

function Signatures({ x, y, seed }: { x: number; y: number; seed: string }) {
  const rows: [string, string][] = [['PNG', '89 50 4E 47'], ['JPEG', 'FF D8 FF'], ['GIF', 'GIF89a'], ['BMP', 'BM']];
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, 212, 124, seed, 2)} />
      <Label x={x + 106} y={y + 22} size={13}>first bytes of each format</Label>
      <path className="ink thin" d={poly([[x + 8, y + 32], [x + 204, y + 32]], seed + '-hd')} />
      {rows.map(([a, b], i) => (
        <g key={a}>
          <Label kind="mono" anchor="start" x={x + 14} y={y + 54 + i * 21} size={13}>{a}</Label>
          <Label kind="mono" anchor="start" x={x + 74} y={y + 54 + i * 21} size={13} muted>{b}</Label>
        </g>
      ))}
    </g>
  );
}

function BrowserSide({ s, x, y, w, h }: { s: (k: string) => string; x: number; y: number; w: number; h: number }) {
  return (
    <g>
      <Client x={x} y={y} w={w} h={h} seed={s('browser')} />
      <Pill x={x + 12} y={y + 24} w={w - 24} text={'<img src="/static/img/logo">'} seed={s('pill')} />
      <Label x={x + w / 2} y={y + 74} size={13}>this tag is the only reason</Label>
      <Label x={x + w / 2} y={y + 90} size={13}>it expects an image</Label>
      <Label x={x + 59} y={y + 124} size={13}>decoder</Label>
      <Box x={x + 24} y={y + 132} w={70} h={34} label="png" seed={s('dec')} />
      <Arrow pts={[[x + 94, y + 149], [x + 128, y + 149]]} seed={s('paint')} />
      <Picture x={x + 134} y={y + 124} w={62} h={50} seed={s('pic')} />
      <Label x={x + 165} y={y + 196} size={13}>pixels</Label>
    </g>
  );
}

export function ImgToPixels({ layout = 'desk' }: Layout) {
  const title = 'From <img> to pixels';
  const bytes = ['89', '50', '4E', '47', '0D', '0A', '1A', '0A'];
  if (layout === 'phone') {
    const s = (k: string) => `f1a-p-${k}`;
    return (
      <Fig id="f1a-p" w={340} h={680} title={title} desc={F1A_DESC}>
        {/* critic C-15: a plain hand annotation, not a speech bubble (the chapter's misconception bubbles are 2a, 5a) */}
        <Label x={250} y={22} size={13}>.jpg? no idea.</Label>
        <Label x={250} y={40} size={13}>I read the bytes.</Label>
        <Line weight="thin" pts={[[250, 46], [250, 60]]} seed={s('ann')} />
        <BrowserSide s={s} x={14} y={62} w={312} h={214} />
        {/* GET down to the server, bytes back up */}
        <Arrow tone="blue" pts={[[262, 276], [262, 360]]} seed={s('get')} />
        <Label kind="mono" tone="blue" anchor="end" x={254} y={306} size={13}>GET</Label>
        <Label kind="mono" tone="blue" anchor="end" x={254} y={324} size={13}>/static/img/logo</Label>
        <Box x={206} y={362} w={112} h={40} label="server" seed={s('server')} />
        <Arrow tone="green" pts={[[206, 382], [44, 382], [44, 278]]} seed={s('ret')} />
        <Label tone="green" anchor="start" x={54} y={372} size={13}>2xx + bytes</Label>
        <ByteStrip x={62} y={430} cells={bytes} seed={s('bytes')} mark={4} markLabel="header says PNG" />
        <Signatures x={64} y={480} seed={s('sig')} />
        <Label x={170} y={630} size={13}>SVG isn’t sniffed: it needs</Label>
        <Label kind="mono" x={170} y={650} size={13}>Content-Type: image/svg+xml</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f1a-${k}`;
  return (
    <Fig id="f1a" w={880} h={330} title={title} desc={F1A_DESC}>
      {/* critic C-15: a plain hand annotation, not a speech bubble (the chapter's misconception bubbles are 2a, 5a) */}
      <Label x={235} y={26} size={13}>.jpg? no idea.</Label>
      <Label x={235} y={44} size={13}>I read the bytes.</Label>
      <Line weight="thin" pts={[[235, 50], [235, 60]]} seed={s('ann')} />
      <BrowserSide s={s} x={16} y={62} w={290} h={220} />
      <Arrow tone="blue" pts={[[306, 104], [578, 104]]} seed={s('get')} />
      <Label kind="mono" tone="blue" x={442} y={94} size={13}>GET /static/img/logo</Label>
      <Box x={580} y={84} w={110} h={40} label="server" seed={s('server')} />
      <Arrow tone="green" pts={[[612, 124], [612, 200], [308, 200]]} seed={s('ret')} />
      <Label tone="green" x={458} y={222} size={13}>2xx + bytes</Label>
      <ByteStrip x={354} y={164} cells={bytes} seed={s('bytes')} mark={4} markLabel="header says PNG" />
      <Signatures x={656} y={150} seed={s('sig')} />
      <Label x={762} y={298} size={13}>SVG isn’t sniffed: it needs</Label>
      <Label kind="mono" x={758} y={318} size={13}>Content-Type: image/svg+xml</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·b  Two handlers, one idea (D-01) */

const F1B_DESC = 'Panel a: a request for https://example.com/static/img/logo.jpg reaches the server. The /static prefix maps to a static folder on its disk, so the server reads the URL, reads the file at site/static/img/logo.jpg and sends its bytes. Panel b: the same server with a /raw/<path:key> route of four lines; it reads the URL, reads the file at that key from S3 and sends the bytes, which makes the server a proxy for S3.';

function StepsList({ y, lines }: { y: number; lines: string[] }) {
  return (
    <g>
      {lines.map((l, i) => (
        <g key={i}>
          <Num x={26} y={y + i * 24 - 5} n={i + 1} />
          <Label anchor="start" x={42} y={y + i * 24} size={14}>{l}</Label>
        </g>
      ))}
    </g>
  );
}

function StaticPanel({ id, phone }: { id: string; phone?: boolean }) {
  const s = (k: string) => `${id}-${k}`;
  // critic C-16: the URL is set in three runs with a small gap either side of /static, so the ring passes through
  // the gaps instead of cutting "com/". Mono advance is 0.6 em; the phone floor raises the 13 to 13.6.
  const cw = (phone ? 13.6 : 13) * 0.6, gap = phone ? 6 : 7;
  const a = 8 + 19 * cw + gap, b = a + 7 * cw + gap;
  return (
    <g>
      <Label kind="mono" anchor="start" x={8} y={28} size={13}>https://example.com</Label>
      <Label kind="mono" anchor="start" x={a} y={28} size={13}>/static</Label>
      <Label kind="mono" anchor="start" x={b} y={28} size={13}>/img/logo.jpg</Label>
      <Ring x={a + 3.5 * cw} y={23} rx={3.5 * cw + gap / 2 + 1} ry={13} seed={s('ring')} />
      <Arrow tone="blue" weight="thin" pts={[[200, 37], [200, 58], [292, 58], [292, 96], [282, 96]]} seed={s('lead')} />
      <Actor x={30} y={92} seed={s('user')} />
      <Arrow tone="blue" pts={[[46, 104], [80, 104]]} seed={s('req')} />
      <Arrow tone="green" pts={[[80, 118], [46, 118]]} seed={s('ret')} />
      <Box x={82} y={92} w={84} h={36} label="server" seed={s('server')} />
      <Line pts={[[150, 128], [150, 158], [164, 158]]} seed={s('wire')} />
      <Disk cx={186} cy={158} w={42} h={22} seed={s('disk')} label="disk" />
      {/* the folder tree */}
      <Label kind="mono" anchor="start" x={210} y={86} size={13}>site/</Label>
      <Label kind="mono" anchor="start" x={222} y={106} size={13}>static/</Label>
      <Label kind="mono" anchor="start" x={234} y={126} size={13}>img/</Label>
      <Label kind="mono" anchor="start" x={246} y={146} size={13}>logo.jpg</Label>
      <Label kind="mono" anchor="start" x={246} y={164} size={13} muted>avatar.jpg</Label>
      <Label kind="mono" anchor="start" x={222} y={184} size={13} muted>js/</Label>
      <Label kind="mono" anchor="start" x={222} y={202} size={13} muted>css/</Label>
      <Label anchor="start" x={14} y={262} size={13} muted>once the request hits the server, it…</Label>
      <StepsList y={292} lines={['reads the URL', 'reads the file at that path', 'sends the bytes']} />
      <Label kind="title" x={170} y={374}>a · the static folder</Label>
    </g>
  );
}

function RawPanel({ id }: { id: string }) {
  const s = (k: string) => `${id}-${k}`;
  return (
    <g>
      <Label kind="mono" anchor="start" x={8} y={28} size={13}>localhost:5000/raw/users/logo.jpg</Label>
      <Actor x={30} y={92} seed={s('user')} />
      <Arrow tone="blue" pts={[[46, 104], [80, 104]]} seed={s('req')} />
      <Arrow tone="green" pts={[[80, 118], [46, 118]]} seed={s('ret')} />
      <Box x={82} y={92} w={84} h={36} label="server" seed={s('server')} />
      <Arrow tone="blue" pts={[[166, 104], [208, 104]]} seed={s('read')} />
      <Arrow tone="green" pts={[[208, 118], [166, 118]]} seed={s('bytes')} />
      <Cloud cx={262} cy={110} w={104} h={50} seed={s('s3')} label="s3" />
      <Code x={14} y={146} w={312} seed={s('code')} lines={['@app.route(\'/raw/<path:key>\')', 'def raw_handler(key):', '  raw_b = S3.read(key, BUCKET)', '  return raw_b']} />
      <Label anchor="start" x={14} y={262} size={13} muted>four lines: a proxy for S3</Label>
      <StepsList y={292} lines={['reads the URL', 'reads the file from S3', 'sends the bytes']} />
      <Label kind="title" x={170} y={374}>b · your own handler</Label>
    </g>
  );
}

export function TwoHandlers({ layout = 'desk' }: Layout) {
  const title = 'Two handlers, one idea';
  if (layout === 'phone')
    return (
      <Fig id="f1b-p" w={340} h={780} title={title} desc={F1B_DESC}>
        <StaticPanel id="f1b-pa" phone />
        <Line pts={[[10, 390], [330, 390]]} weight="thin" dotted seed="f1b-p-sep" className="faint" />
        <g transform="translate(0 398)"><RawPanel id="f1b-pb" /></g>
      </Fig>
    );
  return (
    <Fig id="f1b" w={700} h={388} title={title} desc={F1B_DESC}>
      <g transform="translate(2 0)"><StaticPanel id="f1b-a" /></g>
      <Line pts={[[350, 14], [350, 374]]} weight="thin" dotted seed="f1b-sep" className="faint" />
      <g transform="translate(358 0)"><RawPanel id="f1b-b" /></g>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 1·c  The repo card, made on a miss */

const F1C_DESC = 'The page names an og:image URL. The CDN serves a cached card; on a miss it asks the card service, which fills a template with the repository’s current numbers fetched from GitHub’s API and returns an image that the CDN keeps until its TTL runs out (say a day; GitHub doesn’t publish it); then the next request misses and the card is drawn again.';

function CardInBrowser({ x, y, w, h, s }: { x: number; y: number; w: number; h: number; s: (k: string) => string }) {
  const cx = x + 12, cy = y + 20, cw = w - 24, ch = h - 30;
  return (
    <g>
      <Client x={x} y={y} w={w} h={h} seed={s('browser')} />
      <path className="ink shape" d={chamferRect(cx, cy, cw, ch, s('card'), 2)} />
      <path className="ink" d={poly([[cx + 10, cy + 16], [cx + cw * 0.62, cy + 16]], s('t1'))} />
      <path className="ink thin" d={poly([[cx + 10, cy + 30], [cx + cw * 0.8, cy + 30]], s('t2'))} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle className="dot" cx={cx + 16 + i * (cw / 3.2)} cy={cy + ch - 16} r={3.2} />
          <path className="ink thin" d={poly([[cx + 24 + i * (cw / 3.2), cy + ch - 16], [cx + 40 + i * (cw / 3.2), cy + ch - 16]], s('st' + i))} />
        </g>
      ))}
      <path className="ink thin" d={chamferRect(cx + cw - 34, cy + 8, 24, 24, s('icon'), 2)} />
    </g>
  );
}

function Template({ x, y, w, s }: { x: number; y: number; w: number; s: (k: string) => string }) {
  const rows = ['icon · title', 'description', 'stars · forks', 'contributors'];
  return (
    <g>
      <path className="ink shape" d={chamferRect(x, y, w, 104, s('tpl'), 2)} />
      <Label kind="mono" anchor="start" x={x + w / 2 + 8} y={y - 12} size={12.5} muted>template</Label>
      {rows.map((r, i) => (
        <g key={r}>
          <Label x={x + w / 2} y={y + 24 + i * 22} size={13}>{r}</Label>
          {i < 3 && <path className="ink thin faint" d={poly([[x + 10, y + 31 + i * 22], [x + w - 10, y + 31 + i * 22]], s('r' + i))} />}
        </g>
      ))}
    </g>
  );
}

export function RepoCard({ layout = 'desk' }: Layout) {
  const title = 'The repo card, made on a miss';
  if (layout === 'phone') {
    const s = (k: string) => `f1c-p-${k}`;
    return (
      <Fig id="f1c-p" w={340} h={600} title={title} desc={F1C_DESC}>
        <Label kind="mono" anchor="start" x={12} y={20} size={12.5}>og:image =</Label>
        <Label kind="mono" anchor="start" x={12} y={38} size={12.5}>opengraph.githubassets.com/…</Label>
        <CardInBrowser x={20} y={56} w={150} h={110} s={s} />
        <Arrow tone="blue" pts={[[70, 166], [70, 222]]} seed={s('req')} />
        <Arrow tone="green" pts={[[120, 222], [120, 166]]} seed={s('hit')} />
        <Label tone="green" anchor="start" x={128} y={192} size={13}>cached copy</Label>
        <Cloud cx={95} cy={252} w={140} h={62} seed={s('cdn')} label="cdn" />
        <Label kind="mono" x={262} y={240} size={13}>TTL, say 1 day</Label>
        <Label muted x={262} y={258} size={13}>then the next</Label>
        <Label muted x={262} y={274} size={13}>request re-renders</Label>
        <Arrow tone="blue" pts={[[70, 284], [70, 342]]} seed={s('miss')} />
        <Label tone="blue" anchor="end" x={62} y={308} size={13}>only on</Label>
        <Label tone="blue" anchor="end" x={62} y={324} size={13}>a miss</Label>
        <Arrow tone="green" pts={[[130, 342], [130, 284]]} seed={s('png')} />
        <Label tone="green" anchor="start" x={138} y={318} size={13}>PNG bytes</Label>
        <Box x={22} y={344} w={140} h={44} label="card service" seed={s('svc')} />
        <Arrow pts={[[162, 366], [204, 366]]} seed={s('fetch')} />
        <Label x={250} y={338} size={13}>fetch stats</Label>
        <Box x={206} y={344} w={120} h={44} label="github api" seed={s('gh')} />
        <Line pts={[[92, 388], [92, 424]]} weight="thin" seed={s('tl')} />
        <Template x={22} y={426} w={140} s={s} />
        <Label muted x={256} y={456} size={13}>~280 ms per render</Label>
        <Label muted x={256} y={474} size={13}>~40% of requests</Label>
        <Label muted x={256} y={492} size={13}>get a cached card</Label>
        <Label muted x={256} y={510} size={13}>(GitHub, 2021)</Label>
      </Fig>
    );
  }
  const s = (k: string) => `f1c-${k}`;
  return (
    <Fig id="f1c" w={880} h={290} title={title} desc={F1C_DESC}>
      <Label kind="mono" anchor="start" x={20} y={26} size={13}>og:image = https://opengraph.githubassets.com/…/owner/repo</Label>
      <CardInBrowser x={20} y={50} w={180} h={130} s={s} />
      <Arrow tone="blue" pts={[[200, 100], [282, 100]]} seed={s('req')} />
      <Arrow tone="green" pts={[[282, 124], [200, 124]]} seed={s('hit')} />
      <Label tone="green" x={241} y={146} size={13}>cached copy</Label>
      <Cloud cx={342} cy={108} w={120} h={66} seed={s('cdn')} label="cdn" />
      <Label kind="mono" x={342} y={172} size={13}>TTL, say 1 day</Label>
      <Label muted x={342} y={190} size={13}>then the next request</Label>
      <Label muted x={342} y={206} size={13}>misses and re-renders</Label>
      <Arrow tone="blue" pts={[[402, 100], [526, 100]]} seed={s('miss')} />
      <Label tone="blue" x={464} y={88} size={13}>only on a miss</Label>
      <Arrow tone="green" pts={[[526, 116], [402, 116]]} seed={s('png')} />
      <Label tone="green" x={464} y={138} size={13}>PNG bytes</Label>
      <Box x={528} y={78} w={130} h={44} label="card service" seed={s('svc')} />
      <Arrow pts={[[658, 100], [752, 100]]} seed={s('fetch')} />
      <Label x={705} y={88} size={13}>fetch stats</Label>
      <Box x={754} y={78} w={118} h={44} label="github api" seed={s('gh')} />
      <Line pts={[[593, 122], [593, 162]]} weight="thin" seed={s('tl')} />
      <Template x={528} y={164} w={130} s={s} />
      <Label muted x={784} y={190} size={13}>~280 ms per render</Label>
      <Label muted x={784} y={208} size={13}>~40% of requests</Label>
      <Label muted x={784} y={226} size={13}>get a cached card</Label>
      <Label muted x={784} y={244} size={13}>(GitHub, 2021)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ rule-box sketch §1 */

const R1_DESC = 'An img tag points at a handler. The handler returns a strip of bytes whose first cells say PNG, and the browser shows a picture. Whether the handler read a stored file or made the image a moment ago does not matter: only the bytes do.';

export function BytesAreAllThatMatter({ layout = 'desk' }: Layout) {
  const title = 'All that matters is the bytes';
  const cells = ['PNG', '', '', '', ''];
  if (layout === 'phone') {
    const s = (k: string) => `r1-p-${k}`;
    return (
      <Fig id="l06-rule1-p" w={320} h={168} title={title} desc={R1_DESC} className="bottomup">
        <Pill x={8} y={24} w={96} text="<img src>" seed={s('pill')} />
        <Arrow tone="blue" pts={[[104, 37], [130, 37]]} seed={s('a1')} />
        <Box x={132} y={20} w={84} h={34} label="handler" seed={s('h')} />
        <Label anchor="start" x={226} y={30} size={13}>stored?</Label>
        <Label anchor="start" x={226} y={46} size={13}>made now?</Label>
        <Label anchor="start" x={226} y={62} size={13}>doesn’t matter</Label>
        <Arrow tone="green" pts={[[174, 54], [174, 80], [80, 80], [80, 104]]} seed={s('a2')} />
        <ByteStrip x={20} y={108} cells={cells} cw={24} seed={s('bytes')} />
        <Arrow pts={[[140, 119], [176, 119]]} seed={s('a3')} />
        <Picture x={182} y={96} w={60} h={46} seed={s('pic')} />
      </Fig>
    );
  }
  const s = (k: string) => `r1-${k}`;
  return (
    <Fig id="l06-rule1" w={480} h={124} title={title} desc={R1_DESC} className="bottomup">
      <Pill x={6} y={38} w={92} text="<img src>" seed={s('pill')} />
      <Arrow tone="blue" pts={[[98, 51], [130, 51]]} seed={s('a1')} />
      <Box x={132} y={34} w={84} h={34} label="handler" seed={s('h')} />
      <Arrow tone="green" pts={[[216, 51], [246, 51]]} seed={s('a2')} />
      <ByteStrip x={248} y={40} cells={cells} cw={24} seed={s('bytes')} />
      <Arrow pts={[[368, 51], [396, 51]]} seed={s('a3')} />
      <Picture x={402} y={28} w={62} h={46} seed={s('pic')} />
      <Label x={174} y={92} size={13}>stored? made just now?</Label>
      <Label x={174} y={110} size={13}>doesn’t matter</Label>
    </Fig>
  );
}
