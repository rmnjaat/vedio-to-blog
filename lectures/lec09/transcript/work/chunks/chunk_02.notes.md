# chunk_02 notes (lec09, 00:11:10-00:23:34, segments #169-#391)

## New technical terms / names (not in term_decisions)
- "cloud player" 00:11:25 -> Cloudflare (TERM medium). Teacher lists "Akamai Cloudflare, pick your favorite" at 00:10:53 and 00:18:42. Suggest adding "cloud player" as an ASR form of Cloudflare.
- "your Cloud Fair" 00:13:18 (split across segments "your Cloud" / "Fair or command whatnot") -> Cloudflare (TERM medium). Suggest adding "Cloud Fair" as an ASR form.
- New ASR forms of the A#1 domain arpitbhayani.me, corrected (TERM medium): "artedhany.me" 00:14:00, "urbanvary.me" 00:14:05. Lead may want to add them to A#1.
- New ASR form of A#5 mycdn.net: "A.mycedian.net" 00:13:41-00:13:56 (4x) -> a.mycdn.net (TERM high, same pattern as mycedient/mycedon; "Cedian" = CDN per A#7). Suggest adding it to A#5.
- "strastatic" 00:22:09 (2x) -> "slash static" (WORD medium; the configured origin path is "arpitbhayani.me slash static").
- "Jiffy" 00:17:25 kept + `[?Giphy | asr: "Jiffy"]`. Lead decision: together with "GP" 00:17:19 (kept as `[unclear: "GP"]` per A2) this looks like **Giphy** ("I have a video on my YouTube channel on how GP uses CDN ... how beautifully Jiffy leverages CDN"). If confirmed, both could become "Giphy" (the A2 row for "GP" would need to change).

## Flags placed (lead may decide)
- 00:11:47 `[unclear: "after my cloud"]` - "mycdn.net is the provider after my cloud or anything" (Akamai, Cloudflare?).
- 00:13:00 `[?arpitbhayani.me | asr: "any.me"]` - per A#1.
- 00:13:27 `[?Akamai | asr: "command"]` - "your Cloudflare or command whatnot".
- 00:14:18 `[unclear: "the engine"]` - "you don't have to configure the engine every url on cdn" (each and every?).
- 00:15:18 `[?the image | asr: "damage"]` - "It would generate damage like it always does."
- 00:15:27 `[?https://a.mycdn.net/systemdesign/logo.png | asr: "hddpscollegs.a.mass.edn.net.systemdesign.logo.png"]` - URL read aloud, garbled.
- 00:15:57 `[check: start of next sentence possibly lost by ASR]` - "have to configure every single path on CDN." has no subject; meaning (do / don't) depends on the lost start (context, 00:14:18 and 00:16:00, says you do NOT have to).
- 00:17:19 `[unclear: "GP"]` - per A2.
- 00:20:21 `[check: demo file name]` - arpid.png / arpitbhane.png / arpidbhani.png kept as ASR wrote (A#3); "imd" -> "img" corrected (A#3 rule, path next to "static").
- 00:20:50 `[check: possible ASR duplicate]` - REPEAT-SEG #326, kept per structure note.
- 00:22:05 `[unclear: "essays"]` - "let's say go to essays oh sorry i have not configured it" (a path on the site?).
- 00:22:33 `[unclear: "veritical"]` - "Theoretical, veritical, it's all okay."

## Kept as spoken (not errors)
- "We don't need hundreds of us to serve those things. Two servers more than that" 00:18:04-00:18:08 (hundreds of servers? / few servers?) - kept, not flagged.
- "not even handing the request anymore" 00:18:15 (handling) - kept.
- "This is the config out string." 00:21:16, "Normal." 00:15:13, "I brought like a.mycdn.net." 00:19:53 - kept.
- "Okay." #299 00:19:11 and #365 00:22:38 (PHRASE candidates) = real teacher back-channel, kept.
- "Netflix also uses CDN" repeated by the student 00:23:09 / 00:23:14 - kept both.

## Speaker doubts
- none. 00:22:43 "Go on, Rahul." = Teacher; STUDENT_1 00:22:44-00:23:30 = Student 1 (Rahul) per speaker map. Turn ends at chunk seam; 00:23:34 STUDENT_5 "Don't jump." belongs to chunk_03.

## Verifier note
- PASS (retention 99.46%, additions 0.39%). Three single-word "dropped" runs (`cdn` 00:15:20, `this` 00:19:42, `cdn` 00:21:08) are aligner noise on repeated words; the words are present in the text ("Sends it to the CDN. CDN caches it", "This is an image.", "It went to my CDN. CDN saw").
- Paragraph at 00:21:35 merged into the 00:20:18 paragraph because segment #344 starts at 1294.88 s (displayed 00:21:35, but before the 00:21:35 block bound); next paragraph starts [00:21:40].
