# Worked Examples

Read all of these before the first chunk. Example 3 is the one that matters most.

---

## Example 1 - Teaching monologue: terms, loop, hallucination, Devanagari

### Raw ASR (chunk excerpt)

```
[00:31:02] SPEAKER_00: to ab baat karte hai sharting ki. dekho jab data bahut zyada ho jata hai na, ek single machine
[00:31:09] SPEAKER_00: pe fit nahi hota. to hum data ko tod dete hai multiple machines pe, isko bolte hai sharting.
[00:31:18] SPEAKER_00: ab question ye hai ki kaun sa data kis shared pe jayega. iske liye hum shared key choose karte hai.
[00:31:30] SPEAKER_00: Thank you for watching.
[00:31:52] SPEAKER_00: simple approach hai hash mod N. user ID ka hash nikalo, mod N karo, jo answer aaya us shared pe bhej do.
[00:32:05] SPEAKER_00: lekin problem kya hai? agar N change hua, matlab ek naya server add kiya, to almost saara data move karna padega
[00:32:14] SPEAKER_00: padega padega padega padega padega padega padega padega
[00:32:20] SPEAKER_00: isliye hum use karte hai consistent hushing. ये बहुत important है interview के लिए।
[00:32:31] SPEAKER_00: Cassandra aur dynamo DB dono isko use karte hai. ek ring imagine karo, zero se leke two power thirty two minus one tak.
```

`hallucination_candidates.md` listed #00:31:30 (PHRASE, AFTER-GAP 21s) and 00:32:14 (LOOP 'padega' x8, COMPRESS 4.8).

### Corrected chunk output (`chunk_04.corrected.md`)

```markdown
<!-- topic-candidate [00:31:02]: Sharding -->

**[00:31:02] Teacher:** Toh ab baat karte hai sharding ki. Dekho, jab data bahut zyada ho jaata hai na, ek single machine pe fit nahi hota. Toh hum data ko tod dete hai multiple machines pe, isko bolte hai sharding.

[00:31:18] Ab question yeh hai ki kaun sa data kis shard pe jaayega. Iske liye hum shard key choose karte hai.

[00:31:52] Simple approach hai hash mod N. User ID ka hash nikalo, mod N karo, jo answer aaya us shard pe bhej do. Lekin problem kya hai? Agar N change hua, matlab ek naya server add kiya, toh almost saara data move karna padega.

<!-- topic-candidate [00:32:20]: Consistent hashing -->

[00:32:20] Isliye hum use karte hai consistent hashing. Yeh bahut important hai interview ke liye. Cassandra aur DynamoDB dono isko use karte hai. Ek ring imagine karo, zero se leke two power thirty two minus one tak.
```

Notes on what was done
- `hai` stays `hai` even where grammar wants `hain` ("hum ... karte hai"). Whisper often drops the nasal, but
  changing it is a grammar edit you cannot verify without audio. hai/hain, mein/main, kaha/kahan are never swapped.
- `to` -> `toh` (Hindi syntax), `jata` -> `jaata`: house spelling. `ye` -> `yeh`: safe variant.
- `shared pe jayega`, `shared key`, `us shared pe`: glossary marks `!shared` ambiguous; here the context (which data
  goes to which machine) makes it unambiguous -> `shard`, logged with evidence.
- `padega` x8 collapsed to the single `padega` that ends the previous sentence (it was a continuation loop).
- Rhetorical "Lekin problem kya hai?" stays inside the teacher turn - it is not a student question.
- "two power thirty two" stays in words - numbers are kept as spoken.
- No new words anywhere. No explanation of what consistent hashing is.

### Log rows (`chunk_04.log.md`)

```markdown
| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:31:02 | TERM | baat karte hai sharting | baat karte hai sharding | non-word; glossary; topic = splitting data across machines | high |
| 02 | 00:31:09 | TERM | bolte hai sharting | bolte hai sharding | same term, same explanation | high |
| 03 | 00:31:18 | TERM | kis shared pe | kis shard pe | !ambiguous form; "kaun sa data kis ... pe jayega" = data partition | high |
| 04 | 00:31:18 | TERM | shared key | shard key | follows 03; glossary | high |
| 05 | 00:31:30 | HALLUCINATION | Thank you for watching. | (removed) | outro phrase mid-explanation, after 21 s gap; next line continues topic | high |
| 06 | 00:31:52 | TERM | us shared pe | us shard pe | same as 03 | high |
| 07 | 00:32:14 | LOOP | padega padega padega padega padega padega padega padega | (removed) | 8x loop, compression 4.8; sentence already complete at 00:32:05 | high |
| 08 | 00:32:20 | TERM | consistent hushing | consistent hashing | glossary; ring explanation follows | high |
| 09 | 00:32:20 | DEVANAGARI | ये बहुत important है interview के लिए। | yeh bahut important hai interview ke liye. | Devanagari leakage | high |
| 10 | 00:32:31 | TERM | dynamo DB | DynamoDB | casing/spacing of product name | high |
```

(Row 10 is technically trivial - casing/spacing - and could be omitted. Logging it is harmless.)

---

## Example 2 - Q&A, wrong speaker labels, chat question

### Raw ASR

```
[01:12:40] SPEAKER_00: ...toh yeh tha write through. koi doubt? clear hai sabko?
[01:12:47] SPEAKER_00: sir ek doubt tha, write back mein agar cache crash ho gaya to data lost ho jayega na?
[01:12:55] SPEAKER_02: haan bilkul sahi. write back mein ye risk hai. isliye log WAL use karte hai, write ahead log.
[01:13:04] SPEAKER_02: matlab pehle disk pe log likh do, phir cache update karo.
[01:13:10] SPEAKER_01: okay sir
[01:13:16] SPEAKER_00: accha ek question aaya hai chat mein, Neha pooch rahi hai ki readies mein persistence hota hai kya?
[01:13:24] SPEAKER_00: haan readies mein do options hai, RDB snapshot aur AOF. AOF matlab append only file.
[01:13:35] SPEAKER_01: sir ye aap ne cafe ka wala jo bataya tha woh bhi aise hi kaam karta hai kya
[01:13:42] SPEAKER_00: haan Kafka bhi ek log hi hai basically, append only. bahut acchi observation.
```

Speaker map (from speaker_stats.md + content): SPEAKER_00 = Teacher, SPEAKER_01 = Student 1. SPEAKER_02 has 3%
talk time and only appears answering questions with explanations in the teacher's style.

### Corrected

```markdown
**[01:12:40] Teacher:** ...Toh yeh tha write-through. Koi doubt? Clear hai sabko?

> **Student Question [~01:12:47] - Student?:** Sir, ek doubt tha, write-back mein agar cache crash ho gaya toh data lost ho jaayega na?

**[01:12:55] Teacher (answer):** Haan, bilkul sahi. Write-back mein yeh risk hai. Isliye log WAL use karte hai, write-ahead log. Matlab pehle disk pe log likh do, phir cache update karo.

**[01:13:10] Student 1:** Okay sir.

> **Chat Question [01:13:16] (read aloud by Teacher):** Accha, ek question aaya hai chat mein, Neha pooch rahi hai ki Redis mein persistence hota hai kya?

**[01:13:24] Teacher (answer):** Haan, Redis mein do options hai, RDB snapshot aur AOF. AOF matlab append-only file.

> **Student Question [01:13:35] - Student 1:** Sir, yeh aapne Kafka waala jo bataya tha, woh bhi aise hi kaam karta hai kya?

**[01:13:42] Teacher (answer):** Haan, Kafka bhi ek log hi hai basically, append-only. Bahut acchi observation.
```

Log rows

```markdown
| 01 | 01:12:47 | SPEAKER | Teacher | Student? | starts "sir ek doubt tha", answered by next turn; which student unknown | high |
| 02 | 01:12:55 | SPEAKER | SPEAKER_02 | Teacher | answers the question, explains WAL; SPEAKER_02 = teacher label split (3% talk, teacher-style) | high |
| 03 | 01:13:16 | TERM | readies mein persistence | Redis mein persistence | glossary; answer mentions RDB/AOF (Redis persistence) | high |
| 04 | 01:13:24 | TERM | readies mein do options | Redis mein do options | same | high |
| 05 | 01:13:35 | TERM | cafe ka wala | Kafka waala | glossary; teacher's answer says "Kafka" | high |
```

Notes
- The student who asked at 01:12:47 was inside SPEAKER_00's segment; we know it is a student (sir + doubt + answered),
  not which one -> `Student?` (flagged), not a made-up `Student 2`.
- "koi doubt? clear hai sabko?" is the teacher checking - not a Q&A block.
- The chat question keeps the teacher's own words including "Accha, ek question aaya hai chat mein". Neha's name is
  kept because the teacher said it.
- `log` in "Isliye log WAL use karte hai" is Hindi *log* (= people). Do not touch it.

---

## Example 3 - FORBIDDEN over-correction (what you must never produce)

### Raw ASR

```
[00:47:03] SPEAKER_00: toh basically jo hai na cdn ka kaam hai ki user ke paas content le aao. matlab agar user india
[00:47:10] SPEAKER_00: mein hai aur server US mein hai to har request US jayegi, latency bahut aayegi. toh hum kya karte hai
[00:47:18] SPEAKER_00: static content jaise images videos usko edge pe rakh dete hai. hmm aur ek cheez, cdn mein cash
[00:47:26] SPEAKER_00: invalidation thoda tricky hota hai. woh hum baad mein dekhenge. haan toh yeh tha CDN. haha mera
[00:47:33] SPEAKER_00: internet bhi CDN se hi chal raha hai lagta hai, itna slow hai.
```

### WRONG output (every line violates a hard rule)

```markdown
## How CDNs Reduce Latency for Global Users

**Teacher:** A **CDN (Content Delivery Network)** brings content closer to the user. For example, if a user is in
India and the server is in the US, every request would travel to the US, causing high latency.

Key points:
- Static content like images and videos is cached at edge locations (PoPs).
- CDN cache invalidation is tricky and will be covered later.

So, that was CDN.
```

| Violation | Why it is forbidden |
|---|---|
| Translated Hinglish to English | Rule 1: never translate. The teacher's language IS the content. |
| "brings content closer", "causing high latency" - paraphrase | Rule 1: no paraphrasing. Original: "user ke paas content le aao", "latency bahut aayegi". |
| Added "(Content Delivery Network)", "(PoPs)", "edge locations" | Rule 1: no added explanations. The teacher never expanded CDN or said PoP. |
| Bullet list "Key points" | Rule 1: no summarizing / restructuring speech. Speech stays prose, in order. |
| Bolded "CDN" | Bold is reserved for labels; emphasis changes the teaching. |
| Dropped "toh hum kya karte hai" (rhetorical question), "hmm aur ek cheez" | Content dropped. Rhetorical questions and transitions are kept; only non-lexical `hmm` as a pause may go - here "hmm aur ek cheez" is a transition, keep "aur ek cheez" at least. |
| Dropped the joke about slow internet | Jokes and asides are content. Never "clean up" personality. |
| Heading "How CDNs Reduce Latency for Global Users" | A claim/summary, not a label from the teacher's terms. Use `CDN`. |
| No timestamps | Every turn/paragraph needs its timestamp. |
| `cash invalidation` silently became "cache invalidation" without a log | Every non-trivial correction is logged. |

### RIGHT output

```markdown
## [00:47:03] CDN

**[00:47:03] Teacher:** Toh basically jo hai na, CDN ka kaam hai ki user ke paas content le aao. Matlab agar user India mein hai aur server US mein hai, toh har request US jaayegi, latency bahut aayegi. Toh hum kya karte hai? Static content, jaise images, videos, usko edge pe rakh dete hai. Aur ek cheez, CDN mein cache invalidation thoda tricky hota hai. Woh hum baad mein dekhenge. Haan, toh yeh tha CDN. Haha, mera internet bhi CDN se hi chal raha hai lagta hai, itna slow hai.
```

Log row

```markdown
| 01 | 00:47:18 | TERM | cash | cache | "CDN mein cash invalidation" - caching context, glossary "cache invalidation" | high |
```

Note: `cash` at 00:47:18 and `invalidation` at 00:47:26 were split across segments; log the row at the segment where the
changed word sits (00:47:18) and keep Original short enough to be found there. `hmm` (pure pause filler) was dropped
without logging - allowed in clean verbatim. "haha" is kept (it is the teacher laughing at their own joke).

---

## Example 4 - When NOT to correct (ambiguous real word)

Raw: `[02:05:10] SPEAKER_00: maan lo payment service hai, user ne cash on delivery choose kiya, toh order service ko event bhejo`

`cash` here is money. Glossary lists `!cash` as ambiguous -> leave it. No log row, no flag.

Raw: `[02:07:44] SPEAKER_00: aur yahan pe cash rakh sakte hai taaki baar baar DB na jaana pade`

Context: "baar baar DB na jaana pade" = caching. Correct to `cache`, log TERM, conf high.

Raw: `[02:09:02] SPEAKER_00: ab yeh cash wala part tum log khud try karna`

Could be the payment cash-on-delivery part or the cache part (both discussed in the last 5 minutes).
-> `ab yeh [?cache | asr: "cash"] wala part tum log khud try karna` - flagged, not corrected.
