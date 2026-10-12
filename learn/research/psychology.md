# Psychology of the Lecture Page: getting people to read, understand, and remember

Scope: round 2 of the lecture-page design. One long page per lecture (~3 h of class: caching, scaling, delegation/queues/Kafka, concurrency, communication). The running case study is Medium. Readers are working software engineers.
Researched 2026-10-11. Each claim cites a URL. **[opened]** means I fetched the page and read the claim there. **[search]** means the claim came from search-result abstracts or secondary summaries, and the primary paper should be checked before we quote numbers publicly. Effect sizes are Cohen's d or Hedges' g unless stated otherwise.

Examples are taken from `lec01/teaching_map.md`: the real prompts P1–P23 and the "Misconceptions surfaced" table.

---

## 0. The constraint

Our readers are senior, busy and skeptical. They skim (§14), they jump around docs looking for code (§14), and they notice condescension and AI-slop quickly. Any technique below that costs them time without a payoff they can see will push them to the back button. The rule for the whole page: **every intervention must feel like the lecture being smart, not the website being clever.**

---

## 1. Curiosity gap / information-gap theory

**Evidence.** Loewenstein (1994, *Psychological Bulletin*, "The Psychology of Curiosity: A Review and Reinterpretation") treats curiosity as a feeling of deprivation that arises when attention lands on a specific gap in one's knowledge. Three conditions follow: the reader needs *some* prior knowledge (you can't be curious about something you can't frame), the gap must look closable, and it must be neither too small nor too large. [search] https://scrapbox.io/mtane0412/The_Psychology_of_Curiosity:_A_Review_and_Reinterpretation ; https://lede-v2.nautil.us/curiosity-depends-on-what-you-already-know-235803 ; https://www.pbs.org/wgbh/nova/article/how-to-stimulate-curiosity/
No reliable effect size exists for a "curiosity heading" vs a plain heading. Treat this as a design principle grounded in theory, not a measured intervention.

**On our page.**
- Open each section with **the problem as an open question about Medium, in the reader's terms, with one concrete number**, not with the name of the concept. "Concurrency" becomes: *"Two readers clap at the same instant on a post with 100 claps. The counter says 101. Where did a clap go?"* (P14). The concept name (atomic increment / transaction) comes *after* the reader feels the gap.
- The gap must be **specific and closable within the section**. The reader should be able to predict when it will close ("by the end of this section you can explain the 101").
- Use the teacher's own provocations, since they already work as gaps: *"Why can't you keep doubling the database machine? AWS has supercomputers. What actually stops you?"* (P8). The reveal (hardware buses, the SD-card analogy) lands because the obvious answer ("there's no bigger instance in the dropdown") is wrong.
- The TOC lists the **questions**, with the concept name in small text after each ("Why did a clap vanish? · atomicity"). A skimmer gets both the hook and the label.

**How it goes wrong.** Clickbait headers ("You won't believe what Kafka does next"), gaps that are never closed or close three screens later, and rhetorical questions with no stakes ("Ever wondered about caching?"). A gap that is too large ("How does Netflix work?") reads as vague. Loewenstein's condition is that it be closable. Senior engineers read a fake question as a sales tactic.

---

## 2. Narrative transportation and stakes

**Evidence.** Green & Brock (2000, *JPSP* 79(5)) built the Transportation Scale. Over four experiments, readers who were more transported took on more story-consistent beliefs and criticised the story less. Telling readers to attend to surface features (grammar) *lowered* transportation, while labelling a text as fact or fiction did not change it. [search] https://www.onfiction.ca/2014/06/transportation-into-narrative-worlds.html ; https://pmc.ncbi.nlm.nih.gov/articles/PMC5267340
Van Laer et al. (2014, *J. Consumer Research*), a meta-analysis of 132 effect sizes from 76 articles, found that transportation depends on identifiable characters, imaginable plot and verisimilitude (believability), and that attention and familiarity with the genre predict it. [search] https://openaccess.city.ac.uk/id/eprint/6755/ ; https://www.onfiction.ca/2014/02/research-bulletin-summarizing-over.html
One caution: transportation *reduces critical scrutiny*. For a persuasive ad that is the goal. For engineering it is a risk, so the story has to carry true mechanics, and the reader still has to reason (§4).

**On our page.**
- **Medium as a system that grows and breaks.** Every section is an *incident* in Medium's life: "launch day: one server, one Postgres" → "a post goes viral, reads are 50× writes" → "the counter double-increments after a worker crash (74 → 75 → 76)" (P11) → "1M clients polling every 10 s" (P15). Each fix creates the next failure. This is the naive → failure → fix → new-failure arc from the brief (§1.2, samwho).
- **Believability beats drama.** Use real numbers from class (10,000 tickers × 4 B = 40 KB/s, P19; SQS priced per message vs Kinesis per shard-hour) and real student war stories (the config platform with a <3 ms budget, the e-commerce recommendation cache). Van Laer's verisimilitude finding is the reason a real incident works better than an invented one.
- **The protagonist is "you, on call for Medium",** not a cartoon character. Use second person sparingly, at incidents: "It's 2 a.m.; search shows 75 posts, the count says 76."
- Keep narrative and mechanism in the same paragraph. No separate "story box" that readers learn to skip.

**How it goes wrong.** Invented drama ("the CTO burst into the room…"), a mascot, a storyline that stalls the explanation (four paragraphs of story before the first fact), fictional companies with fake metrics, or incidents that never touch the mechanism. Also: narrative used to make a contested design choice feel inevitable. Because transportation lowers scrutiny, always show the alternative the teacher rejected (e.g. P17, "long polling isn't unscalable, pick by use case").

---

## 3. Concreteness fading; worked → faded examples

**Evidence.**
- Concreteness fading (Fyfe, McNeil, Son & Goldstone 2014, *Educational Psychology Review* 26:9–25, systematic review) starts with a concrete instance, moves through an iconic one, and ends abstract. Proposed benefits: concrete grounding helps learners interpret opaque symbols, gives them memorable images, and fading strips away irrelevant surface detail so the structure transfers. [search] https://pc.cogs.indiana.edu/?p=885 ; https://www.learningscientists.org/blog/2018/2/1-1 (I opened the IU lab page, but it did not contain the abstract.)
- Concrete examples alone help learners recognise new instances of abstract concepts. Rawson, Thomas & Jacoby (2015); a 2022 replication found d = 0.30. [search] https://cronfa.swan.ac.uk/Record/cronfa59139
- Worked examples → faded examples (Renkl, Atkinson et al. 2002/2004): show a full worked solution, then fade steps from the end (backward fading). Backward fading beat forward fading on post-tests, and learners learn most about the principles of the steps that were faded. [search] https://faculty.engineering.asu.edu/mre/wp-content/uploads/sites/31/2020/02/Exp_Rev_LI06.pdf

**On our page.**
- **Three-stage figure per concept.** (1) Concrete: "Post #4182 by @priya, 3 servers, the request lands on server B, which has a stale copy." (2) Iconic: the same thing as boxes and arrows, names dropped and replaced by "post", "server", "cache". (3) Abstract: the general rule ("a per-instance cache gives up cross-instance consistency to save a network hop; TTL bounds the staleness").
- **Back-of-envelope as worked → faded.** Example 1, fully worked: polling load (1M users ÷ 10 s = 100k req/s = 6M req/min). Example 2, last step blank: ticker bandwidth, 10,000 × 4 B per second = ? Example 3, the reader does all of it: "Clap fan-out over SSE for a post with 20k open tabs: what's the message rate?" Answers sit behind a reveal.
- Kafka partitions: worked trace of 3 partitions and 3 consumers, then a faded trace with 5 consumers ("which consumers idle?", P12).

**How it goes wrong.** Starting with an abstract definition ("A message queue is an asynchronous communication primitive…"), which is the ByteByteGo/Wikipedia default. Or the opposite: staying concrete forever, so readers know Medium's cache but can't apply it to their own system. Generic "foo/bar" examples aren't concrete. Concreteness means *our* story's specific objects.

---

## 4. Generation effect, pretesting / prequestions, prediction before reveal

**Evidence.**
- **Generation effect.** Bertsch, Pesta, Wiscott & McDaniel (2007, *Memory & Cognition*), meta-analysis of 445 effect sizes from 86 studies: d ≈ 0.40, about 9 percentage points. Larger for incidental than intentional learning. [search] https://pubmed.ncbi.nlm.nih.gov/17645161/ (opened; the page was cookie-walled) ; https://uwaterloo.ca/memory-attention-cognition-lab/sites/default/files/uploads/files/reminding2012.pdf
- **Pretesting.** Richland, Kornell & Kao (2009, *J. Exp. Psych: Applied* 15(3)): in five experiments with an essay on vision, trying to answer questions *before* reading beat extra study time, even though most pretest answers were wrong. The benefit held when the tested concepts were highlighted in both conditions, so it is not just attention-direction. [opened, PDF not machine-readable; finding from] https://learninglab.uchicago.edu/Pre-Testing.html ; https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf
- **Prequestions with video lectures.** Carpenter & Toftness (2017): two prequestions before each ~2-minute segment improved scores on the prequestioned items *and* on new items. [opened] https://www.bps.org.uk/research-digest/heres-simple-way-boost-your-learning-videos-prequestion
- **Prequestions reduce mind-wandering.** Pan, Sana, Schmitt & Bjork (2020, *JARMAC*), 26-minute online lecture: pretests reduced mind-wandering and improved final-test scores, whether interspersed or all given up front. Here the gains were limited to pretested items. [search] https://pure.athabascau.ca/en/publications/pretesting-reduces-mind-wandering-and-enhances-learning-during-on/
- **Moderators** (Psychonomic Society feature): integrative, concept-level questions spread benefit to non-pretested material more than isolated-fact questions do. Do not grade. Frame errors as normal. Material presented *before* the pretested content may get a boost. [opened] https://featuredcontent.psychonomic.org/test-first-learn-later-the-power-of-pretesting-to-enhance-learning/
- **Size of the benefit** with feedback (Mera et al. 2025, *J. Cognition*): pretesting beat reading with d ≈ 1.2 for immediate feedback and ≈ 0.6–0.8 for delayed feedback. Pretested learners *underestimated* their own performance. That matters for design, because people won't feel it working. [opened] https://journalofcognition.org/articles/455
- **Productive failure** (Sinha & Kapur 2021, *Review of Educational Research*, 53 studies): problem-solving *before* instruction beats instruction-first for conceptual knowledge when the problem is well designed. [search] https://www.timeshighereducation.com/campus/using-productive-failure-activate-deeper-learning

**On our page.**
- **Frequency.** One prediction per major section, about every 15–25 minutes of class content, so 6–9 per lecture. That matches the "Top 10 pause-and-think prompts" already in the teaching map. Add one micro-prediction inside a step-through figure where it fits naturally. The evidence (Carpenter: 2 per 2-minute segment) supports a higher density, but our readers' patience doesn't. The cost of interrupting a senior engineer is higher than for a lab participant.
- **Format: commit, then reveal.** The reader commits *before* reading the explanation, with a one-tap choice or a free-text box (not stored or graded). Then the reveal shows the class's actual spread of answers (see §12) and the teacher's answer. Example: *"3 partitions, 5 consumers. What do consumers 4 and 5 do? (a) split partitions (b) idle (c) read round-robin (d) Kafka rejects them."* Reveal: "(b). In class, the most common guess was (a). Here's why it can't work: offsets are tracked per partition per group…" (P12/P21).
- **Ask integrative questions**, not trivia: "where would you cache and what do you give up?" (P1), not "what does TTL stand for?".
- **Making it non-patronising for seniors:**
  1. Ask questions an experienced engineer could plausibly get *wrong*. The class's real misconceptions guarantee this (a *senior* engineer gave the "no bigger instance in the dropdown" answer).
  2. Use peer-level language: "Before reading on, what's your call?", not "Let's test your knowledge!".
  3. Every prompt can be **skipped with one click** ("Show answer"), with no penalty or nag.
  4. No score, no right/wrong colours shouting at them. Answers come as "Here's what happens", plus "if you picked (a), you're in good company, and here's the specific flaw".
  5. Make some prompts **design trade-offs with no single answer** (P17, P18: "SSE + POST for claps instead of WebSocket?"). The reveal shows the teacher's reasoning, not a verdict.
- **Prediction inside animation.** Before the race-condition clip plays: "Two threads, 1000 increments each. Final value?" Then play the clip showing 1997 (P13).

**How it goes wrong.** Quiz-ification: "Quiz time! 🎉". Trivia recall questions. Questions answered by the very next sentence (no real gap). Forcing an answer before letting the reader continue. Scoring, streaks, "You got 3/5!". Patronising tone ("Great job!"). Questions whose answer is "it depends" with no follow-through. Too many: a prompt every 300 words becomes a tax.

---

## 5. Retrieval practice, spacing within a page, interleaving, end-of-section recall

**Evidence.**
- **Retrieval practice.** Adesope, Trevisan & Sundararajan (2017, *Review of Educational Research* 87(3)), meta-analysis of 272 effect sizes: practice tests beat restudy, g ≈ 0.61. Rowland (2014) reports g = 0.73 with feedback vs 0.39 without. The largest benefits come with a 1–6 day lag before the final test. [search] https://journals.sagepub.com/doi/10.3102/0034654316689306 ; https://education.wsu.edu/documents/2018/01/rethinking-use-tests.pdf/ ; https://www.frontiersin.org/articles/10.3389/fpsyg.2018.02412/pdf
- **Spacing.** Cepeda et al. (2006, *Psych Bulletin*): 839 assessments from 317 experiments. Spaced beats massed, and the best gap grows with how long you need to remember. [search] https://pubmed.ncbi.nlm.nih.gov/16719566/ ; https://www.evullab.org/pdf/CepedaPashlerVulWixtedRohrer-PB-2006.pdf
- **Interleaving.** Brunmair & Richter (2019, *Psych Bulletin*), 59 studies / 238 effect sizes: overall g = 0.42. It helps most when categories are *similar and easily confused* (paintings g = 0.67, maths g = 0.34). It *hurts* for word/expository material (g = −0.39). [search; opened PDF was not machine-readable] https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf

**On our page.**
- **Spacing within one long page.** A section-end recall checks *that* section, and a light **callback 2–3 sections later** retrieves an older idea in a new context. Example: in Communication, "SSE fan-out for claps: which caching layer from section 1 could absorb the read spike?" In Concurrency, "the double-increment in delegation (74/75/76) and the lost clap are the same bug class. Name it."
- **Interleave only the confusable pairs** (where Brunmair & Richter find gains): queue vs stream, replica vs shard, long polling vs SSE vs WebSocket, local cache vs centralised cache. One end-of-lecture "which one fits?" set of 5 mixed scenarios: "Search indexing must process every post exactly once per index, and three teams want the same events" → stream. "Send password-reset emails" → queue. Don't interleave the *explanations* themselves. Prose should stay blocked (the g = −0.39 for verbal material).
- **End-of-section recall done well:** one free-recall prompt ("In one sentence: why can't a 4th consumer help a 3-partition topic?") with an expandable model answer, plus an optional "explain it to a teammate" copy button. 30 seconds, not a quiz.
- **Cross-session spacing, honestly.** At the end of the lecture, offer (not push) "a 5-question recall set to try in 2–3 days" as a link or a calendar file. That matches the 1–6 day sweet spot. Don't send email unless the reader opted in.

**How it goes wrong.** Recap boxes that *re-state* the content ("Key takeaways: caching is important"). Re-reading is not retrieval. Multiple-choice that can be answered by matching words. Interleaving every topic randomly so the page feels incoherent. Spaced-repetition push notifications and streaks (see §NOT).

---

## 6. Desirable difficulties vs extraneous load; Mayer's segmenting, signalling, coherence

**Evidence.**
- **Desirable difficulties** (Bjork & Bjork 2011): spacing, interleaving, testing and generation slow apparent progress but improve retention and transfer. They become *undesirable* when the learner lacks the background to respond to them. [search] https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf
- **Cognitive load theory** (Sweller, van Merriënboer & Paas 2019, *Ed Psych Review* 31): new information passes through a limited working memory. Extraneous load from presentation should be cut so capacity goes to the intrinsic difficulty. [search] https://research.utwente.nl/en/publications/cognitive-architecture-and-instructional-design/
- **Mayer, Cambridge Handbook chapter**, median effect sizes: coherence (cut extraneous material) 23/23 tests, d = 0.86; signalling 24/28, d = 0.41; redundancy 16/16, d = 0.86; **spatial contiguity 22/22, d = 1.10**; temporal contiguity 9/9, d = 1.22. [opened] https://www.cambridge.org/core/books/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E . Segmenting is reported around d ≈ 0.70 in a secondary review [search] https://www.synapsesocial.com/es/papers/69dbbbdacebd566818835a69
- **Seductive details**: interesting but irrelevant additions (fun facts, decorative photos, jokes) hurt learning. Rey 2012; a later multilevel meta-analysis gives g ≈ −0.16 to −0.33. The harm is worse when the detail sits close to core content, is visual, or stays on screen continuously. [opened] https://www.learningscientists.org/blog/2019/6/20-1 ; [search] https://link.springer.com/article/10.1007/s11251-023-09632-w

**On our page.** The rule: **put the difficulty in thinking about the system, never in using the page.**
- *Desirable*: predictions, faded examples, the "which fits?" interleaved set, the reader computing 40 KB/s themselves.
- *Extraneous, cut*: legends far from diagrams, labels in a key instead of on the arrow, animations that loop while you read, vendor-logo soup, decorative hero art, tangents. A tangent like "fun fact: Kafka is named after the author" is a seductive detail. Cut it or move it to a footnote.
- **Segmenting:** clips are 20–60 s each and *user-paced* (play/step buttons). No autoplay, no 4-minute clip.
- **Signalling:** one colour per component type (cache, queue, DB) used consistently in text and figures. The term in prose is set in the component's colour (brief §1.1, Ciechanowski). Bold the 1–2 key phrases per section, not ten.
- **Coherence:** every figure answers a sentence in the prose (brief §1.6, Kleppmann). If it doesn't, cut it.
- Narration-free clips with on-figure labels avoid redundancy. Captions are for accessibility, not a transcript stuck on the screen.

**How it goes wrong.** Mistaking *page* friction for desirable difficulty: tiny type, hidden answers you can't skip, gated sections. Or the reverse: removing all difficulty with a summary-first, bullet-only page that feels easy and teaches little. Fluency is not learning (§14). Decorative stock illustrations and memes are seductive details.

---

## 7. Zeigarnik, goal-gradient, progress, resumption

**Evidence.**
- **Zeigarnik (better memory for unfinished tasks) does not replicate reliably.** Ghibellini & Meier (2025, *Humanities & Social Sciences Communications*) meta-analysis: no general memory advantage for unfinished tasks. There *is* a general **tendency to resume** interrupted tasks (the Ovsiankina effect). [opened] https://ideas.repec.org/a/pal/palcom/v12y2025i1d10.1057_s41599-025-05000-w.html ; [search] https://en.wikipedia.org/wiki/Zeigarnik_effect
  → Don't design on "cliffhangers make people remember". Do design on "people want to resume what they started".
- **Goal-gradient** (Kivetz, Urminsky & Zheng 2006, *J. Marketing Research* 43(1)): café loyalty-card customers bought faster as they neared the reward. A 12-stamp card with 2 pre-filled stamps was completed faster than a 10-stamp card. Effort scales with the *proportion* of distance remaining. [search] https://business.columbia.edu/faculty/research/goal-gradient-hypothesis-resurrected-purchase-acceleration-illusionary-goal (opened, returned 403) ; https://business.columbia.edu/sites/default/files-efs/pubfiles/1200/goalgradient.pdf
- **Progress bars can backfire.** Villar, Callegaro & Yang (2013, *Social Science Computer Review*), meta-analysis of 32 web-survey experiments: a constant progress bar did *not* reduce drop-off. Fast-then-slow bars reduced it. **Slow-then-fast bars increased drop-off.** When the bar shows a long road ahead early on, people quit. [search] https://research.google/pubs/where-am-i-a-meta-analysis-of-experiments-on-the-effects-of-progress-indicators-for-web-surveys/

**On our page.**
- **Honest, chunked progress instead of a percent bar.** A slim sticky rail showing the lecture's 6–8 *sections* as segments, with the current one highlighted, plus the remaining time for the **current section** ("~6 min left in 'Kafka partitions'"). Proportion-remaining within a section is small and motivating (goal-gradient). The whole-lecture distance is visible but not shouted. This avoids the slow-start problem from Villar et al., where a percent bar sits at 3% for ten minutes.
- **Reading-time estimates are real.** Compute them from word count at ~200–230 wpm for technical prose, plus clip durations, plus about 1 minute per prompt. Never round down to look short.
- **Resumption (Ovsiankina).** Store the last section and scroll anchor in localStorage. On return: a single quiet line at the top, "You were in *Delegation → Why the count drifted (74/75/76)*. Continue →". Optionally add a 1-line recap of the previous section plus one retrieval question ("Before continuing: why did the retry increment twice?"). That makes resumption itself spaced retrieval (§5).
- **Natural stopping points.** Mark 3–4 "good place to stop" breaks that line up with the class's actual breaks (after Scaling Q&A, after Delegation Q&A). Saying "it's fine to stop here" is honest and increases the chance of returning.
- **Section ends close their loop and open the next one in one line** ("Fixed. But now two workers process the same post. Next: streams."). This drives continuation through narrative rather than a cliffhanger trick.

**How it goes wrong.** Fake "you're 80% done!" or pre-filled progress (the illusory-progress manipulation from Kivetz, used dishonestly). Completion badges. Nagging "You haven't finished!" emails. Cliffhangers that withhold the answer to the *current* question in order to force a scroll.

---

## 8. Peak-end rule

**Evidence.** Kahneman, Fredrickson, Schreiber & Redelmeier (1993, *Psychological Science* 4:401–405): participants preferred to repeat a longer cold-water trial (60 s at 14 °C + 30 s slowly warming to ~15 °C) over the shorter one, because retrospective judgments follow the peak and the end, with duration largely neglected. [search] https://en.wikipedia.org/wiki/Duration_neglect ; https://web.colby.edu/cogblog/?p=3981
This is about *remembered evaluation* (will they come back for lecture 2), not directly about learning. Apply it to how the lecture feels in memory.

**On our page.**
- **One designed peak per lecture.** Pick the single strongest "aha" and build the best figure and clip around it. For lecture 1 that's the teacher's held-back punchline: *the API server's own disk is a cache, because the network is slower than local disk* (P1/P7d). Build it as a prediction ("where else could you cache published posts, besides Redis?"), then a short clip of a request saving a network hop, then the line "this is exactly what I wanted to cover". A second candidate is the 74/75/76 crash trace that motivates streams.
- **Designed ending, not a trailing Q&A dump.** End on (1) the **finished Medium diagram**, now complete with every component added during the lecture, as a payoff the reader can see; (2) a 5-scenario "which fits?" interleaved set (§5); (3) one honest sentence about what's next ("Next lecture: designing Slack, where your SSE-for-claps idea gets tested"). The open Q&A goes into its topics (the teaching map already plans this) or into an appendix, so it isn't the last thing read.
- Avoid a low point at the end: no wall of references, no "Subscribe!" modal.

**How it goes wrong.** Engineered euphoria: confetti, "You did it! 🎉", a certificate. A "peak" that is a gimmick (a joke, an Easter egg) rather than the conceptual insight. Ending with the hardest, driest material because that's where it fell in the transcript.

---

## 9. Chunking and working-memory limits; rhythm and pacing

**Evidence.** Cowan (2001, *Behavioral and Brain Sciences*): working-memory capacity is about **4 chunks** (3–5), not Miller's 7. [opened] https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory-a-reconsideration-of-mental-storage-capacity/44023F1147D4A1D44BDC0AD226838496 . Segmenting evidence: see §6. Chartbeat (25M sessions) found most collective reading time is below the fold, but engagement windows are short and many readers never scroll. [search] https://blog.chartbeat.com/?p=2428

**On our page.**
- **One idea per screen**, about 150–300 words, then a figure, prompt or step. That matches the Comeau rhythm in the brief (§1.3, ≤300 words before something to touch).
- **Diagrams carry at most 4 new elements per step.** A step-through figure adds one component per step: client → +LB → +API ×3 → +Redis. Never introduce replica, shard, proxy and connection pool in a single frame.
- **Lists of options get chunked into ≤4.** The communication section has seven paradigms. Group them: *ask repeatedly* (short polling, long polling), *keep a pipe open* (WebSocket, SSE), *someone else delivers* (push notifications). Three chunks instead of seven items.
- **Alternate dense and light.** Dense means a mechanism plus a trace (Kafka offsets, replication pull). Light means an incident narrative, a war story or a back-of-envelope. Never put two dense segments back to back. The class pacing already does this (Q&A breaks after each topic). Mirror it with "From class" boxes (§12) as the light beats.

**How it goes wrong.** Mechanically cutting everything into tiny cards so the argument fragments (the LinkedIn carousel look). Bullet-only prose, which drops the "because" links that make a mental model. Treating "7±2" as a law.

---

## 10. Dual coding, spatial contiguity, and the growing diagram as a memory scaffold

**Evidence.** Mayer's multimedia principle (words + pictures > words alone) is the largest effect in his set, d ≈ 1.39–1.67 depending on edition [search] https://ksvi.mff.cuni.cz/amulab/wp-content/uploads/2018/11/MultimLn3_BromHannemann_181117.pdf. Spatial contiguity (labels on the figure, near the words) gives d = 1.10, and temporal contiguity d = 1.22 [opened Cambridge chapter, §6]. Concreteness fading names "memorable images" as a mechanism (§3).

**On our page.**
- **One Medium architecture diagram that grows through the lecture**, from one server/one DB to the full system with CDN, LB, API servers with RAM+disk cache, Redis, primary+replicas, shards, queue, Kafka with partitions, workers, Elasticsearch, and SSE/WebSocket gateways. Each section starts with a **thumbnail of the diagram so far**, with the part about to change highlighted. That gives a spatial "where am I" (a light memory palace: *location in the diagram = location in the lecture*).
- The diagram also works as **navigation**: on desktop a sticky mini-map, where clicking the Kafka box jumps to that section. This doubles as signalling and as a TOC that carries meaning.
- **Labels sit on the arrows and boxes**, never in a legend. Prose that refers to the figure sits next to it (sticky figure + scrolling steps on desktop, stacked on mobile; brief §1.7).
- **Swim-lane time diagrams** for concurrency and failure (the 74/75/76 trace, the two-clap race). The box diagram says *where*, the swim-lane says *when*. Use both, consistently.
- End-of-lecture recall can use the diagram itself: "Here's the final Medium diagram with 5 boxes blanked. Name them and say what each one buys you."

**How it goes wrong.** Twelve unrelated diagrams in twelve styles. Every box decorated with a vendor logo. A "memory palace" announced as a technique ("Let's use the method of loci!"). Diagrams that are pictures of the text (bullet points in boxes). Animations that move while the reader is trying to read the adjacent paragraph.

---

## 11. Expertise reversal effect

**Evidence.** Sweller, Ayres, Kalyuga & Chandler (2003, *Educational Psychologist* 38(1)); Kalyuga (2007, *Ed Psych Review* 19:509–539). Techniques that help novices (worked examples, integrated explanations, extra guidance) lose their benefit or *hurt* more expert learners, because experts have to process redundant information against their own schemas. [search] https://ro.uow.edu.au/edupapers/136 ; https://csed.substack.com/p/the-expertise-reversal-effect-2003 ; https://www.uky.edu/~gmswan3/EDC608/Kalyuga2007_Article_ExpertiseReversalEffectAndItsI.pdf (opened, not machine-readable). Developers are heterogeneous: systematic vs opportunistic readers, and strategy doesn't predict experience (§14, Meng et al.).

**On our page.**
- **"Skip-if-you-know" via a check, not self-report.** Start a basics block with a one-question check: "Already know why a local per-server cache goes stale across instances? → [Yes, skip to the trade-off] [Show me]". Better still, use a prediction (§4) as the gate: if they get it right, show "You've got this. Jump to *sticky sessions flip the answer* →". This follows Kalyuga's "rapid assessment" approach.
- **Collapsible "Foundations" panels** for the CS basics the teacher flagged as Google-able ("just a Google search in case you are not from CS", P13: why count++ isn't atomic). Collapsed by default, one line saying what's inside.
- **Two depths of worked example.** Novices get the full worked trace. Experts get the faded or "do it yourself" version first, with the worked one behind a toggle.
- **"Going deeper" asides** for experts (fencing tokens, exactly-once semantics, per-partition ordering guarantees), collapsed, so the core stays clean for everyone.

**How it goes wrong.** A beginner/expert mode toggle at the top of the page. Nobody picks "beginner", and it forks maintenance. Hiding too much so novices hit an unexplained term. Patronising "Don't worry if this is confusing!" interjections.

---

## 12. Misconception-based learning (refutation texts)

**Evidence.** Schroeder & Kucera (2022, *Ed Psych Review*), meta-analysis of 44 comparisons (n = 3,869): refutation texts beat other texts, **g = 0.41** (trim-and-fill adjusted g = 0.28), robust across domains and formats. The structure is: state the misconception → explicitly refute it → explain the correct model. The KReC framework says this works by co-activating the wrong and right ideas so the right one wins. Delayed (>1 month) evidence is thin. [opened] https://pmc.ncbi.nlm.nih.gov/articles/PMC8784251

**On our page.** We have a ready-made, *authentic* misconception bank in `teaching_map.md §5`, with timestamps:
- "Sharding = three identical copies" → mutually exclusive subsets (01:02:06).
- "Master pushes writes to replicas" → replicas pull (00:50:55).
- "Consumers coordinate to restore global order" → only per-partition ordering (01:31:20).
- "CDNs only cache images and video" → a CDN is a proxy, bytes are bytes; Giphy caches API responses (00:25:32).
- "Vertical limit = AWS doesn't sell a bigger box" → hardware bus limits (00:37:05).
- "Autoscaling handles spikes" → too slow; pre-scale with marketing (00:42:35).
- "Long polling isn't scalable" → it is; pick by use case (P17).
- "Streams are strictly better, so always use them" → cost model, SQS per message vs Kinesis per hour (01:33:14).
- "A stream replaces distributed transactions" → not for strong consistency across two stores (P22).
- The brief's example, "a queue message goes to exactly one consumer", becomes *"true for one consumer group, false across groups"*. This sets up the queue-vs-stream fan-out distinction.

**Pattern: the "Common wrong turn" block.** It sits *right after* the prediction it relates to, so a reader who just chose the wrong option sees it immediately. Structure:
1. **The belief, stated fairly and attributed** ("Asked in class: *'So sharding means keeping three copies?'*"). Plausible, not a straw man.
2. **Why it's tempting** (one line: "replicas *are* copies, and both add machines").
3. **The refutation** with a concrete counter-case (a 30M-user table: copies triple storage and help reads but not writes, while shards split the write load).
4. **The correct model** in one sentence plus the diagram delta.
Use at most 1–2 per section, styled distinctly but quietly.

**How it goes wrong.** Myth-busting listicles ("5 myths about Kafka"). Repeating the myth in large type so it is the thing people remember. Straw-man misconceptions nobody holds. Mocking the person who held it. (The teacher's "most weird answer" framing for the senior engineer's AWS answer should be softened. Keep the content, drop the sneer.)

---

## 13. Honest social and authenticity signals vs fake social proof

**Evidence.** Mathur et al. (2019, CSCW), "Dark Patterns at Scale", crawled ~53K product pages across ~11K shopping sites and found 1,818 dark-pattern instances (15 types, 7 categories), including deceptive social proof and urgency, with 22 third parties selling them as turnkey widgets. Readers of technical content know these patterns well. [search] https://arxiv.org/abs/1907.07032v2
Credibility via verisimilitude supports transportation (§2, van Laer).

**On our page.**
- **"From class" blocks**: anonymised, real student questions and war stories with the class timestamp ("Asked in class, 02:13: *could claps use a POST plus SSE instead of a WebSocket?*"). These are authentic, they model good questions, and they tell solo readers that others had the same doubt. Use the transcript wording, lightly cleaned.
- **Answer-spread on predictions** taken from what *the class actually said* ("Most of the class guessed X"), or, once we have data, real aggregate counts from site readers with n shown ("41% of 1,204 readers picked (a)"). Never invent numbers. If there are too few responses, show nothing.
- **Real numbers from real systems, sourced**: SQS per-request vs Kinesis per-shard-hour pricing linked to the AWS pricing pages, Netflix Open Connect boxes in ISPs, GCM/APNs. Every number has a citation marker (brief §1.8, Distill-style).
- **Provenance**: "Lecture recorded <date>, last fact-checked <date>". The factcheck folder already exists, so show it.

**How it goes wrong.** "12,483 engineers are reading this right now". Fake testimonials. "Trusted by engineers at Google" with logos. Invented "most readers get this wrong!" claims. Leaderboards. Inflated stats rounded up for drama.

---

## 14. Fluency, disfluency, typography; skimming and how engineers read

**Evidence.**
- **Disfluency doesn't reliably help.** Diemand-Yauman, Oppenheimer & Vaughan (2011, *Cognition*) reported better learning from hard-to-read fonts. Replications have largely failed (Rummer et al. 2015, "Fortune is fickle"; Eitel et al. 2014; Meyer et al. 2015). [opened] https://forrt.org/flora-replication-atlas/doi/10.1016/j.cognition.2010.09.012/ ; [search] https://link.springer.com/10.1007/s11409-015-9146-2
  → Make reading fluent. Put the difficulty in the content (§6).
- **Font choice matters for reading speed, per individual.** Wallace et al. (2022, *ACM TOCHI*): reading speed varied by **35%** between a person's fastest and slowest font with no loss in comprehension, and people's *preferred* font was usually not their fastest. [search] https://research.adobe.com/publication/towards-individuated-reading-experiences-different-fonts-increase-reading-speed-for-different-individuals ; https://jeffhuang.com/papers/Readability_TOCHI22.pdf
- **Skimming patterns (NN/g).** The F-pattern appears when the page is a wall of text, the reader wants efficiency, and isn't committed. Other patterns: *layer-cake* (reading only headings), *spotted* (hunting for a word or number), *commitment* (reading everything, which is rare). NN/g calls the F-pattern bad for users. Fixes: put the important points first, write informative headings that start with the key words, group visually, bold key phrases, use lists. [opened] https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- **Developers and docs.** Meng, Steinhardt & Schubert (2019, *Communication Design Quarterly*), 11 developers with eye-tracking: opportunistic (code-first, bottom-up) vs systematic (concept-first) readers. Strategy didn't predict experience. Opportunistic readers skip concept prose and lean on examples, so key concepts should appear **redundantly in prose *and* inside examples**, with text-to-code links signalled. [opened] https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/

**On our page.**
- **Design for the layer-cake skimmer.** Headings are full claims or questions that make sense alone ("Replicas pull from the primary, not the other way round"), so reading only headings gives a usable summary. Each section's first two sentences state the problem and the answer's shape.
- **Design for the opportunistic reader.** Every concept appears *inside* the figure or trace too (the partition-assignment rule is written on the Kafka diagram, not only in the paragraph above).
- **Typography for fluency.** 16–18 px body, 60–75 characters per line, generous line height (~1.6), a proven text face, monospace only for code and numbers. Offer a reader font/size toggle (Wallace et al. support individual choice), stored per viewer.
- **"Spotted" readers** hunt for numbers, so set key figures (40 KB/s, 100k req/s, partition count) in tabular numerals and make them scannable.

**How it goes wrong.** Deliberately "hard" fonts as a learning trick. Headings that are cute labels ("Let's Talk Queues!") and say nothing when skimmed. Center-aligned text. Low-contrast grey body text. Bold everywhere. Wide 120-character lines.

---

## 15. Emotional tone: humour, warmth, respect for time

**Evidence.** Banas, Dunbar, Rodriguez & Liu (2011, *Communication Education*), four decades of research: appropriate, positive, content-related humour improves instructor evaluations and classroom climate. Effects on *learning* are mixed. Off-topic, aggressive or disparaging humour is harmful. [search] https://www.facultyfocus.com/articles/effective-teaching-strategies/humor-in-the-classroom-40-years-of-research/ ; https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11814177/ . Irrelevant jokes count as seductive details (§6).

**On our page.**
- **Humour comes from the material and the class**, not from the writer: the absurd "AWS just doesn't show the option" answer, the 1997-not-2000 counter, "doing two things in one shot is always a problem in distributed systems". Keep the teacher's voice and his Hinglish-inflected plainness where it reads naturally. It is the opposite of AI-generic.
- **Warmth = respect.** Admit when something is genuinely weird or contested ("there's no universal answer here; it depends on X and Y"). Say when the class itself got it wrong. Never say "simply" or "just" about hard things.
- **Respect for time.** Honest time estimates (§7). "Skip if you know X" (§11). A one-paragraph "if you only have 5 minutes" summary at the top of each section, written as a claim, not a teaser. Allow stopping.
- **Anti-AI-slop voice rules:** no "Let's dive in", "In today's fast-paced world", "It's important to note", "game-changer", em-dash triplets, or emoji headers. Use specific nouns (Post #4182, server B, partition 2). Vary sentence length. Cite real people and moments.

**How it goes wrong.** Memes and GIFs. Forced puns in headings. Cheerleading ("Awesome! You're crushing it!"). Fake-casual voice. Overuse of "we" and "let's". Sarcasm about readers or students.

---

# (a) The 12 highest-leverage patterns, ranked

Ranking = (evidence strength × fit for senior engineers × how much it changes the page) ÷ build cost.

**1. Predict-then-reveal prompts built from real class questions.** 6–9 per lecture, one per major section plus at most one inside a step-figure. Each states a concrete Medium scenario with numbers (P1, P8, P11, P12, P14, P15, P16, P19), asks the reader to commit via 3–4 one-tap options or a free-text box (local only, never graded), and has a visible "Skip, show me" link. The reveal shows: the answer with its mechanism; "the most common guess in class was…" with the reason it's tempting; and a link to the matching figure step. Peer tone ("What's your call?"). No scores, no green/red celebration. Evidence: pretesting, generation, Carpenter & Toftness, Pan et al. (§4).

**2. Spatially integrated, step-through figures with on-figure labels.** Each mechanism figure is user-stepped (Prev/Next, no autoplay). Each step adds ≤4 new elements. Labels sit on boxes and arrows, the prose for the current step sits beside the figure (sticky figure on desktop, stacked on mobile), and the term's colour in the prose matches its component colour. Clips are ≤60 s, paused by default, with a global pause. Evidence: spatial contiguity d = 1.10, temporal contiguity d = 1.22, segmenting, signalling, coherence (§6, §10).

**3. Problem-first section openers (curiosity gap).** Each section opens with an incident or open question about Medium in ≤3 sentences with one number ("The clap counter says 101 after two simultaneous claps on 100. Where did one go?"), and closes that gap within the section. The concept name appears after the gap. The TOC lists the question with the concept tag in small text. Evidence: Loewenstein (§1).

**4. Medium as a growing, breaking system: the persistent architecture diagram.** One master diagram evolves across the lecture. A thumbnail at the top of each section shows "the system so far" with the part about to change highlighted, and a sticky mini-map on desktop doubles as navigation. Each section follows the naive → incident → fix → new failure arc. The lecture ends on the completed diagram. Evidence: transportation/verisimilitude, dual coding, memorable-image scaffold (§2, §10).

**5. "Common wrong turn" refutation blocks from the real misconception bank.** Placed directly after the related prediction, at most 1–2 per section. Four parts: the belief stated fairly and attributed ("Asked in class: …"), why it's tempting, a concrete counter-case, and the correct model plus the diagram delta. Visually quiet (left rule, small label), with the myth never in the largest type. Source: `teaching_map.md §5`. Evidence: refutation texts g = 0.41 (§12).

**6. Concrete → iconic → abstract, and worked → faded examples.** Every core concept is introduced on a specific Medium object (post #4182 on server B), then redrawn generically, then stated as a rule. Back-of-envelope maths runs as a sequence: example 1 fully worked, example 2 with the last step blank, example 3 the reader does it, each answer behind a reveal. Evidence: concreteness fading; backward fading (§3).

**7. Headings and section leads written for skimmers (layer-cake proof).** Headings are self-contained claims or questions. The first two sentences of each section give problem and answer shape. A collapsed "5-minute version" per section states the conclusions plainly. Key concepts are repeated inside figures and traces for code-first readers. Key numbers are set in tabular figures. Evidence: NN/g scanning patterns; Meng et al. (§14).

**8. Section-end free recall plus later callbacks (spaced retrieval within the page).** Each section ends with one 30-second free-recall prompt and an expandable model answer (no multiple-choice). 2–3 sections later, a callback question retrieves an earlier idea in a new context (e.g. the 74/75/76 double-increment and the lost clap are the same "two things in one shot" failure). Evidence: retrieval practice g ≈ 0.61, spacing (§5).

**9. End-of-lecture "which one fits?" interleaved set plus a designed peak and ending.** The final screen: the completed Medium diagram; 5 mixed scenarios over the confusable pairs (queue/stream, replica/shard, polling/SSE/WebSocket, local/central cache), each answered with a one-line justification; then one honest line about the next lecture and an opt-in "try these 5 again in 2–3 days" link. The lecture's single strongest "aha" (lecture 1: the API server's disk is a cache) gets the best prediction, figure and clip on the page. Q&A goes into its topics or an appendix, never last. Evidence: interleaving g = 0.42 for similar categories; peak-end (§5, §8).

**10. Honest progress and resumption.** A sticky segmented rail of the lecture's sections (not a percent bar), with "~N min left in this section" computed from words at ~220 wpm plus clip lengths plus prompts. 3–4 marked natural stopping points aligned with the class breaks. On return, one line: "You were in *Delegation → why the count drifted*. Continue →", optionally with a single retrieval question about the previous section. All state is in try/catch-guarded localStorage, with no account required. Evidence: Ovsiankina resumption, goal-gradient by proportion, Villar et al. on progress bars (§7).

**11. Expertise-aware skips.** Basics (why count++ isn't atomic, what a replica is) live in collapsed "Foundations" panels with a one-line description. The prediction before a basics block doubles as a gate ("Got it right? Jump to the trade-off →"). "Going deeper" asides (fencing tokens, exactly-once, per-partition ordering) are collapsed for experts. There is no global beginner/expert mode. Evidence: expertise reversal (§11).

**12. Authentic signals and voice.** "From class" boxes with anonymised real questions and war stories and their timestamps. Answer-spread shown only from real class or reader data with n. Every hard number has a citation marker. Provenance line ("recorded <date> · fact-checked <date>"). Humour only from the material. A banned-phrase list in the style guide. Reader-adjustable font and size. Evidence: verisimilitude, humour research, Wallace et al., dark-pattern awareness (§13, §14, §15).

---

# (b) Do NOT do

- **Gamification:** points, XP, badges, levels, streaks, leaderboards, "achievement unlocked", completion certificates, confetti or celebratory animations, progress "rewards".
- **Fake urgency or scarcity:** countdowns, "only today", "limited seats", "X people are reading now".
- **Fake social proof:** invented reader counts, made-up "most people get this wrong" statistics, testimonials, company logos implying endorsement.
- **Dishonest progress:** pre-filled or inflated progress bars, % bars that crawl at the start, reading times rounded down, "almost done!" when you're not.
- **Nagging and re-engagement manipulation:** "You haven't finished!" emails or push, exit-intent modals, guilt copy ("No thanks, I don't want to learn"), streak-loss warnings, required sign-up to continue or to see answers.
- **Gated content:** forcing an answer before revealing the next section, locking sections behind quizzes, scroll-jacking.
- **Quiz-ification:** scores, red/green judgement styling, "Correct! 🎉", trivia questions, prompts every few paragraphs.
- **Cliffhanger abuse:** withholding the answer to the current question to force scrolling, or teasers that never pay off (Zeigarnik memory claims don't replicate anyway).
- **Seductive details:** memes, GIFs, stock photos, decorative hero art, off-topic fun facts, mascots, looping background animation, vendor-logo soup.
- **Autoplay** of clips or audio. Any animation moving next to text the reader is trying to read.
- **Disfluency tricks:** hard-to-read fonts, low-contrast text, tiny type sold as "desirable difficulty".
- **Global beginner/expert mode switches** and patronising reassurance copy.
- **Mocking misconceptions** or the people who held them. Myth-listicles that put the myth in the headline.
- **AI-slop voice:** "Let's dive in", "In today's fast-paced world", "it's important to note", "game-changer", emoji headings, empty rhetorical questions, generic foo/bar examples, three-adjective lists.
- **Invented drama** in the Medium story (fictional CTOs, made-up outages with fake metrics). Incidents must reflect real mechanics from the class.

---

## Sources

Opened and read: https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/ · https://www.bps.org.uk/research-digest/heres-simple-way-boost-your-learning-videos-prequestion · https://featuredcontent.psychonomic.org/test-first-learn-later-the-power-of-pretesting-to-enhance-learning/ · https://journalofcognition.org/articles/455 · https://pmc.ncbi.nlm.nih.gov/articles/PMC8784251 · https://www.cambridge.org/core/books/cambridge-handbook-of-multimedia-learning/principles-for-reducing-extraneous-processing-in-multimedia-learning-coherence-signaling-redundancy-spatial-contiguity-and-temporal-contiguity-principles/CD5B7AE1279A9AB81F8EEBB53DBEC86E · https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/magical-number-4-in-shortterm-memory-a-reconsideration-of-mental-storage-capacity/44023F1147D4A1D44BDC0AD226838496 · https://ideas.repec.org/a/pal/palcom/v12y2025i1d10.1057_s41599-025-05000-w.html · https://www.learningscientists.org/blog/2019/6/20-1 · https://sigdoc.acm.org/cdq/how-developers-use-api-documentation-an-observation-study/

Opened but unreadable (PDF/403/cookie wall), with claims taken from abstracts or secondary sources: https://learninglab.uchicago.edu/Pre-Testing_files/RichlandKornellKao.pdf · https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf · https://www.uky.edu/~gmswan3/EDC608/Kalyuga2007_Article_ExpertiseReversalEffectAndItsI.pdf · https://business.columbia.edu/faculty/research/goal-gradient-hypothesis-resurrected-purchase-acceleration-illusionary-goal · https://pubmed.ncbi.nlm.nih.gov/17645161/ · https://ro.uow.edu.au/edupapers/136 · https://pc.cogs.indiana.edu/?p=885

Search abstracts and secondary summaries (verify before quoting numbers): Loewenstein, Green & Brock, van Laer, Fyfe et al., Rawson et al., Renkl et al., Bertsch et al., Adesope et al., Cepeda et al., Bjork & Bjork, Sweller et al., Kahneman et al., Kivetz et al., Villar et al., Diemand-Yauman / replications, Wallace et al., Banas et al., Mathur et al., Sinha & Kapur, Pan et al. 2020, Rey / seductive-details meta-analyses. URLs are inline in each section.
