# Lecture 3 (lec05) storytelling rewrite: blind exam grade

Method: step 1, a blind reader answered all 141 questions from `story/page_text.md` alone (`story/blind_answers.json`). Step 2, the answers were graded against `qa/exam.json` without being changed. Where the key repeats a lecture claim that the fact-check corrected and the page carries the correction (Redis expiry threshold ~10%, not 25%; deadlock victim choice; plain reads under an exclusive lock; Apache Ignite not built on an RDBMS; the CLT / 5-million-key claims), the answer is graded against the key but the cause is CUT-OK (fact-check correction).

## Score

| | count |
|---|---|
| correct | **111** |
| partial | 12 |
| wrong | 1 |
| missing (NOT ON PAGE) | 17 |
| **total** | 141 |

- Strict: **111 / 141 (78.7%)**
- Half credit for partials: **117 / 141 (83.0%)**
- The old long version scored 140/141 (99.3%; 99.6% with half credit).

Causes of the 30 non-correct answers: CUT-OK 26 (9 of them fact-check corrections), CUT-LOSS 3, PAGE-ERROR 0, READER-MISS 1 (the page covers it; the blind reader got it wrong).

## Non-correct questions

| id | question (short) | grade | cause | fix |
|---|---|---|---|---|
| Q001 | Agenda's three items, board order | missing | CUT-OK | Board list. The overview's "two builds" carries the structure. |
| Q002 | New tech's first applications are in finance | missing | CUT-OK | Historical framing (computers, blockchain). Colour, not method. |
| Q003 | Why relational DBs need strong guarantees; ACID core | missing | CUT-LOSS | Ch1 §1.4, before "You might object": "Relational databases grew up around money, where a transaction can't be lost or corrupted and many people update the same data, which is why transactions sit at their core." (L-0013, L-0014; fact-check: ACID was formalised later, so don't say Codd's model included it.) Also sets up §9.6's "what did Redis and DynamoDB give up". |
| Q004 | Board: rows/columns, relations, ACID | missing | CUT-OK | Board definitions a learner arrives with ("Before you start" assumes SQL basics). |
| Q011 | How DBs avoid deadlock; which txn is killed | partial | CUT-OK (fact-check) | Key: the requester that would close the cycle is killed. Page: wait-for cycle check, victim rolled back, InnoDB prefers the smaller txn (L-0033 imprecise/medium). |
| Q012 | Why a DB never enters deadlock | partial | CUT-OK (fact-check) | Reader said "it would stall"; key adds "only exit is a reboot, i.e. downtime", which the fact-check marked imprecise (L-0035). |
| Q015 | Four shared-lock rules on the board | partial | CUT-LOSS | Rule 4 (upgrade to exclusive on modify) is absent. Same sentence as Q018. |
| Q018 | Shared-lock holder modifies the row | partial | CUT-LOSS | Ch2 §2.2, "Go deeper: FOR SHARE", after the first sentence: "Other transactions can still read a row you hold a shared lock on, and if you modify it yourself the database upgrades your lock to an exclusive one automatically, granted only once nobody else holds a shared lock on that row." (L-0044, with L-0041; wording follows the L-0044 fact-check note.) |
| Q019 | Exclusive-lock rules | partial | CUT-OK (fact-check) | Key: others cannot read. Page correctly says plain SELECTs still read the last committed version (MVCC). |
| Q058 | Is row locking at the disk level? | missing | CUT-OK | Student Q&A; fact-check marked "not at disk level at all" imprecise (L-0133: PostgreSQL writes row locks to the tuple). Optional in §2.3: "The lock and its wait queue live in the engine, not in your code." |
| Q063 | How to build deep DB-internals understanding | partial | CUT-OK | Study advice (a week in MySQL's source; docs over YouTube). The page's "build it yourself" covers the spirit. |
| Q065 | Only an UPDATE fired: what governs it? | partial | CUT-OK | Key: the isolation level decides. Page gives the sharper fact (an UPDATE takes an exclusive lock on its rows by itself) plus the FOR UPDATE route. |
| Q068 | Generic claims never to believe | partial | READER-MISS | Reader gave only "don't scale". §4.3 also says relational systems partition/shard at very large scale (Vitess). No change needed. |
| Q070 | KV requirements; real system built this way | partial | CUT-OK (fact-check) | Key names Apache Ignite as built on an RDBMS; fact-check says it isn't (L-0173 imprecise/medium). Requirements were correct. |
| Q071 | Brainstorm parts in board order | missing | CUT-OK | Board list; the chapters follow the same order. |
| Q099 | Why Redis doesn't delete all expired keys per run | partial | CUT-OK | Missing "lazy deletion already handles ~90%", which the fact-check marked unverifiable (L-0246). |
| Q100 | Steps of Redis random sampling | partial | CUT-OK (fact-check) | Steps right; threshold is the corrected ~10%, not the key's 25%. |
| Q102 | 3 of 20 expired: what next? | wrong | CUT-OK (fact-check) | Under the corrected 10% rule, 15% means go again; the key's "below 25%, stop" is the old claim. |
| Q104 | Why exactly 20 keys; up to what scale | missing | CUT-OK (fact-check) | CLT and 5-million-key claims are unverifiable (L-0255, L-0256); rightly cut. |
| Q108 | In-memory append-only layer in front of the DB | missing | CUT-OK | Student Q&A tangent ("that's a cache"). |
| Q126 | When is LIMIT applied? | missing | CUT-OK | Q&A tangent; fact-check marked imprecise (L-0307). |
| Q127 | Reasons for disliking ORMs | missing | CUT-OK | Q&A tangent. |
| Q128 | When an ORM is fine | missing | CUT-OK | Q&A tangent. |
| Q129 | Native SQL inside an ORM | missing | CUT-OK | Q&A tangent. |
| Q130 | Go (and Python/C++) over Java | missing | CUT-OK | Opinion tangent. The page keeps "Go makes concurrency easy". |
| Q131 | "Circle of life" of languages | missing | CUT-OK | Opinion tangent. |
| Q136 | Online indicator: why can't the server push? | missing | CUT-OK | Lecture 1 (green dot) Q&A; belongs to that page. |
| Q137 | WhatsApp Web with no heartbeats | missing | CUT-OK | Lecture 1 Q&A; belongs to that page. |
| Q138 | Are real KV stores built on an RDBMS? | partial | CUT-OK (fact-check) | Redis/DynamoDB right; key's "Ignite yes" was corrected (L-0345). |
| Q141 | Front end for last week's blog assignment? | missing | CUT-OK | Admin. The principle (build only the part you want to learn) is in the overview. |

Graded correct but flagged `found: false` by the reader: Q074 (key PK, value BLOB, inferred from Fig 5·a and §5.1) and Q139 (write it yourself and make mistakes, §9.6).

## What was lost

- **Mostly opening theory, board lists and Q&A residue (17 CUT-OK, not counting fact-check corrections).** The page drops the opening relational-database theory (finance first, rows/columns, the board agenda) and the long Q&A tail (ORMs, Go vs Java, the language "circle of life", LIMIT, the in-memory layer, the Lecture 1 presence questions, the blog assignment). A learner following the story doesn't need any of them.
- **Fact-check corrections work as intended (9 CUT-OK).** Every miss on Redis expiry (10% rule), the deadlock victim, plain reads under exclusive locks, Apache Ignite and the CLT/5-million claims is the page being right where the key repeats the lecture's original claim.
- **Two real gaps (CUT-LOSS):**
  - **Lock upgrade (Q015, Q018).** The page shows shared holders deadlocking when both update, but never says why: the shared lock is upgraded to an exclusive one on modify. One sentence in §2.2's FOR SHARE box fixes both questions.
  - **Why relational databases are strict (Q003).** The page leans on "the store inherited everything relational databases are strict about" (§9.6) and hands off to Lecture 4's "what did they give up", but never says where that strictness comes from. One sentence in §1.4.
- **No PAGE-ERROR.** No contradictions found. Clip numbers (1.7 s vs 147 ms, 7,260 evaluations, the 200-key sampling example ending at ~11%) agree with the prose.

Net: two sentences, one in Ch1 §1.4 and one in Ch2 §2.2, recover all three CUT-LOSS items. The 21-point drop from the old long version (140/141) is almost all intended cuts and fact-check corrections.
