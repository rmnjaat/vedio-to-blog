# chunk_15 notes (lec04, 02:45:51-02:59:03)

## New technical terms / names (not in term_decisions)

| Time | ASR text | Handling | Note for lead |
|---|---|---|---|
| 02:48:10 | "configure AI based persistence on Redis" | `[?AOF \| asr: "AI"]` | AOF (Redis persistence) fits; "AOF" used at 00:56:15. Could promote to TERM medium if lead agrees. |
| 02:48:10 | "I'll get on this persistence" | `[?on-disk \| asr: "on this"]` | guess only. |
| 02:49:27, 02:49:44 | "handling searches", "react with searches" | `[?surges \| asr: "searches"]` (2x) | Student 8 said "sudden surge" (02:49:05); teacher likely echoes "surges". Real word, so flagged not corrected. |
| 02:52:27 | "we are rigid as we can code anything" | `[unclear: "we are rigid as"]` | maybe "we are engineers". |
| 02:52:42 | "amrik gaur" | kept as "Amrik Gaur" + `[check: name spelling]` | name called before the connection-pool question; next turn labelled `Student?` (not attached because spelling unsure — maybe "Amrik" / "Gaurav"). |
| 02:52:57 | "just a portion out of curiosity" | `[?question \| asr: "portion"]` | |
| 02:53:03 | "one DBI" | `[?DB \| asr: "DBI"]` | per term_decisions open question. |
| 02:54:52 | "I think at a also mentioned" | `[?Arpit \| asr: "at a"]` | student referring to the teacher (Arpit). |
| 02:55:22 | "supports, uh, at packs, 1000" | `[?max \| asr: "packs"]` | next sentence "maximum connections of 1000". |
| 02:55:34 | "a repair server" | `[?per server \| asr: "repair server"]` | |
| 02:57:08 | "fogging up the database connections" | `[?hogging \| asr: "fogging"]` | |
| 02:57:39 | "the places where it can bring" | `[?break \| asr: "bring"]` | |
| 02:47:19 | "primary DVO worker" | `[unclear: ...]` | per term_decisions. |

## Speaker doubts

- Diarization in this chunk is very poor: TEACHER label carries student speech (DK 02:46:47-02:47:34, the 02:52:51 and 02:53:48 questions, 02:54:17), STUDENT_1 (teacher) carries student words, label switches lag mid-sentence. Splits logged as SPEAKER/SPLIT (medium where content-based only).
- DK exchange 02:47:24-02:48:04: alternation DK / Teacher / DK / Teacher is inferred from content ("I'm not able to... clearly defined" / "you are on the right" / "That's what you're saying") — medium.
- `[check]` left on: "Correct." (02:46:28), "Okay. Got it. Got it." (02:46:42), "Got it." (02:48:28), 02:50:05 "Correct, but with redis you have to manage..." (may be Student 8 summarizing), "Okay, thanks, I should use it." (02:52:42).
- 02:53:47 first "Okay." placed at end of teacher turn; the following "Okay. Okay." given to the student (could be either; split also avoids verifier stutter-collapse artifact across raw segments).
- 02:53:48 and 02:54:17 questions: `Student?` — likely same student as 02:52:51 ("One more question").
- 02:51:22 STUDENT_14 "Yeah." labelled Student 14.
- Student 5 (02:50:11, 02:51:52) may be "Surya" (called at 02:45:12 in chunk_14, answered by STUDENT_5) — not attached.

## Other for lead

- Verifier reports 2 one-word "drops" (02:53:48 `okay`, 02:54:17 `that`): artefacts of immediate-repeat collapsing across raw segments ("Okay. Okay." / "optimize that? That was"); text is fully present.
