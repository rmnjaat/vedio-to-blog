# chunk_01 notes (lec08, 00:00:02-00:12:34)

## New technical terms / names (not in term_decisions)

- "the score access pattern" 00:03:45 -> flagged `[?core | asr: "score"]` (teacher says "core property" 00:03:35, "the core ways" same sentence). Lead: correct to "core" if wanted.
- "focus on things that pattern" 00:07:41-00:07:47 -> flagged `[?matter | asr: "pattern"]` (teacher said "Focus on things that matter." 00:05:55).
- "systems are a professor" 00:10:45 -> flagged `[?our | asr: "are a"]` (probably "distributed systems, our professor").
- "published 50, 20 papers and you got in distributed systems" 00:10:57 -> `[unclear: "and you got"]`; "50, 20" kept as spoken.
- Names: Rahul (00:05:13, already in term_decisions). Products: NGINX, Redis, Discord, relog, Slack, S3, Twitter/Facebook/Instagram/WhatsApp/TikTok, Facebook.com - casing only.

## Speaker doubts

- STUDENT_5 00:08:44-00:09:00 relabelled Teacher (speaker map; one SPEAKER log row). No other doubts - whole chunk is teacher monologue.

## Hallucination candidates decided

- #30 00:02:30 "That's it." (REPEAT-SEG of #29, same start time) -> kept both + `[check: possible ASR duplicate]` (emphasis plausible after "Hardly 10 lines of core code").
- #59 00:04:29 "links links links links" -> kept as spoken (emphatic complaint about link-flooded Discord); no LOOP row.
- #77 "so", #141 / #150 "Okay.", #195 RATE 7.4 w/s -> real speech, kept.

## For the lead

- "Rahul please go and view it" 00:05:13 flagged `[?mute it | asr: "view it"]` per open question (background-noise context); marked inline `*(admin)*`.
- Admin span: agenda 00:00:02-00:04:15 is the teacher's agenda (topic-candidate marked admin per structure notes); feedback 00:04:15-00:09:03 admin.
- Verifier lists 1 dropped word `that` at 00:05:30 although "refer to that. That didn't work out well" is present in the output - tokenisation/alignment artefact, does not fail.
