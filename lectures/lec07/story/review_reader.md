# Lecture 9 (lec07): fresh-reader review

Reviewer stance: a working engineer who never saw the class. I read `lectures/lec07/story/page_text.md` in order and checked the source MDX only for figure context and superscripts. I also read the current ending of Lecture 8 (`lec06/c8-thirty-messages.mdx`, §8.6) and the opening of Lecture 10 (`lec10.mdx`, `lec10/s0-header.mdx`, `lec10/s1-…`). I did not open the ledger, transcript or fact-check.

## Overall verdict

This is a strong page. Part 2 in particular has a real spine. Each chapter ends on the exact question the next one opens with (full → which key goes → who talks to it → one box isn't enough → a fourth box joins → a box dies). The byte arithmetic works as plot: 4 bits, 16 B, 12–24 B per list node, 117 vs 27 bytes. Chapter 4's sizeof/zmalloc turn and chapter 6's "the single thread is what makes zmalloc correct" are the best moments on the page.

The weaknesses are at the seams:

1. **The way into the lecture breaks.** Lecture 8 ends by promising "Lecture 9 opens the box … byte by byte". This page instead opens with two chapters on CDC.
2. **Part 1 contradicts itself about its setting.** Does the analysts' copy already exist, or is it being built? Is production MongoDB or MySQL?
3. **Chapter 2 drops chapter 1's cliffhanger.** It opens on a second hook instead.
4. **Part 2's driving problem is "Lecture 1 promised it", not something the reader feels.**
5. **Part 2's premise contradicts its ending.** Part 2 opens on "the cache may forget any key". Chapter 9 then spends itself on replicas and an AOF without ever reconciling the two.

Three clarity holes would stop a careful engineer:

- **6.3** races two plain SETs, where either result is correct, so no bug is shown.
- **5.5** says "one number, no extra structure" and then says Redis keeps a second table of keys that have a TTL. The sampler in our design couldn't find those keys without it.
- **3.2** fights for 4 bits inside a struct that pads to 16 bytes anyway.

The page is about 13.5k words of prose (about 15k with clip transcripts and captions), over the 12k budget. The cuts listed at the end free about 1,400–1,600 words without touching the spine.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Header / overview | 3 | 4 | 4 |
| 1 · The analysts need a copy of production. What could it miss? | 4 | 3 | 5 |
| 2 · Sixty machines kept one copy in sync. How many did it need? | 3 | 4 | 4 |
| Part 1 → Part 2 hand-off (2.5 → 3 opening) | 3 | 4 | 3 |
| 3 · Build the box. Where does a value live, and what is it? | 3 | 3 | 3 |
| 4 · How full is the box? | 5 | 4 | 4 |
| 5 · The box is full. Which key goes? | 4 | 3 | 4 |
| 6 · Every API server calls the box. What do they send, and who goes first? | 4 | 3 | 4 |
| 7 · One box isn't enough. Who knows where kiwi lives? | 4 | 3 | 4 |
| 8 · A fourth box joins. How many keys have to move? | 4 | 4 | 4 |
| 9 · A box dies. Where are its keys? | 3 | 4 | 3 |
| Connection to Lecture 8 / hand-off to Lecture 10 | 2 / 4 | – | – |

---

## Connection to Lecture 8 (lec06, current ending)

**L8-1. The promise and the opening don't match.** Lecture 8 §8.6 ends: "Lecture 9 opens the box. What does a key-value store actually do with a key, on one machine, byte by byte …" A reader who clicks through lands on "The analysts' copy of the blog is quietly missing changes" and two chapters of CDC before any box. The overview's "two copies" framing explains it after the fact, but the click feels like a wrong turn.
Fix (both sides, since Lecture 8 is under revision):
- In Lecture 8 §8.6, add one sentence before the box: "Lecture 9 first makes sure every copy of the data is complete (search, the warehouse, the analysts'), then opens the box."
- In this page's "Where you are", end the Lecture 8 sentence with what this lecture does first: "…and ended by asking what is inside it. One detour first: the copies that must be complete."

**L8-2. The best bridge is unused.** In Lecture 8 a photo change "writes the database and puts an event on Kafka; a worker calls the CDN's purge API" (its recall answer says so). That is exactly the dual write of 1.2 ③.
Fix: in 1.2, after "③ has a name: a dual write", add: "Lecture 8's photo change did exactly this: write the database, then put an event on Kafka." (check source: confirm that the Lecture 8 page states the flow this way. It is on that page, not invented.)

**L8-3. "Where you are" reads like a syllabus.** It is five lectures in one paragraph (1, 2, 3, 5, 8) with no hierarchy.
Fix: keep one clause each for Lectures 1, 2 and 8, which the two parts actually build on. Move the Lecture 3 and Lecture 5 callbacks to where they are used (3 in 5.5 and 7.1, 5 in 7.3); they already appear there. This saves about 60 words.

## Header / overview

**H1. The opening scene contradicts chapter 1.** The overview says "The analysts' copy of the data, fed by events through Kafka, never hears about a single view … Their dashboard is quietly wrong." Chapter 1 then says "There is no data warehouse yet", and "So the company decides to build a copy", and designs the Kafka pipeline from scratch in 1.2. So which is it? Does the copy exist and drift, or is it being designed?
Fix: make the overview conditional: "Feed the analysts' copy from the blog's Kafka events and it never hears about a single view…". Or make chapter 1 start from the existing drifting copy and drop the day-zero history (see 1a).

**H2. The ch8 blurb names the answer.** "find out what consistent hashing does and doesn't do" gives away 8.1's reveal ("The usual fix has a famous name").
Fix: "Count the keys that have to move when you add a node, find a scheme that moves far fewer, and add a node without hurting anyone."

**H3. The ch2 blurb and title sell the war story, not the chapter.** The chapter is mostly how CDC reads (2.1), the checkpoint (2.2) and events vs CDC (2.3). The sixty machines are one section of five. See 2a.

**H4. The kicker is good.** "two copies of the blog's data, one complete and one fast", together with the overview's third paragraph ("what each copy is allowed to give up decides its whole design"), is the right one-line spine. Keep it, and have chapter 9 pay it off (see 9a).

## Chapter 1 · The analysts need a copy of production. What could it miss?

Flow 4 · Clarity 3 · Engagement 5

**1a. Time runs backwards in the first screen.** The chapter opens with Lecture 2's Kafka pipeline "still running". Fig 1·a says the consumer "writes it into a copy that search and the analysts read". Then 1.1 rewinds to "A company that has just launched rarely measures much … no data warehouse yet". The reader loses track of what exists today.
Fix:
- Fig 1·a's description and caption: drop "and the analysts" (the copy is search's).
- 1.1: cut the day-zero history to two sentences: "Until now, dashboards have read production directly, or a read replica, which works for a young company. Then the company hires analysts." Keep the two reasons that matter (personal data; MongoDB vs SQL).
- This saves about 120 words.

**1b. Production is MongoDB here and MySQL in chapter 2.** 1.1 says production "may well be MongoDB", and the copy goes "out of MongoDB and into MySQL". 2.3 then says "The blog's posts live in MySQL, and search runs on Elasticsearch", and Fig 2·c's source is "transactional (MySQL)". A reader can't tell whether the blog switched databases.
Fix: in 2.3, "Take a source in MySQL: CDC keeps it in sync with Elasticsearch…", or keep MongoDB throughout and say "MongoDB (or MySQL)" in Fig 2·c. (check source: which database the example used.)

**1c. "The same four changes" are not the same four.** The paragraph before the clip lists the view count, the likes job, the crashed save and the new table. Then: "Run both pipelines side by side on the same four changes". The clip's four changes are a publish, views++, the crashed save, and likes while CDC is stopped. There is no new table.
Fix: "Run both pipelines side by side on four changes:" and let the clip name them.

**1d. The clip answers the chapter's closing question.** The clip text shows "CDC restarts and resumes from its checkpoint". The chapter then ends: "the tool was stopped and still caught up. How?" The hook is already answered, so 2.2 has less to reveal.
Fix: change the clip's step-6 caption to "CDC restarts and catches up." and keep the word "checkpoint" for 2.2. Or end chapter 1 on the other open question only ("Reads the database" has to mean something concrete).

**1e. "Every warehouse speaks SQL, because the whole analytics field does."** This is circular.
Fix: "Analysts work in SQL, and so does every warehouse."

**1f. The tool advice repeats the figure.** "The sink doesn't have to be a database. It can be Kafka, SQS, Kinesis…" repeats Fig 1·d ("Other sinks are possible: Kafka, SQS, Kinesis, local disk").
Fix:
- Cut the sink sentence.
- Shorten the Debezium/Airbyte paragraph to: "Debezium is built for exactly this; Airbyte is a general data-movement tool with a CDC mode, and easier to set up. Install one and watch what a change looks like."
- This saves about 70 words.

## Chapter 2 · Sixty machines kept one copy in sync. How many did it need?

Flow 3 · Clarity 4 · Engagement 4

**2a. The chapter opens on a new hook instead of answering chapter 1's.** Chapter 1 ends: "'Reads the database' has to mean something concrete, and the tool was stopped and still caught up. How?" Chapter 2 opens with a different company and "Hold that number", then answers chapter 1's question anyway, and pays off the sixty only in 2.4. Two hooks compete. The title also promises a war story while the chapter is about logs and checkpoints.
Fix: make 2.1–2.2 the answer to chapter 1's question, and let the sixty machines answer 2.3's question ("Should every Kafka event become CDC?"), which they do perfectly.
- Retitle the chapter: "The tool stopped and still caught up. How?"
- Move the sixty-machines opening paragraph to the top of 2.3 or 2.4. Keep "Hold that number" there.

**2b. The 80% cost cut is hard to square with the machine count.** "Sixty machines and a Kafka became two ordinary EC2 instances, and that subsystem's infrastructure cost fell by about 80%." Sixty-plus 32 GB machines down to two is about 97% fewer machines, so a reader wonders what the other 20% was. Either name it (the target database? Kafka itself?) or say "most of the cost". (check source)

**2c. "This is a consulting case, as the engineer who advised them tells it."** This is the first of seven anonymous "one engineer" stories on the page (2.4, 4.3 twice, 5.3, 6.1, 8.2, 9.1). By the fourth the reader notices a recurring narrator nobody introduced. See top fix 8.

**2d. Two terms arrive before they are explained.**
- "Logical decoding" and "change streams, which need a replica set" are fine as names, since the paragraph then says "For you it hardly matters".
- "Tiered storage" is introduced and immediately deferred ("later lectures lean on CDC for it heavily"). The tiered-storage sentence and the S3 detour are off-road.
Fix: trim the 2.3 "Raw data has more than one destination" paragraph to the three sinks plus "one CDC can feed several sinks, at the cost of memory per transform". Keep the figure. This saves about 50 words.

**2e. 2.5 is a good hand-off, but it isn't felt (see the next section).** "What CDC won't do" is crisp: eventually consistent, not Spark.

## Part 1 → Part 2 hand-off (2.5 → chapter 3 opening)

**P1. Why switch: it is stated, not felt.** 2.5 explains well why the cache is the opposite copy: hot rows only, fast, may drop a key. But the reason we build it now is "Lecture 1 used that box and promised the course would build it". Then chapter 3 opens with a spec ("GET, PUT, DELETE and TTL … we are very greedy") and no situation.

Part 1 had a felt problem: the dashboard is quietly wrong. Part 2 needs one sentence of its own, ideally reusing the overview's questions ("How does it know it is full? What does it throw away when it is?"). That turns the brief into the questions chapters 4–9 answer.
Fix: end 2.5 with something like: "Every read on the blog goes to that box first, and you can't answer three questions about it: how it knows it is full, what it throws away, and what happens when one machine isn't enough. Build it and find out." Do not invent workload numbers; if the source has a cache size or QPS for the blog, use it here. (check source)

**P2. What carries over is never said.** Part 1's central idea, a log you append to and can replay from a checkpoint, comes back in 9.3 as the AOF ("a log of what happened rather than a write-ahead log"). The page never connects them.
Fix: in 9.3, add one clause: "the same idea as chapter 2's log, turned inward: the node replays its own history instead of a CDC tool reading it." That gives the two parts a shared thread at the end.

**P3. "We are very greedy" and "our Redis/we" break the voice.** The page otherwise talks to "you".
Fix: drop "Everything we want; we are very greedy." "Our Redis" as a name is fine.

## Chapter 3 · Build the box. Where does a value live, and what is it?

Flow 3 · Clarity 3 · Engagement 3

**3a. One sentence is garbled.** "The reference design is Redis, and at each step you will see the choice Redis made, out of a reading of its source and of why it made each decision."
Fix: "At each step you will also see what Redis chose, and why." Cut the Lego-blocks sentence, or keep it to one clause. This saves about 40 words.

**3b. Sharding is deferred twice.** First: "'Distributed' waits … chapter 7." Then in 3.1: "And what about more than one machine? That is sharding, and it waits until this node works."
Fix: cut the second (about 20 words).

**3c. The "let a value grow" paragraph is unmotivated.** "Say a set was given 1,024 bytes…" arrives in 3.1, before values have types (3.2) and before anything needs to grow. It never pays off.
Fix: cut it (about 70 words). Or move it into 4.3 as one line: "a set that doubles is a zfree plus a zmalloc, so the counter stays right."

**3d. Typed values arrive without a reason.** "Now change the requirement a little. A value can be a string, a set, a list, a Bloom filter…" What requirement? The brief listed only GET/PUT/DEL/TTL.
Fix: motivate it from the course: "Lecture 8 kept a set per user in Redis and asked for its size in O(1). So a value can't just be bytes: it can be a set, a list, a Bloom filter…"

**3e. 4 bits inside a 16-byte struct is unconvincing.** The page argues hard for 4 bits over a byte ("every bit in the wrapper is paid once per key"). Then: "The wrapper is 16 bytes on a 64-bit machine." An engineer immediately sees that an 8-byte pointer plus a 4-bit field pads to 16 bytes whether the type takes 4 bits or 32. So why fight for bits?

Chapter 5 is the real answer: the type shares one 32-bit word with a 4-bit encoding and a 24-bit LRU field. Use that as plot.
Fix: after "uses exactly four bits", add: "The other 28 bits of that word aren't wasted; chapter 5 fills them." Then change the "16 bytes" sentence to say the padding is room the next fields will use. (check source: confirm that this matches the Redis header layout the page states in 5.1.)

**3f. The 4-bit rationale is given four times.** It appears in the pause answer, in the Fig 3·c caption, in "Why not a whole byte…", and in the rule box.
Fix: keep the pause answer and the multiplier sentence ("millions of keys, every bit paid once per key"). Cut the rest of "Why not a whole byte" (about 50 words).

**3g. The code and the figure disagree.** The code has `unsigned type : 4;`, while Fig 3·c and Fig 4·b show `int type : 4;` and `int type;`.
Fix: use one spelling everywhere.

**3h. The pause answer is murky.** "Prefix it with a type, or turn it into an object, and every lookup has to dereference and match it."
Fix: "Put the type in the key (say `set:myset`) and every lookup has to parse it; keep the key plain and put the type next to the value."

## Chapter 4 · How full is the box?

Flow 5 · Clarity 4 · Engagement 4

This is the best chapter. The concrete loop (1 MB per pass, 1 GB machine, pass 1,025) is exactly right, and the 4.2 pause sets up 4.3 well.

**4a. "Segmentation fault" answers a question nobody asked, and the box repeats the paragraph.** "A segmentation fault comes only if the program carries on with that unchecked NULL." Then the "Go deeper" box covers ENOMEM, the OOM killer and SIGKILL again.
Fix: in 4.1 keep "malloc returns NULL, or on Linux the OOM killer ends the process", and fold the overcommit sentence and the box into one Go-deeper box of about 70 words. This saves about 90 words.

**4b. "A hint: look at how memory is allocated."** This is classroom voice, and it follows an answered pause.
Fix: "So where does every byte come from?" (the section title already asks it), then straight into malloc.

**4c. A reader asks how zfree knows the size.** `total_size -= size_of(o); // its size, from when it was allocated` raises "how does free know the size?"
Fix: one clause: "the allocator can report a block's size, or zmalloc stores it in a small header before the block". (check source)

**4d. "With malloc at 50,000 places in a code base" reads as made-up.** For one cache code base it is not believable.
Fix: "With malloc at hundreds of places in a code base…", or "in every corner of the code base". (check source)

**4e. "One engineer who read the Redis source found it one of the easiest code bases to skim: by the fifth or sixth day…"**
Fix: cut (about 35 words). The point, "big systems are built on simple solutions", already lands without it.

## Chapter 5 · The box is full. Which key goes?

Flow 4 · Clarity 3 · Engagement 4

**5a. Expiry contradicts itself, and the sampler can't work as described.** Fig 5·d says "what we do: … expires_at … one number, no extra structure". Then 5.5 says the periodic job "samples keys that have a TTL, 20 at a time", and "Redis … does keep one extra index, a second table of just the keys that have a TTL, which is what the sampling walks." A careful reader asks: in our design, how does the sampler find keys that have a TTL, if they are only a field inside each wrapper? It would have to walk every key. And does Redis store the expiry in the wrapper or in that table?
Fix: say it once, in order:
1. The expiry time is one number per key.
2. To sample only keys that have a TTL, you need to find them, so keep a second hash table of just those keys (Redis stores the expiry there).
3. That is cheaper than a priority queue because it has no ordering to maintain.

Then change Fig 5·d's "one number, no extra structure" to "one number, plus an index of keys that have one". (check source for where Redis keeps the expiry.)

**5b. The list-overhead pitch ignores the wrapper you already pay.** "5 bytes of data carrying 12 to 24 bytes of bookkeeping" is vivid. But the reader has just been told the wrapper alone is 16 bytes for the same `a → 2`.
Fix: "…on top of the 16-byte wrapper you already pay." That makes the case stronger, not weaker.

**5c. Too many analogies in 5.4.** There are four: the stock, Wikipedia during the World Cup, the viral song and Google News. On top of that, "In short, LFU pays off when popularity is lopsided" sits at the end of the LRU paragraph.
Fix:
- Keep Wikipedia for LFU and Google News for LRU (they match the recall question).
- Cut the stock and the song (about 110 words).
- Move the "In short" sentence to the LFU paragraph.

**5d. The LFU counter raises an unanswered question.** "…so it fits in 8 of those bits" leaves the reader asking what the other 16 are for.
Fix: "(8 of the 24 bits for the count, the rest for when it last decayed)". (check source)

**5e. Two lines are trimmable.**
- "Anyone can expand the names; what people lack is a concrete test for when each wins" is lecture-voice. Fix: "Here is a concrete test."
- "TTLs mustn't cost much memory, because they aren't that critical" is odd, since expiry is correctness for whoever set it. Fix: "Expiry answers to the same budget: it must not cost a structure per key."

**5f. The section title is fine; the title list is the strongest on the page.** "The interview answer for LRU. What does it cost here?" works. So does "A nightly scan reads every article once. What survives?", and Clip 5·1 is excellent.

## Chapter 6 · Every API server calls the box. What do they send, and who goes first?

Flow 4 · Clarity 3 · Engagement 4

**6a. The race shows no bug.** "a is 10; one sets it to 20, the other to 30. There are three ways to stay correct." Two concurrent SETs are correct whichever wins: last writer wins. A reader doesn't see what "correct" protects, so pessimistic locking, CAS and the single thread all look like solutions to a non-problem. The real hazard is a read-modify-write, which is Lecture 2's lost clap. The page itself names that in 6.5.
Fix: make the 6.3 example an increment: "a is 10 and two clients each add 1. Both read 10, both write 11: one increment is lost, the lost clap from Lecture 2." Then the CAS stepper reads as "a = 11 where a = 10", and the loser retries and gets 12. (check source: whether the example was SET or increment. If it was SET, at least say what "correct" means: "the value one writer read must still be there when it writes".)

**6b. The netcat story is long for what it buys.** It runs about 150 words, plus a code block, to show that HTTP is text over TCP.
Fix: keep the code block and two sentences: "Open a raw TCP connection with netcat and type an HTTP request by hand, and a web server answers; type nonsense and you get 400 Bad Request. A connection carries any bytes; a web server just understands bytes in HTTP's format." Drop "In 2015 … master's … two friends … IoT sensors". This saves about 90 words.

**6c. 117 vs 27 bytes is never made to matter.** The numbers are vivid, but nothing follows from them.
Fix: one sentence of consequence: every call's bytes are parsed on the cache's one thread (this ties to 6.5). Add a per-second figure only if the source has one. (check source)

**6d. Language detail.** "Go's atomic package or C++'s Boost" will make C++ readers expect `std::atomic`.
Fix: "Go's sync/atomic or C++'s std::atomic". (check source)

**6e. "The people who built it challenged every decision. Do we take locks? …"** This is rhetorical filler.
Fix: cut (about 25 words).

**6f. Chapter 6 has a strong ending.** "Notice what running several copies quietly did … somebody has to know which one holds which key" is an excellent hand-off.

## Chapter 7 · One box isn't enough. Who knows where kiwi lives?

Flow 4 · Clarity 3 · Engagement 4

**7a. The four routing ways appear five times.** The 7.2 pause answer lists router, smart client, forwarding and redirect. Then Fig 7·c, the numbered bank list in 7.3, Clip 7·1 and the clip's text version all repeat them. The pause answer also spoils 7.3.
Fix:
- Cut the pause answer to "No. The table could live in other places too, and each place costs something different: an extra hop, or more for the client to know." Let 7.3 deliver the four.
- Consider dropping Fig 7·c, since the clip covers it.
- This saves about 50 words.

**7b. "Peon" will lose most readers.** It is Indian-English office usage; many readers won't know it. The clip text also calls the commission "the bribe", while the prose says "commission".
Fix: "1 · The runner at the door. For a small fee, a runner takes your form…". Use "fee" in both the prose and the clip.

**7c. "Forwarding … brings far too many complications."** Which ones? This is an unexplained verdict.
Fix: name one (for example, every node must hold the full table and keep a connection to every other node, and a request can bounce while the table changes), or drop the verdict. (check source)

**7d. The Sentinel aside is off the road.** "A standalone Redis replica is blunter … Redis Sentinel…" is about failover, not routing a key.
Fix: cut (about 45 words), or move it to 9.2.

**7e. The router in Fig 8·a contradicts 7.4.** 7.4 ends with Redis Cluster choosing redirects so that "you don't need another component". The next chapter's "so far" figure draws a router box, and 8.1 says "the router passes every key through a hash function".
Fix: at the end of 7.4, state our design's choice: "For our build, call whatever holds the map, client, proxy or redirecting node, 'the router'."

## Chapter 8 · A fourth box joins. How many keys have to move?

Flow 4 · Clarity 4 · Engagement 4

**8a. The arithmetic works.** I checked the 8.1 pause: hashes 6, 8, 7, 1, 3, 2 under % 2 then % 3 move K2, K5 and K6. Three of six, as stated. "Half is the lucky case" against N/(N+1) is well handled.

**8b. A superlative in quotation marks with no speaker.** "'the most famous algorithm of all time'"
Fix: drop the quote marks and the superlative: "The usual fix has a famous name, and more myths than any other: consistent hashing."

**8c. The myths are stated twice.** "Plenty of grander claims float around. As one engineer who ran it in production puts it, ignore them…" repeats 8.2's opening.
Fix: cut (about 30 words).

**8d. The Redis slots fact undercuts "Build your own Redis" without comment.** "Redis Cluster … maps every key to one of 16,384 fixed hash slots". So our Redis builds a ring that Redis doesn't use. That is fine, but say so as a choice, and tie it back to chapter 7.
Fix: "That is chapter 7's range table again, with 16,384 fixed ranges: moving a slot moves only its keys. Our build keeps the ring."

**8e. Two near-identical steppers.** Fig 8·c (remove cache 1: snapshot, copy, take off the ring) and Fig 8·d (add cache 5: snapshot, build, add to the ring) are the same procedure. The 8.4 pause ("Is a blank cache 5 enough?") is also answered by Fig 8·c's abrupt step, which the reader has just seen.
Fix: shrink the scale-down to two sentences of prose ("Graceful: copy cache 1's data to cache 3, then remove it. Abrupt: cache 1 dies and its whole slice lands on cache 3 cold."). Keep Fig 8·d as the one stepper. Keep the abrupt sentence: chapter 9 needs it.

**8f. A spoiler for chapter 9.** Fig 8·d step 5 and the 8.4 line "if keys are also copied to the next nodes on the ring (chapter 9), cache 1 may as well keep them" give away chapter 9's answer, copies on the next nodes, before 9.2 asks.
Fix: cut both (about 35 words). 9.2 already makes the callback ("why chapter 8 let cache 1 keep the keys"); reword it to "why cache 1 needn't delete the keys it handed to cache 5".

**8g. Writes during the snapshot go unaddressed.** "Take a snapshot of cache 1 and build cache 5 from it. Then add cache 5…" An engineer asks what happens to writes that hit cache 1 after the snapshot: cache 5 then serves stale values.
Fix: one sentence: "Writes that land on cache 1 between the snapshot and the switch are the gap: replay them, or accept a few stale keys in a cache." (check source)

## Chapter 9 · A box dies. Where are its keys?

Flow 3 · Clarity 4 · Engagement 3

**9a. The part's premise and its ending never meet.** 2.5 sets up Part 2: "it may drop a key whenever it likes, because the database still has it: a lost key costs one miss, not data." Chapter 9 then invests in replicas, replication factors and an AOF, and says only "it matters even for a cache". The reader asks: why, if it may forget? The page has the answer in 8.4: a whole slice gone cold at peak sends every request in it to the database at once.
Fix: open 9.2 with that: "One lost key is one miss. A lost node is a whole slice of misses at once, falling through to the database, chapter 8's peak problem with no snapshot to load. That is why even a cache keeps copies." Echo it in 9.3 for the restart.

**9b. "The ring offers a cheaper shape" is not shown to be cheaper.** Copies on the next nodes still store every key RF times in RAM, the resource the whole part calls the most expensive.
Fix: say what is cheaper: "no idle standby machines: every node serves traffic and holds its neighbours' copies, at the cost of RAM on each". (check source)

**9c. The replication-factor pause never says "3".** The answer explains the definition and cites Dynamo and Cassandra but never states the number for the question asked.
Fix: begin the answer with "Three."

**9d. Too much on virtual nodes and DHTs for a closing chapter.** The 9.1 Dynamo-versus-plain-ring paragraph (about 130 words) and the DHT Go-deeper box (about 95 words) are interesting but off-road at the end of a 13.5k-word page.
Fix: trim 9.1's second paragraph to the trade in two sentences ("Dynamo uses virtual nodes so a failed node's load spreads over all the others; the cost is loading a new node from many sources at once. Some teams prefer the plain ring: snapshot one node, done."). Cut the DHT box and keep the one-sentence "distributed hash table" naming.

**9e. "What you can now do" and the recall questions are good.** They are concrete and match the page. One gap: there is no bullet for "a cache still needs copies, because a lost node is a flood of misses". Add it if 9a is applied.

## Hand-off to Lecture 10 (lec10)

**N1. The hand-off is honest and points the right way.** "Everything here fits in RAM. What if it doesn't?" fits Lecture 10, whose first build is a 1 TB dictionary with no database allowed.
Fix: make it concrete with Lecture 10's own opening: "Lecture 10 starts with a 1 TB dictionary, no database allowed, and builds two storage engines out of plain files…". This number is on Lecture 10's page, so it is not invented.

**N2. Outside this page: Lecture 10's links into this lecture are broken.** These are for the coordinator. Lecture 10's header still says "Yesterday's session built a cache like Redis", and its ForwardChips point to this lecture's old section ids:
- `sec="s5-2"` ("routing a key to its node, and the byte budget") now lands on the LRU-cost section.
- `sec="s6-7"` ("the append-only file") no longer exists.
- `sec="s5"` in `lec10/s1` ("routing a key to its node") now lands on eviction.

Likely targets: routing is `s7-2`/`s7-3`, the byte budget `s3-2`, the AOF `s9-3`.

---

## Retelling in 7 sentences

1. The analysts need a complete copy of production, and feeding it from the API's Kafka events silently drifts in four ways: changes with no event, events too thin to use, a save that crashes before its event (a dual write), and new tables nobody wires up.
2. Change data capture reads the database's own log instead, from a checkpoint, so it misses nothing even after stopping, delivers at least once (so sinks upsert), keeps commit order, and is the right tool for raw data, while events stay right for application context; one company replaced more than sixty consumer machines with two.
3. The other copy, the cache in front of the database, must instead be fast and may forget keys, so you build it on one node under two rules, RAM is expensive and it must never crash: a hash table of keys pointing to small wrappers with a 4-bit type.
4. It knows how full it is by counting every byte in one wrapper around malloc (zmalloc) and checking a maxmemory cap, and when full it evicts with a few bits per key rather than a 24-byte-per-key linked list: random, or sampled LRU/LFU chosen by how keys live (LFU survives scans); expired keys go lazily on read plus by sampling.
5. Clients talk to it over a lean length-prefixed protocol (27 bytes instead of 117), and concurrent writes are handled by locks, compare-and-swap, or, as Redis does, one thread, with several copies per machine to use the other cores.
6. Spread over many nodes, keys are split and routed by a proxy, a smart client, forwarding or a redirect (Redis uses MOVED redirects); hash % N moves most keys when a node joins, a consistent-hashing ring moves only one slice, and a new node should be loaded from a snapshot before it joins.
7. Lopsided rings get virtual nodes, dead nodes are covered by copies on the next nodes (replication factor counts every copy), restarts replay an append-only file, and Lecture 10 asks what happens when the data no longer fits in RAM.

**How hard was it?** It was easy for Part 2: the chapter chain is so tight that each sentence follows from the last. Part 1 was harder than it should be. I had to decide for myself whether the analysts' copy already existed, and whether production was MongoDB or MySQL. The join between the parts was the hardest sentence to write, because the page says *what* the cache is but not *why we build it now*. I was unsure of two facts: where Redis keeps a key's expiry (wrapper or a second table), and what exactly the concurrency in 6.3 protects.

---

## Top 10 fixes, ranked by impact

1. **Fix the entry from Lecture 8, and bridge the dual write (L8-1, L8-2).** Lecture 8 promises "opens the box … byte by byte" and this page opens on CDC. Add one sentence on each side, and name Lecture 8's "write the DB, then put an event on Kafka" purge flow as the dual write in 1.2.
2. **Make chapter 1's setting consistent (H1, 1a, 1b, 1c).** Decide whether the analysts' copy exists (overview) or is being built (1.1). Cut the day-zero rewind. Fix MongoDB in chapter 1 versus MySQL in 2.3 and Fig 2·c, and "the same four changes" versus the clip's different four.
3. **Fix the 6.3 race so it shows a bug (6a).** Two SETs are correct either way. Use an increment (the lost clap) so locking, CAS and the single thread solve a visible problem, and the 6.5 callback to zmalloc lands.
4. **Give Part 2 a felt reason and a carried-over idea (P1, P2).** End 2.5 with the three questions about the box nobody can answer, and tie 9.3's AOF back to chapter 2's log.
5. **Reconcile "the cache may forget any key" with chapter 9 (9a, 9b).** Open 9.2 with "one lost key is one miss; a lost node is a slice of misses at once", and say what the next-node copies actually save.
6. **Make expiry consistent and workable (5a).** Our design needs a way to find keys that have a TTL. Say Redis keeps a second table for them, and fix Fig 5·d's "no extra structure".
7. **Answer chapter 1's cliffhanger in chapter 2 (2a, 1d).** Retitle the chapter around "stopped and still caught up", move the sixty machines to 2.3/2.4 as the answer to "should every Kafka event become CDC?", and keep "checkpoint" out of Clip 1·1.
8. **Thin the anonymous "one engineer" stories (2c, 4e, 6b, 8c, 9d).** There are seven on the page. Keep sixty machines, random eviction and a short netcat. Cut the Redis-source skim, the production-ring claims, and the plain-ring narrator (state the trade instead). Merge the prototype-crash line into the Go-deeper box or drop it.
9. **Make the 4-bit argument survive the 16-byte struct (3e, 3f, 3g, 5b).** Say the type's word is shared with the encoding and LRU bits that chapter 5 adds. Price the LRU list "on top of the 16-byte wrapper". Give the 4-bit rationale once, and use one spelling of the field.
10. **Remove repeated representations and small spoilers (7a, 8e, 8f, H2, 7b, 7e).** Cut the 7.2 pause answer's list of four and possibly Fig 7·c. Collapse the scale-down stepper to two sentences. Drop "replicas on the ring" from 8.4 and Fig 8·d step 5. Reword the ch8 blurb. Replace "peon"/"bribe". State that "the router" means whatever holds the map.

---

## Best cuts to reach the 12k budget (about 1,500 words needed)

Ordered by words saved per unit of story lost. All of these are off-road or repeated, and none removes a step in the chain.

| # | Where | What | ≈ words |
|---|---|---|---|
| 1 | 9.1 + 9.3 Go deeper | Trim the Dynamo/plain-ring paragraph to two sentences; cut the DHT box (keep the one-line "distributed hash table" naming) | 190 |
| 2 | 5.4 | Cut the stock analogy and the viral-song example; keep Wikipedia and Google News | 110 |
| 3 | 1.1 | Collapse the day-zero history to two sentences (also fixes 1a) | 120 |
| 4 | 4.1 + 4.3 Go deeper | Merge the OOM/segfault/overcommit text with the Go-deeper box into one ~70-word box | 90 |
| 5 | 6.1 | Shorten the netcat story to two sentences + the code block | 90 |
| 6 | 1.3 | Cut the sink sentence that repeats Fig 1·d; shorten the Debezium/Airbyte "install one" paragraph | 70 |
| 7 | 3.1 + 3.2 | Cut the "let a value grow" paragraph, the second "sharding waits", and most of "Why not a whole byte" | 140 |
| 8 | 3 opening | Rewrite the garbled reference-design sentence; drop Lego blocks and "we are very greedy" | 50 |
| 9 | 7.2 + 7.4 | Shorten the pause answer (the four ways come in 7.3); cut the Sentinel aside | 95 |
| 10 | 8.2 + 8.3 + 8.4 | Cut the "grander claims" line; collapse the scale-down to two sentences (stepper Fig 8·c becomes prose or goes); cut the 8.4 replica sentence | 120 |
| 11 | 2.3 | Trim the tiered-storage/S3 detour to the three sinks plus the memory cost | 50 |
| 12 | 4.3 + 6.5 + 8.1 | Cut "easiest code base to skim", "the people who built it challenged every decision", and the quoted superlative | 70 |
| 13 | Header "Where you are" | Keep Lectures 1, 2 and 8 only; Lectures 3 and 5 are already called back in place | 60 |
| 14 | 5.5 | "You have built this before … The same machinery fits here" plus the Lecture 3 repeat in "as in Lecture 3", once only | 30 |
| | | **Total** | **≈ 1,285 of prose**, plus the Fig 8·c stepper's step text and the Fig 7·c figure if dropped (≈ 250 more) |

The additions recommended above (L8-1, L8-2, P1, P2, 6a, 9a, 9b, 8g) come to about 200 words, so the net page lands near 12k.
