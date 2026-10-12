# Knowledge Ledger schema

One JSON object per line (JSONL). One item = one atomic thing taught. If a sentence teaches two things, make two items.

```json
{
  "id": "K1-014",
  "type": "concept | definition | claim | rule_of_thumb | example | analogy | number | tradeoff | war_story | misconception | comparison | process | qa_insight | admin_reference",
  "statement": "Faithful, self-contained restatement in plain English (no 'he said'). Keep the teacher's specifics: numbers, product names, examples.",
  "detail": "Optional: supporting nuance, conditions, caveats the teacher gave.",
  "topic": "caching > browser | scaling > database > sharding | delegation > kafka > partitions | concurrency > locking | communication > long-polling | ...",
  "case_study": "How it ties to the Medium example, if it does (else null).",
  "source": {"audio": ["01:16:15-01:16:40"], "board": ["01:16:30"]},
  "speaker": "teacher | student (proposal) | student (question)",
  "status": "endorsed | proposed_then_corrected | rejected | open",
  "verbatim": "Short exact quote (<= 25 words) from transcript or board that anchors the item.",
  "depends_on": ["K1-010"],
  "confidence": "high | medium | low",
  "flags": ["asr: [?term] ...", "check: ..."],
  "importance": "core | supporting | aside"
}
```

Rules
- Faithful: never add knowledge the lecture/board doesn't contain. Never fix the teacher here; the fact-checker does that later.
- Student proposals the teacher corrected are items too (status proposed_then_corrected) with the correction in `detail`: they explain WHY.
- Q&A insights are items (type qa_insight) with the topic they belong to.
- Skip pure admin (audio checks, break logistics) unless it states course structure (e.g. "leader election comes next week") -> type admin_reference.
- Opinions/heuristics of the teacher ("Kafka is a stupid solution in some cases") are rule_of_thumb/claim items, kept.
- Low-confidence items (built on unresolved ASR flags) get confidence low and the flag text.
