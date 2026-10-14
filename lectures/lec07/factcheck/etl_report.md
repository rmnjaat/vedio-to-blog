# Fact-check report: ETL motivation and event-based pipelines (Lecture 07)

Scope: 18 ledger items of group `etl` (topic root `etl`: day-zero architecture, analytics growth, pipeline, event-based pipeline). No admin items skipped. **18 items checked.** Checked 2026-10-13.

## Counts

| Verdict | Count |
|---|---|
| accurate | 12 |
| simplified | 4 |
| imprecise | 0 |
| wrong | 0 |
| outdated | 0 |
| unverifiable | 2 |

| Severity | Count |
|---|---|
| high | 0 |
| medium | 0 |
| low | 5 |
| none | 13 |

Additions proposed: 8 (see `etl_additions.jsonl`).

Calibration: this section is the lecture's motivating story (why companies move data out of the production database, and why API-published events are a weak way to do it). Live-class framing and hyperbole ("they'll go nuts", "champs at SQL") are judged as framing, not as technical claims. Items are flagged only where a careful reader could take away a wrong idea. The ones flagged are over-generalisations ("every data lake format supports SQL") or omitted context (read-only access still adds load; app events fail through dual writes, not because events are wrong). Versions checked: Kafka 4.3 docs, MongoDB SQL Interface docs as of October 2026.

## Items needing a decision (ordered by severity)

None. No item is wrong, outdated, or of medium or high severity.

## Other non-accurate items

| ID | Verdict | Severity | Issue |
|---|---|---|---|
| L-0016 | unverifiable | low | The 10,000-50,000-user / Series A threshold is a rule of thumb. The real limit depends on data volume and query cost. |
| L-0018 | simplified | low | The PII risk is right ([GDPR Art. 5(1)(c)](https://gdpr-info.eu/art-5-gdpr/)). The item omits that read-only analysts can still slow the OLTP database with heavy queries ([metabase.com](https://www.metabase.com/glossary/read-replica)). |
| L-0021 | simplified | low | Warehouses speak SQL ([BigQuery GoogleSQL](https://docs.cloud.google.com/bigquery/docs/introduction-sql), [Redshift](https://docs.aws.amazon.com/redshift/latest/dg/c_redshift-and-postgres-sql.html)). Lake formats such as Iceberg are table formats, and SQL comes from engines like Spark and Trino ([iceberg.apache.org](https://iceberg.apache.org/)). |
| L-0022 | simplified | low | MongoDB offers a read-only SQL-92-compatible SQL Interface for BI tools. The legacy BI Connector reached EOL in September 2026 ([mongodb.com](https://www.mongodb.com/docs/sql-interface/)). |
| L-0028 | simplified | low | App events are a common design, not a wrong one. The concrete flaw is the non-atomic dual write to the database and Kafka, which the outbox pattern or CDC fixes ([debezium.io](https://debezium.io/blog/2019/02/19/reliable-microservices-data-exchange-with-the-outbox-pattern/), [microservices.io](https://microservices.io/patterns/data/transactional-outbox.html)). |

## Unverifiable items

| ID | Why no public source can confirm |
|---|---|
| L-0013 | Generalisation about what early-stage companies "typically" do. Plausible and harmless (severity none). |
| L-0016 | The teacher's own user-count threshold for querying production directly. It depends on the workload, and no public figure exists. |
