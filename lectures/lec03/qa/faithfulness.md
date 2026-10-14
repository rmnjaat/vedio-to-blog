# Lecture 06 (lec03): faithfulness audit

Scope: the page sections `site/src/content/lectures/lec03.mdx` and `lec03/*.mdx`, the figure texts in `site/src/figures/lec03/*.tsx`, and the clip captions and alt text in `site/src/animations/clips/l03-*/timeline.ts`. They were checked against `lectures/lec03/ledger/ledger.jsonl` (using the `[[L-xxxx]]` and `k=` tags), `transcript/transcript.md` (read in full), `lesson/factcheck_applied.md`, `factcheck/final.jsonl` and `board/diagrams.md`. No site files were edited. The machine-readable list is in `faithfulness.json`.

## Summary

| Kind | Count | Medium | Low |
|---|---|---|---|
| Distortion | 7 | 0 | 7 |
| Invention (untagged and unsourced) | 5 | 2 | 3 |
| Fact-check application | 11 | 1 | 10 |
| Voice | 0 | 0 | 0 |
| Figures | 3 | 0 | 3 |
| Clips | 0 | 0 | 0 |
| **Total** | **26** | **3** | **23** |

There are no high-severity issues.

**Coverage.** Every line of every part was read, including the component text (captions, StepThrough steps, PauseAndThink, Recall, TradeoffTable cells).

| Part | Text blocks checked |
|---|---|
| lec03.mdx frontmatter (dek, chapter summaries) | 11/11 |
| s0 header | 6/6 |
| s1 Why build your own IDs | 36/36 |
| s2 Building getid() | 82/82 |
| s3 Order and clocks | 94/94 |
| s4 ID size | 58/58 |
| s5a + s5b Central services | 105/105 |
| s6 Snowflake | 69/69 |
| s7 Instagram | 72/72 |
| s8 Pagination | 64/64 |
| s9 What to keep | 35/35 |
| SourceNotes | 16/16 |
| Inline clarifications | 26/26 |
| Figure modules (labels, titles, descs) | 42/42 |
| Clips (captions, chapters, alt) | 4/4 |

**Fact-check application.** All 16 SourceNotes (SN-01 to SN-16) are on the page. Each sits directly after its point and keeps the teacher's point beside it. All 26 inline clarifications are present. All 14 "left as taught" items that have a 'keep' addition carry it as a separate sourced sentence. The problems fall into four groups:
- Some left-as-taught nuances are shown as unsourced corrections: L-0122, L-0127, L-0277, L-0185, L-0064.
- Some unverifiable items are stated as fact: L-0106, L-0226, L-0241, and the Instagram server count from L-0276.
- One SourceNote is missing a listed source (SN-07, RFC 9562).
- One SourceNote adds an unverified claim (SN-10).

These worked examples were recomputed and are correct: 1627179151913938944 (Fig 6·c), 3041413094946379657 and 362564694279 (Fig 7·d), 24 Aug 2011 for 1314220021721, about 76% of 2^41 used by Feb 2023, and 2^41 ms ≈ 69.7 years.

**Voice.** The page and the figures have no student names, no "Student N" and no dialogue. "The instructor" appears five times (the Amazon tech talks, the benchmark, the 32× measurement, index sizes, the YouTube video), and each time it marks a first-hand account, which is correct. Student proposals are introduced as "one idea raised in class" or "it is tempting to…". One student remark is merged into the lecture's voice (F-021).

**Figures and clips.** No figure contradicts the board on direction or numbers. Fig 3·e's bubble ("my clock never goes back") is flagged in its caption as the claim SN-02 qualifies. Three figure issues are listed below:
- a board "slip" that wasn't one (m2-t3)
- Flickr placed "inside the database" on the recap map
- one board time that is off

All four clips match the ledger. The flush-crash clip correctly marks only m1-09 as unused, not the teacher's "8 and 9".

### Most serious

1. `s9-keep.mdx:43` with `s3-order-and-clocks.mdx:45` (Invention, medium): the page writes an answer to the deferred conflict-resolution question (L-0090) and presents it as "as far as the lecture went". The class never returned to that question.
2. `s4-id-size.mdx:25`, along with the s4 dek and the lec03.mdx chapter summary (Invention, medium): "Amazon, Flickr, Twitter and Instagram all say no" to UUIDs. Nothing taught says Amazon rejected UUIDs. L-0150 covers only the case studies after Amazon.
3. `s7-instagram.mdx:97` and `:118`, with the Fig 7·b desc (Fact-check, medium): "Instagram ran thousands of them on 10–15 servers" is stated as fact. In class it was an example ("let's say 10 or 15"), and the fact-check could not verify the count. The L-0276 inline note leaves that clause out.

Issue format: **[KIND] severity** `file:line`, then the problem, the evidence and the fix.

---

## Header and frontmatter

- **[Distortion] low** `s0-header.mdx:21`: "This page keeps that order, with three moves… pagination comes after Instagram rather than straight after Twitter". "That order" is the announced order (L-0100), which already puts pagination last. The third "move" is only a move against the order actually taught (pagination at 01:44, Instagram at 02:03). Evidence: L-0100 / transcript 00:54:17. Fix: "The page follows that announced order. Against the order actually taught it makes three moves: … pagination, taught right after Twitter, comes after Instagram as announced."
- See also F-002, which also touches the `lec03.mdx:113` chapter-4 summary.

## §1 Why build your own IDs

- **[Distortion] low** `s1-why-own-ids.mdx:87` (also the RuleBox at :91 and the FunctionFirst label "later, if needed"): "an evolution you reach later, only if you need it" adds a condition. The teacher said only that the central service comes later in the evolution, and the lecture goes on to build one. Evidence: L-0010 / 00:03:29. Fix: "A central ID service is an evolution you reach later."

## §2 Building getid()

- **[Figure] low** `s2-building-getid.mdx:88` (Fig 2·b caption) and `s2-building-getid.tsx:123` (desc): "the board's last example read m2-t3, drawn here as m2-t2". This was not a slip. The teacher said m2's threads are T1 and T3. Evidence: L-0019 / 00:08:02, 00:09:02. Fix: draw m2-t1 and m2-t3, and drop the slip remark.
- **[Distortion] low** `s2-building-getid.mdx:194`: drops the teacher's "not as big" about the boot counter's long ID. Evidence: L-0039 / 00:20:01. Fix: "…might become a problem, though not a big one…"
- **[Invention] low** `s2-building-getid.mdx:198`: the "two different places" are named (the next section, Amazon) as if the teacher had named them. He didn't. Evidence: L-0041 / 00:21:13. Fix: attribute the identification to the page.

## §3 Order, and why clocks break it

- **[Invention] medium** `s3-order-and-clocks.mdx:45`: "section 9.1 gathers what the lecture went on to say". The lecture said nothing more about it (see F-001). Fix: "…deferred, and the class did not return to it."
- **[Fact-check] low** `s3-order-and-clocks.mdx:101` (MarginNote L-0064): the left-as-taught nuance is framed as a rebuttal ("Rather than resetting the clock…"). Fix: reword it as a sourced addition.
- **[Distortion] low** `s3-order-and-clocks.mdx:234`: "it turns out otherwise" loses the hedge on a garbled phrase (the ledger has "may turn out otherwise"). Fix: "it often turns out otherwise".
- **[Distortion] low** `s3-order-and-clocks.mdx:246`: "With UUIDs you lose ordering" was a student's remark, and the teacher answered "You get some, you lose some". Evidence: L-0093 / 00:49:59. Fix: "The catch raised in class: with UUIDs you lose ordering."

## §4 How big should an ID be?

- **[Invention] medium** `s4-id-size.mdx:25` (also :20 dek, `lec03.mdx:113`): "So why did Amazon, Flickr, Twitter and Instagram all say no?" Nothing taught shows Amazon rejecting UUIDs. Evidence: L-0150 ("further case studies", 01:16:38), L-0153. Fix: "So why did Flickr, Twitter and Instagram, the case studies that follow, all stay away from it?"
- **[Fact-check] low** `s4-id-size.mdx:134` (SN-07): only the OWASP source is linked. RFC 9562, which SN-07 also lists, is missing. Fix: add the RFC 9562 Cite.
- **[Invention] low** `s4-id-size.mdx:116`: "The slow-query log and EXPLAIN … are the other usual first checks" is unsourced advice inside the instructor's attributed story (L-0139). Fix: cut it.
- **[Figure] low** `s4-id-size.mdx:153` (Fig 4·c): "board at 01:16". The board D-13 is at 01:11. Fix: "01:11 (D-13)".

## §5 Central services: Amazon and Flickr

- **[Fact-check] low** `s5a-central-services.mdx:45`: L-0106 (unverifiable, should be attributed) is stated as a general fact. Fix: "in the class's telling…; the instructor prefers not to complicate things".
- **[Distortion] low** `s5a-central-services.mdx:43` (also `s9-keep.mdx:78`): "batching, one of the most effective ways…". The audio is garbled at this point. Fix: "which the class rated among the best ways… (the exact words are lost in the recording)".
- **[Fact-check] low** `s5a-central-services.mdx:108`: the L-0122 nuance ("usually replicated or run as a pair") appears as an untagged, unsourced correction. Fix: cut it, or turn it into a tagged bridge to Flickr's two servers.
- **[Fact-check] low** `s5a-central-services.mdx:116`: the L-0127 nuance (signed 2.1 billion) is unsourced. Fix: drop it, or cite the MySQL integer-types page.
- **[Fact-check] low** `s5b-central-services.mdx:75` (SN-10): adds a claim beyond the verified SN-10 ("explicit id = id + 1 does not [honour step/offset]") with no source, and the listed insert-on-duplicate source is missing. Fix: cut it, or source it.
- **[Fact-check] low** `s5b-central-services.mdx:168` (SN-11): the L-0185 nuance ("dynamic variables, no restart") sits inside SN-11 with no MySQL source. It also silently contradicts the "quick process restart" kept at :156. Fix: source it, or move it out.

## §6 Snowflake

- **[Fact-check] low** `s6-snowflake.mdx:226`: L-0241 ("Good engineers don't start there") is unverifiable and should be attributed. §1.3 attributes it, §6.7 does not. Fix: "In the lecture's view, good engineers…"

No other issues. The SN-12 400,000 → 4 million correction keeps the teacher's arithmetic attributed ("As worked out in class") and keeps his conclusion. The "library vs service" notes (SN-13, L-0189/0199/0200/0202/0210/0211) each keep the taught design beside the correction.

## §7 Instagram

- **[Fact-check] medium** `s7-instagram.mdx:97` (Fig 7·b caption), `:118`, and `s7-instagram-figs.tsx:133`: "Instagram ran thousands of them on 10–15 servers" and "That is Instagram's structure: about 10 database servers" are stated as fact. In class this was "let's say 10 or 15", and the fact-check could not verify the count. Evidence: L-0268 / 02:06:36, L-0276 inline. Fix: "the class sketched… on 'say, 10 or 15' servers", plus the unverified-count clause.
- **[Invention] low** `s7-instagram.mdx:32`: names the source as "a post on Instagram's engineering blog" without a cite. The teacher only said "that blog". Fix: attribute it and add the Cite.
- **[Fact-check] low** `s7-instagram.mdx:126`: the teacher's "PL/SQL" is silently replaced by "PL/pgSQL" (L-0277 is left as taught). Fix: "(the class called it PL/SQL) … written in PL/pgSQL".

## §8 Pagination

- **[Fact-check] low** `s8-pagination.mdx:52`: L-0226 (an illustration) becomes "what Twitter has to do all the time". Fix: "the kind of job the class described for Twitter".

The benchmark (L-0221/0230/0231/0246/0305) is attributed throughout. SN-15 and SN-16 keep the taught point beside the correction.

## §9 What to keep

- **[Invention] medium** `s9-keep.mdx:43`: the page gives its own answer to the deferred L-0090 question as "as far as the lecture went". Evidence: transcript 00:48:22 (deferred), with no return to it. Fix: say the class did not come back to it, and mark the inference as the page's own.
- **[Distortion] low** `s9-keep.mdx:92`: ForwardChip "weeks 4–6 … from Lecture 8" should read "from Lecture 7" (week 4 = Lectures 7 and 8).
- **[Figure] low** `s9-keep-figs.tsx:10` (Fig 9·a): Flickr's ticket servers are placed "inside the database". The class grouped them with Amazon as a central ID generation service (L-0159, L-0189), and the §9 table says "Extra service? Yes". Fix: move the Flickr tag to "a central service".

## Clips

`l03-flush-crash`, `l03-clock-skew`, `l03-odd-even`, `l03-offset-vs-keyset`: captions, chapter labels and alt text all match the ledger and the board. No issues.
