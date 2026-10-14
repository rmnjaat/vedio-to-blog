// Lecture 07 (lec09), §8 Counting hashtags, 8.1–8.3: Fig 8·a (first sketch: one consumer, batching; D-08 first form),
// Fig 8·b (three #sunset posts on three servers; D-08 with the pipe relabelled user_id) and Fig 8·c (the adapter; D-11,
// with the printed "Image Service" corrected to post svc). Kafka is pulled: consumer → topic arrows are dashed ink.
import React from 'react';
import { Actor, Arrow, Box, Cyl, Fig, Fleet, Label, Worker } from './kit';
import { DocCard, Knock, Msg, partY, Struck, Topic } from './s7-hashtag-storage-parts';

/* ------------------------------------------------------------------ Fig 8·a */

const F8A_TITLE = 'First sketch: one consumer, batching';
const F8A_DESC =
  'A user posts through the post service, which drops the post on a Kafka topic. One consumer pulls a batch of posts, adds up their hashtags in memory (in 1,000 posts: #A 10, #B 10, #C 20) and writes the totals to the hashtag database.';

export function FirstSketch({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const s = (k: string) => `fig8a${layout === 'phone' ? '-p' : ''}-${k}`;
  if (layout === 'phone') {
    return (
      <Fig id="fig8a-p" w={340} h={420} title={F8A_TITLE} desc={F8A_DESC}>
        <Actor x={36} y={24} seed={s('user')} />
        <Label x={36} y={92} size={14}>user</Label>
        <Arrow tone="blue" pts={[[60, 50], [130, 50]]} seed={s('post')} />
        <Box x={134} y={30} w={120} h={40} label="post svc" seed={s('svc')} />
        <Arrow tone="blue" dashed pts={[[232, 70], [232, 128]]} seed={s('pub')} />
        <Label kind="mono" anchor="start" x={40} y={118} size={13}>kafka · post_publish</Label>
        <Topic x={36} cy={146} w={280} ry={16} parts={3} seed={s('kafka')} />
        <Worker x={110} y={210} w={140} h={38} label="consumer" seed={s('cons')} />
        <Arrow dashed pts={[[150, 208], [150, 164]]} seed={s('pull')} />
        <Label anchor="start" x={158} y={192} size={13}>pulls</Label>
        <Label kind="mono" x={170} y={272} size={13}>1,000 posts →</Label>
        <Label kind="mono" x={170} y={292} size={13}>#A: 10 · #B: 10 · #C: 20</Label>
        <Arrow pts={[[96, 229], [60, 229], [60, 334]]} seed={s('write')} />
        <Label tone="green" anchor="start" x={70} y={318} size={15}>batching</Label>
        <Cyl cx={60} top={342} rx={30} ry={7} h={32} label="hashtag db" seed={s('db')} />
      </Fig>
    );
  }
  return (
    <Fig id="fig8a" w={760} h={210} title={F8A_TITLE} desc={F8A_DESC}>
      <Actor x={36} y={52} seed={s('user')} />
      <Label x={36} y={120} size={14}>user</Label>
      <Arrow tone="blue" pts={[[56, 80], [96, 80]]} seed={s('post')} />
      <Box x={100} y={60} w={110} h={40} label="post svc" seed={s('svc')} />
      <Arrow tone="blue" dashed pts={[[210, 80], [256, 80]]} seed={s('pub')} />
      <Topic x={260} cy={80} w={170} ry={18} parts={3} seed={s('kafka')} />
      <Label kind="mono" x={345} y={48} size={13}>kafka · post_publish</Label>
      <Worker x={484} y={62} w={120} h={38} label="consumer" seed={s('cons')} />
      <Arrow dashed pts={[[482, 80], [436, 80]]} seed={s('pull')} />
      <Label x={459} y={70} size={13}>pulls</Label>
      <Arrow pts={[[604, 80], [680, 80]]} seed={s('write')} />
      <Label tone="green" x={640} y={66} size={15}>batching</Label>
      <Cyl cx={716} top={58} rx={30} ry={7} h={36} label="hashtag db" seed={s('db')} />
      <Label kind="mono" x={544} y={140} size={13}>1,000 posts → #A: 10 · #B: 10 · #C: 20</Label>
      <Label muted x={544} y={164} size={13}>(held in memory, then one write per hashtag)</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·b */

const F8B_TITLE = 'Three #sunset posts, three servers';
const F8B_DESC =
  'The post topic is keyed by user_id, so three #sunset posts from three users sit on three partitions and reach three counting servers. Each server has one #sunset, nothing to batch, and writes count++ on its own: three single writes into the hashtag database.';

export function ThreeServers({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const P = layout === 'phone';
  const s = (k: string) => `fig8b${P ? '-p' : ''}-${k}`;
  const posts = ['p31 #sunset', 'p40 #sunset', 'p52 #sunset'];
  if (P) {
    const TX = 40, TW = 280, CY = 74, RY = 39;
    const SY = [204, 260, 316], SX = 40, SW = 140;
    const gut = [26, 18, 10];
    return (
      <Fig id="fig8b-p" w={340} h={460} title={F8B_TITLE} desc={F8B_DESC}>
        <Label kind="mono" anchor="start" x={TX} y={24} size={13}>kafka · post_publish</Label>
        <Topic x={TX} cy={CY} w={TW} ry={RY} seed={s('topic')} />
        {posts.map((p, i) => (
          <g key={i}>
            <Label kind="mono" muted anchor="start" x={TX + 20} y={partY(CY, RY, i) + 4.5} size={12.5}>{`part ${i}`}</Label>
            <Msg x={TX + 104} y={partY(CY, RY, i)} seed={s(`m${i}`)} />
            <Label kind="mono" anchor="start" x={TX + 116} y={partY(CY, RY, i) + 4.5} size={12.5}>{p}</Label>
          </g>
        ))}
        <Label kind="mono" anchor="start" x={TX} y={138} size={13}>key: user_id</Label>
        <Struck x={TX + 114} y={138} text="hashtag" size={13} seed={s('strike')} />
        <Label anchor="start" x={TX} y={162} size={13}>a user’s posts land on one partition</Label>
        {SY.map((y, i) => (
          <g key={i}>
            <Worker x={SX} y={y} w={SW} h={36} label={`server ${i + 1}`} seed={s(`w${i}`)} />
            <Arrow dashed pts={[[SX - 2, y + 18], [gut[i], y + 18], [gut[i], partY(CY, RY, i)], [TX - 4, partY(CY, RY, i)]]} seed={s(`pull${i}`)} />
            <Arrow tone="red" weight="thin" pts={[[SX + SW + 2, y + 18], [262, y + 18]]} seed={s(`wr${i}`)} />
            <Knock x={222} y={y + 12} text="count++" size={12.5} kind="mono" />
            <Label kind="mono" tone="red" x={222} y={y + 12} size={12.5}>count++</Label>
          </g>
        ))}
        <Label anchor="start" x={SX} y={194} size={13}>counting servers</Label>
        <Cyl cx={296} top={206} rx={30} ry={7} h={136} label="hashtag db" seed={s('db')} />
        <Label tone="red" x={170} y={420} size={14}>nothing to batch:</Label>
        <Label tone="red" x={170} y={440} size={14}>three single writes of #sunset</Label>
      </Fig>
    );
  }
  const TX = 40, TW = 360, CY = 96, RY = 42;
  const SX = 482, SW = 190, SY = [36, 98, 160];
  const gut = [444, 452, 460];
  return (
    <Fig id="fig8b" w={880} h={300} title={F8B_TITLE} desc={F8B_DESC}>
      <Label kind="mono" anchor="start" x={TX} y={40} size={14}>kafka · post_publish</Label>
      <Topic x={TX} cy={CY} w={TW} ry={RY} seed={s('topic')} />
      {posts.map((p, i) => (
        <g key={i}>
          <Label kind="mono" muted anchor="start" x={TX + 22} y={partY(CY, RY, i) + 4.5} size={12.5}>{`part ${i}`}</Label>
          <Msg x={TX + 170} y={partY(CY, RY, i)} seed={s(`m${i}`)} />
          <Label kind="mono" anchor="start" x={TX + 184} y={partY(CY, RY, i) + 4.5} size={13}>{p}</Label>
        </g>
      ))}
      <Label kind="mono" anchor="start" x={TX} y={166} size={14}>key: user_id</Label>
      <Struck x={TX + 120} y={166} text="hashtag" size={14} seed={s('strike')} />
      <Label anchor="start" x={TX} y={192} size={14}>a user’s posts land on one partition</Label>
      {SY.map((y, i) => (
        <g key={i}>
          <Worker x={SX} y={y} w={SW} h={38} label={`counting server ${i + 1}`} seed={s(`w${i}`)} size={13} />
          <Arrow dashed pts={[[SX - 2, y + 19], [gut[i], y + 19], [gut[i], partY(CY, RY, i)], [TX + TW + 2, partY(CY, RY, i)]]} seed={s(`pull${i}`)} />
          <Arrow tone="red" weight="thin" pts={[[SX + SW + 2, y + 19], [790, y + 19]]} seed={s(`wr${i}`)} />
          <Label kind="mono" tone="red" x={734} y={y + 12} size={12.5}>count++</Label>
        </g>
      ))}
      <Label x={452} y={22} size={13}>pulls</Label>
      <Cyl cx={830} top={34} rx={36} ry={8} h={150} label="hashtag db" seed={s('db')} />
      <Label tone="red" x={640} y={262} size={14}>nothing to batch: three single writes</Label>
    </Fig>
  );
}

/* ------------------------------------------------------------------ Fig 8·c */

const F8C_TITLE = 'The adapter';
const F8C_DESC =
  'The post topic stays keyed by user ID, because search and notifications already read it. A fleet of hashtag extractors, one consumer per partition, reads each post and writes one (hashtag, post) event per hashtag to a second topic, POST_HASHTAG, keyed by hashtag. Counting servers pull that topic, so each sees every event of its hashtags, and write count += n to the partitioned database.';

export function Adapter({ layout = 'wide' }: { layout?: 'wide' | 'phone' }) {
  const s = (k: string) => `fig8c${layout === 'phone' ? '-p' : ''}-${k}`;
  if (layout === 'phone') {
    return (
      <Fig id="fig8c-p" w={340} h={790} title={F8C_TITLE} desc={F8C_DESC}>
        {/* row 1: the post topic */}
        <Box x={20} y={16} w={120} h={38} label="post svc" seed={s('svc')} />
        <Arrow tone="blue" dashed pts={[[80, 54], [80, 84]]} seed={s('pub')} />
        <Label kind="mono" anchor="start" x={150} y={76} size={13}>kafka · post_publish</Label>
        <Topic x={20} cy={104} w={300} ry={18} seed={s('k1')} />
        <Label kind="mono" anchor="end" x={320} y={144} size={13}>key: user_id</Label>
        <Label anchor="end" x={320} y={170} size={13}>search, notifications read this</Label>
        <Label anchor="end" x={320} y={188} size={13}>topic too: don’t re-key it</Label>
        {/* row 2: extraction */}
        <Fleet x={20} y={236} w={150} h={40} n={3} label="hashtag extraction" countLabel={false} seed={s('ext')} size={12.5} />
        <Arrow dashed pts={[[30, 234], [30, 122]]} seed={s('pull1')} />
        <Label anchor="start" x={38} y={202} size={13}>pulls</Label>
        <Label anchor="start" x={20} y={300} size={13}>#consumers =</Label>
        <Label anchor="start" x={20} y={318} size={13}>#partitions</Label>
        <DocCard x={212} y={232} w={122} lines={['post_1729:', '#sunset #sun', '#nature']} row={21} seed={s('card')} />
        {[0, 1, 2].map((i) => (
          <Arrow key={i} tone="blue" dashed pts={[[126 + i * 12, 278], [126 + i * 12, 384]]} seed={s(`ev${i}`)} />
        ))}
        <Label tone="blue" anchor="start" x={172} y={330} size={13}>n events for</Label>
        <Label tone="blue" anchor="start" x={172} y={348} size={13}>n hashtags</Label>
        {/* row 3: POST_HASHTAG */}
        <Topic x={20} cy={406} w={300} ry={20} seed={s('k2')} />
        <Msg x={60} y={partY(406, 20, 0)} seed={s('tuple')} s={9} />
        <Label kind="mono" x={170} y={448} size={13}>POST_HASHTAG · key: hashtag</Label>
        <Label kind="mono" x={170} y={470} size={13}>e.g. &lt;#sunset, post_1729&gt;</Label>
        <Label x={170} y={494} size={13}>repartitioning and reindexing</Label>
        {/* row 4: counting */}
        <Fleet x={20} y={560} w={150} h={40} n={3} label="counting servers" countLabel={false} seed={s('cnt')} size={12.5} />
        <Arrow dashed pts={[[28, 558], [28, 428]]} seed={s('pull2')} />
        <Label anchor="start" x={36} y={526} size={13}>pulls</Label>
        <Arrow tone="green" weight="heavy" pts={[[110, 602], [110, 668]]} seed={s('write')} />
        <Label kind="mono" tone="green" anchor="start" x={122} y={640} size={13}>count += n</Label>
        {[110, 160, 210].map((cx, i) => <Cyl key={i} cx={cx} top={676} rx={20} ry={5} h={28} seed={s(`db${i}`)} />)}
        <Label x={160} y={736} size={13}>partitioned db</Label>
        <Label x={170} y={760} size={13}>batch and partially update</Label>
        <Label x={170} y={778} size={13}>[per hashtag]</Label>
      </Fig>
    );
  }
  return (
    <Fig id="fig8c" w={860} h={518} title={F8C_TITLE} desc={F8C_DESC}>
      {/* row 1: the post topic, untouched */}
      <Box x={40} y={32} w={130} h={40} label="post svc" seed={s('svc')} />
      <Arrow tone="blue" dashed pts={[[170, 52], [216, 52]]} seed={s('pub')} />
      <Topic x={220} cy={52} w={340} ry={18} seed={s('k1')} />
      <Label kind="mono" x={390} y={24} size={14}>kafka · post_publish</Label>
      <Label kind="mono" x={480} y={94} size={14}>key: user_id</Label>
      <g style={{ opacity: 0.5 }}>
        <Worker x={636} y={14} w={156} h={30} label="search" seed={s('srch')} size={13} />
        <Worker x={636} y={60} w={156} h={30} label="notifications" seed={s('noti')} size={13} />
        <Arrow dashed pts={[[634, 29], [604, 29], [604, 52], [568, 52]]} seed={s('ps')} />
        <Arrow dashed pts={[[634, 75], [604, 75], [604, 52]]} head="none" seed={s('pn')} />
      </g>
      <Label x={714} y={116} size={14}>already depend on this topic:</Label>
      <Label x={714} y={134} size={14}>don’t re-key it</Label>
      {/* row 2: extraction */}
      <Fleet x={220} y={182} w={180} h={44} n={3} label="hashtag extraction" countLabel={false} seed={s('ext')} size={13.5} />
      <Arrow dashed pts={[[228, 180], [228, 70]]} seed={s('pull1')} />
      <Label anchor="start" x={236} y={128} size={13}>pulls</Label>
      <Label anchor="end" x={208} y={210} size={14}>#consumers = #partitions</Label>
      <Arrow weight="thin" head="none" pts={[[400, 204], [438, 204]]} seed={s('callout')} />
      <DocCard x={440} y={180} w={214} lines={['post_1729:', '#sunset #sun #nature']} seed={s('card')} />
      {[0, 1, 2].map((i) => (
        <Arrow key={i} tone="blue" dashed pts={[[350 + i * 14, 228], [350 + i * 14, 326]]} seed={s(`ev${i}`)} />
      ))}
      <Label tone="blue" anchor="end" x={340} y={290} size={14}>n events for n hashtags</Label>
      {/* row 3: POST_HASHTAG, keyed by hashtag */}
      <Topic x={220} cy={348} w={340} ry={21} seed={s('k2')} />
      <Msg x={252} y={partY(348, 21, 0)} s={9} seed={s('tuple')} />
      <Arrow weight="thin" head="none" pts={[[210, partY(348, 21, 0)], [244, partY(348, 21, 0)]]} seed={s('tlead')} />
      <Label kind="mono" anchor="end" x={204} y={partY(348, 21, 0) + 4.5} size={13}>&lt;#sunset, post_1729&gt;</Label>
      <Label kind="mono" x={390} y={392} size={14}>POST_HASHTAG · key: hashtag</Label>
      <Label anchor="start" x={590} y={352} size={14}>repartitioning and reindexing</Label>
      {/* row 4: counting */}
      <Fleet x={220} y={442} w={180} h={44} n={3} label="counting servers" countLabel={false} seed={s('cnt')} size={13.5} />
      <Arrow dashed pts={[[226, 440], [226, 370]]} seed={s('pull2')} />
      <Arrow tone="green" weight="heavy" pts={[[402, 464], [612, 464]]} seed={s('write')} />
      <Label kind="mono" tone="green" x={506} y={454} size={14}>count += n</Label>
      <Label x={506} y={488} size={13}>batch and partially update</Label>
      <Label x={506} y={506} size={13}>[per hashtag]</Label>
      {[642, 700, 758].map((cx, i) => <Cyl key={i} cx={cx} top={446} rx={24} ry={6} h={34} seed={s(`db${i}`)} />)}
      <Label x={700} y={508} size={14}>partitioned db</Label>
    </Fig>
  );
}
