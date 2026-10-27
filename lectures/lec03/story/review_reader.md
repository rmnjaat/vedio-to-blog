# Lecture 6 (lec03): fresh-reader review

Reviewer stance: a working engineer who has never seen the class video. I read `lectures/lec03/story/page_text.md` in order (overview, then chapters 1 to 10), with figure descriptions and the chapter summaries in `lec03.mdx` frontmatter for context. I did not open the ledger, transcript or fact-check. The banned-word grep (instructor, in class, the class, the board, as taught, lecture's view, More precisely, student, teacher) finds nothing.

## Overall verdict

This is a strong story. The driving problem (two masters, two order 3s) lands on the first screen. It picks up exactly where Lecture 5 ends, and the `getid()` ladder that grows chapter by chapter is the best "so far" device I have seen in these rewrites. Part 1 has a real engineering rhythm: break, add the cause, break again. Part 2 pays it off: each company is "a version of what you built", and the chapter 1 question that comes back in chapter 7 is a lovely touch. The hand-off to Lecture 7 is concrete.

The weak spots are logic gaps that an engineer who is building along will trip on:
- **v4 drops the time part and creates the reboot problem.** The page never says that keeping time would have survived the reboot.
- **v7 ("flip v2") silently drops the counter.** Two calls in one millisecond on one machine collide again.
- **2.3 and 2.4 present the "bank of IDs" and "flush every N" as one scheme.** They restart differently, so the crash puzzle contradicts the bank as described.
- **The 1 GB → 4 GB pause answer contradicts its own figure** (2.5×).
- **Chapter 8 is titled "Can the ID service disappear?"** and then reveals that Snowflake was a service.
- **Chapter 9 sets up a "last hour" batch job and never answers it**, though it is the one place where time-first IDs (not just any comparable ID) matter.
- **Instagram's function has no guard** for more than 1,024 inserts in a millisecond, or for a clock that steps back. That sits right after chapter 8 insists on both guards.

Several pause answers are then repeated three times: the reveal, the clip, the clip-as-text, and a closing paragraph.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Overview | 5 | 4 | 5 |
| 1 · Two databases, and both have an order 3 | 4 | 4 | 4 |
| 2 · The ID keeps growing. Then the machine reboots. | 3 | 3 | 4 |
| 3 · Which write came first? | 3 | 3 | 4 |
| 4 · One clock in one place. What if that place goes down? | 4 | 4 | 4 |
| 5 · Why not just use a UUID? | 4 | 3 | 4 |
| 6 · Amazon: must every order wait on the ID service? | 4 | 4 | 4 |
| 7 · Flickr: could MySQL itself be the ID service? | 4 | 4 | 5 |
| 8 · Tweets spike. Can the ID service disappear? | 3 | 4 | 4 |
| 9 · Page 1,000 of a profile crawls. Can the ID help? | 3 | 3 | 4 |
| 10 · Instagram wants no new service. Where does the ID go? | 4 | 4 | 4 |

---

## Overview and chapter list

**O1. Two chapter summaries spoil a reveal.**
- c6 summary: "How it keeps every order off the network path". That is the answer to the 6.1 pause (batch the IDs).
  Fix: "Amazon's ID service serves orders, payments and more. Must every order wait on it, what does a crash waste, and why does nobody mind?"
- c9 summary: "a side effect of time-first IDs". That gives away the 9.1 pause.
  Fix: "Deep pages get slower and slower. A query you have written a hundred times, and what the fast version gives up."

**O2. The c7 summary gives away 7.1's mechanism.** "Flickr's ID service is a MySQL table with one row." 7.1 asks "Can one table hand out tickets?"
Fix: "Flickr asked whether MySQL could be the ID service itself. How it hands out IDs, what happens with two of them, and the question from chapter 1, answered."

**O3. The lecture is numbered two ways.** The kicker and every footer say "Lecture 06", while the text says "Lecture 2", "Lecture 5", "Lecture 7".
Fix: use "Lecture 6" everywhere.

**O4. "Where you are" works.** Lecture 2's count++ and multi-writer warning, Lecture 3's FOR UPDATE and upsert, and Lecture 5's closing picture are all named, and each one comes back later (2.1, 6.2, 7.1, 4.2). No change.

---

## Chapter 1 · Two databases, and both have an order 3

Flow 4 · Clarity 4 · Engagement 4

**1a. Two sentences are filler claims that don't belong to the story.**
- "Most teams meet this only when they hit scale, and with how far the internet now reaches, most companies hit that scale sooner than they think."
- "distributed ID generation is one of the most misunderstood topics around".

Neither has support, and neither moves the story.
Fix: cut both. 1.2 can end at "the usual reflex is that auto-increment already solved it. You have just seen where that reflex ends."

**1b. "Every ID is unique again" overclaims.** End of 1.4: "Three versions in, every ID is unique again." 1.3 established that one caller calling twice in one millisecond collides, and v3 doesn't fix that: one thread calling twice in 1 ms still gets m1-t1-1729 twice.
Fix: "Three versions in, IDs are unique again, as long as no single thread asks twice in one millisecond. Look at what it cost, though…" That also makes 2.1's counter fix two problems at once, which is a better reveal.

**1c. The function is named two ways.** The prose says getid() and the code says get_id(). A reader wonders whether these are two functions.
Fix: use get_id() in the code and getid() in the prose consistently, or rename the code to getid().

---

## Chapter 2 · The ID keeps growing. Then the machine reboots.

Flow 3 · Clarity 3 · Engagement 4

**2a. The reboot problem is self-inflicted, and the page never says so (highest-impact gap).** Fig 2·b step 3: "The counter already grows on every call. The time part adds nothing, so strike it out." 2.2 then spends a whole section on the counter resetting to 0 after a restart. But m1-1729-01 after a reboot would be m1-1745-01: the clock moved on, so the version *with* time survived the reboot for free. Any engineer building along sees this, and the next three sections then feel unmotivated.
Fix: in 2.2, after "Those IDs are already on orders", add: "The version you just shortened would have survived this, because the clock moved on while the process was down. You dropped the time part for length. Can you keep the ID short and still survive a restart?" (check source). Chapter 5's size budget then confirms the choice.

**2b. "Bank of IDs" and "flush every N" are two schemes presented as one.** 2.3: "read the counter, say 1, add 1,000, store that, and hand out the next thousand from memory." That stores the end of the block *before* handing it out, so after a crash you restart from the stored value and nothing repeats. 2.4: "Written as code, the bank of IDs is a flush frequency." But that code saves the value *behind* the IDs it hands out, which is why it needs +N on restart. The crash puzzle (disk says 6, but 8 went out) can't happen with the bank as 2.3 describes it, so the two sections contradict each other.
Fix, either one:
- (a) Make 2.4 the bank: save `counter + N` when you cross a boundary, and restart from the stored value.
- (b) Keep 2.4 as written and say so plainly: "The bank writes ahead, the end of the block before it is used. The simpler code below writes behind, every N IDs, which is cheaper to write but means a restart has to jump past the window."

(check source) on which one the lecture taught.

**2c. The safest value is said four times.** It appears in the pause reveal ("6 + 3 + 1 = 10"), in Clip 2·1's last steps, in the clip-as-text, and in the "Call it the safest value" paragraph. The clip lead-in, "Watch where the counter really was", also comes *after* the answer is already out.
Fix: put the clip before the pause ("Watch m1 crash. Disk says 6. Where should it restart?"). Keep the reveal to the reasoning. Start the next paragraph at "Call it the safest value" without re-deriving 10.

**2d. "In a place you won't expect" overpromises.** "You will see that habit again, in a place you won't expect." The payoff (7.3) is an optional cosmetic reset that Flickr doesn't even do.
Fix: "You will see that habit again in chapter 7." Or point it at a payoff that is real (see 10c).

**2e. Ladder rows v5 and v6 aren't ID formats.** The column is "the ID is…", and the rows say "load(); save on every call" and "load()+N; save if %N == 0". The ID is still machine + counter.
Fix: rename the column "the ID / how it's kept", or write "machine + counter, saved every call" and "machine + counter, saved every N".

**2f. The boot counter vanishes from the ladder.** It is presented as one of "two good ways", and chapter 5 recalls it, but it has no rung.
Fix: one mention in Fig 3·a's caption ("the boot-counter variant trades one more part for no disk writes") is enough.

---

## Chapter 3 · Which write came first?

Flow 3 · Clarity 3 · Engagement 4

**3a. v7 regresses to a version that collides.** "Go back to version 2, machine then time, and flip it: time first, then the machine ID." The ladder lists v7 as "epoch_ms + machine". That drops the counter and the reboot protection the reader just spent chapter 2 building. Two calls on m1 in one millisecond collide again. The next sentence even says "a machine ID or just as well a counter", as if you need only one of them.
Fix: "Take version 6 and put time in front: time, then machine, then counter. Time decides the order; machine and counter only break ties inside one millisecond." Set the code and the ladder row to `epoch_ms + machine + counter`. This also makes Snowflake in 8.1 literally v7 packed into 64 bits.

**3b. The order example doesn't connect to the shop's two masters.** "Take two transactions that write the same row, as in Lecture 3." In Lecture 3 the rows were locked, so there was no conflict to resolve. The natural case is the opening problem: the same row updated on both masters.
Fix: "Back to your two masters. A customer changes their address, and the update lands on master A; a second change lands on master B. When the masters reconcile, a common rule is newer write wins. But which one is newer?" (check source)

**3c. The opening sentence is garbled.** "With hundreds of thousands of machines, m1 could be literally anything."
Fix: "With hundreds of thousands of machines, the machine part tells you where an ID was made, not when."

**3d. The scale of clock trouble is inconsistent.** "Disorder of whole seconds you can't, and that is the size of trouble clocks bring." The next paragraphs say sync keeps clocks close, and the worked example uses one millisecond of skew.
Fix: "Left alone, a clock drifts by seconds a day. Sync shrinks that, but never to zero, and even one millisecond is enough to break order. Watch."

**3e. The answer in 3.4 is said four times.** It appears in the pause reveal, Clip 3·1, the clip text, and "So wherever you need order, clock skew is a correctness problem, not a cosmetic one." The last two also repeat each other word for word.
Fix: cut the "So wherever you need order…" paragraph. The clip's last step already says it.

---

## Chapter 4 · One clock in one place. What if that place goes down?

Flow 4 · Clarity 4 · Engagement 4

**4a. "Almost." answers a question nobody asked.** The previous sentence is a statement ("It is whether one clock can be trusted."), so "Almost." dangles.
Fix: "…It is whether one clock can be trusted. Can it? Almost."

**4b. "Add a buffer on top" is unexplained.** In the pause reveal, "B has to learn A's last ID, add a buffer on top": why a buffer, if B just learned the exact value?
Fix: "…add a margin for IDs A may issue while the answer is in flight", or drop "add a buffer". (check source)

**4c. v8's ID format is never stated.** The ladder says "one ID server, one clock". Is the ID time + counter? A plain counter?
Fix: one clause in 4.1: "It runs v7 (time, then counter), just in one place." The ladder row would then read "epoch_ms + counter, on one server".

**4d. The chapter is good on the trade-off.** 4.3 ("question the requirement") is the best section in Part 1 and sets up the UUID question cleanly. One nit: "That isn't a theorem" in 3.4 against "You cannot have … all three" here reads like a contradiction.
Fix: "In practice you cannot have…"

---

## Chapter 5 · Why not just use a UUID?

Flow 4 · Clarity 3 · Engagement 4

**5a. The pause answer contradicts its own figure.** The pause: "An index whose entries carry a 4-byte integer ID is about 1 GB… the index heads toward 4 GB." Fig 5·b, placed right above it, says each entry grows from 8 B to 20 B, about 2.5×. A careful reader gets two answers to the same question.
Fix: "Each entry goes from 8 bytes to 20, so the index heads toward 2.5 GB. In the primary-key index, where the ID is the key itself, it is the full four times." (check source)

**5b. Fig 5·b answers the pause before it is asked.** Its labels ("8 B per entry … 20 B per entry … ~2.5×") sit directly above "Is that just a little more disk space?"
Fix: show the posts table and its index first. Move the 4-byte/16-byte comparison panel, or the whole figure, after the reveal.

**5c. The first paragraph gives the chapter's answer away.** "every company in the chapters ahead turned them down for the same reason: UUIDs don't index well." This sits before the chapter asks "Where else is the ID stored?" The claim also covers Amazon, whose chapter never mentions UUIDs.
Fix: "Yet companies at scale avoid them. Flickr even wrote down why. To see it, look at where else an ID gets stored."

**5d. The RAM rule fights the sentence before it.** First: "what has to fit in memory is the part of your indexes that queries actually use". Then: "give it at least as much RAM as all its indexes added up".
Fix: "…give it at least as much RAM as the indexes your queries use, and size for all of them if you don't know which those are."

**5e. Ending on the 64-bit budget, with the boot-counter callback, is good.** No change.

---

## Chapter 6 · Amazon: must every order wait on the ID service?

Flow 4 · Clarity 4 · Engagement 4

**6a. The sourcing is heavy and then unlinked.** It opens with "as an engineer who sat right next to the team that built its ID service tells it; the team also explained it in a public tech talk", and repeats "In that account" and "In the same account". The talk is never linked, so the hedging raises doubt instead of settling it.
Fix: link the talk if it exists (check source). Otherwise say it once ("Here is Amazon's ID service, as one engineer who sat next to the team describes it") and drop the later "In that account / In the same account".

**6b. "Chapter 4's cost" points at the wrong cost.** "That is chapter 4's central server again, so it carries chapter 4's cost: a network call for every ID." Chapter 4's costs were the single point of failure and gossip. It explicitly *set aside* throughput.
Fix: "…so it carries the cost chapter 4 set aside: a network call for every ID."

**6c. "About 150 lines of Python" comes from nowhere.**
Fix: keep it only if the lecture said it (check source). Otherwise cut it and end at "Write it yourself."

**6d. The number-sense paragraph is excellent.** "A million and a billion… 2^64 is about 18 billion billion" is numbers used as plot. No change.

---

## Chapter 7 · Flickr: could MySQL itself be the ID service?

Flow 4 · Clarity 4 · Engagement 5

**7a. The opening problem is never closed for your own shop.** 7.2: "If your chapter 1 answer was 'step by the number of masters', you designed Flickr." But Flickr puts the odd/even settings on separate ticket servers, not on the data masters. A reader immediately asks: then why not set auto_increment_increment = 2 on my two order masters and be done?
Fix: one or two sentences: "For your shop's two order masters, that setting *is* the one-line fix. Flickr kept it off its photo shards and in two dedicated ticket servers, because [the reason the lecture gives: many shards / adding a master means renumbering every step]." (check source) This closes the lecture's driving problem explicitly.

**7b. Delete-then-insert is unmotivated.** "The naive way: whenever someone needs an ID, delete the row and insert a new one." Why delete? Why not just insert a row per ID? The reason ("the table never grows past one row") only comes four paragraphs later.
Fix: "Insert a row per ID and the table grows by a row for every photo, forever. Delete the old row each time and it stays at one row. That is the naive version: delete, then insert."

**7c. The "32 times slower" benchmark is unsourced, and its cost is left hanging.** "one benchmark on one setup measured it about 32 times slower." It has no link, and the reader is left wondering whether Flickr's ID path pays 32×.
Fix: link it or drop the number (check source). Add: "On a one-row, one-column table the extra work is tiny, and the delete is the point."

**7d. The 7.3 answer is said three times.** It is in the reveal ("Every ID is still unique…"), the clip's last step, and the paragraph after ("The jump between neighbours looks bad and breaks nothing. It is a matter of looks, not correctness.").
Fix: keep the paragraph's first sentence (why 7 survives the restart) and cut "The jump … not correctness."

---

## Chapter 8 · Tweets spike. Can the ID service disappear?

Flow 3 · Clarity 4 · Engagement 4

**8a. The title promises the service disappears, and 8.3 reveals that it didn't.** The opening: "Put an ID service in that path and it becomes one more tier you must scale… nobody to ask." 8.3: "Twitter's original Snowflake, in 2010, ran as a small network service of its own." That reads as a bait-and-switch. The real point, that the nodes never coordinate, is good, but the title sets up the wrong question.
Fix: retitle the chapter "Tweets spike. Can the ID service stop coordinating?" and section 8.3 "Does Snowflake need a service at all?" Rewrite the opening's last sentence: "Put a coordinating ID service in that path and it is one more tier you must scale for the worst spike."

**8b. The Go deeper box contradicts the section above it.** "the microservice reflex… Snowflake argues the other way". It sits directly under the sentence saying Snowflake *was* a small service.
Fix: either cut the box, or reframe it: "Snowflake was a service, but one with nothing to coordinate. The reflex to resist is not 'a service', it is 'a service that every ID must agree with'."

**8c. The spike has no number.** "one of the highest-throughput write workloads there is, and it spikes." Every other chapter has a number, and this one, about bursts, has none.
Fix: add the tweet rate or peak the lecture used, if any (check source). The 10,000 IDs/s/process requirement in 8.1 could also move up to make the hook concrete.

**8d. Fig 8·b gives away the pause.** Its labels "2^12 = 4096 ids per ms" and "2^10 = 1024 machines" sit right above "How many IDs can one machine make in a single millisecond…?"
Fix: drop those two labels from the figure and keep the bit widths. Or move the pause before the figure.

**8e. Chapter 8 has no closing hand-off.** It ends on Discord's epoch. The hand-off ("it pays off in the next chapter") is buried in 8.4.
Fix: end 8.5 with one line, for example: "Two things now come for free: IDs fit in a BIGINT, and they sort by time. The second one fixes a problem you have probably met without knowing it."

---

## Chapter 9 · Page 1,000 of a profile crawls. Can the ID help?

Flow 3 · Clarity 3 · Engagement 4

**9a. The batch-job hook is never answered, and the "time-first" premise contradicts 9.2.** The opening sets up "to find trending topics it reads every tweet from the last hour", and the chapter calls the fix "a side effect of a good ID scheme". But 9.2 says "Auto-increment IDs compare; so do ObjectIds, Snowflakes…". So keyset paging works with any comparable indexed ID, and the time-first part buys nothing in this chapter as written. What time-first actually buys is turning "the last hour" into an ID range, and that is exactly the dangling batch job.
Fix, in 9.4 or at the end of 9.2: "And with time on the left, 'the last hour' is itself an ID: shift (now − 1 h − epoch) left by 22 and start from there. The batch job is WHERE id > that, paged by ID, with no created_at index." (check source) Then 8.4's "it pays off in the next chapter" is honest.

**9b. Where the slowdown starts contradicts the benchmark.** Opening: "The third, fourth and fifth pages come back fine. The sixth is slower…" At ten per page that is about 50 rows. 9.3 says the two methods are "much the same" up to about 500–600 records.
Fix: "The first few dozen pages come back fine. Then each page is a little slower than the last, and by page 1,000 it crawls."

**9c. The per-user index comes too late.** The query is `WHERE user_id = ? ORDER BY id`, but 9.2 explains the speed with "an index on the ID", walking the primary key. The (user_id, id) index that actually makes this query fast only appears in 9.4.
Fix: move "With an index on (user_id, id)…" into 9.2's "Second, an index" sentence.

**9d. Clip 9·1 restates what the prose has already shown.** 9.1 and 9.2 explain both costs fully before "Page 1 takes the same time either way. What happens by page 1,000?"
Fix: put the clip right after the 9.1 pause reveal, and cut the overlapping sentences in 9.2 ("Log n, then ten; log n, then ten…").

**9e. The benchmark story drifts off-road, and the result isn't linked.** "while bored at Amazon and deep into MongoDB" and "rather pleased to see" don't help, and the published result has no link.
Fix: "One engineer benchmarked it on MongoDB in 2016 and published the result" plus a link (check source). Cut the throttling anecdote to the caption, which already covers it.

**9f. The hand-off misdescribes chapters 6–9.** "One company took everything in the last four chapters, time on the left, 64 bits, no ID service…" Chapters 6 and 7 *are* ID services, and 8.3 says Snowflake was one too.
Fix: "One company wanted Snowflake's IDs, time on the left and 64 bits, without running any ID service at all, and put the logic somewhere nobody else had."

---

## Chapter 10 · Instagram wants no new service. Where does the ID go?

Flow 4 · Clarity 4 · Engagement 4

**10a. The function has none of the guards chapter 8 insisted on.** 8.2 says that a generator you would run must (1) wait when the 4,096 values run out in one millisecond and (2) refuse when the clock steps back. Instagram's `next_id()` does `nextval(...) % 1024` with no guard. A 1,025th insert in one millisecond on one shard wraps onto an earlier value, and the page still states "1,024 IDs per shard per millisecond" as if it were enforced.
Fix: one sentence after the code, giving whatever the lecture or Instagram's post says (check source). For example: "Nothing here waits: a 1,025th insert in the same millisecond on one shard would reuse a value, so the design bets that no shard ever sees that rate (and the primary key would reject the duplicate)."

**10b. The opening praise is filler.** "one of the most satisfying designs in this lecture. It shows how much someone with good, not even deep, knowledge of databases can get out of one."
Fix: open with the three requirements and let the design earn the praise. End 10.2 with the "amused at how little there is to it" line, which already does this.

**10c. The "cache the sequence" warning is unmotivated.** "You might be tempted to keep that sequence in a cache instead of on disk, for speed." I wasn't tempted, and I don't know what caching a Postgres sequence would mean.
Fix: tie it to chapter 2: "How does the sequence survive a reboot? The database persists it for you, using the same write-ahead trick as chapter 2 [if true: it logs ahead and skips the unlogged values after a crash]." (check source) If that is true, it is the "place you won't expect" that 2d is looking for.

**10d. The signed-bigint question goes unanswered.** Instagram's layout "fills all 64 bits" with no unused sign bit, and Postgres bigint is signed. An engineer will ask when the IDs go negative.
Fix: one clause, if the sources support it (check source). Otherwise change "uses all 64 bits" to "41 + 13 + 10 = 64" without the claim.

**10e. The bank question, the finished ladder, "What you can now do", the recall questions and the Lecture 7 hand-off are all good.** The recall answers are consistent with the page: 5,000 + 1,000 + 1 = 6,001; 232, 244, 237, 239; 7, 204, 9, 206; and the 8,192 shards. No change.

---

## Retelling in 7 sentences

1. Once orders live on two masters, each master's auto-increment hands out 1, 2, 3, 4, so you write your own getid(), and each time two IDs collide you add the cause: first the machine, then a counter (atomic, shared by all threads) in place of the thread and the time.
2. The counter resets when the process restarts, so you persist it. To avoid a disk write per ID you save it only every N IDs, and after a crash you restart at the safest value (last saved + N + 1): skipped numbers are fine, duplicates are not.
3. Some systems need to know which ID came first. Putting time in the high digits gives rough order almost for free, but ties inside a millisecond and clock drift (quartz, NTP) mean IDs from many machines can't be strictly ordered.
4. One central ID server with one clock (one that never issues below its last value) gives strict order, but it is a single point of failure, and two servers must gossip on every ID. Distributed, strictly increasing and fast is a pick-two, so question whether you really need strict order.
5. UUIDs need no coordination, but every index entry carries the ID, indexes must stay in memory to be fast, and 16 random bytes bloat and scatter them, so keep IDs at 64 bits or less.
6. Amazon hands out ranges of IDs from one locked counter row per service (wasting a range on a crash, which nobody minds). Flickr uses two MySQL "ticket" tables stepping by 2 (odd/even) with REPLACE INTO. Twitter's Snowflake packs 41 bits of time, 10 of machine and 12 of counter with a custom epoch, and its nodes never coordinate.
7. Comparable IDs let you page with WHERE id > last instead of OFFSET, so every page costs the same. Instagram computes a Snowflake-style 41|13|10 ID inside Postgres as a column default per logical shard, so no service and no API-server limit, while a bank that needs strict order would pay for one sequence.

**How hard was it?** Easy. The ladder does most of the work, and Part 2 maps one company per sentence. Two places made me stop:
- Writing sentence 2, I had to decide whether the "bank of IDs" and "flush every N" were the same thing (they aren't, 2b).
- Writing sentence 3, I nearly wrote "time + machine" and then realised that drops the counter (3a).

I could not say in a sentence why time-first IDs matter for pagination rather than any comparable ID (9a). That is the one place where the story's claim and its content don't line up.

---

## Top 10 fixes, ranked by impact

1. **Keep the counter in v7 (3.2, ladder rows v7 and v8).** "Flip version 2" drops the counter and the reboot safety built in chapter 2, so two calls in one millisecond collide again. Make v7 time + machine + counter. Snowflake then becomes v7 in 64 bits.
2. **Admit that dropping time created the reboot problem (Fig 2·b step 3, 2.2).** Keeping the time part would have survived the restart. Say you dropped it for length, and ask how to stay short *and* survive. (check source)
3. **Separate "bank of IDs" from "flush every N" (2.3, 2.4).** The bank writes ahead and restarts from disk; the flush code writes behind and needs +N. As written, the crash puzzle contradicts the bank just described. (check source)
4. **Answer the batch job and justify "time-first" in chapter 9 (opening, 9.2, 9.4, 8.4).** Show "the last hour" as an ID range (time shifted left 22). As written, keyset paging works with any comparable ID, so the chapter's premise and its content disagree. (check source)
5. **Close the lecture's opening problem for the reader's own shop (7.2).** Say that auto_increment_increment/offset on the two order masters is the one-line fix, and why Flickr put it on separate ticket servers instead. (check source)
6. **Retitle chapter 8 and fix its Go deeper box.** "Can the ID service disappear?", followed by "Snowflake ran as a service", is a bait-and-switch, and the microservice box contradicts 8.3. Make the question "Can the ID service stop coordinating?"
7. **Fix the 5.1 pause arithmetic and its figure placement.** "1 GB → 4 GB" contradicts Fig 5·b's 8 B → 20 B (2.5×), and the figure answers the pause before it is asked. Do the same for Fig 8·b's "4096 per ms" label above the 8.1 pause. (check source)
8. **Add Instagram's missing guards (10.2).** Say what happens on the 1,025th insert in one millisecond and when the clock steps back, since chapter 8 just taught that a real generator needs both. Tie the sequence's persistence to chapter 2's write-ahead habit if it is true. (check source)
9. **Stop saying each reveal three or four times (2.4, 3.4, 7.3, 9.2).** Pause reveal + clip + clip text + closing paragraph is too many. Put clips before or instead of the prose retelling, and cut "So wherever you need order…" and "It is a matter of looks, not correctness."
10. **Remove spoilers, filler and loose ends.**
    - Spoilers: the c6, c7 and c9 summaries, and 5's "UUIDs don't index well" in its first paragraph.
    - Filler: 1.1 "sooner than they think", 1.2 "most misunderstood", the 10 opening praise, 6 "150 lines", 7 "32 times slower".
    - Loose ends: 9.1's page-6 slowdown against the 500–600-record benchmark, the 9 hand-off's "no ID service", 4.1's dangling "Almost.", 6.1's "chapter 4's cost", and "Lecture 06" against "Lecture 6".
