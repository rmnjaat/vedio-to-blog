## Part 1 (00:00:00-01:04:29)

### Windows

"Covered" = part-1 items whose first audio range starts in the window. I checked every transcript sentence in each window against the ledger.

| Window | Covered | Missed | New items |
|---|---|---|---|
| 00:00-00:05 | 16 (K1-001..016) | 0 | - |
| 00:05-00:10 | 11 (K1-017..027) | 0 | - |
| 00:10-00:15 | 9 (K1-028..036) | 0 | - |
| 00:15-00:20 | 10 (K1-037..046) | 0 | - |
| 00:20-00:25 | 9 (K1-047..055) | 0 | - |
| 00:25-00:30 | 7 (K1-056..062) | 0 | - |
| 00:30-00:35 | 9 (K1-063..071) | 0 | - |
| 00:35-00:40 | 10 (K1-072..081) | 1 | G1-001 |
| 00:40-00:45 | 9 (K1-082..090) | 0 | - |
| 00:45-00:50 | 7 (K1-091..097) | 0 | - |
| 00:50-00:55 | 8 (K1-098..105) | 0 | - |
| 00:55-01:00 | 7 (K1-106..112) | 0 | - |
| 01:00-01:04:29 | 11 (K1-113..123) | 0 | - |

Part 1 has dense coverage. Every technical window has 7-16 items. The windows with the lowest counts are the two GitHub demo windows (00:45-00:55) and the 00:25-00:30 Q&A, and their content is fully covered. Only one fragment was missed: G1-001, a speaker-uncertain remark that the separate upload service lowers bandwidth "by being closer to the user". It is low confidence. Two more uncaptured nuances belong inside existing items, so they are listed under Distortions (K1-085, K1-075). They are not new items. I did not count these as misses: the YouTube-ID file-naming convention (00:46:28), the "two systems" framing (00:05:57), and the call-back to "Prashant Raji" (01:03:31). They are trivia or admin.

Verbatims: 123/123 found word for word. The part validator says `PASS part part1.jsonl (123 items) | errors 0 | warnings 0`.

### Distortions

- **K1-019**: says a CDN "is not merely 'there to cache things'". The teacher does not deny that a CDN is a cache. What he challenges is that people don't know *how* it caches and imagine pushing content to it. Transcript: "A lot of people only think, hey, CDN is there just to cache things. But how? No, I'll push things to CDN. CDN is not something where you push things." Fix: statement -> "Many people only think 'a CDN is there just to cache things' without knowing how, and imagine pushing content to it; a CDN is not something you push things to - although CDNs now offer APIs, that is not their main motive - it sits transparently in front of the origin."
- **K1-043**: "you need only a couple of servers instead of hundreds" rests on a garbled sentence, and the item has no flag. Transcript: "We don't need hundreds of us to serve those things. Two servers more than that, because everything else is served from the CDN." Fix: statement -> "...you do not need hundreds of servers to serve that content..."; detail -> "garbled: 'Two servers more than that'"; add flag `check: "We don't need hundreds of us ... Two servers more than that" garbled`; confidence high -> medium.
- **K1-116**: the parenthetical "(durability)" is an inferred term the teacher never used. Transcript: "S3 gives you nine nines guarantee, something like that. Right. CDN gives you different guarantees. They give you better response time." Fix: drop "(durability)" and keep "something like a nine-nines guarantee".
- **K1-113**: puts the Bhopal location under Akamai. The teacher said "CDN" there and gave the Akamai regional breakdown separately. Transcript: "But CDN has one in Bhopal. Akamai has three in North India, two in Northeast, three in West and four in South." Fix: "a CDN has one in Bhopal; Akamai has three in North India, two in the Northeast, three in the West and four in the South". Note for the fact-checker, with the teacher's numbers left unchanged: the regional breakdown sums to 12, not the "at least 18" stated.
- **K1-105**: "the next load comes from the CDN and is faster" interprets a garbled phrase, and the item has no flag. Transcript: "Now the next time when I load it, it is coming from CDN. You see the high increase in loading time. It's because it is coming from [?CDN | asr: "seed"]". Fix: add flag `check: "high increase in loading time" (speed-up meant?)` and keep confidence high only if the board/video confirms. Otherwise set it to medium.
- **K1-068**: the "about 5 MB" figure comes from the turn that carries the transcript's speaker-boundary flag. K1-067 has that flag but K1-068 does not. Transcript: "**[~00:33:06] Teacher:** How big? 5MB? Yeah, probably. Yeah, 5MB. [check: speaker boundary 00:33:00-00:33:10]". Fix: add flag `check: speaker boundary 00:33:00-00:33:10`. Confidence can stay high, because "5 MB is peanuts for an HTTP server" (00:33:06-00:34:01) is clearly the teacher.
- **K1-055**: speaker is `student (question)`, but the insight is the teacher's answer, so the skill rule says the speaker is the teacher. Transcript: "**[00:24:56] Teacher (answer):** We'll send it from the backend, right?" Fix: speaker -> `teacher`.
- **K1-059**: says more than the teacher said ("the browser requests the CDN URL it was given, and the CDN forwards to the origin"). The teacher only asked a rhetorical question. Transcript: "Correct. It does not make call to Akamai. Who is calling? Who is making call to Akamai?" Fix: statement -> "The website (origin) does not make a call to the CDN (Akamai); the teacher posed 'who is making the call to Akamai?' as a rhetorical question"; move the browser/CDN-forwarding explanation to detail as "implied by K1-032/K1-034".
- **K1-085**: drops the teacher's hedge that opening the bucket is still possible. Transcript: "So which is why S3 cannot open. You can still do it, but in this use case, you don't have to do it, but you still want to directly upload image to S3." Fix: add to detail: "The teacher noted you can still open the bucket, but in this use case you don't have to; pre-signed URLs give direct upload without it."
- **K1-075**: the teacher's follow-up reason ("which would lower network bandwidth", possibly "by being closer to the user") is not captured. It is speaker-uncertain. Fix: either cross-link G1-001 via `depends_on`, or add one detail line referencing it. Do not merge, because G1-001 carries its own speaker flag.
- **K1-015**: drops the hedge on ChatGPT's backend. Transcript: "Back-end, it's all going to be Python and whatnot, that same tech stack there." Fix: statement -> "...whose backend is presumably ('it's all going to be') Python, the same stack".
- **K1-091**: the statement writes "github.com/upload/policies/assets", but the teacher read out "policy". This is a silent correction. Transcript: "it made the request to github.com slash upload slash policy slash assets." Fix: use "github.com/upload/policy/assets" as said, or add flag `check: path read from screen ("policy" vs "policies")`.
- **K1-011**: drops the teacher's number "six components" (he listed five). Transcript: "this is where you see those six components that we discussed in the first week. Caching, database, communication, asynchronous processing, scaling". Fix: statement -> "...the six components discussed in the first week (five named: caching, database, communication, asynchronous processing, scaling)".
- **K1-014**: the detail "keeping an eye on trends shows how startups get their edge" is a loose paraphrase. Transcript: "keeping an eye on it makes you wonder that how startups have this very invincible power." Fix: detail -> "Keeping an eye on it makes you wonder how startups have this 'invincible' power." Minor.

### Duplicates (within part 1)

- K1-040 / K1-041: both say that for a CDN content is "just a set of bytes". K1-040 adds the list (API/JSON responses, text files, images, videos, fragments). K1-041 frames it as the misconception "I can only cache images on CDN". Merge into K1-040 and keep K1-041's misconception framing in detail.
- K1-080 / K1-088: both describe the 2x transfer (5 + 5 MB vs 1 x 5 MB). K1-080 adds the saved bandwidth on the service and "you pay for 2x". K1-088 adds "flexible and efficient" and "no bulky image upload servers". Merge, keeping both reasons.
- K1-083 + K1-084 / K1-087: K1-087 is the teacher's own one-line recap of the preparation and upload phases. K1-083 adds the random image ID, the S3 path example and "short-lived". K1-084 adds the POST method. Merge K1-087 into K1-083/K1-084, or keep K1-087 as the recap and cross-link it. Don't drop the random-ID and POST details.
- K1-054 / K1-118: both say AWS keys are configured on the CDN for private buckets. K1-054 adds that it is a plugin-like feature and that not every CDN supports AWS. K1-118 adds "a signed URL is needed only for private images" and "otherwise access directly". Cross-link via `depends_on` (it already is), or merge into K1-054 with K1-118's Q&A framing in detail.
- K1-036 + K1-037 / K1-038: K1-038 summarises the miss and hit flow ("that's all a CDN does"). It adds the "configure property + origin, any path" framing, which overlaps K1-035. Keep K1-038 as the summary only if the page needs it. Otherwise merge it into K1-037.
- K1-034 / K1-048: both describe swapping the CDN host for the origin. K1-034 is the generic a.mycdn.net mapping lookup. K1-048 adds the teacher's phrase "normal string concat / string replacement" from the demo. Merge into K1-034 and keep the "string concat" wording.
- K1-024 + K1-025 / K1-031: K1-031 ("near static and huge in size") restates K1-024 (near static) plus K1-025 (huge). K1-031 adds only that this is the part to put on the CDN. Merge into K1-024/K1-025 as detail.
- K1-056 / K1-060: both say the backend is responsible for sending the CDN URL and the frontend just renders it. K1-056 adds the IMG tag and "you don't send CDN configuration to the frontend". K1-060 adds "frontend is utterly stupid". Merge and keep the catchphrase.
- K1-055 / K1-056: partial. K1-055 is the Q&A (the backend sends it in the API response or HTML). K1-056 is the IMG-tag mechanism. Cross-link instead of merging.
- K1-019 / K1-062: partial. Both say "you don't push to a CDN". K1-019 is about the general model. K1-062 is about invalidation (an API call invalidates a path, then a miss goes to the origin). Keep both and cross-link (already linked).
- K1-028 / K1-050 / K1-053 / K1-121 (+ K1-057): the "sign up and play with a CDN" advice is repeated four times. K1-028 names the free trial and providers. K1-050 adds "a dollar or two is peanuts". K1-053 adds "before asking about private content". K1-121 adds "$100 = 7,000-8,000 rupees, also S3/AWS". K1-057 adds "understand how the web works". Merge into one learning-approach item and keep every number and condition.
- K1-097 / K1-098: both say the S3 endpoint is normal and the pre-signed fields go in the POST body. K1-097 adds that GCP and Azure have equivalent patterns. K1-098 adds "the upload URL is just the bucket endpoint". Merge.
- K1-109 / K1-048: partial. Both cover string concatenation of the CDN prefix onto the path. K1-109 applies it to S3 bucket name -> CDN host. Cross-link (already linked).

### Duplicates across parts (involving part 1)

- K1-054 / K1-118 / K1-119 vs K2-031: K2-031 repeats "the AWS keys are uploaded to the CDN so it can read from S3 when the bucket is private". Part 1 adds the plugin nuance, that not every CDN supports AWS, the normal AWS SDK read (no signed URL), and native S3 integrations (K1-120). K2-031 adds that this sits in the post-serving flow. Cross-link. K2-031 can keep the "CDN sits between user and S3" context.
- K1-040 / K1-041 vs K3-007: "a CDN caches JSON API responses, not only images; it does not care whether it is an image, JSON or text". K1-040 has the fuller list (fragments, videos). K3-007 applies it to the hashtag API. Merge into K1-040 and keep K3-007's hashtag application as detail or as a separate application item.
- K1-061 / K1-062 vs K3-009: TTL or explicit invalidation. K1-061/K1-062 are the general mechanism ("invalidation is an API call, not a push"). K3-009 is the hashtag case (invalidate when the top 100 or the count changes). Cross-link; don't merge.
- K1-105 vs K2-035: the CDN miss reads from S3, caches and returns; a hit returns directly. K1-105 is the GitHub demo (origin configured as the S3 bucket, the second load is faster). K2-035 is the Instagram design (instacdn.net). Merge or cross-link, keeping both examples.
- K1-109 / K1-095 vs K2-034 / K2-020: the backend builds the CDN URL by string concatenation. K1-109 says "replace the S3 bucket name with the CDN host". K2-034 adds the exact parts (CDN prefix + user ID + random image ID + .png). K2-020 adds "store the crux information, not the URL". Cross-link. The part 2 items are the design rule, and K1-109 is the first mention.
- K1-056 / K1-060 vs K2-034 / K2-071: the frontend renders whatever URL the backend puts in the IMG tag. K1-060 says "the frontend is utterly stupid". K2-071 explicitly reverses this for image optimization: "the frontend is smart now" and appends w=360. Keep both and cross-link. The contrast is a teaching device, so do not merge it away.
- K1-110 vs K2-031: S3 is not public and only the CDN may read it. K1-110 gives the reason the upload response carries a CDN URL. Cross-link.
- K1-122 vs K2-038 / K2-044: "Instagram images are not private, a big myth". K1-122 is the forward reference (admin). K2-038/K2-044 are the actual teaching and demo. Keep K1-122 as an admin_reference and link it to K2-038.
- K1-101 vs K2-055 / K2-047: both describe expiry embedded in a signed artefact ("JWT works similarly"). K1-101 covers the S3 upload policy (no DB or timer). K2-055 covers CDN timed-signature URLs for reads. They are different subjects with the same mechanism. Cross-link only.
- K1-066 / K1-080 / K1-087 / K1-123 vs K2-075: the K2-075 recap restates storage (cheap), the data flow (2x copy, upload directly via pre-signed URLs) and the GitHub demo. Part 1 has the detail. K2-075 is the recap. Keep K2-075 as the recap and link it to the part-1 items. Don't merge the detail away.
- K1-107 vs K2-026: the upload-then-post flow. K1-107 is the GitHub analogy ("submit issue = publish post"). K2-026 is the Instagram post-service flow (an entry is created after the upload completes). Cross-link.
- K1-095 vs K2-013: the random image ID generated by the upload service. K1-095 has the GitHub demo (optional DB entry, the CDN URL exposed instead of the S3 path). K2-013 adds "store only the random image ID in the post table". Cross-link.
- K1-089 / K1-086 vs K3-068: pre-signed URL generation servers. K3-068 adds the scaling caveat (S3 must handle the extra requests). Different point, so cross-link only.
