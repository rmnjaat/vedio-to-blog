# Lecture 10 - Review flags the board resolves

Source: `transcript/review_flags.md` (158 flags; the 124 TERM?/UNCLEAR/CHECK flags were each checked against the board). The transcript was NOT edited.
"Resolved" = the board shows the exact term at (or right next to) the flagged moment. "Supported" = the board shows the term in the same lecture/context, which makes the bracketed guess very likely, but not at the exact moment. Flags not listed (names, speaker labels, garbled phrases with no board counterpart) get no help from the board.

## Resolved (10)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F013 | 00:12:17 | [?sorting / asr: "starting"] | `Sort??` (00:08:45) is replaced during this exchange by `sort by key ⟶ efficient search` | b_001400.jpg |
| F023 | 00:24:50 | [?two / asr: "to"] | Index entries `apple, o1` / `amazon, o2` / `book, o3` written during this explanation | b_002630.jpg |
| F030 | 00:34:54 | [check: file names as heard] | Labels `index.dict` and `data.dict` written under the two files at 00:35:00-00:35:45 (board says ".dict", not "index.index.of dictionary"/"data.dictionary") | b_003545.jpg |
| F065 | 01:21:36 | [?uploaded / asr: "graduated"] | `upload to new S3 path` on screen 01:20:45-01:24:42 | b_012245.jpg |
| F071 | 01:30:01 | [?polling / asr: "pulling"] | `polling metafile` ↓ `meta.json` written 01:30:15-01:31:30 | b_013130.jpg |
| F079 | 01:38:45 | [?paths / asr: "parts"] | meta.json sketch `{ path: "____" }` on screen 01:30:15-01:43:15 | b_013945.jpg |
| F099 | 01:59:52 | [?update / asr: "upgrade"] | Superfast KV page on screen: `Brainstorm : r, w, up, del + persish` ("up" = update) | b_015900.jpg, b_020300.jpg |
| F111 | 02:12:23 | [?O4 / asr: "k4"] | In-mem map: `K1 → O1` (02:12:10) over-written to `K1 → O4`, arrow re-pointed to the `K1 V1'` row (02:13:45) | b_021210.jpg, b_021345.jpg |
| F130 | 02:35:31 | [?order one / asr: "order by"] | `Strengths of this DB : O(1) reads, writes, deletes` on screen from 02:35:30 | b_023530.jpg |
| F143 | 02:51:06 | [?Bitcask implementation / asr: "bit custom repetition"] | `What we just designed is Bitcask` and the Riak/Bitcask page on screen through 02:51:57 (board shows "Bitcask"; "implementation" is not written) | b_025130.jpg |

## Supported (12)

| Flag | Time | Marker | Board evidence | Frame |
|---|---|---|---|---|
| F029 | 00:33:21 | [?byte / asr: "by"] | `170,000 x ( 4.3 + 4 + 2 )` → `(10.3 x 170,000) B` (B = bytes); later header fields written as `4B` | b_003330.jpg, b_004433.jpg |
| F039 | 00:43:11 | [unclear: "Mixed 8th byte."] | Header line `→ OUR_DICT - 8B` (8 written like `g`) written around this moment; the board shows 8 bytes for the name, not the unclear wording | b_004400.jpg |
| F043 | 00:50:51 | [check: may be the teacher labelling the board] | The teacher writes the label `API Servers` under the three servers at 00:49:45-00:51:00 | b_005100.jpg |
| F076 | 01:35:05 | [?reactive / asr: "reactor"] | Prepared notes `2. Reactive: PubSub` (shown 01:26:30) | b_012642.jpg |
| F081 | 01:40:44 | [?versioning / asr: "bursting"] | Versioned paths `S3:// wd/ dict1.dict` / `S3:// wd/ dict2.dict` (01:27); header field `Version` | b_012730.jpg, b_004445.jpg |
| F087 | 01:44:24 | [?recent / asr: "reset"] | `Multitiered Storage → historical orders on S3 / lakst [latest] orders on MySQL` (board says "latest", not "recent") | b_014745.jpg |
| F097 | 01:50:21 | [?API server / asr: "all server"] | `API Servers` label on the serving and update diagrams; `Deploy` arrow to the API servers | b_014315.jpg |
| F100 | 02:04:48 | [unclear: "magnet is discard best"] | Written right after: magnetic-disk platter with `Append only` / `Zero seek` / `no big mech movement` / `Best we can do!!` (the phrase is likely about the magnetic disk being best for append-only; exact words not on the board) | b_020545.jpg, b_020615.jpg |
| F101 | 02:04:48 | [unclear: "magnet is discard best"] | Same as F100 | b_020615.jpg |
| F113 | 02:14:35 | [?file / asr: "pile"] | The single append-only file drawn; `File grows huge!!!` written at 02:15:45 | b_021545.jpg |
| F120 | 02:21:10 | [?deleted / asr: "related"] | Prepared notes: `all immutable files are merged & compacted → stale entries skipped / deleted entries skipped` | b_023515.jpg |
| F156 | 03:05:12 | [?order n / asr: "order and"] | Prepared notes `merge in O(n)` / `How is merge O(n)?` / `Merge → Merging of two sorted lists` (01:43:30-01:43:39) | b_014330.jpg, b_014339.jpg |

## Related notes (not flags)
- Riak: the board writes `Riak` four times (`as Backend for Riak`, three `Riak` nodes) - confirms the transcript's "React" → Riak correction at 02:38-02:40.
- Bitcask record: board order is `CRC | TS | KSZ | VSZ | K | V`, `Timestamp for conflicts` - matches audio 02:31:36.
- Index size: the live board uses 170,000 words and avg length `4.3` (F028's "4.4" is not on the board) → 1.751 MB. The prepared notes shown at 01:43:35 use different numbers: `Total words: 171476`, avg `4.7`, `+ 3 + 2x4`, `≈ 2.6 MB`. Worth a check before publishing either figure.
- Prepared index entries carry offset and length (`apple: 100, 1024`; cut-off lines like `127:130`, `257:100`), while the live index stores only an offset (`apple, o1`). The live in-memory record later becomes `File ID | VSZ | VPOS | TS`.
- Header: the board first wrote `St offset of data` (start offset) and then replaced it with `index size`, matching audio 00:42:21 ("start offset of data. Or rather ... index size"). Magic name: board `AOBB`, audio "AODB".
- F121 ([?sawtooth]): the sawtooth disk-usage graph is drawn at 02:23:00 (b_022300.jpg) and again in the prepared notes, but the word "sawtooth" is never written.
- F014 ([?shard]): the board only has `can we have multiple files??` (00:14:00, erased by 00:20:30); "shard" is not written.
- `5000x gain` (prepared notes, 02:26:30) for append-only writes on HDD is a strong number with no source on the board; send to fact-check.
- Spellings on the board that should not be copied: `updakd`/`updak` (updated/update), `inconsiknoy` (inconsistency), `byk` (byte), `Poinkd` (Pointed), `attachd`, `Netwok`, `tranfer`, `lakst`, `loosing`, `persish`, `carroupt`, `musl fil`, `Eazy`.
