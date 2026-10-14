# Ledger gap report

New items are in gaps.jsonl. Temporary ids were renumbered: G1-001->G-001, G1-002->G-002, G1-003->G-003, G2-001->G-004, G3-001->G-005.

## Part 1 (00:00:00-01:07:29)

Audited `part1.jsonl` (116 items, K1-001..K1-116) against every transcript sentence in 00:00:02-01:07:29. "Covered" = items whose first audio range starts in the window.

### Windows
| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 12 | 0 | - |
| 00:05-00:10 | 13 | 0 | - |
| 00:10-00:15 | 7 | 0 | - |
| 00:15-00:20 | 9 | 0 | - |
| 00:20-00:25 | 10 | 0 | - |
| 00:25-00:30 | 9 | 0 | - |
| 00:30-00:35 | 10 | 0 | - |
| 00:35-00:40 | 9 | 2 | G-001, G-002 |
| 00:40-00:45 | 6 | 0 | - |
| 00:45-00:50 | 5 | 0 | - |
| 00:50-00:55 | 7 | 1 | G-003 |
| 00:55-01:00 | 6 | 0 | - |
| 01:00-01:05 | 9 | 0 | - |
| 01:05-01:07:29 | 4 | 0 | - |

The lower counts in 00:40-01:00 are not under-coverage. Those windows are long student turns on the mark-active query, and the analyst grouped each exchange into one item with multi-range sources. I checked every substantive sentence there. Only 3 small items were missing. All three are asides (one student suggestion with no clear verdict, one student reason the teacher sidestepped, one analogy). No core concept is missing.

Verbatims: 116/116 found word for word (validator `PASS part part1.jsonl (116 items) | errors 0 | warnings 0`). No splices found on manual check.

### Distortions
- **K1-005**: the `detail` lists the four topics as "Gravatar, on-demand image optimization, tagging photos, newly unread message indicator". The agenda never names Gravatar. The first topic the teacher announces is a private image sharing platform. Transcript: "We'll talk about how to make a purely private image sharing platform, for example... So these are the four things that we'll discuss today." Fix: "Four topics in total: a purely private image sharing platform, on-demand image optimization, tagging photos, newly unread message indicator."
- **K1-062**: "scaling it is the difficult part" is read into an unclear ASR fragment. Transcript: "Not really, [unclear: \"good scan is\"] difficult, building a prototype is not." Fix: change the statement to "A system like Gravatar can be prototyped in three or four hours; something (unclear) is difficult, but building a prototype is not, so build as many prototypes as you can". Set confidence to low (built on the unresolved flag).
- **K1-108**: the statement turns the teacher's query into `select * from users where (hash) = ?`. The teacher said ID. Transcript: "By just replacing this to be select star from photos, select star from users where ID is equal to this." Fix: write `select * from users where ID = ?` as he said and add flag `check: teacher says "where ID" though the URL carries the hash (K2-056 later says "where hash")`.
- **K1-109**: credits the "join with users" answer to the teacher. The student made that point and the teacher only agreed. Transcript (Student 2): "if you are supporting a query that is given a photo ID, tell me it's active or not, you can join with the user, right? But that's not a frequent query." Teacher: "Now we can do that... Now that we are storing it over here." Fix: "...the teacher: it was there to mark one of multiple photos active; the student noted that with active_photo_id in users, the rare query 'is this photo active?' can be answered by joining with users, and the teacher agreed."
- **K1-111**: "(with the two user checks)" says more than the teacher did. He did not say what the two checks are. Transcript: "All you need is this with that, with those two additional checks." Fix: "(with those two additional checks)". It also needs a consistency flag. At 01:01:43 the teacher says the transaction is still needed with active_photo_id (K1-106, K1-107), but here he says no multi-query transaction is needed. Transcript: "You would still need this transaction." vs "No need to have two or three queries put in a transaction at all." Fix: add flag `check: contradicts 01:01:43 "you would still need this transaction"` to K1-111. Add a matching note in K1-106 `detail`: "at 01:05:18 the teacher says marking active becomes a single auto-commit query needing no multi-query transaction".
- **K1-116**: "At about 1 hour 10 minutes in" is an interpretation of an ASR phrase and has no flag. Transcript: "And it's already one or 10 minutes that we didn't cover on-demand image optimization yet." Fix: add flag `check: "one or 10 minutes" (probably 1:10)` and set confidence to medium.
- **K1-055** (minor): the `detail` says "Nothing beats practical experience". Transcript: "Nothing beats practical structure." Fix: "Nothing beats practical structure (probably ASR for experience/practice)". Alternatively, drop the detail.

Checked and kept as they are: K1-066 (proposed_then_corrected is right: Student 2 argued for storing only the hash and the teacher said "No, it's not right"); K1-104 (the correction is explicit: "So that's not a problem"); K1-065 (endorsed is fine because the detail records the hash being crossed off and added back); K1-092 (already flagged); K1-106 (speaker already flagged).

### Duplicates (within part 1)
- K1-040 / K1-048: both say GitHub does not pre-generate OG images and generates them on demand. K1-040 adds the misconception framing and the cost argument (millions of repos, compute every day). K1-048 adds the reason: the image holds recent data. K1-039 overlaps both (recency, "not pre-generated"). Merge K1-048 into K1-040 and keep the reason in detail. Cross-link K1-039.
- K1-046 / K1-053: both name PIL and ImageMagick as image-generation libraries. K1-053 adds "PIL is typically the best", that it uses ImageMagick internally, and the C++ binding. Merge into K1-053.
- K1-108 / K1-110: both say that with active_photo_id in users, the most frequent query needs no join. K1-110 adds the two-design comparison and "literally a primary key lookup". K1-108 adds the S3-path step and "extreme nitpicking, not a massive difference". Merge and keep both nuances.
- K1-095 / K1-096: both cover the user_id ownership check on the second update. K1-095 has the student exchange (the first "User ID" answer was challenged, then the ownership reason was called brilliant). K1-096 has the consequence (a random photo ID from the frontend leaves you with no active photo and someone else's photo active; security and correctness). Merge into K1-096 and keep the student exchange in detail.
- K1-091 / K1-092: the student proposes the transaction and the teacher insists it be explicit, with the crash scenario. Partial overlap. Cross-link with depends_on and don't merge (different speakers and statuses).
- K1-081 / K1-083: both say store the hash column and index it. K1-081 is the read side (pointy lookup, then the join). K1-083 is the write side (compute on user creation; email and hash both unique keys). Partial overlap. Merge or cross-link.
- K1-084 / K1-097 / K1-113: all three say simple systems hide intricacies and the details matter. K1-084 adds "drawing boxes is easy, devil in the details, write the query". K1-097 adds "this makes you a better engineer". K1-113 adds "no one way to build a system". Partial overlap. Cross-link and don't merge blindly.
- K1-112 / K1-114: both say people put is_active in photos because they think of it as a photo attribute. K1-112 gives the reasoning about entity attributes. K1-114 adds "every cohort (15th) starts there because we are trained to" and the natural progression. Partial overlap. Cross-link.
- K1-052 / K1-062 / K1-055: prototype advice. K1-052 is the OG-image prototype (one hour, Python, steps). K1-062 is the Gravatar prototype (three or four hours). K1-055 is the general claim that nothing is theoretical and you don't need 50,000 servers. Partial overlap. Keep all three and cross-link.
- K1-101 / K1-108 (detail): both say the remaining optimization is extreme nitpicking with very minimal performance difference. K1-101 introduces it and K1-108 resolves it. Cross-link.
- K1-107 / K1-111: both describe marking active with active_photo_id. K1-107 says inside a transaction with a select from photos. K1-111 says a single auto-commit query. They contradict each other (see distortions). Don't merge until the contradiction is flagged.

### Duplicates across parts (involving part 1)
- K1-082 / K2-003: both say Gravatar stores the derivable email hash, contrary to the previous lecture's advice. K1-082 gives the general rule ("not always true... depends"). K2-003 recaps it as "faster index lookup". Merge into K1-082.
- K1-081, K1-083 / K2-002: both say the users table stores email and hash. K2-002 adds "published photo row holds user ID and is_active = true". Partial overlap. Cross-link.
- K1-080 / K2-027: both say hash(email) = X in the WHERE clause forces a full table scan computing every hash. K1-080 adds "cannot leverage indexes". K2-027 is the Q&A repeat. Merge into K1-080.
- K1-103 / K2-029, K2-030: both say the hash filter on users runs first (one row), then the join to photos, then the is_active filter. K1-103 is the student's version (status open, low confidence). K2-029 and K2-030 are the teacher's own explanation (optimizer, unique key on the hash). The editor should cross-link them. K2-029 can support K1-103: the reasoning was later confirmed by the teacher.
- K1-096 / K2-018, K2-020, K2-021: wrong photo ID in the mark-active transaction. K1-096 says you are left with no active photo and someone else's is activated without the check. K2-018 says that with the check, no rows are updated. K2-020 covers the user ending with no active photo and a 404. K2-021 says check first (select by photo ID and user ID), then update. They build on each other. Cross-link and don't merge.
- K1-111 / K2-056: both say marking active becomes a single query on users. K2-056 writes it `where hash = <hash>`, while K1-111 and K1-108 use `where id`. Merge with both forms kept and note the difference.
- K1-071 / K2-006: both say the photo path is not stored because it can be derived. K2-006 adds how: derived from the user ID and the photo ID. Merge and keep the K2-006 specifics.
- K1-059 / K2-005: both say the Gravatar URL returns the photo bytes. K2-005 adds the API endpoint api.gravatar.com/photo/<hash> and the S3 read. Partial overlap. Cross-link.
- K1-046, K1-053 / K2-041, K2-042, K2-043: image libraries. K1-053 says PIL uses ImageMagick internally through a C++ binding. K2-042 says PIL has two bindings (native Python and ImageMagick). K2-043 says ImageMagick is pure C++ and callable from any language. Wording differs. Merge carefully and keep both phrasings.
- K1-043, K1-044, K1-047 / K2-009, K2-040: the same CDN-miss-to-origin pattern, applied to GitHub OG images (part 1), Gravatar (K2-009) and on-demand optimization (K2-040). These are not duplicates (different systems). Cross-link only.
- K1-003 / K2-036, K2-046: building your own on-demand image optimization like a CDN's. K1-003 is the agenda promise ("hardly a 10-minute discussion"). K2-046 says the design re-implements what CDNs do. Cross-link.
- K1-005 / K3-008: the unread indicator introduces a high-level pattern. K1-005 adds "used in production to prevent major outages". K3-008 is the restatement at the start of that topic. Merge into K1-005, or cross-link to K3-067/K3-069 (the pattern itself).
- K1-004 / K2-063, K2-064, K2-068: senior engineers wear multiple hats and see how a system affects others. K1-004 is the agenda framing. K2-064 and K2-068 are the taught content. Cross-link and don't merge.
- K1-058 / K3-091: Gravatar URL = MD5 hash of the email. K3-091 adds why there is no user ID in the hash (a universal function, so third parties need only the email). Cross-link.
- K1-084 / K2-017, K2-110: "the devil lies in the details". K2-017 is the Gravatar summary and K2-110 is the senior-engineering repeat. Partial overlap. Cross-link.
- K1-055, K1-062 / K2-053: build local prototypes. K2-053 adds "two days, the 9 AM-10:30 AM sequence". Partial overlap. Cross-link.
- K1-072 / K2-057, K2-058: the is_active boolean, then the Q&A on boolean vs tiny-int enum. These are related, not duplicates. Cross-link.

## Part 2 (01:07:29-02:02:56)

Auditor: gap hunter, part 2. Every transcript sentence from 01:07:29 to 02:02:56 was read against `part2.jsonl` (112 items, K2-001..K2-112). Cross-part duplicates were checked against `part1.jsonl` (K1-001..K1-116) and `part3.jsonl` (K3-001..K3-102).

### Windows

"Covered" = part-2 items whose first audio range starts in the window. Every substantive sentence in each window was matched to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:07:29-01:12:29 | 14 (K2-001..K2-014) | 0 | - |
| 01:12:29-01:17:29 | 8 (K2-015..K2-022) | 0 | - |
| 01:17:29-01:22:29 | 11 (K2-023..K2-033) | 0 | - |
| 01:22:29-01:27:29 | 15 (K2-034..K2-048) | 0 | - |
| 01:27:29-01:32:29 | 11 (K2-049..K2-059) | 1 | G-004 |
| 01:32:29-01:37:29 | 5 (K2-060..K2-064) | 0 | - (break starts 01:35:57) |
| 01:37:29-01:42:29 | 7 (K2-065..K2-071) | 0 | - (break until 01:40:40) |
| 01:42:29-01:47:29 | 6 (K2-072..K2-077) | 0 | - |
| 01:47:29-01:52:29 | 13 (K2-078..K2-090) | 0 | - |
| 01:52:29-01:57:29 | 10 (K2-091..K2-100) | 0 | - |
| 01:57:29-02:02:29 | 12 (K2-101..K2-112) | 0 | - |
| 02:02:29-02:02:56 | 0 (covered by K2-111, K2-112, ranges 02:02:03-02:02:56) | 0 | - |

The low counts are not under-coverage. 01:32:29-01:42:29 is mostly the break plus its announcement. 01:42:29-01:47:29 is slow student back-and-forth on "who can tag", with one teaching point per turn. Part 2 is dense and faithful, and only one small aside was missed:

- **G-004** (01:28:00): "And here I'm assuming CDN does not give you this feature. So if you are building your own CDN, this is exactly how you do it." The assumption appears in K2-037's detail, but no item has the claim that this origin-side transformation is how a CDN provider would build the feature itself.

Checked and judged covered (not gaps): "This is how you can efficiently serve photos at scale" (K2-017). The agenda at 01:14:03 is pure logistics, and K2-035 covers the same agenda. "Correct. Synchronous." (K2-034 detail). "No, but someone else can tag you or not" (K2-074 detail). "5 versus 10,000" (K2-078 detail). "Club them" (K2-087). The feed showing such posts to few users (K2-102). "you can extend it in many ways" (K2-101). "think on those granular details" (K2-061, plus K1-097 in part 1).

Verbatims: 112/112 found word for word (validator `part`: PASS, 0 errors, 0 warnings). The G-004 verbatim was also found (validator `gaps`: PASS).

### Distortions

- **K2-074**: status `proposed_then_corrected` overstates a correction. The teacher accepts owner-only tagging as obvious and says the student meant the right thing but phrased it differently. He reframes the point toward authorization; he does not reject it. Transcript: "Obviously that's a check, that you can only tag people in your photos, right? ... I know that's [?what you meant | asr: \"what you made it\"], but you put it in a different way, a different way." Fix: status `endorsed`. Detail: "the teacher accepted owner-only tagging as an obvious check and refined the point: what matters more is whether the tagged person allows being tagged (who can tag me)". Add flag `asr: [?what you meant | asr: "what you made it"]`. Confidence stays medium.
- **K2-084**: "distinct from system throttling" is inferred. The teacher only says it is a different kind of throttling and does not name what it differs from. Transcript: "This would also lead to the fact that there is a throttling. Now this throttling is different. This is basically product level throttling." Fix: replace "distinct from system throttling" with "a different kind of throttling".
- **K2-023**: missing speaker flag. The turn ends with "Yes, yes, yeah" inside Student 1's turn, which may be the teacher agreeing. The item says "No explicit verdict" but carries no flag. Transcript: "And this transaction not going through, I mean, rollbacking itself should be taking care itself here. I think that's all. Yes, yes, yeah." Fix: add flag `check: speaker of "Yes, yes, yeah" at the end of Student 1's turn (may be the teacher agreeing)`. Status stays `open`.
- **K2-056**: drops the teacher's confirmation of the student's read query. The detail says only that the teacher "answered by writing the update query". He first said yes to the select-by-hash. Transcript: "So it should be select star from users where hash is equal to hash of email, right?" / "Yeah, so that's the exact. So let me do that. Update users set active photo ID equal to something where hash is equal to something." Fix: in detail, say the teacher confirmed ("Yeah, so that's the exact") that the active photo is read with select * from users where hash = <hash>, then wrote the update query.
- **K2-060**: the detail says a student proposed a join, but it does not say the teacher endorsed the goal (verify ownership) and gave a different mechanism (get, then update), not a join. Transcript: "But you can check that if that photo is there or not and those parts. So you can do a get and then set. So get an update, you can check in that part." Fix: append to detail: "the teacher endorsed the ownership check but implemented it as get-then-update, not as a join".
- **K2-021** (minor): the select's filter is shortened. The teacher, after correcting himself, specifies "is active false" with photo ID and user ID. Transcript: "Select is active true. Sorry. Select is active false. [unclear: \"That use\"] where photo ID is this and user ID is this. If that row exists, then only you do [?these two | asr: \"this to them\"]." Fix: detail add "the teacher's select: is_active = false where photo_id = ? and user_id = ? (he first said true, then corrected to false)".
- **K2-082** (minor): drops the teacher's hedge that sending tag notifications is the usual answer. Transcript: "If it's a yes on sending notification to people, which in most cases would be." Fix: detail "the teacher expects the answer to sending tag notifications to be yes in most cases".
- **K2-004** (minor): "the AWS bill would shoot up" adds "bill". Transcript: "that would create chaos. Your AWS will go to shoot up." Fix: "AWS (usage/costs) would shoot up", or keep the teacher's wording "your AWS will shoot up".

### Duplicates (within part 2)

- K2-016 / K2-033: both say CDNs expose APIs to invalidate a path or cache. K2-016 is the design step with path /h1. K2-033 is the Q&A repeat and adds the names Cloudflare and Akamai ("every CDN").
- K2-014 / K2-034: both say to invalidate immediately for user experience rather than wait for the TTL. K2-014 adds the 1-2 day TTL context (with K2-013). K2-034 adds "see the uploaded photo everywhere", the student's restatement, and the "Synchronous" flag.
- K2-009 / K2-024: both describe the CDN mapping (gravatar.com goes to the CDN, a miss goes to origin api.gravatar.com). K2-009 has the full hit/miss/cache flow. K2-024 adds the student's reverse-order confusion and the edge.arpitbhayani.me analogy.
- K2-007 / K2-024: both say the CDN property gravatar.com has origin api.gravatar.com(/photos). K2-007 is the configuration step. K2-024 is the recap. Cross-link with the K2-009/K2-024 pair.
- K2-005 / K2-026 (partial): both say the API finds the active photo and reads it from S3. K2-026 adds why the CDN cannot go to S3 (only the DB knows which photo is active).
- K2-001 / K2-010: both say upload with a pre-signed URL, then register the photo in the DB. K2-001 adds "reused unchanged from yesterday". K2-010 adds "MySQL, or pick your favorite database".
- K2-022 / K2-061: both say to check first, then write. K2-022 frames it as data consistency. K2-061 frames it as security ("take care of security here and lapse here").
- K2-021 / K2-060 (partial): both say select the photo row by photo ID and user ID before updating. K2-021 frames it as the one-active invariant. K2-060 frames it as the ownership check and the teacher's "100%".
- K2-048 / K2-054: both say bulky many-CPU machines and nothing fancy. K2-048 adds parallelism and "on-demand, not async". K2-054 adds autoscaling on incoming requests.
- K2-051 / K2-054 (partial): "nothing magic, you need large servers" vs "nothing much to cover, bulky servers + autoscaling". K2-051 adds "synchronous" and "today".
- K2-075 / K2-090: both say a user controls who can tag them. K2-075 adds the separate authorization layer and Instagram/Twitter. K2-090 is the profile-setting phrasing, which the teacher said is already covered.
- K2-066 / K2-089 / K2-101 / K2-110: all say senior management has not thought it through, so you must. K2-066 adds "they trust your instinct; high level is easy". K2-089 adds "dissect the one-liner and point out details". K2-101 adds "startups and mid-scale companies; interfaces with many systems". K2-110 adds "devil lies in the details". Merge with care, or cross-link.
- K2-063 / K2-064: both say a simple system affects many other systems. K2-063 is the agenda. K2-064 is the senior-engineer responsibility.
- K2-084 / K2-086 / K2-087: product-level throttling. K2-084 adds the uninstall risk. K2-086 adds "every tagged post is bad UX". K2-087 adds "ask the notification team, club them, rich experience". K2-086 is fully inside K2-084 + K2-087, so merging is safe.
- K2-094 / K2-095: both say the ML suggestion service must meet a strict SLA. K2-094 adds front-end changes and flickering suggestions. K2-095 adds the synchronous-dependency framing.
- K2-099 / K2-100: both say tags need a DB that supports "photos this user is tagged in". K2-099 adds "arrays are unindexable". K2-100 adds "not any random DB, very efficiently".
- K2-108 / K2-109: both list analytics/profile/feed/activity/search/notification. K2-108 adds face detection, location and RBAC. K2-109 adds "through Kafka, no matter what". Keep both. The list overlap is only partial.

### Duplicates across parts (involving part 2)

- K2-003 / K1-082 + K1-083: storing the derived email hash because it speeds up the index lookup. K1-082 adds the general "it depends" rule. K1-083 adds unique keys on email and hash. K2-003 is the recap at the architecture stage ("contrary to yesterday").
- K2-027 / K1-079 + K1-080: hash(email) in WHERE forces a full table scan. K1-080 adds "prevents index use". K1-079 is the student's answer the teacher praised. K2-027 is the Q&A repeat for a student who missed it.
- K2-029 / K1-103: the hash filter yields one user row, then the join to photos, then the is_active filter. K1-103 is a student's reasoning with "no explicit verdict". K2-029 is the teacher stating the same flow, so K2-029 settles K1-103 (endorsed). K2-030/K2-031 add the optimizer and predicate pushdown.
- K2-018 / K1-095 + K1-096: the user_id condition stops a wrong or foreign photo ID. K1-096 adds the attack scenario. K2-018 adds "no rows updated".
- K2-020 / K1-092 (partial): no active photo means a 404. K1-092: a crash between the two updates. K2-020: a wrong photo ID. Different causes, so cross-link rather than merge.
- K2-056 / K1-107 + K1-108 + K1-111: active_photo_id update and read. K1-107 writes `where user_id = ?`, K2-056 writes `where hash = ?`. Keep both forms. K1-111 adds "single query = its own transaction under auto commit".
- K2-060 + K2-061 / K1-095 + K1-096 (partial): ownership check. K1 puts it in the WHERE clause. K2 adds a get-then-update check before writing and the security-lapse framing.
- K2-042 + K2-043 / K1-053 + K1-046: PIL and ImageMagick. K1-053 says PIL "internally uses ImageMagick through a C++ binding". K2-042 says PIL "has two bindings: native Python and ImageMagick". Both are the teacher's words and not identical, so keep both nuances and route to the fact-checker. K2-043 adds "ImageMagick written in C++; every language has C++ bindings".
- K2-053 / K1-062 + K1-052 (partial): build local prototypes. K1-062: Gravatar in 3-4 hours, build many prototypes. K1-052: OG-image prototype in an hour. K2-053: two days, today's whole 9-10:30 sequence.
- K2-017 / K1-093 + K1-097 (partial): simple system, the details make it interesting. K2-017 lists the specific details (CDN, transactions, schema evolution, security/correctness).
- K2-110 / K1-084: "devil lies in the details". K1-084 is about query/columns. K2-110 is about requirements senior management missed. Cross-link.
- K2-063 + K2-068 / K1-004: senior engineers wear multiple hats; tagging comes after the break. K1-004 adds extensibility and cross-stream collaboration. K2-068 adds the named three hats (PM, architect, engineer).
- K2-035 / K1-116: agenda, on-demand image optimization not yet covered. K1-116 adds the time ("1 hour 10 minutes in"). K2-035 adds "active photo ID already covered".
- K2-036 + K2-040 / K1-003: on-demand image optimization is easy once the CDN is understood. K1-003 adds the "hardly a 10-minute" estimate. K2-036 adds "piece of cake".
- K2-009 / K1-044 + K1-047 (partial, cross-link only): the CDN-miss-to-origin pattern. K1 is about GitHub OG images generated on the fly. K2 is about Gravatar photos read from S3.
- K2-088 / K1-008 (cross-link only): celebrity-scale notifications. K1-008 is about a celebrity's post fanning out to followers. K2-088 is about a celebrity being tagged by many. Different directions, so do not merge.
- No duplicates with part 3. K3-091 (Gravatar hash excludes the user ID) is related to K2-028 but teaches a different point.

## Part 3 (02:02:56-02:55:36)

### Windows

"Covered" = part-3 items whose first audio range starts in the window. Every transcript sentence in each window was read and matched to an item; unmatched sentences were pure admin (student call-outs, "Hey man, which database", "folks who want to drop off", demo chatter while opening Instagram).

| Window | Covered | Missed | New items |
|---|---|---|---|
| 02:02:56-02:07:56 | 13 (K3-001..K3-013) | 0 | - |
| 02:07:56-02:12:56 | 7 (K3-014..K3-020) | 0 | - |
| 02:12:56-02:17:56 | 7 (K3-021..K3-027) | 0 | - |
| 02:17:56-02:22:56 | 7 (K3-028..K3-034) | 0 | - |
| 02:22:56-02:27:56 | 12 (K3-035..K3-046) | 0 | - |
| 02:27:56-02:32:56 | 12 (K3-047..K3-058) | 0 | - |
| 02:32:56-02:37:56 | 12 (K3-059..K3-070) | 0 | - |
| 02:37:56-02:42:56 | 9 (K3-071..K3-079) | 0 | - |
| 02:42:56-02:47:56 | 9 (K3-080..K3-088) | 0 | - |
| 02:47:56-02:52:56 | 8 (K3-089..K3-096) | 0 | - |
| 02:52:56-02:55:36 | 6 (K3-097..K3-102) | 1 | G-005 |

Windows 02:07:56-02:22:56 have only 7 items each, but they are slow student-teacher dialogue (Student 3 building the crude schema and query, Student 4 the hash-map/set proposal) with much back-and-forth and repetition; each was re-read sentence by sentence and every taught point (schema, user activity table, ORDER BY correction, row-per-message problem, count-unique query, timestamp index, composite index order, 10,000-entry worst case, count table, set length O(1)) has an item. The only miss is a small aside at the end: the teacher saying the EXPLAIN/staging practice is how he became good (G-005).

Verbatims: 102/102 found word for word (validator `part` PASS, 0 errors, 0 warnings).

### Distortions

- **K3-054**: says the if/else logic of where the user is "is implemented in the messaging layer". The teacher said front end. Transcript: "Depending on ifs and else's, where you are, what you are doing, you just implement those logics over here from the front end." Fix: "the if/else logic of where the user is and what they are doing is implemented there (the teacher said 'from the front end')"; add flag `check: "from the front end" - the event itself comes from the messaging service (K3-050/K3-052)`; set confidence medium.
- **K3-068**: invents a relation ("like Voldemort protects the Deathly Hallows"). The teacher only name-dropped both, through ASR-flagged words. Transcript: "It's like [?Voldemort | asr: \"world emote\"] and it's basically [?Deathly Hallows | asr: \"deathly halos\"]. Keep it protected no matter what. Keep it like well protected by all the magical charms". Fix: statement "Protect the database the Harry Potter way (the teacher invoked Voldemort and the Deathly Hallows): keep it protected no matter what, by all the magical charms."; confidence low (both proper nouns rest on flags).
- **K3-031**: wrong status and wrong actor. It says the teacher "clarified the count is a named key"; in fact the teacher asked and the student clarified, then the teacher only renamed the key. Transcript: "**Teacher:** Then is this even a hash table? **Student 4:** No, no, no, no. Count. It's the name of the, it's the name of the key." and "It's actually total, or rather [?newly unread | asr: \"duly and read\"] count." Fix: statement "...per user key, a hash map holding a count key; asked whether it was even a hash table, the student clarified that 'count' is the key's name, and the teacher renamed it newly unread count." Status `endorsed` (the rejection of the count comes in K3-032/K3-033, not here).
- **K3-087**: "while having three new senders" - the teacher said messages. Transcript: "You see two messages count of two, but in reality, you have three new messages." Fix: "at worst you see a count of two while in reality you have three new messages".
- **K3-088**: weakens the teacher's claim ("often does not matter"). Transcript: "but in real world, it really does not matter." Fix: "in the real world it really does not matter".
- **K3-096** (minor): drops the teacher's hedge about the series. Transcript: "I cannot claim that I will cover all of that, but it is definitely going to be a big value add". Fix: add to detail "He cannot claim the series covers everything, but says it is a big value add."
- **K3-077** (minor): drops "two of them will 100% blow your mind away"; the "granular details" is the reason, not the description. Transcript: "three interesting storage engines, two of them will 100% blow your mind away because we'll go into those granular details". Fix: "three storage engines, two of which will 'blow your mind' because the class goes into granular details".

### Duplicates (within part 3)

- K3-005 / K3-009 (detail) / K3-010 (detail): all say clicking the icon resets the count whether or not messages were read. The teacher did repeat it three times. K3-005 adds "acknowledging presence"; the details of K3-009/K3-010 add nothing new. Keep K3-005; drop the repeats from the details.
- K3-043 / K3-056: any key-value store with a set as the value. K3-043 adds Redis as an oversimplified choice and "don't check-and-set yourself"; K3-056 adds "partitionable by default (all of them are)". Merge into K3-043, keep K3-056's partitionable clause.
- K3-054 / K3-092: "on message unsent" is an umbrella event. K3-054 adds the if/else placement and board name ON_MSG_UNSENT; K3-092 adds "could not deliver in real time" and Student 5's mistaken assumption (only when inactive). Merge, keep both nuances.
- K3-051 / K3-093: the definition of unsent (other tab vs offline) varies. K3-051 adds the teacher's simplification (offline only here) and "it comes from the messaging service"; K3-093 adds "that is a product call" and "must update the count in real time". Partial overlap; cross-link.
- K3-060 / K3-067: database is the most brittle component. K3-060 is the first statement ("check for unnecessary operations"); K3-067 adds the pattern (minimise no-state-change ops) and "no matter which cloud provider". Partial; keep both, cross-linked (already depends_on).
- K3-067 / K3-069: the pattern restated at 02:39:36 (K3-069's second range). K3-069 adds the remedy (auxiliary database, "service stays up"). Partial; keep both.
- K3-063 / K3-065 / K3-072: n-1 repeated writes change nothing. K3-063 the state view (1 vs 10,000 from B), K3-065 the waste (network I/O + DB handling), K3-072 the fix (aux takes the n-1). Partial; keep, cross-linked.
- K3-075 / K3-086 / K3-087: inconsistency acceptable because not financial. K3-075 adds "end of product if the system is down"; K3-086 adds "distributed transactions not worth it"; K3-087 adds "high throughput" and the human-behaviour argument. K3-075/K3-086 near-duplicate; merge into K3-086 keeping K3-075's "system down = end of product".
- K3-074 / K3-084: clear deletes from both Redis instances. K3-084 adds "entry recreated on the next message". Merge into K3-074, keep K3-084's recreation clause.
- K3-079 / K3-080: threshold optimisation. K3-079 is the student's version (show "100+", stop writing); K3-080 the teacher's refinement (once set length > 100 don't write even a first entry for a new sender). Keep both (proposal + refinement).
- K3-044 + K3-045 / K3-057: read path restated in the architecture summary. K3-057 adds the write path and board layout. Partial; keep.
- K3-024 / K3-027 / K3-030: cost of iterating all of a user's messages. K3-024 adds page-load frequency and millions of users; K3-027 the 10,000-index-entries worst case after index tuning; K3-030 the "100% correct but inefficient" framing. Partial; keep.

### Duplicates across parts (involving part 3)

- K1-005 / K3-008: the unread indicator is used to introduce a high-level pattern. K1-005 adds "many companies use it in production to prevent major outages" and "surprisingly complex"; K3-008 is the restatement at the start of the design. Merge into K1-005 (or cross-link).
- K2-063 / K3-001: agenda says the unread indicator comes after photo tagging; K3-001 is the actual start of the design and lists the platforms. Partial; cross-link, don't merge.
- K1-058 / K3-091: Gravatar hash is MD5 of the email and a function of it. K1-058 adds "constant URL because the same input gives the same hash"; K3-091 adds why no user ID is injected (universal function; third parties like Facebook can render from the email alone). Partial; cross-link.

