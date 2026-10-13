# Fact-check report: pagination, engineering mindset (Lecture 3)

Scope: 38 ledger items of group `pagination_engineering_mindset` (topics starting with `pagination` / `engineering-mindset`); no admin items in the group. **38 items checked.** Date checked: 2026-10-13.

## Counts

| Verdict | Count |
|---|---|
| accurate | 18 |
| simplified | 11 |
| imprecise | 3 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 6 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 2 |
| low | 13 |
| none | 23 |

Additions proposed: 15 (see `pagination_engineering_mindset_additions.jsonl`).

Calibration: live-class simplification is expected and was marked `simplified`, not `imprecise`. The core pagination lesson is well supported by PostgreSQL, MongoDB and Elastic docs: offset cost grows with depth, and keyset/ID pagination stays flat. I flagged items only where a careful reader would leave with a wrong mental model: that all databases physically store rows in PK order, and that keyset pagination cannot handle WHERE clauses. Engineering-mindset items are advice or opinion. They were marked accurate where they are sound principles, and unverifiable where they make sweeping claims about companies or about microservices. The benchmark and Prometheus anecdotes are unverifiable personal stories; the teacher's blog post confirms the benchmark's findings but shows no date.

## Items needing a decision (ordered by severity)

### L-0229 | imprecise | severity: medium
- **Teacher/ledger statement:** ID-limit pagination is very efficient because MongoDB collections and SQL tables are physically stored ordered by primary key; "it is a property of the database to always keep data ordered by primary key".
- **Verbatim:** "they're physically stored order by primary key, this becomes a very efficient operation." (teacher)
- **Issue:** This is true only for clustered-index engines such as MySQL InnoDB. PostgreSQL tables are heaps: CLUSTER is a one-time reorder, and later rows are not kept in order. A normal MongoDB collection stores the `_id` index separately from the documents; clustered collections are an opt-in since 5.3. The speed comes from the index on the key, which lets the query seek to the last ID. Physical row order is not what makes it fast.
- **Suggested note:** ID-limit pagination is efficient because an index on the ID (in InnoDB, the clustered primary key) lets the database seek directly to the last ID and read the next rows in order, so cost does not grow with depth.
- **Sources:** [dev.mysql.com](https://dev.mysql.com/doc/refman/8.4/en/innodb-index-types.html), [postgresql.org](https://www.postgresql.org/docs/current/sql-cluster.html), [mongodb.com](https://www.mongodb.com/docs/manual/core/clustered-collections/)

### L-0234 | imprecise | severity: medium
- **Teacher/ledger statement:** Disadvantage of ID-based pagination: you cannot apply complex WHERE clauses; that is acceptable when it fits your use case.
- **Verbatim:** "Disadvantaged, you cannot apply a complex where clauses, but it's okay." (teacher)
- **Issue:** Keyset (seek) pagination works with filters and non-ID sorts. You need a deterministic sort key such as (sale_date, sale_id), a row-values predicate on the last values seen, and an index that matches the filter and sort. Its real costs are that you cannot fetch arbitrary page numbers and that you need a fitting index. A learner who believes the stated limit would fall back to slow OFFSET for filtered feeds (e.g. "tweets of user X"), where keyset pagination is the standard answer.
- **Suggested note:** The real disadvantages are no jump-to-page-N and the need for a deterministic sort key with an index covering the filter and sort; filtered keyset queries are fine when such an index exists.
- **Sources:** [use-the-index-luke.com](https://use-the-index-luke.com/sql/partial-results/fetch-next-page), [use-the-index-luke.com](https://use-the-index-luke.com/no-offset), [mongodb.com](https://www.mongodb.com/docs/manual/reference/method/cursor.skip/)

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0250 | imprecise | low | ES 10,000 cap is the configurable `index.max_result_window` default, params are from/size; deep paging now via search_after + PIT (scroll no longer recommended) |
| L-0244 | unverifiable | low | Strong opinion ("microservices are stupid in most cases"); Fowler's MonolithFirst supports a milder form |
| L-0212 | simplified | low | since_id fetches newer tweets; older pages use max_id (v1.1) / until_id or next_token→pagination_token (v2) |
| L-0217 | simplified | low | Limit-offset needs a unique ORDER BY or pages are inconsistent |
| L-0222 | simplified | low | "Every database" over-generalises; holds for common B-tree engines |
| L-0225 | simplified | low | Keyset is not limited to filter-free iteration (see L-0234) |
| L-0227 | simplified | low | ObjectId and Snowflake IDs are only roughly time-ordered (k-sorted) |
| L-0228 | simplified | low | Query must also sort on _id / ORDER BY id |
| L-0233 | simplified | low | Exact for InnoDB clustered PK; heap stores do index range scan + row fetches |
| L-0235 | simplified | low | Advice sound; reason too strong (see L-0234) |
| L-0247 | simplified | low | In MongoDB it works via the _id index, not physical order |
| L-0248 | simplified | low | Hash-partitioned stores still do efficient cursor paging (DynamoDB LastEvaluatedKey); they lose cheap global ordered ranges |
| L-0310 | simplified | low | String order follows collation; numeric strings sort lexicographically |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0221 | Personal anecdote (2016, Amazon); the blog post exists but is undated |
| L-0226 | Claim about Twitter's internal batch workloads |
| L-0231 | Personal benchmark anecdote (disk throttling); blog only mentions disk contention |
| L-0241 | Opinion about what "good companies" do |
| L-0244 | Opinion on microservices |
| L-0246 | Personal anecdote (Prometheus + node exporter on his machine) |
