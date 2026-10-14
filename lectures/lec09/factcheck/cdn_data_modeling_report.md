# Fact-check report: CDN, data modeling, extensibility (Lecture 09)

Scope: all 119 ledger items in group `cdn_data_modeling` (topics starting with `cdn`, `data-modeling`, `extensibility`); 0 admin items skipped. **119 items checked.** Checked 2026-10-13 against current vendor docs (CloudFront, S3, Cloudflare, Akamai TechDocs) as of that date.

## Counts

| Verdict | n |
|---|---|
| accurate | 88 |
| simplified | 14 |
| imprecise | 8 |
| wrong | 2 |
| outdated | 0 |
| unverifiable | 7 |

| Severity | n |
|---|---|
| high | 0 |
| medium | 4 |
| low | 22 |
| none | 93 |

Additions proposed: 22 (A-CDM-01 .. A-CDM-22).

Calibration: The CDN segment is a deliberately minimal live-class model: a pull CDN as a transparent reverse proxy, with the backend generating URLs. I judged it by that model. Teacher simplifications that a reader would naturally refine (e.g. "all it asks is one origin URL") are `accurate`. I flagged `simplified` where a missing condition changes what a reader would build: cacheability rules, keyless OAC, built-in versus add-on image transforms. I used `imprecise` where terms or mechanisms are mixed up: TTL vs URL expiry vs certificate, DNS vs BGP routing, "nine nines". I also used it for over-generalisations ("truly private means no CDN", "you cannot serve from S3"). The only `wrong` items are a factual slip that repeats across two items: Instagram's pre-acquisition CDN was Amazon CloudFront, not Cloudflare. The design lesson built on it is untouched. War stories, opinions, company internals and hedged numbers are `unverifiable`.

## Items needing a decision (ordered by severity)

### L-0040 | simplified | severity: medium
- **Teacher/ledger statement:** A CDN does not care whether the response is an image or a video: whatever it gets in the response it caches as a set of bytes, so you can cache API responses, JSON, text, images, videos on a CDN.
- **Verbatim:** "For CDN, it is just set of bytes, which is the beauty of it." (teacher)
- **Issue:** Any bytes *can* be cached, but CDNs don't cache "whatever they get". Cloudflare "does not cache HTML or JSON by default" (it caches by file extension). It also skips responses with Cache-Control private/no-store/no-cache, max-age=0 or Set-Cookie. A learner who designs the hashtag JSON cache (L-0273) without setting headers or cache rules will get no caching.
- **Suggested note:** A CDN can cache any bytes, but only responses marked cacheable by origin Cache-Control headers or CDN cache rules. Many CDNs do not cache HTML/JSON by default.
- **Sources:** [developers.cloudflare.com](https://developers.cloudflare.com/cache/concepts/default-cache-behavior/), [developers.cloudflare.com](https://developers.cloudflare.com/cache/how-to/cache-rules/)

### L-0113 | imprecise | severity: medium
- **Teacher/ledger statement:** S3 gives "nine nines guarantee, something like that", whereas a CDN gives better response time.
- **Verbatim:** "S3 gives you nine nines guarantee, something like that." (teacher)
- **Issue:** S3 Standard is designed for 99.999999999% (eleven nines) durability and 99.99% availability. "Nine nines" is a wrong number for a common interview fact. Durability is also a different property from availability and from latency.
- **Suggested note:** S3 is designed for eleven nines of durability and 99.99% availability. A CDN's advantage is latency from nearby edges.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html)

### L-0163 | imprecise | severity: medium
- **Teacher/ledger statement:** Access by URL lasts only while the cached photo's TTL / certificate is valid; once the TTL or certificate expires the URL is invalidated. Board: "The URL is short lived because certs are short lived".
- **Verbatim:** "Once the TTL expires, once the certificate expires, then your photo becomes invalidated." (teacher)
- **Issue:** This mixes three separate things. Signed-URL validity comes from the expiration time in the signed policy. Cache TTL is how long the edge keeps the object, which is independent. The signing key pair is long-lived and is not a short-lived certificate. CloudFront "compares the expiration time in the URL with the current time".
- **Suggested note:** The URL is short-lived because the backend signs it with a short expiry; after that the CDN rejects it, however long the photo remains cached.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html)

### L-0175 | imprecise | severity: medium
- **Teacher/ledger statement:** A truly private platform cannot use a CDN: every image request must go through your API server, which checks access each time.
- **Verbatim:** "So in case you want to implement a truly private platform ... then you cannot use CDN." (teacher)
- **Issue:** This over-generalises. The options include very short-lived signed URLs, custom policies restricted to the viewer's IP range, signed cookies, edge token checks, and client-side encryption of media. Each tightens privacy while keeping a CDN. Proxying every byte is one end of a trade-off, not the only way to get privacy.
- **Suggested note:** Stronger privacy means tighter controls: very short-lived, IP-bound signed URLs or cookies, edge auth, or encrypted media. At the extreme, you serve every byte through your own authorised servers.
- **Sources:** [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html), [docs.aws.amazon.com](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html)

### L-0127 | wrong | severity: low
- **Teacher/ledger statement:** Instagram most probably used Cloudflare as its CDN; after the Facebook acquisition it could no longer use Cloudflare and had to use the Facebook CDN, so stored URLs would have meant rewriting every post.
- **Verbatim:** "Most probably they were using Cloudflare as a CDN. Facebook came and acquired them, but now they cannot use Cloudflare CDN." (teacher)
- **Issue:** Early Instagram stored photos on Amazon S3 and used Amazon CloudFront as its CDN. It later moved to Facebook infrastructure (fbcdn.net) by choice, not because it was forced to. The teacher hedged ("most probably"). The design lesson stands.
- **Suggested note:** Instagram originally served photos through Amazon CloudFront in front of S3, and after the acquisition moved to Facebook's CDN.
- **Sources:** [highscalability.com](https://highscalability.com/instagram-architecture-14-million-users-terabytes-of-photos/) (quotes Instagram's 2011 engineering post; the original instagram-engineering.com page could not be fetched)

### L-0144 | wrong | severity: low
- **Teacher/ledger statement:** When Instagram migrated from Cloudflare to the Facebook CDN it would have done something similar.
- **Verbatim:** "This is how Instagram, when they would have migrated from Cloudflare to Facebook CDN, they would have done something similar." (teacher)
- **Issue:** Same slip as L-0127: the earlier CDN was Amazon CloudFront.
- **Suggested note:** Read "Cloudflare" as Amazon CloudFront; the reasoning is unchanged.
- **Sources:** [highscalability.com](https://highscalability.com/instagram-architecture-14-million-users-terabytes-of-photos/)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0021 | simplified | low | Origin needn't be public: CloudFront OAC for private S3; VPC origins (Nov 2024) for private subnets. |
| L-0036 | simplified | low | CDN caches only cacheable responses (Cache-Control, cache policy). |
| L-0053 | simplified | low | Uploading keys is one model; CloudFront OAC is keyless (service principal + SigV4). |
| L-0108 | imprecise | low | S3 can serve directly (public or presigned URLs); private bucket is a design choice. |
| L-0111 | imprecise | low | AWS has 2 India Regions (Mumbai, Hyderabad; 3 AZs each), and comparing them with CDN PoPs is apples to oranges; CloudFront itself has PoPs in 7+46 Indian cities. |
| L-0112 | simplified | low | S3 is indeed HDD-based (millions of disks); CDN media unspecified, teacher hedges. |
| L-0115 | simplified | low | Private-bucket access via OAC needs no uploaded keys on CloudFront. |
| L-0116 | simplified | low | CDN sends a SigV4-signed request (Authorization header), not a presigned URL. |
| L-0129 | simplified | low | Bing API hike real (May 2023, ~3-10x) but Microsoft's stated reason was investment, not usage. |
| L-0141 | simplified | low | "Cannot serve S3 URL" true only for this private-bucket design. |
| L-0160 | simplified | low | Rhetorical; access needs a still-valid signed URL. |
| L-0167 | imprecise | low | Cloudflare history slip; query params make URLs expiring and tamper-proof, privacy comes from the API. |
| L-0168 | simplified | low | CDNs do have access controls (signed URLs/cookies, token auth); they are stateless about users. |
| L-0169 | simplified | low | It's a signature (RSA/ECDSA or HMAC), not a certificate; JWT analogy fine. |
| L-0186 | simplified | low | Image transforms usually add-ons; CloudFront needs a deployed AWS solution. |
| L-0206 | imprecise | low | Conflates DNS-based mapping (Akamai) with anycast/BGP (Cloudflare). |
| L-0207 | imprecise | low | Mechanisms are publicly documented; only tuning is proprietary. |
| L-0273 | simplified | low | JSON caching usually must be enabled via headers or rules. |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0044 | Cost-parity rule of thumb; depends on traffic and pricing. |
| L-0134 | LinkedIn internal storage scheme not documented. |
| L-0139 | Anecdotal frequency of CDN switches. |
| L-0140 | Career advice from experience. |
| L-0170 | Facebook CDN query parameters (oe, oh, _nc_*) undocumented; teacher guesses. |
| L-0176 | Instagram server count and the 50-100x multiplier are not public; teacher hedges. |
| L-0208 | "Cloudflare hired from Akamai" is hearsay; Akamai's pioneer status not sourced here. |

## Notes on sources
- instagram-engineering.com (original 2011 "What Powers Instagram" post) and engineering.giphy.com did not load; I used the High Scalability write-up and Fastly's GIPHY customer page instead.
- Akamai's end-user-mapping paper (UMass PDF) and the WhatsApp encryption PDF downloaded but could not be read as text; neither is cited.
- cloudflare.com/learning pages returned 403; I used blog.cloudflare.com and developers.cloudflare.com instead.
