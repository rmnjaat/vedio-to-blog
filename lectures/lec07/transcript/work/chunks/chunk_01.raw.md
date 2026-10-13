# chunk_01  OWNS 00:00:00 -> 00:12:55  (segments #0-#221, 2146 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

[00:00:00] TEACHER: Computer, great week five day first.   {#0}
[00:00:05] TEACHER: My God, time flies.   {#1}
[00:00:06] TEACHER: This week is all about storage engines.   {#2}
[00:00:09] TEACHER: This is my personal favorite.   {#3}
[00:00:12] TEACHER: I can talk about storage engines for hours straight because for some reason, I have this very strong affinity towards databases, towards how distributed storage works, towards how query engines are written, towards how very optimization part has done.   {#4}
[00:00:27] TEACHER: For some reason, during my B-Tech courses, during my M-Tech courses, I just went really deep into databases.   {#5}
[00:00:34] TEACHER: I don't know how, but it just happened.   {#6}
[00:00:37] TEACHER: The one subject that I scored the least, but was my personal favorite, was database systems.   {#7}
[00:00:43] TEACHER: I scored a C grade in database systems.   {#8}
[00:00:45] TEACHER: I didn't understand a thing, but it was my favorite subject.   {#9}
[00:00:49] TEACHER: I struggled in it so much.   {#10}
[00:00:50] TEACHER: I could not ace the examination, but I had formed very deep understanding of it.   {#11}
[00:00:57] TEACHER: very contrary to what typically happens but almost all the papers i read somehow are connected to   {#12}
[00:01:05] TEACHER: distributed storages and all so which is where the agenda for today is designing distributed cash   {#13}
[00:01:11] TEACHER: and etla tier storages distributed cash now what is what will help you what will what has helped   {#14}
[00:01:20] TEACHER: me make this discussion better over time, I deep dive into Redis source code.   {#15}
[00:01:25] TEACHER: I also have a course on Redis internals, but the learnings that I got while I was going   {#16}
[00:01:31] TEACHER: really deep into Redis implementation, how they've structured, not just low level code,   {#17}
[00:01:35] TEACHER: but how they've made those certain decisions.   {#18}
[00:01:37] TEACHER: It has helped me solidify my understanding of a cache and making a distributor.   {#19}
[00:01:46] TEACHER: All of those learnings will put over here.   {#20}
[00:01:47] TEACHER: Obviously that goes very deep into Redis specific that course, but this is where we would make   {#21}
[00:01:52] TEACHER: this every single important design decision, which does not just affect this system, sorry,   {#22}
[00:01:58] TEACHER: which does not just affect this system, but almost every single system that we reserve,   {#23}
[00:02:02] TEACHER: it would just open up those blocks, those Lego blocks, those patterns that you can observe   {#24}
[00:02:08] TEACHER: and just control C, control V.   {#25}
[00:02:12] TEACHER: That's what we have to do.   {#26}
[00:02:13] TEACHER: Like some modifications here or there.   {#27}
[00:02:15] TEACHER: And that's what you know, over this last four weeks, you would have seen how we covered   {#28}
[00:02:20] TEACHER: why we covered vast variety of systems, but we always talked about those patterns.   {#29}
[00:02:25] TEACHER: Those patterns actually help us.   {#30}
[00:02:27] TEACHER: Those Lego blocks actually help us because there are only a few limited ways to achieve   {#31}
[00:02:35] TEACHER: something.   {#32}
[00:02:36] TEACHER: Once you identify it, once you know, Hey, I've learned something, this, I can apply it over   {#33}
[00:02:41] TEACHER: here.   {#34}
[00:02:41] TEACHER: That's what matters.   {#35}
[00:02:43] TEACHER: This will cover a bunch of those.   {#36}
[00:02:45] TEACHER: distributed cash and then ETL and tiered storages.   {#37}
[00:02:48] TEACHER: This is where I introduced, we go a little deeper into CDCs.   {#38}
[00:02:52] TEACHER: Up until now, we just wrote CDC.   {#39}
[00:02:55] TEACHER: Now we'll go deeper and we'll understand how tiered storages are built.   {#40}
[00:02:59] TEACHER: For tiered storages, I don't know how, but yeah.   {#41}
[00:03:02] TEACHER: While I was at Amazon, I used to build something on top of it.   {#42}
[00:03:07] TEACHER: Again, from there, I got a deep understanding of what tiered storages are   {#43}
[00:03:11] TEACHER: and what happens behind the scenes.   {#44}
[00:03:12] TEACHER: So this time we'll do things differently.   {#45}
[00:03:16] TEACHER: I'll start with ETL.   {#46}
[00:03:17] TEACHER: I'll start with tiered storage.   {#47}
[00:03:19] TEACHER: Then we talk about distributed cash.   {#48}
[00:03:21] TEACHER: The things that I'll start about tiered storages and ETL is just an introduction so that you   {#49}
[00:03:28] TEACHER: form those dots in your head.   {#50}
[00:03:32] TEACHER: Tomorrow, we'll go into a practical application of ETL and tiered storage.   {#51}
[00:03:37] TEACHER: Tomorrow or I think next week, whenever we design Amazon's order system.   {#52}
[00:03:42] TEACHER: tiered storages then.   {#53}
[00:03:44] TEACHER: But today, just to get that initial ball rolling,   {#54}
[00:03:48] TEACHER: just like how I did with Kafka essentials   {#55}
[00:03:50] TEACHER: where I covered it,   {#56}
[00:03:51] TEACHER: just so that the dots are formed,   {#57}
[00:03:53] TEACHER: then we start using it.   {#58}
[00:03:55] TEACHER: Similarly, we'll do things over here   {#59}
[00:03:57] TEACHER: around ETL and tiered storages.   {#60}
[00:03:59] TEACHER: So we'll just understand what these are,   {#61}
[00:04:01] TEACHER: what this type of systems are.   {#62}
[00:04:03] TEACHER: And then tomorrow or next week,   {#63}
[00:04:05] TEACHER: we'll go into detail.   {#64}
[00:04:06] TEACHER: We'll take one very detailed example   {#65}
[00:04:09] TEACHER: and understand how order system work at Amazon.   {#66}
[00:04:12] TEACHER: which would give you an idea of almost how data pipelines are built.   {#67}
[00:04:16] TEACHER: So it's all derived from one, like it's all basic derived from one or two.   {#68}
[00:04:22] TEACHER: Okay.   {#69}
[00:04:22] TEACHER: So let's start with tiered storage.   {#70}
[00:04:24] TEACHER: Then we take questions.   {#71}
[00:04:25] TEACHER: Then we start with distributed cache.   {#72}
[00:04:27] TEACHER: We cover low-level implementation detail.   {#73}
[00:04:29] TEACHER: Then we go on a break and then file our details.   {#74}
[00:04:31] TEACHER: That's going to be the flow for today.   {#75}
[00:04:33] TEACHER: Okay.   {#76}
[00:04:35] TEACHER: So let's start simple things that we all understand.   {#77}
[00:04:38] TEACHER: Let's start with a simple multi-user blogging application.   {#78}
[00:04:42] TEACHER: Nothing fancy.   {#79}
[00:04:43] TEACHER: When you start with multi-user blogging application, we typically have, it's day zero, not anything fancy.   {#80}
[00:04:49] TEACHER: It's day zero.   {#81}
[00:04:50] TEACHER: We typically have a database.   {#82}
[00:04:52] TEACHER: We have an API server.   {#83}
[00:04:53] TEACHER: We cannot directly expose database to the user.   {#84}
[00:04:55] TEACHER: That's why what we have, we have API server.   {#85}
[00:04:57] TEACHER: API server talks to the database.   {#86}
[00:04:58] TEACHER: Whenever any request comes in and response goes up.   {#87}
[00:05:01] TEACHER: So API server is the one that is abstracting out those details of the database complexities and whatnot.   {#88}
[00:05:08] TEACHER: Now, when a company launches, they typically don't focus on analytics, metrics and whatnot.   {#89}
[00:05:13] TEACHER: It's just when some people use it, DAU, MAU, Google Analytics, they add.   {#90}
[00:05:17] TEACHER: But now what happened is to have a deeper understanding of how people are using your product,   {#91}
[00:05:23] TEACHER: you would start to measure metrics.   {#92}
[00:05:26] TEACHER: Now, these metrics would be, hey, number of blogs published, how many users are active,   {#93}
[00:05:31] TEACHER: how many people leave a like in, let's say, first one hour or something,   {#94}
[00:05:37] TEACHER: Now, those statistics that you get in most cases or in a day zero architecture, companies   {#95}
[00:05:43] TEACHER: just beginning on very early stage, you don't have data warehouses, you don't have anything   {#96}
[00:05:47] TEACHER: fancy like that.   {#97}
[00:05:48] TEACHER: What you have is you just have a visualization tool like Grafana or a Metabase or Tableau,   {#98}
[00:05:57] TEACHER: which is connecting to your system, to your database directly.   {#99}
[00:06:00] TEACHER: And you start firing queries on that.   {#100}
[00:06:02] TEACHER: It shows very nice visualization what you do.   {#101}
[00:06:04] TEACHER: And that's how things work.   {#102}
[00:06:07] TEACHER: works very well for series a till company till 10 000 50 000 users right it works just fine   {#103}
[00:06:15] TEACHER: when application grows big now what happens is for business to make important decisions   {#104}
[00:06:21] TEACHER: they need data backing now which is where your ceo now wants very detailed reporting on very   {#105}
[00:06:28] TEACHER: particular design a very particular user behavior now when you have that what do you do earlier   {#106}
[00:06:37] TEACHER: Now it was okay.   {#107}
[00:06:38] TEACHER: But now who will generate those insights?   {#108}
[00:06:41] TEACHER: Which is where CEO recruits insights team or business analyst.   {#109}
[00:06:46] TEACHER: Business analyst needs data to analyze the business.   {#110}
[00:06:50] TEACHER: Where are they getting this data from?   {#111}
[00:06:52] TEACHER: If you expose the same database to those folks, now what would happen?   {#112}
[00:06:56] TEACHER: They don't know a thing.   {#113}
[00:06:57] TEACHER: This is very risky.   {#114}
[00:06:59] TEACHER: They say, oh, I'll only give read-only access.   {#115}
[00:07:01] TEACHER: But this has critical information, personally identifiable information.   {#116}
[00:07:05] TEACHER: Plus this database might be a NoSQL database like MongoDB.   {#117}
[00:07:09] TEACHER: You started with MongoDB because it sounded cool or it sounded cool or it sounded fancy   {#118}
[00:07:13] TEACHER: or it suits your use case really well.   {#119}
[00:07:15] TEACHER: But the insights in that you hired a lot of business analysts, they know SQL.   {#120}
[00:07:22] TEACHER: They are champs at SQL.   {#121}
[00:07:23] TEACHER: They write very complex SQL queries with ease.   {#122}
[00:07:26] TEACHER: And this is not just assumption.   {#123}
[00:07:29] TEACHER: This is hard truth, right?   {#124}
[00:07:31] TEACHER: Every single data warehouse, Redshift, BigQuery,   {#125}
[00:07:34] TEACHER: pick any data lake format, it all supports SQL queries   {#126}
[00:07:38] TEACHER: because everyone in the analytics domain is familiar with SQL.   {#127}
[00:07:43] TEACHER: So given that there is a mass audience or a mass set of people   {#128}
[00:07:47] TEACHER: who know SQL really well, who will do this analysis for you,   {#129}
[00:07:50] TEACHER: if you give them direct access to MongoDB, they'll go nuts.   {#130}
[00:07:55] TEACHER: They'll have no idea what to do.   {#131}
[00:07:57] TEACHER: So now what do you want?   {#132}
[00:08:00] TEACHER: your data is in MongoDB, what should we do?   {#133}
[00:08:03] TEACHER: So then you start writing pipeline.   {#134}
[00:08:05] TEACHER: You start taking data out of MongoDB and put it into MySQL   {#135}
[00:08:08] TEACHER: because that's the only SQL data that you know, right?   {#136}
[00:08:11] TEACHER: It's still early times, right?   {#137}
[00:08:13] TEACHER: You still don't care about data analysis yet.   {#138}
[00:08:15] TEACHER: So you take the data out and you put it into MySQL.   {#139}
[00:08:18] TEACHER: Now, but how will data from MongoDB go to MySQL?   {#140}
[00:08:22] TEACHER: That's the next question.   {#141}
[00:08:23] TEACHER: You think, hey, we know Kafka.   {#142}
[00:08:25] TEACHER: So from API server, whenever a blog is published,   {#143}
[00:08:30] TEACHER: Kafka from Kafka, you consume it and you put it into MySQL in a particular format.   {#144}
[00:08:35] TEACHER: That's the natural progression that you may take.   {#145}
[00:08:37] TEACHER: Hey, I have events and I can do this, but is this the best way?   {#146}
[00:08:41] TEACHER: Relying on events generated from the API server, is this the best way to   {#147}
[00:08:44] TEACHER: populate this database?   {#148}
[00:08:47] TEACHER: Hmm.   {#149}
[00:08:48] TEACHER: Let's think about it.   {#150}
[00:08:49] TEACHER: Can we lose something?   {#151}
[00:08:52] TEACHER: There are many things to lose because first of all, there cannot be any data   {#152}
[00:08:58] TEACHER: misses between this.   {#153}
[00:09:00] TEACHER: You have to ensure data   {#154}
[00:09:01] TEACHER: consistency across this data.   {#155}
[00:09:03] TEACHER: May not be real time, but eventually. Why?   {#156}
[00:09:05] TEACHER: Because business is making decision   {#157}
[00:09:07] TEACHER: depending on this data.   {#158}
[00:09:09] TEACHER: Because analyst does not have access to   {#159}
[00:09:12] TEACHER: this, analyst has access to this.   {#160}
[00:09:14] TEACHER: So given this,   {#161}
[00:09:16] TEACHER: they cannot, like you cannot   {#162}
[00:09:18] TEACHER: have incorrect data.   {#163}
[00:09:20] TEACHER: Otherwise, the business is making decision   {#164}
[00:09:21] TEACHER: on some wrong data.   {#165}
[00:09:23] TEACHER: So you cannot have that.   {#166}
[00:09:25] TEACHER: Plus, the events that   {#167}
[00:09:28] TEACHER: rate not everything that is happening in your database or in your application has an event   {#168}
[00:09:33] TEACHER: blog published okay user profile updated okay but minor changes like count plus plus right or around   {#169}
[00:09:42] TEACHER: views that you're increasing not everything will have an event because events are very specific or   {#170}
[00:09:49] TEACHER: are very contextual for application it holds the context of the use case but wherein what we want   {#171}
[00:09:58] TEACHER: with raw data. So first of all, not everything has an event and not every event will have   {#172}
[00:10:05] TEACHER: everything about it. For example, if I just say blog published, I may just pass in blog ID.   {#173}
[00:10:11] TEACHER: It does not have all the data, right? But here you might need it. So then you'd have to write   {#174}
[00:10:18] TEACHER: complex logic over here, which goes and patches the detailed information published over it,   {#175}
[00:10:22] TEACHER: just unnecessary puts load on this database. So things are becoming messy and messy and messy.   {#176}
[00:10:28] TEACHER: So can we do something better?   {#177}
[00:10:30] TEACHER: This sounds like an obvious answer, but it is not.   {#178}
[00:10:34] TEACHER: There has to be a better way, a much more seamless way.   {#179}
[00:10:37] TEACHER: Then we rely on EBS ever to push events to Kafka   {#180}
[00:10:40] TEACHER: and then we consume it from your business logic.   {#181}
[00:10:43] TEACHER: So what can we do?   {#182}
[00:10:45] TEACHER: Which is where CDC comes in.   {#183}
[00:10:48] TEACHER: So CDC stands for Change Data Capture.   {#184}
[00:10:51] TEACHER: So any changes in data is captured by CDC.   {#185}
[00:10:56] TEACHER: Very weird day, but change data capture is the thing.   {#186}
[00:10:59] TEACHER: So what happens is there are tools like Airbyte and DBZM.   {#187}
[00:11:04] TEACHER: In case you have never heard of it, go install, play around with it.   {#188}
[00:11:08] TEACHER: Highly, highly, highly recommend you to implement or set up.   {#189}
[00:11:12] TEACHER: At least Airbyte is the easiest one to set up.   {#190}
[00:11:14] TEACHER: Set up Airbyte locally and use it.   {#191}
[00:11:17] TEACHER: So what this change data capture tools do is instead of relying on API server events,   {#192}
[00:11:25] TEACHER: we rely on the actual source of truth, the database itself.   {#193}
[00:11:29] TEACHER: That is change data capture.   {#194}
[00:11:31] TEACHER: So change data capture typically, and it's not a hard rule per se,   {#195}
[00:11:35] TEACHER: but change data capture typically lets you configure your source databases,   {#196}
[00:11:39] TEACHER: your transformation logic, and your sync databases.   {#197}
[00:11:43] TEACHER: So what it does is it pulls the data from the source database   {#198}
[00:11:47] TEACHER: and puts it into sync database in the format that you would want.   {#199}
[00:11:51] TEACHER: Because it is operating on the database itself,   {#200}
[00:11:55] TEACHER: What would happen is it is okay.   {#201}
[00:11:58] TEACHER: Your application server does not have an event for it.   {#202}
[00:12:01] TEACHER: Still that updates will be captured and will be pushed onto this other database.   {#203}
[00:12:06] TEACHER: It's okay if your application server while pushing the event crashed.   {#204}
[00:12:09] TEACHER: So you will not lose the data because you are relying on the source of.   {#205}
[00:12:14] TEACHER: This is the highlight of change data capture.   {#206}
[00:12:16] TEACHER: So typically it's not a hard rule.   {#207}
[00:12:18] TEACHER: You may find some plugins that works other way,   {#208}
[00:12:20] TEACHER: but it's a very common concept that change data capture,   {#209}
[00:12:25] TEACHER: works on databases.   {#210}
[00:12:28] TEACHER: It keeps track.   {#211}
[00:12:29] TEACHER: Internally, it keeps track up until these rows.   {#212}
[00:12:31] TEACHER: I've read this database or this column was updated.   {#213}
[00:12:34] TEACHER: So I'll update it over here.   {#214}
[00:12:36] TEACHER: It reads tables row by row.   {#215}
[00:12:38] TEACHER: One way to do it.   {#216}
[00:12:40] TEACHER: It reads table by the commit log or the bin log,   {#217}
[00:12:43] TEACHER: which is the vol file that we have.   {#218}
[00:12:45] TEACHER: Anytime you commit something, it gets added to the vol file.   {#219}
[00:12:49] TEACHER: ChangeJataCapture literally reads that vol file   {#220}
[00:12:51] TEACHER: and pushes the changes to this other database.   {#221}
---- OWNED SEGMENTS END ----

CTX| [00:12:55] TEACHER: what kind of bindings a particular database offers.   {#222}
CTX| [00:12:59] TEACHER: For example, MongoDB might choose not to expose the commit log file.   {#223}
CTX| [00:13:04] TEACHER: So then chain data capture will rely on iterating collections.   {#224}
CTX| [00:13:08] TEACHER: Elasticsearch doesn't offer so it relies on iterating collections.   {#225}
CTX| [00:13:11] TEACHER: MySQL has bin log support.   {#226}
CTX| [00:13:12] TEACHER: It exposes wall file.   {#227}
CTX| [00:13:14] TEACHER: Chain data capture directly reads that wall file.   {#228}
CTX| [00:13:16] TEACHER: So for you, it does not matter how the data is read from the database.   {#229}
CTX| [00:13:21] TEACHER: What you know is on this tool, I configure this database as my source and this other   {#230}
CTX| [00:13:28] TEACHER: data is a sink.   {#231}
CTX| [00:13:29] TEACHER: I define a transformation and it just data flows like that.   {#232}
CTX| [00:13:32] TEACHER: Now, in case this DB is down, then the data will not be captured.   {#233}
CTX| [00:13:36] TEACHER: But once this DB is back up, it will resume from that point.   {#234}
CTX| [00:13:39] TEACHER: That's the job of these tools.   {#235}
CTX| [00:13:42] TEACHER: So instead of relying on API server to push something, you are literally relying on the   {#236}
CTX| [00:13:48] TEACHER: directly on the direct source of truth that you have.   {#237}
CTX| [00:13:51] TEACHER: This what makes change data capture invaluable.   {#238}
