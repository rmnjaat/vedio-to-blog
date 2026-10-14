# Fact-check report: images (serving, browser decoding, on-the-fly Open Graph images) and delegation (fan-out) (Lecture 6)

Scope: 46 ledger items whose topic starts with images / delegation (L-0007 .. L-0052); no admin items in this group. **46 items checked.** Date checked: 2026-10-13.

## Counts

| Verdict | Count |
|---|---|
| accurate | 34 |
| simplified | 6 |
| imprecise | 2 |
| wrong | 1 |
| outdated | 0 |
| unverifiable | 3 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 1 |
| low | 9 |
| none | 36 |

Additions proposed: 12 (see `images_delegation_additions.jsonl`).

Calibration: live-class simplification is expected. The teacher's picture of image serving (IMG tag -> GET -> bytes -> signature -> decoder) and of GitHub's on-demand Open Graph cards was checked against the WHATWG MIME Sniffing spec, MDN, framework docs, GitHub's 2021 engineering post, and a live card fetched from opengraph.githubassets.com. Items are flagged only where a careful reader could take away a wrong idea. Only one claim is factually wrong (PIL uses ImageMagick). The rest are low-severity nuances: Kafka share groups, TIFF support, Django static serving in production, Content-Type and path traversal, and GitHub's origin being a separate service.

## Items needing a decision (ordered by severity)

### L-0047 | wrong | severity: medium

- **Teacher/ledger statement:** PIL (Python Image Library) is typically the best library for generating images; it internally uses ImageMagick through a C++ binding and gives a native Python interface.
- **Verbatim:** "It internally uses ImageMagick. It has a C++ binding to that." (teacher)
- **Issue:** Pillow ("the friendly PIL fork"; the original PIL is no longer maintained) does not use ImageMagick. It is a C extension with its own imaging core, linking libjpeg, zlib, libtiff, libwebp, FreeType and others; its build docs never mention ImageMagick. The Python binding to ImageMagick is a separate library, Wand ("a ctypes-based simple ImageMagick binding for Python"). In an interview this would mix up two different libraries.
- **Suggested note:** Pillow, the maintained fork of PIL, has its own C imaging core built on libraries like libjpeg, zlib and FreeType. ImageMagick is a separate tool, used from Python via Wand.
- **Sources:** [pillow.readthedocs.io](https://pillow.readthedocs.io/en/stable/), [pillow.readthedocs.io (build deps)](https://pillow.readthedocs.io/en/stable/installation/building-from-source.html), [docs.wand-py.org](https://docs.wand-py.org/en/latest/)

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0007 | simplified | low | True for classic consumer groups; Kafka 4.2 (Feb 2026) share groups let consumers exceed partitions (KIP-932). |
| L-0008 | simplified | low | Bieber has ~91.8M X followers (Sep 2026), not 10-15M; teacher hedged. |
| L-0009 | imprecise | low | Kafka isn't slow; the limit is consumer parallelism per partition in a consumer group. |
| L-0021 | simplified | low | "Header" = file signature in body bytes; SVG is not sniffed and needs Content-Type image/svg+xml. |
| L-0022 | imprecise | low | TIFF is natively supported only in Safari (MDN); SVG is rendered, not raster-decoded. |
| L-0024 | simplified | low | Django serves static files only in development; its docs call that unsuitable for production. |
| L-0025 | simplified | low | Static servers set Content-Type from the extension and must block path traversal (safe_join). |
| L-0044 | simplified | low | GitHub's origin is a separate Node.js image service using the GraphQL API, not the main API server. |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0012 | Teacher's own production war story (50-60k notifications in 5 s). |
| L-0017 | Design opinion about platforms being basic building blocks. |
| L-0039 (low) | GitHub publishes no cache lifetime or refresh interval for repository cards; "one or two days" is the teacher's estimate. |
