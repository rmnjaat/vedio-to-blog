# chunk_14 notes (lec07, 02:39:19-02:50:24)

## New technical terms / ASR forms not in term_decisions

- `Malak` (02:46:55) -> malloc: new ASR form of row A13 (non-word in a malloc sentence). Corrected, TERM high. Add to A13's ASR forms.
- `sec faulted` (02:41:24) -> segfaulted: verb form of row A15. Corrected, TERM high.
- `c plus plus` (02:39:25) -> C++: lec05 row "C, C++". Corrected, TERM high.
- `bad alloc` (02:39:25): C++ `std::bad_alloc` exception. Kept as spoken (no underscore).
- `literal rose` (02:45:07) -> literal rows (WORD medium). `people rose` just before it left as `[unclear: "people rose"]` (pull rows? / table rows?).
- Flagged only, not corrected:
  - `cities` 02:41:42 -> `[?CDCs]`
  - `ends` CDCs 02:42:28 -> `[?N]`
  - `content` / `containing` 02:42:42-02:42:46 -> `[?contend]` / `[?contending]`
  - `eps server` 02:46:11 -> `[?API]`. Same unknown acronym as "EPS (00:31:03)" in Open questions. Here the context is clearly API server ("API events", "API server published" 02:43:40), so 00:31:03 may be the same thing.
  - `would be anything` 02:46:16 -> `[?an event]`
  - `comes in hands` 02:46:16 -> `[?handy]`
  - `filled it with once` 02:41:18 -> `[?ones]`
  - `memory patching` 02:47:57 -> `[?paging]`
  - `lower your head` 02:48:16 -> `[?hand]`
  - `want to emit` 02:49:53 -> `[?evict]`
  - `recency buyers` 02:50:08 -> `[?bias]`
- `it's a paging rights` 02:47:45 kept as `[unclear: ...]` per A5.

## Names

- `Anubhaf` (02:48:20): the teacher calls this student, and STUDENT_5 answers at 02:48:22 ("Hey, Arpit"). Probably "Anubhav". It is not in the lec07 student-name list. I kept the ASR form and added `[check: name spelling]`.
- Speaker map correction: the speaker map says STUDENT_5 at 02:48:22 is Gaurav, but that is wrong. "Gaurav, go on" (02:48:09) is answered under the TEACHER label at 02:48:12 ("Mine were the general questions"). I relabelled that line Student 6 (Gaurav), since Gaurav = STUDENT_6 at 02:38:57. The teacher then says "I know. Sorry ... Anubhaf, go on", and the STUDENT_5 turn at 02:48:22 is Anubhaf. The lead should update the speaker map.
- "Rajiv" is attached to the Student 3 turn at 02:39:19, which follows the teacher's call "rajiv go to my lock page" at 02:39:05.

## Speaker doubts

- 02:42:24-02:43:03: diarization lags by a phrase in the CDC Q&A. I made 4 SPLITs (log rows 10-13, medium). "Okay. There are two. Multiple tables." (02:43:02, STUDENT_3) is kept as the student's.
- 02:42:13 "Active standby both works": possibly the teacher answering inside the Student 3 segment. Flagged `[check]`.
- 02:43:40 STUDENT_3 segment: "Are you talking about API service? Yes. API service. They read from API events ..." may contain the teacher's clarifying question and answer. I kept it as Student 3 and flagged `[check]`.
- 02:46:06-02:46:16 "okay understood" / "Yeah, sure" inside the teacher turn may be Student 3 back-channels. Flagged.
- 02:46:26-02:47:31 malloc exchange: 5 SPLITs at grammar boundaries (log rows 21-26). "whatever you discovered was" (02:46:31) could still be Student 3. Flagged.
- 02:49:01 "So that becomes an expensive operation. So we need." (TEACHER) may be Student 5 continuing. Flagged.

## Other

- The timestamp for "Got it." is written `[02:49:18]`, the floor of the real segment start (10158.7 s). The raw display rounds it to 02:49:19. With 02:49:19 the verifier's block boundary (snapped to 10159) split "got it" into a drop+add pair across blocks. I did not change the content or the thresholds.
- Topic candidates: 02:41:42 (CDC instances / load Q&A) and 02:48:22 (set memory growth, LRU vs LFU Q&A). The chunk opens mid-way through the malloc Q&A that started in chunk_13.
