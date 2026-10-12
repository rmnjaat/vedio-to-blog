# chunk_07  OWNS 01:11:11 -> 01:21:59  (segments #1035-#1228, 1921 words)

Lines prefixed `CTX|` are overlap context from neighbouring chunks: read them for meaning, do NOT emit them in this chunk's output.

CTX| [01:10:13] TEACHER: nothing. 1 million is a huge number. 1 billion is huge number.   {#1024}
CTX| [01:10:18] TEACHER: The difference between a million and a billion is almost   {#1025}
CTX| [01:10:21] TEACHER: equal to a billion and that's huge. Right.   {#1026}
CTX| [01:10:25] TEACHER: And we just use it like this 1 million, 4 billion, 5 billion.   {#1027}
CTX| [01:10:31] TEACHER: It's massive, massive, massive numbers and for a four by   {#1028}
CTX| [01:10:36] TEACHER: integer 4 billion, 4 billion orders.   {#1029}
CTX| [01:10:39] TEACHER: Imagine 4 billion orders of Amazon.   {#1030}
CTX| [01:10:41] TEACHER: sound right if you exhaust that making 64 bits make it 8 by 20 meters 2x to 64.   {#1031}
CTX| [01:10:47] TEACHER: not very much it's big enough range for you to not worry about it okay mohit yeah like if monotonicity   {#1032}
CTX| [01:10:57] STUDENT_3: was not a requirement then why not just go ahead with a uuid kind of approach let's talk about it   {#1033}
CTX| [01:11:03] TEACHER: let's talk about it like why not uuid so if uuid already exists for it why people are not   {#1034}

---- OWNED SEGMENTS START ----
[01:11:11] TEACHER: companies at scale don't prefer it.   {#1035}
[01:11:13] TEACHER: First of all, for folks who don't know what UUID is, UUIDs are 128 bit integers.   {#1036}
[01:11:18] TEACHER: Integers as it, 128 bit strings, which can be represented as gigantic integers.   {#1037}
[01:11:22] TEACHER: They are extremely inefficient at scale.   {#1038}
[01:11:27] TEACHER: Array, how my company is using UUID, are we inefficient at scale?   {#1039}
[01:11:32] TEACHER: Yes, you are.   {#1040}
[01:11:33] TEACHER: Okay, let me break up.   {#1041}
[01:11:34] TEACHER: So, in the second week pre-reads, I shared a video on how indexes make database read faster.   {#1042}
[01:11:44] TEACHER: In that we saw that indexes are also just tables with indexed values and the IDs of   {#1043}
[01:11:52] TEACHER: the rows that it points to.   {#1044}
[01:11:54] TEACHER: For example, post table has user ID and post ID and post title and whatnot.   {#1045}
[01:12:01] TEACHER: If you are creating an index on user ID, it is effectively a new B plus three or a new   {#1046}
[01:12:05] TEACHER: table which is created in which just two columns are there.   {#1047}
[01:12:08] TEACHER: Just to visualize in which you have first column as post user ID, second value as post ID.   {#1048}
[01:12:15] TEACHER: It's internally managed by database FYI.   {#1049}
[01:12:18] TEACHER: So what happens over here is because in index for a dense index at every single row of your   {#1050}
[01:12:26] TEACHER: database or of your index, they are also storing the row ID.   {#1051}
[01:12:30] TEACHER: big, it would make your indexes bulky.   {#1052}
[01:12:33] TEACHER: For example, 128 bit integers is equal to 16 bytes.   {#1053}
[01:12:38] TEACHER: Right.   {#1054}
[01:12:39] TEACHER: Now imagine if your indexes were set, if your index took one Gb, if your   {#1055}
[01:12:44] TEACHER: ID was just a four byte integer, but now you are changing it to UID, which   {#1056}
[01:12:48] TEACHER: is 16 byte integer.   {#1057}
[01:12:50] TEACHER: So now you just bloated your index by a factor of four.   {#1058}
[01:12:53] TEACHER: So your index, which was one GB in size is now suddenly four GB in size.   {#1059}
[01:12:57] TEACHER: So always remember your database is as fast as you get the max performance out of your database.   {#1060}
[01:13:06] TEACHER: It should be able to fit all the indexes in RAM.   {#1061}
[01:13:10] TEACHER: If it is not able to fit all the indexes in RAM, no matter how many optimizations you do, your database will never gain speed.   {#1062}
[01:13:17] TEACHER: Never.   {#1063}
[01:13:18] TEACHER: Because whenever your SQL query executes and not just Rupert SQL, any database in the world, wherever indexes are.   {#1064}
[01:13:26] TEACHER: Whenever you send any query, the first set of things that it does is does this basic   {#1065}
[01:13:31] TEACHER: query plan, query execution plan it creates.   {#1066}
[01:13:34] TEACHER: While doing that, all the operation it does on indexes because indexes are really tiny.   {#1067}
[01:13:39] TEACHER: Really tiny indexes.   {#1068}
[01:13:41] TEACHER: When it fits in RAM, let's say you're doing joins of two tables on the indexed columns.   {#1069}
[01:13:47] TEACHER: It can just do it in memory.   {#1070}
[01:13:48] TEACHER: It doesn't have to read from the disk anytime.   {#1071}
[01:13:50] TEACHER: Once it knows the result, then it goes to the disk and reads the entire row.   {#1072}
[01:13:55] TEACHER: So that's the last step.   {#1073}
[01:13:57] TEACHER: So if your indexes are in RAM, entire query execution happens in RAM.   {#1074}
[01:14:02] TEACHER: Just the things that you need from the row from the disk is the detailed row that was   {#1075}
[01:14:07] TEACHER: setting in the result.   {#1076}
[01:14:08] TEACHER: So this way your execution becomes lightning fast when your indexes can fit in RAM.   {#1077}
[01:14:14] TEACHER: So when I am ever optimizing a database ever, when someone comes to me and says,   {#1078}
[01:14:20] TEACHER: with my database is slow.   {#1079}
[01:14:21] TEACHER: I have what to do.   {#1080}
[01:14:22] TEACHER: The first thing I do is check their index sizes.   {#1081}
[01:14:25] TEACHER: That's it.   {#1082}
[01:14:26] TEACHER: When most cases index sizes are the problem.   {#1083}
[01:14:29] TEACHER: Random index is created on the database and this and that I see the amount of   {#1084}
[01:14:33] TEACHER: spills that happens on the disk simple because if your query execution.   {#1085}
[01:14:39] TEACHER: For in order for you to even read your indexes, it has to go to the desk to read   {#1086}
[01:14:43] TEACHER: it, that would be very slow.   {#1087}
[01:14:45] TEACHER: So that's why it does not mean that your database keeps your indexes in RAM.   {#1088}
[01:14:50] TEACHER: That is the main source, but it loads it in RAM during boot up   {#1089}
[01:14:53] TEACHER: or whenever you are requesting it to, when you're filing a particular query   {#1090}
[01:14:56] TEACHER: and it keeps in RAM.   {#1091}
[01:14:58] TEACHER: So the RAM of your database server should be equal to,   {#1092}
[01:15:02] TEACHER: or should be more than what your total index size is.   {#1093}
[01:15:05] TEACHER: Then you get a max out of your database.   {#1094}
[01:15:07] TEACHER: Otherwise you cannot.   {#1095}
[01:15:08] TEACHER: Otherwise your database query execution would be pathetically slow.   {#1096}
[01:15:12] TEACHER: Now, you're just over-exaggerating.   {#1097}
[01:15:15] TEACHER: I'll tell you other designs where because of this,   {#1098}
[01:15:18] TEACHER: people have not used UUIDs.   {#1099}
[01:15:20] TEACHER: not used to UIDs.   {#1100}
[01:15:21] TEACHER: Okay.   {#1101}
[01:15:22] TEACHER: So UIDs, they're gigantic integers, 16 bytes, 4X larger.   {#1102}
[01:15:26] TEACHER: That's huge.   {#1103}
[01:15:28] TEACHER: So 1 GB index becomes 4 GB index now.   {#1104}
[01:15:30] TEACHER: So they do not index well and they bloat up the index.   {#1105}
[01:15:34] TEACHER: That's right.   {#1106}
[01:15:35] TEACHER: But they're good for security because you cannot predict what's next in terms of UID.   {#1107}
[01:15:42] TEACHER: They seem very random.   {#1108}
[01:15:44] TEACHER: Because you cannot predict the next one,   {#1109}
[01:15:46] TEACHER: so it's hard for anyone to scrape out the entire website.   {#1110}
[01:15:51] TEACHER: If you're building Facebook and you know that you are exposing the database IDs, 1, 2, 3,   {#1111}
[01:15:56] TEACHER: 4, 5, 6, people can just fire rest requests and start from for I equal to zero, I is less   {#1112}
[01:16:01] TEACHER: than 1 billion I plus plus and start scraping the entire website.   {#1113}
[01:16:05] TEACHER: So because UUIDs are very random, they're good for security because it's hard for anyone   {#1114}
[01:16:10] TEACHER: to predict and penetrate or just predict other IDs.   {#1115}
[01:16:13] TEACHER: In most cases they would get four of them.   {#1116}
[01:16:16] TEACHER: So which is why people don't use UUIDs.   {#1117}
[01:16:20] TEACHER: scale. It does not mean you should not use it. It works in some cases. It does not work in other   {#1118}
[01:16:24] TEACHER: cases. In some cases where you're just scrapping it out, you know that your application is small   {#1119}
[01:16:29] TEACHER: enough. You would never hit that table. You would never hit that scale. The UI is just fine.   {#1120}
[01:16:33] TEACHER: Don't unnecessarily go for the best solution out there. See what works for you the best.   {#1121}
[01:16:38] TEACHER: MongoDB is just happy with 96 bits log. So MongoDB IDs are 12 byte integers.   {#1122}
[01:16:43] TEACHER: where look carefully first four bytes is epoch time always comes first right then five bytes of   {#1123}
[01:16:53] TEACHER: random and three bytes of counter counter for each chart that it has right this is 12 bytes is   {#1124}
[01:17:00] TEACHER: what they are favoring right now they didn't go for 16 for uid they what's stopping them from going   {#1125}
[01:17:05] TEACHER: for uids nothing to reduce by four bytes they went for sure right mysql auto increment ids is   {#1126}
[01:17:11] TEACHER: four byte integer, you're very happy.   {#1127}
[01:17:13] TEACHER: That's very tiny index, right?   {#1128}
[01:17:14] TEACHER: Four bytes, eight bytes is still doable beyond eight bytes.   {#1129}
[01:17:17] TEACHER: You should worry about the performance at scale, at scale.   {#1130}
[01:17:22] TEACHER: Okay.   {#1131}
[01:17:22] TEACHER: So this is what MongoDB does.   {#1132}
[01:17:24] TEACHER: New to see a lot of ID generation, sitting things on the left, like having   {#1133}
[01:17:28] TEACHER: time on the left side and trying to keep the ID smaller, which is why in the   {#1134}
[01:17:32] TEACHER: first half of when you're brainstorming, ID is becoming longer is a problem   {#1135}
[01:17:37] TEACHER: because they do not index well.   {#1136}
[01:17:40] TEACHER: Okay.   {#1137}
[01:17:41] TEACHER: to help you understand this entire thing better.   {#1138}
[01:17:44] TEACHER: Every single company, every single quote-unquote case study we look at,   {#1139}
[01:17:49] TEACHER: every single one of the further case studies mentioned   {#1140}
[01:17:51] TEACHER: that they didn't go for UIDs because they do not index well.   {#1141}
[01:17:54] TEACHER: Because this is the harsh reality.   {#1142}
[01:17:56] TEACHER: So let's take a look at what Flickr did.   {#1143}
[01:17:58] TEACHER: So Flickr is pre-Instagram.   {#1144}
[01:18:03] TEACHER: Flickr was Instagram of 2010s to 2010s.   {#1145}
[01:18:07] TEACHER: A lot of things got posted there.   {#1146}
[01:18:09] TEACHER: then obviously Instagram took over a lot of stuff.   {#1147}
[01:18:12] TEACHER: So Flickr needed its own ID generation.   {#1148}
[01:18:15] TEACHER: But why?   {#1149}
[01:18:16] TEACHER: Because database was sharded,   {#1150}
[01:18:19] TEACHER: which is what I always say.   {#1151}
[01:18:21] TEACHER: Because your database is sharded,   {#1152}
[01:18:23] TEACHER: operating in multi-master mode,   {#1153}
[01:18:25] TEACHER: which means that writes can be going to anywhere,   {#1154}
[01:18:27] TEACHER: they need a central ID generation thing   {#1155}
[01:18:29] TEACHER: to maintain the uniqueness.   {#1156}
[01:18:31] TEACHER: To guarantee uniqueness,   {#1157}
[01:18:32] TEACHER: they need a central ID generation service   {#1158}
[01:18:34] TEACHER: because they cannot just use auto increment everywhere   {#1159}
[01:18:36] TEACHER: because that would result to conflict.   {#1160}
[01:18:39] TEACHER: Because of which they needed a central ID generation service.   {#1161}
[01:18:42] TEACHER: Now you know where you did it.   {#1162}
[01:18:43] TEACHER: Flickr did it because of this exact same reason.   {#1163}
[01:18:46] TEACHER: And in their blog, they mentioned why not UUIDs?   {#1164}
[01:18:49] TEACHER: Because they index badly.   {#1165}
[01:18:51] TEACHER: Every single one is mentioning UUIDs index badly because 16 bytes is a huge thing.   {#1166}
[01:18:57] TEACHER: Huge thing because it just forexes your index.   {#1167}
[01:19:02] TEACHER: Almost rough estimate.   {#1168}
[01:19:04] TEACHER: Don't quote me on that because your integer was 4 bytes.   {#1169}
[01:19:10] TEACHER: additional things that you are taking up in that forex is a wrong calculation actually depends on   {#1170}
[01:19:14] TEACHER: the value but you get that there right okay so this is what it's written in their blog their   {#1171}
[01:19:20] TEACHER: official blog if you cannot fit indexes in memory you cannot make your database pass and it's true   {#1172}
[01:19:25] TEACHER: it's true anytime a serial engineer technical architect stop in your principal engineer ever   {#1173}
[01:19:30] TEACHER: optimizes the database the first thing he or she looks at is the index size always remember this   {#1174}
[01:19:34] TEACHER: Because if your index is spilled on disk, your database would always be slow.   {#1175}
[01:19:39] TEACHER: Always be slow.   {#1176}
[01:19:40] TEACHER: And this is one of the ways to which you can actually provision the database.   {#1177}
[01:19:43] TEACHER: If someone asks you, not during interviews, interviews are crappy.   {#1178}
[01:19:47] TEACHER: In your real world, if someone asks you, Hey, what should be the size of this database for   {#1179}
[01:19:51] TEACHER: it to be performed?   {#1180}
[01:19:52] TEACHER: The bare minimum side should be, should be the summation of sizes of all the indexes   {#1181}
[01:19:57] TEACHER: that it holds.   {#1182}
[01:19:58] TEACHER: Simple.   {#1183}
[01:19:59] TEACHER: Bare minimum.   {#1184}
[01:20:00] TEACHER: That's the bare minimum that it needs to be.   {#1185}
[01:20:02] TEACHER: Beyond that, anything is good, but that's a bare minimum that you should have.   {#1186}
[01:20:06] TEACHER: Right.   {#1187}
[01:20:07] TEACHER: Always keep these things in mind.   {#1188}
[01:20:09] TEACHER: That's why database fundamentals.   {#1189}
[01:20:10] TEACHER: So, so, so important because that's the, as I always say, database is the most brutal   {#1190}
[01:20:16] TEACHER: component of the most essential, but most brutal component of an infrastructure because   {#1191}
[01:20:20] TEACHER: scaling API servers is easy.   {#1192}
[01:20:22] TEACHER: They are mostly stateless.   {#1193}
[01:20:24] TEACHER: Every other thing is stateless.   {#1194}
[01:20:25] TEACHER: Database is the one where everything is getting stored.   {#1195}
[01:20:28] TEACHER: Everything is getting varied.   {#1196}
[01:20:30] TEACHER: entire load is handled by database.   {#1197}
[01:20:32] TEACHER: So understand your database,   {#1198}
[01:20:34] TEACHER: whichever database you are using really well.   {#1199}
[01:20:38] TEACHER: So how did Flickr did it?   {#1200}
[01:20:40] TEACHER: So Flickr built a central ticket server,   {#1201}
[01:20:43] TEACHER: basically ID generation service.   {#1202}
[01:20:45] TEACHER: And they built it on top of MySQL.   {#1203}
[01:20:47] TEACHER: So what they do is whoever wants to get an ID,   {#1204}
[01:20:50] TEACHER: they make a query to MySQL and they get an ID.   {#1205}
[01:20:55] TEACHER: Don't think of performance.   {#1206}
[01:20:56] TEACHER: It's their decision.   {#1207}
[01:20:57] TEACHER: We can't say much about it.   {#1208}
[01:20:59] TEACHER: But understand the beauty of this design.   {#1209}
[01:21:01] TEACHER: That's what matters.   {#1210}
[01:21:02] TEACHER: As an engineer, focus on the beauty of design rather than pointing out the faults.   {#1211}
[01:21:07] TEACHER: It's okay to point out the faults, but pick the good parts of it.   {#1212}
[01:21:12] TEACHER: Because it was their decision.   {#1213}
[01:21:13] TEACHER: We can't interfere.   {#1214}
[01:21:14] TEACHER: It's like your neighbors are fighting.   {#1215}
[01:21:17] TEACHER: You know that both of them are wrong, but you should not say anything to them.   {#1216}
[01:21:20] TEACHER: It's their life.   {#1217}
[01:21:21] TEACHER: Whatever they want to do it, let them do it.   {#1218}
[01:21:23] TEACHER: But pick the best parts of it.   {#1219}
[01:21:25] TEACHER: So what they did is they created a table called tickets.   {#1220}
[01:21:29] TEACHER: In this table, they added a column called id, big integer, unsigned, not null and auto   {#1221}
[01:21:36] TEACHER: increment.   {#1222}
[01:21:37] TEACHER: Right?   {#1223}
[01:21:38] TEACHER: You clearly see big integer 2 raise to 64.   {#1224}
[01:21:41] TEACHER: They added a column called stub will come to this what stub is all about.   {#1225}
[01:21:45] TEACHER: They have made id the primary key, unique key to stub.   {#1226}
[01:21:48] TEACHER: The idea is that if MySQL already gives me auto increment ids, why can't MySQL be my   {#1227}
[01:21:56] TEACHER: id generation service?   {#1228}
---- OWNED SEGMENTS END ----

CTX| [01:21:59] TEACHER: sometime back right someone asked that but i think shriya was that that asked that part right why   {#1229}
CTX| [01:22:04] TEACHER: can't we just use my existing id generation i can't use my database as my id generation service   {#1230}
CTX| [01:22:10] TEACHER: that's exactly what they are doing they are using database itself as id so it's a separate database   {#1231}
CTX| [01:22:15] TEACHER: photos are being stored in other sharded database your id generation itself is a separate database   {#1232}
CTX| [01:22:20] TEACHER: in which you are leveraging the auto incrementedness of the database as your id generation   {#1233}
CTX| [01:22:26] TEACHER: So what happens if let's say you want to naively use a database as that, you know,   {#1234}
CTX| [01:22:32] TEACHER: database gives you auto increment.   {#1235}
CTX| [01:22:34] TEACHER: Whenever someone needs an ID, it talks to this database and you want ID from that.   {#1236}
CTX| [01:22:38] TEACHER: Basically, what would you do?   {#1237}
CTX| [01:22:39] TEACHER: You have this column, ID auto increment ID.   {#1238}
CTX| [01:22:42] TEACHER: You would delete this and add a new row.   {#1239}
CTX| [01:22:45] TEACHER: When you add a new row, what would you get?   {#1240}
CTX| [01:22:47] TEACHER: It would be the next ID.   {#1241}
CTX| [01:22:49] TEACHER: Then when you need one, you delete one and you add one, it would get the next ID.   {#1242}
CTX| [01:22:53] TEACHER: right but for you to add one you can just cannot insert a row with nothing you need to pass some   {#1243}
