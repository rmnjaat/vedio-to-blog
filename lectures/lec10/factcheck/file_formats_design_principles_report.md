# Fact-check report: file formats, design principles (Lecture 10)
Scope: 42 ledger items from groups.json group `file_formats_design_principles` (topic roots `file-formats`, `design-principles`); 0 admin items skipped. **42 items checked.** Checked 2026-10-13.

## Counts

| Verdict | n |
|---|---|
| accurate | 35 |
| simplified | 3 |
| imprecise | 3 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 1 |

| Severity | n |
|---|---|
| high | 0 |
| medium | 0 |
| low | 6 |
| none | 36 |

Additions proposed: 9 (A-FFD-01..09).

Calibration: Most of this group is design advice (simplicity, cost, imagining implementation, the three hats). I judged it as sound advice (`accurate`) unless it made a checkable technical claim. The lecture's own dictionary file format (16-byte header: 8-byte name, 4-byte version, 4-byte index size) is internally consistent and correct as designed. The checkable claims are the teacher's asides about real-world formats (PNG, JPEG, MP4, Parquet, JSON, CSV, PDF, TIFF). There I flagged slips in detail: the PNG signature bytes, Parquet's metadata sitting in a footer rather than a header, and the CSV header line. I also flagged the generalisation that "every file format" keeps its metadata in a leading header, since many formats (ZIP, Parquet, PDF, MP4 by default) keep it at the end. None of these changes the lesson's point (compartments plus metadata saying where each one lies), so all are `low`. One personal anecdote is `unverifiable` (severity none).

## Items needing a decision (ordered by severity)

None: no wrong or outdated verdicts, and nothing rated medium or high.

## Other non-accurate items

| id | verdict | severity | issue |
|---|---|---|---|
| L-0073 | simplified | low | Magic bytes are at the start, but many formats keep their table of contents at the end (Parquet footer, ZIP central directory, PDF trailer, MP4 moov by default); MP3 has only per-frame headers. Sources: [w3.org](https://www.w3.org/TR/png-3/), [parquet.apache.org](https://parquet.apache.org/docs/file-format/), [pkware](https://pkware.cachefly.net/webdocs/casestudies/APPNOTE.TXT), [ffmpeg.org](https://ffmpeg.org/ffmpeg-formats.html), [loc.gov PDF](https://www.loc.gov/preservation/digital/formats/fdd/fdd000030.shtml), [loc.gov MP3](https://www.loc.gov/preservation/digital/formats/fdd/fdd000012.shtml), [loc.gov JFIF](https://www.loc.gov/preservation/digital/formats/fdd/fdd000018.shtml) |
| L-0078 | imprecise | low | The PNG signature is 8 bytes (89 50 4E 47 0D 0A 1A 0A), not "first 3 bytes P-N-N-G"; 'PNG' is bytes 2-4. Source: [w3.org PNG 3rd ed.](https://www.w3.org/TR/png-3/) |
| L-0084 | simplified | low | JPEG is made of marker segments, and a still JPEG is not a sequence of frames. MP4's moov index is usually at the end. Audio is coded and compressed, not a raw waveform. Sources: [loc.gov JFIF](https://www.loc.gov/preservation/digital/formats/fdd/fdd000018.shtml), [ffmpeg.org](https://ffmpeg.org/ffmpeg-formats.html) |
| L-0086 | imprecise | low | Parquet has a leading 'PAR1' magic number, but its metadata is a footer written after the data for single-pass writing. Source: [parquet.apache.org](https://parquet.apache.org/docs/file-format/) |
| L-0087 | simplified | low | JSON indeed has no header or index, but streaming parsers need not build the whole in-memory dictionary (access is still sequential). Source: [RFC 8259](https://www.rfc-editor.org/rfc/rfc8259) |
| L-0088 | imprecise | low | RFC 4180 allows an optional CSV header line of column names (a different sense of "header"). PDF's structure is found via the trailer at the end. Sources: [RFC 4180](https://www.rfc-editor.org/rfc/rfc4180), [loc.gov PDF](https://www.loc.gov/preservation/digital/formats/fdd/fdd000030.shtml) |

## Unverifiable items

| id | why no public source can confirm |
|---|---|
| L-0089 | Teacher's personal anecdote (tried writing his own image format); no checkable technical claim. |
