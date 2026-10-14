# Lecture 06 lesson outline: "Minting unique IDs"

**Promise (one line):** Rewrite one `getid()` function under harder and harder constraints (more machines, threads, reboots, disk cost, ordering, real clocks), then see how Amazon, Flickr, Twitter, Discord and Instagram each answer the same question, and what their IDs buy you for free: fast pagination.

**Dek:** Rewrite one `getid()` function under ever harder constraints, then see how Amazon, Flickr, Twitter and Instagram answer the same question. (From `lectures/course.json`.)

Source: lecture id `lec03`, course position 6 (week 3, day 2), 02:29:51 of class plus the board. Ledger `lectures/lec03/ledger/ledger.jsonl` has 314 items: 314 placed, 0 dropped (see `placement.json`). Design: `learn/design/B-whiteboard-notebook` (followed exactly). Fact-check treatments: `factcheck_applied.md`. Figures: `figures.md`. Clips: `animations.md`. Pause-and-think prompts: `prompts.md`.

---

## How to read this outline

### Spine
There is no product case study in this lecture. The running case is **one function, `getid()`**, rewritten again and again (00:02–00:47), followed by **five company designs as five answers to the same question** (Amazon, Flickr, Twitter Snowflake with Discord, Instagram). Each company reuses a building block the reader made in the first half: batching = flush frequency, static counter = Snowflake's sequence = Postgres's sequencer, safest value = Flickr's reset, time on the left = every scheme. The page points each callback out with a small "you built this in §2.x" link.

The order is the teaching map's option A, with three moves:
1. **"Why custom IDs at all" goes first** (§1). In class it came at 00:45:11 after the build-up; the lecture itself says "that should be the first thing that we should answer". The two-masters picture is the page's opening problem.
2. **"How big should an ID be?" becomes its own chapter (§4)** before the companies. In class the UUID question was answered inside Amazon (01:10:54). Every later company refers back to it ("they didn't use UUIDs because they index badly").
3. **Pagination comes after Instagram (§8)**, not between Twitter and Discord. In class it followed Snowflake. On the page it is the payoff of every time-first scheme (MongoDB, Snowflake, Discord, Instagram), and Instagram's own first requirement names pagination. §6.5 ends with a bridge sentence and a link forward.

Final chapters: 1 Why build your own IDs · 2 Building `getid()` · 3 Order, and why clocks break it · 4 How big should an ID be? · 5 Central services: Amazon and Flickr · 6 Snowflake: IDs without a service · 7 Instagram: Snowflake inside the database · 8 Pagination: the side effect · 9 What to keep.

### Chapters as pages
Each top-level section is its own page. Each opens with a problem in the lecture's case (the `getid()` function or the company in question) and ends with a one-line hand-off to the next chapter (given under **Hand-off** below). The lecture header and "About this class" live on the overview page.

### Voice rules (apply everywhere)
- The page speaks in its own voice: no teacher–student dialogue and no student names. Class Q&A becomes explanation. A student's proposal becomes "One idea raised in class: …", and a proposal the lecture corrected becomes "It is tempting to …; in fact …".
- The instructor's own stories (Amazon's ID team sitting next to him, the 2016 MongoDB benchmark, the REPLACE INTO benchmark, checking index sizes first, the Prometheus disk graph) appear as "the instructor" in prose or a margin note. They are first-hand accounts and are worded as such (the fact-check marks most as unverifiable).
- The lecture's opinions stay attributed as opinions: "microservices are an overkill in most cases", "interviews are crappy" (softened to "interview questions aside"), "Twitter's Snowflake is one of the best ID systems out there".
- Every teacher point stays. Fact-check treatment follows `factcheck_applied.md`, never a silent fix. Hedges stay hedges ("almost impossible", "a rough estimate, don't quote it", "35 or 45 years").
- Arithmetic is shown when the lecture gives numbers (flush 6 + 3 + 1 = 10; 2^10 = 1024; 2^12 = 4096; 2^13 = 8192; 2^41 ms ≈ 69.7 years). Where the lecture's arithmetic slipped (4,096 per ms = about 4 million per second, not 400,000; Twitter's shift is 22, not 23), a SourceNote sits beside it.

### Component vocabulary (design B; NOTES.md "Components")
| Name used here | Design component | Use |
|---|---|---|
| **Prose** | body paragraphs | Default. Paragraph, then diagram, then paragraph (the sample's rhythm). |
| **Figure** | #6 static figure (panels on graph paper; stack below 760px) | Board redraws D-01..D-20 and new figures. Spec in `figures.md`. |
| **StepThrough** | #7 step-through (time runs down, Prev/Next, deep link) | Discrete sequences: the counter evolution, a flush-and-crash, range hand-outs, odd/even recovery. |
| **AnimationClip** | #10 clip (poster = end state, play pill, chapter chips, predict line before) | 4 clips where change over time is the lesson. Spec in `animations.md`. |
| **RuleBox** | #5 key rule (hand-ruled box + small sketch, label "The rule for this whole chapter") | Exactly one per chapter, §1–§8. |
| **PauseAndThink** | #8 sticky note (two choices, reveal; right and wrong verdict text) | 9 prompts (P1–P9). Spec in `prompts.md`. |
| **TradeoffTable** | #11 trade-off table (glyph headers, one red ✕ cell, stacks below 700px) | 5 tables (T1–T5). |
| **MarginNote** | #12 named collapsible aside (title + one-line "skip unless …") | Side stories, "build it yourself", further reading, edge cases. |
| **SourceNote** | #9 sourced fact, headed **"More precisely"** (or "Since the class" for the outdated item) | Placed right after the teacher's point. For wrong / outdated / imprecise-medium items only: 16 ledger items, 16 notes (SN-01..SN-16). |
| **CodeBlock** | the sample's `pre code` | The `getid()` versions, SQL for ranges and upserts, the Snowflake bit packing, Instagram's `next_id()`, the two pagination queries. |
| **ForwardChip** | chip "coming later · week N" (links to the lecture when it exists) | Topics deferred in class, and back-links ("covered in Lecture 3"). |
| **RecallQuestions** | #13 recall (3 questions, `details` reveal) | Exactly 3 per chapter, §1–§8. |
| **AboutThisClass** | lecture header meta + short `details` note | Course-structure facts only. |
| **NotationKey** | #4 notation key, once per lecture | Top of §2 (first chapter with figures beyond the opener), extended with the glyphs this lecture needs: machine (laptop outline), thread (wavy line), bit-field bar, sequence counter. |

### Marker colours (NOTES.md, unchanged)
Blue = request / data path (a call for an ID, an ID travelling back). Green = ack / success (a flush that reached disk, a unique ID confirmed). Red = failure, collision, stale or out-of-order ID, crash, hard limit. Graphite = everything else. Dashed = async (a periodic flush, gossip). Bit-field bars: the **time** field is outlined heavier (it is "the most significant part", the recurring idea), with no colour, because colour is reserved for meaning.

### Cross-links to other lectures (from `lectures/course.json`)
- Back: **Lecture 3, "Locking the airline seats"** (lec05): airline check-in, `SELECT ... FOR UPDATE`, transactions T1/T2, the key-value store on MySQL with `REPLACE INTO`/upsert, range sharding. **Lecture 2, "Medium under load"** (lec01): sharding, multi-master, "the database is the most critical and most brittle component", count++ and atomic increments. **Lecture 5, "Building a load balancer"** (lec08): load balancers, round robin, single points of failure. **Lecture 1** (lec04): B+ trees under soft delete.
- Forward: **Lecture 7, "Instagram photos and hashtags"** (lec09, next week: social networks, CDNs in depth). **Lecture 9, "Build your own Redis"** (lec07, week 5): moving logical partitions, sharding in depth, CDC in depth. **Lecture 8, "Gravatar to unread badges"** (lec06): the senior engineer's hats.

---

## Lecture header (unnumbered, overview page)

- **Kicker:** Lecture 06 · week 3, day 2 · running case: one `getid()` function
- **H1:** Minting unique IDs. **Dek** as above. **Meta:** From a live whiteboard class · Last reviewed · Found an error?
- **TOC** (design #2, "you are here") with the nine chapters below.
- **AboutThisClass** (collapsed `details`, about 140 words): this session is all about distributed ID generators (L-0001; the recording's opening line is garbled, and the course order places it at week 3, day 2). The plan: build the foundations of ID generation from scratch, then see how Amazon, Flickr, Twitter and Instagram do it, plus one side effect worth a demo (L-0006). After the break the second half covers Amazon's central service, Flickr, Twitter, Instagram, and pagination as "a very interesting side effect of having a good ID generation system" (L-0100). "How to use this page": implement every approach yourself. None is fancy, and past cohorts who built them understood far more about why each works, its trade-offs, logical partitions and why dump-and-load matters (L-0007; repeated at the end of class).
- **Before this lecture** (Prose, about 80 words, no new ids): you will need sharding and multi-master from Lecture 2, the airline check-in's `SELECT ... FOR UPDATE` and the MySQL key-value store from Lecture 3, and load balancers and round robin from Lecture 5. Each comes back with a link where it is used.
- **Words:** 300

---

## 1 · Why build your own IDs
**Section dek:** Every database already hands out IDs. Here is the moment that stops being enough, and the question this whole lecture answers.
**Sec-meta:** about 8 min · class 00:00–00:04, 00:43–00:49
**Opening problem:** a growing orders table is split across two MySQL servers, both in master mode, so a write can land on either. Each one auto-increments on its own: 1, 2, 3, 4 on the left, 1, 2, 3, 4 on the right. Order 3 now means two different orders.
**RuleBox (§1):** "Start with a function, not a service." (L-0010). Box body: write ID generation as a function in your own business logic, invoked locally per request. A central ID service is an evolution you reach only if you need it. Sketch: a request box with a small `getid()` inside, and a greyed-out separate "ID service" box with a question mark.
**Estimated words:** 1,100
**Q&A folded in:** increment by the number of servers (00:48:36) → 1.2 PauseAndThink P1 (its payoff is Flickr, §5.7). Shared DB with locks vs shared service (00:47:34) → §3.6.
**Hand-off:** "So: one function, called on every request, that must never return the same value twice. Build it."

### 1.1 What an ID is, and the job
- **Purpose:** state the problem in one sentence before anything else.
- **Opens with:** the two-masters collision above (Fig 1·a).
- **Key points:** an ID is anything that uniquely identifies a row, document, object or event (L-0008). The problem: assign a globally unique ID to anything that asks, i.e. write a function that returns something unique every time it is called (L-0009). This is one of the most misunderstood topics, because auto-increment looks like it already solved it (L-0002, worded with its hedge: the garbled clause is read as "people assume auto-increment is enough"). Most teams don't meet the problem until they hit scale, and with today's internet reach most companies hit that scale sooner than they think (L-0003). Two more reasons to learn it in depth: the computer science behind the solutions is beautiful (L-0004), and good ID schemes have side effects most people never think about; §8 is one (L-0005).
- **Components:** Prose. Figure Fig 1·a.
- **Words:** 350

### 1.2 Where the database's own IDs stop working
- **Opens with:** "But MySQL and MongoDB already give every row an ID. Why build anything?"
- **Key points:** with a sharded or multi-master database, two masters accept writes and don't talk to each other, so each auto-increments 1, 2, 3, 4 on its own and the IDs collide (L-0087, Fig 1·a redraws D-11). You can no longer rely on database IDs, so you need your own ID logic, for example adding a machine ID, and that is where distributed ID generators come in. The company designs in §5–§7 show it in practice (L-0088). A single MySQL's IDs look monotonic only because one engine owns the counter (L-0083, which §3.7 returns to). The fix one idea raised in class: let each master step by the number of masters (one gives 0, 2, 4, the other 1, 3, 5). That works, with a disadvantage the lecture comes back to; Flickr ships exactly this (L-0091 → §5.7).
- **PauseAndThink P1** (two masters, four writes each; fix it with one setting).
- **Words:** 400

### 1.3 A function, not a service
- **Opens with:** the reflex answer, "I'll write an ID microservice."
- **Key points:** don't jump straight to a central ID service. Start with an ID function inside your application, invoked locally per request, and let a service come later only if needed (L-0010) → RuleBox §1. The lecture returns to this at the end: the first instinct is "I'll write a microservice", and good engineers instead look at the problem and the most efficient solution (L-0241, primary home §6.7; here only one sentence and a forward link).
- **Components:** Prose, RuleBox §1. **RecallQuestions §1:** (1) Two MySQL masters each accept inserts with AUTO_INCREMENT. Why do IDs collide, and why doesn't a single MySQL have this problem? (2) Name the one setting change that keeps two masters' IDs apart. What does it give up? (3) Why does the lecture start from a local function instead of an ID service?
- **Words:** 350

---

## 2 · Building `getid()`, one constraint at a time
**Section dek:** One function, six versions. Each new condition (another machine, threads, a reboot, a busy disk) breaks the last version, and the smallest change fixes it.
**Sec-meta:** about 25 min · class 00:02–00:25, Q&A 00:52–00:54
**Opening problem:** `getid()` runs inside every request handler of a service. It must return a value nobody has ever received before, from any machine, ever.
**RuleBox (§2):** "Whenever you see a collision, add the thing that led to it." (L-0016). Box body: then look for a cheaper alternative to adding it (the counter instead of the thread ID, flushing every N instead of every time). Sketch: two IDs `m1-1729` / `m2-1729` with the `m1`/`m2` prefix underlined.
**Estimated words:** 3,100
**Q&A folded in:** back the counter up to a file (00:16:02) → 2.4. Boot counter (00:18:06–00:20:17) → 2.5. Bank of IDs (00:20:52) → 2.5/2.6. Restart from the max row ID in the database (00:52:12–00:53:35) → 2.4.
**Hand-off:** "Every ID is now unique. None of them says which came first. That is the next constraint."

### 2.1 Version 1: the current millisecond
- **Opens with:** the simplest thing that could work.
- **Key points:** time is unique and always moves forward, so return the current epoch millisecond (L-0011; CodeBlock `func get_id() { return get_epoch_ms(); }`). It should work, but something must break, otherwise everyone would use it (L-0012). The price is millisecond granularity: two calls in the same millisecond collide unless you go to micro- or nanoseconds (L-0013). Board line: it works on one machine as long as the code is never called twice within one millisecond (Fig 2·a, D-01).
- **Components:** NotationKey (once, top of §2), Prose, CodeBlock, Figure Fig 2·a.
- **Words:** 300

### 2.2 More machines, then threads
- **Opens with:** the service now runs on two machines.
- **Key points:** two machines can call the function in the same millisecond, and both return 1729: a collision (L-0014). Concatenate the machine ID: `m1-1729`, `m2-1729` (L-0015; M1/M2 is just naming). The standard move: when you see a collision, add the thing that caused it (L-0016) → RuleBox §2. Threads on several cores can call it twice in one millisecond on one machine, so `m1-1729` collides again (L-0017). Thread IDs are integers the OS assigns; T1/T2 is shorthand (L-0018). Fix 1: add the thread ID, `m1-t1-1729` (L-0019; the board's `m2-t3` is drawn as `m2-t2`).
- **Figures:** Fig 2·b (D-02 + D-03 redraw, two panels: machines, then threads inside machines).
- **CodeBlock:** `concat(machine_id, get_epoch_ms())` then `concat(machine_id, thread_id, get_epoch_ms())`.
- **Words:** 450

### 2.3 A static counter, and time drops out
- **Opens with:** appending every cause makes IDs long.
- **Key points:** fix 2 for threads: instead of the thread ID, add a counter, commonly one that resets every few minutes (L-0020). Always appending the cause gives gigantic IDs; a counter avoids that (L-0021). A static counter is one process-wide variable every thread can reach; increment it atomically on every call and threads can't collide (L-0022, with the light inline clarification: static storage, not the heap). `getid()` = machine ID + timestamp + `counter++`: `m1-1729-01`, `-02`, `-03`, then `m1-1730-…` (L-0023). The increment is not atomic by default, so wrap it in a lock/mutex or use a native atomic (L-0024; link back to Lecture 2's count++ race). When to reset is business logic; IDs stay unique because the millisecond moves on, as long as the counter stays under the integer limit (L-0025). Two ways to beat thread collisions: thread ID, or an atomic counter that works for any number of threads (L-0026). Then the lecture's sharp move: with an always-increasing counter, time is redundant. Drop it: ID = machine ID + counter, `m101`, `m102` (L-0027). Its limit: the counter can hit the integer limit, about 4 billion; at 2^64 you'll likely never hit it (L-0028, left as taught: "about 4 billion" is the unsigned 32-bit figure). Machine ID + atomic counter solves uniqueness (L-0029).
- **StepThrough** Fig 2·c "From threads to a counter" (D-04 redraw; steps: thread IDs → counter with time → time struck out → `m1-01`).
- **CodeBlock:** `int counter = 0; return concat(machine_id, get_epoch_ms(), counter++);` → `return concat(machine_id, counter++);` with an atomic-increment comment.
- **Words:** 600

### 2.4 Surviving a reboot
- **Opens with:** the machine restarts at 3 a.m.
- **Key points:** the counter lives in volatile memory, so a reboot resets it to 0 and the machine reissues `m101`, `m102` (L-0030). The root cause is volatility (L-0031). One idea raised in class: back the counter up to a local file, and that is accepted, since volatility is the problem (L-0032). The logic: `counter = load()` at start; on each call `counter++`, save it to disk immediately, then concatenate (L-0033, left as taught, with A-IG-03 woven in as one sourced sentence: a plain write lands in the OS page cache, and only `fsync()` makes it survive a crash, which is also why each save is expensive). Loading once at boot is fine (L-0034). **Tempting alternative:** skip saving and, on restart, read the largest ID already stored in the database (L-0098). In fact that is `load()` by another name, and it assumes every ID is written back to a database as a row. Many IDs are just attached to something and passed on, like a request ID, and writing each one back would be expensive (L-0099).
- **CodeBlock:** `counter = load()` / `counter++; save_counter(counter)` (board "Fault Tolerance").
- **Words:** 450

### 2.5 A disk write on every ID
- **Opens with:** the service now calls `getid()` thousands of times a second.
- **Key points:** saving on every call means a disk IO per ID: many micro IOs and heavy disk pressure (L-0035), and latency, because every ID now waits on disk instead of memory (L-0036). Two ideas raised in class: (a) a **boot counter**: a third part in the ID, read from the file at startup, incremented and written back once; the in-memory counter then starts from 0 and is never saved per call (L-0037). Its costs: the startup increment must be atomic, and the ID gets longer (L-0038). It tackles the disk IO head on, and its long-ID cost comes back in §4 (L-0039). (b) A **bank of IDs**: read 1, store 1001, hand out 1000 from memory, then repeat (L-0040). That is writing to disk periodically instead of every time, and it "comes in handy at two different places" (L-0041; links to §2.6 and §5.2).
- **PauseAndThink P2** (before the two ideas are revealed).
- **Words:** 450

### 2.6 Flush every N, restart from the safest value
- **Opens with:** the bank of IDs, written as code.
- **Key points:** flush frequency: write the counter only every N IDs, e.g. every 1000, cutting disk IO 1000× (L-0042). Code: at startup `counter = load() + N`; on each call `counter++`, and if `counter % N == 0`, save (L-0043). Worked example with N = 3: 1, 2, 3 (3 flushed), 4, 5, 6 (6 flushed), 7, 8, crash. Disk says 6, but 8 was issued; restarting at 6 would reissue 7 and 8 (L-0044). Restart from the safest value: last flushed + N + 1 = 6 + 3 + 1 = 10 (`m1-10`; the code's `load() + N` gives 9, and the first `++` hands out 10, so code and board agree) (L-0045). 8 and 9 are never used, which is fine: correctness matters more than using every integer (L-0046). Takeaway 1: don't do IO every time; add a periodicity, as simple as a `mod`, not a timer thread (L-0047). Takeaway 2: on recovery start from the safest value; always think correctness (L-0048).
- **PauseAndThink P3** (crash after 6 flushed and 8 issued: where do you restart?) sits before the clip.
- **AnimationClip `l03-flush-crash`** (memory counter runs ahead of the disk value; crash; restart from 6 reissues 7, 8 in red; restart from 10 leaves a harmless gap).
- **StepThrough** Fig 2·d (D-05 redraw, the clip's static twin).
- **Figure** Fig 2·e "Six versions of `getid()`" (a ladder of the six code versions with the constraint that forced each; a summary, not a new idea).
- **RecallQuestions §2:** (1) Why did the time part become redundant once the counter was atomic? (2) A boot counter and flush-every-N both cut disk writes. What does each cost? (3) N = 1000, the last value on disk is 5000, the machine crashed. What is the first ID it may issue after restart, and why?
- **Words:** 850

---

## 3 · Order, and why clocks break it
**Section dek:** Some systems need to know which ID came first. Putting time on the left almost does it. Real clocks, and the need for more than one server, are why "almost" is as good as it gets.
**Sec-meta:** about 22 min · class 00:25–00:47, Q&A 00:47–00:52, 02:28–02:29
**Opening problem:** the IDs from §2 (machine + counter) are unique but carry no order. With hundreds of thousands of machines, `m1` can be anything (L-0049).
**RuleBox (§3):** "You cannot distribute ID generation and also guarantee strict order at high throughput, so ask whether you really need that order." (L-0081, L-0086). Box body: integers? random? monotonic? Challenge each requirement with critical questions before you pay for it. Sketch: two clocks reading 23 and 24 with a red ✕ between two IDs.
**Estimated words:** 3,150
**Q&A folded in:** conflict resolution when IDs may not be unique (00:48:11, deferred) → 3.1, answered by §9.1. Shared DB with locks (00:47:34) → 3.6. Random ID instead of counter (00:48:59) and "why not UUID" (00:49:45) → 3.8. Each ID server appends its own ID (00:50:30) → 3.7. Lamport clocks for gossip (02:21:02) → §5.8 (the gossip correction lives there).
**Hand-off:** "If order is negotiable, the next question is size: a UUID is one call away. §4 asks why the big companies still say no."

### 3.1 Why order matters
- **Opens with:** two transactions write the same row.
- **Key points:** new constraint: globally monotonically increasing IDs, so a later request always gets a larger ID wherever it lands (L-0050). Example from Lecture 3's airline check-in: transactions T1 and T2 were ordered by their numbers (L-0051). With "newer write wins" conflict resolution, the larger number marks the newer write (L-0052; board `a = 10`, T1 sets 20, T2 sets 30, which came first? Fig 3·a, D-06). That is one place, not the only place, ordered IDs matter (L-0053). The harder version, how to resolve conflicts when IDs from many machines might not be unique, was asked in class and deferred; §9.1 answers the part the lecture did (L-0090).
- **Figure:** Fig 3·a (D-06 redraw).
- **Words:** 300

### 3.2 Increasing is not the same as sequential
- **Key points:** monotonically increasing doesn't mean 1, 2, 3, 4. The lecture calls 1 2 3 4 5 6 strictly monotonic and 1 2 5 7 8 9 32 33 34 monotonic: each new ID is larger than all earlier ones (L-0054, with the light inline clarification: what the lecture means is *increasing with gaps allowed*; gap-free is usually called sequential).
- **Components:** Prose, small inline number strip.
- **Words:** 150

### 3.3 Put time on the left
- **Opens with:** "What if we flip the order?"
- **Key points:** concatenate time first, then machine ID. Time moves forward and now sits in the most significant digits, so IDs sort naturally: `1729 0001`, `1729 0002`, `1730 0001` (L-0055, Fig 3·b, D-07). The lower part can be the machine ID or a counter (L-0056). Within one millisecond the order can flip (machine 2 answers before machine 1: `17290002` then `17290001`), but across milliseconds IDs are almost monotonic (L-0057). It stays stateless, needs no central state, gives excellent throughput, and accepts a little incorrectness (L-0058). With an integer machine ID the whole ID is just bits (L-0059). That is why ID generators put time on the leftmost side: as time moves the number grows (L-0060, light inline: "so IDs sort roughly by creation time"). It is good but still not a guarantee; the within-millisecond flip is one reason (L-0061).
- **Figure:** Fig 3·b (D-07 redraw).
- **Words:** 450

### 3.4 Clocks drift
- **Opens with:** the design so far assumed every machine's clock reads the same.
- **Key points:** on the time side, clocks are not perfectly synchronized (L-0062). A little misordering inside one millisecond can be let go; misordering by seconds can't, and that is where unsynced clocks bite (L-0063). Servers going out of sync is so common that SRE/DevOps teams run clock sync against NTP servers (L-0064, left as taught; the nuance that this is a continuously running daemon goes in the MarginNote below). Why clocks drift: a hardware clock counts the vibrations of a quartz crystal (L-0065). Physics analogy: give energy and things vibrate faster, water boils; take it away and it freezes (L-0066). So heat makes the crystal run fast and cold makes it run slow (L-0067 → **SourceNote SN-01**, A-IG-25: both temperature extremes make a common crystal run slow; the parabola). Because physics nudges clocks, sync runs more often than you think (L-0068). Even with periodic NTP sync, a clock can be off at the moment an ID is made (L-0070).
- **MarginNote** "You can't run away from nature": Jeff Dean and Sanjay Ghemawat once chased a bug caused by a flipped bit (the lecture says an explosion or solar storm). Article named in class: The New Yorker's "The Friendship That Made Google Huge" (L-0069, unverifiable: attributed, the article title corrected to its real name). Skip unless you like war stories.
- **MarginNote** "How clocks are actually synced": chronyd/ntpd run all the time and nudge the clock faster or slower rather than resetting it (the L-0064 nuance, A-IG-02's 0.5 ms/s slew rate). Skip unless you run servers.
- **Figure:** Fig 3·c "A clock that runs fast, a clock that runs slow" (new: wall time vs true time lines, with sync nudges).
- **Words:** 550

### 3.5 Four machines, four clocks
- **Opens with:** four requests in real-time order.
- **Key points:** machines 2, 4, 7, 9 read 23, 24, 23, 23. Requests go to M2, M4, M7, M9 in that order and come out as 232, 244, 237, 239: not increasing (L-0071, Fig 3·d, D-08). Where you need order, skew affects correctness, so it must be handled (L-0072). Making ID generation strictly monotonic across a distributed system is "almost impossible": no proof was found, but in practice too many things break it (L-0073, hedge kept; left as taught, with Spanner/TiDB as the "you pay for it" footnote in 3.7).
- **PauseAndThink P4** sits before the clip. **AnimationClip `l03-clock-skew`**. **StepThrough** Fig 3·d is its static twin (D-08 redraw).
- **Words:** 300

### 3.6 One server, one clock
- **Opens with:** "Then let one machine hand out every ID."
- **Key points:** a central ID service: one machine; whoever needs an ID makes a network call and gets one back (throughput aside for now) (L-0074, Fig 3·e, D-09). At this point the problem isn't ID generation any more, it's clock synchronization (L-0075). On one machine skew doesn't break order: when NTP finds the clock ahead, it doesn't jump back, it slows down until real time catches up, "the clock never goes back in time" (L-0076 → **SourceNote SN-02**, A-IG-01, A-IG-02: small offsets are slewed, larger ones can be stepped back; generators detect it and wait). So one server always produces increasing IDs wherever requests come from (L-0077 → **SourceNote SN-03**: only if it guards against a backward step). A shared database with locks instead? It would be unique, but it is the same thing: a shared service on one machine (L-0089).
- **Figure:** Fig 3·e (D-09 redraw).
- **Words:** 450

### 3.7 Two servers, gossip, and the impossibility
- **Opens with:** the one ID server is a single point of failure.
- **Key points:** add a second machine behind a load balancer for fault tolerance (L-0078; link to Lecture 5). Now whichever server gets a request must ask the other for its last ID, add a buffer, and only then answer (L-0079). Constant gossip on every ID turns a simple function into a slow, messy system (L-0080, Fig 3·f, D-10, board: "we made the entire process super complicated"). Conclusion: a distributed ID service can't also guarantee strict monotonicity at high throughput (L-0081, light inline clarification + A-IG-20, A-IG-21: systems that do it pay with coordination, either one timestamp allocator (TiDB) or special clock hardware (Spanner)). Every fix brings a new problem, so people relax constraints, because not everyone needs order (L-0082). "But MySQL has monotonic IDs": one machine, one engine owns the counter (L-0083, left as taught + A-IG-13: gaps after rollbacks are normal). Put MySQL in multi-master with auto-increment and watch the conflicts (L-0084, left as taught + A-IG-12: MySQL Group Replication sets increment/offset for exactly this, uniqueness without order). Another idea raised in class: each ID server prefixes its own server ID. Correct, and it gives up monotonicity, which is fine (L-0095).
- **Figure:** Fig 3·f (D-10 redraw, gossip arc scribbled red).
- **Words:** 500

### 3.8 Relax the constraint
- **Opens with:** "So how do people actually do it?"
- **Key points:** everything in software is a trade-off: you gain something and lose something (L-0085). When handed ID requirements, ask whether you need each one: can IDs be non-integers, random like UUIDs, not monotonic? Requirements often say "monotonic" because nobody thought it through (L-0086) → RuleBox §3. Why a counter and not a random suffix? The counter was there for order; drop that need and a random ID like a UUID works (L-0092). Why not UUIDs everywhere? You can, if you relax order: you get some, you lose some (L-0093 → **SourceNote SN-04**, "Since the class": UUIDv7, RFC 9562, keeps rough time order at 128 bits; A-IG-05: PostgreSQL 18's `uuidv7()`). Where UUIDs and MongoDB IDs fit is the next chapter (L-0094). No single right way: each approach wins somewhere and loses elsewhere; choose what you want and what you can give up for throughput and efficiency (L-0096).
- **RecallQuestions §3:** (1) Machines read 23, 24, 23, 23; IDs are time then machine. Requests go to machines 2, 4, 7, 9. Which IDs come out, and which pair breaks order? (2) Why does one ID server give ordered IDs, and what has to be true of its clock for that to hold? (3) Name two questions to ask before accepting "IDs must be monotonic".
- **Words:** 450

---

## 4 · How big should an ID be?
**Section dek:** A UUID is unique with no coordination at all. The companies in this lecture still turned it down, and the reason is the index.
**Sec-meta:** about 14 min · class 01:10–01:20
**Opening problem:** the orders table from §1 uses 4-byte integer IDs. Someone proposes switching to UUIDs so any server can mint IDs without talking to anyone.
**RuleBox (§4):** "Keep IDs small: your indexes, and so your IDs, need to fit in memory." (L-0136 with SN-06's wording, L-0148). Box body: 4 or 8 bytes is fine; past 8 bytes, worry at scale. Sketch: an index block inside a RAM box, and a bigger block spilling out to a disk glyph in red.
**Estimated words:** 1,900
**Q&A folded in:** "If monotonicity isn't needed, why not UUIDs?" (01:10:54) → 4.1 opener.
**Hand-off:** "Small, unique, and made without a fight between servers: here is how Amazon and Flickr did it with a plain database in the middle."

### 4.1 Why not just use a UUID?
- **Key points:** asked in class: if order isn't required, why not UUIDs? (L-0128). The lecture's answer: companies at scale avoid them because they are extremely inefficient at scale (L-0129 → **SourceNote SN-05**, A-IG-04: random v4 UUIDs land at random places in the index and are big; v7 or 64-bit IDs avoid most of it). A UUID is 128 bits, a value you can read as a gigantic integer (L-0130).
- **Words:** 250

### 4.2 Every index carries the ID
- **Key points:** the week-2 pre-reads had a video on how indexes speed up reads (L-0131; cross-link to Lecture 3). An index is itself a table, effectively a B+ tree of the indexed values plus the IDs of the rows they point to, managed by the database (L-0132, left as taught; what the "row ID" is depends on the engine, see A-D-01 next). Example: on a posts table, an index on `user_id` is a two-column table of `user_id` and `post_id` (L-0133, Fig 4·a). In a dense index every entry also stores the row ID, so a big ID type makes every index bulky (L-0134 + A-D-01: in InnoDB every secondary index stores the primary key; MySQL's docs: a short primary key is "advantageous"). A 16-byte UUID vs a 4-byte integer is 4× bigger: a 1 GB index becomes 4 GB (L-0135, light inline: 4× against INT but 2× against an 8-byte BIGINT, the realistic comparison, and index size doesn't grow exactly with key size). The lecture itself calls the 4× a rough estimate, "don't quote it" (L-0154).
- **Figure:** Fig 4·a "An index is a smaller table" (new). **PauseAndThink P5** (1 GB index, switch to UUID).
- **Words:** 450

### 4.3 Indexes belong in RAM
- **Key points:** for full speed a database must fit its indexes in RAM; if they don't fit, nothing else will make it fast (L-0136 → **SourceNote SN-06**: the hot part of the indexes, the working set, must fit the buffer pool) → RuleBox §4, worded with SN-06's precision. A query first builds a plan and does its work on the small indexes, e.g. a join on indexed columns, and only at the end reads full rows from disk (L-0137, light inline + A-D-03: a covering index can skip the table; otherwise rows are fetched as it goes). With indexes in RAM the whole execution is in memory except for reading the result rows (L-0138, left as taught). A database loads indexes into RAM at boot or when a query needs them, and keeps them (L-0140, left as taught + A-D-02: InnoDB caches pages as read, evicts least-recently-used ones, and by default reloads the hottest 25% at startup). RAM should be at least the total index size, or queries crawl (L-0141, light inline: size the buffer pool for hot indexes and data, and RAM must exceed that). Flickr's engineering blog makes the same point, and the lecture agrees (L-0155). Provisioning heuristic for the real world (interview questions aside): the bare minimum memory is the sum of all index sizes (L-0156, left as taught). The database is the most essential and most brutal component: everything else is stateless and easy to scale (L-0157; link to Lecture 2's "most critical, most brittle"). Learn your database's fundamentals well (L-0158).
- **MarginNote** "The first thing to check": when someone says their database is slow, the instructor checks index sizes first. Usually there are random indexes, and they have spilled to disk (L-0139, attributed; the fact-check adds slow-query logs and EXPLAIN as the other usual first checks). Skip unless you debug databases.
- **Figure:** Fig 4·b "Where a query runs" (new: plan on indexes in RAM, last step reads rows from disk; red variant with the index spilled).
- **Words:** 550

### 4.4 When a UUID is the right call
- **Key points:** UUIDs are good for security in one sense: they look random, so nobody can guess the next one or walk your site (L-0143 → **SourceNote SN-07**, A-IG-07: they slow enumeration but are not a security control; every request still needs an authorization check). If Facebook exposed IDs 1, 2, 3, a loop from 0 to a billion would scrape it (L-0144). UUIDs aren't forbidden: for an app that will never reach that scale they're fine. Don't reach for the best solution by default (L-0145).
- **Words:** 250

### 4.5 MongoDB's 12 bytes
- **Key points:** MongoDB's ObjectId is 12 bytes: 4 bytes of epoch time (first), 5 random bytes, a 3-byte counter (L-0146, Fig 4·c, D-13, + A-IG-08: second resolution, the random part per process, so they sort roughly by creation second). The blog post screen-shared later in class lists the older layout (machine and process ID where the random bytes are now); both are 12 bytes, and the caption says so. Nothing stopped MongoDB using UUIDs; the lecture reads the 12 bytes as a choice to save four (L-0147, attributed as the lecture's inference). MySQL's auto-increment is a 4-byte integer, a tiny index; 4 or 8 bytes is doable, beyond 8 worry at scale (L-0148, left as taught + A-D-07: INT 4 B, BIGINT 8 B, and an AUTO_INCREMENT column fails at its type's limit). The recurring pattern: time on the left, ID small. It is why the long IDs of §2.5 were a cost (L-0149). Every company that follows turns UUIDs down for indexing (L-0150), and later designs avoid them for this reason (L-0142).
- **TradeoffTable T1** "How big is the ID?": columns MySQL INT · BIGINT / Snowflake · MongoDB ObjectId · UUID. Rows: bytes · ordered by time? · made where? · index cost · good for. Red ✕ on UUID v4's "ordered by time?" cell: "no (v7 is)". Ids L-0135, L-0146, L-0148, L-0194, L-0130.
- **RecallQuestions §4:** (1) Why does the size of the primary key affect every index on a table? (2) What must fit in RAM for a database to stay fast, more precisely than "all the indexes"? (3) Give one honest reason to choose a UUID, and the scale at which the lecture says it's fine.
- **Words:** 400 (plus the table)

---

## 5 · Central services: Amazon and Flickr
**Section dek:** Two ways to make one place responsible for IDs without making every request wait on it: Amazon hands out ranges, Flickr turns MySQL's auto-increment into a ticket machine.
**Sec-meta:** about 36 min · class 00:59–01:36, Q&A 01:08–01:11, 01:31–01:36, 02:21–02:24
**Opening problem:** Amazon's order service and payment service both need IDs on every request, on many servers, and the orders database is sharded.
**RuleBox (§5):** "Find the core property you need, here an atomic increment, and use any system that gives it." (L-0304). Box body: Amazon gets it from a `FOR UPDATE` transaction, Flickr from an upsert, a queue or Redis would do too. Sketch: a counter cell `500 → 1000` with a lock glyph.
**Estimated words:** 3,900
**Q&A folded in:** track used range IDs (01:08:50) → 5.3. Queue of ranges (02:22:47) → 5.4. What the stub is for (01:31:41) → 5.5. How the reset works, what value (01:33–01:35) → 5.8. "Not monotonic without the reset" (01:35:16) → 5.8. Lamport clocks / gossip (02:21:02) → 5.8.
**Hand-off:** "Both designs still keep a service someone must run. Twitter's answer removes it."

### 5.1 How to read someone else's design
- **Opens with:** before four company designs, one way to read them.
- **Key points:** so far the lecture has built only the core idea; each company shows what its design gains and loses (L-0097). Focus on the beauty of the design and take its good parts rather than listing faults such as "a MySQL query per ID is slow"; it was their decision (L-0160). Like neighbours fighting: you may think both are wrong, but it's their life (L-0161). There are videos on this design; this page goes into implementation, and after Lecture 3's airline check-in it's a piece of cake (L-0108).
- **Words:** 200

### 5.2 Amazon: hand out ranges, not IDs
- **Opens with:** the order service's server boots and needs IDs.
- **Key points:** the instructor knows this design because the team that built it sat next to him and explained it in a public tech talk (L-0101, attributed). Amazon gives every order a globally unique ID, and the same service gives IDs to many other internal services (L-0102, attributed). It leans on batching, one of the most effective ways to get performance out of any system (L-0103; the lecture's wording is partly lost, kept as "one of the most effective"). Small enough to write in about 150 lines of Python, so write it (L-0104). Architecture: plain API servers exposing ID endpoints behind a load balancer, backed by a database (L-0105, attributed), a classic relational one, nothing fancy (L-0106). Core idea: a server gets a batch of IDs in one call instead of calling per ID, the same idea as flushing every 1000 in §2.6 (L-0107). Orders and payments only need uniqueness, not order (L-0109). One row per service holds its counter (L-0118). On boot an orders server asks for 500; the ID server runs one SQL update, sets the stored value to 500 and returns 0–500 (L-0110). It returns only start and end, since IDs are integers (L-0111). It's atomic: `SELECT … FOR UPDATE` in a transaction, then update (L-0112). That is Lecture 3's airline check-in transaction, copied over (L-0121). Walkthrough: server 1 gets [0, 500), server 2 gets [500, 1000); payments get [0, 2000) (L-0113). A server refills when it's about to run out: at 490 of 500 it asks again and might get 3000–3500 (L-0119; A-IG-24 is used in §9.2, not here).
- **StepThrough** Fig 5·a "Ranges from one row" (D-12 redraw; steps follow L-0110, L-0113, L-0119).
- **CodeBlock:** the range transaction (`BEGIN; SELECT counter FROM id_ranges WHERE service = 'orders' FOR UPDATE; UPDATE id_ranges SET counter = counter + 500 …; COMMIT;` returning old and new).
- **Words:** 750

### 5.3 What ranges buy, and what they cost
- **Key points:** servers keep the range in memory and stamp orders with it, writing into their own orders database; optionally a per-service prefix (L-0114). The ID service decouples the system: the orders database can be sharded and scaled with every shard taking writes, and nobody calls the ID service per ID (L-0115). 500 is a toy; real batches are 10,000, 50,000, 100,000 by throughput (L-0116, attributed). Batch size trade-off: a crash loses the range; small batches mean frequent calls, big ones lose more on a crash; each service tunes it (L-0117). No order across servers, only uniqueness (L-0120). Simple to build: one database is the single source of truth, no gossip, each request one tiny update (L-0122, left as taught; one clause notes that this database is a single point of failure that range batching keeps off the hot path, from the fact-check nuance, no correction tone). **Tempting fix:** track how much of each range a server used so a restart resumes and nothing is wasted, e.g. 9,900 of a 10,000 batch (L-0123). In fact tracking every ID is a massive overhead and a 2^64 space will never run out, even at Amazon (L-0124). Think practically: nobody cares about using every integer (L-0125). We underestimate numbers: a million and a billion are both huge, and the gap between them is itself almost a billion (L-0126). A 4-byte integer is about 4 billion orders; past that, 64 bits (L-0127, left as taught).
- **MarginNote** "Number sense": L-0126, L-0127 as a two-line callout. Skip unless numbers bore you.
- **Words:** 500

### 5.4 Ranges from a queue?
- **Key points:** an idea raised in class: let the ID generator push ranges into a queue and servers read a batch at a time. It works (L-0302). It moves the atomicity to the queue's reads; the core property is an atomic read, and the database, a queue, DynamoDB or Redis can all give it (L-0303 → **SourceNote SN-08**, A-IG-22, A-IG-23: an at-least-once queue can redeliver a range and duplicate IDs; an atomic counter that over-counts only wastes a range). Focus on the core property; any system that has it is good enough (L-0304) → RuleBox §5.
- **Components:** MarginNote "Variants: a queue, Redis, DynamoDB" (holds L-0302, L-0303 and SN-08). The RuleBox sits in prose after it.
- **Words:** 300

### 5.5 Flickr: MySQL as the ticket server
- **Opens with:** Flickr's photos database is sharded and multi-master, the §1 problem exactly.
- **Key points:** Flickr was the big photo site before Instagram (L-0151, light inline: launched 2004, so "the Instagram of the 2000s"). Its database was sharded and multi-master, so per-shard auto-increment would collide (L-0152). Its blog says they skipped UUIDs because they index badly (L-0153). Flickr built a central "ticket server" on MySQL: ask MySQL, get an ID (L-0159). Idea: if MySQL already auto-increments, MySQL can be the ID service, answering the earlier class question about using the database as the generator (L-0163). The ticket database is separate from the photo shards and only lends its auto-increment (L-0164). Table `tickets`: `id` BIGINT unsigned auto-increment primary key (2^64 space), and `stub` with a unique key (L-0162, Fig 5·c, D-14). Naive use: delete the row and insert a new one; the auto-increment gives the next ID (L-0165). `stub` exists only because you can't insert an empty row; its value is a dummy constant whose job is to hit the unique key (L-0166). Request flow: post a photo → photo API server asks the ticket server for an ID → stores the photo in the sharded photos DB (L-0174, Fig 5·b, D-15).
- **Figures:** Fig 5·b (D-15 redraw), Fig 5·c (D-14 redraw).
- **Words:** 550

### 5.6 Upsert: one statement instead of delete + insert
- **Key points:** delete-then-insert can run in one transaction (the board: "extremely costly on the DB"), or become an upsert, since delete + insert = upsert (L-0167, light inline: the single upsert statement replaces the pair). Upsert: insert; if the key exists, update instead (L-0168). MySQL's `INSERT … ON DUPLICATE KEY UPDATE` runs your update when the insert hits a unique key (L-0169 + A-D-05: affected-rows 1/2/0, avoid it on tables with several unique keys). The second way, `REPLACE INTO`, deletes the row and inserts a new one; it came up in Lecture 3's key-value store (L-0170 + A-D-04: it also resets unlisted columns and fires DELETE triggers). The instructor benchmarked REPLACE INTO at about 32× slower than ON DUPLICATE KEY UPDATE; either works, what matters is the upsert (L-0171 → **SourceNote SN-09**: REPLACE is usually slower, ~32× was one setup, and it resets columns; prefer ON DUPLICATE unless you want a fresh row). The class query: `INSERT INTO tickets (stub) VALUES ('a') ON DUPLICATE KEY UPDATE id = id + 1;`, so the id goes 74 → 75 → 76 (L-0172 → **SourceNote SN-10**, A-IG-09: Flickr's published query is `REPLACE INTO Tickets64 (stub) VALUES ('a'); SELECT LAST_INSERT_ID();`, and with step 2 an explicit `id + 1` would break the odd/even split). It leans on MySQL's atomicity (L-0173).
- **CodeBlock:** both forms, the class's and Flickr's, labelled.
- **Words:** 500

### 5.7 Two ticket servers, odd and even
- **Opens with:** one ticket server is a single point of failure (L-0175).
- **Key points:** put two ticket databases behind a load balancer so one can fail; it looks like §3.7's problem, but here nobody needs order. It is the step-by-N idea from §1.2 (L-0176 + A-IG-11: Flickr deliberately doesn't replicate between them; locking "would kill the performance"). Increment by 2: one server issues odd IDs, the other even (L-0177). MySQL settings: `auto_increment_increment = 2`, `auto_increment_offset = 1` and `2` (L-0178, Fig 5·d, D-16). Round robin alternates the servers, so IDs come out 1, 2, 3, 4… almost in order (L-0179 + A-IG-10: Flickr's sides drift, a few hundred thousand more odds than evens, "but this hurts no one"). If one dies, the other carries on (L-0180). Also linked from 1.2 (L-0091).
- **Figure:** Fig 5·d (D-16 redraw).
- **Words:** 400

### 5.8 When the odd server comes back
- **Key points:** the odd server dies after 5; the even one carries on to 202. It comes back and resumes where it was, because MySQL persists the counter: 7, 204, 9, 206. That looks odd but every ID is still unique: aesthetics, not correctness (L-0181 + A-IG-14: InnoDB persists the counter in the redo log; after a crash before the flush a recent value can come back). Optional fix: take the max (202), add a buffer (to 240), and restart the two sides at 241 and 242 so round robin continues 241, 242, 243, 244 (L-0182; the board shows 240/241 and 239/240, the page uses one consistent example). The reset is for looks; strict order was never promised, and "nearly monotonic" is a byproduct (L-0183). Simple but brilliant (L-0184). Who resets: an SRE, or automation that finds the max, adds a buffer, sets the values and restarts the processes (L-0185, left as taught; the fact-check nuance that the variables are dynamic and Flickr never resets goes in SN-11's margin, not as a correction). What value: the architect's call, and "the safest value" from §2.6 again (L-0186). **Tempting objection:** without the reset IDs aren't monotonic. In fact monotonicity was never enforced here (L-0187). Not everyone needs it; social media has no reason to care (L-0188). Did the two servers gossip, e.g. with Lamport clocks? The lecture wasn't sure Flickr specified, and didn't think Lamport clocks are used for gossip (L-0299, light inline: Flickr's post never mentions gossip, and Lamport clocks can appear in gossip systems). Flickr "only said abstractly they need to gossip"; you could write your own, checking the greatest IDs and adding a buffer (L-0300 → **SourceNote SN-11**: Flickr's two servers never coordinate; odd/even keeps them unique and they're allowed to drift). Whatever is used, both servers must agree on the value the other will pick (L-0301, light inline: only for the optional aesthetic reset).
- **PauseAndThink P6** before the clip. **AnimationClip `l03-odd-even`**.
- **TradeoffTable T2** "Amazon vs Flickr": columns Amazon ranges · Flickr ticket servers. Rows: where IDs come from · network calls per ID · what's stored · single point of failure, and the fix · order · lost on a crash · you build. Red ✕ on Flickr's "network calls per ID" cell: "one per ID". Ids L-0107, L-0117, L-0120, L-0159, L-0175, L-0176, L-0183.
- **RecallQuestions §5:** (1) Why does Amazon return a range's start and end instead of a list of IDs, and what happens to the rest of the range if the server crashes? (2) What is Flickr's `stub` column for? (3) The odd server died at 5 and the even one reached 202. Is "7, 204, 9" a bug? What would you change, and why is it optional?
- **Words:** 700 (plus the table)

---

## 6 · Snowflake: IDs without a service
**Section dek:** Twitter's 64-bit layout puts time, machine and counter in one integer, with no service in the path. Discord and Sony reuse it with a different start date.
**Sec-meta:** about 20 min · class 01:36–01:44, 01:54–02:03, Q&A 02:16–02:18, 02:28–02:29
**Opening problem:** tweets are one of the highest-throughput writes in the world, spiking during big events (L-0211). A central ID service in that path is one more thing to scale.
**RuleBox (§6):** "Simple systems scale: understand the context and build only what you need." (L-0245). Box body: not every problem needs a new service. Sketch: an API server box with a small dot (the function inside) and no arrow leaving it.
**Estimated words:** 2,600
**Q&A folded in:** what the counter is (02:01) → 6.2. Custom epoch arithmetic (02:01:25) → 6.6. Comparing IDs across machines, who assigns machine IDs (02:17) → 6.4/6.5. Snowflake and round robin, monotonicity (02:28) → 6.5.
**Hand-off:** "Instagram wanted the same layout and refused to run it in the API servers. They put it in the database."

### 6.1 Twitter's Snowflake
- **Key points:** after two central services comes decentralized generation: a piece of logic, not a service; Twitter calls it Snowflake (L-0189, light inline: Twitter's 2010 Snowflake was itself a network service; the decentralized library style is how many others run it). Twitter still uses it, and the lecture rates it among the best ID systems (L-0190, left as taught + A-IG-15 in SN-13). Named after snowflakes, no two alike (L-0191, attributed as the lecture's reading; the name isn't explained by Twitter). Numberphile has a video on why real snowflakes are unique (L-0192). Tweet IDs are Snowflakes; Discord and Instagram adopted it (L-0193). 64 bits, deliberately small (L-0194). 64 rather than 128 bits matters at Twitter's scale: 128 would double the space for IDs in everything stored and indexed (L-0195). Like MongoDB's ID, but smaller (L-0196).
- **MarginNote** "Why 'Snowflake'?": L-0191, L-0192. Skip unless curious.
- **Words:** 350

### 6.2 41 | 10 | 12
- **Key points:** the first 41 bits are milliseconds, time on the left again (L-0197, left as taught; the page doesn't claim 1970, it says "milliseconds from an epoch", which 6.6 picks up). The next 10 bits are the machine ID, which the lecture places on Twitter's API servers (L-0199, light inline: in Twitter's original these identified Snowflake server processes). So at most 2^10 = 1024 machines (L-0202, light inline: generator processes, not API servers). The last 12 bits are the per-machine counter, the static counter from §2.3, atomically incremented (L-0203, left as taught; one clause: 41 + 10 + 12 = 63, the top bit stays 0). To make an ID a server needs only the time, its machine ID and its counter (L-0204). 2^12 = 4096 IDs per millisecond per machine (L-0205). That is humongous headroom (L-0206 + A-IG-16: Twitter's stated need was 10k IDs per second per process). A collision would need more than 4096 requests in one millisecond on one machine; the lecture puts that at 400,000 per second and says nobody does it (L-0207 → **SourceNote SN-12**: 4,096 per ms is about 4 million per second; the conclusion holds).
- **Figure:** Fig 6·a (D-17 redraw: the 64-bit bar with the unused top bit drawn as a thin grey cell). **PauseAndThink P7** (how many machines, how many IDs per ms).
- **Words:** 450

### 6.3 Where Snowflake runs
- **Key points:** tweet creation: request to an API server, basic validation, Snowflake makes the tweet ID, the tweet goes to a heavily partitioned tweets DB (L-0200, light inline: in Twitter's 2010 design the API tier called a separate Snowflake service). Snowflake as the lecture describes it is a library inside the API servers, plain bit manipulation (L-0201 → **SourceNote SN-13**, A-IG-15: Twitter's ran as a Thrift service in Scala; Sonyflake is the library-style example). The benefit (board list): no moving part, no service, just a function call, no extra load on the database; request in, ID made, row stored (L-0210, light inline: true of the library form; Twitter's servers' win was that they never coordinate). That is why Twitter scales; it avoids scaling a separate ID tier for one of the busiest workloads (L-0211, light inline: Twitter did run and scale a Snowflake tier; uncoordinated nodes made it easy).
- **Figure:** Fig 6·b (D-18 redraw, captioned "the design as taught; see the note on Twitter's 2010 service").
- **Words:** 350

### 6.4 Making one: a few lines of bit arithmetic
- **Key points:** three lines, even one (L-0208, left as taught; the CodeBlock adds the two guards a real generator has, wait for the next millisecond when 4096 are used, refuse when the clock steps back, labelled as such). Take time, machine ID and the atomic counter; shift time left by 23 bits and OR the parts (L-0209 → **SourceNote SN-14**: Twitter's shift is 22 (10 + 12); 23 = 13 + 10 is Instagram's). Machine IDs can be assigned, e.g. by ZooKeeper when a machine starts (L-0293).
- **CodeBlock:** `id = (ms - epoch) << 22 | machine_id << 12 | seq` with comments, and the class's `<< 23` noted as Instagram's shift (§7).
- **Words:** 250

### 6.5 Roughly sortable
- **Key points:** the leftmost 41 bits move forward every millisecond, so IDs come out almost ordered; that byproduct makes pagination efficient (L-0198 + A-IG-17: Twitter promised "k-sorted" within a second). Within one millisecond, the machine with the smaller ID gives the smaller ID (L-0213). The number in any tweet's link is a Snowflake whose top bits are the tweet's creation millisecond (L-0214; Fig 6·c decodes one). So from IDs alone you can tell before/after a time, which makes pagination efficient (L-0215 → §8). Not strictly monotonic: some IDs can be out of order; if you need strict order, auto-increment is the way (L-0294, light inline: auto-increment allocates increasing values, but concurrent commits can land out of ID order; also §9.1). Does routing requests round robin make Snowflake IDs increase? Not necessarily, the lecture answered (L-0312). You can't guarantee monotonicity in a distributed setup: clocks drift and enforcing it is very inefficient, "written in stone", so take rough sortability (L-0313).
- **Figure:** Fig 6·c "Decode a tweet ID" (new: an ID → binary → three fields → a date; uses a placeholder ID, worked with the 22-bit shift).
- **Words:** 400

### 6.6 A custom epoch: Discord and Sony
- **Key points:** epoch milliseconds count from 1 January 1970 (L-0236). Nothing forces 1970 into the 41 bits: a company founded in 2011 or 2015 can start its own clock and reclaim the years in between (L-0237, left as taught; worded as "you can", without saying Twitter didn't). Roughly 35 more years of headroom, said with a hedge (L-0238, left as taught, arithmetic shown: 2^41 ms ≈ 69.7 years from whichever epoch you choose; a 2015 epoch lasts to about 2084, a 1970 one to 2039). Why it helps: today's epoch millisecond, 1,676,784,716,000 (the class's number, L-0253), is already about 76% of 2^41 ≈ 2.2 × 10^12, so starting at 1970 wastes most of the range; starting at zero on your launch day uses all of it (L-0252). An idea raised in class: it's just subtracting the start time from now, and that gives a massive range (L-0254). Discord uses Twitter's layout with an epoch at the first second of 2015 (L-0239 + A-IG-18: Discord documents 42 time bits from 2015, worker/process IDs and a 12-bit increment, sent as strings). Sony's open-source Sonyflake is another, about five lines at its core (L-0240, left as taught + A-IG-19: its default layout is different: 39 bits of 10 ms units, 8-bit sequence, 16-bit machine).
- **Figure:** Fig 6·d "Where the 41 bits run out" (new timeline: 1970 → 2039 and 2015 → ~2084).
- **Words:** 450

### 6.7 No moving parts, and an opinion about microservices
- **Key points:** the first instinct for ID generation is "write a microservice"; good engineers look at the problem and the most efficient fix (L-0241). Every design is contextual: the organization, the engineers' expertise, management support (L-0242). If you think your library beats the proposed service, bring data and people will adopt it (L-0243). The lecture's opinion, labelled as such: microservices are an overkill in most cases; don't build one per problem (L-0244, attributed; A-PEM-14 as the mainstream milder version: Fowler's "monolith first"). Understand the context, build only what you need, keep it simple, because simple systems scale (L-0245) → RuleBox §6.
- **MarginNote** "The lecture's view on microservices" (L-0244 + A-PEM-14). Skip unless you're arguing about it at work.
- **RecallQuestions §6:** (1) With 41 | 10 | 12, how many generators and how many IDs per millisecond each? What happens on the 4,097th? (2) Why does a 2015 epoch give Discord decades more IDs than a 1970 one? (3) What does "roughly sortable" promise, and what does it not?
- **Words:** 350

---

## 7 · Instagram: Snowflake inside the database
**Section dek:** Same idea, different home. Instagram packed time, shard and sequence into 64 bits inside a database function, so no API server knows anything about IDs.
**Sec-meta:** about 18 min · class 02:03–02:18, Q&A 02:15–02:25
**Opening problem:** Instagram wants Twitter-style IDs but refuses to run a new service, and its database is already split into thousands of shards.
**RuleBox (§7):** "Put the ID where the data is: no ID logic on the API side." (L-0287). Box body: a normal insert without an ID; the database calls the function instead of auto-incrementing. Sketch: an `INSERT` arrow into a cylinder with a small `next_id()` tag on the column.
**Estimated words:** 2,200
**Q&A folded in:** is `table_id_seq` a column (02:15:25) → 7.5. "We just lifted it into the DB?" (02:16:14) → 7.6. Does every table get a sequence (02:19:27) → 7.5. Keep the sequence in a cache (02:24:39) → 7.5.
**Hand-off:** "Every scheme from MongoDB to Instagram puts time on the left. Here is what that buys you without asking."

### 7.1 Three requirements
- **Key points:** the lecture calls Instagram's early ID scheme a brilliant optimization, read in a blog post, showing how much decent database knowledge can get out of a database (L-0255). Instagram uses Snowflake, but makes the ID inside the database during the insert; API servers have none of the logic (L-0256, light inline: it built its own Snowflake-like layout as a PL/pgSQL function, not Twitter's code). Twitter: in the API servers; Instagram: in the database (L-0257). Requirements: IDs sortable by time, for processing recent items, trending hashtags, feeds (L-0258); 64 bits, to be efficient on indexes (L-0259); no new service (L-0260).
- **Words:** 300

### 7.2 41 | 13 | 10
- **Key points:** 41 bits of milliseconds since a custom epoch in 2011, a massive range (L-0261, light inline: the published constant is 24 August 2011, not 1 January). 13 bits of DB shard ID (L-0262). 10 bits of per-shard sequence, a static counter (L-0263). Twitter 41/10/12 vs Instagram 41/13/10 (L-0264).
- **Figure:** Fig 7·a (D-20 drawn as a bar under Twitter's D-17 bar, the two compared).
- **TradeoffTable T3** "Twitter vs Instagram": columns Twitter Snowflake · Instagram. Rows: where it runs · time bits · middle field · counter bits · IDs per ms per unit · what caps the system · epoch. Red ✕ on Twitter's "what caps the system" cell: "1,024 generators". Ids L-0264, L-0292, L-0291, L-0202, L-0268.
- **Words:** 200 (plus the table)

### 7.3 Logical shards on physical servers
- **Key points:** the sharding and partitioning video in the readings is the background (L-0265). Instagram runs Postgres (L-0266; the lecture later says "MySQL servers" for the physical boxes; the page says "database servers"). Many logical shards (partitions) on fewer physical servers: a physical server is the machine the database runs on; a database created inside it with `CREATE DATABASE` is a logical partition (L-0267, left as taught + A-D-11: in Instagram's Postgres each logical shard was a schema such as `insta5`). Thousands of logical shards, at most 2^13 = 8192, on 10–15 physical servers (L-0268, Fig 7·b, D-19). `CREATE DATABASE insta1, insta2, …` on one server, `insta2000`, `insta5000` on another (L-0269, left as taught). Every logical shard has the same tables and schemas, different data (L-0270). Cost: a migration such as adding a column runs on every logical database on every server, thousands of times (about 8,000) (L-0271). Benefit: a hot logical shard can be dumped and loaded onto another server (L-0272, left as taught). So scaling out is: add a server, move a shard there (L-0274). Without logical shards you'd walk every row to pick what to move (L-0275). Structure: about 10 servers each holding thousands of logical databases; the 13-bit field is the logical shard's ID (L-0276, light inline: Postgres, not MySQL).
- **ForwardChip:** moving logical partitions · week 5, Lecture 9 (L-0273).
- **MarginNote** "Watch first": the sharding and partitioning video (L-0265). Skip if you've seen it.
- **Figures:** Fig 7·b (D-19 redraw), Fig 7·c "Moving a hot shard" (new, two panels).
- **Words:** 550

### 7.4 A function as the column default
- **Key points:** the brilliant move uses stored procedures, the thing most people skipped in college (L-0277, left as taught; the language is named PL/pgSQL on the page). In each logical database the `photos.id` column is `bigint not null default insta5.next_id()`: insert without an ID and the function's result becomes the ID (L-0278). Each logical database has its own `next_id` with its shard ID hard-coded, so the function is created in every database (L-0279). It returns a bigint and declares `epoch`, `seq_id`, `now_ms`, `shard_id = 5` (L-0280, light inline: the epoch constant 1314220021721 is 24 Aug 2011). `seq_id = nextval('insta5.table_id_seq') % 1024`: atomic however many transactions arrive, cut to 10 bits (L-0282). `result = (now_ms - epoch) << 23` puts the milliseconds since the epoch in the top 41 bits (L-0283, light inline: same epoch date note). Then `result |= shard_id << 10`, then `result |= seq_id` (L-0284). Every insert without an ID runs it: Snowflake in a stored procedure (L-0285). Build it yourself on MySQL, Postgres or any database; the last batch was amused at how easy it was (L-0286). Efficient because there is no ID logic on the API side at all (L-0287) → RuleBox §7. Instagram posts still carry integer IDs from this scheme, says the lecture (L-0288, attributed: no public 2026 source confirms the generator).
- **StepThrough** Fig 7·d "One insert, one ID" (new: insert arrives → `nextval` → `% 1024` → shift → OR shard → OR seq → row stored; each step shows the 64-bit bar filling).
- **CodeBlock:** the board's function, in PL/pgSQL, with `now_ms` filled in as the board left it blank (`FLOOR(EXTRACT(EPOCH FROM clock_timestamp()) * 1000)`, labelled as the page's completion).
- **Words:** 600

### 7.5 A sequence is the static counter
- **Key points:** every database has a sequencer behind auto-increment: it atomically increments and returns the next value (L-0281, left as taught; one clause: that's PostgreSQL's model, MySQL keeps a per-table counter instead). **Tempting reading:** `table_id_seq` is a column of the table (L-0289). In fact it's a sequence object, not a column. Create an auto-increment column and the database makes a sequence behind it; Instagram creates its own sequence explicitly and could name it anything (L-0290 + A-D-10: PostgreSQL's `serial` is exactly `CREATE SEQUENCE` plus a `nextval` default). **Tempting reading:** every table gets a sequence when created (L-0296). In fact only an auto-increment column creates one; you can create any number yourself (L-0297, light inline: PostgreSQL allows several, MySQL one AUTO_INCREMENT column per table). The sequencer does exactly what §2.3's static counter did (L-0298 + A-D-08: values are never handed back, so sequences have gaps). **Tempting idea:** keep the sequence in a cache instead of on disk (L-0306). In fact it must persist, or a database reboot starts it at 0, §2.4's problem again; the database already optimizes the flushing (L-0307 + A-D-09: MySQL logs the counter, Postgres can cache values per session and lose them as holes).
- **Words:** 400

### 7.6 What moving it into the database buys
- **Key points:** observed in class: Instagram just lifted the logic from the API server into the database. The point: now the API tier has no limit, 10,000 or 50,000 servers (L-0291, left as taught; one clause: the ceilings move to 8192 shards and 1024 IDs per shard per millisecond). Twitter, by the lecture's account, is capped at 2^10 API servers (L-0292, light inline: the cap is on generator processes).
- **RecallQuestions §7:** (1) What do Instagram's 13 middle bits identify, and why couldn't they be a machine ID? (2) Why does `insta5.next_id()` need its own copy in every logical database? (3) Why must the sequence persist, and which earlier problem in this lecture is that?
- **Words:** 150

---

## 8 · Pagination: the side effect
**Section dek:** IDs with time on the left can be compared, and tables are kept in key order. Together they make "the next page" cost the same at page 1 and page 1,000.
**Sec-meta:** about 18 min · class 01:43–01:54, Q&A 01:57–02:01, 02:24–02:27
**Opening problem:** a batch job reads every tweet from the last hour, millions of rows, ten at a time, to find trending topics.
**RuleBox (§8):** "Understand how your database stores your data on disk." (L-0249). Box body: knowing that rows sit in key order is what lets you drop LIMIT/OFFSET with confidence for deep pages. Sketch: a B+ tree with one blue path down to a leaf and a short blue arrow along the leaves.
**Estimated words:** 2,150
**Q&A folded in:** how the disk throttle was seen (01:57:51) → 8.4. Does it work in NoSQL (01:58:42) → 8.6. Benchmark spike at 6,000 (02:24:03) → 8.4. Must IDs be numeric (02:26:36) → 8.6.
**Hand-off:** "That's the last scheme. §9 lines them all up."

### 8.1 Two ways to ask for the next page
- **Key points:** Twitter's pagination is not limit/offset; it uses `since_id`, "I read till this tweet, give me the next set" (L-0212, left as taught + A-PEM-11: X API v2 uses `next_token` cursors and recommends `since_id` for new data). Its API docs are worth reading for how they page through an account's tweets; the lecture notes the API is now paid (L-0216; A-PEM-12 not used, too volatile). The usual way is limit-offset, also called skip-limit: `LIMIT 10 OFFSET 0`, then `OFFSET 10`, `20`; SQL is the example, the idea is the same everywhere (L-0217, left as taught + A-PEM-02: without a unique ORDER BY, pages can repeat or skip rows). The other way, ID-limit pagination, fits iterating through a table without advanced filters (L-0225, left as taught; §8.5 qualifies it). Twitter constantly iterates over the last N minutes of tweets for trends, recommendations and feeds, so it needs this (L-0226, attributed as an illustration).
- **CodeBlock:** the two queries side by side (offset; `WHERE id > :last ORDER BY id LIMIT 10`).
- **Words:** 350

### 8.2 Why offset gets slower as you go
- **Key points:** limit-offset is very slow when you page deep (L-0218). Scrolling an account with 10,000 tweets: pages 3–5 are fine, 6 slower, 7 slower still (L-0219). A trending-topics job over millions of tweets an hour would crawl with offset (L-0220). In MongoDB it's `skip` and `limit` (L-0223). Why: for `LIMIT n OFFSET m` the database evaluates the query up to the requested point, skips those rows and returns the next n, again for every page, so cost grows with depth (L-0224 + A-D-12: PostgreSQL's docs: skipped rows "still have to be computed inside the server").
- **AnimationClip `l03-offset-vs-keyset`** (predict line before it).
- **Words:** 300

### 8.3 ID-based pagination
- **Key points:** it needs comparable IDs: auto-increment, MongoDB ObjectIds, Snowflakes, anything with time on the left (L-0227, left as taught + A-PEM-07: ObjectIds are only approximately time-ordered, and A-PEM-08: Snowflakes "k-sorted"). Fetch 10, note the last ID, ask for IDs greater than it, limit 10, repeat (L-0228, left as taught + A-PEM-01: always add the sort). It's fast because tables are physically stored in primary-key order, so the cost stays constant (L-0229 → **SourceNote SN-15**, A-PEM-05, A-PEM-06: true for InnoDB's clustered key; elsewhere it's the index seek that makes it fast). With a B+ tree in key order, "10 from this ID" is a log n descent plus a short sequential read, however deep you are (L-0233, left as taught + A-PEM-15: in InnoDB exactly so).
- **Figure:** Fig 8·a "Skip vs seek" (new: offset scanning past m rows vs a B+ tree descent to the last ID then 10 leaves). **PauseAndThink P8** (rewrite page 1,000).
- **Words:** 450

### 8.4 The benchmark
- **Key points:** in 2016, bored at Amazon and deep into MongoDB, the instructor benchmarked pagination strategies in MongoDB (L-0221, attributed). The findings hold for MongoDB, SQL and, in the lecture's words, every database (L-0222, left as taught). The graph: skip-limit grows linearly with depth, ID-limit stays flat; at small depths they're similar (L-0230; the blog: comparable up to about 500–600 records). A sudden spike was a disk flush, the disk throttling, which pleased him: he'd saturated the IO; the trend is still linear (L-0231). He knew because Prometheus with node exporter was already running for a search engine he was writing, showing disk IO at 100% (L-0246). Another spike around 6,000 records was other local processes competing for the machine (L-0305).
- **Figure:** Fig 8·b "Skip-limit vs ID-limit" (redraw of the screen-shared chart's *shape* only: rising line vs flat line, axes "records paged through" and "response time", no values beyond "comparable to ~500–600"; spike annotated as disk contention). Caption links the instructor's published post.
- **MarginNote** "Go deeper": how databases store data and why B+ trees, the instructor's members-only video on database engineering (L-0232), plain mention. Skip unless you want internals.
- **Words:** 400

### 8.5 What ID-based paging gives up
- **Key points:** the disadvantage, as taught: no complex WHERE clauses, acceptable when your use case fits (L-0234 → **SourceNote SN-16**, A-PEM-03, A-PEM-04: keyset works with filters and other sort keys when an index matches them; the real costs are no jumping to page N and the need for a deterministic sort). Even in MySQL, use ID-based paging for deep pagination without fancy filters, but don't rewrite every loop (L-0235, left as taught). Know how your database stores data on disk; that knowledge lets you optimize with confidence instead of defaulting to offset (L-0249) → RuleBox §8.
- **TradeoffTable T4** "Offset vs ID-based": columns LIMIT/OFFSET · ID-based (keyset). Rows: query shape · cost at page 1 · cost at page 1,000 · jump to page N · filters and sorts · needs. Red ✕ on offset's "cost at page 1,000". Ids L-0224, L-0229, L-0233, L-0234, L-0228.
- **Words:** 300

### 8.6 Beyond SQL
- **Key points:** does ID paging work in NoSQL? It depends on the storage engine; it works in MongoDB, as the benchmark showed (L-0247, left as taught). Any store with sequential scans and data locality benefits, DynamoDB included; a hash-scattered layout never gets this benefit (L-0248, left as taught + A-PEM-10: DynamoDB's `LastEvaluatedKey` → `ExclusiveStartKey` cursor). Elasticsearch offers two ways and caps limit-offset at 10,000 documents, erroring and pointing you to a cursor (L-0250, light inline + A-PEM-09: it's the `index.max_result_window` setting; use `search_after` with a point in time). Past 10,000, cursors beat offset; for small pages it doesn't matter (L-0251). Must the ID be numeric? No, strings compare lexicographically and are stored in that order (L-0310, left as taught + A-PEM-13: the order is the column's collation, and `'10' < '9'` unless padded).
- **RecallQuestions §8:** (1) Why does `OFFSET 9990` cost more than `OFFSET 0` even though both return 10 rows? (2) What property of the ID makes `WHERE id > :last` work, and which schemes in this lecture have it? (3) Name one thing keyset pagination can't do that offset can.
- **Words:** 350

---

## 9 · What to keep
**Section dek:** Strict order or throughput, where the ID is born, and the habits this lecture keeps returning to.
**Sec-meta:** about 6 min · class 02:18–02:29
**Opening problem:** the question asked near the end of class: would a bank use Snowflake IDs?
**Estimated words:** 800
**Q&A folded in:** Snowflake inserts and banks (02:18:14) → 9.1. Banks reduce throughput (02:29:14) → 9.1. CDC (02:27:25) → 9.2 ForwardChip.

### 9.1 Bank or Instagram?
- **Key points:** a social app like Instagram doesn't mind slight disorder; a bank listing transactions needs the exact order they happened, so it wouldn't use Snowflake: auto-increment is the way (L-0295, left as taught; the 6.5 clause on commit order is linked, not repeated). Where strict order is required, as in banks, you lower your throughput expectations (L-0314). This is the class's answer to the conflict-resolution question deferred in §3.1 (L-0090), and §6.5's L-0294 is linked here.
- **PauseAndThink P9** (bank vs Instagram).
- **Words:** 250

### 9.2 Where the ID is born
- **Key points:**
  - **Figure** Fig 9·a "Where the ID is born" (new: one axis, app function → central service → database → library in every server, with each scheme placed and tagged with the § it came from; doubles as navigation).
  - **TradeoffTable T5** "Which scheme?" (teaching map option C as a recap): columns UUID · Amazon ranges · Flickr ticket servers · Snowflake / Discord · Instagram · single-DB auto-increment. Rows: unique · ordered · bits · runs where · extra service? · fits when. Red ✕ on Snowflake's "ordered" cell: "roughly, not strictly". Restates placed ids (L-0145, L-0120, L-0183, L-0313, L-0287, L-0295).
  - **MarginNote** "Build them all": implement every scheme; none is fancy (L-0007 echoed). A-IG-24: Meituan's open-source Leaf ships both a range ("segment") mode and a Snowflake mode, a good reference after you've built your own. Skip unless you want a project.
  - **Heuristics card** (Prose list, each linking back; restates placed ids, adds no new placement): add what caused the collision (§2, L-0016); restart from the safest value (§2, L-0048); time goes on the left (§3, L-0060); everything is a trade-off, so challenge the constraint (§3, L-0085, L-0086); batch your calls (§5, L-0103); keep IDs and indexes small enough for RAM (§4, L-0136); simple systems scale (§6, L-0245); know how your database stores data (§8, L-0249).
  - **ForwardChips ("Where this lecture stops"):** next week is social networks: CDNs in depth and a set of social-network services (L-0308 → Lecture 7, Lecture 8). From week 4 the course takes a senior engineer's view: more ambiguous systems where you write the requirements yourself and wear several hats (L-0309). Change data capture, sprinkled so far, gets its full treatment in week 5 (L-0311 → Lecture 9).
- **Components:** Figure, TradeoffTable, MarginNote, Prose, ForwardChips. No RuleBox or recall (the section end lists "Concepts in this section").
- **Words:** 550

---

## Totals
| Section | Words | Figures (static + step) | Clips | Prompts | Tables | SourceNotes |
|---|---|---|---|---|---|---|
| Header | 300 | – | – | – | – | – |
| 1 Why build your own IDs | 1,100 | 1·a, rule sketch | – | P1 | – | – |
| 2 Building `getid()` | 3,100 | 2·a, 2·b, 2·c(step), 2·d(step), 2·e, rule sketch | l03-flush-crash | P2, P3 | – | – |
| 3 Order and clocks | 3,150 | 3·a, 3·b, 3·c, 3·d(step), 3·e, 3·f, rule sketch | l03-clock-skew | P4 | – | SN-01..04 |
| 4 ID size | 1,900 | 4·a, 4·b, 4·c, rule sketch | – | P5 | T1 | SN-05..07 |
| 5 Amazon and Flickr | 3,900 | 5·a(step), 5·b, 5·c, 5·d, rule sketch | l03-odd-even | P6 | T2 | SN-08..11 |
| 6 Snowflake | 2,600 | 6·a, 6·b, 6·c, 6·d, rule sketch | – | P7 | – | SN-12..14 |
| 7 Instagram | 2,200 | 7·a, 7·b, 7·c, 7·d(step), rule sketch | – | – | T3 | – |
| 8 Pagination | 2,150 | 8·a, 8·b, rule sketch | l03-offset-vs-keyset | P8 | T4 | SN-15..16 |
| 9 What to keep | 800 | 9·a | – | P9 | T5 | – |
| **Total** | **~21,200** | **30 numbered figures (5 step-throughs) + 8 rule-box sketches** | **4** | **9** | **5** | **16 notes covering 16 items** |

Reading time is about 90 minutes across nine pages, each 5–17 minutes. All 20 board diagrams are redrawn (D-01..D-20); none is dropped. The NOTES.md weakness #3 (three marker colours carry no identity) matters here: bit fields and machines are told apart by labels and outline weight, never by colour. Weakness #1 (drift) applies to the bit-field bars in particular: Fig 4·c, 6·a, 6·c, 7·a and 7·d use one bar glyph from the kit at one scale (`figures.md` §0).
