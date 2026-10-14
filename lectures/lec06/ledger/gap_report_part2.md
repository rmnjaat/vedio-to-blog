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
| 01:27:29-01:32:29 | 11 (K2-049..K2-059) | 1 | G2-001 |
| 01:32:29-01:37:29 | 5 (K2-060..K2-064) | 0 | - (break starts 01:35:57) |
| 01:37:29-01:42:29 | 7 (K2-065..K2-071) | 0 | - (break until 01:40:40) |
| 01:42:29-01:47:29 | 6 (K2-072..K2-077) | 0 | - |
| 01:47:29-01:52:29 | 13 (K2-078..K2-090) | 0 | - |
| 01:52:29-01:57:29 | 10 (K2-091..K2-100) | 0 | - |
| 01:57:29-02:02:29 | 12 (K2-101..K2-112) | 0 | - |
| 02:02:29-02:02:56 | 0 (covered by K2-111, K2-112, ranges 02:02:03-02:02:56) | 0 | - |

The low counts are not under-coverage. 01:32:29-01:42:29 is mostly the break plus its announcement. 01:42:29-01:47:29 is slow student back-and-forth on "who can tag", with one teaching point per turn. Part 2 is dense and faithful, and only one small aside was missed:

- **G2-001** (01:28:00): "And here I'm assuming CDN does not give you this feature. So if you are building your own CDN, this is exactly how you do it." The assumption appears in K2-037's detail, but no item has the claim that this origin-side transformation is how a CDN provider would build the feature itself.

Checked and judged covered (not gaps): "This is how you can efficiently serve photos at scale" (K2-017). The agenda at 01:14:03 is pure logistics, and K2-035 covers the same agenda. "Correct. Synchronous." (K2-034 detail). "No, but someone else can tag you or not" (K2-074 detail). "5 versus 10,000" (K2-078 detail). "Club them" (K2-087). The feed showing such posts to few users (K2-102). "you can extend it in many ways" (K2-101). "think on those granular details" (K2-061, plus K1-097 in part 1).

Verbatims: 112/112 found word for word (validator `part`: PASS, 0 errors, 0 warnings). The G2-001 verbatim was also found (validator `gaps`: PASS).

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
