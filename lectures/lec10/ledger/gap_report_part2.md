## Part 2 (01:05:16-01:59:52)

Auditor: gap hunter, part 2. Audited file: `part2.jsonl`, 85 items (K2-001 .. K2-085). Every transcript sentence from 01:05:16 to the break (01:53:04) was checked against the part 2 items. Part 1 and part 3 were read for cross-part duplicates.

### Windows

"Covered" = part 2 items whose first audio range starts in the window. Every substantive sentence in the window was matched to an item.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 01:05:16-01:10:16 | 12 (K2-001..K2-012) | 0 | - |
| 01:10:16-01:15:16 | 13 (K2-013..K2-025) | 0 | - |
| 01:15:16-01:20:16 | 8 (K2-026..K2-033) | 0 | - (the student's "rolling upgrade won't work, single place" point is handled under the K2-033 distortion) |
| 01:20:16-01:25:16 | 8 (K2-034..K2-041) | 0 | - |
| 01:25:16-01:30:16 | 7 (K2-042..K2-048) | 0 | - |
| 01:30:16-01:35:16 | 11 (K2-049..K2-059) | 0 | - |
| 01:35:16-01:40:16 | 6 (K2-060..K2-065) | 0 | - |
| 01:40:16-01:45:16 | 9 (K2-066..K2-074) | 2 | G2-001 (the notes call the new-path + rolling-deploy transition a "parallel setup"; board 01:26:45 transitions list), G2-002 (brainstorming rejected options shows why decisions are made) |
| 01:45:16-01:50:16 | 8 (K2-075..K2-082) | 0 | - |
| 01:50:16-01:55:16 | 3 (K2-083..K2-085) | 0 | - (01:52:05-01:53:04 is the break announcement plus the agenda, covered by K2-085) |
| 01:55:16-01:59:52 | 0 | 0 | - (break ~01:53:04-01:59:52, no content) |

Coverage is dense. Only two small items were missing, and no core concept was missing. The 01:35-01:40 and 01:50-01:55 windows have few items because they are long student turns and the break.

Verbatims: 85/85 found word for word (validator `part`: PASS, 0 errors, 0 warnings). No spliced quotes found by hand either.

### Distortions

- **K2-012**: "'apple, a fruit'" is not in the audio. The transcript never says apple's old meaning: "let's say I have the word apple over here and and then let's say I have ball and I have a round object. Right. Okay. Now let's say my changelog contains ... that apple, and now the new meaning is a round fruit." The board does show it (board_log S36, D-07: `apple, a fruit` / `ball, a round obj`, with `a round fruit` overwriting into the next line at 01:11:45). Fix: keep the wording and add `source.board: ["01:11:45"]` (the editor merges with the board item). Without the board source, the statement says more than the audio.
- **K2-018**: the statement makes the rejection absolute. The teacher limits it to this weekly case and implies graveyard + compaction suits live updates (which part 3's Bitcask uses). Transcript: "No, but we don't see it would work well when you are doing live updates. This is an even weekly update. So have it very clean up it directly." Fix: statement ends "... the teacher rejects it here: no repetitive entries, and since updates are only weekly the file should be cleaned up directly (he notes the idea would work well for live updates)". Add flag `check: "we don't see it would work well" - garbled; likely "it would work well for live updates"`. Cross-link K3-018/K3-043.
- **K2-059**: drops the teacher's hedge. He did not reject the approach. He only simplified it. Transcript: "I'm see, I'm not against your approach. I'm not, I'm just trying to make it utter simple". Fix: add to `detail`: "The teacher: 'I'm not against your approach', only that it can be done much more simply". Change status `proposed_then_corrected` -> `open` (or keep it with that note).
- **K2-063**: the detail leaves out the teacher's first reaction, a flat rejection, before he reconciles the idea with two separate files. Transcript: "No, you cannot upload to the same path. That's the wrong thing." Fix: prepend to `detail`: "First reaction: 'No, you cannot upload to the same path. That's the wrong thing.' Once the student adds S3 versioning, the teacher equates it with the two-file approach."
- **K2-068**: drops the reason the teacher gives for why no garbage is served. Transcript: "So you avoid serving garbage data because you are reading from another file now and you are just triggering a rolling deployment." Fix: add to `detail`: "No garbage is served because the new data is in another file at a new path, so each server's in-memory index matches the file it reads (old servers keep reading the old file). Contrast with the same-path upload in K2-041/K2-042."
- **K2-033**: makes the student offer three equal options (one go / rolling / canary). The student actually said a rolling upgrade would not work for a single file, and proposed an A-to-B switch to a new S3 URL plus a canary. Transcript: "Or we have to say a rolling upgrade, we will say, okay, I will change few of the files in few places, but it is a single place. So I don't think that that kind of a deployment will work." Fix: statement = "The same student frames switching API servers to the new file as a deployment problem. Since the file is in a single place, they doubt a rolling upgrade of the file would work. They propose a complete A-to-B switch instead: create the new file at a new S3 URL, give the new address to the API servers, and roll out the change with a canary (one server first, the rest once it works)." Irony to note for the editor: the teacher's final answer IS a rolling deployment of the API servers (K2-067), so keep the student's doubt clearly attributed to the student.
- **K2-048**: status `endorsed` covers the whole proposal, including polling every 5-10 minutes. The teacher accepted the static metadata file but then challenged the polling. Transcript: "Why would you do that, given that your job runs weekly?" and "So instead of polling, we can make things reactive." Fix: add to `detail`: "The teacher endorsed the static metadata file (later meta.json, K2-049/K2-061) but challenged the 5-10 minute polling for a weekly job (K2-050..K2-057); the final design replaces polling with a triggered deployment (K2-069)." Optionally split it into two items: metadata file `endorsed`, polling `proposed_then_corrected`.
- **K2-050**: status `endorsed` on what is the student's answer (unknown upload time, e.g. S3 down on Sunday). The teacher did not accept that this justifies polling. He went straight to "But we studied second week, third week that we can make things wherever we have poll, we can make things reactive." Fix: status `open`, or `detail`: "The teacher answered with 'But ...' and redirected to reactive notification (K2-051)."
- **K2-006**: says the teacher teaches "bumping the version in the header is the last step". The student proposed it, and the teacher only deferred it. Also, the header version in part 1 (K1-078) is a file-format version, not a data version. Transcript: Student: "Then update the version of it. How? Because we know that in the header file, we have the version stored" / Teacher: "That's okay. That's the last thing that we'll do. But how are you updating the dictionary?" Fix: speaker `student (proposal)`, statement "A student proposes updating the version stored in the file header; the teacher defers it as the last step and refocuses on how the dictionary file itself is updated". Confidence medium, `depends_on` add K1-078.
- **K2-011** (minor): `type: concept` with status `proposed_then_corrected`. Its siblings with the same pattern (K2-007/K2-008/K2-009) use `misconception`. Fix: type `misconception`, for consistency.
- **K2-043** (minor): adds a ".dict" extension the teacher didn't say. Transcript: "S3 colon slash slash word dictionary slash dictionary one dot dictionary something" / "dictionary two dot dictionary". Fix: "s3://word-dictionary/dictionary1.dictionary ... dictionary2.dictionary".
- **K2-085** (minor): adds "(key-value store)", which is only said after the break (K3-001), and drops the teacher's note that it is "very similar to what we discussed on word dictionary". Fix: remove "(key-value store)" or cite K3-001 in `depends_on`, and add the "very similar to the word dictionary" link to `detail`.

### Duplicates (within part 2)

- K2-010 / K2-021 / K2-060 / K2-080: all say "keep it simple". K2-010 adds "easy to build complex, hard to build simple; think only of what you need". K2-021 adds "no fancy B+ trees; complexity has its own disadvantages". K2-060 adds "simple enough that anyone understands; the beauty of system design". K2-080 is the end-of-topic summary (deciding -> development -> deployment). Merge into one or two items and keep each phrasing as `merged_verbatims`.
- K2-016 / K2-037: both say "the details matter; saying 'I'd replace it' or drawing boxes is easy". K2-016 adds imagining the code you would write. K2-037 adds the concrete checklist: where/how to upload, smooth transition, garbage data. Partial overlap; cross-link rather than merge.
- K2-053 / K2-057: both say "why poll 5,000 times for a weekly update". K2-057 adds the hedge "polling is good, I'm not against polling" and "someone can trigger something". Merge, keeping the hedge.
- K2-062 / K2-066: both say "reload the API server = what happens on boot". K2-062 is the hint (trigger a reload). K2-066 adds "equivalent to doing a deployment" and the boot steps (meta.json -> path -> file -> index -> hash map). Merge into K2-066, with K2-062's verbatim in `merged_verbatims`.
- K2-069 / K2-083: both say "a triggered deployment replaces Pub/Sub / endpoints". K2-069 adds "any deployment strategy, Jenkins / cloud provider, one invocation". K2-083 adds "out-of-the-box approach many engineers miss, same cost, we control our infrastructure". Partial; cross-link.
- K2-058 / K2-082: both describe REST/API endpoints that trigger a reload as the reactive alternative. K2-082 adds "one of three ways the teacher imagines, a little more complicated". Partial; cross-link.
- K2-039 / K2-042 (and K2-034): problems of a same-path upload. K2-039 lists them (fail, corrupt, reload needed because offsets mismatch). K2-042 adds "users see garbage for that duration, very poor UX". Partial; keep both, cross-linked through K2-041.
- K2-071 / K2-077 / K2-073: pointed GET reads on S3 without reading the whole file. K2-071 adds "GET not PUT, bare minimum, huge applications". K2-077 adds "simple key-value format to start, more complex later". K2-073 adds "can't just dump a JSON file; order ID -> details". Merge K2-077 into K2-071; keep K2-073 separate (tied to the multi-tier example).
- K2-007 / K2-018: both say "no repetitive entries in the served dictionary". K2-007 adds "ever increasing + duplicates". K2-018 adds the graveyard/compaction idea and "weekly -> clean it up directly". Distinct proposals; cross-link, don't merge.
- K2-013 / K2-015 / K2-029: writing at an offset overwrites the following bytes. K2-013 is the disk limitation. K2-015 is its consequence for "just replace it". K2-029 adds the rule "always create new entries (new file)". Partial; keep, cross-linked.
- K2-020 / K2-025: both say the merge is the merge step of merge sort. K2-020 adds "not naive, the best approach for this design". K2-025 adds the linked-list / sorted-arrays framing. Partial; cross-link.

### Duplicates across parts (involving part 2)

- K2-002 / K1-010: weekly changelog updates. K1-010 adds "say every Sunday, received over email". K2-002 adds "only the changelog arrives" and the apple/ball/zoo example. Merge, keeping both details.
- K2-007 / K1-020: the dictionary must not contain the same word twice. K1-020 adds "text editor readability, portability". K2-007 adds "file would be ever increasing". Merge or cross-link; keep both reasons.
- K2-071 / K2-077 / K1-119 / K1-120 / K1-121: pointed reads on S3, "magical", ton of applications. K1-119 adds "a database is a key-value store". K1-121 promises the applications that K2-071..K2-079 deliver. Merge K1-120 with K2-071; turn K1-121 into a `depends_on` link.
- K2-076 / K1-035 / K1-036: Athena queries CSV files on S3. K1-035/036 add "the dictionary simulates S3 + Athena". K2-076 adds the mechanism (an index kept handy next to the file). Merge, keeping the mechanism in `detail`.
- K2-072 / K2-074 / K2-075 / K3-113 / K3-114: multi-tiered (hot/cold) storage on S3 via pointed reads. K2 adds Amazon orders > 6 months, MySQL as the hot DB, and "not archival, cheap storage". K3-113 adds "to be built next week". K3-114 adds "S3 calls/network I/O not cheap, S3 not very performant, latency acceptable for infrequent reads". Merge K3-113 into K2-074, K3-114 into K2-075; don't drop the next-week reference.
- K2-067 / K2-069 / K3-116: rolling deployment to reload the API servers. K3-116 adds "cloud providers give it out of the box; load balancer stays, servers removed/added one at a time". Merge K3-116 into K2-067.
- K2-083 / K3-117: triggering a deployment instead of Pub/Sub / reload APIs; use the infrastructure we control. K3-117 adds the teacher's own war story (his services; first thought of Redis Pub/Sub). Keep K3-117 as its own `war_story` and cross-link it; don't merge the story away.
- K2-023 / K2-031 / K3-120: the update creates a whole new file with new header + index. K3-120 adds "the header is recreated". Merge K3-120 into K2-031.
- K2-022 / K3-121 / K3-123: sortedness makes the changelog merge efficient. K3-121 adds "sorting wasn't introduced at first because there was no need". K3-123 adds "O(n) instead of O(n^2); the merged file becomes next week's old file". Merge K3-121 into K2-022; keep K3-123's complexity numbers.
- K2-010 / K2-060 / K1-039 / K1-061: keep the design simple, that is its beauty. K1-061 adds "one number crunch -> one-level index". Cross-link (the principle recurs across topics).
- K2-061 / K1-115: how API servers know the dictionary path. K1-115 is static config (deployment discussion deferred). K2-061 replaces it with a static meta.json holding the path. Cross-link; this is an evolution, not a duplicate.
- K2-040 / K1-116 / K1-060: the index is loaded into memory on boot / first S3 call, then requests are served from it. Merge K2-040 into K1-116 (K1-116 is fuller); keep K2-040's framing for the garbage example via `depends_on`.
- K2-068 / K1-098: meanings don't change drastically, so temporary inconsistency across servers is acceptable. K1-098 says this about partially failed updates. K2-068 says it about eventual consistency during a rolling deploy. Cross-link.
- K2-047 / K1-029: portability = one file. K2-047 is the applied rejection (one file per word kills portability). Cross-link.
- K2-085 / K3-001: the after-break agenda vs the actual start of part 2 of the lecture (super fast KV store on commodity magnetic disks). K2-085 adds O(1) reads/writes/deletes, the file-format focus and "everyone uses it unknowingly". K3-001 adds "magnetic disk, best of everything". Merge.
- Cross-link, not duplicate: K2-018 (graveyard entries + later compaction, rejected for a weekly update) / K3-018, K3-043 (Bitcask's delete marker + merge & compaction for live updates). The teacher's "would work well when you are doing live updates" foreshadows part 3. Also K2-025 (merge = merge-sort merge, sorted) / K3-071 (Bitcask merge is NOT merge-sort, unsorted). Keep these as contrasts.
- K2-084 / K1-057, K1-058: the 1.7 MB index size. K2-084 reuses the number to argue for sending the index itself. Cross-link via `depends_on`.

### Validation

- `validate_ledger.py gaps gaps_part2.jsonl --prefix G2 ...`: `PASS gaps gaps_part2.jsonl (2 items) | errors 0 | warnings 0`
- `validate_ledger.py part part2.jsonl --prefix K2 --range 01:05:16-01:59:52 ...`: `PASS part part2.jsonl (85 items) | errors 0 | warnings 0`
