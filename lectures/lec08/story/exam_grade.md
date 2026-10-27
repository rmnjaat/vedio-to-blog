# Lecture 5 (lec08) storytelling rewrite: blind exam grade

Method: in step 1, a blind reader answered all 164 questions using only `story/page_text.md` and the questions-only file. The answers are in `story/blind_answers.json`. In step 2, those answers were graded against `qa/exam.json` and were not changed. The page carries some fact-check corrections where the key repeats the lecture's original claim: Prometheus pulls (L-0200); resolvers list several nameservers instead of "a DNS for CoreDNS" (L-0234); in Redlock the majority holder does not go back for the remaining nodes, and the restart window is the whole TTL (L-0316, L-0318, L-0319). In those cases the answer is graded against the key, but the cause is CUT-OK (fact-check).

## Score

| | count |
|---|---|
| correct | **129** |
| partial | 20 |
| wrong | 0 |
| missing (NOT ON PAGE) | 15 |
| **total** | 164 |

- Strict: **129 / 164 (78.7%)**
- Half credit for partials: **139 / 164 (84.8%)**
- The old long version scored 160/164 (97.6%), or 162/164 (98.8%) with half credit, in `qa/exam_grade.md`. Round 2 of the old version (`qa/exam_grade_r2.md`) scored 159/164, or 161.5 with half credit.

Causes of the 35 non-correct answers:

| Cause | Count | Notes |
|---|---|---|
| CUT-OK | 28 | 4 of them are fact-check corrections |
| CUT-LOSS | 3 | Q011 and Q013 share one fix; Q074 needs its own |
| PAGE-ERROR | 0 | |
| READER-MISS | 4 | |

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q001 | Four agenda items on the board | missing | CUT-OK | Board list. The overview's "two builds" carries the structure. |
| Q006 | Professor's best/worst thing; design rule | partial | CUT-OK | Murphy's-law rule is on the page (overview, §5.5, §7.2). The professor attribution is colour. |
| Q008 | Design loop on the board, and the arrow | partial | CUT-OK | Board list. "Get one machine right first, then scale each part and watch where it breaks" (ch1 intro) carries the loop. |
| Q009 | What level of detail matters under load | missing | CUT-OK | Study advice ("microscope"). §1.3's "build it locally" keeps the spirit. |
| Q010 | Three reasons under "Why distributed systems?" | missing | CUT-OK | Board list. The ideas (scale, fault tolerance) are in §5.5 and §8.4. |
| Q011 | Autoscaled API servers ≠ horizontally scalable | partial | **CUT-LOSS** | See fix A. |
| Q013 | Is a non-scalable DB acceptable? | missing | **CUT-LOSS** | Same sentence as Q011 (fix A). |
| Q014 | Why Flipkart built its own LB | missing | CUT-OK | Anecdote (on-prem). |
| Q024 | Where to configure the algorithm; option missing | partial | CUT-OK | "Raise a support ticket / feature flag" is an admin tip. |
| Q031 | Least-connections diagram request numbers | partial | CUT-OK | Board diagram detail. Clip 2·1 uses its own 10-request example, which is internally consistent. |
| Q033 | How can a request take an hour over HTTP | missing | CUT-OK | Q&A tangent (keep-alive, gRPC). |
| Q034 | Least conn picks a server about to free up | partial | CUT-OK | "Local decision is enough" is on the page (§2.3). The BigQuery/Redshift example was cut. |
| Q035 | User closes browser mid-request | missing | CUT-OK | Q&A tangent (async jobs, cancelling). |
| Q036 | Three LB requirements on the board | partial | CUT-OK | Board list. The overview's brief covers balancing and scaling. "Tunable algorithm" is chapter 2 in practice. |
| Q054 | Strategies in the teacher's code | partial | CUT-OK | Code trivia (static, hashed). |
| Q059 | Four brainstorm factors | missing | CUT-OK | Board list. The chapters follow it. |
| Q069 | Student: health checks add request latency | partial | CUT-OK | The student exchange was cut. The page has the substance: the orchestrator runs the checks (§3.2), requests route from memory, and staleness is the real cost (§4.1). Optional: §4.1 after "more than the load it puts on the database", add "(the health checks themselves run on the orchestrator, so no user request waits on them)" (L-0167). |
| Q074 | Which push approach is right | partial | **CUT-LOSS** | See fix B. |
| Q080 | Where vitals go and who sends them | partial | CUT-OK (fact-check) | Key says agents push. The page says Prometheus scrapes (L-0200 imprecise). |
| Q092 | Orchestrator's focused responsibilities (board) | partial | CUT-OK | Board list. The pieces are all on the page. The φ-accrual reading pointer was cut. |
| Q093 | What LB servers scale on, and the data source | partial | READER-MISS | §4.4 lists "the number of open TCP connections" among the vitals. The reader gave only CPU. |
| Q094 | Label above orchestrator; what Autoscaling feeds | partial | READER-MISS | Fig 5·d description: "autoscaling points into the LB console / APIs". |
| Q097 | CoreDNS goes down; finding a working one | partial | CUT-OK (fact-check) | The page uses several copies plus up to three nameservers per machine. The key's "DNS for CoreDNS … one node with a standby" is L-0234 imprecise. |
| Q098 | Public users and a private LB | partial | CUT-OK | Q&A. The page's gateway box (§5.4) answers Q155, not the "make the LB public / Route 53" branch. |
| Q127 | Board answer to "But why are we doing this?" | partial | READER-MISS | §8.1: Redlock's "only purpose is to remove the single point of failure". The reader answered "fault tolerance" from §8.4. |
| Q128 | Further reading on locks | partial | CUT-OK | Reading list (Chubby paper, Kleppmann blog/videos). Chubby and Kleppmann are both named on the page. |
| Q140 | Two of three nodes down: two holders? Minimized how? | partial | CUT-OK (fact-check) | "Yes" is on the page. The key's minimisation (holder grabs remaining nodes) is L-0316/L-0318 imprecise. The page gives delayed restarts, fsync and fencing. |
| Q141 | Why the holder keeps acquiring the remaining nodes | missing | CUT-OK (fact-check) | L-0319 imprecise. The page states the corrected behaviour (Fig 8·b step 4). |
| Q143 | Why not ZooKeeper instead of Redis | partial | READER-MISS | §8.1 says it is "the same ZooKeeper that could have carried the configuration changes in chapter 4; know how it works inside". §4.3 says it notifies watchers. |
| Q144 | Why young orgs pick Redis over ZooKeeper | missing | CUT-OK | Opinion. §7.3 keeps "think in properties, then pick the stack you are comfortable with". |
| Q145 | Read several messages at once | missing | CUT-OK | Q&A tangent (SQS batch of 10). |
| Q147 | Active-passive LBs behind DNS | missing | CUT-OK | Q&A tangent. |
| Q148 | Sticky sessions: separate session service? | missing | CUT-OK | Q&A tangent (consistent hashing in the LB). |
| Q159 | Is Prometheus's read side a bottleneck | missing | CUT-OK | Q&A tangent. Its storage claims were dropped in fact-check (L-0369/L-0370). |
| Q163 | Why autoscaling is separate from the orchestrator | missing | CUT-OK | Q&A. Fig 5·d draws it separately. §4.4 has the orchestrator scale the LB fleet itself. |

Graded correct, though the reader marked them `found: false` or hedged: Q002 (one address over many machines, ch1 intro), Q006's rule (graded partial only for the attribution), Q020 (inferred from §2.1's 1-2-3-1 sequence), and Q157 (business logic of the service, §5.4).

Correct with minor omissions (no fix needed): Q016 (the page adds the name label), Q022 (the middle box drawn wider), Q025 (promotion pitch), Q073 (the removed `syn-` curve), Q088 (the DNS-to-orchestrator line, which the reader gave in Q089), and Q149 ("every box is a 3-10 ms hop").

## CUT-LOSS fixes

**A. Q011 + Q013: every layer must scale, not just the API servers (L-0037, L-0040, L-0038, L-0044; worded per the L-0039 fact-check).**
In chapter 3's intro, after "So one LB server is a bottleneck, and the load balancer, like every other layer, has to scale horizontally: many LB servers instead of one.", add:

> That is the test for every layer, not only the API servers: an autoscaling policy that adds API servers doesn't make a system horizontally scalable if the load balancer, cache or database in front of or behind them can't grow. A layer can stay on one machine (a database often does) as long as it carries the peak load and has a standby.

This also supplies the setup for §5.5's bottleneck-versus-SPOF split.

**B. Q074: no one right push (L-0175, L-0182).**
In §4.3, directly before "The rule to keep", add:

> Neither push is the one right answer; the call to each meta port and the broadcast each fit some situations. What both get right is the rule below.

This also softens the "Instead, publish…" sentence earlier in §4.3. As written, that sentence reads as if the meta-port option were wrong, which the lecture did not say.

## What was lost

- **Board lists, anecdotes and the Q&A tail (24 CUT-OK, not counting fact-check corrections).** The cuts are the agenda, the "why distributed" list, the brainstorm factors, the LB requirements, the orchestrator's responsibility list, Flipkart, the hour-long HTTP question, browser-close resubmits, active-passive DNS, sticky sessions, batch reads, Prometheus read scaling and the reading lists. The story doesn't need any of them.
- **Fact-check corrections work (4 CUT-OK).** Prometheus pulls, the nameserver list replaces "DNS for CoreDNS", and the Redlock restart behaviour is the corrected one. In each case the page is right where the key repeats the lecture's original claim.
- **Two real gaps (CUT-LOSS).** First, the opening "horizontal scalability means every layer" idea and its database corner-cut were dropped with the opening theory. The page's §5.5 assumes that idea without ever stating it. Second, the teacher's "both pushes are fine" verdict was dropped. Each gap needs one sentence.
- **No PAGE-ERROR.** No contradictions were found. The weighted-RR numbers (80%/40% → 60%, a third more headroom), the 10,000 → 5,000 arithmetic, the 9 seconds of errors in Clip 4·1, and the request numbers in Clip 2·1 all agree with the prose.
- **READER-MISS (4).** Q093, Q094, Q127 and Q143 are on the page, but sit away from where the question points: in a figure description, in §8.1 rather than §8.4, and in the §8.1 ZooKeeper aside.

Net: two sentences recover all three CUT-LOSS items, one in chapter 3's intro and one in §4.3. The drop from the old long version (160/164) comes almost entirely from intended cuts and fact-check corrections.
