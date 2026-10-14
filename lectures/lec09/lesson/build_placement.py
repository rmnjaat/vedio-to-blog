#!/usr/bin/env python3
"""Build lectures/lec09/lesson/placement.json and factcheck_applied.md.

Placement rows: id | section | component | also (sec:comp,...) or - | source note or - | note
Run from anywhere: python3 lectures/lec09/lesson/build_placement.py
"""
import json
from pathlib import Path

D = Path(__file__).resolve().parent
L = D.parent
ROOT = L.parent.parent

SECTIONS = {
    "about": "Lecture header: About this class",
    "1.1": "What Instagram ran in year one",
    "1.2": "How stacks spread, and what comes next",
    "2.1": "What a CDN is, and life without one",
    "2.2": "One mapping: the CDN property",
    "2.3": "Miss, hit, and \"it's all bytes\"",
    "2.4": "See it on a real site",
    "2.5": "Who puts the CDN URL in the page",
    "2.6": "Private content, changed images, and the nearest edge",
    "3.1": "The job, and where the bytes live",
    "3.2": "Three tempting ways to upload",
    "3.3": "The pre-signed URL",
    "3.4": "GitHub does exactly this",
    "3.5": "What direct upload raises",
    "4.1": "The posts table, and the column that shouldn't be there",
    "4.2": "What if you change CDN, cloud, or delete a photo?",
    "4.3": "Posts and images, kept apart",
    "4.4": "Serving A's photos to B",
    "5.1": "Are private photos private?",
    "5.2": "Anatomy of a signed URL",
    "5.3": "Where privacy is enforced, and what real privacy costs",
    "5.4": "Why not a secret format?",
    "6.1": "Kafka, the glue",
    "6.2": "Let the CDN resize the photo",
    "6.3": "The whole upload service in one picture",
    "7.1": "The page, and its boundary",
    "7.2": "Design from the page you render",
    "7.3": "Top 100: post IDs or whole posts?",
    "7.4": "One document, one read: and how big is it?",
    "8.1": "The count doesn't need to be real time",
    "8.2": "Which partition key?",
    "8.3": "The adapter: re-partition by hashtag",
    "8.4": "Inside a counting server",
    "8.5": "Other ways to count",
    "9.1": "The top 100 arrives on Kafka",
    "9.2": "The finished architecture",
    "9.3": "Read path, write path",
    "10.1": "When Kafka goes down",
    "10.2": "Retention, horizon, and where a consumer starts",
    "10.3": "The SLA is how fast you consume",
    "10.4": "Kafka is a broker, and sometimes the front door",
    "10.5": "More servers, or faster code?",
    "11": "What to keep",
}

COMPONENTS = ["Prose", "Figure", "StepThrough", "AnimationClip", "RuleBox", "PauseAndThink", "TradeoffTable",
              "MarginNote", "SourceNote", "CodeBlock", "ForwardChip", "RecallQuestions", "AboutThisClass", "NotationKey"]

ROWS = r"""
L-0001|about|AboutThisClass|-|-|Opening line of the note: week 4 opens social networks; board agenda (year-one architecture, how CDN works, uploading photos at scale, hashtag service).
L-0002|about|AboutThisClass|7.1:Prose|-|The second half's promise (simple problem, scale not even discussed, implementation busts assumptions); repeated as the opener of 7.1.
L-0003|2.1|Prose|-|-|Scope line: the CDN as a black box an engineer uses, not internals like BGP; nobody here builds Akamai or Cloudflare.
L-0004|about|AboutThisClass|-|-|The session starts with Instagram's year-one architecture (chapter 1).
L-0005|1.2|Prose|-|-|The lecture's view: a revolutionary stack appears every few years and everyone jumps on (opinion, attributed; unverifiable).
L-0006|1.2|Prose|-|-|PHP/MySQL/Memcache era because of Facebook; inline clarification (widely copied, not by all; Instagram chose Django) plus A-IUT-02 (HipHop, 400B page views).
L-0007|1.1|Prose|1.1:Figure|-|Opening hook: 14M users, 1 year, 3 engineers (board caption on Fig 1·a); note the board doesn't say what the 14M counts.
L-0008|1.1|Prose|-|-|Post-2012 startups (especially in India) copied Instagram's stack; attributed as the class's observation (unverifiable).
L-0009|1.1|Figure|1.1:Prose|-|Fig 1·a (D-01). Year-one stack as taught; inline clarification per fact-check (PostgreSQL main DB, memcached cache, Redis feeds, S3 + CloudFront) plus A-IUT-01 (Gearman then Celery + RabbitMQ).
L-0010|1.2|RuleBox|1.2:Prose|-|RuleBox §1 (with L-0014): bandwagon without asking whether you need it; 2008-12 PHP/MySQL then Django/Celery. Opinion, attributed.
L-0011|1.1|Prose|-|-|Year-one stack contains the week-1 'six components'; back-link chip to Lecture 2.
L-0012|1.2|Prose|-|-|Hedged prediction: new stack due, maybe Rust-based, within five years. Kept as a hedge (unverifiable).
L-0013|1.2|Prose|-|-|Go 'failed to capture the market' kept as opinion; one sourced sentence on Go's 2025 Stack Overflow usage share from the fact-check note.
L-0014|1.2|RuleBox|1.2:Prose|-|RuleBox §1 text: keep an eye on the stack of whoever grows fastest (career advice, attributed).
L-0015|1.2|Prose|-|-|ChatGPT example: AI company, Python backend; attributed (OpenAI does not publish its stack).
L-0016|1.2|Prose|-|-|'Vulnerable yet invincible', move fast and break things; instructor not a fan; opinion.
L-0017|2.1|Prose|2.1:ForwardChip|-|Chapter opener: few people know how CDN works; one block changes every public system. BGP deep dive deferred: ForwardChip 'not in this series'.
L-0018|2.1|RuleBox|2.1:Prose|-|RuleBox §2 text: a CDN transparently sits between user and origin.
L-0019|2.1|Prose|-|-|Misconception stated as tempting idea: you push to a CDN. CDNs offer APIs, but it pulls. Speech bubble 'nobody pushes to me'.
L-0020|2.1|Prose|-|-|Definition of origin: S3 bucket, backend, anything.
L-0021|2.1|Prose|-|-|Origin must be publicly reachable; inline clarification (CDNs can authenticate to private origins) plus A-CDM-06 (CloudFront VPC origins).
L-0022|2.1|Prose|2.1:Figure|-|Running example: instructor's site as origin, /system-design/logo.png, CDN host a.mycdn.net; any content type.
L-0023|2.1|Figure|2.1:Prose|-|Fig 2·a: path without a CDN (DNS -> LB -> backend reads image). Back-link Lecture 5 for load balancers.
L-0024|2.1|Prose|-|-|Images are almost static; spending backend bandwidth on them is wasteful.
L-0025|2.1|Prose|2.1:Figure|-|'A crime' (attributed): 1-10 MB images through API servers; keep API servers lean. Red bandwidth bar on Fig 2·a.
L-0026|2.1|Prose|-|-|Let another component move and geo-cache the bytes: that's a CDN.
L-0027|2.1|Figure|2.1:Prose|-|Singapore -> US, 10 MB image; label on Fig 2·a.
L-0028|2.2|Prose|2.2:MarginNote|-|Configure any CDN yourself (repeated thrice in class); body once, then 'See it yourself' margin note (a dollar or two is peanuts).
L-0029|2.2|Prose|-|-|Configuring asks for one origin URL, then it just works.
L-0030|2.2|Prose|2.2:StepThrough|-|CDN property = subdomain -> origin mapping; A-CDM-01 inline (Akamai property / CloudFront distribution).
L-0031|2.2|Prose|-|-|Serve the near-static, huge part (images) via the CDN.
L-0032|2.2|StepThrough|2.2:Prose|-|Fig 2·c step 1: browser resolves whatever hostname it sees; doesn't know it's a CDN.
L-0033|2.2|Prose|2.2:StepThrough|-|DNS returns the CDN provider's IP (Route 53, GoDaddy, Namecheap); A-CDM-02 (custom hostname = CNAME to edge hostname).
L-0034|2.2|StepThrough|2.2:Prose|-|Fig 2·c steps 2-5 (D-02 with addresses): find origin, swap host, keep path, fetch.
L-0035|2.2|Prose|-|-|No per-URL config: any path under the property is carried over.
L-0036|2.3|Prose|2.3:AnimationClip|-|First request = miss, CDN fetches from origin and caches; inline clarification (only cacheable responses) plus A-CDM-04 (max-age/s-maxage, 24 h default). Clip l09-cdn-miss-hit.
L-0037|2.3|AnimationClip|2.3:Prose|-|Next request = hit; second half of clip l09-cdn-miss-hit.
L-0038|2.3|Prose|2.1:RuleBox|-|'That is all a CDN does' summary; also RuleBox §2 body.
L-0039|2.2|Prose|-|-|Geo distribution etc. are advanced config; minimum is the transparent CDN.
L-0040|2.3|Prose|-|-|Simplified-medium: inline clarification with A-CDM-03 (many CDNs don't cache JSON/HTML by default; need headers/cache rules). Point 'any bytes' stays.
L-0041|2.3|Prose|-|-|Misconception 'only images'; back-link Lecture 2 §1.5.
L-0042|2.3|Prose|-|-|Giphy caches a lot on CDN (instructor's video); A-CDM-18 (Fastly, tens of billions of requests a day).
L-0043|2.3|Prose|-|-|Hits never reach the backend: a couple of servers instead of hundreds.
L-0044|2.3|Prose|-|-|Cost trade: pay the CDN about what you save; the lecture's rule of thumb (unverifiable), savings depend on hit ratio.
L-0045|2.3|Prose|-|-|Any URL can be an origin, even facebook.com.
L-0046|2.4|Figure|2.4:Prose|-|Demo recreated: instructor's site images on edge.arpitbhayani.me (custom-named property).
L-0047|2.4|Figure|2.4:Prose|-|Fig 2·d: origin configured as /static; /img/<file>.png -> /static/img/<file>.png.
L-0048|2.4|CodeBlock|2.4:Prose|-|'Normal string concatenation': CodeBlock origin + path.
L-0049|2.4|Prose|-|-|Only paths under /static work through this CDN.
L-0050|2.6|Prose|-|-|Q&A: CDNs serve private content too, depending on the CDN.
L-0051|2.6|Prose|-|-|Class remark: Netflix serves most traffic via CDN; tokens for private content. A-CDM-19 (Open Connect).
L-0052|2.6|ForwardChip|2.6:Prose|-|Try a CDN first; privacy returns in §5; CDN again tomorrow: ForwardChip Lecture 8.
L-0053|2.6|Prose|-|-|AWS keys on the CDN for private buckets (plugin-like); inline clarification (CloudFront OAC needs no keys).
L-0054|2.5|Prose|-|-|Q&A answer: the backend sends the CDN URL in the API response/HTML.
L-0055|2.5|Prose|-|-|Softened to a study tip: if this puzzles you, learn how the web works; configure a CDN.
L-0056|2.5|Prose|-|-|Backend compiles CDN URLs; frontend renders what it's given ('utterly stupid', attributed).
L-0057|2.5|Prose|-|-|abc.com setup: origin + CDN host + replace URLs explicitly; site never calls the CDN at runtime; no automatic mass rewrite.
L-0058|2.6|Prose|-|-|Changed image: wait for TTL or invalidate via API (prefer API); A-CDM-05 (versioned file names).
L-0059|2.6|Prose|-|-|Invalidating is not pushing: next request is a miss that refetches.
L-0060|2.6|ForwardChip|-|-|Live content on a CDN deferred ('6.3'): ForwardChip week 6, after this series.
L-0061|3.1|Prose|3.1:Figure|-|The upload service's brainstorm list (storage, data flow, separation of concerns, privacy, extensibility, optimization); Fig 3·a maps each to a chapter.
L-0062|3.1|Prose|-|-|Why the CDN came first: foundation for a good upload service.
L-0063|3.1|Prose|-|-|Board-only requirement stated in text: 5M uploads/day; chapter opening problem.
L-0064|3.1|Prose|-|-|Class proposal: blob storage (S3/GCS); deciding reason 'dirt cheap'.
L-0065|3.2|Prose|3.2:Figure|-|Ladder step 1, tempting idea: persistent connection + chunks; corrected (5 MB fits one request). A-IUT-03 (single PUT up to 5 GB).
L-0066|3.2|Prose|3.2:PauseAndThink|-|HD iPhone photo ~5 MB, peanuts for one HTTP request; P2 reveal.
L-0067|3.2|RuleBox|3.2:Prose|-|RuleBox §3 text: easy to build complex systems, exponentially difficult to build simple ones.
L-0068|3.2|Prose|3.2:Figure|-|Ladder step 2: naive flow, upload to API server which copies to S3.
L-0069|3.2|Prose|-|-|Tempting idea: async copy; corrected by Instagram UX (see it now).
L-0070|3.2|Prose|-|-|So the copy must be synchronous.
L-0071|3.2|PauseAndThink|3.2:Prose|-|Tempting objection: crash mid-upload loses the photo; corrected (5xx + retry). P3.
L-0072|3.2|Prose|3.2:PauseAndThink|-|Real problem: bandwidth (network card limit) and memory of API servers; P3 reveal; red bar in Fig 3·b; board question with 'Not'.
L-0073|3.2|Prose|3.2:Figure|-|Ladder step 3: dedicated upload service with bigger NIC proxying to S3 PUT; 'can we do better?'.
L-0074|3.2|Prose|-|-|Upload service lowers core API bandwidth, possibly by being closer to the user (kept as the half-sentence it was).
L-0075|3.2|Prose|-|-|The upload service's proxy configuration (path -> S3 put API); not evaluated in class.
L-0076|3.3|Prose|3.3:AnimationClip|-|Class proposal: pre-signed URL, fetch from API server, PUT/POST directly to S3 before expiry.
L-0077|3.3|AnimationClip|3.3:Prose|-|Bytes skip API server and upload service; clip l09-presigned-upload.
L-0078|3.3|Prose|3.3:TradeoffTable|-|Saves service bandwidth and 2x transfer; inline clarification (same-Region hop usually not billed twice; gain is servers).
L-0079|3.3|Prose|3.3:SourceNote|SN-01|Egress/ingress per hop as the class's cost argument; SN-01 with A-IUT-04, A-IUT-05.
L-0080|3.3|Prose|-|-|Definition: a URL that is pre-signed and expires.
L-0081|3.3|Prose|3.3:AnimationClip|-|Prepare phase: random image ID, short-lived URL for s3://images/<id>.png (class said GCS with S3 path; page uses S3).
L-0082|3.3|Prose|3.3:AnimationClip|-|Upload phase: POST to the pre-signed URL; inline clarification (presigned POST vs PUT).
L-0083|3.3|Prose|3.3:TradeoffTable|-|Why not an open bucket: strangers upload on your bill; A-IUT-14 (public access blocked by default).
L-0084|3.3|Prose|-|-|URL for one path, valid 10-60 s; the URL is open, not the path; inline (signed locally) plus A-IUT-07 (bearer token, signatureAge).
L-0085|3.3|Prose|-|-|Full flow; inline clarification (signing is local SDK work; S3 checks on use).
L-0086|3.3|Prose|3.3:TradeoffTable|-|Less infrastructure, native AWS security; A-IUT-06 (POST policy caps size/type).
L-0087|3.4|Prose|11:Prose|-|Opener of 3.4: building blocks, Ctrl-C Ctrl-V; GitHub = Instagram upload. Echoed on the §11 card.
L-0088|3.4|StepThrough|3.4:MarginNote|-|Fig 3·c step 1: 179 KB PNG, four calls, first to upload-policy endpoint; 'See it yourself' margin note.
L-0089|3.4|StepThrough|3.4:Prose|-|Step 1 detail: metadata only (name, 183,938 bytes, image/png, token).
L-0090|3.4|StepThrough|3.4:Prose|-|Step 2: response holds S3's signed upload URL, not GitHub's.
L-0091|3.4|StepThrough|3.4:Prose|-|Step 2: asset href is a CDN URL on user-images.githubusercontent.com with image ID; A-IUT-15 (10 MB cap, private-repo login since May 2023).
L-0092|3.4|Prose|-|-|What the backend does on upload intent: DB entry, random ID, S3 path, signed URL, exposes CDN URL.
L-0093|3.4|Prose|-|-|GitHub inserts markdown with a leading '!' (render as image).
L-0094|3.4|Prose|-|-|Form fields in POST body; GCP/Azure equivalents; A-IUT-11 (GCS 7-day max, Azure user-delegation SAS).
L-0095|3.4|Prose|-|-|Upload URL is the plain bucket endpoint; body fields make it pre-signed.
L-0096|3.4|Prose|-|-|'key' = bucket path, same as in the CDN URL.
L-0097|3.4|Prose|-|-|acl public-read; inline clarification (ACLs disabled by default now, 400 error) plus A-IUT-09.
L-0098|3.4|Prose|-|-|policy = signed part with expiry, stateless check like JWT; inline (signature not certificate) plus A-IUT-08.
L-0099|3.4|Prose|-|-|Remaining fields: algorithm, credential, date, signature.
L-0100|3.4|StepThrough|3.4:Prose|-|Steps 3-4: POST form + bytes (~173 KB) to S3 (204), then PUT confirm to github.com (200).
L-0101|3.4|Prose|-|-|Rendering is GitHub's logic; the special part is bandwidth saved.
L-0102|3.4|StepThrough|3.4:Prose|-|Step 5: opening the image: CDN miss -> S3 origin -> cache; next load faster.
L-0103|3.4|Prose|-|-|Pre-signed uploads 'practically everywhere'; inline clarification (common default; hybrids exist) plus A-IUT-16.
L-0104|3.4|Prose|-|-|Submitting the issue = publishing an Instagram post; bridge to §4.
L-0105|3.5|Prose|3.3:TradeoffTable|-|Q&A: moderation is async; in-request moderation rules out direct upload; A-IUT-12 (S3 event notifications). Also T1 row 'inspect in the request'.
L-0106|3.5|Prose|-|-|Q&A: the CDN URL in the upload response = path with bucket swapped for CDN host (string concat).
L-0107|3.5|Prose|-|-|Q&A: CDN URL returned because S3 is not public; inline clarification (configuration, GitHub demo used public-read) plus A-IUT-10.
L-0108|3.5|Prose|-|-|Tempting idea: render from S3; 'CDN is not a blob store'; inline clarification (S3 can serve directly; here bucket is private).
L-0109|3.5|Prose|-|-|Q&A: CDN vs S3 speed: geography key, benchmark the rest.
L-0110|3.5|Prose|-|-|Class point: if only location mattered, S3 reads would still cost a lot.
L-0111|3.5|Prose|-|-|Akamai 18+ India locations vs AWS 2-3 DCs; inline clarification (two Regions) plus A-CDM-10.
L-0112|3.5|Prose|-|-|Storage media hedge ('we don't know') kept; inline (S3 on HDDs) plus A-CDM-20.
L-0113|3.5|Prose|3.5:SourceNote|SN-02|'Nine nines, something like that' kept; SN-02 (11 nines durability, 99.99% availability) with A-CDM-08.
L-0114|3.5|Prose|-|-|Benchmark; if CDN isn't best, pay S3 egress; A-CDM-09 (CloudFront<->S3 transfer waived).
L-0115|3.5|Prose|3.5:Figure|-|Q&A: CDN reads private bucket with uploaded keys; inline clarification (CloudFront OAC, no keys). Fig 3·d.
L-0116|3.5|Prose|-|-|Tempting idea: CDN mints a signed URL to read S3; in fact SDK read; inline (SigV4 header).
L-0117|3.5|Prose|3.5:Figure|-|Native CDN-S3 integrations; A-CDM-07 (OAC).
L-0118|5.1|Prose|-|-|Teaser placed with its payoff: Instagram images are not private, a big myth (said at 01:03:31).
L-0120|4.1|Prose|4.1:PauseAndThink|-|Chapter question: what does the posts table look like? P4.
L-0121|4.1|Prose|-|-|Class proposal: user ID, caption, plus created_at.
L-0122|4.1|Prose|-|-|Tags aren't a column; hashtags live in the caption (returns in §7).
L-0123|4.1|Prose|4.1:PauseAndThink|-|Class proposal: store the pre-signed URL, corrected to CDN URL, then shown suboptimal.
L-0124|4.1|Prose|-|-|Every cohort adds a URL column; 'suboptimal, wrong would be too strong' (attributed).
L-0125|4.1|RuleBox|4.1:Prose,11:Prose|-|RuleBox §4: if derivable, don't store it (t-shirt line). On §11 card.
L-0126|4.1|Prose|-|-|Naive table and the 'which URL' follow-up (CDN URL).
L-0127|4.2|Prose|4.2:SourceNote|SN-03|War story 'most probably Cloudflare' kept with hedge; SN-03 (Amazon CloudFront).
L-0128|4.2|Prose|4.2:TradeoffTable|-|Stored S3 URL no better: cloud price 4x.
L-0129|4.2|Prose|-|-|Bing API 4-10x; inline clarification (May 2023, ~3x-10x, Microsoft's stated reason).
L-0130|4.2|Prose|11:Prose|-|Don't bind yourself to one vendor. On §11 card.
L-0131|4.1|Prose|-|-|Keep URL generation in business logic; store the crux.
L-0132|4.1|Figure|4.1:Prose|-|Store the random image ID instead of a URL; board url circled and struck out (Fig 4·a).
L-0133|4.1|CodeBlock|4.1:Figure|-|Posts table schema (id from ID generator, back-link Lecture 6; user_id; image_id; caption).
L-0134|4.2|Prose|-|-|LinkedIn and CDNs do this too; attributed (LinkedIn scheme not public).
L-0135|4.1|Figure|4.1:Prose|-|Per-user S3 layout s3://insta-images/<user_id>/<image_id> (D-05 connectors).
L-0136|4.1|Prose|-|-|GitHub demo key prefix was the uploader's user ID.
L-0137|4.1|Prose|-|-|User ID + image ID generate the path; don't store it.
L-0138|4.2|Prose|4.2:TradeoffTable|-|Generating at read time: raw S3 or CDN path, change/A-B/two CDNs.
L-0139|4.2|Prose|4.2:TradeoffTable|-|Management asks to switch CDN / 20% split every ~2 years; instructor's experience (unverifiable).
L-0140|4.2|Prose|-|-|Senior engineers face these decisions (career advice).
L-0141|4.2|Prose|-|-|Stored S3 URL can't be served anyway; inline clarification (private bucket here; S3 can serve in general).
L-0142|4.2|Prose|-|-|Generate the URL in the API handler, send in JSON.
L-0143|4.2|CodeBlock|4.2:Prose,4.2:TradeoffTable|-|20% split via random number < 0.2.
L-0144|4.2|Prose|4.2:SourceNote|SN-03|Migration would need rewriting every stored URL; SN-03 (CloudFront, not Cloudflare).
L-0145|4.2|Prose|4.2:TradeoffTable|-|Deleting: build S3 path from IDs vs trimming a CDN URL ('worst way').
L-0146|4.3|Prose|4.3:Figure|-|Post service handles create/read post.
L-0147|4.3|Figure|4.3:Prose|-|Upload-then-post flow (board steps 1-2); Fig 4·b.
L-0148|4.3|Prose|4.3:Figure|-|Board-only: post service validates image_id belongs to the user (stated in text).
L-0149|4.3|Prose|-|-|Linked only via image ID: separation of concerns.
L-0150|4.3|Prose|-|-|Instagram is also videos, reels, stories; keep media out of the post.
L-0151|4.3|Prose|-|-|Add video/reels upload services; post concept unchanged.
L-0152|6.3|Prose|11:Prose|-|Lecture thesis (said three times): boxes are easy, think about implementation. In the §6.3 recap and the §11 card.
L-0153|4.4|StepThrough|4.4:Prose|-|Fig 4·c step 1: B calls GET /users/A/posts.
L-0154|4.4|Prose|2.5:Prose|-|Callback to 2.5's question: B gets CDN URLs from the post service response.
L-0155|4.4|StepThrough|4.4:Prose|-|Steps 2-3: post service builds instacdn.net/A/<id>.png per row, maybe by CDN experiment.
L-0156|4.4|Prose|4.4:StepThrough|-|IMG tag GETs it; URL = prefix + user ID + image ID + .png.
L-0157|4.4|StepThrough|4.4:Prose|-|Steps 5-6: CDN hit or S3 read, cache.
L-0158|4.4|Prose|-|-|Add Cloudflare as a second CDN seamlessly: why you never store the derived value.
L-0159|5.1|Prose|-|-|Chapter opener: privacy is the elephant in the room (transition line kept as framing).
L-0160|5.1|Prose|5.1:RuleBox|-|'No privacy on the internet'; inline clarification (needs a valid URL obtained before expiry). RuleBox body quote.
L-0161|5.1|Prose|-|-|Private photos still served via CDN for cost and UX.
L-0162|5.1|Prose|-|-|On the CDN, anyone with the URL can access it.
L-0163|5.1|Prose|5.1:SourceNote|SN-04|TTL/certificate expiry (board line kept); SN-04 (signer's expiry, not cache TTL) with A-CDM-13.
L-0164|5.1|Prose|5.1:Figure|-|Follower copies URL via inspect element to a non-follower; Fig 5·a.
L-0165|5.1|Prose|5.1:MarginNote|-|Dev tools are your best friend; 'See it yourself' margin note.
L-0166|5.1|Figure|5.1:Prose,5.1:PauseAndThink|-|Incognito demo recreated as Fig 5·a; P5 reveal.
L-0167|5.2|Figure|5.2:Prose|-|URL anatomy (Fig 5·b); inline clarification (params make URL expire/tamper-proof; privacy is L-0172; Cloudflare slip -> SN-03).
L-0168|5.2|Prose|-|-|CDN stateless, no notion of users; inline clarification (CDN access controls exist) plus A-CDM-15.
L-0169|5.2|Prose|5.2:AnimationClip|-|Timed signatures like JWT; inline (signature, not certificate) plus A-CDM-12. Clip l09-signed-url-expiry.
L-0170|5.2|Figure|5.2:Prose|-|oe 'most probably' expiry (guess kept), oh hash, ig_cache_key; read your CDN's docs. Unverifiable, attributed.
L-0171|5.2|Prose|5.2:AnimationClip|-|Removing params -> 'Bad URL timestamp' (red end of the clip).
L-0172|5.3|RuleBox|5.3:Prose,11:Prose|-|RuleBox §5: privacy enforced in the API server, which decides who gets URLs.
L-0173|5.3|Prose|-|-|Follower gets 15-20 photos with FBCDN URLs; non-follower gets nothing.
L-0174|5.3|Prose|5.3:TradeoffTable|-|Pseudo privacy: difficult, not impossible; 'no magic'.
L-0175|5.3|Prose|5.3:SourceNote|SN-05|Truly private = no CDN, every byte via API; SN-05 (spectrum of tighter options) with A-CDM-14.
L-0176|5.3|Prose|5.3:TradeoffTable|-|50-100x servers, 100,000+ servers 'not really sure' (hedge kept; unverifiable estimate).
L-0177|5.2|AnimationClip|5.2:Prose|-|CDN reads oe/oh; after a five-minute expiry, refused (clip beat).
L-0178|5.2|AnimationClip|5.2:Prose|-|The check sequence: extract params, verify, check expiry, image or bad-URL.
L-0179|6.1|Prose|6.1:ForwardChip|-|Extensibility skimmed; depth later: ForwardChips Lecture 8 (Kafka + SQS fan-out), Lecture 9 (CDC).
L-0180|6.1|Prose|-|-|Kafka is the glue of social networks.
L-0181|6.1|Figure|6.1:Prose|-|Fig 6·a (D-04 bottom): post event to Kafka, consumers; board-only CDC drawn dashed with back-link Lecture 5 / ForwardChip Lecture 9.
L-0182|6.1|Prose|-|-|Each consumer at its own pace; Kafka as backbone of extensibility.
L-0183|6.1|ForwardChip|-|-|Kafka in more depth throughout the course: ForwardChip.
L-0184|6.2|RuleBox|6.2:Prose,11:Prose|-|RuleBox §6: reuse what exists rather than reinvent.
L-0185|6.2|ForwardChip|6.2:Prose|-|Own image optimization service tomorrow: ForwardChip Lecture 8.
L-0186|6.2|Prose|-|-|CDNs offer image optimization; inline clarification (separately enabled/billed; CloudFront has none built in) plus A-CDM-17.
L-0187|6.2|Prose|-|-|Sachin Tendulkar 50 MB photo, tier-3 user on Jio (board 5 MB; both kept as 5-50 MB). Opening problem.
L-0188|6.2|Prose|-|-|Compress and prepare per-resolution versions.
L-0189|6.2|Prose|-|-|CDN query params for processing: w / width / ow.
L-0190|6.2|Prose|-|-|10,000 x 10,000 photo vs 360 px screen.
L-0191|6.2|StepThrough|6.2:Prose|-|Fig 6·b step 1: frontend appends w=360 ('frontend is smart now'); A-CDM-16 (variant billing, blur not privacy).
L-0192|6.2|StepThrough|6.2:Prose|-|Steps 2-6: processed copy? original? fetch, resize, cache, serve.
L-0193|6.2|Prose|-|-|Other transforms: colour, grayscale, transpose, rotate, recognition.
L-0194|6.2|Prose|6.2:RuleBox|-|No need to build your own optimizer today; pay a bit. RuleBox body.
L-0195|6.3|Figure|6.3:Prose|-|Recap of the image upload service; Fig 6·c tags each box with its chapter.
L-0196|5.4|ForwardChip|5.4:Prose|-|OTT authorization question deferred: ForwardChip week 6, after this series.
L-0197|5.4|Prose|-|-|Tempting idea: proprietary format; APK decompiled, 'no rocket science'.
L-0198|5.4|Prose|-|-|DRM (Udemy) is very different.
L-0199|5.4|Prose|-|-|No secure proprietary format: shipped code is public.
L-0200|5.4|MarginNote|-|-|'The instructor's DRM': ten days hacking his own platform (first-hand, unverifiable).
L-0201|5.4|Prose|-|-|Read about DRM and catching leakers; inline (forensic watermarking) plus A-HSD-19.
L-0202|5.4|Prose|-|-|India piracy law per the instructor; inline clarification (up to 3 years, cognizable, non-bailable since 2022) plus A-HSD-20.
L-0203|5.4|MarginNote|-|-|Three piracy complaints last month; Google acting (first-hand, unverifiable).
L-0204|4.3|Prose|-|-|Orphan uploads: storage cheap; clean up by image entries without posts; A-IUT-13 (lifecycle rule).
L-0205|6.1|Prose|-|-|Q&A: Kafka here because other services must learn of the new post.
L-0206|2.6|Prose|-|-|Nearest edge via DNS + BGP, not the image service; inline clarification (DNS mapping or anycast) plus A-CDM-21.
L-0207|2.6|Prose|2.6:MarginNote|-|Routing details proprietary, Cloudflare blog; inline (mechanisms documented). Further-reading margin note.
L-0208|2.6|Prose|-|-|Akamai first; Cloudflare hired from Akamai 'something around that' (hedge kept; unverifiable).
L-0209|4.3|Prose|-|-|S3 is a black box behind the SDK: the API contract.
L-0211|7.1|Figure|7.1:Prose|-|Fig 7·a (D-06): #sunset, 1.2m photos, top 100; best UX. Chapter opening problem.
L-0212|7.1|Prose|-|-|Assumptions: millions of hashtags; data science computes top 100 (black box).
L-0213|7.1|Prose|-|-|Brainstorm list: storage, counting, inter-service communication, super-fast response (board also 'atomicity, partial update').
L-0214|7.2|Prose|-|-|Tempting idea: tags table + tags in photos table; photos table out of the question.
L-0215|7.2|RuleBox|7.2:Prose,11:Prose|-|RuleBox §7: design storage from the page you render.
L-0216|7.2|Prose|-|-|Class proposals: tag table + KV (two DBs), then one store keyed by hashtag with count.
L-0217|7.1|Prose|-|-|Tempting idea: maintain top-100 yourself; boundary says data science does it.
L-0218|7.1|Prose|7.2:RuleBox|-|Respect the boundary (said twice); RuleBox §7 body.
L-0219|7.2|CodeBlock|7.2:Prose|-|Top 100 as array of post IDs in the document; board document as CodeBlock.
L-0220|7.2|Prose|-|-|Think through all possibilities before settling.
L-0221|7.2|Prose|-|-|Post IDs: derivable and smaller (callback to §4's rule).
L-0222|7.3|Prose|-|-|Two options: post IDs or whole posts.
L-0223|7.2|Prose|-|-|Image IDs ambiguous without user; post ID solves it.
L-0224|7.3|Prose|7.3:TradeoffTable|-|Approach 2: whole posts, denormalized, bloats; 100 entries may be fine.
L-0225|7.3|Prose|7.3:TradeoffTable|-|Approach 2: more space, one read, fast (students noted first).
L-0226|7.3|Prose|-|-|No single way: depends on UX and SLAs; know the pros and cons.
L-0227|7.3|Prose|-|-|Tempting extension: show all photos; out of scope, top 100 only.
L-0228|7.3|Prose|7.2:RuleBox|-|Don't add requirements mid-design; RuleBox §7 body.
L-0229|7.3|TradeoffTable|7.3:Prose|-|Approach 1: post IDs (T4 column).
L-0230|7.3|TradeoffTable|7.3:Prose|-|Post IDs: less space, cheap to cache.
L-0231|7.3|TradeoffTable|7.3:Prose|-|Post IDs: extra read to post service per render.
L-0232|7.3|TradeoffTable|7.3:Prose|-|Post IDs: always latest data from source of truth.
L-0233|7.3|TradeoffTable|7.3:Prose|-|Whole posts: consistency pain (red X cell); A-HSD-14 (MongoDB guide).
L-0234|7.3|Prose|-|-|Skip likes/comments on the hashtag page and the copy works.
L-0235|8.1|Prose|-|-|Each hashtag entry's count must go up per post (count++). Chapter opener.
L-0236|8.1|Prose|-|-|Class proposal: not real time, batch; back-link Lecture 2 §3.1.
L-0237|8.1|Prose|-|-|Post service pushes the post to Kafka (same topic as §6.1).
L-0238|8.1|Figure|8.1:Prose|-|Class proposal: consumer extracts hashtags, batches 1,000 posts; Fig 8·a.
L-0239|8.2|Prose|8.2:PauseAndThink|-|Tempting doubt: too many hashtags for a key; hashing handles it; real problem elsewhere. P7.
L-0240|8.2|Prose|8.2:PauseAndThink|-|Problem 1: a post has several hashtags. P7 reveal.
L-0241|8.2|Prose|8.2:PauseAndThink|-|Problem 2: counter must reuse the post topic, or dual writes; back-link Lecture 2 §3.4. P7 reveal.
L-0242|8.2|Prose|-|-|Post topic partitioned by user ID (board Q&A).
L-0243|8.2|Prose|-|-|Batching needs all posts of a hashtag on one server; inline clarification (per-server batching helps; repartition makes it complete, single writer).
L-0244|8.2|Figure|8.2:Prose|-|Three #sunset posts on three servers: nothing to batch; Fig 8·b; board pipe relabelled.
L-0245|8.3|Prose|-|-|Tempting idea: Redis Pub/Sub channel per hashtag; inline clarification (cost overstated; data loss the real reason).
L-0246|8.3|Prose|-|-|Redis down = data loss (no persistence); inline plus A-HSD-08 (Redis Streams).
L-0247|8.3|AnimationClip|8.3:Prose|-|Hint: post 31 with #sunset #sun #nature; clip l09-hashtag-repartition opens on it.
L-0248|8.3|Prose|-|-|Class proposal that cracked it: re-ingest into a hashtag-partitioned Kafka, like a search index.
L-0249|8.3|AnimationClip|8.3:Prose,8.3:Figure|-|Adapter: one event per hashtag (8 hashtags -> 8 events); clip and Fig 8·c.
L-0250|8.3|Prose|8.3:AnimationClip|-|Full counting path with count += n.
L-0251|8.2|Prose|-|-|Hash partitioning != one partition per hashtag; class's 'week two' = Lecture 2 §3.6.
L-0252|8.4|RuleBox|8.4:Prose,11:Prose|-|RuleBox §8: whenever you can batch, batch.
L-0253|8.4|Prose|8.4:RuleBox|-|Bulk insert ~100x; inline clarification ('many times faster'). RuleBox body.
L-0254|8.3|Prose|-|-|Standard adapter found via implementation; post topic can't change; inline (repartitioning) plus A-HSD-07.
L-0255|8.4|Prose|8.4:StepThrough|-|Accepted over-count when nodes fail; nobody checks 1.2M.
L-0256|8.4|Prose|-|-|Relax consistency at scale; error rate always exists.
L-0257|7.4|Prose|-|-|One document, one read; board 'CORE of our system'.
L-0258|7.4|Prose|-|-|Top 100 stored in hashtag DB, copied and formatted by the hashtag service.
L-0259|9.1|Prose|-|-|Tempting start: define the top-100 criteria; it's the black box.
L-0260|9.1|Prose|9.1:PauseAndThink|-|Tempting idea: call data science on read; must store locally. P8.
L-0261|9.1|Prose|-|-|Proposal: always-on listener service; it's a simple processor reading their Kafka.
L-0262|9.1|Prose|-|-|Common mistake: every consumer as a heavyweight service; it's a process.
L-0263|9.1|Prose|9.2:Figure|-|Top-100 ingestion via their Kafka, low throughput (board).
L-0264|9.1|Prose|9.1:PauseAndThink|-|Sync call couples uptime; P8 reveal.
L-0265|9.1|Prose|-|-|Kafka joins services; why it became famous.
L-0266|9.1|Prose|9.1:SourceNote|SN-08|CQRS 'because of Kafka' kept; SN-08 (CQRS = separate read/write models; Kafka connects them) with A-HSD-15.
L-0267|8.3|Prose|8.3:Figure|-|Formal write flow: post service -> Kafka -> extractor -> n entries on POST_HASHTAG (Post svc, not Image service).
L-0268|9.2|Figure|9.2:Prose|-|Fig 9·a (D-09): final architecture, Post Svc label corrected.
L-0269|8.3|Prose|8.3:Figure|-|Second topic may share the cluster; separate for separation of concerns; (hashtag, post) tuples.
L-0270|8.4|StepThrough|8.4:Prose|-|Counting servers: one hashtag -> one server -> count += n; A-HSD-05 (commit after write = at-least-once). Fig 8·d.
L-0271|9.2|Prose|-|-|Read side: hashtag API reads the whole document.
L-0272|9.2|Prose|9.2:Figure|-|Hashtag API behind a CDN: data rarely changes.
L-0273|9.2|Prose|-|-|Simplified-medium (verifier override): inline clarification (needs Cache-Control/s-maxage or cache rule; JSON not cached by default), links A-CDM-03 in §2.3.
L-0274|9.2|Prose|-|-|Key-value reads on partitioned MySQL/MongoDB/DynamoDB.
L-0275|9.2|Prose|-|-|CDN or cache, pick one; instructor prefers CDN (opinion).
L-0276|9.2|Prose|-|-|TTL and/or invalidation on change; A-CDM-22 (stale-while-revalidate).
L-0277|9.3|RuleBox|9.3:Prose,11:Prose|-|RuleBox §9: read paths and write paths, one at a time.
L-0278|9.3|Prose|-|-|Every system has read and write paths; check each is optimized.
L-0279|9.3|Figure|9.3:Prose|-|Fig 9·b (D-10): write path and read path labelled.
L-0280|9.3|Prose|9.3:TradeoffTable|-|Read path: cache/CDN, bare-minimum latency (board list).
L-0281|9.3|Prose|9.3:TradeoffTable|-|Write path: post -> Kafka must be one call (else distributed transaction).
L-0282|9.3|Prose|-|-|Workers = partitions; inline clarification (at most) plus A-HSD-04; back-link Lecture 2 §3.6.
L-0283|9.3|Prose|9.3:TradeoffTable|-|DB on write path: atomic/partial updates, provisioning, pace.
L-0284|9.3|Prose|-|-|Separate paths give structure; think implementation and failure.
L-0285|9.3|Prose|9.3:RuleBox|-|Blow each component out of proportion, one path at a time. RuleBox body.
L-0286|9.3|TradeoffTable|9.3:Prose|-|Read path blown up: partition, replicas, cache, CDN.
L-0287|9.3|TradeoffTable|9.3:Prose|-|Write path: eight hashtags, eight micro writes -> batching.
L-0288|9.3|Prose|8.4:RuleBox,9.3:TradeoffTable|-|Batch needs one server per hashtag -> repartition; also RuleBox §8 body.
L-0289|9.2|Prose|11:Prose|-|Kafka as glue three times (board Key Takeaways); §11 card header.
L-0290|9.3|Prose|11:Prose|-|Takeaways: adapter, batching and counting; find the naive count++.
L-0291|9.3|Prose|-|-|Standard way to think; reads scaled separately.
L-0292|11|ForwardChip|-|-|Next class: image optimization service, message indicators: ForwardChip Lecture 8.
L-0293|9.3|Prose|-|-|Q&A: web server vs workers split by responsibility, not read/write path.
L-0294|8.4|Prose|-|-|Partitions can't match hashtags: pick n, measure, add; inline clarification plus A-HSD-03 (key remapping); ForwardChip Lecture 9.
L-0295|8.4|ForwardChip|-|-|Kafka partitioning covered earlier: back-link chip to Lecture 2 §3.6 (class said week 2).
L-0296|8.4|Prose|8.4:StepThrough|-|Each message carries hashtag + post ID, so grouping works.
L-0297|8.4|CodeBlock|8.4:StepThrough|-|Hash table hashtag -> int, ++ per message, write when batch big (live annotation); CodeBlock.
L-0298|8.4|Prose|-|-|Work out small details yourself (neutral wording; tense exchange not kept).
L-0299|9.1|Prose|-|-|Data science can consume POST_HASHTAG themselves; counters are its only consumer today.
L-0300|8.5|Prose|8.5:TradeoffTable|-|Redis Pub/Sub fit chat, not counting: persistence; back-link Lecture 4.
L-0301|8.5|Prose|8.5:TradeoffTable|-|Pub/Sub: only subscribers connected now receive; down server misses it (red X).
L-0302|8.5|TradeoffTable|8.5:Prose|-|Push vs pull, pace, batching.
L-0303|8.5|Prose|-|-|With push, DB slowness piles messages onto servers.
L-0304|8.5|Prose|-|-|Chat used Pub/Sub for minimal latency.
L-0305|9.1|Prose|9.1:PauseAndThink|-|Webhooks proposal: good, but the other team manages calls and updates are lost if API down; Kafka preferred. P8 reveal.
L-0306|9.1|Prose|-|-|Everything is a trade-off; know what for what.
L-0307|9.1|Prose|11:Prose|-|Decouple what needn't be synchronous; back-link Lecture 2 §3.1 (Hotstar).
L-0308|8.4|Prose|-|-|DB must give atomic increments (MySQL, DynamoDB); A-HSD-06; back-link Lecture 2 §4.
L-0309|9.1|Prose|-|-|Top-100 array replaced wholesale.
L-0310|8.2|Prose|-|-|1,000 partitions for 1M users ~ 1,000 users each; not one partition per user.
L-0311|10.1|Prose|-|-|Kafka is a cluster; replication = availability.
L-0312|10.1|Prose|-|-|Tempting idea: replicated cluster never goes down; it can.
L-0313|10.1|Prose|10.1:SourceNote|SN-09|99.9% kept; SN-09 (deployment-dependent, 99.5%-99.99%) with A-HSD-13.
L-0314|10.1|Prose|10.1:TradeoffTable|-|DLQ / drop / buffer; inline clarification (producer buffers and retries; DLQ vs fallback naming) plus A-HSD-09. Board 'Dead Letter Queue'.
L-0315|10.3|Prose|-|-|SLA = consumption speed; add partitions and workers.
L-0316|10.3|Prose|-|-|Online vs downtime repartitioning; have a strategy.
L-0317|10.3|ForwardChip|-|-|SLAs in week 7 (distributed task scheduler): ForwardChip after this series.
L-0318|10.1|Prose|-|-|Class framing: stateful vs stateless components (kept as the class's framing, not endorsed).
L-0319|10.1|RuleBox|10.1:Prose,10.1:TradeoffTable|-|RuleBox §10: you don't always need another component; sometimes losing data is fine.
L-0320|10.1|Prose|10.1:RuleBox|-|Uber SOS: no loss allowed (instructor's video). RuleBox body.
L-0321|10.1|Prose|-|-|Failover 'two, three seconds'; inline clarification (tens of seconds to minutes) plus A-HSD-21; back-link Lecture 2 §2.4.
L-0322|10.1|Prose|-|-|Leaderless proposal: multi-master, conflicts; A-HSD-22.
L-0323|10.2|Prose|10.2:SourceNote|SN-11|'Forever unless deletion policy' kept; SN-11 (7-day default) with A-HSD-01.
L-0324|10.2|StepThrough|10.2:Prose|-|Horizon defined; inline clarification (Kinesis term; Kafka earliest offset, segments). Fig 10·a H.
L-0325|10.2|Prose|-|-|From the horizon = start of retained data; A-HSD-16.
L-0326|10.2|StepThrough|10.2:Prose|-|Checkpoint/commit; inline clarification (per group and partition); back-link Lecture 2 §3.7. Fig 10·a LC.
L-0327|10.2|StepThrough|10.2:Prose|-|Periodic commits; crash -> resume from LC reprocesses.
L-0328|10.2|Prose|10.2:PauseAndThink,10.2:CodeBlock|-|Three start points; inline clarification plus A-HSD-02 (default latest). P9.
L-0329|10.2|Prose|-|-|Retention length cost; 6 months vs 30 days.
L-0330|10.2|Prose|-|-|Archive to S3 before deletion; inline clarification plus A-HSD-12 (tiered storage).
L-0331|10.5|Prose|-|-|400 rps pod question; inline clarification (optimisation vs vertical scaling).
L-0332|10.5|Prose|-|-|Management call: servers cheaper than salaries.
L-0333|10.5|Prose|-|-|Application-level profiling (New Relic, Datadog, OpenTelemetry).
L-0334|10.5|Prose|-|-|Profiling costly, canary only; inline clarification plus A-HSD-18 (continuous profilers).
L-0335|10.5|Prose|-|-|90/10 split behind the LB, profile the 10%; back-link Lecture 5.
L-0336|10.5|Prose|10.1:RuleBox|-|Measure before optimizing; RuleBox §10 body.
L-0337|10.5|Prose|-|-|New Relic, Datadog, Nagios; inline clarification (Nagios is monitoring; 'biggest' unverified).
L-0338|10.5|Prose|-|-|cProfile, instructor's laptop; A-HSD-17 (Python 3.15 alias, sampling for production).
L-0339|10.5|Prose|-|-|Instagram uses cProfile in production; attributed (exact claim unconfirmed).
L-0340|10.5|Prose|-|-|CPU vs RAM: know the workload; four resources.
L-0341|10.5|Prose|-|-|Goroutines: CPU first, then RAM (20 MB each); inline clarification plus A-HSD-23.
L-0342|7.4|Prose|-|-|GC proposal (7-8 day TTL) answered: don't delete, tags may revive, docs tiny.
L-0343|7.4|CodeBlock|7.4:Prose|-|436 B ~ 512 B math; inline clarification (64-bit IDs ~836 B ~ 1 KB).
L-0344|7.4|Prose|7.4:SourceNote|SN-06|'Half a gig for a billion' stated; SN-06 (~500 GB).
L-0345|7.4|Prose|-|-|Do the calculation; thousand/million/billion jumps.
L-0346|8.4|Prose|-|-|More hashtags = more micro writes, but long tail is cold.
L-0347|7.4|Prose|7.4:SourceNote|SN-07|'Thousand X' stated; SN-07 (10,000x).
L-0348|7.4|Prose|-|-|Proposal: first page in doc, rest in paginated store.
L-0349|7.4|Prose|-|-|Keep only the first page in the document.
L-0350|8.5|Prose|8.5:TradeoffTable|-|In-memory queue proposal: same thing; any partitioned broker; inline clarification (RabbitMQ needs super streams / consistent-hash exchange).
L-0351|8.5|Prose|8.5:TradeoffTable|-|Kafka's persisted data reusable by other services.
L-0352|10.4|Prose|-|-|Kafka not a DB: transactions, lookups; inline clarification (no indexes; transactions are write batches).
L-0353|10.4|Prose|-|-|'Never your source of truth' as the lecture's opinion; inline counterpoint plus A-HSD-24.
L-0354|10.4|Figure|10.4:Prose|-|Kafka as first point of entry (Google Analytics, YouTube watch time); Fig 10·b.
L-0355|10.4|Prose|10.4:Figure|-|High-volume ingest: DB 'might cry'; Kafka first, process async.
L-0356|10.4|Prose|10.4:Figure|-|Usual order: DB first then event; Kafka-first is the exception.
L-0357|10.4|MarginNote|-|-|'The instructor's analytics systems': Kinesis first (first-hand, unverifiable).
L-0358|10.1|Prose|10.1:TradeoffTable|-|Kafka has no DLQ; use SQS/RabbitMQ; inline clarification (fallback queue) plus A-HSD-10; back-link Lecture 2 §3.3.
L-0359|10.1|Prose|10.1:SourceNote|SN-10|Write failures to own DB called 'outbox'; SN-10 (fallback store vs transactional outbox) with A-HSD-11.
L-0360|8.5|Prose|-|-|MapReduce only sprinkled (data-engineering specific).
L-0361|8.5|Prose|-|-|Spark cluster could replace counting servers.
L-0362|8.5|Prose|-|-|Frameworks do distributed computing; 'counting servers' generic; inline clarification (transport vs compute).
L-0363|8.5|Prose|-|-|Learn Spark first via O'Reilly book ('mostly the name'); attributed (title unconfirmed).
L-0364|8.5|Prose|-|-|MapReduce paradigm, Hadoop easy, Spark then Flume/Flink; inline clarification (Flume is transport).
L-0365|11|MarginNote|-|-|'How the instructor learned big data': implement to learn; on-the-job lead.
L-0366|11|ForwardChip|-|-|Tomorrow: a counterintuitive high-level pattern, last of the social block: ForwardChip Lecture 8.
"""

DROPPED = [
    {"id": "L-0119", "reason": "Pure transition: 'so far the image upload service covered storage and how the data flows'. Its content is the §3 checklist (L-0061), which the page already shows as Fig 3·a."},
    {"id": "L-0210", "reason": "Pure logistics: 'after the break, the hashtag service'. The hashtag chapters open on the problem itself (L-0211), and the break carries no content."},
]

SN_TEXT = {
    "SN-01": ["L-0079"], "SN-02": ["L-0113"], "SN-03": ["L-0127", "L-0144"], "SN-04": ["L-0163"],
    "SN-05": ["L-0175"], "SN-06": ["L-0344"], "SN-07": ["L-0347"], "SN-08": ["L-0266"],
    "SN-09": ["L-0313"], "SN-10": ["L-0359"], "SN-11": ["L-0323"],
}

ADDITIONS = {
    "A-IUT-01": ("1.1", "Prose", "Sourced sentence after L-0009: Gearman first, then Celery + RabbitMQ."),
    "A-IUT-02": ("1.2", "Prose", "With L-0006: Facebook's 400B PHP page views/month and HipHop."),
    "A-IUT-03": ("3.2", "Prose", "With L-0065/L-0066: one S3 PUT up to 5 GB; multipart for larger objects."),
    "A-IUT-04": ("3.3", "SourceNote", "SN-01: what AWS bills (inbound free, same-Region S3 free, egress/cross-AZ billed)."),
    "A-IUT-05": ("3.3", "SourceNote", "SN-01: NAT gateway per-GB charge; VPC gateway endpoint for S3."),
    "A-IUT-06": ("3.3", "Prose", "With L-0086: presigned POST policy conditions cap size and type."),
    "A-IUT-07": ("3.3", "Prose", "With L-0084: presigned URLs are bearer tokens; s3:signatureAge."),
    "A-IUT-08": ("3.4", "Prose", "With L-0098: a URL can't outlive its signing credentials."),
    "A-IUT-09": ("3.4", "Prose", "With L-0097: ACLs disabled by default; 400 AccessControlListNotSupported."),
    "A-IUT-10": ("3.5", "Prose", "With L-0107: OAC keeps the bucket private, readable only by the distribution."),
    "A-IUT-11": ("3.4", "Prose", "With L-0094: GCS signed URL 7-day max; Azure user-delegation SAS."),
    "A-IUT-12": ("3.5", "Prose", "With L-0105: S3 event notifications trigger async moderation."),
    "A-IUT-13": ("4.3", "Prose", "With L-0204: S3 lifecycle rule cleans orphan uploads."),
    "A-IUT-14": ("3.3", "Prose", "Optional, used: with L-0083, new buckets block public access by default."),
    "A-IUT-15": ("3.4", "StepThrough", "With L-0091 (Fig 3·c step 2 note): 10 MB cap; private-repo attachments need login since May 2023."),
    "A-IUT-16": ("3.4", "Prose", "With L-0103: Microsoft's hybrid guidance (proxy some, direct some, validate)."),
    "A-CDM-01": ("2.2", "Prose", "With L-0030: property (Akamai) vs distribution (CloudFront)."),
    "A-CDM-02": ("2.2", "Prose", "With L-0033: custom hostname = CNAME to the CDN edge hostname."),
    "A-CDM-03": ("2.3", "Prose", "Inline clarification for L-0040 (and referenced from L-0273 in 9.2): CDNs don't cache JSON/HTML by default."),
    "A-CDM-04": ("2.3", "Prose", "With L-0036: TTL from Cache-Control, bounded by CDN min/max; CloudFront default 24 h."),
    "A-CDM-05": ("2.6", "Prose", "With L-0058: versioned file names instead of invalidation."),
    "A-CDM-06": ("2.1", "Prose", "With L-0021: CloudFront VPC origins (Nov 2024)."),
    "A-CDM-07": ("3.5", "Prose", "With L-0117: OAC as the native integration; no keys uploaded."),
    "A-CDM-08": ("3.5", "SourceNote", "SN-02: S3 Standard 11 nines durability, 99.99% availability, 3+ AZs."),
    "A-CDM-09": ("3.5", "Prose", "With L-0114: CloudFront<->S3 transfer waived."),
    "A-CDM-10": ("3.5", "Prose", "With L-0111: 2 India Regions vs CloudFront edges in 7 cities + 46 embedded PoPs (as of Oct 2026)."),
    "A-CDM-12": ("5.2", "Prose", "With L-0169: CloudFront key groups, signature then expiry; added params -> 403."),
    "A-CDM-13": ("5.1", "SourceNote", "SN-04: expiry checked per request."),
    "A-CDM-14": ("5.3", "SourceNote", "SN-05: IP-restricted custom policies, signed cookies."),
    "A-CDM-15": ("5.2", "Prose", "Optional, used: with L-0168/L-0170, Cloudflare token authentication as 'every CDN has something like this'."),
    "A-CDM-16": ("6.2", "Prose", "With L-0191: each unique width billed; blur isn't a privacy control."),
    "A-CDM-17": ("6.2", "Prose", "With L-0186: CloudFront needs the deployable Dynamic Image Transformation solution."),
    "A-CDM-18": ("2.3", "Prose", "Optional, used: with L-0042, Giphy serves through Fastly at huge scale."),
    "A-CDM-19": ("2.6", "Prose", "Optional, used: with L-0051, Netflix Open Connect inside ISPs."),
    "A-CDM-20": ("3.5", "Prose", "With L-0112: S3 built on millions of HDDs."),
    "A-CDM-21": ("2.6", "Prose", "With L-0206: anycast explained."),
    "A-CDM-22": ("9.2", "Prose", "With L-0276: stale-while-revalidate to avoid an expiry burst."),
    "A-HSD-01": ("10.2", "SourceNote", "SN-11: log.retention.hours = 168; retention.ms = -1 or compaction to keep."),
    "A-HSD-02": ("10.2", "Prose", "With L-0328: auto.offset.reset defaults to latest."),
    "A-HSD-03": ("8.4", "Prose", "With L-0294 (and referenced in 10.3): adding partitions remaps keys."),
    "A-HSD-04": ("9.3", "Prose", "With L-0282: one consumer per partition in a group; extras get none."),
    "A-HSD-05": ("8.4", "StepThrough", "With L-0270 (Fig 8·d step 6): commit after write = at-least-once over-count, the recount L-0255 accepts."),
    "A-HSD-06": ("8.4", "Prose", "With L-0308: DynamoDB atomic counters aren't idempotent."),
    "A-HSD-07": ("8.3", "Prose", "Optional, used: with L-0254, Kafka Streams groupBy always re-partitions."),
    "A-HSD-08": ("8.3", "Prose", "With L-0246: Redis Streams persist, consumer groups."),
    "A-HSD-09": ("10.1", "Prose", "With L-0314: producer buffer.memory and delivery.timeout.ms."),
    "A-HSD-10": ("10.1", "Prose", "With L-0358: SQS DLQ after maxReceiveCount; Kafka Connect DLQ setting."),
    "A-HSD-11": ("10.1", "SourceNote", "SN-10: transactional outbox defined."),
    "A-HSD-12": ("10.2", "Prose", "With L-0330: Kafka tiered storage since 3.9."),
    "A-HSD-13": ("10.1", "SourceNote", "SN-09: MSK and Confluent SLAs."),
    "A-HSD-14": ("7.3", "TradeoffTable", "With L-0233 (T4 red cell footnote): MongoDB guide on duplicated data that updates often."),
    "A-HSD-15": ("9.1", "SourceNote", "SN-08: CQRS definition (Fowler, Greg Young)."),
    "A-HSD-16": ("10.2", "Prose", "With L-0325: Kinesis start positions."),
    "A-HSD-17": ("10.5", "Prose", "Optional, used: with L-0338, Python 3.15 cProfile alias and production advice."),
    "A-HSD-18": ("10.5", "Prose", "Optional, used: with L-0334, continuous profilers run everywhere."),
    "A-HSD-19": ("5.4", "Prose", "Optional, used: with L-0201, forensic watermarking identifies leakers."),
    "A-HSD-20": ("5.4", "Prose", "Optional, used: with L-0202, Knit Pro (2022) case."),
    "A-HSD-21": ("10.1", "Prose", "With L-0321: RDS Multi-AZ failover 60-120 s."),
    "A-HSD-22": ("10.1", "Prose", "With L-0322: Cassandra multi-master, last-write-wins."),
    "A-HSD-23": ("10.5", "Prose", "With L-0341: GOMAXPROCS; goroutine stacks are a few KB."),
    "A-HSD-24": ("10.4", "Prose", "With L-0353: Kreps, 'It's Okay To Store Data In Kafka'."),
}
ADDITIONS_NOT_USED = {
    "A-CDM-11": "optional; S3 per-prefix request rates are not needed for any point made in class (the per-user layout in L-0135 is argued for derivability, not throughput).",
}


def main():
    placements = {}
    for line in ROWS.strip().splitlines():
        i, sec, comp, also, sn, note = [x.strip() for x in line.split("|", 5)]
        assert i not in placements, i
        p = {"section": sec, "component": comp, "also": [], "note": note}
        if also != "-":
            for a in also.split(","):
                s, c = a.split(":")
                p["also"].append({"section": s, "component": c})
        if sn != "-":
            p["source_note"] = sn
        placements[i] = p
    P = {
        "lecture": "lec09",
        "ledger": "lectures/lec09/ledger/ledger.jsonl",
        "sections": SECTIONS,
        "components": COMPONENTS,
        "placements": placements,
        "dropped": DROPPED,
        "source_notes": SN_TEXT,
        "additions": {k: {"section": s, "component": c, "note": n} for k, (s, c, n) in ADDITIONS.items()},
        "additions_not_used": ADDITIONS_NOT_USED,
    }
    (D / "placement.json").write_text(json.dumps(P, indent=1, ensure_ascii=False) + "\n")
    write_factcheck(placements)
    print(f"placed {len(placements)}, dropped {len(DROPPED)}")


# --- factcheck_applied.md -------------------------------------------------------------------------
SN_PRECISE = {
    "SN-01": "On AWS, inbound internet traffic and same-Region traffic between EC2 and S3 are free. What is billed is data out to the internet, cross-AZ and cross-Region traffic, and NAT gateway processing (a VPC gateway endpoint avoids the last for S3). So check which of these an extra hop adds; the pre-signed design is still justified by bandwidth and server load.",
    "SN-02": "S3 Standard is designed for 99.999999999% (eleven nines) durability and 99.99% availability over a year, storing objects across at least three Availability Zones. Durability (not losing data) and availability (being reachable) are different promises; a CDN's promise is lower latency from nearby edges.",
    "SN-03": "Instagram's photos were originally served by Amazon CloudFront in front of S3, not Cloudflare; after the Facebook acquisition they moved to Facebook's CDN (fbcdn.net). The lesson stands: with stored URLs that move would have meant rewriting every post.",
    "SN-04": "The URL is short-lived because the backend signs it with a short expiry; the CDN checks that expiry on every request and rejects the URL afterwards, however long the photo stays in its cache. The signing keys themselves are long-lived key-group keys, not short-lived certificates.",
    "SN-05": "Between Instagram's pseudo privacy and 'no CDN at all' there is a spectrum: very short-lived signed URLs, URLs bound to the viewer's IP range, signed cookies, authentication at the edge, or encrypted media. Serving every byte through your own authorised servers is the extreme end, and signed URLs stay bearer tokens until they expire.",
    "SN-06": "A billion half-KB documents is 10^9 x 512 B, about 5 x 10^11 B: roughly 500 GB, half a terabyte, not half a gigabyte.",
    "SN-07": "From the top 100 to the top 1 million is 10^6 / 10^2 = 10^4: a 10,000x jump, not 1,000x.",
    "SN-08": "CQRS (Command Query Responsibility Segregation) means a different model for updates than for reads; it predates Kafka (Fowler credits Greg Young). Building a separate read-optimised store from events, as the hashtag service does, is in its spirit, and Kafka is a common way to connect the two models. Fowler also warns that for most systems CQRS adds risky complexity.",
    "SN-09": "Kafka can go down, but its availability belongs to a deployment, not to Kafka: Amazon MSK's Multi-AZ SLA credits start below 99.9%, Confluent Cloud offers 99.99% on Standard/Enterprise (2+ eCKU) and multi-zone Dedicated, and 99.5% on Basic. Producers need a plan for when it is unavailable.",
    "SN-10": "Writing messages that failed to reach Kafka into your own database and replaying them later is a fallback store. The transactional outbox pattern goes further: every outgoing message is written to an outbox table in the same local transaction as the business data, and a separate relay publishes it, so there is no dual-write gap.",
    "SN-11": "Kafka deletes messages after a retention period by default: log.retention.hours = 168 (7 days) with cleanup policy 'delete' (unchanged as of Kafka 4.3). Keeping data longer or forever is opt-in: retention.ms = -1 per topic, or log compaction to keep the latest value per key.",
}


def write_factcheck(placements):
    final = {}
    for l in (L / "factcheck/final.jsonl").open():
        if l.strip():
            d = json.loads(l)
            final[d["id"]] = d
    ledger = {}
    for l in (L / "ledger/ledger.jsonl").open():
        if l.strip():
            d = json.loads(l)
            ledger[d["id"]] = d
    sn_of = {i: k for k, v in SN_TEXT.items() for i in v}
    flagged = {i: d for i, d in final.items() if d.get("treatment", "none") != "none"}
    sn_ids = [i for i in flagged if i in sn_of]
    inline = [i for i in flagged if i not in sn_of]
    simp_low = [i for i, d in final.items() if d["verdict"] == "simplified" and d["severity"] == "low" and d["treatment"] == "none"]
    unver = [i for i, d in final.items() if d["verdict"] == "unverifiable"]

    def sec(i):
        return placements[i]["section"] if i in placements else "dropped"

    def short(s, n=170):
        return s if len(s) <= n else s[: n - 3].rstrip() + "..."

    out = ["# Lecture 07 (lec09): fact-check treatments applied", ""]
    out.append("Policy (from the brief, applied mechanically):")
    out.append("- **wrong / outdated / imprecise-medium / imprecise-high:** the teacher's point stays on the page as taught, and a **SourceNote** (\"More precisely\") sits directly after it with the precise version and its sources.")
    out.append("- **imprecise-low / simplified-medium:** a light inline clarification (a clause or one sentence, with a source link where a fact is added).")
    out.append("- **simplified-low:** left as taught. Where final.jsonl still asks for an inline touch (treatment `inline`) the page adds one clause; a 'keep' addition that attaches is woven in as a separate sourced sentence, not as a correction.")
    out.append("- **unverifiable:** stated as the class's (or the instructor's) experience or opinion, with no empty source link. Hedges stay hedges.")
    out.append("")
    out.append("Verifier overrides (`verdict_review.md`, `verdict_overrides.jsonl`) are already in final.jsonl and applied: **L-0273** is simplified/medium (was simplified/low), treated like L-0040 (inline clarification with A-CDM-03). Kafka defaults are worded 'as of Kafka 4.3' (unchanged from the 4.1 pages the checker cited); Python docs are 3.15 (A-HSD-17). final.jsonl marks L-0040 and L-0273 (simplified/medium) with treatment `note`; per the course policy for simplified-medium they get an inline clarification, not a SourceNote (as lec01 did for its simplified-medium item).")
    out.append("")
    n_sn_notes = len(SN_TEXT)
    out.append(f"Counts: {len(final)} items checked; {len(flagged)} flagged (treatment other than none) = {len(sn_ids)} with a SourceNote ({n_sn_notes} notes) + {len(inline)} inline clarifications. Also listed: {len(simp_low)} simplified-low items left as taught (no treatment) and {len(unver)} unverifiable items attributed. No flagged item is dropped.")
    out.append("")
    out.append("## 1. SourceNotes")
    out.append("")
    for k, ids in SN_TEXT.items():
        s = sec(ids[0])
        vs = ", ".join(f"{i} ({final[i]['verdict']}/{final[i]['severity']})" for i in ids)
        out.append(f"### {k} · §{s} · {vs}")
        for i in ids:
            out.append(f"- **Teacher's point (kept):** {short(ledger[i]['statement'], 220)}")
        out.append(f"- **More precisely:** {SN_PRECISE[k]}")
        adds = [a["add_id"] for i in ids for a in final[i].get("additions", []) if a["add_id"] in ADDITIONS]
        if adds:
            out.append(f"- **Additions used:** {', '.join(adds)}")
        srcs = []
        for i in ids:
            for u in final[i].get("sources", []):
                if u not in srcs:
                    srcs.append(u)
        out.append(f"- **Sources:** {' · '.join(srcs)}")
        out.append("")
    out.append("## 2. Inline clarifications")
    out.append("")
    out.append("Each line: id · section · verdict/severity · what the page adds (from final.jsonl's note). The teacher's sentence stays; the clause or sentence follows it, with the source linked.")
    out.append("")
    for i in sorted(inline):
        d = final[i]
        src = d.get("sources", [])
        out.append(f"- **{i}** · §{sec(i)} · {d['verdict']}/{d['severity']}: {short(d['note'], 420)}" + (f" Source: {src[0]}" if src else ""))
    out.append("")
    out.append("## 3. Left as taught (simplified-low, treatment none)")
    out.append("")
    out.append("These read as taught. Where a 'keep' addition attaches it appears as its own sourced sentence (see placement.json `additions`).")
    out.append("")
    for i in sorted(simp_low):
        out.append(f"- **{i}** · §{sec(i)}: {short(final[i]['note'], 200)}")
    if not simp_low:
        out.append("None in this lecture: every simplified-low item in final.jsonl carries treatment `inline`, so each gets its one clause in section 2 above.")
    out.append("")
    out.append("## 4. Unverifiable: attributed, no source link")
    out.append("")
    for i in sorted(unver):
        d = final[i]
        out.append(f"- **{i}** · §{sec(i)} · severity {d['severity']}: attributed as {'the instructor' if ledger[i]['speaker'] == 'teacher' else 'the class'}'s experience or opinion. Checker: {short(d['note'], 260)}")
    out.append("")
    (D / "factcheck_applied.md").write_text("\n".join(out) + "\n")


if __name__ == "__main__":
    main()
