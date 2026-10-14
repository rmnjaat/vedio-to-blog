# Fact-check report: image upload, tech-stack trends, learning approach, cost (Lecture 09)

Scope: 68 ledger items in group `image_upload_tech_stack_trends` (topic roots image-upload, tech-stack-trends, learning-approach, cost). No admin items skipped. **68 items checked.** Checked 2026-10-13; product facts are as of that date (S3, CloudFront, GCS, Azure Storage docs current at that date).

## Counts

| Verdict | Count |
|---|---|
| accurate | 49 |
| simplified | 6 |
| imprecise | 5 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 8 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 1 |
| low | 13 |
| none | 54 |

Additions proposed: 16 (see `image_upload_tech_stack_trends_additions.jsonl`).

Calibration: live-class simplification is expected. The pre-signed URL walkthrough and the GitHub DevTools demo are largely right, and are marked accurate where they match S3's presigned POST mechanics. Items are flagged only where a reader would come away with a wrong idea: AWS transfer billing, the year-one Instagram stack, mislabelled policy/signature fields, and the claim that the backend "calls S3" to create a URL. Opinions, predictions and career advice are marked unverifiable or accurate with severity none, unless they make a checkable claim (Go adoption, ChatGPT's stack).

## Items needing a decision (ordered by severity)

### L-0079 | imprecise | severity: medium

- **Teacher/ledger statement:** AWS egress cost is a big pain: anything going out of or coming into your EC2 instance is billed (egress and ingress), so every hop you introduce for a 5 MB upload costs relatively huge money.
- **Verbatim:** "for every hop that introducing, you are actually, you are actually being billed for egress and ingress cost." (teacher)
- **Issue:** AWS does not bill inbound data from the internet ("There is no charge for inbound data transfer across all services in all Regions"). S3 does not charge for data transferred in from the internet, or from a bucket to AWS services in the same Region. The billed items are data out to the internet, cross-AZ and cross-Region traffic, and per-GB NAT gateway processing. An extra same-Region hop on the upload path therefore usually adds infrastructure and bandwidth cost, not ingress/egress fees. A learner could misjudge where the money goes, both in a design review and in an interview.
- **Suggested note:** On AWS, inbound internet traffic and same-Region EC2-to-S3 traffic are free. What gets billed is egress to the internet, cross-AZ/cross-Region traffic and NAT gateway processing, so check which of these an extra hop actually adds. Egress matters most when serving images, not when receiving uploads.
- **Sources:** [aws.amazon.com (data transfer costs)](https://aws.amazon.com/blogs/architecture/overview-of-data-transfer-costs-for-common-architectures/), [aws.amazon.com (S3 pricing)](https://aws.amazon.com/s3/pricing/)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0006 | imprecise | low | Facebook's PHP/MySQL/memcached stack was widely copied, but "every single one" over-generalises; Instagram (2010) itself chose Django. |
| L-0009 | imprecise | low | Year-one (Dec 2011) Instagram used Gearman, not Celery/RabbitMQ (adopted later, PyCon 2013); Cassandra was not in the 2011 stack; memcached was the cache and Redis held feeds and sessions. |
| L-0078 | imprecise | low | Bandwidth saving is right; "pay 2x data transfer" isn't, for a same-Region AWS hop (inbound and EC2-to-S3 same-Region traffic are free). |
| L-0098 | imprecise | low | "policy" carries the expiry and conditions; the signature is the separate X-Amz-Signature, made with IAM credentials (not an "S3 key"). Expiry is also capped by the credential lifetime. |
| L-0082 | simplified | low | GitHub uses S3 presigned POST (form fields); the more common presigned URL is a PUT with the signature in the query string. |
| L-0084 | simplified | low | The backend signs the URL itself with its own credentials; it does not ask S3 to create it. |
| L-0085 | simplified | low | Same point: the "API call to S3" is local SDK signing; S3 checks the signature only when the URL is used. |
| L-0097 | simplified | low | public-read does make the object world-readable, but new buckets now have ACLs disabled by default (uploads specifying such ACLs fail with 400) and Block Public Access on. |
| L-0103 | simplified | low | "Everywhere, always" over-generalises; many services mix proxied (validated) and direct uploads. |
| L-0107 | simplified | low | S3 is private plus CDN-only only if you configure it (CloudFront OAC plus a bucket policy); GitHub's own demo used acl public-read. |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0005 | Opinion about stack trend cycles. |
| L-0008 | Claim about adoption by post-2012 (Indian) startups; no public data by founding year. Severity low. |
| L-0010 | Opinion/advice about bandwagon adoption. |
| L-0012 | Prediction about the next stack (hedged). |
| L-0013 | "Go failed to capture the market" is opinion. Stack Overflow 2025 shows Go at 16.4% of respondents vs Python 57.9%. Severity low. |
| L-0014 | Career advice. |
| L-0015 | OpenAI does not publish its full backend stack; "all Python" can't be confirmed. Severity low. |
| L-0016 | Opinion. "Move fast" was a documented Facebook value. |
