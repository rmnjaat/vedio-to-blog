# Lecture 8 (lec06) story rewrite: notes

Follows `lectures/STORY_BRIEF.md` and `lectures/STORY_WRITER.md`, with lec03 (Lecture 6) and lec08 (Lecture 5) as models and the site review (`scratchpad/review/04-lec7-lec8.md`, Lecture 8 part) as the brief for what to fix. Source: `site/src/content/lectures/lec06.mdx` + `lec06/{s0-header,c1…c8}.mdx`.

## Chapters (words per built page: captions, code, hidden pause and recall answers and page chrome included; SVG desc/labels, Go deeper boxes and collapsed clip-as-text excluded)

| # | Title | Words | Meta |
|---|---|---|---|
| – | Overview: hook (a face, a tag, a red 3), the promise (a pattern that keeps databases up), the empty map (Fig 0·a), where you are (Lectures 7, 2, 4, 5), three builds, what you'll be able to do, before you start | 1,060 (incl. chapter list) | – |
| 1 | A card nobody uploaded. Where did it come from? | 1,372 | About 6 min |
| 2 | One URL for your face. Which user is it? | 1,234 | About 6 min |
| 3 | One line changes your photo. What could go wrong? | 1,688 | About 9 min |
| 4 | Facebook adopts Gravatar. Who serves a million faces? | 1,342 | About 7 min |
| 5 | “Let people tag people.” What do you ask first? | 1,672 | About 8 min |
| 6 | The messages icon says 3. Three what? | 947 | About 6 min |
| 7 | Do you need the messages at all? | 1,162 | About 7 min |
| 8 | Thirty messages from one friend. How many writes change anything? (incl. finished map, What you can now do, 4 recall questions, hand-off to Lecture 9) | 1,875 | About 9 min |

Total ≈ 12.35k counted this way (≈ 11.3k without the overview's chapter list and page chrome). The old page had ≈ 20.5k. Script: scratchpad `wc2.py` over `site.sh text` output.

**Three builds, one question.** The overview says up front there are three builds (Gravatar, tags, badge), each with its own driving problem, and one question under all three: where does the truth live, and what do you keep ready next to it? The map (`SoFarTruth`) is that question as a table that fills one row per decision.

**Spine.** A repository card nobody uploaded → the browser only sends a GET and reads the first bytes → a static folder is a few lines of code → your own `/raw` handler reading S3 → a URL can return an image nobody stored (pause: does GitHub pre-render every card?) → the card is drawn on a CDN miss and cached for a TTL (GitHub's own numbers) → *hand-off:* one URL can return your face anywhere → Gravatar's promise, why a hash (and its limits), three requirements → two tables, every column questioned, hash and path crossed off as derivable (Lecture 7's rule) → the URL gives a hash: `SHA2(...)` in WHERE (pause: 10,000 rows) → clip → expression index or stored column; Gravatar stores the hash, Lecture 7's rule bends → the one-line mark-active (pause: both active) → two updates → crash halfway (stepper) → transaction → someone else's photo id (pause + stepper) → a wrong id still leaves none active: check first → two requests at once (PostgreSQL snapshot; lock the user's row, locking read) → where should "active" live? (pause) → `active_photo_id`, one statement, ownership check stays → *hand-off:* millions of pages → upload reused from Lecture 7 → CDN in front, origin is the API (pause: why not S3?) → purge on change under a long TTL (clip), purge clears edges only → resize on a miss = chapter 1's trick → CPU-heavy and synchronous, big machines → *Build 1 → Build 2 hand-off:* one team built one thing; the next feature is one sentence that lands on other teams, on these same resized photos → the CXO's brief, three hats → who can tag me (authorization, self-removal, ACL not roles) → 5 or 10,000 (pause) → notify, the notification team's spike, product-level throttling, clubbing (Go deeper: fan-out to millions, stream + queue) → suggestions (sync dependency, SLA, fallback; Facebook's 2021 shutdown), activity page (the reverse query decides storage), feed → one `PHOTO_TAG` event on Kafka → where on a resized photo (pause: pixels vs fractions), bounding box, `posts_tags` → *Build 2 → Build 3 hand-off:* the smallest signal on a screen → what the 3 counts (pause: unique senders since the last tap) → requirements → messages + `user_activity` + `COUNT(DISTINCT)` → index order `(to, ts, from)` → still 10,000 entries for one sender → crude, not incorrect → keep only who wrote: count, then set, count struck → clip → ask the truth or keep it ready, and who keeps it current (the stored hash and `active_photo_id` were the same trade) → Redis: `SCARD`/`DEL`, get and clear → who knows B didn't get the message? (pause: the messaging service; Lecture 4's edge servers, Lecture 1's online/offline) → `ON_MSG_UNSENT` → Kafka → workers `SADD` (Go deeper: batching by recipient key, pipelining) → the design looks converged → audit every path (Lecture 2's brittle database) → 29 of 30 writes change nothing (pause) → auxiliary store, `SET … NX` (Lecture 5's lock command) (clip) → why not just send repeats to main: the work moves to a store you can lose → aux down = old load; clear both; drift, accept it, TTL heals → why not read first (the rose), threshold "100+" → finished map, what you can now do, recall → Lecture 9 opens the Redis box.

## Figures

- **Added** `site/src/figures/lec06/so-far.tsx`: `SoFarTruth` (stages 0–8), the "where the truth lives, and what you keep ready" table, one row per decision (card, user by hash, active photo, photo bytes, each size, a tag, badge v1, badge v2, repeat senders). Overview shows it empty (Fig 0·a); chapters 2–8 open with the previous chapter's state, new rows on a blue wash; Fig 8·e is the finished map. Desk 680; phone 330, where older rows fold to one line (what: kept ready) and new rows show the truth line too, so the map stays short at the top of each chapter (the finished map shows every row in full). Only kit parts. No row appears before its chapter's reveal.
- **Kept**: ImgToPixels, TwoHandlers, RepoCard (ch1); TwoTables (ch2); CrashBetweenUpdates, ForeignPhotoId (steppers), BoardQueries (ch3); GravatarEndToEnd (serving panel only), OneOriginalAnyWidth (ch4); WhoCanTagMe, FiveOrTenThousand, OnePerTagOrClubbed, PhotoTagEvent, PixelsVsFractions (ch5); ThreePeople, Crude, IndexOrder (ch6); GetClear, WhoKnows, Paths (ch7); LoadAudit, Paths aux, WhichFailure (ch8). All four clips, renumbered: l06-hash-scan (Clip 2·1), l06-invalidate (4·1), l06-badge (moved to ch7 as Clip 7·1, after the set is introduced, because its captions show the set), l06-aux-redis (8·1). Clip files untouched, so no poster regeneration.
- **Fixed figure text**:
  - BoardQueries (`s2b-gravatar-fig2e.tsx`): dropped the dashed "said in class, not written" marker; the old read is struck through like the old write; desc rewritten.
  - GravatarEndToEnd (`s3-serving.tsx`): new `servingOnly` prop (serving panel alone, untitled, 340 wide) so the invalidation panel doesn't answer §4.3 before its clip.
  - OnePerTagOrClubbed: "instructor’s rule of thumb" → "rule of thumb" (labels + desc).
  - PhotoTagEvent: "(RBAC on the board)" out of the desc; "(RBAC)" label and a duplicate "RBAC" label removed (fact-check L-0218: a per-user rule, closer to an ACL).
  - PixelsVsFractions desc: "The board’s table" → "The table".
  - Paths desc: the "hard-to-read board note" sentence → "A note by the workers: they can batch writes if the stream is partitioned by recipient."
- **Dropped from the page**: NewGlyphs (notation key), BytesAreAllThatMatter, HashBackSketch, SourceOfTruthOrigin, RoseUnderGlass, SourceOrSet (rule sketches); TwoWhereClauses (the clip is the one representation); UploadSigned (one sentence does it); PredicatePushdown; ThreeHats, OneLineManyTeams, SyncSuggestions; OneSet (the clip shows it); FirstVsRepeats stepper (the aux clip is the one representation); FourSystems; all TradeoffTables, RuleBoxes, SourceNotes, ForwardChips, SectionEnds and per-chapter Check-yourself blocks.
- **Files deleted** (nothing imports them; `content/samples` checked): `s2a-gravatar-fig2b.tsx`, `s2a-gravatar-rule.tsx`, `s2b-gravatar-fig2f.tsx`, `s4-tagging-hats.tsx`, `s4-tagging-rule.tsx`, `s7-keep-four.tsx`. Unused exports left in surviving files: NewGlyphs, BytesAreAllThatMatter, UploadSigned, SourceOfTruthOrigin, SyncSuggestions, OneSet, SourceOrSet, RoseUnderGlass, FirstVsRepeats.
- Old `s1-images … s7-keep.mdx` deleted; `s0-header.mdx` rewritten; new `c1-nobody-uploaded … c8-thirty-messages`.

## Fact-check corrections, each stated once in the main text

- Browser image detection (L-0021/L-0022): signatures, decoders for PNG/JPEG/GIF/WebP/AVIF, SVG by Content-Type (§1.1).
- Content-Type and path traversal (L-0025/L-0029): ch1 Go deeper.
- Card refresh interval unverifiable (L-0039): "GitHub doesn't publish how soon a card catches up" (§1.3). Origin is a GitHub image service (L-0044); GitHub's 280 ms / 2M a day / 40% cached, Node app + headless browser (L-0040/L-0051) (§1.4). Pillow named as a library, not as ImageMagick-based (L-0047).
- Gravatar SHA-256 now, MD5 originally, trimmed + lower-cased, `/avatar/<hash>`, default image (L-0057/L-0058) (§2.1).
- Unsalted hash only keeps the email out of plain sight (L-0054, medium) (§2.1).
- Expression indexes (L-0081, medium): stated as the second way out, framed so the reversal stands: "Both ways, the derived value ends up stored" (§2.3).
- Atomic ≠ isolated (L-0095, medium): promoted into the story as §3.4 "And two requests at once?", with the lock-the-user's-row fix.
- Locking read for the check (L-0135); UPDATE matching no rows is not an error, nothing rolls back by itself (L-0137) (§3.3–3.4).
- `where hash = ?` for the read after denormalizing (L-0109) (§3.5); index on photos.user_id (L-0105) (§3.5).
- CDN origin: the private-bucket reason is wrong on its own (L-0139, medium); stated inside the pause answer (§4.2).
- Purge clears CDN edges only; versioned names (L-0128 addition) (§4.3).
- ImageMagick written in C with C/C++ APIs; Pillow has its own resize (L-0153/L-0154/L-0155) (§4.4).
- Tag suggestions: Facebook shut face recognition down in November 2021 (L-0203) (§5.5).
- Arrays can be indexed; row-per-tag is easier and scales better (L-0209, medium) (§5.5).
- Authorization is a per-user rule, closer to an ACL than roles (L-0218) (§5.2, Fig 5·e).
- Classic consumer groups capped by partitions (L-0007/L-0009); SNS→SQS (L-0010): ch5 Go deeper.
- Badge definition is this design's, not documented Instagram behaviour (L-0226/L-0228) (§6.1).
- `COUNT(DISTINCT)`, reserved FROM/TO renamed (L-0243); index order rule (L-0246/L-0247) (§6.2–6.3).
- `SADD` returns 0 for a repeat, `SCARD` 0 for a missing key, DEL O(members)/UNLINK (L-0255/L-0256/L-0257) (§7.3, §8.1).
- Replicas can serve badge reads if load grows (L-0282) (§8.1).
- `SET … NX` atomic check-and-set, `EX` TTL (L-0292) (§8.2).
- The aux store doesn't reduce total operations; it moves the repeats off the cluster that serves reads (L-0291) — used to answer the review's "why is SET NX cheaper than SADD?" question (§8.2).
- Drift undercounts until the next clear; a TTL on aux keys limits it (L-0305) (§8.3).

## Cut, and why

- **Admin and course plumbing**: week/day, 50% done, agenda, break, YouTube/members-only videos, "build it in N hours/days" boxes (one sentence each kept in ch1 and the overview), "next week storage engines" beyond the hand-off, the query-optimization origin story (kept as a ch3 Go deeper on EXPLAIN practice).
- **Open thread "a purely private image platform"** (L-0002): never designed in the lecture; dropped rather than opening the page on a letdown.
- **Engine and vendor detail**: MIME table beyond two signatures, Django static serving, apex CNAME, TINYINT/BOOL sizes, Slack's membership table, LEFT→INNER rewrite, predicate pushdown, ROW_COUNT semantics, Android notification grouping, Amazon fallback essay, MongoDB 16 MiB, Kafka 4.2 share groups, Graph API beyond one sentence, YOLO boxes, RFC 6455 ping/pong, Redis hash tags / HSETNX / HEXPIRE, `$addToSet` atomicity beyond one mention.
- **Stories trimmed**: Bannerbear kept in one clause; the Twitter tweet-card hypothetical and poet.so cut; "shortest blog post" (half-remembered, company unknown, contradicted for Cloudflare) cut; 50–60k notifications in 5 s kept as one engineer's experience in the ch5 Go deeper; "fifteen cohorts" told as one engineer's experience; Harry Potter metaphor cut, the rose kept once.
- **Furniture**: notation key, rule boxes, TradeoffTables, SourceNotes, ForwardChips, SectionEnds, per-chapter check-yourself blocks, the eleven-line "What to keep", class timestamps.

## Incoming links (other lectures into lec06), for the coordinator

None use `sec=`. Links found, all to the lecture as a whole, no change needed:
- `site/src/content/lectures/lec09/s11-keep.mdx:51,52,60` (ForwardChips, `lec="lec06"`, no sec).
- `site/src/content/lectures/lec09/s2-cdn.mdx:217`, `lec09/s6-extend-and-optimize.mdx:32,52` (no sec).
- Note for the lec09 writer: line 60's "Fanning one Kafka event out to many consumers, with SQS" now lives only in the ch5 Go deeper box (`#s5-4`). Line 52 (`[6.2](#s6-2)` inside lec09) is lec09's own section.

Old → new section map, in case anything is added: s1-* (images) → s1-*; s2-1/2-2/2-3 (Gravatar URL, columns, scan) → s2-1/s2-2/s2-3; s2-4 (bug hunt) → s3-1…s3-4; s2-5 (active_photo_id) → s3-5; s3-1/3-2/3-3 (upload, CDN, invalidation) → s4-1/s4-2/s4-3; s3-4/3-5 (resize, big machines) → s4-4/s4-5; s4-* (tagging) → s5-* (position s4-5 → s5-6, Kafka s4-6 → s5-5); s5-1/5-2 (badge definition, crude) → s6-1/s6-2–s6-3; s5-3…5-6 (set, truth vs pre-computed, Redis, write path) → s7-1…s7-4; s6-1…6-4 (aux) → s8-1…s8-4; s7 (what to keep) → s8-5.

## Self-check

- `pipeline/bin/site.sh build lec06`: ok (12 pages).
- `links lec06`: zero broken.
- `figures lec06`: ok at 360/390/768/1440, light + dark (after splitting five long inline code spans and widening the serving-only phone viewBox to 340).
- QA screenshots in `lectures/lec06/story/shots/` (chapters 7, 8 at 390). The element screenshots of the finished map at 390 look cut off at the bottom; measured in a real browser the SVG renders at 330×700 in full — the QA tool clips elements taller than the remaining viewport.
- Grep over every built lec06 page (HTML incl. SVG title/desc/aria) and `page_text.md` for `instructor|in class|the class|the board|as taught|lecture's view|More precisely|student|teacher`: **0 hits**.
- SQL checked by reading for MySQL 8: `SHA2(LOWER(TRIM(email)), 256)`, `START TRANSACTION … SELECT … FOR UPDATE … COMMIT`, `COUNT(DISTINCT sender_id)` with non-reserved column names, `CREATE INDEX … (recipient_id, ts, sender_id)`. `hash` is a non-reserved keyword in MySQL and valid as a column name. Redis commands (`SADD`, `SCARD`, `DEL`, `SET key value NX`) checked against redis.io. Not run against live servers.
- **Titles alone**: a card nobody uploaded → one URL for your face, which user? → one line changes your photo, what could go wrong? → Facebook adopts Gravatar, who serves a million faces? → "let people tag people", what do you ask first? → the messages icon says 3, three what? → do you need the messages at all? → thirty messages from one friend, how many writes change anything?
- **Pauses**: 11, every answer hidden until a choice is clicked; the paragraph after each was checked not to restate it.
- **Limits**: Go deeper boxes in ch1, ch3, ch5, ch7 (one each, each under 120 words); no rule boxes.

## Shared files

None edited.

## Unsure

- **Ch8 length** is 1,875 by this count, a little over the 1,800 ceiling, because it carries the finished map, "What you can now do", four recall answers and the Lecture 9 hand-off (lec03's ch10 carried the same at 1.6k).
- **The map's phone layout** folds earlier rows to "what: kept ready" and drops their truth column; the desk layout and the finished phone map show all three columns.
- **Hook phrasing** "can show a broken image on every site at once" is the 404 from L-0093 told as a consequence; "pulls in team after team" is L-0218's list.
- **Real Gravatar** is mentioned once as SHA-256 under `/avatar/`, while the design keeps `gravatar.com/<hash>` (as the clips and figures do).
- **lec09 (Lecture 7)** is being rewritten in parallel: the overview's "Where you are" and §2.2/§4.1/§4.2/§4.4 callbacks (pre-signed upload, CDN on a subdomain, width parameter, "don't store what's derivable") were checked against lec09 as it is on disk now; re-check after its rewrite. Its ForwardChip at `s11-keep.mdx:60` points at a fan-out topic that is now only a Go deeper box here.
- **course.json** still carries the old topic strings for lec06 (shared file, untouched).

## Revision 2 (review_facts.md, review_reader.md)

### Word counts (same method)

| Page | Words |
|---|---|
| Overview | 1,120 |
| Ch1 | 1,366 |
| Ch2 | 1,225 |
| Ch3 | 1,742 |
| Ch4 | 1,404 |
| Ch5 | 1,561 |
| Ch6 | 853 |
| Ch7 | 1,198 |
| Ch8 | 1,976 |

Total ≈ 12.4k. Ch8 is over the 1,800 ceiling: the F-05, F-06 and blast-radius fixes added text, and it also carries the map, "What you can now do", recall and the hand-off. Ch6 is under 900 after the reader's cuts (6c) and the new pause.

### review_facts: every item applied

- **F-01:** §3.4 uses the two-engine paragraph (PostgreSQL race explained correctly; InnoDB locks the rows it scans; "Don't lean on that difference"), with a MySQL locks-set citation. Recall 2 now says "on some engines (PostgreSQL's default isolation)". SN-04's Lecture 3 `FOR UPDATE` callback added.
- **F-02:** §4.4 adds the purge-every-width paragraph (CloudFront `/h1*`, or each width / prefix / tag). Recall 3 says "the path and all its widths".
- **F-03:** `@app.route('/raw/<path:key>')` in §1.2 and Fig 1·b (code lines + desc).
- **F-04:** "four bugs, two of which…" (hook), "four bugs" (Build 1), "three more behind it" (ch3 intro).
- **F-05:** §8.4 threshold now says knowing the size needs the main-store read, so it only pays off for huge sets.
- **F-06:** §8.3 clear: read B's senders from the set before deleting, or one hash per recipient (`HSETNX`, one `DEL`, `HEXPIRE`).
- **F-07:** Crude figure uses `sender_id`/`recipient_id` (phone table drops the msg column); IndexOrder labels and desc too; ch6 prose names the columns that way throughout.
- **F-08:** RepoCard "TTL, say 1 day"; desc says GitHub doesn't publish it.
- **F-09:** per the coordinator: overview "a CDN on its own hostname, `instacdn.net`…"; §4.2 "In Lecture 7 the CDN had a hostname of its own, `instacdn.net`; here the root domain itself…". Checked against lec09/c1 on disk.
- **F-10:** "a daily one can get an app uninstalled".
- **F-11:** the "only the owner adds tags… other writers change one tag at a time" sentence.
- **F-12:** §7.2 separates the stored hash (kept ready) from `active_photo_id` (truth moved onto the row).
- **F-13:** overview time estimates per piece (hour / afternoon / couple of days).
- **F-14:** "In the version you build here, the URL is…".
- **F-15:** §4.3 ends with long `s-maxage` for the CDN, short `max-age` for browsers.

### review_reader: applied

- **Top 1 (ch8 danger):** the lecture gives no rates, so none were added. §8.2 now answers "why not just shard main?" with the lecture's blast-radius argument (L-0294, L-0288, fact-check L-0291): every badge read goes to main, nothing reads aux, "load you can afford to lose belongs on a store you can afford to lose". The rule is stated once there (8f); the 8.1 and 8.2 repeats are cut.
- **Top 2 (Lecture 9 hand-off):** §8.6 rewritten against lec07 on disk and the coordinator's summary: closes the profile-page frame, counts Redis's jobs, then "Lecture 9 goes back to the blog's data and builds two copies of it: first a copy for the analysts, which may run behind but must never miss a change; then the cache… what is inside the Redis you leaned on here." Title now "You leaned on Redis all lecture. What is inside it?".
- **Top 3 (ch5 chain):** rebuilt around the schema that keeps breaking: 5.1 who can tag me (authorization, no schema yet) → 5.2 five tags: an array → 5.3 the activity page's reverse question breaks the array: rows → 5.4 the rows need a location; pixels break on chapter 4's resized copies; fractions + box complete `posts_tags(post_id, user_id, location)` → 5.5 everyone else hears through one event (notifications, suggestions, feed, Go deeper fan-out). Three-hats preamble cut to two sentences; influence sermon cut; ACL said once in prose; "a post here is a photo" clause; crop caveat added (5h). Celebrity example fixed (5a): "tagged by many people in their photos", Fig 5·e desc and label "in their photos".
- **Top 4 (Build 2→3 hand-off):** end of ch5 now runs the "kept ready" thread: the stored hash, `active_photo_id` on the read's row, and the red 3 as the extreme case (asked on every page load; its truth is every message ever sent). "What you'll build" gives each build a one-line felt problem.
- **Top 5 (spoilers):** hook no longer says "read the whole users table"; Build 1 says "the first query a request needs"; dek and ch3/7/8 blurbs and Build 3 reworded as suggested; ch5 blurb rewritten.
- **Top 6 (ch8 contradictions):** F-05, F-06 applied; rose replaced (8e).
- **Top 7 (badge definition):** the 6.1 pause is now "You tap the icon… how many of the 300 have you read?"; the definition is stated before it; "not unacknowledged" fixed (6b); Instagram disclaimer, 24-hour sentence and queue strawman cut (6c). 7b: §7.2 says the set is now its own truth for the badge (miss an update, wrong until the next tap); map row "badge, v2" truth → "the undelivered-message events".
- **Top 8 (ch3):** one engine story (F-01); stepper step 5 and Fig 3·c no longer say "locking"/"for update" (locking is introduced in 3.4); the two paragraphs after the stepper became the setup for 3.4; "one site asking for one face"; one-statement update with its own `EXISTS` ownership check, `WHERE id = ?` (3d, 3g); Fig 3·d updated (no `and is_active = false`, `where id = ?`); join-type aside, cohort line and print-statement analogy cut (3e).
- **Top 9:** 2a collision reason cut (login + profile kept); 2b the rate is put next to the scan ("every avatar on every page of every site"); 5e via F-10.
- **Top 10 / ch4:** 4a purge prose cut to the reason; 4b Kafka given a reason by callback to Lecture 2 (side work off the request), no new claim; 4c via F-15; 4d reworded; 4e "Hit and miss work as in chapter 1". 1a (current numbers moved into the pause, hedge cut), 1c (before/after moved to the opening), 1d ("four lines" in the figure). H4 (Lecture 7's closing question named), H6 (strings and sets), 7a (client vs backend split), 8g (a tags recall question replaces the Gravatar-scan one), 2c cut.

### review_reader: rejected or partly applied, with reasons

- **2a's MD5→SHA-256 re-hash reason:** not in the sources; not added.
- **1b's "most cards are shared rarely":** unsourced; the 40% figure stays as GitHub reports it.
- **2d (shorten clip 2·1's last beat):** would mean editing the clip and regenerating posters; the reader rated it acceptable, so left.
- **4f (resize time in ms):** no source gives a resize time; 280 ms is the card's headless-browser render, not a resize. Not added.
- **6e / 8a rates (badge reads per second):** the lecture gives none; the case is made by blast radius instead, as the coordinator asked.
- **8b counter in the aux store:** not in the lecture; F-05's wording used (review_facts wins).
- **8d retry/compensation step:** not in the lecture; not added. The TTL healing sentence (fact-check L-0305) stays.
- **Lecture 7's §9.5 line and Lecture 9's recap line:** other lectures' files; not edited (lec09's current §9.5 already describes three builds and "counts people… not messages").

### Section ids

Changed in ch5 only: 5.1 who can tag me (was hats), 5.2 how many (was 5.3), 5.3 the reverse question (new), 5.4 position (was 5.6), 5.5 other teams (notifications, suggestions, feed, Kafka; was 5.4/5.5). The fan-out Go deeper is now in `#s5-5`. §8.6 title changed, id unchanged.

### Incoming links

Unchanged: no other lecture links into lec06 with `sec=`. Links without a section: `lec09/c9-bad-days.mdx:136` (and the lec09 files listed above, as they stand after its rewrite); `lec07/s0-header.mdx` "Lecture 8" link (no sec).

### Checks

- build: ok (12 pages). links: zero broken. figures: ok at 360/390/768/1440, light + dark (three long inline code spans in ch6 split).
- Banned-word grep (plus "teacher", "cohort") over built HTML and `page_text.md`: 0.
- `page_text.md` regenerated.
- Clip files unchanged; no poster regeneration.

## Revision 3 (review_facts_final.md, exam_grade.md)

- **F-05 (rest):** §8.4 last sentence now "…so the skip saves something only if the size is known without asking the main store each time."
- **N-01:** §3.4 opens with "A user picks one photo on their phone and another on their laptop at the same moment…" (a double-click sends the same id and doesn't race).
- **N-02:** §3.5 comment `-- 0 rows: not your photo (or it was already the active one)`.
- **N-03:** Fig 3·d `MARK_NEW` now carries the ownership check (`and exists (select 1 from photos where id = ? and user_id = ?)`); desc says "only if the photo belongs to that user". The ✓ notes moved to the first line of each new query so they don't collide with the longer code.
- **N-04:** §8.2 "One extra network hop per write, plus a small second cluster and a little drift (8.3), is a cheap price for that."
- **N-05:** §8.2 answers the shards question in one sentence ("more shards on the main cluster would only add room for the same wasted work on the store every read depends on").
- **N-06:** §5.3 "…has to look inside every photo, unless the database can index the array."
- **CUT-LOSS Q031/Q026 (L-0066, L-0078; fact-check L-0078 "accidental collisions … negligible"):** §2.2 adds the collision argument for keeping the email and the explicit "assume hashes are unique".
- **CUT-LOSS Q080 (L-0179–L-0182):** the three hats folded into the ch5 intro as one sentence ("…this chapter is the first hat"), not a separate block.
- **Word counts:** overview 1,120 · ch1 1,366 · ch2 1,279 · ch3 1,753 · ch4 1,404 · ch5 1,605 · ch6 853 · ch7 1,198 · ch8 2,004 · total ≈ 12.6k.
- **Checks:** build ok (12 pages); links zero broken; figures ok at 360/390/768/1440, light + dark; banned-word grep (plus "teacher", "cohort") over built HTML and `page_text.md`: 0. `page_text.md` regenerated.
- **Section ids:** unchanged since Revision 2; incoming-link map stands (no `sec=` links into lec06).
