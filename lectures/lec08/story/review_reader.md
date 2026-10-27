# Lecture 5 (lec08): fresh-reader review

Reviewer stance: a working engineer who has never seen the class video. I read `lectures/lec08/story/page_text.md` in order (overview, then chapters 1 to 8), and checked the c6 MDX only for the 6.3 pause choices. I also read the last section of Lecture 4 (lec02 c10) and the opening of Lecture 6 (lec03 s0, c1) to check the joins. I did not open the ledger, transcript or fact-check.

## Overall verdict

Build 1, the load balancer (chapters 1 to 5), is the best thing on the page. It grows from one real object (a ten-line TCP proxy with code you can run) into a fleet, one failure at a time. Its numbers do real plot work: two connections per client gives 10,000 → 5,000, a 10-second poll gives nine seconds of errors, and each one opens the next chapter. Its chapter endings are real hand-offs ("The database now says backend 2 is dead…", "One thing doesn't move: the client"). The first screen is weaker. It states a task ("write the ten lines, keep it correct") rather than a situation the reader feels.

Build 2, the lock (chapters 6 to 8), is technically strong. The sharing ladder, the blind DEL, the GET-then-DEL race and the restart-to-two-holders stepper are all excellent. But its driving problem is a toy the page itself calls "deliberately silly", and the hand-off from Build 1 promises a real case (orchestrator leader election) that Build 2 never returns to. Three things get in the reader's way in Build 2:

- what the lock actually covers: one `pop()`, or a six-minute job
- a gatekeeper rejected in 6.3 that comes back as the right answer in 7.3
- ZooKeeper solving chapter 8's problem at the end of chapter 7, before chapter 8 asks it

Build 1 also has one arithmetic error a reader will catch: weighted round robin does not bring all three servers to 80%. Across both builds, several clip captions give away the answer their prompt asks for.

Length: the chapter reading times add up to 58 minutes, above the 30–50 the brief asks for. The ZooKeeper watch detail, the MongoDB timeout and some repeated statements (listed below) are the easiest cuts.

## Scores

| Part | Flow | Clarity | Engagement |
|---|---|---|---|
| Header / overview | 4 | 3 | 3 |
| 1 · What is inside the box labelled "load balancer"? | 4 | 4 | 4 |
| 2 · Three servers, one request. Which one gets it? | 4 | 3 | 4 |
| 3 · One LB server can hold 10,000 connections | 4 | 4 | 4 |
| 4 · The database says backend 2 is dead | 5 | 4 | 4 |
| 5 · Ten LB servers. Which address does the client dial? | 4 | 3 | 4 |
| 6 · Three machines, one queue that protects nothing | 3 | 3 | 3 |
| 7 · The job takes six minutes. The lock lasts five. | 4 | 4 | 5 |
| 8 · All locking runs through one Redis | 3 | 4 | 4 |

---

## Frontmatter and header

**H1. The first screen has a task, not a felt problem.** "Write the ten lines inside it, then keep it correct while it grows to many machines and any one of them dies." This is accurate, but nobody is hurting yet. The brief asks for a concrete situation on screen one. The page already has the material: a payments service, three backends, one LB server, and a backend crash that turns into seconds of failed payments.
Fix: open "The box everyone draws" with the situation, for example: "Your payments service runs on three servers behind one name. At 2 a.m. one of them crashes. For how many seconds do customers' payments fail, and what in the box decides that?" Then: "Somebody wrote that box…". Use only numbers the lecture has (check source for any traffic figure).

**H2. The chapter 8 blurb spoils 8.3.** "…the restart that can give one lock two holders…". Section 8.3 is a stepper that builds to "two holders" as its reveal.
Fix: "…what happens when nodes come back, what it all costs, and the question Lecture 6 opens with."

**H3. The domain name changes three times.** Fig 0·a has `payments.example.com`, chapter 5 has `payments.lb.google.com`, and the 5.4 Go deeper has `payments.google.com`. The Google names also suggest that "you" work at Google.
Fix: use one neutral pair throughout, for example `payments.example.com` (public, the gateway) and `payments.lb.internal` (the private load balancer name). Update the figure labels in 0·a, 5·b and 5·d to match.

**H4. "over-clocked" is the wrong word.** Fig 0·a: "no over-clocked server". Over-clocking is running a CPU above its rated speed. The meaning here is "overloaded".
Fix: "no overloaded server".

**H5. "Ten lines", "two lines", "few lines".** The header says "its core is about ten lines of code", 1.2 says "That is the whole job, two lines of code", and the end of 1.2 says "the core is these few lines". These can all be true, but a reader notices that the count keeps changing.
Fix: in 1.2, "The copying itself is two lines; with the accept loop and the dial, the whole core is about ten."

**H6. "Where you are" is good.** It ties Lectures 1–4 into this one cleanly (heartbeat → health check, Lecture 2 fleet sizing, Lecture 3 locks inside one database, Lecture 4 Pub/Sub), and each of those threads is actually picked up later. No change.

---

## Chapter 1 · What is inside the box labelled "load balancer"?

Flow 4 · Clarity 4 · Engagement 4

**1a. The ports contradict each other.** 1.1 and 1.3 and Figs 1·b, 1·c, 2·a and 3·a use port 9000. The ARLB code listens on `:9090` and has *four* backends on 8081–8084, while the laptop setup has three. Section 4.2 then says "Next to the main process on port 9090, run one more small process on 9091", so the reader can't tell which port the LB is on.
Fix: keep 9000 for the design. After the code, say once: "(ARLB listens on 9090 and hardcodes four backends; the design here uses 9000 and three.)" In 4.2, write "Next to the main port, 9000, open a second one, 9001, a 'meta' port". Update Clip 4·1 and Fig 4·b, which say 9091.

**1b. "It isn't efficient" needs its reason.** "It isn't efficient: it starts as many goroutines as there are connections." Go programmers know goroutines are cheap, so this reads as a doubtful claim. The code actually starts two goroutines per client plus the proxy goroutine.
Fix: "It isn't built for scale: it starts three goroutines per client and never limits them." Or simply "It isn't tuned at all."

**1c. The opening paragraph is all claim, no scene.** "A load balancer is what lets you run many servers at all… one of the most important boxes… the one most often treated as magic." This is the third time the reader is told the box is important (dek, overview, here).
Fix: cut to one sentence and go straight to the closed-box figure and day zero: "Open the box on one machine first."

**1d. The war story is good.** It also motivates "build, then scale". No change, except that the list "consistent hashing, round robin, weighted round robin and static routing" names two algorithms the page never uses. That is fine as colour.

---

## Chapter 2 · Three servers, one request. Which one gets it?

Flow 4 · Clarity 3 · Engagement 4

**2a. The weighted round-robin arithmetic is wrong.** Pause: two 4 GB servers at 80% under round robin, the 8 GB one at about 40%. Then: "weights 1 : 2 : 1… All three now run near 80%." Fig 2·b shows 80% / 80% / 80%. Weights don't add any traffic. At the same total load (0.8 + 0.8 + 0.4 units of 4 GB = 2.0 of 4.0 capacity), 1 : 2 : 1 puts every server near **60%**. The point of the fix is that you can now send about a third more traffic before any server hits 80%. Any engineer who does the sum stops trusting the page here.
Fix: "…so of every four requests the big server gets two. All three now sit near 60%, and you can add about a third more traffic before any of them reaches 80%." Change the Fig 2·b weighted gauges to 60 / 60 / 60, and the caption to "with weights all three sit near 60%". (check source: confirm what utilisation the lecture meant to show.)

**2b. The clip caption gives away the prompt.** The prompt asks: "Which one leaves a server drowning?" The caption right under the player says: "Round robin keeps dealing long requests to a server that is already busy… Least connections sends each new request to the least busy server."
Fix: caption "Clip 2·1 The same ten requests through two load balancers, one dealing in turn, one picking the server with the fewest open connections."

**2c. The title and the text disagree on time.** The title says "What if some requests take an hour?", but the text says "answers one query in a second and the next in two hours".
Fix: change the title to "What if some requests take two hours?", or change the text to "an hour".

**2d. "Use least connections" is said three times.** It is in the clip's last bullet ("Big variance in response times? Use least connections."), the clip text ("When response times vary a lot, use least connections."), and the prose ("Use it whenever response times vary a lot."). "The second lane is least connections" also assumes the reader played the clip.
Fix: start the prose with "Least connections works like this: the load balancer counts…", and cut "Use it whenever response times vary a lot."

**2e. The 2.4 ending is a good hand-off.** "the load balancer is a machine too" sets up chapter 3 with a number the reader already has. No change.

---

## Chapter 3 · One LB server can hold 10,000 connections. How many clients is that?

Flow 4 · Clarity 4 · Engagement 4

**3a. The obvious question goes unasked: why not let each LB server check the backends itself?** "Before any copy can be fixed, something has to detect the failure. Give that job to a component of its own: the orchestrator." Many real load balancers health-check from each node, and a reader expects a reason for a separate component.
Fix: add one line before the orchestrator, for example: "You could let every LB server check every backend itself, but ten LB servers then send ten times the checks, and they can disagree about who is alive. One checker that writes one answer keeps them in step." (check source)

**3b. "Many LB servers" with no word on how clients reach them.** 3.0 says "many LB servers instead of one", and 3.1's title is "ten LB servers". The reader asks at once which one a client dials, and that wait lasts two chapters.
Fix: one parenthesis in 3.0: "(Which of them a client dials is a question we'll come back to; first, what each one needs to know.)"

**3c. The heartbeat-vs-/health pause is excellent.** The mirror-image link to Lecture 1's green dot is the best callback on the page. No change.

---

## Chapter 4 · The database says backend 2 is dead. The LB servers haven't heard.

Flow 5 · Clarity 4 · Engagement 4

**4a. The window size contradicts itself.** 4.1: "with an interval of N seconds, a crash just after a read leaves N − 1 seconds of failures". But a crash *just* after a read leaves almost N. Then "What you can now do" says "A 10-second poll means up to 9 seconds of errors", while recall Q1 says "Up to almost 30 seconds" for a 30-second poll.
Fix: 4.1: "In general, an interval of N seconds means up to almost N seconds of failures." In "What you can now do": "A 10-second poll means up to almost 10 seconds of errors."

**4b. Why doesn't the LB server just try another backend?** Chapter 1's code already sees the failure: `net.Dial` errors and it writes "backend not available". A reader asks why the LB server doesn't route around a dead backend by itself.
Fix: one sentence in 4.1: "The LB server does see a failed dial, but only after it has spent a request on it, and a crashed process can still accept connections and then fail. The list has to change." (check source)

**4c. The cost of "call fifty ports" is only hinted.** "One publish reaches them all, instead of one process calling every server in turn." The title asks the question, but the reasons are missing.
Fix: "Calling fifty ports means the caller must know every LB server, call each in turn, and retry the ones that were down or restarting. One publish replaces all of that." (check source)

**4d. Fig 4·b uses terms the prose hasn't explained yet.** "autoscaling" appears as a change source before 4.4 introduces it, and "at-most-once" appears only in the figure.
Fix: in the paragraph on missed messages, write "Redis Pub/Sub delivers at most once: a message reaches every subscriber connected at that moment…". Drop "autoscaling" from Fig 4·b, or add "(4.4)" next to it.

**4e. The ZooKeeper watch detail is off-road.** "Its standard watches fire once, so a client re-reads the data and sets the watch again after every notification." This is vendor detail inside a paragraph whose point is "any reactive broadcast works".
Fix: cut the sentence. Keep "ZooKeeper, for instance, stores configuration and notifies every client watching it when it changes."

**4f. The autoscaling comparison has a "because" that doesn't follow.** "Here the orchestrator plays that part, because clients don't know or care how many LB servers there are." Clients not caring is not the reason the orchestrator does the scaling.
Fix: "Here the orchestrator plays that part for the LB fleet, which you run yourself; clients never see how many LB servers there are, only the name." (check source)

**4g. The 9-second window is shown four times.** It appears in the pause answer, the clip, the clip text and "What you can now do". This is acceptable, because the clip adds the push replay. But the clip's first half is a replay of the pause.
Fix (optional): shorten the clip lead-in to "Same crash, now with push. Watch where the red stops."

---

## Chapter 5 · Ten LB servers. Which address does the client dial?

Flow 4 · Clarity 3 · Engagement 4

**5a. Maglev contradicts itself.** 5.1: "Very large systems do make one address stand for many machines at the network level. Google's Maglev, for example… This design takes the simpler road." Then 5.4: "Much of this design follows Google's paper on Maglev." The reader can't tell whether this design is Maglev or the road not taken.
Fix: 5.4: "Google's Maglev paper covers the same ground at far larger scale, including the network-level road this design skipped. It is an easy read once you have built this."

**5b. The followers' "grunt work" is never named.** "One is the leader; the followers do grunt work rather than wait." The pause answer depends on this, and the reader is left asking what work.
Fix: name it in one clause (check source). If the lecture doesn't say, cut "do grunt work rather than wait" and the matching figure label, and answer only "No: they take over automatically".

**5c. Who elects the leader, the followers or the monitor?** "If the leader dies, a follower takes its place automatically… Above the orchestrators sits one global monitor… whose only job is to check each orchestrator's leader and react when one goes down." "Each orchestrator's leader" suggests several orchestrator groups, which were never introduced. If the followers elect themselves, what does the monitor react *with*?
Fix: "Above them sits one global monitor, with a standby, that watches every orchestrator group's leader (one group per load balancer) and steps in if an election fails." (check source)

**5d. The private-DNS sentence is hard to parse.** "…a load balancer for an internal service should stay private; still, a private load balancer can't be a single LB server any more than a public one can."
Fix: "A load balancer for an internal service should stay private, and a private one needs many LB servers just as much as a public one does."

**5e. DNS holds no ports, so how does the client know 9000?** "Machine addresses only, no ports." A careful reader asks this.
Fix: "Machine addresses only, no ports: every LB server listens on the same, well-known port."

**5f. The Go deeper is a grab-bag.** It covers reverse proxy, API gateway, public vs private DNS, sticky sessions with consistent hashing, and authorization in about 90 words. Each is a different idea.
Fix: keep the gateway → private LB path and the "authorization is business logic" line, and cut the sessions sentence.

**5g. 5.5 is strong.** The bottleneck vs single-point-of-failure distinction, the AWS Multi-AZ quote, and "many machines that together look like one" make an excellent close to Build 1. No change.

---

## Chapter 6 · Three machines, one queue that protects nothing. Who reads next?

Flow 3 · Clarity 3 · Engagement 3

**6a. Build 2's driving problem is a toy, and the page says so.** The problem is "Someone has built a very careless remote queue; call it queue 7", followed by "The queue is deliberately silly… Real queues such as SQS, RabbitMQ and Kafka already keep two consumers from receiving the same message". The 5.5 hand-off promised a real case, "three orchestrators, and only one of them may lead", and the reader never sees it again. Engagement drops at exactly the point where the second build should hook.
Fix: open chapter 6 with the case 5.5 set up, then narrow it to the exercise: "Your three orchestrators must agree on one leader, with nothing shared but the network. Strip that down to its smallest form: three consumers, one queue that protects nothing…". Close chapter 8 by saying that the same lock (whoever holds it leads) answers the orchestrators' question (check source). Move the "real queues already do this" paragraph after the constraints, and shorten it to one sentence.

**6b. 6.1's examples undercut the need.** "Picture two transactions running on different machines, both about to update the same row." The reader has just been reminded that a database locks rows itself (Lecture 3). The MongoDB example also ends "the database does it for you". Both examples show that you *don't* need your own lock.
Fix: use a case with no database in the middle: the orchestrator election, or the queue itself ("two consumers that both pop message 1 both charge the customer"). Keep MongoDB as one sentence: "Even a database spread over shards has to keep this record across machines; MongoDB does it for you." Cut "5 ms" (vendor detail).

**6c. The gatekeeper is rejected here and endorsed in 7.3.** The 6.3 pause answer says "A gatekeeper is just one more layer in front of a queue you already have." 7.3 then presents "a server that accepts one connection at a time" as a valid lock, and that is a gatekeeper. The reader who picked "gatekeeper" feels cheated.
Fix: "A gatekeeper could work, but only because it would *be* a lock manager, one you'd have to build and keep alive (chapter 7 builds exactly that). What you need at its core is a record of who may read."

**6d. What the lock covers is unclear: one pop, or a long job?** The protocol is "take the lock, read, release", and the read is one remote call. Yet the TTL is five minutes, and chapter 7's premise is "The job takes six minutes". The reader asks: what job? Why hold a lock while processing, if the rule is only "one reader at a time"?
Fix: state the rule in 6.0 as "only one consumer may read *and process* a message at a time". Make the protocol "take the lock, read, process, release". (check source)

**6e. Why "7"?** "call it queue 7" invites a question the page never answers.
Fix: drop the number ("call it the queue"), or add "(one of many queues; the lock key will be its name)".

**6f. 6.2 is the best teaching on the page.** The sharing ladder, the apt-get story, and "look for the nearest storage they share" all work well. No change.

---

## Chapter 7 · The job takes six minutes. The lock lasts five.

Flow 4 · Clarity 4 · Engagement 5

**7a. The clip spoils 7.2 and uses a term before it is explained.** The Clip 7·1 caption reads "…The replay checks the owner and deletes in one atomic step." The clip text and bullet say "Replay with EVAL… a Lua script Redis runs atomically". Section 7.2 asks "Check the owner in your own code. Is that enough?" and introduces EVAL as its answer.
Fix: end the caption at "…consumer 1's blind DEL removes consumer 2's lock." Move the EVAL replay out of the clip, or place the whole clip at the end of 7.2 as a recap. Either way, don't show EVAL before 7.2.

**7b. ZooKeeper answers chapter 8 before chapter 8 asks.** 7.3 says "ZooKeeper replicates its state across several servers that agree on every change." The next paragraph says "Look at what Redis, the MySQL row, GET_LOCK and the one-connection server have in common. Each lock lives on exactly one server." The list quietly leaves ZooKeeper out, and the reader has just been told how to survive the lock server dying.
Fix: move the ZooKeeper paragraph to 8.1, where consensus-based lock services already appear. Then the closing line of 7.3 is true of everything in the section.

**7c. The "assume something dies after every line" habit is stated four times.** It appears in the header, the 5.5 close, 7.2 ("imagine that after every single line, something lags or goes down"), and implicitly in 8.3. 7.2 repeats the header almost word for word.
Fix: keep it in the header and in 7.2, where the GET/DEL race earns it. In 5.5, shorten to "That is the habit the whole build ran on."

---

## Chapter 8 · All locking runs through one Redis. What happens when it dies?

Flow 3 · Clarity 4 · Engagement 4

**8a. "Few companies need this" lands in the wrong place.** In 8.1, right after the replica pause and before Redlock is built: "few companies ever need a distributed lock". This deflates the build mid-stream, and it also clashes with 6.1 ("across machines that lock is what keeps a system's data correct").
Fix: move the sentence to 8.4 ("Why do it?"), where it answers who pays this cost.

**8b. The clip prompt asks what the reader was just told.** 8.2 prose: "If you don't get a majority, release at once… Then wait a random moment before trying again." The prompt then asks "What must the second one do now?"
Fix: put the clip and its prompt right after the majority rule and before the release paragraph. Or change the prompt to the open part only: "…and what happens to the first when a node goes down?"

**8c. 8.4's question was answered twice before it is asked.** 8.4's title is "Five nodes, and the lock got slower. Why do it?" But the clip's last bullet already says "Distributing the lock buys fault tolerance, not speed", and 8.2 says "throughput drops… where correctness and staying up matter more".
Fix: cut the clip's last bullet and the matching clip-text sentence. In 8.2, keep "Every acquire now talks to five servers instead of one" and let 8.4 deliver the "fault tolerance, not capacity" point.

**8d. Redlock's place is left unclear after Kleppmann.** "If a lock only saves duplicate work, a single Redis is enough, and if it protects correctness, use a consensus system such as ZooKeeper, with fencing tokens." The reader asks: then when is Redlock the right choice? 8.3 adds more gaps and Redis's own advice to use fencing tokens, and never answers.
Fix: one sentence after 8.3's "minimized, never fully covered" (check source). For example: "Redlock fits where a lock must survive its server and a rare double holder is tolerable; where it isn't, add fencing tokens or use a consensus store."

**8e. Leader election is never closed.** See 6a. The orchestrators that need "only one of them may lead" are the most real use of this lock on the page, and Build 2 ends without returning to them.
Fix: one line in 8.4 or 8.6: "This is also the lock your orchestrators needed: whoever holds `orchestrator-leader` leads." (check source)

**8f. The hand-off to Lecture 6 works.** It joins cleanly to Lecture 6's opening ("Two databases, and both have an order 3", with Lecture 6's header pointing back to this one). No change.

**8g. The recall questions are good.** There are four, and they test decisions rather than slogans. Only Q1's answer interacts with 4a.

---

## Retelling in 7 sentences

1. A load balancer is a TCP proxy: it accepts the client's connection, opens its own to a backend, and copies bytes both ways in two goroutines, so every client costs two connections.
2. It picks the backend by round robin when servers and requests are uniform, by weights when server sizes differ, and by fewest open connections when response times vary; it never queries backends per request.
3. One LB server holds 10,000 connections, or 5,000 clients, so you run many, each routing from an in-memory copy of a configuration kept in a database, while an orchestrator health-checks every backend's /health and edits that database.
4. Polling leaves copies stale and requests failing for up to one interval, so changes are pushed through a meta port or a real-time Pub/Sub (re-pull on reconnect), and the orchestrator scales the LB fleet from Prometheus metrics.
5. Clients reach the fleet through a private DNS name whose IPs the orchestrator maintains; DNS only resolves names and never sees requests, and the stateless orchestrator itself runs as an elected leader with followers under a global monitor. Each added box fixes either a bottleneck or a single point of failure.
6. Across machines nothing shared keeps a lock record, so you put one in Redis: `SET key token NX EX ttl` to take it, and a Lua script that deletes only your own token to release it, because a plain DEL, or a GET followed by a DEL, can delete someone else's lock after a TTL expiry.
7. To survive the lock server dying (an async replica can lose the lock), Redlock takes the lock on a majority of five independent nodes within the TTL and needs delayed restarts and ideally fencing tokens; it buys fault tolerance at the cost of throughput, and Lecture 6 asks how a fleet hands out unique IDs.

**How hard was it?** It was easy for Build 1. Each chapter's ending tells you the next sentence. Build 2 was moderate. Sentence 6 was easy, because the blind-DEL and GET/DEL stories stick, but I had to stop over *why* the build exists (a queue the page itself calls silly) and what the lock covers (a pop or a six-minute job). For sentence 7, I wasn't sure what Redlock is recommended *for* after Kleppmann's single-Redis / ZooKeeper split. The weighted round-robin "80%" made me re-check the arithmetic of sentence 2.

---

## Top 10 fixes, ranked by impact

1. **Give Build 2 a real driving problem and close the loop (6.0, 6.1, 5.5, 8.4/8.6).** Open with the orchestrators' "only one may lead" from 5.5, narrow it to the queue exercise, and end chapter 8 by saying the same lock elects the leader (check source). Replace 6.1's database-mediated examples, which argue *against* needing your own lock.
2. **Fix the weighted round-robin arithmetic (2.2 prose, Fig 2·b gauges and caption).** At the same load, 1 : 2 : 1 gives about 60% / 60% / 60%, not 80% everywhere. The gain is about a third more headroom (check source).
3. **Say what the lock covers (6.0, 6.3 protocol, 7.0).** "Read and process" vs "read": without it, the five-minute TTL and the six-minute job make no sense (check source).
4. **Move ZooKeeper's replicated lock from 7.3 to 8.1.** As placed, it answers chapter 8 early and makes 7.3's "each lock lives on exactly one server" false.
5. **Reconcile the gatekeeper (6.3 pause) with the one-connection lock server (7.3).** Say the gatekeeper would work because it *is* a lock manager you'd have to build.
6. **Unspoil the clips and blurbs.** Clip 2·1 caption, Clip 7·1 caption and its EVAL replay (EVAL before 7.2), the Clip 8·1 prompt (already answered) and last bullet (pre-answers 8.4), and the chapter 8 blurb's "two holders".
7. **Make the ports and names consistent.** Port 9000 vs ARLB's 9090 vs meta port 9091, three backends vs four, and `payments.example.com` / `payments.lb.google.com` / `payments.google.com`.
8. **Fix the poll-window contradiction (4.1, "What you can now do", recall Q1).** Use "up to almost N seconds" everywhere, not "N − 1" and "up to 9 seconds".
9. **Clear up the orchestrator's failover in 5.3.** Name the followers' "grunt work" or cut it, say who elects the leader and what the global monitor watches ("each orchestrator's leader"), and fix the Maglev "simpler road" vs "follows Maglev" contradiction (check source).
10. **Answer the two questions every engineer will ask in Build 1, and trim repeats.** Why the LB servers don't health-check backends themselves (3.2), and why a failed dial doesn't just route around the dead backend (4.1) (both check source). Then cut the triple "use least connections", the ZooKeeper watch detail, MongoDB's 5 ms, and the 8.1 "few companies need this" placement, which also brings the reading time back toward 50 minutes.
