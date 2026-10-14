# Lecture 06 ledger, part 2 (01:07:29 - 02:02:56): notes

File: `part2.jsonl`, 112 items (K2-001 .. K2-112), validator: PASS (0 errors, 0 warnings; every verbatim found word for word).

## Topic tree

- **Admin**
  - Agenda: K2-035 (on-demand optimization next), K2-063 (after the break: tagging, then unread indicator)
  - Later weeks: K2-052 (async processing with video streaming, ~six weeks)
- **Learning approach**: K2-053 (build the 9:00-10:30 sequence as one local prototype in two days)
- **Gravatar**
  - Architecture / upload: K2-001, K2-010
  - Schema (derived hash stored): K2-002, K2-003
  - API endpoint, S3 path derived on the fly: K2-005, K2-006
  - CDN (serve via CDN, property gravatar.com, origin api.gravatar.com, flow, why not S3 directly): K2-004, K2-007, K2-008, K2-009, K2-024, K2-025, K2-026
  - CDN invalidation (Kafka event, TTL 1-2 days, consumers call CDN API, UX): K2-011 to K2-015, K2-034
  - Mark active / transaction (wrong photo ID, 404, check-then-update, ownership check, security): K2-018, K2-020, K2-021, K2-056, K2-060, K2-061
  - Summary (details make it interesting): K2-017
- **CDN > invalidation** (CDNs expose invalidation APIs; Cloudflare, Akamai): K2-016, K2-033
- **Databases**
  - Transactions (no-op update is an alarm; validate before writing; student's open proposal): K2-019, K2-022, K2-023
  - Query performance (runtime hash = full scan; join criterion vs filter; narrowing): K2-027, K2-028, K2-029
  - Query optimizer (evaluation order, predicate pushdown, bottom-up tree): K2-030, K2-031, K2-032
  - Schema > data types (enum vs Boolean, 8 bits, tiny int, no strings): K2-057, K2-058, K2-059
  - Schema > relationships (Slack membership table vs Gravatar): K2-062
- **Image optimization**
  - On-demand (problem, not pre-generated variants, w=32 query param, origin flow, transformations, same as CDN): K2-036 to K2-040, K2-044 to K2-046
  - Libraries (ImageMagick, PIL bindings, C++): K2-041, K2-042, K2-043
  - Scaling (CPU-intensive, bulky machines, synchronous not async, Cloudflare/Cloudinary blog, autoscaling, cloud providers): K2-047 to K2-051, K2-054, K2-055
- **Senior engineering**
  - Mindset (cross-system impact, think what management has not, dissect one-liners, devil in details): K2-064, K2-066, K2-089, K2-101, K2-110
  - Three hats (PM, architect, engineer): K2-068, K2-069, K2-070, K2-071
  - Product thinking (engineers can propose product ideas; think as end user): K2-111, K2-112
- **Photo tagging**
  - Requirements exercise (CXO one-liner, requirements not solution, no engineering yet, every question changes design): K2-065, K2-067, K2-072, K2-073, K2-080
  - Authorization (who can tag me, separate authz layer, profile setting, self-removal, granular authz): K2-074, K2-075, K2-090, K2-091, K2-092
  - Max tags (limit, concurrency not a challenge, array for 5 vs separate entries + pagination for 10,000): K2-076 to K2-079
  - Notifications (notify tagged users, notification team scale-up, critical notifications, product-level throttling, 3-5/week, club them, celebrity example): K2-081 to K2-088
  - Suggestions (ML face recognition, SLA, synchronous dependency, fallback, product call): K2-093 to K2-097
  - Activity and storage (activity page async; tags must be indexed/queryable; DB choice): K2-098, K2-099, K2-100
  - Feed: K2-102
  - Position (absolute coords wrong, relative position, bounding box, LTRB vs XYWH, hover on resize): K2-103 to K2-107
  - Integrations (search, face detection, location, notification, RBAC; everything via Kafka): K2-108, K2-109

## Counts by type

| type | n |
|---|---|
| qa_insight | 21 |
| concept | 20 |
| rule_of_thumb | 20 |
| claim | 16 |
| process | 12 |
| definition | 5 |
| example | 5 |
| comparison | 3 |
| number | 3 |
| admin_reference | 3 |
| misconception | 2 |
| tradeoff | 1 |
| war_story | 1 |
| **total** | **112** |

Confidence: 82 high, 30 medium, 0 low.

## Coverage by 5-minute window

| Window | Items | Note |
|---|---|---|
| 01:07:29-01:12:29 | 14 | Gravatar architecture, CDN serving, invalidation start |
| 01:12:29-01:17:29 | 8 | invalidation consumers, summary; Q&A on wrong photo ID (long student turns) |
| 01:17:29-01:22:29 | 11 | CDN mapping Q&A, runtime hashing, join criterion, predicate pushdown |
| 01:22:29-01:27:29 | 15 | CDN invalidation Q&A, on-demand image optimization, ImageMagick |
| 01:27:29-01:32:29 | 11 | CPU-heavy scaling, sync not async, blog story, build-it advice, Q&A |
| 01:32:29-01:37:29 | 5 | Boolean/enum Q&A, ownership check, membership table; break notice; break from ~01:35:57 |
| 01:37:29-01:42:29 | 7 | break until 01:40:40; tagging brief, three hats |
| 01:42:29-01:47:29 | 6 | student proposals (schema, owner-only tagging, max tags, concurrency) - mostly dialogue |
| 01:47:29-01:52:29 | 13 | max-limit -> schema, notifications, throttling |
| 01:52:29-01:57:29 | 10 | profile setting, self-removal, suggestions/SLA/fallback, activity, indexable storage |
| 01:57:29-02:02:29 | 12 | feed, relative coordinates, bounding box, integrations, Kafka, product thinking |
| 02:02:29-02:02:56 | 0 | tail of the closing paragraph started at ~02:02:03 (covered by K2-111, K2-112) |

## Doubts / open questions

- **K2-034**: the teacher answers "Correct. Synchronous. Yes." to "invalidating the cache directly by calling the CDN", while the design he drew (K2-015) uses Kafka consumers to call the CDN. Possible inconsistency; the board may show which.
- **K2-024**: `[check: "API.com." may be a student's answer]` - who said "API.com." before the teacher's "No, no."
- **K2-028**: `[check: "can" vs "can't"]` at 01:20:10 flips meaning ("You can do it" vs "You can't do it"); the item relies on the teacher's later, clear "We don't need user ID. We just a join criteria".
- **K2-021**: the check-then-update query is partly garbled (`[unclear: "It with Matt meets that day"]`, `[unclear: "That use"]`); the board may show the select he wrote.
- **K2-056**: the student asked about the select after the active-photo-ID optimisation; the teacher wrote an update query (`update users set active photo ID ... where hash ...`). The board should show exactly what was written.
- **K2-058**: the teacher says Boolean "8 bytes" and corrects to "8 bits"; the fact-checker should look at it (MySQL BOOLEAN = TINYINT(1)).
- **K2-052**: "will talk seven, we'll talk in six weeks" - the week number is uncertain.
- **K2-055**: "a team that manages its own app" - the object is probably infrastructure/CDN, but that is unclear.
- **K2-062**: the teacher calls the student's one-to-one vs one-to-many answer "Brilliant. You gave the answer" and then says Gravatar is also one-to-many; I kept it as a qa_insight with the real reason (extra per-user attributes in the membership table).
- **Speaker doubts**: K2-074 (interjection "yes, that's ... right"), K2-077 ("Student 3" replies after Student 5), K2-081 ("If I say yes, then" may be the teacher), K2-090, K2-091 ("Teacher?: Correct."), K2-098 (the label answered to two different names).
- **ASR terms the board may confirm**: predicate pushdown (K2-031), face detection (K2-108), granular (K2-092), edge.arpitbhayani.me (K2-008, K2-024), api.gravatar.com (K2-026).
- Cross-part: K2-003 / K2-027 re-teach the part-1 point that the hash column is stored to avoid a full scan. K2-021 / K2-060 extend the part-1 mark-active transaction. The gap hunter and editor should link or merge these with part 1.
