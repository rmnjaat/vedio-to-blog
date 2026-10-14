# Lecture 07 (lec09): faithfulness audit

**Scope.** The audit covered:
- the page: `site/src/content/lectures/lec09.mdx` and `lec09/*.mdx` (15 parts);
- the figure texts (titles, descs, labels, step texts) in `site/src/figures/lec09/*.tsx`;
- the captions, alt text and chapter labels in `site/src/animations/clips/l09-*/timeline.ts`.

They were checked against these sources:
- `lectures/lec09/ledger/ledger.jsonl`, through each paragraph's `[[L-…]]` and `k=` tags;
- `lectures/lec09/transcript/transcript.md`;
- `lectures/lec09/lesson/factcheck_applied.md` and `factcheck/final.jsonl`;
- `lectures/lec09/board/diagrams.md`.

No site files were edited.

## Summary

| Kind | Count | High | Medium | Low |
|---|---|---|---|---|
| Distortion | 7 | 0 | 2 | 5 |
| Invention (untagged and unsourced) | 4 | 0 | 0 | 4 |
| Fact-check application | 3 | 0 | 0 | 3 |
| Voice | 0 | 0 | 0 | 0 |
| Figure | 2 | 0 | 0 | 2 |
| Clip | 0 | 0 | 0 | 0 |
| **Total** | **16** | **0** | **2** | **14** |

There are no high-severity issues. The page is close to the class.

### Coverage

Every prose paragraph, list item, step text, table cell, recall answer and margin note was read against its tags.

| Part | Paragraphs checked |
|---|---|
| frontmatter (dek, description, 11 chapter summaries) | 13/13 |
| s0 header | 7/7 |
| s1 Instagram's first year | 21/21 |
| s2 CDN | 64/64 |
| s3a + s3b uploading a photo | 70/70 |
| s4 storing the post | 42/42 |
| s5 privacy | 33/33 |
| s6 extend and optimize | 36/36 |
| s7 hashtag storage | 40/40 |
| s8a + s8b counting hashtags | 57/57 |
| s9 hashtag design | 39/39 |
| s10a + s10b running the pipeline | 64/64 |
| s11 what to keep | 24/24 |
| **Figures** (modules, with titles, descs and labels) | 39/39 |
| **Clips** (captions, alt, chapters, titles) | 4/4 |

**Fact-check application.**
- **SourceNotes:** all 11 (SN-01 to SN-11) are on the page. Each sits directly after its teacher's point, keeps the point, and links the listed sources: L-0079, L-0113, L-0127/L-0144, L-0163, L-0175, L-0344, L-0347, L-0266, L-0313, L-0359 and L-0323.
- **Inline clarifications:** all 55 are present, each beside the teacher's sentence. They include L-0040 and L-0273, which are simplified-medium and handled inline as the policy says.
- **Unverifiable items:** 18 of the 20 are attributed as the lecture's view, a guess or a first-hand account. The other two, L-0010 and L-0014, are stated as fact (F-016).
- **Additions:** each one carries its source link. The 10 MB GitHub cap misses its docs link (F-014).

**Voice.** A grep over the page, the figures and the clips found no teacher–student dialogue, no student names and no "Student N". Student proposals are given as "One idea raised in class" or "Another proposal", and the outcome the teacher gave is kept beside each. Two student remarks are presented with more endorsement than the class gave: F-003 and F-004.

**Figures and clips.** The replication and data-flow directions match the board. These all match the ledger:
- CDN pulls from the origin;
- the user uploads straight to S3;
- post svc → Kafka → extractor → POST_HASHTAG → counting → DB;
- the popularity service → their Kafka → workers;
- user → CDN → hashtag API.

The figures correct the board's printed "Image Service" to the post service, as the teacher did, and say so. The numbers are the class's own (5 MB, 179/173 KB, 183938, 221335625, 10,000 → 360 px, 1.2m, 436/512 B), or are marked illustrative in the clip alt text. Two figure texts go beyond the board (F-012, F-013). The four clips match the ledger, and their alt texts flag illustrative values.

### Most serious

1. **`s4-storing-the-post.mdx:103` (distortion, medium).** "This really happened." sits right in front of the teacher's hedged claim, which is also the one the fact-check marks wrong: "most probably Cloudflare". The certainty spills onto the Cloudflare story.
2. **`s5-privacy.mdx:99–107` (distortion, medium).** The CDN pseudo-code states that `oe` is the expiry and `oh` the signature, dropping the teacher's "most probably… I don't know what these internal parameters are". It also invents a two-message error mapping that the demo did not show.
3. **`s3b-uploading-a-photo.mdx:89` (distortion, low).** An open remark from the class, whose speaker is uncertain, is introduced with "A fair point", so it reads as endorsed.
4. **`s4-storing-the-post.mdx:153` (figure, low).** Fig 4·b removes the board's image service → S3 line, putting the fact-check refinement in place of the board instead of showing it beside the board.

Each entry below gives the severity and the file and line, then the problem, the evidence and the fix.

---

## §1 Instagram's first year

- **[Invention] low.** `s1-instagram-year-one.mdx:98`. "Instagram's photos sat behind a CDN from day one." Nothing in the class or the sources says "day one"; the highscalability account describes the stack at the end of year one.
  - Evidence: no L-id; factcheck L-0009 checker note (Dec 2011 stack).
  - Fix: "By the end of its first year, Instagram's photos sat behind a CDN." (F-008)
- **[Factcheck] low.** `s1-instagram-year-one.mdx:56` and `:74`. L-0010 ("the same thing happens every time… nobody thinks out of the box") and L-0014 (keeping an eye on the stack "puts you in the hot seat") are unverifiable opinion and advice, but are stated as fact. Their neighbours are attributed.
  - Evidence: factcheck_applied §4.
  - Fix: "The lecture's advice is to always remember the pattern: …" and "The advice: keeping an eye on …", each with its tag. (F-016)

## §2 A CDN as a black box

- **[Distortion] low.** `s2-cdn.mdx:225`, and again at `s11-keep.mdx:55`. The live-content ForwardChip says "week 6", but the teacher said "We'll talk about it 7.3. 6.3.", which is ambiguous.
  - Evidence: transcript 00:30:09, L-0060.
  - Fix: when="a later session (said as ‘6.3’)". OTT stays at week 6 (L-0196). (F-006)
- **[Distortion] low.** `s2-cdn.mdx:46`. The chip "not in this series" for BGP closes a door the teacher left open.
  - Evidence: L-0017 detail "a deep dive could be done later".
  - Fix: label "skipped here", with the text "(a deep dive could come later)". (F-007)

No other issues in §2. The teacher's "conveniently" about Cloudflare's blog post is his own word (transcript 01:45:24). L-0044, L-0207 and L-0208 are attributed and keep their hedges. L-0051 is a student's remark, attributed to the class, with a sourced addition.

## §3 Uploading a photo (s3a, s3b)

- **[Distortion] low.** `s3a-uploading-a-photo.mdx:100`. The student's untested "configuration" (L-0075, open) is stated as part of the design.
  - Fix: "One suggestion for how: the service holds a configuration that proxies…" (F-004)
- **[Distortion] low.** `s3b-uploading-a-photo.mdx:82`. The teacher's fragmentary reply is given an interpretation he never offered: "the CDN isn't a second copy of the store".
  - Evidence: L-0108.
  - Fix: quote the fragment ("is not meant for… a CDN is not a blob store"). (F-005)
- **[Distortion] low.** `s3b-uploading-a-photo.mdx:89`. "A fair point, though" endorses L-0110, which is open and whose speaker is uncertain (transcript 01:00:01).
  - Fix: "Another remark from the class: …" (F-003)
- **[Factcheck] low.** `s3b-uploading-a-photo.mdx:24`. The 10 MB attachment cap is cited only to the GitHub changelog. The docs page in A-IUT-15 is missing.
  - Fix: add the docs.github.com Cite. (F-014)

SN-01 (L-0079) and SN-02 (L-0113) are placed right after their points, with sources. The pre-signed flow, the GitHub call sequence and its numbers match L-0088 to L-0104.

## §4 Storing the post

- **[Distortion] medium.** `s4-storing-the-post.mdx:103`. "This really happened." is placed before the hedged and wrong "most probably Cloudflare".
  - Evidence: transcript 01:06:42; L-0127.
  - Fix: "Instagram is acquired by Facebook, which runs its own CDN. In the lecture's telling, Instagram most probably used Cloudflare…", keeping SN-03 after it. (F-001)
- **[Figure] low.** `s4-storing-the-post.mdx:153` (Fig 4·b). The board's image service → S3 line is removed in favour of the local-signing refinement.
  - Evidence: D-04, L-0147 board step 2.
  - Fix: draw the line dashed, labelled "signs the URL (usually locally)". (F-012)

L-0134, L-0139 and L-0140 are attributed. SN-03 covers L-0127 and L-0144, keeps the lesson, and cites highscalability.

## §5 Who can see a private photo?

- **[Distortion] medium.** `s5-privacy.mdx:99–107`. The pseudo-code states oe and oh as fact and invents a "bad URL" versus "Bad URL timestamp" mapping.
  - Evidence: transcript 01:24:48 (L-0170, the teacher's guess); L-0171; L-0178.
  - Fix: add an "illustrative / a guess" comment and use one error. (F-002)

SN-04 (L-0163) and SN-05 (L-0175) are in place. The L-0176 hedge is kept verbatim. L-0200, L-0202 and L-0203 are attributed to the instructor. The DRM and law additions are sourced.

## §6 Extend and optimize

- **[Invention] low.** `s6-extend-and-optimize.mdx:44`. The board's partition-key question and the CDC line have no tag.
  - Fix: append [[L-0181 L-0242]]. (F-009)
- **[Figure] low.** `s6-figs.tsx:102`, with the caption at `s6-extend-and-optimize.mdx:82` and the recall answer at `:137`. "Caches both" (the original and the resized copy) is not taught: L-0192 says the CDN caches the result.
  - Fix: "caches the resized copy". (F-013)
- **[Invention] low.** `s6-extend-and-optimize.mdx:32`. The forward chips to Lecture 8 (fan-out) and Lecture 9 (CDC in depth) name topics the class never named. See F-010 in §11.

## §7 The hashtag page: what to store

No issues. Student proposals (L-0214, L-0216, L-0217, L-0219, L-0221, L-0227, L-0342, L-0344, L-0348) are attributed to the class, and the teacher's response stays beside each one. SN-06 (a billion documents is about 500 GB) and SN-07 (a 10,000× jump) follow their points directly. The 436 B and 512 B arithmetic matches 03:12:37.

## §8 Counting hashtags (s8a, s8b)

- **[Factcheck] low.** `s8b-counting-hashtags.mdx:122`. For unverifiable L-0363, the page adds the checker's unconfirmed guess "*Learning Spark* is the likely one".
  - Fix: keep only "could not be confirmed". (F-015)

All inline items for §8 are present: L-0243, L-0245, L-0246, L-0253, L-0254, L-0294, L-0350, L-0362 and L-0364. The adapter, the partition reasoning (L-0239 to L-0251) and the at-least-once over-count (L-0255, with A-HSD-05) are faithful.

## §9 The whole hashtag design

No issues. SN-08 (CQRS) keeps "in the lecture's telling". The L-0273 inline sits beside the teacher's sentence. The webhooks trade-off (L-0305), the read and write paths (L-0277 to L-0293) and the corrected writer box are faithful.

## §10 Running the pipeline (s10a, s10b)

No issues. SN-09 (Kafka availability), SN-10 (outbox) and SN-11 (retention) each follow their point and keep it. Inline L-0314, L-0321, L-0324, L-0326, L-0328 and L-0330 are present. L-0318, a student's open framing, is attributed to the class. L-0339 and L-0357 are attributed.

## §11 What to keep

- **[Invention] low.** `s11-keep.mdx:53–54` (also `s6-extend-and-optimize.mdx:32`). The forward items "fanning out … with SQS" (Lecture 8) and "CDC in depth, and consistent hashing" (Lecture 9) are not in the class. They sit under "Each of these was left for later on purpose".
  - Fix: list them separately as "Also on this site", or reword them per L-0179 and L-0183. (F-010)
- **[Invention] low.** `s11-keep.mdx:51`. "unread message indicators": the class said "message indicators" (L-0292).
  - Fix: drop "unread". (F-011)
- See also F-006, the live-content chip at `:55`.

## Clips

`l09-cdn-miss-hit`, `l09-presigned-upload`, `l09-signed-url-expiry` and `l09-hashtag-repartition` were checked. Their captions, alt texts and chapter labels match the ledger items they tag:
- the expiry clip keeps "most probably" for oe;
- the upload clip's "valid 60 s" is one of the teacher's examples (L-0084);
- the repartition clip's p31 is the class's own post, with p40 and p52 marked illustrative.

No issues.
