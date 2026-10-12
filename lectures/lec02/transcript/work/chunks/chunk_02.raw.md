# chunk_02  OWNS 00:13:26 -> 00:26:38  (segments #230-#439, 2171 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [00:12:27] TEACHER: They started to say, hey, we are base.   {#213}
CTX| [00:12:29] TEACHER: We are not asset, right?   {#214}
CTX| [00:12:31] TEACHER: But now MongoDB is asset compliant.   {#215}
CTX| [00:12:32] TEACHER: May not be as optimal as SQL world, but they are asset compliant.   {#216}
CTX| [00:12:36] TEACHER: Right.   {#217}
CTX| [00:12:37] TEACHER: So which is why you cannot generically claim something about a database.   {#218}
CTX| [00:12:42] TEACHER: Always, always, always remember this.   {#219}
CTX| [00:12:45] TEACHER: Okay.   {#220}
CTX| [00:12:46] TEACHER: Now that we, now that I use that, let's move to the second type of database, key values   {#221}
CTX| [00:12:50] TEACHER: store.   {#222}
CTX| [00:12:50] TEACHER: Now key values store are typically more restrictive than document based database where the query   {#223}
CTX| [00:12:56] TEACHER: Any that you are making or reads and writes and deletes and all the operations that you   {#224}
CTX| [00:13:01] TEACHER: are making, they are always key wise operations like get a key, put a key, delete a key, insert   {#225}
CTX| [00:13:09] TEACHER: a key, insert a value in the set represented by a key, something like that.   {#226}
CTX| [00:13:13] TEACHER: So it's a little more restrictive than document based database.   {#227}
CTX| [00:13:16] TEACHER: But because everything is key wise, you can very easily shard the database because you   {#228}
CTX| [00:13:23] TEACHER: would never have to make cross shard queries.   {#229}

---- OWNED SEGMENTS START ----
[00:13:26] TEACHER: cross-sharp queries you have to make when you are doing that range operation that,   {#230}
[00:13:31] TEACHER: hey, in this range operation or in operator, when you are saying that,   {#231}
[00:13:35] TEACHER: hey, give me all the documents where ID in 1, 2 and 3.   {#232}
[00:13:39] TEACHER: What if one is on one database, two is on this database, three is the third database.   {#233}
[00:13:42] TEACHER: Right.   {#234}
[00:13:42] TEACHER: So in that case, you are doing cross-sharp queries, which becomes very expensive,   {#235}
[00:13:46] TEACHER: but key values to limits that all it gives you is, hey, this is a key.   {#236}
[00:13:52] TEACHER: Give me the value or every operation is a single key based operation.   {#237}
[00:13:55] TEACHER: Right.   {#238}
[00:13:56] TEACHER: such cases key value store you can very heavily partition very heavily like thousands and thousands   {#239}
[00:14:03] TEACHER: of partitions without having any hiccups because what you are doing is you are limiting the way   {#240}
[00:14:09] TEACHER: people can access them this way what you get you get very heavily partitioned now imagine the more   {#241}
[00:14:17] TEACHER: complex you make these queries the lesser you can distribute the data because then cross-shot queries   {#242}
[00:14:22] TEACHER: become expensive. So that is why you see this on one extreme where it prevents you from doing   {#243}
[00:14:29] TEACHER: anything. It literally just says, Hey, there is a key. You can do all operations on this key.   {#244}
[00:14:35] TEACHER: You cannot do cross partition operations easily. You can do a database typically support that,   {#245}
[00:14:41] TEACHER: but it becomes really expensive for you to do that, which is why by limiting the access,   {#246}
[00:14:45] TEACHER: you get massive parallelism.   {#247}
[00:14:48] TEACHER: Yeah, so because now that you have multiple databases,   {#248}
[00:14:52] TEACHER: every database can handle queries in parallel   {#249}
[00:14:54] TEACHER: without having to wait for other queries to come.   {#250}
[00:14:57] TEACHER: So you get very massive partitioning,   {#251}
[00:14:59] TEACHER: very massive parallelization.   {#252}
[00:15:01] TEACHER: You get best performance output,   {#253}
[00:15:03] TEACHER: but you restrict the access.   {#254}
[00:15:05] TEACHER: This is where you see the beauty of computer science.   {#255}
[00:15:08] TEACHER: How every single thing is a trade-off.   {#256}
[00:15:12] TEACHER: You get something, you lose something.   {#257}
[00:15:15] TEACHER: that you lose something, you get something.   {#258}
[00:15:17] TEACHER: Here with KeyValueStore, you lost the power of making complex queries,   {#259}
[00:15:21] TEACHER: but you gained massive parallelization, massive availability and whatnot.   {#260}
[00:15:26] TEACHER: But you want complex features.   {#261}
[00:15:28] TEACHER: So you lose to like, you cannot have thousands and thousands   {#262}
[00:15:32] TEACHER: of partitions in document data.   {#263}
[00:15:34] TEACHER: So it's always, always, always a trade-off.   {#264}
[00:15:38] TEACHER: The next type of database.   {#265}
[00:15:39] TEACHER: Once I cover this, then we'll take questions.   {#266}
[00:15:41] TEACHER: The next type of database that I am personally fan of,   {#267}
[00:15:45] TEACHER: is column oriented database.   {#268}
[00:15:47] TEACHER: Now column oriented databases, they exploit how people queries the system.   {#269}
[00:15:55] TEACHER: Column oriented database, typically when we store the data, the way we even draw it is   {#270}
[00:16:00] TEACHER: we draw one row together, all the columns of that particular row, all the attributes   {#271}
[00:16:05] TEACHER: of the particular row, they sit together.   {#272}
[00:16:07] TEACHER: Those are row oriented databases.   {#273}
[00:16:09] TEACHER: These are column oriented databases.   {#274}
[00:16:12] TEACHER: So row oriented databases, for example.   {#275}
[00:16:15] TEACHER: a table called stock ticks where I'm putting the stock prices of all the stocks listed.   {#276}
[00:16:21] TEACHER: I have symbol, price, name, exchange and timestamp. For every tick I'm making those many entries in my   {#277}
[00:16:27] TEACHER: table. Now let's say in row oriented databases what you would see is all the columns of a particular   {#278}
[00:16:38] TEACHER: row are they sit together, which means when I'm writing it on the desk, all the five columns,   {#279}
[00:16:45] TEACHER: let's say here, there are five columns.   {#280}
[00:16:47] TEACHER: All five columns will be stacked one after another, and this will become one row persisted   {#281}
[00:16:53] TEACHER: on the disk as is, which means when you are reading, you are reading the complete row   {#282}
[00:16:57] TEACHER: all this, right?   {#283}
[00:16:59] TEACHER: I have select and select.   {#284}
[00:17:02] TEACHER: I don't provide star.   {#285}
[00:17:03] TEACHER: I would read just two columns.   {#286}
[00:17:04] TEACHER: Now that's what end user your disk IO would actually be able to read.   {#287}
[00:17:08] TEACHER: actually read the entire row, filter the things that you need and serve it to the user.   {#288}
[00:17:13] TEACHER: So on the disk side, it is actually reading the entire row because this entire thing is   {#289}
[00:17:21] TEACHER: stacked together.   {#290}
[00:17:23] TEACHER: So this is row oriented databases.   {#291}
[00:17:26] TEACHER: The second example, the counterfeiting example for that is column oriented databases.   {#292}
[00:17:31] TEACHER: The column oriented databases, what they do is they store the columns of like they stack   {#293}
[00:17:39] TEACHER: the columns across multiple rows together.   {#294}
[00:17:42] TEACHER: For example, if I have three rows over here, one, two, three, then this three will sit   {#295}
[00:17:49] TEACHER: together.   {#296}
[00:17:49] TEACHER: Then this three will sit together.   {#297}
[00:17:52] TEACHER: This three will sit together.   {#298}
[00:17:53] TEACHER: So a very crude way, again, I'm very crude, very blunt, very naive way of visualizing   {#299}
[00:18:02] TEACHER: this is assume that you have one file for each column, one separate file for each column.   {#300}
[00:18:10] TEACHER: It's a very naive way, but it would help you understand one file for each column where   {#301}
[00:18:16] TEACHER: assume that first line contains value of first row in value of first column in first row.   {#302}
[00:18:24] TEACHER: So this then this then this so column the file for column one would have three lines   {#303}
[00:18:30] TEACHER: one for row one one for row two one for row three that column then one file for column   {#304}
[00:18:35] TEACHER: two which would have these three values one file for column three which will have these   {#305}
[00:18:40] TEACHER: three values. Now for you to now this is another storage layout. The first storage layout that we   {#306}
[00:18:46] TEACHER: saw was row oriented databases. Second storage layout we saw was column oriented databases.   {#307}
[00:18:51] TEACHER: Naive way each column is a separate file. Okay now what do we gain by this? So let's say we want   {#308}
[00:19:01] TEACHER: to find the average price of a particular average price of my entire stock market.   {#309}
[00:19:07] TEACHER: average price of my entire stock market for a particular day.   {#310}
[00:19:12] TEACHER: So my query would look something like this.   {#311}
[00:19:16] TEACHER: Select average of price where timestamp equal to something.   {#312}
[00:19:19] TEACHER: Right.   {#313}
[00:19:20] TEACHER: From this.   {#314}
[00:19:21] TEACHER: Now if you look carefully, if I was storing this data in a row oriented databases,   {#315}
[00:19:27] TEACHER: for a particular timestamp, there might be, let's say I have 10,000 companies listed for   {#316}
[00:19:32] TEACHER: a particular date, I might have 10,000 entries, for example.   {#317}
[00:19:36] TEACHER: Now for those 10,000 entries, I would have to go each row for that particular day.   {#318}
[00:19:42] TEACHER: All those entries may be together.   {#319}
[00:19:43] TEACHER: I have to go through each of the rows, read the rows, pick the columns that I need, average   {#320}
[00:19:50] TEACHER: them.   {#321}
[00:19:50] TEACHER: So the columns that I need is timestamp and price.   {#322}
[00:19:54] TEACHER: These are the two columns I need.   {#323}
[00:19:56] TEACHER: So for a particular timestamp, I would go on the disk, read this row, see the five columns,   {#324}
[00:20:05] TEACHER: columns, extract the thing or filter out the things that I don't need and keep the things   {#325}
[00:20:11] TEACHER: that I need and do the average whatever I want to do as part of my query evaluation.   {#326}
[00:20:16] TEACHER: Now here you see, let's say I want to iterate to 10,000 rows.   {#327}
[00:20:20] TEACHER: I have to do it.   {#328}
[00:20:21] TEACHER: Let's say there are 10,000 companies listed and I have to iterate to 10,000 rows.   {#329}
[00:20:24] TEACHER: Now when I'm firing this query, I am unnecessarily reading symbol, name and action because all   {#330}
[00:20:32] TEACHER: All I want to do is average of price for a particular timestamp.   {#331}
[00:20:37] TEACHER: So why do I waste my disk IO reading symbol name and exchange?   {#332}
[00:20:43] TEACHER: Because you are not projecting it from the select, but your database engine has to still   {#333}
[00:20:50] TEACHER: go through that so that it goes to the next one, then to the next one.   {#334}
[00:20:54] TEACHER: It has to skim through those and then it would move to the next one because unless it knows   {#335}
[00:21:00] TEACHER: this is my row boundary, it cannot pick the corresponding columns.   {#336}
[00:21:03] TEACHER: Which is why queries like this, and this is a classic case of analytics queries,   {#337}
[00:21:10] TEACHER: where what you are getting is you don't need all the columns, you need some of them,   {#338}
[00:21:15] TEACHER: few of the columns, like there might be thousands of columns and I'm not even exaggerating.   {#339}
[00:21:20] TEACHER: Data warehouses have thousands of columns. Out of the thousands of columns, if your use case says   {#340}
[00:21:26] TEACHER: is that you are very likely or extremely likely to just query on few of the columns.   {#341}
[00:21:33] TEACHER: Column oriented databases work well.   {#342}
[00:21:35] TEACHER: Why?   {#343}
[00:21:36] TEACHER: Because now if I were to fire this query on a column oriented database, what do I get?   {#344}
[00:21:43] TEACHER: I just want for a particular timestamp for a particular price.   {#345}
[00:21:47] TEACHER: So literally the only two files that I would be reading, price and timestamp.   {#346}
[00:21:56] TEACHER: don't need the symbol name and exchange column.   {#347}
[00:22:00] TEACHER: I'm not even be doing any disk IO for that.   {#348}
[00:22:04] TEACHER: That is extremely efficient, extremely efficient because when you are just   {#349}
[00:22:10] TEACHER: operating on few columns, you may have hundreds and thousands of columns, but   {#350}
[00:22:14] TEACHER: you want to operate on few columns, column oriented databases thrive.   {#351}
[00:22:18] TEACHER: They thrive like crazy.   {#352}
[00:22:20] TEACHER: This is what makes column oriented databases special for a heavy   {#353}
[00:22:26] TEACHER: databases, which is where you would always find them being used for data warehouses,   {#354}
[00:22:33] TEACHER: Amazon Redshift, Google, BigQuery, all of them.   {#355}
[00:22:38] TEACHER: Pick any, if you are in the domain of data engineering, there are tons of file formats.   {#356}
[00:22:42] TEACHER: You may have heard of Parquet.   {#357}
[00:22:44] TEACHER: All of them leverage column oriented storages because they make, you have to read the bare   {#358}
[00:22:50] TEACHER: minimum to get things done.   {#359}
[00:22:52] TEACHER: So these are all based on column oriented databases.   {#360}
[00:22:57] TEACHER: But you cannot do it on transactional like your normal.   {#361}
[00:23:01] TEACHER: Let's say you cannot build, you can, but you should not build blogging application on column   {#362}
[00:23:05] TEACHER: oriented databases.   {#363}
[00:23:06] TEACHER: Why?   {#364}
[00:23:06] TEACHER: Because you are very likely to read the entire row.   {#365}
[00:23:10] TEACHER: For example, if you want to render profile of a user, I do just taking out a few columns.   {#366}
[00:23:15] TEACHER: You, first of all, you wrote a thousand columns.   {#367}
[00:23:17] TEACHER: Second of all, if you may have 10, 15 columns, you are always reading all of them together,   {#368}
[00:23:21] TEACHER: almost always.   {#369}
[00:23:23] TEACHER: So you may pick up few every now and then, but in most cases you are doing a select star.   {#370}
[00:23:28] TEACHER: So given that, that kind of use case fits more over here and analytics use case fit   {#371}
[00:23:34] TEACHER: more over here because you are very picky in picking columns, two out of thousand or   {#372}
[00:23:39] TEACHER: three out of thousand or 10 out of thousand.   {#373}
[00:23:41] TEACHER: Right?   {#374}
[00:23:42] TEACHER: So that's why whenever you see a data warehouse,   {#375}
[00:23:45] TEACHER: and obviously what I would recommend is wherever you are working,   {#376}
[00:23:49] TEACHER: go find a data warehouse at your company.   {#377}
[00:23:51] TEACHER: Every company has a data warehouse, every single, right?   {#378}
[00:23:54] TEACHER: Go find which data warehouse your company is.   {#379}
[00:23:55] TEACHER: It must be either BigQuery or Redshift.   {#380}
[00:23:58] TEACHER: People don't typically build them.   {#381}
[00:23:59] TEACHER: Or if you are friends with some data engineer,   {#382}
[00:24:02] TEACHER: ask them about Parquet format, right?   {#383}
[00:24:03] TEACHER: You would go, you would see how beautifully it optimizes this stuff.   {#384}
[00:24:07] TEACHER: And just by altering the way storage, like altering the way you're storing the data,   {#385}
[00:24:14] TEACHER: you get massive performance boost without even changing the above layers.   {#386}
[00:24:18] TEACHER: That's the beauty of having abstractions at the right place.   {#387}
[00:24:22] TEACHER: Okay.   {#388}
[00:24:23] TEACHER: One paper I would strongly, strongly recommend you to read.   {#389}
[00:24:27] TEACHER: I cannot even emphasize how much.   {#390}
[00:24:29] TEACHER: This was one of the, this was, I can tell you the number,   {#391}
[00:24:32] TEACHER: this was the sixth paper I ever read.   {#392}
[00:24:34] TEACHER: And I fell in love with this.   {#393}
[00:24:35] TEACHER: I was in my master's or something.   {#394}
[00:24:38] TEACHER: I was in my master's and it was in the reference reads   {#395}
[00:24:42] TEACHER: of one of my courses on databases.   {#396}
[00:24:44] TEACHER: C-store, a column-oriented DBMS.   {#397}
[00:24:46] TEACHER: Just Google.   {#398}
[00:24:47] TEACHER: Like don't build a habit of getting school fit.   {#399}
[00:24:50] TEACHER: Just Google.   {#400}
[00:24:50] TEACHER: C-store, a column-oriented DBMS.   {#401}
[00:24:52] TEACHER: You can find other papers on my website as well   {#402}
[00:24:54] TEACHER: that I read and annotate.   {#403}
[00:24:56] TEACHER: But read this.   {#404}
[00:24:57] TEACHER: Read this to understand how that person   {#405}
[00:25:00] TEACHER: actually conceptualized column-oriented databases   {#406}
[00:25:02] TEACHER: and got performance that he needed.   {#407}
[00:25:04] TEACHER: Right?   {#408}
[00:25:05] TEACHER: Watch that or rather read that paper.   {#409}
[00:25:07] TEACHER: It's not that tough to read.   {#410}
[00:25:09] TEACHER: Very breezy read.   {#411}
[00:25:10] TEACHER: You can wrap it up in four days.   {#412}
[00:25:12] TEACHER: If you're just starting out, just read this paper.   {#413}
[00:25:14] TEACHER: You will love how deep researchers think.   {#414}
[00:25:19] TEACHER: It shaped my, like it made me fall in love with researching.   {#415}
[00:25:22] TEACHER: So what it helps us understand is how deep someone goes into a problem to find a solution   {#416}
[00:25:28] TEACHER: and how deep of an understanding that person has   {#417}
[00:25:32] TEACHER: when like big things are just conveyed in one lines in this paper.   {#418}
[00:25:37] TEACHER: Such brilliantly written.   {#419}
[00:25:39] TEACHER: Like highly, highly, highly, highly recommended to read this.   {#420}
[00:25:43] TEACHER: Right?   {#421}
[00:25:43] TEACHER: Okay.   {#422}
[00:25:44] TEACHER: Okay.   {#423}
[00:25:45] TEACHER: Up until now.   {#424}
[00:25:45] TEACHER: Any questions?   {#425}
[00:25:48] TEACHER: We just discussed computing, but just wanted to answer that.   {#426}
[00:25:50] TEACHER: I just don't blabber for a very long time.   {#427}
[00:25:53] TEACHER: Any questions up until stage?   {#428}
[00:25:56] TEACHER: Yeah, Ajay.   {#429}
[00:26:00] STUDENT_1: So when we do like select and we specify column, so does it, does it treat all the columns?   {#430}
[00:26:08] TEACHER: It reads all the columns from the desk.   {#431}
[00:26:11] TEACHER: Yeah.   {#432}
[00:26:11] TEACHER: From the disk, it reads all the columns, picks out the ones that you need.   {#433}
[00:26:14] TEACHER: I just sense it to you.   {#434}
[00:26:17] TEACHER: So the disk is still gone and reading all the columns in row oriented databases, but   {#435}
[00:26:22] TEACHER: in column oriented databases, it does not because think of it as separate files.   {#436}
[00:26:26] TEACHER: Like that's the easiest way to think about.   {#437}
[00:26:28] TEACHER: You don't even waste time reading the columns that you don't need.   {#438}
[00:26:34] STUDENT_3: Yeah.   {#439}
---- OWNED SEGMENTS END ----

CTX| [00:26:38] STUDENT_3: One minor drawback that I see for column oriented databases is that   {#440}
CTX| [00:26:42] STUDENT_3: insertion would be too heavy.   {#441}
CTX| [00:26:44] STUDENT_3: Yes.   {#442}
CTX| [00:26:45] TEACHER: You get some, you lose some.   {#443}
CTX| [00:26:47] TEACHER: Yeah.   {#444}
CTX| [00:26:48] TEACHER: Right.   {#445}
CTX| [00:26:48] TEACHER: But it's okay.   {#446}
CTX| [00:26:50] TEACHER: Given the benefits.   {#447}
CTX| [00:26:51] TEACHER: So which is why you never see these as a primary databases.   {#448}
CTX| [00:26:55] TEACHER: These are typically analytics workloads.   {#449}
CTX| [00:26:56] TEACHER: So that the additional databases is different.   {#450}
CTX| [00:26:58] TEACHER: synchronous job that ingest data into your data warehouse.   {#451}
CTX| [00:27:02] TEACHER: So data warehouse is never your primary copy of the data.   {#452}
CTX| [00:27:04] TEACHER: Correct.   {#453}
CTX| [00:27:05] TEACHER: The traditional databases are always different.   {#454}
CTX| [00:27:07] TEACHER: MySQL, PostgreSQL, MongoDB, DynamoDB and what more.   {#455}
CTX| [00:27:10] TEACHER: From there you move data into a column oriented database.   {#456}
CTX| [00:27:13] TEACHER: Right.   {#457}
CTX| [00:27:14] TEACHER: Just to power the raw analytics.   {#458}
CTX| [00:27:20] STUDENT_4: So what is the space comparison between row oriented databases versus   {#459}
CTX| [00:27:24] STUDENT_4: column oriented databases?   {#460}
CTX| [00:27:26] TEACHER: Great question.   {#461}
CTX| [00:27:28] TEACHER: you can so heavily compress this because it's a homogeneous data, right?   {#462}
CTX| [00:27:34] TEACHER: Because for example, if I'm talking about timestamp over here,   {#463}
