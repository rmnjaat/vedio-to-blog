# Verdict review: second fact-checker, lecture 09

Date: 2026-10-13. Scope: every verdict marked `wrong` or `outdated`, or with severity `medium`/`high`, in `image_upload_tech_stack_trends.jsonl`, `cdn_data_modeling.jsonl` and `hashtag_service_design_method.jsonl` (13 items: 5 wrong, 8 medium; there are no `outdated` or `high` verdicts). I also checked 15 randomly sampled `accurate` verdicts (seed 15) and all 62 proposed additions. I opened and searched every URL cited below myself. When a page did not contain a claimed phrase, the entry says so.

## Summary

- **Flagged verdicts:** I re-checked all 13 against the ledger item, the transcript and the sources, and agree with all 13 on verdict, severity and label.
- **One dispute, outside the flagged set.** L-0273 (cdn_data_modeling, simplified/low) makes the same claim as L-0040 (simplified/medium): the CDN "caches whatever the origin sends", here applied to caching the hashtag JSON API. I raise it to **medium** for consistency. This is recorded in `verdict_overrides.jsonl`.
- **Spot-check:** all 15 sampled `accurate` verdicts agree. 13 of the 15 are reasoning or problem-statement items with no source ("Correct as stated for this context"). That is acceptable for these items.
- **Additions:** 62 checked. 48 confirmed, 14 reworded (mostly for scope, or to fix a quote that isn't on the cited page), 0 rejected.
- **Version drift:** Kafka 4.3.1 (June 2026) is the current release (https://kafka.apache.org/community/downloads/). The checker cited the 4.1 broker and consumer configs. I re-checked the 4.3 pages and the defaults are unchanged: `log.retention.hours` = 168, `log.cleanup.policy` = delete, `auto.offset.reset` = latest. Where text says "Kafka 4.1", it can read "as of Kafka 4.3". The Python docs at /3/ are now the **3.15** docs. The cProfile → profiling.tracing alias and the sampling-profiler advice are new in 3.15, so A-HSD-17 is now pinned to 3.15.

## Disputes

| ID | First verdict | My view | Evidence |
|---|---|---|---|
| L-0273 | simplified / low | **simplified / medium** | The same misconception as L-0040, which the checker rated medium. Cloudflare "does not cache HTML or JSON by default" and skips `private`/`no-store`/`no-cache`/`max-age=0`/`Set-Cookie` responses (https://developers.cloudflare.com/cache/concepts/default-cache-behavior/). Cache Rules or origin headers are what make content "eligible to cache" (https://developers.cloudflare.com/cache/how-to/cache-rules/). Here the teacher applies the claim directly to putting the hashtag API behind the CDN. A learner who copies that design gets no caching unless they set headers or rules. That is a wrong design decision, so medium. |

## Agreements (with extra evidence where useful)

### Image upload / cost
- **L-0079 imprecise / medium: agree.** The AWS architecture blog says "There is no charge for inbound data transfer across all services in all Regions". S3 pricing lists as free "Data transferred in from the internet" and data "to any AWS service(s) within the same AWS Region". NAT gateway per-GB processing, cross-AZ and cross-Region traffic are billed (https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/, https://aws.amazon.com/s3/pricing/). The transcript ([01:01:00] and the hop discussion) presents per-hop egress/ingress as the main cost. That would give a wrong cost answer in an interview, so medium is right. The presigned-URL design is still justified on bandwidth and server load.

### CDN / data modelling
- **L-0040 simplified / medium: agree.** The Cloudflare default-cache page is quoted under L-0273 above. The point "any bytes can be cached" stands.
- **L-0113 imprecise / medium: agree.** S3 Standard is "Designed to provide 99.999999999% durability and 99.99% availability of objects over a given year" (https://docs.aws.amazon.com/AmazonS3/latest/userguide/DataDurability.html). The teacher hedged ("nine nines guarantee, something like that", transcript [01:01:00]). Even so, "S3 = 11 nines durability, 4 nines availability" is a standard interview fact, and the item merges durability with availability. Medium stands.
- **L-0127 wrong / low: agree.** High Scalability's Dec 2011 Instagram write-up lists "Amazon CloudFront as the CDN" and photos "stored on Amazon S3" (https://highscalability.com/instagram-architecture-14-million-users-terabytes-of-photos/). The teacher hedged ("Most probably", transcript [01:06:42]) but repeated it as fact at [01:23:21] ("They were using Cloudflare, they migrated to FBCDN"). Low is right, because the lesson (stored URLs make a CDN switch a mass migration) is unaffected. Caveat: this is a secondary source quoting Instagram's 2011 engineering post. The checker could not open that post either.
- **L-0144 wrong / low: agree.** Same slip as L-0127, same source. Label consistency: L-0167 repeats the slip inside a parenthetical and is rated imprecise/low. That rating is fine because the slip is a side remark in a URL-anatomy item. I am not overriding it.
- **L-0163 imprecise / medium: agree.** CloudFront: the signed URL's policy carries the expiry, and "CloudFront checks the expiration date and time in a signed URL at the time of the HTTP request". The signing keys are long-lived key-group keys, not short-lived certificates (https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-urls.html). The board line "URL is short lived because certs are short lived" makes the misconception central, so medium.
- **L-0175 imprecise / medium: agree.** A CloudFront custom policy can restrict "the IP address or range of IP addresses of the users". Signed cookies cover many files without changing URLs (signed-urls page; https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-signed-cookies.html). The teacher's own caveat stands: signed URLs remain bearer tokens until they expire (transcript [01:27:11]). So the fair reading is "a spectrum of trade-offs", not "never a CDN". The checker's precise_version keeps the teacher's extreme option.

### Hashtag service / Kafka / estimation
- **L-0266 imprecise / medium: agree.** Fowler: CQRS is separate models for update and read, "first heard described by Greg Young"; it "fits well with event-based programming models". He also warns that "for most systems CQRS adds risky complexity" (https://martinfowler.com/bliki/CQRS.html). The transcript ([02:22:29]) says "The CQRS pattern ... is because of this" (Kafka). That reverses cause and tool.
- **L-0313 imprecise / medium: agree.** MSK's Multi-AZ SLA credits start below 99.9% (https://aws.amazon.com/msk/sla/). Confluent offers 99.99% for Standard/Enterprise with 2 eCKU and for multi-zone Dedicated, and 99.5% for Basic (https://docs.confluent.io/cloud/current/clusters/cluster-types.html). Availability belongs to a deployment, not to Kafka. The teacher's real point ([02:52:05]: it can go down, so plan for it) stands.
- **L-0323 wrong / medium: agree.** Kafka 4.3 broker configs: `log.retention.hours` default 168 and `log.cleanup.policy` default delete. `log.retention.ms` = -1 means "no time limit" (https://kafka.apache.org/43/configuration/broker-configs/, and 4.1 as cited). The transcript [02:57:24] says verbatim "messages will be there forever unless you have configured a deletion policy". That is wrong for a default install. Medium, because it changes capacity planning and the replay assumptions in L-0324/L-0328.
- **L-0344 wrong / medium: agree.** The ledger records a student statement (status open). The arithmetic: 10^9 × 512 B ≈ 5 × 10^11 B, which is about 500 GB, not "half a gig". NIST lists giga = 10^9 and tera = 10^12 (https://www.nist.gov/pml/owm/metric-si-prefixes). The teacher's reply at [03:13:42] was a joke, not a correction, and his next line ([03:13:49], L-0345) is exactly about underestimating the jumps from million to billion. The slip would otherwise stand uncorrected on the page, so medium is fair.
- **L-0347 wrong / low: agree.** At [03:14:39]–[03:15:04] the student moves from 100 to 1 million images, and the teacher says "thousand X". 10^6 / 10^2 = 10^4. The point (a huge jump) stands, so low.
- **L-0359 imprecise / medium: agree.** The student's idea ([03:22:03]) was to write the message to our database when the Kafka write fails. The outbox pattern instead stores every message "as part of the transaction that updates the business entities", and "A separate process then sends the messages to the message broker" (https://microservices.io/patterns/data/transactional-outbox.html). A failure-only fallback write keeps the dual-write gap. Naming the wrong pattern would give a wrong interview answer, so medium.

## Spot-check of 15 accurate verdicts (random, seed 15)

Sampled with `random.seed(15); random.sample(sorted accurate rows by id, 15)`:
L-0348, L-0076, L-0017, L-0197, L-0267, L-0025, L-0063, L-0320, L-0356, L-0089, L-0019, L-0030, L-0309, L-0287, L-0250.

**Result: 15/15 agree.** Notes:
- **L-0076:** the S3 presigned page confirms that uploads need no AWS credentials, that the URL uses the generating principal's credentials, and that it is valid "up to the expiration date and time".
- **L-0030:** Akamai's "property" definition confirmed. CloudFront's term is "distribution" (A-CDM-01).
- **L-0019:** correct for the pull model taught. The teacher himself notes the API exception.
- **L-0197:** reasoning about client-side decoding being extractable from an APK is sound.
- **L-0356:** "DB first, then event" being the usual order is a fair description. The outbox pattern formalises it.
- The rest (L-0348, L-0017, L-0267, L-0025, L-0063, L-0320, L-0089, L-0309, L-0287, L-0250) are design-flow, requirement or motivation items, correct in context.

## Notes on cited URLs

- **All URLs cited by the three checkers' additions opened**, including the PyCon 2013 archive, LiveLaw (AMP), Confluent cluster-types and the AWS Solutions page.
- **Partly read:** Kafka javadoc, Streams DSL guide and Connect configs are very long pages, so I read them in two chunks.
  - The Streams DSL guide does not contain the "internal repartition topic" wording for `groupBy`; only "always causes data re-partitioning". A-HSD-07 is reworded.
  - The KafkaConsumer javadoc does not say that extra consumers "stay idle". A-HSD-04 is reworded.
- **Quotes not found verbatim:**
  - Confluent's Kreps post has "raising the bar for how you run it, though", not "does mean raising the bar". A-HSD-24 quote trimmed.
  - The CloudFront Expiration page does not say s-maxage applies "only to shared caches". A-CDM-04 reworded.
- **Not opened by me (and not used):** Instagram Engineering's 2011 "What powers Instagram" post. Both passes rely on High Scalability's summary of it for L-0127/L-0144.
- **Version-pinned pages:**
  - AWS Regions (34 Regions; Mumbai and Hyderabad 3 AZs each) and CloudFront features (India: 7 regular PoP cities, 46 embedded), as of 2026-10-13.
  - Dynamic Image Transformation for CloudFront v8.1.2 (10/2026).
  - Python docs are 3.15.
  - Azure SAS overview updated 2026-02-27.
- **Secondary / vendor sources:**
  - VdoCipher glossary (A-HSD-19): accurate but vendor content, kept as optional.
  - High Scalability: a secondary summary of Instagram's own post.
