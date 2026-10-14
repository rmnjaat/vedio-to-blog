# Lecture 04 (lec02) assembly report (14 Oct 2026)

Overview page: `site/src/content/lectures/lec02.mdx` → `/lectures/lec02/`. Its body imports `lec02/s0-header.mdx`, which holds the "About this class" margin note and "Slack so far". The frontmatter TOC lists all 10 chapters and their 43 subsections. Every title and `#s…` id was checked against the `<Section>` headers in the parts, and all of them match.

| page | parts | section ids |
|---|---|---|
| overview `/lectures/lec02/` | s0-header | (About this class, Slack so far) |
| 1 `1-nosql-is-not-one-thing` | s1-nosql | #s1, #s1-1 … #s1-3, #s1-check |
| 2 `2-documents-and-key-value` | s2-documents-kv | #s2, #s2-1 … #s2-4, #s2-check |
| 3 `3-column-stores` | s3-columns | #s3, #s3-1 … #s3-4, #s3-check |
| 4 `4-graph-databases` | s4-graphs | #s4, #s4-1 … #s4-4, #s4-check |
| 5 `5-sql-or-nosql` | s5-sql-or-nosql | #s5, #s5-1 … #s5-3, #s5-check |
| 6 `6-slack-schema` | s6-slack-schema | #s6, #s6-1 … #s6-5, #s6-check |
| 7 `7-sending-a-message` | s7-sending | #s7, #s7-1 … #s7-5 (+ #s7-3-sync/-async/-none/-compare, #s7-5-ten-ways), #s7-check |
| 8 `8-scaling-websockets` | s8a-websockets + s8b-websockets | #s8, #s8-1 … #s8-6 (+ #s8-4-why-redis, #s8-4-vs-kafka, #s8-5-changes, #s8-6-routing), #s8-check |
| 9 `9-the-whole-system` | s9-whole-system | #s9, #s9-1 … #s9-5 (+ #s9-2-why-kafka, #s9-4-membership, #s9-5-shared-db), #s9-check |
| 10 `10-deleting-and-ordering` | s10-deleting-ordering | #s10, #s10-1 … #s10-3 (+ #s10-2-clock, #s10-3-heuristics, #s10-3-stops), #s10-check |

Each chapter has exactly 1 RuleBox and 3 recall questions. Chapter 8's RuleBox sits in s8a and its recall questions in s8b. The NotationKey appears once, at the top of chapter 1, followed by the lecture's own marks (fig-l02-key). There are 9 pause-and-think prompts (P1–P9) in chapters 3, 4, 6, 7 (×2), 8 (×2), 9 and 10. There are 4 clips: Clip 3·1, 7·1, 8·1 and 9·1. No duplicate ids. No paragraph or sentence over 70 characters appears in more than one part (checked by script).

## Gates

| gate | result |
|---|---|
| build | Isolated build passes: 14 pages (`gates_assembly.txt`). |
| coverage | All 439 of the 439 placed ids are on their chapter's page. Overall ledger coverage is 439/441; the 2 missing items are the ones dropped in `placement.json`. Ids per page: overview 4, ch1 19, ch2 34, ch3 33, ch4 36, ch5 19, ch6 46, ch7 68, ch8 95, ch9 56, ch10 44. COVERAGE PASS. |
| links | 14 pages and 701 internal links, assets and #fragments checked under base /vedio-to-blog/: zero broken. |
| check-figures | Every page passes at 360, 390, 768 and 1440, light and dark: no label under 12px and no horizontal scroll. The first gates run failed here (details under "Consistency fixes"). |
| QA sweep | Every page at 1440, 1024 and 390, light and dark: 11 pages, 66 page × width × theme runs. All 6 step-throughs (6·c, 8·a, 8·b, 8·f, 8·h, 10·b; 30 steps) were walked at 1440 and 390. All 9 pause-and-think prompts were clicked. All 4 clips were played, with their posters and chapter chips captured. Also checked: nav, layout columns, console and horizontal scroll. `report.txt` ends `ok: no failures`. |
| posters | `site.sh posters lec02` wrote paper/blackboard × desk/phone posters for all 4 clips, then the site was rebuilt. |
| screenshots looked at | Overview top/mid/end. A sample of chapter tops, middles and ends at all three widths and both themes. Every figure I changed, at 1440 and 390. The ch8 and ch10 step-throughs at 390 and 1440. Posters for Clip 7·1 and Clip 9·1. |

## Consistency fixes made
- **Overview** (`s0-header.mdx`, previously a stub):
  - "About this class" carries L-0001, L-0003, L-0004 and L-0005, with a "comes in Lectures 09 and 10" chip on L-0003.
  - "Slack so far" is untagged. It says where the course stands as this class starts:
    - Lecture 02 §5's real-time channels, and the WebSocket scaling Lecture 02 left for this session;
    - Lecture 01's presence forward-link;
    - Kafka (Lecture 02 §3.5–3.7) and sharding (§2.4);
    - Lecture 03's A–M / N–Z key-value store (§5.3), which is reused in §1.3 and §2.1;
    - Lecture 01 §3 on Redis vs DynamoDB.
  - Links to §1.3, §2.1, §2.4 and chapter 6 resolve. The outline gives this section no figure, so it has none.
- **Overview frontmatter**: the scaffold's TOC and chapters were checked against the parts and the stub comment was replaced.
- **Figure numbering in reading order (chapter 6):**
  - The schema shown part-built in 6.2 is now "Fig 6·b, so far"; it was "6·c, so far", which came before 6·b.
  - The drafts step-through is now Fig 6·c.
  - The finished schema in 6.4 is now Fig 6·b.
  - Ids are unchanged, so `#fig-6b/step-n` deep links still work.
  - Every other chapter was already numbered in reading order.
- **Labels at 360 and 768 px.** The writers had checked 390 and 1440 only. At 360 and 768, chapters 5, 7, 8, 9 and 10 had 626 small-label findings in total. Most came from the kit's own Cyl, Box and Num labels, which a floor passed through props doesn't reach.
  - I added `site/src/figures/lec02/s0-label-floor.tsx`, a drop-in `Fig` that raises every label in a drawing to a floor worked out from its width and the widths measured on this build. The floor is 15 for 880 units, 15.3 for 380, 14.5 for 360 and 13.7 for 340; rule-box sketches get an explicit 13.3.
  - It is used by fig 5·a (desk), 7·a, 7·c, all of chapter 8, 9·b, 9·c, 9·d, 9·rule, 10·a and 10·b.
- **Re-laid labels the bigger floor made collide:**
  - 7·a: `send_message(…)` is on two lines, the routing rule `channel_id → shard` sits over the store, and the database list is right-aligned.
  - 8·f: the "sub c1 / sub c2" headers lean apart.
  - 9·b (phone): "non-realtime" moved off the lb label.
  - 9·c: the key label has more room.
  - 9·d: "write m42" is clear of node 1.
  - 10·a: the phone bubbles hold "standup / in 5" on two lines.
- Cross-links: every `#s…` target resolves (701 links). Terminology was checked across chapters:
  - "edge server" for the WebSocket server, and "Balancer" for the service, while plain "balancer" in 9.4 means a load balancer;
  - "NoSQL" appears after chapter 1 only in board quotes and the outline's own "SQL or NoSQL?" title.
- No ledger tag was removed and no content was dropped.

## Shared change needed
- Cross-lecture links. A raw `/lectures/<id>/` href in MDX ignores the site base, so writers and the overview name other lectures in text ("Lecture 03, §5.3") instead of linking them. A base-aware link component, or a rewrite step in the page template, would let these become links. This was reported by w1 and w5.
- Optional: a kit-level label floor (for example `Fig minLabel`) would make `s0-label-floor.tsx` unnecessary. Other lectures with 880-unit desk figures will hit the same 768 px failures.

## Open items
- Clip lengths on the page (7·1 at 0:40, 9·1 at 0:34) differ from `clips.json`'s planned 34 s and 29 s. These are the animators' final cuts, and the chips come from each clip's META.
- Chapter 6 names "Lecture 08" in plain text for the reused membership table, because that page doesn't exist yet.
- On phones, the sticky step panel covers the bottom of a tall step-through until the reader scrolls. This is shared stepper behaviour, the same as on lec01.
- Remotion's licence notice is logged as a console warning when a clip mounts, as on lec01. It is left for the owner to decide.
