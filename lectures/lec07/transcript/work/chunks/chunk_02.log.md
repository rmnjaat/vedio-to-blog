| ID | Time | Type | Original (ASR) | Corrected | Reason / evidence | Conf |
|---|---|---|---|---|---|---|
| 01 | 00:13:04 | TERM | So then chain data capture | So then change data capture | term_decisions A7; teacher defines "Change Data Capture" 00:10:48 | high |
| 02 | 00:13:12 | TERM | It exposes wall file. | It exposes WAL file. | term_decisions A3; binlog / commit-log CDC sentence | high |
| 03 | 00:13:14 | TERM | Chain data capture directly reads that wall file. | Change data capture directly reads that WAL file. | term_decisions A7 + A3 | high |
| 04 | 00:14:05 | TERM | sync should always be a database | sink should always be a database | term_decisions A2 (CDC destination); "data is a sink" said 00:13:28 | high |
| 05 | 00:14:12 | TERM | Kafka as a sync | Kafka as a sink | term_decisions A2 | high |
| 06 | 00:14:14 | TERM | this AirBite or DBZM supports | this Airbyte or Debezium supports | term_decisions A9, A10 | high |
| 07 | 00:14:18 | TERM | this is SYNC. | this is sink. | term_decisions A2 | high |
| 08 | 00:14:20 | TERM | SYNC can be Kafka | Sink can be Kafka | term_decisions A2 | high |
| 09 | 00:14:30 | TERM | AirBite and DPZM. | Airbyte and Debezium. | term_decisions A9, A10 | high |
| 10 | 00:15:04 | TERM | concept of chain data capture | concept of change data capture | term_decisions A7 | high |
| 11 | 00:16:19 | WORD | the grind scheme of things | the grand scheme of things | idiom "grand scheme of things"; "grind" makes no sense here | medium |
| 12 | 00:16:29 | TERM | written in elastic search | written in Elasticsearch | term_decisions A11 (join) | high |
| 13 | 00:16:29 | TERM | transaction is in my sequel | transaction is in MySQL | term_decisions A11 ("my sequel" 00:16:29); MySQL named again 00:16:52 | high |
| 14 | 00:17:39 | TERM | bulk ingest in threadshift | bulk ingest in Redshift | non-word; data-warehouse example "Let's say redshift" 00:17:09, "Redshift gives you those plugins" 00:18:23 | medium |
| 15 | 00:17:53 | TERM | like every block published | like every blog published | term_decisions A34 (blog-publish example) | medium |
| 16 | 00:20:03 | SPLIT | then yeah rahul go on so basically what i | Teacher: "...yeah, Rahul, go on." / Student 8 (Rahul): "So basically what I ..." | teacher calls Rahul; STUDENT_8 segment 00:20:10 continues "wanted to ask is"; term_decisions speaker map STUDENT_8 = Rahul | high |
| 17 | 00:20:10 | TERM | wall wall files | WAL, WAL files | term_decisions A3 (student CDC question 00:20:10-00:20:33) | high |
| 18 | 00:20:18 | TERM | wall directory via postgres | WAL directory via Postgres | term_decisions A3 | high |
| 19 | 00:20:33 | TERM | those wall files | those WAL files | term_decisions A3 | high |
| 20 | 00:21:37 | WORD | a sequential lead | a sequential read | read-load answer ("does not put a lot of load", reading WAL via client) | medium |
| 21 | 00:21:42 | WORD | just pin up a new replica | just spin up a new replica | "spin up a replica" idiom; "From that replica, configure a CDC" follows | medium |
| 22 | 00:23:46 | TERM | in your AirBite | in your Airbyte | term_decisions A10 | high |
| 23 | 00:23:51 | TERM | to use AirBite | to use Airbyte | term_decisions A10 | high |
| 24 | 00:23:56 | TERM | plugins with AirBite | plugins with Airbyte | term_decisions A10 | high |
| 25 | 00:18:49 | TERM | Explore DBZM a bit. | Explore Debezium a bit. | term_decisions A9 | high |
| 26 | 00:18:56 | TERM | Search for DBZM example. | Search for Debezium example. | term_decisions A9 | high |
