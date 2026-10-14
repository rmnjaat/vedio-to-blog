# lec03 follow-up fixes

**Verification:** `site.sh build lec03` ok (13 pages); `gates_followup.txt` ends **GATES PASS** (coverage 314/314). QA `followup_shots` (1440, 390): no failures. Viewed fig/390-light+dark-fig-4a, step/390 fig-5a s1/s3 and fig-7d s6, plus 390 sweeps of 5-central-services and 7-instagram. No shared files changed.

| id | change |
|---|---|
| C-16 | `figures/lec03/s4-id-size.tsx:19-39,50,59-62`: on phones, "8 B / entry" and "20 B / entry" now sit on their own lines under each bar. The bubble sits between the bars and covers nothing. |
| C-03 | Removed narration in `s5a:41,43,45`, `s4:116`, `s2:101,198,240`, `s3:234`, `s5b:63`, `s6:84`, `s7:32,97,118,126`, `s8:52,127` and `s9:78`. Each claim is kept. Required attributions now read "lecture's view/practice". |
| C-17 | No change. It is a capture artifact: fig-5a step 1 is cut in the element shot but whole in the 390×844 viewport sweep (`sweep/390-light/5-central-services/005.png`). fig-7d step 6 is not reachable by sweep, but it uses the same panel. |
| F-019 | `s1-why-own-ids.mdx:116`: changed to "an evolution that comes later". |
| N-01 | `s7-instagram.mdx:79`: changed to "a handful of machines". |
| N-02 | `s5a-central-services.mdx:110`: added the tag [[L-0175 L-0176]]. |
| Exam | 127/127. No change. |
