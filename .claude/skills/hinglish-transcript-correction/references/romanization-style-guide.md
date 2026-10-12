# Hinglish Romanization Style Guide (house spellings)

Romanized Hindi has no standard orthography: the same word appears as `nahi / nahin / nai / nhi`. Research on
code-mixed text normalization (e.g. ICON 2022, "Normalization of Spelling Variations in Code-Mixed Data") treats
this as phonetic variation of ONE word. Our job is only to pick one spelling per word and use it everywhere,
across every chunk and every lecture. **Normalizing spelling is allowed. Changing the word is not.**

The machine-readable list is `romanization_map.json` (`canonical`: safe variants -> house spelling). Variants in
that list may be normalized silently (no log entry). Everything else in this file needs judgement.

## Principles

1. **Spell it the way most Indian readers type it**, no diacritics, no ITRANS/IAST (`hai`, not `hai̇`, `hæ`, `ha_i`).
2. **One spelling per word, everywhere.** If the teacher uses a word not listed here, pick a spelling the first time,
   add it to `term_decisions.md` -> "Romanization overrides", and reuse it.
3. **Word identity beats spelling.** `kaha` (said) and `kahan` (where) are different words; `mein` (in) and `main` (I)
   are different words; `hai` (is) and `hain` (are) are different words. Never merge them to "fix" spelling.
   If you cannot tell which word was spoken, keep the ASR form.
4. **English stays English.** English words spoken in English keep English spelling (`server`, `basically`, `actually`).
   Do NOT respell English words phonetically (`sarvar`, `besically`), and do NOT translate Hindi to English or English to Hindi.
5. **Hindi grammar on English words stays as spoken**: `servers ko`, `cache karna`, `scale karenge`, `deploy kar diya`.
6. **Numbers stay as spoken.** `do lakh requests` stays; do not write `200,000 requests`. Digits the ASR already produced
   stay digits. `das` is not changed to `10`.
7. **No Devanagari in output.** Transliterate Devanagari leakage to roman with these rules (log it, type `DEVANAGARI`).
   If the Devanagari is an English loanword, write the English word: `कैश` -> `cache`, `सर्वर` -> `server`,
   `डेटाबेस` -> `database`, `लोड बैलेंसर` -> `load balancer`.
8. **Fillers and discourse particles that carry meaning are kept**: `toh`, `matlab`, `na`, `haina`, `yaar`, `accha`,
   `theek hai?`, `samjhe?`, `dekho`, `basically`, `actually`, `right?`, `okay?`. Only non-lexical noises
   (`um`, `uh`, `hmm` used as a pause) may be dropped in clean verbatim. A `hmm` / `haan` that ANSWERS something is kept.

## Transliteration conventions (sounds -> letters)

| Sound | Write | Examples |
|---|---|---|
| long aa | `aa` only where conventional | `aap`, `baat`, `kaam`, `naam`, `haan`, `zyada` (not `zyaada`) |
| short a at word end | drop/keep as commonly typed | `ab`, `sab`, `matlab`, `kar` |
| ee / i | `ee` in a few common words, else `i` | `theek`, `neeche`, `beech`; `kitna`, `din` |
| oo / u | `u` mostly | `hum`, `tum`, `kuch`, `upar` |
| aspirated | add `h` | `kh` (khatam), `gh` (ghar), `chh` (chhota), `th` (theek, thoda), `dh` (dhyaan), `bh` (bhi), `ph` (phir) |
| nasal | write `n` only where commonly written | `nahi`, `haan`, `hain`, `kahan`, `main` (I), `mein` (in) |
| z / j | `z` in Urdu-origin words commonly typed with z | `zyada`, `zaroori`, `zaroorat`, `bazaar` |
| w / v | `w` in common function words | `woh`, `wahan`, `waise`, `waala`; `video`, `version` (English) |
| doubled consonant | keep the gemination | `accha`, `pakka`, `sacchi`, `chutti` |

## House spellings (most frequent words in a teaching session)

| House spelling | Meaning (for disambiguation only - never insert) | Do not write |
|---|---|---|
| hai | is | hay, hei, h |
| hain | are | hein |
| tha / thi / the | was | |
| kya | what / question particle | kia, kyaa |
| kyun | why | kyu, kyon |
| kyunki | because | kyuki, kyonki |
| nahi | no / not | nahin, nai, nhi |
| haan | yes | haa, han (only when it clearly means yes) |
| toh | so / then | tho; English `to` only if it is really the English word |
| matlab | meaning / I mean | matlb, mtlb (never capitalize as MATLAB) |
| accha | okay / good | acha, achha, achcha |
| theek hai | okay / fine | thik hai, theek he |
| thoda / thodi | a little | thora |
| bahut | very / a lot | bohot, bahot, boht |
| zyada | more / too much | jyada, jada |
| kam | less | |
| kaise / kaisa / kaisi | how | kese |
| kahan | where | kaha (that means "said") |
| kab | when | |
| kaun | who | kon |
| kitna / kitne / kitni | how much | |
| jab / tab / ab / abhi | when / then / now / right now | |
| phir | then / again | fir |
| bhi | also | bi |
| hi | only / emphatic | (Hindi emphatic `hi` - not English "hi") |
| yeh / woh | this / that | ye, wo, vo, voh |
| isko / usko / iska / uska / iske / uske | | |
| yahan / wahan | here / there | yaha, vaha |
| mein | in | me, mai |
| main | I | mai (when it means I) |
| hum / humko / humein / hamara | we / us / our | ham, hamko |
| aap / aapko / aapka | you (polite) | ap, apko |
| tum / tumhe / tumhara | you | |
| mujhe / mera / meri | me / my | muje |
| apna / apne | own | |
| kuch | some / something | kuchh |
| sab / sabse / sabko | all | |
| sirf | only | |
| bas | just / enough | |
| lekin / par / magar | but | |
| agar / toh | if / then | |
| warna | otherwise | varna |
| isliye | therefore | isiliye |
| jaise / waise / aisa / waisa | like / such | jese, vaise, esa |
| yaani | that is | yani |
| chahiye | need / should | chahie, chaiye |
| sakte / sakta / sakti | can | |
| karna / karo / karte / karenge / kiya / kar diya | do | krna, krte |
| hota / hoti / hote / hoga / hogi / hua | is / will be / happened | |
| raha / rahi / rahe | -ing | rha |
| lagta / lagega | seems / will take | |
| dekho / dekhte hain / dekhiye | look / let's see | deko |
| samjho / samjhe / samajh | understand | samjo, samje |
| chalo | let's go / okay then | |
| bolo / batao / socho / maan lo | say / tell / think / assume | |
| pehle / baad mein | before / later | pahle |
| upar / neeche / andar / bahar / saath / beech mein | up / down / in / out / with / in between | niche, sath |
| dobara / ek baar | again / once | dubara |
| bilkul | absolutely | |
| sahi / galat | right / wrong | |
| zaroori / zaroorat | necessary / need | jaruri, jarurat |
| yaar / bhai / bhaiya / sir / ma'am / ji | address terms | bhaiyya, mam |
| arre | hey / oh | arey |
| haina / na | isn't it / right? | hai na (keep as two words only if spoken with a pause) |
| okay | okay | ok, okk |
| hazaar / lakh / crore | thousand / 100k / 10M | hazar, lac, karod |
| ek / do / teen / chaar / paanch / chhe / saat / aath / nau / das | 1-10 | char, panch |

## English-colliding forms: never change blindly

Whisper often writes a Hindi word as an English look-alike. These need sentence-level judgement and a log entry
(type `WORD`, confidence `high` only when the grammar leaves no doubt):

| ASR wrote | Could be Hindi | Rule |
|---|---|---|
| to | toh | change only inside clearly Hindi syntax ("agar X down hai to kya hoga" -> `toh`); keep `to` in English ("send it to the server") |
| hi / high | hai | "yeh fast hi" -> `hai` only if the sentence is clearly Hindi |
| me | mein | "database me store" -> `mein`; English "give me" stays |
| or / our | aur | **risky - meaning differs (and vs or).** Change only when Hindi syntax makes "and" certain; else keep |
| who | woh | only in clearly Hindi syntax |
| car | kar | "scale car do" -> `kar` |
| key | ki | "server key IP" vs "the cache key" - technical `key` is common, be careful |
| the | thi | rare; flag instead of changing |
| year | yaar | only as a vocative at sentence end ("samjhe year?") |
| matlab (capitalized MATLAB) | matlab | always Hindi `matlab` in this course unless the teacher is clearly naming the software |

## Devanagari leakage examples

| ASR (Devanagari) | Write | Note |
|---|---|---|
| है | hai | |
| क्या | kya | |
| नहीं | nahi | |
| तो | toh | |
| मतलब | matlab | |
| अच्छा | accha | |
| ठीक है | theek hai | |
| सर्वर | server | English loanword -> English spelling |
| कैश | cache | (or `cash` if it is a payment example) |
| रिक्वेस्ट | request | |
| डेटाबेस | database | |
| लोड बैलेंसर | load balancer | |
| स्केलेबिलिटी | scalability | |
