# chunk_11 notes (lec07, 02:01:38-02:14:21, segments #2155-#2384)

## New technical terms / names (not in term_decisions)

| Time | ASR form | Used in transcript | Decision needed |
|---|---|---|---|
| 02:05:21 | network hog | network hop (TERM high, log 06) | Add row "hop / hog". Evidence: "add a network hop" 02:05:28. |
| 02:08:07 / 02:13:17 | consistent dashing / consistent rushing | consistent hashing (TERM high, log 08, 17) | Add these ASR forms to the consistent hashing row. |
| 02:10:45 | data moments | data movement (TERM high, log 10) | Add row. Evidence: "does not do data movement" 02:12:48. |
| 02:02:24 / 02:02:27 | I'll take your caution / I'll take the caution | `[?question \| asr: "caution"]` (flag) | Teacher asks a student to lower their hand. Probably "question". "caution" is a real word, so I flagged it and did not correct it. |
| 02:04:36 | make your plan smarter | `[?client \| asr: "plan"]` (flag) | Teacher's recap of option 2 (smart client). The teacher says "make my client smarter" at 02:05:21. |
| 02:04:48 / 02:04:54 | and forth / For very standard way | `[?fourth \| asr: "forth"]`, `[?Four \| asr: "For"]` (flags) | Teacher is counting the four routing options ("These are four very common practices" 02:04:11). |
| 02:06:57 | ask you to go right on master | `[?write \| asr: "right"]` (flag) | Redis replica redirect. "Replica doesn't take rights" -> writes is covered by A5. Row A5 says other "right" forms stay, so this one is flagged, same as the chunk_02 precedent. |
| 02:08:30 | range based partistic | `[?partitioning \| asr: "partistic"]` (flag) | Not a real word. Could be "partition" or "partitioning", so flagged. |
| 02:08:42 | That is hash based out. | `[?hash based routing \| asr: "hash based out"]` (flag) | The teacher says "That is hash based routing" at 02:09:33. |
| 02:11:02 | but determines it again | `[?deterministic \| asr: "determines it"]` (flag) | The teacher says "but deterministically" at 02:10:00. |
| 02:13:51 | exploring considering everything | `[?consistent hashing \| asr: "considering everything"]` (flag) | The next words are about drawing the ring. |
| 02:02:53 | I guess what for request? | `[unclear: ...]` | Garbled. This is the desk person's reply in the bank analogy. |
| 02:04:22 | Take your favor. | `[unclear: ...]` | Possibly "Take the first one" (the peon option). Not guessed. |
| 02:13:29 | Hardly one R3. | `[unclear: "one R3"]` | Possibly "one hour"? (how long it takes to implement). Not guessed. |
| 02:09:17 | A to T are owned by cache 2 | kept as spoken | Probably "K to T", since the ranges are A-J / ?-T / U-Z. It could be an ASR error or something the teacher misspoke, so it is kept with no flag. The board can confirm it. |
| 02:11:02 | So let's say split out 0 | kept as spoken | Probably "spits out". Kept. |
| 02:03:26 | Interplanetary File System, IPFS, BitTorrent, overlay network, Bitcoin, DNS | as written | Casing only. Bitcoin is not in the name list yet. |

## Speaker doubts

none. The whole chunk is a TEACHER monologue. Nobody else speaks in it: the hand-raise at 02:02:24 is the teacher talking to a student.

## For the lead

- Hallucination candidates in range: #2169 "There is no pune." REPEAT-SEG is kept as an emphatic repeat with `[check: possible ASR duplicate]`, as the structure notes say. #2229 "Everyone has advantages." is not a duplicate: #2228 says "disadvantages". #2252, #2267 and #2288 "Okay." are real back-channel. #2224 and #2341 RATE are fast speech. Nothing was removed.
- Admin marks: 02:02:24 (hand-raise aside) and 02:06:20 "Just a minute."
- Paragraph [02:11:45]: I split it there so that the block boundary snaps to a segment whose float start (7905.10) is not below its displayed stamp. #2352 shows as 02:12:00 but its float start is 7919.88, which made the block-2 add check fail when it was the first paragraph after the boundary. No text was moved or removed.
- Verifier lists four single-word "drops" (you, you, ki, it). All four words are in the corrected text. They are token-alignment artefacts, and the result is PASS.
- Topic candidates: 02:07:26 (availability / scaling by adding a node), 02:08:02 (consistent hashing), 02:08:22 (hash-based routing and data movement), 02:12:00 (what consistent hashing solves: ownership).
