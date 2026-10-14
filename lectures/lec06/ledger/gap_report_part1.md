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
| 00:35-00:40 | 9 | 2 | G1-001, G1-002 |
| 00:40-00:45 | 6 | 0 | - |
| 00:45-00:50 | 5 | 0 | - |
| 00:50-00:55 | 7 | 1 | G1-003 |
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
