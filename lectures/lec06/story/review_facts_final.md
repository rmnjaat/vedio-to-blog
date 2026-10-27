# Lecture 8 (lec06): final fact re-check (check 4b)

Scope: the page as it stands after Revision 2 (`site/src/content/lectures/lec06.mdx`, `lec06/{s0-header,c1…c8}.mdx`) and the text of the figures it imports. Every item in `review_facts.md` (F-01 to F-15) is re-checked against the current text. The fresh pass covers the text changed in Revision 2 (`NOTES.md`, "Revision 2"), especially:
- the rebuilt chapter 5;
- §3.4 and §3.5;
- §8.2 to §8.4;
- §8.6, checked against `site/src/content/lectures/lec07/` on disk.

Sources: `ledger/ledger.jsonl`, `factcheck/final.jsonl`, `transcript/transcript.md` (02:36–02:41), MySQL 8.4 manual (locks set by statements, error 1093 rule), redis.io (`HSETNX`, `HEXPIRE`), and the pages of lec05, lec07, lec08 and lec09 on disk. No page file was edited.

## Summary

- **Old items:** 14 Fixed, 1 Partly fixed (F-05).
- **New items:** 6, all low. None is high or medium.

| New | Type | Severity |
|---|---|---|
| N-01 | Error (example that doesn't trigger the bug) | low |
| N-02 | Error (SQL comment wrong for MySQL's default) | low |
| N-03 | Internal contradiction (figure vs text) | low |
| N-04 | Distortion (overstates, against fact-check L-0291) | low |
| N-05 | Clarity of a fact argument (question left unanswered) | low |
| N-06 | Distortion (fact stated, then hedged) | low |

F-05 still needs one clause (see below).

---

## Status of review_facts.md items

| Id | Status | Current text (quoted) |
|---|---|---|
| F-01 | **Fixed** | §3.4: "Atomic doesn’t mean isolated, and what happens next depends on the engine. Under PostgreSQL’s default isolation, … The second request’s clearing update waits for the first, finds the old photo already cleared, and never sees the photo the first one just activated. … MySQL’s InnoDB happens to be safer here: an `UPDATE` locks the rows it scans and reads their latest committed versions … Don’t lean on that difference. Say what you need." Recall 2 now says "on some engines (PostgreSQL’s default isolation)". Both engine accounts are correct. The trigger example in the first sentence is new and wrong; see N-01. |
| F-02 | **Fixed** | §4.4: "One consequence for 4.3: a purge now has to clear every width, not just the bare URL … invalidating `/h1*` clears every query-string version …; with a CDN that purges by exact URL, purge each width you serve, or by prefix or tag." Recall 3: "the path and all its widths". |
| F-03 | **Fixed** | §1.2: "`@app.route('/raw/<path:key>')     # path: lets the key contain slashes`", "`raw_b = S3.read(key, BUCKET)   # sketch: …`". Fig 1·b code lines and desc ("/raw/<path:key> route") match. |
| F-04 | **Fixed** | Hook: "hides four bugs, two of which can show a broken image on every site at once". Build 1: "a one-line update with four bugs". Ch3 intro: "and three more behind it". |
| F-05 | **Partly fixed** | §8.4: "The catch: knowing the size is itself a question for the main store, the read you just ruled out, so this pays off only for recipients whose sets are already huge." The contradiction is now named. But the conclusion is still not right. Even when B's set is huge, each new sender costs a main-store read (`SCARD`) in place of the write (`SADD`). That is the same kind of one-command work, on the same store. So having a huge set saves nothing by itself. The saving exists only if the size is known *without* asking the main store each time. The writer dropped that clause from the proposed replacement. **Replacement (last sentence):** "The catch: knowing the size is itself a question for the main store, the read you just ruled out, so the skip saves something only if the size is known without asking the main store each time." (This names no mechanism, so it does not reintroduce the aux-store counter that NOTES rejected as not in the lecture.) |
| F-06 | **Fixed** | §8.3: "With one key per pair, the API has to know which keys are B’s. It can read them off B’s set just before deleting it. Or keep B’s pairs as fields of one hash …: `HSETNX B C 1` is the same set-if-absent check, and the clear is one `DEL B` … Since Redis 7.4, `HEXPIRE` can give each field its own TTL." Checked on redis.io; see "Fresh pass" below. |
| F-07 | **Fixed** | Crude figure: `select count(distinct sender_id)` / `from messages` / `where recipient_id = ?`; table `messages (msg, sender_id, recipient_id, ts)`; desc likewise. IndexOrder labels: `(recipient_id, sender_id, ts)` and `(recipient_id, ts, sender_id)`. Ch6 prose: "`from` and `to` are reserved words in SQL, so call them `sender_id` and `recipient_id`". Both words are reserved in MySQL. |
| F-08 | **Fixed** | RepoCard label "TTL, say 1 day"; desc "(say a day; GitHub doesn’t publish it)". |
| F-09 | **Fixed** | Overview: "a CDN on its own hostname, `instacdn.net`, serves the photos". §4.2: "In Lecture 7 the CDN had a hostname of its own, `instacdn.net`; here the root domain itself, `gravatar.com`, the name every embed uses, is the CDN." Lecture 7 on disk (`lec09/c1-who-sends-the-bytes.mdx:65`) uses `instacdn.net`. The overview's "It ended on a question: when the CDN resized a photo, who wrote that code?" matches lec09 §9.5's title. |
| F-10 | **Fixed** | §5.5: "a daily one can get an app uninstalled". |
| F-11 | **Fixed** | §5.2: "only the owner adds tags to their own photo, so concurrency isn’t the hard part; the other writers, someone removing their own tag or the owner on a second device, each change one tag at a time." |
| F-12 | **Fixed** | §7.2: "the stored hash in chapter 2 is an answer kept ready because a frequent read needed it, and `active_photo_id` in chapter 3 moved the truth onto the row that read already fetches." The map row agrees (truth `users.active_photo_id`, ready "on the row the read hits"). |
| F-13 | **Fixed** | Overview: "the card in about an hour, Gravatar in an afternoon, the whole avatar service with its CDN and resizing in a couple of days." |
| F-14 | **Fixed** | §2.1: "In the version you build here, the URL is `gravatar.com/` followed by a hash of your email…". The real-Gravatar paragraph is unchanged. |
| F-15 | **Fixed** | §4.3: "Gravatar can’t rename its one URL, so it uses chapter 1’s header instead: a long `s-maxage` for the CDN, which a purge can clear, and a short `max-age` for browsers, which nobody can." |

---

## Fresh pass on Revision 2 text

### Chapter 5, the rebuilt schema story: correct
The chain runs: no schema yet (5.1) → an array of 5 (5.2) → the reverse question breaks the array, so rows (5.3) → the rows need a location; pixels break and fractions plus a box complete the row (5.4) → everyone else hears through one event (5.5). This order is the lecture's own:
- L-0189 and L-0190: the limit picks array vs entries.
- L-0208 and L-0209 (01:56–01:57): the activity page means you "cannot just have things stored in an array"; "you cannot pick any random database here".
- L-0212 to L-0216: fractions, the box, and `posts_tags(post_id, user_id, location)` from the board.

Fact-check L-0209 (medium) is applied: arrays are indexable (MongoDB multikey, PostgreSQL GIN), and row-per-tag is easier and scales better (PostgreSQL arrays doc). The crop caveat ("a crop would need the tag recomputed") is correct. The Graph API sentence is unchanged and still correct.

The celebrity example is now "tagged by many people in their photos", and Fig 5·e's caption matches. The map row "a tag: posts_tags, box as fractions / one event for every team" matches the chapter. One ordering issue in 5.3 is listed as N-06.

### §3.4, the two-engine paragraph: correct, except the example that opens it
- **PostgreSQL READ COMMITTED.** The `UPDATE` uses the statement snapshot. It blocks on 7abe, re-evaluates `is_active` on the new row version, and skips the row. The row the first request activated was not active in its snapshot. Result: two active photos. Correct.
- **InnoDB.** An `UPDATE` is a locking read. It takes next-key locks on the `user_id` index records it scans and evaluates the latest committed versions. So the second clear waits and then clears the first request's photo. Correct.
- **The fix.** Lock the user's row first, then do a locking ownership check. This is right on both engines.
- **Callbacks.** "the same `FOR UPDATE` that kept two passengers off one seat in Lecture 3" matches lec05 c2/c4.
- **The code block.** Unchanged and valid MySQL 8.

The opening example is the problem: "A user double-clicks" doesn't produce the race. See N-01.

### §3.5, the single-statement mark-active update: valid MySQL 8
```sql
UPDATE users SET active_photo_id = ?
WHERE id = ?
  AND EXISTS (SELECT 1 FROM photos WHERE id = ? AND user_id = ?);
```
- **Syntax.** This is valid. MySQL's restriction on subqueries in `UPDATE` (error 1093) applies only when the subquery reads the table being updated, and here it reads `photos` while updating `users`.
- **Name resolution.** Inside the subquery, the unqualified `id` and `user_id` resolve to `photos` columns first, so the check means what it says.
- **Parameters.** There are four placeholders: photo id, user id, photo id, user id. Writing `user_id = users.id` would drop one of them. That is optional and not an issue.
- **"There is no gap between check and write."** This holds on InnoDB. For `UPDATE t … WHERE … (SELECT … FROM s …)`, InnoDB sets shared next-key locks on the rows it reads from `s` (MySQL 8.4, "Locks Set by Different SQL Statements"). So the photo row can't be deleted or reassigned between the check and the write.
- **"A single statement under autocommit is a transaction on its own."** Correct (fact-check L-0111, A-GD-20).
- **"two requests at once now just leave whichever choice came last."** Correct, because both update the same `users` row.
- **The ownership check** is taught as get-then-update (L-0171). The page keeps that option and adds the folded form. Not a distortion.

The trailing comment is wrong for MySQL's default affected-rows count; see N-02. Fig 3·d drops the ownership check; see N-03.

### §8.2, the blast-radius argument: the lecture's own
The argument is made of these pieces:
- "every badge read … goes to the main store: if it is down, the badge is down everywhere";
- "Nothing reads the auxiliary store; if it is down, the workers fall back to the load main carried before";
- "not the total number of operations … what changes is *where* they land".

Each piece is sourced:
- L-0294 (02:39:07–02:39:36): "If this goes down, then everything is done in any case … if this [aux] goes down … it would have to handle all n-1 writes that anyway it was anyway doing … you are just trying to shed the load".
- L-0288 (02:36:33): "if a database is done, everything is done".
- Fact-check L-0291: total operations do not fall, the repeats move off the cluster that serves reads, and "that isolation is the real gain".

No rates or new mechanisms were added. "Load you can afford to lose belongs on a store you can afford to lose" is the page's own summary of L-0294. It isn't presented as a quote, which is fine.

Two problems remain in the same lines:
- "why not just give the main cluster more shards?" is asked but never answered in so many words (N-05). The lecture never raises sharding; the answer follows from L-0294 and needs one sentence.
- The paragraph after it keeps the "every time" that fact-check L-0291 flagged as an overstatement (N-04).

### §8.3, the `HSETNX`/`DEL` per-recipient hash: correct
- `HSETNX key field value` sets the field only if it is absent and returns 1 if it set it, 0 if not. That is the same check-and-set as `SET … NX`.
- One hash per recipient is one key, so it sits in one cluster slot. The clear is a single-key `DEL B`, with no CROSSSLOT problem. Like the set's `DEL`, it is O(fields).
- `HEXPIRE` exists since Redis 7.4.0 (redis.io).
- This is fact-check addition A-PTU-15, verifier-confirmed.

Two details are not issues:
- Unlike `SET … NX EX`, the field TTL takes a second command after `HSETNX`. That is harmless here: a field that never gets a TTL waits for the next clear.
- The "read them off B's set" option can miss a sender added between the read and the delete. That is the same kind of drift §8.3 already accepts, and the TTL heals it.

Recall 4 and the §8.2 code still use `SET B_C 1 NX` as the main design, which is consistent: the hash is offered as the alternative.

### §8.6, the hand-off: matches lec07 on disk
Checked against `lec07/s0-header.mdx`, `c1`, `c2` and `c3`:

| §8.6 says | lec07 on disk |
|---|---|
| "goes back to the blog's data" | The overview and ch1 open on the blog; Lecture 2's Kafka pipeline is "still running". |
| "First a copy for the analysts, which may run behind but must never miss a change" | Part 1 (ch1–2): "It need not be real time, but it must be complete"; "One must be complete and may run a little behind". |
| "Then the cache in front of the database, built from the inside, from one hash table on one machine to many nodes" | Part 2 (ch3–9): "built from a hash table up"; ch3 is a hash table; ch3–6 on one node; ch7–9 "one node is not enough". |
| §8.6 title "You leaned on Redis all lecture. What is inside it?" | lec07's "Where you are": "Lecture 8 leaned on Redis for a whole build, a set per user, keys that expire, a cluster spread over machines, and ended by asking what is inside it." |

The §8.6 list of Redis's jobs (set with O(1) size, set-if-absent with TTL, a cluster, a store in front of it) agrees with lec07's recap. No issue.

### Other callbacks re-checked
- Lecture 5 `SET … NX` (lec08 c7 uses `SET … NX EX 300`) matches.
- Lecture 2 "Kafka between a write and everything that reacts to it" and the brittle database match.
- Lecture 7's pre-signed upload, CDN width parameter and "store only what can't be derived" match lec09 on disk.

---

## New issues

### N-01 · ERROR · low · §3.4: a double-click doesn't cause the race
- **Where:** c3 §3.4, first sentence: "A user double-clicks, or has the settings page open on two devices, and two mark-active transactions start together."
- **Problem:** a double-click sends the same photo id twice. On PostgreSQL the second transaction then activates the photo the first already activated, which leaves one active photo. On InnoDB it is one active photo anyway. The race in the next sentences needs two *different* photos. (This sentence came from F-01's proposed replacement. The error is the reviewer's, now corrected.)
- **Replacement:** "A user picks one photo on their phone and another on their laptop at the same moment, and two mark-active transactions start together."

### N-02 · ERROR · low · §3.5: "0 rows changed: not your photo"
- **Where:** c3 §3.5 code block, comment `-- 0 rows changed: not your photo`.
- **Problem:** by default, MySQL reports the number of rows *changed*, not rows matched, unless the client asks for found rows. A user who re-chooses the photo that is already active matches the row but changes nothing, so the update also reports 0. An app that follows the comment tells that user "not your photo". NOTES cut ROW_COUNT semantics as engine detail, so fix the comment rather than explain it.
- **Replacement:** `-- 0 rows: not your photo (or it was already the active one)`

### N-03 · INTERNAL CONTRADICTION (figure vs text) · low · Fig 3·d drops the ownership check
- **Where:** Fig 3·d (`site/src/figures/lec06/s2b-gravatar-fig2e.tsx`, `MARK_NEW = ['update users', '  set active_photo_id = ?', '  where id = ?']`), and the desc "replaced by one update on users, setting active_photo_id for the user’s id".
- **Problem:** in the figure, the old update keeps `where id = ? and user_id = ?`, but the new one has no ownership check at all. The text right above says "The ownership check doesn’t [go away]: without it anyone can point their face at someone else’s photo", and recall 2 says "still with the ownership check". A reader comparing old and new sees the check disappear.
- **Replacement (lines):** `['update users', '  set active_photo_id = ?', '  where id = ?', '    and exists (select 1 from photos', '      where id = ? and user_id = ?)']`. If the figure can't take two more lines, use one: `'    -- + ownership check'`.
- **Replacement (desc):** "…replaced by one update on users, setting active_photo_id for the user’s id only if the photo belongs to that user."

### N-04 · DISTORTION · low · §8.2 "a cheap price for that, every time"
- **Where:** c8 §8.2, the paragraph after the blast-radius paragraph: "One extra network hop per write is a cheap price for that, every time."
- **Problem:** fact-check L-0291 (simplified/low, inline) says that "worth it every single time" overstates. The price is also a second cluster and a consistency gap (L-0305), and §8.3 spends three paragraphs on that gap. The page keeps the overstatement and prices only the hop.
- **Replacement:** "One extra network hop per write, plus a small second cluster and a little drift (8.3), is a cheap price for that."

### N-05 · CLARITY OF A FACT ARGUMENT · low · §8.2 asks "why not more shards?" and answers something else
- **Where:** c8 §8.2: "You might ask: `SET … NX` on one Redis costs about what `SADD` costs on another, so what was saved? And why not just give the main cluster more shards? Not the total number of operations; …"
- **Problem:** "Not the total number of operations" answers the first question. The shards question is left for the reader to infer from the blast-radius sentences. The lecture never raised sharding; the answer follows directly from L-0294 and L-0288 and needs one sentence, with no new claim.
- **Replacement (first three sentences):** "You might ask: `SET … NX` on one Redis costs about what `SADD` costs on another, so what was saved? Not the total number of operations; the repeats still happen, one network hop further along. And more shards on the main cluster would only add room for the same wasted work on the store every read depends on. What changes is *where* the repeats land, and what breaks if that store falls over." The rest of the paragraph stays.

### N-06 · DISTORTION · low · §5.3 states "look inside every photo", then hedges it
- **Where:** c5 §5.3: "With the names inside each photo’s array, that question has to look inside every photo. Arrays can be indexed in some databases (MongoDB’s multikey indexes, PostgreSQL’s GIN), but…"
- **Problem:** the first sentence states as fact what fact-check L-0209 (imprecise/medium) corrected, and the next sentence takes it back. A reader meets the wrong claim first. This is the same pattern F-14 fixed in §2.1.
- **Replacement (first sentence):** "With the names inside each photo’s array, that question has to look inside every photo, unless the database can index the array." The next sentence stays as it is.

---

## Checked and found correct (Revision 2 text not covered above)
- Overview: "four bugs, two of which can show a broken image" (crash and foreign id → 404, L-0093/L-0134).
- Overview: the per-build one-liners, and "strings and sets" in Before you start.
- Ch3: stepper step 5 and Fig 3·c no longer say "locking" before 3.4. The step-4 trap paragraph ("An `UPDATE` that matches no rows is not an error, so nothing rolls back by itself") is fact-check L-0137.
- Ch4: Kafka given its reason by callback to Lecture 2 (side work off the request). No new claim.
- Ch6/7: the badge definition, stated before the pause.
- Ch6/7: "the set is now its own truth for the badge"; the map row "badge, v2: the undelivered-message events".
- Ch8 §8.1: replicas, "if reads ever outgrow it" (fact-check L-0282).
- Ch8 §8.3: TTL heals drift (fact-check L-0305); no distributed transaction, pick your battles (L-0296/L-0297, transcript 02:40:07).
- Ch8 recall 1 (tags) matches the rebuilt §5.2 to §5.4.
